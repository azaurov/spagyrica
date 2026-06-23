// Spagyrica service worker.
// Network-first for navigation (HTML); offline fallback to cached index.html.
// Uses self.registration.scope so this works at any base URL.

const CACHE_NAME = "spagyrica-v1";
const BASE = self.registration.scope.replace(/\/$/, "");
const APP_SHELL = [
  BASE + "/",
  BASE + "/index.html",
  BASE + "/manifest.json",
  BASE + "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(BASE + "/", copy));
          return res;
        })
        .catch(() =>
          caches
            .match(BASE + "/index.html")
            .then((r) => r || new Response("Offline", { status: 503 }))
        )
    );
    return;
  }
});
