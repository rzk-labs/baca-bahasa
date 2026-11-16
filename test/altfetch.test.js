// node test/altfetch.test.js — altFetch/gtxFetch tahan balasan aneh
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../app.js', 'utf8');
const m = src.match(/async function fetchTimeout[\s\S]*?\n}\n[\s\S]*?async function altFetch[\s\S]*?\n}\n/);
let body;
const mk = new Function('fetch', 'baseOf', m[0] + '; return { altFetch, gtxFetch };');
const t = mk(async () => ({ ok: true, json: async () => body }), () => '');
(async () => {
  const cases = [null, [null], [[], [null]], [[], [null, [null, null]], 0, 0, 0, [null, [1, 2, [null]]]], 'x'];
  for (const b of cases) {
    body = b;
    const o = await t.altFetch('a', 'en', 'id');
    if (!Array.isArray(o)) throw new Error('bukan daftar: ' + JSON.stringify(b));
  }
  body = [[null, [null]], [null, [null]]];
  await t.gtxFetch('a', 'en', 'id');
  body = null;
  let msg = '';
  try { await t.gtxFetch('a', 'en', 'id'); } catch (e) { msg = e.message; }
  if (msg !== 'Balasan terjemahan aneh') throw new Error('gtx: ' + msg);
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });
