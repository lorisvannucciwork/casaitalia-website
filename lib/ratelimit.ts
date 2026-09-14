import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory sliding window cache for local development / edge fallback
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token && !url.includes('your_') && !token.includes('your_')) {
    try {
      return new Redis({ url, token });
    } catch (e) {
      console.warn('Failed to initialize Redis client:', e);
      return null;
    }
  }
  return null;
}

const redis = getRedisClient();

const limiterCache = new Map<string, Ratelimit>();

function getUpstashLimiter(maxRequests: number, windowSeconds: number): Ratelimit | null {
  if (!redis) return null;
  const key = `${maxRequests}_${windowSeconds}`;
  let limiter = limiterCache.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
      analytics: true,
      prefix: `casa_italia_${key}`,
    });
    limiterCache.set(key, limiter);
  }
  return limiter;
}

/**
 * Rate limit check helper (Upstash Redis with fallback to in-memory sliding window)
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowSeconds: number = 30
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  // 1. Try Upstash Redis if configured
  const limiter = getUpstashLimiter(maxRequests, windowSeconds);
  if (limiter) {
    try {
      const res = await limiter.limit(identifier);
      return {
        success: res.success,
        limit: res.limit,
        remaining: res.remaining,
        reset: res.reset,
      };
    } catch (err) {
      console.warn('Upstash Redis error, falling back to memory rate limiting:', err);
    }
  }

  // 2. High-performance In-Memory Sliding Window Fallback
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  // Evict stale entries periodically
  if (memoryStore.size > 2000) {
    for (const [k, v] of memoryStore.entries()) {
      if (now > v.resetAt) memoryStore.delete(k);
    }
  }

  const record = memoryStore.get(identifier);

  if (!record || now > record.resetAt) {
    memoryStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: Math.ceil((now + windowMs) / 1000),
    };
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: Math.ceil(record.resetAt / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - record.count,
    reset: Math.ceil(record.resetAt / 1000),
  };
}

const IPV4_REGEX = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
const IPV6_REGEX = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

function isValidIp(ip: string): boolean {
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip) || ip === '::1' || ip === '127.0.0.1';
}

/**
 * Extract trusted client IP from cloudflare/forwarded headers safely
 */
export function getClientIp(req: Request): string {
  // Cloudflare's trusted connecting IP (highest priority in Cloudflare edge network)
  const cfIp = req.headers.get('cf-connecting-ip')?.trim();
  if (cfIp && isValidIp(cfIp)) return cfIp;

  // NGINX / Proxy real IP
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp && isValidIp(realIp)) return realIp;

  // Standard Forwarded For
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (isValidIp(firstIp)) return firstIp;
  }

  // Generate fallback pseudo-identifier based on User-Agent to avoid global lockout
  const ua = req.headers.get('user-agent') || '';
  if (ua) {
    let hash = 0;
    for (let i = 0; i < ua.length; i++) {
      hash = ((hash << 5) - hash) + ua.charCodeAt(i);
      hash |= 0;
    }
    return `anon_${Math.abs(hash)}`;
  }

  return '127.0.0.1';
}

