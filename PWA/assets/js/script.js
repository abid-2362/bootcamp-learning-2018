if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('assets/js/sw.js')
  .then( r => console.log('SW registered'))
  .catch(console.error);
}