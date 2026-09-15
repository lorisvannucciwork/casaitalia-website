import db, { MenuCategoryRecord, MenuItemRecord } from './db';
import { MENU_ITEMS as FALLBACK_MENU_ITEMS, MENU_CATEGORIES as FALLBACK_CATEGORIES, MenuItem, Category } from '../data/menuData';

export { type MenuItem, type CategoryId, type Category, MENU_CATEGORIES } from '../data/menuData';

const staticCategoryMap = new Map(FALLBACK_CATEGORIES.map((c) => [c.id.toLowerCase(), c]));
const staticItemMap = new Map(FALLBACK_MENU_ITEMS.map((item) => [item.id.toLowerCase(), item]));
const staticItemByName = new Map(FALLBACK_MENU_ITEMS.map((item) => [item.name.toLowerCase(), item]));

/**
 * Fetches active menu categories live from Cloudflare D1 with graceful static fallback
 */
export async function getDynamicMenuCategories(): Promise<Category[]> {
  try {
    const rawCategories = await db.query<MenuCategoryRecord>(
      `SELECT * FROM menu_categories WHERE active = 1 ORDER BY display_order ASC, name ASC`
    );

    if (rawCategories && rawCategories.length > 0) {
      return rawCategories.map((cat): Category => {
        const fallback = staticCategoryMap.get(String(cat.id).toLowerCase());
        return {
          id: cat.id,
          name: cat.name,
          italianTitle: cat.italian_title || fallback?.italianTitle || cat.name,
          description: cat.description || fallback?.description || '',
          iconName: fallback?.iconName,
        };
      });
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
    const rawItems = await db.query<MenuItemRecord>(
      `SELECT * FROM menu_items WHERE active = 1 ORDER BY category ASC, display_order ASC, name ASC`
    );

    if (rawItems && rawItems.length > 0) {
      return rawItems.map((item): MenuItem => {
        const fallback =
          staticItemMap.get(String(item.id).toLowerCase()) ||
          staticItemByName.get(String(item.name).toLowerCase());

        return {
          id: item.id,
          name: item.name,
          italianName: item.italian_name || fallback?.italianName || item.name,
          description: item.description || fallback?.description || '',
          price: typeof item.price === 'number' ? item.price : parseFloat(String(item.price)) || 0,
          category: item.category,
          image: (() => {
            const raw = item.image ? String(item.image).trim() : '';
            if (!raw) return fallback?.image || '';
            if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
            const cdn = (process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.casaitaliarestaurants.com').replace(/\/$/, '');
            return `${cdn}/${raw.replace(/^\//, '')}`;
          })(),
          tags: (() => {
            if (item.tags) {
              if (typeof item.tags === 'string') {
                try {
                  const parsed = JSON.parse(item.tags);
                  if (Array.isArray(parsed)) return parsed.map(String);
                } catch {
                  return item.tags.split(',').map((t) => t.trim()).filter(Boolean);
                }
              } else if (Array.isArray(item.tags)) {
                return (item.tags as unknown[]).map(String);
              }
            }
            return fallback?.tags || [];
          })(),
          badge: item.badge || fallback?.badge || undefined,
          pronunciation: item.pronunciation || fallback?.pronunciation || undefined,
          calories: item.calories || fallback?.calories || undefined,
          preparationTime: item.preparation_time || fallback?.preparationTime || undefined,
        };
      });
    }
  } catch (err) {
    console.warn('D1 menu_items query skipped or fallback used:', err);
  }

  return FALLBACK_MENU_ITEMS;
}

