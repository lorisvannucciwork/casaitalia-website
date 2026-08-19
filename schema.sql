-- ==========================================================
-- Casa Italia - Cloudflare D1 Database Schema & Seed Data
-- ==========================================================

-- 1. Users table (Admin & Waiters with bcrypt hashed PINs)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'waiter')),
  pin_hash TEXT NOT NULL,
  section TEXT DEFAULT 'All Sections',
  color TEXT DEFAULT '#ba935a',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

-- 2. Restaurant Tables
CREATE TABLE IF NOT EXISTS tables (
  id TEXT PRIMARY KEY,
  table_number INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  section TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 4,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

-- 3. Live Service Calls & Customer Table Orders
CREATE TABLE IF NOT EXISTS service_calls (
  id TEXT PRIMARY KEY,
  table_number INTEGER NOT NULL,
  call_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'claimed', 'completed', 'cancelled')),
  waiter_id TEXT,
  waiter_name TEXT,
  notes TEXT,
  order_data TEXT,
  created_at TEXT NOT NULL,
  claimed_at TEXT,
  completed_at TEXT,
  response_time_seconds INTEGER DEFAULT 0
);

-- 4. System Settings & Toggles
CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Indexes for lightning fast queries on D1
CREATE INDEX IF NOT EXISTS idx_calls_status ON service_calls(status);
CREATE INDEX IF NOT EXISTS idx_calls_created ON service_calls(created_at);
CREATE INDEX IF NOT EXISTS idx_calls_table ON service_calls(table_number);

-- ==========================================================
-- SEED INITIAL DATA (Only if empty)
-- ==========================================================

-- Seed Admin Account (PIN: '4408')
INSERT OR IGNORE INTO users (id, name, role, pin_hash, section, color, active, created_at)
VALUES (
  'admin-1',
  'General Manager',
  'admin',
  '$2b$10$Xzke4ziVD0EHCKNh1nKoj.OjnGRX4ML26BdHZ78juJ4Iwf0xWQnza',
  'All Sections',
  '#ba935a',
  1,
  datetime('now')
);

-- Seed Waiters (Marco: 1111, Matteo: 2222, Sofia: 3333, Luca: 4444)
INSERT OR IGNORE INTO users (id, name, role, pin_hash, section, color, active, created_at)
VALUES 
  ('waiter-marco', 'Marco Rossi', 'waiter', '$2b$10$0yXmOhSsGLPf9ySyVZvjVes.bCKCiYhUx9ZUxc1lIvb2Pbz/a9l06', 'All Sections', '#2d6a4f', 1, datetime('now')),
  ('waiter-matteo', 'Matteo Bianchi', 'waiter', '$2b$10$MfuhDeNJRRzgztTy9rlVnuIPEGJZJ7FWgQJtn2Zkr6.kk5fIJBiXi', 'All Sections', '#d96b43', 1, datetime('now')),
  ('waiter-sofia', 'Sofia Conti', 'waiter', '$2b$10$6.ja2A/fS.f0GKPhdr8iqu3vS3W9tpWgZPhAm0lDbLcAfez7dofrC', 'All Sections', '#2563eb', 1, datetime('now')),
  ('waiter-luca', 'Luca Moretti', 'waiter', '$2b$10$876ppGZlzx3P0F/u/nQOceQWzOiHdy1cxzYfmxlTBQ2Bd0gbJC/Zy', 'All Sections', '#7c3aed', 1, datetime('now'));

-- Seed Tables (Tables 01 to 16)
INSERT OR IGNORE INTO tables (id, table_number, name, section, capacity, active, created_at)
VALUES
  ('table-1', 1, 'Table 01', 'Indoor Dining', 2, 1, datetime('now')),
  ('table-2', 2, 'Table 02', 'Indoor Dining', 4, 1, datetime('now')),
  ('table-3', 3, 'Table 03', 'Indoor Dining', 4, 1, datetime('now')),
  ('table-4', 4, 'Table 04', 'Indoor Dining', 6, 1, datetime('now')),
  ('table-5', 5, 'Table 05', 'Indoor Dining', 4, 1, datetime('now')),
  ('table-6', 6, 'Table 06', 'Indoor Dining', 8, 1, datetime('now')),
  ('table-7', 7, 'Table 07', 'Marina Terrace', 4, 1, datetime('now')),
  ('table-8', 8, 'Table 08', 'Marina Terrace', 4, 1, datetime('now')),
  ('table-9', 9, 'Table 09', 'Marina Terrace', 6, 1, datetime('now')),
  ('table-10', 10, 'Table 10', 'Marina Terrace', 2, 1, datetime('now')),
  ('table-11', 11, 'Table 11', 'Marina Terrace', 4, 1, datetime('now')),
  ('table-12', 12, 'Table 12', 'Marina Terrace', 6, 1, datetime('now')),
  ('table-13', 13, 'Table 13', 'Sea View VIP', 6, 1, datetime('now')),
  ('table-14', 14, 'Table 14', 'Sea View VIP', 8, 1, datetime('now')),
  ('table-15', 15, 'Table 15', 'Sea View VIP', 10, 1, datetime('now')),
  ('table-16', 16, 'Table 16', 'Bar Area', 2, 1, datetime('now'));

-- Seed Default Settings
INSERT OR IGNORE INTO system_settings (key, value) VALUES
  ('website_base_url', 'http://localhost:3000'),
  ('enable_waiter_call', 'true'),
  ('enable_bill_request', 'true'),
  ('enable_web_ordering', 'true'),
  ('service_charge_percent', '12'),
  ('alert_sound', 'restaurant_chime'),
  ('restaurant_name', 'Casa Italia Port Ghalib');
