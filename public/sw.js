const CACHE = 'ai-compass-v1';

// App shell — routes and assets we always want available offline
const PRECACHE = [
  '/',
  '/dashboard',
  '/goals',
  '/manifest.json',
  '/icon.svg',
  '/icon-maskable.svg',
];

// ── Install: precache the shell ─────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ── Activate: delete old caches ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: strategy per resource type ───────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // API routes — network only, never cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Next.js build chunks (_next/static) — cache first, long-lived
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Pages & assets — stale-while-revalidate
  // Serve from cache immediately, revalidate in background
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(request).then(cached => {
        const fetchPromise = fetch(request)
          .then(response => {
            // Only cache successful same-origin responses
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached); // offline: fall back to stale

        return cached || fetchPromise;
      })
    )
  );
});
