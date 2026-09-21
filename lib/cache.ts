
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  staleUntil: number;
  tags: string[];
}

export interface CacheOptions {
  ttlSeconds?: number; 
  staleSeconds?: number; 
  tags?: string[];
}

/**
 * L2 cache using the Cloudflare Cache API.
 * This survives across Workers isolates (unlike the in-memory Map).
 * Falls back gracefully in environments where `caches` is not available (e.g., local dev with `next dev`).
 */
const CACHE_NAMESPACE = 'https://casa-italia-cache.internal/';

async function getL2Cache(): Promise<Cache | null> {
  try {
    if (typeof caches !== 'undefined' && typeof caches.open === 'function') {
      return await caches.open('casa-italia-data');
    }
  } catch {
    // caches API not available (local dev / Node.js runtime)
  }
  return null;
}

async function getFromL2<T>(key: string): Promise<CacheEntry<T> | null> {
  try {
    const l2 = await getL2Cache();
    if (!l2) return null;

    const response = await l2.match(new Request(`${CACHE_NAMESPACE}${key}`));
    if (!response) return null;

    const entry = (await response.json()) as CacheEntry<T>;
    return entry;
  } catch {
    return null;
  }
}

async function setInL2<T>(key: string, entry: CacheEntry<T>, maxAgeSeconds: number): Promise<void> {
  try {
    const l2 = await getL2Cache();
    if (!l2) return;

    const response = new Response(JSON.stringify(entry), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${maxAgeSeconds}`,
      },
    });

    await l2.put(new Request(`${CACHE_NAMESPACE}${key}`), response);
  } catch {
    // Silently fail — L2 is best-effort
  }
}

async function deleteFromL2(key: string): Promise<void> {
  try {
    const l2 = await getL2Cache();
    if (!l2) return;
    await l2.delete(new Request(`${CACHE_NAMESPACE}${key}`));
  } catch {
    // Silently fail
  }
}

class EdgeMemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();
  private inFlight = new Map<string, Promise<unknown>>();

  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const now = Date.now();
    const ttlMs = (options.ttlSeconds ?? 300) * 1000;
    const staleMs = (options.staleSeconds ?? 1800) * 1000;
    const tags = options.tags || [];

    // L1: Check in-memory cache (fastest, same isolate)
    const existing = this.store.get(key) as CacheEntry<T> | undefined;

    if (existing && now < existing.expiresAt) {
      return existing.data;
    }

    if (existing && now < existing.staleUntil) {
      // Stale data — return it but trigger background refresh
      if (!this.inFlight.has(key)) {
        this.executeFetch(key, fetcher, ttlMs, staleMs, tags, existing.data).catch(() => {});
      }
      return existing.data;
    }

    // L2: Check Cloudflare Cache API (survives across isolates)
    if (!existing) {
      const l2Entry = await getFromL2<T>(key);
      if (l2Entry) {
        // Populate L1 from L2
        this.store.set(key, l2Entry as CacheEntry<unknown>);

        if (now < l2Entry.expiresAt) {
          return l2Entry.data;
        }

        if (now < l2Entry.staleUntil) {
          if (!this.inFlight.has(key)) {
            this.executeFetch(key, fetcher, ttlMs, staleMs, tags, l2Entry.data).catch(() => {});
          }
          return l2Entry.data;
        }
      }
    }

    // Cache miss — fetch fresh data
    return this.executeFetch(key, fetcher, ttlMs, staleMs, tags, existing?.data);
  }

  private async executeFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number,
    staleMs: number,
    tags: string[],
    fallbackData?: T
  ): Promise<T> {
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key) as Promise<T>;
    }

    const promise = (async () => {
      try {
        const freshData = await fetcher();
        const now = Date.now();
        const entry: CacheEntry<unknown> = {
          data: freshData,
          expiresAt: now + ttlMs,
          staleUntil: now + ttlMs + staleMs,
          tags,
        };

        // L1: Update in-memory
        this.store.set(key, entry);

        // L2: Persist to Cache API (total lifespan = ttl + stale window)
        const totalSeconds = Math.ceil((ttlMs + staleMs) / 1000);
        setInL2(key, entry as CacheEntry<T>, totalSeconds).catch(() => {});

        return freshData;
      } catch (err) {
        if (fallbackData !== undefined) {
          const now = Date.now();
          const fallbackEntry: CacheEntry<unknown> = {
            data: fallbackData,
            expiresAt: now + 30_000, 
            staleUntil: now + 300_000,
            tags,
          };
          this.store.set(key, fallbackEntry);
          return fallbackData;
        }
        throw err;
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, promise as Promise<unknown>);
    return promise;
  }

  invalidateByKey(key: string): boolean {
    deleteFromL2(key).catch(() => {});
    return this.store.delete(key);
  }

  invalidateByTag(...tagsToInvalidate: string[]): number {
    let count = 0;
    const tagSet = new Set(tagsToInvalidate.map((t) => t.toLowerCase()));

    for (const [key, entry] of this.store.entries()) {
      const match = entry.tags.some((t) => tagSet.has(t.toLowerCase()));
      if (match) {
        this.store.delete(key);
        deleteFromL2(key).catch(() => {});
        count++;
      }
    }
    return count;
  }

  invalidateAll(): void {
    // Delete all known keys from L2 before clearing L1
    for (const key of this.store.keys()) {
      deleteFromL2(key).catch(() => {});
    }
    this.store.clear();
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.store.size,
      keys: Array.from(this.store.keys()),
    };
  }
}

export const cacheManager = new EdgeMemoryCache();
export default cacheManager;
