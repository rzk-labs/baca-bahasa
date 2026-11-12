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
  if (!n) {
    L('Rak kosong: menambah cerita contoh.');
    await page.evaluate(() => setTab('rak')); await wait(800);
    await page.click('#sample'); await wait(800);
    await page.click(`[data-sl="${BAHASA}"]`); await wait(2500);
    n = await page.evaluate(() => db.books.length);
  }
  L(`Buku di rak: ${n}.`);
  await page.evaluate(() => setTab('rak')); await wait(1500); await shot('1-beranda');
  await page.evaluate(() => { const b = db.books.slice().sort((a, b) => (b.opened || 0) - (a.opened || 0))[0]; db.cur = b.id; setTab('baca'); });
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
  // ikuti sesama akun uji supaya feed "Teman membaca" hidup
  for (const x of ['tari', 'bima', 'nadia', 'raka', 'dina']) if (x !== nama) await page.evaluate(u => api('/ikuti/' + u, { method: 'POST' }).catch(() => { }), 'uji_' + x);
  await page.evaluate(() => setTab('rak')); await wait(3000); await shot('4-teman');
  await page.evaluate(u => openProfile(u), sesi.user.username); await wait(2500); await shot('5-profil');
  L('Profil sudah disinkron dan publik.');
} catch (e) { L('Ada langkah yang gagal: ' + e.message.split('\n')[0]); await shot('x-gagal'); }
if (errs.length) L('Error JavaScript di halaman: ' + [...new Set(errs)].slice(0, 3).join(' | '));
await browser.close();
fs.writeFileSync(out + '/pakai.txt', log.join('\n'));
