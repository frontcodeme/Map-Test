
/**
 * @description FEND Project 8 : Neighborhood
 * @description service worker for a offline first serving
 * @author Alain Cadenat
 * @version 1.0
 */
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

// cache static files on load
let filesToCache = [
  '../data/places.json',
  '../data/translation.json',
  'images/offline_map.png',
  'icons/no_conection_pic.jpg',
  '../utils/FlickrAPI.js',
  '../icons/add.svg',
  '../icons/arrow-back.svg',
  '../icons/hamburger.png',
  '../components/App.js',
  '../components/Footer.js',
  '../components/Header.js',
  '../components/ListPlaces.js',
  '../components/MyMap.js',
  '../components/PicsPage.js',
  '../components/SearchPlace.js',
  '../components/ShowPlace.js',
  '../components/SideBar.js',
  './index.css',
  '../styles/App.css',
  'index.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('neighborhood-cache').then(function(cache){
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    }
    else {
      // Url is not cached so we try to cache it
      return fetch(event.request)
        .then(function (response) {
        // fetch resolved we cache the url and return the response
          caches.open('neighborhood-cache').then(function (cache) {
            // Don't cache google APIs fetch (forbidden by terms of use)
            if(!(event.request.url.startsWith('https://maps.googleapis.com')||
                 event.request.url.startsWith('https://maps.gstatic.com/mapfiles')||
                 event.request.url.startsWith('https://fonts.googleapis.com'))) {
              cache.add(event.request);
            }
          });
          return response;
        })
        // Fetch return an error, we catch it and display something
        .catch(function (err) {
          console.warn('error:',err);
        });
    }
  }));
});
