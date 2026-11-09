// Kepo API (Cloudflare Worker + D1): akun, sinkron progres, leaderboard mingguan, bagikan cerita.
const ORIGINS = ['https://rzk-labs.github.io', 'http://127.0.0.1:8771', 'http://localhost:8771'];
const MAX_DATA = 400 * 1024;      // data progres per akun
const MAX_SHARE = 1900 * 1024;    // teks cerita yang dibagikan
const MAX_WEEK_XP = 20000;        // batas wajar XP per minggu (anti-curang sederhana)

const enc = new TextEncoder();
const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const rand = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; };
const tokenStr = () => [...rand(24)].map(x => x.toString(16).padStart(2, '0')).join('');
const shareId = () => { const al = 'abcdefghjkmnpqrstuvwxyz23456789'; return [...rand(8)].map(x => al[x % al.length]).join(''); };

async function hashPass(pass, saltB64) {
  const key = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveBits']);
  const salt = Uint8Array.from(atob(saltB64), c => c.charCodeAt(0));
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256);
  return b64(bits);
}
function isoWeek(d = new Date()) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear(), w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
  return `${y}-W${String(w).padStart(2, '0')}`;
}
function cors(req) {
  const o = req.headers.get('Origin') || '';
  return { 'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : ORIGINS[0], 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Access-Control-Max-Age': '86400', Vary: 'Origin' };
}
const json = (req, body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...cors(req) } });
const err = (req, msg, status = 400) => json(req, { error: msg }, status);

