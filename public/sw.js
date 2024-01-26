let cacheData = "offline-web-app"
this.addEventListener("install", (event)=>{
  event.waitUntil(
    caches.open(cacheData).then((cache)=>{
      cache.addAll([
        '/statis/js/main.chunk.js',
        '/statis/js/0.chunk.js',
        '/statis/js/bundle.js',
        '/index.html',
        '/',
        'https://unpkg.com/framework7@8.3.0/framework7-bundle.min.css',
        'https://cdn.jsdelivr.net/npm/framework7-icons@5.0.5/css/framework7-icons.min.css',
      ])
    })
  )
})
this.addEventListener("fetch", (event) => {
  const { request } = event;

  // Handle navigation requests
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match("/index.html");
      })
    );
    return;
  }

  // Handle resource requests
  event.respondWith(
    caches.match(request).then((resp) => {
      return resp || fetch(request).then((response) => {
        return caches.open(cacheData).then((cache) => {
          cache.put(request, response.clone());
          return response;
        });
      });
    }).catch(() => {
      // Handle fetch errors for resource requests
      return new Response("Offline");
    })
  );
});
