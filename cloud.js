'use strict';
/* Keepo cloud: akun (login/daftar), sinkron progres, leaderboard mingguan, bagikan cerita. Server: api/ (Cloudflare Worker + D1). */
const API_PROD = 'https://kepo-api.rizkachoirunnisa0403.workers.dev'; // Cloudflare Worker (api/)
const API = (() => {
  const q = new URLSearchParams(location.search).get('api');
  if (q) { localStorage.setItem('kepo.api', q); return q; }
  return localStorage.getItem('kepo.api') || API_PROD;
})();
db.acct = db.acct || null; // { token, username, nick, hidden }
const SYNC_KEYS = ['xp', 'xpDay', 'pgDay', 'badges', 'stat', 'days', 'scores', 'vocab', 'weak', 'taps', 'vocabDel', 'books', 'kenal', 'bkGone'];
const SYNC_MAX = 340 * 1024; // di bawah MAX_DATA server (400 KB)
const TOMB_TTL = 90 * 864e5;

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
// taps: kirim maks 1000 kata teratas (ukuran tetap jauh di bawah batas server)
const topTaps = (t, n = 1000) => Object.fromEntries(Object.entries(t && typeof t === 'object' ? t : {}).sort((a, b) => b[1] - a[1]).slice(0, n));
const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
// keadaan baca ringan per buku (tanpa teks). Waktu ubah dicatat di db.bkAt saat posisi/penanda berubah.
function bkState(b) {
  const marks = (Array.isArray(b.marks) ? b.marks : []).filter(m => m && Number.isFinite(m.p) && Number.isFinite(m.s)).map(m => ({ p: m.p, s: m.s, t: String(m.t || '').slice(0, 80), at: m.at || 0 }));
  const st = { title: b.title, lang: b.lang, pos: b.pos || 0, si: b.si || 0, pct: b.pct == null ? null : (typeof bookPct === 'function' ? bookPct(b) : b.pct), marks };
  st.sig = JSON.stringify([st.pos, st.si, st.pct, marks]);
  return st;
}
function bkLocal() {
  const out = {}; if (!isObj(db.bkAt)) db.bkAt = {};
  for (const b of db.books || []) {
    const k = bkKey(b), st = bkState(b); let r = db.bkAt[k];
    if (!r || r.sig !== st.sig) db.bkAt[k] = r = { sig: st.sig, at: !r && !st.pos && !st.si && !st.marks.length ? 0 : Date.now() };
    st.at = r.at; delete st.sig; out[k] = st;
  }
  return out;
}
function mergeBooks(srvB) {
  const loc = bkLocal(), rem = isObj(srvB) ? srvB : {}, keep = {};
  const open = db.tab === 'baca' && typeof book === 'function' ? book() : null;
  for (const k in rem) {
    const x = rem[k]; if (!isObj(x)) continue;
    const l = loc[k];
    if (!l) { keep[k] = x; continue; }
    if (!((+x.at || 0) > l.at) || !Number.isFinite(x.pos) || (open && bkKey(open) === k)) continue; // yang terbaru menang; buku yang lagi dibaca tidak digeser
    const b = db.books.find(y => bkKey(y) === k); if (!b) continue;
    b.pos = x.pos; if (!b.opened && x.pos > 0) b.opened = +x.at || Date.now(); b.si = Number.isFinite(x.si) ? x.si : 0; if (x.pct != null) b.pct = x.pct;
    const mx = typeof MARK_MAX === 'number' ? MARK_MAX : 20;
    b.marks = (Array.isArray(x.marks) ? x.marks : []).filter(m => m && Number.isFinite(m.p) && Number.isFinite(m.s)).slice(0, mx).map(m => ({ p: m.p, s: m.s, t: String(m.t || '').slice(0, 140), at: m.at || Date.now() }));
    db.bkAt[k] = { sig: bkState(b).sig, at: +x.at };
  }
  db.bkRemote = keep;
}
const VF = ['t', 'baca', 's', 'ctx', 'base', 'pos'];
const vScore = v => VF.reduce((a, f) => a + String(v[f] || '').length, 0);
function mergeVocabEntry(a, b) {
  const [x, y] = vScore(b) > vScore(a) ? [b, a] : [a, b], o = { ...x };
  for (const f of VF) if (String(y[f] || '').length > String(o[f] || '').length) o[f] = y[f];
  const tp = Math.max(+a.tap || 0, +b.tap || 0); if (tp > 0) o.tap = tp;
  if (a.at && b.at) o.at = Math.min(a.at, b.at); else if (a.at || b.at) o.at = a.at || b.at;
  if ((y.lv || 0) > (o.lv || 0)) { o.lv = y.lv; o.due = y.due; }
  if (a.known || b.known) o.known = a.known || b.known;
  if (String(o.t || '').trim()) delete o.noTr;
  return o;
}
// gabung data server ke db (bukan timpa). true bila tampilan perlu digambar ulang.
function mergeSrv(d) {
  if (!isObj(d)) return false;
  const snap = () => JSON.stringify([db.kenal, db.vocab, db.xp, db.badges, (db.books || []).map(b => [b.pos, b.si, b.marks])]);
  const before = snap(), now = Date.now(), tomb = new Map();
  for (const t of [].concat(Array.isArray(db.vocabDel) ? db.vocabDel : [], Array.isArray(d.vocabDel) ? d.vocabDel : [])) {
    if (!t || !t.k || !(+t.at > now - TOMB_TTL)) continue;
    if (!tomb.has(t.k) || tomb.get(t.k) < +t.at) tomb.set(t.k, +t.at);
  }
  db.vocabDel = [...tomb].map(([k, at]) => ({ k, at }));
  const alive = v => isObj(v) && v.w && !(tomb.has(vocabKey(v.lang, v.w)) && tomb.get(vocabKey(v.lang, v.w)) >= (+v.at || 0));
  const map = new Map(), out = [], onlyMap = new Map(), only = [];
  for (const v of Array.isArray(db.vocab) ? db.vocab : []) {
    if (!alive(v)) continue;
    const k = vocabKey(v.lang, v.w), i = map.get(k);
    if (i == null) { map.set(k, out.length); out.push(v); } else out[i] = mergeVocabEntry(out[i], v);
  }
  for (const v of Array.isArray(d.vocab) ? d.vocab : []) {
    if (!alive(v)) continue;
    const k = vocabKey(v.lang, v.w), i = map.get(k), j = onlyMap.get(k);
    if (i != null) out[i] = mergeVocabEntry(out[i], v);
    else if (j != null) only[j] = mergeVocabEntry(only[j], v);
    else { onlyMap.set(k, only.length); only.push(v); }
  }
  // kata baru dari perangkat lain: urut sesuai waktu tambah (terbaru di atas)
  db.vocab = only.length ? out.concat(only).sort((a, b) => (b.at || 0) - (a.at || 0)) : out;
  if ((+d.xp || 0) > (db.xp || 0)) { db.xp = +d.xp; db.lvlSeen = Math.max(db.lvlSeen || 0, Math.floor(db.xp / 100) + 1); } /* hasil sinkron: tanpa popup Level */
  if (isObj(d.xpDay)) { for (const k in d.xpDay) { const n = +d.xpDay[k] || 0; if (n > (+db.xpDay[k] || 0)) db.xpDay[k] = n; } const ks = Object.keys(db.xpDay).sort(); while (ks.length > 60) delete db.xpDay[ks.shift()]; }
  if (isObj(d.pgDay)) { if (!isObj(db.pgDay)) db.pgDay = {}; for (const k in d.pgDay) { const n = +d.pgDay[k] || 0; if (n > (+db.pgDay[k] || 0)) db.pgDay[k] = n; } const pk = Object.keys(db.pgDay).sort(); while (pk.length > 60) delete db.pgDay[pk.shift()]; }
  if (Array.isArray(d.badges)) db.badges = [...new Set([...(db.badges || []), ...d.badges])];
  if (Array.isArray(d.days)) db.days = [...new Set([...(db.days || []), ...d.days])].sort().slice(-400);
  if (isObj(d.stat)) for (const k in d.stat) { const n = +d.stat[k] || 0; if (n > (+db.stat[k] || 0)) db.stat[k] = n; }
  if (Array.isArray(d.scores) && d.scores.length > (db.scores || []).length) db.scores = d.scores.slice(-100);
  if (isObj(d.weak)) {
    if (!isObj(db.weak)) db.weak = {};
    for (const k in d.weak) { const s = d.weak[k], l = db.weak[k]; if (isObj(s) && (!l || (+s.at || 0) > (+l.at || 0) || ((+s.at || 0) === (+l.at || 0) && (+s.n || 0) > (+l.n || 0)))) db.weak[k] = s; }
  }
  if (isObj(d.kenal)) {
    if (!isObj(db.kenal)) db.kenal = {};
    for (const k in d.kenal) { const n = +d.kenal[k] || 0; if (n && Math.abs(n) > Math.abs(+db.kenal[k] || 0)) db.kenal[k] = n; }
  }
  mergeTaps(d.taps);
  mergeBooks(d.books);
  // buku yang dihapus di perangkat lain: jangan diunduh ulang (gabung, waktu terbaru menang)
  if (Array.isArray(d.bkGone)) {
    const m = new Map((Array.isArray(db.bkGone) ? db.bkGone : []).map(x => [x.k, +x.at || 0]));
    for (const x of d.bkGone) if (x && x.k && (+x.at || 0) > (m.get(x.k) || 0)) m.set(x.k, +x.at);
    db.bkGone = [...m].map(([k, at]) => ({ k, at })).sort((a, b) => b.at - a.at).slice(0, 200);
  }
  return snap() !== before;
}
// jaga ukuran di bawah MAX_DATA server: pangkas tombstone/buku tertua/taps bila perlu
function fitData(data) {
  const size = () => JSON.stringify(data).length;
  const keepNew = (o, n) => { const ks = Object.keys(o).sort((a, b) => (o[b].at || 0) - (o[a].at || 0)); ks.slice(n).forEach(k => delete o[k]); };
  const stages = [
    () => { data.vocabDel = data.vocabDel.slice().sort((a, b) => b.at - a.at).slice(0, 300); },
    () => keepNew(data.books, 100),
    () => { data.taps = topTaps(data.taps, 300); },
    () => { data.vocabDel = data.vocabDel.slice(0, 50); keepNew(data.books, 30); data.taps = topTaps(data.taps, 100); }
  ];
  for (const s of stages) { if (size() <= SYNC_MAX) break; s(); }
  return data;
}
function progressData() {
  const data = Object.fromEntries(SYNC_KEYS.map(k => [k, k === 'taps' ? topTaps(db.taps) : db[k]]));
  const loc = bkLocal(), books = { ...(isObj(db.bkRemote) ? db.bkRemote : {}) };
  for (const k in loc) if (loc[k].at > 0 || books[k]) books[k] = loc[k];
  data.books = books;
  data.vocabDel = (Array.isArray(db.vocabDel) ? db.vocabDel : []).filter(t => t && +t.at > Date.now() - TOMB_TTL);
  return fitData(data);
}
const dataSig = () => JSON.stringify(progressData()) + db.acct.hidden + db.acct.nick;
// gabung ketukan: angka terbesar per kunci 'bahasa|kata'
function mergeTaps(srv) {
  if (!srv || typeof srv !== 'object') return;
  if (!db.taps || typeof db.taps !== 'object') db.taps = {};
  for (const k in srv) { const n = +srv[k] || 0; if (n > (+db.taps[k] || 0)) db.taps[k] = n; }
}
let lastSync = '', syncCur = null;
function syncRefresh(force) {
  if (!force && !$('#sheet').classList.contains('hide')) return;
  const typing = document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if (db.tab === 'rak' || (db.tab === 'kata' && typeof kataSeg !== 'undefined' && kataSeg === 'simpan' && !typing)) setTab(db.tab);
}
async function doSync(opt) {
  if (navigator.onLine === false) { if (opt.manual) throw new Error('Lagi offline. Coba lagi pas ada internet ya.'); return false; }
  const r = opt.pre || await api('/me');
  if (opt.profile && r.user) { db.acct.nick = r.user.nick; db.acct.hidden = r.user.hidden; renderAcct(); }
  if (r.user && 'publik' in r.user) { db.acct.publik = !!r.user.publik; db.acct.hideTitles = !!r.user.hideTitles; }
  const changed = mergeSrv(r.data); save();
  const data = progressData(), sig = JSON.stringify(data) + db.acct.hidden + db.acct.nick;
  if (opt.force || sig !== lastSync) {
    await api('/sync', { method: 'PUT', body: { data, xp: db.xp, weekXp: weekXp(), hidden: !!db.acct.hidden, nick: db.acct.nick, profile: profileData() } });
    lastSync = sig;
  }
  if (changed && !opt.noRefresh) syncRefresh(opt.manual);
  syncBooks().catch(() => { }); // teks buku: jalan di belakang, tidak menahan sinkron kata/XP
  return changed;
}

