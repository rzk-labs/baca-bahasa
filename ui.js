'use strict';
/* KEEPO v8— Perpustakaan santai (krem, hijau tua, oranye bata; tanpa maskot). XP/level, lencana, konfeti, kartu swipe. Logika teks/suara/skor ada di app.js. */
db.font = db.font || 'serif'; db.days = db.days || []; db.scores = db.scores || []; db.lh = db.lh || 1.7; if (db.align !== 'l' && db.align !== 'j') db.align = null; db.mg = db.mg || 'm'; if (db.spacing !== 'w') db.spacing = 'n'; db.focus = !!db.focus; if (db.showBaca == null) db.showBaca = true; db.rt = [0, 1, 2].includes(db.rt) ? db.rt : 0;
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
const GOAL = 30;
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
  slow:'<path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"/><circle cx="10" cy="13" r="8"/><path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"/><path d="M18 3 19.1 5.2M22 3 20.9 5.2"/>'
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
const today = () => new Date().toISOString().slice(0, 10);
function markDay() { const d = today(); if (!db.days.includes(d)) { db.days.push(d); db.days = db.days.slice(-400); save(); } }
function streak() { let n = 0; const d = new Date(); if (!db.days.includes(today())) d.setDate(d.getDate() - 1); for (; ;) { if (db.days.includes(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); } else return n; } }
function hue(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
// Sampul brand v9: [latar, teks, aksen inisial]. Plum di atas warna terang, Krem di atas Plum.
const CCOL = [['#D7EFFF', '#351E28', '#351E28'], ['#C3E1F4', '#351E28', '#351E28'], ['#AEB8A0', '#351E28', '#351E28'], ['#FAF7F0', '#351E28', '#351E28'], ['#E4EDD6', '#351E28', '#351E28'], ['#B9CBD8', '#351E28', '#351E28'], ['#351E28', '#FAF7F0', '#E9F056'], ['#4A3340', '#FAF7F0', '#E9F056']];
const COVERS = {};
async function muatCover() { let ada = false; for (const b of db.books) { if (b.cov && !COVERS[b.id]) { try { const u = await getCover(b.id); if (u) { COVERS[b.id] = u; ada = true; } } catch (e) { } } } if (ada && (db.tab === 'rak' || db.tab === 'home')) setTab(db.tab); }
/* pisahkan penulis dalam kurung: 'こころ（夏目漱石）' -> {main:'こころ', au:'夏目漱石'} (hanya tampilan) */
function splitTitle(t) { t = String(t || '').trim(); const m = t.match(/^(.*\S)\s*[（(]([^（）()]+)[）)]\s*$/); return m ? { main: m[1], au: m[2].trim() } : { main: t, au: '' }; }
function coverTitle(t) { if (t.length <= 34) return t; const c = t.slice(0, 34), i = c.search(/\s\S*$/); return (i > 12 ? c.slice(0, i) : c).replace(/[\s,;:\-–—]+$/, '') + '…'; }
/* arti alternatif tanpa pengulangan arti utama (abaikan huruf besar/kecil, spasi, tanda baca); kosong = sembunyikan 'Bisa juga' */
const altArti = (dict, main) => {
  const nz = t => String(t || '').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
  const seen = new Set(String(main || '').split(/[;,，、；\/]/).map(nz).filter(Boolean)); seen.add(nz(main));
  const out = [];
  for (const t of (dict || []).flatMap(x => x.terms.slice(0, 4))) { const k = nz(t); if (!k || seen.has(k)) continue; seen.add(k); out.push(t); }
  return out.slice(0, 4);
};
function cover(b) { const h = hue(b.title), c = CCOL[h % CCOL.length], t = splitTitle(b.title).main, ini = (t.match(/[\p{L}\p{N}]/u) || ['K'])[0].toLocaleUpperCase(); return `<div class="cover" style="background:${c[0]};color:${c[1]}" role="img" aria-label="${esc(t)}"><span class="em" style="color:${c[2]}" aria-hidden="true">${esc(ini)}</span>${COVERS[b.id] ? `<img class="cimg" src="${COVERS[b.id]}" alt="" decoding="async" onerror="this.remove()">` : ''}</div>`; }
// Ukuran judul sampul: kata terpanjang makin panjang → huruf makin kecil (kata tak dipenggal); CJK boleh patah per huruf
function coverSz(t) { if (/[぀-ヿ㐀-鿿가-힯]/.test(t)) return ' cjk'; const n = Math.max(0, ...t.split(/\s+/).map(w => [...w].length)); return n > 13 ? ' c4' : n > 11 ? ' c3' : n > 9 ? ' c2' : n > 7 ? ' c1' : ''; }
function applyTheme() {
  document.documentElement.dataset.theme = db.theme;
  try { stopListenPage(); } catch (_) {} /* ganti tema saat dengar: berhenti bersih */
  document.querySelector('meta[name=theme-color]').content = { paper: '#FAF7F0', sepia: '#F3E9D7', green: '#E3EEDC', night: '#1E1A1D' }[db.theme] || '#FAF7F0';
}
const LANG_ID = { en: 'Inggris', ja: 'Jepang', ko: 'Korea', 'zh-CN': 'Mandarin', fr: 'Prancis', de: 'Jerman', es: 'Spanyol', it: 'Italia', nl: 'Belanda', pt: 'Portugis', ru: 'Rusia', ar: 'Arab', th: 'Thai', hi: 'Hindi', tr: 'Turki', id: 'Indonesia' };
const FLAG = { en: '🇬🇧', ja: '🇯🇵', ko: '🇰🇷', 'zh-CN': '🇨🇳', fr: '🇫🇷', de: '🇩🇪', es: '🇪🇸', it: '🇮🇹', nl: '🇳🇱', pt: '🇵🇹', ru: '🇷🇺', ar: '🇸🇦', th: '🇹🇭', hi: '🇮🇳', tr: '🇹🇷', id: '🇮🇩' };
const langName = l => (FLAG[l] || '') + ' ' + (LANG_ID[l] || (LANGS[l] || [l])[0]);
/* SATU rumus persen buku (bobot bab bila units valid) untuk SEMUA layar: Home, bar baca, Profil, Koleksi, Sosial.
   Dihitung ulang saat render dari pos + halaman tersimpan, bukan dari b.pct lama yang bisa basi. Tamat = 100. */
/* posisi dalam bab = pecahan stabil b.frac (0-1, milik bab b.fracPos); buku lama: dari pg/pgN; tak ada = awal bab */
function fracOf(b) {
  const pos = b.pos || 0;
  if (typeof b.frac === 'number' && b.fracPos === pos && b.frac >= 0 && b.frac <= 1) return b.frac;
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
  if (!b.total) return b.pct != null ? b.pct : 0;
  return pctCalc(b, fracOf(b));
};
/* SATU fungsi status buku (Home, bar baca, Profil): tamat = 100% + label 'Selesai' */
const statusPct = p => { p = Math.max(0, Math.min(100, +p || 0)); return p >= 100 ? { done: true, pct: 100, label: 'Selesai', txt: 'Selesai · 100%' } : { done: false, pct: p, label: 'Lagi dibaca', txt: p + '%' }; };
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
const PG_CAP = 10; // XP halaman/bab yang dihitung ke target harian per hari
const xpToday = () => { const d = today(); return Math.max(0, (db.xpDay[d] || 0) - Math.max(0, ((db.pgXpDay || {})[d] || 0) - PG_CAP)); };
/* tampilan lencana jujur: lencana berbasis kata tersimpan hanya tampil terbuka bila syaratnya masih terpenuhi (db.badges tak diubah) */
const BADGE_VOCAB_MIN = { kepo1: 1, kolektor: 10 };
const BADGE_REAL = ['kepo1', 'kolektor', 'kutubuku', 'berani', 'perfect', 'boss', 'otak']; /* syarat dihitung dari data nyata di perangkat ini, bukan XP/lencana gabungan */
const badgeShown = id => db.badges.includes(id) && !(BADGE_REAL.includes(id) && !BADGES.find(b => b[0] === id)[4]());
const BADGES = [
  ['kepo1', 'eye', 'Keepo Pertama', 'Simpan 1 kata', () => countedVocab(null).length >= 1],
  ['kolektor', 'bm', 'Kolektor', 'Simpan 10 kata', () => countedVocab(null).length >= 10],
  ['kutubuku', 'book', 'Kutu Buku', 'Balik 20 halaman', () => db.stat.page >= 20],
  ['berani', 'mic', 'Berani Ngomong', 'Selesaikan 1 tantangan', () => db.stat.speak >= 1],
  ['perfect', 'target', 'Sempurna', 'Skor kalimat 95%+', () => db.stat.perfect >= 1],
  ['boss', 'shield', 'Boss Slayer', 'Kalahin 5 kata sulit', () => db.stat.rem >= 5],
  ['otak', 'cards', 'Otak Encer', 'Hafal 10 kartu', () => db.stat.flash >= 10],
  ['fire3', 'flame', 'On Fire', 'Streak 3 hari', () => streak() >= 3],
  ['fire7', 'bolt', 'Seminggu Nonstop', 'Streak 7 hari', () => streak() >= 7],
  ['lv5', 'star', 'Level 5', 'Kumpulkan 400 XP', () => level() >= 5]
];
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
const XP_WHY = { save: 'kata disimpan', page: 'halaman selesai', done: 'buku tamat', look: 'kata dicek', speak: 'ngomong', rem: 'kata sulit' };
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
  db.lvlSeen = lv; save(); celebrate(`Level ${lv}!`, 'Naik level! Kamu makin jago', 'lvl');
}
function award(n, stat, pk0, si) {
  if (stat === 'page') {
    /* hitung hanya bila maju sungguhan: kalimat awal halaman > kalimat terjauh yang sudah dihitung hari ini (tahan ganti huruf/layout) */
    const sd = today(), sk0 = pk0 || '?', idx = Number.isFinite(si) ? si : 0;
    if (!db.pgSeen || Array.isArray(db.pgSeen)) db.pgSeen = {};
    let day = db.pgSeen[sd]; if (!day || typeof day !== 'object' || Array.isArray(day)) day = db.pgSeen[sd] = {}; /* format lama (array) diabaikan */
    if (sk0 in day && idx <= day[sk0]) return;
    day[sk0] = idx;
  }
  if (stat) db.stat[stat] = (db.stat[stat] || 0) + 1;
  if (n && stat) { db.xpSrc = db.xpSrc || {}; db.xpSrc[stat] = (db.xpSrc[stat] || 0) + n; } /* asal XP, hanya untuk tampilan */
  if (stat === 'page') {
    db.pgDay = db.pgDay || {}; const pd = today(); db.pgDay[pd] = (db.pgDay[pd] || 0) + 1;
    const pk = Object.keys(db.pgDay).sort(); if (pk.length > 60) delete db.pgDay[pk[0]];
    const sg = Object.keys(db.pgSeen).sort(); while (sg.length > 8) delete db.pgSeen[sg.shift()];
  }
  const before = level();
  if (n) {
    db.xp += n; const d = today(); const had = xpToday(); db.xpDay[d] = (db.xpDay[d] || 0) + n;
    if (stat === 'page') { db.pgXpDay = db.pgXpDay || {}; db.pgXpDay[d] = (db.pgXpDay[d] || 0) + n; const gk = Object.keys(db.pgXpDay).sort(); if (gk.length > 60) delete db.pgXpDay[gk[0]]; }
    const keys = Object.keys(db.xpDay).sort(); if (keys.length > 60) delete db.xpDay[keys[0]];
    const f = document.createElement('div'); f.className = 'xpfly' + (isReading() ? ' mini' : ''); f.textContent = `+${n} XP` + (XP_WHY[stat] ? ` · ${XP_WHY[stat]}` : ''); document.body.appendChild(f); setTimeout(() => f.remove(), isReading() ? 800 : 1200);
    const now = xpToday(); if (had < GOAL && now >= GOAL) setTimeout(() => notifyLater(() => { afterSheet(() => { toast('Target harian beres!', 2000); sfx('win'); confetti(50); }); }), 600);
  }
  markDay(); save(); refreshPills();
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
  document.querySelectorAll('.lvlup').forEach(x => x.remove());
  const el = document.createElement('div'); el.className = 'lvlup';
  el.innerHTML = `<div class="card">${spot('cheer', 'jump')}<h1>${esc(title)}</h1><p class="mut">${esc(msg)}</p><button class="lime full">Lanjut!</button></div>`;
  document.body.appendChild(el); el.querySelector('button').onclick = () => el.remove(); el.onclick = e => { if (e.target === el) el.remove(); };
}
function refreshPills() { const s = $('#pStreak'), x = $('#pXp'); if (s) s.innerHTML = `${ico('flame')}${streak()}`; if (x) { x.innerHTML = `${ico('bolt')}${db.xp}<span class="sr"> XP total</span>`; x.title = 'XP total'; } }

