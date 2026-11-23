// node test/award-markday.test.js — baca ulang buku tamat tak menandai hari aktif (#1743)
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../ui.js', 'utf8');
const m = src.match(/const rbd = book\(\)[^\n]*\n\s*if \(([^\n]*)\) markDay\(\);/);
if (!m) throw new Error('syarat markDay tak ketemu');
const act = new Function('n', 'stat', 'reread', 'return (' + m[1] + ')');
const t = (n, stat, reread, want, name) => { if (!!act(n, stat, reread) !== want) throw new Error(name); };
t(0, 'page', true, false, 'buku tamat, XP 0: jangan');
t(0, 'look', true, false, 'cek kata buku tamat: jangan');
t(0, undefined, false, false, 'tanpa stat & XP: jangan');
t(5, 'page', false, true, 'halaman baru: ya');
t(0, 'page', false, true, 'halaman baru XP 0: ya');
t(3, 'save', false, true, 'simpan kata: ya');
t(0, 'speak', true, true, 'ngomong: ya');
console.log('award-markday ok');
