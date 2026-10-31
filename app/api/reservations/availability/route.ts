import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { checkRateLimit, getClientIp } from '@/lib/ratelimit';
import { BOOKING_RULES, getAvailability, OnlineError, restaurantNow } from '@/lib/online';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'GET, OPTIONS');
}

/** Booking times of a day (?date=YYYY-MM-DD&guests=N), with the ones still available. */
export async function GET(req: NextRequest) {
  const cors = getCorsHeaders(req, 'GET, OPTIONS');
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`availability_get_${ip}`, 60, 60);
    if (!rate.success) {
      return NextResponse.json({ error: 'too_many' }, { status: 429, headers: cors });
    }
    const date = req.nextUrl.searchParams.get('date') || restaurantNow().date;
    const guests = Math.min(Math.max(parseInt(req.nextUrl.searchParams.get('guests') || '2', 10) || 2, 1), BOOKING_RULES.maxGuests);
    const slots = await getAvailability(date, guests);
    return NextResponse.json(
      { date, guests, slots, today: restaurantNow().date, maxGuests: BOOKING_RULES.maxGuests, maxDaysAhead: BOOKING_RULES.maxDaysAhead },
      { headers: { ...cors, 'Cache-Control': 'no-store' } }
    );
  } catch (error: unknown) {
    if (error instanceof OnlineError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: error.status, headers: cors });
    }
    console.error('Availability error:', error);
    return NextResponse.json({ error: 'server' }, { status: 500, headers: cors });
  }
}
