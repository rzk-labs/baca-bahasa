const C='kepo-v23';
const FILES=['./','index.html','app.js','ui.js','cloud.js','style.css','manifest.webmanifest','img/kepo-curious.webp','img/kepo-happy.webp','img/kepo-cheer.webp','img/kepo-wow.webp','img/kepo-sad.webp','img/kepo-icon.webp','icon-180.png','icon-192.png','icon-512.png'];
// pustaka impor EPUB/PDF: di-cache saat pertama dipakai online
const CDN='https://cdnjs.cloudflare.com/ajax/libs/';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const isCdn=e.request.url.startsWith(CDN);
  if(u.origin!==location.origin&&!isCdn)return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{})}
    else if(!isCdn){return caches.match(e.request).then(m=>m||r)}
    return r;
  }).catch(()=>caches.match(e.request)));
});
