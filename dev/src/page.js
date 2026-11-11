export default `<!doctype html>
<html lang="id"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cut">
<title>Kepo Dev</title>
<meta name="theme-color" content="#F2EEE5">
<link rel="icon" href="https://rzk-labs.github.io/baca-bahasa/icon-192.png">
<link rel="apple-touch-icon" href="https://rzk-labs.github.io/baca-bahasa/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75,800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#F2EEE5;--ink:#2A1215;--mut:#6b5a5c;--card:#fff;--line:#e2dacb;--lime:#C6FF3D;--lav:#C9B8FF;--pink:#FFB8D9;--coral:#FF7A59;--yel:#FFE14D;--mint:#9EF0C9;--blue:#9CC8FF}
@media (prefers-color-scheme:dark){:root{--bg:#171012;--ink:#F2EEE5;--mut:#b9a9aa;--card:#241a1c;--line:#3a2c2f}}
*{box-sizing:border-box}html,body{margin:0}
body{background:var(--bg);color:var(--ink);font:16px/1.5 'Plus Jakarta Sans',system-ui,sans-serif;padding:0 16px 40px;max-width:720px;margin:auto}
h1,h2{font-family:Archivo,sans-serif;font-stretch:75%;font-weight:800;text-transform:uppercase;letter-spacing:.01em;line-height:1;margin:0}
h1{font-size:40px}h2{font-size:24px}
header{display:flex;align-items:center;gap:12px;padding:20px 0 12px}
header img{width:48px;height:48px;border-radius:14px;background:var(--lav)}
header p{margin:2px 0 0;color:var(--mut);font-size:14px}
.box{background:var(--card);border:2px solid var(--ink);border-radius:22px;padding:16px;margin:14px 0}
.ask{background:var(--lime);color:#2A1215}
textarea,input{width:100%;font:inherit;color:#2A1215;background:#fff;border:2px solid #2A1215;border-radius:14px;padding:12px;resize:vertical}
textarea{min-height:110px}
.btn{display:inline-flex;align-items:center;gap:6px;border:2px solid var(--ink);background:var(--ink);color:var(--bg);font:700 15px 'Plus Jakarta Sans',sans-serif;padding:11px 18px;border-radius:999px;cursor:pointer;text-decoration:none}
.btn.ghost{background:transparent;color:var(--ink)}
.ask .btn{border-color:#2A1215;background:#2A1215;color:#F2EEE5}
.btn:disabled{opacity:.5}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}
.task{display:flex;justify-content:space-between;align-items:center;gap:10px;cursor:pointer}
.task b{display:block}.task small{color:var(--mut)}
.chip{flex:none;font-size:13px;font-weight:700;padding:4px 10px;border-radius:999px;border:2px solid #2A1215;color:#2A1215;white-space:nowrap}
.s-antre{background:var(--blue)}.s-dikerjakan{background:var(--yel)}.s-siap{background:var(--lime)}.s-gagal{background:var(--coral)}.s-live{background:var(--mint)}.s-ditolak{background:#ddd}
.msg{border-left:4px solid var(--lav);padding:4px 0 4px 12px;margin:10px 0;white-space:pre-wrap;word-wrap:break-word}
.msg.kamu{border-color:var(--pink)}.msg small{display:block;color:var(--mut);font-weight:700}
.hint{color:var(--mut);font-size:14px}
.err{color:#c0392b;font-weight:700}
.back{background:none;border:0;color:var(--ink);font:700 15px inherit;cursor:pointer;padding:8px 0}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:currentColor;animation:p 1s infinite alternate}@keyframes p{to{opacity:.2}}
</style></head><body>
<header><img src="https://rzk-labs.github.io/baca-bahasa/img/kepo-icon.webp" alt=""><div><h1>Kepo Dev</h1><p>Tulis maunya, agent yang ngoding.</p></div></header>
<main id="app"></main>
<script>
const $=s=>document.querySelector(s), app=$('#app');
let tok=''; try{tok=localStorage.getItem('kd_tok')||''}catch(e){}
const NAMA={antre:'Antre',dikerjakan:'Dikerjakan',siap:'Siap dicek',gagal:'Gagal',live:'Live',ditolak:'Ditolak'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const waktu=t=>new Date(t).toLocaleString('id-ID',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
let timer;
async function call(path,body){
  const r=await fetch('/api'+path,{method:body?'POST':'GET',headers:{authorization:'Bearer '+tok,'content-type':'application/json'},body:body?JSON.stringify(body):undefined});
  const d=await r.json().catch(()=>({}));
  if(r.status===401&&path!=='/login'){tok='';login();throw new Error('Perlu login')}
  if(!r.ok)throw new Error(d.error||'Gagal ('+r.status+')');
  return d;
}
function poll(fn,ms){clearTimeout(timer);timer=setTimeout(fn,ms)}

function login(){
  clearTimeout(timer);
  app.innerHTML='<div class="box"><h2>Masuk</h2><p class="hint">Khusus pemilik Kepo.</p><input id="pw" type="password" placeholder="Password" autocomplete="current-password"><div class="row"><button class="btn" id="go">Masuk</button><span id="e" class="err"></span></div></div>';
  const go=async()=>{try{const d=await call('/login',{pw:$('#pw').value});tok=d.token;try{localStorage.setItem('kd_tok',tok)}catch(e){};home()}catch(e){$('#e').textContent=e.message}};
  $('#go').onclick=go;$('#pw').onkeydown=e=>{if(e.key==='Enter')go()};
}

async function home(){
  location.hash='';
  app.innerHTML='<div class="box ask"><h2>Mau Kepo ditambah apa?</h2><p>Jelaskan seperti ngobrol: apa yang mau diubah, di layar mana, dan kenapa.</p><textarea id="isi" placeholder="Contoh: di tab Kata, tambahin tombol acak urutan kartu."></textarea><div class="row"><button class="btn" id="kirim">Kirim ke agent</button><span id="e" class="err"></span></div></div><h2 style="margin-top:24px">Permintaan</h2><div id="list"><p class="hint">Memuat…</p></div>';
  $('#kirim').onclick=async()=>{const b=$('#kirim');b.disabled=true;$('#e').textContent='';
    try{const t=await call('/tasks',{isi:$('#isi').value});detail(t.n)}catch(e){$('#e').textContent=e.message;b.disabled=false}};
  loadList();
}
async function loadList(){
  try{
    const l=await call('/tasks'); const el=$('#list'); if(!el)return;
    el.innerHTML=l.length?l.map(t=>'<div class="box task" data-n="'+t.n+'"><div><b>'+esc(t.judul)+'</b><small>#'+t.n+' · '+waktu(t.diubah)+'</small></div><span class="chip s-'+t.status+'">'+(t.status==='dikerjakan'?'<span class="dot"></span> ':'')+NAMA[t.status]+'</span></div>').join(''):'<p class="hint">Belum ada. Tulis permintaan pertama di atas.</p>';
    el.querySelectorAll('.task').forEach(x=>x.onclick=()=>detail(+x.dataset.n));
    if(l.some(t=>t.status==='antre'||t.status==='dikerjakan'))poll(loadList,15000);
  }catch(e){const el=$('#list');if(el)el.innerHTML='<p class="err">'+esc(e.message)+'</p>'}
}

async function detail(n){
  clearTimeout(timer); location.hash=n;
  let t; try{t=await call('/tasks/'+n)}catch(e){app.innerHTML='<p class="err">'+esc(e.message)+'</p>';return}
  const kerja=t.status==='antre'||t.status==='dikerjakan';
  let aksi='';
  if(kerja)aksi='<p class="hint"><span class="dot"></span> Agent sedang bekerja (biasanya 3–15 menit). Halaman ini menyegarkan sendiri.</p><a class="btn ghost" target="_blank" href="'+t.actions+'">Lihat log</a>';
  else if(t.status==='siap')aksi='<a class="btn ghost" target="_blank" href="'+t.preview+'">Coba preview ↗</a><button class="btn" id="ok">Setujui &amp; live</button><button class="btn ghost" id="no">Tolak</button>';
  else if(t.status==='live')aksi='<a class="btn ghost" target="_blank" href="https://rzk-labs.github.io/baca-bahasa/">Buka Kepo ↗</a><span class="hint">Live butuh ±1–2 menit; tutup-buka app kalau belum berubah.</span>';
  app.innerHTML='<button class="back" id="bk">← Semua permintaan</button><div class="box"><div class="task"><h2>'+esc(t.judul)+'</h2><span class="chip s-'+t.status+'">'+NAMA[t.status]+'</span></div>'
   +'<div class="msg kamu"><small>Kamu · '+waktu(t.dibuat)+'</small>'+esc(t.isi)+'</div>'
   +t.riwayat.map(m=>'<div class="msg '+m.dari+'"><small>'+(m.dari==='kamu'?'Kamu':'Agent')+' · '+waktu(m.waktu)+'</small>'+esc(m.teks.replace(/^\\*\\*(.+?)\\*\\*/,'$1'))+'</div>').join('')
   +'<div class="row">'+aksi+'</div><span id="e" class="err"></span></div>'
   +(kerja?'':'<div class="box"><h2>'+(t.status==='live'?'Ubah lagi':'Revisi')+'</h2><p class="hint">Agent akan melanjutkan dari hasil terakhir.</p><textarea id="rv" placeholder="Contoh: tombolnya kebesaran, kecilin dan pindah ke kanan."></textarea><div class="row"><button class="btn" id="kr">Kirim revisi</button></div></div>');
  $('#bk').onclick=home;
  const act=async(a,b,el)=>{el.disabled=true;$('#e').textContent='';try{await call('/tasks/'+n+'/'+a,b||{});detail(n)}catch(e){$('#e').textContent=e.message;el.disabled=false}};
  if($('#ok'))$('#ok').onclick=e=>act('setujui',0,e.target);
  if($('#no'))$('#no').onclick=e=>{if(e.target.dataset.y){act('tolak',0,e.target)}else{e.target.dataset.y=1;e.target.textContent='Yakin tolak?'}};
  if($('#kr'))$('#kr').onclick=e=>act('revisi',{isi:$('#rv').value},e.target);
  if(kerja)poll(()=>detail(n),15000);
}
if(!tok)login();else if(+location.hash.slice(1))detail(+location.hash.slice(1));else home();
</script></body></html>`;
