'use strict';
/* Kepo cloud: akun (login/daftar), sinkron progres, leaderboard mingguan, bagikan cerita. Server: api/ (Cloudflare Worker + D1). */
const API_PROD = 'https://kepo-api.rizkachoirunnisa0403.workers.dev'; // Cloudflare Worker (api/)
const API = (() => {
  const q = new URLSearchParams(location.search).get('api');
  if (q) { localStorage.setItem('kepo.api', q); return q; }
  return localStorage.getItem('kepo.api') || API_PROD;
})();
db.acct = db.acct || null; // { token, username, nick, hidden }
const SYNC_KEYS = ['xp', 'xpDay', 'badges', 'stat', 'days', 'scores', 'vocab', 'weak'];

async function api(path, opt = {}) {
  if (!API) throw new Error('Server akun belum aktif. Coba lagi nanti ya.');
  const h = { 'Content-Type': 'application/json' };
  if (db.acct && db.acct.token) h.Authorization = 'Bearer ' + db.acct.token;
  let r;
  try { r = await fetch(API + path, { method: opt.method || 'GET', headers: h, body: opt.body ? JSON.stringify(opt.body) : undefined }); }
  catch (e) { throw new Error('Koneksi putus. Coba lagi pas ada internet.'); }
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && db.acct && path !== '/login') { db.acct = null; save(); renderAcct(); }
  if (!r.ok) throw new Error(j.error || 'Server lagi bermasalah.');
  return j;
}
function isoWeekKey(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear(), w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
  return `${y}-W${String(w).padStart(2, '0')}`;
}
function weekXp() { const wk = isoWeekKey(); return Object.entries(db.xpDay || {}).filter(([d]) => isoWeekKey(new Date(d + 'T12:00:00')) === wk).reduce((a, [, v]) => a + v, 0); }
const progressData = () => Object.fromEntries(SYNC_KEYS.map(k => [k, db[k]]));
let lastSync = '';
async function pushSync(force) {
  if (!db.acct || !API) return;
  const data = progressData(), sig = JSON.stringify(data) + db.acct.hidden + db.acct.nick;
  if (!force && sig === lastSync) return;
  await api('/sync', { method: 'PUT', body: { data, xp: db.xp, weekXp: weekXp(), hidden: !!db.acct.hidden, nick: db.acct.nick } });
  lastSync = sig;
}
function applyServer(data) { SYNC_KEYS.forEach(k => { if (data[k] != null) db[k] = data[k]; }); save(); }
async function afterLogin(res) {
  db.acct = { token: res.token, username: res.user.username, nick: res.user.nick, hidden: !!res.user.hidden };
  const d = res.data;
  // pilih progres yang lebih maju: data server kalau XP-nya >= XP di HP ini
  if (d && (d.xp || 0) >= (db.xp || 0)) { applyServer(d); toast(`Hai ${db.acct.nick}! Progres kamu sudah dipulihkan ✨`); }
  else { save(); toast(`Hai ${db.acct.nick}! Progres di HP ini disimpan ke akun ✨`); }
  await pushSync(true).catch(() => { });
  closeSheet(); setTab(db.tab || 'rak');
}
setInterval(() => pushSync().catch(() => { }), 20000);
addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') pushSync().catch(() => { }); });

