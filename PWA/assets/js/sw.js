self.addEventListener('install', function(event) {
  console.log('SW installed at', new Date().toLocaleTimeString());
});

self.addEventListener('activate', function(event) {
  console.log('SW activated at', new Date().toLocaleTimeString());
})