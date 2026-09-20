import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull().default('admin'),
  pin_hash: text('pin_hash').notNull(),
  color: text('color').default('#ba935a'),
  avatar_url: text('avatar_url'),
  active: integer('active').notNull().default(1),
  token_version: integer('token_version').notNull().default(1),
  created_at: text('created_at').notNull(),
});

export const tables = sqliteTable('tables', {
  id: text('id').primaryKey(),
  table_number: integer('table_number').notNull().unique(),
  name: text('name').notNull(),
  active: integer('active').notNull().default(1),
  created_at: text('created_at').notNull(),
});

export const systemSettings = sqliteTable('system_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

export const auditLogs = sqliteTable(
  'audit_logs',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id'),
    user_name: text('user_name'),
    action: text('action').notNull(),
    entity_type: text('entity_type'),
    entity_id: text('entity_id'),
    details: text('details'),
    ip_address: text('ip_address'),
    created_at: text('created_at').notNull(),
  },
  (table) => [
    index('idx_audit_created').on(table.created_at),
    index('idx_audit_action').on(table.action),
  ]
);

export const menuCategories = sqliteTable(
  'menu_categories',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    italian_title: text('italian_title').notNull(),
    description: text('description'),
    display_order: integer('display_order').default(0),
    active: integer('active').notNull().default(1),
    created_at: text('created_at').notNull(),
    updated_at: text('updated_at').notNull(),
  },
  (table) => [
    index('idx_categories_order').on(table.display_order),
    index('idx_categories_active').on(table.active),
  ]
);

export const menuItems = sqliteTable(
  'menu_items',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    italian_name: text('italian_name'),
    description: text('description'),
    price: real('price').notNull(),
    category: text('category').notNull(),
    image: text('image'),
    calories: integer('calories'),
    preparation_time: text('preparation_time'),
    tags: text('tags'),
    badge: text('badge'),
    pronunciation: text('pronunciation'),
    active: integer('active').notNull().default(1),
    display_order: integer('display_order').default(0),
    created_at: text('created_at').notNull(),
    updated_at: text('updated_at').notNull(),
  },
  (table) => [
    index('idx_menu_category').on(table.category),
    index('idx_menu_active').on(table.active),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type RestaurantTable = typeof tables.$inferSelect;
export type NewRestaurantTable = typeof tables.$inferInsert;

export type SystemSetting = typeof systemSettings.$inferSelect;
export type NewSystemSetting = typeof systemSettings.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

export type MenuCategoryRecord = typeof menuCategories.$inferSelect;
export type NewMenuCategoryRecord = typeof menuCategories.$inferInsert;

export type MenuItemRecord = typeof menuItems.$inferSelect;
export type NewMenuItemRecord = typeof menuItems.$inferInsert;
