importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js',
);

importScripts('js/idb.js');
importScripts('js/utility.js');


// To avoid async issues, we load strategies before we call it in the event listener
//
// workbox.setConfig({
//   debug: true,
// });

const SW_VERSION = '5.0.0';

addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});

// Enable navigation preload.
// workbox.navigationPreload.enable();
//workbox.googleAnalytics.initialize();
//
workbox.precaching.precacheAndRoute([
  // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
  // "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2Flogo.png?alt=media&token=8f3d3959-d7e2-4c89-ba14-a94503e56552",
  "https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  // "https://fonts.gstatic.com",
  // "https://fonts.googleapis.com/css2?family=Baloo+2&display=swap",
  // "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
  // "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
  // "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"//
  // "./index.html",
  // "/"
]);

// Demonstrates using default cache
workbox.routing.registerRoute(
  // registerRoute(
  new RegExp('.*\\.(?:js)'),
  // new workbox.strategies.NetworkFirst({
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-cache' //added by anita
  }),
);


// Demonstrates using default cache
workbox.routing.registerRoute(
  // registerRoute(
  new RegExp('.*\\.(?:html)'),
  new workbox.strategies.NetworkFirst({
  // new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'html-cache' //added by anita
  }),
);
// Demonstrates using default cache
workbox.routing.registerRoute(
  // registerRoute(
  new RegExp('.*\\.(?:css)'),
  // new workbox.strategies.NetworkFirst({
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache' //added by anita
  }),
);
//
//
workbox.routing.registerRoute(/.*firebasestorage*.googleapis*.*event/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fbimgevent-cache' ,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  }),
);

//
workbox.routing.registerRoute(/.*(?:firebasestorage\.googleapis)\.com.*$/,

  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fbimg-cache' //added by anita
  }),
);

workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/,
  // registerRoute(
  // new RegExp('.*\\.(?:css)'),
  // new workbox.strategies.NetworkFirst({
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis-cache' //added by anita
  }),
);


workbox.routing.registerRoute(/.*(?:cdnjs.\cloudflare)\.com.*$/,
  // registerRoute(
  // new RegExp('.*\\.(?:css)'),
  // new workbox.strategies.NetworkFirst({
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cdnjs-cache' //added by anita
  }),
);


// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
  // registerRoute(
  new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif)*'),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  }),
);


//
self.addEventListener('fetch', (event) => {
  const request = event.request;
  // console.log(event);
  switch (new URL(event.request.url).pathname) {
    case '/cache-only-populated-cache': {
      const cacheOnlyPopulated = new workbox.strategies.CacheOnly();
      event.respondWith(cacheOnlyPopulated.handle({
        event,
        request
      }));
      break;
    }

    // case '/network-first-404.txt': {
    //   const networkFirstInvalid = new workbox.strategies.NetworkFirst();
    //   event.respondWith(networkFirstInvalid.handle({event, request}));
    //   break;
    // }
    // case '/stale-while-revalidate.txt': {
    //   const staleWhileRevalidate =
    //     new workbox.strategies.StaleWhileRevalidate();
    //   event.respondWith(staleWhileRevalidate.handle({event, request}));
    //   break;
    // }
  }
  var pattern = /firebasestorage*.googleapis*.*event/
  var pattern1 = /firebasestorage*.googleapis/

  if(pattern.test(event.request.url))
  {
    const staleWhileRevalidatePopulated = new workbox.strategies.StaleWhileRevalidate();
    event.respondWith(staleWhileRevalidatePopulated.handle({
      event,
      request,
      cacheName: 'fbeventimage-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10,
        }),
      ],
    }));
  }
  else if(pattern1.test(event.request.url))
  {
    const staleWhileRevalidatePopulated = new workbox.strategies.StaleWhileRevalidate();
    event.respondWith(staleWhileRevalidatePopulated.handle({
      event,
      request,
      cacheName: 'fbimage-cache'
    }));
  }
  else if (event.request.url.includes('us-central1-tpliveapp.cloudfunctions.net')) {
    // console.log("getEventSummaryBySport");
    //caching start -- network first
    const networkFirst = new workbox.strategies.NetworkFirst();
    event.respondWith(
      fetch(event.request)
      .then(function(res) {
        return caches.open("myDynamic")
          .then(function(cache) {
            cache.put(event.request.url, res.clone());
            return res;
          })
      })
      .catch(function(err) {
        return caches.match(event.request.url);
      })
    )
    //caching end -- network first

//caching start -- staleWhileRevalidate
  //   event.respondWith(
  // caches.open('mysite-dynamic').then(function (cache) {
  //   return cache.match(event.request.url).then(function (response) {
  //     var fetchPromise = fetch(event.request)
  //     .then(function (networkResponse) {
  //       cache.put(event.request.url, networkResponse.clone());
  //       return networkResponse;
  //     });
  //     return response || fetchPromise;
  //   });
  // }),
  // );

  //caching end -- staleWhileRevalidate

  }
});

// This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
// skipWaiting();
workbox.core.clientsClaim();
// clientsClaim();

// Populate the cache to illustrate cache-only-populated-cache route
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(workbox.core.cacheNames.runtime).then((cache) => {
      console.log("addEventListener install");
      return cache.put(
        new Request('/cache-only-populated-cache'),
        new Response('Hello from the populated cache.'),
      );
    }),
  );
});


//action for notification
self.addEventListener('notificationclick', function(event){
  var notification = event.notification;
  var action = event.action;
  console.log(notification);
  if(action === 'confirm'){
    console.log('Confirmed ');
    notification.close();
  }else{
    console.log(action);
    notification.close();
  }
});

self.addEventListener('notificationclose', function(event){
  console.log("notification was cancelled", event);
});
