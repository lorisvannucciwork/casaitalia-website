'use client';
/* eslint-disable @next/next/no-img-element -- small transparent cut-outs and already-sized images */

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Footer, Navbar } from '@/components/layout';
import { TOPPINGS, type ToppingId } from '@/config/pizzaBuilder';
import type { WallPizza } from '@/lib/pizzaWallShared';
import { PizzaArtwork } from './PizzaArtwork';
import { pieceSrc } from './pizzaLayout';
import styles from './PizzaWall.module.css';

/**
 * La Bacheca dei Pizzaioli: every pizza the guests named and saved. A night kitchen: the three
 * best sit in the light of the oven; below, on the floured counter, each pizza waits in its box
 * with its kitchen ticket pinned on it, to be rated or ordered.
 */

export type WallSort = 'top' | 'new' | 'popular';

const PAGE_SIZE = 12;
const SPIN_MS = 1900;
const VOTES_KEY = 'casa-pizza-votes';
const VOTER_KEY = 'casa-pizza-voter';

const COPY = {
  en: {
    kicker: 'After the last order, the oven stays lit for these',
    title: 'La Bacheca',
    titleSmall: 'dei Pizzaioli',
    lead: 'Every pizza here was invented by a guest of Casa Italia. Rate the ones you would eat, order the one you cannot stop thinking about.',
    create: 'Invent yours',
    surprise: 'Surprise me',
    pizzas: 'pizzas invented',
    ratings: 'ratings',
    orders: 'orders',
    podium: 'The podium',
    top: 'Top rated',
    newest: 'Newest',
    popular: 'Most ordered',
    all: 'Everything',
    by: 'by',
    anonymous: 'an anonymous pizzaiolo',
    tomato: 'Just tomato',
    noRatings: 'Be the first to rate',
    ratingsCount: (n: number) => `${n} rating${n === 1 ? '' : 's'}`,
    ordersCount: (n: number) => `ordered ${n} time${n === 1 ? '' : 's'}`,
    order: 'Order this pizza',
    rate: (n: number) => `Rate ${n} out of 5`,
    more: 'Show more pizzas',
    emptyTitle: 'The wall is waiting for its first pizza.',
    emptyText: 'Build a pizza, give it a name, and it will hang here with your name on it for everyone to see.',
    noMatch: 'No pizza with this topping yet. Maybe you should invent it.',
    spinning: 'The pizzaiolo is choosing…',
    close: 'Close',
    rateError: 'Your rating could not be saved, please try again.',
  },
  it: {
    kicker: "Dopo l'ultimo ordine, il forno resta acceso per queste",
    title: 'La Bacheca',
    titleSmall: 'dei Pizzaioli',
    lead: "Ogni pizza qui è stata inventata da un ospite di Casa Italia. Vota quelle che mangeresti, ordina quella a cui non smetti di pensare.",
    create: 'Inventa la tua',
    surprise: 'Sorprendimi',
    pizzas: 'pizze inventate',
    ratings: 'voti',
    orders: 'ordini',
    podium: 'Il podio',
    top: 'Più votate',
    newest: 'Le ultime',
    popular: 'Più ordinate',
    all: 'Tutte',
    by: 'di',
    anonymous: 'un pizzaiolo anonimo',
    tomato: 'Solo pomodoro',
    noRatings: 'Vota per primo',
    ratingsCount: (n: number) => `${n} vot${n === 1 ? 'o' : 'i'}`,
    ordersCount: (n: number) => `ordinata ${n} volt${n === 1 ? 'a' : 'e'}`,
    order: 'Ordina questa pizza',
    rate: (n: number) => `Vota ${n} su 5`,
    more: 'Mostra altre pizze',
    emptyTitle: 'La bacheca aspetta la sua prima pizza.',
    emptyText: 'Crea una pizza, dalle un nome e resterà appesa qui con il tuo nome, davanti a tutti.',
    noMatch: 'Ancora nessuna pizza con questo ingrediente. Forse dovresti inventarla tu.',
    spinning: 'Il pizzaiolo sta scegliendo…',
    close: 'Chiudi',
    rateError: 'Non è stato possibile salvare il voto, riprova.',
  },
};

// ---------------------------------------------------------------------------------------------
// The guest's own ratings, remembered by this browser
// ---------------------------------------------------------------------------------------------
type Votes = Record<string, number>;
const NO_VOTES: Votes = {};
let votesCache: Votes | null = null;
const votesListeners = new Set<() => void>();

