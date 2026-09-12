import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  try {
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
  } catch (error: any) {
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
