'use strict';
/* Baca Bahasa — baca buku bahasa asing: klik kata → arti kata → arti kalimat; mode bicara dengan skor per kata + remedial. */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const TEST = /[?&]test/.test(location.search);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LANGS = {
  en: ['English', 'en-US'], ja: ['Jepang 日本語', 'ja-JP'], ko: ['Korea 한국어', 'ko-KR'], 'zh-CN': ['Mandarin 中文', 'zh-CN'],
  fr: ['Prancis', 'fr-FR'], de: ['Jerman', 'de-DE'], es: ['Spanyol', 'es-ES'], it: ['Italia', 'it-IT'], nl: ['Belanda', 'nl-NL'],
  pt: ['Portugis', 'pt-PT'], ru: ['Rusia', 'ru-RU'], ar: ['Arab', 'ar-SA'], tr: ['Turki', 'tr-TR'], id: ['Indonesia', 'id-ID']
};
const CJK = l => l === 'ja' || l === 'zh-CN';
/* Tebak bahasa cerita dari 1.500 karakter pertama; ragu → null. */
const LANG_HINT = {
  en: ['the', 'and', 'of', 'to', 'was', 'with', 'that', 'his', 'her'], es: ['el', 'los', 'las', 'del', 'que', 'una', 'por', 'con', 'es'],
  fr: ['le', 'les', 'des', 'est', 'une', 'que', 'pas', 'dans', 'et'], de: ['der', 'die', 'und', 'das', 'nicht', 'ist', 'ein', 'mit', 'ich'],
  id: ['yang', 'dan', 'di', 'itu', 'dengan', 'untuk', 'tidak', 'dia', 'ini'], it: ['il', 'di', 'che', 'una', 'per', 'con', 'sono', 'della', 'non'],
  pt: ['os', 'uma', 'para', 'com', 'não', 'que', 'por', 'do', 'da'], nl: ['de', 'het', 'een', 'van', 'en', 'niet', 'is', 'dat', 'ik'],
  tr: ['ve', 'bir', 'bu', 'için', 'ile', 'çok', 'da', 'ne', 'ama'], ru: []
};
function guessLang(text) {
  const s = String(text || '').slice(0, 1500);
  const n = re => (s.match(re) || []).length;
  if (n(/[぀-ヿ]/g) >= 3) return 'ja';
  if (n(/[가-힯]/g) >= 3) return 'ko';
  if (n(/[一-鿿]/g) >= 3) return 'zh-CN';
  if (n(/[Ѐ-ӿ]/g) >= 10) return 'ru';
  if (n(/[؀-ۿ]/g) >= 10) return 'ar';
  const w = s.toLowerCase().match(/[a-zà-ÿ']+/g) || [];
  if (w.length < 15) return null;
  let best = null, bs = 0, second = 0;
  for (const k in LANG_HINT) {
    if (!LANGS[k]) continue;
    const set = new Set(LANG_HINT[k]); let c = 0; for (const x of w) if (set.has(x)) c++;
    if (c > bs) { second = bs; bs = c; best = k; } else if (c > second) second = c;
  }
  return bs >= 3 && bs >= second * 1.5 && bs / w.length > 0.05 ? best : null;
}
const PASS = 85; // batas lulus per kata (%)

/* ---------- penyimpanan ---------- */
const KEY = 'bacabahasa.v1';
const DEF = () => ({ books: [], cur: null, my: 'id', lastLang: 'en', fs: 19, vocab: [], weak: {}, kenal: {}, tab: 'rak' });
let db = (() => {
  const raw = localStorage.getItem(KEY);
  try { return Object.assign(DEF(), JSON.parse(raw || '{}')); }
  catch (e) { try { localStorage.setItem(KEY + '.rusak', raw); } catch (e2) { } return DEF(); }
})();
let fullWarn = 0, trTimer = 0;
const save = () => {
  try { localStorage.setItem(KEY, JSON.stringify(db)); return true; }
  catch (e) {
    // jatah penuh: buang cache terjemahan dulu, lalu coba simpan lagi
    try {
      if (trCache.size || localStorage.getItem('bacabahasa.tr')) {
        trCache.clear(); clearTimeout(trTimer); trTimer = 0;
        localStorage.removeItem('bacabahasa.tr');
        localStorage.setItem(KEY, JSON.stringify(db)); return true;
      }
    } catch (e3) { }
    if (Date.now() - fullWarn > 8000) { fullWarn = Date.now(); try { toast('Progres/kata gagal tersimpan. Ruang browser penuh. Hapus kata yang tak perlu atau kosongkan cache terjemahan (buku kamu aman), lalu coba lagi.', 6000); } catch (e2) { } }
    return false;
  }
};
/* ---------- hitung ketukan kata (db.taps: "bahasa|kata" → angka; data lama tanpa kolom = 0) ---------- */
const TAP_MAX = 2000, TAP_GAP = 3000;
let lastTap = { k: '', t: 0 };
const tapKey = (lang, w) => lang + '|' + String(w || '').toLowerCase();
const tapsOf = (lang, w) => {
  const v = (db.vocab || []).find(x => sameVocab(x, lang, w));
  return (v && +v.tap > 0 ? +v.tap : 0) + ((db.taps && +db.taps[tapKey(lang, w)]) || 0);
};
function countTap(lang, w) {
  const k = tapKey(lang, w), now = Date.now();
  if (!lang || !String(w || '').trim() || isParticle(lang, w)) return 0;
  const dup = lastTap.k === k && now - lastTap.t < TAP_GAP; lastTap = { k, t: now };
  if (!db.taps || typeof db.taps !== 'object') db.taps = {};
  const v = db.vocab.find(x => sameVocab(x, lang, w));
  if (!dup) {
    if (v) v.tap = (+v.tap || 0) + 1;
    else {
      db.taps[k] = (+db.taps[k] || 0) + 1;
      const ks = Object.keys(db.taps);
      if (ks.length > TAP_MAX) ks.filter(x => x !== k).sort((a, b) => db.taps[a] - db.taps[b]).slice(0, ks.length - TAP_MAX).forEach(x => delete db.taps[x]);
    }
    save();
  }
  return tapsOf(lang, w);
}
/* ---------- kunci kata tersimpan: kata lowercase + bahasa (dipakai SEMUA jalur simpan/cari/gabung) ---------- */
const vocabKey = (lang, w) => (lang || '') + '|' + String(w || '').trim().toLowerCase();
/* tombstone kata dihapus (ikut sinkron akun): daftar {k,at}; kata yang ditambah lagi setelah 'at' dianggap hidup */
function tombVocab(lang, w) { const k = vocabKey(lang, w); db.vocabDel = (Array.isArray(db.vocabDel) ? db.vocabDel : []).filter(t => t && t.k !== k); db.vocabDel.push({ k, at: Date.now() }); }
function untombVocab(lang, w) { if (Array.isArray(db.vocabDel)) db.vocabDel = db.vocabDel.filter(t => t && t.k !== vocabKey(lang, w)); }
/* 'sudah kenal': db.kenal[kunci] = waktu (positif = kenal, negatif = dibatalkan; sinkron menang-terbaru) */
const isKenal = (lang, w) => !!db.kenal && db.kenal[vocabKey(lang, w)] > 0;
function setKenal(lang, w, on) { if (!db.kenal || typeof db.kenal !== 'object' || Array.isArray(db.kenal)) db.kenal = {}; db.kenal[vocabKey(lang, w)] = on ? Date.now() : -Date.now(); save(); }
const sameVocab =(v, lang, w) => !!v && vocabKey(v.lang, v.w) === vocabKey(lang, w);
/* gabung duplikat: arti/konteks terpanjang, tap dijumlah, 'at' paling awal. Aman diulang (tanpa duplikat = tidak ada perubahan). */
function dedupeVocab() {
  if (!Array.isArray(db.vocab)) return false;
  const seen = new Map(), out = []; let changed = false;
  for (const v of db.vocab) {
    if (!v || typeof v !== 'object') { out.push(v); continue; }
    const k = vocabKey(v.lang, v.w), a = seen.get(k);
    if (!a) { seen.set(k, v); out.push(v); continue; }
    changed = true;
    for (const f of ['t', 'baca', 's', 'ctx', 'base', 'pos']) if (String(v[f] || '').length > String(a[f] || '').length) a[f] = v[f];
    const tp = (+a.tap || 0) + (+v.tap || 0); if (tp > 0) a.tap = tp;
    if (v.at && (!a.at || v.at < a.at)) a.at = v.at;
    if ((v.lv || 0) > (a.lv || 0)) { a.lv = v.lv; a.due = v.due; }
    if (v.known) a.known = v.known;
    if (String(a.t || '').trim()) delete a.noTr;
  }
  if (changed) db.vocab = out;
  return changed;
}
try { if (!localStorage.getItem('kepo.vocabDedupe1')) { dedupeVocab(); db.vocab = db.vocab || []; if (save()) localStorage.setItem('kepo.vocabDedupe1', '1'); } } catch (e) { }
const takeTaps = (lang, w) => { const k = tapKey(lang, w), n = (db.taps && +db.taps[k]) || 0; if (db.taps) delete db.taps[k]; return n; };
/* ---------- statistik lokal per buku (db.sentLooks: idBuku → {kata, kalimat}; opsional, tidak disinkron) ---------- */
const SL_MAX = 200;
function bumpSentLook(bookId, field) {
  if (!bookId || (field !== 'kata' && field !== 'kalimat')) return;
  if (!db.sentLooks || typeof db.sentLooks !== 'object' || Array.isArray(db.sentLooks)) db.sentLooks = {};
  const old = db.sentLooks[bookId]; delete db.sentLooks[bookId]; // masukkan ulang → urutan terbaru di belakang
  const o = db.sentLooks[bookId] = { kata: +(old && old.kata) || 0, kalimat: +(old && old.kalimat) || 0 };
  o[field]++;
  const ks = Object.keys(db.sentLooks);
  if (ks.length > SL_MAX) ks.slice(0, ks.length - SL_MAX).forEach(x => delete db.sentLooks[x]);
  save();
}
const sentLooksOf = bookId => { const o = db.sentLooks && db.sentLooks[bookId]; return { kata: +(o && o.kata) || 0, kalimat: +(o && o.kalimat) || 0 }; };
// Minta penyimpanan permanen (diam-diam, tanpa pesan). Hasil disimpan di STORAGE_PERSISTED.
let STORAGE_PERSISTED = null;
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().then(ok => { STORAGE_PERSISTED = !!ok; }, () => {}); } catch (e) {}
const idb = new Promise((res, rej) => { const r = indexedDB.open('bacabahasa', 2); r.onupgradeneeded = () => { const d = r.result; if (!d.objectStoreNames.contains('t')) d.createObjectStore('t'); if (!d.objectStoreNames.contains('fb')) d.createObjectStore('fb', { keyPath: 'id' }); }; r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const idbOp = (mode, fn) => idb.then(d => new Promise((res, rej) => { const tx = d.transaction('t', mode); const q = fn(tx.objectStore('t')); tx.oncomplete = () => res(q && q.result); tx.onerror = () => rej(tx.error); }));
const putFeedback = o => idb.then(d => new Promise((res, rej) => { const tx = d.transaction('fb', 'readwrite'); tx.objectStore('fb').put(o); tx.oncomplete = () => res(true); tx.onerror = () => rej(tx.error); }));
const allFeedback = () => idb.then(d => new Promise((res, rej) => { const q = d.transaction('fb', 'readonly').objectStore('fb').getAll(); q.onsuccess = () => res(q.result || []); q.onerror = () => rej(q.error); }));
const pendingFeedback = () => allFeedback().then(a => a.filter(f => f.terkirim === false)); // data lama (tanpa kolom terkirim) dianggap sudah beres
const markFeedbackSent = id => idb.then(d => new Promise((res, rej) => { const tx = d.transaction('fb', 'readwrite'), st = tx.objectStore('fb'), q = st.get(id); q.onsuccess = () => { if (q.result) st.put({ ...q.result, terkirim: true }); }; tx.oncomplete = () => res(true); tx.onerror = () => rej(tx.error); }));
const putText = (id, paras) => idbOp('readwrite', s => s.put(paras, id));
const getText = id => idbOp('readonly', s => s.get(id));
const delText = id => idbOp('readwrite', s => { s.delete('c_' + id); return s.delete(id); });
// Cover EPUB: gambar kecil (data URL) di IndexedDB kunci 'c_<id>', terpisah dari teks & localStorage
const putCover = (id, url) => idbOp('readwrite', s => s.put(url, 'c_' + id));
const getCover = id => idbOp('readonly', s => s.get('c_' + id));

/* ---------- teks: kalimat & kata ---------- */
const segCache = {};
function seg(lang, g) { const k = lang + g; if (!(k in segCache)) { try { segCache[k] = new Intl.Segmenter(lang, { granularity: g }); } catch (e) { segCache[k] = null; } } return segCache[k]; }
function sentences(text, lang) {
  const s = seg(lang, 'sentence');
  const out = s ? [...s.segment(text)].map(x => x.segment) : (text.match(/[^.!?。！？]+[.!?。！？]*["'”’)]*\s*/g) || [text]);
  // gabungkan potongan yang terlalu pendek (mis. "Mr.") ke kalimat sebelumnya
  const res = [];
  for (const x of out) { if (res.length && /^\s*\S{0,3}\s*$/.test(x)) res[res.length - 1] += x; else res.push(x); }
  return res.filter(x => x.trim());
}
function tokens(text, lang) {
  const s = seg(lang, 'word');
  if (s) return [...s.segment(text)].map(x => ({ t: x.segment, w: !!x.isWordLike }));
  return text.split(/([\p{L}\p{N}\p{M}'’-]+)/u).filter(Boolean).map(t => ({ t, w: /[\p{L}\p{N}]/u.test(t) }));
}
const norm = w => w.toLowerCase().normalize('NFC').replace(/[’`]/g, "'").replace(/[^\p{L}\p{N}\p{M}]/gu, '');
/* Perkiraan % kata baru: 3.000 kata pertama vs kata tersimpan/dikenal (offline). null bila kosakata/buku kosong. */
function perkiraanBaru(paras, lang) {
  const known = new Set();
  for (const v of (db.vocab || [])) if (v && v.lang === lang && v.w) known.add(norm(String(v.w)));
  for (const k in (db.kenal || {})) if (db.kenal[k] > 0 && k.startsWith(lang + '|')) known.add(norm(k.slice(lang.length + 1)));
  known.delete('');
  if (!known.size) return null;
  let n = 0, baru = 0;
  for (const p of paras || []) {
    for (const t of tokens(p, lang)) {
      if (!t.w || /^[\p{N}\p{P}\s]+$/u.test(t.t) || isParticle(lang, t.t)) continue;
      n++; if (!known.has(norm(t.t))) baru++;
      if (n >= 3000) break;
    }
    if (n >= 3000) break;
  }
  return n >= 20 ? Math.min(100, Math.round(baru * 100 / n)) : null;
}
const EN_NUM = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(' ');

function cleanParas(raw) {
  let t = raw.replace(/\r\n?/g, '\n').replace(/­/g, '').replace(/[ \t ]+/g, ' ');
  let paras = t.split(/\n\s*\n/);
  if (paras.length < 3 && t.split('\n').length > 6) paras = t.split('\n');
  paras = paras.map(p => p.replace(/(\w)-\n(\w)/g, '$1$2').replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
  return splitLong(paras);
}
function splitLong(paras) {
  const out = [];
  for (const p of paras) {
    if (p.length <= 1200) { out.push(p); continue; }
    let chunk = '';
    for (const s of sentences(p, 'en')) { if (chunk.length + s.length > 1000 && chunk) { out.push(chunk.trim()); chunk = ''; } chunk += s; }
    if (chunk.trim()) out.push(chunk.trim());
  }
  return out;
}
function paginate(paras, lang) {
  const max = CJK(lang) || lang === 'ko' ? 600 : 1500;
  const pages = []; let cur = [], n = 0;
  for (const p of paras) { if (n + p.length > max && cur.length) { pages.push(cur); cur = []; n = 0; } cur.push(p); n += p.length; }
  if (cur.length) pages.push(cur);
  return pages.length ? pages : [['(kosong)']];
}

/* ---------- impor file ---------- */
const loaded = {};
const LOAD_TIMEOUT = 20000, PARSE_TIMEOUT = 90000;
function loadScript(src) {
  return loaded[src] || (loaded[src] = new Promise((res, rej) => {
    const s = document.createElement('script');
    const gagal = msg => { clearTimeout(tm); delete loaded[src]; s.onload = s.onerror = null; s.remove(); rej(new Error(msg)); };
    const tm = setTimeout(() => gagal('Pustaka lama dimuat, cek sinyal lalu coba lagi'), LOAD_TIMEOUT);
    s.src = src; s.onload = () => { clearTimeout(tm); res(); };
    s.onerror = () => gagal('Gagal memuat pustaka (cek internet)');
    document.head.appendChild(s);
  }));
}
function dgnBatas(p, ms) {
  let tm;
  return Promise.race([p, new Promise((_, no) => { tm = setTimeout(() => no(Object.assign(new Error('timeout'), { telat: true })), ms); })]).finally(() => clearTimeout(tm));
}
const JSZIP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
const PDFJS_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
// true hanya bila ketiga pustaka benar-benar ada di cache service worker
async function libsCached() {
  try {
    if (!('caches' in window)) return false;
    const urls = [JSZIP_URL, PDFJS_BASE + 'pdf.min.js', PDFJS_BASE + 'pdf.worker.min.js'];
    const r = await Promise.all(urls.map(u => caches.match(u)));
    return r.every(Boolean);
  } catch (e) { return false; }
}
// siapkan pustaka EPUB/PDF lebih awal (sekali per perangkat) supaya impor tetap jalan offline
function prefetchImportLibs() {
  try {
    if (localStorage.getItem('kepo_libs_ready') || !navigator.onLine || navigator.connection?.saveData) return;
    const urls = [JSZIP_URL, PDFJS_BASE + 'pdf.min.js', PDFJS_BASE + 'pdf.worker.min.js'];
    Promise.all(urls.map(u => fetch(u, { mode: 'no-cors' }))).then(() => libsCached()).then(ok => { if (ok) { try { localStorage.setItem('kepo_libs_ready', '1'); } catch (e) { } } }).catch(() => { });
  } catch (e) { }
}
window.addEventListener('load', () => {
  const go = () => setTimeout(prefetchImportLibs, 0);
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 8000 }); else setTimeout(prefetchImportLibs, 4000);
});
/* ---------- Project Gutenberg: buang lisensi, daftar isi, halaman judul; mulai dari bab pertama ---------- */
const GB_START = /\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG[^\n]*\*\*\*[^\n]*\n?/i;
const GB_END = /\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG/i;
const CH_WORD = '(?:chapter|chap\\.|bab|kapitel|chapitre|cap[ií]tulo|capitolo|kapitola|hoofdstuk)';
const CH_ID = '(?:[ivxlc]{1,7}|\\d{1,3}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|first|second|third)';
const CH_STRICT = new RegExp('^' + CH_WORD + '\\s+' + CH_ID + '\\b\\.?(?:\\s*[:.\\-–—]?\\s*.{0,60})?$', 'i');
const CH_ROMAN = /^(?:[IVXL]{1,6})\.(?:\s+.{0,60})?$/;
function gbHead(p) {
  const t = p.replace(/^[\u0001\u0002]+/, '').trim();
  if (!t || t.length > 90) return 0;
  if (CH_STRICT.test(t)) return 2;
  if (CH_ROMAN.test(t)) return 1;
  return 0;
}
function gbTrim(txt) {
  let t = txt, found = false;
  const m = t.match(GB_START);
  if (m) { t = t.slice(m.index + m[0].length); found = true; }
  const e = t.search(GB_END); if (e >= 0) { t = t.slice(0, e); found = true; }
  return { text: t, found };
}
function gbParas(paras, isGb) {
  if (!paras || paras.length < 8) return paras;
  const re = new RegExp(CH_WORD + '\\s+' + CH_ID + '\\b', 'gi');
  let toc = false, out = [];
  for (let i = 0; i < paras.length; i++) {
    const p = paras[i];
    if (i < 120) {
      // satu paragraf berisi banyak judul bab beruntun = daftar isi yang menyatu
      if (p.length < 1500 && (p.match(re) || []).length >= 4) { toc = true; continue; }
      // beberapa paragraf pendek beruntun berisi judul bab
      let j = i; while (j < paras.length && j < 160 && paras[j].length < 90 && gbHead(paras[j])) j++;
      if (j - i >= 4) { toc = true; i = j - 1; continue; }
    }
    out.push(p);
  }
  if (!isGb && !toc) return gbChapters(paras);
  if (isGb) out = out.filter(p => !/^\[?\s*illustration[^\]]{0,80}\]?$/i.test(p.replace(/^[\u0001\u0002]+/, '').trim()));
  const first = out.findIndex((p, i) => i < 80 && gbHead(p) === 2);
  if (first > 0 && out.slice(first).length >= 5) out = out.slice(first);
  out = gbChapters(out);
  return out.length >= 3 ? out : paras;
}
/* hitungan bab: tiap judul bab jelas = bab baru (hanya bila belum ada pembatas bab & ada ≥3 judul).
   Judul 'II.' saja dipakai bila tak ada 'Chapter …'. Hasil sama sejak impor. */
function gbChapters(out) {
  if (!out || out.includes('\u0002')) return out;
  let lv = 2, n = out.filter(p => gbHead(p) === 2).length;
  if (n < 3) { lv = 1; n = out.filter(p => gbHead(p) === 1).length; if (n < 3) return out; }
  const r = []; let k = 0;
  out.forEach((p, i) => { if (gbHead(p) === lv) { if (k++ > 0 && i > 0) r.push('\u0002'); } r.push(p); });
  return r;
}
/* penanda miring Gutenberg: _kata_ -> kata (teks biasa) */
const UL_ITALIC = /(^|[^\p{L}\p{N}_])_([^_\n]{1,200}?)_(?![\p{L}\p{N}_])/gu;
function noUnderscore(p) { return typeof p === 'string' && p.includes('_') ? p.replace(UL_ITALIC, '$1$2').replace(UL_ITALIC, '$1$2') : p; }
/* judul hanya untuk baris pendek yang cocok pola judul; kalimat/dialog biasa bukan judul */
function isHeadLine(raw) {
  const t = raw.replace(/^[\u0001\u0002]+/, '').trim();
  if (!t) return false;
  if (raw.startsWith('\u0001')) return t.length <= 120 && !/^[「『“"‘(（]/.test(t);
  if (t.length > 60 || /^[「『“"‘'(（—–-]/.test(t)) return false;
  if (gbHead(t)) return true;
  if (/^第?[一二三四五六七八九十百〇\d]+[章節节回話话編]?$/.test(t) || /^[上中下前後]?[　 ]?[一二三四五六七八九十]+$/.test(t)) return true;
  if (/[.!?,;:"”'’)\]」』）。！？、…]$/.test(t)) return false;
  if (/[぀-ヿ㐀-鿿가-힯]/.test(t)) return t.length <= 16 && !/[。、！？「」『』]/.test(t);
  const w = t.split(/\s+/);
  if (w.length > 7 || /[,;:.!?"“”]/.test(t)) return false;
  if (t === t.toUpperCase() && /\p{L}{3}/u.test(t)) return true;
  return w.filter(x => x.length > 3).every(x => /^\p{Lu}/u.test(x));
}
async function parseFile(file) {
  const name = file.name.replace(/\.[^.]+$/, '');
  const ext = (file.name.match(/\.([^.]+)$/) || [])[1]?.toLowerCase();
  if (ext === 'epub') return dgnBatas(parseEpub(await file.arrayBuffer(), name).then(r => { try { const gb = r.paras.slice(0, 40).some(p => /project gutenberg/i.test(p)); r.paras = gbParas(r.paras, gb); if (gb) r.paras = r.paras.map(noUnderscore); } catch (e) { } return r; }), PARSE_TIMEOUT);
  if (ext === 'pdf') return dgnBatas(parsePdf(await file.arrayBuffer(), name), PARSE_TIMEOUT);
  const g = gbTrim(decodeText(await file.arrayBuffer()));
  let paras = cleanParas(g.text);
  try { paras = gbParas(paras, g.found); if (g.found) paras = paras.map(noUnderscore); } catch (e) { }
  return { title: name, paras };
}
function decodeText(buf) {
  let s = null;
  try { s = new TextDecoder('utf-8', { fatal: true }).decode(buf); }
  catch (e) {
    let best = null, bestBad = Infinity;
    for (const enc of ['shift_jis', 'gbk', 'big5', 'euc-kr', 'windows-1252']) {
      let t; try { t = new TextDecoder(enc).decode(buf); } catch (e2) { continue; }
      const bad = (t.match(/�/g) || []).length;
      if (bad < bestBad) { best = t; bestBad = bad; }
      if (bad === 0) break;
    }
    s = best != null ? best : new TextDecoder('utf-8').decode(buf);
  }
  return s.replace(/^﻿/, '');
}
async function parseEpub(buf, fallback) {
  await loadScript(JSZIP_URL);
  const z = await JSZip.loadAsync(buf);
  const idx = {}; Object.keys(z.files).forEach(k => idx[k.replace(/\\/g, '/').toLowerCase()] = z.files[k]);
  const zf = p => idx[p.toLowerCase()] || null;
  const cf = zf('META-INF/container.xml'); if (!cf) throw new Error('File EPUB tidak valid');
  const cont = await cf.async('string');
  const opfPath = (cont.match(/full-path="([^"]+)"/) || [])[1]; if (!opfPath) throw new Error('File EPUB tidak valid');
  const base = opfPath.includes('/') ? opfPath.replace(/[^/]+$/, '') : '';
  const opfFile = zf(opfPath); if (!opfFile) throw new Error('File EPUB tidak valid');
  const opf = new DOMParser().parseFromString(await opfFile.async('string'), 'application/xml');
  const title = opf.getElementsByTagNameNS('*', 'title')[0]?.textContent?.trim() || fallback;
  const man = {}; for (const it of opf.getElementsByTagNameNS('*', 'item')) man[it.getAttribute('id')] = it.getAttribute('href');
  const resolve = h => { let raw = h.split('#')[0]; try { raw = decodeURIComponent(raw); } catch (e) { } const parts = (base + raw).split('/'); const o = []; for (const p of parts) { if (p === '..') o.pop(); else if (p !== '.') o.push(p); } return o.join('/'); };
  const paras = [];
  let chLen = 0;
  for (const ref of opf.getElementsByTagNameNS('*', 'itemref')) {
    const href = man[ref.getAttribute('idref')]; if (!href) continue;
    const f = zf(resolve(href)); if (!f) continue;
    const doc = new DOMParser().parseFromString(await f.async('string'), 'text/html');
    // bab baru (\u0002) per file spine, kecuali bab sebelumnya masih sangat pendek (sampul, halaman judul)
    if (chLen >= 800) { paras.push('\u0002'); chLen = 0; }
    const blocks = doc.body ? doc.body.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,blockquote,pre') : [];
    const add = t => { paras.push(t); chLen += t.length; };
    if (blocks.length) blocks.forEach(b => { if (!b.querySelector('p')) { const t = b.textContent.replace(/\s+/g, ' ').trim(); if (t) add(/^H[1-4]$/.test(b.tagName) ? '\u0001' + t : t); } });
    else if (doc.body) cleanParas(doc.body.textContent).forEach(add);
  }
  let cover = null; try { cover = await epubCover(opf, zf, resolve); } catch (e) { }
  return { title, paras: splitLong(paras), cover };
}
// Ambil gambar cover EPUB, kecilkan (maks 300px, JPEG). Gagal = null (impor tetap jalan).
async function epubCover(opf, zf, resolve) {
  const items = [...opf.getElementsByTagNameNS('*', 'item')];
  const img = it => /^image\//.test(it.getAttribute('media-type') || '');
  let it = items.find(i => /(^|\s)cover-image(\s|$)/.test(i.getAttribute('properties') || '') && img(i));
  if (!it) { const m = [...opf.getElementsByTagNameNS('*', 'meta')].find(x => x.getAttribute('name') === 'cover'); const id = m && m.getAttribute('content'); if (id) it = items.find(i => i.getAttribute('id') === id && img(i)); }
  if (!it) it = items.find(i => img(i) && /cover/i.test((i.getAttribute('id') || '') + (i.getAttribute('href') || '')));
  if (!it) return null;
  const f = zf(resolve(it.getAttribute('href') || '')); if (!f) return null;
  const u = URL.createObjectURL(new Blob([await f.async('arraybuffer')], { type: it.getAttribute('media-type') }));
  try {
    const im = new Image(); im.src = u; await im.decode();
    const w0 = im.naturalWidth, h0 = im.naturalHeight; if (!w0 || !h0) return null;
    const k = Math.min(1, 300 / Math.max(w0, h0)), cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(w0 * k)); cv.height = Math.max(1, Math.round(h0 * k));
    const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(im, 0, 0, cv.width, cv.height);
    const url = cv.toDataURL('image/jpeg', 0.8); cv.width = cv.height = 0;
    return url.length < 120000 && url.startsWith('data:image/') ? url : null;
  } finally { URL.revokeObjectURL(u); }
}
async function parsePdf(buf, title) {
  const V = PDFJS_BASE;
  await loadScript(V + 'pdf.min.js');
  pdfjsLib.GlobalWorkerOptions.workerSrc = V + 'pdf.worker.min.js';
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const lines = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const tc = await (await pdf.getPage(i)).getTextContent();
    let line = '';
    for (const it of tc.items) { line += it.str; if (it.hasEOL) { lines.push(line.trim()); line = ''; } }
    if (line.trim()) lines.push(line.trim());
    lines.push('');
    if (i % 10 === 0 && typeof imporStatus === 'function') imporStatus(`Membaca PDF… halaman ${i}/${pdf.numPages}`);
  }
  // gabungkan baris jadi paragraf: putus kalau baris kosong atau baris pendek berakhir tanda titik
  const lens = lines.filter(Boolean).map(l => l.length).sort((a, b) => a - b);
  const typical = lens[Math.floor(lens.length * 0.8)] || 60;
  const paras = []; let cur = '';
  for (const l of lines) {
    if (!l) { if (cur) { paras.push(cur); cur = ''; } continue; }
    if (/^\d+$/.test(l)) continue; // nomor halaman
    cur = cur ? (/-$/.test(cur) ? cur.slice(0, -1) + l : cur + ' ' + l) : l;
    if (/[.!?:"”’。！？]$/.test(l) && l.length < typical * 0.85) { paras.push(cur); cur = ''; }
  }
  if (cur) paras.push(cur);
  // paragraf yang terpotong pergantian halaman: sambung kalau tidak diakhiri tanda baca
  const merged = [];
  for (const p of paras) { const last = merged[merged.length - 1]; if (last && !/[.!?:"”’。！？)]$/.test(last) && /^[\p{Ll}]/u.test(p)) merged[merged.length - 1] = last + ' ' + p; else merged.push(p); }
  if (!merged.join('').trim()) throw new Error('PDF ini berupa gambar/scan, teksnya tidak bisa dibaca');
  return { title, paras: splitLong(merged) };
}

/* ---------- terjemahan ---------- */
const TR_KEY = 'bacabahasa.tr', TR_MAX = 300;
const trCache = new Map((() => { try { const x = JSON.parse(localStorage.getItem(TR_KEY) || '[]'); return Array.isArray(x) ? x : []; } catch (e) { return []; } })());
function trFlush() {
  clearTimeout(trTimer); trTimer = 0;
  while (trCache.size > TR_MAX) trCache.delete(trCache.keys().next().value);
  try { localStorage.setItem(TR_KEY, JSON.stringify([...trCache])); } catch (e) { }
}
function trPersist() { if (!trTimer) trTimer = setTimeout(trFlush, 3000); }
document.addEventListener('visibilitychange', () => { if (document.hidden && trTimer) trFlush(); });
addEventListener('pagehide', () => { if (trTimer) trFlush(); });
const POS = { noun: 'kata benda', verb: 'kata kerja', adjective: 'kata sifat', adverb: 'kata keterangan', preposition: 'kata depan', pronoun: 'kata ganti', conjunction: 'kata sambung', interjection: 'kata seru', article: 'artikel', abbreviation: 'singkatan', prefix: 'awalan', suffix: 'akhiran' };
const NONLATIN = /[^\u0000-ɏḀ-ỿ\s\d\p{P}]/u;
/* cara baca (romanisasi): hanya untuk tulisan non-Latin & bila beda dari kata aslinya */
/* konteks kata: kalimat asal, maks ~160 karakter, dipotong rapi di batas kata; data lama (tanpa ctx) pakai s */
function ctxOf(v, max) {
  max = max || 160; let t = String((v && (v.ctx !== undefined ? v.ctx : v.s)) || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  t = t.slice(0, max); const i = t.search(/\s\S*$/);
  return (i > max * 0.6 ? t.slice(0, i) : t).replace(/[\s,;:\-–—]+$/, '') + '…';
}
function vocabCSV(list) {
  const q = s => { s = String(s == null ? '' : s).replace(/\r?\n|\r/g, ' ').trim(); if (/^[=+\-@\t]/.test(s)) s = "'" + s; return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const ok = (list || []).filter(v => v && !v.noTr && String(v.t || '').trim());
  const tg = x => String(x || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\p{L}\p{N}_]/gu, '').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  const tagOf = v => { const l = tg((LANGS[v.lang] || [v.lang])[0]), b = tg(v.book); return ['keepo', l && 'bahasa_' + l, b && 'buku_' + b].filter(Boolean).join(' '); };
  const rows = [['kata', 'arti', 'bentuk dasar', 'cara baca', 'kalimat contoh', 'buku', 'tag', 'diketuk']].concat(ok.map(v => [v.w, v.t, baseOf(v.w, v.base), bacaOf(v.w, v.baca), ctxOf(v), String(v.book || '').trim(), tagOf(v), +v.tap > 0 ? +v.tap : 0]));
  return '﻿' + rows.map(r => r.map(q).join(',')).join('\r\n') + '\r\n';
}
function bacaOf(w, baca) { const b = (baca || '').trim(); return b && NONLATIN.test(w || '') && b.toLowerCase() !== (w || '').trim().toLowerCase() ? b : ''; }
/* bentuk dasar: hanya dari data kamus gtx (d[3]); kosong bila tidak ada / sama dengan kata */
function baseOf(w, base) { const b = typeof base === 'string' ? base.trim() : '', x = (w || '').trim(); return b && b.length < 40 && !/\s/.test(x) && b.toLowerCase() !== x.toLowerCase() ? b : ''; }
async function fetchTimeout(url, ms = 8000, ext) {
  const ac = new AbortController(), t = setTimeout(() => ac.abort(), ms);
  const onAb = () => ac.abort(); if (ext) { if (ext.aborted) ac.abort(); else ext.addEventListener('abort', onAb); }
  try { return await fetch(url, { signal: ac.signal }); } finally { clearTimeout(t); if (ext) ext.removeEventListener('abort', onAb); }
}
async function gtxFetch(q, sl, tl, signal) {
  const r = await fetchTimeout(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(q)}`, 8000, signal);
  if (!r.ok) throw new Error('gtx ' + r.status);
  const j = await r.json();
  const out = { text: (j[0] || []).map(x => x[0] || '').join(''), baca: (j[0] || []).map(x => x && typeof x[3] === 'string' ? x[3] : '').join(' ').replace(/\s+/g, ' ').trim(), dict: Array.isArray(j[1]) ? j[1].map(d => ({ pos: d[0], terms: (d[1] || []).slice(0, 6) })) : [] };
  const bs = Array.isArray(j[1]) ? j[1].map(d => baseOf(q, d && d[3])).find(Boolean) : ''; if (bs) out.base = bs;
  return out;
}
/* prafetch kalimat halaman aktif (#458): senyap, satu permintaan sekali jalan, tanpa MyMemory; ketukan pengguna selalu didahulukan */
const PF = { ac: null, q: [], sl: '', tl: '', gen: 0, fails: 0, t: 0, dirty: false, busy: false };
function pfOk() { return navigator.onLine !== false && !(navigator.connection && navigator.connection.saveData) && !document.hidden; }
function pfFlush() { if (PF.dirty) { PF.dirty = false; trPersist(); } }
function pfPause() { clearTimeout(PF.t); PF.t = 0; PF.gen++; if (PF.ac) { PF.ac.abort(); PF.ac = null; } PF.busy = false; }
function pfStop() { pfPause(); PF.q = []; pfFlush(); }
function pfResume(ms) {
  pfPause(); if (!PF.q.length || PF.fails >= 2) return pfFlush();
  const g = PF.gen; PF.t = setTimeout(() => { PF.t = 0; pfRun(g); }, ms == null ? 1000 : ms);
}
function pfStart(list, sl, tl) {
  pfStop(); if (!pfOk() || !Array.isArray(list)) return;
  PF.sl = sl; PF.tl = tl; PF.fails = 0;
  PF.q = [...new Set(list.map(x => String(x || '').trim()).filter(Boolean))].filter(q => !trCache.has(sl + '|' + tl + '|' + q)).slice(0, 12);
  if (PF.q.length) pfResume(0);
}
async function pfRun(g) {
  if (g !== PF.gen || PF.busy) return;
  if (!pfOk() || !PF.q.length || PF.fails >= 2) return pfStop();
  const q = PF.q.shift(), k = PF.sl + '|' + PF.tl + '|' + q; PF.busy = true;
  if (!trCache.has(k)) {
    const ac = PF.ac = new AbortController();
    try {
      const out = await gtxFetch(q, PF.sl, PF.tl, ac.signal);
      if (g !== PF.gen) return;
      if (!out.text) throw new Error('kosong');
      if (!trCache.has(k)) trCache.set(k, out);
      PF.dirty = true; PF.fails = 0;
    } catch (e) { if (g !== PF.gen) return; PF.fails++; }
  }
  PF.busy = false; PF.ac = null;
  if (!PF.q.length || PF.fails >= 2) return pfStop();
  PF.t = setTimeout(() => { PF.t = 0; pfRun(g); }, 400);
}
addEventListener('offline', pfStop);
document.addEventListener('visibilitychange', () => { if (document.hidden) pfStop(); });
/* baca cache terjemahan tanpa jaringan & tanpa mengubah urutan LRU; kosong bila belum ada */
function cachedTr(q, sl, tl) { const v = trCache.get(sl + '|' + tl + '|' + q); return v && v.text ? v.text : ''; }
/* ---------- kamus Jepang kecil offline (kamus-ja.txt): dimuat malas hanya saat membaca buku ja ---------- */
const JA_PART = new Set(['が', 'は', 'を', 'に', 'の', 'で', 'と', 'も']);
/* partikel dasar: tidak dihitung sebagai kata baru (tanpa ketukan, catatan sesi, atau garis bawah) */
const isParticle = (lang, w) => lang === 'ja' && JA_PART.has(String(w || '').trim());
let jaDict = null, jaP = null;
function jaLoad() {
  if (jaDict) return Promise.resolve(jaDict);
  if (!jaP) jaP = fetch('kamus-ja.txt').then(r => r.ok ? r.text() : Promise.reject(new Error('kamus'))).then(t => {
    const m = new Map();
    for (const ln of t.split('\n')) {
      if (!ln || ln[0] === '#') continue;
      const p = ln.trim().split('|'); if (p.length < 4 || !p[0]) continue;
      const e = { w: p[0], kana: p[1] || p[0], pos: p[2], tr: p.slice(3).join('|') };
      if (!m.has(e.w)) m.set(e.w, e);
      if (p[1] && !m.has(p[1])) m.set(p[1], e);
    }
    return (jaDict = m);
  }).catch(() => { jaP = null; return null; });
  return jaP;
}
const KANA_R = {}; (function () {
  const rows = ['あ a い i う u え e お o', 'か ka き ki く ku け ke こ ko', 'さ sa し shi す su せ se そ so', 'た ta ち chi つ tsu て te と to', 'な na に ni ぬ nu ね ne の no', 'は ha ひ hi ふ fu へ he ほ ho', 'ま ma み mi む mu め me も mo', 'や ya ゆ yu よ yo', 'ら ra り ri る ru れ re ろ ro', 'わ wa を o ん n', 'が ga ぎ gi ぐ gu げ ge ご go', 'ざ za じ ji ず zu ぜ ze ぞ zo', 'だ da ぢ ji づ zu で de ど do', 'ば ba び bi ぶ bu べ be ぼ bo', 'ぱ pa ぴ pi ぷ pu ぺ pe ぽ po'];
  for (const r of rows) { const a = r.split(' '); for (let i = 0; i < a.length; i += 2) KANA_R[a[i]] = a[i + 1]; }
})();
/* kana → romaji (Hepburn sederhana); null bila ada huruf non-kana (kanji) */
function kanaRomaji(s) {
  s = String(s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  let o = '', dbl = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === 'っ') { dbl = true; continue; }
    if (c === 'ー') { o += o.slice(-1); continue; }
    let r = KANA_R[c]; if (!r) return null;
    const n = s[i + 1];
    if (n && 'ゃゅょ'.includes(n) && r.endsWith('i')) {
      const y = { ゃ: 'a', ゅ: 'u', ょ: 'o' }[n];
      r = /^(sh|ch|j)i$/.test(r) ? r.slice(0, -1) + y : r.slice(0, -1) + 'y' + y; i++;
    }
    if (dbl) { r = (r[0] === 'c' ? 't' : r[0]) + r; dbl = false; }
    if (c === 'ん' && n && /[あいうえおやゆよ]/.test(n)) r = "n'";
    o += r;
  }
  return o;
}
/* bentuk dasar: coba lepas akhiran konjugasi, cocokkan dengan jenis kata di kamus */
const JA_ROWS = { う: ['わ', 'い', 'え', 'お', 'っ', 'っ'], く: ['か', 'き', 'け', 'こ', 'い', 'い'], ぐ: ['が', 'ぎ', 'げ', 'ご', 'い', 'い'], す: ['さ', 'し', 'せ', 'そ', 'し', 'し'], つ: ['た', 'ち', 'て', 'と', 'っ', 'っ'], ぬ: ['な', 'に', 'ね', 'の', 'ん', 'ん'], ぶ: ['ば', 'び', 'べ', 'ぼ', 'ん', 'ん'], む: ['ま', 'み', 'め', 'も', 'ん', 'ん'], る: ['ら', 'り', 'れ', 'ろ', 'っ', 'っ'] };
const JA_A = ['ない', 'なかった', 'なくて', 'れる', 'せる', 'ず'], JA_I = ['ます', 'ました', 'ません', 'ませんでした', 'たい', 'たかった', 'ながら', 'に'], JA_ICH = ['ます', 'ました', 'ません', 'ませんでした', 'ない', 'なかった', 'なくて', 'た', 'て', 'たい', 'られる', 'させる', 'れば', 'よう', 'ず', 'ている', 'ていた'];
function jaCands(w) {
  const c = [];
  const add = (stem, end, cls) => c.push([stem + end, cls]);
  const L = w.length;
  for (let i = 1; i <= Math.min(L, 8); i++) {
    const stem = w.slice(0, L - i), suf = w.slice(L - i);
    if (!stem) continue;
    for (const s of JA_ICH) if (suf === s) add(stem, 'る', 'v1');
    for (const [end, f] of Object.entries(JA_ROWS)) {
      for (const s of JA_A) if (suf === f[0] + s) add(stem, end, 'v5');
      for (const s of JA_I) if (suf === f[1] + s) add(stem, end, 'v5');
      if (suf === f[2] + 'ば' || suf === f[2] + 'る') add(stem, end, 'v5');
      if (suf === f[3] + 'う') add(stem, end, 'v5');
      const ex = end === 'ぐ' ? ['いで', 'いだ'] : end === 'く' ? ['いて', 'いた'] : end === 'す' ? ['して', 'した'] : 'ぬぶむ'.includes(end) ? ['んで', 'んだ'] : ['って', 'った'];
      for (const s of ex) for (const t of ['', 'いる', 'いた', 'います', 'いない']) if (suf === s + t) add(stem, end, 'v5');
    }
    if (suf === 'って' || suf === 'った') if (w === '行' + suf) add('行', 'く', 'v5');
    for (const s of ['かった', 'くない', 'くなかった', 'くて', 'ければ', 'く']) if (suf === s) add(stem, 'い', 'adj');
    for (const s of ['し', 'した', 'して', 'しない', 'します', 'しました', 'しません', 'しよう', 'すれば', 'している']) if (suf === s) { add(stem, 'する', 'vs'); }
    for (const s of ['た', 'て', 'ない', 'ます', 'ました', 'ません', 'れば']) if (suf === s && /[来]$/.test(stem)) add(stem, 'る', 'vk');
  }
  if (/^(来|き|こ)(た|て|ない|ます|ました|ません)$/.test(w)) c.push([w[0] === '来' ? '来る' : w[0] === 'き' ? 'きる' : 'くる', 'vk']);
  if (/^(し|さ)(た|て|ない|ます|ました|ません|よう)$/.test(w)) c.push(['する', 'vs']);
  return c;
}
const JA_CLS = { v1: ['v1'], v5: ['v5'], adj: ['adj'], vs: ['vs'], vk: ['vk'] };
function jaFind(m, w) {
  w = String(w || '').trim();
  if (!m || !w || /\s/.test(w) || w.length > 12) return null;
  let e = m.get(w), base = '';
  if (!e) {
    for (const [b, cls] of jaCands(w)) { const x = m.get(b); if (x && x.pos === cls) { e = x; base = x.w; break; } }
    if (!e) return null;
  }
  const rom = kanaRomaji(e.kana), kk = { は: 'wa', へ: 'e' }[e.kana];
  const romaji = e.pos === 'prt' && kk ? kk : rom;
  const kana = e.kana !== w ? e.kana : '';
  const baca = [kana, romaji && romaji !== w ? romaji : ''].filter(Boolean).join(' · ');
  return { e, base: base && base !== w ? base : '', baca };
}
const JA_POS = { v1: 'kata kerja', v5: 'kata kerja', vk: 'kata kerja', vs: 'kata kerja', adj: 'kata sifat', na: 'kata sifat', n: 'kata benda', pron: 'kata ganti', prt: 'partikel', adv: 'kata keterangan', conj: 'kata sambung', int: 'kata seru', num: 'bilangan', exp: 'ungkapan', aux: 'kata bantu' };
async function jaLookup(q, sl) {
  if (sl !== 'ja') return null;
  try { return jaFind(await jaLoad(), q); } catch (e) { return null; }
}
async function translate(q, sl, tl, signal) {
  pfPause();
  const k = sl + '|' + tl + '|' + q;
  const o = await jaLookup(q, sl);
  const mix = v => { if (!o || !v) return v; const r = { ...v }; if (!r.baca && o.baca) r.baca = o.baca; if (!r.base && o.base) r.base = o.base; return r; };
  /* arti kamus offline didahulukan (hanya bila 'Artiin ke' = Indonesia); selain itu cuma cara baca + bentuk dasar */
  if (o && tl === 'id') {
    const ts = o.e.tr.split(';').map(x => x.trim()).filter(Boolean);
    const out = { text: ts.join('; '), baca: o.baca, dict: [{ pos: JA_POS[o.e.pos] || '', terms: ts.slice(1, 5) }], off: 1 };
    if (o.base) out.base = o.base;
    return out;
  }
  if (trCache.has(k) && ('baca' in trCache.get(k) || !NONLATIN.test(q))) { const v = trCache.get(k); trCache.delete(k); trCache.set(k, v); return mix(v); }
  const stale = trCache.get(k);
  if (stale && stale.text && navigator.onLine === false) return mix(stale);
  let out;
  try {
    out = await gtxFetch(q, sl, tl, signal);
  } catch (e) {
    if (signal && signal.aborted) throw new Error('dibatalkan');
    try {
      const r = await fetchTimeout(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${sl}|${tl}`, 8000, signal);
      const j = await r.json();
      const t = j.responseData?.translatedText;
      if (j.responseStatus !== 200 || !t || /MYMEMORY WARNING|QUERY LENGTH LIMIT|INVALID|YOU USED ALL/i.test(t)) throw new Error('mymemory ' + j.responseStatus);
      out = { text: t, dict: [], baca: '' };
    } catch (e2) { if (stale && stale.text) return mix(stale); throw new Error('Sinyal lemah, arti belum kebuka. Coba lagi ya.'); }
  }
  if (!out.text) throw new Error('Terjemahan kosong');
  trCache.delete(k); trCache.set(k, out); trPersist();
  return mix(out);
}

/* isi ulang arti kata tersimpan yang masih kosong; true bila ada yang terisi */
let refilling = false;
async function refillVocab() {
  if (refilling || navigator.onLine === false) return false;
  refilling = true; let n = 0;
  try {
    for (const v of db.vocab.filter(x => x.noTr).slice(0, 20)) {
      try { const r = await translate(v.w, v.lang, db.my); v.t = r.text; v.baca = bacaOf(v.w, r.baca); if (r.base) v.base = r.base; v.pos = r.dict && r.dict[0] ? r.dict[0].pos : ''; delete v.noTr; n++; } catch (e) { break; }
    }
    if (n) save();
  } finally { refilling = false; }
  return n > 0;
}

/* ---------- suara: baca (TTS) & dengar (rekognisi) ---------- */
function findVoice(lang) {
  const vs = speechSynthesis.getVoices(), pick = db.voices && db.voices[lang];
  return (pick && vs.find(v => v.voiceURI === pick)) || vs.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(LANGS[lang][1].toLowerCase().slice(0, 2))) || null;
}
/* Daftar suara bisa kosong saat pertama dimuat: tunggu voiceschanged maks ±1 detik. */
function voiceFor(lang) {
  const v = findVoice(lang);
  if (v || speechSynthesis.getVoices().length) return Promise.resolve(v);
  return new Promise(res => {
    let done = false;
    const fin = () => { if (done) return; done = true; clearTimeout(t); try { speechSynthesis.removeEventListener('voiceschanged', fin); } catch (e) { } res(findVoice(lang)); };
    const t = setTimeout(fin, 1000);
    try { speechSynthesis.addEventListener('voiceschanged', fin); } catch (e) { }
  });
}
let speakTok = 0;
const ttsRate = r => db.ttsRate === 'slow' ? Math.max(0.4, r * 0.75) : r;
function stopSpeak() { speakTok++; try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { } }
/* h = { end, fail } opsional: end saat selesai diucapkan, fail bila suara tak tersedia/error */
function speak(text, lang, rate = 0.9, h) {
  rate = ttsRate(rate);
  if (!('speechSynthesis' in window)) { if (h && h.fail) h.fail(); return toast('Perangkat tidak mendukung suara'); }
  speechSynthesis.cancel();
  const my = ++speakTok;
  voiceFor(lang).then(v => {
    if (my !== speakTok) return;
    if (!v) { if (h && h.fail) h.fail(); return toast(`HP ini belum punya suara ${(LANGS[lang][0].split(' ')[0])}. Pasang di Pengaturan HP > Aksesibilitas > Suara.`, 6000); }
    const u = new SpeechSynthesisUtterance(text); u.lang = LANGS[lang][1]; u.rate = rate; u.voice = v;
    if (h) { u.onend = () => { if (my === speakTok && h.end) h.end(); }; u.onerror = () => { if (my === speakTok && h.fail) h.fail(); }; }
    speechSynthesis.speak(u);
  });
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null;
function listen(lang, { onInterim, single } = {}) {
  if (TEST && window.__fake) { const v = window.__fake.shift(); return new Promise(r => setTimeout(() => r(Array.isArray(v) ? v : [v]), 200)); }
  if (!SR) return Promise.reject(new Error('nosupport'));
  return new Promise((res, rej) => {
    const r = new SR(); recog = r;
    r.lang = LANGS[lang][1]; r.interimResults = true; r.maxAlternatives = 5; r.continuous = !single;
    let finals = [], interim = '', err = null, idle;
    const bump = () => { clearTimeout(idle); idle = setTimeout(() => { try { r.stop(); } catch (e) { } }, single ? 2500 : 3000); };
    const hard = setTimeout(() => { try { r.stop(); } catch (e) { } }, single ? 8000 : 40000);
    r.onresult = e => {
      finals = []; interim = '';
      for (let i = 0; i < e.results.length; i++) { const R = e.results[i]; if (R.isFinal) finals.push([...R].map(a => a.transcript)); else interim += R[0].transcript; }
      onInterim && onInterim((finals.map(f => f[0]).join(' ') + ' ' + interim).trim());
      bump();
    };
    r.onerror = e => { err = e.error; };
    r.onend = () => {
      clearTimeout(idle); clearTimeout(hard); recog = null;
      if (!finals.length && interim) finals = [[interim]];
      if (!finals.length) return err && err !== 'no-speech' ? rej(new Error(err)) : res([]);
      const n = Math.max(...finals.map(f => f.length)), cands = [];
      for (let k = 0; k < n; k++) cands.push(finals.map(f => f[Math.min(k, f.length - 1)]).join(' '));
      res(cands);
    };
    try { r.start(); bump(); } catch (e) { rej(e); }
  });
}
function stopListen() { if (recog) try { recog.stop(); } catch (e) { } }
function micError(e) {
  const m = String(e && e.message || e);
  if (m === 'nosupport') return 'Browser ini belum mendukung pengenalan suara. Pakai Chrome (Android/PC) atau Safari iPhone (iOS 14.5+).';
  if (/not-allowed|service-not-allowed/.test(m)) return 'Izin mikrofon ditolak. Izinkan mikrofon untuk situs ini di pengaturan browser.';
  if (/network/.test(m)) return 'Pengenalan suara butuh internet.';
  return 'Mikrofon error: ' + m;
}

/* ---------- penilaian ucapan ---------- */
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j), cur = new Array(n + 1);
  for (let i = 1; i <= m; i++) { cur[0] = i; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); [prev, cur] = [cur, prev]; }
  return prev[n];
}
const sim = (a, b) => !a || !b ? 0 : a === b ? 1 : Math.max(0, 1 - lev(a, b) / Math.max(a.length, b.length));
function spokenWords(text, lang) {
  return tokens(text, lang).filter(x => x.w).map(x => norm(x.t)).filter(Boolean)
    .map(w => lang === 'en' && /^\d+$/.test(w) && +w <= 20 ? EN_NUM[+w] : w);
}
// alignment berbobot (mirip LCS) → skor 0..1 tiap kata target
function alignWords(target, spoken) {
  const n = target.length, m = spoken.length;
  const D = Array.from({ length: n + 1 }, () => new Float64Array(m + 1)), S = Array.from({ length: n }, (_, i) => spoken.map(s => { const v = sim(target[i], s); return v < 0.34 ? 0 : v; }));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) D[i][j] = Math.max(D[i - 1][j], D[i][j - 1], D[i - 1][j - 1] + S[i - 1][j - 1]);
  const sc = new Array(n).fill(0); let i = n, j = m;
  while (i > 0 && j > 0) {
    if (S[i - 1][j - 1] > 0 && D[i][j] === D[i - 1][j - 1] + S[i - 1][j - 1]) { sc[i - 1] = S[i - 1][j - 1]; i--; j--; }
    else if (D[i][j] === D[i - 1][j]) i--; else j--;
  }
  return sc;
}
function alignChars(targetWords, spokenStr) { // untuk Jepang/Mandarin: cocokkan per huruf
  const t = targetWords.join(''), s = [...spokenStr.replace(/[^\p{L}\p{N}]/gu, '')], T = [...t];
  const n = T.length, m = s.length, D = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) D[i][j] = T[i - 1] === s[j - 1] ? D[i - 1][j - 1] + 1 : Math.max(D[i - 1][j], D[i][j - 1]);
  const hit = new Array(n).fill(0); let i = n, j = m;
  while (i > 0 && j > 0) { if (T[i - 1] === s[j - 1]) { hit[i - 1] = 1; i--; j--; } else if (D[i - 1][j] >= D[i][j - 1]) i--; else j--; }
  let k = 0; return targetWords.map(w => { const L = [...w].length; let h = 0; for (let x = 0; x < L; x++) h += hit[k++]; return L ? h / L : 0; });
}
function scoreSentence(targetWords, cands, lang) {
  const best = new Array(targetWords.length).fill(0);
  cands.forEach((c, ci) => {
    const wgt = ci ? 0.9 : 1; // tebakan alternatif mesin hanya dihitung 90%
    const sc = CJK(lang) ? alignChars(targetWords, c) : alignWords(targetWords, spokenWords(c, lang));
    sc.forEach((v, i) => { if (v * wgt > best[i]) best[i] = v * wgt; });
  });
  return best.map(v => Math.round(v * 100));
}
function scoreWord(word, cands, lang) {
  const w = norm(word); let best = 0;
  cands.forEach((c, ci) => {
    const wgt = ci ? 0.9 : 1;
    if (CJK(lang)) { best = Math.max(best, alignChars([w], c)[0] * wgt); return; }
    for (const s of spokenWords(c, lang)) best = Math.max(best, sim(w, s) * wgt);
  });
  return Math.round(best * 100);
}
const cls = p => p >= PASS ? 'g' : p >= 60 ? 'm' : 'b';


/* ---------- buku contoh (teks orisinal) ---------- */
const SAMPLE_EN = `The Lighthouse Keeper

Every evening, old Tomas climbed the narrow stairs of the lighthouse. There were one hundred and twelve steps, and he knew each one by heart. Some steps creaked, some were cold, and one near the top was always a little wet.

At the top, he cleaned the great glass lens with a soft cloth. Then he lit the lamp and watched the beam sweep slowly across the dark water. Somewhere out there, sailors were looking for that light. It told them where the rocks were hidden.

One stormy night, the wind became so strong that the windows shook. Tomas heard a strange sound below, like someone knocking on the door. He hurried down the stairs with his lantern, wondering who could be outside in such terrible weather.

When he opened the door, a young girl stood there, soaking wet and shivering. "My father's boat is missing," she said quietly. "He always follows your light home, but tonight he is late."

Tomas brought her inside and gave her a warm blanket. "The light is still burning," he told her gently. "If your father can see it, he will find his way." They climbed the stairs together and stared into the rain.

Hours passed. The girl almost fell asleep against the window. Then, just before sunrise, a small green boat appeared between the waves. The girl jumped up and laughed with relief. Tomas smiled, because this was the reason he climbed the stairs every night.`;

const SAMPLE_KO = `우산을 두고 온 날

월요일 아침, 지수는 늦잠을 잤습니다. 급하게 옷을 입고 버스 정류장으로 뛰어갔습니다. 하늘이 흐렸지만 우산을 챙기지 못했습니다.

오후에 갑자기 비가 내리기 시작했습니다. 지수는 회사 앞에서 한참 서 있었습니다. 그때 옆 자리 민호 씨가 파란 우산을 펴고 말했습니다. "같이 가요, 저도 지하철역까지 가거든요."

둘은 우산 하나를 같이 쓰고 천천히 걸었습니다. 지수는 고맙다고 말하고 따뜻한 커피를 사 주었습니다. 다음 날부터 지수는 가방에 항상 작은 우산을 넣고 다닙니다.`;

const SAMPLE_JA = `雨の日の小さな本屋

駅の近くに、小さな古い本屋があります。店の主人の田中さんは、毎朝七時に店を開けて、本を一冊ずつきれいにします。

ある雨の日、ミナという女の子が店に入ってきました。かさから水がぽたぽた落ちています。「ここで少し休んでもいいですか」と彼女は聞きました。田中さんは笑って、あたたかいお茶を出しました。

ミナは棚の前で、青い表紙の本を見つけました。それは子どものころに大好きだった絵本でした。彼女はとてもうれしくなって、その本を買いました。雨がやんだとき、ミナは「また来ます」と言って、元気に帰っていきました。`;

const SAMPLES = {
  en: { title: 'The Lighthouse Keeper (contoh)', text: SAMPLE_EN },
  ko: { title: '우산을 두고 온 날 (contoh)', text: SAMPLE_KO },
  ja: { title: '雨の日の小さな本屋 (contoh)', text: SAMPLE_JA },
};
