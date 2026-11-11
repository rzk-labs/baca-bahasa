'use strict';
/* KEPO v6 — fun tapi profesional (krem, blok warna, maskot doodle). Maskot, XP/level, lencana, konfeti, kartu swipe. Logika teks/suara/skor ada di app.js. */
db.font = db.font || 'serif'; db.days = db.days || []; db.scores = db.scores || []; db.lh = db.lh || 1.7; db.mg = db.mg || 'm'; db.focus = !!db.focus;
db.xp = db.xp || 0; db.xpDay = db.xpDay || {}; db.badges = db.badges || []; if (db.sfx == null) db.sfx = true;
db.stat = Object.assign({ look: 0, save: 0, page: 0, speak: 0, perfect: 0, rem: 0, flash: 0 }, db.stat || {});
if (!db.v6) { db.v6 = 1; db.theme = 'light'; } db.theme = db.theme || 'light';
const GOAL = 30;
const FEEDBACK_KONTAK = ''; /* isi tautan WhatsApp (https://wa.me/...) atau mailto: tim kalau sudah ada; kosong = hanya bagikan/salin */

/* ---------- ikon ---------- */
const BM = '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>';
const ICONS = {
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  mic: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
  cards: '<rect x="3" y="6" width="13" height="16" rx="2.5"/><path d="M8 2h10.5A2.5 2.5 0 0 1 21 4.5V17"/>',
  bmplus: BM + '<path d="M12 7v6M15 10H9"/>', bmcheck: BM + '<path d="m9 10 2 2 4-4"/>',
  vol: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  slow: '<path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"/><circle cx="10" cy="13" r="8"/><path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"/><path d="M18 3 19.1 5.2M22 3 20.9 5.2"/>'
};
const ico = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

/* ---------- maskot Kepo: gelembung chat lime (ilustrasi ChatGPT, konsep A) ---------- */
const MOODS = ['curious', 'happy', 'cheer', 'wow', 'sad', 'icon'];
function mascot(mood = 'curious', cls = '') {
  if (!MOODS.includes(mood)) mood = 'curious';
  return `<img class="mascot ${cls}" src="img/kepo-${mood}.webp" alt="" draggable="false" decoding="async">`;
}

