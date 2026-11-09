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
let db = Object.assign({ books: [], cur: null, my: 'id', lastLang: 'en', fs: 20, vocab: [], weak: {}, tab: 'rak' }, JSON.parse(localStorage.getItem(KEY) || '{}'));
const save = () => localStorage.setItem(KEY, JSON.stringify(db));
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
async function parseFile(file) {
  const name = file.name.replace(/\.[^.]+$/, '');
  const ext = (file.name.match(/\.([^.]+)$/) || [])[1]?.toLowerCase();
  if (ext === 'epub') return parseEpub(await file.arrayBuffer(), name);
  if (ext === 'pdf') return parsePdf(await file.arrayBuffer(), name);
  return { title: name, paras: cleanParas(await file.text()) };
}
async function parseEpub(buf, fallback) {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
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
  for (const ref of opf.getElementsByTagNameNS('*', 'itemref')) {
    const href = man[ref.getAttribute('idref')]; if (!href) continue;
    const f = zf(resolve(href)); if (!f) continue;
    const doc = new DOMParser().parseFromString(await f.async('string'), 'text/html');
    const blocks = doc.body ? doc.body.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,blockquote,pre') : [];
    if (blocks.length) blocks.forEach(b => { if (!b.querySelector('p')) { const t = b.textContent.replace(/\s+/g, ' ').trim(); if (t) paras.push(t); } });
    else if (doc.body) paras.push(...cleanParas(doc.body.textContent));
  }
  return { title, paras: splitLong(paras) };
}
async function parsePdf(buf, title) {
  const V = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
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
const trCache = new Map();
const POS = { noun: 'kata benda', verb: 'kata kerja', adjective: 'kata sifat', adverb: 'kata keterangan', preposition: 'kata depan', pronoun: 'kata ganti', conjunction: 'kata sambung', interjection: 'kata seru', article: 'artikel', abbreviation: 'singkatan', prefix: 'awalan', suffix: 'akhiran' };
async function translate(q, sl, tl) {
  const k = sl + '|' + tl + '|' + q;
  if (trCache.has(k)) return trCache.get(k);
  let out;
  try {
    const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&dt=bd&q=${encodeURIComponent(q)}`);
    if (!r.ok) throw new Error('gtx ' + r.status);
    const j = await r.json();
    out = { text: (j[0] || []).map(x => x[0]).join(''), dict: Array.isArray(j[1]) ? j[1].map(d => ({ pos: d[0], terms: (d[1] || []).slice(0, 6) })) : [] };
  } catch (e) {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${sl}|${tl}`);
    const j = await r.json();
    out = { text: j.responseData?.translatedText || '?', dict: [] };
  }
  trCache.set(k, out);
  return out;
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

/* ---------- UI umum ---------- */
let toastT;
function toast(m, ms = 2600) { const t = $('#toast'); t.textContent = m; t.classList.remove('hide'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hide'), ms); }
function openSheet(html) { $('#sheetBody').innerHTML = html; $('#sheet').classList.remove('hide'); $('#shade').classList.remove('hide'); $('#sheet').scrollTop = 0; }
function closeSheet() { $('#sheet').classList.add('hide'); $('#shade').classList.add('hide'); $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); }
$('#shade').onclick = closeSheet;
const langOpts = sel => Object.entries(LANGS).map(([k, v]) => `<option value="${k}"${k === sel ? ' selected' : ''}>${v[0]}</option>`).join('');
const book = () => db.books.find(b => b.id === db.cur);

let cache = { id: null, pages: null }; // halaman buku aktif
async function pagesOf(b) {
  if (cache.id !== b.id) { const paras = await getText(b.id); cache = { id: b.id, pages: paginate(paras || ['(teks hilang)'], b.lang) }; b.total = cache.pages.length; save(); }
  return cache.pages;
}
function setTab(t) {
  db.tab = t; save(); closeSheet(); stopListen();
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  $('#hdx').innerHTML = ''; $('#ttl').textContent = 'Baca Bahasa';
  window.scrollTo(0, 0);
  ({ rak: viewRak, baca: viewBaca, bicara: viewBicara, kata: viewKata })[t]();
}
$$('#tabs button').forEach(b => b.onclick = () => setTab(b.dataset.t));

/* ---------- RAK (perpustakaan) ---------- */
function viewRak() {
  const list = db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0));
  $('#view').innerHTML = `
  <div class="card">
    <h2>Tambah buku</h2>
    <div class="mut sm">Upload <b>.txt</b>, <b>.epub</b>, atau <b>.pdf</b> (bukan scan). Teks tampil tanpa arti — klik kata kalau bingung.</div>
    <div class="grid2">
      <label>Bahasa buku<select id="bl">${langOpts(db.lastLang)}</select></label>
      <label>Artikan ke<select id="ml">${langOpts(db.my)}</select></label>
    </div>
    <button class="pri big" id="up" style="width:100%">⬆️ Upload buku</button>
    <div class="row"><button id="paste">📋 Tempel teks</button><button id="sample">✨ Buku contoh</button></div>
  </div>
  <div class="lbl">Rak buku (${list.length})</div>
  ${list.length ? list.map(b => {
    const pct = b.total ? Math.round((b.pos + 1) / b.total * 100) : 0;
    return `<div class="card book"><div class="ic">📘</div><div class="inf" data-open="${b.id}"><div class="t">${esc(b.title)}</div>
      <div class="mut sm">${LANGS[b.lang]?.[0] || b.lang} · hlm ${b.pos + 1}/${b.total || '?'}</div><div class="bar"><i style="width:${pct}%"></i></div></div>
      <button data-del="${b.id}" title="Hapus">🗑️</button></div>`;
  }).join('') : `<div class="empty"><b>📚</b>Belum ada buku. Upload atau coba buku contoh.</div>`}`;
  $('#bl').onchange = e => { db.lastLang = e.target.value; save(); };
  $('#ml').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
  $('#up').onclick = () => $('#file').click();
  $('#sample').onclick = () => addBook('The Lighthouse Keeper (contoh)', cleanParas(SAMPLE), 'en');
  $('#paste').onclick = () => {
    openSheet(`<h2>Tempel teks</h2><input id="pt" placeholder="Judul"><div style="height:8px"></div>
      <textarea id="px" rows="9" placeholder="Tempel teks bahasa asing di sini…"></textarea>
      <div class="row"><button onclick="closeSheet()">Batal</button><button class="pri" id="ps">Simpan</button></div>`);
    $('#ps').onclick = () => { const x = $('#px').value.trim(); if (!x) return toast('Teks masih kosong'); closeSheet(); addBook($('#pt').value.trim() || x.slice(0, 30) + '…', cleanParas(x), db.lastLang); };
  };
  $$('[data-open]').forEach(el => el.onclick = () => { db.cur = el.dataset.open; save(); setTab('baca'); });
  $$('[data-del]').forEach(el => el.onclick = async () => {
    if (el.dataset.sure !== '1') { el.dataset.sure = '1'; el.textContent = 'Hapus?'; setTimeout(() => { el.dataset.sure = ''; el.textContent = '🗑️'; }, 3000); return; }
    const id = el.dataset.del; db.books = db.books.filter(b => b.id !== id); if (db.cur === id) db.cur = null; save(); await delText(id); viewRak();
  });
}
$('#file').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  toast('Membaca ' + f.name + '…', 60000);
  try { const r = await parseFile(f); if (!r.paras.length) throw new Error('Tidak ada teks yang terbaca'); await addBook(r.title, r.paras, db.lastLang); }
  catch (err) { console.error(err); toast('❌ ' + (err.message || err), 5000); }
};
async function addBook(title, paras, lang) {
  const id = 'b' + Date.now().toString(36);
  await putText(id, paras);
  db.books.push({ id, title, lang, pos: 0, si: 0, total: 0, added: Date.now(), opened: Date.now() });
  db.cur = id; save(); toast('✅ Buku ditambahkan'); setTab('baca');
}

