// service-worker.js
const CACHE_NAME = 'd750-settings-v2'; // Incrémentez la version du cache à chaque mise à jour
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // Icônes de type de photo
    '/img/all_photos.svg',
    '/img/baby.svg',
    '/img/landscape.svg',
    '/img/portrait.svg',
    '/img/action.svg',
    '/img/wildlife.svg',
    '/img/macro.svg',
    '/img/night.svg',
    '/img/milkyway.svg',
    '/img/light_painting.svg',
    '/img/street.svg',
    '/img/interior.svg',
    '/img/event.svg',
    '/img/sunset.svg',
    '/img/hdr.svg',
    '/img/group.svg',
    '/img/clouds.svg',
    '/img/nature.svg',
    '/img/fireworks.svg',
    '/img/zoom.svg'
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