async function authUser(req, env) {
  const t = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!t) return null;
  return env.DB.prepare('SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?').bind(t).first();
}
const pub = u => ({ username: u.username, nick: u.nick, xp: u.xp, hidden: !!u.hidden });
async function body(req) { try { return await req.json(); } catch (e) { return {}; } }
async function newSession(env, uid) { const t = tokenStr(); await env.DB.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?,?,?)').bind(t, uid, Date.now()).run(); return t; }

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    const url = new URL(req.url), p = url.pathname.replace(/\/+$/, '') || '/';
    try {
      if (p === '/' || p === '/health') return json(req, { ok: true, app: 'kepo-api', week: isoWeek() });

      if (p === '/signup' && req.method === 'POST') {
        const { username = '', password = '', nick = '' } = await body(req);
        const un = String(username).trim().toLowerCase();
        if (!/^[a-z0-9_]{3,20}$/.test(un)) return err(req, 'Username 3–20 huruf kecil, angka, atau _.');
        if (String(password).length < 6) return err(req, 'Password minimal 6 karakter.');
        const nk = String(nick || un).trim().slice(0, 24) || un;
        if (await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(un).first()) return err(req, 'Username sudah dipakai.', 409);
        const salt = b64(rand(16)), h = await hashPass(String(password), salt), now = Date.now();
        const r = await env.DB.prepare('INSERT INTO users (username, nick, pass_hash, salt, created_at, updated_at, week) VALUES (?,?,?,?,?,?,?)').bind(un, nk, h, salt, now, now, isoWeek()).run();
        const uid = r.meta.last_row_id;
        return json(req, { token: await newSession(env, uid), user: { username: un, nick: nk, xp: 0, hidden: false }, data: null });
      }
      if (p === '/login' && req.method === 'POST') {
        const { username = '', password = '' } = await body(req);
        const u = await env.DB.prepare('SELECT * FROM users WHERE username = ?').bind(String(username).trim().toLowerCase()).first();
        if (!u || (await hashPass(String(password), u.salt)) !== u.pass_hash) return err(req, 'Username atau password salah.', 401);
        return json(req, { token: await newSession(env, u.id), user: pub(u), data: u.data ? JSON.parse(u.data) : null });
      }
      if (p === '/logout' && req.method === 'POST') {
        const t = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
        if (t) await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(t).run();
        return json(req, { ok: true });
      }
      if (p === '/me' && req.method === 'GET') {
        const u = await authUser(req, env); if (!u) return err(req, 'Sesi habis, masuk lagi ya.', 401);
        return json(req, { user: pub(u), data: u.data ? JSON.parse(u.data) : null });
      }
      if (p === '/sync' && req.method === 'PUT') {
        const u = await authUser(req, env); if (!u) return err(req, 'Sesi habis, masuk lagi ya.', 401);
        const b = await body(req);
        const data = JSON.stringify(b.data || {});
        if (data.length > MAX_DATA) return err(req, 'Data terlalu besar.', 413);
        const week = isoWeek(), wx = Math.max(0, Math.min(MAX_WEEK_XP, b.weekXp | 0)), xp = Math.max(0, b.xp | 0);
        const nick = b.nick ? String(b.nick).trim().slice(0, 24) : u.nick;
        await env.DB.prepare('UPDATE users SET data=?, xp=?, week=?, week_xp=?, hidden=?, nick=?, updated_at=? WHERE id=?')
          .bind(data, xp, week, wx, b.hidden ? 1 : 0, nick || u.nick, Date.now(), u.id).run();
        return json(req, { ok: true, week });
      }
      if (p === '/leaderboard' && req.method === 'GET') {
        const week = isoWeek(), u = await authUser(req, env);
        const top = (await env.DB.prepare('SELECT nick, username, week_xp FROM users WHERE week = ? AND hidden = 0 AND week_xp > 0 ORDER BY week_xp DESC, updated_at ASC LIMIT 50').bind(week).all()).results;
        let me = null;
        if (u) {
          const wx = u.week === week ? u.week_xp : 0;
          const ahead = await env.DB.prepare('SELECT COUNT(*) AS n FROM users WHERE week = ? AND hidden = 0 AND week_xp > ?').bind(week, wx).first();
          me = { nick: u.nick, username: u.username, week_xp: wx, rank: u.hidden ? null : ahead.n + 1, hidden: !!u.hidden };
        }
        return json(req, { week, top: top.map((r, i) => ({ rank: i + 1, nick: r.nick, username: r.username, week_xp: r.week_xp })), me });
      }
      if (p === '/share' && req.method === 'POST') {
        const u = await authUser(req, env); if (!u) return err(req, 'Masuk dulu untuk membagikan cerita.', 401);
        const { title = '', lang = 'en', paras = [] } = await body(req);
        if (!Array.isArray(paras) || !paras.length) return err(req, 'Ceritanya kosong.');
        const bodyStr = JSON.stringify(paras.map(String));
        if (bodyStr.length > MAX_SHARE) return err(req, 'Cerita terlalu panjang untuk dibagikan (maks ±1,9 MB teks).', 413);
        const cnt = await env.DB.prepare('SELECT COUNT(*) AS n FROM shares WHERE user_id = ?').bind(u.id).first();
        if (cnt.n >= 50) return err(req, 'Batas 50 cerita dibagikan per akun.', 429);
        const id = shareId();
        await env.DB.prepare('INSERT INTO shares (id, user_id, title, lang, body, size, created_at) VALUES (?,?,?,?,?,?,?)')
          .bind(id, u.id, String(title).slice(0, 200) || 'Cerita', String(lang).slice(0, 10), bodyStr, bodyStr.length, Date.now()).run();
        return json(req, { id });
      }
      const m = p.match(/^\/share\/([a-z0-9]{6,12})$/);
      if (m && req.method === 'GET') {
        const s = await env.DB.prepare('SELECT s.*, u.nick FROM shares s JOIN users u ON u.id = s.user_id WHERE s.id = ?').bind(m[1]).first();
        if (!s) return err(req, 'Link cerita tidak ditemukan.', 404);
        await env.DB.prepare('UPDATE shares SET opens = opens + 1 WHERE id = ?').bind(m[1]).run();
        return json(req, { id: s.id, title: s.title, lang: s.lang, by: s.nick, paras: JSON.parse(s.body) });
      }
      return err(req, 'Tidak ditemukan.', 404);
    } catch (e) {
      return err(req, 'Server error: ' + (e && e.message || e), 500);
    }
  }
};
