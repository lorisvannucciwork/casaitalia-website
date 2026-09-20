
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

    const existing = this.store.get(key) as CacheEntry<T> | undefined;

    if (existing && now < existing.expiresAt) {
      return existing.data;
    }

    if (existing && now < existing.staleUntil) {

      if (!this.inFlight.has(key)) {
        this.executeFetch(key, fetcher, ttlMs, staleMs, tags, existing.data).catch(() => {});
      }
      return existing.data;
    }

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
        this.store.set(key, {
          data: freshData,
          expiresAt: now + ttlMs,
          staleUntil: now + ttlMs + staleMs,
          tags,
        });
        return freshData;
      } catch (err) {

        if (fallbackData !== undefined) {
          const now = Date.now();
          this.store.set(key, {
            data: fallbackData,
            expiresAt: now + 30_000, 
            staleUntil: now + 300_000,
            tags,
          });
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
    return this.store.delete(key);
  }

  invalidateByTag(...tagsToInvalidate: string[]): number {
    let count = 0;
    const tagSet = new Set(tagsToInvalidate.map((t) => t.toLowerCase()));

    for (const [key, entry] of this.store.entries()) {
      const match = entry.tags.some((t) => tagSet.has(t.toLowerCase()));
      if (match) {
        this.store.delete(key);
        count++;
      }
    }
    return count;
  }

  invalidateAll(): void {
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
