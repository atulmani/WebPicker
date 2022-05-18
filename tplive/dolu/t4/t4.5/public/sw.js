self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-C')
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/css/styles.css',
          // '/css/Loginstyle.css',
          // '/css/profile.css',
          '/js/firebase.js',
          '/js/main.js',
          '/js/homepage.js',
        ])
      })
  );
  return self.clients.claim();
});
//

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] fetching Service Worker ....', event);
  // event.respondWith(fetch(event.request));
 event.respondWith(
   caches.match(event.request)
   .then(function(response){
     if(response){
       return response;
     }else{
       return fetch(event.request)
       .then(function (res1){
         return caches.open('myDynamic - 1')
         .then(function (cache){
           cache.put(event.request.url, res1.clone());
           return res1;
         })
         .catch(function(err){

         })

       });
     }
   })
 );
});