/* ---------- utilitas ---------- */
const vib = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { } };
const today = () => new Date().toISOString().slice(0, 10);
function markDay() { const d = today(); if (!db.days.includes(d)) { db.days.push(d); db.days = db.days.slice(-400); save(); } }
function streak() { let n = 0; const d = new Date(); if (!db.days.includes(today())) d.setDate(d.getDate() - 1); for (; ;) { if (db.days.includes(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); } else return n; } }
function hue(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
const EMO = ['📖', '🌙', '🚀', '🦊', '🌊', '🍜', '🎧', '🌸', '⚡', '🐉', '🎮', '🍓'];
const CCOL = ['#D4E94B', '#C9BFFF', '#FFB8DA', '#FF7A59', '#6E8BEA', '#F5CF52', '#BDE8D4', '#FFF6E5'];
function cover(b) { const h = hue(b.title); return `<div class="cover" style="background:${CCOL[h % CCOL.length]}"><span class="em">${EMO[h % EMO.length]}</span><span>${esc(b.title.slice(0, 34))}</span></div>`; }
function applyTheme() {
  document.documentElement.dataset.theme = db.theme;
  const dark = db.theme === 'dark' || (db.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name=theme-color]').content = dark ? '#1A1312' : db.theme === 'sepia' ? '#F4EAD5' : '#F2EEE5';
}
const LANG_ID = { en: 'Inggris', ja: 'Jepang', ko: 'Korea', 'zh-CN': 'Mandarin', fr: 'Prancis', de: 'Jerman', es: 'Spanyol', it: 'Italia', nl: 'Belanda', pt: 'Portugis', ru: 'Rusia', ar: 'Arab', tr: 'Turki', id: 'Indonesia' };
const FLAG = { en: '🇬🇧', ja: '🇯🇵', ko: '🇰🇷', 'zh-CN': '🇨🇳', fr: '🇫🇷', de: '🇩🇪', es: '🇪🇸', it: '🇮🇹', nl: '🇳🇱', pt: '🇵🇹', ru: '🇷🇺', ar: '🇸🇦', tr: '🇹🇷', id: '🇮🇩' };
const langName = l => (FLAG[l] || '') + ' ' + (LANG_ID[l] || (LANGS[l] || [l])[0]);
const pctOf = b => b.pct != null ? b.pct : b.total ? Math.round((b.pos + 1) / b.total * 100) : 0;
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
  const cols = ['#D4E94B', '#C9BFFF', '#FFB8DA', '#FF7A59', '#6E8BEA', '#F5CF52'];
  for (let i = 0; i < n; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + 'vw'; p.style.background = cols[i % cols.length]; p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg'); p.style.animationDelay = Math.random() * .3 + 's'; box.appendChild(p); }
  document.body.appendChild(box); setTimeout(() => box.remove(), 2000);
}
const level = (xp = db.xp) => Math.floor(xp / 100) + 1;
const xpToday = () => db.xpDay[today()] || 0;
const BADGES = [
  ['kepo1', '👀', 'Kepo Pertama', 'Cek arti 1 kata', () => db.stat.look >= 1],
  ['kolektor', '🧺', 'Kolektor', 'Simpan 10 kata', () => db.vocab.length >= 10],
  ['kutubuku', '📚', 'Kutu Buku', 'Balik 20 halaman', () => db.stat.page >= 20],
  ['berani', '🎤', 'Berani Ngomong', 'Selesaikan 1 tantangan', () => db.stat.speak >= 1],
  ['perfect', '💯', 'Sempurna', 'Skor kalimat 95%+', () => db.stat.perfect >= 1],
  ['boss', '⚔️', 'Boss Slayer', 'Kalahin 5 kata sulit', () => db.stat.rem >= 5],
  ['otak', '🧠', 'Otak Encer', 'Hafal 10 kartu', () => db.stat.flash >= 10],
  ['fire3', '🔥', 'On Fire', 'Streak 3 hari', () => streak() >= 3],
  ['fire7', '🌋', 'Seminggu Nonstop', 'Streak 7 hari', () => streak() >= 7],
  ['lv5', '👑', 'Level 5', 'Kumpulkan 400 XP', () => level() >= 5]
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
function award(n, stat) {
  if (stat) db.stat[stat] = (db.stat[stat] || 0) + 1;
  const before = level();
  if (n) {
    db.xp += n; const d = today(); const had = xpToday(); db.xpDay[d] = had + n;
    const keys = Object.keys(db.xpDay).sort(); if (keys.length > 60) delete db.xpDay[keys[0]];
    const f = document.createElement('div'); f.className = 'xpfly' + (isReading() ? ' mini' : ''); f.textContent = `+${n} XP`; document.body.appendChild(f); setTimeout(() => f.remove(), isReading() ? 800 : 1200);
    if (had < GOAL && had + n >= GOAL) setTimeout(() => notifyLater(() => { toast('🎯 Target harian beres! Keren!'); sfx('win'); confetti(50); }), 600);
  }
  markDay(); save(); refreshPills();
  const newB = BADGES.filter(([id, , , , ok]) => !db.badges.includes(id) && ok());
  newB.forEach(([id]) => db.badges.push(id)); if (newB.length) save();
  if (level() > before) setTimeout(() => notifyLater(() => celebrate(`Level ${level()}!`, 'Naik level! Kamu makin jago 🚀', 'lvl')), 700);
  newB.forEach(([, em, name], i) => setTimeout(() => notifyLater(() => { toast(`${em} Lencana baru: ${name}!`); sfx('ding'); }), 1300 + i * 1800));
}
function celebrate(title, msg, snd = 'win') {
  sfx(snd); confetti(90); vib([20, 40, 20]);
  const el = document.createElement('div'); el.className = 'lvlup';
  el.innerHTML = `<div class="card">${mascot('cheer', 'jump')}<h1>${esc(title)}</h1><p class="mut">${esc(msg)}</p><button class="lime full">Lanjut!</button></div>`;
  document.body.appendChild(el); el.querySelector('button').onclick = () => el.remove(); el.onclick = e => { if (e.target === el) el.remove(); };
}
function refreshPills() { const s = $('#pStreak'), x = $('#pXp'); if (s) s.innerHTML = `🔥 ${streak()}`; if (x) x.innerHTML = `⚡ ${db.xp}`; }

/* ---------- kerangka ---------- */
let toastT;
function toast(m, ms = 3200, act) { const t = $('#toast'); t.textContent = m; if (act) { const b = document.createElement('button'); b.className = 'tact'; b.textContent = act.label; b.onclick = () => { t.classList.add('hide'); act.fn(); }; t.append(' · ', b); } t.classList.remove('hide'); t.style.animation = 'none'; void t.offsetWidth; t.style.animation = ''; clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hide'), ms); }
function openSheet(html) { $('#sheetBody').innerHTML = html; $('#sheet').classList.remove('hide'); $('#shade').classList.remove('hide'); $('#sheet').scrollTop = 0; $$('#sheet [data-close]').forEach(b => b.onclick = closeSheet); }
function closeSheet() { if (RD.dy) { RD.dy = 0; const c = $('#cols'); if (c) c.style.transform = `translate(${-RD.page * RD.step}px, 0px)`; } $('#sheet').classList.add('hide'); $('#shade').classList.add('hide'); $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); }
$('#shade').onclick = closeSheet;
addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
const closeBtn = `<button class="icon" data-close aria-label="Tutup">${ico('x')}</button>`;
const langOpts = sel => Object.keys(LANGS).map(k => `<option value="${k}"${k === sel ? ' selected' : ''}>${langName(k)}</option>`).join('');
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
const TABS = { rak: ['home', 'Home'], baca: ['book', 'Baca'], bicara: ['mic', 'Ngomong'], kata: ['cards', 'Kata'] };
$('#tabs').innerHTML = Object.entries(TABS).map(([k, [i, l]]) => `<button data-t="${k}">${ico(i)}<span>${l}</span></button>`).join('');
const BRAND_TTL = `${mascot('icon')}<span>KEEPO</span>`;
function setTab(t) {
  db.tab = t; save(); closeSheet(); stopListen(); document.body.classList.remove('reading');
  $$('#tabs button').forEach(b => { b.classList.toggle('on', b.dataset.t === t); b.setAttribute('aria-current', b.dataset.t === t ? 'page' : 'false'); });
  $('#ttl').innerHTML = BRAND_TTL; progress(null);
  $('#hdx').innerHTML = `<span class="pill fire" id="pStreak" title="Streak hari"></span><span class="pill xp" id="pXp" title="Total XP"></span><span id="acctSlot"></span><button class="icon" id="set" aria-label="Pengaturan">${ico('sliders')}</button>`;
  refreshPills(); $('#set').onclick = openSettings;
  $('#view').style.animation = 'none'; void $('#view').offsetWidth; $('#view').style.animation = '';
  window.scrollTo(0, 0);
  ({ rak: viewRak, baca: viewBaca, bicara: viewBicara, kata: viewKata })[t]();
  if (t === 'rak' && typeof homeWhatsNew === 'function' && !$('#wnHome')) { const w = document.createElement('div'); w.id = 'wnHome'; w.style.marginTop = '12px'; const ben = $('.bento'); if (ben) ben.after(w); else $('#view').appendChild(w); homeWhatsNew(); }
}
$$('#tabs button').forEach(b => b.onclick = () => { vib(5); sfx('pop'); setTab(b.dataset.t); });
const emptyState = (mood, title, msg, btn, act) => `<div class="empty">${mascot(mood, 'bob')}<h2>${title}</h2><div class="mut sm">${msg}</div>${btn ? `<button class="pri" onclick="${act}">${btn}</button>` : ''}</div>`;

/* ---------- pengaturan ---------- */
function voiceRow(lang) {
  const p = LANGS[lang][1].toLowerCase().slice(0, 2), cur = db.voices && db.voices[lang];
  const vs = speechSynthesis.getVoices().filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(p));
  if (!vs.length) return '';
  return `<div class="set-row"><div class="eyebrow">Suara baca cerita ini</div><select id="vsel"><option value="">Otomatis</option>${vs.map(v => `<option value="${esc(v.voiceURI)}"${v.voiceURI === cur ? ' selected' : ''}>${esc(v.name)}</option>`).join('')}</select></div>`;
}
function openSettings() {
  const b = book();
  const th = [['light', 'Terang'], ['sepia', 'Sepia'], ['dark', 'Gelap'], ['auto', 'Ikut HP']];
  const sw = { auto: 'linear-gradient(180deg,#F2EEE5 58%,#1A1312 58%)', light: '#F2EEE5', sepia: '#F4EAD5', dark: '#1A1312' };
  const ink = { auto: '#2A1215', light: '#2A1215', sepia: '#2E2216', dark: '#FFF6E5' };
  openSheet(`<div class="sh-head"><h2>Pengaturan</h2>${closeBtn}</div>
    <div class="set-row"><div class="eyebrow">Tema</div><div class="swatch" id="thm">${th.map(([k, l]) => `<button data-v="${k}" class="${db.theme === k ? 'on' : ''}" style="background:${sw[k]};color:${ink[k]}"><span>Aa</span><small${k === 'auto' ? ' style="color:#FFF6E5"' : ''}>${l}</small></button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Ukuran huruf baca</div><div class="stepper"><button id="fsm" aria-label="Perkecil huruf">A−</button><b id="fsv">${db.fs} px</b><button id="fsp" aria-label="Perbesar huruf">A+</button></div></div>
    <div class="set-row"><div class="eyebrow">Huruf baca</div><div class="seg" id="fnt"><button data-v="serif" class="${db.font === 'serif' ? 'on' : ''}" style="font-family:var(--font-reader)">Klasik</button><button data-v="sans" class="${db.font === 'sans' ? 'on' : ''}">Modern</button></div></div>
    <div class="set-row"><div class="eyebrow">Jarak baris</div><div class="seg" id="lhs">${[1.5, 1.7, 1.9].map(v => `<button data-v="${v}" class="${db.lh === v ? 'on' : ''}">${v}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Margin halaman</div><div class="seg" id="mgs">${[['s', 'Sempit'], ['m', 'Sedang'], ['l', 'Lebar']].map(([k, l]) => `<button data-v="${k}" class="${db.mg === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Fokus baris</div><div class="seg" id="fcs"><button data-v="0" class="${db.focus ? '' : 'on'}">Mati</button><button data-v="1" class="${db.focus ? 'on' : ''}">Nyala</button></div></div>
    <div class="set-row"><div class="eyebrow">Efek suara</div><div class="seg" id="sfxs"><button data-v="1" class="${db.sfx ? 'on' : ''}">🔊 Nyala</button><button data-v="0" class="${db.sfx ? '' : 'on'}">🔇 Mati</button></div></div>
    ${b ? `<div class="set-row"><div class="eyebrow">Bahasa cerita ini</div><select id="blang">${langOpts(b.lang)}</select></div>` : ''}
    ${b && 'speechSynthesis' in window ? voiceRow(b.lang) : ''}
    <div class="set-row"><div class="eyebrow">Artiin ke</div><select id="mylang">${langOpts(db.my)}</select></div>
    ${document.body.classList.contains('reading') ? '' : '<button class="sec full fb-open" id="fbSet">Kirim masukan 💬</button>'}
    <button class="ghost full" id="rst">Balikin setelan awal</button>`);
  if ($('#vsel')) $('#vsel').onchange = e => { db.voices = db.voices || {}; if (e.target.value) db.voices[b.lang] = e.target.value; else delete db.voices[b.lang]; save(); speak(b.lang === 'ja' ? 'こんにちは' : 'Hello', b.lang); };
  if ($('#fbSet')) $('#fbSet').onclick = openFeedback;
  const relayout = () => { const p = $('#cols'); if (p) { p.style.fontSize = db.fs + 'px'; $('#reader').style.setProperty('--reader-lh', db.lh); $('#reader').style.setProperty('--reader-mg', (MG[db.mg] || 24) + 'px'); layout(); } };
  const setFs = v => { db.fs = Math.max(16, Math.min(28, v)); save(); $('#fsv').textContent = db.fs + ' px'; relayout(); };
  $('#fsm').onclick = () => setFs(db.fs - 1); $('#fsp').onclick = () => setFs(db.fs + 1);
  $$('#thm button').forEach(x => x.onclick = () => { db.theme = x.dataset.v; save(); applyTheme(); $$('#thm button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#fnt button').forEach(x => x.onclick = () => { db.font = x.dataset.v; save(); $$('#fnt button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) { r.classList.toggle('serif', db.font === 'serif'); layout(); } });
  $$('#lhs button').forEach(x => x.onclick = () => { db.lh = +x.dataset.v; save(); $$('#lhs button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $$('#mgs button').forEach(x => x.onclick = () => { db.mg = x.dataset.v; save(); $$('#mgs button').forEach(y => y.classList.toggle('on', y === x)); relayout(); });
  $$('#fcs button').forEach(x => x.onclick = () => { db.focus = x.dataset.v === '1'; save(); $$('#fcs button').forEach(y => y.classList.toggle('on', y === x)); const r = $('#reader'); if (r) { r.classList.toggle('focus', db.focus); $$('.cols .cur').forEach(e => e.classList.remove('cur')); const c = $('#cols'); if (c) c.classList.remove('has-cur'); } });
  $$('#sfxs button').forEach(x => x.onclick = () => { db.sfx = x.dataset.v === '1'; save(); $$('#sfxs button').forEach(y => y.classList.toggle('on', y === x)); sfx('ding'); });
  $('#rst').onclick = () => { db.fs = 19; db.lh = 1.7; db.mg = 'm'; db.focus = false; db.font = 'serif'; db.theme = 'light'; save(); applyTheme(); closeSheet(); if (document.body.classList.contains('reading')) viewBaca(); toast('Setelan dibalikin ke awal.'); };
  if ($('#blang')) $('#blang').onchange = e => { b.lang = e.target.value; save(); cache.id = null; trCache.clear(); closeSheet(); setTab(db.tab); };
  $('#mylang').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
}

/* ---------- kirim masukan (tahap 1: tanpa server) ---------- */
const APP_VER = 'v46';
function openFeedback() {
  if (document.body.classList.contains('reading')) return;
  const kinds = [['rusak', '🐞', 'Ada yang rusak'], ['ide', '💡', 'Ide'], ['suka', '❤️', 'Suka']];
  let kind = 'ide', stars = 0;
  openSheet(`<div class="sh-head"><h2>Kirim masukan</h2>${closeBtn}</div>
    <div class="seg fb-kind" id="fbK">${kinds.map(([k, e, l]) => `<button data-v="${k}" class="${k === kind ? 'on' : ''}"><span>${e}</span> ${l}</button>`).join('')}</div>
    <label class="fb-l">Ceritain aja
      <textarea id="fbT" maxlength="500" rows="5" placeholder="Apa yang bikin kamu kesel, kepikiran, atau seneng?"></textarea></label>
    <div class="mut sm fb-cnt"><span id="fbC">0</span>/500</div>
    <div class="eyebrow">Nilai app (boleh dilewati)</div>
    <div class="fb-stars" id="fbS">${[1, 2, 3, 4, 5].map(n => `<button data-n="${n}" aria-label="${n} bintang">★</button>`).join('')}</div>
    <label class="fb-chk"><input type="checkbox" id="fbI"><span>Sertakan info HP (browser, ukuran layar, versi app)</span></label>
    <div class="mut sm">Yang kamu tulis dibaca tim Keepo.</div>
    <button class="pri full" id="fbSend" style="margin-top:12px">Kirim</button>`);
  $$('#fbK button').forEach(x => x.onclick = () => { kind = x.dataset.v; $$('#fbK button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#fbS button').forEach(x => x.onclick = () => { const n = +x.dataset.n; stars = stars === n ? 0 : n; $$('#fbS button').forEach(y => y.classList.toggle('on', +y.dataset.n <= stars)); });
  $('#fbT').oninput = e => { $('#fbC').textContent = e.target.value.length; };
  $('#fbSend').onclick = async () => {
    const txt = $('#fbT').value.trim().slice(0, 500);
    if (!txt) { toast('Tulis dulu ya, sedikit aja cukup.'); $('#fbT').focus(); return; }
    const kl = kinds.find(k => k[0] === kind);
    let msg = `[Keepo] ${kl[1]} ${kl[2]}\n${txt}`;
    if (stars) msg += `\nBintang: ${stars}/5`;
    if ($('#fbI').checked) msg += `\nInfo HP: ${navigator.userAgent} · layar ${screen.width}x${screen.height} · app ${APP_VER}`;
    try { await putFeedback({ id: Date.now() + '-' + Math.random().toString(36).slice(2, 6), t: Date.now(), kind, stars, text: txt, msg }); } catch (e) { }
    const copy = async () => { try { await navigator.clipboard.writeText(msg); toast('Tersalin! Tempel ke pesan buat tim Keepo.', 4500); } catch (e) { toast('Gagal menyalin. Salinan tersimpan di HP-mu.', 4500); } };
    closeSheet();
    if (/^(https?:|mailto:)/.test(FEEDBACK_KONTAK)) {
      await copy();
      const m = FEEDBACK_KONTAK.startsWith('mailto:');
      const link = m ? FEEDBACK_KONTAK + '?subject=' + encodeURIComponent('Masukan Keepo') + '&body=' + encodeURIComponent(msg) : FEEDBACK_KONTAK + (FEEDBACK_KONTAK.includes('wa.me') ? '?text=' + encodeURIComponent(msg) : '');
      window.open(link, '_blank', 'noopener'); return;
    }
    if (navigator.share) { try { await navigator.share({ text: msg }); toast('Makasih masukannya! 💚'); return; } catch (e) { if (e && e.name === 'AbortError') { toast('Dibatalin. Salinan tersimpan di HP-mu.'); return; } } }
    await copy();
  };
}

/* ---------- HOME ---------- */
function ringSmall(p, label) {
  const C = 2 * Math.PI * 24;
  return `<div class="ring"><svg viewBox="0 0 56 56"><circle class="bg" cx="28" cy="28" r="24"/><circle class="fg" cx="28" cy="28" r="24" stroke="#2A1215" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - Math.min(1, p))}"/><defs><linearGradient id="gl"><stop offset="0" stop-color="#C6FF3D"/><stop offset="1" stop-color="#3DDCFF"/></linearGradient></defs></svg><div class="score">${label}</div></div>`;
}
function viewRak() {
  const list = db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0));
  const cur = book() || list[0];
  const sc = db.scores.slice(-20), avg = sc.length ? Math.round(sc.reduce((a, c) => a + c, 0) / sc.length) + '%' : '—';
  const xt = xpToday(), lv = level(), inLv = db.xp % 100;
  const h = new Date().getHours(), hi = h < 11 ? 'Pagi' : h < 15 ? 'Siang' : h < 19 ? 'Sore' : 'Malam';
  const lines = [`${hi}! Mau kepoin apa hari ini? 👀`, 'Satu halaman aja udah keren kok ✨', 'Yuk, kepoin kata baru! 🔍', 'Bahasa baru, vibes baru 🚀'];
  const line = lines[(new Date().getDate() + db.books.length) % lines.length];
  const addCard = `<div class="card">
      <div class="langs"><label>Bahasa cerita<select id="bl">${langOpts(db.lastLang)}</select></label><label>Artiin ke<select id="ml">${langOpts(db.my)}</select></label></div>
      <div class="add-grid"><button class="main" id="up"><span class="em">📤</span>Upload file</button><button id="paste"><span class="em">📋</span>Tempel teks</button><button id="sample"><span class="em">✨</span>Cerita contoh</button></div>
      <div class="mut sm center" style="margin-top:10px">TXT · EPUB · PDF (yang ada teksnya)</div>
    </div>`;
  if (!cur) {
    $('#view').innerHTML = `<h1 class="big">Kepoin<br>bahasa <span class="hl-txt">baru.</span></h1>
      <div class="hello-sub">${mascot('cheer', 'bob')}<div class="mut">Halo, aku KEEPO! Aku bantu kamu jago bahasa asing lewat cerita yang kamu suka.</div></div>
      <div class="steps3"><div class="t-pink"><b>1</b>Masukin cerita favoritmu</div><div class="t-lav"><b>2</b>Ketuk kata yang bikin bingung</div><div class="t-lime"><b>3</b>Ngomongin kalimatnya, dapet skor & XP</div></div>
      <div class="sec-h"><h2>Mulai dari sini</h2></div>${addCard}`;
  } else {
    const BCOL = ['t-lime', 't-lav', 't-pink', 't-sun', 't-mint', 't-coral', 't-blue', 't-cream', 't-lav', 't-lime'];
    $('#view').innerHTML = `
    <h1 class="big">${hi === 'Pagi' ? 'Pagi' : hi === 'Siang' ? 'Siang' : hi === 'Sore' ? 'Sore' : 'Malam'},<br><span class="circle-txt">kepoin</span> apa?</h1>
    <div class="mut sm" style="margin:-4px 0 8px">${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
    <div class="hello-sub">${mascot('curious', 'bob')}<div class="mut">${line}</div></div>
    <div class="bento">
      <div class="tile t-pink wide" id="hero"><div class="hero">${cover(cur)}<div class="inf"><div class="eyebrow">Lanjut baca</div><div class="t">${esc(cur.title)}</div><div class="sm">${langName(cur.lang)} · ${pctOf(cur)}% kelar</div><div class="sm hero-pos" id="heroPos">${heroPos(cur)}</div><div class="bar" style="margin-top:12px"><i style="width:${pctOf(cur)}%"></i></div></div></div>
        <div class="hero-act"><button class="pri" id="hRead">Gas baca →</button></div></div>
      <div class="tile t-lav"><div class="eyebrow">Level</div><div class="num">${lv}</div><div class="lbl2">${inLv}/100 XP</div><div class="bar" style="margin-top:10px"><i style="width:${inLv}%"></i></div></div>
      <div class="tile t-lime"><div class="eyebrow">Target harian</div><div class="goal-row" style="margin-top:6px">${ringSmall(xt / GOAL, `${Math.min(xt, GOAL)}`)}<div class="lbl2">${xt >= GOAL ? 'Beres! 🎉' : `${GOAL - xt} XP lagi`}</div></div></div>
      <div class="tile t-sun"><div class="eyebrow">Streak</div><div class="num">🔥${streak()}</div><div class="lbl2">hari berturut-turut</div></div>
      <div class="tile t-mint"><div class="eyebrow">Skor ngomong</div><div class="num">${avg}</div><div class="lbl2">${db.vocab.length} kata disimpan</div></div>
      <div class="tile t-cream wide chal" id="hSpeak">${mascot('happy')}<div style="flex:1"><div class="eyebrow">Tantangan hari ini</div><b>Ngomongin 1 kalimat, dapet XP</b></div><span style="font:800 28px var(--font-display)">→</span></div>
    </div>
    <div class="sec-h"><h2>Lencana</h2><span class="mut sm">${db.badges.length}/${BADGES.length} kebuka</span></div>
    <div class="hscroll">${BADGES.map(([id, em, name, desc], i) => `<div class="badge ${BCOL[i]}${db.badges.includes(id) ? '' : ' off'}" title="${esc(desc)}"><span class="em">${em}</span><b>${name}</b><span class="d">${desc}</span></div>`).join('')}</div>
    <div class="sec-h"><h2>Koleksi kamu</h2><span class="mut sm">${list.length} cerita</span></div>
    <div class="hscroll">${list.map(b => `<div class="bk" data-open="${b.id}">${cover(b)}<div class="t">${esc(b.title)}</div><div class="m">${langName(b.lang)} · ${pctOf(b)}%</div>
      <button class="del" data-del="${b.id}" aria-label="Hapus cerita">${ico('trash')}</button></div>`).join('')}</div>
    <div class="sec-h"><h2>Tambah cerita</h2></div>${addCard}`;
    const open = t => { db.cur = cur.id; save(); setTab(t); };
    $('#hero').onclick = () => open('baca'); $('#hRead').onclick = e => { e.stopPropagation(); open('baca'); }; $('#hSpeak').onclick = () => open('bicara');
    animRing($('#view'));
    heroMins(cur);
  }
  { const fl = document.createElement('div'); fl.className = 'fb-link'; fl.innerHTML = '<button class="ghost" id="fbHome">Kirim masukan 💬</button>'; $('#view').appendChild(fl); $('#fbHome').onclick = openFeedback; }
  $('#bl').onchange = e => { db.lastLang = e.target.value; save(); };
  $('#ml').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
  $('#up').onclick = () => $('#file').click();
  $('#sample').onclick = () => {
    openSheet(`<div class="sh-head"><h2>Cerita contoh</h2>${closeBtn}</div><div class="mut sm">Pilih bahasa ceritanya</div>
      <div class="sample-pick">${Object.keys(SAMPLES).map(l => `<button class="sec" data-sl="${l}"><span class="em">${FLAG[l]}</span>${LANG_ID[l]}<span class="mut sm">${esc(SAMPLES[l].title.replace(' (contoh)', ''))}</span></button>`).join('')}</div>`);
    $$('[data-sl]').forEach(el => el.onclick = () => {
      const l = el.dataset.sl, S = SAMPLES[l], ex = db.books.find(b => b.lang === l && b.title === S.title);
      closeSheet();
      if (ex) { ex.opened = Date.now(); db.cur = ex.id; save(); setTab('baca'); return; }
      addBook(S.title, cleanParas(S.text), l);
    });
  };
  $('#paste').onclick = () => {
    openSheet(`<div class="sh-head"><h2>Tempel teks</h2>${closeBtn}</div><div class="mut sm">Bahasa: <b>${langName(db.lastLang)}</b> · ganti di Home</div>
      <label class="eyebrow" style="display:block;margin-top:16px">Judul<input id="pt" placeholder="Contoh: Lirik favorit, cerpen, artikel"></label>
      <label class="eyebrow" style="display:block;margin-top:12px">Teks<textarea id="px" placeholder="Tempel teks bahasa asing di sini…"></textarea></label>
      <div class="row"><button class="sec" data-close>Batal</button><button class="pri" id="ps">Masukin ✨</button></div>`);
    $('#ps').onclick = () => { const x = $('#px').value.trim(); if (!x) return toast('Teksnya masih kosong nih.'); closeSheet(); addBook($('#pt').value.trim() || x.slice(0, 30) + '…', cleanParas(x), db.lastLang); };
  };
  $$('[data-open]').forEach(el => el.onclick = () => { db.cur = el.dataset.open; save(); setTab('baca'); });
  $$('[data-del]').forEach(el => el.onclick = async e => {
    e.stopPropagation();
    if (!el.classList.contains('sure')) { el.classList.add('sure'); el.textContent = 'Hapus?'; setTimeout(() => { if (el.isConnected) { el.classList.remove('sure'); el.innerHTML = ico('trash'); } }, 3000); return; }
    const id = el.dataset.del; db.books = db.books.filter(b => b.id !== id); if (db.cur === id) db.cur = null; save(); await delText(id); toast('Cerita dihapus.'); viewRak();
  });
}
$('#file').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  if (!/\.(txt|epub|pdf)$/i.test(f.name)) return toast('Format ini belum bisa. Pakai TXT, EPUB, atau PDF ya.', 5000);
  if (f.size > 50 * 1024 * 1024) return toast('File-nya kegedean (maks 50 MB).', 5000);
  toast('Lagi nyiapin cerita… ⏳', 60000);
  try { const r = await parseFile(f); if (!r.paras.length) throw new Error('kosong'); await addBook(r.title, r.paras, db.lastLang); }
  catch (err) { console.error(err); toast(/scan|gambar|kosong/.test(err.message) ? 'PDF ini isinya gambar/scan, teksnya nggak kebaca.' : /internet|pustaka/.test(err.message) || (!navigator.onLine && /\.(epub|pdf)$/i.test(f.name)) ? 'Impor EPUB/PDF butuh internet sekali dulu. Sambungkan, lalu coba lagi.' : 'File ini nggak bisa dibuka. Coba file lain ya.', 6000); }
};
async function addBook(title, paras, lang) {
  const id = 'b' + Date.now().toString(36);
  await putText(id, paras);
  db.books.push({ id, title, lang, pos: 0, si: 0, total: 0, v: 2, added: Date.now(), opened: Date.now() });
  const prevCur = db.cur;
  db.cur = id;
  if (!save()) { db.books = db.books.filter(b => b.id !== id); db.cur = prevCur; try { await delText(id); } catch (e) { } return; }
  toast('Cerita masuk koleksi! 🎉'); sfx('ding'); setTab('baca');
}

