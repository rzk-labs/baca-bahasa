// Tester/pengguna AI memakai Keepo sungguhan di browser (Playwright) dengan akun uji masing-masing.
// Alur: masuk (akun uji) → pastikan ada buku (pulih dari akun / cerita contoh) → baca beberapa halaman →
// ketuk & simpan kata → sinkron → ikuti sesama akun uji → screenshot untuk dinilai agent.
// Butuh env: KEEPO_BOT_KEY, NAMA. Hasil: .kepo-tmp/pakai.txt + .kepo-tmp/layar/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';

const API = 'https://kepo-api.rizkachoirunnisa0403.workers.dev';
const APP = 'https://rzk-labs.github.io/baca-bahasa/';
const nama = String(process.env.NAMA || '').toLowerCase();
const BAHASA = { tari: 'en', bima: 'ja', nadia: 'en', raka: 'ko', dina: 'ja' }[nama] || 'en';
const HALAMAN = 4 + Math.floor(Math.random() * 5); // 4-8 halaman per sesi
const out = '.kepo-tmp'; fs.mkdirSync(out + '/layar', { recursive: true });
const log = []; const L = s => { log.push(s); console.log(s); };
const wait = ms => new Promise(r => setTimeout(r, ms));

// Buku panjang domain publik per persona: Aozora Bunko (Jepang) & Project Gutenberg (Inggris).
const BUKU = {
  tari: { src: 'gutenberg', url: 'https://www.gutenberg.org/cache/epub/1661/pg1661.txt', title: 'The Adventures of Sherlock Holmes', lang: 'en', asal: 'Project Gutenberg' },
  nadia: { src: 'gutenberg', url: 'https://www.gutenberg.org/cache/epub/11/pg11.txt', title: "Alice's Adventures in Wonderland", lang: 'en', asal: 'Project Gutenberg' },
  bima: { src: 'aozora', url: 'https://www.aozora.gr.jp/cards/000148/files/752_14964.html', title: '坊っちゃん（夏目漱石）', lang: 'ja', asal: 'Aozora Bunko' },
  raka: { src: 'aozora', url: 'https://www.aozora.gr.jp/cards/000081/files/456_15050.html', title: '銀河鉄道の夜（宮沢賢治）', lang: 'ja', asal: 'Aozora Bunko' },
  dina: { src: 'aozora', url: 'https://www.aozora.gr.jp/cards/000148/files/773_14560.html', title: 'こころ（夏目漱石）', lang: 'ja', asal: 'Aozora Bunko' },
}[nama];
async function ambilBuku(B) {
  if (!B) return null;
  const res = await fetch(B.url, { headers: { 'User-Agent': 'keepo-tester-bot' } });
  if (!res.ok) throw new Error('unduh ' + res.status);
  let paras;
  if (B.src === 'gutenberg') {
    let t = await res.text();
    const a = t.search(/\*\*\* ?START OF.*\*\*\*/), z = t.search(/\*\*\* ?END OF/);
    if (a >= 0) t = t.slice(t.indexOf('\n', a) + 1, z > a ? z : undefined);
    paras = t.replace(/\r/g, '').split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(p => p.length > 1);
  } else {
    const html = new TextDecoder('shift_jis').decode(await res.arrayBuffer());
    const m = html.match(/<div class="main_text">([\s\S]*?)<div class="bibliographical_information">/);
    paras = (m ? m[1] : html).replace(/<rp>[^<]*<\/rp>|<rt>[\s\S]*?<\/rt>/g, '').replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').split('\n').map(p => p.trim()).filter(Boolean);
  }
  if (paras.length < 20) throw new Error('teks terlalu pendek');
  return { ...B, paras };
}

