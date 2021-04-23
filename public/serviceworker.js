const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offlice.html' ];

const self = this;

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Open cache');

                return cache.addAll(urlsToCache);
            })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(() => {
                return fetch(e.request)
                    .catch((err) => caches.match('offline.html'))
            })
    )
})

self.addEventListener('activate', (e) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
    )
})
