self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});
