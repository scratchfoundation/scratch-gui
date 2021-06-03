// This will be replaced with a list of assets at build-time, eg. "static/assets/0bf9d7356bf6bc4fb28a7e4e8338757a.svg"
// The formatting of this line is very specific, do not change.
const ASSETS = [/* === */];
const CACHE_NAME = 'tw0';
const base = location.pathname.substr(0, location.pathname.indexOf('sw.js'));

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event => {
    let request = event.request;
    const url = new URL(event.request.url);
    if (url.origin === location.origin) {
        let pathOverride;
        const pathname = url.pathname.substr(base.length);
        if (/^(\d+\/?)?$/.test(pathname)) {
            pathOverride = 'index.html';
        } else if (/^(\d+\/)?editor\/?$/i.test(pathname)) {
            pathOverride = 'editor.html';
        } else if (/^(\d+\/)?fullscreen\/?$/i.test(pathname)) {
            pathOverride = 'fullscreen.html';
        } else if (/^addons\/?$/i.test(pathname)) {
            pathOverride = 'addons.html';
        }
        if (pathOverride) {
            request = new Request(pathOverride);
        }
    }
    event.respondWith(fetch(request).catch(() => caches.match(request)));
});
