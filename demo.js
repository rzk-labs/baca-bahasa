'use strict';
/* Mode demo (untuk App Review & coba-coba): "server" palsu di dalam app.
   Hanya menjawab fitur akun & sosial dengan data contoh. Tidak ada data ke server, tanpa password.
   Aktif bila db.acct.token === 'demo'. Fitur lain (arti kata, dll.) tetap jalan normal. */
const DEMO_RE = /^\/(me|sync|books|social|leaderboard|teman|cari|fyp|posts|blokir|ikuti|u\/|share|logout)/;
const demoUsers = [
  { username: 'dina', nick: 'Dina', level: 7, streak: 12, kata7: 38, pengikut: 21, mengikuti: 9, reading: [{ t: 'Alice in Wonderland', lang: 'en', pct: 42 }] },
  { username: 'raka', nick: 'Raka', level: 4, streak: 5, kata7: 15, pengikut: 8, mengikuti: 14, reading: [{ t: 'The Little Prince', lang: 'en', pct: 100 }] },
  { username: 'sari', nick: 'Sari', level: 9, streak: 30, kata7: 52, pengikut: 40, mengikuti: 11, reading: [{ t: 'Momotaro', lang: 'ja', pct: 18 }] }
];
let demoS = null;
function demoState() {
  if (demoS) return demoS;
  const now = Date.now();
  demoS = {
    follow: new Set(['dina']), blocked: new Set(), gone: new Set(), likes: new Set(), extra: [],
    posts: [
      { id: 'd1', username: 'dina', nick: 'Dina', at: now - 36e5, text: 'Kata favorit hari ini: "wonderland". Artinya negeri ajaib!', book: 'Alice in Wonderland', lang: 'en', suka: 3 },
      { id: 'd2', username: 'raka', nick: 'Raka', at: now - 5 * 36e5, text: 'Akhirnya tamat baca The Little Prince.', book: 'The Little Prince', lang: 'en', suka: 5 },
      { id: 'd3', username: 'sari', nick: 'Sari', at: now - 26 * 36e5, text: 'Latihan ngomong 10 menit, skor ucapan naik.', book: null, lang: null, suka: 1 }
    ]
  };
  return demoS;
}
const demoMe = () => ({ username: db.acct.username, nick: db.acct.nick });
function demoUserOut(u, s) { return { ...u, diikuti: s.follow.has(u.username) }; }
function demoPosts() {
  const s = demoState(), me = demoMe();
  return s.extra.concat(s.posts)
    .filter(p => !s.gone.has(p.id) && !s.blocked.has(p.username))
    .map(p => ({ share: null, ...p, akuSuka: s.likes.has(p.id), suka: (p.suka || 0) + (s.likes.has(p.id) ? 1 : 0), diikuti: s.follow.has(p.username), milikku: p.username === me.username }));
}
async function demoApi(path, opt = {}) {
  const s = demoState(), m = opt.method || 'GET', body = opt.body || {}, me = demoMe();
  let x;
  if (path === '/me' && m === 'DELETE') return { ok: true };
  if (path === '/me') return { user: { username: me.username, nick: db.acct.nick, hidden: !!db.acct.hidden, publik: !!db.acct.publik, hideTitles: !!db.acct.hideTitles, premium: false }, data: {} };
  if (path === '/sync' || path === '/social' || path === '/logout') return { ok: true };
  if (path === '/books') return { books: [] };
  if (path === '/leaderboard') {
    const mine = typeof weekXp === 'function' ? weekXp() : 0;
    const top = [{ username: 'sari', nick: 'Sari', week_xp: 640 }, { username: 'dina', nick: 'Dina', week_xp: 410 }, { username: 'raka', nick: 'Raka', week_xp: 220 }]
      .concat(db.acct.hidden ? [] : [{ username: me.username, nick: db.acct.nick, week_xp: mine }])
      .sort((a, b) => b.week_xp - a.week_xp).map((r, i) => ({ ...r, rank: i + 1 }));
    return { week: typeof isoWeekKey === 'function' ? isoWeekKey() : '', top, me: { ...(top.find(t => t.username === me.username) || { rank: 4, week_xp: mine }), username: me.username, nick: db.acct.nick, hidden: !!db.acct.hidden } };
  }
  if (path === '/teman') return { users: demoUsers.filter(u => s.follow.has(u.username)).map(u => demoUserOut(u, s)) };
  if (path.startsWith('/cari')) {
    const q = decodeURIComponent((path.split('q=')[1] || '')).toLowerCase().replace(/^@/, '');
    return { users: demoUsers.filter(u => u.username.includes(q) || u.nick.toLowerCase().includes(q)).map(u => demoUserOut(u, s)) };
  }
  if (path.startsWith('/fyp')) return { posts: demoPosts(), lagi: null };
  if (path === '/posts' && m === 'POST') {
    s.extra.unshift({ id: 'm' + Date.now(), username: me.username, nick: db.acct.nick, at: Date.now(), text: String(body.text || '').slice(0, 500), book: body.book || null, lang: body.lang || null, suka: 0 });
    return { ok: true };
  }
  if ((x = path.match(/^\/posts\/([^/]+)\/suka$/))) { const on = !s.likes.has(x[1]); on ? s.likes.add(x[1]) : s.likes.delete(x[1]); return { suka: on }; }
  if ((x = path.match(/^\/posts\/([^/]+)\/lapor$/))) { s.gone.add(x[1]); return { ok: true }; }
  if ((x = path.match(/^\/posts\/([^/]+)$/)) && m === 'DELETE') { s.gone.add(x[1]); return { ok: true }; }
  if ((x = path.match(/^\/blokir\/(.+)$/))) { s.blocked.add(decodeURIComponent(x[1])); return { ok: true }; }
  if ((x = path.match(/^\/ikuti\/(.+)$/))) { const u = decodeURIComponent(x[1]); m === 'DELETE' ? s.follow.delete(u) : s.follow.add(u); return { ok: true }; }
  if ((x = path.match(/^\/u\/(.+)$/))) {
    const u = decodeURIComponent(x[1]);
    if (u === me.username) return { self: true, username: me.username, nick: db.acct.nick, level: 1, streak: 0, kata7: 0, pengikut: 0, mengikuti: s.follow.size, publik: !!db.acct.publik, reading: [] };
    const f = demoUsers.find(v => v.username === u);
    if (!f) throw new Error('Profil tidak ditemukan.');
    return { ...demoUserOut(f, s), aktif: Date.now() - 36e5, publik: true };
  }
  if (path === '/share' && m === 'POST') return { id: 'DEMO' };
  if (path.startsWith('/share/')) return { id: 'DEMO', by: 'Dina', title: 'Cerita contoh (demo)', lang: 'en', paras: ['This is a short demo story.', 'Tap any word to see its meaning.'] };
  throw new Error('Fitur ini tidak tersedia di mode demo.');
}
/* masuk mode demo: akun palsu lokal, tanpa server */
async function startDemo() {
  demoS = null;
  await afterLogin({ token: 'demo', user: { username: 'demo', nick: 'Akun Demo', hidden: false, publik: false, hideTitles: false, premium: false }, data: {} });
  toast('Mode demo: data contoh, tidak disimpan di server.', 5000);
  setTab(db.tab || 'rak');
}