/* ---------- UI akun ---------- */
const initial = n => (n || '?').trim().charAt(0).toUpperCase();
function renderAcct() {
  const slot = $('#acctSlot'); if (!slot) return;
  if (!API) { slot.innerHTML = ''; return; }
  slot.innerHTML = db.acct ? `<button class="avatar" id="acctBtn" aria-label="Akun ${esc(db.acct.nick)}">${esc(initial(db.acct.nick))}</button>` : `<button class="pill login" id="acctBtn">Masuk</button>`;
  $('#acctBtn').onclick = openAccount;
}
function openAccount(mode) {
  if (db.acct) {
    openSheet(`<div class="sh-head"><h2>Akun kamu</h2>${closeBtn}</div>
      <div class="acct-card"><div class="avatar big">${esc(initial(db.acct.nick))}</div><div><b>${esc(db.acct.nick)}</b><div class="mut sm">@${esc(db.acct.username)}</div></div></div>
      <div class="set-row"><div class="eyebrow">Nama di leaderboard</div><input id="aNick" maxlength="24" value="${esc(db.acct.nick)}"></div>
      <div class="set-row"><div class="eyebrow">Leaderboard</div><div class="seg" id="aHide"><button data-v="0" class="${db.acct.hidden ? '' : 'on'}">🏆 Tampilkan aku</button><button data-v="1" class="${db.acct.hidden ? 'on' : ''}">🙈 Sembunyikan</button></div></div>
      <div class="mut sm">XP, streak, lencana, dan kata tersimpan otomatis tersinkron ke akun. File cerita tetap di HP ini.</div>
      <div class="row"><button class="sec" id="aSync">Sinkron sekarang</button><button class="pri" id="aOut">Keluar</button></div>`);
    $('#aNick').onchange = e => { const v = e.target.value.trim(); if (v) { db.acct.nick = v.slice(0, 24); save(); renderAcct(); pushSync(true).catch(err => toast(err.message)); } };
    $$('#aHide button').forEach(b => b.onclick = () => { db.acct.hidden = b.dataset.v === '1'; save(); $$('#aHide button').forEach(x => x.classList.toggle('on', x === b)); pushSync(true).catch(err => toast(err.message)); });
    $('#aSync').onclick = async () => { try { await pushSync(true); toast('Tersinkron ✅'); } catch (e) { toast(e.message); } };
    $('#aOut').onclick = async () => { try { await pushSync(true); await api('/logout', { method: 'POST' }); } catch (e) { } db.acct = null; save(); closeSheet(); toast('Kamu sudah keluar. Progres tetap ada di HP ini.'); setTab(db.tab || 'rak'); };
    return;
  }
  let m = mode === 'daftar' ? 'daftar' : 'masuk';
  const draw = () => {
    openSheet(`<div class="sh-head"><h2>${m === 'masuk' ? 'Masuk' : 'Bikin akun'}</h2>${closeBtn}</div>
      <div class="hello-sub">${mascot('happy')}<div class="mut sm">${m === 'masuk' ? 'Lanjutin progres kamu di HP mana aja.' : 'Simpan XP & streak, ikut leaderboard, dan bagikan cerita ke teman.'}</div></div>
      <div class="seg" id="aMode"><button data-v="masuk" class="${m === 'masuk' ? 'on' : ''}">Masuk</button><button data-v="daftar" class="${m === 'daftar' ? 'on' : ''}">Daftar</button></div>
      <form id="aForm" autocomplete="on">
        <label class="eyebrow" style="display:block;margin-top:14px">Username<input id="aU" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="huruf kecil, angka, _" required></label>
        ${m === 'daftar' ? `<label class="eyebrow" style="display:block;margin-top:12px">Nama panggilan<input id="aN" maxlength="24" placeholder="Tampil di leaderboard"></label>` : ''}
        <label class="eyebrow" style="display:block;margin-top:12px">Password<input id="aP" type="password" name="password" autocomplete="${m === 'masuk' ? 'current-password' : 'new-password'}" placeholder="min. 6 karakter" required></label>
        <div class="row"><button class="pri" type="submit" id="aGo">${m === 'masuk' ? 'Masuk' : 'Daftar & masuk'}</button></div>
      </form>`);
    $$('#aMode button').forEach(b => b.onclick = () => { m = b.dataset.v; draw(); });
    $('#aForm').onsubmit = async e => {
      e.preventDefault(); const bt = $('#aGo'); bt.disabled = true;
      try {
        const body = { username: $('#aU').value.trim(), password: $('#aP').value };
        if (m === 'daftar') body.nick = ($('#aN').value || '').trim();
        await afterLogin(await api(m === 'masuk' ? '/login' : '/signup', { method: 'POST', body }));
        if (m === 'daftar') { sfx('win'); confetti(50); }
      } catch (err) { toast(err.message, 5000); bt.disabled = false; }
    };
  };
  draw();
}

