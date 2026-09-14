-- ==========================================================
-- Casa Italia - Cloudflare D1 Database Schema & Seed Data
-- ==========================================================

-- 1. Users table (Admin Account)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  pin_hash TEXT NOT NULL,
  color TEXT DEFAULT '#ba935a',
  avatar_url TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

-- 2. Restaurant Tables (for QR codes)
CREATE TABLE IF NOT EXISTS tables (
  id TEXT PRIMARY KEY,
  table_number INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

-- 3. System Settings
CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 4. Administrative Audit Logs
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

-- 5. Live Restaurant Menu Categories
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

-- 6. Live Restaurant Menu Items
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
  active INTEGER NOT NULL DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Indexes for lightning fast queries on D1
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_categories_order ON menu_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_active ON menu_categories(active);
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_active ON menu_items(active);

