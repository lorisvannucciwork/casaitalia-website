/**
 * The pizza wall: pizzas named and saved by the guests in the builder, shown publicly on
 * /pizza-wall, where anyone can rate them and order them.
 *
 * Names are public and appear without review, so they are checked here: length, characters, no
 * links or phone numbers, and a basic word filter. To take a pizza down:
 *   UPDATE community_pizzas SET hidden = 1 WHERE id = '...';
 */
import db from './db';
import { sanitizeText } from './security';
import { TOPPINGS, customPizzaPrice, type ToppingId } from '@/config/pizzaBuilder';
import { PIZZA_CREATOR_MAX, PIZZA_NAME_MAX, PIZZA_NAME_MIN, type WallPizza } from './pizzaWallShared';

export { PIZZA_CREATOR_MAX, PIZZA_NAME_MAX, PIZZA_NAME_MIN };
export type { WallPizza };

const WALL_SIZE = 200;

export class PizzaWallError extends Error {
  constructor(public code: string, message: string, public status = 400) {
    super(message);
  }
}

interface PizzaRow {
  id: string;
  name: string;
  creator: string | null;
  toppings: string;
  rating_sum: number;
  rating_count: number;
  order_count: number;
  created_at: string;
}

/** Only known toppings, once each, in the builder's order. */
function knownToppings(value: unknown): ToppingId[] {
  const wanted = new Set(Array.isArray(value) ? value.filter((t): t is string => typeof t === 'string') : []);
  return TOPPINGS.filter((t) => wanted.has(t.id)).map((t) => t.id);
}

function toPizza(row: PizzaRow): WallPizza {
  let toppings: ToppingId[] = [];
  try {
    toppings = knownToppings(JSON.parse(row.toppings));
  } catch {
    // an unreadable row is shown as a plain tomato pizza rather than breaking the wall
  }
  const count = Number(row.rating_count) || 0;
  return {
    id: row.id,
    name: row.name,
    creator: row.creator || '',
    toppings,
    price: customPizzaPrice(toppings),
    ratingAvg: count ? Math.round((Number(row.rating_sum) / count) * 10) / 10 : 0,
    ratingCount: count,
    orderCount: Number(row.order_count) || 0,
    createdAt: row.created_at,
  };
}

// ---------------------------------------------------------------------------------------------
// Checking what guests write
// ---------------------------------------------------------------------------------------------

/** Matched anywhere in the text, once it is stripped of spaces, accents and look-alike digits. */
const BLOCKED_ANYWHERE = [
  'fuck', 'bitch', 'asshole', 'nigg', 'faggot', 'whore', 'porn', 'cunt',
  'cazzo', 'stronz', 'vaffanc', 'coglion', 'minchia', 'bastard',
  'شرموط', 'متناك', 'كسمك',
];
/** Matched as whole words only: these letters appear inside innocent words (e.g. "puttanesca"). */
const BLOCKED_WORDS = new Set(['shit', 'dick', 'puttana', 'troia', 'merda', 'sex', 'nazi', 'hitler', 'خول', 'زبي']);

function simplify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/0/g, 'o')
    .replace(/[1!]/g, 'i')
    .replace(/3/g, 'e')
    .replace(/[4@]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/7/g, 't');
}

export function isAcceptableText(text: string): boolean {
  if (/https?:|www\.|\.[a-z]{2,4}(\s|$)|\d{5,}/i.test(text)) return false; // links, phone numbers
  const simple = simplify(text);
  const joined = simple.replace(/[^\p{L}]/gu, '');
  if (BLOCKED_ANYWHERE.some((word) => joined.includes(word))) return false;
  return !simple.split(/[^\p{L}]+/u).some((word) => BLOCKED_WORDS.has(word));
}

