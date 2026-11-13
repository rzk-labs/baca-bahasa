// Uji kecil impor EPUB Jepang tegak. Jalankan: node uji/epub-tegak.mjs
// Membuat uji/epub-tegak.epub lalu mengecek normJa & needBodyFallback dari app.js.
import fs from 'node:fs'; import zlib from 'node:zlib'; import vm from 'node:vm'; import assert from 'node:assert';
const dir = new URL('.', import.meta.url).pathname;
const src = fs.readFileSync(dir + '../app.js', 'utf8');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src.match(/const JA_PUNCT[\s\S]*?\nfunction needBodyFallback[\s\S]*?\n}\n/)[0] + ';this.normJa=normJa;this.needBodyFallback=needBodyFallback;', ctx);
const { normJa, needBodyFallback } = ctx;

// zip minimal (tanpa kompresi)
function zip(files) {
  const loc = [], cen = []; let off = 0;
  for (const [name, data] of files) {
    const n = Buffer.from(name), d = Buffer.from(data), crc = zlib.crc32(d);
    const h = Buffer.alloc(30); h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt32LE(crc, 14); h.writeUInt32LE(d.length, 18); h.writeUInt32LE(d.length, 22); h.writeUInt16LE(n.length, 26);
    const c = Buffer.alloc(46); c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt32LE(crc, 16); c.writeUInt32LE(d.length, 20); c.writeUInt32LE(d.length, 24); c.writeUInt16LE(n.length, 28); c.writeUInt32LE(off, 42);
    loc.push(h, n, d); cen.push(c, n); off += 30 + n.length + d.length;
  }
  const cd = Buffer.concat(cen), e = Buffer.alloc(22); e.writeUInt32LE(0x06054b50, 0); e.writeUInt16LE(files.length, 8); e.writeUInt16LE(files.length, 10); e.writeUInt32LE(cd.length, 12); e.writeUInt32LE(off, 16);
  return Buffer.concat([...loc, cd, e]);
}
const page = b => `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>t</title></head><body style="writing-mode:vertical-rl">${b}</body></html>`;
const ruby = '<p>吾輩は<ruby>猫<rt>ねこ</rt></ruby>である。「名前はまだ無い」…・ー</p>';
const p1 = page(ruby + '<p>第<span class="tcy">12</span>章　⽂章のテスト、Ａ１２３<img class="gaiji" src="g.png" alt="𠮷"/>。</p>');
const br = 'あ'.repeat(120) + '<br/>' + 'い'.repeat(120) + '<br/>' + 'う'.repeat(120);
const p2 = page(`<div>${br}</div>`);
const opf = `<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>テスト</dc:title></metadata><manifest><item id="a" href="a.xhtml" media-type="application/xhtml+xml"/><item id="b" href="b.xhtml" media-type="application/xhtml+xml"/></manifest><spine page-progression-direction="rtl"><itemref idref="a"/><itemref idref="b"/></spine></package>`;
const cont = '<?xml version="1.0"?><container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0"><rootfiles><rootfile full-path="content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>';
fs.writeFileSync(dir + 'epub-tegak.epub', zip([['mimetype', 'application/epub+zip'], ['META-INF/container.xml', cont], ['content.opf', opf], ['a.xhtml', p1], ['b.xhtml', p2]]));

// 1) huruf mirip -> biasa, tanda baca Jepang utuh
assert.equal(normJa('⽂章Ａ１２３'), '文章A123');
const punct = '「名前」『本』、。…・ー';
assert.equal(normJa(punct), punct);
assert.equal(normJa('㈱ｶﾀｶﾅ'), '(株)カタカナ');
// 2) halaman <p> sedikit + teks di luar <p> banyak -> cadangan body
const pCount = h => (h.match(/<p[ >]/g) || []).length;
const textOut = h => h.replace(/<p[ >][\s\S]*?<\/p>/g, '').replace(/<[^>]+>/g, '').length;
assert.equal(needBodyFallback(pCount(p2), 0, textOut(p2)), true);
assert.equal(needBodyFallback(pCount(p1), 80, 80 + textOut(p1)), false);
assert.equal(needBodyFallback(40, 5000, 5100), false);
console.log('OK: uji/epub-tegak.epub dibuat, semua cek lulus');