/* ---------- BACA (e-reader) ---------- */
const SESS = { id: null, t: 0 };
function finishBook(b) {
  if (b.doneAt) return;
  b.doneAt = Date.now(); save();
  setTimeout(() => flushLate(true), 2500);
  const ws = db.vocab.filter(v => v.book === b.title && v.lang === b.lang && (v.at || 0) >= SESS.t);
  const list = ws.slice(0, 8).map(v => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(v.lang)}">${esc(v.w)}</div><div class="t1">${v.t ? esc(v.t) : '<i>belum ada arti</i>'}</div></div></div>`).join('');
  sfx('win'); confetti(60);
  openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Tamat 📚</span>${closeBtn}</div>
    <h2>${ws.length ? `${ws.length} kata baru dari "${esc(b.title)}"` : 'Tamat! Keren banget 🎉'}</h2>
    ${ws.length ? list + (ws.length > 8 ? `<p class="mut sm">+${ws.length - 8} kata lainnya ada di tab Kata.</p>` : '') : '<p class="mut">Kamu udah sampai akhir. Lain kali, simpan kata yang bikin penasaran biar bisa dilatih ya.</p>'}
    <div class="row" style="gap:8px;margin-top:12px">${ws.length ? '<button class="pri" id="fbl">Latih di Kata</button>' : ''}<button class="ghost" data-close style="min-height:44px">Tutup</button></div>`);
  const l = $('#fbl'); if (l) l.onclick = () => { closeSheet(); setTab('kata'); };
}
async function viewBaca() {
  const b = book();
  if (!b) { $('#view').innerHTML = emptyState('curious', 'Belum ada cerita', 'Masukin cerita dulu yuk, terus kepoin kata-katanya.', 'Tambah cerita', "setTab('rak')"); return; }
  b.opened = Date.now(); if (SESS.id !== b.id) { SESS.id = b.id; SESS.t = Date.now(); } save();
  const secs = await pagesOf(b);
  b.pos = Math.max(0, Math.min(b.pos, secs.length - 1));
  document.body.classList.add('reading');
  const sp = secParas(secs[b.pos], b.lang);
  const head = sp.find(P => P.h);
  const chTitle = head ? head.sents.map(x => x.s).join('').trim() : b.title;
  const savedSet = new Set(db.vocab.filter(v => v.lang === b.lang && !v.known).map(v => v.w.toLowerCase()));
  const wordsHtml = s => tokens(s, b.lang).map(t => t.w ? `<span class="w${savedSet.has(t.t.toLowerCase()) ? ' saved' : ''}">${esc(t.t)}</span>` : esc(t.t)).join('');
  const html = sp.map(P => {
    const inner = P.sents.map(({ s, i }) => i < 0 ? esc(s) : `<span class="s" data-s="${i}">${wordsHtml(s)}</span>`).join('');
    return P.h ? `<h2 class="ch">${inner}</h2>` : `<p>${inner}</p>`;
  }).join('');
  $('#view').innerHTML = `
    <div class="reader${RD.quiet ? '' : ' chrome'}${db.font === 'serif' ? ' serif' : ''}${db.focus ? ' focus' : ''}" id="reader" lang="${esc(b.lang)}" style="--reader-lh:${db.lh};--reader-mg:${MG[db.mg] || 24}px">
      <div class="rbar"><button class="icon" id="rHome" aria-label="Kembali ke Home">${ico('left')}</button>
        <div class="rtitle"><b>${esc(b.title)}</b>${secs.length > 1 ? `<button class="rchap" id="rChap" aria-haspopup="dialog" aria-label="Daftar bab, sekarang bab ${b.pos + 1} dari ${secs.length}">Bab ${b.pos + 1} dari ${secs.length} ▾</button><span> ⚡ ${xpToday()} XP hari ini</span>` : `<span>⚡ ${xpToday()} XP hari ini</span>`}</div>
        <button class="icon" id="rSpeak" aria-label="Tantangan ngomong">${ico('mic')}</button><button class="icon" id="set" aria-label="Pengaturan">${ico('sliders')}</button></div>
      <div class="rhead">${esc(chTitle)}</div>
      <div class="vp" id="vp"><div class="page cols" id="cols" style="font-size:${db.fs}px">${html}</div></div>
      <div class="rfoot"><button class="pg" id="pv" aria-label="Halaman sebelumnya">${ico('left')}</button>
        <div class="rmid"><span id="pgn"></span><div class="bar"><i id="pbar"></i></div></div>
        <button class="pg" id="nx" aria-label="Halaman berikutnya">${ico('right')}</button></div>
      ${db.seenTip ? '' : `<div class="rtip" id="tip" role="note"><div>👆 <b>Ketuk kata</b> = langsung tau artinya<br>✋ <b>Tahan kalimat</b> = arti langsung<br>👉 <b>Geser</b> = ganti halaman<br>☰ <b>Ketuk tengah</b> = menu</div><button id="tipx" aria-label="Tutup petunjuk">${ico('x')}</button></div>`}
    </div>`;
  if ($('#tipx')) $('#tipx').onclick = () => { db.seenTip = true; save(); $('#tip').remove(); };
  $('#rHome').onclick = () => setTab('rak');
  $('#rSpeak').onclick = () => setTab('bicara');
  $('#set').onclick = openSettings;
  if ($('#rChap')) $('#rChap').onclick = () => {
    const items = secs.map((s, i) => {
      const h = secParas(s, b.lang).find(P => P.h);
      const t = h ? h.sents.map(x => x.s).join('').trim() : '';
      return `<button class="chi${i === b.pos ? ' on' : ''}" data-ch="${i}"${i === b.pos ? ' aria-current="true"' : ''}><em>${i + 1}</em><span>${esc(t || 'Bab ' + (i + 1))}</span>${i === b.pos ? '<b>Sekarang</b>' : ''}</button>`;
    }).join('');
    openSheet(`<div class="grab"></div><div class="sh-head"><span class="stepchip">Daftar bab 📖</span>${closeBtn}</div><div class="chlist">${items}</div>`);
    $$('#sheet .chi').forEach(x => x.onclick = () => { const i = +x.dataset.ch; closeSheet(); if (i !== b.pos) { b.pos = i; b.si = 0; RD.quiet = true; save(); viewBaca(); } });
    const cur = $('#sheet .chi.on'); if (cur) cur.scrollIntoView({ block: 'center' });
  };
  $('#pv').onclick = () => turn(-1); $('#nx').onclick = () => turn(1);
  const vp = $('#vp'); let tx = null, moved = false;
  let lpT, lpT2, lpEl = null, lpDone = false;
  const lpStop = () => { clearTimeout(lpT); clearTimeout(lpT2); lpT = 0; if (lpEl) { lpEl.classList.remove('press'); lpEl = null; } };
  vp.addEventListener('touchstart', e => {
    const t = e.touches[0]; tx = [t.clientX, t.clientY]; moved = false; lpDone = false; lpStop(); setCur(e.target);
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
  });
  vp.onclick = e => {
    if (moved) { moved = false; return; }
    setCur(e.target);
    const w = e.target.closest('.w'); if (w) { vib(8); sfx('pop'); onWord(w); return; }
    const r = vp.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
    if (x < 0.25) turn(-1); else if (x > 0.75) turn(1); else $('#reader').classList.toggle('chrome');
  };
  RD.quiet = false;
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if ($('#cols')) layout(); });
}
const MG = { s: 12, m: 24, l: 48 };
const setCur = el => { const c = $('#cols'), r = $('#reader'), p = el && el.closest ? el.closest('p,h2') : null; if (!c || !r || !r.classList.contains('focus') || !p) return; $$('.cols .cur').forEach(x => x !== p && x.classList.remove('cur')); p.classList.add('cur'); c.classList.add('has-cur'); };
const RD = { ss: [], hs: [], dy: 0, page: 0, n: 1, step: 1, toEnd: false, quiet: false };
function layout() {
  const vp = $('#vp'), cols = $('#cols'); if (!vp || !cols) return;
  const b = book(), W = vp.clientWidth, H = vp.clientHeight;
  const G = 64, per = W >= 900 && (W - G) / 2 >= 360 ? 2 : 1, cw = (W - (per - 1) * G) / per;
  vp.classList.toggle('two', per === 2);
  Object.assign(cols.style, { height: H + 'px', width: W + 'px', columnWidth: cw + 'px', columnGap: G + 'px', transition: 'none', transform: 'none' });
  const total = Math.max(1, Math.round((cols.scrollWidth + G) / (cw + G)));
  RD.step = W + G; RD.n = Math.max(1, Math.ceil(total / per));
  /* cache halaman tiap kalimat/judul sekali per layout, supaya geser halaman tidak mengukur ulang */
  RD.ss = [...cols.querySelectorAll('.s')].map(el => ({ el, pg: pageOf(el, cols) }));
  RD.hs = [...cols.querySelectorAll('h2.ch')].map(el => ({ el, pg: pageOf(el, cols) }));
  let p = 0;
  if (RD.toEnd) p = RD.n - 1;
  else if (b.si) { const el = cols.querySelector(`.s[data-s="${b.si}"]`); if (el) p = pageOf(el, cols); }
  RD.toEnd = false; RD.dy = 0;
  showPage(p, false);
}
function pageOf(el, cols) { const r = el.getClientRects()[0] || el.getBoundingClientRect(); return Math.max(0, Math.min(RD.n - 1, Math.floor((r.left - cols.getBoundingClientRect().left + 2) / RD.step))); }
/* sisa waktu baca dari jumlah kata/huruf teks tersimpan (tanpa ukur layar).
   Latin ~150 kata/mnt; Jepang/Korea/Mandarin ~250 huruf/mnt. Total per bab dihitung sekali per buku. */
const unitsOf = (t, lang) => {
  t = t.replace(/\u0001/g, '');
  return /^(ja|ko|zh)/.test(lang) ? t.replace(/\s/g, '').length / 250 : (t.trim() ? t.trim().split(/\s+/).length : 0) / 150;
};
/* kartu 'Lanjut baca' di Beranda: posisi + sisa menit (nomor halaman asli baru ada setelah layout, jadi pakai bab) */
function heroPos(b, mins, part) {
  const where = (b.total || 1) > 1 ? `Bab ${(b.pos || 0) + 1} dari ${b.total}` : `Lanjut dari ${pctOf(b)}%`;
  return esc(where + (mins ? ` · sisa ${mins}` : '')) + (part ? '<span class="mnote">bab lain belum dihitung</span>' : '');
}
/* teks sisa waktu jujur: ada bab belum terhitung → '≥N mnt' (batas bawah), kalau 0 → '—'; tidak pernah 'kurang dari 1 menit' */
function fmtMins(m, part) {
  const n = Math.ceil(m - 1e-9);
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
    if (!el || db.cur !== b.id) return;
    el.innerHTML = heroPos(b, fmtMins(m, part), part);
  } catch (e) {}
}
function minsLeft(b) {
  const secs = cache.id === b.id && cache.pages;
  if (!secs || !secs[b.pos] || !(RD.n > 0)) return null;
  if (RD.chk !== secs || RD.chl !== b.lang) { RD.chk = secs; RD.chl = b.lang; RD.chu = secs.map(s => s.reduce((a, p) => a + unitsOf(p, b.lang), 0)); }
  let m = RD.chu[b.pos] * (RD.n - RD.page) / RD.n;
  for (let i = b.pos + 1; i < secs.length; i++) m += RD.chu[i];
  const part = unseen(b, secs);
  return { t: fmtMins(m, part), part };
}
function showPage(p, anim = true) {
  const cols = $('#cols'), b = book(); if (!cols) return;
  RD.page = Math.max(0, Math.min(RD.n - 1, p));
  cols.style.transition = anim ? '' : 'none';
  cols.style.transform = `translate(${-RD.page * RD.step}px, ${RD.dy || 0}px)`;
  for (const x of RD.ss) { if (x.pg >= RD.page) { b.si = +x.el.dataset.s; break; } }
  let hd = null; for (const h of RD.hs) { if (h.pg <= RD.page) hd = h.el; else break; }
  if (hd) $('.rhead').textContent = hd.textContent.trim();
  b.pct = Math.round((b.pos + (RD.page + 1) / RD.n) / (b.total || 1) * 100); save();
  const ml = minsLeft(b);
  $('#pgn').innerHTML = ml && ml.t ? `Hal ${RD.page + 1}/${RD.n} · Sisa ${ml.t}` + (ml.part ? '<span class="mnote">bab lain belum dihitung</span>' : '') : `Hal ${RD.page + 1} dari ${RD.n}`;
  $('#pbar').style.width = b.pct + '%';
  $('#pv').disabled = RD.page === 0 && b.pos === 0;
  $('#nx').disabled = RD.page === RD.n - 1 && b.pos >= (b.total || 1) - 1;
  if ($('#nx').disabled && !RD.quiet && !b.doneAt) setTimeout(() => { if (document.body.classList.contains('reading') && RD.page === RD.n - 1) finishBook(b); }, 600);
}
function turn(d) {
  const b = book(); closeSheet();
  const np = RD.page + d;
  if (np >= 0 && np < RD.n) { vib(4); showPage(np); $('#reader').classList.remove('chrome'); if (d > 0) award(2, 'page'); return; }
  if (d > 0 && b.pos < b.total - 1) { b.pos++; b.si = 0; RD.quiet = true; save(); award(5, 'page'); viewBaca(); }
  else if (d < 0 && b.pos > 0) { b.pos--; b.si = 0; RD.toEnd = true; RD.quiet = true; save(); viewBaca(); }
  else if (d > 0) { finishBook(b); }
  else toast('Ini halaman pertama.');
}
let rsT; addEventListener('resize', () => { clearTimeout(rsT); rsT = setTimeout(() => { if (document.body.classList.contains('reading')) layout(); }, 150); });
addEventListener('keydown', e => { if (!document.body.classList.contains('reading') || !$('#sheet').classList.contains('hide') || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); turn(1); } if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); turn(-1); } });

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
async function onWord(el) {
  const b = book();
  $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
  el.classList.add('sel');
  const sEl = el.closest('.s'), sent = sEl.textContent.trim(), sIdx = +sEl.dataset.s;
  const ws = [...sEl.querySelectorAll('.w')], MAXW = 5;
  let lo = ws.indexOf(el), hi = lo, word = el.textContent, tr = null, tok = 0;
  const phraseOf = () => { const r = document.createRange(); r.setStartBefore(ws[lo]); r.setEndAfter(ws[hi]); return r.toString().replace(/\s+/g, ' ').trim(); };
  const isSaved = () => db.vocab.some(v => v.w.toLowerCase() === word.toLowerCase() && v.lang === b.lang);
  const saveLbl = () => isSaved() ? `${ico('bmcheck')} Tersimpan` : `${ico('bmplus')} Simpan`;
  openSheet(`
    <div class="sh-head"><span class="stepchip">1/2 · Arti kata</span>${closeBtn}</div>
    <div class="wd"><b id="wword">${esc(word)}</b><button class="icon tint" id="sw" aria-label="Dengerin kata">${ico('vol')}</button><button class="icon tint" id="wexp" aria-label="Perluas ke kata sebelah" title="Perluas" style="margin-left:auto">${ico('plus')}</button></div>
    <span class="pos" id="wpos"></span>
    <div class="mut sm" id="wbaca"></div>
    <div class="mut sm" id="wbase"></div>
    <div class="tr" id="wtr"><span class="loading">Lagi nyari artinya…</span></div>
    <div class="mut sm" id="wlook"></div>
    <div class="wfreq" id="wfreq"></div>
    <div class="wtap" id="wtap"></div>
    <div class="wsug" id="wsug" hidden></div>
    <div class="dict" id="wdict"></div>
    <div class="row"><button class="sec" id="wsave">${saveLbl()}</button><button class="pri" id="wnext">Masih bingung? 👀</button></div>`);
  const showSug = n => {
    const g = $('#wsug'); if (!g) return;
    const k = b.lang + '|' + word.toLowerCase();
    if (n < 3 || isSaved() || sugSeen.has(k)) { g.hidden = true; g.innerHTML = ''; return; }
    sugSeen.add(k);
    g.innerHTML = `<span>Sudah ${n}× diketuk. Simpan biar gampang diulang?</span><button class="pill-sm" id="wsug-b">Simpan</button>`;
    g.hidden = false;
    $('#wsug-b').onclick = () => { g.hidden = true; g.innerHTML = ''; $('#wsave').click(); };
  };
  const showTap = n => { const t = $('#wtap'); if (t) t.textContent = n >= 1 ? `Diketuk ${n}×` : ''; showSug(n); };
  showTap(countTap(b.lang, word));
  keepVisible('.w.sel');
  $('#sw').onclick = () => speak(word, b.lang, 0.8);
  award(1, 'look');
  const bumpLook = () => { db.looks = db.looks || {}; const k = b.lang + '|' + word.toLowerCase(); const n = db.looks[k] = (db.looks[k] || 0) + 1; save(); const e = $('#wlook'); if (e) e.textContent = n > 1 ? `Udah kamu cek ${n}× 👀` : 'Pertama kali kamu cek kata ini'; };
  const savedOf = () => db.vocab.find(v => v.t && v.lang === b.lang && v.w.toLowerCase() === word.toLowerCase());
  const showSaved = v => {
    $('#wtr').textContent = v.t;
    $('#wbaca').textContent = bacaOf(word, v.baca);
    $('#wbase').textContent = v.base ? 'Bentuk dasar: ' + v.base : '';
    $('#wpos').textContent = v.pos ? (POS[v.pos] || v.pos) : '';
    $('#wdict').innerHTML = '<div class="mut sm">Dari kata tersimpan (offline)</div>';
    keepVisible('.w.sel');
  };
  const load = () => { const my = ++tok; const sv = savedOf(); if (sv) showSaved(sv); return translate(word, b.lang, db.my).then(r => {
    if (my !== tok || !$('#wtr')) return;
    tr = r;
    $('#wtr').textContent = r.text;
    $('#wbaca').textContent = bacaOf(word, r.baca);
    $('#wbase').textContent = r.base ? 'Bentuk dasar: ' + r.base : '';
    const d = r.dict || [];
    $('#wpos').textContent = d.length ? (POS[d[0].pos] || d[0].pos) : '';
    const alt = d.flatMap(x => x.terms.slice(0, 4)).filter(t => t.toLowerCase() !== r.text.toLowerCase()).slice(0, 4);
    $('#wdict').innerHTML = alt.length ? `<div><b>Bisa juga:</b> ${alt.map(esc).join(', ')}</div>` + (d.length > 1 ? `<div>${d.slice(1, 3).map(x => `<b>${esc(POS[x.pos] || x.pos)}:</b> ${x.terms.slice(0, 3).map(esc).join(', ')}`).join(' · ')}</div>` : '') : '';
    setTimeout(() => { if (my === tok && $('#wfreq')) { try { showFreq(word, b); } catch (e) {} keepVisible('.w.sel'); } }, 0);
    keepVisible('.w.sel');
  }).catch(() => { if (my === tok && $('#wtr') && !sv) { $('#wtr').innerHTML = `<span class="loading">Artinya belum kebuka.</span> <button class="ghost" id="wretry">Coba lagi</button>`; $('#wretry').onclick = () => { $('#wtr').innerHTML = '<span class="loading">Lagi nyari artinya…</span>'; load(); }; } }); };
  load(); bumpLook();
  const updExp = () => { const can = hi - lo + 1 < MAXW && (hi < ws.length - 1 || lo > 0); $('#wexp').disabled = !can; $('#wexp').style.opacity = can ? '' : '.35'; };
  updExp();
  $('#wexp').onclick = () => {
    if (hi - lo + 1 >= MAXW) return;
    if (hi < ws.length - 1) hi++; else if (lo > 0) lo--; else return;
    vib(8); sfx('pop');
    ws.forEach((w, i) => w.classList.toggle('sel', i >= lo && i <= hi));
    word = phraseOf(); tr = null;
    $('#wword').textContent = word; $('#wpos').textContent = ''; $('#wbaca').textContent = ''; $('#wbase').textContent = '';
    $('#wdict').innerHTML = ''; $('#wfreq').textContent = ''; showTap(tapsOf(b.lang, word)); $('#wtr').innerHTML = '<span class="loading">Lagi nyari artinya…</span>';
    $('#wsave').innerHTML = saveLbl(); updExp(); load(); bumpLook(); keepVisible('.w.sel');
  };
  $('#wsave').onclick = async () => {
    if (isSaved()) return;
    const sg = $('#wsug'); if (sg) sg.innerHTML = '';
    const w = word, r = tr || await translate(w, b.lang, db.my).catch(() => null);
    const tp = takeTaps(b.lang, w);
    db.vocab.unshift({ ...(tp > 0 ? { tap: tp } : {}), w, t: r ? r.text : '', baca: r ? bacaOf(w, r.baca) : '', ...(r && r.base ? { base: r.base } : {}), ...(r ? {} : { noTr: 1 }), pos: r && r.dict && r.dict[0] ? r.dict[0].pos : '', lang: b.lang, s: sent, ctx: ctxOf({ s: sent }), book: b.title, at: Date.now() }); save(); vib(10); sfx('ding');
    $$('.cols .w').forEach(x => { if (x.textContent.toLowerCase() === w.toLowerCase()) x.classList.add('saved'); });
    $('#wsave').innerHTML = saveLbl(); award(2, 'save'); toast(r ? 'Masuk ke kartu kata kamu ⭐' : 'Lagi offline, arti nyusul ya');
  };
  $('#wnext').onclick = () => showSentence(word, sent, sIdx, sEl);
}
function showSentence(word, sent, sIdx, sEl) {
  const b = book();
  sEl.classList.add('hl');
  const marked = !word ? esc(sent) : esc(sent).replace(new RegExp('(^|[^\\p{L}])(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?=[^\\p{L}]|$)', 'u'), '$1<mark>$2</mark>');
  openSheet(`
    <div class="sh-head">${word ? `<button class="icon" id="sback" aria-label="Balik ke arti kata">${ico('left')}</button>` : ''}<span class="stepchip" style="margin-right:auto">${word ? '2/2 · ' : ''}Arti kalimat</span>${closeBtn}</div>
    <div class="src">${marked}</div>
    <div class="tr sent" id="str"><span class="loading">Lagi nerjemahin kalimat…</span></div>
    <div class="sheet-aux"><button class="ghost" id="ssp">${ico('vol')} Dengerin kalimatnya</button><button class="ghost" id="ssl">${ico('slow')} Pelan</button></div>
    <div class="row"><button class="lime" id="spr">🎤 Coba ngomongin</button></div>
    <div class="row" style="margin-top:10px"><button class="sec" data-close>Lanjut baca</button></div>`);
  keepVisible('.s.hl');
  translate(sent, b.lang, db.my).then(r => { if ($('#str')) { $('#str').textContent = r.text; keepVisible('.s.hl'); } }).catch(() => { if ($('#str')) $('#str').innerHTML = '<span class="loading">Artinya belum kebuka. Coba lagi nanti ya.</span>'; });
  $('#ssp').onclick = () => speak(sent, b.lang);
  $('#ssl').onclick = () => speak(sent, b.lang, 0.6);
  if ($('#sback')) $('#sback').onclick = () => { const el = sEl.querySelector('.w.sel'); if (el) onWord(el); };
  $('#spr').onclick = () => { b.si = sIdx; save(); setTab('bicara'); };
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
    ${SR || TEST ? '' : `<div class="note">⚠️ <div>${micError('nosupport')}</div></div>`}
    <h1 style="margin:6px 2px 12px">Tantangan <span class="hl-txt">ngomong</span></h1>
    <div class="card">
      <div class="eyebrow center">Kalimat ${b.si + 1} dari ${sents.length}</div>
      <div class="target" id="target" lang="${esc(b.lang)}">${tHtml}</div>
      <div class="hint">Dengerin dulu, terus baca kalimatnya keras-keras!</div>
      <div class="aux"><button id="ex">${ico('vol')} Contoh</button><button id="exs">${ico('slow')} Pelan</button></div>
      <div class="micwrap"><button class="mic" id="rec" aria-label="Mulai ngomong">${ico('mic')}</button><div class="mic-lbl" id="recl" aria-live="polite">Tap & ngomong</div></div>
      <div class="hint" id="rech">Santai aja, nggak ada yang denger kok 🤫</div>
      <div class="heard" id="heard"></div>
      <div id="res"></div>
    </div>
    <div id="remed"></div>
    <div class="pager"><button class="icon" id="sp" aria-label="Kalimat sebelumnya">${ico('left')}</button><span>${b.si + 1}/${sents.length}</span><button id="sn">Kalimat berikutnya ${ico('right')}</button></div>`;
  $('#ex').onclick = () => speak(sent, b.lang, 0.85);
  $('#exs').onclick = () => speak(sent, b.lang, 0.55);
  $('#sp').onclick = () => { if (b.si > 0) b.si--; else if (b.pos > 0) { b.pos--; b.si = 1e9; } else return; save(); viewBicara(); };
  $('#sn').onclick = () => { if (b.si < sents.length - 1) b.si++; else if (b.pos < pages.length - 1) { b.pos++; b.si = 0; } else return toast('Ini kalimat terakhir. Kamu keren! 🏁'); save(); viewBicara(); };
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
    $('#res').innerHTML = `<div class="result">${mascot(mood, 'jump')}${ringHtml(avg)}<h2>${label}</h2><div class="sm">${msg}</div><div class="chips" style="justify-content:center"><span class="chip ${k}">${sc.filter(x => x >= PASS).length}/${sc.length} kata pas</span><span class="chip xp">+${gain} XP</span></div></div>`;
    animRing($('#res'));
    if (avg >= PASS) { sfx('win'); confetti(); vib([10, 40, 10]); } else sfx('soft');
    award(gain, 'speak'); if (avg >= 95) award(0, 'perfect');
    const worst = words.map((w, i) => ({ w, p: sc[i] })).filter(x => x.p < PASS && norm(x.w))
      .sort((a, c) => a.p - c.p).filter((x, i, a) => a.findIndex(y => norm(y.w) === norm(x.w)) === i).slice(0, 5);
    if (!worst.length) { $('#remed').innerHTML = `<div class="card center"><div style="font-size:44px">🏆</div><h2>Semua kata pas!</h2><div class="mut sm">Gas ke kalimat berikutnya.</div></div>`; return; }
    $('#remed').innerHTML = `<div class="card"><span class="boss">⚔️ BOSS LEVEL</span><h2 style="margin-top:10px">Kalahin kata tersulit</h2><div class="mut sm">Ada ${worst.length} kata yang masih bandel.</div>
      <div class="chips">${worst.map(x => chip(x.p, x.w)).join('')}</div>
      <div class="row"><button class="pri" id="goRem">⚔️ Lawan ${worst.length} kata</button></div></div>`;
    $('#goRem').onclick = () => remedial(worst, b.lang, $('#remed'), () => {
      $('#remed').innerHTML = `<div class="card center">${mascot('cheer', 'jump')}<h2>Boss kalah! 🎉</h2><div class="mut sm">Sekarang coba ngomongin kalimatnya utuh lagi.</div><div class="row"><button class="lime" id="again">🎤 Ngomong lagi</button></div></div>`;
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
      <div class="center"><span class="boss">⚔️ BOSS ${i + 1}/${list.length}</span></div>
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
      micState(bt, l, 'idle', p >= PASS ? 'Kena! 💥' : 'Coba lagi');
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
let kataSeg = 'kartu', kataQ = '', flipped = false, csvF = 'all', kataSort = 'baru';
const REVIEW_DAYS = [1, 3, 7, 21], DAY_MS = 864e5, DECK_MAX = 20;
let deckDone = 0, deckHint = '';
const isDue = v => !v.known && (v.due || 0) <= Date.now();
function viewKata() {
  let mig = false; db.vocab.forEach(v => { if (v.known && (v.lv || 0) < 4) { v.known = false; v.lv = v.lv || 0; v.due = v.due || 0; mig = true; } }); if (mig) save(); deckDone = 0; deckHint = '';
  const weakAll = Object.values(db.weak).filter(o => o.last < PASS).sort((a, b) => a.last - b.last);
  const known = db.vocab.filter(v => v.known).length;
  $('#view').innerHTML = `
    <h1 style="margin:6px 2px 12px">Kata <span class="circle-txt">kamu</span></h1>
    <div class="sum"><div class="t-lime"><b>${db.vocab.length}</b><span>Disimpan</span></div><div class="t-lav"><b>${known}</b><span>Udah hafal</span></div><div class="t-pink"><b>${weakAll.length}</b><span>Susah diucap</span></div></div>
    <div class="seg" id="kseg"><button data-v="kartu" class="${kataSeg === 'kartu' ? 'on' : ''}">⚡ Kartu</button><button data-v="simpan" class="${kataSeg === 'simpan' ? 'on' : ''}">Tersimpan</button><button data-v="sulit" class="${kataSeg === 'sulit' ? 'on' : ''}">Susah diucap</button></div>
    <div id="kbody"></div>`;
  $$('#kseg button').forEach(x => x.onclick = () => { kataSeg = x.dataset.v; sfx('pop'); viewKata(); });
  const kb = $('#kbody');
  if (kataSeg === 'kartu') return deck(kb);
  kb.innerHTML = `<div class="search">${ico('search')}<input id="kq" type="search" placeholder="Cari kata…" value="${esc(kataQ)}" aria-label="Cari kata"></div><div id="klist"></div>`;
  $('#kq').oninput = e => { kataQ = e.target.value; renderList(); };
  const renderList = () => {
    const q = kataQ.toLowerCase(), kl = $('#klist');
    if (kataSeg === 'simpan') {
      const vocab = db.vocab.map((v, i) => ({ ...v, i })).filter(v => !q || (v.w + ' ' + v.t).toLowerCase().includes(q));
      if (kataSort === 'tap') vocab.sort((a, c) => (+c.tap || 0) - (+a.tap || 0) || a.i - c.i);
      kl.innerHTML = vocab.length ? vocab.map(v => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(v.lang)}">${esc(v.w)} ${v.known ? '✅' : ''}</div>${+v.tap >= 1 ? `<div><span class="tapb">Diketuk ${+v.tap}×</span></div>` : ''}${bacaOf(v.w, v.baca) ? `<div class="mut sm">${esc(bacaOf(v.w, v.baca))}</div>` : ''}<div class="t1">${v.t ? esc(v.t) : '<i>belum ada arti</i>'}</div><div class="s1">${esc(ctxOf(v))}</div>${((db.looks || {})[v.lang + '|' + v.w.toLowerCase()] || 0) > 1 ? `<div class="mut sm">Dicek ${db.looks[v.lang + '|' + v.w.toLowerCase()]}×</div>` : ''}</div>
        <button class="icon" data-sp="${v.i}" aria-label="Dengerin">${ico('vol')}</button><button class="icon vdel" data-dv="${v.i}" aria-label="Hapus kata">${ico('trash')}</button></div>`).join('')
        : q ? `<div class="empty"><div class="mut sm">Nggak ada yang cocok.</div></div>` : emptyState('curious', 'Belum ada kata', 'Pas baca, ketuk kata → Simpan. Nanti muncul di sini.', 'Mulai baca', "setTab('baca')");
      if (db.vocab.length) {
        const langs = [...new Set(db.vocab.map(v => v.lang).filter(Boolean))], books = [...new Set(db.vocab.map(v => v.book).filter(Boolean))];
        if (csvF !== 'all' && !langs.some(l => csvF === 'l:' + l) && !books.some(b => csvF === 'b:' + b)) csvF = 'all';
        const inF = v => csvF === 'all' || (csvF.startsWith('l:') ? v.lang === csvF.slice(2) : v.book === csvF.slice(2));
        const readyN = () => db.vocab.filter(v => inF(v) && !v.noTr && (v.t || '').trim()).length;
        const opt = (val, txt) => `<option value="${esc(val)}"${csvF === val ? ' selected' : ''}>${esc(txt)}</option>`;
        const filt = langs.length + books.length > 2 || langs.length > 1 || books.length > 1
          ? `<select id="kCsvF" aria-label="Pilih kata yang diekspor">${opt('all', 'Semua kata')}${langs.length > 1 ? `<optgroup label="Per bahasa">${langs.map(l => opt('l:' + l, langName(l))).join('')}</optgroup>` : ''}${books.length > 1 ? `<optgroup label="Per buku">${books.map(b => opt('b:' + b, b)).join('')}</optgroup>` : ''}</select>` : '';
        const sortSel =`<select id="kSort" class="csvsort" aria-label="Urutkan kata"><option value="baru"${kataSort === 'baru' ? ' selected' : ''}>Urutan: Terbaru</option><option value="tap"${kataSort === 'tap' ? ' selected' : ''}>Paling sering diketuk</option></select>`;
        kl.insertAdjacentHTML('afterbegin', `<div class="csvbar"><div class="csvcnt"><b>${db.vocab.length}</b> kata</div><button class="csvbtn" id="kCsv">⬇️ Ekspor CSV (${readyN()})</button>${sortSel}${filt}</div>`);
        $('#kSort').onchange = e => { kataSort = e.target.value; renderList(); };
        if ($('#kCsvF')) $('#kCsvF').onchange = e => { csvF = e.target.value; $('#kCsv').textContent = `⬇️ Ekspor CSV (${readyN()})`; };
        $('#kCsv').onclick = async () => {
          const ready = readyN(), list = db.vocab.filter(inF);
          if (!ready) return toast('Belum ada kata yang ada artinya 😅');
          const slug = csvF === 'all' ? '' : '-' + (csvF.startsWith('l:') ? langName(csvF.slice(2)) : csvF.slice(2)).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 30);
          const fn = `kepo-kata${slug === '-' ? '' : slug}.csv`;
          const blob = new Blob([vocabCSV(list)], { type: 'text/csv;charset=utf-8' });
          // iPhone/PWA: unduh lewat <a download> sering diam, jadi menu Bagikan dulu.
          const iosLike = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
          const standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
          let f = null;
          try { f = new File([blob], fn, { type: 'text/csv' }); } catch (e) {}
          if (f && (iosLike || standalone) && navigator.share && navigator.canShare && navigator.canShare({ files: [f] })) {
            try { await navigator.share({ files: [f], title: fn }); return toast('Siap dibagikan ✨'); }
            catch (e) { if (e && e.name === 'AbortError') return toast('Dibatalin, nggak apa-apa 👌'); }
          }
          try {
            const a = document.createElement('a'), u = URL.createObjectURL(blob);
            a.href = u; a.download = fn; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000);
            toast(`${fn} udah diunduh (${ready} kata) ✨`);
          } catch (e) {
            try {
              if (f && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: fn }); toast('Siap dibagikan ✨'); }
              else toast('Perangkat ini belum bisa unduh CSV 😢');
            } catch (e2) { if (e2 && e2.name !== 'AbortError') toast('Gagal ekspor, coba lagi ya'); }
          }
        };
      }
      $$('[data-sp]').forEach(el => el.onclick = () => { const v = db.vocab[+el.dataset.sp]; speak(v.w, v.lang, 0.8); });
      $$('[data-dv]').forEach(el => el.onclick = () => {
        const i = +el.dataset.dv, [gone] = db.vocab.splice(i, 1); save(); renderList();
        toast('Kata dihapus', 6000, { label: 'Urungkan', fn: () => { if (!db.vocab.includes(gone)) db.vocab.splice(Math.min(i, db.vocab.length), 0, gone); save(); if (kataSeg === 'simpan' && $('#klist')) viewKata(); } });
      });
    } else {
      const weak = weakAll.filter(o => !q || o.w.toLowerCase().includes(q)).slice(0, 40);
      kl.innerHTML = weak.length ? `<div id="kbox"></div><div id="kwl">${weak.map(o => `<div class="vitem"><div class="inf"><div class="w1" lang="${esc(o.lang)}">${esc(o.w)}</div><div class="s1">${langName(o.lang)} · dicoba ${o.n}×</div></div>${chip(o.last)}</div>`).join('')}
        <div class="row"><button class="pri" id="kRem">⚔️ Lawan ${Math.min(weak.length, 10)} kata</button></div></div>`
        : q ? `<div class="empty"><div class="mut sm">Nggak ada yang cocok.</div></div>` : emptyState('happy', 'Aman, belum ada!', 'Kata yang skornya di bawah 85% pas tantangan bakal muncul di sini.', 'Mulai tantangan', "setTab('bicara')");
      if ($('#kRem')) $('#kRem').onclick = () => {
        const lang = weak[0].lang, list = weak.filter(o => o.lang === lang).slice(0, 10);
        $('#kwl').remove();
        remedial(list.map(o => ({ w: o.w, p: o.last })), lang, $('#kbox'), () => { celebrate('Boss kalah!', 'Semua kata sulit udah kamu lawan 💪'); viewKata(); });
      };
    }
  };
  renderList();
  if (db.vocab.some(x => x.noTr)) refillVocab().then(ok => { if (ok && $('#klist') && kataSeg === 'simpan') renderList(); });
}
function deck(kb) {
  if (db.vocab.some(x => x.noTr)) refillVocab().then(ok => { if (ok && kb.isConnected && $('#card')) deck(kb); });
  const cards = db.vocab.filter(isDue).sort((a, b) => (a.due || 0) - (b.due || 0)).slice(0, Math.max(0, DECK_MAX - deckDone));
  if (!cards.length) {
    const dues = db.vocab.filter(v => !v.known && v.due > Date.now()).map(v => v.due), nd = dues.length ? Math.max(1, Math.ceil((Math.min(...dues) - Date.now()) / DAY_MS)) : 0, left = db.vocab.some(isDue);
    kb.innerHTML = db.vocab.length ? emptyState('cheer', left ? 'Sesi hari ini beres 🎉' : 'Semua beres, balik besok ya 🎉', left ? 'Sisa kartu muncul lagi pas kamu balik nanti.' : nd ? `Kartu berikutnya muncul ${nd} hari lagi. Simpan kata baru pas baca buat nambah kartu.` : 'Keren banget, semua kata udah hafal. Simpan kata baru pas baca buat nambah kartu.', 'Lanjut baca', "setTab('baca')") : emptyState('curious', 'Belum ada kartu', 'Pas baca, ketuk kata → Simpan. Kata itu jadi kartu hafalan di sini.', 'Mulai baca', "setTab('baca')"); return; }
  const v = cards[0], next = cards[1]; flipped = false;
  kb.innerHTML = `<div class="deck">${next ? `<div class="flash under"><div class="fw" style="color:var(--color-text-muted)">${esc(next.w)}</div></div>` : ''}
      <div class="flash" id="card"><span class="stamp yes">HAFAL</span><span class="stamp no">BELUM</span>
        <div class="eyebrow">${langName(v.lang)} · ${cards.length} kartu${(v.lv || 0) > 0 ? ' <span class="recheck">Cek ulang</span>' : ''}</div>
        <div class="fw" lang="${esc(v.lang)}">${esc(v.w)}</div><div id="back" class="hide"><div class="ft">${esc(v.t)}</div>${bacaOf(v.w, v.baca) ? `<div class="fb" lang="${esc(v.lang)}" style="overflow-wrap:anywhere">${esc(bacaOf(v.w, v.baca))}</div>` : ''}${baseOf(v.w, v.base) ? `<div class="fbase">Bentuk dasar: <b lang="${esc(v.lang)}">${esc(baseOf(v.w, v.base))}</b></div>` : ''}<div class="fs" style="margin-top:8px">${esc(ctxOf(v))}</div></div>
        <div class="tap" id="tapl">Tap buat liat artinya 👆</div></div></div>
    <div class="deck-act"><button class="no" id="fNo">✕ Belum</button><button class="icon tint" id="fSp" aria-label="Dengerin">${ico('vol')}</button><button class="yes" id="fYes">✓ Hafal</button></div>
    <div class="mut sm center" style="margin-top:12px">${deckHint ? esc(deckHint) : 'Geser kanan = hafal · geser kiri = belum'}</div>`;
  const card = $('#card');
  const flip = () => { flipped = !flipped; $('#back').classList.toggle('hide', !flipped); $('#tapl').classList.toggle('hide', flipped); sfx('pop'); };
  const decide = ok => {
    card.style.transform = `translateX(${ok ? 140 : -140}%) rotate(${ok ? 18 : -18}deg)`; card.style.opacity = '0';
    deckDone++;
    if (ok) { const lv = v.lv || 0; if (lv >= REVIEW_DAYS.length) { v.known = true; v.due = 0; deckHint = 'Kata ini udah hafal beneran 🎉'; } else { const d = REVIEW_DAYS[lv]; v.lv = lv + 1; v.due = Date.now() + d * DAY_MS; v.known = false; deckHint = `Muncul lagi ${d} hari lagi`; } save(); sfx('ding'); award(2, 'flash'); } else { v.lv = 0; v.due = Date.now(); v.known = false; deckHint = ''; save(); sfx('soft'); }
    setTimeout(() => deck(kb), 280);
  };
  $('#fYes').onclick = () => decide(true); $('#fNo').onclick = () => decide(false); $('#fSp').onclick = () => speak(v.w, v.lang, 0.8);
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
window.addEventListener('online', () => { refillVocab().then(ok => { if (ok) toast('Arti kata udah keisi ✨'); }); });
setTab(db.tab && (db.tab === 'rak' || db.cur) ? db.tab : 'rak');
