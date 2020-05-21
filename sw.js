let cacheFiles=[
  '/',
  '/restaurant.html',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/css/styles.css',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

let restaurantCache = 'restaurant-v1';

self.addEventListener('install', function(event) {
  console.log('Install service worker');
  event.waitUntil(
    caches.open(restaurantCache).then(function(cache) {
      return cache.addAll(cacheFiles);
    }).catch(function(error){
      console.log(error);
    })
  );
});


self.addEventListener('activate', function(event) {
  console.log('Activate service worker');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != restaurantCache;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch',function(event){
  console.log('Hijack requests');
  event.respondWith(
    caches.match(event.request).then(function(){
        console.log(response)
      if(response) return response;
      return fetch(event.request).then(function(response) {
          if (response.status == 404) {
              return new Response("Oh no, not found!")
          }
          return response;
      }).catch(function () {
          return new Response("That totally failed ...")
      });
    }).catch(function(err){
          console.log(err);
      })
  );
});