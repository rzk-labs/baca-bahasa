'use strict';
/* Tampilan Baca Bahasa v4 — mengikuti BRAND.md (Quiet Teal). Logika teks/suara/skor ada di app.js. */
db.theme = db.theme || 'auto'; db.font = db.font || 'serif'; db.days = db.days || []; db.scores = db.scores || []; db.lh = db.lh || 1.7;

/* ---------- ikon (Lucide, outline 1.75) ---------- */
const BM = '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>';
const ICONS = {
  logo: '<path d="M12 6.5C9.5 4.7 6.5 4.5 3 5.4V18c3.5-.9 6.5-.7 9 1 2.5-1.7 5.5-1.9 9-1V5.4c-3.5-.9-6.5-.7-9 1.1Z"/><path d="M12 6.5V19"/><circle cx="16.7" cy="9.6" r="1.35" style="fill:currentColor;stroke:none"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  mic: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
  bookmark: BM, bmplus: BM + '<path d="M12 7v6M15 10H9"/>', bmcheck: BM + '<path d="m9 10 2 2 4-4"/>',
  vol: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
  fileup: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  paste: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  redo: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  slow: '<path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"/><circle cx="10" cy="13" r="8"/><path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"/><path d="M18 3 19.1 5.2M22 3 20.9 5.2"/>'
};
const ico = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const vib = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { } };
const today = () => new Date().toISOString().slice(0, 10);
function markDay() { const d = today(); if (!db.days.includes(d)) { db.days.push(d); db.days = db.days.slice(-400); save(); } }
function streak() { let n = 0; const d = new Date(); if (!db.days.includes(today())) d.setDate(d.getDate() - 1); for (; ;) { if (db.days.includes(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); } else return n; } }
function hue(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
// sampul tenang: warna redup dari judul, judul ditulis dengan font baca
const COVERS = ['#245F58', '#75533F', '#3E5A74', '#5C5940', '#6B4E6E', '#2F5E46', '#7A4B3A', '#45606A'];
function cover(b) { return `<div class="cover" style="background:${COVERS[hue(b.title) % COVERS.length]}">${esc(b.title.slice(0, 40))}</div>`; }
function applyTheme() {
  document.documentElement.dataset.theme = db.theme;
  const dark = db.theme === 'dark' || (db.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name=theme-color]').content = dark ? '#101B1A' : db.theme === 'sepia' ? '#F6F0E4' : '#F7F9F8';
}
const LANG_ID = { en: 'Bahasa Inggris', ja: 'Bahasa Jepang', ko: 'Bahasa Korea', 'zh-CN': 'Bahasa Mandarin', fr: 'Bahasa Prancis', de: 'Bahasa Jerman', es: 'Bahasa Spanyol', it: 'Bahasa Italia', nl: 'Bahasa Belanda', pt: 'Bahasa Portugis', ru: 'Bahasa Rusia', ar: 'Bahasa Arab', tr: 'Bahasa Turki', id: 'Bahasa Indonesia' };
const langName = l => LANG_ID[l] || (LANGS[l] || [l])[0];
const pctOf = b => b.pct != null ? b.pct : b.total ? Math.round((b.pos + 1) / b.total * 100) : 0;
const progress = p => { $('#prog').innerHTML = p == null ? '' : `<i style="width:${p}%"></i>`; };
const SCORE = p => p >= PASS ? ['g', 'Bagus', 'Pengucapanmu sudah jelas.'] : p >= 60 ? ['m', 'Hampir', 'Sudah cukup dekat. Coba perhatikan bunyinya.'] : ['b', 'Perlu latihan', 'Kita latih kata ini pelan-pelan.'];
const chip = (p, txt) => `<span class="chip ${SCORE(p)[0]}">${txt ? esc(txt) + ' · ' : ''}${p}%${txt ? '' : ' · ' + (p >= PASS ? 'Bagus' : p >= 60 ? 'Hampir' : 'Latih lagi')}</span>`;
// pesan error sesuai guideline
function micError(e) {
  const m = String(e && e.message || e);
  if (m === 'nosupport') return 'Browser ini belum bisa mendengarkan suara. Pakai Safari di iPhone atau Chrome.';
  if (/not-allowed|service-not-allowed/.test(m)) return 'Akses mikrofon belum aktif. Izinkan mikrofon melalui pengaturan browser.';
  if (/network/.test(m)) return 'Koneksi terputus. Penilaian ucapan butuh internet.';
  if (/audio-capture/.test(m)) return 'Mikrofon tidak ditemukan. Cek mikrofon perangkatmu.';
  return 'Pengucapan belum bisa dinilai. Rekamanmu tidak dianggap gagal. Coba lagi.';
}

/* ---------- kerangka ---------- */
let toastT;
function toast(m, ms = 3500) { const t = $('#toast'); t.textContent = m; t.classList.remove('hide'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hide'), ms); }
function openSheet(html) { $('#sheetBody').innerHTML = html; $('#sheet').classList.remove('hide'); $('#shade').classList.remove('hide'); $('#sheet').scrollTop = 0; $$('#sheet [data-close]').forEach(b => b.onclick = closeSheet); }
function closeSheet() { $('#sheet').classList.add('hide'); $('#shade').classList.add('hide'); $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); }
$('#shade').onclick = closeSheet;
addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
const closeBtn = `<button class="icon" data-close aria-label="Tutup">${ico('x')}</button>`;
const langOpts = sel => Object.entries(LANGS).map(([k, v]) => `<option value="${k}"${k === sel ? ' selected' : ''}>${v[0]}</option>`).join('');
const book = () => db.books.find(b => b.id === db.cur);
let cache = { id: null, pages: null };
async function pagesOf(b) {
  if (cache.id !== b.id) {
    const paras = await getText(b.id); cache = { id: b.id, pages: makeSections(paras || ['(teks hilang)']) };
    if (b.v !== 2) { b.v = 2; b.pos = 0; b.si = 0; }
    b.total = cache.pages.length; save();
  }
  return cache.pages;
}
/* bagian buku = bab (EPUB: tiap file spine, penanda \u0002) atau potongan ±15rb huruf */
function makeSections(paras) {
  const secs = []; let cur = [], n = 0;
  const push = () => { if (cur.length) secs.push(cur); cur = []; n = 0; };
  for (const p of paras) {
    if (p === '\u0002') { push(); continue; }
    if (n > 15000 && !p.startsWith('\u0001')) push();
    cur.push(p); n += p.length;
  }
  push();
  return secs.length ? secs : [['(kosong)']];
}
const isHead = raw => raw.startsWith('\u0001') || (raw.length < 80 && !/[.!?,;:"”'’)\]]$/.test(raw.trim()));
function secParas(sec, lang) {
  let k = 0;
  return sec.map(raw => { const h = isHead(raw), p = raw.replace(/^\u0001/, ''); return { h, sents: sentences(p, lang).map(s => ({ s, i: tokens(s, lang).some(t => t.w) ? k++ : -1 })) }; });
}
const TABS = { rak: ['home', 'Beranda'], baca: ['book', 'Baca'], bicara: ['mic', 'Bicara'], kata: ['bookmark', 'Kata'] };
$('#tabs').innerHTML = Object.entries(TABS).map(([k, [i, l]]) => `<button data-t="${k}">${ico(i)}<span>${l}</span></button>`).join('');
const BRAND_TTL = `${ico('logo')}<span>Baca Bahasa</span>`;
function setTab(t) {
  db.tab = t; save(); closeSheet(); stopListen(); document.body.classList.remove('reading');
  $$('#tabs button').forEach(b => { b.classList.toggle('on', b.dataset.t === t); b.setAttribute('aria-current', b.dataset.t === t ? 'page' : 'false'); });
  $('#hdx').innerHTML = ''; $('#ttl').innerHTML = BRAND_TTL; progress(null);
  window.scrollTo(0, 0);
  ({ rak: viewRak, baca: viewBaca, bicara: viewBicara, kata: viewKata })[t]();
}
$$('#tabs button').forEach(b => b.onclick = () => { vib(5); setTab(b.dataset.t); });
const emptyState = (icon, title, msg, btn, act) => `<div class="empty"><div class="ei">${ico(icon)}</div><h3>${title}</h3><div class="mut sm">${msg}</div>${btn ? `<button class="pri" onclick="${act}">${btn}</button>` : ''}</div>`;

/* ---------- pengaturan tampilan (H7) ---------- */
function openSettings() {
  const b = book();
  const th = [['auto', 'Otomatis'], ['light', 'Terang'], ['sepia', 'Sepia'], ['dark', 'Gelap']];
  const sw = { auto: 'linear-gradient(180deg,#F7F9F8 58%,#101B1A 58%)', light: '#F7F9F8', sepia: '#F6F0E4', dark: '#101B1A' };
  const ink = { auto: '#182C2A', light: '#182C2A', sepia: '#302A22', dark: '#EAF3EF' };
  openSheet(`<div class="sh-head"><h3>Tampilan baca</h3>${closeBtn}</div>
    <div class="set-row"><div class="eyebrow">Tema</div><div class="swatch" id="thm">${th.map(([k, l]) => `<button data-v="${k}" class="${db.theme === k ? 'on' : ''}" style="background:${sw[k]};color:${ink[k]}"><span>Aa</span><small${k === 'auto' ? ' style="color:#EAF3EF"' : ''}>${l}</small></button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Ukuran huruf</div><div class="stepper"><button id="fsm" aria-label="Perkecil huruf">A−</button><b id="fsv">${db.fs} px</b><button id="fsp" aria-label="Perbesar huruf">A+</button></div></div>
    <div class="set-row"><div class="eyebrow">Jenis huruf</div><div class="seg" id="fnt"><button data-v="serif" class="${db.font === 'serif' ? 'on' : ''}" style="font-family:var(--font-reader)">Literata (Serif)</button><button data-v="sans" class="${db.font === 'sans' ? 'on' : ''}">Plus Jakarta</button></div></div>
    <div class="set-row"><div class="eyebrow">Jarak baris</div><div class="seg" id="lhs">${[1.5, 1.7, 1.9].map(v => `<button data-v="${v}" class="${db.lh === v ? 'on' : ''}">${v}</button>`).join('')}</div></div>
    ${b ? `<div class="set-row"><div class="eyebrow">Bahasa buku ini</div><select id="blang">${langOpts(b.lang)}</select></div>` : ''}
    <div class="set-row"><div class="eyebrow">Artikan ke</div><select id="mylang">${langOpts(db.my)}</select></div>
    <div class="mut sm" style="margin-bottom:12px">Perubahan tampilan langsung diterapkan ke buku.</div>
    <button class="ghost full" id="rst">Kembalikan setelan awal</button>`);
  const relayout = () => { const p = $('#cols'); if (p) { p.style.fontSize = db.fs + 'px'; $('#reader').style.setProperty('--reader-lh', db.lh); layout(); } };
  const setFs = v => { db.fs = Math.max(16, Math.min(28, v)); save(); $('#fsv').textContent = db.fs + ' px'; relayout(); };
  $('#fsm').onclick = () => setFs(db.fs - 1); $('#fsp').onclick = () => setFs(db.fs + 1);
  $$('#thm button').forEach(x => x.onclick = () => { db.theme = x.dataset.v; save(); applyTheme(); $$('#thm button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#fnt button').forEach(x => x.onclick = () => { db.font = x.dataset.v; save(); $$('#fnt button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) { r.classList.toggle('serif', db.font === 'serif'); layout(); } });
  $$('#lhs button').forEach(x => x.onclick = () => { db.lh = +x.dataset.v; save(); $$('#lhs button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $('#rst').onclick = () => { db.fs = 19; db.lh = 1.7; db.font = 'serif'; db.theme = 'auto'; save(); applyTheme(); closeSheet(); if (document.body.classList.contains('reading')) viewBaca(); toast('Setelan baca dikembalikan.'); };
  if ($('#blang')) $('#blang').onchange = e => { b.lang = e.target.value; save(); cache.id = null; trCache.clear(); closeSheet(); setTab(db.tab); };
  $('#mylang').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
}

/* ---------- BERANDA (H1) ---------- */
function viewRak() {
  const list = db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0));
  const cur = book() || list[0];
  const sc = db.scores.slice(-20), avg = sc.length ? Math.round(sc.reduce((a, c) => a + c, 0) / sc.length) + '%' : '—';
  const st = streak();
  $('#hdx').innerHTML = `<button class="icon" id="set" aria-label="Pengaturan tampilan">${ico('sliders')}</button>`;
  $('#set').onclick = openSettings;
  const addCard = `<div class="card">
      <h3>Tambah buku</h3>
      <div class="langs"><label>Bahasa buku<select id="bl">${langOpts(db.lastLang)}</select></label><label>Artikan ke<select id="ml">${langOpts(db.my)}</select></label></div>
      <button class="${cur ? 'sec' : 'pri'} full" id="up">${ico('fileup')} Unggah file</button>
      <div class="mut sm center" style="margin-top:6px">TXT, EPUB, atau PDF berisi teks</div>
      <div class="row"><button class="ghost" id="paste">${ico('paste')} Tempel teks</button><button class="ghost" id="sample">${ico('spark')} Buku contoh</button></div>
    </div>`;
  $('#view').innerHTML = cur ? `
    <div class="hello"><h1>Mau baca apa hari ini?</h1><p class="mut sm">Lanjut dari halaman terakhir.</p></div>
    <div class="card cont" id="hero">${cover(cur)}<div class="inf"><div class="eyebrow">Sedang dibaca</div><div class="t">${esc(cur.title)}</div>
      <div class="mut sm">${langName(cur.lang)} · ${pctOf(cur)}% selesai</div><div class="bar"><i style="width:${pctOf(cur)}%"></i></div></div></div>
    <div class="cont-act"><button class="pri" id="hRead">${ico('book')} Lanjutkan membaca</button><button class="icon" id="hSpeak" aria-label="Latihan bicara">${ico('mic')}</button></div>
    <div class="stats"><div><b>${db.books.length}</b><span>Buku</span></div><div><b>${db.vocab.length || '—'}</b><span>Kata disimpan</span></div><div><b>${avg}</b><span>Skor ucapan</span></div></div>
    <div class="streak">${ico('flame')} ${st ? `Sudah membaca ${st} hari berturut-turut` : 'Baca satu halaman hari ini untuk mulai streak'}</div>
    <div class="sec-h"><h2>Rak bukumu</h2><span class="mut sm">${list.length} buku</span></div>
    <div class="shelf">${list.map(b => `<div class="bk" data-open="${b.id}">${cover(b)}<div class="t">${esc(b.title)}</div><div class="m">${langName(b.lang)} · ${pctOf(b)}%</div><div class="bar"><i style="width:${pctOf(b)}%"></i></div>
      <button class="del" data-del="${b.id}" aria-label="Hapus buku">${ico('trash')}</button></div>`).join('')}</div>
    <div class="sec-h"><h2>Tambah buku</h2></div>${addCard.replace('<h3>Tambah buku</h3>', '')}`
    : `<div class="hello"><h1>Buku favoritmu, bahasa barumu.</h1><p class="mut sm">Baca ceritanya. Kuasai bahasanya.</p></div>
    <div class="card"><h3>Mulai dari satu buku yang ingin kamu baca.</h3>
      <div class="steps3"><div><b>1</b>Tambah buku TXT, EPUB, PDF, atau tempel teks</div><div><b>2</b>Baca. Ketuk kata yang belum kamu pahami</div><div><b>3</b>Latih pengucapan kalimatnya</div></div></div>
    ${addCard}`;
  if (cur) {
    const open = t => { db.cur = cur.id; save(); setTab(t); };
    $('#hero').onclick = () => open('baca'); $('#hRead').onclick = () => open('baca'); $('#hSpeak').onclick = () => open('bicara');
  }
  $('#bl').onchange = e => { db.lastLang = e.target.value; save(); };
  $('#ml').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
  $('#up').onclick = () => $('#file').click();
  $('#sample').onclick = () => addBook('The Lighthouse Keeper (contoh)', cleanParas(SAMPLE), 'en');
  $('#paste').onclick = () => {
    openSheet(`<div class="sh-head"><h3>Tempel teks</h3>${closeBtn}</div><div class="mut sm">Bahasa: <b>${langName(db.lastLang)}</b> · ubah di Beranda</div>
      <label class="sm mut" style="display:block;margin-top:16px;font-weight:600">Judul<input id="pt" placeholder="Contoh: Cerpen favorit"></label>
      <label class="sm mut" style="display:block;margin-top:12px;font-weight:600">Teks<textarea id="px" placeholder="Tempel teks bahasa asing di sini…"></textarea></label>
      <div class="row"><button class="sec" data-close>Batal</button><button class="pri" id="ps">Tambahkan ke rak</button></div>`);
    $('#ps').onclick = () => { const x = $('#px').value.trim(); if (!x) return toast('Teksnya masih kosong. Tempel dulu teksnya.'); closeSheet(); addBook($('#pt').value.trim() || x.slice(0, 30) + '…', cleanParas(x), db.lastLang); };
  };
  $$('[data-open]').forEach(el => el.onclick = () => { db.cur = el.dataset.open; save(); setTab('baca'); });
  $$('[data-del]').forEach(el => el.onclick = async e => {
    e.stopPropagation();
    if (!el.classList.contains('sure')) { el.classList.add('sure'); el.textContent = 'Hapus?'; setTimeout(() => { if (el.isConnected) { el.classList.remove('sure'); el.innerHTML = ico('trash'); } }, 3000); return; }
    const id = el.dataset.del; db.books = db.books.filter(b => b.id !== id); if (db.cur === id) db.cur = null; save(); await delText(id); toast('Buku dihapus dari rak.'); viewRak();
  });
}
$('#file').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  if (!/\.(txt|epub|pdf)$/i.test(f.name)) return toast('Format ini belum didukung. Gunakan TXT, EPUB, atau PDF.', 5000);
  if (f.size > 50 * 1024 * 1024) return toast('Ukuran buku melebihi batas 50 MB. Coba file yang lebih kecil.', 5000);
  toast('Menyiapkan buku…', 60000);
  try { const r = await parseFile(f); if (!r.paras.length) throw new Error('kosong'); await addBook(r.title, r.paras, db.lastLang); }
  catch (err) { console.error(err); toast(/scan|gambar|kosong/.test(err.message) ? 'Teks pada PDF ini belum bisa dibaca. Gunakan versi dengan teks yang dapat dipilih.' : /internet|pustaka/.test(err.message) ? 'Koneksi terputus. Bacaan yang tersimpan tetap bisa dibuka.' : 'Buku ini belum bisa dibuka. Coba impor ulang.', 6000); }
};
async function addBook(title, paras, lang) {
  const id = 'b' + Date.now().toString(36);
  await putText(id, paras);
  db.books.push({ id, title, lang, pos: 0, si: 0, total: 0, v: 2, added: Date.now(), opened: Date.now() });
  db.cur = id; save(); toast('Buku ditambahkan ke rak.'); setTab('baca');
}

/* ---------- BACA / e-reader (H2) ---------- */
async function viewBaca() {
  const b = book();
  if (!b) { $('#view').innerHTML = emptyState('book', 'Belum ada buku yang dibuka', 'Mulai dari satu buku yang ingin kamu baca.', 'Tambah buku', "setTab('rak')"); return; }
  b.opened = Date.now(); save();
  const secs = await pagesOf(b);
  b.pos = Math.max(0, Math.min(b.pos, secs.length - 1));
  document.body.classList.add('reading');
  const sp = secParas(secs[b.pos], b.lang);
  const head = sp.find(P => P.h);
  const chTitle = head ? head.sents.map(x => x.s).join('').trim() : b.title;
  const wordsHtml = s => tokens(s, b.lang).map(t => t.w ? `<span class="w">${esc(t.t)}</span>` : esc(t.t)).join('');
  const html = sp.map(P => {
    const inner = P.sents.map(({ s, i }) => i < 0 ? esc(s) : `<span class="s" data-s="${i}">${wordsHtml(s)}</span>`).join('');
    return P.h ? `<h2 class="ch">${inner}</h2>` : `<p>${inner}</p>`;
  }).join('');
  $('#view').innerHTML = `
    <div class="reader${RD.quiet ? '' : ' chrome'}${db.font === 'serif' ? ' serif' : ''}" id="reader" lang="${esc(b.lang)}" style="--reader-lh:${db.lh}">
      <div class="rbar"><button class="icon" id="rHome" aria-label="Kembali ke Beranda">${ico('left')}</button>
        <div class="rtitle"><b>${esc(b.title)}</b><span>Bab ${b.pos + 1} dari ${secs.length}</span></div>
        <button class="icon" id="rSpeak" aria-label="Latihan bicara">${ico('mic')}</button><button class="icon" id="set" aria-label="Pengaturan tampilan">${ico('sliders')}</button></div>
      <div class="rhead">${esc(chTitle)}</div>
      <div class="vp" id="vp"><div class="page cols" id="cols" style="font-size:${db.fs}px">${html}</div></div>
      <div class="rfoot"><button class="pg" id="pv" aria-label="Halaman sebelumnya">${ico('left')}</button>
        <div class="rmid"><span id="pgn"></span><div class="bar"><i id="pbar"></i></div></div>
        <button class="pg" id="nx" aria-label="Halaman berikutnya">${ico('right')}</button></div>
      ${db.seenTip ? '' : `<div class="rtip" id="tip" role="note"><div><b>Ketuk kata</b> untuk lihat artinya.<br><b>Geser</b> atau ketuk tepi untuk pindah halaman.<br><b>Ketuk tengah</b> untuk menu.</div><button id="tipx" aria-label="Tutup petunjuk">${ico('x')}</button></div>`}
    </div>`;
  if ($('#tipx')) $('#tipx').onclick = () => { db.seenTip = true; save(); $('#tip').remove(); };
  $('#rHome').onclick = () => setTab('rak');
  $('#rSpeak').onclick = () => setTab('bicara');
  $('#set').onclick = openSettings;
  $('#pv').onclick = () => turn(-1); $('#nx').onclick = () => turn(1);
  const vp = $('#vp'); let tx = null, moved = false;
  vp.addEventListener('touchstart', e => { const t = e.touches[0]; tx = [t.clientX, t.clientY]; moved = false; }, { passive: true });
  vp.addEventListener('touchend', e => {
    if (!tx) return; const t = e.changedTouches[0], dx = t.clientX - tx[0], dy = t.clientY - tx[1]; tx = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) { moved = true; turn(dx < 0 ? 1 : -1); }
  });
  vp.onclick = e => {
    if (moved) { moved = false; return; }
    const w = e.target.closest('.w'); if (w) { vib(8); onWord(w); return; }
    const r = vp.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
    if (x < 0.25) turn(-1); else if (x > 0.75) turn(1); else $('#reader').classList.toggle('chrome');
  };
  RD.quiet = false;
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if ($('#cols')) layout(); });
}
/* pembagian halaman ala e-book (CSS columns); posisi disimpan per kalimat */
const RD = { page: 0, n: 1, step: 1, toEnd: false, quiet: false };
function layout() {
  const vp = $('#vp'), cols = $('#cols'); if (!vp || !cols) return;
  const b = book(), W = vp.clientWidth, H = vp.clientHeight;
  const G = 64, per = W >= 900 && (W - G) / 2 >= 360 ? 2 : 1, cw = (W - (per - 1) * G) / per;
  vp.classList.toggle('two', per === 2);
  Object.assign(cols.style, { height: H + 'px', width: W + 'px', columnWidth: cw + 'px', columnGap: G + 'px', transition: 'none', transform: 'none' });
  const total = Math.max(1, Math.round((cols.scrollWidth + G) / (cw + G)));
  RD.step = W + G; RD.n = Math.max(1, Math.ceil(total / per));
  let p = 0;
  if (RD.toEnd) p = RD.n - 1;
  else if (b.si) { const el = cols.querySelector(`.s[data-s="${b.si}"]`); if (el) p = pageOf(el, cols); }
  RD.toEnd = false;
  showPage(p, false);
}
function pageOf(el, cols) { const r = el.getClientRects()[0] || el.getBoundingClientRect(); return Math.max(0, Math.min(RD.n - 1, Math.floor((r.left - cols.getBoundingClientRect().left + 2) / RD.step))); }
function showPage(p, anim = true) {
  const cols = $('#cols'), b = book(); if (!cols) return;
  RD.page = Math.max(0, Math.min(RD.n - 1, p));
  cols.style.transition = anim ? '' : 'none';
  cols.style.transform = `translateX(${-RD.page * RD.step}px)`;
  for (const el of cols.querySelectorAll('.s')) { if (pageOf(el, cols) >= RD.page) { b.si = +el.dataset.s; break; } }
  let hd = null; for (const h of cols.querySelectorAll('h2.ch')) { if (pageOf(h, cols) <= RD.page) hd = h; else break; }
  if (hd) $('.rhead').textContent = hd.textContent.trim();
  b.pct = Math.round((b.pos + (RD.page + 1) / RD.n) / (b.total || 1) * 100); save();
  $('#pgn').textContent = `Halaman ${RD.page + 1} / ${RD.n}` + (b.total > 1 ? ` · Bab ${b.pos + 1}/${b.total}` : '') + ` · ${b.pct}% selesai`;
  $('#pbar').style.width = b.pct + '%';
  $('#pv').disabled = RD.page === 0 && b.pos === 0;
  $('#nx').disabled = RD.page === RD.n - 1 && b.pos >= (b.total || 1) - 1;
}
function turn(d) {
  const b = book(); closeSheet();
  const np = RD.page + d;
  if (np >= 0 && np < RD.n) { vib(4); markDay(); showPage(np); $('#reader').classList.remove('chrome'); return; }
  if (d > 0 && b.pos < b.total - 1) { b.pos++; b.si = 0; RD.quiet = true; save(); viewBaca(); }
  else if (d < 0 && b.pos > 0) { b.pos--; b.si = 0; RD.toEnd = true; RD.quiet = true; save(); viewBaca(); }
  else toast(d > 0 ? 'Kamu sudah sampai halaman terakhir. Selamat!' : 'Ini halaman pertama.');
}
let rsT; addEventListener('resize', () => { clearTimeout(rsT); rsT = setTimeout(() => { if (document.body.classList.contains('reading')) layout(); }, 150); });
addEventListener('keydown', e => { if (!document.body.classList.contains('reading') || !$('#sheet').classList.contains('hide') || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); turn(1); } if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); turn(-1); } });

/* ---------- sheet arti kata → arti kalimat (H3) ---------- */
async function onWord(el) {
  const b = book(); markDay();
  $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
  el.classList.add('sel');
  const word = el.textContent, sEl = el.closest('.s'), sent = sEl.textContent.trim(), sIdx = +sEl.dataset.s;
  const isSaved = () => db.vocab.some(v => v.w.toLowerCase() === word.toLowerCase() && v.lang === b.lang);
  const saveLbl = () => isSaved() ? `${ico('bmcheck')} Sudah tersimpan` : `${ico('bmplus')} Simpan kata`;
  openSheet(`
    <div class="sh-head"><span class="eyebrow">Langkah 1 dari 2</span>${closeBtn}</div>
    <div class="wd"><b>${esc(word)}</b><button class="icon tint" id="sw" aria-label="Dengarkan kata">${ico('vol')}</button></div>
    <div class="pos" id="wpos"></div>
    <div class="tr" id="wtr"><span class="loading">Memuat arti…</span></div>
    <div class="dict" id="wdict"></div>
    <div class="row"><button class="sec" id="wsave">${saveLbl()}</button><button class="pri" id="wnext">Lihat arti kalimat</button></div>`);
  $('#sw').onclick = () => speak(word, b.lang, 0.8);
  let tr = null;
  const load = () => translate(word, b.lang, db.my).then(r => {
    tr = r; if (!$('#wtr')) return;
    $('#wtr').textContent = r.text;
    const d = r.dict;
    if (d.length) { $('#wpos').textContent = (POS[d[0].pos] || d[0].pos).replace(/^./, c => c.toUpperCase()); }
    const alt = d.flatMap(x => x.terms.slice(0, 4).map(t => t)).filter(t => t.toLowerCase() !== r.text.toLowerCase()).slice(0, 6);
    $('#wdict').innerHTML = alt.length ? `<div><b>Arti lain:</b> ${alt.map(esc).join(', ')}</div>` + (d.length > 1 ? `<div>${d.slice(1, 3).map(x => `<b>${esc(POS[x.pos] || x.pos)}:</b> ${x.terms.slice(0, 3).map(esc).join(', ')}`).join(' · ')}</div>` : '') : '';
  }).catch(() => { if ($('#wtr')) { $('#wtr').innerHTML = `<span class="loading">Arti belum berhasil dimuat.</span> <button class="ghost" id="wretry">Coba lagi</button>`; $('#wretry').onclick = () => { $('#wtr').innerHTML = '<span class="loading">Memuat arti…</span>'; load(); }; } });
  load();
  $('#wsave').onclick = async () => {
    if (isSaved()) return;
    const r = tr || await translate(word, b.lang, db.my).catch(() => ({ text: '' }));
    db.vocab.unshift({ w: word, t: r.text, pos: r.dict && r.dict[0] ? r.dict[0].pos : '', lang: b.lang, s: sent, book: b.title, at: Date.now() }); save(); vib(10);
    $('#wsave').innerHTML = saveLbl(); toast('Tersimpan di Kata.');
  };
  $('#wnext').onclick = () => showSentence(word, sent, sIdx, sEl);
}
function showSentence(word, sent, sIdx, sEl) {
  const b = book();
  sEl.classList.add('hl');
  const marked = esc(sent).replace(new RegExp('(^|[^\\p{L}])(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?=[^\\p{L}]|$)', 'u'), '$1<mark>$2</mark>');
  openSheet(`
    <div class="sh-head"><button class="icon" id="sback" aria-label="Kembali ke arti kata">${ico('left')}</button><span class="eyebrow" style="flex:1">Langkah 2 dari 2</span>${closeBtn}</div>
    <h3>Arti kalimat</h3>
    <div class="src">${marked}</div>
    <div class="tr sent" id="str"><span class="loading">Memuat arti kalimat…</span></div>
    <button class="ghost" id="ssp" style="padding-left:0">${ico('vol')} Dengarkan kalimat</button>
    <div class="row"><button class="pri" id="spr">${ico('mic')} Latih pengucapan</button></div>
    <div class="row" style="margin-top:8px"><button class="sec" data-close>Kembali membaca</button></div>`);
  translate(sent, b.lang, db.my).then(r => { if ($('#str')) $('#str').textContent = r.text; }).catch(() => { if ($('#str')) $('#str').innerHTML = '<span class="loading">Arti belum berhasil dimuat. Coba lagi nanti.</span>'; });
  $('#ssp').onclick = () => speak(sent, b.lang);
  $('#sback').onclick = () => { const el = sEl.querySelector('.w.sel'); if (el) onWord(el); };
  $('#spr').onclick = () => { b.si = sIdx; save(); setTab('bicara'); };
}

/* ---------- BICARA (H4) + REMEDIAL (H5) ---------- */
function ringHtml(p) {
  const C = 2 * Math.PI * 62, col = p >= PASS ? 'var(--color-success)' : p >= 60 ? 'var(--color-medium)' : 'var(--color-poor)';
  return `<div class="ring" role="img" aria-label="Skor keseluruhan ${p} persen"><svg viewBox="0 0 140 140"><circle class="bg" cx="70" cy="70" r="62"/><circle class="fg" cx="70" cy="70" r="62" stroke="${col}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - p / 100)}"/></svg><div class="score">${p}%<small>Skor keseluruhan</small></div></div>`;
}
const animRing = box => requestAnimationFrame(() => requestAnimationFrame(() => box.querySelectorAll('.ring .fg').forEach(c => c.style.strokeDashoffset = c.dataset.off)));
function micState(btn, lbl, st, extra) {
  btn.classList.toggle('rec', st === 'rec'); btn.classList.toggle('busy', st === 'busy');
  btn.innerHTML = ico(st === 'rec' ? 'stop' : 'mic');
  btn.setAttribute('aria-label', st === 'rec' ? 'Selesai bicara' : 'Mulai bicara');
  lbl.textContent = extra;
}
async function viewBicara() {
  const b = book();
  if (!b) { $('#view').innerHTML = emptyState('mic', 'Belum ada latihan bicara', 'Pilih kalimat dari buku untuk mulai melatih pengucapan.', 'Buka buku', "setTab('rak')"); return; }
  const pages = await pagesOf(b);
  const sents = secParas(pages[b.pos], b.lang).flatMap(P => P.sents.filter(x => x.i >= 0).map(x => x.s.trim()));
  b.si = Math.max(0, Math.min(b.si || 0, sents.length - 1)); save();
  const sent = sents[b.si] || '';
  let wi = 0; const words = [];
  const tHtml = tokens(sent, b.lang).map(t => { if (!t.w) return esc(t.t); words.push(t.t); return `<span class="t" data-i="${wi++}">${esc(t.t)}</span>`; }).join('');
  $('#ttl').innerHTML = `${ico('logo')}<span>Latihan bicara</span>`; progress(sents.length ? (b.si + 1) / sents.length * 100 : 0);
  $('#view').innerHTML = `
    ${SR || TEST ? '' : `<div class="note">${ico('info')}<div>${micError('nosupport')}</div></div>`}
    <div class="card">
      <div class="eyebrow center">Kalimat ${b.si + 1} dari ${sents.length}</div>
      <div class="target" id="target" lang="${esc(b.lang)}">${tHtml}</div>
      <div class="hint">Dengarkan contoh, lalu bacakan kalimat ini.</div>
      <div class="aux"><button class="ghost" id="ex">${ico('vol')} Dengarkan contoh</button><button class="ghost" id="exs">${ico('slow')} Pelan</button></div>
      <div class="micwrap"><button class="mic" id="rec" aria-label="Mulai bicara">${ico('mic')}</button><div class="mic-lbl" id="recl" aria-live="polite">Ketuk untuk bicara</div></div>
      <div class="hint" id="rech">Bacalah dengan kecepatan yang nyaman.</div>
      <div class="heard" id="heard"></div>
      <div id="res"></div>
    </div>
    <div id="remed"></div>
    <div class="pager"><button class="icon" id="sp" aria-label="Kalimat sebelumnya">${ico('left')}</button><span>${b.si + 1}/${sents.length}</span><button id="sn">Kalimat berikutnya ${ico('right')}</button></div>`;
  $('#ex').onclick = () => speak(sent, b.lang, 0.85);
  $('#exs').onclick = () => speak(sent, b.lang, 0.55);
  $('#sp').onclick = () => { if (b.si > 0) b.si--; else if (b.pos > 0) { b.pos--; b.si = 1e9; } else return; save(); viewBicara(); };
  $('#sn').onclick = () => { if (b.si < sents.length - 1) b.si++; else if (b.pos < pages.length - 1) { b.pos++; b.si = 0; } else return toast('Ini kalimat terakhir buku. Hebat!'); save(); viewBicara(); };
  const btn = $('#rec'), lbl = $('#recl');
  let timer;
  btn.onclick = async () => {
    if (btn.classList.contains('rec')) return stopListen();
    vib(15); if ('speechSynthesis' in window) speechSynthesis.cancel();
    const t0 = Date.now();
    micState(btn, lbl, 'rec', 'Sedang mendengarkan · 0:00');
    timer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); lbl.textContent = `Sedang mendengarkan · 0:${String(s).padStart(2, '0')}`; }, 500);
    $('#rech').textContent = 'Ketuk lagi kalau sudah selesai.';
    $('#heard').textContent = ''; $('#res').innerHTML = ''; $('#remed').innerHTML = '';
    $$('#target .t').forEach(el => { el.className = 't'; delete el.dataset.p; });
    let cands;
    try { cands = await listen(b.lang, { onInterim: t => $('#heard').textContent = '“' + t + '”' }); }
    catch (e) { clearInterval(timer); micState(btn, lbl, 'idle', 'Ketuk untuk bicara'); $('#rech').textContent = ''; return toast(micError(e), 6000); }
    clearInterval(timer);
    micState(btn, lbl, 'busy', 'Menilai pengucapan…');
    if (!cands.length) { micState(btn, lbl, 'idle', 'Coba lagi'); $('#rech').textContent = ''; $('#heard').textContent = 'Suara belum tertangkap. Coba bicara lebih dekat ke mikrofon.'; return; }
    markDay();
    $('#heard').textContent = 'Terdengar: “' + cands[0] + '”';
    const sc = scoreSentence(words.map(norm), cands, b.lang);
    $$('#target .t').forEach((el, i) => setTimeout(() => { el.dataset.p = sc[i]; el.className = 't ' + cls(sc[i]); }, i * 50));
    const avg = Math.round(sc.reduce((a, c) => a + c, 0) / (sc.length || 1));
    db.scores.push(avg); db.scores = db.scores.slice(-100); save();
    words.forEach((w, i) => recordWeak(w, b.lang, sc[i]));
    micState(btn, lbl, 'idle', 'Coba lagi'); $('#rech').textContent = '';
    const [k, label, msg] = SCORE(avg);
    $('#res').innerHTML = `<div class="result"><div class="eyebrow">Hasil pengucapan</div>${ringHtml(avg)}<span class="chip ${k}">${label}</span><div class="sm">${msg}</div><div class="mut sm">${sc.filter(x => x >= PASS).length} dari ${sc.length} kata sudah tepat</div></div>`;
    animRing($('#res')); vib(avg >= PASS ? [10, 40, 10] : 20);
    const worst = words.map((w, i) => ({ w, p: sc[i] })).filter(x => x.p < PASS && norm(x.w))
      .sort((a, c) => a.p - c.p).filter((x, i, a) => a.findIndex(y => norm(y.w) === norm(x.w)) === i).slice(0, 5);
    if (!worst.length) { $('#remed').innerHTML = `<div class="card center"><div class="done-ic">${ico('check')}</div><h3>Semua kata sudah tepat</h3><div class="mut sm">Lanjut ke kalimat berikutnya.</div></div>`; return; }
    $('#remed').innerHTML = `<div class="card"><h3>Latih kata yang sulit</h3><div class="mut sm">Ada ${worst.length} kata yang bisa dilatih lagi.</div>
      <div class="chips">${worst.map(x => chip(x.p, x.w)).join('')}</div>
      <div class="row"><button class="pri" id="goRem">${ico('redo')} Latih ${worst.length} kata</button></div></div>`;
    $('#goRem').onclick = () => remedial(worst, b.lang, $('#remed'), () => {
      $('#remed').innerHTML = `<div class="card center"><div class="done-ic">${ico('check')}</div><h3>Pengucapanmu sudah mencapai target</h3><div class="mut sm">Sekarang coba ucapkan kalimatnya utuh.</div><div class="row"><button class="pri" id="again">${ico('mic')} Ucapkan kalimat lagi</button></div></div>`;
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
      <div class="eyebrow center lbl">Latihan kata ${i + 1} dari ${list.length} · Target ${PASS}%</div>
      <div class="rem-word" lang="${esc(lang)}">${esc(x.w)}</div>
      <div class="tr sent center" id="rtr" style="margin:4px 0"></div>
      <div class="aux"><button class="ghost" id="rl">${ico('vol')} Dengarkan contoh</button><button class="ghost" id="rs">${ico('slow')} Pelan</button></div>
      <div class="rem-score" id="rsc"><span class="eyebrow">Skor sebelumnya</span><b>${x.p}%</b><span class="sm">${x.p < 60 ? 'Kita coba perlahan.' : 'Sedikit lagi.'}</span></div>
      <div class="micwrap"><button class="mic" id="rr" aria-label="Ucapkan kata ini">${ico('mic')}</button><div class="mic-lbl" id="rrl" aria-live="polite">Ucapkan kata ini</div></div>
      <div class="hint" id="rh">Tidak perlu terburu-buru. Kamu bisa mendengarkan ulang.</div>
      <div class="row"><button class="ghost" id="rk">Lewati dulu ${ico('right')}</button></div></div>`;
    translate(x.w, lang, db.my).then(r => { if ($('#rtr')) $('#rtr').textContent = r.text; }).catch(() => { });
    $('#rl').onclick = () => speak(x.w, lang, 0.8);
    $('#rs').onclick = () => speak(x.w, lang, 0.45);
    $('#rk').onclick = () => { i++; tries = 0; step(); };
    $('#rr').onclick = async () => {
      const bt = $('#rr'), l = $('#rrl'); if (bt.classList.contains('rec')) return stopListen();
      vib(15); micState(bt, l, 'rec', 'Sedang mendengarkan'); $('#rh').textContent = '';
      let c;
      try { c = await listen(lang, { single: true, onInterim: t => { if ($('#rh')) $('#rh').textContent = '“' + t + '”'; } }); }
      catch (e) { micState(bt, l, 'idle', 'Ucapkan kata ini'); return toast(micError(e), 6000); }
      tries++;
      const p = c.length ? scoreWord(x.w, c, lang) : 0;
      recordWeak(x.w, lang, p);
      micState(bt, l, 'idle', p >= PASS ? 'Tercapai' : 'Coba lagi');
      const [k] = SCORE(p);
      $('#rsc').innerHTML = `<span class="eyebrow">Skor terbaru</span><b style="color:var(--color-${k === 'g' ? 'success' : k === 'm' ? 'medium' : 'poor'})">${p}%</b><span class="sm">${p >= PASS ? 'Pengucapanmu sudah mencapai target.' : p >= 60 ? 'Sudah cukup dekat. Coba perhatikan bunyinya.' : 'Coba dengarkan versi pelan, lalu ucapkan lagi.'}</span>`;
      $('#rh').textContent = c.length ? 'Terdengar: “' + c[0] + '”' : 'Suara belum tertangkap. Coba lebih dekat ke mikrofon.';
      box.querySelector('.lbl').textContent = `Latihan kata ${i + 1} dari ${list.length} · Percobaan ${tries}`;
      if (p >= PASS) { vib([10, 40, 10]); passed[i] = 1; setTimeout(() => { i++; tries = 0; step(); }, 1100); }
      else if (tries >= 3) { $('#rh').textContent = 'Sudah 3 kali dicoba. Istirahat sebentar atau lewati dulu — kata ini tersimpan di daftar Sulit diucapkan.'; }
      else if (p < 60) speak(x.w, lang, 0.6);
    };
  };
  step();
}

/* ---------- KATA (H6) ---------- */
let kataSeg = 'simpan', kataQ = '';
function viewKata() {
  const weakAll = Object.values(db.weak).filter(o => o.last < PASS).sort((a, b) => a.last - b.last);
  const q = kataQ.toLowerCase();
  const vocab = db.vocab.map((v, i) => ({ ...v, i })).filter(v => !q || (v.w + ' ' + v.t).toLowerCase().includes(q));
  const weak = weakAll.filter(o => !q || o.w.toLowerCase().includes(q)).slice(0, 40);
  $('#view').innerHTML = `
    <div class="hello"><h1>Kata</h1></div>
    <div class="sum"><div><b>${db.vocab.length}</b><span>Tersimpan</span></div><div><b>${weakAll.length}</b><span>Perlu latihan</span></div></div>
    <div class="seg" id="kseg"><button data-v="simpan" class="${kataSeg === 'simpan' ? 'on' : ''}">Tersimpan</button><button data-v="sulit" class="${kataSeg === 'sulit' ? 'on' : ''}">Sulit diucapkan</button></div>
    <div class="search">${ico('search')}<input id="kq" type="search" placeholder="Cari kata…" value="${esc(kataQ)}" aria-label="Cari kata"></div>
    <div id="kbody"></div>`;
  $$('#kseg button').forEach(x => x.onclick = () => { kataSeg = x.dataset.v; viewKata(); });
  $('#kq').oninput = e => { kataQ = e.target.value; const pos = e.target.selectionStart; viewKata(); const n = $('#kq'); n.focus(); n.setSelectionRange(pos, pos); };
  const kb = $('#kbody');
  if (kataSeg === 'simpan') {
    kb.innerHTML = vocab.length ? vocab.map(v => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(v.lang)}">${esc(v.w)}</div><div class="t1">${v.pos ? `<span class="mut">${esc(POS[v.pos] || v.pos)} · </span>` : ''}${esc(v.t)}</div><div class="s1">${esc(v.s || '')}</div></div>
      <button class="icon" data-sp="${v.i}" aria-label="Dengarkan">${ico('vol')}</button><button class="icon" data-dv="${v.i}" aria-label="Hapus kata">${ico('x')}</button></div>`).join('')
      : q ? `<div class="empty"><div class="mut sm">Tidak ada kata yang cocok.</div></div>` : emptyState('bookmark', 'Belum ada kata tersimpan', 'Ketuk kata saat membaca, lalu simpan untuk dipelajari lagi.', 'Mulai membaca', "setTab('baca')");
    $$('[data-sp]').forEach(el => el.onclick = () => { const v = db.vocab[+el.dataset.sp]; speak(v.w, v.lang, 0.8); });
    $$('[data-dv]').forEach(el => el.onclick = () => { db.vocab.splice(+el.dataset.dv, 1); save(); viewKata(); });
  } else {
    kb.innerHTML = weak.length ? `<div id="kbox"></div><div id="klist">${weak.map(o => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(o.lang)}">${esc(o.w)}</div><div class="s1">${langName(o.lang)} · dicoba ${o.n}×</div></div>${chip(o.last)}</div>`).join('')}
      <div class="row"><button class="pri" id="kRem">${ico('redo')} Latih ${Math.min(weak.length, 10)} kata</button></div></div>`
      : q ? `<div class="empty"><div class="mut sm">Tidak ada kata yang cocok.</div></div>` : emptyState('mic', 'Belum ada kata sulit', 'Kata yang skornya di bawah 85% saat latihan akan muncul di sini.', 'Mulai latihan', "setTab('bicara')");
    if ($('#kRem')) $('#kRem').onclick = () => {
      const lang = weak[0].lang, list = weak.filter(o => o.lang === lang).slice(0, 10);
      $('#klist').remove();
      remedial(list.map(o => ({ w: o.w, p: o.last })), lang, $('#kbox'), () => { toast('Latihan selesai. Kerja bagus!'); viewKata(); });
    };
  }
}

/* ---------- mulai ---------- */
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
if ('serviceWorker' in navigator && !TEST && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js');
if ('speechSynthesis' in window) speechSynthesis.getVoices();
setTab(db.tab && (db.tab === 'rak' || db.cur) ? db.tab : 'rak');
