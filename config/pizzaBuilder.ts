/**
 * "Create your own pizza": the base and the toppings, with their prices.
 *
 * Shared by the page and by the order API: the API recomputes the price of a custom pizza from
 * this list (never from the browser). Change a price or a name here, then deploy.
 * The restaurant's Odoo receives the pizza as the product whose "Website Item Id" is
 * CUSTOM_PIZZA_ID, with the chosen toppings in the kitchen note of the line.
 */

export const CUSTOM_PIZZA_ID = 'create-your-own-pizza';

export const PIZZA_BASE = {
  name: { en: 'Pizza base · dough & tomato', it: 'Base pizza · impasto e pomodoro' },
  detail: { en: 'Slow-proofed dough, San Marzano tomato', it: 'Impasto a lunga lievitazione, pomodoro San Marzano' },
  price: 7,
};

export type ToppingId = 'mozzarella' | 'salame' | 'mushroom' | 'basil' | 'olive' | 'onion';

export interface Topping {
  id: ToppingId;
  name: { en: string; it: string };
  price: number;
  /** Cut-out pieces in /public/pizza-builder/toppings/<id>-NN.webp */
  pieces: number;
  /** Size of one piece on the pizza, as a share of the pizza's width */
  size: number;
  /** How the pieces are laid out: rings of [count, radius (share of the sauce radius)] */
  rings: [number, number][];
  /** Turn of the whole pattern, so the toppings interleave instead of stacking */
  offset: number;
  /** Look once baked (CSS filter) */
  baked: string;
}

export const TOPPINGS: Topping[] = [
  {
    id: 'mozzarella',
    name: { en: 'Mozzarella', it: 'Mozzarella' },
    price: 2,
    pieces: 12,
    size: 0.15,
    rings: [[1, 0], [6, 0.42], [11, 0.78]],
    offset: 0,
    baked: 'sepia(0.3) saturate(1.25) brightness(1.03) blur(0.4px)',
  },
  {
    id: 'salame',
    name: { en: 'Salame', it: 'Salame' },
    price: 2.5,
    pieces: 12,
    size: 0.13,
    rings: [[5, 0.3], [10, 0.7]],
    offset: 0.3,
    baked: 'brightness(0.82) saturate(1.3) contrast(1.05)',
  },
  {
    id: 'mushroom',
    name: { en: 'Mushrooms', it: 'Funghi' },
    price: 1.5,
    pieces: 12,
    size: 0.115,
    rings: [[4, 0.22], [9, 0.6], [12, 0.86]],
    offset: 0.55,
    baked: 'sepia(0.45) brightness(0.86) saturate(1.1)',
  },
  {
    id: 'basil',
    name: { en: 'Basil', it: 'Basilico' },
    price: 0.5,
    pieces: 1,
    size: 0.13,
    rings: [[5, 0.16], [7, 0.55]],
    offset: 0.15,
    baked: 'brightness(0.62) saturate(0.85) contrast(1.1)',
  },
  {
    id: 'olive',
    name: { en: 'Black olives', it: 'Olive nere' },
    price: 1.5,
    pieces: 10,
    size: 0.055,
    rings: [[6, 0.35], [10, 0.66], [14, 0.88]],
    offset: 0.7,
    baked: 'brightness(0.9)',
  },
  {
    id: 'onion',
    name: { en: 'Red onion', it: 'Cipolla rossa' },
    price: 1,
    pieces: 10,
    size: 0.13,
    rings: [[3, 0.25], [7, 0.62]],
    offset: 0.9,
    baked: 'sepia(0.35) brightness(0.9) saturate(1.1)',
  },
];

export const TOPPING_IDS = TOPPINGS.map((t) => t.id);

/** Price of a pizza with these toppings (unknown or repeated toppings are ignored). */
export function customPizzaPrice(toppings: string[]): number {
  const chosen = new Set(toppings);
  const extras = TOPPINGS.filter((t) => chosen.has(t.id)).reduce((sum, t) => sum + t.price, 0);
  return Math.round((PIZZA_BASE.price + extras) * 100) / 100;
}