function cleanLabel(value: unknown, max: number): string {
  return sanitizeText(typeof value === 'string' ? value : '')
    .replace(/[^\p{L}\p{M}\p{N} '’&.,!-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .trim();
}

function randomId(): string {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

// ---------------------------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------------------------

const COLUMNS = 'id, name, creator, toppings, rating_sum, rating_count, order_count, created_at';

export async function listPizzas(): Promise<WallPizza[]> {
  const rows = await db.query<PizzaRow>(
    `SELECT ${COLUMNS} FROM community_pizzas WHERE hidden = 0 ORDER BY created_at DESC LIMIT ?`,
    [WALL_SIZE]
  );
  return rows.map(toPizza);
}

/** A pizza of the wall, or null if it does not exist, was taken down, or the id is malformed. */
export async function getPizza(id: unknown): Promise<WallPizza | null> {
  if (typeof id !== 'string' || !/^[a-z0-9]{6,20}$/.test(id)) return null;
  const row = await db.queryFirst<PizzaRow>(`SELECT ${COLUMNS} FROM community_pizzas WHERE id = ? AND hidden = 0`, [id]);
  return row ? toPizza(row) : null;
}

// ---------------------------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------------------------

export async function createPizza(input: { name?: unknown; creator?: unknown; toppings?: unknown; language?: unknown }) {
  const name = cleanLabel(input.name, PIZZA_NAME_MAX);
  const creator = cleanLabel(input.creator, PIZZA_CREATOR_MAX);
  const toppings = knownToppings(input.toppings);

  if (name.length < PIZZA_NAME_MIN) throw new PizzaWallError('name_short', 'Please give your pizza a name.');
  if (!isAcceptableText(name) || (creator && !isAcceptableText(creator))) {
    throw new PizzaWallError('name_bad', 'Please choose a different name.');
  }
  if (!toppings.length) throw new PizzaWallError('toppings', 'Add at least one topping first.');

  const id = randomId();
  const createdAt = new Date().toISOString();
  try {
    await db.execute(
      `INSERT INTO community_pizzas (id, name, name_key, creator, toppings, language, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, simplify(name).replace(/[^\p{L}\p{N}]/gu, ''), creator || null, JSON.stringify(toppings),
       input.language === 'en' ? 'en' : 'it', createdAt]
    );
  } catch (error) {
    if (String(error).includes('UNIQUE')) {
      throw new PizzaWallError('name_taken', 'This name is already on the wall.', 409);
    }
    throw error;
  }
  return toPizza({ id, name, creator, toppings: JSON.stringify(toppings), rating_sum: 0, rating_count: 0, order_count: 0, created_at: createdAt });
}

/**
 * One guest, one rating per pizza (rating again replaces it). A guest is a random id kept by their
 * browser, combined with their IP address and hashed: neither is stored as such.
 */
export async function ratePizza(id: unknown, stars: unknown, clientId: unknown, ip: string) {
  const value = Math.floor(Number(stars));
  if (!Number.isFinite(value) || value < 1 || value > 5) throw new PizzaWallError('stars', 'Choose from 1 to 5 stars.');
  if (typeof clientId !== 'string' || clientId.length < 8 || clientId.length > 64) {
    throw new PizzaWallError('voter', 'Your rating could not be saved.');
  }
  const pizza = await getPizza(id);
  if (!pizza) throw new PizzaWallError('not_found', 'This pizza is no longer on the wall.', 404);

  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${process.env.INTERNAL_API_SECRET || 'casa-italia'}|${ip}|${clientId}`)
  );
  const voter = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');

  await db.batch([
    {
      sql: `INSERT INTO community_pizza_ratings (pizza_id, voter, stars, created_at) VALUES (?, ?, ?, ?)
            ON CONFLICT (pizza_id, voter) DO UPDATE SET stars = excluded.stars`,
      params: [pizza.id, voter, value, new Date().toISOString()],
    },
    {
      sql: `UPDATE community_pizzas SET
              rating_sum = (SELECT COALESCE(SUM(stars), 0) FROM community_pizza_ratings WHERE pizza_id = ?),
              rating_count = (SELECT COUNT(*) FROM community_pizza_ratings WHERE pizza_id = ?)
            WHERE id = ?`,
      params: [pizza.id, pizza.id, pizza.id],
    },
  ]);
  const updated = await getPizza(pizza.id);
  return { ratingAvg: updated?.ratingAvg ?? 0, ratingCount: updated?.ratingCount ?? 0, stars: value };
}

/** Counts an order on the wall. Never fails the order it belongs to. */
export async function countPizzaOrder(id: string, quantity: number) {
  try {
    await db.execute('UPDATE community_pizzas SET order_count = order_count + ? WHERE id = ?', [quantity, id]);
  } catch (error) {
    console.error('Pizza wall order count failed:', error);
  }
}
