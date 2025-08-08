const CACHE_NAME = 'gastro-calc-cache-v1';
// List of files to cache. Must include everything needed for the app to run offline.
const FILES_TO_CACHE = [
    '/',
    'index.html',
    'gastroprofilaxis.html',
    'calculadora-atb.html',
    'calculadora-sangrado.html',
    'manifest.json',
    'icons/icon-192.png',
    'icons/icon-512.png'
];

// Install event: open a cache and add all essential files to it.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Fetch event: serve cached content when offline.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return the cached response if it exists, otherwise fetch from the network.
            return response || fetch(event.request);
        })
    );
});