const sesi = await fetch(API + '/bot/sesi', { method: 'POST', headers: { 'X-Bot-Key': process.env.KEEPO_BOT_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ nama }) }).then(r => r.json());
if (!sesi.token) { L('Gagal masuk akun uji: ' + (sesi.error || 'tanpa token')); fs.writeFileSync(out + '/pakai.txt', log.join('\n')); process.exit(0); }
L(`Masuk sebagai @${sesi.user.username}.`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'id-ID' });
const errs = []; page.on('pageerror', e => errs.push(e.message));
const shot = async n => { try { await page.screenshot({ path: `${out}/layar/${n}.png` }); } catch (e) { } };
try {
  await page.goto(APP, { waitUntil: 'networkidle' });
  await wait(1500);
  await page.evaluate(async s => { await afterLogin(s); }, sesi);
  await wait(4000);
  await page.evaluate(() => typeof syncBooks === 'function' && syncBooks()).catch(() => { });
  await wait(3000);
  let n = await page.evaluate(() => db.books.length);
  // buku panjang: tambahkan sekali (setelah itu ikut akun & lanjut dari posisi terakhir)
  let bukuBaru = null;
  if (BUKU && !(await page.evaluate(t => db.books.some(b => b.title === t), BUKU.title))) {
    try {
      const bk = await ambilBuku(BUKU);
      await page.evaluate(async x => { await addBook(x.title, x.paras, x.lang); closeSheet(); }, bk); await wait(2500);
      bukuBaru = bk; L(`Menambah buku panjang "${bk.title}" dari ${bk.asal} (${bk.paras.length} paragraf).`);
      n = await page.evaluate(() => db.books.length);
    } catch (e) { L('Gagal mengambil buku panjang: ' + e.message); }
  }
  if (!n) {
    L('Rak kosong: menambah cerita contoh.');
    await page.evaluate(() => setTab('rak')); await wait(800);
    await page.click('#sample'); await wait(800);
    await page.click(`[data-sl="${BAHASA}"]`); await wait(2500);
    n = await page.evaluate(() => db.books.length);
  }
  L(`Buku di rak: ${n}.`);
  await page.evaluate(() => setTab('rak')); await wait(1500); await shot('1-beranda');
  await page.evaluate(t => { const b = db.books.find(x => x.title === t) || db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0))[0]; db.cur = b.id; setTab('baca'); }, BUKU ? BUKU.title : '');
  await wait(2500); await shot('2-baca');
  const sebelum = await page.evaluate(() => { const b = db.books.find(x => x.id === db.cur); return { judul: b.title, pct: pctOf(b) }; });
  for (let i = 0; i < HALAMAN; i++) { await page.keyboard.press('ArrowRight'); await wait(700 + Math.random() * 900); }
  const kata = page.locator('#cols .w');
  const jml = await kata.count();
  let simpan = 0;
  for (let i = 0; i < 3 && jml; i++) {
    await kata.nth(Math.floor(Math.random() * Math.min(jml, 60))).click().catch(() => { });
    await wait(2500); if (i === 0) await shot('3-arti-kata');
    const s = page.locator('#wsave');
    if (await s.count() && !/Tersimpan/.test(await s.innerText())) { await s.click(); simpan++; await wait(800); }
    await page.evaluate(() => closeSheet()); await wait(500);
  }
  const sesudah = await page.evaluate(() => { const b = db.books.find(x => x.id === db.cur); return { pct: pctOf(b) }; });
  L(`Membaca "${sebelum.judul}": ${HALAMAN} halaman, ${sebelum.pct}% → ${sesudah.pct}%. Kata disimpan: ${simpan}.`);
  await page.evaluate(() => runSync({ force: true })); await wait(4000);
  // status di FYP: bagikan buku domain publik saat pertama kali, lalu kabar progres
  try {
    const kataBaru = await page.evaluate(() => (db.vocab || []).slice(0, 2).map(v => v.w).filter(Boolean));
    const st = await page.evaluate(async x => {
      let share = null;
      if (x.baru) { const r = await api('/share', { method: 'POST', body: { title: x.baru.title, lang: x.baru.lang, paras: x.baru.paras } }); share = r.id; }
      const teks = x.baru
        ? `Mulai baca ${x.baru.title} dari ${x.baru.asal}. Bebas hak cipta, jadi bisa dibaca bareng.`
        : `Lanjut ${x.judul}: ${x.hal} halaman, sekarang ${x.pct}%.${x.kata.length ? ' Kata baru: ' + x.kata.join(', ') + '.' : ''}`;
      await api('/posts', { method: 'POST', body: { text: teks, book: x.judul, lang: x.lang, share } });
      return teks;
    }, { baru: bukuBaru, judul: sebelum.judul, hal: HALAMAN, pct: sesudah.pct, kata: kataBaru, lang: BUKU ? BUKU.lang : null });
    L('Status FYP: ' + st);
  } catch (e) { L('Gagal kirim status FYP: ' + e.message); }
  // ikuti sesama akun uji supaya feed "Teman membaca" hidup
  for (const x of ['tari', 'bima', 'nadia', 'raka', 'dina']) if (x !== nama) await page.evaluate(u => api('/ikuti/' + u, { method: 'POST' }).catch(() => { }), 'uji_' + x);
  await page.evaluate(() => setTab('rak')); await wait(3000); await shot('4-teman');
  await page.evaluate(u => openProfile(u), sesi.user.username); await wait(2500); await shot('5-profil');
  L('Profil sudah disinkron dan publik.');
} catch (e) { L('Ada langkah yang gagal: ' + e.message.split('\n')[0]); await shot('x-gagal'); }
if (errs.length) L('Error JavaScript di halaman: ' + [...new Set(errs)].slice(0, 3).join(' | '));
await browser.close();
fs.writeFileSync(out + '/pakai.txt', log.join('\n'));