/* ---------- BACA (mode reading) ---------- */
async function viewBaca() {
  const b = book();
  if (!b) { $('#view').innerHTML = `<div class="empty"><b>📖</b>Pilih atau upload buku dulu di tab Rak.<div class="row"><button class="pri" onclick="setTab('rak')">Ke Rak</button></div></div>`; return; }
  b.opened = Date.now(); save();
  const pages = await pagesOf(b);
  b.pos = Math.min(b.pos, pages.length - 1);
  $('#ttl').textContent = b.title;
  $('#hdx').innerHTML = `<button id="fsm">A−</button><button id="fsp">A+</button>`;
  $('#fsm').onclick = () => { db.fs = Math.max(14, db.fs - 2); save(); $('.page').style.fontSize = db.fs + 'px'; };
  $('#fsp').onclick = () => { db.fs = Math.min(32, db.fs + 2); save(); $('.page').style.fontSize = db.fs + 'px'; };
  let si = 0;
  const html = pages[b.pos].map(p => '<p>' + sentences(p, b.lang).map(s => `<span class="s" data-s="${si++}">` + tokens(s, b.lang).map(t => t.w ? `<span class="w">${esc(t.t)}</span>` : esc(t.t)).join('') + '</span>').join('') + '</p>').join('');
  $('#view').innerHTML = `
    ${db.seenTip ? '' : `<div class="tip">👆 <b>Klik kata</b> yang bikin bingung → muncul artinya. Masih bingung? tekan <b>Arti kalimat</b>.</div>`}
    <div class="card page" style="font-size:${db.fs}px">${html}</div>
    <div class="pager"><button id="pv" ${b.pos ? '' : 'disabled'}>‹ Sebelumnya</button><span>hlm ${b.pos + 1}/${pages.length}</span><button id="nx" ${b.pos < pages.length - 1 ? '' : 'disabled'}>Berikutnya ›</button></div>`;
  const go = d => { b.pos += d; b.si = 0; save(); viewBaca(); window.scrollTo(0, 0); };
  $('#pv').onclick = () => go(-1); $('#nx').onclick = () => go(1);
  $('.page').onclick = e => { const w = e.target.closest('.w'); if (w) onWord(w); };
}
async function onWord(el) {
  const b = book(); db.seenTip = true; save();
  $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
  el.classList.add('sel');
  const word = el.textContent, sEl = el.closest('.s'), sent = sEl.textContent.trim(), sIdx = +sEl.dataset.s;
  const saved = db.vocab.some(v => v.w.toLowerCase() === word.toLowerCase() && v.lang === b.lang);
  openSheet(`
    <div class="lbl">Arti kata</div>
    <div class="wd">${esc(word)} <button id="sw">🔊</button></div>
    <div class="tr" id="wtr">⏳ menerjemahkan…</div>
    <div class="dict" id="wdict"></div>
    <div class="row"><button id="wsave">${saved ? '⭐ Tersimpan' : '☆ Simpan kata'}</button><button class="pri" id="wnext">Masih bingung? Arti kalimat ›</button></div>`);
  $('#sw').onclick = () => speak(word, b.lang, 0.8);
  let tr = null;
  translate(word, b.lang, db.my).then(r => {
    tr = r; if (!$('#wtr')) return;
    $('#wtr').textContent = r.text;
    $('#wdict').innerHTML = r.dict.map(d => `<div><b>${esc(POS[d.pos] || d.pos)}:</b> ${d.terms.map(esc).join(', ')}</div>`).join('');
  }).catch(() => { if ($('#wtr')) $('#wtr').textContent = '⚠️ Gagal menerjemahkan (cek internet)'; });
  $('#wsave').onclick = async () => {
    if (db.vocab.some(v => v.w.toLowerCase() === word.toLowerCase() && v.lang === b.lang)) return;
    const r = tr || await translate(word, b.lang, db.my).catch(() => ({ text: '' }));
    db.vocab.unshift({ w: word, t: r.text, lang: b.lang, s: sent, at: Date.now() }); save();
    $('#wsave').textContent = '⭐ Tersimpan';
  };
  $('#wnext').onclick = () => showSentence(word, sent, sIdx, sEl);
}
function showSentence(word, sent, sIdx, sEl) {
  const b = book();
  sEl.classList.add('hl');
  const marked = esc(sent).replace(new RegExp('(^|[^\\p{L}])(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?=[^\\p{L}]|$)', 'u'), '$1<mark>$2</mark>');
  openSheet(`
    <div class="lbl">Arti dalam kalimat</div>
    <div class="src">${marked}</div>
    <div class="tr sent" id="str">⏳ menerjemahkan kalimat…</div>
    <div class="row"><button id="ssp">🔊 Dengarkan</button><button id="sback">‹ Arti kata</button></div>
    <div class="row"><button class="pri" id="spr">🗣️ Latih ucap kalimat ini</button></div>`);
  translate(sent, b.lang, db.my).then(r => { if ($('#str')) $('#str').textContent = r.text; }).catch(() => { if ($('#str')) $('#str').textContent = '⚠️ Gagal menerjemahkan (cek internet)'; });
  $('#ssp').onclick = () => speak(sent, b.lang);
  $('#sback').onclick = () => { const el = sEl.querySelector('.w.sel'); if (el) onWord(el); };
  $('#spr').onclick = () => { b.si = sIdx; save(); setTab('bicara'); };
}

