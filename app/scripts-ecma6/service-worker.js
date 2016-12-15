// Constant for name of my service worker
const STATICCACHENAME = 'keystroker-7';

/**
 * Listen for install event of service worker
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATICCACHENAME).then((cache) => {
            return cache.addAll([
                '/',
                '/scripts/vendor/require.js'
            ]);
        })
    );
});

/**
 * Listen for fetch events
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        new Response('Hello world')
    );
});

/**
 * Listen for active of service worker
 */
self.addEventListener('activate', function(event) {
    // Remove old service workers
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('keystroker-') &&
                     cacheName != STATICCACHENAME;
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
    );
});