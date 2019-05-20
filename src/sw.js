//var dataCacheName = 'MERN-NOTES';
var cacheName = "MERN-NOTES";
//TODO: which files should be cached? Add them here:
var filesToCache = [
  "index.js",
  "index.css",
  "logo.svg",
  "App.js",
  "App.css",
  "create.js",
  "todos.js",
  "edit.js"
];

//window.process = { env: { NODE_ENV: "production" } };

// Call Install Event
window.self.addEventListener("install", e => {
  console.log("ServiceWorker Install");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("ServiceWorker: Caching Files");
        return cache.addAll(filesToCache);
      })
      .then(() => window.self.skipWaiting())
  );
});

// Call Activate event
window.self.addEventListener("activate", e => {
  console.log("ServiceWorker: Activate");
  // Remove unwanted
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(cache => {
          if (cache !== cacheName) {
            console.log("ServiceWorker Removing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

window.self.addEventListener("fetch", e => {
  console.log("Service Worker Fetch");
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName).then(cache => {
          // add response to cache
          cache.put(e, request, resClone);
        });
        return res;
      })
      .cache(err => caches.match(e.request).then(res => res))
  );
});