/* ---------- Leaderboard ---------- */
const lbRow = (r, me) => `<div class="lb-row${me ? ' me' : ''}"><span class="rk">${r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : '#' + r.rank}</span><span class="avatar">${esc(initial(r.nick))}</span><b>${esc(r.nick)}</b><span class="xp">${r.week_xp} XP</span></div>`;
async function homeLeaderboard() {
  const host = $('#lbHome'); if (!host) return;
  if (!API) { host.remove(); return; }
  if (!db.acct) { host.innerHTML = `<div class="tile t-blue lb-cta"><div><div class="eyebrow">Leaderboard minggu ini</div><b>Masuk buat ikut balapan XP 🏆</b></div><button class="lime" id="lbIn">Masuk</button></div>`; $('#lbIn').onclick = () => openAccount('daftar'); return; }
  host.innerHTML = `<div class="card lb"><div class="sec-h" style="margin:0 0 8px"><h2>🏆 Minggu ini</h2><button class="ghost" id="lbAll">Lihat semua</button></div><div id="lbList" class="mut sm">Memuat…</div></div>`;
  $('#lbAll').onclick = openLeaderboard;
  try {
    await pushSync(true).catch(() => { });
    const r = await api('/leaderboard');
    const top = r.top.slice(0, 5), meIn = r.me && top.some(t => t.username === r.me.username);
    $('#lbList').innerHTML = (top.length ? top.map(t => lbRow(t, r.me && t.username === r.me.username)).join('') : '<div class="mut sm">Belum ada yang dapet XP minggu ini. Jadi yang pertama!</div>')
      + (r.me && !meIn ? (r.me.hidden ? '<div class="mut sm" style="margin-top:8px">Kamu disembunyikan dari leaderboard.</div>' : lbRow({ ...r.me, rank: r.me.rank }, true)) : '');
  } catch (e) { $('#lbList').textContent = e.message; }
}
async function openLeaderboard() {
  openSheet(`<div class="sh-head"><h2>🏆 Leaderboard</h2>${closeBtn}</div><div class="mut sm" id="lbWeek">XP minggu ini · reset tiap Senin</div><div id="lbFull" style="margin-top:12px" class="mut sm">Memuat…</div>`);
  try {
    const r = await api('/leaderboard');
    $('#lbWeek').textContent = `XP minggu ${r.week} · reset tiap Senin`;
    $('#lbFull').innerHTML = (r.top.length ? r.top.map(t => lbRow(t, r.me && t.username === r.me.username)).join('') : '<div class="mut sm">Belum ada peserta minggu ini.</div>')
      + (r.me && !r.me.hidden && !r.top.some(t => t.username === r.me.username) ? '<div class="lb-gap">···</div>' + lbRow(r.me, true) : '');
  } catch (e) { $('#lbFull').textContent = e.message; }
}

/* ---------- Bagikan cerita ---------- */
async function shareBook(id) {
  const b = db.books.find(x => x.id === id); if (!b) return;
  if (!API) return toast('Server akun belum aktif. Coba lagi nanti ya.');
  if (!db.acct) { toast('Masuk dulu buat bagiin cerita ya.'); return openAccount('daftar'); }
  openSheet(`<div class="sh-head"><h2>Bagikan cerita</h2>${closeBtn}</div>
    <div class="note">⚠️ <div>Bagikan hanya cerita <b>milikmu sendiri</b> atau yang <b>bebas hak cipta</b> (domain publik). Link ini pribadi: hanya yang kamu kirimi link yang bisa buka.</div></div>
    <div class="vitem">${cover(b)}<div class="inf"><div class="w1">${esc(b.title)}</div><div class="s1">${langName(b.lang)}</div></div></div>
    <div class="row"><button class="pri" id="shGo">🔗 Bikin link</button></div><div id="shOut"></div>`);
  $('#shGo').onclick = async () => {
    const bt = $('#shGo'); bt.disabled = true; bt.textContent = 'Lagi upload…';
    try {
      const paras = await getText(b.id);
      const r = await api('/share', { method: 'POST', body: { title: b.title, lang: b.lang, paras } });
      const link = location.origin + location.pathname + '?share=' + r.id;
      bt.remove();
      $('#shOut').innerHTML = `<div class="share-link"><input id="shLink" readonly value="${esc(link)}"><button class="lime" id="shCopy">Salin</button></div>
        ${navigator.share ? '<div class="row"><button class="pri" id="shNative">📤 Kirim ke teman</button></div>' : ''}<div class="mut sm" style="margin-top:8px">Kode: <b>${r.id}</b></div>`;
      $('#shCopy').onclick = async () => { try { await navigator.clipboard.writeText(link); } catch (e) { $('#shLink').select(); document.execCommand('copy'); } toast('Link disalin ✅'); };
      if ($('#shNative')) $('#shNative').onclick = () => navigator.share({ title: b.title, text: `Baca "${b.title}" bareng aku di KEEPO 👀`, url: link }).catch(() => { });
      award(5); sfx('ding');
    } catch (e) { toast(e.message, 5000); bt.disabled = false; bt.textContent = '🔗 Bikin link'; }
  };
}
async function openSharedFromUrl() {
  const id = new URLSearchParams(location.search).get('share'); if (!id) return;
  const u = new URL(location.href); u.searchParams.delete('share'); history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
  openSheet(`<div class="sh-head"><h2>Cerita dari teman</h2>${closeBtn}</div><div id="shIn" class="mut sm">Membuka link…</div>`);
  try {
    const s = await api('/share/' + encodeURIComponent(id));
    const exists = db.books.find(b => b.shareId === s.id);
    $('#shIn').outerHTML = `<div class="hello-sub">${mascot('wow')}<div><b>${esc(s.by)}</b> ngajak kamu baca:</div></div>
      <div class="vitem">${cover({ title: s.title })}<div class="inf"><div class="w1">${esc(s.title)}</div><div class="s1">${langName(s.lang)} · ${s.paras.length} paragraf</div></div></div>
      <div class="row"><button class="pri" id="shAdd">${exists ? 'Buka cerita' : '➕ Tambah ke koleksi'}</button></div>`;
    $('#shAdd').onclick = async () => {
      closeSheet();
      if (exists) { db.cur = exists.id; save(); return setTab('baca'); }
      await addBook(s.title, s.paras, s.lang);
      const nb = book(); if (nb) { nb.shareId = s.id; nb.sharedBy = s.by; save(); }
    };
  } catch (e) { $('#shIn').textContent = e.message; }
}

