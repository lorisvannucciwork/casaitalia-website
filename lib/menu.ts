import db from './db';
import { MENU_ITEMS as FALLBACK_MENU_ITEMS, MENU_CATEGORIES as FALLBACK_CATEGORIES, MenuItem, Category } from '../data/menuData';

export { type MenuItem, type CategoryId, type Category, MENU_CATEGORIES } from '../data/menuData';

/**
 * Fetches active menu categories live from Cloudflare D1 with graceful static fallback
 */
export async function getDynamicMenuCategories(): Promise<Category[]> {
  try {
    const rawCategories = await db.query<any>(
      `SELECT * FROM menu_categories WHERE active = 1 ORDER BY display_order ASC, name ASC`
    );

    if (rawCategories && rawCategories.length > 0) {
      return rawCategories.map((cat: any): Category => ({
        id: cat.id,
        name: cat.name,
        italianTitle: cat.italian_title || cat.name,
        description: cat.description || '',
      }));
    }
  } catch (err) {
    console.warn('D1 menu_categories query skipped or fallback used:', err);
  }

  return FALLBACK_CATEGORIES;
}

/**
 * Fetches active menu items live from Cloudflare D1 with graceful static fallback
 */
export async function getDynamicMenuItems(): Promise<MenuItem[]> {
  try {
    const rawItems = await db.query<any>(
      `SELECT * FROM menu_items WHERE active = 1 ORDER BY category ASC, display_order ASC, name ASC`
    );

    if (rawItems && rawItems.length > 0) {
      return rawItems.map((item: any): MenuItem => {
        return {
          id: item.id,
          name: item.name,
          italianName: item.italian_name || item.name,
          description: item.description || '',
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0,
          category: item.category,
          image: item.image || '',
          tags: [],
          badge: undefined,
          calories: item.calories || undefined,
          preparationTime: item.preparation_time || undefined,
        };
      });
    }
  } catch (err) {
    console.warn('D1 menu_items query skipped or fallback used:', err);
  }

  return FALLBACK_MENU_ITEMS;
}