/* ---------- kerangka ---------- */
let toastT;
const MSG_SIMPAN_GAGAL = 'Gagal nyimpen bukunya, coba lagi ya. Kalau terus gagal, hapus buku lama dulu.';
let lastErrToast = 0;
function globalErr(ev) {
  const r = ev && (ev.reason || ev.error), msg = String((r && r.message) || (ev && ev.message) || r || '');
  if (/ResizeObserver|AbortError|Script error/i.test(msg) || (ev && ev.type === 'error' && !ev.error && !ev.message)) return;
  if (ev && ev.target && ev.target !== window) return; // gagal muat gambar/skrip bukan error kode
  const now = Date.now(); if (now - lastErrToast < 10000) return; lastErrToast = now;
  console.error(r || msg);
  toast('Ada yang macet sebentar. Bacaan & katamu tetap aman.', 8000, { label: 'Muat ulang', fn: () => location.reload() });
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
function toast(m, ms = 3200, act) { const t = $('#toast'); t.textContent = ''; const tx = document.createElement('span'); tx.className = 'ttx'; tx.textContent = m; t.append(tx); if (act) { const b = document.createElement('button'); b.className = 'tact'; b.textContent = act.label; b.onclick = () => { t.classList.add('hide'); act.fn(); }; t.append(b); } t.classList.remove('hide'); t.style.animation = 'none'; void t.offsetWidth; t.style.animation = ''; clearTimeout(toastT); if (isFinite(ms)) toastT = setTimeout(() => t.classList.add('hide'), ms); }
let sheetRet = null;
const RTL_LANGS = ['ar', 'he', 'fa', 'ur'];
function openSheet(html, label) { if ($('#sheet').classList.contains('hide')) { const a = document.activeElement; sheetRet = a && a !== document.body ? a : null; } $('#sheetBody').innerHTML = html; $('#sheet').classList.remove('hide'); $('#shade').classList.remove('hide'); $('#sheet').scrollTop = 0; $$('#sheet [data-close]').forEach(b => b.onclick = closeSheet); { const hd = $('#sheetBody h2, #sheetBody .stepchip'); $('#sheet').setAttribute('aria-label', label || (hd && hd.textContent.trim()) || 'Panel'); } try { $('#sheet').focus({ preventScroll: true }); } catch (e) { } }
function closeSheet() { const wasOpen = !$('#sheet').classList.contains('hide'); const ret = sheetRet; sheetRet = null; if (RD.dy) { RD.dy = 0; const c = $('#cols'); if (c) c.style.transform = `translate(${-RD.page * RD.step}px, 0px)`; } $('#sheet').classList.add('hide'); $('#shade').classList.add('hide'); if (wasOpen && (lvlPending || sheetQ.length)) setTimeout(() => { if (sheetOpen()) return; if (lvlPending) notifyLater(showLevelUp); const q = sheetQ; sheetQ = []; q.forEach((f, i) => setTimeout(() => afterSheet(f), 600 + i * 1800)); }, 400); $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); if (wasOpen && ret && ret.isConnected) try { ret.focus({ preventScroll: true }); } catch (e) { } if (wasOpen && document.body.classList.contains('reading') && pfOk()) pfResume(1000); }
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
/* Back HP / geser-balik: e-reader punya satu entri riwayat; Back menutup sheet dulu, lalu balik ke Home */
let rdHist = false, rdSkip = 0;
function rdLeave() { if (!rdHist) return; rdHist = false; rdSkip++; history.back(); }
addEventListener('popstate', () => {
  if (rdSkip) { rdSkip--; return; }
  if (!rdHist) return;
  if (!$('#sheet').classList.contains('hide')) { closeSheet(); history.pushState({ kepo: 'baca' }, ''); return; }
  rdHist = false; leaveBaca();
});
function setTab(t) {
  if (t !== 'baca') { rdLeave(); pfDisarm(); }
  db.tab = t; save(); closeSheet(); stopListen(); document.body.classList.remove('reading'); wakeSync();
  $$('#tabs button').forEach(b => { b.classList.toggle('on', b.dataset.t === t); b.setAttribute('aria-current', b.dataset.t === t ? 'page' : 'false'); });
  $('#ttl').innerHTML = BRAND_TTL; progress(null);
  $('#hdx').innerHTML = `<span class="pill fire" id="pStreak" title="Streak hari"></span><span class="pill xp" id="pXp" title="Total XP"></span><span id="acctSlot"></span><button class="icon hfb" id="hFb" type="button" aria-label="Kirim masukan">${ico('chat')}<span class="hfbl">Masukan</span></button><button class="icon" id="set" aria-label="Pengaturan">${ico('sliders')}</button>`;
  refreshPills(); $('#set').onclick = openSettings; $('#hFb').onclick = () => openFeedback();
  $('#view').style.animation = 'none'; void $('#view').offsetWidth; $('#view').style.animation = '';
  window.scrollTo(0, 0);
  ({ rak: viewRak, baca: viewBaca, bicara: viewBicara, kata: viewKata, sosial: () => typeof viewSosial === 'function' ? viewSosial() : viewRak() })[t]();
  if (t === 'rak') setTimeout(cadNote, 2500);
}
$$('#tabs button').forEach(b => b.onclick = () => { vib(5); sfx('pop'); setTab(b.dataset.t); });
const emptyState = (mood, title, msg, btn, act) => `<div class="empty">${spot(mood)}<h2>${title}</h2><div class="mut sm">${msg}</div>${btn ? `<button class="pri" onclick="${act}">${btn}</button>` : ''}</div>`;

/* ---------- pengaman data (Safari tab biasa) ---------- */
const isStandalone = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } };
const dataRisk = () => !isStandalone() && STORAGE_PERSISTED !== true && !db.acct;
function dataWarn() {
  if (!dataRisk()) return '';
  return `<div class="set-row" id="dataWarn"><div class="eyebrow">Data HP ini</div><div class="mut sm">Data kamu bisa terhapus sendiri oleh Safari kalau lama tak dibuka. Pasang ke Layar Utama atau simpan cadangan.</div><div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px"><button class="sec" id="dwHow" type="button">Cara pasang</button><button class="sec" id="dwSave" type="button">Simpan cadangan</button></div></div>`;
}
function dataWarnWire() {
  if ($('#dwSave')) $('#dwSave').onclick = () => { if (typeof bkSave === 'function') bkSave(); };
  if ($('#dwHow')) $('#dwHow').onclick = () => openSheet(`<h2>Pasang ke Layar Utama</h2><ol class="rules"><li>Ketuk tombol Bagikan di Safari.</li><li>Pilih "Tambah ke Layar Utama".</li><li>Ketuk Tambah, lalu buka Kepo dari ikonnya.</li></ol><button class="pri full" data-close>Oke, paham</button>`, 'Cara pasang ke Layar Utama');
}
function cadNote() {
  try {
    if (!dataRisk() || isReading()) return;
    if ((db.vocab || []).length < 5 || localStorage.getItem('kepo.bkDone')) return;
    const last = +localStorage.getItem('kepo.noteCad') || 0;
    if (Date.now() - last < 14 * 864e5) return;
    if (!$('#sheet').classList.contains('hide') || !$('#toast').classList.contains('hide') || !db.seenTip || db.tab !== 'rak') return;
    localStorage.setItem('kepo.noteCad', String(Date.now()));
    toast('Katamu belum dicadangkan. Simpan cadangan biar aman.', 8000, { label: 'Simpan', fn: () => { if (typeof bkSave === 'function') bkSave(); } });
  } catch (e) { }
}