/* ---------- BICARA (mode speaking) ---------- */
async function viewBicara() {
  const b = book();
  if (!b) { $('#view').innerHTML = `<div class="empty"><b>🗣️</b>Pilih buku dulu di tab Rak.<div class="row"><button class="pri" onclick="setTab('rak')">Ke Rak</button></div></div>`; return; }
  const pages = await pagesOf(b);
  const sents = pages[b.pos].flatMap(p => sentences(p, b.lang)).map(s => s.trim()).filter(s => tokens(s, b.lang).some(t => t.w));
  b.si = Math.max(0, Math.min(b.si || 0, sents.length - 1)); save();
  const sent = sents[b.si] || '';
  const toks = tokens(sent, b.lang);
  let wi = 0;
  const words = [];
  const tHtml = toks.map(t => { if (!t.w) return esc(t.t); words.push(t.t); return `<span class="t" data-i="${wi++}">${esc(t.t)}</span>`; }).join('');
  $('#ttl').textContent = 'Bicara · ' + b.title;
  $('#view').innerHTML = `
    ${SR || TEST ? '' : `<div class="tip">⚠️ ${micError('nosupport')}</div>`}
    <div class="card">
      <div class="lbl">Kalimat ${b.si + 1}/${sents.length} · hlm ${b.pos + 1}</div>
      <div class="target" id="target">${tHtml}</div>
      <div class="heard" id="heard"></div>
      <div class="row"><button id="ex">🔊 Contoh</button><button class="pri big" id="rec">🎤 Mulai baca</button></div>
      <div id="res"></div>
    </div>
    <div id="remed"></div>
    <div class="pager"><button id="sp">‹ Sebelumnya</button><button id="sn">Berikutnya ›</button></div>`;
  $('#ex').onclick = () => speak(sent, b.lang, 0.85);
  $('#sp').onclick = async () => { if (b.si > 0) b.si--; else if (b.pos > 0) { b.pos--; b.si = 1e9; } else return; save(); viewBicara(); };
  $('#sn').onclick = async () => { if (b.si < sents.length - 1) b.si++; else if (b.pos < pages.length - 1) { b.pos++; b.si = 0; } else return toast('🎉 Sudah kalimat terakhir buku'); save(); viewBicara(); };
  const btn = $('#rec');
  btn.onclick = async () => {
    if (btn.classList.contains('rec')) return stopListen();
    btn.classList.add('rec'); btn.textContent = '⏹️ Selesai'; $('#heard').textContent = '🎙️ mendengarkan… baca kalimatnya'; $('#res').innerHTML = ''; $('#remed').innerHTML = '';
    let cands;
    try { cands = await listen(b.lang, { onInterim: t => $('#heard').textContent = '🎙️ ' + t }); }
    catch (e) { btn.classList.remove('rec'); btn.textContent = '🎤 Mulai baca'; $('#heard').textContent = ''; return toast(micError(e), 6000); }
    btn.classList.remove('rec'); btn.textContent = '🎤 Ulangi baca';
    if (!cands.length) { $('#heard').textContent = '🤔 Tidak terdengar apa-apa. Coba lagi lebih dekat ke mikrofon.'; return; }
    $('#heard').textContent = '👂 Terdengar: “' + cands[0] + '”';
    const sc = scoreSentence(words.map(norm), cands, b.lang);
    $$('#target .t').forEach((el, i) => { el.dataset.p = sc[i]; el.className = 't ' + cls(sc[i]); });
    const avg = Math.round(sc.reduce((a, c) => a + c, 0) / (sc.length || 1));
    words.forEach((w, i) => recordWeak(w, b.lang, sc[i]));
    $('#res').innerHTML = `<div class="score">${avg}%<small>ketepatan kalimat · ${sc.filter(x => x >= PASS).length}/${sc.length} kata tepat</small></div>`;
    const worst = words.map((w, i) => ({ w, p: sc[i] })).filter(x => x.p < PASS && norm(x.w))
      .sort((a, c) => a.p - c.p).filter((x, i, a) => a.findIndex(y => norm(y.w) === norm(x.w)) === i).slice(0, 5);
    if (!worst.length) { $('#remed').innerHTML = `<div class="card"><h2>🎉 Semua kata tepat!</h2><div class="mut">Lanjut ke kalimat berikutnya.</div></div>`; return; }
    $('#remed').innerHTML = `<div class="card"><h2>🎯 Remedial</h2><div class="mut sm">Kata paling jelek, dilatih satu per satu sampai ≥${PASS}%:</div>
      <div class="chips">${worst.map(x => `<span class="chip ${cls(x.p)}">${esc(x.w)} ${x.p}%</span>`).join('')}</div>
      <div class="row"><button class="pri big" id="goRem">Mulai remedial (${worst.length} kata)</button></div></div>`;
    $('#goRem').onclick = () => remedial(worst, b.lang, $('#remed'), () => {
      $('#remed').innerHTML = `<div class="card"><h2>✅ Remedial selesai</h2><div class="mut">Sekarang baca ulang kalimatnya utuh.</div><div class="row"><button class="pri" id="again">🎤 Baca ulang kalimat</button></div></div>`;
      $('#again').onclick = () => { window.scrollTo(0, 0); btn.click(); };
    });
  };
}
function recordWeak(w, lang, p) {
  const k = lang + ':' + norm(w); if (!norm(w)) return;
  const o = db.weak[k] || { w, lang, n: 0, last: 0, best: 0 };
  o.n++; o.last = p; o.best = Math.max(o.best, p); o.at = Date.now(); db.weak[k] = o; save();
}
function remedial(list, lang, box, done) {
  let i = 0, tries = 0;
  const step = () => {
    if (i >= list.length) return done();
    const x = list[i];
    box.innerHTML = `<div class="card">
      <div class="lbl">Remedial ${i + 1}/${list.length} · percobaan ${tries}</div>
      <div class="rem-word">${esc(x.w)}</div>
      <div class="tr sent" style="text-align:center" id="rtr"></div>
      <div class="score" id="rsc">${x.p}%<small>skor sebelumnya</small></div>
      <div class="heard" id="rh" style="text-align:center"></div>
      <div class="row"><button id="rl">🔊 Dengar</button><button id="rs">🐢 Pelan</button></div>
      <div class="row"><button class="pri big" id="rr">🎤 Ucapkan</button></div>
      <div class="row"><button id="rk">Lewati ›</button></div></div>`;
    translate(x.w, lang, db.my).then(r => { if ($('#rtr')) $('#rtr').textContent = r.text; }).catch(() => { });
    $('#rl').onclick = () => speak(x.w, lang, 0.8);
    $('#rs').onclick = () => speak(x.w, lang, 0.45);
    $('#rk').onclick = () => { i++; tries = 0; step(); };
    $('#rr').onclick = async () => {
      const bt = $('#rr'); if (bt.classList.contains('rec')) return stopListen();
      bt.classList.add('rec'); bt.textContent = '⏹️ mendengarkan…'; $('#rh').textContent = '';
      let c;
      try { c = await listen(lang, { single: true, onInterim: t => { if ($('#rh')) $('#rh').textContent = '🎙️ ' + t; } }); }
      catch (e) { bt.classList.remove('rec'); bt.textContent = '🎤 Ucapkan'; return toast(micError(e), 6000); }
      tries++;
      const p = c.length ? scoreWord(x.w, c, lang) : 0;
      recordWeak(x.w, lang, p);
      bt.classList.remove('rec'); bt.textContent = '🎤 Ucapkan lagi';
      $('#rsc').innerHTML = `<span style="color:var(--${p >= PASS ? 'good' : p >= 60 ? 'mid' : 'bad'})">${p}%</span><small>${p >= PASS ? '✅ Lulus!' : 'belum, coba lagi — dengar contohnya dulu'}</small>`;
      $('#rh').textContent = c.length ? '👂 Terdengar: “' + c[0] + '”' : '🤔 tidak terdengar';
      box.querySelector('.lbl').textContent = `Remedial ${i + 1}/${list.length} · percobaan ${tries}`;
      if (p >= PASS) setTimeout(() => { i++; tries = 0; step(); }, 1200);
      else if (tries >= 2) speak(x.w, lang, 0.7);
    };
  };
  step();
}

