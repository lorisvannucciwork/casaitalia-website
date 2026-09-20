import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/cors';
import { cacheManager } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return handleCorsPreflight(req, 'POST, OPTIONS');
}

export async function POST(req: NextRequest) {
  const cors = getCorsHeaders(req, 'POST, OPTIONS');
  try {
    const authSecret =
      req.headers.get('x-internal-secret') ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    const expectedSecret = process.env.INTERNAL_API_SECRET;

    if (
      !expectedSecret ||
      expectedSecret === 'your_secure_internal_api_secret' ||
      !authSecret ||
      authSecret !== expectedSecret
    ) {
      return NextResponse.json({ error: 'Unauthorized revalidation' }, { status: 401, headers: cors });
    }

    let parsedBody: { tags?: string[]; paths?: string[] } = {};
    try {
      const text = await req.text();
      if (text) {
        parsedBody = JSON.parse(text);
      }
    } catch {

    }

    let purgedTagsCount = 0;
    if (parsedBody.tags && Array.isArray(parsedBody.tags) && parsedBody.tags.length > 0) {
      purgedTagsCount = cacheManager.invalidateByTag(...parsedBody.tags);
    } else {
      cacheManager.invalidateAll();
    }

    const pathsToRevalidate = new Set(['/menu', '/tables', '/']);
    if (parsedBody.paths && Array.isArray(parsedBody.paths)) {
      parsedBody.paths.forEach((p) => pathsToRevalidate.add(p));
    }

    for (const p of pathsToRevalidate) {
      try {
        revalidatePath(p);
      } catch {}
    }

    return NextResponse.json(
      {
        success: true,
        revalidated: true,
        timestamp: new Date().toISOString(),
        paths: Array.from(pathsToRevalidate),
        purgedTagsCount,
        memoryCacheStats: cacheManager.getStats(),
      },
      { headers: cors }
    );
  } catch (error: unknown) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500, headers: cors });
  }
}