/* ---------- pengaturan ---------- */
function voiceRow(lang) {
  const p = LANGS[lang][1].toLowerCase().slice(0, 2), cur = db.voices && db.voices[lang];
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
  return `<div class="prep" id="prepBox"><div class="prep-t">${ico('dl')}<b>Arti bagian ini tanpa sinyal</b></div><div class="mut sm" id="prepMsg" role="status">Unduh arti kata bagian ini sekali, biar tetap kebuka di KRL.</div><div class="prep-bar" id="prepBar" hidden><i></i></div><div class="prep-acts"><button class="sec" id="prepGo" type="button">Siapkan arti bab ini</button><button class="ghost" id="prepCancel" type="button" hidden>Batal</button></div></div>`;
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
    const show = () => { msg.textContent = `${base + ok} dari ${total} kata siap`; bar.hidden = false; bar.firstElementChild.style.width = Math.round((base + done) / total * 100) + '%'; };
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
    <div class="set-row"><div class="eyebrow">Huruf baca</div><div class="seg" id="fnt"><button data-v="serif" class="${db.font === 'serif' ? 'on' : ''}" style="font-family:var(--font-reader)">Klasik</button><button data-v="sans" class="${db.font === 'sans' ? 'on' : ''}">Modern</button></div></div>
    <div class="set-row"><div class="eyebrow">Jarak huruf</div><div class="seg" id="sps">${[['n', 'Normal'], ['w', 'Lega']].map(([v, t]) => `<button data-v="${v}" class="${db.spacing === v ? 'on' : ''}">${t}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Rata teks</div><div class="seg" id="als">${[['l', 'Kiri'], ['j', 'Kiri-kanan']].map(([v, t]) => `<button data-v="${v}" class="${effAlign() === v ? 'on' : ''}">${t}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Jarak baris</div><div class="seg" id="lhs">${LHS.map(v => `<button data-v="${v}" class="${nearLh(readLh(b && b.lang)) === v ? 'on' : ''}">${v}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Margin halaman</div><div class="seg" id="mgs">${[['s', 'Sempit'], ['m', 'Sedang'], ['l', 'Lebar']].map(([k, l]) => `<button data-v="${k}" class="${db.mg === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Fokus baris</div><div class="seg" id="fcs"><button data-v="0" class="${db.focus ? '' : 'on'}">Mati</button><button data-v="1" class="${db.focus ? 'on' : ''}">Nyala</button></div></div>
    </div>
    <div class="set-grp"><div class="set-gt">Bantuan kata</div>
    ${b && ['ja', 'ko', 'zh-CN'].includes(b.lang) ? `<div class="set-row"><div class="eyebrow">Cara baca di atas kata</div><div class="seg" id="rts">${[[0, 'Mati'], [1, 'Pernah kuketuk'], [2, 'Semua tersimpan']].map(([k, l]) => `<button data-v="${k}" class="${db.rt === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>` : ''}
    ${b && document.body.classList.contains('reading') ? `<div class="set-row">${prepHtml()}</div>` : ''}
    <div class="set-row"><div class="eyebrow">Tandai kata yang sering kuketuk</div><div class="seg" id="mos"><button data-v="1" class="${db.markOften === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.markOften === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Kata yang diketuk 3× atau lebih dikasih latar tipis di teks.</div></div>
    <div class="set-row"><div class="eyebrow">Intip kata bab</div><div class="seg" id="ips"><button data-v="1" class="${db.intip === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.intip === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Kartu kecil berisi 3-5 kata baru di awal bab. Bisa dilewati.</div></div>
    <div class="set-row"><div class="eyebrow">Jelaskan kalimat (AI)</div><div class="seg" id="ais"><button data-v="1" class="${db.aiJelas === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.aiJelas === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Tombol penjelas di arti kalimat. Cuma jalan kalau diketuk, gratis 5x sehari.</div></div>
    <div class="set-row"><div class="eyebrow">Tampilkan cara baca</div><div class="seg" id="bcs"><button data-v="1" class="${db.showBaca ? 'on' : ''}">Nyala</button><button data-v="0" class="${db.showBaca ? '' : 'on'}">Mati</button></div></div>
    ${'speechSynthesis' in window ? `<div class="set-row"><div class="eyebrow">Laju suara</div><div class="seg" id="trs"><button data-v="normal" class="${db.ttsRate === 'slow' ? '' : 'on'}">${ico('vol')} Normal</button><button data-v="slow" class="${db.ttsRate === 'slow' ? 'on' : ''}">${ico('vol')} Lambat</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Lambat bikin suara lebih pelan, enak buat nangkep tiap kata.</div></div><div class="set-row"><div class="eyebrow">Lanjut otomatis</div><div class="seg" id="las"><button data-v="1" class="${db.lisAuto ? 'on' : ''}">Nyala</button><button data-v="0" class="${db.lisAuto ? '' : 'on'}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Dengar halaman lanjut sendiri ke halaman berikutnya. Berhenti di akhir bab. Di iPhone, suara berhenti saat layar mati. Biarkan layar menyala.</div></div>` : ''}
    <div class="set-row"><div class="eyebrow">Bar progres</div><div class="seg" id="pbs"><button data-v="1" class="${db.progBar === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.progBar === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Mati = teks Bagian/Hal/Sisa dan bar tipis di bawah disembunyiin. Tombol panah tetap ada.</div></div>
    <div class="set-row"><div class="eyebrow">Ketuk tepi ganti halaman</div><div class="seg" id="tes"><button data-v="1" class="${db.tapEdge === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.tapEdge === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Mati = ketuk layar cuma buka/tutup menu. Geser & tombol panah tetap jalan.</div></div>
    <div class="set-row"><div class="eyebrow">Layar tetap menyala saat baca</div><div class="seg" id="wks"><button data-v="1" class="${db.wake === false ? '' : 'on'}">Nyala</button><button data-v="0" class="${db.wake === false ? 'on' : ''}">Mati</button></div><div style="margin-top:6px;font-size:13px;line-height:18px;color:var(--color-text-muted)">Layar tidak mati sendiri saat kamu baca. Matikan kalau boros baterai.</div></div>
    </div>
    <div class="set-grp"><div class="set-gt">Lainnya</div>
    <div class="set-row"><div class="eyebrow">Efek suara</div><div class="seg" id="sfxs"><button data-v="1" class="${db.sfx ? 'on' : ''}">${ico('vol')} Nyala</button><button data-v="0" class="${db.sfx ? '' : 'on'}">${ico('mute')} Mati</button></div></div>
    ${b ? `<div class="set-row"><div class="eyebrow">Bahasa cerita ini</div><select id="blang">${langOpts(b.lang)}</select></div>` : ''}
    ${b && 'speechSynthesis' in window ? voiceRow(b.lang) : ''}
    <div class="set-row"><div class="eyebrow">Artiin ke</div><select id="mylang">${langOpts(db.my)}</select></div>
    ${document.body.classList.contains('reading') ? '' : (typeof openWhatsNew === 'function' ? '<button class="sec full fb-open" id="wnSet">' + ico('sparkle') + 'Yang baru</button>' : '') + '<button class="sec full fb-open" id="fbSet">' + ico('chat') + 'Kirim masukan</button>'}
    <div class="set-grp" id="aturan"><div class="set-gt">Aturan &amp; Hak cipta</div>
    <ul class="rules">
      <li>Baca &amp; bagikan hanya buku milikmu atau domain publik.</li>
      <li>Kamus Jepang kecil (cara baca &amp; bentuk dasar) disusun dengan rujukan JMdict © EDRDG, lisensi CC BY-SA 4.0.</li>
      <li>Buku dan progresmu tersimpan di HP ini, bukan di server.</li>
      <li>Kalau login, hanya XP, kata, dan buku yang kamu bagikan ikut tersimpan.</li>
      <li>Bagikan = link pribadi. Hanya yang kamu kirimi link yang bisa buka.</li>
      <li>Terjemahan otomatis bisa keliru. Anggap sebagai bantuan, bukan kebenaran.</li>
      <li>Minta hapus konten atau laporkan buku: lewat tombol di bawah.</li>
    </ul>
    ${document.body.classList.contains('reading') ? '' : `<button class="sec full fb-open" id="fbTake">${ico('flag')}Minta hapus konten</button>`}
    </div>
    ${dataWarn()}
    ${typeof bkCard === 'function' ? `<div class="set-row"><div class="eyebrow">Akun &amp; cadangan</div><div class="mut sm">${NOTE_AKUN}</div></div>${bkCard()}` : ''}
    <button class="ghost full" id="rst">Balikin setelan awal</button>
    </div>`, 'Pengaturan baca');
  if ($('#vsel')) $('#vsel').onchange = e => { db.voices = db.voices || {}; if (e.target.value) db.voices[b.lang] = e.target.value; else delete db.voices[b.lang]; save(); speak(b.lang === 'ja' ? 'こんにちは' : 'Hello', b.lang); };
  if ($('#fbSet')) $('#fbSet').onclick = () => openFeedback();
  if ($('#wnSet')) $('#wnSet').onclick = () => openWhatsNew();
  if ($('#fbTake')) $('#fbTake').onclick = () => openFeedback({ kind: 'takedown' });
  if ($('#prepBox')) pagesOf(b).then(sc => { if ($('#prepBox')) bindPrep(b, sc[Math.min(b.pos || 0, sc.length - 1)]); });
  if ($('#bmTog')) { syncMarks(); $('#bmTog').onclick = toggleMark; $('#bmList').onclick = openMarks; syncKenalAll(); $('#kenalAll').onclick = kenalAllPage; $('#bkFind').onclick = openFind; $('#goSpeak').onclick = () => { closeSheet(); setTab('bicara'); }; }
  $('#sheetBody').onclick = () => { const v = $('#spv'); if (!v) return; v.classList.toggle('serif', db.font === 'serif'); v.style.setProperty('--reader-lh', readLh(pl)); v.style.fontSize = readFs(b && b.lang) + 'px'; v.style.textAlign = effAlign() === 'j' ? 'justify' : 'left'; spcSet(v, db.spacing); };
  const relayout = () => { const p = $('#cols'); if (p) { p.style.fontSize = readFs(b && b.lang) + 'px'; $('#reader').style.setProperty('--reader-lh', readLh(b && b.lang)); $('#reader').dataset.align = effAlign(); spcSet($('#reader'), db.spacing); $('#reader').style.setProperty('--reader-mg', (MG[db.mg] || 24) + 'px'); layout(); } };
  const setFs = v => { db.fs = Math.max(16, Math.min(28, v)); db.fsSet = true; save(); $('#fsv').textContent = db.fs + ' px'; relayout(); };
  $('#fsm').onclick = () => setFs(readFs(b && b.lang) - 1); $('#fsp').onclick = () => setFs(readFs(b && b.lang) + 1);
  $$('#thm button').forEach(x => x.onclick = () => { db.theme = x.dataset.v; save(); applyTheme(); $$('#thm button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#fnt button').forEach(x => x.onclick = () => { db.font = x.dataset.v; save(); $$('#fnt button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) { r.classList.toggle('serif', db.font === 'serif'); layout(); } });
  $$('#als button').forEach(x => x.onclick = () => { db.align = x.dataset.v; save(); $$('#als button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $$('#sps button').forEach(x => x.onclick = () => { db.spacing = x.dataset.v; save(); $$('#sps button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $$('#lhs button').forEach(x => x.onclick = () => { db.lh = +x.dataset.v; db.lhSet = true; save(); $$('#lhs button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $$('#mgs button').forEach(x => x.onclick = () => { db.mg = x.dataset.v; save(); $$('#mgs button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $$('#fcs button').forEach(x => x.onclick = () => { db.focus = x.dataset.v === '1'; save(); $$('#fcs button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) { r.classList.toggle('focus', db.focus); $$('.cols .cur').forEach(e => e.classList.remove('cur')); const c = $('#cols'); if (c) c.classList.remove('has-cur'); } });
  $$('#las button').forEach(x => x.onclick = () => { db.lisAuto = x.dataset.v === '1'; save(); $$('#las button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#trs button').forEach(x => x.onclick = () => { db.ttsRate = x.dataset.v === 'slow' ? 'slow' : 'normal'; save(); $$('#trs button').forEach(y => y.classList.toggle('on', y === x)); speak(b && b.lang === 'ja' ? 'こんにちは' : 'Hello', b ? b.lang : 'en', 0.8); });
  $$('#rts button').forEach(x => x.onclick = () => { db.rt = +x.dataset.v; save(); $$('#rts button').forEach(y => y.classList.toggle('on', y === x)); if (document.body.classList.contains('reading')) viewBaca(); });
  $$('#mos button').forEach(x => x.onclick = () => { db.markOften = x.dataset.v === '1'; save(); $$('#mos button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) r.classList.toggle('no-often', !db.markOften); });
  $$('#ais button').forEach(x => x.onclick = () => { db.aiJelas = x.dataset.v === '1'; save(); $$('#ais button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#ips button').forEach(x => x.onclick = () => { db.intip = x.dataset.v === '1'; save(); $$('#ips button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#bcs button').forEach(x => x.onclick = () => { db.showBaca = x.dataset.v === '1'; save(); $$('#bcs button').forEach(y => y.classList.toggle('on', y === x)); const wb = $('#wbaca'); if (wb) wb.textContent = db.showBaca && wb.dataset.b ? wb.dataset.b : ''; });
  $$('#pbs button').forEach(x => x.onclick = () => { db.progBar = x.dataset.v === '1'; save(); $$('#pbs button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) r.classList.toggle('no-prog', !db.progBar); });
  $$('#tes button').forEach(x => x.onclick = () => { db.tapEdge = x.dataset.v === '1'; save(); $$('#tes button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#wks button').forEach(x => x.onclick = () => { db.wake = x.dataset.v === '1'; save(); $$('#wks button').forEach(y => y.classList.toggle('on', y === x)); wakeSync(); });
  $$('#sfxs button').forEach(x => x.onclick = () => { db.sfx = x.dataset.v === '1'; save(); $$('#sfxs button').forEach(y => y.classList.toggle('on', y === x)); sfx('ding'); });
  $('#rst').onclick = () => { db.fs = 19; db.fsSet = false; db.lh = 1.7; db.lhSet = false; db.align = null; db.mg = 'm'; db.spacing = 'n'; db.focus = false; db.font = 'serif'; db.theme = 'paper'; db.showBaca = true; db.rt = 0; db.markOften = true; db.progBar = true; save(); applyTheme(); closeSheet(); if (document.body.classList.contains('reading')) viewBaca(); toast('Setelan dibalikin ke awal.'); };
  if ($('#blang')) $('#blang').onchange = e => { b.lang = e.target.value; save(); cache.id = null; trCache.clear(); closeSheet(); setTab(db.tab); };
  if (typeof bkWire === 'function') bkWire(); dataWarnWire();
  $('#mylang').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
}

/* ---------- kirim masukan (tahap 1: tanpa server) ---------- */
const APP_VER = 'v46';
const FEEDBACK_URL = 'https://kepo-dev.rizkachoirunnisa0403.workers.dev/feedback'; // Worker HQ (dev/); token GitHub tetap di sana
function openFeedback(opt = {}) {
  const reading = document.body.classList.contains('reading');
  const kinds = [['rusak', 'bug', 'Ada yang rusak'], ['ide', 'bulb', 'Ide'], ['suka', 'heart', 'Suka'], ['takedown', 'flag', 'Takedown']];
  let kind = opt.kind || 'ide', stars = 0;
  openSheet(`<div class="sh-head"><h2>Kirim masukan</h2>${closeBtn}</div>
    <div class="seg fb-kind" id="fbK">${kinds.map(([k, e, l]) => `<button data-v="${k}" class="${k === kind ? 'on' : ''}">${ico(e)}${l}</button>`).join('')}</div>
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
  $$('#fbK button').forEach(x => x.onclick = () => { kind = x.dataset.v; $('#fbHint').hidden = kind !== 'takedown'; $$('#fbK button').forEach(y => y.classList.toggle('on', y === x)); });
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
  return p.au ? `${esc(p.main)}<span class="t-au">${esc(p.au)}</span>` : esc(p.main);
}
function ringSmall(p, label) {
  const C = 2 * Math.PI * 24;
  return `<div class="ring"><svg viewBox="0 0 56 56"><circle class="bg" cx="28" cy="28" r="24"/><circle class="fg" cx="28" cy="28" r="24" stroke="#22362B" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - Math.min(1, p))}"/><defs><linearGradient id="gl"><stop offset="0" stop-color="#C6FF3D"/><stop offset="1" stop-color="#3DDCFF"/></linearGradient></defs></svg><div class="score">${label}</div></div>`;
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
function weekCard() {
  try { if (localStorage.getItem('kepo_wk') === weekKey()) return ''; } catch (e) { return ''; }
  const since = Date.now() - 7 * 864e5, from = new Date(since).toISOString().slice(0, 10);
  const days = db.days.filter(d => d >= from).length;
  const pages0 = Object.keys(db.pgDay || {}).filter(d => d >= from).reduce((n, d) => n + (db.pgDay[d] || 0), 0);
  const pages = Math.min(pages0, db.books.reduce((n, b) => n + Math.min(b.total || 0, (b.pos || 0) + 1), 0)); /* tak melebihi halaman unik yang benar-benar dibuka */
  if (db.days.length < 2) return ''; /* hari pertama pengguna: belum ada ringkasan */
  const langs = new Set(db.books.map(b => b.lang));
  const words = kataBaruMinggu(langs); /* hanya kata yang ada di koleksi Kata */
  if (!days && !pages && !words) return '';
  const it = (n, l) => `<div><b>${n}</b><span>${l}</span></div>`;
  return `<div class="wk card" id="wkCard"><div class="wk-h"><b>Minggu ini</b><button class="icon" id="wkX" aria-label="Tutup ringkasan minggu ini">&times;</button></div><div class="wk-g">${it(days, 'hari aktif')}${it(pages, 'halaman dibaca')}${words ? it(words, 'kata disimpan') : ''}</div></div>`;
}
/* info satu baris di kartu Streak: ajakan lembut atau rekor; tanpa hukuman */
function streakInfo() {
  const cur = streak(), ds = db.days.slice().sort();
  let best = 0, run = 0, prev = null, before = 0; /* before = rekor sebelum rangkaian terakhir */
  for (const d of ds) { const nx = prev && Math.round((Date.parse(d) - Date.parse(prev)) / 864e5) === 1; if (!nx && run > before) before = run; run = nx ? run + 1 : 1; if (run > best) best = run; prev = d; }
  if (!db.days.includes(today()) && cur > 0) return 'Baca hari ini biar lanjut';
  return best > cur ? `Rekor ${best} hari` : cur >= 3 && cur > before ? 'Rekor barumu!' : cur === 2 ? 'Dua hari berturut, mantap' : cur > 2 ? `${cur} hari berturut` : cur === 1 ? 'Hari pertama, lanjut besok ya' : 'Mulai hari ini yuk';
}
const NUDGE_TXT = 'Ketuk satu kata untuk mulai';
/* ajakan kata pertama: belum ada kata tersimpan, tapi sudah baca >=1 halaman */
function firstWordNudge() { return !countedVocab(null).length; }
function viewRak() {
  const list = db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0));
  const cur = book() || list[0];
  const xt = xpToday(), { lv, inLv } = xpInfo();
  const other = cur && pctOf(cur) >= 100 ? list.find(b => b.id !== cur.id && pctOf(b) < 100) : null; /* buku belum tamat yang terakhir dibaca */
  const h = new Date().getHours(), hi = h < 11 ? 'Pagi' : h < 15 ? 'Siang' : h < 19 ? 'Sore' : 'Malam';
  const addCard = () => `<div class="card">
      <div class="langs"><label>Bahasa cerita<select id="bl">${langOpts(db.lastLang)}</select></label><label>Artiin ke<select id="ml">${langOpts(db.my)}</select></label></div>
      ${db.books.length ? '' : `<div class="try1"><div class="eyebrow">Coba 1 cerita</div><div class="try1-row">${Object.keys(SAMPLES).map(l => `<button data-try="${l}" aria-label="Coba 1 cerita ${LANG_ID[l]}"><span class="em">${FLAG[l]}</span><span>${LANG_ID[l]}</span></button>`).join('')}</div></div>`}
      <div class="add-grid"><button class="main" id="up"><span class="em">${ico('upload')}</span>Upload file</button><button id="paste"><span class="em">${ico('clip')}</span>Tempel teks</button><button id="sample"><span class="em">${ico('sparkle')}</span>Cerita contoh</button></div>
      <div class="mut sm center" style="margin-top:10px">TXT · EPUB · PDF (yang ada teksnya)</div>
    </div>`;
  if (!cur) {
    $('#view').innerHTML = `<h1 class="big">Kepoin<br>bahasa <span class="hl-txt">baru.</span></h1>
      <div class="hello-sub">${spot('cheer')}<div class="mut">Halo, aku KEEPO! Aku bantu kamu jago bahasa asing lewat cerita yang kamu suka.</div></div>
      <div class="steps3"><div class="t-pink"><b>1</b>Masukin cerita favoritmu</div><div class="t-lav"><b>2</b>Ketuk kata yang bikin bingung</div><div class="t-lime"><b>3</b>Ngomongin kalimatnya, dapet skor & XP</div></div>
      <div class="sec-h"><h2>Mulai dari sini</h2></div>${addCard()}`;
  } else {
    $('#view').innerHTML = `
    <h1 class="big">${hi},<br><span class="circle-txt">kepoin</span> apa?</h1>
    <div class="mut sm" style="margin:-4px 0 12px">${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
    ${weekCard()}
    <div class="bento">
      <div class="tile t-pink wide" id="hero"><div class="hero">${cover(cur)}<div class="inf"><div class="eyebrow">${bookStatus(cur).label}</div><div class="t">${heroTitle(cur.title)}</div><div class="sm">${langName(cur.lang)}</div><div class="sm hero-pos" id="heroPos">${heroPos(cur)}</div>${lastMark(cur) ? `<button class="hero-mk" id="hMark" aria-label="Buka buku dari penanda yang terakhir dibuat">${ico('bm')} Dari penanda terakhir</button>` : ''}<div class="bar" style="margin-top:12px"><i style="width:${bookStatus(cur).pct}%"></i></div></div></div>
        <div class="hero-act"><button class="pri" id="hRead">${pctOf(cur) >= 100 ? 'Baca ulang →' : 'Gas baca →'}</button>${other ? `<button class="sec" id="hOther">Buku lain</button>` : pctOf(cur) >= 100 ? `<button class="sec" id="hAdd">Tambah buku baru</button>` : ''}</div></div>
    </div>
    <div class="stat3">
      <div class="t-sun streak1"><div class="eyebrow">Streak</div><div class="num">${ico('flame', 'numi')}${streak()} <small>hari</small></div><div class="lbl2">${streakInfo()}</div></div>
      <div class="t-lime"><div class="eyebrow">Target harian</div><div class="goal-row">${ringSmall(Math.min(xt, GOAL) / GOAL, `<span class="gn">${Math.min(xt, GOAL)}</span><small>XP</small>`)}</div><div class="lbl2">${xt >= GOAL ? 'Target tercapai' : `XP hari ini, target ${GOAL}`}</div></div>
      <div class="t-lav"><div class="eyebrow">Level</div><div class="num">${lv}</div><div class="lbl2">${inLv}/100 XP level ini</div><div class="bar" style="margin-top:8px;height:5px"><i style="width:${inLv}%"></i></div></div>
    </div>
    ${firstWordNudge() ? `<button type="button" class="fw-nudge" id="fwNudge" aria-label="${NUDGE_TXT}. Buka bacaan sekarang">${ico('book')}<span>${NUDGE_TXT}</span></button>` : ''}
    ${(() => { const n = db.vocab.filter(isDue).length; return n ? `<button type="button" class="fw-nudge due-nudge" id="dueNudge" aria-label="${n} kata siap diulang. Ulang sekarang">${ico('cards')}<span>${n} kata siap diulang</span><b>Ulang sekarang</b></button>` : ''; })()}
    <div class="sec-h"><h2>Koleksi kamu</h2><button class="ghost" id="addBtn">+ Tambah</button></div>
    <div class="hscroll">${list.map(b => `<div class="bk" data-open="${b.id}">${cover(b)}<div class="t">${heroTitle(b.title)}</div><div class="m">${langName(b.lang)} · ${bookStatus(b).txt}</div>${b.nw != null ? `<div class="m nw">Perkiraan kata baru ~${b.nw}%</div>` : ''}
      <div class="bk-act"><button class="del" data-del="${b.id}" aria-label="Hapus cerita ${esc(b.title)}">${ico('trash')}<span>Hapus</span></button></div></div>`).join('')}</div>`;
    db.books.forEach(ensureUnits); /* bobot bab buku lama dihitung sekali; Home digambar ulang bila berubah */
    const open = t => { db.cur = cur.id; save(); setTab(t); };
    $('#hero').onclick = () => open('baca'); $('#hRead').onclick = e => { e.stopPropagation(); if (pctOf(cur) >= 100) restartBook(cur); open('baca'); };
    $('#addBtn').onclick = () => { openSheet(`<div class="sh-head"><h2>Tambah cerita</h2>${closeBtn}</div>${addCard()}`, 'Tambah cerita'); bindAdd(); };
    const ha = $('#hAdd'); if (ha) ha.onclick = e => { e.stopPropagation(); $('#addBtn').click(); };
    const ho = $('#hOther'); if (ho && other) ho.onclick = e => { e.stopPropagation(); db.cur = other.id; save(); setTab('baca'); };
    const fn = $('#fwNudge'); if (fn) fn.onclick = () => open('baca');
    const dn = $('#dueNudge'); if (dn) dn.onclick = () => { kataSeg = 'kartu'; setTab('kata'); };
    const hm = $('#hMark'); if (hm) hm.onclick = e => { e.stopPropagation(); const m = lastMark(cur); if (!m) return; cur.pos = Math.max(0, Math.min(m.p, (cur.total || 1) - 1)); cur.si = m.s; RD.quiet = true; open('baca'); };
    const wx = $('#wkX'); if (wx) wx.onclick = () => { try { localStorage.setItem('kepo_wk', weekKey()); } catch (e) { } $('#wkCard').remove(); };
    animRing($('#view'));
    heroMins(cur);
  }
  if (!cur) bindAdd();
  function bindAdd() {
  blManual = false;
  $('#bl').onchange = e => { db.lastLang = e.target.value; blManual = true; save(); };
  $('#ml').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
  $('#up').onclick = () => $('#file').click();
  const startSample = async l => {
    const S = SAMPLES[l], ex = db.books.find(b => b.lang === l && b.title === S.title);
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
  $$('[data-del]').forEach(el => el.onclick = async e => {
    e.stopPropagation();
    if (!el.classList.contains('sure')) { el.classList.add('sure'); el.textContent = 'Yakin hapus?'; setTimeout(() => { if (el.isConnected) { el.classList.remove('sure'); el.innerHTML = ico('trash') + '<span>Hapus</span>'; } }, 3500); return; }
    hapusBuku(el.dataset.del);
  });
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
$('#file').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  if (!/\.(txt|epub|pdf)$/i.test(f.name)) return toast('Format ini belum bisa. Pakai TXT, EPUB, atau PDF ya.', 5000);
  const isDoc = /\.(epub|pdf)$/i.test(f.name), MB = 1024 * 1024;
  if (isDoc && f.size > 30 * MB) return toast('File-nya kegedean (maks 30 MB untuk EPUB/PDF).', 5000);
  if (f.size > 50 * MB) return toast('File-nya kegedean (maks 50 MB).', 5000);
  const lanjut = () => cekKembar(f);
  if (isDoc && f.size > 25 * MB) return toast('File besar, bisa berat di HP. Lanjut?', 10000, { label: 'Lanjut', fn: lanjut });
  const hp = /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) || (window.matchMedia && matchMedia('(pointer:coarse)').matches);
  if (isDoc && hp && f.size > 15 * MB) return toast('File besar, bisa lama. Lanjut?', 10000, { label: 'Lanjut', fn: lanjut });
  lanjut();
};
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
    const lg = autoLang(r.paras.join(' ')); if (await addBook(r.title, r.paras, lg, { name: f.name, size: f.size }, r.cover))commitLang(lg);
  }
  catch (err) {
    console.error(err);
    if (err && err.batal) return toast('Impor dibatalin. Bisa coba lagi kapan aja.', 4000);
    if (err && err.telat) return toast('Gagal: kelamaan nyiapin file. Coba file .txt, atau sambungkan Wi-Fi lalu coba lagi.', 9000);
    if (err && err.simpan) return toast(MSG_SIMPAN_GAGAL, 6000);
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
async function addBook(title, paras, lang, src, cov) {
  const id = 'b' + Date.now().toString(36);
  try { await putText(id, paras); } catch (e) { e.simpan = true; throw e; }
  const bk = { id, title, lang, pos: 0, si: 0, total: 0, v: 2, cv: CH_VER, added: Date.now(), opened: Date.now() };
  const nw = perkiraanBaru(paras, lang); if (nw != null) bk.nw = nw;
  if (cov) { try { await putCover(id, cov); bk.cov = 1; COVERS[id] = cov; } catch (e) { } }
  if (src && src.name) bk.src = { name: src.name, size: src.size };
  db.books.push(bk);
  const prevCur = db.cur;
  db.cur = id;
  if (!save()) { db.books = db.books.filter(b => b.id !== id); db.cur = prevCur; try { await delText(id); } catch (e) { } return false; }
  toast('Cerita masuk koleksi!' + (bk.nw != null ? ` Perkiraan kata baru ~${bk.nw}%` : '')); sfx('ding'); setTab('baca');
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
function recSess(b, w, sent) {
  if (!b || !w || /\s/.test(String(w).trim()) || isParticle(b.lang, w)) return;
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
  const pgs = b ? [...SESPG].filter(k => k.startsWith(b.id + ':')).length : 0;
  if (b) for (const k of [...SESPG]) if (k.startsWith(b.id + ':')) SESPG.delete(k);
  for (const e of all) SESSW.delete(vocabKey(e.lang, e.w));
  if (b) sesiClear(b.id);
  if (!all.length) return false;
  const cand = all.filter(e => !db.vocab.some(v => sameVocab(v, e.lang, e.w)) && !isKataSampah(e.lang, e.w, { b, kenal: true })).sort((x, y) => y.n - x.n).slice(0, 8);
  if (!cand.length) return false;
  rekapAktif = cand;
  const row = (e, i) => { const c = trCache.get(trKey(e)); return `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(e.lang)}">${esc(e.w)}</div><div class="t1${c && c.text ? '' : ' noarti'}" data-rt="${i}">${c && c.text ? esc(c.text) : 'arti belum ada'}</div></div><button class="pill-sm" data-rs="${i}" aria-label="Simpan kata ${esc(e.w)}">Simpan</button></div>`; };
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Kata sesi ini</span>${closeBtn}</div>
    <h2>Kata yang kamu ketuk tadi</h2><p class="mut sm">${pgs > 1 ? `${pgs} halaman layar kamu buka. ` : ''}Simpan yang mau dihafal.</p>
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
    toast('Masuk ke kartu kata kamu', 6000, { label: 'Urungkan', fn: () => {
      const i = db.vocab.indexOf(nv); if (i >= 0) db.vocab.splice(i, 1);
      tombVocab(e.lang, e.w); save(); paintSaved(e.lang, e.w, false);
      if (btn.isConnected) { btn.disabled = false; btn.textContent = 'Simpan'; btn.setAttribute('aria-label', 'Simpan kata ' + e.w); }
    } });
  });
  return true;
}
function leaveBaca() { stopListenPage(); const b = book(); if (b && RD && RD.n && RD.page != null && b.total) { b.pct = readPct(b); save(); } setTab('rak'); if (b) sessRecap(b); }
/* Baca ulang: balik ke awal; tanda tamat (doneAt) dibiarkan supaya XP tamat tak dobel */
let tamatSeen = ''; /* sheet Tamat sekali per sesi baca buku */
function restartBook(b) {
  const prev = { pos: b.pos, si: b.si, pct: b.pct, frac: b.frac, fracPos: b.fracPos, pg: b.pg, pgN: b.pgN, pgPos: b.pgPos };
  const ts = tamatSeen;
  tamatSeen = ''; b.pos = 0; b.si = 0; b.pct = 1; b.frac = 0; b.fracPos = 0; RD.quiet = true; save();
  /* doneAt tidak disentuh: XP tamat tak dobel, Urungkan pun tak mengubahnya */
  toast('Mulai dari awal. XP tamat tidak dihitung lagi.', 12000, { label: 'Urungkan', fn: () => { Object.assign(b, prev); tamatSeen = ts; RD.quiet = true; save(); db.cur = b.id; setTab('baca'); viewBaca(); } });
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
  if (tamatSeen === tk) return toast('Ini halaman terakhir.', 6000, { label: 'Baca ulang', fn: () => { restartBook(b); viewBaca(); } });
  tamatSeen = tk;
  setTimeout(() => flushLate(true), 2500);
  const all = countedVocab(b.lang, 0, b.title);
  const ws = all.filter(v => (v.at || 0) >= SESS.t);
  const list = ws.slice(0, 8).map(v => `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}</div><div class="t1">${v.t ? esc(v.t) : '<i>belum ada arti</i>'}</div></div></div>`).join('');
  const mnt = SESS.id === b.id && SESS.t ? Math.round((Date.now() - SESS.t) / 60000) : 0;
  const total = countedVocab(null).length; /* untuk tombol Lihat kata saja; jumlah kata di sheet = ws (sumber catatan sesi) */
  const ring = [b.total > 1 ? `${b.total} bab` : '', ws.length ? `${ws.length} kata baru` : '', `+${xpToday()} XP hari ini`, mnt >= 1 && mnt < 600 ? `±${mnt} mnt` : ''].filter(Boolean).join(' · ');
  const nx = nextBooks(b);
  const nxHtml = nx.length ? `<div class="eyebrow" style="margin-top:14px">Berikutnya</div>${nx.map(x => `<button class="sec full fb-next" data-nb="${esc(x.id)}" ><span class="fbn-t" dir="auto" lang="${esc(x.lang)}">${esc(x.title)}</span><span class="fbn-m mut sm">${langName(x.lang)} · ${pctOf(x) > 0 ? pctOf(x) + '%' : 'Belum mulai'}</span></button>`).join('')}`
    : '';
  if (!ulang) { sfx('win'); confetti(60); }
  openSheet(`<div class="sh-head"><span class="stepchip">Tamat</span>${closeBtn}</div>
    ${ring ? `<p class="mut sm" style="margin:0 0 6px">${esc(ring)}</p>` : ''}
    <h2>${ws.length ? `${ws.length} kata disimpan dari "${esc(b.title)}"` : 'Tamat! Keren banget'}</h2>
    ${ws.length ? list + (ws.length > 8 ? `<p class="mut sm">+${ws.length - 8} kata lainnya ada di tab Kata.</p>` : '') : (total > 0 ? '<p class="mut">Belum ada kata baru kali ini. Kata lamamu siap dilatih.</p>' : '<p class="mut">Kamu udah sampai akhir. Lain kali, simpan kata yang bikin penasaran biar bisa dilatih ya.</p>')}
    <div class="fb-acts">${total > 0 ? '<button class="pri full" id="fbk">Lihat kata</button><button class="sec full" id="fbh">Ke Home</button>' : '<button class="pri full" id="fbh">Ke Home</button>'}</div>${nxHtml}
    <div class="fb-sec"><button class="lnk" id="fbr">Baca ulang</button>${nx.length ? '<button class="lnk" id="fbadd">Impor buku baru</button>' : ''}</div>`, 'Tamat');
  $('#fbr').onclick = () => { closeSheet(); restartBook(b); viewBaca(); };
  $$('[data-nb]').forEach(el => el.onclick = () => { closeSheet(); db.cur = el.dataset.nb; save(); setTab('baca'); });
  const fa = $('#fbadd'); if (fa) fa.onclick = () => { closeSheet(); setTab('rak'); setTimeout(() => { const a = $('#addBtn'); if (a) a.click(); }, 50); };
  $('#fbh').onclick = () => { closeSheet(); setTab('rak'); };
  const fk = $('#fbk'); if (fk) fk.onclick = () => { closeSheet(); setTab('kata'); };
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
    toast('Masuk ke kartu kata kamu', 6000, { label: 'Urungkan', fn: () => {
      const i = db.vocab.indexOf(nv); if (i >= 0) db.vocab.splice(i, 1);
      tombVocab(e.lang, e.w); save(); paintSaved(e.lang, e.w, false);
      if (btn.isConnected) { btn.disabled = false; btn.classList.remove('done'); btn.querySelector('.ia').innerHTML = ico('plus'); btn.setAttribute('aria-label', 'Simpan kata ' + e.w); }
    } });
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
  if (!b) { $('#view').innerHTML = emptyState('curious', 'Belum ada cerita', 'Masukin cerita dulu yuk, terus kepoin kata-katanya.', 'Tambah cerita', "setTab('rak')"); return; }
  b.opened = Date.now(); const baruBuka = SESS.id !== b.id; if (baruBuka) { SESS.id = b.id; SESS.t = Date.now(); } save();
  if (baruBuka) setTimeout(() => sesiSisa(b), 400);
  const secs = await pagesOf(b);
  b.pos = Math.max(0, Math.min(b.pos, secs.length - 1));
  document.body.classList.add('reading'); wakeSync();
  if (db.vocab.some(needsArti)) refillVocab();
  if (!rdHist) { rdHist = true; try { history.pushState({ kepo: 'baca' }, ''); } catch (e) { rdHist = false; } }
  if (!db.seenHomeHint) { db.seenHomeHint = true; save(); if (db.seenTip) setTimeout(() => toast('Ketuk tengah layar buat menu & balik ke Home'), 600); }
  const sp = secParas(secs[b.pos], b.lang);
  const head = sp.find(P => P.h);
  const chTitle = head ? head.sents.map(x => x.s).join('').trim() : b.title;
  const savedSet = new Set(db.vocab.filter(v => v.lang === b.lang && v.w).map(v => String(v.w).trim().toLowerCase()));
  const hafalSet = new Set(db.vocab.filter(v => v.lang === b.lang && v.w && v.known).map(v => String(v.w).trim().toLowerCase()));
  const kenalOk = w => isKenal(b.lang, w) && !savedSet.has(w.toLowerCase());
  const rtMap = new Map();
  if (db.rt && ['ja', 'ko', 'zh-CN'].includes(b.lang)) for (const v of db.vocab) {
    const r = v.lang === b.lang && bacaOf(v.w, v.baca); if (!r) continue;
    if (db.rt === 2 || +v.tap >= 1 || ((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) >= 1) rtMap.set(v.w.toLowerCase(), r);
  }
  const oftenMemo = new Map();
  const isOften = w => { const k = w.toLowerCase(); if (!oftenMemo.has(k)) oftenMemo.set(k, !isParticle(b.lang, k) && tapsOf(b.lang, k) >= 3 && !isNama(b, k)); return oftenMemo.get(k); };
  /* frasa 2-5 kata tersimpan: indeks sekali per render (kata pertama -> daftar frasa). Bahasa tanpa spasi (ja/zh/th) dilewati. */
  const phraseIdx = new Map();
  if (!['ja', 'zh-CN', 'zh-TW', 'th'].includes(b.lang)) for (const v of db.vocab) {
    if (v.lang !== b.lang || v.known || !/\s/.test(String(v.w || '').trim())) continue;
    const pw = tokens(String(v.w).trim(), b.lang).filter(t => t.w).map(t => t.t.toLowerCase());
    if (pw.length < 2 || pw.length > 5) continue;
    if (!phraseIdx.has(pw[0])) phraseIdx.set(pw[0], []);
    phraseIdx.get(pw[0]).push(pw);
  }
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
    return tk.map((t, i) => { if (!t.w) return esc(t.t); const r = rtMap.get(t.t.toLowerCase()), part = isParticle(b.lang, t.t); return `<span class="w${(!part && savedSet.has(t.t.toLowerCase())) || inPhrase.has(i) ? ' saved' : ''}${hafalSet.has(t.t.toLowerCase()) ? ' hafal' : ''}${isOften(t.t) ? ' often' : ''}${!part && kenalOk(t.t) ? ' kenal' : ''}">${r ? `<ruby>${esc(t.t)}<rt data-r="${esc(r)}"></rt></ruby>` : esc(t.t)}</span>`; }).join('');
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
    const inner = P.sents.map(({ s, i }) => i < 0 ? esc(s) : `<span class="s" data-s="${i}">${wordsHtml(s)}</span>`).join('');
    return P.h ? `<h2 class="ch"${rtlA}>${inner}</h2>` : `<p${rtlA}>${inner}</p>`;
  }).join('');
  const hr = new Date().getHours();
  const nightChip = db.theme === 'paper' && !db.themeSet && !!db.seenTip && (hr >= 19 || hr < 5 || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches)); /* panduan dulu; saran tema malam baru setelah panduan ditutup, tak pernah bersamaan */
  $('#view').innerHTML = `
    <div class="reader${RD.quiet ? '' : ' chrome'}${db.font === 'serif' ? ' serif' : ''}${db.focus ? ' focus' : ''}${db.markOften === false ? ' no-often' : ''}${db.progBar === false ? ' no-prog' : ''}" id="reader" data-align="${effAlign()}" lang="${esc(b.lang)}" style="--reader-lh:${readLh(b.lang)};--reader-mg:${MG[db.mg] || 24}px${db.spacing === 'w' ? ';--reader-ls:.04em;--reader-ws:.12em' : ''}">
      <div class="rbar"><button class="icon" id="rHome" aria-label="Kembali ke Home">${ico('left')}</button>
        <div class="rtitle"><b>${esc(b.title)}</b>${secs.length > 1 ? `<button class="rchap" id="rChap" aria-haspopup="dialog" aria-label="Daftar ${secWord(b, b.pos).toLowerCase()}, sekarang ${secWord(b, b.pos).toLowerCase()} ${b.pos + 1} dari ${secs.length}">${secWord(b, b.pos)} ${b.pos + 1} dari ${secs.length} ▾</button>` : ''}<span class="rmk" id="rMk" role="status"${marksOf(b).length ? '' : ' hidden'}>${ico('bm')}<span id="rMkN">${marksOf(b).length}</span><span class="sr"> penanda</span></span><span class="roff" id="roff" role="status"${navigator.onLine ? ' hidden' : ''}>Offline</span></div>
        ${['ja', 'ko', 'zh-CN'].includes(b.lang) ? `<button class="icon rrt${db.rt ? ' on' : ''}" id="rRt" type="button" title="Cara baca" aria-pressed="${db.rt ? 'true' : 'false'}" aria-label="Cara baca: ${db.rt ? 'nyala' : 'mati'}">${ico('ruby')}<span class="rrtl">Cara baca</span></button>` : ''}${'speechSynthesis' in window ? `<button class="icon rlis" id="rLis" type="button" title="Dengar halaman" aria-pressed="false" aria-label="Dengar halaman">${ico('vol')}<span class="rrtl">Dengar</span></button>` : ''}<button class="icon rrt" id="rMore" type="button" aria-haspopup="dialog" title="Menu lainnya" aria-label="Menu lainnya">${ico('more')}<span class="rrtl">Lainnya</span></button></div>
      ${nightChip ? `<div class="nchip" id="nchip" role="note"><span>${ico('moon')} Mata capek? Pakai tema malam</span><button data-t="night">Malam</button><button class="nx" data-t="" aria-label="Tutup saran tema">${ico('x')}</button></div>` : ''}
      ${['ja', 'ko', 'zh-CN'].includes(b.lang) ? '<div class="lisnote" id="lisNote" role="note" hidden>Suara bisa meleset di kanji</div>' : ''}
      <div class="rhead">${esc(b.title)}</div>
      <div class="vp" id="vp"><div class="page cols" id="cols" style="font-size:${readFs(b.lang)}px">${intip}${html}</div></div>
      ${db.seenTip ? '' : `<div class="rtip" id="tip" role="note"><span>${ico('pointer')}<span class="rtt"><b>Ketuk kata</b> = arti. <b>Tahan kalimat</b> = arti kalimat${db.aiJelas === false ? '' : ' (+ Jelaskan AI, gratis 5x/hari)'}. <b>${db.tapEdge === false ? 'Ketuk layar' : 'Ketuk tengah'}</b> = menu.</span></span><button id="tipx" aria-label="Paham, tutup petunjuk">Paham</button></div>`}
      <div class="rfoot"><button class="pg" id="pv" aria-label="Halaman sebelumnya">${ico('left')}</button>
        <div class="rmid"><span id="pgn"></span><div class="bar"><i id="pbar"></i></div></div>
        <button class="pg" id="nx" aria-label="Halaman berikutnya">${ico('right')}</button></div>
    </div>`;
  tipN = 0; nudgePg = new Set();
  if (!db.seenTip) setTimeout(dismissTip, 12000); /* hilang sendiri ±12 dtk, dianggap sudah dilihat */
  if ($('#tipx')) $('#tipx').onclick = () => { db.seenTip = true; save(); $('#tip').remove(); layout(); };
  $('#rHome').onclick = () => leaveBaca();
  if ($('#rLis')) $('#rLis').onclick = () => { if (LIS.on) pauseListenPage(); else startListenPage(); };
  $$('#nchip button').forEach(x => x.onclick = () => { if (x.dataset.t) { db.theme = x.dataset.t; applyTheme(); } db.themeSet = true; save(); $('#nchip').remove(); layout(); });
  if ($('#rRt')) $('#rRt').onclick = () => {
    db.rt = db.rt ? 0 : 1; save(); viewBaca();
    const any = db.vocab.some(v => v.lang === b.lang && bacaOf(v.w, v.baca) && (+v.tap >= 1 || ((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) >= 1));
    toast(!db.rt ? 'Cara baca mati' : any ? 'Cara baca nyala' : 'Cara baca muncul untuk kata yang sudah kamu ketuk');
  };
  $('#rMore').onclick = () => {
    const sl = () => db.ttsRate === 'slow' ? 'Lambat' : 'Normal';
    openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Lainnya</span>${closeBtn}</div><div class="chlist rmore">
      <button class="chi" id="rmSet">${ico('sliders')}<span>Pengaturan baca</span></button>
      ${['ja', 'ko', 'zh-CN'].includes(b.lang) ? `<button class="chi rmob" id="rmRt">${ico('ruby')}<span>Cara baca</span><b class="rst">${db.rt ? 'Nyala' : 'Mati'}</b></button>` : ''}${'speechSynthesis' in window ? `<button class="chi rmob" id="rmLis">${ico('vol')}<span>Dengar halaman</span><b class="rst">${LIS.on ? 'Nyala' : 'Mati'}</b></button>` : ''}
      ${db.aiJelas === false ? '' : `<button class="chi" id="rmAi">${ico('chat')}<span>Sederhanakan halaman (AI)</span></button>`}
      <button class="chi" id="rmFb">${ico('chat')}<span>Kirim masukan</span></button>
      ${'speechSynthesis' in window ? `<button class="chi" id="rmRate">${ico('slow')}<span>Laju suara: <b id="rmRateV">${sl()}</b></span></button>` : ''}</div>`, 'Menu lainnya');
    if ($('#rmRt')) $('#rmRt').onclick = () => { closeSheet(); $('#rRt').click(); };
    if ($('#rmLis')) $('#rmLis').onclick = () => { closeSheet(); $('#rLis').click(); };
    $('#rmSet').onclick = () => { closeSheet(); openSettings(); };
    $('#rmFb').onclick = () => { closeSheet(); openFeedback(); };
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
  $('#pv').onclick = () => turn(-1); $('#nx').onclick = () => { const bk = book(); if ($('#nx').dataset.ulang && bk) toast('Mulai dari halaman pertama lagi?', 8000, { label: 'Ya, mulai dari awal', fn: () => { restartBook(bk); viewBaca(); } }); else turn(1); };
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
    if (w) { dismissTip(); nudgeOff(); RD.tapX = e.clientX; stopListenPage(); vib(8); sfx('pop'); onWord(w).catch(() => toast('Arti kata belum bisa dibuka. Ketuk lagi ya.')); return; }
    const r = vp.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
    const te = db.tapEdge !== false;
    if (te && x < 0.15) turn(-1); else if (te && x > 0.85) turn(1); else $('#reader').classList.toggle('chrome');
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
/* Sederhanakan halaman (AI): hanya saat diminta; jalur & jatah harian sama dengan Jelaskan kalimat */
function openSimplify(b) {
  const q = (RD.ss || []).filter(x => x.pg === RD.page).map(x => x.el.textContent.trim()).filter(Boolean);
  const full = q.join(' ').replace(/\s+/g, ' ').trim();
  const LIM = 600;
  let txt = full, cut = false;
  if (full.length > LIM) {
    cut = true; txt = full.slice(0, LIM);
    const k = Math.max(txt.lastIndexOf('. '), txt.lastIndexOf('! '), txt.lastIndexOf('? '), txt.lastIndexOf('。'), txt.lastIndexOf('！'), txt.lastIndexOf('？'));
    if (k > 40) txt = txt.slice(0, k + 1);
  }
  const devId = () => { let d = localStorage.getItem('kepo.dev'); if (!d) { d = Array.from(crypto.getRandomValues(new Uint8Array(12)), x => x.toString(16).padStart(2, '0')).join(''); localStorage.setItem('kepo.dev', d); } return d; };
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Sederhanakan halaman</span>${closeBtn}</div>
    <div class="mut sm">AI jelasin halaman ini dengan bahasa lebih sederhana. Teks bacamu nggak berubah.</div>
    <div class="aij" id="sgj"><button class="ghost" id="sgbtn" type="button">Sederhanakan halaman ini</button><div class="aij-q mut sm" id="sgq">Gratis 5x sehari, jatah sama dengan Jelaskan kalimat</div><div id="sgout" aria-live="polite"></div></div>
    <div class="row" style="margin-top:10px"><button class="sec" data-close>Lanjut baca</button></div>`, 'Sederhanakan halaman');
  const btn = $('#sgbtn'), qEl = $('#sgq'), out = $('#sgout');
  const setQ = n => { if (qEl.isConnected) qEl.textContent = n > 0 ? `Sisa jatah AI hari ini: ${n} dari 5` : 'Jatah AI hari ini habis. Balik lagi besok ya.'; };
  const msg = t => { if (out.isConnected) out.innerHTML = `<div class="ttsnote">${esc(t)}</div>`; };
  btn.onclick = async () => {
    if (!txt) return msg('Halaman ini belum ada teksnya.');
    if (typeof api !== 'function') return msg('Fitur ini belum siap. Lanjut baca aja dulu.');
    if (!navigator.onLine) return msg('Lagi offline. Penjelasan AI butuh sinyal.');
    btn.disabled = true; out.innerHTML = '<span class="loading">AI lagi mikir…</span>';
    try {
      const r = await api('/jelaskan', { method: 'POST', body: { dev: devId(), sent: txt, lang: b.lang, arti: '' } });
      if (!out.isConnected) return;
      setQ(r.sisa);
      out.innerHTML = `<div class="aij-box"><div class="aij-lbl">Penjelasan AI, bisa meleset</div>${cut ? '<div class="aij-lbl">Cuma bagian awal halaman yang dijelaskan.</div>' : ''}<div class="aij-t" lang="${esc(db.my)}"></div><button class="ghost aij-rep" id="sgrep" type="button">Lapor kalau salah</button></div>`;
      out.querySelector('.aij-t').textContent = r.teks;
      $('#sgrep').onclick = () => { const x = $('#sgrep'); x.disabled = true; api('/jelaskan/lapor', { method: 'POST', body: { dev: devId(), sent: txt, lang: b.lang, teks: r.teks } }).then(() => { const y = $('#sgrep'); if (y) y.textContent = 'Makasih, laporannya masuk'; }).catch(() => { const y = $('#sgrep'); if (y) { y.disabled = false; y.textContent = 'Gagal kirim, coba lagi'; } }); };
    } catch (e) { if (out.isConnected) { if (/habis/i.test(e.message)) { setQ(0); out.innerHTML = ''; } else msg(e.message); } }
    btn.disabled = false;
  };
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
    const id = ++LIS.id; stopSpeak(); showPage(RD.page + 1); $('#reader').classList.remove('chrome');
    /* tunggu halaman benar-benar berpindah dulu, baru ucapan mulai */
    setTimeout(() => { if (LIS.on && LIS.id === id && $('#cols')) startListenPage(); }, 400);
    return;
  }
  stopListenPage(); toast('Bagian selesai');
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
  RD.toEnd = false; RD.dy = 0;
  showPage(p, false);
  if (RD.flash != null) { const fx = RD.ss.find(y => +y.el.dataset.s === RD.flash); RD.flash = null; if (fx) { fx.el.classList.add('hl'); setTimeout(() => fx.el.classList.remove('hl'), 2500); } }
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
const secLabel = (pos, total, awal, word) => awal ? 'Awal buku' : `${word || 'Bagian'} ${total > 0 ? Math.min(pos, total) : pos} dari ${total}`; /* 'x dari y' dgn jumlah sebenarnya */
function heroPos(b, mins, part) {
  const p = progInfo(b);
  if (p.done) return statusPct(100).txt;
  const bits = [];
  if (p.bab && p.total > 1) bits.push(secLabel(p.pos, p.total, false, 'Bagian')); /* sama dengan bar baca (hanya buku multi-bab) */
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
  if (!part) return n < 1 ? '' : `±${Math.max(1, Math.round(m))} mnt`;
  return n < 1 ? '—' : `≥${n} mnt`;
}
const unseen = (b, secs) => !secs.length || (b.total || 1) > secs.length || (secs.length === 1 && secs[0].length === 1 && /^\((kosong|teks hilang)\)$/.test(secs[0][0]));
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
  return n < 1 ? 'Sebentar lagi' : `±${n} mnt`;
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
function showPage(p, anim = true) {
  const cols = $('#cols'), b = book(); if (!cols) return;
  closeInline();
  RD.page = Math.max(0, Math.min(RD.n - 1, p));
  if (RD.page > 2) dismissTip(); /* buku sudah dibaca / loncat jauh: panduan tak perlu lagi (semua jalur pindah halaman lewat sini) */
  cols.style.transition = anim ? '' : 'none';
  cols.style.transform = `translate(${-RD.page * RD.step}px, ${RD.dy || 0}px)`;
  /* kalimat pertama yang mulai di halaman ini; bila tak ada (kalimat panjang menyambung / halaman akhir), pakai kalimat terakhir yang mulai sebelumnya */
  let sx = RD.ss.find(x => x.pg >= RD.page);
  if (!sx || sx.pg > RD.page) { for (let i = RD.ss.length - 1; i >= 0; i--) if (RD.ss[i].pg < RD.page) { sx = RD.ss[i]; break; } }
  if (sx) b.si = +sx.el.dataset.s;
  spdNote(b, RD.page);
  b.pg = RD.page; b.pgN = RD.n; b.pgPos = b.pos; b.frac = (RD.page + 1) / RD.n; b.fracPos = b.pos;
  let hd = null; for (const h of RD.hs) { if (h.pg <= RD.page) hd = h.el; else break; }
  const rh = $('.rhead'); if (rh) rh.textContent = hd ? hd.textContent.trim() : b.title; /* judul bab hanya setelah judulnya benar-benar tampil; sebelumnya judul buku */
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
    const sec = multi ? secLabel(b.pos + 1, b.total, b.pos === 0 && !RD.hs.length, wd) : '';
    const notes = [ml && ml.part ? 'bagian lain belum dihitung' : '', multi && lastPg && b.pos < b.total - 1 ? 'Ujung bagian, geser untuk bagian berikutnya' : ''].filter(Boolean);
    pgn.title = ['persen dari seluruh buku, perkiraan sisa waktu'].concat(notes).join('. ');
    pgn.setAttribute('aria-label', [multi ? (b.pos === 0 && !RD.hs.length ? `Awal buku, dari ${b.total} bagian` : `${wd} ${b.pos + 1} dari ${b.total}`) : '', RD.n === 1 ? '' : `halaman ${RD.page + 1} dari ${RD.n}`, multi ? `${bp} persen dari seluruh buku` : '', ml && ml.t ? `perkiraan sisa ${ml.t}` : ''].concat(notes).filter(Boolean).join(', '));
    /* satu baris: hanya bagian tak kosong, digabung ' · '; layar sempit buang sisa waktu dulu, lalu bab; persen tetap */
    const fill = parts => { pgn.innerHTML = parts.filter(Boolean).map(nw).join(' · '); };
    const bs = statusPct(bp);
    if (bs.done) fill([bs.txt]);
    else {
      fill([sec, bs.txt, (window.innerWidth || 400) <= 360 ? '' : rem]);
      if (pgn.scrollWidth > pgn.clientWidth + 1) fill([sec, bs.txt]);
      if (pgn.scrollWidth > pgn.clientWidth + 1) fill([bs.txt]);
    }
  }
  if (pb) { const bp = bookPct(b); pb.style.width = bp + '%'; if (pb.parentElement) pb.parentElement.title = `${bp}% dari seluruh buku`; }
  syncMarks();
  const pv = $('#pv'); if (pv) pv.disabled = RD.page === 0 && b.pos === 0;
  const nx = $('#nx'), last = RD.page === RD.n - 1 && b.pos >= (b.total || 1) - 1;
  if (nx) { nx.disabled = false; nx.classList.remove('fin'); }
  if (!nx) { /* reader sudah ditutup */ }
  else if (last && b.doneAt) { nx.textContent = 'Baca ulang'; nx.dataset.ulang = '1'; nx.style.cssText = 'width:auto;padding:0 14px;font-weight:700;white-space:nowrap'; nx.setAttribute('aria-label', 'Baca ulang dari awal'); }
  else if (last && !b.doneAt) { delete nx.dataset.ulang; nx.textContent = 'Selesai'; nx.classList.add('fin'); nx.style.cssText = 'width:auto;padding:0 14px;font-weight:700;white-space:nowrap'; nx.setAttribute('aria-label', 'Selesai membaca'); }
  else { delete nx.dataset.ulang; nx.innerHTML = ico('right'); nx.style.cssText = ''; nx.setAttribute('aria-label', 'Halaman berikutnya'); }
  endCard(b, last);
  pfArm();
}
/* kartu ajakan di halaman terakhir: isi ruang kosong di bawah teks supaya tak buntu */
function endCard(b, last) {
  const vp = $('#vp'); if (!vp) return;
  const old = $('#endcard'); if (old) old.remove();
  const cols = $('#cols'); if (!last || !cols) return;
  const nx = nextBooks(b)[0];
  const c = document.createElement('div'); c.id = 'endcard'; c.className = 'endcard'; c.setAttribute('role', 'note');
  c.innerHTML = `<button class="sec" id="ecr">Baca ulang</button><button class="sec" id="ecn">${nx ? 'Buku berikutnya' : 'Impor buku baru'}</button>`;
  c.onclick = c.onpointerdown = c.ontouchstart = e => e.stopPropagation();
  vp.append(c);
  $('#ecr').onclick = () => { restartBook(b); viewBaca(); };
  $('#ecn').onclick = () => { if (nx) { db.cur = nx.id; save(); setTab('baca'); } else { setTab('rak'); setTimeout(() => { const a = $('#addBtn'); if (a) a.click(); }, 50); } };
  /* tampil hanya bila ruang kosong di bawah teks cukup */
  let bottom = 0; const vr = vp.getBoundingClientRect();
  try { const r = document.createRange(); r.selectNodeContents(cols); [...r.getClientRects()].forEach(x => { if (x.width > 0 && x.right > vr.left && x.left < vr.right) bottom = Math.max(bottom, x.bottom); }); } catch (e) { }
  if (bottom && vr.bottom - bottom < c.offsetHeight + 16) { c.remove(); return; }
  /* #994: kartu menempel dekat akhir teks, bukan menggantung di dasar layar */
  if (bottom) { c.style.top = Math.round(bottom - vr.top + 12) + 'px'; c.style.bottom = 'auto'; }
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
  const rm = $('#rMk'); if (rm) { rm.hidden = !n; const rn = $('#rMkN'); if (rn) rn.textContent = n; }
  if (ls) { ls.disabled = !n; ls.innerHTML = `${ico('list')} Daftar penanda (${n})`; }
}
function restoreMarks(b, gone, old) { const cur = marksOf(b); b.marks = old.filter(m => cur.includes(m) || gone.includes(m)); save(); syncMarks(); if (!$('#sheet').classList.contains('hide') && $('#sheet').getAttribute('aria-label') === 'Daftar penanda') { if (b.marks.length) openMarks(); else closeSheet(); } }
function toggleMark() {
  const b = book(); if (!b) return;
  const hit = markHere(b);
  if (hit.length) { const old = marksOf(b); b.marks = old.filter(m => !hit.includes(m)); save(); syncMarks(); vib(6); return toast('Penanda dihapus', 6000, { label: 'Urungkan', fn: () => restoreMarks(b, hit, old) }); }
  const x = RD.ss.find(y => y.pg === RD.page && !y.el.closest('h2')) || RD.ss.find(y => y.pg === RD.page);
  const t = x ? x.el.textContent.replace(/\s+/g, ' ').trim().slice(0, 140) : '';
  const old = marksOf(b); let cur = old, gone = null;
  if (old.length >= MARK_MAX) { gone = old.reduce((a, m) => !a || (m && (m.at || 0) < (a.at || 0)) ? m : a, null); cur = old.filter(m => m !== gone); }
  b.marks = cur.concat({ p: b.pos, s: x ? +x.el.dataset.s : b.si || 0, t, at: Date.now() });
  save(); syncMarks(); vib(10); sfx('pop');
  if (gone) toast('Penanda terlama diganti', 6000, { label: 'Urungkan', fn: () => restoreMarks(b, [gone], old) });
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
    toast('Penanda dihapus', 6000, { label: 'Urungkan', fn: () => restoreMarks(b, [gone], old) });
  });
}
let tipN = 0, nudgePg = new Set(), nudgeT = 0;
const NUDGE_MSG = 'Ada kata yang bikin bingung? Ketuk aja, artinya muncul.';
function nudgeOff() { clearTimeout(nudgeT); nudgeT = 0; const t = $('#toast'); if (t && t.textContent === NUDGE_MSG) t.classList.add('hide'); }
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
function dismissTip() { if (db.seenTip) return; db.seenTip = true; save(); const t = $('#tip'); if (t) { t.remove(); layout(); } }
function tipTurn() { if (!db.seenTip && ++tipN >= 3) dismissTip(); }
/* indeks kalimat pertama yang mulai di halaman p (dari RD.ss) */
function firstSent(p) { const ss = RD.ss || [], i = ss.findIndex(x => x.pg >= p); return i < 0 ? ss.length : i; }
function turn(d) {
  const b = book(); closeSheet(); const was = LIS.on && !!db.lisAuto; stopListenPage();
  const np = RD.page + d;
  const resume = () => { if (!was) return; const id = ++LIS.id; LIS.on = true; setTimeout(() => { if (LIS.on && LIS.id === id && $('#cols')) startListenPage(); }, 400); };
  if (np >= 0 && np < RD.n) { vib(4); showPage(np); tipTurn(); $('#reader').classList.remove('chrome'); if (d > 0) award(2, 'page', b.id + ':' + b.pos, firstSent(np)); resume(); return; }
  if (d > 0 && b.pos < b.total - 1) { if (was) LIS.chain = true; b.pos++; b.si = 0; RD.quiet = true; save(); award(5, 'page', b.id + ':' + b.pos, 0); viewBaca(); }
  else if (d < 0 && b.pos > 0) { if (was) LIS.chain = true; b.pos--; b.si = 0; RD.toEnd = true; RD.quiet = true; save(); viewBaca(); }
  else if (d > 0) { if (b.doneAt) { restartBook(b); viewBaca(); } else finishBook(b); }
  else toast('Ini halaman pertama.');
}
let rsT; ['resize', 'orientationchange'].forEach(ev => addEventListener(ev, () => { clearTimeout(rsT); rsT = setTimeout(() => { if (document.body.classList.contains('reading')) { const r = $('#reader'); if (r) r.dataset.align = effAlign(); layout(); } }, 150); }));
addEventListener('keydown', e => { if (!document.body.classList.contains('reading') || !$('#sheet').classList.contains('hide') || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || (e.key === ' ' && /BUTTON|A/.test(e.target.tagName))) return; if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); turn(1); } if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); turn(-1); } });

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
async function onWord(el, lastEl) {
  const b = book();
  document.querySelectorAll('.lvlup').forEach(x => x.remove()); { const t = $('#toast'); if (t) t.classList.add('hide'); }
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
    <div class="wmeta"><span class="pos" id="wpos"></span><span id="wbaca"></span><span id="wbase"></span><span id="wpart"></span></div>
    <div class="tr" id="wtr" lang="${esc(db.my)}" aria-live="polite"><span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span></div>
    <div class="wnote"><span id="wlook"></span><span class="wfreq" id="wfreq"></span><span class="wtap" id="wtap"></span></div>
    <div class="whint" id="whint" hidden></div>
    ${db.seenExpHint ? '' : '<div class="mut sm" id="wonce">Mau lebih dari satu kata? Ketuk ‹ ›</div>'}
    <div class="wsug" id="wsug" hidden></div>
    <div class="dict" id="wdict"></div>
    <div class="wact" role="group" aria-label="Aksi kata"><button class="pri" id="wsave">${saveLbl()}</button><button class="sec" id="wkenal" hidden></button><button class="sec" id="whafal" type="button" hidden></button><button class="sec" id="wnama" type="button" hidden></button></div>
    <div class="wact2"><button class="ghost" data-close id="wdone">Selesai</button><button class="ghost" id="wnext">${ico('eye')} Masih bingung? Lihat kalimatnya</button></div>`, 'Arti kata');
  const kenalLbl = () => isKenal(b.lang, word) ? `${ico('bmcheck')} Belum kenal` : 'Sudah kenal';
  const updKenal = () => { const k = $('#wkenal'); if (!k) return; k.hidden = isSaved() || isNama(b, word); k.innerHTML = kenalLbl(); updHafal(); };
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
  const showTap = n => { const t = $('#wtap'); if (t) t.textContent = n >= 1 ? `Diketuk ${n}×` : ''; if (n >= 3) $$('.cols .w').forEach(x => { if (x.textContent.toLowerCase() === word.toLowerCase()) x.classList.add('often'); }); showSug(n); };
  showTap(countTap(b.lang, word)); recSess(b, word, sent);
  keepVisible('.w.sel');
  $('#sw').onclick = () => speak(word, b.lang, 0.8);
  award(1, 'look');
  const bumpLook = () => { db.looks = db.looks || {}; const k = b.lang + '|' + word.toLowerCase(); const n = db.looks[k] = (db.looks[k] || 0) + 1; save(); bumpSentLook(b.id, 'kata'); const e = $('#wlook'); if (e) e.textContent = n > 1 ? `Udah kamu cek ${n}×` : 'Pertama kali kamu cek kata ini'; };
  const baseLabel = (w, lang, base) => { const x = baseOf(w, base); if (x) return 'Bentuk dasar: ' + x; const g = baseOf(w, guessBase(w, lang)); return g ? 'Bentuk dasar: ' + g + ' (tebakan)' : ''; };
  const setTx = (sel, t) => { const e = $(sel); if (e) e.textContent = t; };
  const setWBaca = t => { const e = $('#wbaca'); if (!e) return; e.dataset.b = t; e.textContent = db.showBaca ? t : ''; };
  const savedOf = () => db.vocab.find(v => v.t && sameVocab(v, b.lang, word));
  const showSaved = v => {
    setTx('#wtr', v.t);
    setWBaca(bacaOf(word, v.baca));
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
    const d = hintDir();
    if (!d) { h.hidden = true; h.innerHTML = ''; return; }
    h.innerHTML = `<button class="hintchip" id="whb" aria-label="Mungkin frasa. Ketuk untuk tambah kata ${d > 0 ? 'berikutnya' : 'sebelumnya'}">Mungkin frasa <span aria-hidden="true">${d > 0 ? '›' : '‹'}</span></button>`;
    h.hidden = false;
    $('#whb').onclick = () => grow(d);
  };
  const wtrEl = $('#wtr'); let slowT = 0, trAc = null;
  /* 'Ini nama': tanpa terjemahan mesin, chip 'Nama', tak bisa disimpan sebagai kata belajar */
  const namaLbl = () => isNama(b, word) ? 'Bukan nama' : 'Ini nama';
  const updNama = () => { const n = $('#wnama'), sv = $('#wsave'); if (n) { n.hidden = isSaved(); n.textContent = namaLbl(); n.setAttribute('aria-pressed', isNama(b, word) ? 'true' : 'false'); } if (sv) sv.hidden = isNama(b, word); updKenal(); };
  const showNama = () => {
    setTx('#wpos', ''); setWBaca(''); setTx('#wbase', ''); setTx('#wpart', ''); setTx('#wfreq', '');
    const t = $('#wtr'); if (t) t.innerHTML = '<span class="stepchip namachip">Nama</span> <span class="mut sm">Nama tokoh/tempat, nggak diartiin.</span>';
    const d = $('#wdict'); if (d) d.innerHTML = ''; const h = $('#whint'); if (h) { h.hidden = true; h.innerHTML = ''; } const g = $('#wsug'); if (g) { g.hidden = true; g.innerHTML = ''; }
    updNama(); keepVisible('.w.sel');
  };
  const slowMsg = (my, retry) => { if (my !== tok || $('#wtr') !== wtrEl) return; wtrEl.innerHTML = '<span class="loading">Arti belum ketemu, sinyal lemah?</span> <button class="ghost wretry" id="wslow">Coba lagi</button>'; $('#wslow').onclick = () => { wtrEl.innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; retry(); }; };
  const load = () => { const my = ++tok; if (trAc) trAc.abort(); if (isNama(b, word)) { clearTimeout(slowT); showNama(); return Promise.resolve(); } trAc = new AbortController(); const sig = trAc.signal; const sv = savedOf(); if (sv) showSaved(sv); clearTimeout(slowT); if (!sv) slowT = setTimeout(() => slowMsg(my, load), 8000); return translate(qWord(), b.lang, db.my, sig).then(r => {
    if (my !== tok || !$('#wtr')) return;
    clearTimeout(slowT);
    tr = r; setTx('#wpart', partNote());
    setTx('#wtr', r.text);
    setWBaca(bacaOf(word, r.baca));
    setTx('#wbase', baseLabel(word, b.lang, r.base));
    const d = r.dict || [];
    setTx('#wpos', d.length ? (POS[d[0].pos] || d[0].pos) : '');
    const alt = altArti(d, r.text);
    $('#wdict').innerHTML = alt.length ? `<div><b>Bisa juga:</b> ${alt.map(esc).join(', ')}</div>` + (d.length > 1 ? `<div>${d.slice(1, 3).map(x => `<b>${esc(POS[x.pos] || x.pos)}:</b> ${x.terms.slice(0, 3).map(esc).join(', ')}`).join(' · ')}</div>` : '') : '';
    setTimeout(() => { if (my === tok && $('#wfreq')) { try { showFreq(word, b); } catch (e) {} keepVisible('.w.sel'); } }, 0);
    keepVisible('.w.sel'); showHint();
  }).catch(() => { if (my === tok) clearTimeout(slowT); if (my === tok && $('#wtr') && !sv) { const off = !navigator.onLine; $('#wtr').innerHTML = `<span class="loading">${off ? 'Lagi offline. Ketuk Simpan, artinya nyusul pas ada sinyal.' : 'Arti belum ketemu, sinyal lemah?'}</span> <button class="ghost wretry" id="wretry">Coba lagi</button>`; $('#wretry').onclick = () => { $('#wtr').innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; load(); }; } }); };
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
    word = phraseOf(); tr = null; tok++; if (trAc) trAc.abort(); clearTimeout(expT); clearTimeout(slowT);
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
    toast(was ? 'Dibatalkan, kata ini muncul lagi' : 'Ditandai sudah kenal', 6000, { label: 'Urungkan', fn: () => apply(was) });
  };
  updNama();
  $('#whafal').onclick = () => {
    const w = word, lang = b.lang, vs = db.vocab.filter(v => v.t && sameVocab(v, lang, w)); if (!vs.length) return;
    const was = !!vs[0].known, prev = vs.map(v => ({ v, known: v.known, due: v.due }));
    const sync = () => { updHafal(); refreshHafal(); if (kataSeg && $('#klist')) viewKata(); };
    vs.forEach(v => { v.known = !was; if (!was) v.due = 0; }); save(); paintHafal(lang, w, !was); sync(); vib(8); sfx('pop');
    toast(was ? 'Balik ke lagi dihafal' : 'Ditandai udah hafal', 6000, { label: 'Urungkan', fn: () => { prev.forEach(p => { p.v.known = p.known; p.v.due = p.due; }); save(); paintHafal(lang, w, was); sync(); } });
  };
  $('#wnama').onclick = () => {
    const w = word, was = isNama(b, w);
    const apply = on => {
      setNama(b, w, on);
      if (on) $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === w.toLowerCase()) x.classList.remove('often', 'kenal'); });
      if ($('#wtr') && word === w) { if (on) { tok++; if (trAc) trAc.abort(); clearTimeout(slowT); showNama(); } else { $('#wtr').innerHTML = '<span class="loading ldots" role="status" aria-label="Lagi nyari artinya"><i></i><i></i><i></i></span>'; updNama(); load(); } }
    };
    apply(!was); vib(8);
    toast(was ? 'Dibatalkan, kata ini diartiin lagi' : 'Ditandai sebagai nama', 6000, { label: 'Urungkan', fn: () => apply(was) });
  };
  $('#wsave').onclick = async () => {
    const mark = (w, on) => paintSaved(b.lang, w, on);
    if (isSaved()) {
      /* ketuk lagi = hapus dari kata tersimpan, bisa diurungkan */
      const w = word, lang = b.lang, gone = db.vocab.filter(v => sameVocab(v, lang, w)), at = db.vocab.indexOf(gone[0]);
      db.vocab = db.vocab.filter(v => !gone.includes(v)); tombVocab(lang, w); save(); vib(8); mark(w, false);
      const sb = $('#wsave'); if (sb) sb.innerHTML = saveLbl(); updKenal();
      toast('Kata dihapus', 6000, { label: 'Urungkan', fn: () => {
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
    db.vocab.unshift({ ...(tp > 0 ? { tap: tp } : {}), w, t: r ? r.text : '', baca: r ? bacaOf(w, r.baca) : '', ...(r && r.base ? { base: r.base } : {}), ...(r ? {} : { noTr: 1, nyusul: true }), pos: r && r.dict && r.dict[0] ? r.dict[0].pos : '', lang: b.lang, s: sent, ctx: ctxOf({ s: sent }), book: b.title, at: Date.now() });
    if (!save()) { db.vocab.shift(); return; } /* gagal simpan: tak ada toast 'masuk' (pesan gagal tampil dari save()) */
    vib(10); sfx('ding');
    mark(w, true);
    $('#wsave').innerHTML = saveLbl(); updNama(); award(2, 'save'); toast(r ? 'Masuk ke kartu kata kamu' : 'Lagi offline, arti nyusul ya', r ? 3200 : 6000, r ? null : { label: 'Isi arti', fn: () => isiArti(b.lang, w) });
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
    toast(`${n} kata ditandai sudah kenal`, 6000, { label: 'Urungkan', fn: () => {
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
  $$('.cols .w').forEach(x => { if (x.textContent.trim().toLowerCase() === k) { x.classList.toggle('saved', on); if (on) x.classList.remove('kenal'); else x.classList.remove('hafal'); } });
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
  let sSlow = 0, sTok = 0;
  const loadSent = () => { const my = ++sTok; { const m = $('#smt'); if (m) m.classList.add('hide'); } clearTimeout(sSlow); sSlow = setTimeout(() => { if (!alive() || my !== sTok) return; strEl.innerHTML = '<span class="loading">Sinyalnya lemah nih…</span> <button class="ghost wretry" id="sslow">Coba lagi</button>'; $('#sslow').onclick = () => { strEl.innerHTML = '<span class="loading">Lagi nerjemahin kalimat…</span>'; loadSent(); }; }, 8000); return translate(sent, b.lang, db.my).then(r => {
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
    /* tanda arti mesin (#605): hanya setelah terjemahan sukses; kalimat panjang = peringatan lebih kuat */
    const smt = $('#smt');
    if (smt) {
      const cjk = /^(ja|ko|zh)/i.test(b.lang), long = cjk ? [...sent].length > 80 : sent.trim().split(/\s+/).length > 25;
      smt.textContent = long ? 'Kalimat panjang, arti mesin sering meleset. Baca bagian per bagian.' : 'Arti mesin, bisa meleset. Tahan kata untuk cek.';
      smt.classList.remove('hide');
    }
    const bc = bacaOf(sent, r.baca), sb = $('#sbaca');
    if (bc && sb) {
      const v = `<div class="sbaca" dir="auto" lang="${esc(b.lang)}">${esc(bc)}</div>`;
      sb.innerHTML = db.showBaca ? v : `<button class="ghost sbaca-peek" id="speek" type="button">Lihat cara baca</button>` + v.replace('class="sbaca"', 'class="sbaca hide" id="speekv"');
      if ($('#speek')) $('#speek').onclick = () => { $('#speek').classList.add('hide'); $('#speekv').classList.remove('hide'); keepVisible('.s.hl'); };
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
      const paint = (txt, r) => {
        if (my !== gTok || !gl.isConnected) return;
        const saved = db.vocab.some(v => sameVocab(v, lang, w));
        gl.hidden = false;
        gl.innerHTML = `<span class="wg-w" dir="auto" lang="${esc(lang)}"></span><span class="wg-arr" aria-hidden="true">${ico('right')}</span><span class="wg-m" dir="auto" lang="${esc(my2)}"></span>` + (txt ? `<button class="pill-sm wg-save" type="button" aria-label="${saved ? 'Kata ' + esc(w) + ' sudah tersimpan' : 'Simpan kata ' + esc(w)}"${saved ? ' disabled' : ''}>${saved ? 'Tersimpan' : 'Simpan kata'}</button>` : '');
        gl.querySelector('.wg-w').textContent = w; gl.querySelector('.wg-m').textContent = txt || 'Lagi nyari artinya…';
        const sv = gl.querySelector('.wg-save');
        if (sv && !saved) sv.onclick = () => {
          if (db.vocab.some(v => sameVocab(v, lang, w))) return;
          const tp = takeTaps(lang, w);
          if (isKenal(lang, w)) setKenal(lang, w, false);
          db.vocab.unshift({ ...(tp > 0 ? { tap: tp } : {}), w, t: txt, baca: r ? bacaOf(w, r.baca) : '', ...(r && r.base ? { base: r.base } : {}), pos: r && r.dict && r.dict[0] ? r.dict[0].pos : '', lang, s: sent, ctx: ctxOf({ s: sent }), book: b.title, at: Date.now() });
          if (!save()) { db.vocab.shift(); return; } vib(10); sfx('ding'); paintSaved(lang, w, true); award(2, 'save'); toast('Masuk ke kartu kata kamu');
          paint(txt, r);
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
  if (!b) { $('#view').innerHTML = emptyState('wow', 'Belum ada tantangan', 'Pilih cerita dulu, nanti kalimatnya jadi tantangan ngomong.', 'Pilih cerita', "setTab('rak')"); return; }
  const pages = await pagesOf(b);
  const sents = secParas(pages[b.pos], b.lang).flatMap(P => P.sents.filter(x => x.i >= 0).map(x => x.s.trim()));
  b.si = Math.max(0, Math.min(b.si || 0, sents.length - 1)); save();
  const sent = sents[b.si] || '';
  let wi = 0; const words = [];
  const tHtml = tokens(sent, b.lang).map(t => { if (!t.w) return esc(t.t); words.push(t.t); return `<span class="t" data-i="${wi++}">${esc(t.t)}</span>`; }).join('');
  progress(sents.length ? (b.si + 1) / sents.length * 100 : 0);
  $('#view').innerHTML = `
    ${SR || TEST ? '' : `<div class="note">${ico('alert')}<div>${micError('nosupport')}</div></div>`}
    <div class="tile t-cream wide chal" style="margin-bottom:12px">${spot('happy')}<div style="flex:1"><div class="eyebrow">Tantangan hari ini</div><b>Ngomongin 1 kalimat, dapet XP</b></div></div>
    <h1 style="margin:6px 2px 12px">Tantangan <span class="hl-txt">ngomong</span></h1>
    <div class="card">
      <div class="eyebrow center">Kalimat ${b.si + 1} dari ${sents.length}</div>
      <div class="target" id="target" lang="${esc(b.lang)}">${tHtml}</div>
      <div class="hint">Dengerin dulu, terus baca kalimatnya keras-keras!</div>
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
    $$('#target .t').forEach((el, i) => setTimeout(() => { el.dataset.p = sc[i]; el.className = 't ' + cls(sc[i]); }, i * 60));
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
function remedial(list, lang, box, done) {
  let i = 0, tries = 0; const passed = [];
  const step = () => {
    if (i >= list.length) return done();
    const x = list[i];
    box.innerHTML = `<div class="card">
      <div class="dots">${list.map((_, k) => `<i class="${k === i ? 'on' : passed[k] ? 'done' : ''}"></i>`).join('')}</div>
      <div class="center"><span class="boss">${ico('sword')}BOSS ${i + 1}/${list.length}</span></div>
      <div class="eyebrow center lbl" style="margin-top:8px">Kata ${i + 1} dari ${list.length} · Target ${PASS}%</div>
      <div class="rem-word" lang="${esc(lang)}">${esc(x.w)}</div>
      <div class="tr sent center" id="rtr" style="margin:4px 0"></div>
      <div class="aux"><button id="rl">${ico('vol')} Contoh</button><button id="rs">${ico('slow')} Pelan</button></div>
      <div class="rem-score" id="rsc"><span class="eyebrow">Skor sebelumnya</span><b>${x.p}%</b><span class="sm">${x.p < 60 ? 'Pelan-pelan aja.' : 'Dikit lagi!'}</span></div>
      <div class="micwrap"><button class="mic" id="rr" aria-label="Ucapin kata ini">${ico('mic')}</button><div class="mic-lbl" id="rrl" aria-live="polite">Ucapin kata ini</div></div>
      <div class="hint" id="rh">Nggak usah buru-buru. Dengerin contohnya sesering yang kamu mau.</div>
      <div class="row"><button class="ghost" id="rk">Skip dulu ${ico('right')}</button></div></div>`;
    translate(x.w, lang, db.my).then(r => { if ($('#rtr')) $('#rtr').textContent = r.text; }).catch(() => { });
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
      else if (tries >= 3) { sfx('soft'); $('#rh').textContent = 'Udah 3x nyoba, istirahat bentar atau skip dulu. Kata ini masuk daftar "Susah diucap" kok.'; }
      else { sfx('soft'); if (p < 60) speak(x.w, lang, 0.6); }
    };
  };
  step();
}

