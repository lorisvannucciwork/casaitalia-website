import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';
import { createReservation, OnlineError } from '@/lib/online';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'POST, OPTIONS');
}

/** Books a table: confirmed here (capacity rule), the restaurant's Odoo assigns the table. */
export async function POST(req: NextRequest) {
  const cors = getCorsHeaders(req, 'POST, OPTIONS');
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`reservation_post_${ip}`, 5, 600);
    if (!rate.success) {
      return NextResponse.json({ error: 'too_many', message: 'Too many bookings, please wait a few minutes.' }, { status: 429, headers: cors });
    }
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'invalid', message: 'Invalid booking.' }, { status: 400, headers: cors });
    }
    const reservation = await createReservation(body);
    return NextResponse.json({ ok: true, ...reservation }, { status: 201, headers: cors });
  } catch (error: unknown) {
    if (error instanceof OnlineError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: error.status, headers: cors });
    }
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'server', message: 'The booking could not be sent, please try again.' }, { status: 500, headers: cors });
  }
}
