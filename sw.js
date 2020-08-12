var CACHE_NAME = 'testing-1';

var urlsToCache = [
	'/',
	'/favicon.ico/',
	'/feeds/posts/default?alt=rss',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css',
	'https://www.blogger.com/static/v1/widgets/14020288-widget_css_bundle.css',
	'https://fonts.googleapis.com/css?family=Poppins',
];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) { 
        return cache.addAll(urlsToCache);
      })
  );
});

 

self.addEventListener('activate', function(event){ 
  event.waitUntil(
  caches.keys().then(function(cacheNames){
	  
	  return Promise.all(
	  
		cacheNames.filter(function(cacheName){
			return cacheName != CACHE_NAME
		}).map(function(cacheName){
			return caches.delete(cacheName); 
		})
		
		);
  })
  ); 
});






self.addEventListener('fetch', function(event) {
  event.respondWith(
		
		caches.match(event.request).then(function(response){
			if(response){
				return response;
			} 
			return fetch(event.request);
		}
	));
});

  
 

