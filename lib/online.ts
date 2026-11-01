/**
 * Online orders and table reservations.
 *
 * The website stores them in D1; the restaurant's Odoo collects the new ones every minute
 * (GET /api/odoo/pending) and confirms what it saved (POST /api/odoo/ack). Odoo only makes
 * outgoing requests, so nothing at the restaurant is exposed to the internet, and nothing is lost
 * while the restaurant is offline: records stay "pending" here until Odoo has them.
 */
import db from './db';
import { sanitizeText } from './security';
import { CUSTOM_PIZZA_ID, PIZZA_BASE, TOPPINGS, customPizzaPrice } from '@/config/pizzaBuilder';

export const RESTAURANT_TZ = 'Africa/Cairo';

/** Delivery orders are accepted between these hours (restaurant time), DELIVERY_HOURS="12:00-23:00". */
export function orderHours(): { open: string; lastOrder: string } {
  const match = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/.exec((process.env.DELIVERY_HOURS || '').trim());
  return match ? { open: match[1], lastOrder: match[2] } : { open: '12:00', lastOrder: '23:00' };
}

/** Booking slots and limits. */
export const BOOKING_RULES = {
  firstSlot: '12:00',
  lastSlot: '22:00',
  intervalMinutes: 30,
  maxGuests: 12, // bigger groups are asked to call
  maxDaysAhead: 60,
  minMinutesAhead: 30,
  /** A booking keeps its table this long: used to count the guests seated at the same time. */
  durationMinutes: 120,
};

const MAX_ORDER_LINES = 40;
const MAX_QUANTITY = 30;
const PURGE_AFTER_DAYS = 90;

export class OnlineError extends Error {
  constructor(public code: string, message: string, public status = 400) {
    super(message);
  }
}

// ---------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------

/** Guests that online bookings may seat at the same time (walk-ins need room too). */
function bookingCapacity(): number {
  const value = parseInt(process.env.RESERVATION_CAPACITY || '', 10);
  return Number.isFinite(value) && value > 0 ? value : 50;
}

function clean(value: unknown, max: number): string {
  return sanitizeText(typeof value === 'string' ? value : '').slice(0, max);
}

function randomCode(length = 6): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

function newId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

/** Current date (YYYY-MM-DD) and time (HH:MM) in the restaurant timezone. */
export function restaurantNow(): { date: string; time: string; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: RESTAURANT_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value || '00';
  const time = `${get('hour')}:${get('minute')}`;
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time, minutes: toMinutes(time) };
}

export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map((n) => parseInt(n, 10));
  return h * 60 + m;
}

function fromMinutes(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/[^0-9]/g, '').length >= 7;
}

// ---------------------------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------------------------

export interface OrderInput {
  customer?: { name?: unknown; phone?: unknown; area?: unknown; location?: unknown; notes?: unknown };
  items?: { id?: unknown; quantity?: unknown; notes?: unknown; toppings?: unknown }[];
  language?: unknown;
}

interface OrderItem {
  item_id: string;
  name: string;
  italian_name: string | null;
  price: number;
  quantity: number;
  notes: string | null;
}

/** A "create your own pizza" line: toppings checked against the builder's list, price computed here. */
function customPizzaLine(toppings: unknown, quantity: number, notes: string): { key: string; item: OrderItem } {
  const wanted = new Set(Array.isArray(toppings) ? toppings.filter((t): t is string => typeof t === 'string') : []);
  const chosen = TOPPINGS.filter((t) => wanted.has(t.id));
  const list = chosen.length ? chosen.map((t) => t.name.en).join(', ') : 'tomato only';
  return {
    key: `${CUSTOM_PIZZA_ID}:${chosen.map((t) => t.id).join('+')}`,
    item: {
      item_id: CUSTOM_PIZZA_ID,
      name: 'Create Your Own Pizza',
      italian_name: 'PIZZA A MODO TUO',
      price: customPizzaPrice(chosen.map((t) => t.id)),
      quantity,
      notes: [`${PIZZA_BASE.name.en} + ${list}`, notes].filter(Boolean).join(' · '),
    },
  };
}

