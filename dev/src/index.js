// Kepo Dev — panel permintaan untuk AI agent yang mengembangkan Kepo.
// Secrets: GH_TOKEN (akses repo), DEV_PASSWORD, SIGN_KEY.
import PAGE from './page.html';

const REPO = 'rzk-labs/baca-bahasa';
const LABEL = 'kepo-dev';
const BR = n => `kepo/issue-${n}`;

const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

async function gh(env, path, opt = {}) {
  const r = await fetch('https://api.github.com' + path, {
    ...opt,
    headers: {
      authorization: 'Bearer ' + env.GH_TOKEN,
      accept: opt.raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
      'user-agent': 'kepo-dev',
      'x-github-api-version': '2022-11-28',
      ...(opt.body ? { 'content-type': 'application/json' } : {}),
    },
  });
  if (opt.raw) return r;
  const t = await r.text();
  const d = t ? JSON.parse(t) : null;
  if (!r.ok && !opt.soft) throw new Error(`GitHub ${r.status}: ${d && d.message}`);
  return d;
}

// ---- auth: token = exp.hmac(exp) ----
async function hmac(env, msg) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.SIGN_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const s = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(msg));
  return [...new Uint8Array(s)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function same(a, b) { if (a.length !== b.length) return false; let x = 0; for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i); return x === 0; }
async function authed(req, env) {
  const t = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
  const [exp, sig] = t.split('.');
  if (!exp || !sig || Date.now() > +exp) return false;
  return same(sig, await hmac(env, exp));
}

function status(issue) {
  const L = issue.labels.map(l => l.name);
  if (L.includes('live')) return 'live';
  if (L.includes('ditolak') || issue.state === 'closed') return 'ditolak';
  if (L.includes('sedang-dikerjakan')) return 'dikerjakan';
  if (L.includes('siap-dicek')) return 'siap';
  if (L.includes('gagal')) return 'gagal';
  return 'antre';
}
const lbl = i => i.labels.map(l => l.name);
const brief = i => {
  const L = lbl(i);
  const p = L.find(x => x.startsWith('peran:'));
  return { n: i.number, judul: i.title, status: status(i), peran: p ? p.slice(6) : 'developer', otomatis: L.includes('otomatis'),
    qa: L.includes('qa-lolos') ? 'lolos' : L.includes('qa-catatan') ? 'catatan' : null, dibuat: i.created_at, diubah: i.updated_at };
};
const PERAN = ['developer', 'riset', 'desain', 'pm'];
const WF = { 'kepo-dev.yml': 'kerja', 'kepo-pm.yml': 'pm' };

async function openPR(env, n) {
  const owner = REPO.split('/')[0];
  const l = await gh(env, `/repos/${REPO}/pulls?state=all&head=${owner}:${BR(n)}`);
  return l.find(p => p.state === 'open') || l[0] || null;
}

const MIME = { html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json', webmanifest: 'application/manifest+json', svg: 'image/svg+xml', png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg', ico: 'image/x-icon', txt: 'text/plain; charset=utf-8', md: 'text/plain; charset=utf-8' };

async function preview(env, n, path) {
  if (!path || path.endsWith('/')) path += 'index.html';
  if (path.includes('..')) return new Response('bad path', { status: 400 });
  const r = await gh(env, `/repos/${REPO}/contents/${path}?ref=${encodeURIComponent(BR(n))}`, { raw: true });
  if (!r.ok) return new Response('Tidak ditemukan di branch preview: ' + path, { status: r.status });
  const ext = path.split('.').pop().toLowerCase();
  return new Response(r.body, { headers: { 'content-type': MIME[ext] || 'application/octet-stream', 'cache-control': 'no-store' } });
}

