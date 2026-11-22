// node test/streakdots.test.js — 7 hari berturut: ketujuh titik terisi (#1666)
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../ui.js', 'utf8');
const grab = re => { const m = src.match(re); if (!m) throw new Error('tak ketemu: ' + re); return m[0]; };
const code = [
  grab(/const dayKey = [^\n]*\n/), grab(/const today = [^\n]*\n/), grab(/function streak\(\)[^\n]*\n/),
  grab(/function dayAgo[^\n]*\n/), grab(/function streakDots\(\) \{[\s\S]*?\n\}\n/),
].join('\n');
const mk = new Function('db', code + '; return streakDots();');
const key = k => { const d = new Date(); d.setDate(d.getDate() - k); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const on = h => (h.match(/<i class="on">/g) || []).length;
let h = mk({ days: [0, 1, 2, 3, 4, 5, 6].map(key) });
if (on(h) !== 7) throw new Error('7 hari dengan hari ini: terisi ' + on(h));
h = mk({ days: [1, 2, 3, 4, 5, 6, 7].map(key) });
if (on(h) !== 6) throw new Error('7 hari sampai kemarin: terisi ' + on(h));
console.log('streakdots ok');
