/**
 * Casa Italia Ristorante - Progressive Web App Service Worker
 * Version: 1.0.0
 */

const CACHE_NAME = 'casa-italia-pwa-v1';

const PRECACHE_ASSETS = [
  '/',
  '/menu',
  '/tables',
  '/medal',
  '/manifest.webmanifest',
  '/logo/logo-01.svg',
  '/logo/logo-01.webp',
  '/icons/android/launchericon-192x192.png',
  '/icons/android/launchericon-512x512.png',
  '/icons/ios/180.png',
  '/backgrounds/bg-1.webp',
  '/backgrounds/bg-2.webp',
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS).catch((err) => {
          console.warn('[SW] Pre-cache partial fail:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up obsolete cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event - Routing & Caching Strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Skip non-GET requests and browser extensions
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 2. Bypass API calls and internal revalidation (always live network)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // 3. Navigation / HTML Document Requests (Network First, Cache Fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/');
          if (fallback) return fallback;
          return new Response(
            '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><title>Casa Italia Offline</title><style>body{background:#1a1816;color:#faf7f2;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}h1{color:#ba935a}</style></head><body><div><h1>Casa Italia</h1><p>Sei attualmente offline. Riconnettiti per visualizzare il menu in tempo reale.</p></div></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // 4. Static Assets (Images, WebP, Fonts, CSS, JS): Stale-While-Revalidate
  const isStatic =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/logo/') ||
    url.pathname.startsWith('/backgrounds/') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|woff2|woff|css|js|ico)$/i);

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
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
