const CACHE_NAME = 'd750-settings-cache-v1';
const urlsToCache = [
    '/mon-d750-pwa/', // L'URL de base de votre PWA
    '/mon-d750-pwa/index.html',
    '/mon-d750-pwa/style.css',
    '/mon-d750-pwa/app.js',
    '/mon-d750-pwa/manifest.json',
    '/mon-d750-pwa/icons/icon-192x192.png',
    '/mon-d750-pwa/icons/icon-512x512.png'
    // Ajoutez ici toutes les ressources que vous voulez mettre en cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});