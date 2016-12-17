// Constant for name of my service worker
const STATICCACHENAME = 'keystroker-2';

/**
 * Listen for install event of service worker
 */
self.addEventListener('install', (event) => {
    console.log('install');
    event.waitUntil(
        caches.open(STATICCACHENAME).then((cache) => {
            return cache.addAll([
                '/',
                '/scripts/vendor/require.js',
                '/scripts/main.js',
                '/styles/main.css',
                '/styles/materialize.css',
                // '/scripts/views/main.js',
                // '/scripts/models/textModel.js',
                // '/scripts/vendor/jquery.js',
                // '/scripts/vendor/underscore.js',
                // '/scripts/vendor/react.js',
                // '/scripts/vendor/react-dom.js',
                // '/scripts/templates/input.js',
                // '/scripts/templates/visualization.js',
                // '/scripts/vendor/backbone.js',
                // '/scripts/vendor/d3.js'
            ]);
        })
    );
});

/**
 * Listen for fetch events
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
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