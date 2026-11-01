'use client';
/* eslint-disable @next/next/no-img-element -- dozens of small transparent cut-outs, laid out and
   animated in % of the pizza: plain images, already sized and compressed (WebP) */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/layout';
import { CUSTOM_PIZZA_ID, PIZZA_BASE, TOPPINGS, customPizzaPrice, type ToppingId } from '@/config/pizzaBuilder';
import { placeTopping, trayHeap, type PiecePlacement } from './pizzaLayout';
import { Barcode, Glove, LidPrint, OvenTimer, type GlovePose } from './PizzaArt';
import styles from './PizzaBuilder.module.css';

/**
 * "Create your own pizza": a box on the floured counter opens on a dough with tomato, the
 * toppings are dragged (or tapped) from their trays onto the pizza, the receipt adds them up,
 * the order goes to the restaurant (same path as the delivery orders), the pizza bakes and the
 * box closes.
 */

type Stage = 'closed' | 'opening' | 'build' | 'details' | 'baking' | 'closing' | 'done';

const OPEN_MS = 950;
const BAKE_MS = 4000;
const CLOSE_MS = 950;

const COPY = {
  en: {
    tagline: ['Hand-stretched. Wood-fired.', 'Made your way.'],
    top: { closed: 'Start your order', build: 'Your pizza', done: 'Make another pizza' },
    kicker: 'The oven is on',
    headline: ['Your pizza.', 'Your way.'],
    intro: 'Choose your toppings on our slow-proofed dough. We bake it in the wood-fired oven and bring it to you in Port Ghalib.',
    letsGo: "Let's make pizza",
    deliveryTitle: 'Delivery in Port Ghalib',
    deliveryText: 'Paid on arrival, cash or card',
    hoursTitle: (open: string, last: string) => `Every day, ${open}–${last}`,
    hoursText: 'Straight from our oven',
    makeIt: 'Make it yours.',
    dragHint: 'Drag a topping onto your pizza. Or tap to add.',
    receiptKicker: 'Made by hand · Port Ghalib',
    receiptTitle: 'Your pizza',
    reachYou: 'Where do we bring it?',
    inside: 'Port Ghalib',
    outside: 'Outside',
    delivery: 'Delivery',
    free: 'Free',
    toAgree: 'To agree',
    total: 'Total',
    placeOrder: 'Place order',
    intoOven: 'Into the oven',
    inOven: 'In the oven…',
    back: 'Back to the toppings',
    footnote: 'Paid on arrival · cash or card',
    name: 'Your name',
    phone: 'Phone',
    location: 'Where exactly? Hotel, villa, yacht…',
    notes: 'A note for the kitchen (optional)',
    fill: 'Please fill in your name, phone and where to deliver.',
    failed: 'The order could not be sent, please try again.',
    timer: 'In the oven',
    yourRules: 'Your pizza. Your rules.',
    toppingsCount: (n: number) => `${n} topping${n === 1 ? '' : 's'}. Good choice.`,
    startAgain: 'Start again',
    doneTitle: 'Buon appetito.',
    doneSub: 'Your pizza is on its way.',
    doneText: (ref: string) => `Order ${ref} is with our pizzaioli. Pay on arrival, cash or card.`,
    arriving: 'Arriving',
    onItsWay: 'On its way!',
    order: 'Order',
    startLabel: 'START YOUR ORDER',
    ovenLabel: 'HOT FROM THE WOOD-FIRED OVEN',
    add: 'Add',
    remove: 'Remove',
  },
  it: {
    tagline: ['Stesa a mano. Cotta a legna.', 'Fatta a modo tuo.'],
    top: { closed: 'Inizia il tuo ordine', build: 'La tua pizza', done: "Fanne un'altra" },
    kicker: 'Il forno è acceso',
    headline: ['La tua pizza.', 'A modo tuo.'],
    intro: 'Scegli i tuoi ingredienti sul nostro impasto a lunga lievitazione. La cuociamo nel forno a legna e te la portiamo a Port Ghalib.',
    letsGo: 'Facciamo la pizza',
    deliveryTitle: 'Consegna a Port Ghalib',
    deliveryText: "Si paga all'arrivo, contanti o carta",
    hoursTitle: (open: string, last: string) => `Tutti i giorni, ${open}–${last}`,
    hoursText: 'Direttamente dal nostro forno',
    makeIt: 'Falla tua.',
    dragHint: 'Trascina un ingrediente sulla pizza. Oppure toccalo.',
    receiptKicker: 'Fatta a mano · Port Ghalib',
    receiptTitle: 'La tua pizza',
    reachYou: 'Dove la portiamo?',
    inside: 'Port Ghalib',
    outside: 'Fuori',
    delivery: 'Consegna',
    free: 'Gratis',
    toAgree: 'Da concordare',
    total: 'Totale',
    placeOrder: 'Ordina',
    intoOven: 'In forno',
    inOven: 'In forno…',
    back: 'Torna agli ingredienti',
    footnote: "Si paga all'arrivo · contanti o carta",
    name: 'Il tuo nome',
    phone: 'Telefono',
    location: 'Dove esattamente? Hotel, villa, yacht…',
    notes: 'Una nota per la cucina (facoltativa)',
    fill: 'Inserisci nome, telefono e luogo di consegna.',
    failed: "Non è stato possibile inviare l'ordine, riprova.",
    timer: 'In forno',
    yourRules: 'La tua pizza. Le tue regole.',
    toppingsCount: (n: number) => `${n} ingredient${n === 1 ? 'e' : 'i'}. Ottima scelta.`,
    startAgain: 'Ricomincia',
    doneTitle: 'Buon appetito.',
    doneSub: 'La tua pizza sta arrivando.',
    doneText: (ref: string) => `L'ordine ${ref} è nelle mani dei nostri pizzaioli. Si paga all'arrivo.`,
    arriving: 'In arrivo',
    onItsWay: 'Sta arrivando!',
    order: 'Ordine',
    startLabel: 'INIZIA IL TUO ORDINE',
    ovenLabel: 'CALDA DAL FORNO A LEGNA',
    add: 'Aggiungi',
    remove: 'Togli',
  },
};

