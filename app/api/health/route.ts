import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`health_${ip}`, 30, 60);
    if (!rate.success) {
      return NextResponse.json(
        { status: 'rate_limited', error: 'Too many requests' },
        { status: 429 }
      );
    }

    const d1Check = await db.queryFirst<{ ok: number }>(`SELECT 1 as ok`);
    const latency = Date.now() - startTime;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'casaitalia-website',
      database: {
        connected: d1Check?.ok === 1,
        latencyMs: latency,
      },
    });
  } catch (error: unknown) {
    console.error('Website health check error:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'casaitalia-website',
        error: 'Database connectivity issue',
      },
      { status: 503 }
    );
  }
}