interface MenuRow {
  id: string;
  name: string;
  italian_name: string | null;
  price: number;
  active: number;
}

export function isOrderingOpen(): boolean {
  // 12-11 order limit disabled for now
  return true;
  // const now = restaurantNow().minutes;
  // const hours = orderHours();
  // return now >= toMinutes(hours.open) && now <= toMinutes(hours.lastOrder);
}

export async function createOrder(input: OrderInput, currency: string) {
  if (!isOrderingOpen()) {
    const hours = orderHours();
    throw new OnlineError('closed', `Delivery orders are taken from ${hours.open} to ${hours.lastOrder}.`);
  }
  const customer = input.customer || {};
  const name = clean(customer.name, 80);
  const phone = clean(customer.phone, 30);
  const location = clean(customer.location, 160);
  const notes = clean(customer.notes, 500);
  const area = customer.area === 'outside' ? 'outside' : 'inside';
  if (!name) throw new OnlineError('name', 'Please enter your name.');
  if (!isValidPhone(phone)) throw new OnlineError('phone', 'Please enter a valid phone number.');
  if (!location) throw new OnlineError('location', 'Please enter the delivery location.');

  // One line per dish; the quantities of a dish sent twice are added up. Custom pizzas are one line
  // per combination of toppings.
  const wanted = new Map<string, { quantity: number; notes: string }>();
  const customPizzas = new Map<string, OrderItem>();
  for (const item of input.items || []) {
    const id = typeof item.id === 'string' ? item.id.slice(0, 120) : '';
    const quantity = Math.floor(Number(item.quantity));
    if (!id || !Number.isFinite(quantity) || quantity < 1) continue;
    if (id === CUSTOM_PIZZA_ID) {
      const { key, item: pizza } = customPizzaLine(item.toppings, quantity, clean(item.notes, 200));
      const existing = customPizzas.get(key);
      if (existing) existing.quantity = Math.min(existing.quantity + quantity, MAX_QUANTITY);
      else customPizzas.set(key, { ...pizza, quantity: Math.min(quantity, MAX_QUANTITY) });
      continue;
    }
    const line = wanted.get(id) || { quantity: 0, notes: '' };
    line.quantity = Math.min(line.quantity + quantity, MAX_QUANTITY);
    line.notes = line.notes || clean(item.notes, 200);
    wanted.set(id, line);
  }
  if (wanted.size + customPizzas.size === 0) throw new OnlineError('empty', 'Your order is empty.');
  if (wanted.size + customPizzas.size > MAX_ORDER_LINES) {
    throw new OnlineError('too_big', 'Too many different dishes in one order.');
  }

  // Prices always come from the menu (or the pizza builder's list), never from the browser
  const ids = Array.from(wanted.keys());
  const rows = ids.length
    ? await db.query<MenuRow>(
        `SELECT id, name, italian_name, price, active FROM menu_items WHERE id IN (${ids.map(() => '?').join(',')})`,
        ids
      )
    : [];
  const menu = new Map(rows.map((r) => [r.id, r]));
  const unavailable = ids.filter((id) => !menu.get(id) || !menu.get(id)!.active);
  if (unavailable.length) {
    throw new OnlineError('unavailable', 'Some dishes are no longer available: please refresh the menu.');
  }

  const items: OrderItem[] = ids.map((id) => {
    const dish = menu.get(id)!;
    const line = wanted.get(id)!;
    return {
      item_id: dish.id,
      name: dish.name,
      italian_name: dish.italian_name || null,
      price: Math.round(Number(dish.price) * 100) / 100,
      quantity: line.quantity,
      notes: line.notes || null,
    };
  });
  items.push(...customPizzas.values());
  const subtotal = Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100;

  const order = {
    id: newId('ord'),
    ref: `W-${randomCode()}`,
    created_at: new Date().toISOString(),
  };
  await db.execute(
    `INSERT INTO online_orders (id, ref, type, customer_name, phone, area, location, notes, items, subtotal, currency, language, status, created_at)
     VALUES (?, ?, 'delivery', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    [order.id, order.ref, name, phone, area, location, notes || null, JSON.stringify(items), subtotal, currency,
     input.language === 'en' ? 'en' : 'it', order.created_at]
  );
  return { ref: order.ref, subtotal, items: items.length };
}

// ---------------------------------------------------------------------------------------------
// Reservations
// ---------------------------------------------------------------------------------------------

export interface ReservationInput {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  guests?: unknown;
  date?: unknown;
  time?: unknown;
  area?: unknown;
  notes?: unknown;
  language?: unknown;
}

/** All the booking times of a day. */
export function bookingSlots(): string[] {
  const slots: string[] = [];
  for (let m = toMinutes(BOOKING_RULES.firstSlot); m <= toMinutes(BOOKING_RULES.lastSlot); m += BOOKING_RULES.intervalMinutes) {
    slots.push(fromMinutes(m));
  }
  return slots;
}

function checkBookingDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new OnlineError('date', 'Please choose a valid date.');
  }
  const today = restaurantNow().date;
  if (date < today || date > addDays(today, BOOKING_RULES.maxDaysAhead)) {
    throw new OnlineError('date', `Bookings are open for the next ${BOOKING_RULES.maxDaysAhead} days.`);
  }
}

/** Guests already booked around each slot of a day (bookings overlapping the slot's 2 hours). */
export async function getAvailability(date: string, guests = 1) {
  checkBookingDate(date);
  const rows = await db.query<{ time: string; guests: number }>(
    `SELECT time, guests FROM table_reservations WHERE date = ? AND status != 'cancelled'`,
    [date]
  );
  const capacity = bookingCapacity();
  const now = restaurantNow();
  const isToday = date === now.date;
  return bookingSlots().map((time) => {
    const start = toMinutes(time);
    const seated = rows
      .filter((r) => Math.abs(toMinutes(r.time) - start) < BOOKING_RULES.durationMinutes)
      .reduce((sum, r) => sum + Number(r.guests || 0), 0);
    const tooLate = isToday && start < now.minutes + BOOKING_RULES.minMinutesAhead;
    return { time, available: !tooLate && seated + guests <= capacity };
  });
}

export async function createReservation(input: ReservationInput) {
  const name = clean(input.name, 80);
  const phone = clean(input.phone, 30);
  const email = clean(input.email, 120);
  const notes = clean(input.notes, 500);
  const date = typeof input.date === 'string' ? input.date : '';
  const time = typeof input.time === 'string' ? input.time : '';
  const guests = Math.floor(Number(input.guests));
  const area = input.area === 'indoor' || input.area === 'outdoor' ? input.area : 'any';

  if (!name) throw new OnlineError('name', 'Please enter your name.');
  if (!isValidPhone(phone)) throw new OnlineError('phone', 'Please enter a valid phone number.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new OnlineError('email', 'Please enter a valid email.');
  if (!Number.isFinite(guests) || guests < 1) throw new OnlineError('guests', 'Please choose the number of guests.');
  if (guests > BOOKING_RULES.maxGuests) {
    throw new OnlineError('group', `For more than ${BOOKING_RULES.maxGuests} guests, please call us.`);
  }
  if (!bookingSlots().includes(time)) throw new OnlineError('time', 'Please choose a time.');

  const slot = (await getAvailability(date, guests)).find((s) => s.time === time);
  if (!slot?.available) {
    throw new OnlineError('full', 'This time is no longer available, please choose another one.', 409);
  }

  const reservation = { id: newId('res'), ref: `B-${randomCode()}`, created_at: new Date().toISOString() };
  await db.execute(
    `INSERT INTO table_reservations (id, ref, customer_name, phone, email, guests, date, time, area, notes, language, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    [reservation.id, reservation.ref, name, phone, email || null, guests, date, time, area, notes || null,
     input.language === 'en' ? 'en' : 'it', reservation.created_at]
  );
  return { ref: reservation.ref, date, time, guests };
}

// ---------------------------------------------------------------------------------------------
// Odoo synchronisation
// ---------------------------------------------------------------------------------------------

/** Constant-time check of the Bearer secret shared with Odoo (ODOO_SYNC_SECRET). */
export function isOdooAuthorized(authorization: string | null): boolean {
  const expected = process.env.ODOO_SYNC_SECRET || '';
  const given = (authorization || '').replace(/^Bearer\s+/i, '');
  if (expected.length < 24 || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

interface OrderRow {
  id: string;
  ref: string;
  type: string;
  customer_name: string;
  phone: string;
  area: string;
  location: string;
  notes: string | null;
  items: string;
  subtotal: number;
  currency: string;
  language: string | null;
  created_at: string;
}

interface ReservationRow {
  id: string;
  ref: string;
  customer_name: string;
  phone: string;
  email: string | null;
  guests: number;
  date: string;
  time: string;
  area: string;
  notes: string | null;
  language: string | null;
  created_at: string;
}

export async function listPending() {
  const [orders, reservations] = await Promise.all([
    db.query<OrderRow>(`SELECT * FROM online_orders WHERE status = 'pending' ORDER BY created_at LIMIT 50`),
    db.query<ReservationRow>(`SELECT * FROM table_reservations WHERE status = 'pending' ORDER BY created_at LIMIT 100`),
  ]);
  return {
    orders: orders.map((o) => ({
      id: o.id,
      ref: o.ref,
      type: o.type,
      created_at: o.created_at,
      customer: { name: o.customer_name, phone: o.phone, area: o.area, location: o.location, notes: o.notes },
      items: JSON.parse(o.items),
      subtotal: o.subtotal,
      currency: o.currency,
      language: o.language,
    })),
    reservations: reservations.map((r) => ({
      id: r.id,
      ref: r.ref,
      created_at: r.created_at,
      name: r.customer_name,
      phone: r.phone,
      email: r.email,
      guests: r.guests,
      date: r.date,
      time: r.time,
      area: r.area,
      notes: r.notes,
      language: r.language,
    })),
  };
}

interface AckPayload {
  orders?: { id?: unknown; odoo_ref?: unknown }[];
  reservations?: { id?: unknown; odoo_ref?: unknown; table?: unknown }[];
}

export async function acknowledge(payload: AckPayload) {
  const now = new Date().toISOString();
  const statements: { sql: string; params: unknown[] }[] = [];
  for (const o of payload.orders || []) {
    if (typeof o.id !== 'string') continue;
    statements.push({
      sql: `UPDATE online_orders SET status = 'received', odoo_ref = ?, received_at = ? WHERE id = ?`,
      params: [clean(o.odoo_ref, 40) || null, now, o.id],
    });
  }
  for (const r of payload.reservations || []) {
    if (typeof r.id !== 'string') continue;
    const table = Number.isInteger(r.table) ? r.table : null;
    statements.push({
      sql: `UPDATE table_reservations SET status = 'received', odoo_ref = ?, table_number = ?, received_at = ? WHERE id = ?`,
      params: [clean(r.odoo_ref, 40) || null, table, now, r.id],
    });
  }
  // Personal data is not kept longer than needed once Odoo has it
  const purgeBefore = new Date(Date.now() - PURGE_AFTER_DAYS * 86400000).toISOString();
  statements.push({ sql: `DELETE FROM online_orders WHERE status = 'received' AND received_at < ?`, params: [purgeBefore] });
  statements.push({ sql: `DELETE FROM table_reservations WHERE status = 'received' AND received_at < ?`, params: [purgeBefore] });
  await db.batch(statements);
  return { orders: (payload.orders || []).length, reservations: (payload.reservations || []).length };
}