/* ---------- KATA (kosakata & kata sulit) ---------- */
function viewKata() {
  const weak = Object.values(db.weak).filter(o => o.last < PASS).sort((a, b) => a.last - b.last).slice(0, 30);
  $('#view').innerHTML = `
    <div class="card"><h2>🎯 Kata sulit diucapkan (${weak.length})</h2>
      ${weak.length ? `<div class="chips">${weak.map(o => `<span class="chip ${cls(o.last)}">${esc(o.w)} ${o.last}%</span>`).join('')}</div>
        <div class="row"><button class="pri" id="kRem">Latih ${Math.min(weak.length, 10)} kata terjelek</button></div>` : '<div class="mut">Belum ada. Latihan di tab Bicara dulu.</div>'}
      <div id="kbox"></div></div>
    <div class="card"><h2>⭐ Kosakata tersimpan (${db.vocab.length})</h2>
      ${db.vocab.length ? db.vocab.map((v, i) => `<div class="vitem"><div class="inf"><b>${esc(v.w)}</b> — ${esc(v.t)}<div class="mut sm">${esc(v.s || '')}</div></div>
        <button data-sp="${i}">🔊</button><button data-dv="${i}">✕</button></div>`).join('') : '<div class="mut">Belum ada. Saat membaca, klik kata → ☆ Simpan kata.</div>'}</div>`;
  $$('[data-sp]').forEach(el => el.onclick = () => { const v = db.vocab[+el.dataset.sp]; speak(v.w, v.lang, 0.8); });
  $$('[data-dv]').forEach(el => el.onclick = () => { db.vocab.splice(+el.dataset.dv, 1); save(); viewKata(); });
  if ($('#kRem')) $('#kRem').onclick = () => {
    const list = weak.slice(0, 10), lang = list[0].lang;
    remedial(list.filter(o => o.lang === lang).map(o => ({ w: o.w, p: o.last })), lang, $('#kbox'), () => { toast('✅ Latihan selesai'); viewKata(); });
  };
}

