const CACHE = "humanidade-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles/style.css",
  "/styles/animations.css",
  "/styles/responsive.css",
  "/js/main.js",
  "/js/language.js",
  "/js/particles.js",
  "/js/earth.js",
  "/js/audio.js",
  "/js/share.js",
  "/js/pwa.js",
  "/js/visitor-counter.js",
  "/js/ai-assistant.js",
  "/locales/pt.json",
  "/locales/en.json",
  "/locales/es.json",
  "/locales/fr.json",
  "/locales/de.json",
  "/manifest.json",
  "/favicon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          if (event.request.method === "GET" && event.request.url.startsWith(self.location.origin)) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
