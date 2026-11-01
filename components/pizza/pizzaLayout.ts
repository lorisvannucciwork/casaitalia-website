import { TOPPINGS, type Topping, type ToppingId } from '@/config/pizzaBuilder';

/** Radius of the sauce (where toppings go), as a share of the pizza image's width. */
const SAUCE_RADIUS = 0.36;

export interface PiecePlacement {
  key: string;
  src: string;
  /** Centre of the piece from the pizza's centre, in % of the pizza's width */
  x: number;
  y: number;
  /** Width of the piece in % of the pizza's width */
  size: number;
  rotate: number;
  flip: boolean;
  /** Order in which the pieces land */
  delay: number;
}

/** Small seeded generator: the same pizza is always drawn the same way. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pieceSrc(topping: Topping, variant: number): string {
  const n = (variant % topping.pieces) + 1;
  return `/pizza-builder/toppings/${topping.id}-${String(n).padStart(2, '0')}.webp`;
}

/** Where each piece of a topping lands: rings around the centre, a little irregular. */
export function placeTopping(id: ToppingId): PiecePlacement[] {
  const index = TOPPINGS.findIndex((t) => t.id === id);
  const topping = TOPPINGS[index];
  const random = seeded(1000 + index * 97);
  const pieces: PiecePlacement[] = [];
  let n = 0;
  topping.rings.forEach(([count, radius], ring) => {
    for (let k = 0; k < count; k++) {
      const angle = ((k / count) + topping.offset + ring * 0.37) * Math.PI * 2 + (random() - 0.5) * 0.35;
      const r = radius * SAUCE_RADIUS * (count === 1 ? 1 : 1 + (random() - 0.5) * 0.14);
      const scale = 0.88 + random() * 0.24;
      pieces.push({
        key: `${id}-${n}`,
        src: pieceSrc(topping, n + ring * 3),
        x: Math.cos(angle) * r * 100,
        y: Math.sin(angle) * r * 100,
        size: topping.size * scale * 100,
        rotate: random() * 360,
        flip: random() > 0.5,
        delay: n * 45,
      });
      n++;
    }
  });
  return pieces;
}

/** A small heap of pieces for the tray of a topping. */
export function trayHeap(id: ToppingId): PiecePlacement[] {
  const index = TOPPINGS.findIndex((t) => t.id === id);
  const topping = TOPPINGS[index];
  const random = seeded(5000 + index * 31);
  // a full tray: pieces spread over the whole well, a little past its edges (clipped)
  const count = topping.id === 'olive' ? 30 : topping.id === 'basil' ? 14 : 18;
  const size = topping.id === 'olive' ? 24 : topping.id === 'basil' ? 44 : 38;
  return Array.from({ length: count }, (_, n) => ({
    key: `${id}-tray-${n}`,
    src: pieceSrc(topping, n),
    x: (random() - 0.5) * 92,
    y: (random() - 0.5) * 92,
    size: size * (0.85 + random() * 0.3),
    rotate: random() * 360,
    flip: random() > 0.5,
    delay: 0,
  }));
}