/* ---------- Buku di akun: teks buku disimpan terkompresi (gzip) di server ---------- */
const BKC = 590 * 1024; // potongan per unggahan (server: maks 600 KB)
const canGz = typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';
const hexOf = buf => [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
async function bookKey(b) { return hexOf(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(bkKey(b)))).slice(0, 40); }
async function gzB64(str) {
  const buf = await new Response(new Blob([str]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
  const u = new Uint8Array(buf); let bin = '';
  for (let i = 0; i < u.length; i += 0x8000) bin += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(bin);
}
async function unGzB64(s) {
  const u = Uint8Array.from(atob(s), c => c.charCodeAt(0));
  return await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
}
async function uploadBook(b) {
  const paras = await getText(b.id); if (!Array.isArray(paras) || !paras.length) return false;
  const data = await gzB64(JSON.stringify(paras)), key = await bookKey(b), n = Math.ceil(data.length / BKC);
  const meta = { title: b.title, lang: b.lang, added: b.added || Date.now() };
  for (let i = 0; i < n; i++) await api(`/books/${key}?i=${i}&n=${n}`, { method: 'PUT', body: { data: data.slice(i * BKC, (i + 1) * BKC), size: data.length, meta } });
  b.cloud = Date.now(); save(); return true;
}
// dipanggil dari hapusBuku (ui.js) setelah buku benar-benar dihapus di perangkat ini
async function bookGone(b) {
  if (!b || !canGz) return;
  const k = await bookKey(b);
  db.bkGone = [{ k, at: Date.now() }, ...(Array.isArray(db.bkGone) ? db.bkGone : []).filter(x => x.k !== k)].slice(0, 200); save();
  if (db.acct && API) api(`/books/${k}`, { method: 'DELETE' }).catch(() => { });
}
let bkBusy = false;
async function syncBooks() {
  if (!db.acct || !API || !canGz || bkBusy || navigator.onLine === false) return;
  bkBusy = true;
  try {
    const rem = (await api('/books')).books || [];
    const remKeys = new Set(rem.map(x => x.key));
    const gone = new Map((Array.isArray(db.bkGone) ? db.bkGone : []).map(x => [x.k, +x.at || 0]));
    const loc = new Map(); for (const b of db.books || []) loc.set(await bookKey(b), b);
    // naik: buku di perangkat ini yang belum ada di akun (kecuali dihapus setelah buku ini ditambahkan)
    for (const [k, b] of loc) {
      if (remKeys.has(k) || (gone.get(k) || 0) > (b.added || 0)) continue;
      try { await uploadBook(b); } catch (e) { if (/penuh|besar/i.test(e.message)) { toast(e.message, 5000); break; } }
    }
    // turun: buku di akun yang belum ada di perangkat ini
    let added = 0;
    for (const x of rem) {
      if (loc.has(x.key) || (gone.get(x.key) || 0) > (x.at || 0)) continue;
      try {
        const r = await api(`/books/${x.key}`), paras = JSON.parse(await unGzB64(r.data));
        if (!Array.isArray(paras) || !paras.length) continue;
        const id = 'b' + Date.now().toString(36) + added;
        await putText(id, paras);
        db.books.push({ id, title: r.meta.title || 'Tanpa judul', lang: r.meta.lang || 'en', pos: 0, si: 0, total: 0, v: 2, added: r.meta.added || Date.now(), opened: +r.meta.opened || 0, cloud: Date.now() });
        added++; save();
      } catch (e) { }
    }
    if (added) { mergeBooks({ ...(db.bkRemote || {}) }); save(); toast(`${added} buku dipulihkan dari akun.`); syncRefresh(true); }
  } catch (e) { } finally { bkBusy = false; }
}
// satu proses sinkron pada satu waktu (kunci sederhana): tarik → gabung → kirim
async function runSync(opt = {}) {
  if (!db.acct || !API) return false;
  if (syncCur) { if (!opt.force) return false; try { await syncCur; } catch (e) { } }
  syncCur = doSync(opt);
  try { return await syncCur; } finally { syncCur = null; }
}
const pushSync = force => runSync({ force: !!force, noRefresh: true });
async function afterLogin(res) {
  db.acct = { token: res.token, username: res.user.username, nick: res.user.nick, hidden: !!res.user.hidden, publik: !!res.user.publik, hideTitles: !!res.user.hideTitles };
  const had = !!(res.data && (res.data.xp || (res.data.vocab || []).length));
  save();
  try { await runSync({ force: true, pre: { data: res.data }, noRefresh: true }); } catch (e) { }
  toast(`Hai ${db.acct.nick}! ${had ? 'Progres kamu sudah digabung dengan akun' : 'Progres di HP ini disimpan ke akun'}`);
  closeSheet(); setTab(db.tab || 'rak');
  // catatan jujur: tampil sekali saja setelah login
  if (!localStorage.getItem('kepo.noteAkun2')) { try { localStorage.setItem('kepo.noteAkun2', '1'); } catch (e) { } setTimeout(() => toast(NOTE_AKUN.replace(/&amp;/g, '&'), 7000), 600); }
}
setInterval(() => { if (db.acct && document.visibilityState === 'visible' && dataSig() !== lastSync) runSync().catch(() => { }); }, 20000);
setInterval(() => { if (document.visibilityState === 'visible') runSync().catch(() => { }); }, 60000);
addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') runSync().catch(() => { }); else pushSync().catch(() => { }); });
addEventListener('online', () => { runSync().catch(() => { }); });

/* ---------- Catatan jujur & cadangan penanda (tanpa teks buku) ---------- */
const NOTE_AKUN = 'Kata, XP, buku, posisi baca &amp; penanda ikut akun.';
const bkKey = b => (b.lang || '') + '|' + String(b.title || '').trim().toLowerCase();
function bkCard() {
  return `<div class="set-row"><div class="mut sm">Kalau masuk akun, semuanya tersimpan otomatis. Cadangan file ini untuk yang tidak pakai akun. Teks buku tidak ikut: impor ulang filenya, lalu pulihkan.</div>
    <div class="row"><button class="sec" id="bkOut" type="button">Simpan cadangan (kata, penanda, posisi)</button></div>
    <div class="row"><button class="sec" id="bkIn" type="button">Pulihkan dari cadangan</button></div>
    <input type="file" id="bkFile" accept="application/json,.json" hidden></div>`;
}
function bkWire() {
  const o = $('#bkOut'), i = $('#bkIn'), f = $('#bkFile'); if (!o || !i || !f) return;
  o.onclick = bkSave; i.onclick = () => f.click();
  f.onchange = () => { const file = f.files && f.files[0]; f.value = ''; if (file) bkRestore(file); };
}
function bkSave() {
  const list = (db.books || []).map(b => ({ title: b.title, lang: b.lang, pos: b.pos || 0, si: b.si || 0, pct: typeof bookPct === 'function' ? bookPct(b) : b.pct, marks: (Array.isArray(b.marks) ? b.marks : []).map(m => ({ p: m.p, s: m.s, t: m.t, at: m.at })) }));
  const vocab = Array.isArray(db.vocab) ? db.vocab.filter(isObj) : [];
  if (!list.length && !vocab.length && !(db.xp > 0)) return toast('Belum ada data buat dicadangkan.');
  // v2: tambah data belajar (tanpa token/akun)
  const out = { kepo: 'cadangan-penanda', v: 2, at: Date.now(), books: list, vocab, kenal: isObj(db.kenal) ? db.kenal : {} };
  for (const k of ['xp', 'xpDay', 'pgDay', 'badges', 'days', 'stat']) if (db[k] != null) out[k] = db[k];
  const blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
  const u = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = u; a.download = 'kepo-cadangan.json'; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 2000);
  try { localStorage.setItem('kepo.bkDone', '1'); } catch (e) { }
  toast('Cadangan tersimpan');
}
async function bkRestore(file) {
  let d; try { d = JSON.parse(await file.text()); } catch (e) { d = null; }
  if (!d || d.kepo !== 'cadangan-penanda' || !Array.isArray(d.books)) return toast('Ini bukan file cadangan Keepo.', 4000);
  let hit = 0, miss = 0, added = 0, words = 0;
  for (const x of d.books) {
    if (!x || typeof x !== 'object') continue;
    const b = (db.books || []).find(y => bkKey(y) === bkKey(x));
    if (!b) { miss++; continue; }
    hit++;
    // posisi: hanya diisi kalau buku di HP ini belum dibaca (tidak menimpa)
    if (!(b.pos > 0) && !(b.si > 0) && Number.isFinite(x.pos) && x.pos > 0) { b.pos = x.pos; b.si = Number.isFinite(x.si) ? x.si : 0; if (x.pct != null) b.pct = x.pct; }
    const cur = Array.isArray(b.marks) ? b.marks : [];
    for (const m of Array.isArray(x.marks) ? x.marks : []) {
      if (!m || !Number.isFinite(m.p) || !Number.isFinite(m.s)) continue;
      if (cur.some(c => c.p === m.p && c.s === m.s)) continue;
      if (cur.length >= (typeof MARK_MAX === 'number' ? MARK_MAX : 20)) break;
      cur.push({ p: m.p, s: m.s, t: String(m.t || '').slice(0, 140), at: m.at || Date.now() }); added++;
    }
    b.marks = cur;
  }
  if (+d.v >= 2) {
    // kata: tambah lalu gabung duplikat (data yang ada tidak ditimpa); XP ambil yang lebih besar
    if (!Array.isArray(db.vocab)) db.vocab = [];
    const have = new Set(db.vocab.filter(isObj).map(v => vocabKey(v.lang, v.w))), seen = new Set();
    for (const v of Array.isArray(d.vocab) ? d.vocab : []) {
      if (!isObj(v) || !v.w || !v.lang) continue;
      const k = vocabKey(v.lang, v.w);
      if (!have.has(k) && !seen.has(k)) words++;
      seen.add(k); untombVocab(v.lang, v.w);
      db.vocab.push({ ...v });
    }
    dedupeVocab();
    if (isObj(d.kenal)) {
      if (!isObj(db.kenal)) db.kenal = {};
      for (const k in d.kenal) { const n = +d.kenal[k] || 0; if (n && Math.abs(n) > Math.abs(+db.kenal[k] || 0)) db.kenal[k] = n; }
    }
    if ((+d.xp || 0) > (db.xp || 0)) { db.xp = +d.xp; db.lvlSeen = Math.max(db.lvlSeen || 0, Math.floor(db.xp / 100) + 1); }
    if (isObj(d.xpDay)) { if (!isObj(db.xpDay)) db.xpDay = {}; for (const k in d.xpDay) { const n = +d.xpDay[k] || 0; if (n > (+db.xpDay[k] || 0)) db.xpDay[k] = n; } }
    if (isObj(d.pgDay)) { if (!isObj(db.pgDay)) db.pgDay = {}; for (const k in d.pgDay) { const n = +d.pgDay[k] || 0; if (n > (+db.pgDay[k] || 0)) db.pgDay[k] = n; } }
    if (Array.isArray(d.badges)) db.badges = [...new Set([...(db.badges || []), ...d.badges])];
    if (Array.isArray(d.days)) db.days = [...new Set([...(db.days || []), ...d.days])].sort().slice(-400);
    if (isObj(d.stat)) { if (!isObj(db.stat)) db.stat = {}; for (const k in d.stat) { const n = +d.stat[k] || 0; if (n > (+db.stat[k] || 0)) db.stat[k] = n; } }
  }
  save();
  const bits = [];
  if (+d.v >= 2) bits.push(`${words} kata`);
  bits.push(`${added} penanda`);
  const tail = miss ? `. ${miss} buku belum ada di HP ini (impor dulu, lalu pulihkan lagi)` : '';
  toast(hit || words ? `Beres: ${bits.join(' & ')} dipulihkan${tail}.` : 'Belum ada bukunya di HP ini. Impor bukunya dulu, lalu pulihkan lagi.', 5000);
}

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
      <div class="set-row"><div class="eyebrow">Leaderboard</div><div class="seg" id="aHide"><button data-v="0" class="${db.acct.hidden ? '' : 'on'}">${ico('trophy')}Tampilkan aku</button><button data-v="1" class="${db.acct.hidden ? 'on' : ''}">${ico('eyeoff')}Sembunyikan</button></div></div>
      <div class="set-row"><div class="eyebrow">Profil sosial</div><div class="seg" id="aPub"><button data-v="0" class="${db.acct.publik ? '' : 'on'}">Privat</button><button data-v="1" class="${db.acct.publik ? 'on' : ''}">Publik</button></div>
        <div class="mut sm" style="margin-top:6px">Publik: orang lain bisa cari kamu dan lihat buku yang sedang kamu baca. Teks buku tidak pernah dibagikan.</div>
        <label class="row" style="gap:8px;margin-top:8px;align-items:center"><input type="checkbox" id="aHideT" style="width:auto" ${db.acct.hideTitles ? 'checked' : ''}> <span class="sm">Sembunyikan judul buku</span></label>
        <div class="row" style="margin-top:8px"><button class="sec" id="aMe">Lihat profilku</button></div></div>
      <div class="mut sm">${NOTE_AKUN}</div>${bkCard()}
      <div class="row"><button class="sec" id="aSync">Sinkron sekarang</button><button class="pri" id="aOut">Keluar</button></div>`);
    bkWire();
    const setSocial = async () => { try { await api('/social', { method: 'PUT', body: { publik: !!db.acct.publik, hideTitles: !!db.acct.hideTitles } }); save(); } catch (e) { toast(e.message); } };
    $$('#aPub button').forEach(b => b.onclick = () => { db.acct.publik = b.dataset.v === '1'; $$('#aPub button').forEach(x => x.classList.toggle('on', x === b)); setSocial().then(() => toast(db.acct.publik ? 'Profilmu sekarang publik.' : 'Profilmu sekarang privat.')); });
    $('#aHideT').onchange = e => { db.acct.hideTitles = e.target.checked; setSocial(); };
    $('#aMe').onclick = () => openProfile(db.acct.username);
    $('#aNick').onchange = e => { const v = e.target.value.trim(); if (v) { db.acct.nick = v.slice(0, 24); save(); renderAcct(); pushSync(true).catch(err => toast(err.message)); } };
    $$('#aHide button').forEach(b => b.onclick = () => { db.acct.hidden = b.dataset.v === '1'; save(); $$('#aHide button').forEach(x => x.classList.toggle('on', x === b)); pushSync(true).catch(err => toast(err.message)); });
    $('#aSync').onclick = async () => { try { const ch = await runSync({ force: true, manual: true }); toast(ch ? 'Tersinkron. Data dari perangkat lain sudah digabung.' : 'Tersinkron'); } catch (e) { toast(e.message); } };
    $('#aOut').onclick = async () => { try { await pushSync(true); await api('/logout', { method: 'POST' }); } catch (e) { } db.acct = null; save(); closeSheet(); toast('Kamu sudah keluar. Progres tetap ada di HP ini.'); setTab(db.tab || 'rak'); };
    return;
  }
  let m = mode === 'daftar' ? 'daftar' : 'masuk';
  const draw = () => {
    openSheet(`<div class="sh-head"><h2>${m === 'masuk' ? 'Masuk' : 'Bikin akun'}</h2>${closeBtn}</div>
      <div class="hello-sub">${spot('happy')}<div class="mut sm">${m === 'masuk' ? 'Lanjutin progres kamu di HP mana aja.' : 'Simpan XP & streak, ikut leaderboard, dan bagikan cerita ke teman.'}</div></div>
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
const lbRow = (r, me) => `<div class="lb-row${me ? ' me' : ''}"><span class="rk">${r.rank <= 3 ? `<span class="medal m${r.rank}" aria-label="Peringkat ${r.rank}">${r.rank}</span>` : '#' + r.rank}</span><span class="avatar">${esc(initial(r.nick))}</span><b>${esc(r.nick)}</b><span class="xp">${r.week_xp} XP</span></div>`;
async function homeLeaderboard() {
  const host = $('#lbHome'); if (!host) return;
  if (!API) { host.remove(); return; }
  if (!db.acct) { host.innerHTML = `<div class="tile t-blue lb-cta"><div><div class="eyebrow">Leaderboard minggu ini</div><b>Masuk buat ikut balapan XP</b></div><button class="lime" id="lbIn">Masuk</button></div>`; $('#lbIn').onclick = () => openAccount('daftar'); return; }
  host.innerHTML = `<div class="card lb"><div class="sec-h" style="margin:0 0 8px"><h2>${ico('trophy')}Minggu ini</h2><button class="ghost" id="lbAll">Lihat semua</button></div><div id="lbList" class="mut sm">Memuat…</div></div>`;
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
  openSheet(`<div class="sh-head"><h2>${ico('trophy')}Leaderboard</h2>${closeBtn}</div><div class="mut sm" id="lbWeek">XP minggu ini · reset tiap Senin</div><div id="lbFull" style="margin-top:12px" class="mut sm">Memuat…</div>`);
  try {
    const r = await api('/leaderboard');
    $('#lbWeek').textContent = `XP minggu ${r.week} · reset tiap Senin`;
    $('#lbFull').innerHTML = (r.top.length ? r.top.map(t => lbRow(t, r.me && t.username === r.me.username)).join('') : '<div class="mut sm">Belum ada peserta minggu ini.</div>')
      + (r.me && !r.me.hidden && !r.top.some(t => t.username === r.me.username) ? '<div class="lb-gap">···</div>' + lbRow(r.me, true) : '');
  } catch (e) { $('#lbFull').textContent = e.message; }
}

/* ---------- Sosial: profil & teman membaca ---------- */
// ringkasan profil yang dikirim saat sinkron: hanya judul, bahasa, % baca. Tanpa teks buku.
/* kunci satu buku: judul dinormalkan (lebar huruf, spasi, besar-kecil, ekstensi file); bahasa diabaikan */
const titleKey = t => String(t || '').normalize('NFKC').replace(/\.(txt|epub|pdf)$/i, '').toLowerCase().replace(/[\s\p{P}]+/gu, '');
function profileData() {
  const wk = Date.now() - 7 * 864e5;
  const seen = new Map(); /* satu baris per buku (judul+bahasa sama digabung, persen tertinggi) */
  (db.books || []).filter(b => b.opened || b.pos > 0).sort((a, b) => (b.opened || 0) - (a.opened || 0)).forEach(b => {
    const k = titleKey(b.title), pct = typeof pctOf === 'function' ? pctOf(b) : 0, o = seen.get(k);
    if (!o) seen.set(k, { t: String(b.title || '').slice(0, 80), lang: b.lang, pct, at: b.opened || 0 });
    else o.pct = Math.max(o.pct, pct);
  });
  const reading = [...seen.values()].slice(0, 3);
  return { reading, langs: [...new Set((db.books || []).map(b => b.lang).filter(Boolean))].slice(0, 6), kata7: kataBaruMinggu(), streak: typeof streak === 'function' ? streak() : 0, level: Math.floor((db.xp || 0) / 100) + 1, at: Date.now() };
}
const lalu = t => { if (!t) return ''; const m = Math.round((Date.now() - t) / 6e4); return m < 60 ? `${Math.max(1, m)} mnt lalu` : m < 1440 ? `${Math.round(m / 60)} jam lalu` : `${Math.round(m / 1440)} hari lalu`; };
/* buang bagian judul yang dobel (mis. nama pengarang tertulis dua kali) */
const judulRapi = t => { const seen = new Set(); return String(t || '').split(/(\s[-–—|·]\s)/).reduce((o, p, i, a) => { if (i % 2) return o; const k = p.trim().toLowerCase(); if (seen.has(k)) return o; seen.add(k); return o + (o && a[i - 1] ? a[i - 1] : '') + p; }, ''); };
const bacaBaris = r => `<div class="fr-read"><b class="fr-ttl">${esc(judulRapi(r.t))}</b><div class="fr-meta"><span class="lg">${esc(langName(r.lang))}</span><span class="mut fr-st">${typeof statusPct === 'function' ? statusPct(r.pct).txt : r.pct + '%'}</span></div><div class="bar"><i style="width:${r.pct}%"></i></div></div>`;
const frRow = u => `<button class="fr-row" data-u="${esc(u.username)}"><span class="avatar">${esc(initial(u.nick))}</span><span class="fr-in"><b>${esc(u.nick)}</b> <span class="mut sm">@${esc(u.username)}</span>${u.reading && u.reading[0] ? `<span class="sm">${u.reading[0].pct >= 100 ? 'Selesai baca' : 'Sedang baca'} <b>${esc(u.reading[0].t)}</b> · ${typeof statusPct === 'function' ? statusPct(u.reading[0].pct).txt : u.reading[0].pct + '%'}</span>` : '<span class="mut sm">Belum mulai membaca</span>'}</span></button>`;
const wireRows = root => root.querySelectorAll('[data-u]').forEach(b => b.onclick = () => openProfile(b.dataset.u));
async function homeFriends() {
  const host = $('#frHome'); if (!host || !db.acct) { if (host) host.remove(); return; }
  host.innerHTML = `<div class="card lb"><div class="sec-h" style="margin:0 0 8px"><h2>Teman membaca</h2><button class="ghost" id="frFind">Cari teman</button></div><div id="frList" class="mut sm">Memuat…</div></div>`;
  $('#frFind').onclick = openFriends;
  try {
    const r = await api('/teman');
    $('#frList').innerHTML = r.users.length ? r.users.map(frRow).join('') : `<div class="mut sm">Belum mengikuti siapa pun. Cari teman untuk lihat apa yang mereka baca.${db.acct.publik ? '' : ' Profilmu masih privat; ubah di Akun bila ingin ditemukan.'}</div>`;
    wireRows($('#frList'));
  } catch (e) { $('#frList').textContent = e.message; }
}
async function openFriends() {
  openSheet(`<div class="sh-head"><h2>Teman</h2>${closeBtn}</div>
    <input id="frQ" type="search" placeholder="Cari nama atau @username" aria-label="Cari teman" autocomplete="off">
    <div id="frRes" style="margin-top:12px"></div><div class="sec-h" style="margin:16px 0 6px"><h2 style="font-size:18px">Yang kamu ikuti</h2></div><div id="frMine" class="mut sm">Memuat…</div>`, 'Teman');
  let tm;
  $('#frQ').oninput = e => { clearTimeout(tm); const q = e.target.value.trim(); tm = setTimeout(async () => {
    if (q.length < 2) { $('#frRes').innerHTML = ''; return; }
    try { const r = await api('/cari?q=' + encodeURIComponent(q)); $('#frRes').innerHTML = r.users.length ? r.users.map(frRow).join('') : '<div class="mut sm">Tidak ada profil publik dengan nama itu.</div>'; wireRows($('#frRes')); } catch (x) { $('#frRes').textContent = x.message; }
  }, 300); };
  try { const r = await api('/teman'); $('#frMine').innerHTML = r.users.length ? r.users.map(frRow).join('') : 'Belum ada.'; wireRows($('#frMine')); } catch (e) { $('#frMine').textContent = e.message; }
}
/* ---------- Rak buku di Profil (#972, tahap 1: lokal saja) ----------
   db.rakTema (nama tema), db.rak = { urut, susun:[idBuku] }. Data lama tanpa kolom = bawaan; tidak ikut sinkron. */
const RAK_TEMA = ['Kayu hangat', 'Plum Noir', 'Biru Es', 'Polos'];
const RAK_URUT = [['terakhir', 'Terakhir dibaca'], ['az', 'Judul A–Z'], ['bahasa', 'Bahasa'], ['susun', 'Susunan sendiri']];
const RAK_MAX = 12;
let rakSemua = false;
function rakState() { /* migrasi aman: nilai rusak/lama jadi bawaan */
  if (!RAK_TEMA.includes(db.rakTema)) db.rakTema = 'Plum Noir';
  if (!db.rak || typeof db.rak !== 'object' || Array.isArray(db.rak)) db.rak = {};
  if (!RAK_URUT.some(u => u[0] === db.rak.urut)) db.rak.urut = 'terakhir';
  const ids = new Set((db.books || []).map(b => b.id));
  db.rak.susun = (Array.isArray(db.rak.susun) ? db.rak.susun : []).filter((id, i, a) => ids.has(id) && a.indexOf(id) === i); /* buku dihapus → ikut dibuang */
  return db.rak;
}
function rakList() {
  const r = rakState(), L = (db.books || []).slice();
  if (r.urut === 'az') L.sort((a, b) => String(a.title).localeCompare(String(b.title), 'id'));
  else if (r.urut === 'bahasa') L.sort((a, b) => String(a.lang).localeCompare(String(b.lang)) || (b.opened || 0) - (a.opened || 0));
  else if (r.urut === 'susun') { const ix = id => { const i = r.susun.indexOf(id); return i < 0 ? 1e6 : i; }; L.sort((a, b) => ix(a.id) - ix(b.id) || (b.opened || 0) - (a.opened || 0)); }
  else L.sort((a, b) => (b.opened || 0) - (a.opened || 0));
  return L;
}
function rakHtml() {
  const r = rakState(), L = rakList(), tm = ['kayu', 'plum', 'es', 'polos'][RAK_TEMA.indexOf(db.rakTema)];
  const head = `<div class="sec-h" style="margin:16px 0 8px"><h2 style="font-size:18px">Rak</h2><span class="mut sm">${L.length} buku</span></div>`;
  if (!L.length) return `<div id="rakBox">${head}<div class="rk-empty"><b>Rak masih kosong</b><span class="mut sm">Buku yang kamu tambah akan berdiri di sini sebagai sampul.</span><button class="pri" id="rkAdd">Tambah cerita pertamamu</button></div></div>`;
  const show = rakSemua ? L : L.slice(0, RAK_MAX);
  const grp = [['Sedang dibaca', b => pctOf(b) > 0 && pctOf(b) < 100], ['Tamat', b => pctOf(b) >= 100], ['Belum dibuka', b => pctOf(b) <= 0]];
  const bk = b => { const p = pctOf(b), t = splitTitle(b.title).main; return `<button class="rk-bk" data-rb="${esc(b.id)}" aria-label="${esc(t)}, ${p}%">${cover(b)}${p >= 100 ? '<span class="rk-tag">Tamat</span>' : ''}<span class="rk-t">${esc(t)}</span><span class="rk-p">${p}%</span></button>`; };
  const shelves = grp.map(([n, f]) => { const x = show.filter(f); return x.length ? `<div class="rk-shelf"><div class="rk-g">${n}</div><div class="rk-row">${x.map(bk).join('')}</div><div class="rk-board"></div></div>` : ''; }).join('');
  const susun = r.urut === 'susun' ? `<div class="eyebrow" style="margin:12px 0 4px">Atur urutan</div>${L.map((b, i) => { const t = esc(splitTitle(b.title).main); return `<div class="rk-up"><span class="rk-n">${i + 1}</span><span class="rk-ut">${t}</span><button class="sec" data-rn="${esc(b.id)}" data-d="-1" ${i ? '' : 'disabled'} aria-label="Naikkan ${t}">Naik</button><button class="sec" data-rn="${esc(b.id)}" data-d="1" ${i < L.length - 1 ? '' : 'disabled'} aria-label="Turunkan ${t}">Turun</button></div>`; }).join('')}` : '';
  return `<div id="rakBox">${head}
    <div class="rk-chips" role="group" aria-label="Tema rak">${RAK_TEMA.map(t => `<button class="rk-chip${t === db.rakTema ? ' on' : ''}" data-rt="${esc(t)}" aria-pressed="${t === db.rakTema}">${t === db.rakTema ? '✓ ' : ''}${t}</button>`).join('')}</div>
    <div class="rk-chips" role="group" aria-label="Urutan rak">${RAK_URUT.map(([k, n]) => `<button class="rk-chip${k === r.urut ? ' on' : ''}" data-ru="${k}" aria-pressed="${k === r.urut}">${n}</button>`).join('')}</div>
    <div class="rk-wrap rk-${tm}">${shelves}</div>
    ${L.length > RAK_MAX ? `<button class="sec rk-more" id="rkMore">${rakSemua ? 'Tampilkan lebih sedikit' : `Lihat semua (${L.length})`}</button>` : ''}${susun}</div>`;
}
function wireRak() {
  const box = $('#rakBox'); if (!box) return;
  const redo = () => { const y = $('#sheet').scrollTop; box.outerHTML = rakHtml(); wireRak(); $('#sheet').scrollTop = y; };
  box.querySelectorAll('[data-rt]').forEach(b => b.onclick = () => { db.rakTema = b.dataset.rt; save(); redo(); });
  box.querySelectorAll('[data-ru]').forEach(b => b.onclick = () => { const r = rakState(); if (b.dataset.ru === 'susun' && r.urut !== 'susun') r.susun = rakList().map(x => x.id); r.urut = b.dataset.ru; save(); redo(); });
  box.querySelectorAll('[data-rn]').forEach(b => b.onclick = () => { const r = rakState(), a = rakList().map(x => x.id), i = a.indexOf(b.dataset.rn), j = i + (+b.dataset.d); if (i < 0 || j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; r.susun = a; save(); redo(); });
  box.querySelectorAll('[data-rb]').forEach(b => b.onclick = () => { db.cur = b.dataset.rb; save(); closeSheet(); setTab('baca'); });
  const m = $('#rkMore'); if (m) m.onclick = () => { rakSemua = !rakSemua; redo(); };
  const ad = $('#rkAdd'); if (ad) ad.onclick = () => { closeSheet(); setTab('rak'); };
}
async function openProfile(username) {
  openSheet(`<div class="sh-head"><h2>Profil</h2>${closeBtn}</div><div id="pfBody" class="mut sm">Memuat…</div>`, 'Profil');
  try {
    const p = await api('/u/' + encodeURIComponent(username));
    if (p.self) p.kata7 = kataBaruMinggu(); /* dari kata tersimpan lokal, bukan data sinkron lama */
    if (p.self) p.reading = profileData().reading; /* persen terbaru dari buku lokal */
    const zero = !(+p.kata7 > 0);
    const rdMap = new Map(); /* satu entri per judul+bahasa, progres terbesar (data asli tak diubah) */
    (p.reading || []).forEach(r => { const k = titleKey(r.t), o = rdMap.get(k); if (!o || r.pct > o.pct) rdMap.set(k, r); });
    const rd = [...rdMap.values()], rdNow = rd.filter(r => r.pct < 100), rdDone = rd.filter(r => r.pct >= 100); /* 100 = Tamat, sama seperti kartu Home */
    $('#pfBody').innerHTML = `<div class="acct-card"><div class="avatar big">${esc(initial(p.nick))}</div><div><b>${esc(p.nick)}</b><div class="mut sm">@${esc(p.username)} · Level ${p.self ? level() : p.level}${p.self ? (p.publik ? ' · publik' : ' · privat') : ''}</div>${p.self ? `<div class="mut sm">${db.xp} XP · ${xpRinci()}</div>` : ''}</div></div>
      <div class="fr-stats"><div><b>${p.streak}</b><span>hari berturut</span></div>${zero ? '' : `<div><b>${p.kata7}</b><span>kata/minggu</span></div>`}<div><b>${p.pengikut}</b><span>pengikut</span></div><div><b>${p.mengikuti}</b><span>mengikuti</span></div></div>
      ${zero ? `<div class="mut sm" style="margin-top:10px">${rdDone.length && !rdNow.length ? 'Mulai buku lain yuk, cari kata baru.' : NUDGE_TXT}</div>` : ''}
      <div class="eyebrow" style="margin:14px 0 6px">Sedang dibaca</div>${rdNow.length ? rdNow.map(bacaBaris).join('') : `<div class="mut sm">${rdDone.length ? 'Mulai buku lain yuk, ketuk Koleksi di Home.' : 'Belum ada buku yang dibuka.'}</div>`}
      ${rdDone.length ? `<div class="eyebrow" style="margin:14px 0 6px">Selesai</div>${rdDone.map(bacaBaris).join('')}` : ''}
      ${p.self ? rakHtml() : ''}
      ${p.self ? `<div class="sec-h" style="margin:16px 0 8px"><h2 style="font-size:18px">Lencana</h2><span class="mut sm">${BADGES.filter(b => badgeShown(b[0])).length}/${BADGES.length} kebuka</span></div>
      <div class="hscroll">${BADGES.map(([id, em, name, desc], i) => `<div class="badge ${['t-lime', 't-lav', 't-pink', 't-sun', 't-mint', 't-coral', 't-blue', 't-cream', 't-lav', 't-lime'][i % 10]}${badgeShown(id) ? '' : ' off'}" title="${esc(badgeShown(id) ? desc : 'Terkunci: ' + (id === 'kepo1' ? 'Ketuk 1 kata & simpan' : desc))}"><span class="em">${ico(em)}</span><b>${name}</b><span class="d">${badgeShown(id) ? desc : `${ico('lock', 'lk')} ${id === 'kepo1' ? 'Ketuk 1 kata & simpan' : desc}`}</span></div>`).join('')}</div>` : ''}
      ${p.aktif ? `<div class="mut sm" style="margin-top:8px">Aktif ${lalu(p.aktif)}</div>` : ''}
      ${p.self ? '' : `<div class="row" style="margin-top:14px"><button class="${p.diikuti ? 'sec' : 'pri'}" id="pfFol">${p.diikuti ? 'Berhenti ikuti' : 'Ikuti'}</button></div>`}`;
    if (p.self) wireRak();
    const f = $('#pfFol'); if (f) f.onclick = async () => { f.disabled = true; try { await api('/ikuti/' + encodeURIComponent(p.username), { method: p.diikuti ? 'DELETE' : 'POST' }); toast(p.diikuti ? `Berhenti mengikuti ${p.nick}.` : `Kamu mengikuti ${p.nick}.`); openProfile(p.username); if ($('#frHome')) homeFriends(); } catch (e) { toast(e.message); f.disabled = false; } };
  } catch (e) { $('#pfBody').textContent = e.message; }
}

/* ---------- FYP: status & berbagi bahan bacaan ---------- */
let fypCache = null;
const fypRow = p => `<div class="fyp-p" data-pid="${p.id}">
  <button class="fyp-who" data-u="${esc(p.username)}"><span class="avatar">${esc(initial(p.nick))}</span><span class="fr-in"><b>${esc(p.nick)}</b><span class="mut sm">@${esc(p.username)} · ${lalu(p.at)}${p.diikuti ? ' · teman' : ''}</span></span></button>
  <div class="fyp-t">${esc(p.text)}</div>
  ${p.book ? `<div class="fyp-b">${ico('book')}<span>${esc(p.book)}${p.lang ? ' · ' + esc(langName(p.lang)) : ''}</span>${p.share ? `<button class="sec" data-share="${esc(p.share)}">Baca juga</button>` : ''}</div>` : ''}
  <div class="fyp-a"><button class="ghost fyp-like${p.akuSuka ? ' on' : ''}" data-like="${p.id}" aria-pressed="${p.akuSuka}">${p.akuSuka ? '♥' : '♡'} ${p.suka || ''}</button>${p.milikku ? `<button class="ghost" data-del="${p.id}">Hapus</button>` : ''}</div></div>`;
function wireFyp(root) {
  wireRows(root);
  root.querySelectorAll('[data-share]').forEach(b => b.onclick = () => { history.replaceState(null, '', location.pathname + '?share=' + encodeURIComponent(b.dataset.share)); openSharedFromUrl(); });
  root.querySelectorAll('[data-like]').forEach(b => b.onclick = async () => {
    try { const r = await api(`/posts/${b.dataset.like}/suka`, { method: 'POST' }); const n = (parseInt(b.textContent.replace(/\D/g, '')) || 0) + (r.suka ? 1 : -1); b.classList.toggle('on', r.suka); b.setAttribute('aria-pressed', r.suka); b.textContent = (r.suka ? '♥ ' : '♡ ') + (n > 0 ? n : ''); } catch (e) { toast(e.message); }
  });
  root.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    if (!b.classList.contains('sure')) { b.classList.add('sure'); b.textContent = 'Yakin hapus?'; return; }
    try { await api('/posts/' + b.dataset.del, { method: 'DELETE' }); b.closest('.fyp-p').remove(); toast('Status dihapus.'); } catch (e) { toast(e.message); }
  });
}
async function homeFyp() {
  const host = $('#fypHome'); if (!host || !db.acct) { if (host) host.remove(); return; }
  const opsi = (db.books || []).slice().sort((a, b) => (b.opened || 0) - (a.opened || 0)).slice(0, 12).map(b => `<option value="${esc(b.id)}">${esc(b.title)}</option>`).join('');
  host.innerHTML = `<div class="card lb"><div class="sec-h" style="margin:0 0 8px"><h2>Untuk kamu</h2></div>
    <div class="fyp-new"><textarea id="fypT" rows="2" maxlength="500" placeholder="Lagi baca apa? Bagikan kalimat atau kata favoritmu."></textarea>
      <div class="row" style="gap:8px;flex-wrap:wrap"><select id="fypB" aria-label="Lampirkan buku"><option value="">Tanpa buku</option>${opsi}</select>
      <label class="row sm" style="gap:6px;align-items:center"><input type="checkbox" id="fypS" style="width:auto"> Bagikan isinya</label>
      <button class="pri" id="fypGo">Kirim</button></div>
      <div class="mut sm" id="fypNote" hidden>Bagikan isi buku hanya bila milikmu sendiri atau bebas hak cipta (domain publik).</div></div>
    <div id="fypList" class="mut sm" style="margin-top:10px">Memuat…</div></div>`;
  if ($('#fypAll')) $('#fypAll').onclick = openFyp;
  $('#fypS').onchange = e => { $('#fypNote').hidden = !e.target.checked; };
  $('#fypGo').onclick = async () => {
    const t = $('#fypT').value.trim(); if (!t) return toast('Tulis statusnya dulu.');
    const b = db.books.find(x => x.id === $('#fypB').value), btn = $('#fypGo'); btn.disabled = true;
    try {
      let share = null;
      if (b && $('#fypS').checked) { const paras = await getText(b.id); const r = await api('/share', { method: 'POST', body: { title: b.title, lang: b.lang, paras } }); share = r.id; }
      await api('/posts', { method: 'POST', body: { text: t, book: b ? b.title : null, lang: b ? b.lang : null, share } });
      toast('Status terkirim.'); homeFyp();
    } catch (e) { toast(e.message); btn.disabled = false; }
  };
  try {
    fypCache = await api('/fyp');
    $('#fypList').innerHTML = fypCache.posts.length ? fypCache.posts.map(fypRow).join('') : '<div class="mut sm">Belum ada status. Jadi yang pertama.</div>';
    $('#fypList').classList.remove('mut', 'sm'); wireFyp($('#fypList'));
  } catch (e) { if (/tidak ditemukan|not found/i.test(e.message)) host.remove(); else $('#fypList').textContent = e.message; }
}
async function openFyp() {
  openSheet(`<div class="sh-head"><h2>Untuk kamu</h2>${closeBtn}</div><div id="fypFull" class="mut sm">Memuat…</div>`, 'Untuk kamu');
  let lagi = null;
  const muat = async () => {
    const r = await api('/fyp' + (lagi ? '?before=' + lagi : ''));
    const box = $('#fypFull'); if (!box) return;
    if (!lagi) box.innerHTML = '';
    box.classList.remove('mut', 'sm');
    box.insertAdjacentHTML('beforeend', r.posts.map(fypRow).join('') || '<div class="mut sm">Belum ada status.</div>');
    lagi = r.lagi; wireFyp(box);
    const old = $('#fypMore'); if (old) old.remove();
    if (lagi) { box.insertAdjacentHTML('afterend', '<button class="ghost" id="fypMore" style="width:100%;margin-top:10px">Muat lagi</button>'); $('#fypMore').onclick = () => muat().catch(e => toast(e.message)); }
  };
  try { await muat(); } catch (e) { $('#fypFull').textContent = e.message; }
}

