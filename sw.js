const C='kepo-v139';
const FILES=['./','index.html','app.js','ui.js','cloud.js','style.css','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','icon-maskable-512.png','favicon.svg'];
// pustaka impor EPUB/PDF + font Google (Bricolage Grotesque, Literata, Inter): di-cache saat pertama dipakai online
const CDN=['https://cdnjs.cloudflare.com/ajax/libs/','https://fonts.googleapis.com/','https://fonts.gstatic.com/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const isCdn=CDN.some(p=>e.request.url.startsWith(p));
  if(u.origin!==location.origin&&!isCdn)return;
  e.respondWith(fetch(isCdn?e.request:e.request.mode==='navigate'?new Request(e.request.url,{cache:'no-cache',credentials:'same-origin'}):new Request(e.request,{cache:'no-cache'})).then(r=>{
    if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{})}
    else if(!isCdn){return caches.match(e.request).then(m=>m||r)}
    return r;
  }).catch(()=>caches.match(e.request)));
});
