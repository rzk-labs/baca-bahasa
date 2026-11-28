/* catatan: naikkan C bersama APP_VER di ui.js (nomornya harus sama) */
const C='kepo-v780';
const FILES=['./','index.html','app.js','ui.js','hsk.js','kamus-ja.txt','cloud.js','demo.js','style.css','manifest.webmanifest','privasi.html','bantuan.html','hapus-akun.html','icon-180.png','icon-192.png','icon-512.png','icon-maskable-512.png','favicon.svg','img/hero-home.webp','img/hero-home-640.webp','img/kosong-rak.webp','img/ikon-speaker.svg','img/aset/cari-kosong.svg','img/aset/sosial-offline.svg','img/aset/tamat-buku.svg','img/aset/kosong-kata.svg','img/aset/kosong-ngomong.svg','img/aset/kosong-aman.svg','img/aset/beres-sesi.svg','img/aset/kosong-hsk.svg','img/aset/kosong-peringkat.svg','img/aset/kosong-teman.svg','img/aset/kosong-kartu.svg','img/aset/langkah-tambah.svg','img/aset/langkah-ketuk.svg','img/aset/langkah-ngomong.svg','img/aset/stempel-kata.svg','img/aset/stempel-baca.svg','img/aset/stempel-streak.svg','img/aset/stempel-ngomong.svg','img/aset/stempel-sempurna.svg','img/aset/stempel-boss.svg','img/aset/stempel-otak.svg'];
// pustaka impor EPUB/PDF + font Google (Bricolage Grotesque, Literata, Inter): di-cache saat pertama dipakai online
const CDN=['https://cdnjs.cloudflare.com/ajax/libs/','https://fonts.googleapis.com/','https://fonts.gstatic.com/'];self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!=='kepo-titip').map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():self.clients.openWindow('./')))});
self.addEventListener('fetch',e=>{
  /* Bagikan dari Android: simpan berkas sementara di cache lalu arahkan ke app */
  if(e.request.method==='POST'&&new URL(e.request.url).origin===location.origin){
    e.respondWith((async()=>{
      try{
        const fd=await e.request.formData(),fs=fd.getAll('berkas').filter(f=>f&&f.name);
        const c=await caches.open('kepo-titip');
        for(const k of await c.keys())await c.delete(k);
        for(let i=0;i<fs.length;i++)await c.put('./titip/'+i,new Response(fs[i],{headers:{'x-nama':encodeURIComponent(fs[i].name),'content-type':fs[i].type||'application/octet-stream'}}));
      }catch(x){}
      return Response.redirect('./?buka=1',303);
    })());
    return;
  }
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