/* ---------- Bagikan cerita ---------- */
async function shareBook(id) {
  const b = db.books.find(x => x.id === id); if (!b) return;
  if (!API) return toast('Server akun belum aktif. Coba lagi nanti ya.');
  if (!db.acct) { toast('Masuk dulu buat bagiin cerita ya.'); return openAccount('daftar'); }
  openSheet(`<div class="sh-head"><h2>Bagikan cerita</h2>${closeBtn}</div>
    <div class="note">${ico('alert')}<div>Bagikan hanya cerita <b>milikmu sendiri</b> atau yang <b>bebas hak cipta</b> (domain publik). Link ini pribadi: hanya yang kamu kirimi link yang bisa buka.</div></div>
    <div class="vitem">${cover(b)}<div class="inf"><div class="w1">${esc(b.title)}</div><div class="s1">${langName(b.lang)}</div></div></div>
    <div class="row"><button class="pri" id="shGo">${ico('link')}Bikin link</button></div><div id="shOut"></div>`);
  $('#shGo').onclick = async () => {
    const bt = $('#shGo'); bt.disabled = true; bt.textContent = 'Lagi upload…';
    try {
      const paras = await getText(b.id);
      const r = await api('/share', { method: 'POST', body: { title: b.title, lang: b.lang, paras } });
      const link = location.origin + location.pathname + '?share=' + r.id;
      bt.remove();
      $('#shOut').innerHTML = `<div class="share-link"><input id="shLink" readonly value="${esc(link)}"><button class="lime" id="shCopy">Salin</button></div>
        ${navigator.share ? '<div class="row"><button class="pri" id="shNative">' + ico('send') + 'Kirim ke teman</button></div>' : ''}<div class="mut sm" style="margin-top:8px">Kode: <b>${r.id}</b></div>`;
      $('#shCopy').onclick = async () => { try { await navigator.clipboard.writeText(link); } catch (e) { $('#shLink').select(); document.execCommand('copy'); } toast('Link disalin'); };
      if ($('#shNative')) $('#shNative').onclick = () => navigator.share({ title: b.title, text: `Baca "${b.title}" bareng aku di KEEPO`, url: link }).catch(() => { });
      award(5); sfx('ding');
    } catch (e) { toast(e.message, 5000); bt.disabled = false; bt.innerHTML = ico('link') + 'Bikin link'; }
  };
}
async function openSharedFromUrl() {
  const id = new URLSearchParams(location.search).get('share'); if (!id) return;
  const u = new URL(location.href); u.searchParams.delete('share'); history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
  openSheet(`<div class="sh-head"><h2>Cerita dari teman</h2>${closeBtn}</div><div id="shIn" class="mut sm">Membuka link…</div>`);
  try {
    const s = await api('/share/' + encodeURIComponent(id));
    const exists = db.books.find(b => b.shareId === s.id);
    $('#shIn').outerHTML = `<div class="hello-sub">${spot('wow')}<div><b>${esc(s.by)}</b> ngajak kamu baca:</div></div>
      <div class="vitem">${cover({ title: s.title })}<div class="inf"><div class="w1">${esc(s.title)}</div><div class="s1">${langName(s.lang)} · ${s.paras.length} paragraf</div></div></div>
      <div class="row"><button class="pri" id="shAdd">${exists ? 'Buka cerita' : ico('plus') + 'Tambah ke koleksi'}</button></div>
      <div class="row"><button class="ghost" id="shRep">${ico('flag')}Laporkan buku ini</button></div>`;
    $('#shRep').onclick = () => { closeSheet(); setTimeout(() => openFeedback({ kind: 'takedown', text: `Laporan buku "${s.title}" (kode link: ${s.id}). Alasan: ` }), 50); };
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
  try { L = await (await fetch('whatsnew.json?t=' + Date.now(), { cache: 'no-store' })).json(); } catch (e) { host.innerHTML = '<div class="mut sm">Kabar baru belum bisa dimuat. Coba lagi nanti.</div>'; return; }
  if (!Array.isArray(L) || !L.length) { host.innerHTML = '<div class="mut sm">Belum ada kabar baru.</div>'; return; }
  let seen = 0; try { seen = +localStorage.getItem('kepo.wnSeen') || 0; } catch (e) {}
  const baru = L.filter(x => x.n > seen).length;
  const row = x => `<li><b>${esc(x.judul)}</b>${x.poin ? `<div class="mut sm">${esc(x.poin)}</div>` : ''}</li>`;
  host.innerHTML = `<div class="card wn"><div class="sec-h" style="margin:0 0 8px"><h2>${ico('sparkle')}Yang baru${baru ? ` <span class="wn-dot">${baru}</span>` : ''}</h2>${L.length > 3 ? '<button class="ghost" id="wnAll">Lihat semua</button>' : ''}</div><ul class="wn-l">${L.slice(0, 3).map(row).join('')}</ul></div>`;
  const all = $('#wnAll'); if (all) all.onclick = () => { host.querySelector('.wn-l').innerHTML = L.slice(0, 20).map(row).join(''); all.remove(); };
  try { localStorage.setItem('kepo.wnSeen', String(Math.max(...L.map(x => x.n)))); } catch (e) {}
}

function openWhatsNew() {
  openSheet(`<div class="sh-head"><h2>Yang baru</h2>${closeBtn}</div><div id="wnHome" class="mut sm">Memuat…</div>`, 'Yang baru');
  homeWhatsNew();
}

/* ---------- pasang ke UI yang ada ---------- */
// Tab Sosial: FYP (status & bahan bacaan), teman, profil
let sosSeg = 'fyp';
function viewSosial() {
  const V = $('#view');
  if (!API) { V.innerHTML = emptyState('curious', 'Sosial belum aktif', 'Server akun belum tersambung. Coba lagi nanti.'); return; }
  if (!db.acct) { V.innerHTML = emptyState('sad', 'Baca bareng teman', 'Masuk untuk lihat apa yang dibaca orang lain, bagikan status, dan bahan bacaan.', 'Masuk', "openAccount('daftar')"); return; }
  const seg = (k, l) => `<button data-sg="${k}" class="${sosSeg === k ? 'on' : ''}">${l}</button>`;
  V.innerHTML = `<div class="sec-h"><h2>Sosial</h2><button class="ghost" id="sosMe">Profilku</button></div>
    <div class="seg" id="sosSeg" style="margin-bottom:12px">${seg('fyp', 'Untuk kamu')}${seg('teman', 'Teman')}${seg('rank', 'Peringkat')}</div>
    <div id="${sosSeg === 'fyp' ? 'fypHome' : sosSeg === 'rank' ? 'lbHome' : 'frHome'}"></div>`;
  $$('#sosSeg button').forEach(b => b.onclick = () => { sosSeg = b.dataset.sg; viewSosial(); });
  $('#sosMe').onclick = () => openProfile(db.acct.username);
  if (sosSeg === 'fyp') homeFyp(); else if (sosSeg === 'rank') homeLeaderboard(); else homeFriends();
}
const _setTab = setTab;
setTab = function (t) {
  _setTab(t);
  renderAcct();
  if (t === 'rak') {
    if (API) $$('.bk[data-open]').forEach(el => { const b = document.createElement('button'); b.className = 'shr'; b.setAttribute('aria-label', 'Bagikan cerita'); b.title = 'Bagikan cerita'; b.textContent = '↗'; b.onclick = e => { e.stopPropagation(); shareBook(el.dataset.open); }; (el.querySelector('.bk-act') || el).appendChild(b); });
  }
};
// tombol bagikan juga di mode baca (setelah menu atas digambar)
const _viewBaca = viewBaca;
viewBaca = async function () {
  await _viewBaca();
  const bar = $('.rbar'), b = book();
  if (API && bar && b && !$('#rShare')) { const x = document.createElement('button'); x.className = 'icon rrt'; x.id = 'rShare'; x.type = 'button'; x.title = 'Bagikan cerita'; x.setAttribute('aria-label', 'Bagikan cerita'); x.innerHTML = '<span class="rrti" aria-hidden="true">↗</span><span class="rrtl">Bagikan</span>'; x.onclick = () => shareBook(b.id); bar.insertBefore(x, bar.querySelector('#set')); }
};
setTab(db.tab || 'rak');
openSharedFromUrl();
if (db.acct) runSync({ profile: true }).catch(() => { });
