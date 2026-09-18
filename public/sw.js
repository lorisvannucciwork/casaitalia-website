/**
 * Casa Italia Ristorante - Progressive Web App Service Worker
 * Comprehensive Offline Engine: Caches HTML shell, API data, images, and videos
 * Version: 2.0.0
 */

const STATIC_CACHE = 'casa-italia-static-v2';
const MEDIA_CACHE = 'casa-italia-media-v2';
const DATA_CACHE = 'casa-italia-data-v2';
const CURRENT_CACHES = [STATIC_CACHE, MEDIA_CACHE, DATA_CACHE];

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
];

// Helper: Slice arrayBuffer to construct standard 206 Partial Content response for offline video playback
async function createPartialResponse(request, fullResponse) {
  const rangeHeader = request.headers.get('range');
  if (!rangeHeader) {
    return fullResponse;
  }

  try {
    const arrayBuffer = await fullResponse.arrayBuffer();
    const totalSize = arrayBuffer.byteLength;

    // Parse Range: bytes=start-end
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

// 1. Install Event: Pre-cache core shell, images, and hero video
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Pre-cache core shell
      const staticCache = await caches.open(STATIC_CACHE);
      await staticCache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Core precache partial fail:', err);
      });

      // Pre-cache hero video into media cache
      try {
        const mediaCache = await caches.open(MEDIA_CACHE);
        const heroVideoRes = await fetch('/videos/hero.mp4');
        if (heroVideoRes && heroVideoRes.status === 200) {
          await mediaCache.put('/videos/hero.mp4', heroVideoRes);
        }
      } catch (err) {
        console.warn('[SW] Hero video precache fail:', err);
      }

      await self.skipWaiting();
    })()
  );
});

// 2. Activate Event: Clean up outdated cache stores
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

  // A. Public Menu & Settings API (Network First, Cache Fallback for offline dish data)
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

  // B. Video Requests (Hero video, mp4, webm, Range requests)
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
        // Clean URL without range parameters for cache storage
        const cleanUrl = url.origin + url.pathname;

        // Check cache first
        const cachedFull = await mediaCache.match(cleanUrl);

        // If online, attempt to fetch and refresh cache
        if (navigator.onLine) {
          try {
            // Fetch clean URL without range header to store complete 200 file
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

        // If offline or network failed, serve from cache with range slicing
        if (cachedFull) {
          if (request.headers.has('range')) {
            return await createPartialResponse(request, cachedFull.clone());
          }
          return cachedFull;
        }

        // Fallback: try raw fetch
        return fetch(request);
      })()
    );
    return;
  }

  // C. Image Requests (Next.js image optimizer, local images, CDN images, WebP, SVG, JPG, PNG)
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

        // Network fetch promise that updates media cache
        const networkFetch = fetch(request)
          .then(async (networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              await mediaCache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        // If cached: return cached image immediately for instant rendering,
        // and update cache in background if online
        if (cachedResponse) {
          if (navigator.onLine) {
            networkFetch.catch(() => {});
          }
          return cachedResponse;
        }

        // If not in cache, wait for network
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

  // D. HTML Navigation Requests (Network First, Cache Fallback)
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

  // E. Static Scripts, Stylesheets & Fonts: Stale-While-Revalidate
  const isStatic =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(woff2|woff|ttf|eot|css|js)$/i);

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
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

// Skip Waiting listener
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
