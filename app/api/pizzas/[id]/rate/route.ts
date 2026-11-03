import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';
import { PizzaWallError, ratePizza } from '@/lib/pizzaWall';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'POST, OPTIONS');
}

/** Rates a pizza of the wall from 1 to 5 stars; rating again replaces the guest's rating. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cors = getCorsHeaders(req, 'POST, OPTIONS');
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`pizza_rate_${ip}`, 40, 600);
    if (!rate.success) {
      return NextResponse.json({ error: 'too_many', message: 'Too many ratings, please wait a few minutes.' }, { status: 429, headers: cors });
    }
    const body = (await req.json().catch(() => null)) as { stars?: unknown; voter?: unknown } | null;
    const { id } = await params;
    const result = await ratePizza(id, body?.stars, body?.voter, ip);
    return NextResponse.json({ ok: true, ...result }, { headers: cors });
  } catch (error: unknown) {
    if (error instanceof PizzaWallError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: error.status, headers: cors });
    }
    console.error('Pizza rating error:', error);
    return NextResponse.json({ error: 'server', message: 'Your rating could not be saved.' }, { status: 500, headers: cors });
  }
}
