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

})

self.addEventListener('activate', (e) => {

})
