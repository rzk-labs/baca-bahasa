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
const PASS = 85; // batas lulus per kata (%)

/* ---------- penyimpanan ---------- */
const KEY = 'bacabahasa.v1';
const DEF = () => ({ books: [], cur: null, my: 'id', lastLang: 'en', fs: 19, vocab: [], weak: {}, tab: 'rak' });
let db = (() => {
  const raw = localStorage.getItem(KEY);
  try { return Object.assign(DEF(), JSON.parse(raw || '{}')); }
  catch (e) { try { localStorage.setItem(KEY + '.rusak', raw); } catch (e2) { } return DEF(); }
})();
let fullWarn = 0;
const save = () => {
  try { localStorage.setItem(KEY, JSON.stringify(db)); return true; }
  catch (e) {
    if (Date.now() - fullWarn > 8000) { fullWarn = Date.now(); try { toast('Memori HP penuh, hapus buku lama dulu', 6000); } catch (e2) { } }
    return false;
  }
};
const idb = new Promise((res, rej) => { const r = indexedDB.open('bacabahasa', 1); r.onupgradeneeded = () => r.result.createObjectStore('t'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const idbOp = (mode, fn) => idb.then(d => new Promise((res, rej) => { const tx = d.transaction('t', mode); const q = fn(tx.objectStore('t')); tx.oncomplete = () => res(q && q.result); tx.onerror = () => rej(tx.error); }));
const putText = (id, paras) => idbOp('readwrite', s => s.put(paras, id));
const getText = id => idbOp('readonly', s => s.get(id));
const delText = id => idbOp('readwrite', s => s.delete(id));

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
function loadScript(src) { return loaded[src] || (loaded[src] = new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => { delete loaded[src]; rej(new Error('Gagal memuat pustaka (cek internet)')); }; document.head.appendChild(s); })); }
const JSZIP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
const PDFJS_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
// siapkan pustaka EPUB/PDF lebih awal (sekali per perangkat) supaya impor tetap jalan offline
function prefetchImportLibs() {
  try {
    if (localStorage.getItem('kepo_libs_ready') || !navigator.onLine || navigator.connection?.saveData) return;
    const urls = [JSZIP_URL, PDFJS_BASE + 'pdf.min.js', PDFJS_BASE + 'pdf.worker.min.js'];
    Promise.all(urls.map(u => fetch(u, { mode: 'no-cors' }))).then(() => { try { localStorage.setItem('kepo_libs_ready', '1'); } catch (e) { } }).catch(() => { });
  } catch (e) { }
}
window.addEventListener('load', () => {
  const go = () => setTimeout(prefetchImportLibs, 0);
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 8000 }); else setTimeout(prefetchImportLibs, 4000);
});
async function parseFile(file) {
  const name = file.name.replace(/\.[^.]+$/, '');
  const ext = (file.name.match(/\.([^.]+)$/) || [])[1]?.toLowerCase();
  if (ext === 'epub') return parseEpub(await file.arrayBuffer(), name);
  if (ext === 'pdf') return parsePdf(await file.arrayBuffer(), name);
  return { title: name, paras: cleanParas(await file.text()) };
}
async function parseEpub(buf, fallback) {
  await loadScript(JSZIP_URL);
  const z = await JSZip.loadAsync(buf);
  const idx = {}; Object.keys(z.files).forEach(k => idx[k.replace(/\\/g, '/').toLowerCase()] = z.files[k]);
  const zf = p => idx[p.toLowerCase()] || null;
  const cf = zf('META-INF/container.xml'); if (!cf) throw new Error('File EPUB tidak valid');
  const cont = await cf.async('string');
  const opfPath = cont.match(/full-path="([^"]+)"/)[1];
  const base = opfPath.includes('/') ? opfPath.replace(/[^/]+$/, '') : '';
  const opf = new DOMParser().parseFromString(await zf(opfPath).async('string'), 'application/xml');
  const title = opf.getElementsByTagNameNS('*', 'title')[0]?.textContent?.trim() || fallback;
  const man = {}; for (const it of opf.getElementsByTagNameNS('*', 'item')) man[it.getAttribute('id')] = it.getAttribute('href');
  const resolve = h => { const parts = (base + decodeURIComponent(h.split('#')[0])).split('/'); const o = []; for (const p of parts) { if (p === '..') o.pop(); else if (p !== '.') o.push(p); } return o.join('/'); };
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
  return { title, paras: splitLong(paras) };
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
    if (i % 10 === 0) toast(`Membaca PDF… halaman ${i}/${pdf.numPages}`);
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
const TR_KEY = 'bacabahasa.tr', TR_MAX = 500;
const trCache = new Map((() => { try { const x = JSON.parse(localStorage.getItem(TR_KEY) || '[]'); return Array.isArray(x) ? x : []; } catch (e) { return []; } })());
function trPersist() {
  while (trCache.size > TR_MAX) trCache.delete(trCache.keys().next().value);
  try { localStorage.setItem(TR_KEY, JSON.stringify([...trCache])); } catch (e) { }
}
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
  const rows = [['kata', 'arti', 'cara baca', 'bentuk dasar', 'kalimat contoh', 'bahasa']].concat(ok.map(v => [v.w, v.t, bacaOf(v.w, v.baca), baseOf(v.w, v.base), ctxOf(v), (LANGS[v.lang] || [v.lang])[0]]));
  return '﻿' + rows.map(r => r.map(q).join(',')).join('\r\n') + '\r\n';
}
function bacaOf(w, baca) { const b = (baca || '').trim(); return b && NONLATIN.test(w || '') && b.toLowerCase() !== (w || '').trim().toLowerCase() ? b : ''; }
/* bentuk dasar: hanya dari data kamus gtx (d[3]); kosong bila tidak ada / sama dengan kata */
function baseOf(w, base) { const b = typeof base === 'string' ? base.trim() : '', x = (w || '').trim(); return b && b.length < 40 && !/\s/.test(x) && b.toLowerCase() !== x.toLowerCase() ? b : ''; }
async function translate(q, sl, tl) {
  const k = sl + '|' + tl + '|' + q;
  if (trCache.has(k) && ('baca' in trCache.get(k) || !NONLATIN.test(q))) { const v = trCache.get(k); trCache.delete(k); trCache.set(k, v); return v; }
  let out;
  try {
    const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(q)}`);
    if (!r.ok) throw new Error('gtx ' + r.status);
    const j = await r.json();
    out = { text: (j[0] || []).map(x => x[0] || '').join(''), baca: (j[0] || []).map(x => x && typeof x[3] === 'string' ? x[3] : '').join(' ').replace(/\s+/g, ' ').trim(), dict: Array.isArray(j[1]) ? j[1].map(d => ({ pos: d[0], terms: (d[1] || []).slice(0, 6) })) : [] };
    const bs = Array.isArray(j[1]) ? j[1].map(d => baseOf(q, d && d[3])).find(Boolean) : ''; if (bs) out.base = bs;
  } catch (e) {
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${sl}|${tl}`);
      const j = await r.json();
      const t = j.responseData?.translatedText;
      if (j.responseStatus !== 200 || !t || /MYMEMORY WARNING|QUERY LENGTH LIMIT|INVALID|YOU USED ALL/i.test(t)) throw new Error('mymemory ' + j.responseStatus);
      out = { text: t, dict: [], baca: '' };
    } catch (e2) { throw new Error('Terjemahan gagal (offline atau kuota habis)'); }
  }
  if (!out.text) throw new Error('Terjemahan kosong');
  trCache.delete(k); trCache.set(k, out); trPersist();
  return out;
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
function speak(text, lang, rate = 0.9) {
  if (!('speechSynthesis' in window)) return toast('Perangkat tidak mendukung suara');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = LANGS[lang][1]; u.rate = rate;
  const v = speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').toLowerCase().startsWith(LANGS[lang][1].toLowerCase().slice(0, 2)));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
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
