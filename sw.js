/* CrewVital - service worker (CC0). Guarda la app para usarla sin conexion.
   Al publicar cambios, sube el numero de VERSION para renovar la cache. */
var VERSION = 'crewvital-v4.1';
var FILES = ['./', 'index.html', 'styles.css', 'data.js', 'app.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'nasa-logo.svg'];

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* primero la red para tener la version nueva; si no hay conexion, la copia guardada */
self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) { return; }
  ev.respondWith(fetch(req).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
  }));
});