/* ---------- buku contoh (teks orisinal) ---------- */
const SAMPLE = `The Lighthouse Keeper

Every evening, old Tomas climbed the narrow stairs of the lighthouse. There were one hundred and twelve steps, and he knew each one by heart. Some steps creaked, some were cold, and one near the top was always a little wet.

At the top, he cleaned the great glass lens with a soft cloth. Then he lit the lamp and watched the beam sweep slowly across the dark water. Somewhere out there, sailors were looking for that light. It told them where the rocks were hidden.

One stormy night, the wind became so strong that the windows shook. Tomas heard a strange sound below, like someone knocking on the door. He hurried down the stairs with his lantern, wondering who could be outside in such terrible weather.

When he opened the door, a young girl stood there, soaking wet and shivering. "My father's boat is missing," she said quietly. "He always follows your light home, but tonight he is late."

Tomas brought her inside and gave her a warm blanket. "The light is still burning," he told her gently. "If your father can see it, he will find his way." They climbed the stairs together and stared into the rain.

Hours passed. The girl almost fell asleep against the window. Then, just before sunrise, a small green boat appeared between the waves. The girl jumped up and laughed with relief. Tomas smiled, because this was the reason he climbed the stairs every night.`;

/* ---------- mulai ---------- */
if ('serviceWorker' in navigator && !TEST && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js');
if ('speechSynthesis' in window) speechSynthesis.getVoices();
setTab(db.tab && (db.tab === 'rak' || db.cur) ? db.tab : 'rak');
