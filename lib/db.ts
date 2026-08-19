export interface User {
  id: string;
  name: string;
  role: 'admin' | 'waiter';
  pin_hash: string;
  section?: string;
  color?: string;
  active: number;
  created_at: string;
}

export interface RestaurantTable {
  id: string;
  table_number: number;
  name: string;
  section: string;
  capacity: number;
  active: number;
  created_at: string;
}

export interface ServiceCall {
  id: string;
  table_number: number;
  call_type: 'Call Waiter' | 'Ask for Check' | 'Order Placed' | 'Special Assistance';
  status: 'pending' | 'claimed' | 'completed' | 'cancelled';
  waiter_id: string | null;
  waiter_name: string | null;
  notes: string | null;
  order_data: string | null;
  created_at: string;
  claimed_at: string | null;
  completed_at: string | null;
  response_time_seconds: number;
}

export interface SystemSetting {
  key: string;
  value: string;
}

function getCloudflareCredentials() {
  const rawAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const rawDatabaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const rawApiToken = process.env.CLOUDFLARE_API_TOKEN;

  const accountId = rawAccountId ? rawAccountId.replace(/["']/g, '').trim() : '';
  const databaseId = rawDatabaseId ? rawDatabaseId.replace(/["']/g, '').trim() : '';
  const apiToken = rawApiToken ? rawApiToken.replace(/["']/g, '').trim() : '';

  if (!accountId || !databaseId || !apiToken || accountId.includes('your_') || databaseId.includes('your_') || apiToken.includes('your_')) {
    throw new Error(
      'Cloudflare D1 credentials missing. Please set valid CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, and CLOUDFLARE_API_TOKEN in .env.local'
    );
  }

  return { accountId, databaseId, apiToken };
}

/**
 * Executes query strictly against Cloudflare D1 REST API (No local fallbacks permitted)
 */
async function queryD1Rest<T>(sql: string, params: any[] = []): Promise<T[]> {
  const { accountId, databaseId, apiToken } = getCloudflareCredentials();
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sql,
      params,
    }),
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    const errorMsg = data.errors?.[0]?.message || response.statusText || 'Cloudflare D1 Query Failed';
    throw new Error(`Cloudflare D1 Error: ${errorMsg}`);
  }

  return (data.result?.[0]?.results || []) as T[];
}

/**
 * Pure Cloudflare D1 Database Client (Strict Mode)
 */
export const db = {
  /**
   * Execute SELECT query strictly against Cloudflare D1
   */
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    // 1. Cloudflare Native D1 Binding (Cloudflare Pages/Workers)
    const nativeDb = (globalThis as any).__D1_DB__ || (process.env as any).DB;
    if (nativeDb && typeof nativeDb.prepare === 'function') {
      const stmt = nativeDb.prepare(sql).bind(...params);
      const res = await stmt.all();
      return (res.results || []) as T[];
    }

    // 2. Cloudflare D1 REST API
    return queryD1Rest<T>(sql, params);
  },

  /**
   * Execute query and return single row or null from Cloudflare D1
   */
  async queryFirst<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Execute INSERT / UPDATE / DELETE statement strictly in Cloudflare D1
   */
  async execute(sql: string, params: any[] = []): Promise<{ success: boolean; changes?: number; lastRowId?: number }> {
    // 1. Cloudflare Native D1 Binding
    const nativeDb = (globalThis as any).__D1_DB__ || (process.env as any).DB;
    if (nativeDb && typeof nativeDb.prepare === 'function') {
      const stmt = nativeDb.prepare(sql).bind(...params);
      const res = await stmt.run();
      return { success: res.success, changes: res.meta?.changes, lastRowId: res.meta?.last_row_id };
    }

    // 2. Cloudflare D1 REST API
    await queryD1Rest(sql, params);
    return { success: true };
  },

  /**
   * Run multiple queries sequentially in Cloudflare D1
   */
  async batch(statements: { sql: string; params?: any[] }[]): Promise<any[]> {
    const results = [];
    for (const stmt of statements) {
      const res = await this.query(stmt.sql, stmt.params || []);
      results.push(res);
    }
    return results;
  },
};

export default db;
