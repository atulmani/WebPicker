var CACHE_STATIC_NAME = 'static-v1.1.1.5';
var CACHE_DYNAMIC_NAME = 'dynamic-v1.1.1.5';
var STATIC_FILES = [
        '/',
        '/index.html',
        '/offline.html',
        '/js/promise.js',
        '/js/fetch.js',
        '/js/firebase.js',
        '/js/homepage.js',
        // '/css/Loginstyle.css',
        // '/css/profile.css',
        '/css/styles.css',
        '/js/main.js',
];


self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);

  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
    .then(function(cache) {
      cache.addAll(STATIC_FILES);
    })
  );
  return self.clients.claim();
});
//

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
          console.log('[Service Worker] Removing old cache.', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

var listDynamic = [];
listDynamic.push("\getEventSummaryBySport");
listDynamic.push("\getEventSummaryByCity");
listDynamic.push("\getAllEventDetails");
listDynamic.push("\getAllEventEntryCount");


// self.addEventListener('fetch', function(event) {
//
// // if(){
// //
// // }else {
// //
// // }
//       event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           if (response) {
//             return response;
//           } else {
//             return fetch(event.request)
//               .then(function(res) {
//                 return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function(cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   })
//               })
//               .catch(function(err) {
//                 return caches.open(CACHE_STATIC_NAME)
//                   .then(function(cache) {
//                     return cache.match('offline.html');
//                   })
//               });
//           }
//         })
//       );
// });

function isInArray(array, string) {
  for (index = 0; index < array.length; index++) {
    if (array[index] === string) {
      return true;
    }

  }
  return false;
}

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function(res) {
            return caches.open(CACHE_DYNAMIC_NAME)
              .then(function(cache) {
                cache.put(event.request.url, res.clone());
                return res;
              })
          })
          .catch(function(err) {
            return caches.open(CACHE_STATIC_NAME)
              .then(function(cache) {
                return cache.match('offline.html');
              })
          });
      }
    })
  );
});