/* ---------- KATA: kartu swipe + daftar ---------- */
let kataSeg = 'kartu', kataQ = '', flipped = false, csvF = 'all', kataSort = 'baru', kataChipScroll = 0, oftenOpen = true;
const REVIEW_DAYS = [1, 3, 7, 21], DAY_MS = 864e5, DECK_MAX = 20;
let deckDone = 0, deckHint = '';
const isLearning = v => !v.known && (v.lv || 0) >= 1;
const refreshHafal = () => { const a = $('#sumLearn'), b = $('#sumKnown'), c = $('#sumSaved'); if (c) c.textContent = countedVocab(null).length; if (a) a.textContent = db.vocab.filter(isLearning).length; if (b) b.textContent = db.vocab.filter(v => v.known).length; };
const isDue = v => !v.known && (v.due || 0) <= Date.now();
function viewKata() {
  deckDone = 0; deckHint = '';
  const weakAll = Object.values(db.weak).filter(o => o.last < PASS).sort((a, b) => a.last - b.last);
  const known = db.vocab.filter(v => v.known).length, learning = db.vocab.filter(isLearning).length;
  $('#view').innerHTML = `
    <h1 style="margin:6px 2px 12px">Kata <span class="circle-txt">kamu</span></h1>
    <div class="sum"><div class="s1"><b id="sumSaved">${countedVocab(null).length}</b><span>Disimpan</span></div><div class="s1"><b id="sumLearn">${learning}</b><span>Lagi dihafal</span></div><div class="s2"><b id="sumKnown">${known}</b><span>Udah hafal</span></div><div class="s3"><b>${weakAll.length}</b><span>Susah diucap</span></div></div>
    ${(() => { const n = db.vocab.filter(isDue).length; return n ? `<div class="mut sm" id="kdue" style="margin:-2px 2px 10px">${n} kata siap diulang</div>` : ''; })()}
    ${(() => { const cb = book(), s = cb ? sentLooksOf(cb.id) : null; return s && (s.kata || s.kalimat) ? `<div class="mut sm" id="kstat" style="margin:-2px 2px 10px">Buku ini: ${s.kata} kata dicek · ${s.kalimat} kalimat dibuka</div>` : ''; })()}
    <div class="seg" id="kseg"><button data-v="kartu" class="${kataSeg === 'kartu' ? 'on' : ''}">${ico('bolt')}Kartu</button><button data-v="simpan" class="${kataSeg === 'simpan' ? 'on' : ''}">Tersimpan</button><button data-v="sulit" class="${kataSeg === 'sulit' ? 'on' : ''}">Susah diucap</button></div>
    <div id="kbody"></div>`;
  $$('#kseg button').forEach(x => x.onclick = () => { kataSeg = x.dataset.v; sfx('pop'); viewKata(); });
  const kb = $('#kbody');
  if (kataSeg === 'kartu') return deck(kb);
  kb.innerHTML = `<div class="ksrow"><div class="search">${ico('search')}<input id="kq" type="search" placeholder="Cari kata…" value="${esc(kataQ)}" aria-label="Cari kata"></div><div class="csvcnt" id="kcnt" aria-live="polite"></div></div><div id="klist"></div>`;
  $('#kq').oninput = e => { kataQ = e.target.value; renderList(); };
  const renderList = () => {
    const q = kataQ.toLowerCase(), kl = $('#klist');
    if (kataSeg === 'simpan') {
      const langs = [...new Set(db.vocab.map(v => v.lang).filter(Boolean))], books = [...new Set(db.vocab.map(v => v.book).filter(Boolean))];
      if (csvF !== 'all' && !langs.some(l => csvF === 'l:' + l) && !books.some(b => csvF === 'b:' + b)) csvF = 'all';
      const inF = v => csvF === 'all' || (csvF.startsWith('l:') ? v.lang === csvF.slice(2) : v.book === csvF.slice(2));
      const vocab = db.vocab.map((v, i) => ({ ...v, i })).filter(v => inF(v) && (!q || (v.w + ' ' + v.t).toLowerCase().includes(q)));
      if (kataSort === 'tap') vocab.sort((a, c) => (+c.tap || 0) - (+a.tap || 0) || a.i - c.i);
      kl.innerHTML = vocab.length ? vocab.map(v => `<div class="vitem"><div class="inf"><div class="w1" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}${v.known ? ` <span class="vok" title="Udah hafal" role="img" aria-label="Udah hafal">${ico('check')}</span>` : ''}</div><div class="t1${v.t ? '' : ' noarti'}">${v.t ? esc(v.t) : 'Menunggu arti'}</div>${(() => { const m = [bacaOf(v.w, v.baca), +v.tap >= 1 ? `Diketuk ${+v.tap}×` : '', ((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) > 1 ? `Dicek ${db.looks[v.lang + '|' + v.w.toLowerCase()]}×` : ''].filter(Boolean).join(' · '); return m ? `<div class="vmeta">${esc(m)}</div>` : ''; })()}<div class="s1">${esc(ctxOf(v))}</div>${v.book && db.books.some(b => b.title === v.book) ? `<button class="vgo" data-go="${v.i}" aria-label="Lihat ${esc(v.w)} di buku">${ico('book')}Lihat di buku</button>` : ''}</div>
        <button class="icon" data-sp="${v.i}" aria-label="Dengerin">${ico('vol')}</button><button class="icon vdel" data-dv="${v.i}" aria-label="Hapus kata">${ico('trash')}</button></div>`).join('')
        : (q || csvF !== 'all') && db.vocab.length ? `<div class="empty"><div class="mut sm">Nggak ada yang cocok.</div></div>` : emptyState('curious', 'Belum ada kata', 'Pas baca, ketuk kata → Simpan. Nanti muncul di sini.', 'Mulai baca', "setTab('baca')");
      if (db.vocab.length) {
        const readyN = () => db.vocab.filter(v => inF(v) && !v.noTr && (v.t || '').trim()).length;
        const opt = (val, txt) => `<option value="${esc(val)}"${csvF === val ? ' selected' : ''}>${esc(txt)}</option>`;
        const filt = langs.length + books.length > 2 || langs.length > 1 || books.length > 1
          ? `<select id="kCsvF" aria-label="Saring kata per bahasa atau buku">${opt('all', 'Semua kata')}${langs.length > 1 ? `<optgroup label="Per bahasa">${langs.map(l => opt('l:' + l, langName(l))).join('')}</optgroup>` : ''}${books.length > 1 ? `<optgroup label="Per buku">${books.map(b => opt('b:' + b, b)).join('')}</optgroup>` : ''}</select>` : '';
        const sortSel =`<select id="kSort" class="csvsort" aria-label="Urutkan kata"><option value="baru"${kataSort === 'baru' ? ' selected' : ''}>Urutan: Terbaru</option><option value="tap"${kataSort === 'tap' ? ' selected' : ''}>Paling sering diketuk</option></select>`;
        $('#kcnt').innerHTML = csvF === 'all' ? `<b>${db.vocab.length}</b> kata` : `<b>${db.vocab.filter(inF).length}</b> dari ${db.vocab.length}`;
        const fchip = (val, txt) => `<button class="fchip${csvF === val ? ' on' : ''}" data-f="${esc(val)}" aria-pressed="${csvF === val}">${esc(txt)}</button>`;
        const chipRow = filt ? `<div class="fchips" id="kChips" role="group" aria-label="Saring kata">${fchip('all', 'Semua')}${langs.length > 1 ? langs.map(l => fchip('l:' + l, langName(l))).join('') : ''}${books.length > 1 ? books.map(b => fchip('b:' + b, b)).join('') : ''}</div>` : '';
        const oldScroll = ($('#kChips') || {}).scrollLeft || kataChipScroll;
        kl.insertAdjacentHTML('afterbegin', `${chipRow}<div class="csvbar">${sortSel}${filt}</div>`);
        if ($('#kChips')) {
          $('#kChips').scrollLeft = oldScroll;
          $$('#kChips .fchip').forEach(b => b.onclick = () => { kataChipScroll = $('#kChips').scrollLeft; csvF = b.dataset.f; sfx('pop'); renderList(); });
        }
        if (vocab.length) kl.insertAdjacentHTML('beforeend', `<button class="ghost csvexp" id="kCsvHow">Ekspor ke Anki</button><details class="csvguide"><summary>Cara impor ke Anki</summary><ol class="csvsteps"><li>Di Anki laptop: File → Import, pilih CSV Keepo.</li><li>Kolom 1 jadi Depan, sisanya Belakang. Centang izinkan HTML.</li><li>Pilih perbarui catatan yang ada, lalu Import.</li></ol></details>`);
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
          toast(r ? 'Masuk ke kartu kata kamu' : 'Tersimpan, arti nyusul ya', r ? 3200 : 6000, r ? null : { label: 'Isi arti', fn: () => isiArti(o.lang, o.w) });
        });
      }
      $$('[data-go]').forEach(el => el.onclick = () => lihatDiBuku(db.vocab[+el.dataset.go]));
      $$('[data-sp]').forEach(el => el.onclick = () => { const v = db.vocab[+el.dataset.sp]; speak(v.w, v.lang, 0.8); });
      $$('[data-dv]').forEach(el => el.onclick = () => {
        const i = +el.dataset.dv, [gone] = db.vocab.splice(i, 1); if (gone) tombVocab(gone.lang, gone.w); save(); renderList(); refreshHafal(); refreshPills();
        toast('Kata dihapus', 6000, { label: 'Urungkan', fn: () => { if (!db.vocab.includes(gone)) db.vocab.splice(Math.min(i, db.vocab.length), 0, gone); if (gone) untombVocab(gone.lang, gone.w); save(); if (kataSeg === 'simpan' && $('#klist')) viewKata(); } });
      });
    } else {
      const weak = weakAll.filter(o => !q || o.w.toLowerCase().includes(q)).slice(0, 40);
      kl.innerHTML = weak.length ? `<div id="kbox"></div><div id="kwl">${weak.map(o => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(o.lang)}">${esc(o.w)}</div><div class="s1">${langName(o.lang)} · dicoba ${o.n}×</div></div>${chip(o.last)}</div>`).join('')}
        <div class="row"><button class="pri" id="kRem">${ico('sword')}Lawan ${Math.min(weak.length, 10)} kata</button></div></div>`
        : q ? `<div class="empty"><div class="mut sm">Nggak ada yang cocok.</div></div>` : emptyState('happy', 'Aman, belum ada!', 'Kata yang skornya di bawah 85% pas tantangan bakal muncul di sini.', 'Mulai tantangan', "setTab('bicara')");
      if ($('#kRem')) $('#kRem').onclick = () => {
        const lang = weak[0].lang, list = weak.filter(o => o.lang === lang).slice(0, 10);
        $('#kwl').remove();
        remedial(list.map(o => ({ w: o.w, p: o.last })), lang, $('#kbox'), () => { celebrate('Boss kalah!', 'Semua kata sulit udah kamu lawan'); viewKata(); });
      };
    }
  };
  renderList();
  if (db.vocab.some(needsArti)) refillVocab().then(ok => { if (ok && $('#klist') && kataSeg === 'simpan') renderList(); });
}
function deck(kb) {
  if (db.vocab.some(needsArti)) refillVocab().then(ok => { if (ok && kb.isConnected && $('#card')) deck(kb); });
  const cards = db.vocab.filter(isDue).sort((a, b) => (a.due || 0) - (b.due || 0)).slice(0, Math.max(0, DECK_MAX - deckDone));
  if (!cards.length) {
    const dues = db.vocab.filter(v => !v.known && v.due > Date.now()).map(v => v.due), nd = dues.length ? Math.max(1, Math.ceil((Math.min(...dues) - Date.now()) / DAY_MS)) : 0, nLeft = db.vocab.filter(isDue).length, left = nLeft > 0;
    kb.innerHTML = db.vocab.length ? emptyState('cheer', left ? 'Sesi hari ini beres' : 'Semua beres, balik besok ya', left ? `Masih ada ${nLeft} kata. Muncul lagi pas kamu balik nanti.` : nd ? `Kartu berikutnya muncul ${nd} hari ke depan. Simpan kata baru pas baca buat nambah kartu.` : 'Keren banget, semua kata udah hafal. Simpan kata baru pas baca buat nambah kartu.', 'Lanjut baca', "setTab('baca')") : emptyState('curious', 'Belum ada kartu', 'Pas baca, ketuk kata → Simpan. Kata itu jadi kartu hafalan di sini.', 'Mulai baca', "setTab('baca')"); return; }
  const v = cards[0], next = cards[1]; flipped = false;
  kb.innerHTML = `<div class="deck">${next ? `<div class="flash under"><div class="fw" dir="auto" style="color:var(--color-text-muted)">${esc(next.w)}</div></div>` : ''}
      <div class="flash" id="card"><span class="stamp yes">HAFAL</span><span class="stamp no">BELUM</span>
        <div class="eyebrow">${langName(v.lang)} · ${cards.length} kartu${(v.lv || 0) > 0 ? ' <span class="recheck">Cek ulang</span>' : ''}</div>
        <div class="fw" dir="auto" lang="${esc(v.lang)}">${esc(v.w)}</div><div id="back" class="hide"><div class="ft">${String(v.t || '').trim() ? esc(v.t) : '<span class="mut">Arti menyusul</span> <button class="ghost" id="fget" type="button">Ambil arti</button>'}</div>${bacaOf(v.w, v.baca) ? (db.showBaca ? `<div class="fb" lang="${esc(v.lang)}" style="overflow-wrap:anywhere">${esc(bacaOf(v.w, v.baca))}</div>` : `<button class="ghost fb-peek" id="peek" type="button">Lihat cara baca</button><div class="fb hide" id="peekv" lang="${esc(v.lang)}" style="overflow-wrap:anywhere">${esc(bacaOf(v.w, v.baca))}</div>`) : ''}${baseOf(v.w, v.base) ? `<div class="fbase">Bentuk dasar: <b lang="${esc(v.lang)}">${esc(baseOf(v.w, v.base))}</b></div>` : ''}<div class="fs" style="margin-top:8px">${esc(ctxOf(v))}</div></div>
        <div class="tap" id="tapl">${ico('pointer')}Tap buat liat artinya</div></div></div>
    <div class="deck-act"><button class="no" id="fNo">${ico('x')}Belum</button><button class="icon tint" id="fSp" aria-label="Dengerin">${ico('vol')}</button><button class="yes" id="fYes">${ico('check')}Hafal</button></div>
    <div class="mut sm center" style="margin-top:12px">${deckHint ? esc(deckHint) : 'Geser kanan = hafal · geser kiri = belum'}</div>`;
  const card = $('#card');
  const flip = () => { flipped = !flipped; $('#back').classList.toggle('hide', !flipped); $('#tapl').classList.toggle('hide', flipped); sfx('pop'); };
  const decide = ok => {
    card.style.transform = `translateX(${ok ? 140 : -140}%) rotate(${ok ? 18 : -18}deg)`; card.style.opacity = '0';
    deckDone++;
    if (ok) { const lv = v.lv || 0; if (lv >= REVIEW_DAYS.length) { v.known = true; v.due = 0; deckHint = 'Kata ini udah hafal beneran'; } else { const d = REVIEW_DAYS[lv]; v.lv = lv + 1; v.due = Date.now() + d * DAY_MS; v.known = false; deckHint = `Mantap! Muncul lagi ${d} hari ke depan · ${REVIEW_DAYS.length - lv} tahap lagi jadi hafal`; } save(); sfx('ding'); award(2, 'flash'); } else { v.lv = 0; v.due = Date.now(); v.known = false; deckHint = ''; save(); sfx('soft'); }
    refreshHafal();
    setTimeout(() => deck(kb), 280);
  };
  if ($('#fget')) { const g = $('#fget'); g.addEventListener('pointerdown', e => e.stopPropagation()); g.addEventListener('pointerup', e => e.stopPropagation()); g.onclick = e => { e.stopPropagation(); g.disabled = true; g.textContent = 'Nyari…'; refillVocab().then(ok => { if (ok && kb.isConnected && $('#card')) deck(kb); else { g.disabled = false; g.textContent = 'Ambil arti'; toast('Belum ketemu, coba lagi nanti'); } }); }; }
  $('#fYes').onclick = () => decide(true); $('#fNo').onclick = () => decide(false); $('#fSp').onclick = () => speak(v.w, v.lang, 0.8);
  if ($('#peek')) { const pk = $('#peek'); pk.addEventListener('pointerdown', e => e.stopPropagation()); pk.addEventListener('pointerup', e => e.stopPropagation()); pk.onclick = e => { e.stopPropagation(); pk.classList.add('hide'); $('#peekv').classList.remove('hide'); }; }
  let sx = null, dx = 0;
  card.addEventListener('pointerdown', e => { sx = e.clientX; dx = 0; card.style.transition = 'none'; card.setPointerCapture(e.pointerId); });
  card.addEventListener('pointermove', e => { if (sx == null) return; dx = e.clientX - sx; card.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`; card.querySelector('.yes').style.opacity = Math.max(0, dx / 100); card.querySelector('.no').style.opacity = Math.max(0, -dx / 100); });
  card.addEventListener('pointerup', () => { if (sx == null) return; sx = null; card.style.transition = ''; if (Math.abs(dx) > 90) decide(dx > 0); else { card.style.transform = ''; card.querySelectorAll('.stamp').forEach(s => s.style.opacity = 0); if (Math.abs(dx) < 6) flip(); } });
}

/* ---------- mulai ---------- */
applyTheme(); save();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
if ('serviceWorker' in navigator && !TEST && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js');
if ('speechSynthesis' in window) speechSynthesis.getVoices();
const syncOff = () => { const o = $('#roff'); if (o) o.hidden = navigator.onLine; };
window.addEventListener('offline', syncOff);
window.addEventListener('online', () => { syncOff(); const r = $('#sheet #wretry'); if (r) r.click(); const s = $('#sheet #sretry'); if (s) s.click(); });
window.addEventListener('online', () => { if (rekapAktif && $('#rsl')) isiArtiRekap(rekapAktif); });
window.addEventListener('online', () => { refillVocab().then(ok => { if (ok) toast('Arti kata udah keisi'); }); });
setTab(db.tab && db.tab !== 'sosial' && (db.tab === 'rak' || db.cur) ? db.tab : 'rak');
bersihYatim(); muatCover();
setTimeout(() => { const b = book(); if (b && db.tab !== 'baca') sesiSisa(b); }, 600);
