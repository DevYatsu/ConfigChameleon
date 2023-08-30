const supportedFormatTypes = {
  json: ["YAML", "XML", "JSONL", "CSV"],
  yaml: ["CSV", "JSON", "XML", "TOML"],
  csv: ["JSON", "TOML", "XML", "YAML"],
  xml: ["CSV", "YAML", "JSON", "BEAUTIFIER"],
};

const formatSiteMapUrls = [
  ...supportedFormatTypes.json.map((t) => `/json/${t.toLowerCase()}`),
  ...supportedFormatTypes.yaml.map((t) => `/yaml/${t.toLowerCase()}`),
  ...supportedFormatTypes.csv.map((t) => `/csv/${t.toLowerCase()}`),
  ...supportedFormatTypes.xml.map((t) => `/xml/${t.toLowerCase()}`),
];

const CACHE_NAME = "static-cache";
const urlsToCache = [
  "/",
  "/password",
  "/manifest.json",
  "/css/index.css",
  "/css/style.css",
  "/images/favicon.ico",
  "/images/icon.512x512.png",
  "/images/icon.256x256.png",
  "/images/maskable_icon.png",
  ...formatSiteMapUrls,
];

if ("serviceWorker" in navigator) {
  self.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return Promise.all(
            urlsToCache.map((url) => {
              return fetch(url)
                .then((response) => {
                  if (response.ok) {
                    return cache.put(url, response);
                  }
                })
                .catch((error) => {
                  console.error(`Error caching ${url}:`, error);
                });
            }),
          );
        }),
    );
  });

  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }),
    );
  });
}
