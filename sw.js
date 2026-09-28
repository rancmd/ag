// ============================================================
// ART GEM — Service Worker (sw.js)
// Caches the app shell for offline/fast loading.
// ============================================================

const CACHE_NAME = 'artgem-v1';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/layout.css',
  './css/feed.css',
  './css/profile.css',
  './css/search.css',
  './css/following.css',
  './js/data.js',
  './js/state.js',
  './js/router.js',
  './js/feed.js',
  './js/profile.js',
  './js/search.js',
  './js/following.js',
  './js/app.js',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg',
  './assets/icons/icon-180.svg',
];

// Install: cache shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: shell-first, network fallback
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Don't intercept video files (too large to cache) or YouTube
  if (url.pathname.includes('/assets/videos/') || url.hostname.includes('youtube') || url.hostname.includes('googleapis')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
        }
        return response;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});
