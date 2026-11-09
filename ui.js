'use strict';
/* Tampilan Baca Bahasa (v2, modern). Logika ada di app.js. */
db.theme = db.theme || 'auto'; db.font = db.font || 'serif'; db.days = db.days || []; db.scores = db.scores || [];

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  vol: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  up: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  paste: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>', type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  slow: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', redo: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'
};
const ico = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24">${ICONS[n]}</svg>`;
const vib = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { } };
const today = () => new Date().toISOString().slice(0, 10);
function markDay() { const d = today(); if (!db.days.includes(d)) { db.days.push(d); db.days = db.days.slice(-400); save(); } }
function streak() { let n = 0; const d = new Date(); if (!db.days.includes(today())) d.setDate(d.getDate() - 1); for (; ;) { if (db.days.includes(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); } else return n; } }
function hue(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
function cover(b, big) { const h = hue(b.title); const ini = b.title.replace(/[^\p{L}\p{N} ]/gu, '').split(/\s+/).filter(Boolean).slice(0, 2).map(w => [...w][0]).join('').toUpperCase() || '?'; return `<div class="cover${big ? ' big' : ''}" style="background:linear-gradient(150deg,hsl(${h} 70% 58%),hsl(${(h + 40) % 360} 65% 42%))">${esc(ini)}</div>`; }
function applyTheme() { document.documentElement.dataset.theme = db.theme; const dark = db.theme === 'dark' || (db.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches); document.querySelector('meta[name=theme-color]').content = dark ? '#0f1020' : db.theme === 'sepia' ? '#f3ead8' : '#f5f6fb'; }
const langName = l => (LANGS[l] || [l])[0];
const pctOf = b => b.total ? Math.round((b.pos + 1) / b.total * 100) : 0;
const progress = p => { $('#prog').innerHTML = p == null ? '' : `<i style="width:${p}%"></i>`; };

/* ---------- kerangka ---------- */
let toastT;
function toast(m, ms = 2600) { const t = $('#toast'); t.textContent = m; t.classList.remove('hide'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hide'), ms); }
function openSheet(html) { $('#sheetBody').innerHTML = html; $('#sheet').classList.remove('hide'); $('#shade').classList.remove('hide'); $('#sheet').scrollTop = 0; }
function closeSheet() { $('#sheet').classList.add('hide'); $('#shade').classList.add('hide'); $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl')); }
$('#shade').onclick = closeSheet;
const langOpts = sel => Object.entries(LANGS).map(([k, v]) => `<option value="${k}"${k === sel ? ' selected' : ''}>${v[0]}</option>`).join('');
const book = () => db.books.find(b => b.id === db.cur);
let cache = { id: null, pages: null };
async function pagesOf(b) {
  if (cache.id !== b.id) { const paras = await getText(b.id); cache = { id: b.id, pages: paginate(paras || ['(teks hilang)'], b.lang) }; b.total = cache.pages.length; save(); }
  return cache.pages;
}
const TABS = { rak: ['home', 'Beranda'], baca: ['book', 'Baca'], bicara: ['mic', 'Bicara'], kata: ['star', 'Kata'] };
$('#tabs').innerHTML = Object.entries(TABS).map(([k, [i, l]]) => `<button data-t="${k}">${ico(i)}<span>${l}</span></button>`).join('');
function setTab(t) {
  db.tab = t; save(); closeSheet(); stopListen();
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  $('#hdx').innerHTML = ''; $('#ttl').textContent = 'Baca Bahasa'; progress(null);
  $('#view').style.animation = 'none'; void $('#view').offsetWidth; $('#view').style.animation = '';
  window.scrollTo(0, 0);
  ({ rak: viewRak, baca: viewBaca, bicara: viewBicara, kata: viewKata })[t]();
}
$$('#tabs button').forEach(b => b.onclick = () => { vib(5); setTab(b.dataset.t); });
const emptyNeedBook = (emoji, msg) => `<div class="empty"><span class="big-emoji">${emoji}</span>${msg}<div class="row" style="max-width:260px;margin:16px auto 0"><button class="pri" onclick="setTab('rak')">Pilih buku</button></div></div>`;

/* ---------- pengaturan tampilan ---------- */
function openSettings() {
  const b = book();
  openSheet(`<h3>Tampilan baca</h3>
    <div class="set-row"><div class="eyebrow">Ukuran huruf · <span id="fsv">${db.fs}px</span></div><input type="range" id="fs" min="14" max="32" step="1" value="${db.fs}"></div>
    <div class="set-row"><div class="eyebrow">Tema</div><div class="seg" id="thm">${[['auto', 'Otomatis'], ['light', 'Terang'], ['sepia', 'Sepia'], ['dark', 'Gelap']].map(([k, l]) => `<button data-v="${k}" class="${db.theme === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
    <div class="set-row"><div class="eyebrow">Jenis huruf</div><div class="seg" id="fnt"><button data-v="serif" class="${db.font === 'serif' ? 'on' : ''}" style="font-family:Georgia,serif">Klasik</button><button data-v="sans" class="${db.font === 'sans' ? 'on' : ''}">Modern</button></div></div>
    ${b ? `<div class="set-row"><div class="eyebrow">Bahasa buku ini</div><select id="blang">${langOpts(b.lang)}</select></div>` : ''}
    <div class="set-row"><div class="eyebrow">Artikan ke</div><select id="mylang">${langOpts(db.my)}</select></div>
    <button class="pri big" style="width:100%" onclick="closeSheet()">Selesai</button>`);
  $('#fs').oninput = e => { db.fs = +e.target.value; save(); $('#fsv').textContent = db.fs + 'px'; const p = $('.page'); if (p) p.style.fontSize = db.fs + 'px'; };
  $$('#thm button').forEach(x => x.onclick = () => { db.theme = x.dataset.v; save(); applyTheme(); $$('#thm button').forEach(y => y.classList.toggle('on', y === x)); });
  $$('#fnt button').forEach(x => x.onclick = () => { db.font = x.dataset.v; save(); $$('#fnt button').forEach(y => y.classList.toggle('on', y === x)); const p = $('.page'); if (p) p.classList.toggle('serif', db.font === 'serif'); });
  if ($('#blang')) $('#blang').onchange = e => { b.lang = e.target.value; save(); cache.id = null; trCache.clear(); closeSheet(); setTab(db.tab); };
  $('#mylang').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
}

/* ---------- BERANDA ---------- */
function viewRak() {
  const list = db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0));
  const cur = book() || list[0];
  const sc = db.scores.slice(-20), avg = sc.length ? Math.round(sc.reduce((a, c) => a + c, 0) / sc.length) + '%' : '–';
  const st = streak(), h = new Date().getHours();
  const greet = h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 19 ? 'Selamat sore' : 'Selamat malam';
  $('#hdx').innerHTML = `<button class="icon aa" id="set" aria-label="Pengaturan">Aa</button>`;
  $('#set').onclick = openSettings;
  $('#view').innerHTML = `
  <div class="hello"><div><div class="mut sm">${greet} 👋</div><h2>Mau baca apa hari ini?</h2></div><div class="streak" title="Hari berturut-turut">🔥 ${st}</div></div>
  ${cur ? `<div class="hero" id="hero">${cover(cur, true)}<div class="hinfo"><div class="eyebrow">Lanjutkan membaca</div><div class="htitle">${esc(cur.title)}</div>
    <div class="hmeta">${langName(cur.lang)} · hlm ${cur.pos + 1}/${cur.total || '?'}</div><div class="bar light"><i style="width:${pctOf(cur)}%"></i></div>
    <div class="hbtns"><button id="hRead">${ico('book')} Baca</button><button id="hSpeak">${ico('mic')} Bicara</button></div></div></div>` : ''}
  <div class="stats"><div><b>${db.books.length}</b><span>Buku</span></div><div><b>${db.vocab.length}</b><span>Kata disimpan</span></div><div><b>${avg}</b><span>Skor ucapan</span></div></div>
  <div class="card">
    <h3>Tambah buku</h3>
    <div class="langs"><label>Bahasa buku<select id="bl">${langOpts(db.lastLang)}</select></label><span class="arr">→</span><label>Artikan ke<select id="ml">${langOpts(db.my)}</select></label></div>
    <button class="drop" id="up">${ico('up')}<b>Upload buku</b><span>.txt · .epub · .pdf (bukan hasil scan)</span></button>
    <div class="row"><button class="ghost" id="paste">${ico('paste')} Tempel teks</button><button class="ghost" id="sample">${ico('spark')} Buku contoh</button></div>
  </div>
  <div class="sec-h"><h3>Rak buku</h3><span class="mut sm">${list.length} buku</span></div>
  ${list.length ? `<div class="shelf">${list.map(b => `<div class="bk" data-open="${b.id}">${cover(b)}<div class="inf"><div class="t">${esc(b.title)}</div>
      <div class="mut sm">${langName(b.lang)} · ${pctOf(b)}%</div><div class="bar"><i style="width:${pctOf(b)}%"></i></div></div>
      <button class="del" data-del="${b.id}" aria-label="Hapus">${ico('trash')}</button></div>`).join('')}</div>`
      : `<div class="empty"><span class="big-emoji">📚</span>Rak masih kosong.<br>Upload buku atau coba <b>Buku contoh</b>.</div>`}`;
  if (cur) {
    const open = t => { db.cur = cur.id; save(); setTab(t); };
    $('#hero').onclick = () => open('baca');
    $('#hRead').onclick = e => { e.stopPropagation(); open('baca'); };
    $('#hSpeak').onclick = e => { e.stopPropagation(); open('bicara'); };
  }
  $('#bl').onchange = e => { db.lastLang = e.target.value; save(); };
  $('#ml').onchange = e => { db.my = e.target.value; save(); trCache.clear(); };
  $('#up').onclick = () => $('#file').click();
  $('#sample').onclick = () => addBook('The Lighthouse Keeper (contoh)', cleanParas(SAMPLE), 'en');
  $('#paste').onclick = () => {
    openSheet(`<h3>Tempel teks</h3><div class="mut sm" style="margin:4px 0 12px">Bahasa: <b>${langName(db.lastLang)}</b> (ubah di Beranda)</div>
      <input id="pt" placeholder="Judul (boleh kosong)"><div style="height:10px"></div>
      <textarea id="px" rows="9" placeholder="Tempel teks bahasa asing di sini…"></textarea>
      <div class="row"><button class="ghost" onclick="closeSheet()">Batal</button><button class="pri" id="ps">Simpan</button></div>`);
    $('#ps').onclick = () => { const x = $('#px').value.trim(); if (!x) return toast('Teks masih kosong'); closeSheet(); addBook($('#pt').value.trim() || x.slice(0, 30) + '…', cleanParas(x), db.lastLang); };
  };
  $$('[data-open]').forEach(el => el.onclick = () => { db.cur = el.dataset.open; save(); setTab('baca'); });
  $$('[data-del]').forEach(el => el.onclick = async e => {
    e.stopPropagation();
    if (!el.classList.contains('sure')) { el.classList.add('sure'); el.textContent = 'Hapus?'; setTimeout(() => { if (el.isConnected) { el.classList.remove('sure'); el.innerHTML = ico('trash'); } }, 3000); return; }
    const id = el.dataset.del; db.books = db.books.filter(b => b.id !== id); if (db.cur === id) db.cur = null; save(); await delText(id); toast('Buku dihapus'); viewRak();
  });
}
$('#file').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  toast('⏳ Membaca ' + f.name + '…', 60000);
  try { const r = await parseFile(f); if (!r.paras.length) throw new Error('Tidak ada teks yang terbaca'); await addBook(r.title, r.paras, db.lastLang); }
  catch (err) { console.error(err); toast('❌ ' + (err.message || err), 5000); }
};
async function addBook(title, paras, lang) {
  const id = 'b' + Date.now().toString(36);
  await putText(id, paras);
  db.books.push({ id, title, lang, pos: 0, si: 0, total: 0, added: Date.now(), opened: Date.now() });
  db.cur = id; save(); toast('✅ Buku ditambahkan'); setTab('baca');
}

/* ---------- BACA ---------- */
async function viewBaca() {
  const b = book();
  if (!b) { $('#view').innerHTML = emptyNeedBook('📖', 'Belum ada buku yang dibuka.'); return; }
  b.opened = Date.now(); save();
  const pages = await pagesOf(b);
  b.pos = Math.min(b.pos, pages.length - 1);
  $('#ttl').textContent = b.title; progress(pctOf(b));
  $('#hdx').innerHTML = `<button class="icon aa" id="set" aria-label="Tampilan">Aa</button>`;
  $('#set').onclick = openSettings;
  let si = 0;
  const html = pages[b.pos].map(p => (p.length < 80 && !/[.!?,;:"”]$/.test(p) ? '<p class="h">' : '<p>') + sentences(p, b.lang).map(s => `<span class="s" data-s="${si++}">` + tokens(s, b.lang).map(t => t.w ? `<span class="w">${esc(t.t)}</span>` : esc(t.t)).join('') + '</span>').join('') + '</p>').join('');
  $('#view').innerHTML = `
    ${db.seenTip ? '' : `<div class="tip" id="tip"><span>👆</span><div><b>Ketuk kata</b> yang bikin bingung untuk lihat artinya. Masih bingung? Lanjut ke <b>arti kalimat</b>.</div><button id="tipx">${ico('x')}</button></div>`}
    <article class="page${db.font === 'serif' ? ' serif' : ''}" style="font-size:${db.fs}px">${html}</article>
    <div class="pager"><button id="pv" ${b.pos ? '' : 'disabled'}>${ico('left')}</button><span>hlm ${b.pos + 1}/${pages.length}</span><button id="nx" ${b.pos < pages.length - 1 ? '' : 'disabled'}>Berikutnya ${ico('right')}</button></div>`;
  if ($('#tipx')) $('#tipx').onclick = () => { db.seenTip = true; save(); $('#tip').remove(); };
  const go = d => { b.pos += d; b.si = 0; save(); viewBaca(); window.scrollTo(0, 0); };
  $('#pv').onclick = () => go(-1); $('#nx').onclick = () => go(1);
  $('.page').onclick = e => { const w = e.target.closest('.w'); if (w) { vib(8); onWord(w); } };
}
async function onWord(el) {
  const b = book(); markDay();
  $$('.w.sel,.s.hl').forEach(x => x.classList.remove('sel', 'hl'));
  el.classList.add('sel');
  const word = el.textContent, sEl = el.closest('.s'), sent = sEl.textContent.trim(), sIdx = +sEl.dataset.s;
  const isSaved = () => db.vocab.some(v => v.w.toLowerCase() === word.toLowerCase() && v.lang === b.lang);
  openSheet(`
    <div class="steps"><span class="on">1 · Arti kata</span><span>2 · Arti kalimat</span></div>
    <div class="wd">${esc(word)} <button class="icon" id="sw" aria-label="Dengar">${ico('vol')}</button></div>
    <div class="tr" id="wtr"><span class="loading">⏳ menerjemahkan…</span></div>
    <div class="dict" id="wdict"></div>
    <div class="row"><button class="soft" id="wsave">${isSaved() ? '⭐ Tersimpan' : ico('star') + ' Simpan'}</button><button class="pri" id="wnext">Arti kalimat ${ico('right')}</button></div>`);
  $('#sw').onclick = () => speak(word, b.lang, 0.8);
  let tr = null;
  translate(word, b.lang, db.my).then(r => {
    tr = r; if (!$('#wtr')) return;
    $('#wtr').textContent = r.text;
    $('#wdict').innerHTML = r.dict.slice(0, 3).map(d => `<div><b>${esc(POS[d.pos] || d.pos)}</b>${d.terms.map(esc).join(', ')}</div>`).join('');
  }).catch(() => { if ($('#wtr')) $('#wtr').innerHTML = '<span class="loading">⚠️ Gagal menerjemahkan (cek internet)</span>'; });
  $('#wsave').onclick = async () => {
    if (isSaved()) return;
    const r = tr || await translate(word, b.lang, db.my).catch(() => ({ text: '' }));
    db.vocab.unshift({ w: word, t: r.text, lang: b.lang, s: sent, at: Date.now() }); save(); vib(10);
    $('#wsave').textContent = '⭐ Tersimpan';
  };
  $('#wnext').onclick = () => showSentence(word, sent, sIdx, sEl);
}
function showSentence(word, sent, sIdx, sEl) {
  const b = book();
  sEl.classList.add('hl');
  const marked = esc(sent).replace(new RegExp('(^|[^\\p{L}])(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?=[^\\p{L}]|$)', 'u'), '$1<mark>$2</mark>');
  openSheet(`
    <div class="steps"><span>1 · Arti kata</span><span class="on">2 · Arti kalimat</span></div>
    <div class="src">${marked}</div>
    <div class="tr sent" id="str"><span class="loading">⏳ menerjemahkan kalimat…</span></div>
    <div class="row"><button class="soft" id="ssp">${ico('vol')} Dengarkan</button><button class="ghost" id="sback">${ico('left')} Arti kata</button></div>
    <div class="row"><button class="pri big" id="spr">${ico('mic')} Latih ucap kalimat ini</button></div>`);
  translate(sent, b.lang, db.my).then(r => { if ($('#str')) $('#str').textContent = r.text; }).catch(() => { if ($('#str')) $('#str').innerHTML = '<span class="loading">⚠️ Gagal menerjemahkan (cek internet)</span>'; });
  $('#ssp').onclick = () => speak(sent, b.lang);
  $('#sback').onclick = () => { const el = sEl.querySelector('.w.sel'); if (el) onWord(el); };
  $('#spr').onclick = () => { b.si = sIdx; save(); setTab('bicara'); };
}

/* ---------- BICARA ---------- */
function ringHtml(p) {
  const C = 2 * Math.PI * 40, col = p >= PASS ? 'var(--good)' : p >= 60 ? 'var(--mid)' : 'var(--bad)';
  return `<div class="ring"><svg viewBox="0 0 96 96"><circle class="bg" cx="48" cy="48" r="40"/><circle class="fg" cx="48" cy="48" r="40" stroke="${col}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - p / 100)}"/></svg><div class="score">${p}%</div></div>`;
}
const animRing = box => requestAnimationFrame(() => requestAnimationFrame(() => box.querySelectorAll('.ring .fg').forEach(c => c.style.strokeDashoffset = c.dataset.off)));
async function viewBicara() {
  const b = book();
  if (!b) { $('#view').innerHTML = emptyNeedBook('🗣️', 'Pilih buku dulu untuk latihan bicara.'); return; }
  const pages = await pagesOf(b);
  const sents = pages[b.pos].flatMap(p => sentences(p, b.lang)).map(s => s.trim()).filter(s => tokens(s, b.lang).some(t => t.w));
  b.si = Math.max(0, Math.min(b.si || 0, sents.length - 1)); save();
  const sent = sents[b.si] || '';
  let wi = 0; const words = [];
  const tHtml = tokens(sent, b.lang).map(t => { if (!t.w) return esc(t.t); words.push(t.t); return `<span class="t" data-i="${wi++}">${esc(t.t)}</span>`; }).join('');
  $('#ttl').textContent = 'Latihan bicara'; progress(sents.length ? (b.si + 1) / sents.length * 100 : 0);
  $('#view').innerHTML = `
    ${SR || TEST ? '' : `<div class="tip"><span>⚠️</span><div>${micError('nosupport')}</div></div>`}
    <div class="card">
      <div class="eyebrow" style="text-align:center">Kalimat ${b.si + 1} dari ${sents.length} · hlm ${b.pos + 1}</div>
      <div class="target" id="target">${tHtml}</div>
      <div class="micwrap"><button class="round" id="ex" aria-label="Contoh">${ico('vol')}</button><button class="mic" id="rec" aria-label="Rekam">${ico('mic')}</button><button class="round" id="exs" aria-label="Contoh pelan">${ico('slow')}</button></div>
      <div class="mic-lbl" id="recl">Ketuk mikrofon, lalu baca kalimatnya</div>
      <div class="heard" id="heard"></div>
      <div id="res"></div>
    </div>
    <div id="remed"></div>
    <div class="pager"><button id="sp">${ico('left')}</button><span>${b.si + 1}/${sents.length}</span><button id="sn">Kalimat berikutnya ${ico('right')}</button></div>`;
  $('#ex').onclick = () => speak(sent, b.lang, 0.85);
  $('#exs').onclick = () => speak(sent, b.lang, 0.55);
  $('#sp').onclick = () => { if (b.si > 0) b.si--; else if (b.pos > 0) { b.pos--; b.si = 1e9; } else return; save(); viewBicara(); };
  $('#sn').onclick = () => { if (b.si < sents.length - 1) b.si++; else if (b.pos < pages.length - 1) { b.pos++; b.si = 0; } else return toast('🎉 Sudah kalimat terakhir buku'); save(); viewBicara(); };
  const btn = $('#rec');
  const idle = (lbl) => { btn.classList.remove('rec'); btn.innerHTML = ico('mic'); $('#recl').textContent = lbl; };
  btn.onclick = async () => {
    if (btn.classList.contains('rec')) return stopListen();
    vib(15); speechSynthesis && speechSynthesis.cancel();
    btn.classList.add('rec'); btn.innerHTML = ico('stop'); $('#recl').textContent = 'Mendengarkan… ketuk untuk selesai';
    $('#heard').textContent = ''; $('#res').innerHTML = ''; $('#remed').innerHTML = '';
    $$('#target .t').forEach(el => { el.className = 't'; delete el.dataset.p; });
    let cands;
    try { cands = await listen(b.lang, { onInterim: t => $('#heard').textContent = '🎙️ ' + t }); }
    catch (e) { idle('Ketuk mikrofon, lalu baca kalimatnya'); return toast(micError(e), 6000); }
    idle('Ketuk untuk baca ulang');
    if (!cands.length) { $('#heard').textContent = '🤔 Tidak terdengar apa-apa. Coba lagi lebih dekat ke mikrofon.'; return; }
    markDay();
    $('#heard').textContent = '👂 “' + cands[0] + '”';
    const sc = scoreSentence(words.map(norm), cands, b.lang);
    $$('#target .t').forEach((el, i) => setTimeout(() => { el.dataset.p = sc[i]; el.className = 't ' + cls(sc[i]); }, i * 60));
    const avg = Math.round(sc.reduce((a, c) => a + c, 0) / (sc.length || 1));
    db.scores.push(avg); db.scores = db.scores.slice(-100); save();
    words.forEach((w, i) => recordWeak(w, b.lang, sc[i]));
    const good = sc.filter(x => x >= PASS).length;
    const msg = avg >= 95 ? ['Sempurna! 🎉', 'Pengucapanmu sangat jelas.'] : avg >= PASS ? ['Bagus! 👏', 'Tinggal sedikit lagi.'] : avg >= 60 ? ['Lumayan 💪', 'Latih kata yang merah/kuning.'] : ['Ayo coba lagi 🙂', 'Dengar contohnya dulu, lalu baca pelan.'];
    $('#res').innerHTML = `<div class="result">${ringHtml(avg)}<div class="msg"><b>${msg[0]}</b><span class="mut sm">${msg[1]}<br>${good}/${sc.length} kata tepat</span></div></div>`;
    animRing($('#res')); vib(avg >= PASS ? [10, 40, 10] : 20);
    const worst = words.map((w, i) => ({ w, p: sc[i] })).filter(x => x.p < PASS && norm(x.w))
      .sort((a, c) => a.p - c.p).filter((x, i, a) => a.findIndex(y => norm(y.w) === norm(x.w)) === i).slice(0, 5);
    if (!worst.length) { $('#remed').innerHTML = `<div class="card celebrate"><span class="big-emoji">🏆</span><h3>Semua kata tepat!</h3><div class="mut sm">Lanjut ke kalimat berikutnya.</div></div>`; return; }
    $('#remed').innerHTML = `<div class="card"><h3>🎯 Remedial</h3><div class="mut sm">Kata paling jelek — latih satu per satu sampai ≥${PASS}%.</div>
      <div class="chips">${worst.map(x => `<span class="chip ${cls(x.p)}">${esc(x.w)} · ${x.p}%</span>`).join('')}</div>
      <div class="row"><button class="pri big" id="goRem">Mulai remedial (${worst.length} kata)</button></div></div>`;
    $('#goRem').onclick = () => remedial(worst, b.lang, $('#remed'), () => {
      $('#remed').innerHTML = `<div class="card celebrate"><span class="big-emoji">✅</span><h3>Remedial selesai</h3><div class="mut sm">Sekarang baca ulang kalimatnya utuh.</div><div class="row"><button class="pri big" id="again">${ico('redo')} Baca ulang kalimat</button></div></div>`;
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
      <div class="eyebrow lbl" style="text-align:center">Remedial ${i + 1}/${list.length} · percobaan ${tries}</div>
      <div class="rem-word">${esc(x.w)}</div>
      <div class="tr sent" style="text-align:center;margin:2px 0" id="rtr"></div>
      <div class="rem-score" id="rsc"><b>${x.p}%</b>skor sebelumnya</div>
      <div class="micwrap"><button class="round" id="rl" aria-label="Dengar">${ico('vol')}</button><button class="mic" id="rr" aria-label="Ucapkan">${ico('mic')}</button><button class="round" id="rs" aria-label="Pelan">${ico('slow')}</button></div>
      <div class="heard" id="rh">Dengar dulu, lalu ketuk mikrofon & ucapkan</div>
      <div class="row"><button class="ghost" id="rk">Lewati ${ico('right')}</button></div></div>`;
    translate(x.w, lang, db.my).then(r => { if ($('#rtr')) $('#rtr').textContent = r.text; }).catch(() => { });
    $('#rl').onclick = () => speak(x.w, lang, 0.8);
    $('#rs').onclick = () => speak(x.w, lang, 0.45);
    $('#rk').onclick = () => { i++; tries = 0; step(); };
    $('#rr').onclick = async () => {
      const bt = $('#rr'); if (bt.classList.contains('rec')) return stopListen();
      vib(15); bt.classList.add('rec'); bt.innerHTML = ico('stop'); $('#rh').textContent = '🎙️ mendengarkan…';
      let c;
      try { c = await listen(lang, { single: true, onInterim: t => { if ($('#rh')) $('#rh').textContent = '🎙️ ' + t; } }); }
      catch (e) { bt.classList.remove('rec'); bt.innerHTML = ico('mic'); return toast(micError(e), 6000); }
      tries++;
      const p = c.length ? scoreWord(x.w, c, lang) : 0;
      recordWeak(x.w, lang, p);
      bt.classList.remove('rec'); bt.innerHTML = ico('mic');
      $('#rsc').innerHTML = `<b style="color:var(--${p >= PASS ? 'good' : p >= 60 ? 'mid' : 'bad'})">${p}%</b>${p >= PASS ? '✅ Lulus!' : 'Belum — dengar contohnya, coba lagi'}`;
      $('#rh').textContent = c.length ? '👂 “' + c[0] + '”' : '🤔 tidak terdengar';
      box.querySelector('.lbl').textContent = `Remedial ${i + 1}/${list.length} · percobaan ${tries}`;
      if (p >= PASS) { vib([10, 40, 10]); passed[i] = 1; setTimeout(() => { i++; tries = 0; step(); }, 1100); }
      else if (tries >= 2) speak(x.w, lang, 0.7);
    };
  };
  step();
}

/* ---------- KATA ---------- */
let kataSeg = 'simpan';
function viewKata() {
  const weak = Object.values(db.weak).filter(o => o.last < PASS).sort((a, b) => a.last - b.last).slice(0, 30);
  $('#ttl').textContent = 'Kata saya';
  $('#view').innerHTML = `
    <div class="seg" id="kseg" style="margin:6px 0 14px"><button data-v="simpan" class="${kataSeg === 'simpan' ? 'on' : ''}">⭐ Tersimpan (${db.vocab.length})</button><button data-v="sulit" class="${kataSeg === 'sulit' ? 'on' : ''}">🎯 Sulit diucapkan (${weak.length})</button></div>
    <div id="kbody"></div>`;
  $$('#kseg button').forEach(x => x.onclick = () => { kataSeg = x.dataset.v; viewKata(); });
  const kb = $('#kbody');
  if (kataSeg === 'simpan') {
    kb.innerHTML = db.vocab.length ? db.vocab.map((v, i) => `<div class="vitem"><div class="inf"><div class="w1">${esc(v.w)}</div><div class="t1">${esc(v.t)}</div><div class="s1">${esc(v.s || '')}</div></div>
      <button data-sp="${i}" aria-label="Dengar">${ico('vol')}</button><button data-dv="${i}" aria-label="Hapus">${ico('x')}</button></div>`).join('')
      : `<div class="empty"><span class="big-emoji">⭐</span>Belum ada kata tersimpan.<br>Saat membaca, ketuk kata → <b>Simpan</b>.</div>`;
    $$('[data-sp]').forEach(el => el.onclick = () => { const v = db.vocab[+el.dataset.sp]; speak(v.w, v.lang, 0.8); });
    $$('[data-dv]').forEach(el => el.onclick = () => { db.vocab.splice(+el.dataset.dv, 1); save(); viewKata(); });
  } else {
    kb.innerHTML = weak.length ? `<div class="card"><div class="chips" style="margin:0">${weak.map(o => `<span class="chip ${cls(o.last)}">${esc(o.w)} · ${o.last}%</span>`).join('')}</div>
        <div class="row"><button class="pri big" id="kRem">${ico('mic')} Latih ${Math.min(weak.length, 10)} kata terjelek</button></div></div><div id="kbox"></div>`
      : `<div class="empty"><span class="big-emoji">🎯</span>Belum ada kata sulit.<br>Latihan di tab <b>Bicara</b> dulu.</div>`;
    if ($('#kRem')) $('#kRem').onclick = () => {
      const lang = weak[0].lang, list = weak.filter(o => o.lang === lang).slice(0, 10);
      $('#kRem').closest('.card').remove();
      remedial(list.map(o => ({ w: o.w, p: o.last })), lang, $('#kbox'), () => { toast('✅ Latihan selesai'); viewKata(); });
    };
  }
}

/* ---------- mulai ---------- */
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
if ('serviceWorker' in navigator && !TEST && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js');
if ('speechSynthesis' in window) speechSynthesis.getVoices();
setTab(db.tab && (db.tab === 'rak' || db.cur) ? db.tab : 'rak');
