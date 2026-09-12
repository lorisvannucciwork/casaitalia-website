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

const upstashRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '30 s'),
      analytics: true,
      prefix: 'casa_italia_website',
    })
  : null;

/**
 * Rate limit check helper (Upstash Redis with fallback to in-memory sliding window)
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowSeconds: number = 30
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  // 1. Try Upstash Redis if configured
  if (upstashRateLimiter) {
    try {
      const res = await upstashRateLimiter.limit(identifier);
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
const IPV6_REGEX = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

function isValidIp(ip: string): boolean {
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip) || ip === '::1' || ip === '127.0.0.1';
}

/**
 * Extract trusted client IP from cloudflare/forwarded headers safely
 */
export function getClientIp(req: Request): string {
  // Cloudflare's trusted connecting IP (highest priority in Cloudflare edge network)
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp && isValidIp(cfIp.trim())) return cfIp.trim();

  // NGINX / Proxy real IP
  const realIp = req.headers.get('x-real-ip');
  if (realIp && isValidIp(realIp.trim())) return realIp.trim();

  // Standard Forwarded For
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (isValidIp(firstIp)) return firstIp;
  }

  return '127.0.0.1';
}
