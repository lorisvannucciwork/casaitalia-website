import * as schema from './schema';

export * from './schema';

interface D1QueryResult<T = unknown> {
  results?: T[];
  success?: boolean;
  meta?: {
    changes?: number;
    last_row_id?: number;
    duration?: number;
    rows_read?: number;
    rows_written?: number;
  };
}

interface D1ApiResponse<T = unknown> {
  result?: D1QueryResult<T>[];
  success: boolean;
  errors?: { message: string }[];
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
      'Cloudflare D1 credentials missing. Please configure CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, and CLOUDFLARE_API_TOKEN.'
    );
  }

  return { accountId, databaseId, apiToken };
}

/**
 * Direct raw query execution against Cloudflare D1 REST API
 */
async function queryD1RestRaw<T = unknown>(sql: string, params: unknown[] = []): Promise<D1QueryResult<T>> {
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

  const data = (await response.json()) as D1ApiResponse<T>;
  if (!response.ok || !data.success) {
    const errorMsg = data.errors?.[0]?.message || response.statusText || 'Cloudflare D1 Query Failed';
    throw new Error(`Cloudflare D1 Error: ${errorMsg}`);
  }

  return data.result?.[0] || {};
}

/**
 * Direct query execution against Cloudflare D1 REST API returning rows
 */
async function queryD1Rest<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const res = await queryD1RestRaw<T>(sql, params);
  return (res.results || []) as T[];
}

interface NativeD1Database {
  prepare: (sql: string) => {
    bind: (...params: unknown[]) => {
      all: () => Promise<{ results?: unknown[] }>;
      run: () => Promise<{ success: boolean; meta?: { changes?: number; last_row_id?: number } }>;
    };
  };
  batch: (statements: unknown[]) => Promise<unknown[]>;
}

/**
 * Resolves native D1 database binding from Cloudflare runtime or global injection
 */
async function getNativeDb(): Promise<NativeD1Database | null> {
  const direct = (globalThis as Record<string, unknown>).__D1_DB__ || (process.env as Record<string, unknown>).DB;
  if (direct && typeof (direct as NativeD1Database).prepare === 'function') {
    return direct as NativeD1Database;
  }

  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = await getCloudflareContext({ async: true });
    if (ctx?.env?.DB && typeof (ctx.env.DB as NativeD1Database).prepare === 'function') {
      return ctx.env.DB as NativeD1Database;
    }
  } catch {
    // Non-Cloudflare or build-time environment
  }

  return null;
}

/**
 * Native or REST-backed Database Client with Drizzle ORM support
 */
export const db = {
  schema,

  /**
   * Execute SELECT query
   */
  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const nativeDb = await getNativeDb();
    if (nativeDb && typeof nativeDb.prepare === 'function') {
      const stmt = nativeDb.prepare(sql).bind(...params);
      const res = await stmt.all();
      return (res.results || []) as T[];
    }

    return queryD1Rest<T>(sql, params);
  },

  /**
   * Execute query and return single row or null
   */
  async queryFirst<T = unknown>(sql: string, params: unknown[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Execute INSERT / UPDATE / DELETE statement
   */
  async execute(sql: string, params: unknown[] = []): Promise<{ success: boolean; changes?: number; lastRowId?: number }> {
    const nativeDb = await getNativeDb();
    if (nativeDb && typeof nativeDb.prepare === 'function') {
      const stmt = nativeDb.prepare(sql).bind(...params);
      const res = await stmt.run();
      return { success: res.success, changes: res.meta?.changes, lastRowId: res.meta?.last_row_id };
    }

    const res = await queryD1RestRaw(sql, params);
    return { success: true, changes: res.meta?.changes, lastRowId: res.meta?.last_row_id };
  },

  /**
   * Execute multiple statements in an atomic batch
   */
  async batch(statements: { sql: string; params?: unknown[] }[]): Promise<unknown[]> {
    const nativeDb = await getNativeDb();
    if (nativeDb && typeof nativeDb.batch === 'function') {
      const prepared = statements.map((s) => nativeDb.prepare(s.sql).bind(...(s.params || [])));
      return await nativeDb.batch(prepared);
    }

    const { accountId, databaseId, apiToken } = getCloudflareCredentials();
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

    // Cloudflare D1 query endpoint supports multiple SQL statements in an array
    const batchPayload = statements.map((s) => ({
      sql: s.sql,
      params: s.params || [],
    }));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batchPayload),
      cache: 'no-store',
    });

    const data = (await response.json()) as { success: boolean; errors?: { message: string }[]; result?: D1QueryResult[] };
    if (!response.ok || !data.success) {
      const errorMsg = data.errors?.[0]?.message || response.statusText || 'Cloudflare D1 Batch Failed';
      throw new Error(`Cloudflare D1 Error: ${errorMsg}`);
    }

    return (data.result || []).map((r: D1QueryResult) => r.results || []);
  },
};

export default db;
