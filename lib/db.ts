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
  const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const databaseId = (process.env.CLOUDFLARE_D1_DATABASE_ID || '').trim();
  const apiToken = (process.env.CLOUDFLARE_API_TOKEN || '').trim();

  if (!accountId || !databaseId || !apiToken || accountId.includes('your_') || databaseId.includes('your_') || apiToken.includes('your_')) {
    throw new Error(
      'Cloudflare D1 credentials missing. Please configure CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, and CLOUDFLARE_API_TOKEN.'
    );
  }

  return { accountId, databaseId, apiToken };
}

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

  }

  return null;
}

export const db = {
  schema,

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const nativeDb = await getNativeDb();
    if (nativeDb && typeof nativeDb.prepare === 'function') {
      const stmt = nativeDb.prepare(sql).bind(...params);
      const res = await stmt.all();
      return (res.results || []) as T[];
    }

    return queryD1Rest<T>(sql, params);
  },

  async queryFirst<T = unknown>(sql: string, params: unknown[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  },

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
   * Execute multiple statements as a batch.
   * NOTE: Native D1 batch() is atomic, but the REST API fallback executes
   * statements sequentially and is NOT transactional. Partial failures may
   * leave the database in an inconsistent state when using the REST fallback.
   */
  async batch(statements: { sql: string; params?: unknown[] }[]): Promise<unknown[]> {
    const nativeDb = await getNativeDb();
    if (nativeDb && typeof nativeDb.batch === 'function') {
      const prepared = statements.map((s) => nativeDb.prepare(s.sql).bind(...(s.params || [])));
      return await nativeDb.batch(prepared);
    }

    // REST fallback — sequential, non-atomic
    const results = [];
    for (const s of statements) {
      const res = await queryD1RestRaw(s.sql, s.params || []);
      results.push(res.results || []);
    }
    return results;
  },
};

export default db;
