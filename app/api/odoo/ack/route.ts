import { NextRequest, NextResponse } from 'next/server';
import { acknowledge, isOdooAuthorized } from '@/lib/online';

export const dynamic = 'force-dynamic';

/** Odoo confirms the orders and bookings it has saved: they are no longer listed as pending. */
export async function POST(req: NextRequest) {
  if (!isOdooAuthorized(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const result = await acknowledge(body);
    return NextResponse.json({ ok: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: unknown) {
    console.error('Odoo ack error:', error);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
