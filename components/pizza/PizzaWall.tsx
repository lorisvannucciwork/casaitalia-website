'use client';
/* eslint-disable @next/next/no-img-element -- small transparent cut-outs and already-sized images */

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, UtensilsCrossed } from 'lucide-react';
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
    title: 'La Bacheca',
    titleSmall: 'dei Pizzaioli',
    create: 'Invent yours',
    surprise: 'Surprise me',
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
    title: 'La Bacheca',
    titleSmall: 'dei Pizzaioli',
    create: 'Inventa la tua',
    surprise: 'Sorprendimi',
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

/** Our wood-fired oven, silent and looping behind the hero. Stays on its still image for reduced motion. */
function OvenVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // React does not write this attribute, and browsers only autoplay muted videos
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.play().catch(() => {
      // autoplay refused (battery saver…): the poster stays
    });
  }, []);
  return (
    <video
      ref={ref}
      className={styles.ovenVideo}
      poster="/videos/oven-poster.webp"
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
    >
      <source src="/videos/oven-720.mp4" type="video/mp4" media="(max-width: 640px)" />
      <source src="/videos/oven-1080.mp4" type="video/mp4" />
    </video>
  );
}

/** The topping filter, in the same dropdown style as the menu's categories and the language selector. */
function ToppingSelect({
  value,
  language,
  allLabel,
  onChange,
}: {
  value: ToppingId | null;
  language: 'en' | 'it';
  allLabel: string;
  onChange: (value: ToppingId | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const current = TOPPINGS.find((topping) => topping.id === value);
  const options = [null, ...TOPPINGS];

  return (
    <div ref={ref} className="relative z-40 w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full sm:w-60 flex items-center justify-between gap-3 px-4 py-2.5 bg-white text-[#1a1816] border border-[#ba935a]/40 shadow-sm hover:border-[#ba935a] transition-colors text-sm cursor-pointer"
      >
        <span className="flex items-center gap-2.5 font-bold tracking-wide">
          {current ? (
            <img src={pieceSrc(current, 0)} alt="" className="w-5 h-5 object-contain" />
          ) : (
            <UtensilsCrossed className="w-4 h-4 text-[#ba935a]" />
          )}
          {current ? current.name[language] : allLabel}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#ba935a] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 w-full sm:w-60 mt-2 py-1 bg-[#faf7f2] border border-[#ba935a]/40 shadow-xl overflow-hidden animate-fade-in z-50"
        >
          {options.map((topping) => {
            const selected = (topping?.id ?? null) === value;
            return (
              <button
                key={topping?.id ?? 'all'}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(topping?.id ?? null);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                  selected ? 'bg-[#ba935a]/15 text-[#1a1816]' : 'text-[#6e675e] hover:bg-[#ba935a]/10 hover:text-[#1a1816]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {topping ? (
                    <img src={pieceSrc(topping, 0)} alt="" className="w-5 h-5 object-contain" />
                  ) : (
                    <UtensilsCrossed className="w-5 h-4 text-[#ba935a]" />
                  )}
                  {topping ? topping.name[language] : allLabel}
                </span>
                {selected && <Check className="w-3.5 h-3.5 text-[#ba935a]" />}
              </button>
            );
          })}
        </div>
      )}
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
          <OvenVideo />
          <div className={styles.ovenScrim} aria-hidden="true" />
          <div className={styles.sparks} aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${(i * 0.73) % 6}s`, '--t': `${5 + (i % 5)}s` } as React.CSSProperties} />
            ))}
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              {t.title}
              <span>{t.titleSmall}</span>
            </h1>
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
                <img src="/pizza-builder/casa-box-open.webp" alt="" />
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
                <ToppingSelect
                  value={filter}
                  language={language}
                  allLabel={t.all}
                  onChange={(value) => {
                    setFilter(value);
                    setVisible(PAGE_SIZE);
                  }}
                />
              </div>

              {notice && <p className={styles.notice} role="alert">{notice}</p>}
              {shown.length === 0 && <p className={styles.noMatch}>{t.noMatch}</p>}

              <div className={styles.grid}>
                {shown.slice(0, visible).map((pizza, index) => (
                  <article key={pizza.id} className={styles.card} style={{ '--tilt': `${[-1.6, 1.1, -0.7, 1.7, -1.1, 0.8][index % 6]}deg` } as React.CSSProperties}>
                    <button type="button" className={styles.box} onClick={() => setSpotlight(pizza)} aria-label={pizza.name}>
                      <img src="/pizza-builder/casa-box-open.webp" alt="" className={styles.boxImage} loading="lazy" />
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