/* ---------- Yang baru (diisi otomatis saat update live, file whatsnew.json) ---------- */
async function homeWhatsNew() {
  const host = $('#wnHome'); if (!host) return;
  let L = [];
  try { L = await (await fetch('whatsnew.json?t=' + Date.now(), { cache: 'no-store' })).json(); } catch (e) { host.remove(); return; }
  if (!Array.isArray(L) || !L.length) { host.remove(); return; }
  let seen = 0; try { seen = +localStorage.getItem('kepo.wnSeen') || 0; } catch (e) {}
  const baru = L.filter(x => x.n > seen).length;
  const row = x => `<li><b>${esc(x.judul)}</b>${x.poin ? `<div class="mut sm">${esc(x.poin)}</div>` : ''}</li>`;
  host.innerHTML = `<div class="card wn"><div class="sec-h" style="margin:0 0 8px"><h2>✨ Yang baru${baru ? ` <span class="wn-dot">${baru}</span>` : ''}</h2>${L.length > 3 ? '<button class="ghost" id="wnAll">Lihat semua</button>' : ''}</div><ul class="wn-l">${L.slice(0, 3).map(row).join('')}</ul></div>`;
  const all = $('#wnAll'); if (all) all.onclick = () => { host.querySelector('.wn-l').innerHTML = L.slice(0, 20).map(row).join(''); all.remove(); };
  try { localStorage.setItem('kepo.wnSeen', String(Math.max(...L.map(x => x.n)))); } catch (e) {}
}

/* ---------- pasang ke UI yang ada ---------- */
const _setTab = setTab;
setTab = function (t) {
  _setTab(t);
  renderAcct();
  if (t === 'rak') {
    const ben = $('.bento');
    if (ben && API) { const d = document.createElement('div'); d.id = 'lbHome'; d.style.marginTop = '12px'; ben.after(d); homeLeaderboard(); }
    if (API) $$('.bk[data-open]').forEach(el => { const b = document.createElement('button'); b.className = 'shr'; b.setAttribute('aria-label', 'Bagikan cerita'); b.textContent = '↗'; b.onclick = e => { e.stopPropagation(); shareBook(el.dataset.open); }; el.appendChild(b); });
  }
};
// tombol bagikan juga di mode baca (setelah menu atas digambar)
const _viewBaca = viewBaca;
viewBaca = async function () {
  await _viewBaca();
  const bar = $('.rbar'), b = book();
  if (API && bar && b && !$('#rShare')) { const x = document.createElement('button'); x.className = 'icon'; x.id = 'rShare'; x.setAttribute('aria-label', 'Bagikan cerita'); x.textContent = '↗'; x.style.fontSize = '20px'; x.onclick = () => shareBook(b.id); bar.insertBefore(x, bar.querySelector('#set')); }
};
setTab(db.tab || 'rak');
openSharedFromUrl();
if (db.acct) api('/me').then(r => { db.acct.nick = r.user.nick; db.acct.hidden = r.user.hidden; save(); renderAcct(); }).catch(() => { });
