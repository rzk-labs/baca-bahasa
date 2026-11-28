'use strict';
/* jeda sebelum 'Masih nyari artinya…' + Coba lagi (arti kata & kalimat); permintaan tetap jalan */
const SLOW_MS = 3000;
/* #1836: arti yang baru tiba memudar masuk halus (kelas .arrive; animasinya diulang tiap panggilan) */
const arriveFx = e => { e.classList.remove('arrive'); void e.offsetWidth; e.classList.add('arrive'); };
/* KEEPO v8— Perpustakaan santai (krem, hijau tua, oranye bata; tanpa maskot). XP/level, lencana, konfeti, kartu swipe. Logika teks/suara/skor ada di app.js. */
db.font = db.font || 'serif'; db.days = db.days || []; db.scores = db.scores || []; db.lh = db.lh || 1.7; if (db.align !== 'l' && db.align !== 'j') db.align = null; db.mg = db.mg || 'm'; if (db.spacing !== 'w') db.spacing = 'n'; db.focus = !!db.focus; if (db.showBaca == null) db.showBaca = true; if (db.peekBaca !== 'langsung' && db.peekBaca !== 'ketuk') db.peekBaca = null; db.rt = [0, 1, 2].includes(db.rt) ? db.rt : 0; db.rtSet = !!db.rtSet; if (!db.rtHint || typeof db.rtHint !== 'object') db.rtHint = {}; if (!db.rtLang || typeof db.rtLang !== 'object') db.rtLang = {};
const rtOf = lang => [0, 1, 2].includes(db.rtLang[lang]) ? db.rtLang[lang] : (!db.rtSet && lang === 'zh-CN') ? 2 : db.rt;
const isUmum = (lang, w) => { const g = FUNC_SET[String(lang || '').toLowerCase().split('-')[0]]; return !!(g && g.has(String(w).toLowerCase())); };
const setRt = (lang, v) => { db.rt = v; db.rtSet = true; db.rtLang[lang] = v; save(); };
let rtAsked = null; /* Mandarin: pinyin nyala otomatis sampai pengguna memilih sendiri */
const SPC = { n: ['', ''], w: ['.04em', '.12em'] };
const spcSet = (el, k) => { const [ls, ws] = SPC[k] || SPC.n; if (ls) { el.style.setProperty('--reader-ls', ls); el.style.setProperty('--reader-ws', ws); } else { el.style.removeProperty('--reader-ls'); el.style.removeProperty('--reader-ws'); } };
const effAlign = () => db.align || (window.matchMedia('(max-width:600px)').matches ? 'l' : 'j');
db.xp = db.xp || 0; db.xpDay = db.xpDay || {}; db.badges = db.badges || []; if (db.sfx == null) db.sfx = true;
db.stat = Object.assign({ look: 0, save: 0, page: 0, speak: 0, perfect: 0, rem: 0, flash: 0 }, db.stat || {});
/* Migrasi v9 (sekali): tema lama -> 4 tema baca. 'Ikut HP' dihapus (paling sederhana): auto dipetakan sekali ke Malam bila HP gelap, selain itu Kertas. */
const THEMES = ['paper', 'sepia', 'green', 'night'];
if (!db.v9) {
  const old = db.theme;
  db.theme = old === 'sepia' ? 'sepia' : old === 'dark' ? 'night' : old === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'paper') : 'paper';
  if (db.lh && db.lh !== 1.7) db.lhSet = true; /* jarak baris pilihan sendiri tetap dihormati */
  db.v9 = 1; save();
}
if (!THEMES.includes(db.theme)) db.theme = 'paper';
const FEEDBACK_KONTAK = ''; /* isi tautan WhatsApp (https://wa.me/...) atau mailto: tim kalau sudah ada; kosong = hanya bagikan/salin */

/* ---------- ikon ---------- */
const BM = '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>';
const ICONS = {
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  mic: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
  cards: '<rect x="3" y="6" width="13" height="16" rx="2.5"/><path d="M8 2h10.5A2.5 2.5 0 0 1 21 4.5V17"/>',
  bm: BM,
  bmplus: BM + '<path d="M12 7v6M15 10H9"/>', bmcheck: BM + '<path d="m9 10 2 2 4-4"/>',
  pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  vol: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
  ruby: '<path d="M6 6h3M12 6h3"/><path d="M4 12h16"/><path d="M4 18h10"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  dl: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>', pointer: '<path d="M9 11V5a2 2 0 0 1 4 0v6"/><path d="m13 10 5 1a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-3l-3-5a2 2 0 0 1 3-2l1 1"/>', swipe: '<path d="M5 12h14"/><path d="m15 8 4 4-4 4"/><path d="m9 8-4 4 4 4"/>', menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>', mute: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6M21 9l-5 6"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  bolt: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  flag: '<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 8 2a6 6 0 0 0 3.6-1.2A1 1 0 0 1 21 3.6v9.8a1 1 0 0 1-.4.8A6 6 0 0 1 17 15c-3 0-5-2-8-2a6 6 0 0 0-4 1.5"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  upload: '<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
  clip: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17v4M17 19h4"/>',
  sword: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.7V17c0 .6-.5 1-1.2 1.2C7.8 18.7 7 20 7 22M14 14.7V17c0 .6.5 1 1.2 1.2 1 .5 1.8 1.8 1.8 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/>',
  alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  bug:'<path d="m8 2 1.9 1.9M16 2l-1.9 1.9"/><path d="M9 7.1V6a3 3 0 0 1 6 0v1.1"/><path d="M12 20a6 6 0 0 1-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3a6 6 0 0 1-6 6zM12 20v-9M6.5 13H2M17.5 13H22M6 17l-3 2M18 17l3 2M6 9 3 7M18 9l3-2"/>',
  bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',
  heart:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  send:'<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  eyeoff:'<path d="M10.7 5.1A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-2.2 3M6.6 6.6A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 5.4-1.6M2 2l20 20"/>',
  slow:'<path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"/><circle cx="10" cy="13" r="8"/><path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"/><path d="M18 3 19.1 5.2M22 3 20.9 5.2"/>',
  wifioff:'<path d="M12 20h.01"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M5 12.9a10 10 0 0 1 5.2-2.8"/><path d="M19 12.9a10 10 0 0 0-2.2-1.6"/><path d="M2 8.8a15 15 0 0 1 4.2-2.6"/><path d="M22 8.8A15 15 0 0 0 10.7 5"/><path d="m2 2 20 20"/>'
};
const ico = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

/* ---------- penanda visual: blok warna flat + ikon sederhana (brand A, tanpa maskot) ---------- */
const SPOT_ICON = { curious: 'search', happy: 'mic', cheer: 'check', wow: 'mic', sad: 'book', icon: 'book' };
function spot(mood = 'curious', cls = '') {
  if (!SPOT_ICON[mood]) mood = 'curious';
  return `<span class="spot s-${mood} ${cls}" aria-hidden="true">${ico(SPOT_ICON[mood])}</span>`;
}

/* ---------- utilitas ---------- */
const vib = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { } };
/* kunci hari = tanggal LOKAL HP (bukan UTC), format YYYY-MM-DD; data lama (kunci UTC) tetap dibaca apa adanya */
const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => dayKey();
// Kalimat asal kartu ulang: sorot kemunculan pertama kata target (escape per potongan, tanpa regex).
function hitHtml(sent, w) {
  const s = String(sent || ''), k = String(w || '').trim();
  if (!s || !k) return esc(s);
  const sl = s.toLowerCase(), kl = k.toLowerCase();
  if (sl.length !== s.length || kl.length !== k.length) return esc(s);
  const i = sl.indexOf(kl);
  if (i < 0) return esc(s);
  return `${esc(s.slice(0, i))}<mark class="fs-hit">${esc(s.slice(i, i + k.length))}</mark>${esc(s.slice(i + k.length))}`;
}
function markDay() { const d = today(); if (!db.days.includes(d)) { db.days.push(d); db.days = db.days.slice(-400); save(); } }
function streak() { let n = 0; const d = new Date(); if (!db.days.includes(today())) d.setDate(d.getDate() - 1); for (; ;) { if (db.days.includes(dayKey(d))) { n++; d.setDate(d.getDate() - 1); } else return n; } }
function hue(s) { let h = 5381; for (const c of String(s)) h = (Math.imul(h, 33) + c.codePointAt(0)) >>> 0; h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d) >>> 0; h ^= h >>> 12; return h >>> 0; } /* hash seluruh judul: awalan sama tetap beda warna */
// Sampul brand v9: [latar, teks, aksen inisial]. Plum di atas warna terang, Krem di atas Plum.
const CCOL = [['#D7EFFF', '#351E28', '#351E28'], ['#C3E1F4', '#351E28', '#351E28'], ['#AEB8A0', '#351E28', '#351E28'], ['#FAF7F0', '#351E28', '#351E28'], ['#E4EDD6', '#351E28', '#351E28'], ['#B9CBD8', '#351E28', '#351E28'], ['#351E28', '#FAF7F0', '#E9F056'], ['#4A3340', '#FAF7F0', '#E9F056']];
const COVERS = {};
async function muatCover() { let ada = false; for (const b of db.books) { if ((b.cov || b.covU) && !COVERS[b.id]) { try { const u = (b.covU && await getCoverU(b.id)) || (b.cov && await getCover(b.id)); if (u) { COVERS[b.id] = u; ada = true; } } catch (e) { } } } if (ada && (db.tab === 'rak' || db.tab === 'home')) setTab(db.tab); }
/* pisahkan penulis dalam kurung: 'こころ（夏目漱石）' -> {main:'こころ', au:'夏目漱石'} (hanya tampilan) */
function splitTitle(t) { t = String(t || '').trim(); let m = t.match(/^(.*\S)\s*[（(]([^（）()]+)[）)]\s*$/); if (m) return { main: m[1], au: m[2].trim() }; m = t.match(/^(.*?\S)\s+[-–—]\s+(\S.*)$/); /* "Judul - Penulis": hanya bila ada spasi di kedua sisi tanda */ return m && m[2].length <= 40 ? { main: m[1], au: m[2].trim() } : { main: t, au: '' }; }
function coverTitle(t) { if (t.length <= 34) return t; const c = t.slice(0, 34), i = c.search(/\s\S*$/); return (i > 12 ? c.slice(0, i) : c).replace(/[\s,;:\-–—]+$/, '') + '…'; }
/* arti alternatif tanpa pengulangan arti utama (abaikan huruf besar/kecil, spasi, tanda baca); kosong = sembunyikan 'Bisa juga' */
const altArti = (dict, main) => {
  const nz = t => String(t || '').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
  const seen = new Set(String(main || '').split(/[;,，、；\/]/).map(nz).filter(Boolean)); seen.add(nz(main));
  const groups = []; let total = 0;
  for (const x of (Array.isArray(dict) ? dict : [])) {
    if (!x || !Array.isArray(x.terms)) continue;
    const pos = typeof x.pos === 'string' ? x.pos : '';
    for (const t of x.terms) {
      if (total >= 40) break;
      const k = typeof t === 'string' ? nz(t) : ''; if (!k || seen.has(k)) continue;
      let g = groups.find(y => y.pos === pos); if (!g) { g = { pos, terms: [] }; groups.push(g); }
      if (g.terms.length >= 15) continue;
      seen.add(k); g.terms.push(t); total++;
    }
  }
  return groups.filter(g => g.terms.length);
};
const altCount = gs => gs.reduce((n, g) => n + g.terms.length, 0);
const altFlat = gs => gs.flatMap(g => g.terms);
/* kelompok arti -> HTML: label jenis kata (tanpa label bila tak ada), chip bernomor data-i berurutan */
const altHtml = gs => { let i = 0; return gs.map(g => `${g.pos ? `<div class="altpos">${esc((POS[g.pos] || g.pos).replace(/^./, c => c.toUpperCase()))}</div>` : ''}<div class="altch" role="group" aria-label="Arti lain">${g.terms.map(t => `<button class="altopt" type="button" data-i="${i++}" dir="auto">${esc(t)}</button>`).join('')}</div>`).join(''); };
/* huruf awal sampul: lewati tanda kutip & kata sandang umum (The, Der, Le, L', El, Il...) bila masih ada huruf lain */
function coverIni(t) { const x = String(t || '').replace(/^[^\p{L}\p{N}]+/u, ''), y = x.replace(/^(?:the|an?|der|die|das|le|la|les|el|los|il|l['’]|un|une)(?:\s+|(?<=['’]))(?=[\p{L}\p{N}])/iu, ''); return ((y.match(/[\p{L}\p{N}]/u) || x.match(/[\p{L}\p{N}]/u) || ['K'])[0]).toLocaleUpperCase(); }
function cover(b) { const h = hue(b.title), c = CCOL[h % CCOL.length], t = splitTitle(b.title).main, ini = coverIni(t); return `<div class="cover pat${(h >>> 8) % 3}" style="background:${c[0]};color:${c[1]}" role="img" aria-label="${esc(t)}"><span class="em" style="color:${c[2]}" aria-hidden="true">${esc(ini)}</span>${COVERS[b.id] ? '' : `<span class="ct${coverSz(t)}${coverShort(t)}" aria-hidden="true">${esc(t)}</span>`}${COVERS[b.id] ? `<img class="cimg" src="${COVERS[b.id]}" alt="" decoding="async" onerror="this.remove()">` : ''}</div>`; }
// Ukuran judul sampul: kata terpanjang makin panjang → huruf makin kecil (kata tak dipenggal); CJK boleh patah per huruf
/* #1947: judul CJK <=6 huruf: di sampul kecil rak Profil tampil utuh, huruf awal disembunyikan */
function coverShort(t) { return /[぀-ヿ㐀-鿿가-힯]/.test(t) && [...t.trim()].length <= 6 ? ' short' : ''; }
function coverSz(t) { if (/[぀-ヿ㐀-鿿가-힯]/.test(t)) return ' cjk' + (/[가-힯]/.test(t) && !/[぀-ヿ㐀-鿿]/.test(t) ? ' ko' : '') + (/\s/.test(t.trim()) ? ' sp' : '') + ([...t].length > 10 ? ' c2' : ''); const n = Math.max(0, ...t.split(/\s+/).map(w => [...w].length)); return n > 13 ? ' c4' : n > 11 ? ' c3' : n > 9 ? ' c2' : n > 7 ? ' c1' : ''; }
function applyTheme() {
  document.documentElement.dataset.theme = db.theme;
  try { stopListenPage(); } catch (_) {} /* ganti tema saat dengar: berhenti bersih */
  document.querySelector('meta[name=theme-color]').content = { paper: '#FAF7F0', sepia: '#F3E9D7', green: '#E3EEDC', night: '#1E1A1D' }[db.theme] || '#FAF7F0';
}
const LANG_ID = { en: 'Inggris', ja: 'Jepang', ko: 'Korea', 'zh-CN': 'Mandarin', fr: 'Prancis', de: 'Jerman', es: 'Spanyol', it: 'Italia', nl: 'Belanda', pt: 'Portugis', ru: 'Rusia', ar: 'Arab', th: 'Thai', hi: 'Hindi', tr: 'Turki', id: 'Indonesia' };
const FLAG = { en: '🇬🇧', ja: '🇯🇵', ko: '🇰🇷', 'zh-CN': '🇨🇳', fr: '🇫🇷', de: '🇩🇪', es: '🇪🇸', it: '🇮🇹', nl: '🇳🇱', pt: '🇵🇹', ru: '🇷🇺', ar: '🇸🇦', th: '🇹🇭', hi: '🇮🇳', tr: '🇹🇷', id: '🇮🇩' };
const langName = l => (FLAG[l] || '') + ' ' + (LANG_ID[l] || (LANGS[l] || [l])[0]);
/* #1987: satu nama tombol pindah buku di Home, reader, sheet Tamat */
const nextBkLabel = (from, to) => !to ? 'Buku baru' : `Mulai buku ${from && to.lang === from.lang ? 'berikutnya' : (LANG_ID[to.lang] || (LANGS[to.lang] || [to.lang])[0])}`;
/* SATU rumus persen buku (bobot bab bila units valid) untuk SEMUA layar: Home, bar baca, Profil, Koleksi, Sosial.
   Dihitung ulang saat render dari pos + halaman tersimpan, bukan dari b.pct lama yang bisa basi. Tamat = 100. */
/* posisi dalam bab = pecahan stabil b.frac (0-1, milik bab b.fracPos); buku lama: dari pg/pgN; tak ada = awal bab */
function fracOf(b) {
  const pos = b.pos || 0;
  if (typeof b.frac === 'number' && b.fracPos === pos && b.frac >= 0 && b.frac <= 1) {
    /* kalimat digeser di luar reader (Ngomong, penanda): perkirakan dari kalimat, bukan halaman basi */
    if (b.sc > 1 && Number.isFinite(b.fsi) && Number.isFinite(b.si) && b.si !== b.fsi) return Math.max(0, Math.min(1, (Math.min(b.si, b.sc - 1) + 1) / b.sc));
    return b.frac;
  }
  if (b.pgN > 0 && Number.isInteger(b.pg) && b.pg >= 0 && b.pg < b.pgN && b.pgPos === pos) return (b.pg + 1) / b.pgN;
  return 0;
}
function pctCalc(b, f) {
  const total = b.total || 1, pos = b.pos || 0;
  if (pos >= total - 1 && f >= 1) return 100;
  const uOk = Array.isArray(b.units) && b.units.length === total && total > 1, uSum = uOk ? b.units.reduce((a, x) => a + x, 0) : 0;
  return uOk && uSum > 0
    ? Math.max(1, Math.min(100, Math.ceil((b.units.slice(0, pos).reduce((a, x) => a + x, 0) + (b.units[pos] || 0) * f) / uSum * 100 - 1e-9)))
    : Math.max(1, Math.min(100, Math.ceil((pos + f) / total * 100 - 1e-9)));
}
const pctOf = b => {
  if (!b) return 0;
  if (b.pct >= 100) return 100; /* Tamat */
  if (/\(contoh\)/i.test(b.title || '') && !b.last && !b.pos && !fracOf(b) && !(b.pct > 1)) return 0; /* buku contoh belum dibuka = 0 */
  if (!b.total) return b.pct != null ? b.pct : 0;
  return pctCalc(b, fracOf(b));
};
/* SATU fungsi status buku (Home, bar baca, Profil): tamat = 100% + label 'Selesai' */
const LBL_BELUM = 'Belum dibuka';
const statusPct = p => { p = Math.max(0, Math.min(100, +p || 0)); return p >= 100 ? { done: true, pct: 100, label: 'Tamat', txt: 'Tamat · 100%' } : { done: false, pct: p, label: p > 0 ? 'Lagi dibaca' : LBL_BELUM, txt: p + '%' }; };
const bookStatus = b => statusPct(pctOf(b));
const bookPct = pctOf; /* SATU pintu persen buku untuk semua layar (jangan baca b.pct langsung) */
const progress = p => { $('#prog').innerHTML = p == null ? '' : `<i style="width:${p}%"></i>`; };
const SCORE = p => p >= PASS ? ['g', 'Mantap!', 'Pengucapanmu udah jelas banget.', 'cheer'] : p >= 60 ? ['m', 'Dikit lagi!', 'Udah deket. Perhatiin bunyinya ya.', 'wow'] : ['b', 'Gas latihan!', 'Santai, kita latih pelan-pelan.', 'sad'];
const chip = (p, txt) => `<span class="chip ${SCORE(p)[0]}">${txt ? esc(txt) + ' · ' : ''}${p}%</span>`;
function micError(e) {
  const m = String(e && e.message || e);
  if (m === 'nosupport') return 'Browser ini belum bisa dengerin suara. Pakai Safari di iPhone atau Chrome ya.';
  if (/not-allowed|service-not-allowed/.test(m)) return 'Mic belum diizinin. Buka pengaturan browser → izinkan mikrofon.';
  if (/network/.test(m)) return 'Koneksi putus. Penilaian ngomong butuh internet.';
  if (/audio-capture/.test(m)) return 'Mic nggak ketemu. Cek mikrofon HP/laptop kamu.';
  return 'Belum bisa dinilai, bukan salah kamu kok. Coba lagi ya.';
}

/* ---------- efek: suara, konfeti, XP ---------- */
let actx;
function sfx(kind) {
  if (!db.sfx) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { pop: [[660, .06]], ding: [[880, .08], [1320, .12]], win: [[523, .09], [659, .09], [784, .09], [1047, .2]], lvl: [[392, .1], [523, .1], [659, .1], [784, .1], [1047, .3]], soft: [[330, .12]] }[kind] || [[600, .06]];
    let t = actx.currentTime;
    for (const [f, d] of seq) { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d + .02); t += d * .85; }
  } catch (e) { }
}
function confetti(n = 70) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = document.createElement('div'); box.className = 'confetti';
  const cols = ['#D7EFFF', '#C3E1F4', '#AEB8A0', '#E9F056', '#351E28', '#FAF7F0'];
  for (let i = 0; i < n; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + 'vw'; p.style.background = cols[i % cols.length]; p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg'); p.style.animationDelay = Math.random() * .3 + 's'; box.appendChild(p); }
  document.body.appendChild(box); setTimeout(() => box.remove(), 2000);
}
/* asal XP singkat ('dari halaman, kata, tamat'); hanya tampilan, tak pernah mengubah db.xp */
const xpAsal = () => { const s = db.xpSrc || {}, g = { halaman: s.page, kata: (s.save || 0) + (s.look || 0) + (s.rem || 0), tamat: s.done, ngomong: s.speak }; const t = Object.keys(g).filter(k => g[k] > 0).sort((a, b) => g[b] - g[a]).slice(0, 3); return t.length ? 'dari ' + t.join(', ') : ''; };
/* rincian XP per sumber untuk Profil; hanya tampilan, bagian nol disembunyikan. 'Akun lain' = sisa XP yang tak tercatat di perangkat ini */
const xpRinci = () => { const s = db.xpSrc || {}, g = [['Halaman', s.page], ['Kata', (s.save || 0) + (s.look || 0) + (s.rem || 0)], ['Tamat', s.done], ['Ngomong', s.speak]]; const known = g.reduce((t, x) => t + (x[1] || 0), 0); g.push(['Akun lain', Math.max(0, (db.xp || 0) - known)]); return g.filter(x => x[1] > 0).map(x => x[0] + ' ' + x[1]).join(' · ') || 'belum ada'; };
const level = (xp = db.xp) => Math.floor(xp / 100) + 1;
/* SATU sumber XP/level: Home, Profil, header, popup */
const xpInfo = () => ({ xp: db.xp, lv: level(), inLv: db.xp % 100 });
/* #1681: target harian = menit baca aktif (awal 5). XP tetap jalan tapi bukan target. Home & sheet Tamat memakai teks yang sama */
const GOAL_MINS = [5, 10, 15];
const goalMin = () => GOAL_MINS.includes(db.goalMin) ? db.goalMin : 5; /* data lama tanpa pilihan = 5 menit */
const readSecToday = () => Math.max(0, +((db.readSec || {})[today()]) || 0);
const minToday = () => Math.floor(readSecToday() / 60);
const goalDone = () => readSecToday() >= goalMin() * 60;
const subMin = () => readSecToday() > 0 && minToday() < 1;
const goalTodayText = () => goalDone() ? `Beres! ${goalMin()} menit hari ini` : subMin() ? `Baru ${Math.floor(readSecToday())} dtk, sisa ${goalMin()} menit` : `${Math.min(minToday(), goalMin())} dari ${goalMin()} menit`;
const goalHint = () => readSecToday() < 1 ? 'Gapapa, 1 halaman juga hitung' : subMin() ? 'Sudah kehitung, lanjut dikit lagi' : `Sisa ${goalMin() - minToday()} menit, yuk`;
/* #1892: satu baris sisa jujur: 0 dtk = 'Target N menit'; <1 mnt = 'Sisa hampir N menit'; 1+ = 'Sisa N menit' (dibulatkan ke atas dari detik nyata) */
const goalLeft = () => { const g = goalMin(), s = readSecToday(); return s < 1 ? `Target ${g} menit` : s < 60 ? `Baru ${Math.floor(s)} dtk, sisa ${g} menit` : `Sisa ${Math.ceil((g * 60 - s) / 60)} menit`; };
/* #1855: cincin diisi halus per detik (detik/(g*60)); <60 dtk tampil '<1'. 0 dtk = kosong. Target/XP tetap per detik */
const rereadNote = () => { const b = book() || db.books[0]; return !!(b && b.doneAt) && readSecToday() < 1; }; /* #1997 */
const goalCardHtml =() => { const g = goalMin(), m = Math.min(minToday(), g), ok = goalDone(), p = ok ? 1 : m / g, n = subMin() ? '&lt;1' : m; return `<div class="eyebrow">Target baca</div><div class="goal-row">${ringSmall(p,`<span class="gn">${n}</span><small>mnt</small>`)}</div><div class="lbl2" title="${goalHint()}" aria-label="${goalHint()}">${ok ? `<span class="goal-ok">${ico('check', 'ck')}Beres!</span>` : `<span>${rereadNote() ? 'Baca ulang tak dihitung. Mulai buku baru untuk isi target.' : goalLeft()}</span>`}</div>`; };
const lvCardHtml = () => { const { lv, inLv } = xpInfo(); return `<div class="eyebrow">Level</div><div class="num">${lv}</div><div class="bar lvbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${inLv}" aria-label="Progres ke Level ${lv + 1}"><i style="width:${inLv}%"></i></div><div class="lbl2 lvl-line"><span class="lv-xp">${inLv}/100 XP</span><span class="lv-next">→ Lv ${lv + 1}</span></div>`; };
const hskTot = n => String(((window.HSK_DATA || {})[n]) || '').split(' ').filter(Boolean).length;
const hskUniq = n => new Set(db.vocab.filter(v => v && v.lang === 'zh-CN' && hskOf(v.w) === n).map(v => String(v.w).trim())).size;
/* #1642: satu baris progres HSK di Home; kosong bila belum ada kata zh-CN / data HSK belum termuat */
function hskHomeHtml() { if (!hskMap) return ''; for (const n of [3, 2, 1]) { const x = hskUniq(n), y = hskTot(n); if (x && y) return `<button type="button" class="hskhome" id="hskHome" data-h="${n}" aria-label="HSK ${n}: ${x} dari ${y} kata. Ketuk untuk lihat kata HSK ${n}"><span class="hskt">HSK ${n}: <b>${x}</b>/${y} kata</span><span class="hskgo" aria-hidden="true">›</span><span class="hskbar" aria-hidden="true"><i style="width:${Math.min(100, Math.round(x / y * 100))}%"></i></span></button>`; /* #1832: baris progres netral + bar tipis */ } return ''; }
function bindHskHome() { const e = $('#hskHome'); if (e) e.onclick = () => { hskF = +e.dataset.h || 0; csvF = 'all'; kataSeg = 'simpan'; sfx('pop'); setTab('kata'); }; }
function fillHskHome() { const c = $('#hskSlot'); if (!c) return; c.innerHTML = hskHomeHtml(); bindHskHome(); }
/* segarkan kartu Level & Target di Home dari sumber yang sama (tanpa render ulang seluruh layar) */
function refreshHomeStats() { const lc = $('#lvCard'); if (lc) lc.innerHTML = lvCardHtml(); const tc = $('#goalCard'); if (tc) { tc.innerHTML = goalCardHtml(); animRing(tc); } }
const PG_CAP = 10; // XP halaman/bab yang dihitung ke target harian per hari
const xpToday = () => { const d = today(); return Math.max(0, (db.xpDay[d] || 0) - Math.max(0, ((db.pgXpDay || {})[d] || 0) - PG_CAP)); };
/* tampilan lencana jujur: lencana berbasis kata tersimpan hanya tampil terbuka bila syaratnya masih terpenuhi (db.badges tak diubah) */
const BADGE_VOCAB_MIN = { kepo1: 1, kolektor: 10, koleksi50: 50, koleksi100: 100 };
const BADGE_REAL = ['kepo1', 'kolektor', 'koleksi50', 'koleksi100', 'kutubuku', 'berani', 'perfect', 'boss', 'otak']; /* syarat dihitung dari data nyata di perangkat ini, bukan XP/lencana gabungan */
/* satu sumber target kata: dipakai kartu milestone Home & sheet Tamat (0 = semua target terlewati) */
const WORD_LADDER = [[1, 'kepo1'], [10, 'kolektor'], [50, 'koleksi50'], [100, 'koleksi100']]; /* tangga lencana kata: Home & Profil sama */
const wordMile = n => { const x = WORD_LADDER.find(w => n < w[0]); return x ? x[0] : 0; };
const wordMileBadge = t => { const x = WORD_LADDER.find(w => w[0] === t); return x ? BADGES.find(b => b[0] === x[1]) : null; };
const badgeShown = id => db.badges.includes(id) && !(BADGE_REAL.includes(id) && !BADGES.find(b => b[0] === id)[4]());
const LV5_XP = 4 * 100; /* XP minimum Level 5, selaras level() */
const BADGE_HOW = { kepo1: 'Ketuk kata di bacaan, lalu Simpan.', kolektor: 'Simpan 10 kata dari bacaanmu.', koleksi50: 'Simpan 50 kata. Kamu bisa!', koleksi100: 'Simpan 100 kata. Koleksi jumbo!', kutubuku: 'Balik 20 halaman di tab Baca.', berani: 'Buka tab Ngomong, selesaikan 1 tantangan.', perfect: 'Skor kalimat 95%+ di tab Ngomong.', boss: 'Kalahin 5 kata sulit di latihan Kata.', otak: 'Hafal 10 kartu di tab Kata.', fire3: 'Baca atau latihan 3 hari berturut-turut.', fire7: 'Jaga streak 7 hari tanpa putus.', lv5: `Kumpulkan XP sampai Level 5 (${LV5_XP} XP).` };
const BADGES = [
  ['kepo1', 'eye', 'Keepo Pertama', 'Simpan 1 kata', () => countedVocab(null).length >= 1],
  ['kolektor', 'bm', 'Kolektor', 'Simpan 10 kata', () => countedVocab(null).length >= 10],
  ['koleksi50', 'bm', 'Koleksi 50', 'Simpan 50 kata', () => countedVocab(null).length >= 50],
  ['koleksi100', 'star', 'Koleksi 100', 'Simpan 100 kata', () => countedVocab(null).length >= 100],
  ['kutubuku', 'book', 'Kutu Buku', 'Balik 20 halaman', () => db.stat.page >= 20],
  ['berani', 'mic', 'Berani Ngomong', 'Selesaikan 1 tantangan', () => db.stat.speak >= 1],
  ['perfect', 'target', 'Sempurna', 'Skor kalimat 95%+', () => db.stat.perfect >= 1],
  ['boss', 'shield', 'Boss Slayer', 'Kalahin 5 kata sulit', () => db.stat.rem >= 5],
  ['otak', 'cards', 'Otak Encer', 'Hafal 10 kartu', () => db.stat.flash >= 10],
  ['fire3', 'flame', 'On Fire', 'Streak 3 hari', () => streak() >= 3],
  ['fire7', 'bolt', 'Seminggu Nonstop', 'Streak 7 hari', () => streak() >= 7],
  ['lv5', 'star', 'Level 5', `Level 5 (${LV5_XP} XP)`, () => level() >= 5]
];
/* progres lencana terkunci: data sama dengan syaratnya; hanya tampilan */
const badgeProgress = id => {
  const st = db.stat || {};
  const m = { kepo1: [() => countedVocab(null).length, 1], kolektor: [() => countedVocab(null).length, 10], koleksi50: [() => countedVocab(null).length, 50], koleksi100: [() => countedVocab(null).length, 100], kutubuku: [() => st.page, 20], berani: [() => st.speak, 1], perfect: [() => st.perfect, 1], boss: [() => st.rem, 5], otak: [() => st.flash, 10], fire3: [() => streak(), 3], fire7: [() => streak(), 7], lv5: [() => db.xp, LV5_XP] }[id];
  if (!m) return null;
  return { now: Math.min(m[1], Math.max(0, m[0]() || 0)), need: m[1] };
};
/* #1973: satu baris 'Lencana berikutnya' di Home; hanya tampilan, data tak diubah */
const BADGE_UNIT = { kepo1: 'kata', kolektor: 'kata', koleksi50: 'kata', koleksi100: 'kata', kutubuku: 'halaman', berani: 'tantangan', perfect: 'skor 95%+', boss: 'kata sulit', otak: 'kartu', fire3: 'hari', fire7: 'hari', lv5: 'XP' };
function nextBadge() {
  let best = null;
  BADGES.forEach(([id, em, name, desc]) => { if (badgeShown(id)) return; const pr = badgeProgress(id), r = pr ? pr.now / pr.need : 0; if (!best || r > best.r) best = { id, em, name, desc, pr, r }; });
  if (!best) return null;
  const rem = best.pr ? best.pr.need - best.pr.now : 0;
  return { ...best, txt: rem > 0 && BADGE_UNIT[best.id] ? `${rem} ${BADGE_UNIT[best.id]} lagi` : best.desc };
}
function nextBadgeHtml() {
  if (!db.books || !db.books.length) return '';
  const n = nextBadge(); if (!n) return '';
  return `<button type="button" class="nb-line" id="nbLine" aria-haspopup="dialog" aria-label="Lencana berikutnya: ${esc(n.name)}, ${esc(n.txt)}. Ketuk untuk lihat semua lencana">${ico(n.em)}<span><b>${esc(n.name)}</b> · ${esc(n.txt)}</span></button>`;
}
function badgeListSheet() {
  openSheet(`<div class="sh-head"><h2>Lencana</h2>${closeBtn}</div><ul class="rules">${BADGES.map(([id, , name, desc]) => { const on = badgeShown(id), pr = on ? null : badgeProgress(id); return `<li><b>${esc(name)}</b>${on ? ' · sudah kebuka' : ` · ${esc(BADGE_HOW[id] || desc)}${pr && pr.need > 1 ? ` (${pr.now}/${pr.need})` : ''}`}</li>`; }).join('')}</ul>`, 'Lencana');
}
let badgeQ = Promise.resolve();
/* Saat membaca, toast/perayaan ditunda; keluar e-reader atau tamat bab -> tampil berurutan (1 per 2 dtk) */
const lateQ = []; let lateT = null;
const isReading = () => document.body.classList.contains('reading');
function notifyLater(fn) { if (isReading()) lateQ.push(fn); else fn(); }
function flushLate(force) {
  if (lateT || !lateQ.length || (isReading() && force !== true)) return;
  const step = () => { lateT = null; if (!lateQ.length || (isReading() && force !== true)) return; lateQ.shift()(); if (lateQ.length) lateT = setTimeout(step, 2000); };
  step();
}
new MutationObserver(flushLate).observe(document.body, { attributes: true, attributeFilter: ['class'] });
const XP_WHY = { save: 'kata disimpan', page: 'halaman selesai', done: 'buku tamat', look: 'kata dicek', speak: 'ngomong', rem: 'kata sulit', q3: '3 kata beres' };
/* popup Level: tampil sekali per level (lvlSeen di penyimpanan lokal); ditunda saat lembar Tamat terbuka */
let lvlPending = false;
const sheetOpen = () => { const sh = $('#sheet'); return !!sh && !sh.classList.contains('hide'); };
/* popup/toast hadiah tak boleh menimpa sheet (arti kata dll): tunda sampai sheet ditutup */
let sheetQ = [];
function afterSheet(fn) { if (sheetOpen()) sheetQ.push(fn); else fn(); }
const tamatOpen = () => { const sh = $('#sheet'); return !!sh && !sh.classList.contains('hide') && sh.getAttribute('aria-label') === 'Tamat'; };
function showLevelUp() {
  if (sheetOpen()) { lvlPending = true; return; }
  lvlPending = false;
  const lv = level(); if (lv <= db.lvlSeen) return; // sudah dirayakan: jangan muncul lagi
  db.lvlSeen = lv; save(); refreshHomeStats(); celebrate(`Level ${lv}!`, 'Naik level! Kamu makin jago', 'lvl');
}
function award(n, stat, pk0, si) {
  if ((stat === 'page' || stat === 'look') && n) { const rb = book(); if (rb && rb.doneAt) { if (stat === 'page') return; n = 0; } } /* baca ulang buku tamat: tanpa XP; halaman tak bertambah (#1101, #1371) */
  if (stat === 'page') {
    /* hitung hanya bila maju sungguhan: kalimat awal halaman > kalimat terjauh yang sudah dihitung hari ini (tahan ganti huruf/layout) */
    const sd = today(), sk0 = pk0 || '?', idx = Number.isFinite(si) ? si : 0;
    if (!db.pgSeen || Array.isArray(db.pgSeen)) db.pgSeen = {};
    let day = db.pgSeen[sd]; if (!day || typeof day !== 'object' || Array.isArray(day)) day = db.pgSeen[sd] = {}; /* format lama (array) diabaikan */
    if (sk0 in day && idx <= day[sk0]) return;
    day[sk0] = idx;
  }
  if (stat === 'page') { try { if (window.kepoMark) window.kepoMark('baca'); } catch (e) { } }
  if (stat) db.stat[stat] = (db.stat[stat] || 0) + 1;
  if (n && stat) { db.xpSrc = db.xpSrc || {}; db.xpSrc[stat] = (db.xpSrc[stat] || 0) + n; } /* asal XP, hanya untuk tampilan */
  if (stat === 'page') {
    /* #1350: 'halaman dibaca' tak bertambah saat baca ulang buku tamat, dan halaman yang sama hanya dihitung sekali per 7 hari */
    const rb2 = book(), pd = today(), wk = (pk0 || '?') + '#' + (Number.isFinite(si) ? si : 0);
    if (!db.pgWeek || typeof db.pgWeek !== 'object' || Array.isArray(db.pgWeek)) db.pgWeek = {};
    const lim = dayKey(new Date(Date.now() - 8 * 864e5));
    for (const k in db.pgWeek) if (db.pgWeek[k] < lim) delete db.pgWeek[k];
    if (!(rb2 && rb2.doneAt) && !(wk in db.pgWeek)) { db.pgWeek[wk] = pd; db.pgDay = db.pgDay || {}; db.pgDay[pd] = (db.pgDay[pd] || 0) + 1; }
    const pk = Object.keys(db.pgDay || {}).sort(); if (pk.length > 60) delete db.pgDay[pk[0]];
    const sg = Object.keys(db.pgSeen).sort(); while (sg.length > 8) delete db.pgSeen[sg.shift()];
  }
  const before = level();
  if (n) {
    db.xp += n; const d = today(); db.xpDay[d] = (db.xpDay[d] || 0) + n;
    if (stat === 'page') { db.pgXpDay = db.pgXpDay || {}; db.pgXpDay[d] = (db.pgXpDay[d] || 0) + n; const gk = Object.keys(db.pgXpDay).sort(); if (gk.length > 60) delete db.pgXpDay[gk[0]]; }
    const keys = Object.keys(db.xpDay).sort(); if (keys.length > 60) delete db.xpDay[keys[0]];
    const f = document.createElement('div'); f.className = 'xpfly' + (isReading() ? ' mini' : ''); f.textContent = `+${n} XP` + (XP_WHY[stat] ? ` · ${XP_WHY[stat]}` : ''); document.body.appendChild(f); setTimeout(() => f.remove(), isReading() ? 800 : 1200);
  }
  /* #1743: hari aktif hanya bila ada aktivitas nyata; baca ulang buku tamat (XP 0) tak menaikkan streak */
  const rbd = book(), reread = !!(rbd && rbd.doneAt);
  if (n > 0 || (stat === 'page' && !reread) || (stat && stat !== 'page' && stat !== 'look')) markDay();
  save(); refreshPills(); refreshHomeStats();
  const newB = BADGES.filter(([id, , , , ok]) => !db.badges.includes(id) && ok());
  newB.forEach(([id]) => db.badges.push(id)); if (newB.length) save();
  if (!(db.lvlSeen >= 1)) { db.lvlSeen = before; save(); } // migrasi: level saat ini dianggap sudah dirayakan
  if (level() > before) setTimeout(() => notifyLater(() => {
    if (sheetOpen()) { lvlPending = true; return; } // tunda sampai sheet apa pun ditutup
    showLevelUp();
  }), 700);
  newB.forEach(([, , name], i) => setTimeout(() => notifyLater(() => afterSheet(() => { toast(`Lencana baru: ${name}!`); sfx('ding'); })), 1300 + i * 1800));
}
function celebrate(title, msg, snd = 'win') {
  sfx(snd); confetti(90); vib([20, 40, 20]);
  document.querySelectorAll('.lvlup').forEach(x => x.remove()); toastHide(); /* banner Level tak bertumpuk dengan toast */
  if (snd === 'lvl') { /* #1482: banner ringan di atas layar, tak memblokir ketukan, hilang sendiri ~4 dtk */
    const b = document.createElement('div'); b.className = 'lvlup lvlbn'; b.setAttribute('role', 'status'); b.setAttribute('aria-live', 'polite');
    b.innerHTML = `<div class="card"><div class="lvl-ic" aria-hidden="true">${ico('trophy')}</div><div class="lvl-tx"><b>${esc(title)}</b><span>${esc(msg)}</span></div><button type="button" class="lime">Lanjut</button></div>`;
    document.body.appendChild(b);
    const bye = () => { clearTimeout(t); b.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = e => { if (!b.isConnected) { clearTimeout(t); document.removeEventListener('keydown', onKey); return; } if (e.key === 'Escape') bye(); };
    const t = setTimeout(bye, 4000);
    b.querySelector('button').onclick = bye; document.addEventListener('keydown', onKey);
    return;
  }
  const el = document.createElement('div'); el.className = 'lvlup';
  el.innerHTML = `<div class="card">${snd === 'lvl' ? `<div class="lvl-ic" aria-hidden="true">${ico('trophy')}</div>` : spot('cheer', 'jump')}<h1>${esc(title)}</h1><p class="mut">${esc(msg)}</p><button class="lime full">Lanjut!</button></div>`;
  document.body.appendChild(el); el.querySelector('button').onclick = () => el.remove(); el.onclick = e => { if (e.target === el) el.remove(); };
}
function refreshPills() { const s = $('#pStreak'), x = $('#pXp'); if (typeof bkState !== 'undefined' && bkState === 'load') { if (s) { s.innerHTML = `${ico('flame')}<span aria-hidden="true">–</span>`; s.title = 'Streak: lagi dimuat'; s.classList.add('wait'); } if (x) { x.innerHTML = `${ico('bolt')}<span aria-hidden="true">–</span>`; x.title = 'XP: lagi dimuat'; x.classList.add('wait'); } return; } if (s) s.classList.remove('wait'); if (x) x.classList.remove('wait'); if (s) { const n = streak(); s.innerHTML = `${ico('flame')}${n ? n + ' hari' : 'Mulai hari ini'}`; s.title = 'Beruntun ' + n + ' hari tanpa putus'; } if (x) { x.innerHTML = `${ico('bolt')}${db.xp} XP`; x.title = 'Total XP seumur hidup'; } }

/* ---------- kerangka ---------- */
let toastT;
const MSG_SIMPAN_GAGAL = 'Gagal nyimpen bukunya, coba lagi ya. Kalau terus gagal, hapus buku lama dulu.';
let lastErrToast = 0, verBaruSiap = false;
const chipVerBaru = () => '<div class="mut sm" id="muChip" role="status"' + (verBaruSiap ? '' : ' hidden') + ' style="display:inline-block;margin:6px 0;padding:4px 10px;border-radius:999px;background:#E9F056;color:#351E28;font-weight:600">Versi baru siap</div>';
function globalErr(ev) {
  const r = ev && (ev.reason || ev.error), msg = String((r && r.message) || (ev && ev.message) || r || '');
  if (/ResizeObserver|AbortError|Script error/i.test(msg) || (ev && ev.type === 'error' && !ev.error && !ev.message)) return;
  if (ev && ev.target && ev.target !== window) return; // gagal muat gambar/skrip bukan error kode
  const now = Date.now(); if (now - lastErrToast < 10000) return; lastErrToast = now;
  console.error(r || msg);
  toast('Ada yang gagal sebentar. Bacaan & katamu aman.', 8000);
}
/* muat ulang paksa: hanya cache app & service worker; data buku/kata/login tidak disentuh */
async function muatUlangVersi() {
  if (navigator.onLine === false) { toast('Butuh internet untuk ambil versi baru'); return; }
  try {
    if ('serviceWorker' in navigator) { const rs = await navigator.serviceWorker.getRegistrations(); await Promise.all(rs.map(r => r.unregister())); }
    if (window.caches) { const ks = await caches.keys(); await Promise.all(ks.filter(k => k.startsWith('kepo-')).map(k => caches.delete(k))); }
  } catch (e) { console.error(e); }
  location.reload();
}
window.addEventListener('error', globalErr);
window.addEventListener('unhandledrejection', globalErr);
/* Catatan kecil suara bawaan HP, hanya ja/zh/ko, tampil sekali per sesi */
let ttsNoteSeen = false;
function ttsNote(lang) {
  if (ttsNoteSeen || !/^(ja|zh|ko)/.test(lang)) return '';
  ttsNoteSeen = true;
  return '<div class="ttsnote">Suara bawaan HP, bisa meleset di kanji.</div>';
}
/* #1773: kata yang artinya gagal dimuat (hanya memori sesi; kosong saat ganti halaman/buku) */
const gagalSet = new Set();
const gagalKey = (lang, w) => lang + '|' + String(w || '').trim().toLowerCase();
function gagalTandai(lang, w, on) { const k = gagalKey(lang, w); if (on) gagalSet.add(k); else gagalSet.delete(k); const t = String(w || '').trim().toLowerCase(); $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === t) x.classList.toggle('gagal', on); }); }
function gagalBersih() { gagalSet.clear(); $$('.cols .w.gagal').forEach(x => x.classList.remove('gagal')); }
/* tombol 'Isi arti' di toast: ambil arti kata tersimpan yang masih kosong */
async function isiArti(lang, w) {
  const v = db.vocab.find(x => sameVocab(x, lang, w));
  if (!v) return;
  if (String(v.t || '').trim()) return toast(`${v.w}: ${v.t}`, 5000);
  const r = await translate(v.w, v.lang, db.my).catch(() => null);
  if (!r || !String(r.text || '').trim()) return toast('Belum dapat arti. Cek koneksi, coba lagi nanti ya', 6000, { label: 'Coba lagi', fn: () => isiArti(lang, w) });
  v.t = r.text; v.baca = bacaOf(v.w, r.baca); if (r.base) v.base = r.base; if (r.dict && r.dict[0]) v.pos = r.dict[0].pos; delete v.noTr; delete v.nyusul;
  save(); toast(`${v.w}: ${v.t}`, 5000);
}
/* #1707: muat ulang arti semua kata bertitik di halaman reader; maks 2 permintaan sekaligus, pakai translate() yang ada */
let muatUlangJalan = false;
async function muatUlangArti(b, words) {
  if (muatUlangJalan) return;
  if (navigator.onLine === false) return toast('Lagi offline. Sambung internet dulu ya.');
  muatUlangJalan = true;
  let ok = 0, gagal = 0, i = 0;
  const kerja = async () => {
    while (i < words.length) {
      if (navigator.onLine === false) { gagal += words.length - i; i = words.length; break; }
      const k = words[i++], ac = new AbortController(), tm = setTimeout(() => ac.abort(), 8000);
      try {
        const v = db.vocab.find(x => !String(x.t || '').trim() && sameVocab(x, b.lang, k));
        if (!v) { ok++; continue; }
        const r = await translate(v.w, v.lang, db.my, ac.signal);
        if (!r || !String(r.text || '').trim()) { gagal++; continue; }
        v.t = r.text; v.baca = bacaOf(v.w, r.baca); if (r.base) v.base = r.base; if (r.dict && r.dict[0]) v.pos = r.dict[0].pos; delete v.noTr; delete v.nyusul;
        $$('.cols .w.noarti').forEach(x => { if (x.textContent.trim().toLowerCase() === k) x.classList.remove('noarti'); });
        ok++;
      } catch (e) { gagal++; } finally { clearTimeout(tm); }
    }
  };
  toast('Memuat ulang arti…', 20000);
  try { await Promise.all([kerja(), kerja()]); } finally { muatUlangJalan = false; }
  save(); if (kataSeg && $('#klist')) viewKata();
  toast(`${ok} arti berhasil dimuat${gagal ? `. ${gagal} belum, coba lagi` : ''}`, 4500);
}
/* #1651: keluar halus — 'hide' tetap status seketika; 'closing' menampilkan toast sebentar (tanpa interaksi) selagi meluncur turun */
let toastEndT;
function toastEnd(t) { clearTimeout(toastEndT); if (t) t.classList.remove('closing'); }
function toastHide() {
  const t = $('#toast'); if (!t) return; clearTimeout(toastT);
  if (t.classList.contains('hide')) return;
  t.classList.add('hide'); toastEnd(t);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  t.classList.add('closing');
  t.onanimationend = e => { if (e.target === t && t.classList.contains('closing')) toastEnd(t); };
  toastEndT = setTimeout(() => toastEnd(t), 250);
}
const toastMs = (m, ms) => { const long = String(m).length > 40; if (ms == null) return long ? 4500 : 3200; return long && ms < 4000 ? 4000 : ms; };
/* #1993: ukur tinggi bar bawah reader nyata supaya toast tak menimpanya */
function toastPos(t) { const f = document.body.classList.contains('reading') ? $('.rfoot') : null; if (f && f.offsetHeight) t.style.setProperty('--rfoot-h', f.offsetHeight + 'px'); else t.style.removeProperty('--rfoot-h'); }
function toast(m, ms, act, act2) { ms = toastMs(m, ms); const t = $('#toast'); toastEnd(t); toastPos(t); t.textContent = ''; const tx = document.createElement('span'); tx.className = 'ttx'; tx.textContent = m; t.append(tx); if (act) { const b = document.createElement('button'); b.className = 'tact'; b.textContent = act.label; b.onclick = () => { toastHide(); act.fn(); }; t.append(b); } if (act2) { const b2 = document.createElement('button'); b2.className = 'tact'; b2.textContent = act2.label; b2.onclick = () => { toastHide(); act2.fn(); }; t.append(b2); } t.classList.remove('hide'); t.style.animation = 'none'; void t.offsetWidth; t.style.animation = ''; clearTimeout(toastT); toastHeld = false; toastLeft = ms; toastAt = Date.now(); if (isFinite(ms)) toastT = setTimeout(toastHide, ms); }
/* #1914: hitung mundur berhenti selagi toast disentuh/ditahan, lanjut saat dilepas */
let toastLeft = 0, toastAt = 0, toastHeld = false;
function toastHold() { const t = $("#toast"); if (toastHeld || !t || t.classList.contains("hide") || !isFinite(toastLeft)) return; toastHeld = true; clearTimeout(toastT); toastLeft = Math.max(1500, toastLeft - (Date.now() - toastAt)); }
function toastRelease() { if (!toastHeld) return; toastHeld = false; toastAt = Date.now(); clearTimeout(toastT); toastT = setTimeout(toastHide, toastLeft); }
{ const tt = $("#toast"); if (tt) { tt.addEventListener("pointerdown", toastHold); ["pointerup", "pointercancel", "pointerleave"].forEach(ev => tt.addEventListener(ev, toastRelease)); } }
let sheetRet = null;
const RTL_LANGS = ['ar', 'he', 'fa', 'ur'];
/* #1793: latar (header, isi, tab) disembunyikan dari pembaca layar & Tab selagi sheet terbuka */
function sheetBgInert(on) { ['top', 'view', 'tabs'].forEach(id => { const el = document.getElementById(id); if (!el) return; if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); } else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); } }); }
function openSheet(html, label) { sheetEndClosing(); if ($('#sheet').classList.contains('hide')) { const a = document.activeElement; sheetRet = a && a !== document.body ? a : null; } $('#sheetBody').innerHTML = html; sheetReset(); sheetBgInert(true); $('#sheet').classList.remove('hide'); $('#shade').classList.remove('hide'); $('#sheet').scrollTop = 0; $$('#sheet [data-close]').forEach(b => b.onclick = closeSheet); { const hd = $('#sheetBody h2, #sheetBody .stepchip'); $('#sheet').setAttribute('aria-label', label || (hd && hd.textContent.trim()) || 'Panel'); } try { $('#sheet').focus({ preventScroll: true }); } catch (e) { } }
/* #1609: animasi keluar — status tetap 'hide' seketika; class .closing hanya menampilkan sheet sebentar (tanpa interaksi) selagi meluncur turun */
let sheetCloseT = 0;
function sheetEndClosing() { clearTimeout(sheetCloseT); sheetCloseT = 0; const sh = $('#sheet'), sd = $('#shade'); if (sh) sh.classList.remove('closing'); if (sd) sd.classList.remove('closing'); }
function closeSheet() { const wasOpen = !$('#sheet').classList.contains('hide'); const wasTamat = wasOpen && !!$('#sheet .fb-acts'); const ret = sheetRet; sheetRet = null; sheetBgInert(false); if (RD.dy) { RD.dy = 0; const c = $('#cols'); if (c) c.style.transform = `translate(${-RD.page * RD.step}px, 0px)`; } const dragged = !!$('#sheet').style.transform; $('#sheet').classList.add('hide'); $('#shade').classList.add('hide'); sheetEndClosing(); if (wasOpen && !dragged && !matchMedia('(prefers-reduced-motion: reduce)').matches) { $('#sheet').classList.add('closing'); $('#shade').classList.add('closing'); $('#sheet').addEventListener('animationend', function f(e) { if (e.target !== this) return; this.removeEventListener('animationend', f); sheetEndClosing(); }); sheetCloseT = setTimeout(sheetEndClosing, 260); } if (wasOpen) refreshHomeStats(); if (wasOpen && (lvlPending || sheetQ.length)) setTimeout(() => { if (sheetOpen()) return; if (lvlPending) notifyLater(showLevelUp); const q = sheetQ; sheetQ = []; q.forEach((f, i) => setTimeout(() => afterSheet(f), 600 + i * 1800)); }, 400); $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); if (wasOpen && ret && ret.isConnected) try { ret.focus({ preventScroll: true }); } catch (e) { } if (wasOpen && document.body.classList.contains('reading') && pfOk()) pfResume(1000); if (wasOpen && document.body.classList.contains('reading') && RD.n) { const bk = book(); if (bk) endCard(bk, RD.page === RD.n - 1 && bk.pos >= (bk.total || 1) - 1); } }
/* #1547: jebakan fokus — Tab/Shift+Tab berputar di dalam sheet selagi terbuka */
addEventListener('keydown', e => {
  if (e.key !== 'Tab' || e.ctrlKey || e.metaKey || e.altKey) return;
  const sh = $('#sheet'); if (!sh || sh.classList.contains('hide')) return;
  const fs = $$('#sheet button, #sheet a[href], #sheet input, #sheet select, #sheet textarea, #sheet [tabindex]:not([tabindex="-1"])').filter(x => !x.disabled && x.type !== 'hidden' && (x.offsetWidth || x.offsetHeight || x.getClientRects().length));
  if (!fs.length) { e.preventDefault(); sh.focus({ preventScroll: true }); return; }
  const first = fs[0], last = fs[fs.length - 1], a = document.activeElement;
  if (!sh.contains(a) || a === sh) { e.preventDefault(); (e.shiftKey ? last : first).focus({ preventScroll: true }); }
  else if (e.shiftKey && a === first) { e.preventDefault(); last.focus({ preventScroll: true }); }
  else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus({ preventScroll: true }); }
});
$('#shade').onclick = e => {
  /* ketuk dua kali kalimat (#907): ketukan pertama membuka sheet kata & tirai menutup halaman; ketukan kedua jatuh di tirai -> cek kalimat di bawahnya */
  const d = RD.dt; RD.dt = null; let sx = null;
  if (d && d.el.isConnected && Date.now() - d.t < 380 && e && e.clientX && document.body.classList.contains('reading')) {
    const hit = (document.elementsFromPoint ? document.elementsFromPoint(e.clientX, e.clientY) : []).find(n => n.closest && n.closest('#cols .s'));
    const s2 = hit && hit.closest('.s'); if (s2 === d.el) sx = s2;
  }
  closeSheet(); if (sx) { stopListenPage(); toggleInline(sx); }
};
addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
/* tarik pegangan/kepala sheet ke bawah untuk menutup (#1549); delegasi sekali di #sheet */
function sheetReset() { const sh = $('#sheet'), sd = $('#shade'); sh.style.transform = ''; sh.style.transition = ''; sd.style.opacity = ''; sd.style.transition = ''; }
{
  let g = null;
  const sh = $('#sheet');
  sh.addEventListener('pointerdown', e => {
    if (e.button || !e.target.closest('.grab,.sh-head') || e.target.closest('button,a,input,select,textarea')) return;
    g = { id: e.pointerId, y: e.clientY, dy: 0, t: Date.now(), v: 0, py: e.clientY, pt: Date.now() };
    try { sh.setPointerCapture(e.pointerId); } catch (x) { }
  });
  sh.addEventListener('pointermove', e => {
    if (!g || e.pointerId !== g.id) return;
    const now = Date.now(), dy = Math.max(0, e.clientY - g.y);
    if (now > g.pt) g.v = (e.clientY - g.py) / (now - g.pt);
    g.py = e.clientY; g.pt = now; g.dy = dy;
    sh.style.transition = 'none'; sh.style.transform = `translateY(${dy}px)`;
    $('#shade').style.transition = 'none'; $('#shade').style.opacity = String(Math.max(.4, 1 - dy / 400));
  });
  const end = e => {
    if (!g || e.pointerId !== g.id) return;
    const d = g; g = null;
    try { sh.releasePointerCapture(e.pointerId); } catch (x) { }
    if (!d.dy) return;
    if (e.type !== 'pointercancel' && (d.dy > 80 || (d.dy > 20 && d.v > .5))) { closeSheet(); sheetReset(); return; }
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches, sd = $('#shade');
    sh.style.transition = rm ? 'none' : 'transform .18s ease-out'; sd.style.transition = rm ? 'none' : 'opacity .18s ease-out';
    sh.style.transform = ''; sd.style.opacity = '';
    setTimeout(() => { if (!g) { sh.style.transition = ''; sd.style.transition = ''; } }, 200);
  };
  sh.addEventListener('pointerup', end); sh.addEventListener('pointercancel', end);
}
const closeBtn = `<button class="icon" data-close aria-label="Tutup">${ico('x')}</button>`;
const langOpts = sel => Object.keys(LANGS).map(k => `<option value="${k}"${k === sel ? ' selected' : ''}>${langName(k)}</option>`).join('');
const book = () => db.books.find(b => b.id === db.cur);
let cache = { id: null, pages: null };
/* #770: buku lama (versi deteksi bab < CH_VER) dihitung ulang pembagian babnya dari teks yang ada.
   Teks, kata tersimpan, penanda tak diubah; hanya pembatas bab disisipkan. Posisi baca & penanda dipetakan lewat urutan kalimat. Gagal = data lama. */
const migP = {};
const secCounts = (secs, lang) => secs.map(s => secParas(s, lang).reduce((a, P) => a + P.sents.filter(x => x.i >= 0).length, 0));
function mapPos(oldC, newC, p, s) {
  let g = s; for (let i = 0; i < p && i < oldC.length; i++) g += oldC[i];
  let c = 0;
  for (let j = 0; j < newC.length; j++) { if (g < c + newC[j]) return { p: j, s: g - c }; c += newC[j]; }
  const l = Math.max(0, newC.length - 1); return { p: l, s: Math.max(0, (newC[l] || 1) - 1) };
}
function migrasiBab(b) {
  if ((b.cv || 0) >= CH_VER) return Promise.resolve();
  return migP[b.id] || (migP[b.id] = (async () => {
    try {
      const paras = await getText(b.id);
      if (!Array.isArray(paras) || !paras.length) return;
      const np = gbChapters(paras);
      if (np !== paras && np.length !== paras.length) {
        const oc = secCounts(makeSections(paras), b.lang), nc = secCounts(makeSections(np), b.lang);
        const hp = mapPos(oc, nc, b.pos || 0, b.si || 0);
        const marks = Array.isArray(b.marks) ? b.marks.map(m => (m && Number.isFinite(m.p) && Number.isFinite(m.s)) ? Object.assign({}, m, (q => ({ p: q.p, s: q.s }))(mapPos(oc, nc, m.p, m.s))) : m) : b.marks;
        await putText(b.id, np);
        b.pos = hp.p; b.si = hp.s; if (marks) b.marks = marks;
        delete b.units; b.pg = 0; delete b.pgN;
        if (cache.id === b.id) cache = { id: null, pages: null };
      }
      b.cv = CH_VER; save();
    } catch (e) { /* pakai data lama */ }
  })().finally(() => { delete migP[b.id]; }));
}
async function pagesOf(b) {
  if (cache.id !== b.id) {
    await migrasiBab(b);
    const paras = await getText(b.id); cache = { id: b.id, pages: makeSections(paras || ['(teks hilang)']) };
    if (b.v !== 2) { b.v = 2; b.pos = 0; b.si = 0; }
    b.total = cache.pages.length; save();
  }
  if (b.total !== cache.pages.length) { b.total = cache.pages.length; save(); }
  calcUnits(b, cache.pages);
  return cache.pages;
}
/* bobot bab (b.units): SATU fungsi, dihitung sekali dari teks; buku lama dihitung saat Home dibuka (ensureUnits) */
function calcUnits(b, pages) {
  if (b.uv === 2 && Array.isArray(b.units) && b.units.length === pages.length) return false;
  b.uv = 2; b.units = pages.map(sec => Math.round(sec.reduce((a, p) => a + unitsOf(p.replace(/^[\u0001\u0002]/, ''), b.lang), 0) * 1000) / 1000); save();
  return true;
}
const unitsBusy = {};
async function ensureUnits(b) {
  if (unitsBusy[b.id] || ((b.cv || 0) >= CH_VER && b.uv === 2 && Array.isArray(b.units) && b.total && b.units.length === b.total)) return;
  unitsBusy[b.id] = 1;
  try {
    await migrasiBab(b); /* total bab dihitung dari teks (sama dgn layar Baca), bukan dari angka lama */
    const paras = await getText(b.id); if (!paras) return;
    const pages = makeSections(paras);
    let ch = false;
    if (b.total !== pages.length) { b.total = pages.length; b.pos = Math.min(b.pos || 0, pages.length - 1); delete b.units; save(); ch = true; }
    if (calcUnits(b, pages)) ch = true;
    if (ch && $('#hero') && !document.body.classList.contains('reading')) viewRak();
  } catch (e) {} finally { delete unitsBusy[b.id]; }
}
function makeSections(paras) {
  const secs = []; let cur = [], n = 0;
  const push = () => { if (cur.length) secs.push(cur); cur = []; n = 0; };
  for (let p of paras) {
    if (p === '\u0002') { push(); continue; }
    p = noUnderscore(p);
    if (n > 15000 && !p.startsWith('\u0001')) push();
    cur.push(p); n += p.length;
  }
  push();
  return secs.length ? secs : [['(kosong)']];
}
const isHead = raw => isHeadLine(raw);
function secParas(sec, lang) {
  let k = 0;
  return sec.map(raw => { const h = isHead(raw), p = raw.replace(/^\u0001/, ''); return { h, sents: sentences(p, lang).map(s => ({ s, i: tokens(s, lang).some(t => t.w) ? k++ : -1 })) }; });
}
const TABS = { rak: ['home', 'Home'], baca: ['book', 'Baca'], bicara: ['mic', 'Ngomong'], kata: ['cards', 'Kata'], sosial: ['chat', 'Sosial'] };
$('#tabs').innerHTML = Object.entries(TABS).map(([k, [i, l]]) => `<button data-t="${k}">${ico(i)}<span>${l}</span></button>`).join('');
const BRAND_TTL = `<span>Keepo</span>`;
// Layar tetap menyala saat e-reader terbuka (Wake Lock). Diam jika gagal/tidak didukung.
let wakeLock = null, wakeBusy = false;
function wakeSync() {
  try {
    const want = document.body.classList.contains('reading') && db.wake !== false && document.visibilityState === 'visible';
    if (!want) { if (wakeLock) { const l = wakeLock; wakeLock = null; l.release().catch(() => {}); } return; }
    if (wakeLock || wakeBusy || !navigator.wakeLock) return;
    wakeBusy = true;
    navigator.wakeLock.request('screen').then(l => {
      wakeBusy = false;
      if (!(document.body.classList.contains('reading') && db.wake !== false)) { l.release().catch(() => {}); return; }
      wakeLock = l; l.addEventListener('release', () => { if (wakeLock === l) wakeLock = null; });
    }, () => { wakeBusy = false; });
  } catch (e) { wakeBusy = false; }
}
document.addEventListener('visibilitychange', wakeSync);
/* app ke latar belakang saat membaca: simpan persen terbaru (sumber sama dgn Home/Profil/rak) */
/* satu rumus persen buku (bobot bab bila ada): bar baca, keluar reader, dan simpan latar memakai ini */
function readPct(b) {
  return pctCalc(b, (RD.page + 1) / RD.n);
}
function flushReadPct() {
  try {
    if (!document.body.classList.contains('reading')) return;
    const b = book(); if (!b || !RD || !RD.n || RD.page == null || !b.total) return;
    b.pct = readPct(b);
    save();
  } catch (e) {}
}
document.addEventListener('visibilitychange', () => { if (document.hidden) flushReadPct(); });
addEventListener('pagehide', flushReadPct);
/* #1681: menit baca aktif. Dihitung per detik hanya saat reader terbuka, tab terlihat, dan ada gerak 30 dtk terakhir. db.readSec[hari] = detik */
let rdAct = 0, rdUnsaved = 0;
['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach(ev => addEventListener(ev, () => { rdAct = Date.now(); }, { passive: true, capture: true }));
setInterval(() => {
  if (document.hidden || !document.body.classList.contains('reading') || Date.now() - rdAct > 30000) { if (rdUnsaved) { rdUnsaved = 0; save(); } return; }
  db.readSec = db.readSec || {}; const d = today(), before = goalDone();
  db.readSec[d] = (+db.readSec[d] || 0) + 1; rdUnsaved++;
  const ks = Object.keys(db.readSec).sort(); if (ks.length > 60) delete db.readSec[ks[0]];
  if (rdUnsaved >= 15) { rdUnsaved = 0; save(); }
  if (!before && goalDone()) { rdUnsaved = 0; save(); setTimeout(() => notifyLater(() => { afterSheet(() => { toast(`Beres! ${goalMin()} menit hari ini. Besok santai aja.`, 4500); sfx('win'); confetti(50); }); }), 300); }
}, 1000);
/* Back HP / geser-balik: e-reader punya satu entri riwayat; Back menutup sheet dulu, lalu balik ke Home */
let rdHist = false, rdSkip = 0;
function rdLeave() { if (!rdHist) return; rdHist = false; rdSkip++; history.back(); }
addEventListener('popstate', () => {
  if (rdSkip) { rdSkip--; return; }
  if (!rdHist) return;
  if (!$('#sheet').classList.contains('hide')) { closeSheet(); history.pushState({ kepo: 'baca' }, ''); return; }
  rdHist = false; leaveBaca();
});
/* Tab Sosial: kalau cloud.js belum siap / error, tampilkan layar ramah (bukan Home) */
function viewSosialAman() {
  try {
    if (typeof viewSosial === 'function') { viewSosial(); return; }
  } catch (e) { console.warn('viewSosial gagal', e); }
  $('#view').innerHTML = `<div class="empty"><img class="empty-doodle" src="img/aset/sosial-offline.svg" width="96" height="72" alt="" decoding="async"><h2>Sosial lagi dimuat</h2><div class="mut sm">Sambungannya belum siap. Coba lagi ya.</div><div class="mut sm bk-off">Bacaanmu tetap bisa dibuka offline.</div><div class="row" style="gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px"><button class="pri" id="sosRetry" type="button">Coba lagi</button><button class="sec" id="sosOpen" type="button">Buka bacaanku</button><button class="ghost" id="sosHome" type="button">Kembali ke Home</button></div></div>`;
  $('#sosRetry').onclick = () => setTab('sosial');
  $('#sosOpen').onclick = () => { const b = book() || (db.books || []).find(x => x && x.id != null); if (b) { db.cur = b.id; save(); setTab('baca'); } else setTab('rak'); };
  $('#sosHome').onclick = () => setTab('rak');
}
function setTab(t) {
  if (t !== 'kata') { quickPend = null; quickRun = null; quickExtra = false; quickHard = false; quickLogged = false; } /* #1550: mode ekstra tak menempel */
  if (t !== 'baca') { rdLeave(); pfDisarm(); }
  document.querySelectorAll('.lvlup').forEach(x => x.remove()); db.tab = t; save(); closeSheet(); stopListen(); document.body.classList.remove('reading'); wakeSync();
  $$('#tabs button').forEach(b => { b.classList.toggle('on', b.dataset.t === t); b.setAttribute('aria-current', b.dataset.t === t ? 'page' : 'false'); });
  $('#ttl').innerHTML = BRAND_TTL; progress(null);
  $('#hdx').className = t === 'rak' ? 'noStreak' : '';
  $('#hdx').innerHTML = `<span class="pill fire" id="pStreak" title="Streak hari"></span><span class="pill xp" id="pXp" title="Total XP seumur hidup"></span><span id="acctSlot"></span><button class="icon hfb" id="hFb" type="button" aria-label="Kirim masukan">${ico('chat')}<span class="hfbl">Masukan</span></button><button class="icon" id="set" aria-label="Pengaturan">${ico('sliders')}<span class="hsl">Pengaturan</span><span class="hbl">Atur</span></button>`;
  refreshPills(); $('#set').onclick = openSettings; $('#hFb').onclick = () => openFeedback();
  $('#view').style.animation = 'none'; void $('#view').offsetWidth; $('#view').style.animation = '';
  { const v = $('#view'); v.classList.add('enter'); clearTimeout(setTab._en); setTab._en = setTimeout(() => v.classList.remove('enter'), 800); } /* #1730: bar mengisi hanya saat tab dibuka */
  try { history.scrollRestoration = 'manual'; } catch (e) {}
  window.scrollTo(0, 0);
  ({ rak: viewRak, baca: viewBaca, bicara: viewBicara, kata: viewKata, sosial: viewSosialAman })[t]();
  requestAnimationFrame(() => window.scrollTo(0, 0));
  if (t === 'rak') { guestBanner(); setTimeout(cadNote, 2500); }
}
/* setelah keluar akun: Home menampilkan status tamu + tombol Masuk */
function guestBanner() {
  if (db.acct || !db.keluar || typeof API === 'undefined' || !API) return;
  const v = $('#view'); if (!v) return;
  const d = document.createElement('div'); d.className = 'guest-card';
  d.innerHTML = '<div><b>Kamu lagi tamu</b><div class="mut sm">Belum masuk akun. Progres hanya di HP ini.</div></div><button class="pri" id="gMasuk" type="button">Masuk</button>';
  v.insertBefore(d, v.firstChild); $('#gMasuk').onclick = () => openAccount('masuk');
}
$$('#tabs button').forEach(b => b.onclick = () => { vib(5); sfx('pop'); setTab(b.dataset.t); });
const EMPTY_PIC = { curious: 'kosong-kata', wow: 'kosong-ngomong', happy: 'kosong-aman', cards: 'kosong-kartu' };
const emptyState = (mood, title, msg, btn, act) => `<div class="empty">${mood === 'cheer' ? '<img class="empty-pic" src="img/aset/beres-sesi.svg" alt="" width="150" height="150" decoding="async">' : EMPTY_PIC[mood] ? `<img class="empty-pic" src="img/aset/${EMPTY_PIC[mood]}.svg" alt="" width="150" height="150" decoding="async">` : '<img class="empty-pic" src="img/kosong-rak.webp" width="320" height="320" alt="" decoding="async">'}<h2>${title}</h2><div class="mut sm">${msg}</div>${btn ? `<button class="pri" onclick="${act}">${btn}</button>` : ''}</div>`;

/* ---------- pengaman data (Safari tab biasa) ---------- */
const isStandalone = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } };
const dataRisk = () => !isStandalone() && STORAGE_PERSISTED !== true && !db.acct;
function dataWarn() {
  if (!dataRisk()) return '';
  return `<div class="set-row" id="dataWarn"><div class="eyebrow">Data HP ini</div><div class="mut sm">Data kamu bisa terhapus sendiri oleh Safari kalau lama tak dibuka. Pasang ke Layar Utama atau simpan cadangan.</div><div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px"><button class="sec" id="dwHow" type="button">Cara pasang</button><button class="sec" id="dwSave" type="button">Simpan cadangan</button></div></div>`;
}
function dataWarnWire() {
  if ($('#dwSave')) $('#dwSave').onclick = () => { if (typeof bkSave === 'function') bkSave(); };
  if ($('#dwHow')) $('#dwHow').onclick = pasangSheet;
}
const pasangSheet = () => openSheet(`<h2>Pasang ke Layar Utama</h2><ol class="rules"><li>Ketuk tombol Bagikan di Safari.</li><li>Pilih "Tambah ke Layar Utama".</li><li>Ketuk Tambah, lalu buka Kepo dari ikonnya.</li></ol><button class="pri full" data-close>Oke, paham</button>`, 'Cara pasang ke Layar Utama');
/* #1649: ajakan sekali di Home 'Pasang di Layar Utama' (iPhone/iPad Safari, belum dipasang, sudah baca/simpan kata, belum ditutup) */
const A2HS_K = 'kepo_a2hs';
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function a2hsShow() {
  try { if (localStorage.getItem(A2HS_K)) return false; } catch (e) { return false; }
  if (isStandalone() || !isIOS()) return false;
  const st = db.stat || {};
  return (+st.page || 0) >= 1 || (Array.isArray(db.vocab) && db.vocab.length >= 1);
}
const a2hsHtml = () => `<div class="a2hs" id="a2hs" role="region" aria-label="Pasang Keepo di Layar Utama"><img class="a2hs-pic" src="img/aset/kosong-aman.svg" alt="" width="56" height="56" decoding="async"><div class="a2hs-tx"><b>Biar nggak lupa balik</b><span>Pasang Keepo di Layar Utama, 3 ketukan.</span><div class="a2hs-act"><button type="button" class="pri" id="a2hsHow">Cara pasang</button><button type="button" class="lnk" id="a2hsX">Nanti</button></div></div></div>`;
function cadNote() {
  try {
    if (!dataRisk() || isReading()) return;
    if ((db.vocab || []).length < 5 || localStorage.getItem('kepo.bkDone')) return;
    const last = +localStorage.getItem('kepo.noteCad') || 0;
    if (Date.now() - last < 14 * 864e5) return;
    if (!$('#sheet').classList.contains('hide') || !$('#toast').classList.contains('hide') || !db.seenTip || db.tab !== 'rak') return;
    localStorage.setItem('kepo.noteCad', String(Date.now()));
    toast('Katamu belum dicadangkan. Simpan cadangan biar aman.', 5000, { label: 'Simpan', fn: () => { if (typeof bkSave === 'function') bkSave(); } });
  } catch (e) { }
}

/* ---------- pengaturan ---------- */
function voiceRow(lang) {
  const p = langInfo(lang)[1].toLowerCase().slice(0, 2), cur = db.voices && db.voices[lang];
  const vs = speechSynthesis.getVoices().filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(p));
  if (!vs.length) {
    const loaded = speechSynthesis.getVoices().length > 0;
    if (!loaded && !voiceRow.wait) {
      voiceRow.wait = true;
      speechSynthesis.addEventListener('voiceschanged', () => {
        voiceRow.wait = false;
        const el = $('#vrow'), b = book();
        if (el && b) el.outerHTML = voiceRow(b.lang);
        const s = $('#vsel'); if (s) s.onchange = e => { db.voices = db.voices || {}; if (e.target.value) db.voices[b.lang] = e.target.value; else delete db.voices[b.lang]; save(); speak(b.lang === 'ja' ? 'こんにちは' : 'Hello', b.lang); };
      }, { once: true });
    }
    return `<div class="set-row" id="vrow"><div class="eyebrow">Suara baca cerita ini</div><div class="mut sm">${loaded ? 'Perangkat ini belum punya suara untuk bahasa ini' : 'Suara belum termuat, coba buka lagi sebentar'}</div></div>`;
  }
  return `<div class="set-row" id="vrow"><div class="eyebrow">Suara baca cerita ini</div><select id="vsel"><option value="">Otomatis</option>${vs.map(v => `<option value="${esc(v.voiceURI)}"${v.voiceURI === cur ? ' selected' : ''}>${esc(v.name)}</option>`).join('')}</select></div>`;
}
// Ukuran huruf efektif: pilihan pengguna menang; kalau belum pernah diubah, pakai default per bahasa.
/* Tipografi per bahasa (hanya DEFAULT; pilihan pengguna db.fs/db.fsSet/db.lh/db.lhSet menang). Latin 17/1.6, JP & ZH 18/1.8, KO 17/1.7. */
const FS0 = { ja: 18, 'zh-CN': 18, ko: 17 };
const LH0 = { ja: 1.8, 'zh-CN': 1.8, ko: 1.7 };
const readFs = l => (db.fsSet || (db.fs && db.fs !== 19)) ? db.fs : (FS0[l] || 17);
const readLh = l => db.lhSet ? db.lh : (LH0[l] || 1.6);
const LHS = [1.5, 1.7, 1.9];
const nearLh = v => LHS.reduce((a, c) => Math.abs(c - v) < Math.abs(a - v) ? c : a);
const PREV = { en: 'The rain stopped, and the street smelled like warm bread. She smiled and kept walking.', ja: '雨が止んで、街はあたたかいパンの匂いがした。彼女は微笑んで歩き続けた。', ko: '비가 그치고 거리에는 따뜻한 빵 냄새가 났다. 그녀는 웃으며 계속 걸었다.', 'zh-CN': '雨停了，街上飘着热面包的香味。她笑了笑，继续往前走。', fr: 'La pluie a cessé, et la rue sentait le pain chaud. Elle sourit et continua de marcher.', de: 'Der Regen hörte auf, und die Straße roch nach warmem Brot. Sie lächelte und ging weiter.', es: 'La lluvia paró y la calle olía a pan caliente. Ella sonrió y siguió caminando.' };
/* siapkan arti bab untuk offline (#568): manual, maks 150 kata unik, maks 3 paralel, lewat translate() yang sama */
const PREP_MAX = 150;
function prepWords(b, sec) {
  const seen = new Set(), out = [];
  secParas(sec, b.lang).forEach(P => P.sents.forEach(({ s, i }) => { if (i < 0) return; tokens(s, b.lang).forEach(t => {
    if (!t.w) return; const k = t.t.toLowerCase(); if (seen.has(k) || isKenal(b.lang, t.t) || isNama(b, t.t)) return; seen.add(k); out.push(t.t);
  }); }));
  return out.slice(0, PREP_MAX);
}
const prepHas = (b, q) => { const v = trCache.get(b.lang + '|' + db.my + '|' + q); return !!v && ('baca' in v || !NONLATIN.test(q)); };
function prepHtml() {
  return `<div class="prep" id="prepBox"><div class="prep-t">${ico('dl')}<b>Arti bagian ini tanpa sinyal</b></div><div class="mut sm" id="prepMsg" role="status">Unduh arti kata bagian ini sekali, biar tetap kebuka di KRL.</div><div class="prep-bar" id="prepBar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Unduhan arti" hidden><i></i></div><div class="prep-acts"><button class="sec" id="prepGo" type="button">Siapkan arti bab ini</button><button class="ghost" id="prepCancel" type="button" hidden>Batal</button></div></div>`;
}
function bindPrep(b, sec) {
  const box = $('#prepBox'); if (!box) return;
  const go = $('#prepGo'), cancel = $('#prepCancel'), msg = $('#prepMsg'), bar = $('#prepBar');
  const words = prepWords(b, sec); let run = 0;
  const live = () => box.isConnected;
  const sync = () => {
    if (run || !live()) return;
    const n = words.filter(q => prepHas(b, q)).length;
    if (!words.length) { go.disabled = true; go.textContent = 'Tidak ada kata baru'; return; }
    if (n >= words.length) { go.disabled = true; go.textContent = 'Sudah siap semua'; msg.textContent = `${n} kata siap dibaca tanpa sinyal`; return; }
    if (navigator.onLine === false) { go.disabled = true; go.textContent = 'Butuh internet sekali'; if (n) msg.textContent = `${n} dari ${words.length} kata sudah siap.`; return; }
    go.disabled = false; go.textContent = 'Siapkan arti bagian ini';
    msg.textContent = n ? `${n} dari ${words.length} kata sudah siap tanpa sinyal.` : `${words.length} kata menunggu. Butuh internet sekali.`;
  };
  sync();
  const start = async () => {
    const my = ++run; let ok = 0, done = 0, stop = false;
    const todo = words.filter(q => !prepHas(b, q)), total = words.length, base = total - todo.length;
    const show = () => { msg.textContent = `${base + ok} dari ${total} kata siap`; bar.hidden = false; const pc = Math.round((base + done) / total * 100); bar.firstElementChild.style.width = pc + '%'; bar.setAttribute('aria-valuenow', pc); };
    go.hidden = true; cancel.hidden = false; show(); let idx = 0;
    cancel.onclick = () => { stop = true; };
    const worker = async () => {
      while (!stop && live() && my === run && navigator.onLine !== false) {
        const q = todo[idx++]; if (q === undefined) return;
        try { await translate(q, b.lang, db.my); ok++; } catch (e) { }
        done++; if (live()) show();
        await new Promise(r => setTimeout(r, 250));
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    trFlush(); if (!live() || my !== run) return;
    run = 0; cancel.hidden = true; go.hidden = false; bar.hidden = true; go.disabled = false;
    const n = words.filter(q => prepHas(b, q)).length;
    if (stop || navigator.onLine === false) msg.textContent = `${n} dari ${total} kata siap. Nanti dicoba lagi ya.`;
    else if (n < total) msg.textContent = `${n} kata siap dibaca tanpa sinyal. ${total - n} kata belum, nanti dicoba lagi ya.`;
    else msg.textContent = `${n} kata siap dibaca tanpa sinyal`;
    if (n < total) go.textContent = 'Coba lagi yang belum'; else { go.disabled = true; go.textContent = 'Sudah siap semua'; }
  };
  go.onclick = () => {
    if (navigator.connection && navigator.connection.saveData && go.dataset.ok !== '1') { go.dataset.ok = '1'; msg.textContent = 'Hemat Data lagi nyala. Unduh ini pakai kuota. Ketuk lagi kalau tetap mau.'; go.textContent = 'Tetap unduh'; return; }
    go.dataset.ok = ''; start();
  };
  addEventListener('offline', sync, { once: true }); addEventListener('online', sync, { once: true });
}
/* 'Siapkan offline' (#1367): arti kata baru bagian ini + berikutnya, maks 150 kata. Hanya gtx, satu permintaan sekali, jeda 400 ms, berhenti setelah 2 gagal beruntun. Simpan di IndexedDB per buku. */
const OFF_GAP = 400, OFF_FAIL = 2;
async function offWords(b) {
  const secs = await pagesOf(b), from = Math.max(0, Math.min(b.pos || 0, secs.length - 1));
  const saved = new Set((db.vocab || []).filter(v => v && v.lang === b.lang && v.w).map(v => String(v.w).trim().toLowerCase()));
  const seen = new Set(), out = [];
  for (const sec of secs.slice(from, from + 2)) for (const P of secParas(sec, b.lang)) { if (P.h) continue; for (const { s, i } of P.sents) { if (i < 0) continue; for (const t of tokens(s, b.lang)) {
    if (!t.w) continue; const k = t.t.toLowerCase();
    if (seen.has(k)) continue; seen.add(k);
    if (isKataSampah(b.lang, t.t, { b, kenal: true, saved })) continue;
    out.push(t.t);
  } } }
  return out;
}
/* Isi arti otomatis (#1977): diam-diam, 1-2 bagian berikutnya, pakai offWords & batas yang sama dengan 'Siapkan offline'. Maks sekali per buku per 6 jam (b.autoOffAt). Tanpa toast. */
const OFF_AUTO_GAP = 6 * 3600e3;
let offAuto = null;
const offAutoStop = () => { if (offAuto) { offAuto.abort(); offAuto = null; } };
async function autoOff(b) {
  try {
    if (offAuto || db.autoArti === false || !b || !b.id) return;
    const c = navigator.connection;
    if (navigator.onLine === false || !c || c.saveData || c.effectiveType !== '4g') return;
    if (b.autoOffAt && Date.now() - b.autoOffAt < OFF_AUTO_GAP) return;
    await aoLoad(b.id);
    if (AO.m.size >= AO_MAX) return;
    const words = await offWords(b);
    const ex = AO.id === b.id && AO.sl === b.lang && AO.tl === db.my ? AO.m : null;
    const todo = words.filter(q => !(ex && ex.has(q)) && !prepHas(b, q)).slice(0, PREP_MAX);
    b.autoOffAt = Date.now(); save();
    if (!todo.length || AO.id !== b.id) return;
    if (AO.sl !== b.lang || AO.tl !== db.my) { AO.sl = b.lang; AO.tl = db.my; AO.m = new Map(); }
    const ac = offAuto = new AbortController();
    let fails = 0, ok = 0;
    for (const q of todo) {
      if (ac.signal.aborted || navigator.onLine === false || AO.id !== b.id) break;
      try {
        const out = await gtxFetch(q, b.lang, db.my, ac.signal);
        if (!out.text) throw new Error('kosong');
        if (AO.m.size < AO_MAX) AO.m.set(q, out); ok++; fails = 0;
      } catch (e) { if (ac.signal.aborted) break; if (++fails >= OFF_FAIL) break; }
      await new Promise(r => setTimeout(r, OFF_GAP));
    }
    if (offAuto === ac) offAuto = null;
    if (ok && AO.id === b.id) await aoSave();
  } catch (e) { offAuto = null; }
}
function offHtml() {
  return `<div class="prep" id="offBox"><div class="prep-t">${ico('dl')}<b id="offT">Siapkan offline</b></div><div class="mut sm" id="offMsg" role="status">Unduh arti kata baru bagian ini dan berikutnya. Maks 150 kata.</div><div class="prep-bar" id="offBar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Unduhan arti offline" hidden><i></i></div><div class="eyebrow">Isi arti otomatis</div><div class="seg" id="offAuto" role="group" aria-label="Isi arti otomatis"><button type="button" data-v="1" class="${db.autoArti === false ? '' : 'on'}">Nyala</button><button type="button" data-v="0" class="${db.autoArti === false ? 'on' : ''}">Mati</button></div><div class="prep-acts"><button class="sec" id="offGo" type="button" disabled>Siapkan offline</button><button class="ghost" id="offCancel" type="button" hidden>Batal</button><button class="ghost" id="offDel" type="button" hidden>Hapus arti offline</button></div></div>`;
}
async function bindOff(b) {
  const box = $('#offBox'); if (!box) return;
  const go = $('#offGo'), cancel = $('#offCancel'), del = $('#offDel'), msg = $('#offMsg'), bar = $('#offBar'), ttl = $('#offT');
  const live = () => box.isConnected;
  let run = 0, words = [];
  const have = () => { const a = AO.id === b.id && AO.sl === b.lang && AO.tl === db.my ? AO.m : null; return q => !!(a && a.has(q)) || prepHas(b, q); };
  await aoLoad(b.id); if (!live()) return;
  const mine = () => AO.id === b.id && AO.sl === b.lang && AO.tl === db.my ? AO.m.size : 0;
  const sync = () => {
    if (run || !live()) return;
    const n = mine(), h = have(), todo = words.filter(q => !h(q)).slice(0, PREP_MAX);
    del.hidden = !AO.m.size || AO.id !== b.id;
    ttl.textContent = n ? 'Siap dibaca offline' : 'Siapkan offline';
    go.textContent = n ? 'Siapkan lagi' : 'Siapkan offline';
    if (n) msg.textContent = `${n} kata siap offline. Kalimat utuh tetap butuh internet.`;
    else msg.textContent = 'Unduh arti kata baru bagian ini dan berikutnya. Maks 150 kata.';
    if (!words.length) { go.disabled = true; if (!n) msg.textContent = 'Belum ada kata baru untuk diunduh.'; return; }
    if (n >= AO_MAX) { go.disabled = true; msg.textContent = `Sudah penuh (${n} kata). Hapus dulu kalau mau mulai lagi.`; return; }
    if (!todo.length) { go.disabled = true; go.textContent = 'Siap dibaca offline'; return; }
    if (navigator.onLine === false) { go.disabled = true; msg.textContent = 'Lagi offline. Sambung internet dulu ya.'; return; }
    if (navigator.connection && navigator.connection.saveData) { go.disabled = true; msg.textContent = 'Hemat Data lagi nyala. Matikan dulu kalau mau unduh.'; return; }
    go.disabled = false; if (!n) msg.textContent =`${todo.length} kata menunggu. Pakai ±0,3 MB data, sebaiknya di Wi-Fi.`;
  };
  go.disabled = true; msg.textContent = 'Lagi cek kata baru…';
  try { words = await offWords(b); } catch (e) { words = []; }
  if (!live()) return; sync();
  const start = async () => {
    if (run) return; const my = ++run, h = have();
    const todo = words.filter(q => !h(q)).slice(0, PREP_MAX), total = todo.length; if (!total) { run = 0; return sync(); }
    if (AO.sl !== b.lang || AO.tl !== db.my) { AO.sl = b.lang; AO.tl = db.my; AO.m = new Map(); }
    let done = 0, ok = 0, fails = 0, stop = false, err = '';
    const ac = new AbortController();
    cancel.onclick = () => { stop = true; ac.abort(); };
    go.hidden = true; cancel.hidden = false; del.hidden = true; bar.hidden = false; ttl.textContent = 'Mengunduh arti…';
    const show = () => { msg.textContent = `Mengunduh ${done}/${total}`; const pc = Math.round(done / total * 100); bar.firstElementChild.style.width = pc + '%'; bar.setAttribute('aria-valuenow', pc); };
    show();
    for (const q of todo) {
      if (stop || !live() || my !== run) break;
      if (navigator.onLine === false) { err = 'Sinyal putus.'; break; }
      try {
        const out = await gtxFetch(q, b.lang, db.my, ac.signal);
        if (!out.text) throw new Error('kosong');
        if (AO.m.size < AO_MAX) AO.m.set(q, out); ok++; fails = 0;
      } catch (e) { if (stop) break; fails++; if (fails >= OFF_FAIL) { err = 'Sinyal lemah.'; break; } }
      done++; if (live()) show();
      if (ok && ok % 10 === 0) aoSave().catch(() => { });
      await new Promise(r => setTimeout(r, OFF_GAP));
    }
    try { await aoSave(); } catch (e) { err = err || 'Penyimpanan penuh.'; }
    if (!live() || my !== run) return;
    run = 0; cancel.hidden = true; go.hidden = false; bar.hidden = true;
    sync();
    if (err || stop) { ttl.textContent = `Berhenti di ${mine()} kata`; msg.textContent = `${err || 'Dibatalkan.'} ${mine()} kata yang sudah masuk tetap tersimpan. Lanjutkan nanti.`; go.textContent = 'Lanjutkan'; }
    else if (ok) toast('Siap dibaca offline');
  };
  go.onclick = () => { offAutoStop(); start(); };
  $$('#offAuto button').forEach(x => x.onclick = () => { db.autoArti = x.dataset.v === '1'; save(); segOn('#offAuto', x); if (!db.autoArti) offAutoStop(); });
  del.onclick = async () => { if (run) return; await aoDel(b.id); if (live()) sync(); };
  addEventListener('offline', sync, { once: true }); addEventListener('online', sync, { once: true });
}
const segOn = (sel, x) => $$(sel + ' button').forEach(y => { const on = y === x; y.classList.toggle('on', on); y.setAttribute('aria-pressed', on ? 'true' : 'false'); });
function openSettings() {
  const b = book();
  const th = [['paper', 'Kertas'], ['sepia', 'Sepia'], ['green', 'Hijau'], ['night', 'Malam']];
  const sw = { paper: '#FAF7F0', sepia: '#F3E9D7', green: '#E3EEDC', night: '#1E1A1D' };
  const ink = { paper: '#2B2228', sepia: '#3B2F25', green: '#22301F', night: '#E8E2DA' };
  const pl = b && PREV[b.lang] ? b.lang : 'en';
  openSheet(`<div class="sh-head sticky"><h2>Pengaturan</h2>${closeBtn}</div>
    <div class="set-prev${db.font === 'serif' ? ' serif' : ''}" id="spv" lang="${pl}" aria-hidden="true" style="--reader-lh:${readLh(pl)};font-size:${readFs(b && b.lang)}px;text-align:${effAlign() === 'j' ? 'justify' : 'left'};${db.spacing === 'w' ? '--reader-ls:.04em;--reader-ws:.12em' : ''}">${esc(PREV[pl])}</div>
    ${b && document.body.classList.contains('reading') ? `<div class="set-grp"><div class="set-gt">Penanda &amp; latihan</div>
    <div class="set-row set-acts"><button class="sec full" id="bmTog" type="button"></button><button class="sec full" id="bmList" type="button"></button><button class="sec full" id="kenalAll" type="button" hidden></button><button class="sec full" id="bkFind" type="button">${ico('search')} Cari di buku</button><button class="sec full" id="goSpeak" type="button">${ico('mic')} Tantangan ngomong</button></div></div>` : ''}
    <div class="set-grp"><div class="set-gt">Tampilan baca</div>
    <div class="set-row"><div class="eyebrow">Tema</div><div class="swatch" id="thm">${th.map(([k, l]) => `<button data-v="${k}" class="${db.theme === k ? 'on' : ''}" style="background:${sw[k]};color:${ink[k]}"><span>Aa</span><small>${l}</small></button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Ukuran huruf baca</div><div class="stepper"><button id="fsm" aria-label="Perkecil huruf">A−</button><b id="fsv">${readFs(b && b.lang)} px</b><button id="fsp" aria-label="Perbesar huruf">A+</button></div></div>
    ${b ? `<div class="set-row"><div class="eyebrow">Bahasa cerita ini</div><select id="blang">${langOpts(b.lang)}</select></div>` : ''}
    <div class="set-row"><div class="eyebrow">Artiin ke</div><select id="mylang">${langOpts(db.my)}</select></div>
    ${b && ['ja', 'ko', 'zh-CN'].includes(b.lang) ? `<div class="set-row"><div class="eyebrow">Cara baca di atas kata</div><div class="seg" id="rts">${[[0, 'Mati'], [1, 'Pernah kuketuk'], [2, 'Semua tersimpan']].map(([k, l]) => `<button data-v="${k}" class="${rtOf(b.lang) === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>` : ''}
    </div>
    <div class="set-grp"><div class="set-gt">Target baca harian</div>
    <div class="set-row"><div class="mut sm">Pilih waktu yang benar-benar kamu punya. Mulai kecil aja.</div><div class="seg" id="gmn" role="group" aria-label="Target baca harian">${GOAL_MINS.map(v => `<button type="button" data-v="${v}" class="${goalMin() === v ? 'on' : ''}">${v} menit</button>`).join('')}</div></div>
    </div>
    ${document.body.classList.contains('reading') ? '' : remHtml()}
    <div class="set-grp" id="lanGrp"><button class="lan-btn" id="lanBtn" type="button" aria-expanded="false" aria-controls="lanPanel"><span id="lanTt">Lanjutan</span><span aria-hidden="true" id="lanCh">▾</span></button>
    <div class="mut sm lan-hint">Huruf, bantuan kata, suara, layar. Bawaan sudah pas untuk kebanyakan orang.</div>
    <div id="lanPanel" hidden>
    <div class="lan-sub">Tampilan</div>
    <div class="set-row"><div class="eyebrow">Huruf baca</div><div class="seg" id="fnt"><button data-v="serif" class="${db.font === 'serif' ? 'on' : ''}" style="font-family:var(--font-reader)">Klasik</button><button data-v="sans" class="${db.font === 'sans' ? 'on' : ''}">Modern</button></div></div>
    <div class="set-row"><div class="eyebrow">Jarak huruf</div><div class="seg" id="sps">${[['n', 'Normal'], ['w', 'Lega']].map(([v, t]) => `<button data-v="${v}" class="${db.spacing === v ? 'on' : ''}">${t}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Rata teks</div><div class="seg" id="als">${[['l', 'Kiri'], ['j', 'Kiri-kanan']].map(([v, t]) => `<button data-v="${v}" class="${effAlign() === v ? 'on' : ''}">${t}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Jarak baris</div><div class="seg" id="lhs">${LHS.map(v => `<button data-v="${v}" class="${nearLh(readLh(b && b.lang)) === v ? 'on' : ''}">${v}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Margin halaman</div><div class="seg" id="mgs">${[['s', 'Sempit'], ['m', 'Sedang'], ['l', 'Lebar']].map(([k, l]) => `<button data-v="${k}" class="${db.mg === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Fokus baris</div><div class="seg" id="fcs"><button data-v="0" class="${db.focus ? '' : 'on'}">Mati</button><button data-v="1" class="${db.focus ? 'on' : ''}">Nyala</button></div></div>
    <div class="lan-sub">Bantuan kata</div>
    ${b && document.body.classList.contains('reading') ? `<div class="set-row">${prepHtml()}</div>` : ''}
    <div class="set-row"><div class="eyebrow">Tandai kata yang sering kuketuk</div><div class="seg" id="mos"><button data-v="1" class="${db.markOften === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.markOften === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Kata yang diketuk 3× atau lebih dikasih latar tipis di teks.</div></div>
    <div class="set-row"><div class="eyebrow">Baca polos</div><div class="seg" id="pln"><button data-v="0" class="${db.plain ? '' : 'on'}">Mati</button><button data-v="1" class="${db.plain ? 'on' : ''}">Nyala</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Halaman bersih. Arti baru muncul saat kamu ketuk.</div></div>
    <div class="set-row"><div class="eyebrow">Intip kata bab</div><div class="seg" id="ips"><button data-v="1" class="${db.intip === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.intip === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Kartu kecil berisi 3-5 kata baru di awal bab. Bisa dilewati.</div></div>
    <div class="set-row"><div class="eyebrow">Jelaskan kalimat (AI)</div><div class="seg" id="ais"><button data-v="1" class="${db.aiJelas === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.aiJelas === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Tombol penjelas di arti kalimat. Cuma jalan kalau diketuk, gratis 5x sehari.</div></div>
    <div class="set-row"><div class="eyebrow">Cara baca di arti kata</div><div class="seg" id="bcs"><button data-v="1" class="${db.showBaca ? 'on' : ''}">Nyala</button><button data-v="0" class="${db.showBaca ? '' : 'on'}">Mati</button></div></div>
    <div class="set-row"><div class="eyebrow">Cara baca di kartu ulang</div><div class="seg" id="pks"><button data-v="langsung" class="${db.peekBaca === 'langsung' ? 'on' : ''}">Langsung</button><button data-v="ketuk" class="${db.peekBaca === 'langsung' ? '' : 'on'}">Ketuk dulu</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Langsung = pinyin tampil bareng arti. Ketuk dulu = kamu ingat dulu.</div></div>
    ${'speechSynthesis' in window ? `<div class="set-row"><div class="eyebrow">Laju suara</div><div class="seg" id="trs"><button data-v="normal" class="${db.ttsRate === 'slow' ? '' : 'on'}">${ico('vol')} Normal</button><button data-v="slow" class="${db.ttsRate === 'slow' ? 'on' : ''}">${ico('vol')} Lambat</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Lambat bikin suara lebih pelan, enak buat nangkep tiap kata.</div></div><div class="set-row"><div class="eyebrow">Lanjut otomatis</div><div class="seg" id="las"><button data-v="1" class="${db.lisAuto ? 'on' : ''}">Nyala</button><button data-v="0" class="${db.lisAuto ? '' : 'on'}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Dengar halaman lanjut sendiri ke halaman berikutnya. Berhenti di akhir bab. Di iPhone, suara berhenti saat layar mati. Biarkan layar menyala.</div></div>` : ''}
    <div class="set-row"><div class="eyebrow">Bar progres</div><div class="seg" id="pbs"><button data-v="1" class="${db.progBar === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.progBar === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Mati = teks Halaman/Sisa dan bar tipis di bawah disembunyiin. Tombol panah tetap ada.</div></div>
    <div class="set-row"><div class="eyebrow">Ketuk tepi ganti halaman</div><div class="seg" id="tes"><button data-v="1" class="${db.tapEdge === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.tapEdge === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Mati = ketuk layar cuma buka/tutup menu. Geser & tombol panah tetap jalan.</div></div>
    <div class="set-row"><div class="eyebrow">Layar tetap menyala saat baca</div><div class="seg" id="wks"><button data-v="1" class="${db.wake === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.wake === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Layar tidak mati sendiri saat kamu baca. Matikan kalau boros baterai.</div></div>
    <div class="lan-sub">Kartu ulang &amp; suara</div>
    <div class="set-row"><div class="eyebrow">Bunyikan kata otomatis di kartu ulang</div><div class="seg" id="aspk"><button data-v="1" class="${db.autoSpeak ? 'on' : ''}">Nyala</button><button data-v="0" class="${db.autoSpeak ? '' : 'on'}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Kata dibacakan saat kartu muncul.</div></div>
    <div class="set-row"><div class="eyebrow">Efek suara</div><div class="seg" id="sfxs"><button data-v="1" class="${db.sfx ? 'on' : ''}">${ico('vol')} Nyala</button><button data-v="0" class="${db.sfx ? '' : 'on'}">${ico('mute')} Mati</button></div></div>
    ${b && 'speechSynthesis' in window ? voiceRow(b.lang) : ''}
    <div class="lan-sub">Setelan awal</div>
    <button class="ghost full" id="rst" type="button" style="min-height:44px">Balikin setelan awal</button>
    <div class="seg" id="rstAsk" role="group" aria-label="Konfirmasi balikin setelan awal" hidden style="margin-top:8px"><button type="button" id="rstOk" style="min-height:44px">Ya, balikin</button><button type="button" id="rstNo" style="min-height:44px">Batal</button></div>
    </div></div>
    ${document.body.classList.contains('reading') ? '' : (typeof openWhatsNew === 'function' ? '<button class="sec full fb-open" id="wnSet">' + ico('sparkle') + 'Yang baru</button>' : '') + '<button class="sec full fb-open" id="fbSet">' + ico('chat') + 'Kirim masukan</button>'}
    <div class="set-grp" id="aturan"><div class="set-gt">Aturan &amp; Hak cipta</div>
    <ul class="rules">
      <li>Baca &amp; bagikan hanya buku milikmu atau domain publik.</li>
      <li>Kamus Jepang kecil (cara baca &amp; bentuk dasar) disusun dengan rujukan JMdict © EDRDG, lisensi CC BY-SA 4.0.</li>
      <li>Buku dan progresmu tersimpan di HP ini, bukan di server.</li>
      <li>Kalau login, hanya XP, kata, dan buku yang kamu bagikan ikut tersimpan.</li>
      <li>Kami hanya menghitung jumlah HP yang membuka app per hari (tanpa nama, ID, atau IP).</li>
      <li>Bagikan = link pribadi. Hanya yang kamu kirimi link yang bisa buka.</li>
      <li>Terjemahan otomatis bisa keliru. Anggap sebagai bantuan, bukan kebenaran.</li>
      <li>Minta hapus konten atau laporkan buku: lewat tombol di bawah.</li>
    </ul>
    ${document.body.classList.contains('reading') ? '' : `<button class="sec full fb-open" id="fbTake">${ico('flag')}Minta hapus konten</button>`}
    </div>
    <div class="set-grp" id="apl"><div class="set-gt">Aplikasi</div>
    <div class="set-row"><div class="eyebrow">Versi app: ${APP_VER}</div><div class="mut sm" id="muMsg">Buku, kata, dan XP-mu tetap aman.</div>${chipVerBaru()}</div>
    <button class="sec full" id="muBtn" type="button" style="min-height:44px">Muat ulang versi terbaru</button>
    <div class="seg" id="muAsk" role="group" aria-label="Konfirmasi muat ulang" hidden style="margin-top:8px"><button type="button" id="muOk" style="min-height:44px">Muat ulang</button><button type="button" id="muNo" style="min-height:44px">Batal</button></div>
    </div>
    ${dataWarn()}
    ${typeof bkCard === 'function' ? `<div class="set-row"><div class="eyebrow">Akun &amp; cadangan</div><div class="mut sm">${NOTE_AKUN}</div></div>${bkCard()}` : ''}
    `, 'Pengaturan baca');
  remWire();
  $$('#gmn button').forEach(x => x.onclick = () => { db.goalMin = +x.dataset.v; save(); segOn('#gmn', x); refreshHomeStats(); });
  /* lipat 'Lanjutan': tertutup default; tombol asli (keyboard) + aria-expanded */
  const lanN = $$('#lanPanel .seg, #lanPanel select').length - 1; /* -1: konfirmasi reset bukan opsi */
  const lanSet = open => { $('#lanPanel').hidden = !open; $('#lanBtn').setAttribute('aria-expanded', open ? 'true' : 'false'); $('#lanCh').textContent = open ? '▴' : '▾'; $('#lanTt').textContent = 'Lanjutan · ' + lanN + ' opsi'; };
  $('#lanBtn').onclick = () => lanSet($('#lanPanel').hidden);
  lanSet(false);
  if ($('#vsel')) $('#vsel').onchange = e => { db.voices = db.voices || {}; if (e.target.value) db.voices[b.lang] = e.target.value; else delete db.voices[b.lang]; save(); speak(b.lang === 'ja' ? 'こんにちは' : 'Hello', b.lang); };
  if ($('#fbSet')) $('#fbSet').onclick = () => openFeedback();
  if ($('#wnSet')) $('#wnSet').onclick = () => openWhatsNew();
  if ($('#fbTake')) $('#fbTake').onclick = () => openFeedback({ kind: 'takedown' });
  $('#muBtn').onclick = () => {
    if (!navigator.onLine) { $('#muMsg').textContent = 'Butuh internet untuk ambil versi baru.'; return; }
    $('#muMsg').textContent = 'Muat ulang versi terbaru? Buku & katamu tetap aman.'; $('#muBtn').hidden = true; $('#muAsk').hidden = false;
  };
  $('#muNo').onclick = () => { $('#muMsg').textContent = 'Buku, kata, dan XP-mu tetap aman.'; $('#muAsk').hidden = true; $('#muBtn').hidden = false; };
  $('#muOk').onclick = () => muatUlangPaksa();
  if ($('#prepBox')) pagesOf(b).then(sc => { if ($('#prepBox')) bindPrep(b, sc[Math.min(b.pos || 0, sc.length - 1)]); });
  if ($('#bmTog')) { syncMarks(); $('#bmTog').onclick = toggleMark; $('#bmList').onclick = openMarks; syncKenalAll(); $('#kenalAll').onclick = kenalAllPage; $('#bkFind').onclick = openFind; $('#goSpeak').onclick = () => { closeSheet(); setTab('bicara'); }; }
  $('#sheetBody').onclick = () => { const v = $('#spv'); if (!v) return; v.classList.toggle('serif', db.font === 'serif'); v.style.setProperty('--reader-lh', readLh(pl)); v.style.fontSize = readFs(b && b.lang) + 'px'; v.style.textAlign = effAlign() === 'j' ? 'justify' : 'left'; spcSet(v, db.spacing); };
  const relayout = () => { const p = $('#cols'); if (p) { p.style.fontSize = readFs(b && b.lang) + 'px'; $('#reader').style.setProperty('--reader-lh', readLh(b && b.lang)); $('#reader').dataset.align = effAlign(); spcSet($('#reader'), db.spacing); $('#reader').style.setProperty('--reader-mg', (MG[db.mg] || 24) + 'px'); layout(); } };
  const setFs = v => { db.fs = Math.max(16, Math.min(28, v)); db.fsSet = true; save(); $('#fsv').textContent = db.fs + ' px'; relayout(); };
  $('#fsm').onclick = () => setFs(readFs(b && b.lang) - 1); $('#fsp').onclick = () => setFs(readFs(b && b.lang) + 1);
  $$('#sheetBody .seg, #thm').forEach(g => { const e = g.parentElement.querySelector('.eyebrow'); g.setAttribute('role', 'group'); if (e && !g.hasAttribute('aria-label')) g.setAttribute('aria-label', e.textContent.trim()); g.querySelectorAll('button').forEach(y => y.setAttribute('aria-pressed', y.classList.contains('on') ? 'true' : 'false')); });
  $$('#thm button').forEach(x => x.onclick = () => { db.theme = x.dataset.v; save(); applyTheme(); segOn('#thm', x); });
  $$('#fnt button').forEach(x => x.onclick = () => { db.font = x.dataset.v; save(); segOn('#fnt', x); const r = $('#reader'); if (r) { r.classList.toggle('serif', db.font === 'serif'); layout(); } });
  $$('#als button').forEach(x => x.onclick = () => { db.align = x.dataset.v; save(); segOn('#als', x); relayout(); });
  $$('#sps button').forEach(x => x.onclick = () => { db.spacing = x.dataset.v; save(); segOn('#sps', x); relayout(); });
  $$('#lhs button').forEach(x => x.onclick = () => { db.lh = +x.dataset.v; db.lhSet = true; save(); segOn('#lhs', x); relayout(); });
  $$('#mgs button').forEach(x => x.onclick = () => { db.mg = x.dataset.v; save(); segOn('#mgs', x); relayout(); });
  $$('#fcs button').forEach(x => x.onclick = () => { db.focus = x.dataset.v === '1'; save(); segOn('#fcs', x); const r = $('#reader'); if (r) { r.classList.toggle('focus', db.focus); $$('.cols .cur').forEach(e => e.classList.remove('cur')); const c = $('#cols'); if (c) c.classList.remove('has-cur'); } });
  $$('#las button').forEach(x => x.onclick = () => { db.lisAuto = x.dataset.v === '1'; save(); segOn('#las', x); });
  $$('#trs button').forEach(x => x.onclick = () => { db.ttsRate = x.dataset.v === 'slow' ? 'slow' : 'normal'; save(); segOn('#trs', x); speak(b && b.lang === 'ja' ? 'こんにちは' : 'Hello', b ? b.lang : 'en', 0.8); });
  $$('#rts button').forEach(x => x.onclick = () => { setRt(b.lang, +x.dataset.v); segOn('#rts', x); if (document.body.classList.contains('reading')) viewBaca(); });
  $$('#mos button').forEach(x => x.onclick = () => { db.markOften = x.dataset.v === '1'; save(); segOn('#mos', x); const r = $('#reader'); if (r) r.classList.toggle('no-often', !db.markOften); });
  $$('#pln button').forEach(x => x.onclick = () => { db.plain = x.dataset.v === '1'; save(); segOn('#pln', x); const r = $('#reader'); if (r) r.classList.toggle('plain', db.plain); if (db.plain) pfDisarm(); else pfArm(); });
  $$('#ais button').forEach(x => x.onclick = () => { db.aiJelas = x.dataset.v === '1'; save(); segOn('#ais', x); });
  $$('#ips button').forEach(x => x.onclick = () => { db.intip = x.dataset.v === '1'; save(); segOn('#ips', x); });
  $$('#pks button').forEach(x => x.onclick = () => { db.peekBaca = x.dataset.v; save(); segOn('#pks', x); });
  $$('#bcs button').forEach(x => x.onclick = () => { db.showBaca = x.dataset.v === '1'; save(); segOn('#bcs', x); const wb = $('#wbaca'); if (wb) wb.textContent = db.showBaca && wb.dataset.b ? wb.dataset.b : ''; });
  $$('#pbs button').forEach(x => x.onclick = () => { db.progBar = x.dataset.v === '1'; save(); segOn('#pbs', x); const r = $('#reader'); if (r) r.classList.toggle('no-prog', !db.progBar); });
  $$('#tes button').forEach(x => x.onclick = () => { db.tapEdge = x.dataset.v === '1'; save(); segOn('#tes', x); });
  $$('#wks button').forEach(x => x.onclick = () => { db.wake = x.dataset.v === '1'; save(); segOn('#wks', x); wakeSync(); });
  $$('#aspk button').forEach(x => x.onclick = () => { db.autoSpeak = x.dataset.v === '1'; save(); segOn('#aspk', x); });
  $$('#sfxs button').forEach(x => x.onclick = () => { db.sfx = x.dataset.v === '1'; save(); segOn('#sfxs', x); sfx('ding'); });
  /* Reset: minta konfirmasi dulu; hanya setelan tampilan/baca/suara. Buku, kata, XP, target, bahasa tak disentuh. */
  $('#rst').onclick = () => { $('#rst').hidden = true; $('#rstAsk').hidden = false; $('#rstOk').focus(); };
  $('#rstNo').onclick = () => { $('#rstAsk').hidden = true; $('#rst').hidden = false; $('#rst').focus(); };
  $('#rstOk').onclick = () => {
    Object.assign(db, { fs: 19, fsSet: false, lh: 1.7, lhSet: false, align: null, mg: 'm', spacing: 'n', focus: false, font: 'serif', theme: 'paper', showBaca: true, peekBaca: null, rt: 0, rtSet: false, rtLang: {}, markOften: true, plain: false, progBar: true, intip: true, aiJelas: true, ttsRate: 'normal', lisAuto: false, tapEdge: true, wake: true, autoSpeak: false, sfx: true, voices: {} });
    save(); applyTheme(); wakeSync(); closeSheet(); if (document.body.classList.contains('reading')) viewBaca(); toast('Setelan dibalikin ke awal.');
  };
  if ($('#blang')) $('#blang').onchange = e => { b.lang = e.target.value; save(); cache.id = null; trCache.clear(); closeSheet(); setTab(db.tab); };
  if (typeof bkWire === 'function') bkWire(); dataWarnWire();
  $('#mylang').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
}

/* muat ulang paksa: hanya cache app (service worker + cache kepo-*); data pengguna tidak disentuh */
async function muatUlangPaksa() {
  if (!navigator.onLine) { toast('Butuh internet untuk ambil versi baru.'); return; }
  try { const r = await fetch('./sw.js', { cache: 'no-store' }); if (!r.ok) throw 0; }
  catch (e) { toast('Butuh internet untuk ambil versi baru.'); return; }
  try {
    if ('serviceWorker' in navigator) { const rs = await navigator.serviceWorker.getRegistrations(); await Promise.all(rs.map(r => r.unregister())); }
    if (window.caches) { const ks = await caches.keys(); await Promise.all(ks.filter(k => k.startsWith('kepo-')).map(k => caches.delete(k))); }
  } catch (e) {}
  location.reload();
}
/* ---------- kirim masukan (tahap 1: tanpa server) ---------- */
/* APP_VER harus sama dengan nomor C di sw.js (kepo-vNNN): naikkan bersamaan */
const APP_VER = 'v693';
const FEEDBACK_URL = 'https://kepo-dev.rizkachoirunnisa0403.workers.dev/feedback'; // Worker HQ (dev/); token GitHub tetap di sana
function openFeedback(opt = {}) {
  const reading = document.body.classList.contains('reading');
  const kinds = [['rusak', 'bug', 'Ada yang rusak'], ['ide', 'bulb', 'Ide'], ['suka', 'heart', 'Suka'], ['takedown', 'flag', 'Takedown']];
  let kind = opt.kind || 'ide', stars = 0;
  openSheet(`<div class="sh-head"><h2>Kirim masukan</h2>${closeBtn}</div>
    <div class="seg fb-kind" id="fbK" role="group" aria-label="Jenis masukan">${kinds.map(([k, e, l]) => `<button data-v="${k}" class="${k === kind ? 'on' : ''}" aria-pressed="${k === kind}">${ico(e)}${l}</button>`).join('')}</div>
    <div class="mut sm" id="fbHint" ${kind === 'takedown' ? '' : 'hidden'}>Sebut judul atau kode link bukunya &amp; alasannya. Tim Keepo menindaklanjuti.</div>
    <label class="fb-l">Ceritain aja
      <textarea id="fbT" maxlength="500" rows="5" placeholder="Apa yang bikin kamu kesel, kepikiran, atau seneng?">${esc(opt.text || '')}</textarea></label>
    <div class="mut sm fb-cnt"><span id="fbC">${(opt.text || '').length}</span>/500</div>
    <div class="eyebrow">Nilai app (boleh dilewati)</div>
    <div class="fb-stars" id="fbS">${[1, 2, 3, 4, 5].map(n => `<button data-n="${n}" aria-label="${n} bintang">★</button>`).join('')}</div>
    <div class="fb-img"><div class="fb-thumbs" id="fbImgs"></div>
      <button type="button" class="sec fb-add" id="fbAdd">${ico('image')}Tambah gambar</button>
      <input type="file" id="fbFile" accept="image/*" multiple hidden>
      <div class="mut sm">Maks 3 gambar. Jangan sertakan data pribadi di gambar.</div></div>
    <label class="fb-chk"><input type="checkbox" id="fbI"><span>Sertakan info HP${reading ? ', judul buku &amp; posisi baca' : ''} (browser, ukuran layar, versi app)</span></label>
    <div class="mut sm">Yang kamu tulis dibaca tim Keepo.</div>
    <button class="pri full" id="fbSend" style="margin-top:12px">Kirim</button>`, 'Kirim masukan');
  $$('#fbK button').forEach(x => x.onclick = () => { kind = x.dataset.v; $('#fbHint').hidden = kind !== 'takedown'; segOn('#fbK', x); });
  $$('#fbS button').forEach(x => x.onclick = () => { const n = +x.dataset.n; stars = stars === n ? 0 : n; $$('#fbS button').forEach(y => y.classList.toggle('on', +y.dataset.n <= stars)); });
  const imgs = [];
  const drawImgs = () => { $('#fbImgs').innerHTML = imgs.map((u, i) => `<div class="fb-th"><img src="${u}" alt="Gambar ${i + 1}"><button type="button" data-i="${i}" aria-label="Hapus gambar ${i + 1}">${ico('x')}</button></div>`).join(''); $$('#fbImgs button').forEach(x => x.onclick = () => { imgs.splice(+x.dataset.i, 1); drawImgs(); }); $('#fbAdd').hidden = imgs.length >= 3; };
  $('#fbAdd').onclick = () => $('#fbFile').click();
  $('#fbFile').onchange = async e => {
    const fs = [...e.target.files]; e.target.value = '';
    for (const f of fs) {
      if (imgs.length >= 3) { toast('Maksimal 3 gambar ya.'); break; }
      if (!f.type || !/^image\/(jpeg|png|webp|gif|heic|heif|bmp)$/i.test(f.type)) { toast('Hanya foto/tangkapan layar ya.'); continue; }
      const u = await fbKecilkan(f); if (u) { imgs.push(u); drawImgs(); } else toast('Hanya foto/tangkapan layar ya.');
    }
  };
  drawImgs();
  $('#fbT').oninput = e => { $('#fbC').textContent = e.target.value.length; };
  $('#fbSend').onclick = async () => {
    const txt = $('#fbT').value.trim().slice(0, 500);
    if (!txt) { toast('Tulis dulu ya, sedikit aja cukup.'); $('#fbT').focus(); return; }
    const kl = kinds.find(k => k[0] === kind);
    let msg = `[Keepo] ${kl[2]}\n${txt}`;
    if (stars) msg += `\nBintang: ${stars}/5`;
    const btn = $('#fbSend'); btn.disabled = true; btn.textContent = 'Mengirim…';
    const rec = { id: Date.now() + '-' + Math.random().toString(36).slice(2, 6), t: Date.now(), kind, stars, text: txt, msg, terkirim: false, gagal: 0 };
    if ($('#fbI').checked) { rec.info = `${navigator.userAgent} · layar ${screen.width}x${screen.height} · app ${APP_VER}`; rec.msg += `\nInfo HP: ${rec.info}`;
      if (reading) { const bk = book(); if (bk) { const ex = ` · buku "${bk.title}" · bab ${(bk.pos || 0) + 1}/${bk.total || 1}`; rec.info += ex; rec.msg += ex; } } }
    if (imgs.length) rec.gambar = imgs.slice();
    try { await putFeedback(rec); } catch (e) { }
    const r = await kirimFeedback(rec);
    closeSheet();
    if (r === 'ok') { toast('Makasih masukannya! 💚'); return; }
    if (r === 'ditolak' && rec.gagal >= 3) { /* cadangan: server menolak berulang */
      if (navigator.share) { try { await navigator.share({ text: rec.msg }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
      try { await navigator.clipboard.writeText(rec.msg); toast('Server menolak. Tersalin, tempel ke pesan buat tim Keepo.', 4500); } catch (e) { toast('Belum terkirim. Salinan tersimpan di HP-mu.', 4500); }
      return;
    }
    toast('Belum terkirim, disimpan dulu. Nanti dikirim otomatis.', 4500);
  };
}
/* Kirim satu masukan ke HQ. Return 'ok' | 'gagal' (offline/server error) | 'ditolak' (4xx). */
async function kirimFeedback(rec) {
  let r = 'gagal';
  try {
    const res = await fetch(FEEDBACK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jenis: rec.kind, teks: rec.text, bintang: rec.stars || 0, info: rec.info || '', versi: APP_VER, waktu: rec.t, dev: fbDevId(), gambar: rec.gambar || [] }) });
    r = res.ok ? 'ok' : (res.status >= 400 && res.status < 500 && res.status !== 429 ? 'ditolak' : 'gagal');
    if (r !== 'ok' && res.status !== 429 && rec.gambar && rec.gambar.length) { /* server belum terima gambar: kirim teksnya saja */
      const r2 = await fetch(FEEDBACK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jenis: rec.kind, teks: rec.text, bintang: rec.stars || 0, info: rec.info || '', versi: APP_VER, waktu: rec.t, dev: fbDevId() }) });
      if (r2.ok) r = 'ok';
    }
  } catch (e) { }
  try {
    if (r === 'ok') await markFeedbackSent(rec.id);
    else { if (r === 'ditolak') rec.gagal = (rec.gagal || 0) + 1; await putFeedback(rec); }
  } catch (e) { }
  return r;
}
/* Kecilkan gambar: sisi maks 1280px, JPEG ~0,7, <= ~300 KB. Return data URL, atau '' bila bukan gambar. */
async function fbKecilkan(f) {
  try {
    if (!/^image\//i.test(f.type) || /svg/i.test(f.type)) return '';
    const bmp = await new Promise((res, rej) => { const u = URL.createObjectURL(f), im = new Image(); im.onload = () => { URL.revokeObjectURL(u); res(im); }; im.onerror = () => { URL.revokeObjectURL(u); rej(); }; im.src = u; });
    let k = Math.min(1, 1280 / Math.max(bmp.naturalWidth, bmp.naturalHeight)), q = 0.7, out = '';
    for (let i = 0; i < 5; i++) {
      const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(bmp.naturalWidth * k)); c.height = Math.max(1, Math.round(bmp.naturalHeight * k));
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(bmp, 0, 0, c.width, c.height);
      out = c.toDataURL('image/jpeg', q);
      if (out.length * 0.75 <= 300 * 1024) break;
      k *= 0.8; q = Math.max(0.5, q - 0.05);
    }
    return out.startsWith('data:image/jpeg') ? out : '';
  } catch (e) { return ''; }
}
function fbDevId() {
  let v = ''; try { v = localStorage.getItem('kepo_fbdev'); if (!v) { v = Math.random().toString(36).slice(2, 12) + Date.now().toString(36); localStorage.setItem('kepo_fbdev', v); } } catch (e) { }
  return v || 'anon';
}
let fbKirimJalan = false;
async function kirimUlangFeedback() {
  if (fbKirimJalan || !navigator.onLine) return;
  fbKirimJalan = true;
  try {
    const q = (await pendingFeedback()).filter(f => (f.gagal || 0) < 3).slice(0, 10);
    for (const f of q) { if (await kirimFeedback(f) === 'gagal') break; }
  } catch (e) { } finally { fbKirimJalan = false; }
}
window.addEventListener('online', kirimUlangFeedback);
setTimeout(kirimUlangFeedback, 3000);

/* ---------- HOME ---------- */
/* judul + penulis dalam kurung ('こころ（夏目漱石）') -> penulis di baris sendiri */
function heroTitle(t) {
  const p = splitTitle(t);
  return p.au ? `<span class="t-main">${esc(p.main)}</span> <span class="t-au">${esc(p.au)}</span>` : esc(p.main);
}
/* kartu rak: judul (maks 2 baris) & penulis di baris kecil terpisah */
function shelfTitle(t, author) {
  const p = splitTitle(t), au = p.au || String(author || '').trim();
  return `<div class="t" dir="auto" title="${esc(t)}">${esc(p.main)}</div>${au ? `<div class="au" dir="auto" title="${esc(au)}">${esc(au)}</div>` : ''}`;
}
function ringSmall(p, label) {
  const C = 2 * Math.PI * 24;
  return `<div class="ring"><svg viewBox="0 0 56 56"><circle class="bg" cx="28" cy="28" r="24"/><circle class="fg${p > 0 ? '' : ' z'}" cx="28" cy="28" r="24" stroke="#22362B" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - Math.min(1, p))}"/><defs><linearGradient id="gl"><stop offset="0" stop-color="#C6FF3D"/><stop offset="1" stop-color="#3DDCFF"/></linearGradient></defs></svg><div class="score">${label}</div></div>`;
}
let blManual = false; // true bila pengguna sendiri mengubah pilihan bahasa cerita
/* Tebak bahasa dari teks; ganti pilihan #bl otomatis kecuali sudah diubah manual. Return kode bahasa yang dipakai. */
function autoLang(text) {
  const g = blManual ? null : guessLang(text);
  return g || db.lastLang;
}
/* Simpan bahasa tebakan + toast, HANYA dipanggil setelah impor sukses. */
function commitLang(g) {
  if (!g || g === db.lastLang || blManual) return;
  db.lastLang = g; save();
  const sel = $('#bl'); if (sel) sel.value = g;
  setTimeout(() => toast(`Kelihatannya cerita ${LANG_ID[g] || (LANGS[g] || [g])[0]}, kuganti ya. Salah? Ubah di sini.`, 5000), 400);
}
/* Kata hari ini: 1 kata dari vocab (sudah ada arti), deterministik per tanggal, offline. */
let wodPick = null, wodDay = ''; // wodPick: pilihan 'Kata lain', hanya hidup di sesi
function wordOfDay(pick = null) {
  const ok = db.vocab.filter(v => v && !v.noTr && String(v.t || '').trim() && v.w);
  if (!ok.length) return null;
  const now = Date.now(), due = ok.filter(v => !v.known && (v.due || 0) <= now);
  const pool = (due.length ? due : ok).slice().sort((a, b) => ((a.due || a.at || 0) - (b.due || b.at || 0)) || String(a.w).localeCompare(String(b.w)));
  const top = pool.slice(0, 7), d = new Date(), key = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate();
  const v = (pick && ok.includes(pick) && pick) || top[key % top.length];
  return { n: ok.length, v, b: db.books.find(b => b.title === v.book && b.lang === v.lang) || null };
}
// Buang kutip/kurung pembuka yang menggantung di ujung contoh (potongan kalimat).
function wodCx(t) {
  t = String(t || '').trim();
  for (let i = 0; i < 4; i++) {
    const u = t.replace(/[\s「『“‘"'«(（\[【]+(…)?$/, (m, e) => e || '').replace(/^[」』”’"'»)）\]】]+\s*/, '');
    if (u === t) break; t = u;
  }
  return t;
}
// Contoh hanya dipakai bila memuat kata itu sendiri (bukan nyasar dari kata lain).
function wodCtxOk(cx, w) { const a = String(cx || '').toLowerCase(), b = String(w || '').trim().toLowerCase(); return !!b && a.includes(b) && /[\p{L}\p{N}]/u.test(a.replace(b, '')); }
function wodHtml() {
  const day = new Date().toDateString(); if (day !== wodDay) { wodDay = day; wodPick = null; }
  const k = wordOfDay(wodPick);
  if (!k) return '';
  const { v, b, n } = k, br = bacaOf(v.w, v.baca), cx0 = wodCx(ctxOf(v, 90)), cx = wodCtxOk(cx0, v.w) ? cx0 : '', qt = /^[「『“"«]/.test(cx) && /[」』”"»]$/.test(cx);
  return `<div class="tile t-blue wide wod" id="wod"><div class="eyebrow">Kata hari ini</div><div class="wod-w" lang="${esc(v.lang)}">${esc(v.w)}</div>${br ? `<div class="sm">${esc(br)}</div>` : ''}<div class="wod-t">${esc(v.t)}</div>${cx ? `<div class="sm wod-s" lang="${esc(v.lang)}">${qt ? esc(cx) : `“${esc(cx)}”`}</div>` : ''}<div class="hero-act">${b ? `<button class="pri" id="wodOpen" data-bk="${esc(b.id)}" style="min-height:44px">Buka bukunya →</button>` : ''}${n > 1 ? `<button class="sec" id="wodNext" aria-label="Kata lain" title="Kata lain" style="min-height:44px"><span aria-hidden="true">↻</span> Kata lain</button>` : ''}</div></div>`;
}
function bindWod() {
  if ($('#wodOpen')) $('#wodOpen').onclick = e => { const b = db.books.find(x => String(x.id) === e.currentTarget.dataset.bk); if (b) { db.cur = b.id; save(); setTab('baca'); } };
  if ($('#wodNext')) $('#wodNext').onclick = () => {
    const cur = wordOfDay(wodPick).v, has = v => v && !v.noTr && String(v.t || '').trim() && v.w;
    const pool = db.vocab.filter(v => has(v) && v !== cur && v.w !== cur.w);
    if (pool.length) wodPick = pool[Math.floor(Math.random() * pool.length)];
    $('#wod').outerHTML = wodHtml(); bindWod(); const nb = $('#wodNext'); if (nb) nb.focus();
  };
}
/* kartu 'Minggu ini' di Beranda: 7 hari terakhir dari data yang ada; tampil sekali per minggu, tanpa hukuman streak */
function weekKey() { const d = new Date(); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
/* SATU sumber 'halaman dibaca' (#1523): jumlah kunci halaman unik di db.pgWeek yang tanggalnya dalam 7 hari terakhir.
   Kunci 'buku#halaman' unik per halaman, jadi baca ulang tak menambah; tanpa batas pgN x bab yang longgar. */
function pagesWeek() {
  const pw = db.pgWeek;
  if (!pw || typeof pw !== 'object' || Array.isArray(pw)) return 0;
  const from = dayKey(new Date(Date.now() - 7 * 864e5));
  let n = 0;
  for (const k in pw) if (typeof pw[k] === 'string' && pw[k] >= from) n++;
  return n;
}
function weekCard() {
  try { if (localStorage.getItem('kepo_wk') === weekKey()) return ''; } catch (e) { return ''; }
  const pages = pagesWeek(); /* null (tak bisa dihitung) = chip halaman disembunyikan */
  if (db.days.length < 2) return ''; /* hari pertama pengguna: belum ada ringkasan */
  const langs = new Set(db.books.map(b => b.lang));
  const words = kataBaruMinggu(langs); /* hanya kata yang ada di koleksi Kata */
  const parts = [[pages, 'halaman'], [words, 'kata baru']].filter(c => c[0]).map(c => `<b>${c[0]}</b> ${c[1]}`);
  if (!parts.length) return '';
  return `<div class="wk card" id="wkCard"><div class="wk-h"><span class="wk-g"><span class="wk-t">Minggu ini:</span> ${parts.join(' · ')}</span><button class="ghost wk-x" id="wkX" aria-label="Tutup ringkasan minggu ini (sementara, bukan hapus)">Sembunyikan</button></div></div>`;
}
/* 7 titik: terisi = hari dalam streak berturut sekarang; cincin = hari ini belum baca; pudar = aktif di luar streak */
function dayAgo(k) { const d = new Date(); d.setDate(d.getDate() - k); return d; } /* aman saat jam musim panas berganti, sama seperti streak() */
function streakDots() {
  const n = streak(), has = db.days.includes(today()), off = has ? 0 : 1;
  const at = k => { const d = new Date(); d.setDate(d.getDate() - k); return d; }; /* sama dengan streak(): tanggal lokal, tahan DST */
  return [6, 5, 4, 3, 2, 1, 0].map(k => {
    const act = db.days.includes(dayKey(at(k)));
    const cls = k >= off && k < n + off ? 'on' : k === 0 && !has ? 'ring' : act ? 'old' : '';
    const dw = at(k).getDay(), L = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][dw], F = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][dw];
    return `<span class="sd${k === 0 ? ' td' : ''}" aria-label="${F}${k === 0 ? ', hari ini' : ''}, ${act ? 'sudah baca' : 'belum baca'}"><i class="${cls}"></i><em>${L}</em></span>`;
  }).join('');
}
/* info satu baris di kartu Streak: ajakan lembut atau rekor; tanpa hukuman */
function streakInfo() {
  const cur = streak(), ds = db.days.slice().sort();
  let best = 0, run = 0, prev = null, before = 0; /* before = rekor sebelum rangkaian terakhir */
  for (const d of ds) { const nx = prev && Math.round((Date.parse(d) - Date.parse(prev)) / 864e5) === 1; if (!nx && run > before) before = run; run = nx ? run + 1 : 1; if (run > best) best = run; prev = d; }
  if (!db.days.includes(today()) && cur > 0) return 'Baca hari ini biar lanjut';
  return best > cur ? `Rekor ${best} hari` : cur >= 3 && cur > before && db.days.includes(today()) ? (before > 0 ? `Rekor baru: ${cur} hari, naik dari ${before} hari` : `Rekor baru: ${cur} hari`) : cur === 2 ? 'Dua hari berturut, mantap' : cur > 2 ? 'Terus lanjut, mantap' : cur === 1 ? 'Hari pertama, lanjut besok ya' : 'Mulai hari ini yuk';
}
const NUDGE_TXT = 'Ketuk satu kata untuk mulai';
/* ajakan kata pertama: belum ada kata tersimpan, tapi sudah baca >=1 halaman */
function firstWordNudge() { return !countedVocab(null).length; }
/* #148: penunjuk tingkat kesulitan di kartu buku. Buku lama dihitung saat tampil (sekali, offline), tanpa migrasi paksa. */
const KB_TXT = { ringan: 'Ringan', sedang: 'Sedang', berat: 'Berat' };
function kbHtml(b) {
  const k = b.kb;
  if (!k) return '<span class="kbslot" data-kb="' + b.id + '">' + (b.nw != null ? `<span class="m nw">Perkiraan kata baru ~${b.nw}%</span>` : '') + '</span>';
  return `<div class="kb"><span class="kbt ${k.l}">${KB_TXT[k.l]}</span><span class="m nw">~${k.pg} kata asing/halaman</span>${k.l === 'berat' ? `<span class="m nw kbs">${k.m >= 0 ? `Mulai dari Bagian ${k.m + 1}` : 'Santai dulu, baca pelan-pelan'}</span>` : ''}</div>`;
}
const kbBusy = {};
async function ensureKb(b) {
  if (b.kb || kbBusy[b.id]) return;
  kbBusy[b.id] = 1;
  try {
    const paras = await getText(b.id); if (!paras) return;
    const k = kesulitanBuku(makeSections(paras), b.lang);
    if (k) { b.kb = k; save(); const s = document.querySelector(`.kbslot[data-kb="${b.id}"]`); if (s) s.outerHTML = kbHtml(b); }
  } catch (e) { } finally { delete kbBusy[b.id]; }
}
function viewRak() {
  if (!Array.isArray(db.books)) db.books = [];
  const list = db.books.filter(b => b && typeof b === 'object' && b.id != null).sort((a, b) => (b.opened || 0) - (a.opened || 0));
  const cur = book() || list[0];
  const { lv, inLv } = xpInfo();
  const other = cur && pctOf(cur) >= 100 ? list.find(b => b.id !== cur.id && pctOf(b) < 100) : null; /* buku belum tamat yang terakhir dibaca */
  const h = new Date().getHours(), hi = h < 11 ? 'Pagi' : h < 15 ? 'Siang' : h < 19 ? 'Sore' : 'Malam';
  const try1Html = () => `<div class="try1"><div class="eyebrow">Coba 1 cerita · 3 kalimat</div><div class="try1-row">${Object.keys(SAMPLES).sort((a, b) => (b === 'zh-CN') - (a === 'zh-CN')).map(l => `<button class="pri" data-try="${l}" aria-label="Coba 1 cerita ${LANG_ID[l]}"><span class="em">${FLAG[l]}</span><span>${LANG_ID[l]}</span></button>`).join('')}</div></div>`; /* #1933: tombol utama Home kosong */
  const addCard = (noUp) => `<div class="card">
      ${db.books.length ? `<button class="langsum ghost" id="langTog" aria-expanded="false">Cerita ${langName(db.lastLang)} → ${langName(db.my)} <u>Ganti bahasa</u></button>` : ''}
      <div class="langs" id="langs" hidden><label>Bahasa cerita<select id="bl">${langOpts(db.lastLang)}</select></label><label>Artiin ke<select id="ml">${langOpts(db.my)}</select></label></div>
      <div class="add-grid${noUp ? ' two' : ''}">${noUp ? '' : `<button class="main" id="up"><span class="em">${ico('upload')}</span>Tambah cerita</button>`}<button id="paste"><span class="em">${ico('clip')}</span>Tempel teks</button><button id="sample"><span class="em">${ico('sparkle')}</span>Cerita contoh</button></div>
      ${noUp ? '' : '<div class="mut sm center" style="margin-top:10px">TXT · EPUB · PDF (yang ada teksnya)</div>'}
    </div>`;
  if (!cur && typeof bkState !== 'undefined' && bkState) {
    refreshPills();
    $('#view').innerHTML = `<h1 class="big bk-h">Kepoin bahasa <span class="hl-txt">baru.</span></h1><div class="bk-skel${bkState === 'fail' ? ' still' : ''}" aria-hidden="true"><i></i><i></i><i></i></div><div class="mut sm" id="bkStatus" role="status" style="margin:14px 2px">${bkState === 'load' ? 'Memuat bukumu…' : 'Belum bisa terhubung ke akunmu. Cek internet, lalu coba lagi.'}</div><div class="mut sm bk-off" id="bkOff">Bacaanmu tetap bisa dibuka offline.</div><div class="row bk-act">${bkState === 'fail' ? '<button class="sec" id="bkRetry" type="button">Coba lagi</button>' : ''}<button class="${bkState === 'fail' ? 'ghost' : 'sec'}" id="bkSkip" type="button">Lanjut tanpa menunggu</button></div>`;
    const sk = $('#bkSkip'); if (sk) sk.onclick = () => { bkSkip = true; bkState = ''; viewRak(); };
    const rt = $('#bkRetry'); if (rt) rt.onclick = () => {
      if (navigator.onLine === false || bkBusy) { toast(navigator.onLine === false ? 'Lagi offline. Sambungkan internet dulu, lalu coba lagi.' : 'Masih memuat, tunggu sebentar ya.', 4000); return; }
      bkSkip = false; bkState = 'load'; viewRak(); syncBooks().catch(() => { });
    };
    return;
  }
  if (!cur) {
    $('#view').innerHTML = `<h1 class="big">Kepoin<br>bahasa <span class="hl-txt">baru.</span></h1>
      <p class="hero-sub">Baca buku atau cerita sendiri. Ketuk kata yang bikin kepo, artinya langsung muncul.</p>
      ${try1Html()}
      <div class="eyebrow hero-own">Punya bacaan sendiri?</div>
      <button class="sec hero-up" id="up"><span class="em">${ico('upload')}</span>Tambah cerita</button>
      <div class="mut sm hero-fmt">TXT · EPUB · PDF. Kata yang sering kamu ketuk otomatis masuk ulangan.</div>
      <ol class="steps3"><li><img src="img/aset/langkah-tambah.svg" alt="" width="48" height="48" decoding="async"><b>1</b>Tambah cerita favoritmu</li><li><img src="img/aset/langkah-ketuk.svg" alt="" width="48" height="48" decoding="async"><b>2</b>Ketuk kata yang bikin bingung</li><li><img src="img/aset/langkah-ngomong.svg" alt="" width="48" height="48" decoding="async"><b>3</b>Ucapkan kalimatnya, dapat skor & XP</li></ol>
      <div class="sec-h"><h2>Atau mulai dengan</h2></div>${addCard(true)}
      <img class="hero-pic" src="img/hero-home.webp" srcset="img/hero-home-640.webp 640w, img/hero-home.webp 960w" sizes="(max-width:600px) 92vw, 560px" width="960" height="720" alt="Buku terbuka dengan satu kata disorot stabilo dan kartu arti muncul di halaman" decoding="async">`;
  } else {
    $('#view').innerHTML = `
    ${lanjutCard(cur)}
    <div class="bento" style="margin-top:4px">
      <div class="tile t-pink wide${pctOf(cur) >= 100 ? ' hero-done' : ''}" id="hero">${pctOf(cur) >= 100 ? `<div class="hd-row"><div class="inf"><div class="t">${heroTitle(cur.title)}</div><div class="sm">Tamat · ${langName(cur.lang)}</div></div></div><div class="hero-act">${other ? (() => { const lb = nextBkLabel(cur, other); /* #1929/#1987: beda bahasa = sebut bahasanya */ /* #1969: label pendek, judul jadi baris kecil */ return `<button class="pri nx-bk" id="hNext" aria-label="${lb}: ${esc(other.title)}"><span class="nx-v">${lb}</span><span class="nx-t">${esc(splitTitle(other.title).main)}</span></button>`; })() : '<button class="pri" id="hNext">Buku baru</button>'}</div><div class="hd-re"><button type="button" class="lnk" id="hRead" aria-label="Baca ulang, tanpa XP">Baca ulang (tanpa XP)</button></div></div>` : `<div class="hero">${cover(cur)}<div class="inf"><div class="eyebrow">Lanjut baca · ${bookStatus(cur).label}</div><div class="t">${heroTitle(cur.title)}</div><div class="sm">${langName(cur.lang)}</div><div class="sm hero-pos" id="heroPos">${heroPos(cur)}</div>${lastMark(cur) ? `<button class="hero-mk" id="hMark" aria-label="Buka buku dari penanda yang terakhir dibuat">${ico('bm')} Dari penanda terakhir</button>` : ''}<div class="bar" style="margin-top:12px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${bookStatus(cur).pct}" aria-label="Progres buku ${bookStatus(cur).pct} persen"><i style="width:${bookStatus(cur).pct}%"></i></div></div></div>
        <div class="hero-act"><button class="pri" id="hRead">Gas baca →</button>${other ? `<button class="sec" id="hOther">Buku berikutnya</button>` : ''}</div></div>`}
    </div>
    <div class="mut sm" style="margin:14px 0 4px">${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
    ${weekCard()}
    <div class="stat3">
      <div class="t-sun streak1"><div class="eyebrow">Streak</div><div class="num sbig" role="img" aria-label="Beruntun ${streak()} hari. Hari dihitung bila kamu baca atau ulang kata. Target menit terpisah. 7 hari terakhir, hari ini paling kanan">${ico('flame', 'numi')}${streak() ? `<b>${streak()}</b><small>hari</small>` : '<small>Mulai hari ini</small>'}</div><div class="sdots" aria-hidden="true">${streakDots()}</div><div class="sdn" aria-hidden="true">Hari dihitung bila baca atau ulang kata</div><div class="lbl2">${streakInfo()}</div></div>
      <div class="t-lime lv-tap" id="goalCard" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Target baca harian ${goalMin()} menit. ${goalTodayText()}. Ketuk untuk detail">${goalCardHtml()}</div>
      <div class="t-lav lv-tap" id="lvCard" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Level ${xpInfo().lv}. Ketuk untuk lihat cara dapat XP">${lvCardHtml()}</div>
    </div>
    ${nextBadgeHtml()}
    <div id="hskSlot">${hskHomeHtml()}</div>
    ${firstWordNudge() && pctOf(cur) < 100 ? `<button type="button" class="fw-nudge" id="fwNudge" aria-label="${NUDGE_TXT}. Buka bacaan sekarang">${ico('book')}<span>${NUDGE_TXT}</span></button>` : ''}
    ${(() => { const n = db.vocab.filter(isDue).length; if (n) return `<button type="button" class="fw-nudge due-nudge" id="dueNudge" aria-label="${n} kata siap diulang${dueNote(cur && cur.lang)}. Ulang sekarang">${ico('cards')}<span>${n} kata siap diulang${dueNote(cur && cur.lang)}<small>${dueSub(n)}</small></span><b>Ulang sekarang</b></button>`; const x = extraPick().length; if (x) return `<button type="button" class="fw-nudge due-nudge soft-nudge" id="xtraBtn" aria-label="Latihan ekstra, ${x} kata. Belum waktunya, tapi boleh latihan lagi">${ico('cards')}<span>Latihan ekstra · ${x} kata<small>Belum waktunya, tapi boleh latihan lagi</small></span><b>Mulai</b></button>`; if (extraRounds() >= 2) return `<button type="button" class="fw-nudge due-nudge soft-nudge" id="xtraDone" aria-label="Cukup hari ini, latihan ekstra lanjut besok. Baca lanjut: buka bacaan terakhir">${ico('book')}<span>Cukup hari ini, latihan ekstra lanjut besok.</span><b>Baca lanjut</b></button>`; const k = quickPick().length; if (k >= Q_MIN && k < 3) return `<button type="button" class="fw-nudge due-nudge" id="q1Go" aria-label="Ulang ${k} kata. ${k === 1 ? 'Sebentar aja, cuma 1 kata' : 'Dua kata, sebentar aja'}">${ico('cards')}<span>Ulang ${k} kata<small>${k === 1 ? 'Sebentar aja, cuma 1 kata.' : 'Dua kata, sebentar aja.'}</small></span><b>Ulang</b></button>`; if (k < Q_MIN) return `<button type="button" class="fw-nudge q3-lock" id="q3Lock" aria-label="Ulang kata masih terkunci. Simpan ${Q_MIN} kata dulu, baru ${k} dari ${Q_MIN}. ${pctOf(cur) >= 100 ? 'Ketuk kata di buku berikutnya, lalu Simpan' : 'Ketuk untuk buka bacaan'}">${ico('cards')}<span class="q3-t">Simpan ${Q_MIN} kata dulu</span><span class="q3-n">${k}/${Q_MIN}</span><small class="q3-s">${pctOf(cur) >= 100 ? 'Ketuk kata di buku berikutnya, lalu Simpan.' : 'Ketuk kata di bacaan, lalu Simpan.'}</small><span class="q3-seg" role="progressbar" aria-valuemin="0" aria-valuemax="${Q_MIN}" aria-valuenow="${k}">${[0].map(j => `<i${j < k ? ' class="on"' : ''}></i>`).join('')}</span>${pctOf(cur) >= 100 ? '' : '<span class="q3-go">Buka bacaan <span aria-hidden="true">→</span></span>'}</button>`; /* #1745: judul 1 baris + angka kanan, bar 3 segmen, tombol pindah ke bawah */ return ''; })()}
    ${pctOf(cur) < 100 && !firstWordNudge() && a2hsShow() ? a2hsHtml() : ''}
    ${pctOf(cur) >= 100 && db.vocab.some(isDue) ? '' : mileHtml()}
    <div class="sec-h"><h2>Koleksi kamu</h2><button class="ghost" id="addBtn">+ Tambah</button></div>
    <div class="hscroll">${list.map(b => `<div class="bk" data-open="${b.id}">${cover(b)}${shelfTitle(b.title, b.author)}<div class="m">${langName(b.lang)} · ${bookStatus(b).txt}</div>${kbHtml(b)}
      <div class="bk-act">${pctOf(b) >= 100 ? `<button class="sec bk-re" data-reread="${b.id}" aria-label="Baca ulang, tanpa XP: ${esc(b.title)}">Baca ulang (tanpa XP)</button>` : ''}<button class="del" data-menu="${b.id}" aria-label="Menu cerita: ${esc(b.title)}" aria-haspopup="dialog">${ico('more')}</button></div></div>`).join('')}</div>`;
    db.books.forEach(ensureKb);
    db.books.forEach(ensureUnits); /* bobot bab buku lama dihitung sekali; Home digambar ulang bila berubah */
    const open = t => { db.cur = cur.id; save(); setTab(t); };
    $('#hero').onclick = () => open('baca'); $('#hRead').onclick = e => { e.stopPropagation(); if (pctOf(cur) >= 100) restartBook(cur); open('baca'); };
    $('#addBtn').onclick = () => { openSheet(`<div class="sh-head"><h2>Tambah cerita</h2>${closeBtn}</div>${addCard()}`, 'Tambah cerita'); bindAdd(); };
    const ha = $('#hAdd'); if (ha) ha.onclick = e => { e.stopPropagation(); $('#addBtn').click(); };
    const ho = $('#hOther'); if (ho && other) ho.onclick = e => { e.stopPropagation(); db.cur = other.id; save(); setTab('baca'); };
    const nbl = $('#nbLine'); if (nbl) nbl.onclick = badgeListSheet;
    const fn = $('#fwNudge'); if (fn) fn.onclick = () => open('baca');
    const xd = $('#xtraDone'); if (xd) xd.onclick = () => open('baca'); /* #1561: 'Cukup hari ini' tak buntu; lanjut baca (semua tamat = tab Baca) */
    const xb = $('#xtraBtn'); if (xb) xb.onclick = () => { const p = extraPick(); if (!p.length) return; db.q3k = (+db.q3k || 0) + 1; extraRoundUse(); save(); quickPend = p; quickExtra = true; quickLogged = false; kataSeg = 'kartu'; sfx('pop'); setTab('kata'); }; /* #1442: satu tombol ulang; latihan ekstra tak ubah jadwal (api/ tak diubah) */
    const nn = $('#hNext'); if (nn) nn.onclick = e => { e.stopPropagation(); if (other) { db.cur = other.id; save(); setTab('baca'); } else $('#addBtn').click(); };
    const q1 = $('#q1Go'); if (q1) q1.onclick = () => { const p = quickPick(); if (!p.length) { toast('Belum ada kata. Simpan dulu dari bacaan.'); return; } quickPend = p; quickExtra = false; quickLogged = false; kataSeg = 'kartu'; sfx('pop'); setTab('kata'); }; /* #1771: Ulang 1-2 kata */
    const q3l = $('#q3Lock'); if (q3l) q3l.onclick = () => { if (pctOf(cur) >= 100) { if (nn) nn.click(); } else open('baca'); }; /* #1499: kartu terkunci = tombol 'Buka bacaan' (lanjut buku aktif) */
    const dn = $('#dueNudge'); if (dn) dn.onclick = () => { kataSeg = 'kartu'; setTab('kata'); };
    const lc = $('#lanjutCard'); if (lc) lc.onclick = () => { try { if (window.kepoMark) window.kepoMark('lanjut_baca'); } catch (e) { } open('baca'); }; /* #1379: alur 'open' sama dgn tombol Gas baca */
    const hm = $('#hMark'); if (hm) hm.onclick = e => { e.stopPropagation(); const m = lastMark(cur); if (!m) return; cur.pos = Math.max(0, Math.min(m.p, (cur.total || 1) - 1)); cur.si = m.s; RD.quiet = true; open('baca'); };
    const lvc = $('#lvCard'); if (lvc) { /* #1595: kartu Level = tombol; ketuk buka sheet 'Cara dapat XP' */
      /* #1636: kartu Target pakai sheet yang sama + contoh kegiatan. Halaman cuma dihitung PG_CAP (10) XP ke target, jadi sisanya dari kata/Ngomong */
      const contohTarget = `<p class="xp-eg"><b>Target ${goalMin()} menit baca hari ini.</b> ${goalTodayText()}. Waktu dihitung saat halaman terbuka dan kamu aktif. Kira-kira ${Math.max(1, Math.round(goalMin() / 2.5))} halaman. Ubah target di Pengaturan.</p>`;
      const bukaXp = (target) => openSheet(`<div class="sh-head"><h2>${target === true ? `Target ${goalMin()} menit baca` : 'Cara dapat XP'}</h2>${closeBtn}</div>${target === true ? contohTarget : ''}<ul class="rules xp-how"><li>Baca halaman: +2 XP (+5 saat pindah bab)</li><li>Simpan kata, atau ulang kata: +2 XP, +3 XP</li><li>Tamatkan buku: +10 XP</li><li>Latihan Ngomong: +2 sampai +15 XP</li><li>Login di HP lain: XP ikut disamakan</li></ul><div class="mut sm xp-mine">XP kamu: ${esc(xpRinci())}</div>`, 'Cara dapat XP');
      lvc.onclick = bukaXp;
      lvc.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bukaXp(); } };
      const gc = $('#goalCard'); if (gc) {
        gc.onclick = () => bukaXp(true);
        gc.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bukaXp(true); } };
      }
    }
    const a2 = $('#a2hs'); if (a2) { /* #1649: sekali saja; Cara pasang atau Nanti = tak muncul lagi */
      const tutup = () => { try { localStorage.setItem(A2HS_K, '1'); } catch (e) { } a2.remove(); };
      $('#a2hsHow').onclick = () => { tutup(); pasangSheet(); };
      $('#a2hsX').onclick = () => { tutup(); toast(dataRisk() ? 'Oke. Petunjuknya tetap ada di Pengaturan.' : 'Oke, nanti saja.'); };
    }
    const wx = $('#wkX'); if (wx) wx.onclick = () => { try { localStorage.setItem('kepo_wk', weekKey()); } catch (e) { } $('#wkCard').remove(); toast('Disembunyikan sampai minggu depan'); };
    bindHskHome(); if (!hskMap && db.vocab.some(v => v && v.lang === 'zh-CN')) hskLoad().then(m => { if (m) fillHskHome(); });
    animRing($('#view'));
    heroMins(cur);
  }
  if (!cur) bindAdd();
  function bindAdd() {
  blManual = false;
  $('#bl').onchange = e => { db.lastLang = e.target.value; blManual = true; save(); };
  $('#ml').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
  const lt = $('#langTog'); if (lt) lt.onclick = () => { const g = $('#langs'); g.hidden = !g.hidden; lt.setAttribute('aria-expanded', String(!g.hidden)); };
  $$('[data-try]').forEach(el => el.addEventListener('click', () => { db.lastLang = el.dataset.try; const b = $('#bl'); if (b) b.value = db.lastLang; }));
  $('#up').onclick = () => $('#file').click();
  const ct = $('#cta'); if (ct) ct.onclick = () => $('#file').click();
  const startSample = async l => {
    const S = (!db.books.length && SAMPLES_SHORT[l]) || SAMPLES[l], ex = db.books.find(b => b.lang === l && b.title === S.title);
    if (ex) { ex.opened = Date.now(); db.cur = ex.id; save(); setTab('baca'); return; }
    try { await addBook(S.title, cleanParas(S.text), l); } catch (e) { console.error(e); toast(MSG_SIMPAN_GAGAL, 5000); }
  };
  $$('[data-try]').forEach(el => el.onclick = () => startSample(el.dataset.try));
  $('#sample').onclick = () => {
    openSheet(`<div class="sh-head"><h2>Cerita contoh</h2>${closeBtn}</div><div class="mut sm">Pilih bahasa ceritanya</div>
      <div class="sample-pick">${Object.keys(SAMPLES).map(l => `<button class="sec" data-sl="${l}"><span class="em">${FLAG[l]}</span>${LANG_ID[l]}<span class="mut sm">${esc(SAMPLES[l].title.replace(' (contoh)', ''))}</span></button>`).join('')}</div>`, 'Cerita contoh');
    $$('[data-sl]').forEach(el => el.onclick = () => {
      closeSheet();
      startSample(el.dataset.sl);
    });
  };
  $('#paste').onclick = () => {
    openSheet(`<div class="sh-head"><h2>Tempel teks</h2>${closeBtn}</div><div class="mut sm">Bahasa: <b>${langName(db.lastLang)}</b> · ganti di pilihan Bahasa cerita</div>
      <label class="eyebrow" style="display:block;margin-top:16px">Judul<input id="pt" placeholder="Contoh: Lirik favorit, cerpen, artikel"></label>
      <label class="eyebrow" style="display:block;margin-top:12px">Teks<textarea id="px" placeholder="Tempel teks bahasa asing di sini…"></textarea></label>
      <div class="row"><button class="sec" data-close>Batal</button><button class="pri" id="ps">${ico('sparkle')}Masukin</button></div>`, 'Tempel teks');
    $('#ps').onclick = async () => {
      const x = $('#px').value.trim(); if (!x) return toast('Teksnya masih kosong nih.');
      const btn = $('#ps'); btn.disabled = true;
      try { const ps = cleanParas(x); const lg = autoLang(ps.join(' ')); if (await addBook($('#pt').value.trim() || x.slice(0, 30) + '…', ps, lg)) commitLang(lg); closeSheet(); }
      catch (e) { console.error(e); toast(MSG_SIMPAN_GAGAL, 5000); if (btn.isConnected) btn.disabled = false; }
    };
  };
  }
  $$('[data-open]').forEach(el => el.onclick = () => { db.cur = el.dataset.open; save(); setTab('baca'); });
  $$('[data-reread]').forEach(el => el.onclick = e => { e.stopPropagation(); const rb = db.books.find(x => x.id === el.dataset.reread); if (!rb) return; db.cur = rb.id; restartBook(rb); save(); setTab('baca'); });
  $$('[data-menu]').forEach(el => el.onclick = e => { e.stopPropagation(); menuCerita(el.dataset.menu); });
}
// Menu ⋯ kartu buku: Ganti sampul / Hapus sampul / Hapus cerita
function menuCerita(id) {
  const b = db.books.find(x => x.id === id); if (!b) return;
  openSheet(`<div class="sh-head"><h2>Cerita ini</h2></div><div class="menu-c"><div class="mc-t">${esc(b.title)}</div>
    <button class="mc-i" id="mcGanti">${ico('image')}<span>Ganti sampul</span></button>
    ${b.covU ? `<button class="mc-i" id="mcHapusS">${ico('stop')}<span>Hapus sampul</span></button>` : ''}
    <button class="mc-i mc-del" id="mcDel">${ico('trash')}<span>Hapus cerita</span></button></div>
    ${offHtml()}
    <input type="file" id="mcFile" accept="image/*" hidden>`, 'Menu cerita');
  bindOff(b);
  const f = $('#mcFile');
  $('#mcGanti').onclick = () => f.click();
  f.onchange = async () => {
    const file = f.files && f.files[0]; if (!file) return;
    try {
      const url = await kecilkanGambar(file);
      await putCoverU(id, url); b.covU = 1; COVERS[id] = url; save(); closeSheet(); setTab(db.tab); toast('Sampul diganti');
    } catch (e) { toast('Gambar ini nggak bisa dipakai. Coba foto lain.', 4500); }
  };
  if ($('#mcHapusS')) $('#mcHapusS').onclick = async () => {
    try { await delCoverU(id); } catch (e) { }
    delete b.covU; delete COVERS[id]; save();
    if (b.cov) { try { const u = await getCover(id); if (u) COVERS[id] = u; } catch (e) { } }
    closeSheet(); setTab(db.tab); toast('Sampul kembali otomatis');
  };
  const d = $('#mcDel');
  d.onclick = () => {
    if (!d.classList.contains('sure')) { d.classList.add('sure'); d.querySelector('span').textContent = 'Yakin hapus?'; return; }
    closeSheet(); hapusBuku(id);
  };
}
// Hapus buku: teks ditunda 5 dtk biar bisa Urungkan. Id disimpan di daftar 'yatim' (localStorage) kalau app ditutup/gagal; dibersihkan saat app dibuka.
const YATIM_K = 'kepo-yatim';
const yatimGet = () => { try { const a = JSON.parse(localStorage.getItem(YATIM_K) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } };
const yatimSet = a => { try { if (a.length) localStorage.setItem(YATIM_K, JSON.stringify(a)); else localStorage.removeItem(YATIM_K); } catch (e) { } };
const yatimTambah = id => { const a = yatimGet(); if (!a.includes(id)) yatimSet([...a, id]); };
const yatimBuang = id => yatimSet(yatimGet().filter(x => x !== id));
const pendingDel = new Map();
async function bersihYatim() {
  for (const id of yatimGet()) {
    if (db.books.some(b => b.id === id)) { yatimBuang(id); continue; }
    if (pendingDel.has(id)) continue;
    try { await delText(id); yatimBuang(id); } catch (e) { }
  }
}
function hapusBuku(id) {
  const i = db.books.findIndex(b => b.id === id); if (i < 0) return;
  const book = db.books[i], wasCur = db.cur === id;
  db.books = db.books.filter(b => b.id !== id); if (wasCur) db.cur = null;
  save(); yatimTambah(id);
  pendingDel.set(id, setTimeout(async () => { pendingDel.delete(id); try { await delText(id); yatimBuang(id); } catch (e) { } if (typeof bookGone === 'function') bookGone(book).catch(() => { }); }, 5000));
  toast('Cerita dihapus.', 5000, { label: 'Urungkan', fn: () => {
    if (!pendingDel.has(id)) return;
    clearTimeout(pendingDel.get(id)); pendingDel.delete(id); yatimBuang(id);
    if (!db.books.some(b => b.id === id)) db.books.splice(Math.min(i, db.books.length), 0, book);
    if (wasCur && !db.cur) db.cur = id;
    save(); viewRak();
  } });
  viewRak();
}
$('#file').onchange = e => { const f = e.target.files[0]; e.target.value = ''; bukaBerkas(f); };
async function bukaBerkas(f) {
  if (!f) return;
  if (!/\.(txt|epub|pdf)$/i.test(f.name)) return toast('Format ini belum bisa. Pakai TXT, EPUB, atau PDF ya.', 5000);
  const isDoc = /\.(epub|pdf)$/i.test(f.name), MB = 1024 * 1024;
  if (isDoc && f.size > 30 * MB) return toast('File-nya kegedean (maks 30 MB untuk EPUB/PDF).', 5000);
  if (f.size > 50 * MB) return toast('File-nya kegedean (maks 50 MB).', 5000);
  const lanjut = () => cekKembar(f);
  if (isDoc && f.size > 25 * MB) return toast('File besar, bisa berat di HP. Lanjut?', 10000, { label: 'Lanjut', fn: lanjut });
  const hp = /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) || (window.matchMedia && matchMedia('(pointer:coarse)').matches);
  if (isDoc && hp && f.size > 15 * MB) return toast('File besar, bisa lama. Lanjut?', 10000, { label: 'Lanjut', fn: lanjut });
  lanjut();
}
/* buka dengan Keepo: berkas dari launchQueue (komputer) atau titipan Bagikan Android (sw.js) */
if ('launchQueue' in window) launchQueue.setConsumer(async lp => {
  for (const h of lp.files || []) { try { await bukaBerkas(await h.getFile()); } catch (e) { toast('Berkasnya gagal dibuka. Coba pilih lewat tombol tambah.', 5000); } }
});
(async () => {
  if (!/[?&]buka=1/.test(location.search)) return;
  try { history.replaceState(null, '', location.pathname); } catch (e) { }
  if (!('caches' in window)) return;
  try {
    const c = await caches.open('kepo-titip'), ks = await c.keys();
    for (const k of ks) {
      const r = await c.match(k); await c.delete(k); if (!r) continue;
      let nama = ''; try { nama = decodeURIComponent(r.headers.get('x-nama') || ''); } catch (e) { }
      await bukaBerkas(new File([await r.blob()], nama || 'buku', { type: r.headers.get('content-type') || '' }));
    }
  } catch (e) { toast('Berkasnya gagal dibuka. Coba pilih lewat tombol tambah.', 5000); }
})();
/* file kembar: nama + ukuran sama dengan buku yang ada (buku lama tanpa src dilewati) */
function cekKembar(f) {
  const ada = db.books.find(b => b && b.src && b.src.name === f.name && b.src.size === f.size);
  if (!ada) return importFile(f);
  openSheet(`<div class="sh-head"><h2>Buku ini sudah ada</h2>${closeBtn}</div><div class="mut sm">Buku ini sudah ada. Impor lagi?</div>
    <div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn" id="dupBuka">Buka yang lama</button><button class="btn ghost" id="dupLagi">Impor lagi</button></div>`, 'Buku sudah ada');
  $('#dupBuka').onclick = () => { closeSheet(); db.cur = ada.id; save(); setTab('baca'); };
  $('#dupLagi').onclick = () => { closeSheet(); importFile(f, true); };
}
let imporBatal = null;
function imporStatus(m) { if (imporBatal) toast(m, Infinity, { label: 'Batal', fn: imporBatal.fn }); }
async function importFile(f, paksa) {
  if (/\.(epub|pdf)$/i.test(f.name || '') && !navigator.onLine && !(await libsCached())) return toast('EPUB/PDF butuh internet sekali buat siapin alat baca. Sambungkan dulu, atau pakai .txt.', 6000);
  if (imporBatal) return toast('Masih nyiapin cerita sebelumnya. Tunggu atau tekan Batal dulu ya.', 4000);
  let stop;
  const dibatal = new Promise((_, no) => { stop = () => no(Object.assign(new Error('batal'), { batal: true })); });
  dibatal.catch(() => { });
  const me = imporBatal = { fn: stop };
  imporStatus('Lagi nyiapin cerita… ⏳');
  try {
    const r = await Promise.race([parseFile(f), dibatal]);
    if (!r.paras.length) throw new Error('kosong');
    if (!paksa) {
      const len = r.paras.join('').length;
      for (const b of db.books) {
        if (b.title !== r.title) continue;
        let ps = null; try { ps = await getText(b.id); } catch (e) { }
        if (ps && ps.length === r.paras.length && ps.join('').length === len) return toast('Cerita ini sudah ada di rakmu', 8000, { label: 'Tetap tambah', fn: () => importFile(f, true) });
      }
    }
    const lg = autoLang(r.paras.join(' ')); if (await addBook(r.title, r.paras, lg, { name: f.name, size: f.size }, r.cover, r.author))commitLang(lg);
  }
  catch (err) {
    console.error(err);
    if (err && err.batal) return toast('Impor dibatalin. Bisa coba lagi kapan aja.', 4000);
    if (err && err.telat) return toast('Gagal: kelamaan nyiapin file. Coba file .txt, atau sambungkan Wi-Fi lalu coba lagi.', 9000);
    if (err && err.simpan) return toast(MSG_SIMPAN_GAGAL, 6000);
    if (err && err.kode === 'scan') return kartuScan();
    const m = err.message || '', isPdf = /\.pdf$/i.test(f.name), isEpub = /\.epub$/i.test(f.name);
    let msg;
    if (/EPUB tidak valid/.test(m)) msg = 'File EPUB ini rusak / nggak valid. Coba file lain ya.';
    else if (/scan|gambar/.test(m) || (/kosong/.test(m) && isPdf)) msg = 'PDF ini isinya gambar/scan, teksnya nggak kebaca.';
    else if (/kosong/.test(m)) msg = 'File ini kosong, nggak ada teks yang kebaca.';
    else if (/lama dimuat/.test(m)) msg = 'Sinyalmu lemah, alat baca lama dimuat. Sambungkan Wi-Fi atau pakai .txt, lalu coba lagi.';
    else if (/internet|pustaka/.test(m) || (!navigator.onLine && (isEpub || isPdf))) msg = 'Impor EPUB/PDF butuh internet sekali dulu. Sambungkan, lalu coba lagi.';
    else msg = 'File ini nggak bisa dibuka. Coba file lain ya.';
    toast(msg, 6000);
  }
  finally { if (imporBatal === me) imporBatal = null; }
}
function kartuScan() {
  openSheet(`<div class="sh-head"><h2>Ini PDF scan: isinya gambar</h2>${closeBtn}</div>
    <div class="scan-card"><p>Keepo belum bisa baca tulisan di dalam gambar. Komik biasanya begini.</p>
    <ul><li>Cari versi <b>EPUB</b> atau <b>TXT</b>.</li><li>Atau ubah scan jadi teks lewat OCR gratis, lalu impor.</li><li>Contoh OCR gratis: Google Drive atau Adobe online.</li><li>Atau ketik/tempel dialognya sendiri.</li></ul></div>
    <div class="row"><button class="pri" id="scTempel">${ico('clip')}Tempel teks</button><button class="sec" id="scCoba">${ico('sparkle')}Coba cerita contoh</button><button class="sec" data-close>Tutup</button></div>`, 'PDF scan');
  $('#scTempel').onclick = () => { closeSheet(); const b = $('#paste'); if (b) b.click(); else { setTab('baca'); setTimeout(() => { const x = $('#paste'); if (x) x.click(); }, 150); } };
  $('#scCoba').onclick = () => { closeSheet(); const b = $('#sample'); if (b) b.click(); else { setTab('home'); setTimeout(() => { const x = $('#sample'); if (x) x.click(); }, 150); } };
}
async function addBook(title, paras, lang, src, cov, author) {
  const id = 'b' + Date.now().toString(36);
  try { await putText(id, paras); } catch (e) { e.simpan = true; throw e; }
  const bk = { id, title, lang, pos: 0, si: 0, total: 0, v: 2, cv: CH_VER, added: Date.now(), opened: Date.now() };
  const nw = perkiraanBaru(paras, lang); if (nw != null) bk.nw = nw;
  try { const kb = kesulitanBuku(makeSections(paras), lang); if (kb) bk.kb = kb; } catch (e) { }
  if (cov) { try { await putCover(id, cov); bk.cov = 1; COVERS[id] = cov; } catch (e) { } }
  if (author) bk.author = author;
  if (src && src.name) bk.src = { name: src.name, size: src.size };
  db.books.push(bk);
  const prevCur = db.cur;
  db.cur = id;
  if (!save()) { db.books = db.books.filter(b => b.id !== id); db.cur = prevCur; try { await delText(id); } catch (e) { } return false; }
  toast('Cerita masuk koleksi!' + (bk.kb ? ` Bacaan ${KB_TXT[bk.kb.l]}.` : bk.nw != null ? ` Perkiraan kata baru ~${bk.nw}%` : '')); sfx('ding'); setTab('baca');
  return true;
}

/* ---------- BACA (e-reader) ---------- */
const SESS = { id: null, t: 0 };
/* Rekap kata sesi: ketukan dicatat di memori + localStorage (kepo_sesi_<idBuku>), ditampilkan saat keluar/buka buku */
const SESSW = new Map();
const sesiKey = id => 'kepo_sesi_' + id;
function sesiSave(bid) {
  try {
    const arr = [...SESSW.values()].filter(e => e.bid === bid);
    if (arr.length) localStorage.setItem(sesiKey(bid), JSON.stringify(arr)); else localStorage.removeItem(sesiKey(bid));
  } catch (e) { }
}
function sesiLoad(bid) {
  try { const a = JSON.parse(localStorage.getItem(sesiKey(bid)) || '[]'); return Array.isArray(a) ? a.filter(e => e && e.w && e.lang) : []; } catch (e) { return []; }
}
function sesiClear(bid) { try { localStorage.removeItem(sesiKey(bid)); } catch (e) { } }
/* #1435: kata diketuk per halaman (kunci buku:bab:halaman -> Set kata huruf kecil); halaman dilewati tanpa ketuk = paham */
const PGTAP = new Map(), SESSP = { t: 0, bid: '', set: new Set() };
const pgKey = (b, pg) => b.id + ':' + b.pos + ':' + pg;
function tapPaham(b, w) {
  const k = pgKey(b, RD.page), set = PGTAP.get(k) || new Set(); set.add(String(w).trim().toLowerCase()); PGTAP.set(k, set);
  if (isPaham(b.lang, w)) { setPaham([[b.lang, w]], false); SESSP.set.delete(vocabKey(b.lang, w)); if (db.vocab.some(v => sameVocab(v, b.lang, w))) paintSaved(b.lang, w, true); } /* diketuk lagi: garis kembali */
}
function pahamPage(b, pg) {
  if (!b || !$('#cols')) return;
  if (SESSP.t !== SESS.t || SESSP.bid !== b.id) { SESSP.t = SESS.t; SESSP.bid = b.id; SESSP.set = new Set(); }
  const tapped = PGTAP.get(pgKey(b, pg)) || new Set(), cols = $('#cols'), seen = new Set(), items = [], cleared = [];
  $$('.cols .w').forEach(el => {
    const w = el.textContent.trim(), k = w.toLowerCase();
    if (!w || seen.has(k) || tapped.has(k) || pageOf(el, cols) !== pg) return;
    seen.add(k);
    if (isKataSampah(b.lang, w, { b }) || isPaham(b.lang, w) || isKenal(b.lang, w)) return;
    items.push([b.lang, w]);
    if (db.vocab.some(v => sameVocab(v, b.lang, w))) cleared.push(k);
  });
  if (!items.length) return;
  setPaham(items, true);
  items.forEach(([l, w]) => SESSP.set.add(vocabKey(l, w)));
  $$('.cols .w').forEach(x => { if (cleared.includes(x.textContent.trim().toLowerCase())) x.classList.remove('saved'); });
  if (cleared.length) toast(`${cleared.length} kata dianggap paham, garis dihapus`, 5000, { label: 'Urungkan', fn: () => {
    setPaham(items, false); items.forEach(([l, w]) => SESSP.set.delete(vocabKey(l, w)));
    cleared.forEach(w => paintSaved(b.lang, w, true));
  } });
}
/* pindah ke halaman berikut: halaman yang ditinggalkan dihitung bila dibuka >= 3 detik */
function pahamLeave(b) {
  if (b && RD.pgK === pgKey(b, RD.page) && Date.now() - RD.pgT >= 3000) pahamPage(b, RD.page);
  RD.pgK = '';
}
/* SATU saringan kata sesi (Tamat + Kata sesi ini): hanya bahasa buku, bukan partikel/kata fungsi/nama, belum tersimpan */
const kataSesiBaru = (b, arr) => arr.filter(e => e && e.lang === b.lang && kataCocokAksara(b, e.w) && !db.vocab.some(v => sameVocab(v, e.lang, e.w)) && !isKataSampah(e.lang, e.w, { b, kenal: true }));
/* #1620: kata tersimpan cocok dgn buku lewat ISI teks (bukan judul saja); teks belum termuat = pakai judul saja (data lama tetap dihitung) */
function kataDiBuku(b, v) {
  if (!kataCocokAksara(b, v.w)) return false;
  if (!cache.pages || cache.id !== b.id) return true;
  if (!cache._low) cache._low = cache.pages.map(s => s.join('\n')).join('\n').toLowerCase();
  return [v.w, v.base].some(x => x && cache._low.includes(String(x).toLowerCase()));
}
/* #2001: satu definisi 'kata baru' = disimpan di sesi ini. Tanpa itu: satu kalimat jujur, N = siap diulang dari buku ini */
const txtBelumBaru = dueBuku => `Sesi ini belum simpan kata.${dueBuku ? ` Dari buku ini ada ${dueBuku} kata siap diulang.` : ' Ketuk kata di cerita untuk menyimpannya.'}`;
function recSess(b, w, sent) {
  if (!b || !w || /\s/.test(String(w).trim()) || isKataSampah(b.lang, w)) return;
  const k = vocabKey(b.lang, w), e = SESSW.get(k) || { w, lang: b.lang, bid: b.id, n: 0, s: sent };
  e.n++; SESSW.set(k, e); sesiSave(b.id);
}
/* sisa sesi (app mati / tab ketutup): tampilkan sekali lalu hapus */
function sesiSisa(b) {
  if (!b) return false;
  const saved = sesiLoad(b.id);
  if (!saved.length) return false;
  for (const e of saved) { if (e.lang !== b.lang) continue; const k = vocabKey(e.lang, e.w); if (!SESSW.has(k)) SESSW.set(k, { ...e, bid: b.id }); }
  return sessRecap(b);
}
const trKey = e => e.lang + '|' + db.my + '|' + e.w;
/* terjemahkan kata rekap yang belum punya arti, lalu perbarui kartunya */
async function isiArtiRekap(cand) {
  if (navigator.onLine === false) return;
  for (let i = 0; i < cand.length; i++) {
    const e = cand[i], c0 = trCache.get(trKey(e));
    if (c0 && c0.text) continue;
    try { await translate(e.w, e.lang, db.my); } catch (x) { return; }
    const c = trCache.get(trKey(e)), el = document.querySelector('#rsl [data-rt="' + i + '"]');
    if (el && c && c.text) { el.textContent = c.text; el.classList.remove('noarti'); }
  }
}
let rekapAktif = null;
function sessRecap(b) {
  const all = [...SESSW.values()].filter(e => b && e.bid === b.id && e.lang === b.lang);
  const nBag = b ? new Set([...SESPG].filter(k => k.startsWith(b.id + ':')).map(k => k.split(':')[1])).size : 0; /* #1979: bagian unik yang dibuka sesi ini */
  if (b) for (const k of [...SESPG]) if (k.startsWith(b.id + ':')) SESPG.delete(k);
  for (const e of all) SESSW.delete(vocabKey(e.lang, e.w));
  if (b) sesiClear(b.id);
  if (!all.length) return false;
  const cand = kataSesiBaru(b, all).sort((x, y) => y.n - x.n).slice(0, 8);
  if (!cand.length) return false;
  rekapAktif = cand;
  /* #1674: tanpa b.pgN (berubah menurut ukuran huruf); posisi pakai Bagian k dari n, satuan sama dgn reader & Tamat */
  const pos = (b.total || 1) > 1 ? `${secWord(b, b.pos)} ${Math.min((b.pos || 0) + 1, b.total)} dari ${b.total}` : '';
  const pgTxt = (nBag ? `${nBag} bagian kamu baca hari ini. ` : '') + (pos ? `Berhenti di ${pos}. ` : '');
  const row = (e, i) => { const c = trCache.get(trKey(e)); return `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(e.lang)}">${esc(e.w)}</div><div class="t1${c && c.text ? '' : ' noarti'}" data-rt="${i}">${c && c.text ? esc(c.text) : 'arti belum ada'}</div></div><button class="pill-sm" data-rs="${i}" aria-label="Simpan kata ${esc(e.w)}">Simpan</button></div>`; };
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Kata sesi ini</span>${closeBtn}</div>
    <h2>Kata yang kamu ketuk tadi</h2><p class="mut sm">${pgTxt}${cand.length} kata belum disimpan. Simpan yang mau dihafal.</p>
    <div id="rsl">${cand.map(row).join('')}</div>
    <div class="row" style="margin-top:12px"><button class="ghost" data-close style="min-height:44px">Lewati</button></div>`, 'Kata sesi ini');
  isiArtiRekap(cand);
  $$('[data-rs]').forEach(btn => btn.onclick = () => {
    const e = cand[+btn.dataset.rs], c = trCache.get(e.lang + '|' + db.my + '|' + e.w);
    if (db.vocab.some(v => sameVocab(v, e.lang, e.w))) return;
    const tp = takeTaps(e.lang, e.w);
    if (isKenal(e.lang, e.w)) setKenal(e.lang, e.w, false);
    untombVocab(e.lang, e.w);
    const nv = { ...(tp > 0 ? { tap: tp } : {}), w: e.w, t: c ? c.text : '', baca: c ? bacaOf(e.w, c.baca) : '', ...(c && c.base ? { base: c.base } : {}), ...(c ? {} : { noTr: 1, nyusul: true }), pos: c && c.dict && c.dict[0] ? c.dict[0].pos : '', lang: e.lang, s: e.s, ctx: ctxOf({ s: e.s }), book: b.title, at: Date.now() };
    db.vocab.unshift(nv); if (!save()) { db.vocab.shift(); return; } award(2, 'save'); vib(10); sfx('ding'); paintSaved(e.lang, e.w, true);
    btn.disabled = true; btn.textContent = 'Tersimpan'; btn.setAttribute('aria-label', 'Kata ' + e.w + ' tersimpan');
    toast('Masuk ke kartu kata kamu', 4000, { label: 'Urungkan', fn: () => {
      const i = db.vocab.indexOf(nv); if (i >= 0) db.vocab.splice(i, 1);
      tombVocab(e.lang, e.w); save(); paintSaved(e.lang, e.w, false);
      if (btn.isConnected) { btn.disabled = false; btn.textContent = 'Simpan'; btn.setAttribute('aria-label', 'Simpan kata ' + e.w); }
    } }, latihAct(nv));
  });
  return true;
}
function leaveBaca() { stopListenPage(); const b = book(); const pg0 = b ? [...SESPG].filter(k => k.startsWith(b.id + ':')).length : 0; if (b && RD && RD.n && RD.page != null && b.total) { b.pct = readPct(b); save(); } setTab('rak'); if (b && !sessRecap(b) && pg0 >= 1) setTimeout(remOffer, 700); }
/* Baca ulang: balik ke awal; tanda tamat (doneAt) dibiarkan supaya XP tamat tak dobel */
let tamatSeen = ''; /* sheet Tamat sekali per sesi baca buku */
function restartBook(b) {
  const prev = { pos: b.pos, si: b.si, pct: b.pct, frac: b.frac, fracPos: b.fracPos, pg: b.pg, pgN: b.pgN, pgPos: b.pgPos };
  const ts = tamatSeen;
  tamatSeen = ''; b.pos = 0; b.si = 0; b.pct = 1; b.frac = 0; b.fracPos = 0; RD.quiet = true; save();
  /* doneAt tidak disentuh: XP tamat tak dobel, Urungkan pun tak mengubahnya */
  toast('Mulai dari awal. Tanpa XP halaman.', 5000, { label: 'Urungkan', fn: () => { Object.assign(b, prev); tamatSeen = ts; RD.quiet = true; save(); db.cur = b.id; setTab('baca'); viewBaca(); } });
}
/* saran berikutnya: buku belum selesai, bahasa sama, panjang mirip/sedikit lebih panjang (belum ada data level buku) */
function nextBooks(b) {
  const t = b.total || 1;
  const sc = x => { const d = (x.total || 1) - t; return d >= 0 ? d : -d * 2 + 1; };
  const cand = db.books.filter(x => x.id !== b.id && x.lang === b.lang && !x.doneAt && pctOf(x) < 100);
  const isEx = x => /\(contoh\)/i.test(x.title || '');
  const own = cand.filter(x => !isEx(x)).sort((p, q) => (q.last || q.at || 0) - (p.last || p.at || 0) || sc(p) - sc(q));
  return (own.length ? own : cand.filter(isEx).sort((p, q) => sc(p) - sc(q))).slice(0, 2);
}
function finishBook(b) {
  const ulang = !!b.doneAt;
  if (!ulang) { b.doneAt = Date.now(); award(10, 'done'); }
  b.pct = 100; /* Tamat = 100% di Home, profil, catatan sesi */
  save();
  const tk = b.id + ':' + SESS.t;
  if (tamatSeen === tk) return toast('Ini halaman terakhir.', 4000);
  tamatSeen = tk;
  setTimeout(() => flushLate(true), 2500);
  /* #1703: 'kata baru' = baru disimpan sesi ini, termasuk yang belum punya arti (noTr) */
  const seenWs = new Set();
  /* #1949: kata baru hanya dari buku yang sedang dibuka sesi ini (id sama) dan judul+bahasanya unik; buku lain/belum dibuka = tanpa kata baru */
  const sesiIni = SESS.id === b.id && db.books.filter(x => x.title === b.title && x.lang === b.lang).length === 1;
  const ws = (db.vocab || []).filter(v => {
    if (!sesiIni || !v || !v.w || v.lang !== b.lang || v.book !== b.title || (v.at || 0) < SESS.t || isKataSampah(v.lang, v.w) || !kataDiBuku(b, v)) return false;
    const k = vocabKey(v.lang, v.w); if (seenWs.has(k)) return false; seenWs.add(k); return true;
  });
  const list = ws.slice(0, 8).map(v => `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}</div><div class="t1">${v.t ? esc(v.t) : '<i>belum ada arti</i>'}</div></div></div>`).join('');
  const pend = kataSesiBaru(b, [...SESSW.values()].filter(e => e.bid === b.id)).length; /* kata diketuk sesi ini, belum disimpan (sumber sama dgn sessRecap) */
  const total = countedVocab(null).length; /* untuk tombol Lihat kata saja; jumlah kata di sheet = ws (sumber catatan sesi) */
  const ring = [b.total > 1 ? `${b.total} ${secWord(b, 0).toLowerCase()}` : '', /* #1674: b.total = jumlah Bagian, bukan halaman layar */ ws.length ? `${ws.length} kata baru` : (pend ? `${pend} kata belum disimpan` : ''), ulang ? 'Baca ulang: tanpa XP halaman' : ''].filter(Boolean).join(' · ');
  const nx = nextBooks(b);
  const nPaham = SESSP.bid === b.id && SESSP.t === SESS.t ? SESSP.set.size : 0, nTap = ws.length + pend;
  const pahamTxt = nTap ? `${nTap} kata ditambah ke Kata.${nPaham ? ` ${nPaham} kata dianggap paham.` : ''}` : nPaham ? 'Tidak ada kata yang kamu ketuk. Semuanya dianggap paham.' : '';
  const none = !ws.length && !pend; /* tak ada kata baru: Buku baru jadi tombol utama */
  const nx1 = nx[0];
  const acts = [];
  if (nx1) { /* #1762 + #1758: buku contoh bawaan diberi label jelas, buku pengguna tetap 'Lanjut' */
    const nxEx = /\(contoh\)/i.test(nx1.title || '') || Object.values(SAMPLES).some(x => x.title === nx1.title) || isShortSample(nx1);
    const nxProg = pctOf(nx1) > 0 ? pctOf(nx1) + '%' : LBL_BELUM;
    const nxTitle = nxEx ? (nx1.title.replace(/\s*\(contoh\)\s*/ig, ' ').trim() || nx1.title) : nx1.title;
    acts.push(nxEx
      ? `<button class="__C__ full fb-next" data-nb="${esc(nx1.id)}"><span class="fbn-t">${nextBkLabel(b, nx1)}</span><span class="fbn-m fbn-ex mut sm" dir="auto">${langName(nx1.lang)} · <span lang="${esc(nx1.lang)}">${esc(nxTitle)}</span> · ${nxProg}</span></button>`
      : `<button class="__C__ full fb-next" data-nb="${esc(nx1.id)}"><span class="fbn-t">${nextBkLabel(b, nx1)}</span><span class="fbn-m mut sm" dir="auto"><span lang="${esc(nx1.lang)}">${esc(nx1.title)}</span> · ${nxProg}</span></button>`);
  }
  const dueN = db.vocab.filter(isDue).length; /* sama dgn 'N kata siap diulang' di Home */
  const dueBuku = db.vocab.filter(v => isDue(v) && v.lang === b.lang && v.book === b.title).length; /* #2001: N dari buku ini */
  /* #1877: satu ajakan utama berwarna; sisanya tautan teks */
  /* #1991: 2 aksi saja: 1 tombol utama + tautan 'Ke Home'. 'Baca ulang' ada di kartu buku Home/Profil */
  let actsHtml;
  if (dueN) actsHtml = `<button class="pri full" id="fbdue">Ulang ${dueN > 9 ? '9+' : dueN} kata</button>`;
  else if (nx1) actsHtml = acts[0].replace('__C__', 'pri');
  else actsHtml = '<button class="pri full" id="fbadd">Buku baru</button>';
  /* 'Besok': lencana berikutnya yang belum didapat (data BADGES yang sudah ada) */
  const nb = BADGES.find(x => !badgeShown(x[0]));
  let besok = '';
  if (nb) {
    const pr = nb[0] === 'kutubuku' ? badgeProgress('kutubuku') : null, rem = pr ? pr.need - pr.now : 0;
    let apa = pr && rem > 0 && rem <= 5 ? `baca ${rem} halaman` : nb[3].charAt(0).toLowerCase() + nb[3].slice(1), nama = nb[2];
    if (nb[0] in BADGE_VOCAB_MIN) { /* lencana kata: target & sisa sama persis dgn kartu Home */
      const n = countedVocab(null).length, t = wordMile(n), tb = wordMileBadge(t);
      /* #1959: tanpa kata disimpan sesi ini = tanpa ajakan simpan kata; angka hanya dari data nyata (sisa ke target) */
      if (quickPick().length < Q_MIN) { apa = `simpan ${Q_MIN} kata dulu`; nama = ''; } /* #1701/#1771: sama dgn kartu Home q3Lock */
      else if (ws.length && t && tb && t - n > 0 && t - n <= 5) { apa = `simpan ${t - n} kata lagi`; nama = tb[2] + (tb[0].startsWith('koleksi') ? ' kata' : ''); }
      else apa = '';
    }
    if (apa) besok = `<p class="mut sm" id="fbbesok" style="margin:0 0 6px">Besok: ${esc(apa)}${nama ? `, dapat lencana ${esc(nama)}` : ''}</p>`;
  }
  if (!ulang) { sfx('win'); confetti(60); }
  { const ec = $('#endcard'); if (ec) ec.remove(); } /* #1918: kartu di latar tak dobel dgn sheet Tamat */
  openSheet(`<div class="sh-head" style="justify-content:flex-end">${closeBtn}</div>
    <img class="tamat-art" src="img/aset/tamat-buku.svg" alt="" width="160" height="120" decoding="async">
    ${ring ? `<p class="mut sm" style="margin:0 0 6px">${esc(ring)}</p>` : ''}
    <h2>${ws.length ? `${ws.length} kata disimpan dari "${esc(b.title)}"` : 'Tamat! Keren banget'}</h2>
    ${besok}
    ${pahamTxt ? `<p class="mut sm" id="fbpaham">${esc(pahamTxt)}</p>` : ''}
    ${ws.length ? list + (ws.length > 8 ? `<p class="mut sm">+${ws.length - 8} kata lainnya ada di tab Kata.</p>` : '') : (pend ? `<p class="mut">${pend} kata belum disimpan.</p><button class="sec full" id="fbsv">Simpan kata</button>` : total > 0 && !nPaham ? `<p class="mut" id="fbnone">${esc(txtBelumBaru(dueBuku))}</p>` : '<p class="mut">Kamu udah sampai akhir. Tinggal pilih mau lanjut ke mana.</p>')}
    ${total > 0 || dueN ? `<p class="mut sm" id="fbcount" style="margin:6px 0 0">${total > 0 ? `<span>Tersimpan total: <b>${total}</b> kata</span>` : ''}${total > 0 && dueN ? '<br>' : ''}${dueN ? `<span>Siap diulang sekarang: <b>${dueN}</b> kata</span>` : ''}</p>` : ''}
    <div class="fb-acts">${actsHtml}</div>
    <div class="fb-sec fb-end"><button class="lnk" id="fbh">Ke Home</button></div>`, 'Tamat');
  const sv = $('#fbsv'); if (sv) sv.onclick = () => { closeSheet(); setTimeout(() => sessRecap(b), 50); };
  $$('[data-nb]').forEach(el => el.onclick = () => { closeSheet(); db.cur = el.dataset.nb; save(); setTab('baca'); });
  const fa = $('#fbadd'); if (fa) fa.onclick = () => { closeSheet(); setTab('rak'); setTimeout(() => { const a = $('#addBtn'); if (a) a.click(); }, 50); };
  $('#fbh').onclick = () => { closeSheet(); setTab('rak'); };
  const fd = $('#fbdue'); if (fd) fd.onclick = () => { closeSheet(); kataSeg = 'kartu'; setTab('kata'); };
}
/* ---------- Intip kata bab (#638): kartu 3-5 kata baru di awal bab ---------- */
const INTIP_SKIP = ['th']; /* Thai: pemotongan kata belum andal. ja/ko/zh memakai pemotong kata Intl (#658) */
const INTIP_CJK = /^(ja|ko|zh)/;
const INTIP_LATIN = /^(en|id|es|fr|de|it|pt|nl|sv|no|da|fi|pl|tr|ru|uk|cs|ro|hu|vi|ms)/;
function intipCands(b, sp, savedSet) {
  if (INTIP_SKIP.includes(b.lang) || !seg(b.lang, 'word')) return [];
  const cjk = INTIP_CJK.test(b.lang), minLen = INTIP_LATIN.test(b.lang) ? 5 : cjk ? 2 : 3, m = new Map();
  for (const P of sp) {
    if (P.h) continue;
    for (const { s } of P.sents) for (const t of tokens(s, b.lang)) {
      if (!t.w) continue;
      const k = t.t.toLowerCase();
      if ([...k].length < minLen || /^[\p{N}\p{P}]+$/u.test(k) || isKataSampah(b.lang, k, { b })) continue;
      if (cjk && ((/^[\p{Script=Hiragana}ー]+$/u.test(k) && [...k].length < 3) || /^[\p{Script=Latin}]+$/u.test(k))) continue; /* partikel hiragana pendek & huruf latin dilewati */
      const e = m.get(k) || { w: k, lang: b.lang, n: 0, lo: 0, s: s.trim() };
      e.n++; if (t.t === k) e.lo++; m.set(k, e);
    }
  }
  return [...m.values()].filter(e => e.n >= 2 && e.lo >= 1 && !isKataSampah(b.lang, e.w, { b, kenal: true, saved: savedSet }))
    .sort((x, y) => y.n - x.n || [...y.w].length - [...x.w].length).slice(0, 5);
}
/* buang awalan janggal ('Itu disebut ...') dari arti */
function intipArti(t) { return String(t || '').replace(/^\s*(itu|ini)?\s*disebut\s*[:,-]?\s*/i, '').trim(); }
function intipHtml(b, cand) {
  const rows = cand.map((e, i) => { const t = intipArti(cachedTr(e.w, e.lang, db.my)); return `<button class="irow" type="button" data-ik="${i}" aria-label="Simpan kata ${esc(e.w)}"><span class="iw" dir="auto" lang="${esc(e.lang)}">${esc(e.w)}</span><span class="im" data-im="${i}" dir="auto" lang="${esc(db.my)}">${t ? esc(t) : 'Ketuk untuk lihat arti'}</span><span class="ia" aria-hidden="true">${ico('plus')}</span></button>`; }).join('');
  return `<div class="intip" id="intip" role="group" aria-label="Intip kata bab"><div class="ih"><b>Intip kata bab</b><button class="ix" id="intipX" type="button">Lewati</button></div><div class="isub">Ketuk kata untuk menyimpan</div>${rows}</div>`;
}
function intipBind(b, cand) {
  const box = $('#intip'); if (!box) return;
  const st = db.intipN = db.intipN || { o: 0, s: 0 };
  st.o = (st.o || 0) + 1; save();
  const gone = () => !box.isConnected;
  $('#intipX').onclick = () => {
    b.intipOff = 1; st.s = (st.s || 0) + 1; save();
    box.remove(); layout();
  };
  $$('#intip .irow').forEach(btn => btn.onclick = () => {
    const e = cand[+btn.dataset.ik]; if (!e || btn.disabled) return;
    e.lang = b.lang; /* selalu bahasa buku yang sedang dibaca */
    if (db.vocab.some(v => sameVocab(v, e.lang, e.w))) return;
    const c = trCache.get(e.lang + '|' + db.my + '|' + e.w), tp = takeTaps(e.lang, e.w);
    if (isKenal(e.lang, e.w)) setKenal(e.lang, e.w, false);
    untombVocab(e.lang, e.w);
    const nv = { ...(tp > 0 ? { tap: tp } : {}), w: e.w, t: c ? c.text : '', baca: c ? bacaOf(e.w, c.baca) : '', ...(c && c.base ? { base: c.base } : {}), ...(c ? {} : { noTr: 1, nyusul: true }), pos: c && c.dict && c.dict[0] ? c.dict[0].pos : '', lang: e.lang, s: e.s, ctx: ctxOf({ s: e.s }), book: b.title, at: Date.now() };
    db.vocab.unshift(nv); if (!save()) { db.vocab.shift(); return; } award(2, 'save'); vib(10); sfx('ding'); paintSaved(e.lang, e.w, true);
    btn.disabled = true; btn.classList.add('done'); btn.querySelector('.ia').innerHTML = ico('check'); btn.setAttribute('aria-label', 'Kata ' + e.w + ' tersimpan');
    toast('Masuk ke kartu kata kamu', 4000, { label: 'Urungkan', fn: () => {
      const i = db.vocab.indexOf(nv); if (i >= 0) db.vocab.splice(i, 1);
      tombVocab(e.lang, e.w); save(); paintSaved(e.lang, e.w, false);
      if (btn.isConnected) { btn.disabled = false; btn.classList.remove('done'); btn.querySelector('.ia').innerHTML = ico('plus'); btn.setAttribute('aria-label', 'Simpan kata ' + e.w); }
    } }, latihAct(nv));
  });
  /* arti yang belum ada: diambil pelan-pelan setelah jeda, satu per satu, maks 5; offline = tanpa arti */
  (async () => {
    await new Promise(r => setTimeout(r, 1500));
    for (let i = 0; i < cand.length; i++) {
      if (gone()) return;
      const e = cand[i], el = box.querySelector('[data-im="' + i + '"]');
      if (cachedTr(e.w, e.lang, db.my)) continue;
      let t = '';
      for (let k = 0; k < 2 && !t; k++) { /* coba ulang sekali */
        if (gone() || navigator.onLine === false) break;
        try { const r = await translate(e.w, e.lang, db.my); t = intipArti((r && r.text) || cachedTr(e.w, e.lang, db.my)); } catch (x) { t = ''; }
        if (!t && k === 0) await new Promise(r => setTimeout(r, 800));
      }
      if (gone()) return;
      if (el) { if (t) el.textContent = t; else if (navigator.onLine === false) { el.textContent = 'Arti belum tersedia'; el.style.fontSize = '.8em'; } }
      await new Promise(r => setTimeout(r, 500));
    }
  })();
}
async function viewBaca() {
  stopListenPage();
  const b = book();
  if (!b) { $('#view').innerHTML = emptyState('curious', 'Belum ada cerita', 'Tambah cerita dulu, lalu ketuk kata yang bikin penasaran.', 'Tambah cerita', "setTab('rak')"); return; }
  b.opened = Date.now(); const baruBuka = SESS.id !== b.id; if (baruBuka) { SESS.id = b.id; SESS.t = Date.now(); } save();
  if (baruBuka) setTimeout(() => sesiSisa(b), 400);
  const secs = await pagesOf(b);
  await aoLoad(b.id); /* arti offline buku ini siap untuk ketukan kata (#1367) */
  b.pos = Math.max(0, Math.min(b.pos, secs.length - 1));
  document.body.classList.add('reading'); wakeSync();
  if (db.vocab.some(needsArti)) refillVocab();
  if (!rdHist) { rdHist = true; try { history.pushState({ kepo: 'baca' }, ''); } catch (e) { rdHist = false; } }
  if (!db.seenHomeHint) { db.seenHomeHint = true; save(); if (db.seenTip) setTimeout(() => toast('Ketuk tengah layar buat menu & balik ke Home'), 600); }
  const sp = secParas(secs[b.pos], b.lang);
  const head = sp.find(P => P.h);
  const chTitle = head ? head.sents.map(x => x.s).join('').trim() : b.title;
  const savedSet = new Set(db.vocab.filter(v => v.lang === b.lang && v.w).map(v => String(v.w).trim().toLowerCase()));
  gagalSet.clear();
  const kosongSet = new Set(db.vocab.filter(v => v && v.lang === b.lang && v.w && (v.noTr || !String(v.t || '').trim())).map(v => String(v.w).trim().toLowerCase()));
  const hafalSet = new Set(db.vocab.filter(v => v.lang === b.lang && v.w && v.known).map(v => String(v.w).trim().toLowerCase()));
  const kenalOk = w => isKenal(b.lang, w) && !savedSet.has(w.toLowerCase());
  const rtMap = new Map();
  if (rtOf(b.lang) && ['ja', 'ko', 'zh-CN'].includes(b.lang)) for (const v of db.vocab) {
    const r = v.lang === b.lang && bacaOf(v.w, v.baca); if (!r) continue;
    if (rtOf(b.lang) === 2 || +v.tap >= 1 || ((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) >= 1) rtMap.set(v.w.toLowerCase(), r);
  }
  const oftenMemo = new Map();
  const isOften = w => { const k = w.toLowerCase(); if (!oftenMemo.has(k)) oftenMemo.set(k, !isParticle(b.lang, k) && !isUmum(b.lang, k) && tapsOf(b.lang, k) >= 3 && !isNama(b, k)); return oftenMemo.get(k); };
  /* frasa 2-5 kata tersimpan: indeks sekali per render (kata pertama -> daftar frasa). Bahasa tanpa spasi (ja/zh/th) dilewati. */
  const phraseIdx = new Map();
  if (!['ja', 'zh-CN', 'zh-TW', 'th'].includes(b.lang)) for (const v of db.vocab) {
    if (v.lang !== b.lang || v.known || !/\s/.test(String(v.w || '').trim())) continue;
    const pw = tokens(String(v.w).trim(), b.lang).filter(t => t.w).map(t => t.t.toLowerCase());
    if (pw.length < 2 || pw.length > 5) continue;
    if (!phraseIdx.has(pw[0])) phraseIdx.set(pw[0], []);
    phraseIdx.get(pw[0]).push(pw);
  }
  /* tanda baca penutup tak boleh jadi karakter pertama baris: sisipkan U+2060 (lebar nol) di depannya; dilewati untuk RTL */
  const noOrphan = RTL_LANGS.includes(b.lang) ? x => x : x => x.replace(/^[,.;:!?)\]}”’»…、。，！？）]/, '⁠$&');
  const NB_LEAD = /^[,.;:!?)\]}”’»…、。，！？）」』】〕〉》—―–·"']+/, NB_TAIL = /[“‘(\[{«「『【〔〈《¿¡]+$/;
  const wordsHtml = s => {
    const tk = tokens(s, b.lang), inPhrase = new Set();
    if (phraseIdx.size) {
      const wi = []; tk.forEach((t, i) => { if (t.w) wi.push(i); });
      wi.forEach((ti, k) => {
        const list = phraseIdx.get(tk[ti].t.toLowerCase()); if (!list) return;
        for (const pw of list) {
          if (k + pw.length > wi.length) continue;
          if (pw.every((x, j) => tk[wi[k + j]].t.toLowerCase() === x)) for (let j = 0; j < pw.length; j++) inPhrase.add(wi[k + j]);
        }
      });
    }
    /* #1709: kata + tanda baca penutup/pemisah (termasuk "—," dan ".”") dibungkus .nb nowrap; pembuka ikut kata berikutnya; "-" antar kata menyatukan keduanya */
    const wHtml = (t, i) => { const r = rtMap.get(t.t.toLowerCase()), part = isParticle(b.lang, t.t); return `<span role="button" tabindex="-1" class="w${(!part && savedSet.has(t.t.toLowerCase()) && !isPaham(b.lang, t.t)) || inPhrase.has(i) ? ' saved' : ''}${hafalSet.has(t.t.toLowerCase()) ? ' hafal' : ''}${!part && kosongSet.has(t.t.toLowerCase()) ? ' noarti' : ''}${gagalSet.has(gagalKey(b.lang, t.t)) ? ' gagal' : ''}${isOften(t.t) ? ' often' : ''}${!part && kenalOk(t.t) ? ' kenal' : ''}">${r ? `<ruby>${esc(t.t)}<rt data-r="${esc(r)}"></rt></ruby>` : esc(t.t)}</span>`; };
    const rtl = RTL_LANGS.includes(b.lang);
    const noSpace = !rtl && /^(ja|zh|th)/.test(b.lang); /* #1781: tanpa spasi: satu .nb = satu kata + tanda baca menempel */
    /* #1727: ja/zh/th: kata beruntun tak digabung ke satu .nb; .nb hanya kata + tanda baca yang menempel (tercakup logika di bawah) */
    let out = '', buf = '', bufW = false, bufN = 0, join = false;
    /* #1725: tanpa spasi, nowrap hanya satu kata + tanda baca (kalau tidak, satu kalimat jadi blok tak bisa putus) */
    /* #1721: bahasa tanpa spasi (ja/zh/th): dua kata berurutan tanpa pemisah tak boleh jadi satu .nb; isi .nb > 12 karakter tidak di-nowrap */
    const flush = () => { if (buf) out += bufN > 12 ? buf : `<span class="nb">${buf}</span>`; buf = ''; bufW = false; bufN = 0; join = false; };
    tk.forEach((t, i) => {
      /* #1722: ja/zh: tiap kata .nb sendiri supaya bebas putus baris antar kata */
      if (t.w) { if (bufW && (noSpace || !join)) flush(); buf += wHtml(t, i); bufW = true; bufN += t.t.length; join = false; return; }
      const nextW = !!(tk[i + 1] && tk[i + 1].w);
      if (rtl) { flush(); out += esc(t.t); return; }
      if (buf && nextW && /^[-‐‑]$/.test(t.t)) { buf += esc(t.t); bufN++; join = true; return; }
      const lead = (t.t.match(NB_LEAD) || [''])[0];
      if (lead) { if (buf) { buf += esc(lead); bufN += lead.length; } else out += esc(lead); }
      flush();
      let rest = t.t.slice(lead.length), tail = '';
      if (nextW) { const m = rest.match(NB_TAIL); if (m) { tail = m[0]; rest = rest.slice(0, rest.length - tail.length); } }
      out += esc(noOrphan(rest)); buf = tail ? esc(tail) : ''; bufN = tail.length;
    });
    flush();
    return out;
  };
  const firstSi = (sp.flatMap(P => P.sents).find(x => x.i >= 0) || { i: 0 }).i; /* kalimat pertama bab = awal bab */
  let intip = '', intipC = [];
  if (db.intip !== false && !b.intipOff && !(b.si > firstSi) && !RD.toEnd && b.ip !== b.pos) {
    b.ip = b.pos; save();
    intipC = intipCands(b, sp, savedSet);
    if (intipC.length >= 3) intip = intipHtml(b, intipC); else intipC = [];
  }
  const rtlA = RTL_LANGS.includes(b.lang) ? ` dir="rtl" lang="${esc(b.lang)}"` : '';
  const html = sp.map(P => {
    const ss = []; for (const x of P.sents) { const m = ss.length && x.i >= 0 && !RTL_LANGS.includes(b.lang) && x.s.match(NB_LEAD); if (m) { ss[ss.length - 1] = { ...ss[ss.length - 1], s: ss[ss.length - 1].s.replace(/(\s*)$/, m[0] + '$1') }; ss.push({ ...x, s: x.s.slice(m[0].length) }); } else ss.push(x); }
    const inner = ss.filter(x => x.s).map(({ s, i }) => i < 0 ? esc(s) : `<span class="s" data-s="${i}">${wordsHtml(s)}</span>`).join('');
    return P.h ? `<h2 class="ch"${rtlA}>${inner}</h2>` : `<p${rtlA}>${inner}</p>`;
  }).join('');
  const dueN = db.vocab.filter(isDue).length; /* titik pengingat di tombol menu; isDue sama dengan Home */
  const hr = new Date().getHours();
  const nightChip = db.theme === 'paper' && !db.themeSet && !!db.seenTip && (hr >= 19 || hr < 5 || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches)); /* panduan dulu; saran tema malam baru setelah panduan ditutup, tak pernah bersamaan */
  $('#view').innerHTML = `
    <div class="reader${RD.quiet ? '' : ' chrome'}${db.font === 'serif' ? ' serif' : ''}${db.focus ? ' focus' : ''}${db.markOften === false ? ' no-often' : ''}${db.plain ? ' plain' : ''}${db.progBar === false ? ' no-prog' : ''}" id="reader" data-align="${effAlign()}" lang="${esc(b.lang)}" style="--reader-lh:${readLh(b.lang)};--reader-mg:${MG[db.mg] || 24}px${db.spacing === 'w' ? ';--reader-ls:.04em;--reader-ws:.12em' : ''}">
      <button class="icon rback" id="rBack" type="button" aria-label="Kembali ke Home" title="Kembali ke Home">${ico('home')}</button>
      <div class="rbar"><button class="icon" id="rHome" aria-label="Kembali ke Home" title="Kembali ke Home">${ico('home')}</button>
        <div class="rtitle"><b title="${esc(b.title)}" aria-label="${esc(b.title)}">${esc(splitTitle(b.title).main)}</b>${secs.length > 1 ? `<button class="rchap" id="rChap" aria-haspopup="dialog" aria-label="Daftar ${secWord(b, b.pos).toLowerCase()}, sekarang ${secWord(b, b.pos).toLowerCase()} ${b.pos + 1} dari ${secs.length}"><span class="rcf">${secWord(b, b.pos)} ${b.pos + 1} dari ${secs.length}</span><span class="rcs" aria-hidden="true">${secWord(b, b.pos)} ${b.pos + 1}/${secs.length}</span> ▾</button>` : ''}<span class="rmk" id="rMk" role="status"${marksOf(b).length ? '' : ' hidden'}>${ico('bm')}<span id="rMkN">${marksOf(b).length}</span><span class="rmkl"> penanda</span></span><span class="roff" id="roff" role="status"${navigator.onLine ? ' hidden' : ''}>Offline</span></div>
        ${['ja', 'ko', 'zh-CN'].includes(b.lang) ? `<button class="icon rrt${rtOf(b.lang) ? ' on' : ''}" id="rRt" type="button" title="${b.lang === 'zh-CN' ? 'Pinyin' : 'Cara baca'}" aria-pressed="${rtOf(b.lang) ? 'true' : 'false'}" aria-label="${b.lang === 'zh-CN' ? 'Pinyin' : 'Cara baca'}: ${(b.lang === 'zh-CN' ? ['mati, hanzi saja', 'hanya di kata yang kamu ketuk', 'nyala di semua kata'] : ['mati', 'hanya kata baru', 'nyala'])[rtOf(b.lang)]}. Ketuk untuk ganti">${ico('ruby')}<span class="rrtl">${b.lang === 'zh-CN' ? 'Pinyin' : 'Cara baca'}</span></button>` : ''}${'speechSynthesis' in window ? `<button class="icon rlis" id="rLis" type="button" title="Dengar halaman" aria-pressed="false" aria-label="Dengar halaman">${ico('vol')}<span class="rrtl">Dengar</span></button>` : ''}${dueN ? `<button class="icon rrt rdueb" id="rDue" type="button" title="Ulang ${dueN > 9 ? '9+' : dueN} kata${dueNote(b.lang)}" aria-label="Ulang ${dueN > 9 ? '9+' : dueN} kata${dueNote(b.lang)}. ${dueN} kata siap diulang">${ico('cards')}<span class="rrtl">Ulang ${dueN > 9 ? '9+' : dueN} kata</span></button>` : ''}<button class="icon rrt" id="rMore" type="button" aria-haspopup="dialog" title="Menu lainnya" aria-label="Menu lainnya">${ico('more')}<span class="rrtl">Lainnya</span></button></div>
      ${nightChip ? `<div class="nchip" id="nchip" role="note"><span>${ico('moon')} Mata capek? Pakai tema malam</span><button data-t="night">Malam</button><button class="nx" data-t="" aria-label="Tutup saran tema">${ico('x')}</button></div>` : ''}
      ${['ja', 'ko', 'zh-CN'].includes(b.lang) ? '<div class="lisnote" id="lisNote" role="note" hidden>Suara bisa meleset di kanji</div>' : ''}
      <div class="rhead" title="${esc(b.title)}">${esc(b.title)}</div>
      <div class="vp" id="vp"><div class="page cols" id="cols" style="font-size:${readFs(b.lang)}px">${intip}${html}</div></div>
      ${guideOn(b) ? `<div class="rtip gtip" id="gtip" role="note"><span>${ico('pointer')}<span class="rtt">Ketuk kata yang menyala</span></span><button id="gskip" type="button" aria-label="Lewati petunjuk">Lewati</button></div>` : tipOn() ? `<div class="rtip" id="tip" role="note"><span>${ico('pointer')}<span class="rtt">${TIPS[tipStepNow()]}</span></span><button id="tipx" aria-label="Paham, tutup petunjuk">Paham</button></div>` : ''}
      <div class="rfoot"><button class="pg" id="pv" aria-label="Halaman sebelumnya" title="Halaman sebelumnya">${ico('left')}</button>
        <div class="rmid"><span id="pgn"></span><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Posisi baca"><i id="pbar"></i></div></div>
        <button class="icon rmark" id="rMark" type="button" aria-pressed="false" aria-label="Tandai halaman ini" title="Tandai halaman ini">${ico('bm')}</button>
        <button class="rmenu" id="rMenuBtn" type="button" aria-label="Menu baca: tampilkan atau sembunyikan bilah atas">Menu</button>
        <button class="pg" id="nx" aria-label="Halaman berikutnya">${ico('right')}</button></div>
    </div>`;
  tipN = 0; tipDone = false; nudgePg = new Set();
  if (guideOn(b)) { tipDone = true; guideMark(b); if ($('#gskip')) $('#gskip').onclick = () => guideEnd('skip'); }
  if (tipStepNow() > 0 && (!$('#toast').classList.contains('hide') || $('#nchip'))) { tipDone = true; const t = $('#tip'); if (t) t.remove(); } /* tak bareng toast/chip; dicoba lagi kunjungan berikut */
  if (tipOn()) setTimeout(dismissTip, 12000); /* hilang sendiri ±12 dtk, dianggap sudah dilihat */
  if ($('#tipx')) $('#tipx').onclick = () => dismissTip();
  $('#rHome').onclick = () => leaveBaca();
  $('#rBack').onclick = () => leaveBaca();
  $('#rMenuBtn').onclick = () => toggleMenu(true);
  $('#rMark').onclick = e => { e.stopPropagation(); toggleMark(); };
  $('#reader').addEventListener('click', e => { if (e.target.id === 'reader' || e.target.closest('.rhead')) toggleMenu(true); });
  $('#reader').addEventListener('pointerdown', () => { if (menuT) menuHold(); }, true);
  if ($('#rDue')) $('#rDue').onclick = () => { stopListenPage(); const bk = book(); if (bk && RD && RD.n && RD.page != null && bk.total) { bk.pct = readPct(bk); save(); } kataSeg = 'kartu'; setTab('kata'); };
  if ($('#rLis')) $('#rLis').onclick = () => { if (LIS.on) pauseListenPage(); else startListenPage(); };
  $$('#nchip button').forEach(x => x.onclick = () => { if (x.dataset.t) { db.theme = x.dataset.t; applyTheme(); } db.themeSet = true; save(); $('#nchip').remove(); layout(); });
  if ($('#rRt')) $('#rRt').onclick = () => {
    if (b.lang === 'zh-CN') {
      const urut = [2, 1, 0]; /* Nyala -> Baru -> Mati -> Nyala */
      const k = urut[(urut.indexOf(rtOf(b.lang)) + 1) % 3];
      setRt(b.lang, k); viewBaca();
      toast(k === 0 ? 'Hanzi saja. Nyalakan lagi ' + (window.matchMedia && matchMedia('(max-width:430px)').matches ? 'lewat Lainnya > Pinyin' : 'di tombol Pinyin') : k === 1 ? 'Pinyin hanya di kata yang kamu ketuk, sisanya hanzi polos' : 'Pinyin di semua kata: 你好 nǐ hǎo');
      return;
    }
    setRt(b.lang, rtOf(b.lang) ? 0 : 1); viewBaca();
    const any = db.vocab.some(v => v.lang === b.lang && bacaOf(v.w, v.baca) && (+v.tap >= 1 || ((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) >= 1));
    toast(!db.rt ? 'Cara baca mati' : any ? 'Cara baca nyala' : 'Cara baca muncul untuk kata yang sudah kamu ketuk');
  };
  const hpKecil = window.matchMedia && matchMedia('(max-width:430px)').matches; /* #1875: tombol #rRt tersembunyi di HP, ada di sheet Lainnya */
  if (b.lang === 'zh-CN' && !db.rtSet && db.rtLang['zh-CN'] == null && rtAsked !== b.id) {
    rtAsked = b.id;
    openSheet(`<h2>Mau pinyin di atas kata?</h2><p class="muted">Bisa diganti kapan saja ${hpKecil ? 'lewat Lainnya, lalu pilih Pinyin.' : 'lewat tombol Pinyin di atas.'}</p><div class="rtq"><button class="btn" data-q="2">Nyala<small>Pinyin di semua kata. Paling gampang dibaca.</small></button><button class="btn ghost" data-q="1">Hanya kata baru<small>Pinyin hanya di kata yang kamu ketuk. Melatih mata baca hanzi.</small></button><button class="btn ghost" data-q="0">Mati<small>Hanzi saja, tanpa pinyin.</small></button></div>`, 'Mau pinyin?');
    $$('#sheetBody [data-q]').forEach(x => x.onclick = () => { setRt('zh-CN', +x.dataset.q); closeSheet(); viewBaca(); });
  }
  if (['ja', 'ko', 'zh-CN'].includes(b.lang) && !rtOf(b.lang) && !b.doneAt && !db.rtHint[b.lang]) { /* #1789: petunjuk sekali per bahasa */
    db.rtHint[b.lang] = 1; save();
    const nm = b.lang === 'zh-CN' ? 'Pinyin' : 'Cara baca';
    toast(`Mau ${nm.toLowerCase()}? ` + (hpKecil ? `Buka Lainnya, lalu pilih ${nm}.` : `Ketuk tombol ${nm} di atas.`), 4000);
  }
  setTimeout(() => { if ($('#reader') && db.cur === b.id) autoOff(b); }, 3000);
  $('#rMore').onclick = () => openMore();
  const openMore = () => {
    const sl = () => db.ttsRate === 'slow' ? 'Lambat' : 'Normal';
    const arti0 = [...new Set($$('.cols .w.noarti').map(x => x.textContent.trim().toLowerCase()).filter(Boolean))];
    openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Lainnya</span>${closeBtn}</div><div class="chlist rmore">
      <button class="chi" id="rmSet">${ico('sliders')}<span>Pengaturan baca</span></button>
      ${['ja', 'ko', 'zh-CN'].includes(b.lang) ? `<button class="chi rmob" id="rmRt">${ico('ruby')}<span>${b.lang === 'zh-CN' ? 'Pinyin' : 'Cara baca'}</span><b class="rst">${['Mati', 'Kata baru', 'Nyala'][rtOf(b.lang)]}</b></button>` : ''}${'speechSynthesis' in window ? `<button class="chi rmob" id="rmLis">${ico('vol')}<span>Dengar halaman</span><b class="rst">${LIS.on ? 'Nyala' : 'Mati'}</b></button>` : ''}
      ${db.aiJelas === false ? '' : `<button class="chi" id="rmAi">${ico('chat')}<span>Sederhanakan halaman (AI)</span></button>`}
      ${dueN ? `<button class="chi rmob" id="rmDue" aria-label="Ulang ${dueN > 9 ? '9+' : dueN} kata sekarang. ${dueN} kata siap diulang">${ico('cards')}<span>Ulang ${dueN > 9 ? '9+' : dueN} kata sekarang</span></button>` : ''}
      ${arti0.length >= 2 && navigator.onLine !== false ? `<button class="chi" id="rmArti">${ico('cards')}<span>Muat ulang arti (${arti0.length})</span></button>` : ''}
      <button class="chi" id="rmFb">${ico('chat')}<span>Kirim masukan</span></button>
      ${'speechSynthesis' in window ? `<button class="chi" id="rmRate">${ico('slow')}<span>Laju suara: <b id="rmRateV">${sl()}</b></span></button>` : ''}</div>`, 'Menu lainnya');
    if ($('#rmRt')) $('#rmRt').onclick = () => { closeSheet(); $('#rRt').click(); };
    if ($('#rmDue')) $('#rmDue').onclick = () => { closeSheet(); $('#rDue').click(); };
    if ($('#rmLis')) $('#rmLis').onclick = () => { closeSheet(); $('#rLis').click(); };
    $('#rmSet').onclick = () => { closeSheet(); openSettings(); };
    $('#rmFb').onclick = () => { closeSheet(); openFeedback(); };
    if ($('#rmArti')) $('#rmArti').onclick = () => { closeSheet(); muatUlangArti(b, arti0); };
    if ($('#rmAi')) $('#rmAi').onclick = () => openSimplify(b);
    if ($('#rmRate')) $('#rmRate').onclick = () => { db.ttsRate = db.ttsRate === 'slow' ? 'normal' : 'slow'; save(); $('#rmRateV').textContent = sl(); if (LIS.on && LIS.cur) startListenPage(true); };
  };
  if ($('#rChap')) $('#rChap').onclick = () => {
    const items = secs.map((s, i) => {
      const h = secParas(s, b.lang).find(P => P.h);
      const t = h ? h.sents.map(x => x.s).join('').trim() : '';
      return `<button class="chi${i === b.pos ? ' on' : ''}" data-ch="${i}"${i === b.pos ? ' aria-current="true"' : ''}><em>${i + 1}</em><span>${esc(t || (secWord(b, i) + ' ' + (i + 1)))/* tanpa judul = Bagian; berjudul bab = judulnya sendiri */}</span>${i === b.pos ? '<b>Sekarang</b>' : ''}</button>`;
    }).join('');
    openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Daftar ${secWord(b, b.pos).toLowerCase()}</span>${closeBtn}</div>${prepHtml()}<div class="chlist">${items}</div>`, 'Daftar ' + secWord(b, b.pos).toLowerCase());
    bindPrep(b, secs[b.pos]);
    $$('#sheet .chi').forEach(x => x.onclick = () => { const i = +x.dataset.ch; closeSheet(); if (i !== b.pos) { b.pos = i; b.si = 0; RD.quiet = true; save(); viewBaca(); } });
    const cur = $('#sheet .chi.on'); if (cur) cur.scrollIntoView({ block: 'center' });
  };
  $('#pv').onclick = () => turn(-1); $('#nx').onclick = () => { const bk = book(); if ($('#nx').dataset.baca && bk) { restartBook(bk); viewBaca(); } else if ($('#nx').dataset.ulang && bk) setTab('rak'); else turn(1); };
  const vp = $('#vp'); let tx = null, moved = false;
  let lpT, lpT2, lpEl = null, lpDone = false;
  const lpStop = () => { clearTimeout(lpT); clearTimeout(lpT2); lpT = 0; if (lpEl) { lpEl.classList.remove('press'); lpEl = null; } };
  vp.addEventListener('touchstart', e => {
    const t = e.touches[0]; tx = [t.clientX, t.clientY]; moved = false; lpDone = false; lpStop(); setCur(e.target);
    if (e.target.closest && e.target.closest('.w,.s')) stopListenPage();
    const sEl = e.touches.length === 1 && e.target.closest ? e.target.closest('.s') : null;
    if (!sEl || sEl.closest('h2')) return;
    lpT2 = setTimeout(() => { lpEl = sEl; sEl.classList.add('press'); }, 180);
    lpT = setTimeout(() => {
      lpDone = true; moved = true; tx = null; lpStop();
      try { getSelection().removeAllRanges(); } catch (_) {}
      vib(12); sfx('pop');
      $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
      showSentence('', sEl.textContent.trim(), +sEl.dataset.s, sEl); award(1, 'look');
    }, 450);
  }, { passive: true });
  vp.addEventListener('touchmove', e => { if (!tx || !lpT) return; const t = e.touches[0]; if (Math.hypot(t.clientX - tx[0], t.clientY - tx[1]) > 8) lpStop(); }, { passive: true });
  vp.addEventListener('touchcancel', lpStop);
  vp.addEventListener('contextmenu', e => { if (lpDone) e.preventDefault(); });
  vp.addEventListener('touchend', e => {
    lpStop(); if (lpDone) { e.preventDefault(); return; }
    if (!tx) return; const t = e.changedTouches[0], dx = t.clientX - tx[0], dy = t.clientY - tx[1]; tx = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) { moved = true; turn(dx < 0 ? 1 : -1); }
    if (moved) setTimeout(() => { moved = false; }, 400); // klik susulan tak datang -> jangan telan ketukan berikutnya
  });
  vp.addEventListener('keydown', rovKey);
  vp.onclick = e => {
    if (moved) { moved = false; return; }
    setCur(e.target);
    if (e.target.closest('.intip')) return;
    let w = e.target.closest('.w');
    if (!w && !e.target.closest('button,a,input,.intip') && e.clientX) w = nearWord(vp, e.clientX, e.clientY);
    if (e.target.closest('.itr')) { if (!e.target.closest('button')) closeInline(); return; }
    { /* ketuk dua kali satu kalimat = terjemahan di tempat (#907) */
      const sx = (w || e.target.closest('.s')); const s1 = sx && sx.closest ? sx.closest('.s') : null, now = Date.now();
      if (s1 && !s1.closest('h2')) {
        if (RD.dt && RD.dt.el === s1 && now - RD.dt.t < 380) { RD.dt = null; dismissTip(); nudgeOff(); stopListenPage(); toggleInline(s1); return; }
        RD.dt = { el: s1, t: now };
      } else RD.dt = null;
    }
    if (w) { if (guideLive) guideEnd('tap'); dismissTip(); nudgeOff(); RD.tapX = e.detail ? e.clientX : null; stopListenPage(); vib(8); sfx('pop'); onWord(w).catch(() => toast('Arti kata belum bisa dibuka. Ketuk lagi ya.')); return; }
    const r = vp.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
    const te = db.tapEdge !== false;
    if (te && x < 0.15) turn(-1); else if (te && x > 0.85) turn(1); else toggleMenu(false);
  };
  RD.quiet = false;
  if (intipC.length) intipBind(b, intipC);
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if ($('#cols')) layout(); });
  /* ukuran area baca berubah setelah layout pertama: hitung ulang halaman */
  if (window.ResizeObserver) {
    if (RD.ro) RD.ro.disconnect();
    let lw = vp.clientWidth, lh = vp.clientHeight;
    RD.ro = new ResizeObserver(() => { const w = vp.clientWidth, h = vp.clientHeight; if (w === lw && h === lh) return; lw = w; lh = h; if (vp.isConnected && $('#cols')) layout(); });
    RD.ro.observe(vp);
  }
  if (LIS.chain) { LIS.chain = false; startListenPage(); }
}
/* Dengar halaman: putar kalimat halaman aktif satu per satu, sorot yang sedang dibaca */
/* Tiga keadaan: Mulai / Jeda / Lanjut. Jeda lanjut dari kalimat terakhir; di ujung halaman pindah sendiri ke halaman/bab berikut */
const LIS = { on: false, paused: false, id: 0, si: null, cur: null, chain: false };
function lisUi() {
  const bt = $('#rLis'), act = LIS.on || LIS.paused;
  if (bt) {
    bt.classList.toggle('on', LIS.on); bt.setAttribute('aria-pressed', LIS.on ? 'true' : 'false');
    bt.setAttribute('aria-label', LIS.on ? 'Jeda dengar' : LIS.paused ? 'Lanjut dengar' : 'Dengar halaman');
    bt.innerHTML = ico(LIS.on ? 'pause' : LIS.paused ? 'play' : 'vol') + `<span class="rrtl">${LIS.on ? 'Jeda' : LIS.paused ? 'Lanjut' : 'Dengar'}</span>`;
  }
  const n = $('#lisNote'); if (n) n.hidden = !act;
}
const lisClear = () => $$('.cols .s.say').forEach(x => x.classList.remove('say'));
function stopListenPage() {
  if (!LIS.on && !LIS.paused) return;
  LIS.on = false; LIS.paused = false; LIS.si = null; LIS.cur = null; LIS.id++; stopSpeak();
  lisClear(); lisUi();
}
function pauseListenPage(quiet) {
  if (!LIS.on) return;
  LIS.on = false; LIS.paused = true; LIS.id++; stopSpeak();
  if (LIS.cur) LIS.si = +LIS.cur.dataset.s;
  if (quiet) lisClear();
  lisUi();
}
/* Sederhanakan halaman (AI): hanya saat diminta; satu kartu per paragraf halaman, jatah harian sama dengan Jelaskan kalimat */
function openSimplify(b) {
  const LIM = 600;
  /* kelompokkan kalimat halaman ini per paragraf (<p>/<h2>); tanpa penanda: ±3 kalimat */
  const groups = [], seen = new Map(); let loose = null;
  (RD.ss || []).filter(x => x.pg === RD.page).forEach(x => {
    const t = x.el.textContent.replace(/\u0001/g, '').replace(/\s+/g, ' ').trim(); if (!t) return;
    const p = x.el.closest && x.el.closest('p,h2');
    if (p) { loose = null; let g = seen.get(p); if (!g) { g = []; seen.set(p, g); groups.push(g); } g.push(t); }
    else { if (!loose || loose.length >= 3) { loose = []; groups.push(loose); } loose.push(t); }
  });
  const paras = groups.map(g => g.join(' ').trim()).filter(t => t.length >= 15).map(full => {
    let txt = full, cut = false;
    if (full.length > LIM) {
      cut = true; txt = full.slice(0, LIM);
      const k = Math.max(txt.lastIndexOf('. '), txt.lastIndexOf('! '), txt.lastIndexOf('? '), txt.lastIndexOf('。'), txt.lastIndexOf('！'), txt.lastIndexOf('？'));
      if (k > 40) txt = txt.slice(0, k + 1);
    }
    return { full, txt, cut };
  });
  const devId = () => { let d = localStorage.getItem('kepo.dev'); if (!d) { d = Array.from(crypto.getRandomValues(new Uint8Array(12)), x => x.toString(16).padStart(2, '0')).join(''); localStorage.setItem('kepo.dev', d); } return d; };
  const prev = t => { const s = t.length > 70 ? t.slice(0, 70).replace(/\s+\S*$/, '') + '…' : t; return esc(s); };
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Sederhanakan halaman</span>${closeBtn}</div>
    <div class="mut sm">AI jelasin tiap paragraf halaman ini dengan bahasa lebih sederhana. Teks bacamu nggak berubah.</div>
    <div class="aij-q mut sm" id="sgq">Satu paragraf = satu jatah AI harian, sama dengan Jelaskan kalimat</div>
    <div class="sg-list" id="sglist" style="max-height:48vh;overflow-y:auto;margin-top:8px">${paras.length ? paras.map((p, i) => `<div class="aij" data-i="${i}" style="margin-bottom:10px"><div class="sm"><b>${i + 1}.</b> <span lang="${esc(b.lang)}">${prev(p.full)}</span></div><button class="ghost sgbtn" type="button">Jelaskan paragraf ini</button><div class="sgout" aria-live="polite"></div></div>`).join('') : '<div class="ttsnote">Halaman ini belum ada teksnya.</div>'}</div>
    <div class="row" style="margin-top:10px"><button class="sec" data-close>Lanjut baca</button></div>`, 'Sederhanakan halaman');
  const qEl = $('#sgq'), list = $('#sglist');
  let habis = false;
  const setQ = (n, j) => { if (!qEl.isConnected) return; n = Number(n); j = Number(j);
    if (n <= 0) { habis = true; list.querySelectorAll('.sgbtn').forEach(x => { if (!x.dataset.done) x.disabled = true; }); }
    qEl.textContent = n <= 0 ? 'Jatah AI hari ini habis. Balik lagi besok ya.' : j > 100 || n > 100 ? 'Jatah AI hari ini: aman' : j >= n ? `Sisa jatah AI hari ini: ${n} dari ${j}` : `Sisa jatah AI hari ini: ${n}`; };
  /* pecah jawaban jadi Intinya (maks 2 kalimat) + Kata penting (maks 3); buang Struktur/Nuansa & istilah tata bahasa */
  const GR = /\b(verba|obyek|objek|subjek|kala|predikat|kata kerja|kata benda)\b/i;
  const parse = t => {
    const lines = String(t || '').split(/\n+/).map(x => x.trim()).filter(x => x && !/^\W*(struktur|nuansa)\s*:/i.test(x));
    const inti = [], kata = []; let mode = 'i';
    for (let l of lines) {
      const m = l.match(/^\W*(intinya|arti|kata\s+(?:yang\s+perlu\s+kamu\s+tahu|penting))\s*:?\s*(.*)$/i);
      if (m) { mode = /^kata/i.test(m[1]) ? 'k' : 'i'; l = m[2].trim(); if (!l) continue; }
      if (mode === 'k') { l = l.replace(/^[-•*\d.)\s]+/, '').trim(); if (l && !GR.test(l)) kata.push(l); }
      else inti.push(l);
    }
    const sents = inti.join(' ').match(/[^.!?。！？]+[.!?。！？]*/g) || [];
    return { inti: sents.map(x => x.trim()).filter(x => x && !GR.test(x)).slice(0, 2).join(' '), kata: kata.slice(0, 3) };
  };
  const msg = (out, t) => { if (out.isConnected) out.innerHTML = `<div class="ttsnote">${esc(t)}</div>`; };
  const show = (out, p, r) => {
    const P = parse(r.teks);
    out.innerHTML = `<div class="aij-box"><div class="aij-lbl">Penjelasan AI, bisa meleset</div><div class="aij-t" lang="${esc(db.my)}"><b>Intinya</b><p></p>${P.kata.length ? '<b>Kata yang perlu kamu tahu</b><ul></ul>' : ''}</div>${p.cut ? '<div class="aij-lbl">Paragraf panjang, baru bagian awalnya yang dijelaskan.</div>' : ''}<button class="ghost aij-rep" type="button">Lapor kalau salah</button></div>`;
    out.querySelector('.aij-t p').textContent = P.inti || 'Belum ada ringkasan. Coba lagi ya.';
    const ul = out.querySelector('.aij-t ul'); if (ul) P.kata.forEach(k => { const li = document.createElement('li'); li.textContent = k; ul.appendChild(li); });
    const rep = out.querySelector('.aij-rep');
    rep.onclick = () => { rep.disabled = true; api('/jelaskan/lapor', { method: 'POST', body: { dev: devId(), sent: p.txt, lang: b.lang, teks: r.teks } }).then(() => { rep.textContent = 'Makasih, laporannya masuk'; }).catch(() => { rep.disabled = false; rep.textContent = 'Gagal kirim, coba lagi'; }); };
  };
  paras.forEach((p, i) => {
    const card = list.querySelector(`[data-i="${i}"]`); if (!card) return;
    const btn = card.querySelector('.sgbtn'), out = card.querySelector('.sgout');
    btn.onclick = async () => {
      if (p.res) { btn.hidden = true; return show(out, p, p.res); } /* sudah pernah dijelaskan: tanpa potong jatah */
      if (typeof api !== 'function') return msg(out, 'Fitur ini belum siap. Lanjut baca aja dulu.');
      if (!navigator.onLine) return msg(out, 'Lagi offline. Penjelasan AI butuh sinyal.');
      btn.disabled = true; out.innerHTML = '<span class="loading">AI lagi mikir…</span>';
      try {
        const r = await api('/jelaskan', { method: 'POST', body: { dev: devId(), sent: p.txt, lang: b.lang, arti: '', mode: 'halaman' } });
        if (!out.isConnected) return;
        p.res = r; btn.dataset.done = '1'; btn.hidden = true;
        setQ(r.sisa, r.jatah); show(out, p, r);
      } catch (e) {
        if (!out.isConnected) return;
        if (/habis/i.test(e.message)) { setQ(0); out.innerHTML = ''; } else { msg(out, e.message); btn.disabled = habis; }
      }
    };
  });
}
function startListenPage(restart) {
  const b = book(); if (!b || !RD.ss) return;
  const q = RD.ss.filter(x => x.pg === RD.page).map(x => x.el).filter(el => el.textContent.trim());
  if (!q.length) return toast('Nggak ada teks di halaman ini');
  let i = 0;
  if (restart && LIS.cur) i = Math.max(0, q.indexOf(LIS.cur));
  else if (LIS.paused && LIS.si != null) { const k = q.findIndex(el => +el.dataset.s >= LIS.si); if (k >= 0) i = k; }
  const id = ++LIS.id; LIS.on = true; LIS.paused = false; lisUi();
  const next = () => {
    if (!LIS.on || LIS.id !== id) return;
    lisClear();
    if (i >= q.length) return lisAdvance();
    const el = LIS.cur = q[i++]; LIS.si = +el.dataset.s; el.classList.add('say');
    speak(el.textContent.replace(/\u0001/g, '').trim(), b.lang, 0.9, { end: next, fail: () => { if (LIS.id === id) stopListenPage(); } });
  };
  next();
}
/* ujung halaman: lanjut ke halaman berikut, lalu bab berikut; berhenti di akhir buku */
function lisAdvance() {
  const b = book(); if (!b) return stopListenPage();
  LIS.si = null; LIS.cur = null; LIS.paused = false;
  if (!db.lisAuto) return stopListenPage();
  if (RD.page < RD.n - 1) {
    const id = ++LIS.id; stopSpeak(); showPage(RD.page + 1); if (!menuT) $('#reader').classList.remove('chrome'); else menuHold();
    /* tunggu halaman benar-benar berpindah dulu, baru ucapan mulai */
    setTimeout(() => { if (LIS.on && LIS.id === id && $('#cols')) startListenPage(); }, 400);
    return;
  }
  stopListenPage(); toast('Selesai didengar');
}
document.addEventListener('visibilitychange', () => { if (document.hidden && LIS.on) { pauseListenPage(true); toast('Dengar dijeda'); } });
const MG = { s: 12, m: 24, l: 48 };
const setCur = el => { const c = $('#cols'), r = $('#reader'), p = el && el.closest ? el.closest('p,h2') : null; if (!c || !r || !r.classList.contains('focus') || !p) return; $$('.cols .cur').forEach(x => x !== p && x.classList.remove('cur')); p.classList.add('cur'); c.classList.add('has-cur'); };
const SESPG = new Set(); /* halaman layar yang dibuka sesi ini (satuan sama dengan bar baca) */
const RD = { ss: [], hs: [], dy: 0, page: 0, n: 1, step: 1, toEnd: false, quiet: false };
function layout() {
  const vp = $('#vp'), cols = $('#cols'); if (!vp || !cols) return;
  closeInline();
  const b = book(); let W = vp.clientWidth, H = vp.clientHeight;
  /* ukuran nyaris sama (bar alamat Safari naik-turun, bar muncul-hilang): pakai ukuran layout terakhir agar total halaman stabil */
  if (RD.cEl === cols && RD.lw && Math.abs(W - RD.lw) <= 2 && Math.abs(H - RD.lh) <= 140) { W = RD.lw; H = RD.lh; }
  RD.lw = W; RD.lh = H;
  const rd = $('#reader'), sig = [W, H, cols.style.fontSize, rd && rd.style.getPropertyValue('--reader-lh'), rd && rd.style.getPropertyValue('--reader-mg'), rd && rd.classList.contains('serif')].join('|');
  const same = sig === RD.sig && RD.cEl === cols && RD.cLen === cols.textContent.length && RD.ss && RD.ss.length && RD.n > 0 && RD.flash == null && !RD.toEnd;
  if (same) return; /* ukuran/font sama & isi sama: total halaman jangan dihitung ulang */
  RD.cEl = cols; RD.cLen = cols.textContent.length;
  if (sig !== RD.sig) { RD.sig = sig; stopListenPage(); }
  const G = 64, per = W >= 900 && (W - G) / 2 >= 360 ? 2 : 1, cw = (W - (per - 1) * G) / per;
  vp.classList.toggle('two', per === 2);
  /* tinggi kolom dibulatkan ke kelipatan tinggi baris: tak ada baris separuh nongol di tepi bawah/atas (JP/KR + ruby) */
  const lhPx = parseFloat(getComputedStyle(cols).lineHeight) || (parseFloat(cols.style.fontSize) || 17) * (parseFloat(rd && rd.style.getPropertyValue('--reader-lh')) || 1.6);
  const CH = lhPx >= 10 && H > lhPx * 3 ? Math.floor(H / lhPx) * lhPx : H;
  Object.assign(cols.style, { height: CH + 'px', width: W + 'px', columnWidth: cw + 'px', columnGap: G + 'px', transition: 'none', transform: 'none' });
  const total = Math.max(1, Math.round((cols.scrollWidth + G) / (cw + G)));
  RD.step = W + G; RD.n = Math.max(1, Math.ceil(total / per));
  /* cache halaman tiap kalimat/judul + sisa unit baca per halaman: dihitung sekali per layout, geser halaman cukup membaca array */
  RD.ss = [...cols.querySelectorAll('.s')].map(el => ({ el, pg: pageOf(el, cols) }));
  RD.hs = [...cols.querySelectorAll('h2.ch')].map(el => ({ el, pg: pageOf(el, cols) }));
  /* #1941: kolom kosong di ujung (sisa margin) bukan halaman: N = halaman terakhir yang berisi teks */
  { const lp = Math.max(-1, ...RD.ss.map(y => y.pg), ...RD.hs.map(y => y.pg)); if (lp >= 0 && lp + 1 < RD.n) RD.n = lp + 1; }
  const suf = new Array(RD.ss.length + 1).fill(0);
  for (let i = RD.ss.length - 1; i >= 0; i--) suf[i] = suf[i + 1] + unitsOf(RD.ss[i].el.textContent, b.lang);
  RD.left = []; let j = RD.ss.length;
  for (let q = RD.n - 1; q >= 0; q--) { while (j > 0 && RD.ss[j - 1].pg >= q) j--; RD.left[q] = suf[j]; }
  let p = 0;
  if (RD.toEnd) p = RD.n - 1;
  else {
    const k = RD.ss.findIndex(y => +y.el.dataset.s === (b.si || 0)), x = RD.ss[k];
    if (x) p = x.pg;
    /* halaman tersimpan dipakai hanya bila jumlah halaman sama & masih cocok dgn kalimat tersimpan (anti data basi) */
    if (x && RD.flash == null && b.pgN === RD.n && Number.isInteger(b.pg) && b.pg >= x.pg && b.pg < RD.n && !(RD.ss[k + 1] && RD.ss[k + 1].pg <= b.pg)) p = b.pg;
  }
  const resumed = !RD.toEnd && RD.flash == null && cols._chip !== true && ((b.pos || 0) > 0 || (b.si || 0) > 0 || p > 0);
  RD.toEnd = false; RD.dy = 0;
  showPage(p, false);
  if (resumed) { cols._chip = true; if (!(b.doneAt || pctOf(b) >= 100 || p >= RD.n - 1 || (b.pos || 0) >= (b.total || 1) - 1)) resumeChip(b); } /* #1742: bukan di akhir buku */ /* buku tamat: tanpa chip 'Lanjut' (#1304) */
  if (RD.flash != null) { const fx = RD.ss.find(y => +y.el.dataset.s === RD.flash); RD.flash = null; if (fx) { fx.el.classList.add('hl'); setTimeout(() => fx.el.classList.remove('hl'), 2500); } }
}
/* chip 'Lanjut dari Bagian N' (satuan sama dgn bilah baca) ±4 dtk setelah posisi dipulihkan; ketuk = tawarkan penanda terakhir (bila ada) */
let chipT = 0;
function resumeChip(b) {
  clearTimeout(chipT); const old = $('#rchip'); if (old) old.remove();
  const rd = $('#reader'), ft = $('.rfoot'); if (!rd || !ft) return;
  const el = document.createElement('button'); el.type = 'button'; el.id = 'rchip'; el.className = 'rchip';
  const gone = () => { clearTimeout(chipT); el.remove(); };
  let offer = false;
  el.textContent = (b.total || 1) > 1 ? `Lanjut dari ${secWord(b, b.pos)} ${Math.min(b.pos + 1, b.total)}` : 'Lanjut baca';
  el.onclick = e => {
    e.stopPropagation();
    const m = nearMark(b);
    if (!offer && m) { offer = true; el.textContent = 'Dari penanda terakhir'; clearTimeout(chipT); chipT = setTimeout(gone, 4000); return; }
    gone();
    if (offer && m) { b.pos = Math.max(0, Math.min(m.p, (b.total || 1) - 1)); b.si = m.s; b.pg = null; b.frac = null; RD.quiet = true; save(); setTab('baca'); }
  };
  rd.insertBefore(el, ft); chipT = setTimeout(gone, 4000);
}
function pageOf(el, cols) { const r = el.getClientRects()[0] || el.getBoundingClientRect(); return Math.max(0, Math.min(RD.n - 1, Math.floor((r.left - cols.getBoundingClientRect().left + 2) / RD.step))); }
/* sisa waktu baca dari jumlah kata/huruf teks tersimpan (tanpa ukur layar).
   Kecepatan awal: Latin 130 kata/mnt; Jepang/Korea/Mandarin 160 huruf/mnt. Total per bab dihitung sekali per buku.
   Hasil unitsOf = menit pada kecepatan awal; kecepatan pribadi mengalikannya lewat spdFactor (#833). */
const unitsOf = (t, lang) => {
  t = t.replace(/\u0001/g, '');
  return /^(ja|ko|zh)/.test(lang) ? t.replace(/\s/g, '').length / 160 : (t.trim() ? t.trim().split(/\s+/).length : 0) / 130;
};
/* kartu 'Lanjut baca' di Beranda: posisi + sisa menit (nomor halaman asli baru ada setelah layout, jadi pakai bab) */
/* SATU sumber angka progres (Beranda, bar baca, catatan sesi): persen hanya bila sudah ada;
   jumlah bab dianggap siap hanya bila sudah dihitung (units cocok dgn total), supaya tak muncul 'Bab 1 dari 1' lalu loncat */
function progInfo(b) {
  const bab = Array.isArray(b.units) && (b.total || 0) > 0 && b.units.length === b.total;
  const has = b.pct != null || (b.total || 0) > 0;
  const pct = has ? pctOf(b) : null;
  return { pct, done: pct != null && pct >= 100, bab, pos: (b.pos || 0) + 1, total: b.total || 0 };
}
const nw = t => `<span class="nw">${esc(t)}</span>`;
/* label bagian SATU sumber (bar baca + Beranda): 'Bagian', bukan 'Bab', supaya tak bentrok dgn nomor bab di buku; bagian awal tanpa judul = 'Awal buku' */
/* #770: 'Bab' bila bagian itu diawali judul bab terdeteksi (六、 II. Chapter IV), selain itu 'Bagian'; satu istilah di header, bar, daftar isi */
const secIsBab = sec => !!(sec && sec[0] && gbHead(String(sec[0]).replace(/^[\u0001\u0002]+/, '')));
const secWord = (b, i) => 'Bagian'; /* #951: satu istilah 'Bagian' di Home, Baca, Tamat, Profil; jumlah = b.total (dihitung dari teks) */
const secLabel = (pos, total, awal, word, ringkas) => awal ? 'Awal buku' : ringkas ? `${total > 0 ? Math.min(pos, total) : pos}/${total}` : `${word || 'Bagian'} ${total > 0 ? Math.min(pos, total) : pos} dari ${total}`; /* 'x dari y' dgn jumlah sebenarnya */
function heroPos(b, mins, part) {
  const p = progInfo(b);
  if (p.done) return statusPct(100).txt;
  const bits = [];
  if (p.pct != null && p.pct > 0) bits.push(`${p.pct}%`);
  const t = bits.map(esc).join(' · ') + (mins ? (bits.length ? ' · ' : '') + nw(mins) : '');
  return t + (part ? '<span class="mnote">bagian lain belum dihitung</span>' : '');
}
/* teks sisa waktu jujur: ada bab belum terhitung → '≥N mnt' (batas bawah), kalau 0 → '—'; tidak pernah 'kurang dari 1 menit' */
function fmtMins(m, part) {
  const n = Math.ceil(m - 1e-9);
  /* sisa seluruh buku > 120 mnt → jam bulat (tak pernah '±554 mnt') */
  if (n > 1200) return '20+ jam';
  if (n > 120) return part ? `≥${Math.floor(n / 60)} jam` : `±${Math.round(n / 60)} jam`;
  if (!part) return n < 1 ? '' : `±${Math.max(1, Math.round(m))} menit`;
  return n < 1 ? '—' : `≥${n} menit`;
}
const unseen = (b, secs) => !secs.length || (b.total || 1) > secs.length || (secs.length === 1 && secs[0].length === 1 && /^\((kosong|teks hilang)\)$/.test(secs[0][0]));
/* #1379: kartu kecil 'Lanjut dari halaman X · ±N menit' di atas Home. Hanya buku belum tamat yang sudah mulai dibaca; halaman = satuan sama dgn chip & bilah baca (#1371) */
function lanjutCard(b) {
  if (!b || b.doneAt || pctOf(b) >= 100) return '';
  const pg = b.pgN > 0 && Number.isInteger(b.pg) && b.pg >= 0 && b.pg < b.pgN && b.pgPos === b.pos ? b.pg + 1 : 0;
  if (!pg && !((b.pos || 0) > 0 || (b.si || 0) > 0)) return '';
  const lbl = pg ? `Lanjut dari halaman ${pg}` : 'Lanjut dari terakhir kamu baca';
  return `<button type="button" class="lanjut-card" id="lanjutCard" aria-label="${esc(lbl)}: ${esc(b.title)}"><span class="lj-t">${esc(b.title)}</span><span class="lj-s"><b>${lbl}</b><span id="ljMin"></span></span><span class="lj-go" aria-hidden="true">Lanjut</span></button>`;
}
async function heroMins(b) {
  try {
    const secs = cache.id === b.id && cache.pages ? cache.pages : makeSections(await getText(b.id) || []);
    if (!secs.length) return;
    const per = secs.map(s => s.reduce((a, p) => a + unitsOf(p, b.lang), 0));
    const pos = Math.max(0, Math.min(b.pos || 0, secs.length - 1));
    const frac = secs.length > 1 ? Math.max(0, Math.min(1, pctOf(b) / 100 * secs.length - pos)) : pctOf(b) / 100;
    let m = per[pos] * (1 - frac);
    for (let i = pos + 1; i < secs.length; i++) m += per[i];
    const part = unseen(b, secs), el = $('#heroPos');
    if (typeof b.mlb === 'number' && b.mlb >= 0 && !part && b.uv === 2) m = b.mlb; /* angka sama persis dgn bar baca */
    if (!el || db.cur !== b.id) return;
    const lm = $('#ljMin'); if (lm && !part && (spdLoad()[spdKey(b.lang)] || []).length >= 3) { const t = fmtMins(m * spdFactor(b), false); if (t) lm.textContent = ' · ' + t; }
    el.innerHTML = heroPos(b, (spdLoad()[spdKey(b.lang)] || []).length < 3 ? '' : fmtMins(m * spdFactor(b), part), part); /* sisa buku tersembunyi sebelum 3 halaman sah */
  } catch (e) {}
}
/* kecepatan pribadi (#831): faktor = menit nyata ÷ menit default per halaman, median 10 halaman sah terakhir per bahasa.
   Halaman <4 dtk (loncat) / >180 dtk (jeda) dibuang. 3-9 sampel campur 50/50 dgn default; dikunci 0,5×-2×. Disimpan lokal, bukan per buku. */
const spdKey = lang => (/^(ja|ko|zh)/.test(lang || '') ? 'cjk' : String(lang || 'x').slice(0, 2));
function spdLoad() { try { return JSON.parse(localStorage.getItem('kepo_spd') || '{}') || {}; } catch (e) { return {}; } }
function spdNote(b, pg) {
  const prev = RD.pt, now = Date.now();
  RD.pt = { id: b.id, pos: b.pos, pg, t: now };
  if (!prev || prev.id !== b.id || prev.pos !== b.pos || pg !== prev.pg + 1 || !RD.left) return;
  const s = (now - prev.t) / 1000, u = (RD.left[prev.pg] || 0) - (RD.left[pg] || 0);
  if (s < 4 || s > 180 || !(u > 0.002)) return;
  try { const o = spdLoad(), k = spdKey(b.lang), a = (o[k] || []).concat(Math.max(0.5, Math.min(2, s / 60 / u))).slice(-10); o[k] = a; localStorage.setItem('kepo_spd', JSON.stringify(o)); } catch (e) {}
}
function spdFactor(b) {
  const a = (spdLoad()[spdKey(b.lang)] || []).filter(x => x > 0).sort((x, y) => x - y);
  if (a.length < 3) return 1;
  const med = a[a.length >> 1];
  return Math.max(0.5, Math.min(2, a.length >= 10 ? med : 0.5 * med + 0.5));
}
/* batas wajar: >90 mnt → jam (bulat 5 mnt), >20 jam → '20+ jam'; tak pernah angka ratusan menit */
function capMins(n) {
  if (n > 1200) return '20+ jam';
  if (n > 90) { const r = Math.round(n / 5) * 5, h = r / 60; return `±${Number.isInteger(h) ? h : String(+h.toFixed(2)).replace('.', ',')} jam`; }
  return n < 1 ? 'Sebentar lagi' : `±${n} menit`;
}
function minsLeft(b) {
  if (!(RD.n > 0) || !RD.left) return null;
  const f = spdFactor(b);
  let m = RD.left[RD.page] || 0;
  const ok = b.uv === 2 && Array.isArray(b.units) && b.units.length === (b.total || 1);
  if (ok) for (let i = b.pos + 1; i < b.units.length; i++) m += b.units[i];
  m *= f;
  const here = (RD.left[RD.page] || 0) * f, n = Math.max(0, Math.ceil(here - 1e-9));
  const secs = cache.id === b.id && cache.pages;
  const mpart = !ok || !secs || unseen(b, secs);
  /* bar baca: sisa waktu SELALU sisa bab/bagian ini; total buku hanya utk Beranda lewat b.mleft (satu sumber, fmtMins) */
  if ((b.total || 1) > 1) return { t: `bagian ini ${capMins(n)}`, part: false, bab: true, m: ok ? m : null, mpart };
  return { t: capMins(n), part: false, m: ok ? m : null, mpart };
}
/* #1597: roving tabindex — satu kata di halaman = tab-stop (tabindex=0); panah kiri/kanan pindah kata, Enter/Spasi buka arti */
function rovSync() {
  const cols = $('#cols'); if (!cols || !RD.ss) return;
  const cur = cols.querySelector('.w[tabindex="0"]'); if (cur && pageOf(cur, cols) === RD.page) return;
  if (cur) cur.tabIndex = -1;
  const sx = RD.ss.find(x => x.pg === RD.page);
  const w = sx && sx.el.querySelector('.w'); if (w) w.tabIndex = 0;
}
function rovKey(e) {
  const w = e.target.closest && e.target.closest('.w'); if (!w || e.ctrlKey || e.metaKey || e.altKey) return;
  const cols = $('#cols'); if (!cols) return;
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); w.click(); return; }
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
  e.preventDefault();
  const all = [...cols.querySelectorAll('.w')], n = all[all.indexOf(w) + d]; if (!n) return;
  const pg = pageOf(n, cols); if (pg !== RD.page) { closeSheet(); showPage(pg); }
  const old = cols.querySelector('.w[tabindex="0"]'); if (old) old.tabIndex = -1;
  n.tabIndex = 0; try { n.focus({ preventScroll: true }); } catch (x) { }
  const vp = $('#vp'); if (vp) { vp.scrollLeft = 0; vp.scrollTop = 0; }
}
function showPage(p, anim = true) {
  const cols = $('#cols'), b = book(); if (!cols) return;
  closeInline();
  if (anim) { const rc = $('#rchip'); if (rc) { clearTimeout(chipT); rc.remove(); } } /* chip 'Lanjut' hilang begitu pengguna membalik halaman (#1742) */
  if (b && p > RD.page) pahamLeave(b);
  gagalBersih();
  RD.page = Math.max(0, Math.min(RD.n - 1, p));
  RD.pgK = b ? pgKey(b, RD.page) : ''; RD.pgT = Date.now();
  if (guideLive && RD.page > 0) guideEnd('skip');
  if (RD.page > 2) dismissTip(); /* buku sudah dibaca / loncat jauh: panduan tak perlu lagi (semua jalur pindah halaman lewat sini) */
  cols.style.transition = anim ? '' : 'none';
  cols.style.transform = `translate(${-RD.page * RD.step}px, ${RD.dy || 0}px)`;
  rovSync();
  /* kalimat pertama yang mulai di halaman ini; bila tak ada (kalimat panjang menyambung / halaman akhir), pakai kalimat terakhir yang mulai sebelumnya */
  let sx = RD.ss.find(x => x.pg >= RD.page);
  if (!sx || sx.pg > RD.page) { for (let i = RD.ss.length - 1; i >= 0; i--) if (RD.ss[i].pg < RD.page) { sx = RD.ss[i]; break; } }
  if (sx) b.si = +sx.el.dataset.s;
  spdNote(b, RD.page);
  b.pg = RD.page; b.pgN = RD.n; b.pgPos = b.pos; b.frac = (RD.page + 1) / RD.n; b.fracPos = b.pos; b.fsi = b.si; b.sc = RD.ss.length;
  let hd = null; for (const h of RD.hs) { if (h.pg <= RD.page) hd = h.el; else break; }
  const rh = $('.rhead'); if (rh) { rh.textContent = hd ? hd.textContent.trim() : b.title; rh.title = rh.textContent; } /* judul bab hanya setelah judulnya benar-benar tampil; sebelumnya judul buku */
  SESPG.add(b.id + ':' + b.pos + ':' + RD.page);
  nudgeTap(b); inlineHint();
  /* bar = seluruh buku: bobot bab dari panjang teks bila sudah dihitung, kalau belum bobot sama */
  b.pct = readPct(b);
  const ml = minsLeft(b);
  if (ml && ml.m != null && !ml.mpart) b.mlb = ml.m;
  save();
  const pgn = $('#pgn'), pb = $('#pbar');
  if (pgn) {
    const multi = (b.total || 1) > 1, lastPg = RD.page === RD.n - 1;
    const bp = bookPct(b), rem = ml && ml.t && bp < 100 ? ml.t.replace(/^(bab|bagian) ini /, '') : '';
    const wd = secWord(b, b.pos), tb = 0; if ((b.tb || 0) !== tb) { b.tb = tb; save(); }
    /* #1285: satu satuan = halaman (1-based, sama dengan chip 'Lanjut dari halaman'); nomor bagian tak ditulis */
    /* #1979: satu satuan 'Bagian k dari m' (sama dgn header & sheet Tamat); nomor layar tak ditulis */
    const sec = secLabel(b.pos + 1, b.total || 1, false, wd), secFull = sec, secShort = secLabel(b.pos + 1, b.total || 1, false, wd, true);
    const notes = [ml && ml.part ? 'bagian lain belum dihitung' : '', multi && lastPg && b.pos < b.total - 1 ? 'Halaman terakhir di bab ini, geser untuk lanjut' : ''].filter(Boolean);
    pgn.title = ['persen dari seluruh buku, perkiraan sisa waktu'].concat(notes).join('. ');
    pgn.setAttribute('aria-label', [secFull, multi ? `${bp} persen dari seluruh buku` : '', ml && ml.t ? `perkiraan sisa ${ml.t}` : ''].concat(notes).filter(Boolean).join(', '));
    /* satu baris: hanya bagian tak kosong, digabung ' · '; layar sempit buang sisa waktu dulu, lalu bab; persen tetap */
    const fill = parts => { pgn.innerHTML = parts.filter(Boolean).map(t => t === sec && secFull ? `<span class="nw" title="${esc(secFull)}" aria-label="${esc(secFull)}">${esc(t)}</span>` : nw(t)).join(' · '); };
    const bs = statusPct(bp);
    /* #1757 + #1760: 'Tamat' + centang HANYA bila b.doneAt (sama dengan tombol 'Baca ulang'); persen 100% tanpa doneAt = 'Halaman terakhir' netral + tombol 'Tamatkan' */
    const tamat = !!b.doneAt, akhir = bs.done && !b.doneAt;
    if (akhir) bs.txt = '100%';
    pgn.classList.toggle('tamat', tamat);
    if (akhir) {
      pgn.title = `Halaman terakhir buku. Tekan Tamatkan untuk menandai tamat. ${secFull}`;
      pgn.setAttribute('aria-label', `Halaman terakhir buku, belum ditandai tamat, ${secFull}`);
    }
    if (tamat) { pgn.setAttribute('aria-label', 'Tamat. ' + secFull); pgn.title = 'Buku sudah Tamat. ' + secFull; }
    if (tamat) { fill(['Tamat']); pgn.innerHTML = ico('check', 'ck') + pgn.innerHTML; } /* #1630: selalu 'Tamat' utuh, tanpa ' · N/N' yang bisa terpotong; jumlah halaman ada di aria-label & title */
    else if (akhir) { pgn.innerHTML = nw('Akhir'); } /* #1981: label pendek, tak mungkin terpotong; teks lengkap di title & aria-label */
    else {
      fill([sec, bs.txt, (window.innerWidth || 400) <= 360 ? '' : rem]);
      if (pgn.scrollWidth > pgn.clientWidth + 1) fill([sec, bs.txt]);
      if (pgn.scrollWidth > pgn.clientWidth + 1) fill([bs.txt]);
      if (pgn.scrollWidth > pgn.clientWidth + 1) pgn.innerHTML = nw(secShort);
    }
  }
  if (pb) { const bp = bookPct(b); pb.style.width = bp + '%'; if (pb.parentElement) pb.parentElement.setAttribute('aria-valuenow', bp); if (pb.parentElement) pb.parentElement.title = `${bp}% dari seluruh buku`; }
  syncMarks();
  const pv = $('#pv'); if (pv) pv.disabled = RD.page === 0 && b.pos === 0;
  const nx = $('#nx'), last = RD.page === RD.n - 1 && b.pos >= (b.total || 1) - 1;
  if (nx) { nx.disabled = false; nx.classList.remove('fin'); }
  if (!nx) { /* reader sudah ditutup */ }
  else if (last && b.doneAt) { delete nx.dataset.ulang; nx.dataset.baca = '1'; nx.textContent = 'Baca ulang'; nx.classList.add('fin'); nx.style.cssText = '';nx.setAttribute('aria-label', 'Baca ulang buku dari halaman 1, tanpa XP'); }
  else if (last && !b.doneAt) { delete nx.dataset.ulang; delete nx.dataset.baca; nx.textContent = 'Tamatkan'; nx.classList.add('fin'); nx.style.cssText = '';nx.setAttribute('aria-label', 'Tamatkan buku dan buka rekap'); }
  else { delete nx.dataset.ulang; delete nx.dataset.baca; nx.innerHTML = ico('right'); nx.style.cssText = ''; nx.setAttribute('aria-label', 'Halaman berikutnya'); }
  endCard(b, last);
  pfArm();
}
/* kartu ajakan di halaman terakhir: isi ruang kosong di bawah teks supaya tak buntu */
/* #1606: ukur ulang kartu saat ukuran/isi/tema berubah (RO + MO + resize + font + akhir transisi); satu frame, tanpa timer */
const EC = { vp: null, cols: null, ro: null, mo: null, raf: 0, glob: false };
function ecRefit() {
  if (EC.raf) return;
  EC.raf = requestAnimationFrame(() => {
    EC.raf = 0;
    const b = book(); if (!b || !document.body.classList.contains('reading') || !RD || !RD.n) return;
    endCard(b, RD.page === RD.n - 1 && b.pos >= (b.total || 1) - 1);
  });
}
function ecWatch(vp, cols) {
  if (!EC.glob) {
    EC.glob = true;
    window.addEventListener('resize', ecRefit); window.addEventListener('orientationchange', ecRefit);
    try { if (document.fonts) { document.fonts.ready.then(ecRefit); if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', ecRefit); } } catch (e) { }
    try { const m = new MutationObserver(ecRefit); m.observe(document.documentElement, { attributes: true }); m.observe(document.body, { attributes: true }); } catch (e) { }
  }
  if (EC.vp === vp && EC.cols === cols) return;
  if (EC.ro) EC.ro.disconnect();
  if (EC.mo) EC.mo.disconnect();
  EC.vp = vp; EC.cols = cols;
  cols.addEventListener('transitionend', e => { if (e.target === cols) ecRefit(); });
  try { EC.ro = new ResizeObserver(ecRefit); EC.ro.observe(vp); EC.ro.observe(cols); } catch (e) { }
  try { EC.mo = new MutationObserver(ecRefit); EC.mo.observe(cols, { childList: true, subtree: true, attributes: true, characterData: true }); } catch (e) { }
}
function endCard(b, last) {
  const vp = $('#vp'); if (!vp) return;
  const old = $('#endcard'); if (old) old.remove();
  const cols = $('#cols'); if (!cols) return;
  ecWatch(vp, cols);
  if (!last || b.doneAt) return; /* #1899: buku Tamat sudah punya 'Baca ulang' di bar bawah */
  if (!$('#sheet').classList.contains('hide')) return; /* #1355 + #1415: sheet (Tamat / arti kata) terbuka → kartu disembunyikan, tak menutup teks */
  if (tamatSeen === b.id + ':' + SESS.t) return; /* #1560: sheet Tamat sudah muncul/ditutup di buku ini → satu aksi 'Buku baru' saja (di sheet) */
  const nx = nextBooks(b)[0];
  const c = document.createElement('div'); c.id = 'endcard'; c.className = 'endcard'; c.setAttribute('role', 'note');
  c.innerHTML = `<p class="ec-end" id="ecend" hidden>Tamat. Sampai sini dulu.</p><button class="sec" id="ecn">${nextBkLabel(b, nx)}</button><button class="lnk" id="ecr" aria-label="Baca ulang, tanpa XP">Baca ulang (tanpa XP)</button>`;
  c.onclick = c.onpointerdown = c.ontouchstart = e => e.stopPropagation();
  vp.append(c);
  $('#ecr').onclick = () => { restartBook(b); viewBaca(); };
  $('#ecn').onclick = () => { if (nx) { db.cur = nx.id; save(); setTab('baca'); } else { setTab('rak'); setTimeout(() => { const a = $('#addBtn'); if (a) a.click(); }, 50); } };
  /* tampil hanya bila ruang kosong di bawah SEMUA teks halaman aktif cukup; jangan pernah menimpa teks */
  /* #1509: ukur di posisi AKHIR geseran (transform masih beranimasi saat showPage/closeSheet) supaya kartu tak menimpa teks */
  let bottom = 0; const vr = vp.getBoundingClientRect();
  let sx = 0, sy = 0;
  try { const m = new DOMMatrixReadOnly(getComputedStyle(cols).transform); sx = -RD.page * RD.step - m.m41; sy = (RD.dy || 0) - m.m42; } catch (e) { }
  const add = x => { const l = x.left + sx, r = x.right + sx, bt = x.bottom + sy; if (x.width > 0 && x.height > 0 && r > vr.left && l < vr.right) bottom = Math.max(bottom, bt); };
  try { const r = document.createRange(); r.selectNodeContents(cols); [...r.getClientRects()].forEach(add); } catch (e) { }
  try { cols.querySelectorAll('rt,ruby').forEach(x => [...x.getClientRects()].forEach(add)); } catch (e) { } /* furigana/pinyin */
  try { (RD.ss || []).forEach(x => { if (x.pg === RD.page && x.el && x.el.isConnected) [...x.el.getClientRects()].forEach(add); }); } catch (e) { }
  if (!bottom || vr.bottom - bottom < c.offsetHeight + 48) { c.remove(); return; }
  if (bottom + 24 + c.offsetHeight > vr.bottom) { c.remove(); return; } /* #1606: cek ulang, jangan pernah menimpa teks */
  /* #994/#1415: kartu di bawah teks, jarak 24px dari paragraf terakhir dan min 24px dari bar bawah */
  /* #2003: kartu turun ke dekat jempol; sisakan ruang untuk toast + bar bawah, tak pernah di atas teks */
  const tTop = Math.max(bottom + 24, vr.bottom - c.offsetHeight - 80);
  c.style.top = Math.round(Math.min(tTop, vr.bottom - c.offsetHeight - 24) - vr.top) + 'px'; c.style.bottom = 'auto';
  if (bottom - vr.top < 80) { const e = $('#ecend'); if (e) { e.hidden = false; if (vr.bottom - bottom < c.offsetHeight + 48) e.hidden = true; } } /* #1918: bagian akhir hampir kosong teks → satu baris penutup */
}
/* prafetch arti kalimat (#458): halaman diam ±1,5 dtk → terjemahkan diam-diam maks 12 kalimat halaman aktif */
let pfIdle = 0;
function pfDisarm() { clearTimeout(pfIdle); pfIdle = 0; if (typeof pfStop === 'function') pfStop(); }
function pfArm() {
  pfDisarm(); const b = book(); if (!b || !pfOk()) return;
  pfIdle = setTimeout(() => {
    pfIdle = 0;
    const go = () => {
      if (!document.body.classList.contains('reading') || !$('#sheet').classList.contains('hide') || !pfOk()) return;
      const l = RD.ss.filter(x => x.pg === RD.page && x.el.isConnected).map(x => x.el.textContent.trim());
      pfStart(l, b.lang, db.my);
    };
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 2000 }); else setTimeout(go, 0);
  }, 1500);
}
/* penanda halaman: b.marks = [{p: bab, s: nomor kalimat, t: potongan teks, at}], maks 20; buku lama tanpa marks tetap aman */
const MARK_MAX = 20;
const markDate = t => new Date(t).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
const marksOf = b => Array.isArray(b.marks) ? b.marks : [];
const okMark = m => m && Number.isFinite(m.p) && Number.isFinite(m.s);
/* penanda terdekat posisi baca terakhir (bab dulu, lalu kalimat); tanpa posisi -> terbaru */
const nearMark = b => { if (!Number.isFinite(b.pos) || !Number.isFinite(b.si)) return lastMark(b); const d = m => Math.abs((m.p - b.pos) * 1e6 + (m.s - b.si)); return marksOf(b).filter(okMark).reduce((a, m) => !a || d(m) < d(a) || (d(m) === d(a) && (m.at || 0) > (a.at || 0)) ? m : a, null); };
const lastMark = b => marksOf(b).reduce((a, m) => m && Number.isFinite(m.p) && Number.isFinite(m.s) && (!a || (m.at || 0) >= (a.at || 0)) ? m : a, null);
const markHere = b => { const on = new Set(RD.ss.filter(x => x.pg === RD.page).map(x => +x.el.dataset.s)); return marksOf(b).filter(m => m.p === b.pos && on.has(m.s)); };
function syncMarks() {
  const b = book(), bt = $('#bmTog'), ls = $('#bmList'); if (!b) return;
  const on = markHere(b).length > 0, n = marksOf(b).length;
  if (bt) { bt.classList.toggle('on', on); bt.setAttribute('aria-pressed', on ? 'true' : 'false'); bt.innerHTML = `${ico('bm')} ${on ? 'Hapus penanda halaman ini' : 'Tandai halaman ini'}`; }
  const rb = $('#rMark'); if (rb) { rb.classList.toggle('on', on); rb.setAttribute('aria-pressed', on ? 'true' : 'false'); const l = on ? 'Hapus penanda halaman ini' : 'Tandai halaman ini'; rb.setAttribute('aria-label', l); rb.title = l; }
  const rm = $('#rMk'); if (rm) { rm.hidden = !n; const rn = $('#rMkN'); if (rn) rn.textContent = n; }
  if (ls) { ls.disabled = !n; ls.innerHTML = `${ico('list')} Daftar penanda (${n})`; }
}
function restoreMarks(b, gone, old) { const cur = marksOf(b); b.marks = old.filter(m => cur.includes(m) || gone.includes(m)); save(); syncMarks(); if (!$('#sheet').classList.contains('hide') && $('#sheet').getAttribute('aria-label') === 'Daftar penanda') { if (b.marks.length) openMarks(); else closeSheet(); } }
function toggleMark() {
  const b = book(); if (!b) return;
  const hit = markHere(b);
  if (hit.length) { const old = marksOf(b); b.marks = old.filter(m => !hit.includes(m)); save(); syncMarks(); vib(6); return toast('Penanda dihapus', 5000, { label: 'Urungkan', fn: () => restoreMarks(b, hit, old) }); }
  const x = RD.ss.find(y => y.pg === RD.page && !y.el.closest('h2')) || RD.ss.find(y => y.pg === RD.page);
  const t = x ? x.el.textContent.replace(/\s+/g, ' ').trim().slice(0, 140) : '';
  const old = marksOf(b); let cur = old, gone = null;
  if (old.length >= MARK_MAX) { gone = old.reduce((a, m) => !a || (m && (m.at || 0) < (a.at || 0)) ? m : a, null); cur = old.filter(m => m !== gone); }
  b.marks = cur.concat({ p: b.pos, s: x ? +x.el.dataset.s : b.si || 0, t, at: Date.now() });
  save(); syncMarks(); vib(10); sfx('pop');
  if (gone) toast('Penanda terlama diganti', 5000, { label: 'Urungkan', fn: () => restoreMarks(b, [gone], old) });
  else toast('Halaman ditandai', 1800);
}
/* Kata > Tersimpan: loncat ke kalimat asal kata di e-reader (cari lewat teks; data lama tetap aman) */
async function lihatDiBuku(v) {
  const b = v && db.books.find(x => x.title === v.book); if (!b) return toast('Bukunya sudah dihapus');
  const nz = t => String(t || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const full = nz(v.s), cx = nz(ctxOf(v)).replace(/…$/, '');
  let hit = null;
  try {
    const secs = await pagesOf(b);
    const data = secs.map(sc => secParas(sc, b.lang).flatMap(P => P.sents.filter(x => x.i >= 0)));
    const find = fn => { for (let p = 0; p < data.length; p++) for (const x of data[p]) if (fn(nz(x.s))) return { p, s: x.i }; return null; };
    hit = (full && find(t => t === full)) || (cx.length >= 8 && find(t => t.includes(cx) || cx.includes(t))) || null;
  } catch (e) { }
  db.cur = b.id; b.opened = Date.now();
  if (hit) { b.pos = hit.p; b.si = hit.s; RD.flash = hit.s; RD.quiet = true; } else setTimeout(() => toast('Posisi persisnya tidak ketemu'), 500);
  save(); setTab('baca');
}
/* ---------- cari di buku ---------- */
async function openFind() {
  const b = book(); if (!b) return;
  const secs = await pagesOf(b);
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">${ico('search')} Cari di buku</span>${closeBtn}</div><div class="search"><input id="fq" type="search" dir="auto" lang="${esc(b.lang)}" placeholder="Ketik kata atau kalimat…" aria-label="Cari kata di seluruh bab buku ini" autocomplete="off" enterkeyhint="search"></div><div id="fres" aria-live="polite"><div class="mut sm">Ketik minimal 2 huruf.</div></div>`, 'Cari di buku');
  const data = secs.map(sc => secParas(sc, b.lang).flatMap(P => P.sents.filter(x => x.i >= 0)));
  const total = data.reduce((n, d) => n + d.length, 0) || 1;
  const fq = $('#fq'), out = $('#fres'); let t;
  const run = () => {
    const q = fq.value.replace(/\s+/g, ' ').trim(), ql = q.toLowerCase();
    if (q.length < 2) { out.innerHTML = '<div class="mut sm">Ketik minimal 2 huruf.</div>'; return; }
    const res = []; let before = 0;
    outer: for (let p = 0; p < data.length; p++) {
      for (const x of data[p]) {
        const txt = x.s.replace(/\s+/g, ' ').trim(), at = txt.toLowerCase().indexOf(ql);
        if (at >= 0) { res.push({ p, s: x.i, txt, at, pct: Math.min(100, Math.round((before + x.i) / total * 100)) }); if (res.length >= 30) break outer; }
      }
      before += data[p].length;
    }
    if (!res.length) { out.innerHTML = '<div class="mut sm">Tidak ketemu. Coba kata lain.</div>'; return; }
    const html = res.map((r, i) => {
      const room = Math.max(0, 60 - q.length), a = Math.max(0, r.at - Math.floor(room / 2)), e = Math.min(r.txt.length, r.at + q.length + Math.ceil(room / 2));
      const pre = r.txt.slice(a, r.at), hit = r.txt.slice(r.at, r.at + q.length), post = r.txt.slice(r.at + q.length, e);
      return `<div class="mki"><button class="mkgo" data-i="${i}"><span class="mkt" dir="auto" lang="${esc(b.lang)}">${a > 0 ? '…' : ''}${esc(pre)}<b>${esc(hit)}</b>${esc(post)}${e < r.txt.length ? '…' : ''}</span><small class="mkat" dir="auto">${secWord(b, r.p)} ${r.p + 1} ·${r.pct}%</small></button></div>`;
    }).join('');
    out.innerHTML = `<div class="chlist">${html}</div>`;
    $$('#fres .mkgo').forEach(x => x.onclick = () => { const r = res[+x.dataset.i]; closeSheet(); b.pos = Math.min(r.p, Math.max(0, secs.length - 1)); b.si = r.s; RD.flash = r.s; RD.quiet = true; save(); viewBaca(); });
  };
  fq.oninput = () => { clearTimeout(t); t = setTimeout(run, 200); };
  try { fq.focus({ preventScroll: true }); } catch (e) { }
}
async function openMarks() {
  const b = book(); if (!b) return;
  const secs = await pagesOf(b);
  let ord = 'baru'; try { if (localStorage.getItem('kepo_markord') === 'buku') ord = 'buku'; } catch (e) {}
  const list = marksOf(b).slice().sort(ord === 'buku' ? (p, q) => p.p - q.p || p.s - q.s || (q.at || 0) - (p.at || 0) : (p, q) => (q.at || 0) - (p.at || 0) || p.p - q.p || p.s - q.s);
  /* persen posisi = kalimat ke-s / total kalimat buku (tak berubah saat ukuran font diganti) */
  const cnt = secs.map(sc => secParas(sc, b.lang).reduce((n, P) => n + P.sents.filter(x => x.i >= 0).length, 0));
  const total = cnt.reduce((n, c) => n + c, 0) || 1;
  const pctAt = m => { const before = cnt.slice(0, Math.max(0, m.p)).reduce((n, c) => n + c, 0); return Math.min(100, Math.max(0, Math.round((before + (m.s || 0)) / total * 100))); };
  const nameOf = m => { const sc = secs[m.p]; const h = sc && secParas(sc, b.lang).find(P => P.h); const t = h ? h.sents.map(x => x.s).join('').replace(/\s+/g, ' ').trim() : ''; return t ? (t.length > 28 ? t.slice(0, 27).trimEnd() + '…' : t) : `${secWord(b, m.p)} ${m.p + 1}`; };
  const snip = t => { t = (t || '').replace(/\s+/g, ' ').trim(); if (t.length <= 120) return t; const cut = t.slice(0, 120), sp = cut.lastIndexOf(' '); return (sp > 80 ? cut.slice(0, sp) : cut).replace(/[\s,;:.\-–—]+$/, '') + '…'; };
  const rel = at => { if (!at) return ''; const d = Math.floor((new Date().setHours(0, 0, 0, 0) - new Date(at).setHours(0, 0, 0, 0)) / 864e5); if (d <= 0) return 'Hari ini'; if (d === 1) return 'Kemarin'; if (d < 30) return `${d} hari lalu`; return new Date(at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: d > 300 ? 'numeric' : undefined }); };
  const items = list.map((m, i) => { const r = rel(m.at); return `<div class="mki"><button class="mkgo" data-i="${i}"><span class="mkt" dir="auto" lang="${esc(b.lang)}">${esc(snip(m.t) || '…')}</span><small class="mkat" dir="auto">${esc(nameOf(m))} · ${pctAt(m)}%${r ? ` · ${r}` : ''}</small></button><button class="icon mkdel" data-i="${i}" aria-label="Hapus penanda ${i + 1}">${ico('trash')}</button></div>`; }).join('');
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">${ico('bm')} Penanda ${list.length}/${MARK_MAX}</span>${closeBtn}</div>${list.length > 1 ? `<div class="seg" id="mkOrd" role="group" aria-label="Urutan penanda"><button data-v="baru" aria-pressed="${ord === 'baru'}" class="${ord === 'baru' ? 'on' : ''}">Terbaru</button><button data-v="buku" aria-pressed="${ord === 'buku'}" class="${ord === 'buku' ? 'on' : ''}">Urutan buku</button></div>` : ''}${list.length ? `<div class="chlist">${items}</div>` : '<div class="mut sm">Belum ada penanda. Buka Pengaturan (ikon slider di bar atas), lalu ketuk Tandai halaman ini.</div>'}`, 'Daftar penanda');
  $$('#mkOrd button').forEach(x => x.onclick = () => { try { localStorage.setItem('kepo_markord', x.dataset.v); } catch (e) {} openMarks(); });
  $$('#sheet .mkgo').forEach(x => x.onclick = () => {
    const m = list[+x.dataset.i]; closeSheet();
    b.pos = Math.min(m.p, Math.max(0, secs.length - 1)); b.si = m.s; RD.quiet = true; save(); viewBaca();
  });
  $$('#sheet .mkdel').forEach(x => x.onclick = () => {
    const gone = list[+x.dataset.i], old = marksOf(b); b.marks = old.filter(m => m !== gone); save(); syncMarks();
    if (b.marks.length) openMarks(); else closeSheet();
    toast('Penanda dihapus', 5000, { label: 'Urungkan', fn: () => restoreMarks(b, [gone], old) });
  });
}
let tipN = 0, tipDone = false, nudgePg = new Set(), nudgeT = 0;
const NUDGE_MSG = 'Ada kata yang bikin bingung? Ketuk aja, artinya muncul.';
function nudgeOff() { clearTimeout(nudgeT); nudgeT = 0; const t = $('#toast'); if (t && t.textContent === NUDGE_MSG) toastHide(); }
/* colek lembut: 4 halaman dibalik tanpa ketuk kata sama sekali → satu pesan, sekali seumur hidup */
function nudgeTap(b) {
  if (db.seenNudgeTap) return;
  const k = b.pos + ':' + RD.page;
  if (!nudgePg.has(k)) { nudgePg.add(k); db.nudgeN = (+db.nudgeN || 0) + 1; save(); } /* hitungan lintas sesi */
  if (db.nudgeN < 4 || !db.seenTip || db.vocab.length || Object.keys(db.looks || {}).length) return;
  if ($('#tip') || $('#nchip') || $('#sheet.open')) return; /* satu pesan sekali waktu; coba lagi di halaman berikut */
  db.seenNudgeTap = true; save();
  toast(NUDGE_MSG, 5000);
  clearTimeout(nudgeT); nudgeT = setTimeout(nudgeOff, 5000);
}
/* Terjemahan kalimat di tempat (#907): ketuk dua kali kalimat -> baris kecil tepat di bawahnya. Tahan = sheet (tetap); ketuk kata = arti kata (tetap) */
function closeInline() {
  const o = RD.itr; RD.itr = null; if (!o) return;
  o.tok++; if (o.el.isConnected) o.el.remove(); if (o.sEl) o.sEl.classList.remove('itrs');
}
function inlineHint() {
  if (db.seenInlineTr || !db.seenTip || !(nudgePg && nudgePg.size >= 3)) return;
  if ($('#tip') || $('#nchip') || !$('#sheet').classList.contains('hide') || !$('#toast').classList.contains('hide')) return; /* satu pesan sekali waktu */
  db.seenInlineTr = true; save(); toast('Ketuk dua kali satu kalimat = arti singkat di bawahnya', 5000);
}
function toggleInline(sEl) {
  const b = book(); if (!b || !sEl || !sEl.isConnected) return;
  const same = RD.itr && RD.itr.sEl === sEl; closeInline(); if (same) return;
  $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
  try { getSelection().removeAllRanges(); } catch (_) {}
  vib(8);
  const sent = sEl.textContent.trim(), cjk = /^(ja|ko|zh)/i.test(b.lang), long = cjk ? [...sent].length > 80 : sent.split(/\s+/).length > 25;
  const el = document.createElement('span');
  el.className = 'itr'; el.setAttribute('role', 'note');
  sEl.after(el); sEl.classList.add('itrs');
  const o = RD.itr = { el, sEl, tok: 0 };
  const fits = () => { const vr = $('#vp').getBoundingClientRect(), r = el.getBoundingClientRect(); return r.left >= vr.left - 1 && r.right <= vr.right + 1 && r.top >= vr.top - 1 && r.bottom <= vr.bottom + 1; };
  /* tak muat di halaman ini (kalimat di dasar kolom) -> jalan pintas gagal, pakai sheet seperti biasa */
  const fallback = () => { closeInline(); showSentence('', sent, +sEl.dataset.s, sEl); award(1, 'look'); if ($('#toast').classList.contains('hide')) toast('Kalimat panjang, dibuka di lembar arti.'); };
  const run = () => {
    const my = ++o.tok;
    const cached = cachedTr(sent, b.lang, db.my);
    el.innerHTML = cached ? '' : '<span class="itr-t loading">Memuat…</span>';
    if (!cached && !fits()) return fallback();
    const show = r => {
      el.innerHTML = '';
      const t = document.createElement('span'); t.className = 'itr-t'; t.dir = 'auto'; t.lang = db.my; t.textContent = r.text;
      const m = document.createElement('span'); m.className = 'itr-m'; m.textContent = long ? 'Kalimat panjang, arti mesin sering meleset. Baca bagian per bagian.' : 'Arti mesin, bisa meleset';
      el.append(t, m);
      if (!fits()) fallback();
    };
    if (cached) return show({ text: cached });
    translate(sent, b.lang, db.my).then(r => { if (RD.itr !== o || my !== o.tok) return; if (!r || !r.text) throw new Error('kosong'); show(r); }).catch(() => {
      if (RD.itr !== o || my !== o.tok) return;
      el.innerHTML = '<span class="itr-t"></span> '; el.firstChild.textContent = navigator.onLine === false ? 'Lagi offline, arti kalimat butuh internet.' : 'Layanan terjemahan lagi sibuk.';
      const bt = document.createElement('button'); bt.type = 'button'; bt.className = 'itr-r'; bt.textContent = 'Coba lagi'; bt.onclick = ev => { ev.stopPropagation(); run(); };
      el.append(bt);
      if (!fits()) fallback();
    });
  };
  bumpSentLook(b.id, 'kalimat');
  run();
}
/* Menu (#1184): dimunculkan lewat tombol/margin = bertahan saat ganti halaman, hilang ±4 dtk tanpa sentuhan */
let menuT = 0;
function menuHold() { clearTimeout(menuT); menuT = setTimeout(() => { menuT = 0; const r = $('#reader'); if (r && !$('#sheet.open')) r.classList.remove('chrome'); }, 4000); }
function toggleMenu(keep) {
  const r = $('#reader'); if (!r) return;
  clearTimeout(menuT); menuT = 0;
  const on = r.classList.toggle('chrome');
  if (on && keep) menuHold();
}
/* #1507: pemandu kata pertama. Hanya cerita contoh pendek, sekali per perangkat (db.fwGuide: 'seen' → 'tap' | 'skip'; data lama tanpa field = belum pernah).
   Satu kata berdenyut + bar petunjuk di luar teks. Hilang saat kata diketuk / Lewati / pindah halaman. */
let guideLive = '';
function guideOn(b) {
  if (!b || !isShortSample(b)) return false;
  if (guideLive === b.id) return true;
  if (db.fwGuide || db.books.length !== 1 || (b.pos || 0) > 0 || (b.pg || 0) > 0) return false;
  guideLive = b.id; db.fwGuide = 'seen'; save(); return true;
}
function guideMark(b) {
  const S = SAMPLES_SHORT[b.lang], ws = $$('#cols .w').filter(x => !x.closest('h2') && !isParticle(b.lang, x.textContent));
  const w = ws.find(x => S && x.textContent.includes(S.pick)) || ws[0];
  if (w) {
    w.classList.add('guide-w');
    /* #1888: ambil arti kata menyala lebih dulu (hasil masuk cache translate), sheet langsung berisi. Gagal/offline = diam, pesan lama tetap jalan. */
    try {
      const k = b.lang === 'ko' ? koSplit(w.textContent) : null, q = k ? k.stem : w.textContent;
      if (navigator.onLine !== false) Promise.resolve(translate(q, b.lang, db.my)).catch(() => { });
    } catch (e) { }
  }
}
function guideEnd(how) {
  if (!guideLive) return;
  guideLive = ''; db.fwGuide = how; save();
  try { window.kepoGuide = how === 'tap' ? 't' : 's'; } catch (e) { }
  const g = $('#gtip'); if (g) g.remove();
  $$('.guide-w').forEach(x => x.classList.remove('guide-w'));
  if (typeof layout === 'function') { try { layout(); } catch (e) { } }
}
/* tips e-reader: satu pesan pendek per kunjungan, bergantian. db.tipStep: 0 kata, 1 kalimat, 2 menu, 3 selesai (data lama tanpa field = selesai bila seenTip) */
const TIPS = ['<b>Ketuk kata</b> = artinya', '<b>Tahan kalimat</b> = arti kalimat', '<b>Ketuk tengah</b> = menu'];
function tipStepNow() { return typeof db.tipStep === 'number' ? db.tipStep : (db.seenTip ? 3 : 0); }
function tipOn() { return tipStepNow() < 3 && !tipDone; }
function dismissTip() { if (tipDone) return; tipDone = true; const n = tipStepNow(); if (n >= 3) return; db.tipStep = n + 1; db.seenTip = true; save(); const t = $('#tip'); if (t) t.remove(); }
function tipTurn() { if (tipOn() && ++tipN >= 3) dismissTip(); }
/* indeks kalimat pertama yang mulai di halaman p (dari RD.ss) */
function firstSent(p) { const ss = RD.ss || [], i = ss.findIndex(x => x.pg >= p); return i < 0 ? ss.length : i; }
/* #1363 kata yang ditandai sambil baca, hanya di memori sesi (tak mengubah data tersimpan) */
const MARKS = [];
function marksReview(b, pos) {
  const mine = MARKS.filter(m => m.bid === b.id && m.pos === pos);
  for (const m of mine) MARKS.splice(MARKS.indexOf(m), 1);
  const rows = mine.map(m => db.vocab.find(v => sameVocab(v, m.lang, m.w))).filter(Boolean);
  if (!rows.length || !$('#sheet').classList.contains('hide')) return;
  const list = rows.slice(0, 8).map(v => `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}</div><div class="t1">${v.t ? esc(v.t) : '<i>arti nyusul</i>'}</div></div></div>`).join('');
  openSheet(`<div class="sh-head"><span class="stepchip">Tinjau kata</span>${closeBtn}</div>
    <h2>${rows.length} kata kamu tandai tadi</h2><p class="mut sm">Sudah tersimpan di tab Kata. Intip artinya, atau langsung lanjut.</p>
    ${list}${rows.length > 8 ? `<p class="mut sm">+${rows.length - 8} kata lainnya ada di tab Kata.</p>` : ''}
    <div class="row" style="margin-top:12px"><button class="pri full" data-close style="min-height:48px">Lanjut baca</button></div>`, 'Tinjau kata');
}
function turn(d) {
  const b = book(); closeSheet(); const was = LIS.on && !!db.lisAuto; stopListenPage();
  const np = RD.page + d;
  const resume = () => { if (!was) return; const id = ++LIS.id; LIS.on = true; setTimeout(() => { if (LIS.on && LIS.id === id && $('#cols')) startListenPage(); }, 400); };
  if (np >= 0 && np < RD.n) { vib(4); showPage(np); tipTurn(); if (!menuT) $('#reader').classList.remove('chrome'); else menuHold(); if (d > 0) award(2, 'page', b.id + ':' + b.pos, firstSent(np)); resume(); return; }
  if (d > 0) pahamLeave(b);
  if (d > 0 && b.pos < b.total - 1) { if (was) LIS.chain = true; const op = b.pos; b.pos++; b.si = 0; RD.quiet = true; save(); award(5, 'page', b.id + ':' + b.pos, 0); viewBaca(); setTimeout(() => marksReview(b, op), 150); }
  else if (d < 0 && b.pos > 0) { if (was) LIS.chain = true; b.pos--; b.si = 0; RD.toEnd = true; RD.quiet = true; save(); viewBaca(); }
  else if (d > 0) { if (b.doneAt) toast('Ini halaman terakhir.', 4000); else finishBook(b); } /* #1775: buku Tamat dibuka ulang: sheet Tamat tak muncul sendiri (swipe/tombol keyboard) */
  else toast('Ini halaman pertama.');
}
let rsT; ['resize', 'orientationchange'].forEach(ev => addEventListener(ev, () => { clearTimeout(rsT); rsT = setTimeout(() => { if (document.body.classList.contains('reading')) { const r = $('#reader'); if (r) r.dataset.align = effAlign(); layout(); } }, 150); }));
addEventListener('keydown', e => { if (!document.body.classList.contains('reading') || !$('#sheet').classList.contains('hide') || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || (e.key === ' ' && /BUTTON|A/.test(e.target.tagName)) || (e.target.closest && e.target.closest('#cols .w'))) return; if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); turn(1); } if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); turn(-1); } });

/* ---------- sheet arti kata → kalimat ---------- */
/* geser isi halaman ke atas (tanpa ganti halaman) supaya kata/kalimat terpilih tidak ketutup sheet */
function keepVisible(sel) {
  const cols = $('#cols'), sh = $('#sheet'), vp = $('#vp'); if (!cols || !sh || !vp) return;
  RD.dy = 0; cols.style.transform = `translate(${-RD.page * RD.step}px, 0px)`;
  const els = [...cols.querySelectorAll(sel)]; if (!els.length) return;
  const rs = els.flatMap(x => [...x.getClientRects()]);
  const bottom = Math.max(...rs.map(r => r.bottom)), top = Math.min(...rs.map(r => r.top));
  const need = bottom - (innerHeight - sh.offsetHeight - 12);
  if (need <= 0) return;
  RD.dy = -Math.round(Math.min(need, Math.max(0, top - vp.getBoundingClientRect().top - 4)));
  cols.style.transform = `translate(${-RD.page * RD.step}px, ${RD.dy}px)`;
}
/* hitung kemunculan kata di buku: dibangun malas sekali per buku (Map kata->jumlah) */
let freq = { id: null, lang: null, pages: null, map: null, part: false };
function freqOf(b) {
  const full = cache.id === b.id && cache.pages;
  if (!full) { /* teks belum ter-cache: hitung dari halaman yang sedang terbuka, jangan disimpan */
    const m = new Map(); for (const el of document.querySelectorAll('#cols .w')) { const k = norm(el.textContent); if (k) m.set(k, (m.get(k) || 0) + 1); }
    return { map: m, part: true };
  }
  if (freq.id !== b.id || freq.lang !== b.lang || freq.pages !== full) {
    const m = new Map();
    for (const sec of full) for (const p of sec) for (const t of tokens(p, b.lang)) { if (!t.w) continue; const k = norm(t.t); if (k) m.set(k, (m.get(k) || 0) + 1); }
    freq = { id: b.id, lang: b.lang, pages: full, map: m, part: false };
  }
  return freq;
}
function showFreq(word, b) {
  const box = $('#wfreq'); if (!box) return;
  const k = norm(word);
  if (!k || /\s/.test(word.trim())) { box.textContent = ''; return; }
  const f = freqOf(b), n = f.map.get(k) || 0;
  box.textContent = n >= 3 ? `Muncul ${n}× ${f.part ? 'di bagian yang sudah dibuka' : 'di buku ini'}` : '';
}
const sugSeen = new Set();
/* Ketukan di celah/tanda baca/tepi kata -> kata terdekat (maks 20px), tampilan teks tak berubah */
function nearWord(vp, x, y) {
  const vr = vp.getBoundingClientRect(); let best = null, bd = 20;
  for (const el of vp.querySelectorAll('#cols .w')) {
    for (const r of el.getClientRects()) {
      if (r.right < vr.left || r.left > vr.right || r.bottom < vr.top || r.top > vr.bottom) continue;
      const dx = Math.max(r.left - x, 0, x - r.right), dy = Math.max(r.top - y, 0, y - r.bottom), d = Math.hypot(dx, dy);
      if (d < bd) { bd = d; best = el; }
    }
  }
  return best;
}
/* #1923: logika tandai sulit dipakai bersama kartu ulang & sheet arti kata (tanpa XP) */
function setHardVocab(v, now, besok) {
  if (!v.hard) {
    v.hard = true; v.hd = { due: v.due, known: !!v.known };
    if (besok) { v.known = false; v.due = now + DAY_MS; } /* #1999 Ulang besok: jatuh tempo tepat besok */
    else if (v.known) { v.known = false; v.due = now + DAY_MS; }
    else { const left = (+v.due || 0) - now; if (left > DAY_MS) v.due = now + Math.max(DAY_MS, Math.round(left / 2)); }
  } else { delete v.hard; if (v.hd && !(+v.due <= now)) { v.due = v.hd.due; v.known = v.hd.known; } delete v.hd; }
}
async function onWord(el, lastEl) {
  const b = book();
  document.querySelectorAll('.lvlup').forEach(x => x.remove()); toastHide();
  $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
  el.classList.add('sel');
  const sEl = el.closest('.s') || el.parentElement || el, sent = sEl.textContent.trim(), sIdx = +sEl.dataset.s;
  const ws = [...sEl.querySelectorAll('.w')], MAXW = 5; if (!ws.includes(el)) ws.push(el);
  let lo = ws.indexOf(el), hi = lo, word = el.textContent, tr = null, tok = 0;
  const phraseOf = () => { const r = document.createRange(); r.setStartBefore(ws[lo]); r.setEndAfter(ws[hi]); return r.toString().replace(/\s+/g, ' ').trim(); };
  /* pulihkan frasa pilihan (dari tombol balik sheet kalimat); kalau rentang tak valid, tetap 1 kata */
  const li = lastEl ? ws.indexOf(lastEl) : -1;
  if (li > lo && li - lo + 1 <= MAXW) { hi = li; ws.forEach((w, i) => w.classList.toggle('sel', i >= lo && i <= hi)); word = phraseOf(); }
  /* ko: kata menempel partikel (아침에) -> arti bentuk dasar; partikel disebut kecil */
  const qWord = () => { const k = b.lang === 'ko' && lo === hi ? koSplit(word) : null; return k ? k.stem : word; };
  const partNote = () => { const k = b.lang === 'ko' && lo === hi ? koSplit(word) : null; return k ? k.stem + ' + ' + k.part : ''; };
  const isSaved =() => db.vocab.some(v => sameVocab(v, b.lang, word));
  const saveLbl = () => isSaved() ? `${ico('bmcheck')} Tersimpan` : `${ico('bmplus')} Simpan`;
  openSheet(`
    <div class="sh-head"><span class="stepchip">Arti kata</span>${closeBtn}</div>
    <div class="wd"><b id="wword" dir="auto" lang="${esc(b.lang)}">${esc(word)}</b><button class="icon tint" id="sw" aria-label="Dengerin kata">${ico('vol')}</button><span class="wex" role="group" aria-label="Perluas jadi frasa"><button class="icon tint wexb" id="wexl" aria-label="Tambah kata sebelumnya" title="Tambah kata sebelumnya">‹</button><span class="wexlbl" aria-hidden="true">frasa</span>${['ja', 'zh-CN', 'zh'].includes(b.lang) && [...word].length > 1 && !el.querySelector('ruby') ? '<button class="icon tint wexb" id="wsplit" aria-label="Pecah per huruf" title="Pecah per huruf">✂</button>' : ''}<button class="icon tint wexb" id="wexp" aria-label="Tambah kata berikutnya" title="Tambah kata berikutnya">›</button></span></div>
    ${ttsNote(b.lang)}
    <div class="wmeta"><span class="pos" id="wpos"></span><span class="hskc" id="whsk"></span><span id="wbaca"></span><span id="wbase"></span><span id="wpart"></span></div>
    <div class="offnet" id="woff" role="status" hidden></div>
    <div class="tr" id="wtr" lang="${esc(db.my)}" aria-live="polite"><span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span></div>
    <div class="wnote"><span id="wlook"></span><span class="wfreq" id="wfreq"></span><span class="wtap" id="wtap"></span></div>
    <div class="whint" id="whint" hidden></div>
    ${db.seenExpHint ? '' : '<div class="mut sm" id="wonce">Mau lebih dari satu kata? Ketuk ‹ ›</div>'}
    <div class="wsug" id="wsug" hidden></div>
    <div class="dict" id="wdict"></div>
    <div class="walt" id="walt"></div>
    <div class="wact" role="group" aria-label="Aksi kata"><button class="pri" id="wsave">${saveLbl()}</button><button class="hardbtn hardic" id="whard" type="button" aria-pressed="false" aria-label="Ulang besok" title="Ulang besok">${ico('flag')}<span>Ulang besok</span></button><button class="sec" id="wtanda" type="button">Tandai &amp; lanjut</button><button class="sec" id="wkenal" hidden></button><button class="sec" id="whafal" type="button" hidden></button><button class="sec" id="wnama" type="button" hidden></button></div>
    <div class="wact2"><button class="ghost" data-close id="wdone">Selesai</button><button class="ghost" id="wnext">${ico('eye')} Masih bingung? Lihat kalimatnya</button></div>`, 'Arti kata');
  const kenalLbl = () => isKenal(b.lang, word) ? `${ico('bmcheck')} Belum kenal` : 'Sudah kenal';
  const updHard = () => { const h = $('#whard'); if (!h) return; h.hidden = isNama(b, word); const on = db.vocab.some(v => v.hard && sameVocab(v, b.lang, word)), t = on ? 'Batal ulang besok' : 'Ulang besok'; h.classList.toggle('on', on); h.setAttribute('aria-pressed', String(on)); h.setAttribute('aria-label', t); h.title = t; const sp = h.querySelector('span'); if (sp) sp.textContent = t; };
  const updKenal = () => { updHard(); const k = $('#wkenal'); if (!k) return; k.hidden = isSaved() || isNama(b, word); k.innerHTML = kenalLbl(); updHafal(); };
  const hafalOf = () => db.vocab.find(v => v.t && sameVocab(v, b.lang, word));
  const updHafal = () => { const h = $('#whafal'); if (!h) return; const v = hafalOf(); h.hidden = !v || isNama(b, word); if (v) { h.innerHTML = v.known ? `${ico('check')} Udah hafal` : 'Udah hafal'; h.setAttribute('aria-pressed', v.known ? 'true' : 'false'); } };
  const paintKenal = (w, on) => $$('.cols .w').forEach(x => { if (x.textContent.toLowerCase() === w.toLowerCase() && !x.classList.contains('saved')) x.classList.toggle('kenal', on); });
  const showSug = n => {
    const g = $('#wsug'); if (!g) return;
    const k = b.lang + '|' + word.toLowerCase();
    if (n < 3 || isSaved() || sugSeen.has(k)) { g.hidden = true; g.innerHTML = ''; return; }
    sugSeen.add(k);
    g.innerHTML = `<span>Sudah ${n}× diketuk. Simpan biar gampang diulang?</span><button class="pill-sm" id="wsug-b">Simpan</button>`;
    g.hidden = false;
    $('#wsug-b').onclick = () => { g.hidden = true; g.innerHTML = ''; $('#wsave').click(); };
  };
  const showTap = n => { const t = $('#wtap'); if (t) t.textContent = n >= 1 ? `Diketuk ${n}×` : ''; if (n >= 3 && !isParticle(b.lang, word) && !isUmum(b.lang, word)) $$('.cols .w').forEach(x => { if (x.textContent.toLowerCase() === word.toLowerCase()) x.classList.add('often'); }); showSug(n); };
  showTap(countTap(b.lang, word)); recSess(b, word, sent); tapPaham(b, word);
  keepVisible('.w.sel');
  $('#sw').onclick = () => speak(word, b.lang, 0.8);
  award(1, 'look');
  const bumpLook = () => { db.looks = db.looks || {}; const k = b.lang + '|' + word.toLowerCase(); const n = db.looks[k] = (db.looks[k] || 0) + 1; save(); bumpSentLook(b.id, 'kata'); const e = $('#wlook'); if (e) e.textContent = n > 1 ? `Udah kamu cek ${n}×` : 'Pertama kali kamu cek kata ini'; };
  const baseLabel = (w, lang, base) => { const x = baseOf(w, base); if (x) return 'Bentuk dasar: ' + x; const g = baseOf(w, guessBase(w, lang)); return g ? 'Bentuk dasar: ' + g + ' (tebakan)' : ''; };
  const setTx = (sel, t) => { const e = $(sel); if (e) { e.textContent = t; if (sel === '#wtr') arriveFx(e); } };
  const setWBaca = t => { const e = $('#wbaca'); if (!e) return; e.dataset.b = t; e.textContent = db.showBaca ? t : ''; };
  const savedOf = () => db.vocab.find(v => v.t && sameVocab(v, b.lang, word));
  const kosongOf = () => db.vocab.find(v => !String(v.t || '').trim() && sameVocab(v, b.lang, word));
  /* #1685: kata tersimpan tanpa arti terisi otomatis saat diketuk ulang; titik penanda hilang */
  const isiKosong = r => { const v = kosongOf(); if (!v || !r || !String(r.text || '').trim()) return; v.t = r.text; v.baca = bacaOf(v.w, r.baca); if (r.base) v.base = r.base; if (r.dict && r.dict[0]) v.pos = r.dict[0].pos; delete v.noTr; delete v.nyusul; save(); const k = String(word).trim().toLowerCase(); $$('.cols .w.noarti').forEach(x => { if (x.textContent.trim().toLowerCase() === k) x.classList.remove('noarti'); }); if (kataSeg && $('#klist')) viewKata(); };
  if (b.lang === 'zh-CN') hskLoad().then(() => { const lv = hskOf(word), e = $('#whsk'); if (e && lv) { e.textContent = 'HSK ' + lv; e.setAttribute('aria-label', 'Level HSK ' + lv); } });
  let pickT = '';
  const pickChip = () => { const t = $('#wtr'); if (t && !t.querySelector('.pickchip')) t.insertAdjacentHTML('beforeend', ' <span class="stepchip pickchip">pilihanmu</span>'); };
  const showSaved = v => {
    setTx('#wtr', v.t); if (v.pick) pickChip();
    setWBaca(bacaDisp(word, bacaShow(word, v.baca, b.lang)));
    setTx('#wbase', baseLabel(word, b.lang, v.base));
    setTx('#wpos', v.pos ? (POS[v.pos] || v.pos) : '');
    { const dc = $('#wdict'); if (dc) dc.innerHTML = '<span class="offchip">Tersimpan, jalan tanpa internet</span>'; }
    keepVisible('.w.sel');
  };
  /* lencana "Mungkin frasa": opsional, hanya dari cache terjemahan (tanpa jaringan baru) */
  const NOSPACE = new Set(['ja', 'zh-CN', 'zh', 'th']);
  const PART = new Set(['up', 'out', 'off', 'over', 'in', 'on', 'away', 'down']);
  const FUNC = new Set(['the', 'a', 'an', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'that', 'of', 'to', 'and', 'or', 'but', 'is', 'was', 'are', 'were', 'be', 'at', 'by', 'for', 'with', 'from', 'as', 'if', 'so', 'not', 'no']);
  const wl = i => (ws[i] ? ws[i].textContent.toLowerCase().replace(/[^\p{L}\p{N}']/gu, '') : '');
  const toks = t => (t.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).filter(x => x.length > 2);
  const hintDir = () => {
    if (lo !== hi || NOSPACE.has(b.lang)) return 0;
    const me = wl(lo), nx = wl(lo + 1), pv = wl(lo - 1);
    if (b.lang === 'en') {
      if (!PART.has(me) && !FUNC.has(me) && PART.has(nx) && hi < ws.length - 1) return 1;
      if (PART.has(me) && pv && !FUNC.has(pv) && !PART.has(pv) && lo > 0) return -1;
    }
    /* frasa 2 kata dari cache: artinya tak berbagi kata dengan arti per kata */
    const diff = (ph, parts) => { const pt = cachedTr(ph, b.lang, db.my); if (!pt) return false; const got = parts.map(x => cachedTr(x, b.lang, db.my)); if (got.some(x => !x)) return false; const pw = toks(pt), bag = new Set(got.flatMap(toks)); return pw.length > 0 && !pw.some(x => bag.has(x)); };
    if (hi < ws.length - 1 && nx && diff(me + ' ' + nx, [me, nx])) return 1;
    if (lo > 0 && pv && diff(pv + ' ' + me, [pv, me])) return -1;
    return 0;
  };
  const showHint = () => {
    const h = $('#whint'); if (!h) return;
    const d = db.plain ? 0 : hintDir();
    if (!d) { h.hidden = true; h.innerHTML = ''; return; }
    h.innerHTML = `<button class="hintchip" id="whb" aria-label="Mungkin frasa. Ketuk untuk tambah kata ${d > 0 ? 'berikutnya' : 'sebelumnya'}">Mungkin frasa <span aria-hidden="true">${d > 0 ? '›' : '‹'}</span></button>`;
    h.hidden = false;
    $('#whb').onclick = () => grow(d);
  };
  const wtrEl = $('#wtr'); let slowT = 0, trAc = null, repaintDict = null;
  /* 'Ini nama': tanpa terjemahan mesin, chip 'Nama', tak bisa disimpan sebagai kata belajar */
  const namaLbl = () => isNama(b, word) ? 'Bukan nama' : 'Ini nama';
  const updNama = () => { const n = $('#wnama'), sv = $('#wsave'); if (n) { n.hidden = isSaved(); n.textContent = namaLbl(); n.setAttribute('aria-pressed', isNama(b, word) ? 'true' : 'false'); } if (sv) sv.hidden = isNama(b, word); updKenal(); };
  const showNama = () => {
    setTx('#wpos', ''); setWBaca(''); setTx('#wbase', ''); setTx('#wpart', ''); setTx('#wfreq', '');
    const t = $('#wtr'); if (t) t.innerHTML = '<span class="stepchip namachip">Nama</span> <span class="mut sm">Nama tokoh/tempat, nggak diartiin.</span>';
    const d = $('#wdict'); if (d) d.innerHTML = ''; const h = $('#whint'); if (h) { h.hidden = true; h.innerHTML = ''; } const g = $('#wsug'); if (g) { g.hidden = true; g.innerHTML = ''; }
    updNama(); keepVisible('.w.sel');
  };
  const slowMsg = (my, retry, off) => { if (my !== tok || $('#wtr') !== wtrEl) return; wtrEl.innerHTML = `<span class="loading">${off ? 'Lagi offline. Arti muncul begitu ada sinyal.' : 'Masih nyari artinya…'}</span> <button class="ghost wretry" id="wslow">Coba lagi</button>`; $('#wslow').onclick = () => { wtrEl.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; retry(); }; };
  /* #1603: chip 'Lagi offline' di dalam sheet (bukan toast); hanya bila arti belum tersimpan */
  const offChip = on => { const o = $('#woff'); if (!o) return; o.hidden = !on; o.innerHTML = on ? `${ico('wifioff')}<span>Lagi offline. Arti baru butuh internet.</span>` : ''; };
  const load = () => { const my = ++tok; if (trAc) trAc.abort(); if (navigator.onLine !== false || savedOf()) offChip(false); if (isNama(b, word)) { clearTimeout(slowT); showNama(); return Promise.resolve(); } trAc = new AbortController(); const sig = trAc.signal; const sv = savedOf(); if (sv) showSaved(sv); clearTimeout(slowT); if (!sv) { if (!navigator.onLine) slowMsg(my, load, true); else slowT = setTimeout(() => slowMsg(my, load), SLOW_MS); } return translate(qWord(), b.lang, db.my, sig).then(r => {
    if (my !== tok || !$('#wtr')) return;
    clearTimeout(slowT); offChip(false);
    tr = r; gagalTandai(b.lang, word, false); setTx('#wpart', partNote());
    isiKosong(r);
    { const pk = savedOf(); if (pk && pk.pick) showSaved(pk); else if (pickT) { setTx('#wtr', pickT); pickChip(); } else setTx('#wtr', r.text); }
    setWBaca(bacaDisp(word, bacaShow(word, r.baca, b.lang)));
    setTx('#wbase', baseLabel(word, b.lang, r.base));
    const d = r.dict || [];
    setTx('#wpos', d.length ? (POS[d[0].pos] || d[0].pos) : '');
    const alt = altFlat(altArti(d, r.text));
    if ($('#walt') && !$('#walt').dataset.open && !$('#walt').firstChild) altLink();
    /* #1333: semua arti lain = chip besar (ketuk = pilih, alur #1106); maks 8/jenis, tampil 6 + 'Lihat semua'; frasa (dt=ex) maks 3 */
    /* #1459: bagian 'Arti lain' SELALU tampil: ada / memuat / gagal / kosong. Arti terpilih tetap di daftar (centang). */
    const kind = { dd: d, ex: r.ex, st: alt.length ? 'ada' : 'muat', ph: [] };
    const chipList = dd => altFlat(altArti(dd, '').map(g => ({ pos: g.pos, terms: g.terms.slice(0, 8) })));
    const norm = t => String(t || '').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
    const paintDict = () => {
      const el = $('#wdict'); if (!el) return;
      const H = '<div class="wchips-h">Arti lain · ketuk untuk pakai</div>';
      const cur = norm(curT() || r.text);
      let flat = [], body = '';
      const chip = (t, i) => { const on = norm(t) === cur; return `<button class="wchip${on ? ' on' : ''}" type="button" data-i="${i}" dir="auto"${on ? ' aria-pressed="true"' : ''}${i >= 6 && !on ? ' hidden' : ''}>${on ? '<span aria-hidden="true">✓ </span>' : ''}${esc(t)}</button>`; };
      if (kind.st === 'muat') body = '<div class="wchips" role="status" aria-label="Lagi memuat arti lain"><span class="wchip wskel"></span><span class="wchip wskel"></span><span class="wchip wskel"></span></div>';
      else if (kind.st === 'gagal') body = '<div class="wchips-msg"><span class="mut sm">Arti lain belum bisa dimuat</span> <button class="ghost wretry" type="button" id="wacoba">Coba lagi</button></div>';
      else if (kind.st === 'satu') body = '<div class="wchips-msg"><span class="mut sm">Belum ada arti lain untuk kata ini</span></div>';
      else if (kind.st === 'kosong') body = '<div class="wchips-msg"><span class="mut sm">Belum ada arti lain untuk kata ini</span> <button class="ghost wretry" type="button" id="wakosong">Terjemahkan ulang</button></div>';
      else {
        flat = kind.ph.length ? kind.ph : chipList(kind.dd);
        body = `<div class="wchips" role="group" aria-label="Arti lain">${flat.map(chip).join('')}${flat.length > 6 ? `<button class="wchip wmore" type="button" id="wmore">Lihat semua (${flat.length})</button>` : ''}</div>`;
      }
      const exs = kind.st === 'ada' ? (Array.isArray(kind.ex) ? kind.ex : []).filter(t => typeof t === 'string' && t).slice(0, 3).map(t => `<div class="semua-ex" dir="auto" lang="${esc(b.lang)}">${esc(t).replace(/‹/g, '<b>').replace(/›/g, '</b>')}<small>contoh otomatis</small></div>`).join('') : '';
      el.innerHTML = `${H}${body}${exs ? `<div class="wchips-h">Frasa &amp; contoh</div>${exs}` : ''}<div class="mut sm">${kind.st === 'ada' && kind.src ? esc(kind.src) : ''}Terjemahan mesin, bisa keliru.</div>`;
      el.querySelectorAll('.wchip[data-i]').forEach(x => x.onclick = () => { const t = flat[+x.dataset.i]; if (t) pickArti(t); });
      const m = $('#wmore'); if (m) m.onclick = () => { el.querySelectorAll('.wchip[hidden]').forEach(x => x.hidden = false); m.remove(); keepVisible('.w.sel'); };
      const rc = $('#wacoba'); if (rc) rc.onclick = () => fillAlt(false);
      const rk = $('#wakosong'); if (rk) rk.onclick = () => fillAlt(true);
    };
    repaintDict = paintDict;
    /* frasa 2+ kata tanpa daftar: arti per kata sebagai chip pengganti */
    const perKata = async (q0, sig2) => {
      const parts = [...new Set(q0.split(/\s+/).filter(Boolean))].slice(0, 4); if (parts.length < 2 || NOSPACE.has(b.lang)) return [];
      const got = await Promise.all(parts.map(p => { const c = cachedTr(p, b.lang, db.my); return c ? Promise.resolve(c) : translate(p, b.lang, db.my, sig2).catch(() => null); }));
      const out = [], seen = new Set();
      got.forEach(g => { const t = g && typeof g.text === 'string' ? g.text.trim() : ''; if (t && !seen.has(norm(t))) { seen.add(norm(t)); out.push(t); } });
      return out;
    };
    /* #1906: tiap jalur berakhir ada/gagal/kosong; batas keras 8 detik untuk seluruh isian (termasuk perKata); isian baru membatalkan yang lama */
    let altAc = null;
    const fillAlt = async force => {
      const q0 = qWord(), txt = r.text; kind.st = 'muat'; paintDict();
      if (altAc) altAc.abort();
      const ac = altAc = new AbortController(), onAb = () => ac.abort();
      if (sig.aborted) ac.abort(); else sig.addEventListener('abort', onAb);
      const tm = setTimeout(() => ac.abort(), 8000);
      const ok = () => my === tok && $('#wdict') && qWord() === q0;
      const lim = p => Promise.race([p, new Promise((_, rej) => { if (ac.signal.aborted) rej(new Error('batal')); else ac.signal.addEventListener('abort', () => rej(new Error('batal'))); })]);
      try {
        if (navigator.onLine === false) throw new Error('offline');
        let more;
        if (force) { const r2 = await lim(translate(q0, b.lang, db.my, ac.signal, true)); more = r2 && Array.isArray(r2.dict) ? r2.dict : []; if (!more.length && r2 && Array.isArray(r2.alt)) more = r2.alt; if (!more.length) more = await lim(altFetch(q0, b.lang, db.my, ac.signal)); }
        else if (Array.isArray(r.alt) && r.alt.length) more = r.alt;
        else more = await lim(altFill(q0, b.lang, db.my, ac.signal));
        if (!ok()) return;
        const hadDict = altFlat(Array.isArray(more) ? more : []).length > 0 || (Array.isArray(r.dict) && r.dict.some(x => x && Array.isArray(x.terms) && x.terms.length));
        if (altFlat(altArti(more, txt)).length) { kind.dd = more; kind.st = 'ada'; kind.ph = []; kind.src = ''; }
        else {
          /* #1975: kata dasar -> pivot Inggris -> MyMemory -> arti per kata; baru pesan jujur */
          const ex = await lim(altExtra(q0, b.lang, db.my, r.base, ac.signal)); if (!ok()) return;
          const eg = altArti(ex.groups, txt);
          if (altFlat(eg).length) { kind.dd = eg; kind.st = 'ada'; kind.ph = []; kind.src = ex.src === 'base' ? 'Dari kata dasar: ' + ex.base + '. ' : ''; }
          else { const ph = await lim(perKata(q0, ac.signal)); if (!ok()) return; if (ph.length) { kind.ph = ph; kind.st = 'ada'; kind.src = ''; } else kind.st = hadDict ? 'satu' : 'kosong'; }
        }
      } catch (e) { if (!ok()) return; kind.st = 'gagal'; }
      finally { clearTimeout(tm); sig.removeEventListener('abort', onAb); if (altAc === ac) altAc = null; }
      paintDict(); keepVisible('.w.sel');
    };
    paintDict();
    /* arti lain kosong: ambil ulang sekali di latar; hasilnya selalu salah satu kondisi tetap */
    if (!alt.length) {
      if (r.off || (b.lang === 'ja' && db.my === 'id')) perKata(qWord(), sig).then(ph => { if (my !== tok || !$('#wdict')) return; if (ph.length) { kind.ph = ph; kind.st = 'ada'; paintDict(); } else if (navigator.onLine !== false) fillAlt(false); else { kind.st = 'kosong'; paintDict(); } }).catch(() => { if (my === tok && $('#wdict')) { kind.st = 'kosong'; paintDict(); } });
      else fillAlt(false);
    }
    setTimeout(() => { if (my === tok && $('#wfreq')) { try { showFreq(word, b); } catch (e) {} keepVisible('.w.sel'); } }, 0);
    keepVisible('.w.sel'); showHint();
  }).catch(() => { if (my === tok) clearTimeout(slowT); if (my === tok && $('#wtr') && !sv) { const off = !navigator.onLine; offChip(off); if (!off) gagalTandai(b.lang, word, true); $('#wtr').innerHTML = `<span class="loading">${kosongOf() ? 'Arti kata ini masih kosong. Coba lagi kalau sinyal sudah ada.' : off ? 'Ketuk Simpan, artinya nyusul pas ada sinyal.' : 'Arti belum ketemu, sinyal lemah?'}</span> <button class="ghost wretry" id="wretry">Coba lagi</button>`; $('#wretry').onclick = () => { $('#wtr').innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; load(); }; } }); };
  /* 'Arti ini salah?': daftar maks 3 arti lain; pilihan disimpan ke kartu & tak tertimpa */
  const wAlt = $('#walt');
  const altLink = () => { if (!wAlt) return; delete wAlt.dataset.open; wAlt.innerHTML = '<button class="ghost walink" id="walink" type="button">Arti ini salah?</button>'; $('#walink').onclick = openAlt; };
  const curT = () => { const v = savedOf(); return (v && v.t) || pickT || (tr && tr.text) || ''; };
  const pickArti = t => {
    const w = word, v = savedOf();
    if (v) { v.t = t; v.pick = 1; delete v.noTr; delete v.nyusul; save(); if (kataSeg && $('#klist')) viewKata(); } else pickT = t;
    vib(8); setTx('#wtr', t); pickChip(); if (repaintDict) repaintDict(); keepVisible('.w.sel');
    if (wAlt && word === w) { delete wAlt.dataset.open; wAlt.innerHTML = '<div class="mut sm" role="status">Oke, arti ini yang dipakai.</div>'; setTimeout(() => { if ($('#walt') === wAlt && word === w && !wAlt.dataset.open) altLink(); }, 2200); }
  };
  /* 'Terjemahkan ulang': lewati cache sekali; gagal = arti lama tetap, pesan ramah */
  const reAlt = async () => {
    if (!wAlt) return; const w = word; wAlt.dataset.open = '1';
    wAlt.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi terjemahin ulang"><i></i><i></i><i></i></span>';
    try {
      const r = await translate(qWord(), b.lang, db.my, undefined, true);
      if (word !== w || $('#walt') !== wAlt) return;
      if (r && typeof r.text === 'string' && r.text.trim()) tr = r;
    } catch (e) {
      if (word !== w || $('#walt') !== wAlt) return;
      wAlt.innerHTML = '<div class="altbox"><div class="mut sm">Belum bisa terjemahin ulang, sinyal lemah? Arti lama tetap aman.</div><div class="altrow"><button class="ghost wretry" id="waretry" type="button">Coba lagi</button><button class="ghost wretry" id="waclose" type="button">Tutup</button></div></div>';
      $('#waretry').onclick = reAlt; $('#waclose').onclick = altLink; return;
    }
    openAlt();
  };
  let openAc = null;
  const openAlt = async () => {
    if (!wAlt) return; const w = word; wAlt.dataset.open = '1';
    if (openAc) openAc.abort(); const oac = openAc = new AbortController(), otm = setTimeout(() => oac.abort(), 8000);
    const fail = msg => { if (word !== w || $('#walt') !== wAlt) return; wAlt.innerHTML = `<div class="altbox"><div class="mut sm">${msg}</div><div class="altrow"><button class="ghost wretry" id="waretry" type="button">Coba lagi</button><button class="ghost wretry" id="waclose" type="button">Tutup</button></div></div>`; $('#waretry').onclick = openAlt; $('#waclose').onclick = altLink; };
    wAlt.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari arti lain"><i></i><i></i><i></i></span>';
    let groups = [];
    try {
      const cur = curT(), base = (tr && tr.dict) || [];
      groups = altArti(base, cur);
      if (altCount(groups) < 3 && !(b.lang === 'ja' && db.my === 'id')) {
        const more = await altFetch(qWord(), b.lang, db.my, oac.signal);
        groups = altArti([...base, ...more], cur);
      }
    } catch (e) { clearTimeout(otm); if (openAc !== oac) return; return fail('Arti belum ketemu, kayaknya kena batas layanan gratis. Coba lagi ya.'); }
    clearTimeout(otm);
    if (word !== w || $('#walt') !== wAlt) return;
    const list = altFlat(groups);
    if (!list.length) { const final = !!(tr && tr.dict && tr.dict.length); wAlt.innerHTML = '<div class="altbox"><div class="mut sm">Belum ada arti lain untuk kata ini</div><div class="altrow">' + (final ? '' : '<button class="ghost wretry" id="warefresh" type="button">Terjemahkan ulang</button>') + '<button class="ghost wretry" id="waclose" type="button">Tutup</button></div></div>'; $('#waclose').onclick = altLink; if (!final) $('#warefresh').onclick = reAlt; return; }
    wAlt.innerHTML = `<div class="altbox"><div class="mut sm"><b>Mungkin maksudnya:</b></div>${tr && tr.baca ? `<div class="mut sm">Cara baca: ${esc(bacaDisp(word, bacaShow(word, tr.baca, b.lang)))}</div>` : ''}${altHtml(groups)}<div class="altrow"><button class="ghost wretry" id="warefresh" type="button">Terjemahkan ulang</button><button class="ghost wretry" id="waclose" type="button">Tutup</button></div></div>`;
    $('#warefresh').onclick = reAlt;
    $$('#walt .altopt').forEach(x => x.onclick = () => pickArti(list[+x.dataset.i]));
    $('#waclose').onclick = altLink; keepVisible('.w.sel');
  };
  load(); bumpLook();
  const updExp = () => { const room = hi - lo + 1 < MAXW; const set = (id, can) => { const e = $(id); if (e) { e.disabled = !can; } }; set('#wexp', room && hi < ws.length - 1); set('#wexl', room && lo > 0); };
  updExp();
  if ($('#wonce')) { db.seenExpHint = true; save(); }
  let expT = 0;
  const grow = dir => {
    if (hi - lo + 1 >= MAXW) return;
    if (dir > 0 && hi < ws.length - 1) hi++; else if (dir < 0 && lo > 0) lo--; else return;
    vib(8); sfx('pop');
    ws.forEach((w, i) => w.classList.toggle('sel', i >= lo && i <= hi));
    word = phraseOf(); tr = null; pickT = ''; { const wa = $('#walt'); if (wa) { delete wa.dataset.open; wa.innerHTML = ''; } } tok++; if (trAc) trAc.abort(); clearTimeout(expT); clearTimeout(slowT);
    setTx('#wword', word); setTx('#wpos', ''); setWBaca(''); setTx('#wbase', ''); setTx('#wpart', '');
    { const d1 = $('#wdict'), f1 = $('#wfreq'), t1 = $('#wtr'); if (d1) d1.innerHTML = ''; showHint(); if (f1) f1.textContent = ''; showTap(tapsOf(b.lang, word)); if (t1) t1.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; }
    $('#wsave').innerHTML = saveLbl(); updNama(); updExp(); keepVisible('.w.sel');
    expT = setTimeout(() => { if ($('#wtr')) { load(); bumpLook(); } }, 350);
  };
  $('#wexp').onclick = () => grow(1);
  if ($('#wsplit')) $('#wsplit').onclick = () => {
    const cs = [...el.textContent]; let k = 0;
    if (RD.tapX != null && el.firstChild) { const tn = el.firstChild, r = document.createRange(); let off = 0; for (let i = 0; i < cs.length; i++) { try { r.setStart(tn, off); r.setEnd(tn, off + cs[i].length); const q = r.getBoundingClientRect(); if (RD.tapX >= q.left && RD.tapX <= q.right) { k = i; break; } } catch (e) { } off += cs[i].length; } }
    const fr = document.createDocumentFragment(); let pick = null;
    cs.forEach((c, i) => { const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = c; if (i === k) pick = sp; fr.appendChild(sp); });
    el.replaceWith(fr); RD.tapX = null; onWord(pick);
  };
  $('#wexl').onclick = () => grow(-1);
  updKenal();
  $('#wkenal').onclick = () => {
    const w = word, lang = b.lang, was = isKenal(lang, w), apply = on => { setKenal(lang, w, on); paintKenal(w, on); const k = $('#wkenal'); if (k && word === w) k.innerHTML = kenalLbl(); };
    apply(!was); vib(8);
    toast(was ? 'Dibatalkan, kata ini muncul lagi' : 'Ditandai sudah kenal', 5000, { label: 'Urungkan', fn: () => apply(was) });
  };
  updNama();
  $('#whafal').onclick = () => {
    const w = word, lang = b.lang, vs = db.vocab.filter(v => v.t && sameVocab(v, lang, w)); if (!vs.length) return;
    const was = !!vs[0].known, prev = vs.map(v => ({ v, known: v.known, due: v.due }));
    const sync = () => { updHafal(); refreshHafal(); if (kataSeg && $('#klist')) viewKata(); };
    vs.forEach(v => { v.known = !was; if (!was) v.due = 0; }); save(); paintHafal(lang, w, !was); sync(); vib(8); sfx('pop');
    toast(was ? 'Balik ke lagi dihafal' : 'Ditandai udah hafal', 5000, { label: 'Urungkan', fn: () => { prev.forEach(p => { p.v.known = p.known; p.v.due = p.due; }); save(); paintHafal(lang, w, was); sync(); } });
  };
  $('#whard').onclick = async () => {
    const h = $('#whard'); if (h.disabled) return; h.disabled = true;
    try {
      if (!isSaved()) await $('#wsave').onclick(); /* alur Simpan yang sama; tanda sulit tidak menambah XP */
      const w = word, lang = b.lang, vs = db.vocab.filter(v => sameVocab(v, lang, w)); if (!vs.length) return;
      const was = !!vs[0].hard, now = Date.now(), prev = vs.map(v => ({ v, hard: v.hard, hd: v.hd, due: v.due, known: v.known }));
      vs.forEach(v => { if (!!v.hard === was) setHardVocab(v, now, true); }); save(); vib(8); sfx('pop'); updHard();
      const sync = () => { updHard(); if (kataSeg && $('#klist')) viewKata(); };
      toast(was ? 'Ulang besok dibatalkan' : 'Muncul lagi besok', 5000, { label: 'Urungkan', fn: () => { prev.forEach(p => { const x = p.v; if (p.hard) x.hard = p.hard; else delete x.hard; if (p.hd) x.hd = p.hd; else delete x.hd; x.due = p.due; x.known = p.known; }); save(); sync(); } });
    } finally { if (h.isConnected) h.disabled = false; }
  };
  $('#wnama').onclick = () => {
    const w = word, was = isNama(b, w);
    const apply = on => {
      setNama(b, w, on);
      if (on) $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === w.toLowerCase()) x.classList.remove('often', 'kenal'); });
      if ($('#wtr') && word === w) { if (on) { tok++; if (trAc) trAc.abort(); clearTimeout(slowT); showNama(); } else { $('#wtr').innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; updNama(); load(); } }
    };
    apply(!was); vib(8);
    toast(was ? 'Dibatalkan, kata ini diartiin lagi' : 'Ditandai sebagai nama', 5000, { label: 'Urungkan', fn: () => apply(was) });
  };
  $('#wsave').onclick = async () => {
    const mark = (w, on) => paintSaved(b.lang, w, on);
    if (isSaved()) {
      /* ketuk lagi = hapus dari kata tersimpan, bisa diurungkan */
      const w = word, lang = b.lang, gone = db.vocab.filter(v => sameVocab(v, lang, w)), at = db.vocab.indexOf(gone[0]);
      db.vocab = db.vocab.filter(v => !gone.includes(v)); tombVocab(lang, w); save(); vib(8); mark(w, false);
      const sb = $('#wsave'); if (sb) sb.innerHTML = saveLbl(); updKenal();
      toast('Kata dihapus', 5000, { label: 'Urungkan', fn: () => {
        if (!db.vocab.some(v => sameVocab(v, lang, w))) db.vocab.splice(Math.min(at, db.vocab.length), 0, ...gone);
        untombVocab(lang, w); save(); mark(w, true);
        const s2 = $('#wsave'); if (s2 && sameVocab({ lang: b.lang, w: word }, lang, w)) s2.innerHTML = saveLbl();
        if (kataSeg === 'simpan' && $('#klist')) viewKata();
      } });
      return;
    }
    const sg = $('#wsug'); if (sg) sg.innerHTML = '';
    const w = word, r = tr || await translate(qWord(), b.lang, db.my).catch(() => null);
    if (isSaved()) return; /* ketukan ganda saat menunggu terjemahan */
    const tp = takeTaps(b.lang, w);
    if (isKenal(b.lang, w)) setKenal(b.lang, w, false);
    db.vocab.unshift({ ...(tp > 0 ? { tap: tp } : {}), w, t: pickT || (r ? r.text : ''), ...(pickT ? { pick: 1 } : {}), baca: r ? bacaOf(w, r.baca) : '', ...(r && r.base ? { base: r.base } : {}), ...(r ? {} : { noTr: 1, nyusul: true }), pos: r && r.dict && r.dict[0] ? r.dict[0].pos : '', lang: b.lang, s: sent, ctx: ctxOf({ s: sent }), book: b.title, at: Date.now() });
    if (!save()) { db.vocab.shift(); return; } /* gagal simpan: tak ada toast 'masuk' (pesan gagal tampil dari save()) */
    vib(10); sfx('ding');
    mark(w, true);
    $('#wsave').innerHTML = saveLbl(); updNama(); award(2, 'save'); toast(r ? 'Tersimpan di tab Kata' : 'Lagi offline, arti nyusul ya', r ? 4000 : 6000, r ? null : { label: 'Isi arti', fn: () => isiArti(b.lang, w) });
  };
  /* #1363 Tandai & lanjut: pakai alur Simpan yang sama (XP & hitungan kata tak dobel), kartu tertutup, posisi baca tetap */
  const updTanda = () => { const t = $('#wtanda'); if (t) t.hidden = isSaved() || isNama(b, word); };
  updTanda(); const wsv0 = $('#wsave'); if (wsv0) new MutationObserver(updTanda).observe(wsv0, { childList: true, attributes: true, attributeFilter: ['hidden'] });
  $('#wtanda').onclick = async () => {
    const t = $('#wtanda'); if (t.disabled) return; t.disabled = true;
    const w = word, lang = b.lang, pos = b.pos;
    try { await $('#wsave').onclick(); } finally { if (t.isConnected) t.disabled = false; }
    if (!db.vocab.some(v => sameVocab(v, lang, w))) return;
    if (!MARKS.some(m => m.bid === b.id && m.pos === pos && m.lang === lang && m.w.toLowerCase() === w.toLowerCase())) MARKS.push({ bid: b.id, pos, lang, w });
    closeSheet();
  };
  $('#wnext').onclick = () => showSentence(word, sent, sIdx, sEl);
}
/* tambah/hapus garis bawah kata tersimpan di halaman baca yang tampil (tanpa pindah halaman) */
/* tandai massal: kata tersimpan (tersorot) di halaman ini -> 'sudah kenal'; alur sama dengan tombol per kata (hapus dari kartu + setKenal), bisa diurungkan */
function kenalPageWords() {
  const b = book(); if (!b) return [];
  const seen = new Set(), out = [];
  $$('.cols .w.saved').forEach(x => {
    const w = x.textContent.trim(), k = w.toLowerCase(); if (!k || seen.has(k)) return; seen.add(k);
    if (isKenal(b.lang, w) || !db.vocab.some(v => sameVocab(v, b.lang, w))) return; out.push(w);
  });
  return out;
}
function syncKenalAll() {
  const bt = $('#kenalAll'); if (!bt) return;
  const n = kenalPageWords().length; bt.hidden = !n;
  bt.innerHTML = `${ico('bmcheck')} Sudah kenal semua di halaman ini (${n})`;
}
function paintKenalW(lang, w, on) {
  const b = book(); if (!b || b.lang !== lang) return; const k = w.toLowerCase();
  $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === k && !x.classList.contains('saved')) x.classList.toggle('kenal', on); });
}
function kenalAllPage() {
  const b = book(), ws = kenalPageWords(); if (!b || !ws.length) return;
  const lang = b.lang, n = ws.length;
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Sudah kenal</span>${closeBtn}</div><p>Tandai ${n} kata sudah kenal?</p><div class="mut sm">Kata-katanya keluar dari kartu & berhenti disorot. Bisa diurungkan.</div><div class="set-row set-acts"><button class="sec full" id="kaNo" type="button">Batal</button><button class="full" id="kaYes" type="button">Ya, tandai ${n} kata</button></div>`, 'Konfirmasi sudah kenal');
  $('#kaNo').onclick = closeSheet;
  $('#kaYes').onclick = () => {
    const done = ws.map(w => { const gone = db.vocab.filter(v => sameVocab(v, lang, w)); return { w, gone, at: db.vocab.indexOf(gone[0]) }; });
    done.forEach(d => { db.vocab = db.vocab.filter(v => !d.gone.includes(v)); tombVocab(lang, d.w); setKenal(lang, d.w, true); paintSaved(lang, d.w, false); paintKenalW(lang, d.w, true); });
    save(); vib(8); closeSheet();
    toast(`${n} kata ditandai sudah kenal`, 5000, { label: 'Urungkan', fn: () => {
      done.slice().reverse().forEach(d => {
        if (!db.vocab.some(v => sameVocab(v, lang, d.w))) db.vocab.splice(Math.min(d.at, db.vocab.length), 0, ...d.gone);
        untombVocab(lang, d.w); setKenal(lang, d.w, false); paintKenalW(lang, d.w, false); paintSaved(lang, d.w, true);
      });
      save(); if (kataSeg === 'simpan' && $('#klist')) viewKata();
    } });
  };
}
function paintHafal(lang, w, on) {
  const b = book(); if (!b || b.lang !== lang) return;
  const k = String(w || '').trim().toLowerCase();
  $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === k) x.classList.toggle('hafal', on); });
}
function paintSaved(lang, w, on) {
  const b = book(); if (!b || b.lang !== lang) return;
  const k = String(w || '').trim().toLowerCase();
  $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === k) { const baru = on && !x.classList.contains('saved'); x.classList.toggle('saved', on); if (baru) { x.classList.remove('saved-new'); void x.offsetWidth; x.classList.add('saved-new'); x.addEventListener('animationend', () => x.classList.remove('saved-new'), { once: true }); } if (on) x.classList.remove('kenal'); else x.classList.remove('hafal'); } });
}
let lastSentLook = '';
function showSentence(word, sent, sIdx, sEl) {
  const b = book();
  /* hitung sekali per kalimat baru (balik ke kata lalu buka lagi kalimat yang sama tidak dihitung ulang) */
  const slk = b.id + '|' + b.pos + '|' + sIdx + '|' + sent.slice(0, 40);
  if (slk !== lastSentLook) { lastSentLook = slk; bumpSentLook(b.id, 'kalimat'); }
  sEl.classList.add('hl');
  /* kalimat sumber: tiap kata jadi tombol ketuk (pemecah kata sama dengan halaman baca); tanda/angka/partikel tetap teks biasa */
  const stoks = tokens(sent, b.lang);
  let mRange = null;
  if (word) { const m = new RegExp('(^|[^\\p{L}])(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?=[^\\p{L}]|$)', 'u').exec(sent); if (m) mRange = [m.index + m[1].length, m.index + m[1].length + m[2].length]; }
  const srcHtml = rng => {
    let pos = 0, o = '', open = false;
    for (const t of stoks) {
      const a = pos, z = pos + t.t.length; pos = z;
      if (rng && !open && a >= rng[0] && a < rng[1]) { o += '<mark>'; open = true; }
      const tap = t.w && !/^[\p{N}\p{P}\p{S}\s]+$/u.test(t.t) && !isParticle(b.lang, t.t);
      o += tap ? `<span class="sw" role="button" tabindex="0" data-sw="${esc(t.t)}" aria-label="Lihat arti kata ${esc(t.t)}">${esc(t.t)}</span>` : esc(t.t);
      if (open && z >= rng[1]) { o += '</mark>'; open = false; }
    }
    return open ? o + '</mark>' : o;
  };
  const marked = srcHtml(mRange);
  /* arti kata dari cache saja (tanpa permintaan baru); belum ada = baris tidak tampil */
  const wc = word ? trCache.get(b.lang + '|' + db.my + '|' + word) : null;
  const wMean = wc && wc.text ? String(wc.text).trim() : '';
  const wordGloss = `<div class="wgloss" id="wgl" aria-live="polite"${wMean ? '' : ' hidden'}>${wMean ? `<span class="wg-w" dir="auto" lang="${esc(b.lang)}">${esc(word)}</span><span class="wg-arr" aria-hidden="true">${ico('right')}</span><span class="wg-m" dir="auto" lang="${esc(db.my)}">${esc(wMean)}</span>` : ''}</div>`;
  openSheet(`
    <div class="sh-head">${word ? `<button class="icon" id="sback" aria-label="Balik ke arti kata">${ico('left')}</button>` : ''}<span class="stepchip" style="margin-right:auto">Arti kalimat</span><button class="icon snav" id="sprev" aria-label="Kalimat sebelumnya">${ico('left')}</button><button class="icon snav" id="snext" aria-label="Kalimat berikutnya">${ico('right')}</button>${closeBtn}</div>
    <div class="src" dir="auto" lang="${esc(b.lang)}">${marked}</div>${wordGloss}
    <div id="sbaca"></div>
    <div class="tr sent" id="str" lang="${esc(db.my)}" aria-live="polite"><span class="loading">Lagi nerjemahin kalimat…</span></div>
    <div class="ttsnote hide" id="smt" lang="${esc(db.my)}"></div>
    ${ttsNote(b.lang)}
    <div class="sheet-aux"><button class="ghost" id="ssp">${ico('vol')} Dengerin kalimatnya</button><button class="ghost" id="ssl">${ico('slow')} Pelan</button></div>
    ${db.aiJelas === false ? '' : `<div class="aij" id="aij"><button class="ghost" id="aibtn" type="button">Jelaskan kalimat ini (AI)</button><div class="aij-q mut sm" id="aiq"></div><div id="aiout" aria-live="polite"></div></div>`}
    <div class="row"><button class="lime" id="spr">${ico('mic')} Coba ngomongin</button></div>
    <div class="row" style="margin-top:10px"><button class="sec" data-close>Lanjut baca</button></div>`, 'Arti kalimat');
  keepVisible('.s.hl');
  const strEl = $('#str');
  const alive = () => $('#str') === strEl;
  let sSlow = 0, sTok = 0, sAc = null;
  const sSlowMsg = (my, off) => { if (!alive() || my !== sTok) return; strEl.innerHTML = `<span class="loading">${off ? 'Lagi offline. Arti muncul begitu ada sinyal.' : 'Masih nyari artinya…'}</span> <button class="ghost wretry" id="sslow">Coba lagi</button>`; $('#sslow').onclick = () => { strEl.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nerjemahin kalimat"><i></i><i></i><i></i></span>'; loadSent(); }; };
  const loadSent = () => { const my = ++sTok; if (sAc) sAc.abort(); sAc = new AbortController(); const sSig = sAc.signal; { const m = $('#smt'); if (m) m.classList.add('hide'); } clearTimeout(sSlow); if (!navigator.onLine) sSlowMsg(my, true); else sSlow = setTimeout(() => sSlowMsg(my), SLOW_MS); return translate(sent, b.lang, db.my, sSig).then(r => {
    if (!alive() || my !== sTok) return;
    clearTimeout(sSlow);
    const trEl = $('#str'), lm = wMean.toLowerCase(), lt = r.text.toLowerCase(), at = lm && lt.length === r.text.length ? lt.indexOf(lm) : -1;
    /* tahap 2: tandai hanya bila arti kata ketemu utuh di terjemahan; tidak ketemu = tanpa tanda */
    const LET = /[\p{L}\p{N}]/u, en = at + lm.length;
    if (at >= 0 && !(at > 0 && LET.test(r.text[at - 1])) && !(en < r.text.length && LET.test(r.text[en]))) {
      trEl.textContent = r.text.slice(0, at);
      const mk = document.createElement('mark'); mk.textContent = r.text.slice(at, en);
      trEl.append(mk, r.text.slice(en));
    } else trEl.textContent = r.text;
    arriveFx(trEl);
    /* tanda arti mesin (#605): hanya setelah terjemahan sukses; kalimat panjang = peringatan lebih kuat */
    const smt = $('#smt');
    if (smt && !db.plain) {
      const cjk = /^(ja|ko|zh)/i.test(b.lang), long = cjk ? [...sent].length > 80 : sent.trim().split(/\s+/).length > 25;
      smt.textContent = long ? 'Kalimat panjang, arti mesin sering meleset. Baca bagian per bagian.' : 'Arti mesin, bisa meleset. Tahan kata untuk cek.';
      smt.classList.remove('hide');
    }
    const bc = bacaOf(sent, r.baca), sb = $('#sbaca');
    if (bc && sb) {
      const v = `<div class="sbaca" dir="auto" lang="${esc(b.lang)}">${esc(bc)}</div>`;
      sb.innerHTML = db.showBaca ? v : `<button class="ghost sbaca-peek" id="speek" type="button">Lihat cara baca</button>` + v.replace('class="sbaca"', 'class="sbaca hide" id="speekv"');
      if ($('#speek')) $('#speek').onclick = () => { db.showBaca = true; save(); $('#speek').classList.add('hide'); $('#speekv').classList.remove('hide'); keepVisible('.s.hl'); };
    }
    keepVisible('.s.hl');
  }).catch(() => {
    if (!alive() || my !== sTok) return;
    clearTimeout(sSlow);
    const off = !navigator.onLine;
    $('#str').innerHTML = `<span class="loading">${off ? 'Lagi offline. Arti muncul begitu ada sinyal.' : 'Artinya belum kebuka. Coba lagi ya.'}</span> <button class="ghost wretry" id="sretry">Coba lagi</button>`;
    $('#sretry').onclick = () => { $('#str').innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; loadSent(); };
  }); };
  loadSent();
  /* Jelaskan kalimat (AI): hanya jalan saat tombol diketuk; sisa jatah harian dari server */
  if ($('#aibtn')) {
    const aib = $('#aibtn'), aiq = $('#aiq'), aio = $('#aiout');
    const devId = () => { let d = localStorage.getItem('kepo.dev'); if (!d) { d = Array.from(crypto.getRandomValues(new Uint8Array(12)), x => x.toString(16).padStart(2, '0')).join(''); localStorage.setItem('kepo.dev', d); } return d; };
    const setQ = n => { if (aiq && aiq.isConnected) aiq.textContent = n == null ? '' : n > 0 ? `Sisa jatah AI hari ini: ${n} dari 5` : 'Jatah AI hari ini habis. Balik lagi besok ya.'; };
    const msg = t => { if (aio.isConnected) aio.innerHTML = `<div class="ttsnote">${esc(t)}</div>`; };
    aib.onclick = async () => {
      if (typeof api !== 'function') return msg('Fitur ini belum siap. Arti kalimat biasa tetap jalan.');
      if (!navigator.onLine) return msg('Lagi offline. Penjelasan AI butuh sinyal, arti kalimat biasa tetap jalan.');
      aib.disabled = true; aio.innerHTML = '<span class="loading">AI lagi mikir…</span>';
      const mt = $('#str') && $('#str').textContent;
      try {
        const r = await api('/jelaskan', { method: 'POST', body: { dev: devId(), sent: sent.slice(0, 600), lang: b.lang, arti: mt && !/…$/.test(mt) ? mt.slice(0, 600) : '' } });
        if (!aio.isConnected) return;
        setQ(r.sisa);
        aio.innerHTML = `<div class="aij-box"><div class="aij-lbl">Penjelasan AI, bisa meleset</div><div class="aij-t" lang="${esc(db.my)}"></div><button class="ghost aij-rep" id="airep" type="button">Lapor kalau salah</button></div>`;
        aio.querySelector('.aij-t').textContent = r.teks;
        $('#airep').onclick = () => { $('#airep').disabled = true; api('/jelaskan/lapor', { method: 'POST', body: { dev: devId(), sent: sent.slice(0, 600), lang: b.lang, teks: r.teks } }).then(() => { const x = $('#airep'); if (x) x.textContent = 'Makasih, laporannya masuk'; }).catch(() => { const x = $('#airep'); if (x) { x.disabled = false; x.textContent = 'Gagal kirim, coba lagi'; } }); };
        keepVisible('.s.hl');
      } catch (e) { if (aio.isConnected) { if (/habis/i.test(e.message)) { setQ(0); aio.innerHTML = ''; } else msg(e.message + ' Arti kalimat biasa tetap jalan.'); } }
      aib.disabled = false;
    };
    if (aiq) aiq.textContent = 'Gratis 5x sehari';
  }
  /* ketuk kata di kalimat: arti muncul di baris .wgloss, sheet tetap terbuka, tidak simpan otomatis */
  {
    const srcEl = $('#sheet .src') || document.querySelector('.src'), gl = $('#wgl');
    let gTok = 0;
    const showGloss = async w => {
      const my = ++gTok, lang = b.lang, my2 = db.my, k = lang + '|' + my2 + '|' + w;
      const paint = (txt, r, fresh) => {
        if (my !== gTok || !gl.isConnected) return;
        const saved = db.vocab.some(v => sameVocab(v, lang, w));
        gl.hidden = false;
        gl.innerHTML = `<span class="wg-w" dir="auto" lang="${esc(lang)}"></span><span class="wg-arr" aria-hidden="true">${ico('right')}</span><span class="wg-m" dir="auto" lang="${esc(my2)}"></span>` + (txt ? `<button class="pill-sm wg-save" type="button" aria-label="${saved ? 'Kata ' + esc(w) + ' sudah tersimpan' : 'Simpan kata ' + esc(w)}"${saved ? ' disabled' : ''}>${saved ? (fresh ? '<svg class="wg-ck" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2 6.5l2.6 2.6L10 3.4"/></svg>' : '') + 'Tersimpan' : 'Simpan kata'}</button>` : '');
        gl.querySelector('.wg-w').textContent = w; gl.querySelector('.wg-m').textContent = txt || 'Lagi nyari artinya…';
        const sv = gl.querySelector('.wg-save');
        if (sv && !saved) sv.onclick = () => {
          if (db.vocab.some(v => sameVocab(v, lang, w))) return;
          const tp = takeTaps(lang, w);
          if (isKenal(lang, w)) setKenal(lang, w, false);
          db.vocab.unshift({ ...(tp > 0 ? { tap: tp } : {}), w, t: txt, baca: r ? bacaOf(w, r.baca) : '', ...(r && r.base ? { base: r.base } : {}), pos: r && r.dict && r.dict[0] ? r.dict[0].pos : '', lang, s: sent, ctx: ctxOf({ s: sent }), book: b.title, at: Date.now() });
          if (!save()) { db.vocab.shift(); return; } vib(10); sfx('ding'); paintSaved(lang, w, true); award(2, 'save'); toast('Masuk ke kartu kata kamu', 4000);
          paint(txt, r, true);
        };
      };
      /* tanda <mark> pindah ke kata yang diketuk */
      const i = [...srcEl.querySelectorAll('.sw')].findIndex(x => x === document.activeElement);
      srcEl.innerHTML = srcHtml(null);
      const nodes = [...srcEl.querySelectorAll('.sw')];
      const cur = nodes[i >= 0 ? i : nodes.findIndex(x => x.dataset.sw === w)];
      if (cur) { const mk = document.createElement('mark'); cur.replaceWith(mk); mk.appendChild(cur); if (i >= 0) cur.focus({ preventScroll: true }); }
      const c = trCache.get(k);
      if (c && c.text) return paint(String(c.text).trim(), c);
      paint('', null);
      try { const r = await translate(w, lang, my2); paint(r && r.text ? String(r.text).trim() : '', r); if (!(r && r.text) && my === gTok) gl.querySelector('.wg-m').textContent = 'Artinya belum kebuka'; }
      catch (e) { if (my === gTok && gl.isConnected) { gl.hidden = false; gl.querySelector('.wg-m').textContent = navigator.onLine ? 'Artinya belum kebuka. Coba lagi ya.' : 'Lagi offline. Arti muncul begitu ada sinyal.'; } }
    };
    if (srcEl) {
      const pick = e => { const t = e.target.closest && e.target.closest('.sw'); if (t && srcEl.contains(t)) { vib(6); showGloss(t.dataset.sw); } };
      srcEl.onclick = pick;
      srcEl.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(e); } };
    }
  }
  $('#ssp').onclick = () => speak(sent, b.lang);
  $('#ssl').onclick = () => speak(sent, b.lang, 0.6);
  if ($('#sback')) $('#sback').onclick = () => { const sel = sEl.querySelectorAll('.w.sel'); if (sel.length) onWord(sel[0], sel[sel.length - 1]); };
  $('#spr').onclick = () => { b.si = sIdx; save(); setTab('bicara'); };
  /* pindah ke kalimat tetangga: sheet tetap terbuka, sorot ikut pindah, halaman/bab menyusul */
  const body = () => [...document.querySelectorAll('#cols .s')].filter(e => !e.closest('h2'));
  const nb = d => { const l = body(), i = l.indexOf(sEl); return i < 0 ? null : l[i + d] || null; };
  const atEdge = d => !nb(d) && (d > 0 ? b.pos >= (b.total || 1) - 1 : b.pos <= 0);
  const sp = $('#sprev'), sn = $('#snext');
  sp.disabled = atEdge(-1); sn.disabled = atEdge(1);
  sp.style.opacity = sp.disabled ? '.35' : ''; sn.style.opacity = sn.disabled ? '.35' : '';
  const open = el => { $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); const pg = pageOf(el, $('#cols')); if (pg !== RD.page) showPage(pg); vib(6); showSentence('', el.textContent.trim(), +el.dataset.s, el); };
  const step = async d => {
    const el = nb(d); if (el) return open(el);
    if (d > 0 && b.pos < (b.total || 1) - 1) { b.pos++; b.si = 0; }
    else if (d < 0 && b.pos > 0) { b.pos--; b.si = 0; RD.toEnd = true; }
    else return;
    RD.quiet = true; save(); closeSheet(); await viewBaca();
    const l = body(), t = d > 0 ? l[0] : l[l.length - 1];
    if (t) open(t); else toast('Bagian ini kosong. Geser halaman aja ya.');
  };
  sp.onclick = () => step(-1); sn.onclick = () => step(1);
}

/* ---------- NGOMONG (tantangan) + BOSS (remedial) ---------- */
function ringHtml(p) {
  const C = 2 * Math.PI * 62, col = p >= PASS ? 'var(--color-success)' : p >= 60 ? 'var(--color-medium)' : 'var(--color-poor)';
  return `<div class="ring" role="img" aria-label="Skor ${p} persen"><svg viewBox="0 0 140 140"><circle class="bg" cx="70" cy="70" r="62"/><circle class="fg" cx="70" cy="70" r="62" stroke="${col}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - p / 100)}"/></svg><div class="score">${p}%<small>skor kamu</small></div></div>`;
}
const animRing = box => requestAnimationFrame(() => requestAnimationFrame(() => box.querySelectorAll('.ring .fg').forEach(c => c.style.strokeDashoffset = c.dataset.off)));
function micState(btn, lbl, st, extra) {
  btn.classList.toggle('rec', st === 'rec'); btn.classList.toggle('busy', st === 'busy');
  btn.innerHTML = ico(st === 'rec' ? 'stop' : 'mic');
  btn.setAttribute('aria-label', st === 'rec' ? 'Selesai ngomong' : 'Mulai ngomong');
  lbl.textContent = extra;
}
async function viewBicara() {
  const b = book();
  if (!b) { $('#view').innerHTML = emptyState('wow', 'Belum ada tantangan', 'Tambah cerita dulu, nanti kalimatnya jadi tantangan ngomong.', 'Tambah cerita', "setTab('rak')"); return; }
  const pages = await pagesOf(b);
  const sents = secParas(pages[b.pos], b.lang).flatMap(P => P.sents.filter(x => x.i >= 0).map(x => x.s.trim()));
  b.si = Math.max(0, Math.min(b.si || 0, sents.length - 1)); save();
  const sent = sents[b.si] || '';
  let wi = 0; const words = [];
  const tHtml = tokens(sent, b.lang).map(t => { if (!t.w) return esc(t.t); words.push(t.t); return `<span class="t" data-i="${wi++}">${esc(t.t)}</span>`; }).join('');
  progress(sents.length ? (b.si + 1) / sents.length * 100 : 0);
  $('#view').innerHTML = `
    ${SR || TEST ? '' : `<div class="note">${ico('alert')}<div>${micError('nosupport')}</div></div>`}
    <h1 style="margin:6px 2px 10px">Ngomong <span class="hl-txt">kalimat ini</span></h1>
    <div class="card">
      <div class="eyebrow center">Kalimat ${b.si + 1} dari ${sents.length}</div>
      <div class="target" id="target" lang="${esc(b.lang)}">${tHtml}</div>
      <div class="aux"><button id="ex">${ico('vol')} Contoh</button><button id="exs">${ico('slow')} Pelan</button></div>
      <div class="micwrap"><button class="mic" id="rec" aria-label="Mulai ngomong">${ico('mic')}</button><div class="mic-lbl" id="recl" aria-live="polite">Tap & ngomong</div></div>
      <div class="hint" id="rech">Santai aja, nggak ada yang denger kok</div>
      <div class="heard" id="heard"></div>
      <div id="res"></div>
    </div>
    <div id="remed"></div>
    <div class="pager"><button class="icon" id="sp" aria-label="Kalimat sebelumnya">${ico('left')}</button><span>${b.si + 1}/${sents.length}</span><button id="sn">Kalimat berikutnya ${ico('right')}</button></div>`;
  $('#ex').onclick = () => speak(sent, b.lang, 0.85);
  $('#exs').onclick = () => speak(sent, b.lang, 0.55);
  $('#sp').onclick = () => { if (b.si > 0) b.si--; else if (b.pos > 0) { b.pos--; b.si = 1e9; } else return; save(); viewBicara(); };
  $('#sn').onclick = () => { if (b.si < sents.length - 1) b.si++; else if (b.pos < pages.length - 1) { b.pos++; b.si = 0; } else return toast('Ini kalimat terakhir. Kamu keren!'); save(); viewBicara(); };
  const btn = $('#rec'), lbl = $('#recl');
  let timer;
  btn.onclick = async () => {
    if (btn.classList.contains('rec')) return stopListen();
    vib(15); if ('speechSynthesis' in window) speechSynthesis.cancel();
    const t0 = Date.now();
    micState(btn, lbl, 'rec', 'Lagi dengerin… 0:00');
    timer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); lbl.textContent = `Lagi dengerin… 0:${String(s).padStart(2, '0')}`; }, 500);
    $('#rech').textContent = 'Tap lagi kalau udah selesai.';
    $('#heard').textContent = ''; $('#res').innerHTML = ''; $('#remed').innerHTML = '';
    $$('#target .t').forEach(el => { el.className = 't'; delete el.dataset.p; });
    let cands;
    try { cands = await listen(b.lang, { onInterim: t => $('#heard').textContent = '“' + t + '”' }); }
    catch (e) { clearInterval(timer); micState(btn, lbl, 'idle', 'Tap & ngomong'); $('#rech').textContent = ''; return toast(micError(e), 6000); }
    clearInterval(timer);
    micState(btn, lbl, 'busy', 'Lagi ngitung skor…');
    if (!cands.length) { micState(btn, lbl, 'idle', 'Coba lagi'); $('#rech').textContent = ''; $('#heard').textContent = 'Suaranya belum kedengeran. Coba lebih deket ke mic ya.'; return; }
    $('#heard').textContent = 'Kedengeran: “' + cands[0] + '”';
    const sc = scoreSentence(words.map(norm), cands, b.lang);
    $$('#target .t').forEach((el, i) => setTimeout(() => { el.dataset.p = sc[i]; el.className = 't ' + cls(sc[i]); }, 450 + Math.min(i, 7) * 40));
    const avg = Math.round(sc.reduce((a, c) => a + c, 0) / (sc.length || 1));
    db.scores.push(avg); db.scores = db.scores.slice(-100); save();
    words.forEach((w, i) => recordWeak(w, b.lang, sc[i]));
    micState(btn, lbl, 'idle', 'Coba lagi'); $('#rech').textContent = '';
    const [k, label, msg, mood] = SCORE(avg);
    const gain = Math.max(2, Math.round(avg / 10)) + (avg >= PASS ? 5 : 0);
    $('#res').innerHTML = `<div class="result">${spot(mood, 'jump')}${ringHtml(avg)}<h2>${label}</h2><div class="sm">${msg}</div><div class="chips" style="justify-content:center"><span class="chip ${k}">${sc.filter(x => x >= PASS).length}/${sc.length} kata pas</span><span class="chip xp">+${gain} XP</span></div></div>`;
    animRing($('#res'));
    if (avg >= PASS) { sfx('win'); confetti(); vib([10, 40, 10]); } else sfx('soft');
    award(gain, 'speak'); if (avg >= 95) award(0, 'perfect');
    const worst = words.map((w, i) => ({ w, p: sc[i] })).filter(x => x.p < PASS && norm(x.w))
      .sort((a, c) => a.p - c.p).filter((x, i, a) => a.findIndex(y => norm(y.w) === norm(x.w)) === i).slice(0, 5);
    if (!worst.length) { $('#remed').innerHTML = `<div class="card center"><div class="trophy">${ico('trophy')}</div><h2>Semua kata pas!</h2><div class="mut sm">Gas ke kalimat berikutnya.</div></div>`; return; }
    $('#remed').innerHTML = `<div class="card"><span class="boss">${ico('sword')}BOSS LEVEL</span><h2 style="margin-top:10px">Kalahin kata tersulit</h2><div class="mut sm">Ada ${worst.length} kata yang masih bandel.</div>
      <div class="chips">${worst.map(x => chip(x.p, x.w)).join('')}</div>
      <div class="row"><button class="pri" id="goRem">${ico('sword')}Lawan ${worst.length} kata</button></div></div>`;
    $('#goRem').onclick = () => remedial(worst, b.lang, $('#remed'), () => {
      $('#remed').innerHTML = `<div class="card center">${spot('cheer', 'jump')}<h2>Boss kalah!</h2><div class="mut sm">Sekarang coba ngomongin kalimatnya utuh lagi.</div><div class="row"><button class="lime" id="again">${ico('mic')}Ngomong lagi</button></div></div>`;
      sfx('win'); confetti();
      $('#again').onclick = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); btn.click(); };
    });
  };
}
function recordWeak(w, lang, p) {
  const k = lang + ':' + norm(w); if (!norm(w)) return;
  const o = db.weak[k] || { w, lang, n: 0, last: 0, best: 0 };
  o.n++; o.last = p; o.best = Math.max(o.best, p); o.at = Date.now(); db.weak[k] = o; save();
}
/* arti di layar Boss: label 'arti mesin' + 'Arti ini salah?' (pilihan disimpan ke kartu Kata, sama seperti sheet kata) */
function bossArti(w, lang) {
  const tr = $('#rtr'), tm = $('#rtm'), al = $('#ralt'); if (!tr || !tm || !al) return;
  const alive = () => $('#rtr') === tr, sv = () => db.vocab.find(v => v.t && sameVocab(v, lang, w));
  let r = null, pickT = '';
  const cur = () => (sv() && sv().t) || pickT || (r && r.text) || '';
  const lbl = () => { const m = tm.querySelector('.itr-m'); if (m) m.textContent = (sv() && sv().pick) || pickT ? 'Arti pilihanmu' : 'Arti mesin, bisa meleset'; };
  const link = () => { delete al.dataset.open; al.innerHTML = '<button class="ghost walink" id="ralink" type="button">Arti ini salah?</button>'; $('#ralink').onclick = open; };
  const pick = t => {
    const v = sv(); if (v) { v.t = t; v.pick = 1; delete v.noTr; delete v.nyusul; save(); } else pickT = t;
    vib(8); tr.textContent = t; lbl(); delete al.dataset.open;
    al.innerHTML = '<div class="mut sm" role="status">Oke, arti ini yang dipakai.</div>'; setTimeout(() => { if (alive() && !al.dataset.open) link(); }, 2200);
  };
  const open = async () => {
    al.dataset.open = '1';
    const fail = msg => { if (!alive()) return; al.innerHTML = `<div class="altbox"><div class="mut sm">${msg}</div><div class="altrow"><button class="ghost wretry" id="raretry" type="button">Coba lagi</button><button class="ghost wretry" id="raclose" type="button">Tutup</button></div></div>`; $('#raretry').onclick = open; $('#raclose').onclick = link; };
    al.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari arti lain"><i></i><i></i><i></i></span>';
    let groups = [];
    try {
      const c = cur(), base = (r && r.dict) || []; groups = altArti(base, c);
      if (altCount(groups) < 3 && !(lang === 'ja' && db.my === 'id')) { const more = await altFetch(w, lang, db.my); groups = altArti([...base, ...more], c); }
    } catch (e) { return fail('Arti belum ketemu, kayaknya kena batas layanan gratis. Coba lagi ya.'); }
    if (!alive()) return; const list = altFlat(groups);
    if (!list.length) { al.innerHTML = '<div class="altbox"><div class="mut sm">Belum ada arti lain untuk kata ini</div><div class="altrow"><button class="ghost wretry" id="raclose" type="button">Tutup</button></div></div>'; $('#raclose').onclick = link; return; }
    al.innerHTML = `<div class="altbox"><div class="mut sm"><b>Mungkin maksudnya:</b></div>${altHtml(groups)}<div class="altrow"><button class="ghost wretry" id="raclose" type="button">Tutup</button></div></div>`;
    $$('#ralt .altopt').forEach(e => e.onclick = () => pick(list[+e.dataset.i]));
    $('#raclose').onclick = link;
  };
  const s0 = sv(); if (s0) { tr.textContent = s0.t; tm.hidden = false; lbl(); link(); }
  translate(w, lang, db.my).then(x => { if (!alive()) return; r = x; if (!sv() && !pickT) tr.textContent = x.text; tm.hidden = false; lbl(); if (!al.firstChild) link(); }).catch(() => { });
}
function remedial(list, lang, box, done) {
  let i = 0, tries = 0; const passed = [];
  const step = () => {
    if (i >= list.length) return done();
    const x = list[i];
    box.innerHTML = `<div class="card">
      <div class="dots">${list.map((_, k) => `<i class="${k === i ? 'on' : passed[k] ? 'done' : ''}"></i>`).join('')}</div>
      <div class="center"><span class="boss">${ico('sword')}BOSS ${i + 1}/${list.length}</span></div>
      <div class="eyebrow center lbl" style="margin-top:8px">Kata ${i + 1} dari ${list.length} · Target ${PASS}%</div>
      <div class="rem-word" lang="${esc(lang)}">${esc(x.w)}</div>${(() => { const t = bacaShow(x.w, '', lang); return t ? `<div class="rem-baca" lang="${esc(lang)}">${esc(t)}<small>Cara baca (perkiraan)</small></div>` : ''; })()}
      <div class="tr sent center" id="rtr" style="margin:4px 0"></div>
      <div class="rtm" id="rtm" hidden><span class="itr-m">Arti mesin, bisa meleset</span><div id="ralt"></div></div>
      <div class="aux"><button id="rl">${ico('vol')} Contoh</button><button id="rs">${ico('slow')} Pelan</button></div>
      <div class="rem-score" id="rsc"><span class="eyebrow">Skor sebelumnya</span><b>${x.p}%</b><span class="sm">${x.p < 60 ? 'Pelan-pelan aja.' : 'Dikit lagi!'}</span></div>
      <div class="micwrap"><button class="mic" id="rr" aria-label="Ucapin kata ini">${ico('mic')}</button><div class="mic-lbl" id="rrl" aria-live="polite">Ucapin kata ini</div></div>
      <div class="hint" id="rh">Nggak usah buru-buru. Dengerin contohnya sesering yang kamu mau.</div>
      <div class="row"><button class="ghost" id="rk">Skip dulu ${ico('right')}</button></div></div>`;
    bossArti(x.w, lang);
    $('#rl').onclick = () => speak(x.w, lang, 0.8);
    $('#rs').onclick = () => speak(x.w, lang, 0.45);
    $('#rk').onclick = () => { i++; tries = 0; step(); };
    $('#rr').onclick = async () => {
      const bt = $('#rr'), l = $('#rrl'); if (bt.classList.contains('rec')) return stopListen();
      vib(15); micState(bt, l, 'rec', 'Lagi dengerin…'); $('#rh').textContent = '';
      let c;
      try { c = await listen(lang, { single: true, onInterim: t => { if ($('#rh')) $('#rh').textContent = '“' + t + '”'; } }); }
      catch (e) { micState(bt, l, 'idle', 'Ucapin kata ini'); return toast(micError(e), 6000); }
      tries++;
      const p = c.length ? scoreWord(x.w, c, lang) : 0;
      recordWeak(x.w, lang, p);
      micState(bt, l, 'idle', p >= PASS ? 'Kena!' : 'Coba lagi');
      const [k] = SCORE(p);
      $('#rsc').innerHTML = `<span class="eyebrow">Skor terbaru</span><b style="color:var(--color-${k === 'g' ? 'success' : k === 'm' ? 'medium' : 'poor'})">${p}%</b><span class="sm">${p >= PASS ? 'Boss kalah! Lanjut ke berikutnya.' : p >= 60 ? 'Udah deket banget!' : 'Coba dengerin versi pelan dulu.'}</span>`;
      $('#rh').textContent = c.length ? 'Kedengeran: “' + c[0] + '”' : 'Suaranya belum kedengeran. Coba lebih deket ke mic.';
      box.querySelector('.lbl').textContent = `Kata ${i + 1} dari ${list.length} · Percobaan ${tries}`;
      if (p >= PASS) { vib([10, 40, 10]); sfx('ding'); passed[i] = 1; award(3, 'rem'); setTimeout(() => { i++; tries = 0; step(); }, 1100); }
      else if (tries >= 3) { sfx('soft'); $('#rh').textContent = 'Udah 3x nyoba, istirahat bentar atau skip dulu. Kata ini masuk daftar "Latih ucap" kok.'; }
      else { sfx('soft'); if (p < 60) speak(x.w, lang, 0.6); }
    };
  };
  step();
}

/* ---------- KATA: kartu swipe + daftar ---------- */
let deckExtra = []; /* kata baru disimpan; ikut kartu walau belum jatuh tempo */
const latihAct = nv => { deckExtra.push(nv); return db.vocab.length >= 3 ? { label: 'Latih sekarang', fn: () => { stopListenPage(); if (document.body.classList.contains('reading')) leaveBaca(); kataSeg = 'kartu'; setTab('kata'); } } : null; };
let kataSeg = 'kartu', kataQ = '', flipped = false, csvF = 'all', kataSort = 'baru', kataChipScroll = 0, oftenOpen = true, hskF = 0, hskUnk = false, hardF = false, deckLv = 0; /* #1511: hskF = filter level HSK di Tersimpan, deckLv = ulang hanya level ini */
const REVIEW_DAYS = [1, 3, 7, 21], DAY_MS = 864e5, DECK_MAX = 20;
/* #1383 bar tonggak: pakai hitungan & lencana koleksi50/koleksi100 (#1325), tanpa hitungan sendiri; tersembunyi bila 0 kata */
const mileClose = () => { db.mile50 = 1; save(); const e = document.getElementById('mileCard'); if (e) e.remove(); };
const mileHtml = () => {
  const n = countedVocab(null).length, t = wordMile(n);
  if (!t) return '';
  const d = new Date().toDateString();
  let card = '';
  /* db.mile50: kosong/0 = belum; teks tanggal = kartu tampil hari itu; 1 = selesai. Data lama yang sudah >=50 tanpa penanda dianggap selesai */
  if (n < 50) { if (db.mile50 == null) { db.mile50 = 0; save(); } }
  else if (db.mile50 == null) { db.mile50 = 1; save(); }
  else if (db.mile50 === 0) { db.mile50 = d; save(); }
  if (n >= 50 && typeof db.mile50 === 'string') { if (db.mile50 === d) card = `<div class="mile-card" id="mileCard" role="status"><b>Lencana 50 kata! Lanjut ke 100</b><button type="button" class="ghost" onclick="mileClose()">Tutup</button></div>`; else { db.mile50 = 1; save(); } }
  if (n >= 1 && db.mstD !== d) { db.mstD = d; db.mst = (+db.mst || 0) + 1; save(); } /* hari bar dilihat dengan >=1 kata, lokal (api/ tak diubah) */
  if (n < 1) return '';
  const mb = wordMileBadge(t), head = `<b>${n} dari ${t} kata</b><span>${t - n} lagi ke lencana ${esc(mb ? mb[2] : '')}</span>`;
  return `${card}<div class="mile" id="mileBar" role="group" aria-label="${n} dari ${t} kata tersimpan"><div class="mile-h">${head}</div><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${n}" aria-label="Kata tersimpan"><i style="width:${Math.round(n / t * 100)}%"></i></div></div>`;
};
/* #1377 Ulang 3 kata: 3 kata belum hafal, yang jatuh tempo / paling lama tak diulang; ulangan pakai deck() yang sama */
let quickPend = null, quickRun = null, quickLogged = false, quickExtra = false, quickHard = false; /* #1925: quickHard = sesi ulang khusus kata sulit */
const hardPick = () => (db.vocab || []).filter(v => v && v.w && v.hard && !v.known);
/* #1442 Latihan ekstra: hanya bila 0 kata jatuh tempo; maks 3 kata, 2 putaran/hari, kata dijawab <24 jam lalu dikecualikan */
const lastAns = v => +v.la || ((v.lv || 0) > 0 && +v.due ? +v.due - REVIEW_DAYS[Math.min(v.lv, REVIEW_DAYS.length) - 1] * DAY_MS : 0);
const extraRounds = () => db.xr && db.xr.d === today() ? +db.xr.n || 0 : 0;
const extraRoundUse = () => { db.xr = { d: today(), n: extraRounds() + 1 }; };
const extraPick = () => extraRounds() >= 2 || (db.vocab || []).some(isDue) ? [] : (db.vocab || []).filter(v => v && v.w && !v.known && String(v.t || '').trim() && Date.now() - lastAns(v) >= DAY_MS).sort((a, b) => (+a.due || 0) - (+b.due || 0)).slice(0, 3);
let quickXpGot = false;
const Q_MIN = 1; /* #1771: Ulang boleh mulai 1 kata */
const quickPick = () => { const bt = (book() || {}).title || ''; return (db.vocab || []).filter(v => v && v.w && !v.known && String(v.t || '').trim()).sort((a, b) => ((bt && b.book === bt ? 1 : 0) - (bt && a.book === bt ? 1 : 0)) || (+a.due || 0) - (+b.due || 0)).slice(0, 3); }; /* kata dari buku yang terakhir dibaca dulu, lalu urut jatuh tempo */
let deckDone = 0, deckHint = '';
let deckRetry = [], deckAns = new Set(), deckRetryTot = 0; /* ulang di sesi sama: antrean di memori, hitungan di localStorage */
const RETRY_KEY = 'kepo-deck-retry', RETRY_MAX = 2, RETRY_SESI = 8, RETRY_GAP = { lupa: 3, ragu: 5 };
const retryId = v => v.lang + '|' + v.w;
const retryGet = () => { const t = new Date().toDateString(); try { const o = JSON.parse(localStorage.getItem(RETRY_KEY) || 'null'); if (o && o.tgl === t && o.k && typeof o.k === 'object') return o; } catch (e) {} return { tgl: t, k: {} }; };
const retrySet = o => { try { localStorage.setItem(RETRY_KEY, JSON.stringify(o)); } catch (e) {} };
const isLearning = v => !!v && !v.known && (v.lv || 0) >= 1;
const refreshHafal = () => { const a = $('#sumLearn'), b = $('#sumKnown'), c = $('#sumSaved'); if (c) c.textContent = countedVocab(null).length; if (a) a.textContent = db.vocab.filter(isLearning).length; if (b) b.textContent = db.vocab.filter(v => v.known).length; };
const isDue = v => !!v && !!v.w && !v.known && (+v.due || 0) <= Date.now();
/* #1935: nama bahasa kata jatuh tempo yang beda dari buku aktif (kosong bila sebahasa) */
const dueNote = lang => { const m = []; for (const v of db.vocab || []) if (isDue(v) && v.lang && v.lang !== lang && !m.includes(v.lang)) m.push(v.lang); return m.length ? ' · termasuk ' + m.map(l => (LANG_ID[l] || (LANGS[l] || [l])[0]) + ((db.books || []).some(b => b && b.lang === l && pctOf(b) > 0) ? '' : ' (tersimpan)')).join(', ') : ''; };
/* #1967: subteks 'N siap diulang' = bagian dari total tersimpan (countedVocab, sama dgn Profil); lebih besar dari total = kata tanpa arti ikut dijadwalkan */
const dueSub = n => { const t = countedVocab(null).length; return !t ? 'Belum ada arti terisi' : n > t ? `Total tersimpan ${t}, sisanya belum ada arti` : `Dari ${t} tersimpan`; };
function viewKata() {
  try { viewKataIn(); }
  catch (e) {
    console.error('Tab Kata error', e);
    const v = $('#view'); if (!v) return;
    v.innerHTML = `<h1 style="margin:6px 2px 12px">Kata <span class="circle-txt">kamu</span></h1><div class="empty"><h2>Tab Kata lagi bermasalah</h2><div class="mut sm">Coba muat ulang. Kata simpananmu aman kok.</div><button class="pri" id="kReload" type="button">Muat ulang</button></div>`;
    const b = $('#kReload'); if (b) b.onclick = () => location.reload();
  }
}
const cariFail = new Set();
let cariAllBusy = false, cariAllMsg = '', cariAllRender = null;
/* cari arti satu kata; true bila berhasil (dipakai tombol per kata & 'Cari arti semua') */
async function cariSatu(v) {
  const key = v.lang + '|' + v.w, ac = new AbortController(), tm = setTimeout(() => ac.abort(), 10000);
  let ok = false;
  try {
    const r = await translate(v.w, v.lang, db.my, ac.signal);
    if (!r || !String(r.text || '').trim()) throw new Error('kosong');
    v.t = r.text; v.baca = bacaOf(v.w, r.baca); if (r.base) v.base = r.base; v.pos = r.dict && r.dict[0] ? r.dict[0].pos : ''; delete v.noTr; delete v.nyusul; save(); cariFail.delete(key); ok = true;
  } catch (e) { cariFail.add(key); }
  clearTimeout(tm);
  return ok;
}
async function cariAll(idx) {
  if (cariAllBusy) return;
  const list = idx.map(i => db.vocab[i]).filter(v => v && v.w && !(v.t || '').trim());
  if (!list.length) return;
  cariAllBusy = true; let fail = 0;
  for (let n = 0; n < list.length; n++) {
    cariAllMsg = 'Mencari ' + (n + 1) + '/' + list.length + '…';
    const b = $('#kCariAll'); if (b) { b.disabled = true; b.textContent = cariAllMsg; }
    if (!(await cariSatu(list[n]))) fail++;
  }
  cariAllBusy = false;
  if (cariAllRender) cariAllRender();
  if (fail) toast('Butuh internet. Coba lagi nanti');
}
window.addEventListener('online', () => {
  if (cariAllBusy || kataSeg !== 'simpan' || !$('#klist')) return;
  const ids = []; db.vocab.forEach((v, i) => { if (v && v.w && !(v.t || '').trim() && cariFail.has(v.lang + '|' + v.w)) ids.push(i); });
  if (ids.length) cariAll(ids);
});
function viewKataIn() {
  if (quickPend) { quickRun = quickPend; quickPend = null; quickLogged = false; quickXpGot = false; deckDone = 0; deckHint = ''; deckRetry = []; deckAns = new Set(); deckRetryTot = 0; }
  else if (!quickRun) { deckDone = 0; deckHint = ''; deckRetry = []; deckAns = new Set(); deckRetryTot = 0; } /* sesi 3 kata bertahan saat pindah sub-tab */
  if (!Array.isArray(db.vocab)) db.vocab = [];
  const weakAll = Object.values(db.weak || {}).filter(o => o && o.w && (+o.last || 0) < PASS).sort((a, b) => (+a.last || 0) - (+b.last || 0));
  /* #1859: kata yang ditandai sulit di kartu ulang ikut hitungan kata sulit */
  db.vocab.forEach(v => { if (v && v.hard && v.w && !weakAll.some(o => o.lang === v.lang && norm(o.w) === norm(v.w))) weakAll.unshift({ w: v.w, lang: v.lang, n: 0, last: 0, hard: true }); });
  const known = db.vocab.filter(v => v && v.known).length, learning = db.vocab.filter(isLearning).length;
  $('#view').innerHTML = `
    <h1 style="margin:6px 2px 12px">Kata <span class="circle-txt">kamu</span></h1>
    <div class="sum"><div class="s1"><b id="sumSaved">${countedVocab(null).length}</b><span>Tersimpan (total)</span></div><div class="s1"><b id="sumLearn">${learning}</b><span>Dihafal</span></div><div class="s2"><b id="sumKnown">${known}</b><span>Hafal</span></div><div class="s3"><b>${weakAll.length}</b><span>Ucap</span></div></div>
    ${(() => { const n = hardPick().length; return n && !quickRun ? `<button type="button" class="fw-nudge due-nudge" id="khardGo" style="margin:0 0 6px" aria-label="Ulang ${n} kata sulit. Langsung mulai">${ico('flag')}<span>Ulang ${n} kata sulit</span><b>Mulai</b></button>` : ''; })()}
    ${(() => { const n = db.vocab.filter(isDue).length; return n && kataSeg !== 'kartu' ? `<button type="button" class="fw-nudge due-nudge" id="kdue" style="margin:-2px 0 10px" aria-label="${n} kata siap diulang. Ulang sekarang">${ico('cards')}<span>${n} kata siap diulang<small>${dueSub(n)}</small></span><b>Ulang sekarang</b></button>` : ''; })()}
    ${(() => { const cb = book(), s = cb ? sentLooksOf(cb.id) : null; return s && (s.kata || s.kalimat) ? `<div class="mut sm" id="kstat" style="margin:-2px 2px 10px">Buku ini: ${s.kata} kata dicek · ${s.kalimat} kalimat dibuka</div>` : ''; })()}
    <div class="seg" id="kseg" role="group" aria-label="Tampilan kata"><button data-v="kartu" class="${kataSeg === 'kartu' ? 'on' : ''}" aria-pressed="${kataSeg === 'kartu'}">${ico('bolt')}Kartu</button><button data-v="simpan" class="${kataSeg === 'simpan' ? 'on' : ''}" aria-pressed="${kataSeg === 'simpan'}">Tersimpan</button><button data-v="sulit" class="${kataSeg === 'sulit' ? 'on' : ''}" aria-pressed="${kataSeg === 'sulit'}"${weakAll.length ? ` aria-label="Latih ucap, ${weakAll.length} kata"` : ''}>Latih ucap${weakAll.length ? ' · ' + weakAll.length : ''}</button></div>${(() => { const n = db.vocab.filter(v => v && v.hard).length; return kataSeg === 'kartu' && n ? `<button type="button" class="hardcnt" id="khard">${ico('flag')}<span>Lihat daftar kata sulit (${n})</span></button>` : ''; })()}${kataSeg === 'sulit' ? '<p class="mut sm" id="khelp" style="margin:6px 2px 10px">Kata yang kamu tandai sulit + kata yang ucapannya di bawah 85%. Latih lewat tab Ngomong.</p>' : ''}
    <div id="kbody"></div>`;
  if ($('#kdue')) $('#kdue').onclick = () => { deckLv = 0; kataSeg = 'kartu'; sfx('pop'); viewKata(); };
  if ($('#khard')) $('#khard').onclick = () => { deckLv = 0; kataSeg = 'sulit'; sfx('pop'); viewKata(); };
  if ($('#khardGo')) $('#khardGo').onclick = () => { const p = hardPick(); if (!p.length) return; quickPend = p; quickExtra = false; quickHard = true; quickLogged = false; deckLv = 0; kataSeg = 'kartu'; sfx('pop'); viewKata(); }; /* #1925: satu ketuk, pakai kartu ulang yang ada */
  $$('#kseg button').forEach(x => x.onclick = () => { deckLv = 0; kataSeg = x.dataset.v; sfx('pop'); viewKata(); });
  const kb = $('#kbody');
  if (kataSeg === 'kartu') return deck(kb);
  kb.innerHTML = `<div class="ksrow"><div class="search">${ico('search')}<input id="kq" type="search" placeholder="Cari kata…" value="${esc(kataQ)}" aria-label="Cari kata"></div><div class="csvcnt" id="kcnt" aria-live="polite"></div></div><div id="klist"></div>`;
  $('#kq').oninput = e => { kataQ = e.target.value; renderList(); };
  const renderList = () => {
    const q = kataQ.toLowerCase(), kl = $('#klist');
    if (kataSeg === 'simpan') {
      const langs = [...new Set(db.vocab.map(v => v && v.lang).filter(Boolean))], books = [...new Set(db.vocab.map(v => v && v.book).filter(Boolean))];
      if (csvF !== 'all' && !langs.some(l => csvF === 'l:' + l) && !books.some(b => csvF === 'b:' + b)) csvF = 'all';
      const hskN = { 1: 0, 2: 0, 3: 0 }; db.vocab.forEach(v => { const h = v && v.lang === 'zh-CN' ? hskOf(v.w) : 0; if (h) hskN[h]++; });
      const hasZh = db.vocab.some(v => v && v.lang === 'zh-CN') || (db.books || []).some(b => b && b.lang === 'zh-CN'), hskLv = hasZh ? [1, 2, 3] : []; if (!hskLv.length) { hskF = 0; hskUnk = false; }
      const inF = v => !!v && (csvF === 'all' || (csvF.startsWith('l:') ? v.lang === csvF.slice(2) : v.book === csvF.slice(2))) && (!hskF || (v.lang === 'zh-CN' && hskOf(v.w) === hskF)) && (!hskUnk || !v.known) && (!hardF || !!v.hard);
      const hardN = db.vocab.filter(v => v && v.hard).length; if (!hardN) hardF = false;
      const vocab = db.vocab.map((v, i) => ({ ...v, i })).filter(v => v.w && inF(v) && (!q || (v.w + ' ' + (v.t || '')).toLowerCase().includes(q)));
      if (kataSort === 'tap') vocab.sort((a, c) => (+c.tap || 0) - (+a.tap || 0) || a.i - c.i);
      kl.innerHTML = vocab.length ? vocab.map(v => `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}${v.known ? ` <span class="vok" title="Udah hafal" role="img" aria-label="Udah hafal">${ico('check')}</span>` : ''}${v.hard ? ` <span class="vhard" title="Kamu tandai sulit" role="img" aria-label="Ditandai sulit">${ico('flag')}</span>` : ''}</div><div class="t1${v.t ? '' : ' noarti'}">${v.t ? esc(v.t) : cariFail.has(v.lang + '|' + v.w) ? 'Butuh internet. Coba lagi nanti' : 'Menunggu arti'}${v.pick && v.t ? ' <span class="stepchip pickchip">pilihanmu</span>' : ''}</div>${v.t ? '' : `<button class="vgo vcari" data-cari="${v.i}" aria-label="Cari arti ${esc(v.w)}">${cariFail.has(v.lang + '|' + v.w) ? 'Coba lagi' : 'Cari arti'}</button>`}${(() => { const m = [bacaDisp(v.w, bacaShow(v.w, v.baca, v.lang)), +v.tap >= 1 ? `Diketuk ${+v.tap}×` : '', ((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) > 1 ? `Dicek ${db.looks[v.lang + '|' + v.w.toLowerCase()]}×` : ''].filter(Boolean).join(' · '); const h = v.lang === 'zh-CN' ? hskOf(v.w) : 0; return m || h ? `<div class="vmeta">${h ? `<span class="hskc" aria-label="Level HSK ${h}">HSK ${h}</span>${m ? ' ' : ''}` : ''}${esc(m)}</div>` : ''; })()}<div class="s1">${esc(ctxOf(v))}</div>${v.book && (db.books || []).some(b => b && b.title === v.book) ? `<button class="vgo" data-go="${v.i}" aria-label="Lihat ${esc(v.w)} di buku">${ico('book')}Lihat di buku</button>` : ''}</div>
        <button class="icon" data-sp="${v.i}" aria-label="Dengerin">${ico('vol')}</button><button class="icon vdel" data-dv="${v.i}" aria-label="Hapus kata">${ico('trash')}</button></div>`).join('')
        : hskF && !q && csvF === 'all' && !hskUnk && !hskN[hskF] && db.vocab.length ? `<div class="empty"><img class="empty-doodle" src="img/aset/kosong-hsk.svg" width="96" height="72" alt="" decoding="async"><div class="mut sm">Belum ada kata HSK ${hskF}. Ketuk kata saat baca.</div></div>` : hardF && !db.vocab.some(v => v && v.hard && v.w && (csvF === 'all' || (csvF.startsWith('l:') ? v.lang === csvF.slice(2) : v.book === csvF.slice(2))) && (!hskF || (v.lang === 'zh-CN' && hskOf(v.w) === hskF)) && (!hskUnk || !v.known)) ? `<div class="empty"><img class="empty-doodle" src="img/aset/cari-kosong.svg" width="96" height="72" alt="" decoding="async"><div class="mut sm">Belum ada kata sulit. Tandai dari kartu ulang.</div></div>` : (q || csvF !== 'all' || hskF || hskUnk || hardF) && db.vocab.length ? `<div class="empty"><img class="empty-doodle" src="img/aset/cari-kosong.svg" width="96" height="72" alt="" decoding="async"><div class="mut sm">Nggak ada yang cocok.</div></div>` : (db.seenKataHint ? '' : '<div class="rtip ktip" id="ktip" role="note"><span><span class="rtt">Ketuk kata di halaman baca, lalu <b>Simpan</b>. Katamu muncul di sini.</span></span><button id="ktipx" type="button" aria-label="Paham, tutup petunjuk">Paham</button></div>') + emptyState('curious', 'Belum ada kata', 'Ketuk kata di halaman baca, lalu Simpan.', 'Mulai baca', "setTab('baca')");
      const pendCari = vocab.filter(v => v.w && !(v.t || '').trim());
      if (pendCari.length >= 2) {
        const anyFail = pendCari.some(v => cariFail.has(v.lang + '|' + v.w)), busy = cariAllBusy;
        kl.insertAdjacentHTML('afterbegin', `<div class="cariall"><button type="button" class="vgo vcariall" id="kCariAll"${busy ? ' disabled' : ''}>${busy ? esc(cariAllMsg) : (anyFail ? 'Coba lagi semua' : 'Cari arti semua') + ' (' + pendCari.length + ')'}</button>${anyFail && !busy ? '<div class="mut sm">Butuh internet. Coba lagi nanti</div>' : ''}</div>`);
        $('#kCariAll').onclick = () => cariAll(pendCari.map(v => v.i));
      }
      { const kx = $('#ktipx'); if (kx) kx.onclick = () => { db.seenKataHint = true; save(); $('#ktip').remove(); }; }
      if (db.vocab.length) {
        const readyN = () => db.vocab.filter(v => inF(v) && !v.noTr && (v.t || '').trim()).length;
        const opt = (val, txt) => `<option value="${esc(val)}"${csvF === val ? ' selected' : ''}>${esc(txt)}</option>`;
        const filt = langs.length + books.length > 2 || langs.length > 1 || books.length > 1
          ? `<select id="kCsvF" aria-label="Saring kata per bahasa atau buku">${opt('all', 'Semua kata')}${langs.length > 1 ? `<optgroup label="Per bahasa">${langs.map(l => opt('l:' + l, langName(l))).join('')}</optgroup>` : ''}${books.length > 1 ? `<optgroup label="Per buku">${books.map(b => opt('b:' + b, b)).join('')}</optgroup>` : ''}</select>` : '';
        const sortSel =`<select id="kSort" class="csvsort" aria-label="Urutkan kata"><option value="baru"${kataSort === 'baru' ? ' selected' : ''}>Urutan: Terbaru</option><option value="tap"${kataSort === 'tap' ? ' selected' : ''}>Paling sering diketuk</option></select>`;
        $('#kcnt').innerHTML = csvF === 'all' && !hskF && !hskUnk && !hardF ? `<b>${db.vocab.length}</b> kata` : `<b>${db.vocab.filter(inF).length}</b> dari ${db.vocab.length}`;
        const fchip = (val, txt) => `<button class="fchip${csvF === val ? ' on' : ''}" data-f="${esc(val)}" aria-pressed="${csvF === val}">${esc(txt)}</button>`;
        const chipRow = filt ? `<div class="fchips" id="kChips" role="group" aria-label="Saring kata">${fchip('all', 'Semua')}${langs.length > 1 ? langs.map(l => fchip('l:' + l, langName(l))).join('') : ''}${books.length > 1 ? books.map(b => fchip('b:' + b, b)).join('') : ''}</div>` : '';
        const oldScroll = ($('#kChips') || {}).scrollLeft || kataChipScroll;
        const hskDue = hskF ? db.vocab.filter(v => isDue(v) && inF(v)).length : 0;
        const hskIdleTxt = (() => {
          if (!hskF || hskDue) return '';
          const nx = db.vocab.filter(v => inF(v) && v.w && !v.known && (+v.due || 0) > Date.now()).reduce((m, v) => Math.min(m, +v.due), Infinity);
          if (!isFinite(nx)) return `Simpan kata HSK ${hskF} dulu dari bacaanmu.`;
          const d = new Date(nx), t0 = new Date(); t0.setHours(0, 0, 0, 0);
          const dd = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - t0) / 864e5), hh = String(d.getHours()).padStart(2, '0') + '.' + String(d.getMinutes()).padStart(2, '0');
          const when = dd <= 0 ? 'hari ini ' + hh : dd === 1 ? 'besok ' + hh : dd < 7 ? ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][d.getDay()] : 'dalam ' + dd + ' hari';
          return `Kata HSK ${hskF} berikutnya siap diulang ${when}`;
        })();
        const hskSum = hskLv.length ? `<div class="hsksum" id="kHskSum">${hskLv.map(n => { const x = hskUniq(n), y = hskTot(n); return y ? `<button type="button" class="hs${hskF === n ? ' on' : ''}" data-h="${n}" aria-label="HSK ${n}: ${x} dari ${y} kata. Ketuk untuk menyaring">HSK ${n}: <b>${x}</b>/${y}</button>` : ''; }).join('')}</div>` : '';
        const hskRow = hskLv.length ? `<div class="fchips hskrow" id="kHsk" role="group" aria-label="Saring kata per level HSK"><button class="fchip${!hskF && !hskUnk ? ' on' : ''}" data-h="0" aria-pressed="${!hskF && !hskUnk}">Semua</button>${hskLv.map(n => `<button class="fchip${hskF === n ? ' on' : ''}" data-h="${n}" aria-pressed="${hskF === n}">HSK ${n}</button>`).join('')}<button class="fchip unk${hskUnk ? ' on' : ''}" data-u="1" aria-pressed="${hskUnk}">Belum hafal</button></div>${hskSum}${hskF && !hskDue ? `<div class="hskidle" id="kHskIdle">${hskIdleTxt}</div>` : ''}${hskDue ? `<button type="button" class="fw-nudge due-nudge" id="kHskGo" style="margin:0 0 10px" aria-label="Ulang ${hskDue} kata HSK ${hskF} yang siap">${ico('cards')}<span>Ulang ${hskDue} kata HSK ${hskF}</span></button>` : ''}` : '';
        const hardRow = hardN ? `<div class="fchips hardrow" id="kHardRow" role="group" aria-label="Saring kata sulit"><button type="button" class="fchip hardchip${hardF ? ' on' : ''}" id="kHardF" aria-pressed="${hardF}" aria-label="Sulit saja, ${hardN} kata">${ico('flag')}<span>Sulit ${hardN}</span></button></div>` : '';
        kl.insertAdjacentHTML('afterbegin', `${hskRow}${chipRow}${hardRow}<div class="csvbar">${sortSel}${filt}</div>`);
        $$('#kHsk .fchip, #kHskSum .hs').forEach(b => b.onclick = () => { if (b.dataset.u) hskUnk = !hskUnk; else { hskF = +b.dataset.h; if (!hskF) hskUnk = false; } if (hskF && !b.dataset.u && window.kepoMark) kepoMark('hsk_filter'); sfx('pop'); renderList(); });
        if ($('#kHskGo')) $('#kHskGo').onclick = () => { deckLv = hskF; if (window.kepoMark) kepoMark('hsk_ulang'); kataSeg = 'kartu'; sfx('pop'); viewKata(); };
        if ($('#kChips')) {
          $('#kChips').scrollLeft = oldScroll;
          $$('#kChips .fchip').forEach(b => b.onclick = () => { kataChipScroll = $('#kChips').scrollLeft; csvF = b.dataset.f; sfx('pop'); renderList(); });
        }
        if (vocab.length) kl.insertAdjacentHTML('beforeend', `<button class="ghost csvexp" id="kCsvHow">Ekspor ke Anki</button><details class="csvguide"><summary>Cara impor ke Anki</summary><ol class="csvsteps"><li>Di Anki laptop: File → Import, pilih CSV Keepo.</li><li>Kolom 1 jadi Depan, sisanya Belakang. Centang izinkan HTML.</li><li>Pilih perbarui catatan yang ada, lalu Import.</li></ol></details>`);
        if ($('#kHardF')) $('#kHardF').onclick = () => { hardF = !hardF; sfx('pop'); renderList(); };
        $('#kSort').onchange = e => { kataSort = e.target.value; renderList(); };
        if ($('#kCsvF')) $('#kCsvF').onchange = e => { csvF = e.target.value; kataChipScroll = 0; renderList(); };
        const exportCsv = async () => {
          const ready = readyN(), list = db.vocab.filter(inF);
          if (!ready) return toast('Belum ada kata yang ada artinya');
          const slug = csvF === 'all' ? '' : '-' + (csvF.startsWith('l:') ? langName(csvF.slice(2)) : csvF.slice(2)).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 30);
          const fn = `keepo-kata${slug === '-' ? '' : slug}.csv`;
          const blob = new Blob([vocabCSV(list)], { type: 'text/csv;charset=utf-8' });
          // iPhone/PWA: unduh lewat <a download> sering diam, jadi menu Bagikan dulu.
          const iosLike = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
          const standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
          let f = null;
          try { f = new File([blob], fn, { type: 'text/csv' }); } catch (e) {}
          if (f && (iosLike || standalone) && navigator.share && navigator.canShare && navigator.canShare({ files: [f] })) {
            try { await navigator.share({ files: [f], title: fn }); return toast('Siap dibagikan'); }
            catch (e) { if (e && e.name === 'AbortError') return toast('Dibatalin, nggak apa-apa'); }
          }
          try {
            const a = document.createElement('a'), u = URL.createObjectURL(blob);
            a.href = u; a.download = fn; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000);
            toast(`${fn} udah diunduh (${ready} kata)`);
          } catch (e) {
            try {
              if (f && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: fn }); toast('Siap dibagikan'); }
              else toast('Perangkat ini belum bisa unduh CSV');
            } catch (e2) { if (e2 && e2.name !== 'AbortError') toast('Gagal ekspor, coba lagi ya'); }
          }
        };
        if ($('#kCsvHow')) $('#kCsvHow').onclick = () => {
          openSheet(`<div class="sh-head"><h2>Ekspor ke Anki</h2>${closeBtn}</div>
          <button class="csvbtn csvgo" id="kCsv">Unduh CSV (${readyN()} kata)</button>
          <p class="mut sm">Cara impor: pakai Anki di laptop.</p>
          <ol class="csvsteps"><li>Buka <b>File → Import</b>, pilih file CSV Keepo.</li><li>Atur <b>kolom 1 = Depan</b>, kolom lainnya = Belakang. Centang <b>izinkan HTML</b>.</li><li>Pilih <b>perbarui catatan</b> yang ada, lalu Import.</li></ol>
          <p class="mut sm">Di HP: impor di laptop, sinkron AnkiWeb, belajar di HP.</p>`, 'Ekspor ke Anki');
          $('#kCsv').onclick = exportCsv;
        };
      }
      /* "Sering diketuk": kata belum tersimpan dengan ketukan >=3 (db.taps), maks 5 */
      const often = csvF.startsWith('b:') ? [] : Object.entries(db.taps || {}).map(([k, n]) => {
        const j = k.indexOf('|'); return { lang: k.slice(0, j), w: k.slice(j + 1), n: +n || 0 };
      }).filter(o => o.n >= 3 && o.w && (csvF === 'all' || csvF === 'l:' + o.lang) && (!q || o.w.toLowerCase().includes(q)) && !db.vocab.some(v => sameVocab(v, o.lang, o.w))).sort((a, c) => c.n - a.n).slice(0, 5);
      if (often.length) {
        const sec = `<details class="often-sec" id="kOften"${oftenOpen ? ' open' : ''}><summary>Sering diketuk <span class="tapb">${often.length}</span></summary>${often.map((o, i) => `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(o.lang)}">${esc(o.w)} <span class="tapb">${o.n}×</span></div><div class="s1">${esc(langName(o.lang))}</div></div><button class="pill-sm" data-os="${i}" aria-label="Simpan kata ${esc(o.w)}">Simpan</button></div>`).join('')}</details>`;
        const bar = $('#klist .csvbar');
        if (bar) bar.insertAdjacentHTML('afterend', sec); else kl.insertAdjacentHTML('afterbegin', sec);
        $('#kOften').ontoggle = e => { oftenOpen = e.target.open; };
        $$('[data-os]').forEach(btn => btn.onclick = async () => {
          const o = often[+btn.dataset.os];
          if (db.vocab.some(v => sameVocab(v, o.lang, o.w))) return renderList();
          btn.disabled = true; btn.textContent = 'Menyimpan…';
          const r = await translate(o.w, o.lang, db.my).catch(() => null);
          if (db.vocab.some(v => sameVocab(v, o.lang, o.w))) return;
          const tp = takeTaps(o.lang, o.w);
          if (isKenal(o.lang, o.w)) setKenal(o.lang, o.w, false);
          untombVocab(o.lang, o.w);
          db.vocab.unshift({ ...(tp > 0 ? { tap: tp } : {}), w: o.w, t: r ? r.text : '', baca: r ? bacaOf(o.w, r.baca) : '', ...(r && r.base ? { base: r.base } : {}), ...(r ? {} : { noTr: 1, nyusul: true }), pos: r && r.dict && r.dict[0] ? r.dict[0].pos : '', lang: o.lang, s: '', ctx: '', at: Date.now() });
          if (!save()) { db.vocab.shift(); return; }
          award(2, 'save'); vib(10); sfx('ding');
          if (kataSeg === 'simpan' && $('#klist')) renderList();
          toast(r ? 'Masuk ke kartu kata kamu' : 'Tersimpan, arti nyusul ya', r ? 4000 : 6000, r ? null : { label: 'Isi arti', fn: () => isiArti(o.lang, o.w) });
        });
      }
      $$('[data-cari]').forEach(el => el.onclick = async () => {
        const v = db.vocab[+el.dataset.cari]; if (!v || !v.w || el.disabled) return;
        const y = window.scrollY; el.disabled = true; el.textContent = 'Mencari…';
        await cariSatu(v);
        if (kataSeg === 'simpan' && $('#klist')) { renderList(); window.scrollTo(0, y); }
      });
      cariAllRender = () => { if (kataSeg === 'simpan' && $('#klist')) { const y = window.scrollY; renderList(); window.scrollTo(0, y); } };
      $$('[data-go]').forEach(el => el.onclick = () => lihatDiBuku(db.vocab[+el.dataset.go]));
      $$('[data-sp]').forEach(el => el.onclick = () => { const v = db.vocab[+el.dataset.sp]; speak(v.w, v.lang, 0.8); });
      $$('[data-dv]').forEach(el => el.onclick = () => {
        const i = +el.dataset.dv, [gone] = db.vocab.splice(i, 1); if (gone) tombVocab(gone.lang, gone.w); save(); renderList(); refreshHafal(); refreshPills();
        toast('Kata dihapus', 5000, { label: 'Urungkan', fn: () => { if (!db.vocab.includes(gone)) db.vocab.splice(Math.min(i, db.vocab.length), 0, gone); if (gone) untombVocab(gone.lang, gone.w); save(); if (kataSeg === 'simpan' && $('#klist')) viewKata(); } });
      });
    } else {
      const weak = weakAll.filter(o => !q || String(o.w).toLowerCase().includes(q)).slice(0, 40);
      kl.innerHTML = weak.length ? `<div id="kbox"></div><div id="kwl">${weak.map(o => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(o.lang)}">${esc(o.w)}</div><div class="s1">${langName(o.lang)} · ${o.hard && !o.n ? 'kamu tandai sulit' : 'dicoba ' + (+o.n || 1) + '×'}</div></div>${o.hard && !o.n ? `<span class="chip">${ico('flag')}Sulit</span>` : chip(+o.last || 0)}</div>`).join('')}
        <div class="row"><button class="pri" id="kRem">${ico('sword')}Lawan ${Math.min(weak.length, 10)} kata</button></div></div>`
        : q ? `<div class="empty"><img class="empty-doodle" src="img/aset/cari-kosong.svg" width="96" height="72" alt="" decoding="async"><div class="mut sm">Nggak ada yang cocok.</div></div>` : emptyState('happy', 'Aman, belum ada!', 'Kata yang kamu tandai sulit atau ucapannya di bawah 85% bakal muncul di sini.', 'Mulai tantangan', "setTab('bicara')");
      if ($('#kRem')) $('#kRem').onclick = () => {
        const lang = weak[0].lang, list = weak.filter(o => o.lang === lang).slice(0, 10);
        $('#kwl').remove();
        remedial(list.map(o => ({ w: o.w, p: o.last })), lang, $('#kbox'), () => { celebrate('Boss kalah!', 'Semua kata sulit udah kamu lawan'); viewKata(); });
      };
    }
  };
  renderList();
  if (!hskMap && db.vocab.some(v => v && v.lang === 'zh-CN')) hskLoad().then(m => { if (m && $('#klist') && kataSeg === 'simpan') renderList(); });
  if (db.vocab.some(needsArti)) refillVocab().then(ok => { if (ok && $('#klist') && kataSeg === 'simpan') renderList(); });
}
/* lembar 'Semua arti' (#1158): arti per jenis kata + frasa & contoh. Data lama tanpa daftar = diisi saat dibuka; v.t / pilihan #1106 tak diubah */
function openSemua(v, onSave) {
  const hl = s => esc(s).replace(/‹/g, '<mark>').replace(/›/g, '</mark>');
  const mark = s => { const w = String(v.w || ''); if (!w) return esc(s); const i = s.toLowerCase().indexOf(w.toLowerCase()); return i < 0 ? esc(s) : esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + w.length)) + '</mark>' + esc(s.slice(i + w.length)); };
  const cur = String(v.t || '').trim().toLowerCase();
  const body = () => {
    const all = Array.isArray(v.all) ? v.all : [], ex = Array.isArray(v.ex) ? v.ex : [];
    const grp = all.map(g => `<div class="semua-grp"><span class="pos">${esc(POS[g.pos] || g.pos || 'arti')}</span><ol>${g.terms.map(t => `<li${String(t).toLowerCase() === cur ? ' class="m"' : ''} dir="auto">${esc(t)}</li>`).join('')}</ol></div>`).join('');
    const mine = [];
    if (ctxOf(v)) mine.push({ t: ctxOf(v), src: v.book ? `Dari ceritamu · ${v.book}` : 'Dari ceritamu' });
    const lo = String(v.w || '').toLowerCase();
    db.vocab.filter(o => o && o !== v && o.lang === v.lang && o.ctx && lo && o.ctx.toLowerCase().includes(lo)).slice(0, 2).forEach(o => mine.push({ t: ctxOf(o), src: `Dari ceritamu · lewat kata "${o.w}"` }));
    const exs = ex.map(t => `<div class="semua-ex" dir="auto" lang="${esc(v.lang)}">${hl(t)}<small>contoh otomatis, bisa keliru</small></div>`).join('') + mine.map(m => `<div class="semua-ex" dir="auto" lang="${esc(v.lang)}">${mark(m.t)}<small>${esc(m.src)}</small></div>`).join('');
    return `<div class="sh-head"><h2 dir="auto">${esc(v.w)} · semua arti</h2>${closeBtn}</div><div class="mut sm">Terjemahan mesin, bisa keliru. Arti pilihanmu tetap yang utama.</div>${grp || '<div class="mut sm" style="margin:10px 0">Belum ada daftar arti untuk kata ini.</div>'}${exs ? `<h3 class="semua-h">Frasa &amp; contoh</h3>${exs}` : ''}`;
  };
  const show = () => openSheet(body(), v.w + ' semua arti');
  if (Array.isArray(v.all)) return show();
  const load = async () => {
    openSheet(`<div class="sh-head"><h2 dir="auto">${esc(v.w)} · semua arti</h2>${closeBtn}</div><span class="loading ldots" role="status" aria-label="Lagi nyari semua arti"><i></i><i></i><i></i></span>`, v.w + ' semua arti');
    try {
      if (navigator.onLine === false) throw new Error('offline');
      const d = await fetchSemua(v.w, v.lang, db.my);
      simpanSemua(v, d); save(); if (onSave) onSave();
      if (!$('#sheet').classList.contains('hide')) show();
    } catch (e) {
      if ($('#sheet').classList.contains('hide')) return;
      $('#sheetBody').innerHTML = `<div class="sh-head"><h2 dir="auto">${esc(v.w)} · semua arti</h2>${closeBtn}</div><div class="mut sm" role="status">${navigator.onLine === false ? 'Lagi offline, daftar arti belum bisa dibuka.' : 'Daftar arti belum kebuka, kayaknya kena batas layanan gratis.'}</div><div class="altrow"><button class="ghost wretry" id="semuaRetry" type="button">Coba lagi</button><button class="ghost wretry" data-close type="button">Tutup</button></div>`;
      $$('#sheet [data-close]').forEach(b => b.onclick = closeSheet); $('#semuaRetry').onclick = load;
    }
  };
  load();
}
/* pinyin zh: tiap suku kata bertanda nada dibungkus kelas t1-t5; tanpa tanda nada sama sekali = polos */
const PY_V = 'aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ';
const PY_T = ['āēīōūǖ', 'áéíóúǘ', 'ǎěǐǒǔǚ', 'àèìòùǜ'];
const PY_RE = new RegExp('[^' + PY_V + '\\s\'’\\-.,!?;:]*[' + PY_V + ']+(?:ng?|r)?(?![' + PY_V + '])', 'giu');
function pinyinTone(syl) { for (const ch of syl) { const i = PY_T.findIndex(k => k.includes(ch)); if (i >= 0) return i + 1; } return 5; }
function pinyinHtml(p, lang) {
  if (!/^zh/i.test(lang || '') || !/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(p)) return esc(p);
  let out = '', last = 0, m;
  PY_RE.lastIndex = 0;
  while ((m = PY_RE.exec(p))) { if (!m[0]) { PY_RE.lastIndex++; continue; } out += esc(p.slice(last, m.index)) + `<span class="pt t${pinyinTone(m[0].toLowerCase())}">${esc(m[0])}</span>`; last = m.index + m[0].length; }
  return out + esc(p.slice(last));
}
/* legenda nada (hanya Mandarin + pinyin bertanda nada): bisa ditutup, pilihan diingat di localStorage */
function nadaLegend(p, lang, hidden) {
  if (!/^zh/i.test(lang || '') || !/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(p)) return '';
  let off = false; try { off = localStorage.getItem('kepo-nada-leg') === '0'; } catch (e) {}
  return `<div class="nlg-wrap${hidden ? ' hide' : ''}" id="nlg">${off ? '' : '<div class="nlg">Nada: <span class="pt t1">1</span> datar · <span class="pt t2">2</span> naik · <span class="pt t3">3</span> turun-naik · <span class="pt t4">4</span> turun</div>'}<button class="nlg-btn" id="nlgb" type="button">${off ? 'Lihat arti nada' : 'Tutup'}</button></div>`;
}
function nadaLegendBind() {
  const b = $('#nlgb'); if (!b) return;
  ['pointerdown', 'pointerup'].forEach(ev => b.addEventListener(ev, e => e.stopPropagation()));
  b.onclick = e => {
    e.stopPropagation();
    let off = false; try { off = localStorage.getItem('kepo-nada-leg') === '0'; localStorage.setItem('kepo-nada-leg', off ? '1' : '0'); } catch (x) {}
    const w = $('#nlg'); w.outerHTML = nadaLegend('ā', 'zh', w.classList.contains('hide')); nadaLegendBind();
  };
}
function deck(kb) {
  if (db.vocab.some(needsArti)) refillVocab().then(ok => { if (ok && kb.isConnected && $('#card')) deck(kb); });
  const cards = db.vocab.filter(v => v && v.w && !deckAns.has(v) && (quickRun ? quickRun.includes(v) && !v.known : (isDue(v) && (!deckLv || (v.lang === 'zh-CN' && hskOf(v.w) === deckLv))) || (!deckLv && deckExtra.includes(v) && !v.known))).sort((a, b) => (a.due || 0) - (b.due || 0)).slice(0, Math.max(0, DECK_MAX - deckDone));
  const rdy = deckRetry.find(r => r.wait <= 0) || (!cards.length ? deckRetry[0] : null);
  if (rdy) cards.unshift(rdy.v);
  if (!cards.length) {
    let xtraXp = 0;
    if (quickRun && deckDone >= 1 && !quickLogged) { quickLogged = true; db.q3s = (+db.q3s || 0) + 1; if (quickExtra) { xtraXp = 2; award(2, 'rem'); } save(); }
    if (quickRun) {
      const wasHard = quickHard;
      quickRun = null;
      quickExtra = false;
      quickHard = false;
      if (wasHard) { kataSeg = 'simpan'; kb.innerHTML = `<div class="empty"><img class="empty-pic" src="img/aset/beres-sesi.svg" alt="" width="150" height="150" decoding="async"><h2>Ulang kata sulit beres</h2><div class="mut sm">Kata yang masih sulit tetap bertanda, bisa diulang lagi kapan saja.</div><button class="pri" id="hardBack" type="button">Kembali ke Kata</button></div>`; if ($('#hardBack')) $('#hardBack').onclick = () => viewKata(); return; }
      kb.innerHTML =`<div class="empty"><img class="empty-pic" src="img/aset/beres-sesi.svg" alt="" width="150" height="150" decoding="async"><h2>Cukup untuk sekarang</h2><div class="mut sm">Latihan ekstra beres. Jadwal ulang tetap, level bisa turun bila kamu lupa.</div>${xtraXp ? '<div class="mut sm"><b>+2 XP</b></div>' : ''}<button class="pri" id="q3Read" type="button">Lanjut baca</button></div>`;
      if ($('#q3Read')) $('#q3Read').onclick = () => setTab('baca');
      return;
    }
    const dues = db.vocab.filter(v => v && !v.known && v.due > Date.now()).map(v => v.due), nd = dues.length ? Math.max(1, Math.ceil((Math.min(...dues) - Date.now()) / DAY_MS)) : 0, nLeft = db.vocab.filter(isDue).length, left = nLeft > 0;
    kb.innerHTML = db.vocab.length ? emptyState('cheer', left ? 'Sesi hari ini beres' : 'Semua beres, balik besok ya', left ? `Masih ada ${nLeft} kata. Muncul lagi pas kamu balik nanti.` : nd ? `Kartu berikutnya muncul ${nd} hari ke depan. Simpan kata baru pas baca buat nambah kartu.` : 'Keren banget, semua kata udah hafal. Simpan kata baru pas baca buat nambah kartu.', 'Lanjut baca', "setTab('baca')") : emptyState('cards', 'Belum ada kartu', 'Pas baca, ketuk kata → Simpan. Kata itu jadi kartu hafalan di sini.', 'Mulai baca', "setTab('baca')"); return; }
  const v = cards[0], next = cards[1], rt = deckRetry.find(r => r.v === v); flipped = false;
  const nCards = cards.length + deckRetry.filter(r => r !== rt && r !== rdy).length;
  kb.innerHTML = `${db.autoSpeakAsked ? '' : `<div class="asp-ban" id="aspBan" role="group" aria-label="Bunyi otomatis"><span>Mau kata dibunyikan otomatis?</span><button class="yes" id="aspOn" type="button">Nyalakan</button><button class="ghost" id="aspOff" type="button">Nanti</button></div>`}<div class="deck">${next ? `<div class="flash under"><div class="fw" dir="auto" style="color:var(--color-text-muted)">${esc(next.w)}</div></div>` : ''}
      <div class="flash" id="card"><span class="stamp yes">HAFAL</span><span class="stamp no">LUPA</span><button class="fsp" id="fSp" type="button" aria-label="Dengar kata"><img src="img/ikon-speaker.svg" alt="" width="48" height="48"></button>
        <div class="eyebrow"><span class="lchip">${langName(v.lang)}</span> · ${nCards} kartu${rt ? ` <span class="recheck">Ulang ke-${rt.n}/${RETRY_MAX}</span>` : (v.lv || 0) > 0 ? ' <span class="recheck">Cek ulang</span>' : ''}</div>
        <div class="fw" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}</div>${(() => { const cf = [...String(v.w || '').trim()].length <= 2 && /^(ja|ko|zh-CN)$/.test(v.lang) ? ctxOf(v) : ''; return cf ? `<div class="fs fs-front" id="fCtx" lang="${esc(v.lang)}">${hitHtml(cf, v.w)}</div>` : ''; })()}<div id="back" class="hide"><div class="ft">${String(v.t || '').trim() ? esc(v.t) : '<span class="mut">Arti menyusul</span> <button class="ghost" id="fget" type="button">Ambil arti</button>'}</div>${bacaOf(v.w, v.baca) ? ((db.peekBaca === 'langsung' || (db.peekBaca !== 'ketuk' && db.showBaca)) ? `<div class="fb" lang="${esc(v.lang)}" style="overflow-wrap:anywhere">${pinyinHtml(bacaOf(v.w, v.baca), v.lang)}</div>${nadaLegend(bacaOf(v.w, v.baca), v.lang, false)}` : `<button class="ghost fb-peek" id="peek" type="button">Lihat cara baca</button><div class="fb hide" id="peekv" lang="${esc(v.lang)}" style="overflow-wrap:anywhere">${pinyinHtml(bacaOf(v.w, v.baca), v.lang)}</div>${nadaLegend(bacaOf(v.w, v.baca), v.lang, true)}`) : ''}${baseOf(v.w, v.base) ? `<div class="fbase">Bentuk dasar: <b lang="${esc(v.lang)}">${esc(baseOf(v.w, v.base))}</b></div>` : ''}<div class="fs" style="margin-top:8px">${hitHtml(ctxOf(v), v.w)}</div>${String(v.t || '').trim() ? `<button class="ghost semua-btn" id="fAll" type="button">Semua arti${Array.isArray(v.all) && v.all.length ? ` (${v.all.reduce((n, g) => n + g.terms.length, 0)})` : ''}</button>` : ''}</div>
        <div class="tap" id="tapl">Ingat dulu artinya</div></div></div>
    <div class="deck-act" id="actFront"><button class="yes full" id="fShow" type="button">${ico('eye')}Lihat arti</button></div>
    <div class="deck-act three hide" id="actBack"><button class="no" id="fNo" type="button"><span class="dl">${ico('x')}Lupa</span><span class="when">nanti lagi</span></button><button class="mid" id="fMaybe" type="button"><span class="dl">Ragu</span><span class="when">sebentar lagi</span></button><button class="yes" id="fYes" type="button"><span class="dl">${ico('check')}Hafal</span><span class="when">${(v.lv || 0) >= REVIEW_DAYS.length ? 'tuntas' : REVIEW_DAYS[v.lv || 0] + ' hari'}</span></button></div>
    <div class="center" style="margin-top:6px"><button class="hardbtn${v.hard ? ' on' : ''}" id="fHard" type="button" aria-pressed="${!!v.hard}">${ico('flag')}<span>${v.hard ? 'Batal ulang besok' : 'Ulang besok'}</span></button></div>
    <div class="mut sm center" style="margin-top:6px">${deckHint ? esc(deckHint) : 'Ingat dulu, baru buka · geser kanan = hafal, kiri = lupa'}</div>${quickRun ? `<div class="center" style="margin-top:6px"><button class="ghost" id="q3Close" type="button">${quickHard ? 'Tutup ulang kata sulit' : 'Tutup latihan ekstra'}</button></div>` : ''}${deckLv ? `<div class="center" style="margin-top:6px"><span class="mut sm">Hanya HSK ${deckLv}</span> <button class="ghost" id="hskAll" type="button">Semua level</button></div>` : ''}`;
  if ($('#hskAll')) $('#hskAll').onclick = () => { deckLv = 0; viewKata(); };
  if ($('#q3Close')) $('#q3Close').onclick = () => { quickRun = null; quickExtra = false; quickHard = false; viewKata(); };
  const card = $('#card'); let spoken = false;
  const autoSay = () => { if (db.autoSpeak && !spoken) { spoken = true; speak(v.w, v.lang, 0.8); } };
  if ($('#aspBan')) {
    const done = on => { db.autoSpeakAsked = true; if (on) db.autoSpeak = true; save(); $('#aspBan').remove(); if (on) autoSay(); };
    $('#aspOn').onclick = () => done(true); $('#aspOff').onclick = () => done(false);
  }
  autoSay();
  if ($('#fHard')) $('#fHard').onclick = () => {
    const now = Date.now();
    if (!v.hard) {
      v.hard = true; v.hd = { due: v.due, known: !!v.known };
      if (v.known) { v.known = false; v.due = now + DAY_MS; }
      else { const left = (+v.due || 0) - now; if (left > DAY_MS) v.due = now + Math.max(DAY_MS, Math.round(left / 2)); }
      deckHint = 'Ditandai sulit, bakal muncul lebih sering';
    } else {
      delete v.hard; if (v.hd && !(+v.due <= now)) { v.due = v.hd.due; v.known = v.hd.known; } delete v.hd;
      deckHint = 'Tanda sulit dibatalkan';
    }
    save(); sfx('pop');
    const b = $('#fHard'); b.classList.toggle('on', !!v.hard); b.setAttribute('aria-pressed', String(!!v.hard)); b.lastElementChild.textContent = v.hard ? 'Batal ulang besok' : 'Ulang besok';
    const h = b.parentElement.nextElementSibling; if (h) h.textContent = deckHint;
    const nh = db.vocab.filter(x => x && x.hard).length, kh = $('#khard');
    if (kh) { kh.hidden = !nh; kh.lastElementChild.textContent = 'Lihat daftar kata sulit (' + nh + ')'; }
    else if (nh && $('#kseg')) { $('#kseg').insertAdjacentHTML('afterend', `<button type="button" class="hardcnt" id="khard">${ico('flag')}<span>Lihat daftar kata sulit (${nh})</span></button>`); $('#khard').onclick = () => { deckLv = 0; kataSeg = 'sulit'; sfx('pop'); viewKata(); }; }
  };
  const flip = () => { if (flipped) return; flipped = true; $('#back').classList.remove('hide'); const fc = $('#fCtx'); if (fc) fc.classList.add('hide'); $('#tapl').classList.add('hide'); $('#actFront').classList.add('hide'); $('#actBack').classList.remove('hide'); sfx('pop'); autoSay(); };
  /* catat jawaban; mode 0 = tutup kata, 1 = Ragu (ulang 1x), 2 = Lupa (maks 2x). true bila dijadwalkan ulang */
  const sched = mode => {
    if (!rt) deckDone++;
    v.la = Date.now(); /* #1442: waktu jawab terakhir, untuk kecualikan kata <24 jam dari Latihan ekstra */
    deckRetry = deckRetry.filter(r => r !== rt); deckRetry.forEach(r => r.wait--); deckAns.add(v);
    if (!mode) return false;
    const st = retryGet(), id = retryId(v), n = +st.k[id] || 0;
    if (n >= (mode === 1 ? 1 : RETRY_MAX) || deckRetryTot >= RETRY_SESI) return false;
    st.k[id] = n + 1; retrySet(st); deckRetryTot++;
    deckRetry.push({ v, n: n + 1, wait: mode === 1 ? RETRY_GAP.ragu : RETRY_GAP.lupa });
    return true;
  };
  const maybe = () => {
    if (!flipped) return;
    card.style.transform = 'translateY(-30px)'; card.style.opacity = '0';
    deckExtra = deckExtra.filter(x => x !== v);
    if (quickExtra) { v.la = Date.now(); deckHint = 'Jadwal kata ini tidak berubah'; sched(0); } else { v.due = Date.now() + DAY_MS; v.known = false; deckHint = 'Besok muncul lagi'; sched(1); }
    save(); sfx('pop');
    refreshHafal();
    setTimeout(() => deck(kb), 280);
  };
  const decide = ok => {
    if (!flipped) return;
    card.style.transform = `translateX(${ok ? 140 : -140}%) rotate(${ok ? 18 : -18}deg)`; card.style.opacity = '0';
    deckExtra = deckExtra.filter(x => x !== v);
    if (quickExtra) { sched(0); v.la = Date.now(); if (ok) { deckHint = 'Mantap. Jadwal kata ini tidak berubah'; sfx('ding'); } else { v.lv = Math.max(0, (v.lv || 0) - 1); deckHint = 'Levelnya turun satu. Jadwal ulang tetap'; sfx('soft'); } save(); }
    else if (ok && rt) { v.known = false; v.due = Math.max(+v.due || 0, Date.now() + DAY_MS); deckHint = 'Nah, ingat. Kata ini selesai untuk sesi ini'; sched(0); save(); sfx('ding'); }
    else if (ok) { sched(0); const lv = v.lv || 0; if (lv >= REVIEW_DAYS.length) { v.known = true; v.due = 0; deckHint = 'Kata ini udah hafal beneran'; } else { const d = REVIEW_DAYS[lv]; v.lv = lv + 1; v.due = Date.now() + d * DAY_MS; v.known = false; deckHint = `Mantap! Muncul lagi ${d} hari ke depan · ${REVIEW_DAYS.length - lv} tahap lagi jadi hafal`; } save(); sfx('ding'); award(2, 'flash'); } else { v.lv = 0; v.due = Date.now(); v.known = false; deckHint = 'Lupa nggak apa-apa, kata ini muncul lagi'; if (!sched(2)) { v.due = Date.now() + DAY_MS; deckHint = 'Besok kita coba lagi'; } save(); sfx('soft'); }
    refreshHafal();
    setTimeout(() => deck(kb), 280);
  };
  if ($('#fget')) { const g = $('#fget'); g.addEventListener('pointerdown', e => e.stopPropagation()); g.addEventListener('pointerup', e => e.stopPropagation()); g.onclick = e => { e.stopPropagation(); g.disabled = true; g.textContent = 'Nyari…'; refillVocab().then(ok => { if (ok && kb.isConnected && $('#card')) deck(kb); else { g.disabled = false; g.textContent = 'Ambil arti'; toast('Belum ketemu, coba lagi nanti'); } }); }; }
  if ($('#fAll')) { const a = $('#fAll'); a.addEventListener('pointerdown', e => e.stopPropagation()); a.addEventListener('pointerup', e => e.stopPropagation()); a.onclick = e => { e.stopPropagation(); openSemua(v, () => { if (kb.isConnected && $('#fAll')) $('#fAll').textContent = `Semua arti (${(v.all || []).reduce((n, g) => n + g.terms.length, 0)})`; }); }; }
  $('#fShow').onclick = flip; $('#fYes').onclick = () => decide(true); $('#fNo').onclick = () => decide(false); $('#fMaybe').onclick = maybe;
  { const sp = $('#fSp'); sp.addEventListener('pointerdown', e => e.stopPropagation()); sp.addEventListener('pointerup', e => e.stopPropagation()); sp.onclick = e => { e.stopPropagation(); speak(v.w, v.lang, 0.8); }; }
  if ($('#peek')) { const pk = $('#peek'); pk.addEventListener('pointerdown', e => e.stopPropagation()); pk.addEventListener('pointerup', e => e.stopPropagation()); pk.onclick = e => { e.stopPropagation(); if (db.peekBaca !== 'ketuk') { db.showBaca = true; save(); } pk.classList.add('hide'); $('#peekv').classList.remove('hide'); if ($('#nlg')) $('#nlg').classList.remove('hide'); }; }
  nadaLegendBind();
  let sx = null, dx = 0;
  card.addEventListener('pointerdown', e => { if (!flipped) return; sx = e.clientX; dx = 0; card.style.transition = 'none'; card.setPointerCapture(e.pointerId); });
  card.addEventListener('pointermove', e => { if (sx == null) return; dx = e.clientX - sx; card.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`; card.querySelector('.yes').style.opacity = Math.max(0, dx / 100); card.querySelector('.no').style.opacity = Math.max(0, -dx / 100); });
  card.addEventListener('pointerup', () => { if (sx == null) return; sx = null; card.style.transition = ''; if (Math.abs(dx) > 90) decide(dx > 0); else { card.style.transform = ''; card.querySelectorAll('.stamp').forEach(s => s.style.opacity = 0); } });
}

/* ---------- Pengingat baca lokal + Bagikan progres (#1369) ----------
   Tanpa server & pelacak. db.remind = { on, jam:'HH:MM', shown:'tanggal' } (opsional; data lama aman).
   Notifikasi muncul saat Keepo dibuka/terbuka lewat jam pilihan dan hari itu belum baca. */
const APP_LINK = 'https://rzk-labs.github.io/baca-bahasa/';
const remSupport = () => 'Notification' in window && 'serviceWorker' in navigator;
const remJam = () => (db.remind && /^\d\d:\d\d$/.test(db.remind.jam) ? db.remind.jam : '19:30');
function remText() {
  const b = book(), n = (db.vocab || []).filter(isDue).length;
  const t = b && b.title ? splitTitle(b.title).main.slice(0, 28) : '';
  if (t) return n ? `Lanjut ${t}? ${n} kata menunggu diulang` : `Lanjut ${t}? Satu halaman cukup.`;
  return n ? `${n} kata menunggu diulang. Yuk, 2 menit aja.` : 'Yuk baca satu halaman hari ini.';
}
let remTimer = 0;
async function remCheck() {
  clearTimeout(remTimer);
  const r = db.remind;
  if (!r || !r.on || !remSupport() || Notification.permission !== 'granted') return;
  const [h, m] = remJam().split(':').map(Number), at = new Date(); at.setHours(h, m, 0, 0);
  const wait = at - Date.now();
  if (wait > 0) { remTimer = setTimeout(remCheck, Math.min(wait, 2147e6)); return; }
  if (r.shown === today() || db.days.includes(today())) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    await reg.showNotification('Keepo', { body: remText(), icon: 'icon-192.png', tag: 'keepo-baca' });
    r.shown = today(); save();
  } catch (e) { }
}
function remHtml() {
  const r = db.remind || {}, sup = remSupport(), perm = sup ? Notification.permission : '';
  let body;
  if (!sup) body = `<div class="mut sm">Pasang Keepo ke layar utama dulu. Di Safari: ketuk Bagikan, lalu <b>Tambah ke Layar Utama</b>. Buka lewat ikonnya, pengingat muncul di sini.</div>`;
  else if (perm === 'denied') body = `<div class="sm" role="alert" style="font-weight:600;background:var(--hl);border-radius:10px;padding:10px 12px">Izin notifikasi ditolak. Pengingat belum nyala.<div class="mut sm" style="margin-top:4px;font-weight:400">Izinkan di pengaturan HP atau browser, lalu coba lagi.</div><div class="row" style="margin-top:8px"><button class="sec" type="button" id="remRetry">Coba lagi</button></div></div>`;
  else body = `<div class="row" style="justify-content:space-between;align-items:center;gap:10px"><span class="eyebrow" style="margin:0">Ingatkan aku baca</span><div class="seg" id="remSw" role="group" aria-label="Pengingat baca"><button data-v="0" aria-pressed="${r.on ? 'false' : 'true'}" class="${r.on ? '' : 'on'}">Mati</button><button data-v="1" aria-pressed="${r.on ? 'true' : 'false'}" class="${r.on ? 'on' : ''}">Nyala</button></div></div>
      <div class="mut sm" style="margin-top:6px">Pengingat muncul kalau Keepo lagi terbuka/di latar. Belum bisa bunyi saat app ditutup.</div>
      ${r.on ? `<label class="row" style="gap:10px;margin-top:10px;align-items:center"><span class="sm">Jam</span><input type="time" id="remJam" value="${remJam()}" style="width:auto;min-height:44px"></label>` : ''}
      ${isStandalone() ? '' : `<div class="row" style="margin-top:8px"><button class="lnk" type="button" id="remPasang" style="min-height:44px">Pasang ke layar utama</button></div>`}`;
  return `<div class="set-grp" id="remGrp"><div class="set-gt">Pengingat baca</div><div class="set-row">${body}</div>
    <div class="set-row"><div class="eyebrow">Bagikan progres</div><div class="mut sm" style="margin-bottom:8px">Isinya streak, jumlah kata, dan tautan app. Tanpa data pribadi.</div><button class="sec full" id="shProg" type="button" style="min-height:44px">Bagikan progres</button></div></div>`;
}
async function remSet(on) {
  if (!on) { db.remind = Object.assign(db.remind || {}, { on: false }); save(); return; }
  let p = Notification.permission;
  if (p !== 'granted') { try { p = await Notification.requestPermission(); } catch (e) { p = 'denied'; } }
  db.remind = Object.assign(db.remind || {}, { on: p === 'granted', jam: remJam() });
  save(); if (p === 'granted') { remCheck(); toast('Pengingat nyala, jam ' + remJam() + ', selagi Keepo terbuka'); }
}
async function shareProg() {
  const n = streak(), w = countedVocab(null).length;
  const text = `${n ? `Streak ${n} hari` : 'Baru mulai'}, ${w} kata tersimpan di Keepo. Kepoin bahasa baru lewat cerita: ${APP_LINK}`;
  if (navigator.share) { try { await navigator.share({ text }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(text); toast('Teks progres disalin. Tinggal tempel.'); }
  catch (e) { toast('Gagal membagikan. Coba lagi.'); }
}
function remWire() {
  const g = $('#remGrp'); if (!g) return;
  const redraw = () => { g.outerHTML = remHtml(); remWire(); };
  const sw = $('#remSw'); if (sw) $$('#remSw button').forEach(b => b.onclick = async () => { await remSet(b.dataset.v === '1'); redraw(); });
  const rt = $('#remRetry'); if (rt) rt.onclick = async () => { await remSet(true); redraw(); if (Notification.permission === 'denied') toast('Masih ditolak. Izinkan dulu di pengaturan HP.'); };
  const j = $('#remJam'); if (j) j.onchange = e => { if (/^\d\d:\d\d$/.test(e.target.value)) { db.remind.jam = e.target.value; db.remind.shown = ''; save(); remCheck(); toast('Jam pengingat: ' + e.target.value); } };
  const ps = $('#remPasang'); if (ps) ps.onclick = pasangSheet;
  const sp = $('#shProg'); if (sp) sp.onclick = shareProg;
}
/* Tawaran sekali (#1648): setelah sesi baca pertama, toast 2 tombol. db.remind.ditawar = true -> tak muncul lagi (opsional; data lama aman). */
function remOffer() {
  const r = db.remind || {};
  if (r.ditawar || r.on || isReading() || sheetOpen()) return;
  if (remSupport() && Notification.permission === 'denied') return;
  db.remind = Object.assign(r, { ditawar: true }); save();
  toast('Mau pengingat baca? Muncul saat Keepo terbuka.', 15000,
    { label: 'Ingatkan aku', fn: remOfferYes }, { label: 'Nanti aja', fn: () => { } });
}
async function remOfferYes() {
  if (remSupport()) { await remSet(true); if (!(db.remind && db.remind.on)) toast('Belum nyala. Izinkan notifikasi di pengaturan HP, atau coba lagi di Pengaturan.', 6000); return; }
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Pengingat</span>${closeBtn}</div>
    <h2>Pasang Keepo dulu</h2>
    <ol class="sm" style="padding-left:20px;margin:8px 0 12px;line-height:1.6"><li>Di Safari, ketuk tombol <b>Bagikan</b>.</li><li>Pilih <b>Tambah ke Layar Utama</b>, lalu buka lewat ikonnya.</li></ol>
    <div class="row"><button class="full" data-close style="min-height:44px">Oke</button></div>`, 'Pasang Keepo');
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) remCheck(); });
setTimeout(remCheck, 1500);

/* ---------- mulai ---------- */
applyTheme(); save();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
if ('serviceWorker' in navigator && !TEST && location.protocol.startsWith('http')) {
  /* update otomatis: cek SW baru saat dibuka & kembali aktif (maks 1x/10 menit); muat ulang saat SW baru aktif */
  let swReg = null, lastUp = Date.now(), reloaded = false, ctl = !!navigator.serviceWorker.controller;
  const busyNow = () => document.body.classList.contains('reading') || sheetOpen() || (typeof recog !== 'undefined' && !!recog);
  const doReload = () => { if (reloaded) return; reloaded = true; try { save(); } catch (e) { } location.reload(); };
  const checkUp = () => { if (!swReg || Date.now() - lastUp < 600000) return; lastUp = Date.now(); swReg.update().catch(() => { }); };
  navigator.serviceWorker.register('sw.js').then(r => { swReg = r; r.update().catch(() => { }); }).catch(() => { });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkUp(); });
  const bukaAt = Date.now();
  let hiddenAt = 0;
  const lastRel = () => { try { return +localStorage.getItem('kepo-lastReload') || 0; } catch (e) { return 0; } };
  const bolehRel = () => !busyNow() && Date.now() - lastRel() > 21600000;
  const relAman = () => { try { localStorage.setItem('kepo-lastReload', String(Date.now())); } catch (e) { } doReload(); };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { hiddenAt = Date.now(); return; }
    /* kembali dari latar belakang >30 menit: muat ulang bila versi baru sudah menunggu */
    if (verBaruSiap && hiddenAt && Date.now() - hiddenAt > 1800000 && bolehRel()) relAman();
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!ctl) { ctl = true; return; } /* install pertama: abaikan */
    if (reloaded) return;
    try { save(); } catch (e) { }
    if (Date.now() - bukaAt < 5000 && bolehRel()) { relAman(); return; }
    /* selain itu: update diam-diam, chip kecil di Pengaturan, tanpa toast */
    verBaruSiap = true;
    const c = $('#muChip'); if (c) c.hidden = false;
  });
}
if ('speechSynthesis' in window) speechSynthesis.getVoices();
const syncOff = () => { const o = $('#roff'); if (o) o.hidden = navigator.onLine; };
window.addEventListener('offline', syncOff);
window.addEventListener('online', () => { syncOff(); const o = $('#sheet #woff'), oOn = o && !o.hidden; if (o) { o.hidden = true; o.innerHTML = ''; } const r = $('#sheet #wretry'); if (r) r.click(); else if (oOn) { const w = $('#sheet #wslow'); if (w) w.click(); } const s = $('#sheet #sretry'); if (s) s.click(); });
window.addEventListener('online', () => { if (rekapAktif && $('#rsl')) isiArtiRekap(rekapAktif); });
window.addEventListener('online', () => { refillVocab().then(ok => { if (ok) toast('Arti kata udah keisi'); }); });
setTab(db.tab && db.tab !== 'sosial' && (db.tab === 'rak' || db.cur) ? db.tab : 'rak');
bersihYatim(); muatCover();
setTimeout(() => { const b = book(); if (b && db.tab !== 'baca') sesiSisa(b); }, 600);
