/**
 * Casa Italia Ristorante - Progressive Web App Service Worker
 * Bulletproof Offline Engine with Guaranteed CSS, Fonts, Images & Video Caching
 * Version: 4.0.0
 */

const CACHE_VERSION = 'v4';
const STATIC_CACHE = `casa-italia-static-${CACHE_VERSION}`;
const MEDIA_CACHE = `casa-italia-media-${CACHE_VERSION}`;
const DATA_CACHE = `casa-italia-data-${CACHE_VERSION}`;
const CURRENT_CACHES = [STATIC_CACHE, MEDIA_CACHE, DATA_CACHE];

const MASTER_CSS_KEY = '/__casa_italia_master_app_style__.css';

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Pinyon+Script&family=Satisfy&family=Source+Serif+4:wght@300;400;500;600;700&display=swap';

const PRECACHE_ASSETS = [
  '/',
  '/menu',
  '/tables',
  '/medal',
  '/privacy',
  '/terms',
  '/cookies',
  '/manifest.webmanifest',
  '/logo/logo-01.svg',
  '/logo/logo-01.webp',
  '/icons/android/launchericon-192x192.png',
  '/icons/android/launchericon-512x512.png',
  '/icons/ios/180.png',
  '/backgrounds/bg-1.webp',
  '/backgrounds/bg-2.webp',
  '/home/mr-loris.jpg',
  '/home/mrs-veronica.jpg',
  GOOGLE_FONTS_URL,
];

// Helper: Store stylesheet and clone under master key if it's an app stylesheet
async function storeStylesheet(cache, key, response) {
  try {
    const urlString = typeof key === 'string' ? key : key.url;
    await cache.put(key, response.clone());

    // Only update master app style if it's an application stylesheet (not Google Fonts)
    if (
      urlString.includes('.css') &&
      !urlString.includes('fonts.googleapis.com') &&
      !urlString.includes('fonts.gstatic.com')
    ) {
      await cache.put(MASTER_CSS_KEY, response.clone());
    }
  } catch {
    // ignore
  }
}

// Helper: Match asset with search-param ignoring and intelligent fallback
async function matchWithFallback(request, cacheName = STATIC_CACHE) {
  const cache = await caches.open(cacheName);

  // 1. Exact match
  let match = await cache.match(request);
  if (match) return match;

  // 2. Ignore query parameters
  match = await cache.match(request, { ignoreSearch: true });
  if (match) return match;

  // 3. Match by clean pathname
  try {
    const url =
      typeof request === 'string'
        ? new URL(request, self.location.origin)
        : new URL(request.url);
    match = await cache.match(url.pathname);
    if (match) return match;
  } catch {
    // ignore
  }

  // 4. Dedicated Stylesheet Fallbacks
  const requestUrl = typeof request === 'string' ? request : request.url;
  const isGoogleFont = requestUrl.includes('fonts.googleapis.com');

  if (isGoogleFont) {
    return await cache.match(GOOGLE_FONTS_URL);
  }

  const isAppStyle =
    (typeof request !== 'string' && request.destination === 'style') ||
    requestUrl.includes('.css');

  if (isAppStyle) {
    // Priority A: The cached master application stylesheet
    const masterCss = await cache.match(MASTER_CSS_KEY);
    if (masterCss) return masterCss;

    // Priority B: Any cached Next.js stylesheet chunk (strictly excluding Google Fonts)
    const keys = await cache.keys();
    for (const key of keys) {
      if (
        key.url.includes('.css') &&
        !key.url.includes('fonts.googleapis.com') &&
        (key.url.includes('/_next/static/') || key.url.includes('chunk'))
      ) {
        const appCss = await cache.match(key);
        if (appCss) return appCss;
      }
    }

    // Priority C: Any non-google .css file in cache
    for (const key of keys) {
      if (key.url.includes('.css') && !key.url.includes('fonts.googleapis.com')) {
        const anyCss = await cache.match(key);
        if (anyCss) return anyCss;
      }
    }
  }

  return null;
}

