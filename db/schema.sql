CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  pin_hash TEXT NOT NULL,
  color TEXT DEFAULT '#ba935a',
  avatar_url TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  token_version INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tables (
  id TEXT PRIMARY KEY,
  table_number INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  italian_title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  italian_name TEXT,
  description TEXT,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  calories INTEGER,
  preparation_time TEXT,
  tags TEXT,
  badge TEXT,
  pronunciation TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_categories_order ON menu_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_active ON menu_categories(active);
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_active ON menu_items(active);

-- Online delivery orders: kept 'pending' until the restaurant's Odoo has collected them
CREATE TABLE IF NOT EXISTS online_orders (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'delivery',
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT NOT NULL,
  location TEXT NOT NULL,
  notes TEXT,
  items TEXT NOT NULL,
  subtotal REAL NOT NULL,
  currency TEXT NOT NULL,
  language TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  odoo_ref TEXT,
  received_at TEXT,
  created_at TEXT NOT NULL
);

-- Table reservations: kept 'pending' until the restaurant's Odoo has collected them
CREATE TABLE IF NOT EXISTS table_reservations (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  guests INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT 'any',
  notes TEXT,
  language TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  odoo_ref TEXT,
  table_number INTEGER,
  received_at TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_online_orders_status ON online_orders(status, created_at);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON table_reservations(status, created_at);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON table_reservations(date, time);