function euro(value: number) {
  return `€${value.toFixed(2)}`;
}

function cairoTime(date: Date) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
}

function Piece({ piece, filter, landing }: { piece: PiecePlacement; filter?: string; landing?: boolean }) {
  return (
    <img
      src={piece.src}
      alt=""
      draggable={false}
      className={`${styles.piece} ${landing ? styles.pieceLanding : ''}`}
      style={
        {
          left: `${50 + piece.x}%`,
          top: `${50 + piece.y}%`,
          width: `${piece.size}%`,
          '--r': `${piece.rotate}deg`,
          '--sx': piece.flip ? -1 : 1,
          '--d': `${piece.delay}ms`,
          '--baked': filter,
        } as React.CSSProperties
      }
    />
  );
}

export default function PizzaBuilder({ hours }: { hours: { open: string; lastOrder: string } }) {
  const { language } = useLanguage();
  const t = COPY[language === 'it' ? 'it' : 'en'];

  const [stage, setStage] = useState<Stage>('closed');
  const [toppings, setToppings] = useState<ToppingId[]>([]);
  const [area, setArea] = useState<'inside' | 'outside'>('inside');
  const [form, setForm] = useState({ name: '', phone: '', location: '', notes: '' });
  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [bakeProgress, setBakeProgress] = useState(1);
  const [order, setOrder] = useState<{ ref: string; from: string; to: string } | null>(null);
  const [dragging, setDragging] = useState<ToppingId | null>(null);

  const sceneRef = useRef<HTMLDivElement>(null);
  const pizzaRef = useRef<HTMLDivElement>(null);
  const gloveRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const dragStart = useRef<{ id: ToppingId; x: number; y: number; moved: boolean } | null>(null);
  const [glovePose, setGlovePose] = useState<GlovePose>('open');

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const placements = useMemo(() => {
    const map = new Map<ToppingId, PiecePlacement[]>();
    for (const topping of TOPPINGS) map.set(topping.id, placeTopping(topping.id));
    return map;
  }, []);
  const heaps = useMemo(() => {
    const map = new Map<ToppingId, PiecePlacement[]>();
    for (const topping of TOPPINGS) map.set(topping.id, trayHeap(topping.id));
    return map;
  }, []);

  const chosen = TOPPINGS.filter((topping) => toppings.includes(topping.id));
  const total = customPizzaPrice(toppings);
  const lidOn = stage === 'closed' || stage === 'closing' || stage === 'done';
  const baked = stage === 'baking' || stage === 'closing' || stage === 'done';
  const building = stage === 'build' || stage === 'details';

  // ------------------------------------------------------------------------------------------
  // Steps
  // ------------------------------------------------------------------------------------------
  const openBox = () => {
    if (stage !== 'closed' && stage !== 'done') return;
    if (stage === 'done') {
      setToppings([]);
      setOrder(null);
    }
    setError(null);
    setStage('opening');
    later(() => setStage('build'), OPEN_MS);
  };

  const toggleTopping = (id: ToppingId, onlyAdd = false) => {
    if (!building) return;
    setToppings((current) => (current.includes(id) ? (onlyAdd ? current : current.filter((x) => x !== id)) : [...current, id]));
  };

  const placeOrder = () => {
    if (stage !== 'build') return;
    setError(null);
    setStage('details');
  };

  const missing = {
    name: !form.name.trim(),
    phone: form.phone.replace(/[^0-9]/g, '').length < 7,
    location: !form.location.trim(),
  };

  const submit = async () => {
    if (stage !== 'details' || sending) return;
    if (missing.name || missing.phone || missing.location) {
      setShowErrors(true);
      setError(t.fill);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          customer: { name: form.name.trim(), phone: form.phone.trim(), area, location: form.location.trim(), notes: form.notes.trim() },
          items: [{ id: CUSTOM_PIZZA_ID, quantity: 1, toppings }],
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { ref?: string; message?: string };
      if (!response.ok || !data.ref) {
        setError(data.message || t.failed);
        setSending(false);
        return;
      }
      const now = Date.now();
      setOrder({ ref: data.ref, from: cairoTime(new Date(now + 35 * 60000)), to: cairoTime(new Date(now + 45 * 60000)) });
      setSending(false);
      setStage('baking');
      setBakeProgress(1);
      const started = Date.now();
      const tick = window.setInterval(() => {
        const left = Math.max(0, 1 - (Date.now() - started) / BAKE_MS);
        setBakeProgress(left);
        if (left === 0) window.clearInterval(tick);
      }, 200);
      timers.current.push(tick);
      later(() => setStage('closing'), BAKE_MS + 300);
      later(() => setStage('done'), BAKE_MS + 300 + CLOSE_MS);
    } catch {
      setError(t.failed);
      setSending(false);
    }
  };

  // ------------------------------------------------------------------------------------------
  // Gloved hand (mouse only) and drag & drop from the trays
  // ------------------------------------------------------------------------------------------
  const moveHand = (x: number, y: number) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const box = scene.getBoundingClientRect();
    const px = x - box.left;
    const py = y - box.top;
    if (gloveRef.current) {
      gloveRef.current.style.transform = `translate(${px - 14}px, ${py - 6}px)`;
      gloveRef.current.style.opacity = '1'; // hidden until the mouse is on the scene
    }
    if (ghostRef.current) ghostRef.current.style.transform = `translate(${px - 50}px, ${py - 40}px) rotate(-8deg)`;
  };

  const onScenePointerMove = (event: React.PointerEvent) => {
    moveHand(event.clientX, event.clientY);
    if (dragStart.current || event.pointerType !== 'mouse') return;
    const target = event.target as HTMLElement;
    const pose: GlovePose = stage === 'done' ? 'ok' : target.closest('button, a, input, label, [data-tray]') ? 'point' : 'open';
    if (pose !== glovePose) setGlovePose(pose);
  };

  const overPizza = (x: number, y: number) => {
    const el = pizzaRef.current;
    if (!el) return false;
    const box = el.getBoundingClientRect();
    const r = box.width / 2;
    return Math.hypot(x - (box.left + r), y - (box.top + r)) < r * 1.05;
  };

  const onTrayPointerDown = (id: ToppingId) => (event: React.PointerEvent) => {
    if (!building) return;
    dragStart.current = { id, x: event.clientX, y: event.clientY, moved: false };
    const onMove = (e: PointerEvent) => {
      const start = dragStart.current;
      if (!start) return;
      moveHand(e.clientX, e.clientY);
      if (!start.moved && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8) {
        start.moved = true;
        setDragging(start.id);
        setGlovePose('grab');
      }
    };
    const onUp = (e: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      const start = dragStart.current;
      dragStart.current = null;
      setDragging(null);
      setGlovePose('open');
      if (!start) return;
      if (!start.moved) toggleTopping(start.id);
      else if (overPizza(e.clientX, e.clientY)) toggleTopping(start.id, true);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // ------------------------------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------------------------------
  const topLabel = stage === 'closed' ? t.top.closed : stage === 'done' ? t.top.done : t.top.build;

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div
          ref={sceneRef}
          className={`${styles.scene} ${dragging ? styles.isDragging : ''}`}
          onPointerMove={onScenePointerMove}
          onPointerLeave={() => {
            if (gloveRef.current) gloveRef.current.style.opacity = '0';
          }}
          data-stage={stage}
        >
          {/* Top bar */}
          <div className={styles.tagline}>
            <span>{t.tagline[0]}</span>
            <span>{t.tagline[1]}</span>
          </div>
          <button
            type="button"
            className={styles.topButton}
            onClick={() => {
              if (stage === 'closed' || stage === 'done') openBox();
              else document.getElementById('pizza-receipt')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            {topLabel} <span aria-hidden="true">↗</span>
          </button>

          {/* Trays */}
          <section className={`${styles.trays} ${building ? styles.traysIn : ''}`} aria-label={t.makeIt}>
            <h2 className={styles.traysTitle}>{t.makeIt}</h2>
            <p className={styles.traysHint}>{t.dragHint}</p>
            <div className={styles.trayGrid}>
              {TOPPINGS.map((topping) => {
                const added = toppings.includes(topping.id);
                return (
                  <div key={topping.id} className={styles.trayCell}>
                    <button
                      type="button"
                      data-tray
                      className={`${styles.tray} ${added ? styles.trayAdded : ''} ${dragging === topping.id ? styles.trayLifted : ''}`}
                      onPointerDown={onTrayPointerDown(topping.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleTopping(topping.id);
                        }
                      }}
                      aria-pressed={added}
                      aria-label={`${added ? t.remove : t.add} ${topping.name[language === 'it' ? 'it' : 'en']}`}
                      disabled={!building}
                    >
                      <span className={styles.trayHeap}>
                        {heaps.get(topping.id)!.map((piece) => (
                          <Piece key={piece.key} piece={piece} />
                        ))}
                      </span>
                      <span className={styles.trayBadge} aria-hidden="true">{added ? '✓' : '+'}</span>
                    </button>
                    <span className={styles.trayLabel}>
                      {topping.name[language === 'it' ? 'it' : 'en']} <em>+ {euro(topping.price)}</em>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* The box */}
          <div className={styles.boxWrap}>
            <div className={`${styles.box} ${lidOn ? styles.boxClosed : styles.boxOpen}`}>
              <img src="/pizza-builder/box-open.webp" alt="" className={styles.boxBase} draggable={false} />
              <div ref={pizzaRef} className={`${styles.pizza} ${baked ? styles.pizzaBaked : ''}`}>
                <img src="/pizza-builder/base-raw.webp" alt="" className={styles.base} draggable={false} />
                <img src="/pizza-builder/base-baked.webp" alt="" className={`${styles.base} ${styles.baseBaked}`} draggable={false} />
                {chosen.map((topping) =>
                  placements.get(topping.id)!.map((piece) => (
                    <Piece key={piece.key} piece={piece} filter={topping.baked} landing />
                  ))
                )}
                {dragging && <div className={styles.dropRing} aria-hidden="true" />}
              </div>
              <div className={`${styles.lid} ${lidOn ? styles.lidOn : styles.lidOff} ${stage === 'closing' ? styles.lidDropping : ''}`}>
                <img src="/pizza-builder/box-lid.webp" alt="" className={styles.lidBoard} draggable={false} />
                <div className={styles.lidPrint}>
                  <LidPrint startLabel={t.startLabel} ovenLabel={t.ovenLabel} />
                </div>
                {stage === 'closed' && (
                  <button type="button" className={styles.lidStart} onClick={openBox} aria-label={t.top.closed} />
                )}
                {stage === 'done' && order && (
                  <div className={styles.sticker}>
                    <span>{t.order} {order.ref}</span>
                    <strong>{t.onItsWay}</strong>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.boxBar}>
              {toppings.length ? t.toppingsCount(toppings.length) : t.yourRules}
              {building && toppings.length > 0 && (
                <button type="button" className={styles.linkButton} onClick={() => setToppings([])}>
                  {t.startAgain}
                </button>
              )}
            </div>
          </div>

          {/* Kitchen timer */}
          <div className={`${styles.timer} ${stage === 'baking' ? styles.timerIn : ''}`} aria-live="polite">
            <div className={styles.timerDial}>
              <OvenTimer progress={bakeProgress} />
            </div>
            <span className={styles.timerLabel}>{t.timer}</span>
            <span className={styles.timerCount}>00:{String(Math.ceil((bakeProgress * BAKE_MS) / 1000)).padStart(2, '0')}</span>
          </div>

          {/* Right column: intro, receipt or confirmation */}
          <aside className={styles.side}>
            {stage === 'closed' || stage === 'opening' ? (
              <div className={`${styles.card} ${styles.intro} ${stage === 'opening' ? styles.cardOut : ''}`}>
                <span className={styles.kicker}><i /> {t.kicker}</span>
                <h1 className={styles.headline}>
                  {t.headline[0]}
                  <br />
                  <em>{t.headline[1]}</em>
                </h1>
                <p className={styles.introText}>{t.intro}</p>
                <button type="button" className={styles.primary} onClick={openBox}>
                  {t.letsGo} <span aria-hidden="true">↗</span>
                </button>
                <dl className={styles.facts}>
                  <div>
                    <dt>{t.deliveryTitle}</dt>
                    <dd>{t.deliveryText}</dd>
                  </div>
                  <div>
                    <dt>{t.hoursTitle(hours.open, hours.lastOrder)}</dt>
                    <dd>{t.hoursText}</dd>
                  </div>
                </dl>
              </div>
            ) : stage === 'done' && order ? (
              <div className={`${styles.card} ${styles.doneCard}`}>
                <span className={styles.doneCheck} aria-hidden="true">✓</span>
                <h2 className={styles.headline}>
                  {t.doneTitle}
                  <br />
                  <em>{t.doneSub}</em>
                </h2>
                <p className={styles.introText}>{t.doneText(order.ref)}</p>
                <p className={styles.arriving}>
                  {t.arriving} <strong>{order.from}–{order.to}</strong>
                </p>
                <button type="button" className={styles.primary} onClick={openBox}>
                  {t.top.done} <span aria-hidden="true">↗</span>
                </button>
              </div>
            ) : (
              <div id="pizza-receipt" className={`${styles.card} ${styles.receipt}`}>
                <img src="/logo/logo-01.svg" alt="Casa Italia" className={styles.receiptLogo} />
                <span className={styles.receiptKicker}>{t.receiptKicker}</span>
                <h2 className={styles.receiptTitle}>{t.receiptTitle}</h2>
                <div className={styles.rule} />
                <div className={styles.line}>
                  <span>{PIZZA_BASE.name[language === 'it' ? 'it' : 'en']}</span>
                  <span>{euro(PIZZA_BASE.price)}</span>
                </div>
                <div className={styles.lineDetail}>{PIZZA_BASE.detail[language === 'it' ? 'it' : 'en']}</div>
                {chosen.map((topping) => (
                  <div key={topping.id} className={`${styles.line} ${styles.lineIn}`}>
                    <span>{topping.name[language === 'it' ? 'it' : 'en']}</span>
                    <span>{euro(topping.price)}</span>
                  </div>
                ))}
                <div className={styles.rule} />

                {stage === 'details' || stage === 'baking' || stage === 'closing' ? (
                  <form
                    className={styles.form}
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit();
                    }}
                  >
                    <input
                      className={showErrors && missing.name ? styles.invalid : ''}
                      placeholder={t.name}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      disabled={stage !== 'details'}
                    />
                    <input
                      className={showErrors && missing.phone ? styles.invalid : ''}
                      placeholder={t.phone}
                      autoComplete="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      disabled={stage !== 'details'}
                    />
                    <input
                      className={showErrors && missing.location ? styles.invalid : ''}
                      placeholder={t.location}
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      disabled={stage !== 'details'}
                    />
                    <input
                      placeholder={t.notes}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      disabled={stage !== 'details'}
                    />
                    <button type="submit" className={styles.primary} disabled={stage !== 'details' || sending}>
                      {stage === 'details' && !sending ? t.intoOven : t.inOven} <span aria-hidden="true">↗</span>
                    </button>
                    {stage === 'details' && (
                      <button type="button" className={styles.linkButton} onClick={() => setStage('build')}>
                        ‹ {t.back}
                      </button>
                    )}
                  </form>
                ) : (
                  <>
                    <div className={styles.reach}>{t.reachYou}</div>
                    <div className={styles.radios}>
                      {(['inside', 'outside'] as const).map((value) => (
                        <label key={value} className={styles.radio}>
                          <input type="radio" name="area" checked={area === value} onChange={() => setArea(value)} />
                          <span>{value === 'inside' ? t.inside : t.outside}</span>
                        </label>
                      ))}
                    </div>
                    <div className={styles.line}>
                      <span>{t.delivery}</span>
                      <span>{area === 'inside' ? t.free : t.toAgree}</span>
                    </div>
                  </>
                )}

                <div className={styles.totalRow}>
                  <span>{t.total}</span>
                  <strong>{euro(total)}</strong>
                </div>
                {stage === 'build' && (
                  <button type="button" className={styles.primary} onClick={placeOrder}>
                    {t.placeOrder} <span aria-hidden="true">↗</span>
                  </button>
                )}
                {error && <p className={styles.error} role="alert">{error}</p>}
                <p className={styles.footnote}>{t.footnote}</p>
                <Barcode seed={order?.ref || toppings.join('') || 'casa-italia'} />
              </div>
            )}
          </aside>

          {/* Cloth corner, gloved hand, dragged handful */}
          <div className={styles.cloth} aria-hidden="true" />
          {dragging && (
            <div ref={ghostRef} className={styles.ghost} aria-hidden="true">
              {heaps.get(dragging)!.slice(0, 6).map((piece) => (
                <Piece key={piece.key} piece={piece} />
              ))}
            </div>
          )}
          <div ref={gloveRef} className={styles.glove} aria-hidden="true">
            <Glove pose={stage === 'done' && glovePose !== 'point' ? 'ok' : glovePose} />
          </div>
        </div>
      </main>
    </div>
  );
}