// Helper: Slice arrayBuffer to construct standard 206 Partial Content response for offline video playback
async function createPartialResponse(request, fullResponse) {
  const rangeHeader = request.headers.get('range');
  if (!rangeHeader) {
    return fullResponse;
  }

  try {
    const arrayBuffer = await fullResponse.arrayBuffer();
    const totalSize = arrayBuffer.byteLength;

    const matches = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (!matches) {
      return fullResponse;
    }

    const start = parseInt(matches[1], 10);
    const end = matches[2] ? parseInt(matches[2], 10) : totalSize - 1;

    if (start >= totalSize || end >= totalSize || start > end) {
      return new Response(null, {
        status: 416,
        statusText: 'Range Not Satisfiable',
        headers: {
          'Content-Range': `bytes */${totalSize}`,
        },
      });
    }

    const chunk = arrayBuffer.slice(start, end + 1);
    const contentType = fullResponse.headers.get('Content-Type') || 'video/mp4';

    return new Response(chunk, {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Type': contentType,
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Content-Length': chunk.byteLength.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch {
    return fullResponse;
  }
}

// Helper: Inspect HTML string and proactively cache all linked CSS and JS files
async function extractAndPrecacheAssets(htmlText, cache) {
  if (!htmlText) return;

  // 1. Extract <link ... href="...css">
  const linkMatches =
    htmlText.match(/href=["'](\/_next\/static\/[^"']+\.css[^"']*)["']/gi) || [];
  for (const matchStr of linkMatches) {
    const cleanHref = matchStr.replace(/^href=["']|["']$/gi, '');
    try {
      const res = await fetch(cleanHref);
      if (res && res.status === 200) {
        await storeStylesheet(cache, cleanHref, res);
      }
    } catch {
      // ignore
    }
  }

  // 2. Extract <script ... src="...js">
  const scriptMatches =
    htmlText.match(/src=["'](\/_next\/static\/[^"']+\.js[^"']*)["']/gi) || [];
  for (const matchStr of scriptMatches) {
    const cleanSrc = matchStr.replace(/^src=["']|["']$/gi, '');
    try {
      const res = await fetch(cleanSrc);
      if (res && res.status === 200) {
        await cache.put(cleanSrc, res);
      }
    } catch {
      // ignore
    }
  }
}

// 1. Install Event: Resilient Pre-caching with automatic asset discovery
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const staticCache = await caches.open(STATIC_CACHE);

      // Pre-cache primary routes and static assets resiliently (one failure will not abort the rest)
      await Promise.allSettled(
        PRECACHE_ASSETS.map(async (asset) => {
          try {
            const res = await fetch(asset);
            if (res && (res.status === 200 || res.type === 'opaque')) {
              if (asset.includes('.css') && !asset.includes('fonts.googleapis.com')) {
                await storeStylesheet(staticCache, asset, res);
              } else {
                await staticCache.put(asset, res);
              }
            }
          } catch {
            // ignore individual precache failure
          }
        })
      );

      // Discover and pre-cache compiled CSS and JS chunks directly from page HTML
      for (const pageUrl of ['/', '/menu', '/tables', '/medal']) {
        try {
          const cachedPage = await staticCache.match(pageUrl);
          if (cachedPage) {
            const html = await cachedPage.clone().text();
            await extractAndPrecacheAssets(html, staticCache);
          } else {
            const freshPage = await fetch(pageUrl);
            if (freshPage && freshPage.status === 200) {
              await staticCache.put(pageUrl, freshPage.clone());
              const html = await freshPage.text();
              await extractAndPrecacheAssets(html, staticCache);
            }
          }
        } catch {
          // ignore
        }
      }

      // Pre-cache hero video into media cache
      try {
        const mediaCache = await caches.open(MEDIA_CACHE);
        const heroVideoRes = await fetch('/videos/hero.mp4');
        if (heroVideoRes && heroVideoRes.status === 200) {
          await mediaCache.put('/videos/hero.mp4', heroVideoRes);
        }
      } catch (err) {
        console.warn('[SW] Hero video precache notice:', err);
      }

      await self.skipWaiting();
    })()
  );
});

// 2. Activate Event: Clean up outdated cache stores & claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (!CURRENT_CACHES.includes(name)) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. Fetch Event Routing
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and unsupported protocols
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Bypass cache for revalidation webhooks and administrative actions
  if (url.pathname.startsWith('/api/menu/revalidate')) {
    return;
  }

  // A. Public Menu & Settings API (Network First, Cache Fallback for offline dishes)
  if (
    url.pathname === '/api/menu' ||
    url.pathname === '/api/menu/categories' ||
    url.pathname === '/api/settings/public' ||
    url.pathname === '/api/tables'
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(DATA_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(
            JSON.stringify({ success: false, offline: true }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // Skip any other /api/ dynamic calls
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // B. Stylesheets (CSS), Scripts, and Fonts — CACHE FIRST WITH STALE-WHILE-REVALIDATE
  const isStyle =
    request.destination === 'style' ||
    url.pathname.endsWith('.css') ||
    url.pathname.includes('.css') ||
    url.hostname === 'fonts.googleapis.com';

  const isScriptOrFont =
    request.destination === 'script' ||
    request.destination === 'font' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(woff2?|ttf|eot|js)$/i);

  if (isStyle || isScriptOrFont) {
    event.respondWith(
      (async () => {
        const staticCache = await caches.open(STATIC_CACHE);

        // 1. Check Cache First (Instant load, guaranteed offline styling)
        const cached = await matchWithFallback(request, STATIC_CACHE);
        if (cached) {
          // In the background if online, revalidate without delaying the page
          if (navigator.onLine) {
            fetch(request)
              .then((fresh) => {
                if (fresh && (fresh.status === 200 || fresh.type === 'opaque')) {
                  if (isStyle && !url.hostname.includes('fonts.googleapis.com')) {
                    storeStylesheet(staticCache, request, fresh);
                  } else {
                    staticCache.put(request, fresh);
                  }
                }
              })
              .catch(() => {});
          }
          return cached;
        }

        // 2. Not in cache: fetch from network
        try {
          const networkResponse = await fetch(request);
          if (
            networkResponse &&
            (networkResponse.status === 200 || networkResponse.type === 'opaque')
          ) {
            if (isStyle && !url.hostname.includes('fonts.googleapis.com')) {
              await storeStylesheet(staticCache, request, networkResponse);
            } else {
              await staticCache.put(request, networkResponse.clone());
            }
          }
          return networkResponse;
        } catch {
          // 3. Network failed (offline): match with fallback
          const fallback = await matchWithFallback(request, STATIC_CACHE);
          if (fallback) {
            return fallback;
          }

          // 4. Ultimate Stylesheet Fallback: ensure page NEVER renders unstyled
          if (isStyle) {
            const masterFallback = await staticCache.match(MASTER_CSS_KEY);
            if (masterFallback) return masterFallback;

            const keys = await staticCache.keys();
            for (const key of keys) {
              if (key.url.includes('.css') && !key.url.includes('fonts.googleapis.com')) {
                const anyCss = await staticCache.match(key);
                if (anyCss) return anyCss;
              }
            }

            return new Response('/* Casa Italia Offline Fallback */', {
              headers: { 'Content-Type': 'text/css; charset=utf-8' },
            });
          }

          return Response.error();
        }
      })()
    );
    return;
  }

  // C. Video Requests (Hero video, mp4, webm, Range requests)
  const isVideo =
    request.destination === 'video' ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.mov') ||
    url.pathname.includes('/videos/');

  if (isVideo) {
    event.respondWith(
      (async () => {
        const mediaCache = await caches.open(MEDIA_CACHE);
        const cleanUrl = url.origin + url.pathname;

        // Check cache first
        const cachedFull = await mediaCache.match(cleanUrl);

        // If online: fetch full stream and cache it
        if (navigator.onLine) {
          try {
            const networkResponse = await fetch(cleanUrl);
            if (networkResponse && networkResponse.status === 200) {
              await mediaCache.put(cleanUrl, networkResponse.clone());
              if (request.headers.has('range')) {
                return await createPartialResponse(request, networkResponse);
              }
              return networkResponse;
            }
          } catch {
            // Fall through to cache
          }
        }

        // If offline: slice arrayBuffer to handle Range requests
        if (cachedFull) {
          if (request.headers.has('range')) {
            return await createPartialResponse(request, cachedFull.clone());
          }
          return cachedFull;
        }

        return fetch(request);
      })()
    );
    return;
  }

  // D. Image Requests (Next.js image optimizer, local images, CDN images, WebP, SVG, JPG, PNG)
  const isImage =
    request.destination === 'image' ||
    url.pathname.startsWith('/_next/image') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/logo/') ||
    url.pathname.startsWith('/backgrounds/') ||
    url.pathname.startsWith('/menu/') ||
    url.pathname.startsWith('/home/') ||
    url.hostname.includes('cdn.casaitaliarestaurants.com') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|avif|ico)(\?.*)?$/i);

  if (isImage) {
    event.respondWith(
      (async () => {
        const mediaCache = await caches.open(MEDIA_CACHE);
        const cachedResponse = await mediaCache.match(request);

        const networkFetch = fetch(request)
          .then(async (networkResponse) => {
            if (
              networkResponse &&
              (networkResponse.status === 200 || networkResponse.type === 'opaque')
            ) {
              await mediaCache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        if (cachedResponse) {
          if (navigator.onLine) {
            networkFetch.catch(() => {});
          }
          return cachedResponse;
        }

        const freshResponse = await networkFetch;
        if (freshResponse) {
          return freshResponse;
        }

        // Offline fallback for missing images: return cached brand background or logo
        const fallbackBg = await caches.match('/backgrounds/bg-2.webp');
        if (fallbackBg) return fallbackBg;

        return Response.error();
      })()
    );
    return;
  }

  // E. HTML Navigation Requests (Network First, Cache Fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/');
          if (fallback) return fallback;
          return new Response(
            '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><title>Casa Italia Offline</title><style>body{background:#1a1816;color:#faf7f2;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}h1{color:#ba935a}</style></head><body><div><h1>Casa Italia</h1><p>Sei attualmente offline. I tuoi piatti preferiti e contenuti salvati restano disponibili.</p></div></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request).catch(async () => {
      const cached = await caches.match(request);
      return cached || Response.error();
    })
  );
});

// 4. Message Event Listener (Skip waiting and client-directed stylesheet caching)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CACHE_STYLES' && Array.isArray(event.data.urls)) {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        for (const url of event.data.urls) {
          try {
            const res = await fetch(url);
            if (res && (res.status === 200 || res.type === 'opaque')) {
              await storeStylesheet(cache, url, res);
            }
          } catch {
            // ignore
          }
        }
      })()
    );
  }
});
