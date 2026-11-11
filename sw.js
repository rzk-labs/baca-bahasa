const C='kepo-v14';
const FILES=['./','index.html','app.js','ui.js','cloud.js','style.css','manifest.webmanifest','img/kepo-curious.webp','img/kepo-happy.webp','img/kepo-cheer.webp','img/kepo-wow.webp','img/kepo-sad.webp','img/kepo-icon.webp','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
});
