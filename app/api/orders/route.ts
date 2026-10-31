import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';
import { getPublicSettings } from '@/lib/settings';
import { createOrder, OnlineError } from '@/lib/online';

export const dynamic = 'force-dynamic';

function currencyCode(symbol: string): string {
  return symbol === 'EGP' || symbol === 'LE' ? 'EGP' : 'EUR';
}

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'POST, OPTIONS');
}

/** Places a delivery order: stored here, collected by the restaurant's Odoo within a minute. */
export async function POST(req: NextRequest) {
  const cors = getCorsHeaders(req, 'POST, OPTIONS');
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`order_post_${ip}`, 5, 600);
    if (!rate.success) {
      return NextResponse.json({ error: 'too_many', message: 'Too many orders, please wait a few minutes.' }, { status: 429, headers: cors });
    }
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'invalid', message: 'Invalid order.' }, { status: 400, headers: cors });
    }
    const settings = await getPublicSettings();
    const order = await createOrder(body, currencyCode(settings.currency));
    return NextResponse.json({ ok: true, ...order }, { status: 201, headers: cors });
  } catch (error: unknown) {
    if (error instanceof OnlineError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: error.status, headers: cors });
    }
    console.error('Order error:', error);
    return NextResponse.json({ error: 'server', message: 'The order could not be sent, please try again.' }, { status: 500, headers: cors });
  }
}