async function api(req, env, url) {
  const p = url.pathname.replace(/^\/api/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};

  if (p === '/login' && req.method === 'POST') {
    if (!body.pw || !same(String(body.pw), env.DEV_PASSWORD)) return json({ error: 'Password salah' }, 401);
    const exp = String(Date.now() + 30 * 864e5);
    return json({ token: exp + '.' + (await hmac(env, exp)) });
  }
  if (!(await authed(req, env))) return json({ error: 'Perlu login' }, 401);

  if (p === '/hq' && req.method === 'GET') {
    const [issues, road, docs, runs] = await Promise.all([
      gh(env, `/repos/${REPO}/issues?labels=${LABEL}&state=all&per_page=60&sort=created&direction=desc`),
      gh(env, `/repos/${REPO}/contents/docs/roadmap.json`, { raw: true }).then(r => (r.ok ? r.json() : null)),
      gh(env, `/repos/${REPO}/contents/docs`, { soft: true }),
      gh(env, `/repos/${REPO}/actions/runs?per_page=15`, { soft: true }),
    ]);
    return json({
      tasks: issues.filter(i => !i.pull_request).map(brief),
      roadmap: road,
      docs: Array.isArray(docs) ? docs.filter(d => d.name.endsWith('.md')).map(d => d.path) : [],
      runs: runs && runs.workflow_runs ? runs.workflow_runs.filter(r => WF[r.path.split('/').pop()]).map(r => ({
        jenis: WF[r.path.split('/').pop()], judul: r.display_title, status: r.status, hasil: r.conclusion, mulai: r.run_started_at || r.created_at, url: r.html_url,
      })) : null,
    });
  }
  if (p === '/doc' && req.method === 'GET') {
    const path = url.searchParams.get('path') || '';
    if (!/^docs\/[\w.-]+\.md$/.test(path)) return json({ error: 'path' }, 400);
    const ref = url.searchParams.get('ref') || '';
    if (ref && !/^kepo\/issue-\d+$/.test(ref)) return json({ error: 'ref' }, 400);
    const r = await gh(env, `/repos/${REPO}/contents/${path}${ref ? '?ref=' + encodeURIComponent(ref) : ''}`, { raw: true });
    return json({ path, ref, isi: r.ok ? await r.text() : '' });
  }
  if (p === '/pm' && req.method === 'POST') {
    const r = await fetch(`https://api.github.com/repos/${REPO}/actions/workflows/kepo-pm.yml/dispatches`, {
      method: 'POST', headers: { authorization: 'Bearer ' + env.GH_TOKEN, accept: 'application/vnd.github+json', 'user-agent': 'kepo-dev', 'content-type': 'application/json' },
      body: JSON.stringify({ ref: 'main', inputs: { paksa: String(!!body.paksa) } }),
    });
    if (!r.ok) return json({ error: r.status === 403 ? 'Token GitHub belum punya izin Actions (Read and write)' : 'Gagal menjalankan PM (' + r.status + ')' }, 400);
    return json({ ok: true });
  }
  if (p === '/tasks' && req.method === 'GET') {
    const l = await gh(env, `/repos/${REPO}/issues?labels=${LABEL}&state=all&per_page=40&sort=created&direction=desc`);
    return json(l.filter(i => !i.pull_request).map(brief));
  }
  if (p === '/tasks' && req.method === 'POST') {
    const isi = String(body.isi || '').trim();
    if (isi.length < 5) return json({ error: 'Tulis permintaannya dulu' }, 400);
    const judul = String(body.judul || '').trim() || isi.split('\n')[0].slice(0, 70);
    await gh(env, `/repos/${REPO}/labels`, { method: 'POST', body: JSON.stringify({ name: LABEL, color: 'C6FF3D' }), soft: true });
    const peran = PERAN.includes(body.peran) ? body.peran : 'developer';
    const i = await gh(env, `/repos/${REPO}/issues`, { method: 'POST', body: JSON.stringify({ title: judul, body: isi, labels: [LABEL, 'peran:' + peran] }) });
    return json(brief(i));
  }

  const m = p.match(/^\/tasks\/(\d+)(?:\/(\w+))?$/);
  if (!m) return json({ error: 'not found' }, 404);
  const n = +m[1], act = m[2];
  const issue = await gh(env, `/repos/${REPO}/issues/${n}`);
  if (!issue.labels.some(l => l.name === LABEL)) return json({ error: 'Bukan tugas Kepo Dev' }, 404);

  if (!act && req.method === 'GET') {
    const [cs, pr] = await Promise.all([
      gh(env, `/repos/${REPO}/issues/${n}/comments?per_page=100`),
      openPR(env, n),
    ]);
    const files = pr ? (await gh(env, `/repos/${REPO}/pulls/${pr.number}/files?per_page=50`, { soft: true }) || []).map(f => f.filename) : [];
    return json({
      files, branch: BR(n),
      ...brief(issue), isi: issue.body || '', url: issue.html_url,
      riwayat: cs.map(c => ({ dari: c.body.startsWith('Revisi:') ? 'kamu' : 'agent', teks: c.body, waktu: c.created_at })),
      pr: pr && { n: pr.number, url: pr.html_url, state: pr.state, merged: !!pr.merged_at },
      preview: pr ? `/p/${n}/` : null,
      actions: `https://github.com/${REPO}/actions/workflows/kepo-dev.yml`,
    });
  }
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  if (act === 'revisi') {
    const isi = String(body.isi || '').trim();
    if (isi.length < 3) return json({ error: 'Tulis revisinya dulu' }, 400);
    if (issue.state === 'closed') await gh(env, `/repos/${REPO}/issues/${n}`, { method: 'PATCH', body: JSON.stringify({ state: 'open' }) });
    await gh(env, `/repos/${REPO}/issues/${n}/labels`, { method: 'PUT', body: JSON.stringify({ labels: [...lbl(issue).filter(x => x === LABEL || x.startsWith('peran:') || x === 'otomatis'), 'sedang-dikerjakan'] }) });
    await gh(env, `/repos/${REPO}/issues/${n}/comments`, { method: 'POST', body: JSON.stringify({ body: 'Revisi: ' + isi }) });
    return json({ ok: true });
  }
  if (act === 'setujui') {
    const pr = await openPR(env, n);
    if (!pr || pr.state !== 'open') return json({ error: 'Belum ada perubahan yang siap digabung' }, 400);
    const r = await gh(env, `/repos/${REPO}/pulls/${pr.number}/merge`, { method: 'PUT', body: JSON.stringify({ merge_method: 'squash' }), soft: true });
    if (!r || !r.merged) return json({ error: 'Gagal menggabung: ' + (r && r.message) }, 409);
    await gh(env, `/repos/${REPO}/issues/${n}/labels`, { method: 'POST', body: JSON.stringify({ labels: ['live'] }) });
    await gh(env, `/repos/${REPO}/issues/${n}/labels/siap-dicek`, { method: 'DELETE', soft: true });
    await gh(env, `/repos/${REPO}/issues/${n}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed', state_reason: 'completed' }) });
    await gh(env, `/repos/${REPO}/git/refs/heads/${BR(n)}`, { method: 'DELETE', soft: true });
    return json({ ok: true });
  }
  if (act === 'tolak') {
    const pr = await openPR(env, n);
    if (pr && pr.state === 'open') await gh(env, `/repos/${REPO}/pulls/${pr.number}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed' }) });
    await gh(env, `/repos/${REPO}/issues/${n}/labels`, { method: 'POST', body: JSON.stringify({ labels: ['ditolak'] }) });
    await gh(env, `/repos/${REPO}/issues/${n}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed', state_reason: 'not_planned' }) });
    return json({ ok: true });
  }
  return json({ error: 'not found' }, 404);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    try {
      if (url.pathname.startsWith('/api/')) return await api(req, env, url);
      const pm = url.pathname.match(/^\/p\/(\d+)(\/.*)?$/);
      if (pm) {
        if (!pm[2]) return Response.redirect(url.origin + `/p/${pm[1]}/`, 302);
        return await preview(env, pm[1], decodeURIComponent(pm[2].slice(1)));
      }
      if (url.pathname === '/' || url.pathname === '/index.html') return new Response(PAGE, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
      return new Response('Not found', { status: 404 });
    } catch (e) {
      return json({ error: String(e.message || e) }, 500);
    }
  },
};