function readVotes(): Votes {
  if (votesCache) return votesCache;
  try {
    votesCache = JSON.parse(localStorage.getItem(VOTES_KEY) || '{}') as Votes;
  } catch {
    votesCache = {};
  }
  return votesCache;
}

function rememberVote(id: string, stars: number) {
  votesCache = { ...readVotes(), [id]: stars };
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify(votesCache));
  } catch {
    // private window: the rating still counts, it is just not remembered here
  }
  votesListeners.forEach((listener) => listener());
}

function subscribeVotes(listener: () => void) {
  votesListeners.add(listener);
  return () => votesListeners.delete(listener);
}

function voterId(): string {
  try {
    let id = localStorage.getItem(VOTER_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VOTER_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Few ratings should not beat many: each pizza starts from two imaginary 3.5-star ratings. */
function ratingScore(pizza: WallPizza) {
  return (pizza.ratingAvg * pizza.ratingCount + 3.5 * 2) / (pizza.ratingCount + 2);
}

function sorted(pizzas: WallPizza[], sort: WallSort) {
  const list = [...pizzas];
  if (sort === 'top') list.sort((a, b) => ratingScore(b) - ratingScore(a) || b.createdAt.localeCompare(a.createdAt));
  if (sort === 'new') list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (sort === 'popular') list.sort((a, b) => b.orderCount - a.orderCount || ratingScore(b) - ratingScore(a));
  return list;
}

// ---------------------------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------------------------
function Stars({ pizza, onRate, labels }: { pizza: WallPizza; onRate: (stars: number) => void; labels: (n: number) => string }) {
  const votes = useSyncExternalStore(subscribeVotes, readVotes, () => NO_VOTES);
  const mine = votes[pizza.id] || 0;
  const [hover, setHover] = useState(0);
  const lit = hover || mine || Math.round(pizza.ratingAvg);
  return (
    <div className={styles.stars} onPointerLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={labels(n)}
          aria-pressed={mine === n}
          className={`${styles.star} ${n <= lit ? styles.starOn : ''} ${mine && n <= mine ? styles.starMine : ''}`}
          onPointerEnter={() => setHover(n)}
          onClick={() => onRate(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function toppingList(pizza: WallPizza, language: 'en' | 'it', fallback: string) {
  const names = TOPPINGS.filter((t) => pizza.toppings.includes(t.id)).map((t) => t.name[language]);
  return names.length ? names.join(' · ') : fallback;
}

// ---------------------------------------------------------------------------------------------
// The wall
// ---------------------------------------------------------------------------------------------
export default function PizzaWall({ initialPizzas, initialSort }: { initialPizzas: WallPizza[]; initialSort: WallSort }) {
  const { language: rawLanguage } = useLanguage();
  const language = rawLanguage === 'it' ? 'it' : 'en';
  const t = COPY[language];

  const [pizzas, setPizzas] = useState(initialPizzas);
  const [sort, setSort] = useState<WallSort>(initialSort);
  const [filter, setFilter] = useState<ToppingId | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [spotlight, setSpotlight] = useState<WallPizza | null>(null);
  const [spinName, setSpinName] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const spinTimers = useRef<number[]>([]);

  useEffect(() => () => spinTimers.current.forEach((id) => window.clearTimeout(id)), []);
  useEffect(() => {
    if (!spotlight) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSpotlight(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [spotlight]);

  // The order is set when the page opens or the sort changes, not at each rating: a card must not
  // jump away from under the finger of who just rated it
  const [order, setOrder] = useState(() => sorted(initialPizzas, initialSort).map((pizza) => pizza.id));
  const [podiumOrder] = useState(() => sorted(initialPizzas, 'top').slice(0, 3).map((pizza) => pizza.id));
  const byId = useMemo(() => new Map(pizzas.map((pizza) => [pizza.id, pizza])), [pizzas]);
  const podium = podiumOrder.flatMap((id) => byId.get(id) ?? []);
  const shown = order.flatMap((id) => byId.get(id) ?? []).filter((pizza) => !filter || pizza.toppings.includes(filter));
  const totals = useMemo(
    () => ({
      ratings: pizzas.reduce((sum, p) => sum + p.ratingCount, 0),
      orders: pizzas.reduce((sum, p) => sum + p.orderCount, 0),
    }),
    [pizzas]
  );

  const rate = async (pizza: WallPizza, stars: number) => {
    const previous = readVotes()[pizza.id];
    rememberVote(pizza.id, stars);
    setNotice(null);
    try {
      const response = await fetch(`/api/pizzas/${pizza.id}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars, voter: voterId() }),
      });
      const data = (await response.json().catch(() => ({}))) as { ratingAvg?: number; ratingCount?: number; message?: string };
      if (!response.ok) throw new Error(data.message);
      const update = (p: WallPizza) =>
        p.id === pizza.id ? { ...p, ratingAvg: data.ratingAvg ?? p.ratingAvg, ratingCount: data.ratingCount ?? p.ratingCount } : p;
      setPizzas((list) => list.map(update));
      setSpotlight((current) => (current ? update(current) : current));
    } catch {
      rememberVote(pizza.id, previous || 0);
      setNotice(t.rateError);
    }
  };

  const surprise = () => {
    if (!pizzas.length || spinName) return;
    const winner = pizzas[Math.floor(Math.random() * pizzas.length)];
    setSpotlight(winner);
    // the names flick past, slower and slower, then the winner stays
    const steps = 14;
    for (let i = 0; i < steps; i++) {
      const at = SPIN_MS * Math.pow(i / steps, 2);
      spinTimers.current.push(window.setTimeout(() => setSpinName(pizzas[Math.floor(Math.random() * pizzas.length)].name), at));
    }
    spinTimers.current.push(window.setTimeout(() => setSpinName(null), SPIN_MS));
  };

  const closeSpotlight = () => {
    spinTimers.current.forEach((id) => window.clearTimeout(id));
    spinTimers.current = [];
    setSpinName(null);
    setSpotlight(null);
  };

  const sorts: { id: WallSort; label: string }[] = [
    { id: 'top', label: t.top },
    { id: 'new', label: t.newest },
    { id: 'popular', label: t.popular },
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {/* The oven */}
        <section className={styles.oven}>
          <div className={styles.arch} aria-hidden="true">
            <div className={styles.fire} />
          </div>
          <div className={styles.sparks} aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${(i * 0.73) % 6}s`, '--t': `${5 + (i % 5)}s` } as React.CSSProperties} />
            ))}
          </div>
          <div className={styles.heroText}>
            <p className={styles.kicker}>{t.kicker}</p>
            <h1 className={styles.title}>
              {t.title}
              <span>{t.titleSmall}</span>
            </h1>
            <p className={styles.lead}>{t.lead}</p>
            <div className={styles.heroActions}>
              <Link href="/create-your-pizza" className={styles.primary}>
                {t.create} <span aria-hidden="true">↗</span>
              </Link>
              {pizzas.length > 1 && (
                <button type="button" className={styles.ghost} onClick={surprise}>
                  {t.surprise}
                </button>
              )}
            </div>
            {pizzas.length > 0 && (
              <dl className={styles.stats}>
                <div>
                  <dd>{pizzas.length}</dd>
                  <dt>{t.pizzas}</dt>
                </div>
                <div>
                  <dd>{totals.ratings}</dd>
                  <dt>{t.ratings}</dt>
                </div>
                <div>
                  <dd>{totals.orders}</dd>
                  <dt>{t.orders}</dt>
                </div>
              </dl>
            )}
          </div>

          {podium.length > 0 && (
            <div className={styles.podium} aria-label={t.podium}>
              {podium.map((pizza, index) => (
                <button
                  key={pizza.id}
                  type="button"
                  className={`${styles.podiumPlace} ${styles[`place${index + 1}`]}`}
                  onClick={() => setSpotlight(pizza)}
                >
                  <span className={styles.medal}>{index + 1}</span>
                  <span className={styles.podiumPizza}>
                    <PizzaArtwork toppings={pizza.toppings} />
                  </span>
                  <span className={styles.podiumName}>{pizza.name}</span>
                  <span className={styles.podiumScore}>
                    {pizza.ratingCount ? `★ ${pizza.ratingAvg.toFixed(1)} · ${t.ratingsCount(pizza.ratingCount)}` : t.noRatings}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* The counter */}
        <section className={styles.counter}>
          {pizzas.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyBox}>
                <img src="/pizza-builder/box-open.webp" alt="" />
              </div>
              <h2>{t.emptyTitle}</h2>
              <p>{t.emptyText}</p>
              <Link href="/create-your-pizza" className={styles.primary}>
                {t.create} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.controls}>
                <div className={styles.tabs} role="tablist">
                  {sorts.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={sort === item.id}
                      className={`${styles.tab} ${sort === item.id ? styles.tabOn : ''}`}
                      onClick={() => {
                        setSort(item.id);
                        setOrder(sorted(pizzas, item.id).map((pizza) => pizza.id));
                        setVisible(PAGE_SIZE);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className={styles.chips}>
                  <button
                    type="button"
                    className={`${styles.chip} ${!filter ? styles.chipOn : ''}`}
                    onClick={() => setFilter(null)}
                  >
                    {t.all}
                  </button>
                  {TOPPINGS.map((topping) => (
                    <button
                      key={topping.id}
                      type="button"
                      className={`${styles.chip} ${filter === topping.id ? styles.chipOn : ''}`}
                      onClick={() => {
                        setFilter(filter === topping.id ? null : topping.id);
                        setVisible(PAGE_SIZE);
                      }}
                    >
                      <img src={pieceSrc(topping, 0)} alt="" />
                      {topping.name[language]}
                    </button>
                  ))}
                </div>
              </div>

              {notice && <p className={styles.notice} role="alert">{notice}</p>}
              {shown.length === 0 && <p className={styles.noMatch}>{t.noMatch}</p>}

              <div className={styles.grid}>
                {shown.slice(0, visible).map((pizza, index) => (
                  <article key={pizza.id} className={styles.card} style={{ '--tilt': `${[-1.6, 1.1, -0.7, 1.7, -1.1, 0.8][index % 6]}deg` } as React.CSSProperties}>
                    <button type="button" className={styles.box} onClick={() => setSpotlight(pizza)} aria-label={pizza.name}>
                      <img src="/pizza-builder/box-open.webp" alt="" className={styles.boxImage} loading="lazy" />
                      <span className={styles.boxPizza}>
                        <PizzaArtwork toppings={pizza.toppings} />
                      </span>
                    </button>
                    <div className={styles.ticket}>
                      <span className={styles.pin} aria-hidden="true" />
                      <h2 className={styles.ticketName}>{pizza.name}</h2>
                      <p className={styles.ticketBy}>
                        {t.by} {pizza.creator || t.anonymous}
                      </p>
                      <p className={styles.ticketToppings}>{toppingList(pizza, language, t.tomato)}</p>
                      <div className={styles.ticketRating}>
                        <Stars pizza={pizza} labels={t.rate} onRate={(stars) => rate(pizza, stars)} />
                        <span>{pizza.ratingCount ? `${pizza.ratingAvg.toFixed(1)} · ${t.ratingsCount(pizza.ratingCount)}` : t.noRatings}</span>
                      </div>
                      <div className={styles.ticketFoot}>
                        <strong>€{pizza.price.toFixed(2)}</strong>
                        {pizza.orderCount > 0 && <span>{t.ordersCount(pizza.orderCount)}</span>}
                      </div>
                      <Link href={`/create-your-pizza?pizza=${pizza.id}`} className={styles.orderButton}>
                        {t.order} <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {shown.length > visible && (
                <div className={styles.moreRow}>
                  <button type="button" className={styles.more} onClick={() => setVisible(visible + PAGE_SIZE)}>
                    {t.more}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />

      {/* One pizza, up close */}
      {spotlight && (
        <div className={styles.spotlight} role="dialog" aria-modal="true" aria-label={spotlight.name} onClick={closeSpotlight}>
          <div className={styles.spotlightInner} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.close} onClick={closeSpotlight} aria-label={t.close}>
              ×
            </button>
            <div className={`${styles.spotlightPizza} ${spinName ? styles.spinning : styles.settled}`}>
              <PizzaArtwork toppings={spotlight.toppings} />
            </div>
            {spinName ? (
              <div className={styles.spinText}>
                <p>{t.spinning}</p>
                <h2>{spinName}</h2>
              </div>
            ) : (
              <div className={styles.spotlightText}>
                <h2>{spotlight.name}</h2>
                <p className={styles.spotlightBy}>
                  {t.by} {spotlight.creator || t.anonymous}
                </p>
                <p className={styles.spotlightToppings}>{toppingList(spotlight, language, t.tomato)}</p>
                <div className={styles.spotlightRating}>
                  <Stars pizza={spotlight} labels={t.rate} onRate={(stars) => rate(spotlight, stars)} />
                  <span>{spotlight.ratingCount ? `${spotlight.ratingAvg.toFixed(1)} · ${t.ratingsCount(spotlight.ratingCount)}` : t.noRatings}</span>
                </div>
                <Link href={`/create-your-pizza?pizza=${spotlight.id}`} className={styles.primary}>
                  {t.order} · €{spotlight.price.toFixed(2)} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
