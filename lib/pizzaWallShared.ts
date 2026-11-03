/** What the browser needs to know about the pizza wall (the database side is in pizzaWall.ts). */
import type { ToppingId } from '@/config/pizzaBuilder';

export const PIZZA_NAME_MIN = 3;
export const PIZZA_NAME_MAX = 32;
export const PIZZA_CREATOR_MAX = 24;

export interface WallPizza {
  id: string;
  name: string;
  creator: string;
  toppings: ToppingId[];
  price: number;
  ratingAvg: number;
  ratingCount: number;
  orderCount: number;
  createdAt: string;
}
