// Service Worker for EDL Tools Suite
const CACHE_NAME = 'edl-suite-v1';
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/styles.css",
  "/js/main.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['edl-suite-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Network First strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If we got a valid response, clone it and cache it
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // If network fails, try to get it from cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If the request is for an HTML page, return the offline page
            if (event.request.url.indexOf('.html') > -1) {
              return caches.match('/offline.html');
            }
          });
      })
  );
});
// Create a basic offline page
self.addEventListener('install', (event) => {
  const offlineResponse = new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EDL Tools Suite - Offline</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
          text-align: center;
          color: #333;
          background-color: #f5f5f5;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #000436;
        }
        p {
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.5;
        }
        button {
          background-color: #000436;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <h1>You're Offline</h1>
      <p>It seems you're not connected to the internet. Please check your connection and try again.</p>
      <button onclick="window.location.reload()">Retry</button>
    </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html'
      }
    }
  );

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.put('/offline.html', offlineResponse);
    })
  );
});
// Listen for messages from the main script
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// The service worker will send a message when it's ready to take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      // Send a message to all clients
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SW_ACTIVATED',
            message: 'Service Worker is active and ready to handle offline requests'
          });
        });
      });
    })
  );
});