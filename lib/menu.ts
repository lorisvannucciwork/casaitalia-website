import db, { MenuCategoryRecord, MenuItemRecord } from './db';
import { MENU_ITEMS as FALLBACK_MENU_ITEMS, MENU_CATEGORIES as FALLBACK_CATEGORIES, MenuItem, Category } from '../data/menuData';
import { cacheManager } from './cache';

export { type MenuItem, type CategoryId, type Category, MENU_CATEGORIES } from '../data/menuData';

const staticCategoryMap = new Map(FALLBACK_CATEGORIES.map((c) => [c.id.toLowerCase(), c]));
const staticItemMap = new Map(FALLBACK_MENU_ITEMS.map((item) => [item.id.toLowerCase(), item]));
const staticItemByName = new Map(FALLBACK_MENU_ITEMS.map((item) => [item.name.toLowerCase(), item]));

async function fetchRawCategoriesFromD1(): Promise<Category[]> {
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
  } catch {
  }

  return FALLBACK_CATEGORIES;
}

export async function getDynamicMenuCategories(): Promise<Category[]> {
  return cacheManager.getOrSet('menu_categories', fetchRawCategoriesFromD1, {
    ttlSeconds: 300,
    staleSeconds: 1800,
    tags: ['categories', 'menu'],
  });
}

async function fetchRawItemsFromD1(category?: string): Promise<MenuItem[]> {
  const cleanCategory = category?.trim().toLowerCase();

  try {
    const querySql = cleanCategory
      ? `SELECT * FROM menu_items WHERE active = 1 AND LOWER(category) = ? ORDER BY display_order ASC, name ASC`
      : `SELECT * FROM menu_items WHERE active = 1 ORDER BY category ASC, display_order ASC, name ASC`;
    const queryParams = cleanCategory ? [cleanCategory] : [];

    const rawItems = await db.query<MenuItemRecord>(querySql, queryParams);

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
  } catch {
  }

  if (cleanCategory) {
    return FALLBACK_MENU_ITEMS.filter((item) => item.category.toLowerCase() === cleanCategory);
  }

  return FALLBACK_MENU_ITEMS;
}

export async function getDynamicMenuItems(category?: string): Promise<MenuItem[]> {
  const cleanCategory = category?.trim().toLowerCase();
  const cacheKey = cleanCategory ? `menu_items_${cleanCategory}` : 'menu_items';
  const tags = cleanCategory ? ['items', 'menu', `cat_${cleanCategory}`] : ['items', 'menu'];

  return cacheManager.getOrSet(
    cacheKey,
    () => fetchRawItemsFromD1(cleanCategory),
    {
      ttlSeconds: 300,
      staleSeconds: 1800,
      tags,
    }
  );
}
