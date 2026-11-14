// Kepo Dev — panel permintaan untuk AI agent yang mengembangkan Kepo.
// Secrets: GH_TOKEN (akses repo), DEV_PASSWORD, SIGN_KEY.
import PAGE from './page.html';

const REPO = 'rzk-labs/baca-bahasa';
const LABEL = 'kepo-dev';
const BR = n => `kepo/issue-${n}`;

const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

async function gh(env, path, opt = {}) {
  // GitHub kadang balas 5xx/halaman error sesaat: ulangi (hanya GET) sampai 3x.
  const get = !opt.method || opt.method === 'GET';
  for (let i = 0; ; i++) {
    try {
      const d = await gh1(env, path, opt);
      return d;
    } catch (e) {
      if (!get || i >= 2 || !e.sesaat) { if (opt.raw && e.sesaat) return new Response('', { status: 502 }); if (opt.soft && e.sesaat) return null; throw e.sesaat ? new Error('GitHub sedang lambat, coba lagi sebentar') : e; }
      await new Promise(r => setTimeout(r, 600 * (i + 1)));
    }
  }
}
async function gh1(env, path, opt = {}) {
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
  const sesaat = () => Object.assign(new Error('sesaat'), { sesaat: true });
  if (r.status >= 500) throw sesaat();
  if (opt.raw) return r;
  const t = await r.text();
  let d = null;
  try { d = t ? JSON.parse(t) : null; } catch (e) { throw sesaat(); }
  if (!r.ok && !opt.soft) throw new Error(`GitHub ${r.status}: ${d && d.message}`);
  return d;
}

// ---- auth: token = exp.hmac(exp) ----
async function hmac(env, msg) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.SIGN_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const s = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(msg));
  return [...new Uint8Array(s)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function rapikanJudul(teks, maks = 70) {
  let t = String(teks || '').split('\n')[0].replace(/\s+/g, ' ').trim();
  if (t.length > maks) {
    const potong = t.slice(0, maks + 1);
    const sp = potong.lastIndexOf(' ');
    t = (sp > 0 ? potong.slice(0, sp) : t.slice(0, maks)).replace(/[\s,;:.\-–—]+$/, '') + '…';
  }
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function same(a, b) { if (a.length !== b.length) return false; let x = 0; for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i); return x === 0; }
async function authed(req, env) {
  const t = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
  const [exp, sig] = t.split('.');
  if (!exp || !sig || Date.now() > +exp) return false;
  return same(sig, await hmac(env, exp));
}

// Cache singkat di memori Worker (per isolate): kurangi panggilan GitHub yang berulang. Semua aksi tulis mengosongkannya.
const MEMO = new Map();
function memo(key, ttl, fn) {
  const m = MEMO.get(key);
  if (m && Date.now() - m.t < ttl) return m.p;
  const pr = Promise.resolve().then(fn);
  MEMO.set(key, { t: Date.now(), p: pr });
  pr.catch(() => { if (MEMO.get(key) && MEMO.get(key).p === pr) MEMO.delete(key); });
  return pr;
}

// Tanggal ubah terakhir + ringkasan 1 baris tiap dokumen (1 panggilan GraphQL; gagal = kosong)
async function docInfo(env, paths) {
  if (!paths.length) return {};
  try {
    const [owner, name] = REPO.split('/');
    const hist = paths.map((p, i) => `h${i}:history(path:"${p}",first:1){nodes{committedDate}}`).join(' ');
    const q = `{repository(owner:"${owner}",name:"${name}"){ref:ref(qualifiedName:"refs/heads/main"){target{...on Commit{${hist}}}} tree:object(expression:"main:docs"){...on Tree{entries{name object{...on Blob{text}}}}}}}`;
    const r = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + env.GH_TOKEN, 'user-agent': 'kepo-dev', 'content-type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    const d = await r.json();
    const repo = d && d.data && d.data.repository;
    if (!repo) return {};
    const tgt = (repo.ref && repo.ref.target) || {};
    const teks = {};
    ((repo.tree && repo.tree.entries) || []).forEach(e => { if (e.object && e.object.text != null) teks['docs/' + e.name] = e.object.text; });
    const out = {};
    paths.forEach((p, i) => {
      const n = tgt['h' + i] && tgt['h' + i].nodes && tgt['h' + i].nodes[0];
      const baris = String(teks[p] || '').split('\n').map(x => x.trim()).find(x => x && !/^#/.test(x) && !/^[-=*_]{3,}$/.test(x)) || '';
      const jd = (String(teks[p] || '').split('\n').find(x => /^#\s+\S/.test(x)) || '').replace(/^#\s+/, '').replace(/[*_`]/g, '').trim().slice(0, 90);
      out[p] = { judul: jd, diubah: n ? n.committedDate : null, ringkas: baris.replace(/[*_`>#]/g, '').replace(/^[-+]\s+/, '').slice(0, 100) };
    });
    return out;
  } catch (e) { return {}; }
}

function status(issue) {
  const L = issue.labels.map(l => l.name);
  if (L.includes('live')) return 'live';
  if (L.includes('ditolak') || issue.state === 'closed') return 'ditolak';
  if (L.includes('antre-live')) return 'menuju';
  if (L.includes('sedang-dikerjakan')) return 'dikerjakan';
  if (L.includes('siap-dicek')) return 'siap';
  if (L.includes('gagal')) return 'gagal';
  return 'antre';
}
const lbl = i => i.labels.map(l => l.name);
const brief = i => {
  const L = lbl(i);
  const p = L.find(x => x.startsWith('peran:'));
  return { n: i.number, judul: i.title, status: status(i), peran: p ? p.slice(6) : 'developer', otomatis: L.includes('otomatis'), terbuka: i.state === 'open',
    qa: L.includes('qa-lolos') ? 'lolos' : L.includes('qa-catatan') ? 'catatan' : null, dibuat: i.created_at, diubah: i.updated_at,
    ulang: [...new Set([...((i.title || '') + '\n' + (i.body || '')).matchAll(/(?:revisi|ulang|ulangi|pengganti)[^#\n]{0,25}#(\d+)/gi)].map(x => +x[1]))].filter(x => x !== i.number),
    gambar: [...new Set(String(i.body || '').match(/https:\/\/raw\.githubusercontent\.com\/[\w.-]+\/[\w.-]+\/main\/masukan-img\/[\w.-]+/g) || [])].slice(0, 3),
    rujuk: [...new Set(((i.title || '') + '\n' + (i.body || '') + '\n' + L.join(' ')).match(/#\d+/g) || [])].map(x => +x.slice(1)).filter(x => x !== i.number).slice(0, 20) };
};
const PERAN = ['developer', 'riset', 'desain', 'pm', 'marketing'];
const WF = { 'kepo-dev.yml': 'kerja', 'kepo-pm.yml': 'pm', 'kepo-pengguna.yml': 'pengguna' };

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

// ---- gambar: data URL -> file di repo (masukan-img/) -> tautan markdown ----
const IMG_MAX = 3, IMG_EACH = 400 * 1024, IMG_TOTAL = 1024 * 1024;
function imgJenis(b) {
  if (b.length > 12 && b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'jpg';
  if (b.length > 12 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return 'png';
  if (b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'webp';
  return '';
}
// Return { urls, catatan }. Tak pernah melempar: gambar gagal = teks tetap terkirim.
async function simpanGambar(env, daftar, awalan) {
  const out = { urls: [], catatan: '' };
  if (!Array.isArray(daftar) || !daftar.length) return out;
  const buang = [];
  let total = 0;
  for (const d of daftar.slice(0, IMG_MAX)) {
    const m = /^data:image\/(?:jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(d || ''));
    if (!m) { buang.push('bukan JPEG/PNG/WebP'); continue; }
    if (m[1].length > IMG_EACH * 4 / 3 + 8) { buang.push('terlalu besar'); continue; }
    let bytes;
    try { bytes = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0)); } catch (e) { buang.push('rusak'); continue; }
    const jenis = imgJenis(bytes);
    if (!jenis) { buang.push('isinya bukan gambar'); continue; }
    if (bytes.length > IMG_EACH) { buang.push('terlalu besar'); continue; }
    if (total + bytes.length > IMG_TOTAL) { buang.push('total terlalu besar'); continue; }
    total += bytes.length;
    try {
      const rnd = [...crypto.getRandomValues(new Uint8Array(5))].map(x => x.toString(16).padStart(2, '0')).join('');
      const path = `masukan-img/${awalan}-${Date.now().toString(36)}-${rnd}.${jenis}`;
      await gh(env, `/repos/${REPO}/contents/${path}`, { method: 'PUT', body: JSON.stringify({ message: 'Gambar masukan', content: m[1], branch: 'main' }) });
      out.urls.push(`https://raw.githubusercontent.com/${REPO}/main/${path}`);
    } catch (e) { buang.push('gagal disimpan'); }
  }
  if (daftar.length > IMG_MAX) buang.push('lebih dari ' + IMG_MAX);
  if (buang.length) out.catatan = `${buang.length} gambar tidak ikut (${[...new Set(buang)].join(', ')})`;
  return out;
}
const mdGambar = urls => urls.length ? '\n\n' + urls.map((u, i) => `![gambar ${i + 1}](${u})`).join('\n') : '';

// Cache jawaban GET: /hq & /hasil 15 dtk, /doc 60 dtk, detail tugas 10 dtk, file PR 30 dtk.
// Login dicek dulu supaya cache tak pernah dibaca tanpa izin. Aksi tulis mengosongkannya (sebelum & sesudah).
const ttlGet = p => (p === '/hq' || p === '/hasil') ? 15000 : p === '/doc' ? 60000 : /^\/tasks\/\d+$/.test(p) ? 10000 : /^\/pr\/\d+\/files$/.test(p) ? 30000 : 0;
async function api(req, env, url) {
  const p = url.pathname.replace(/^\/api/, '');
  const ttl = req.method === 'GET' ? ttlGet(p) : 0;
  if (ttl) {
    if (!(await authed(req, env))) return json({ error: 'Perlu login' }, 401);
    const key = 'r:' + p + url.search;
    const r = await memo(key, ttl, async () => { const x = await api0(req, env, url); return { s: x.status, t: await x.text() }; });
    if (r.s !== 200) MEMO.delete(key);
    return new Response(r.t, { status: r.s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
  }
  const res = await api0(req, env, url);
  if (req.method !== 'GET') MEMO.clear();
  return res;
}
async function api0(req, env, url) {
  const p = url.pathname.replace(/^\/api/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};

  if (p === '/login' && req.method === 'POST') {
    if (!body.pw || !same(String(body.pw), env.DEV_PASSWORD)) return json({ error: 'Password salah' }, 401);
    const exp = String(Date.now() + 30 * 864e5);
    return json({ token: exp + '.' + (await hmac(env, exp)) });
  }
  if (!(await authed(req, env))) return json({ error: 'Perlu login' }, 401);

  if (req.method !== 'GET') MEMO.clear();
  if (p === '/hq' && req.method === 'GET') {
    // Semua panggilan jalan bersamaan: dokumen, masukan, dan catatan QA menempel pada panggilan awalnya.
    const issuesP = gh(env, `/repos/${REPO}/issues?labels=${LABEL}&state=all&per_page=60&sort=created&direction=desc`);
    const docsP = gh(env, `/repos/${REPO}/contents/docs`, { soft: true });
    const infoP = docsP.then(docs => {
      const dl = Array.isArray(docs) ? docs.filter(d => d.name.endsWith('.md') && /^docs\/[\w.-]+\.md$/.test(d.path)).map(d => d.path) : [];
      return memo('docinfo:' + dl.join(','), 300000, () => docInfo(env, dl));
    });
    const masP = gh(env, `/repos/${REPO}/issues?labels=masukan-pengguna&state=open&per_page=1`, { soft: true }).then(async mi => {
      const mn = Array.isArray(mi) && mi[0] ? mi[0].number : 0;
      if (!mn) return { mn, masukan: [] };
      const masukan = await memo('masukan:' + mn, 60000, async () => {
        const iss = await gh(env, `/repos/${REPO}/issues/${mn}`, { soft: true });
        const tot = (iss && iss.comments) || 0, pg = Math.max(1, Math.ceil(tot / 30));
        const cs = await gh(env, `/repos/${REPO}/issues/${mn}/comments?per_page=30&page=${pg}`, { soft: true });
        return Array.isArray(cs) ? cs.slice(-12).map(c => ({ teks: c.body, waktu: c.created_at })) : [];
      });
      return { mn, masukan };
    });
    // isi catatan QA (1 baris) dari komentar, hanya tugas berlabel qa-catatan (maks 5)
    const tasksP = issuesP.then(async issues => {
      const tasks = issues.filter(i => !i.pull_request).map(brief);
      await Promise.all(tasks.filter(t => t.qa === 'catatan').slice(0, 5).map(async t => {
        const cs = await memo('qa:' + t.n + ':' + t.diubah, 120000, () => gh(env, `/repos/${REPO}/issues/${t.n}/comments?per_page=100`, { soft: true }));
        const c = Array.isArray(cs) && cs.filter(x => x.body.includes('QA ada catatan')).pop();
        if (!c) return;
        const tx = c.body.split('QA ada catatan**')[1] || '';
        const ln = tx.split('\n').map(x => x.replace(/^[\s>*#\-•]+/, '').replace(/[*_`]/g, '').trim()).find(x => x.length > 2 && !/^QA agent tidak menulis/.test(x));
        if (ln) t.qaTeks = ln.slice(0, 200);
      }));
      return tasks;
    });
    const [tasks, road, docs, runs, docs_info, mas] = await Promise.all([
      tasksP,
      gh(env, `/repos/${REPO}/contents/docs/roadmap.json`, { raw: true }).then(r => (r.ok ? r.json() : null)),
      docsP,
      gh(env, `/repos/${REPO}/actions/runs?per_page=15`, { soft: true }),
      infoP,
      masP,
    ]);
    const masukan = mas.masukan, mn = mas.mn;
    return json({
      tasks,
      roadmap: road,
      masukan, masukan_issue: mn, docs_info,
      docs: Array.isArray(docs) ? docs.filter(d => d.name.endsWith('.md')).map(d => d.path) : [],
      runs: runs && runs.workflow_runs ? runs.workflow_runs.filter(r => WF[r.path.split('/').pop()]).map(r => ({
        jenis: WF[r.path.split('/').pop()], judul: r.display_title, status: r.status, hasil: r.conclusion, mulai: r.run_started_at || r.created_at, url: r.html_url,
      })) : null,
    });
  }
  if (p === '/hasil' && req.method === 'GET') {
    // Komentar repo sangat ramai. Awalnya 1 halaman; halaman 2-6 (600 komentar) hanya bila laporan tugas "Siap dicek" belum ketemu.
    const pgK = pg => memo('kom:' + pg, 20000, () => gh(env, `/repos/${REPO}/issues/comments?sort=created&direction=desc&per_page=100&page=${pg}`, { soft: true }));
    const [issues, p1] = await Promise.all([
      gh(env, `/repos/${REPO}/issues?labels=${LABEL}&state=all&per_page=100&sort=created&direction=desc`),
      pgK(1),
    ]);
    const lap = {};
    const pindai = cs => (Array.isArray(cs) ? cs : []).forEach(c => {
      const n = +String(c.issue_url).split('/').pop();
      if (!lap[n] && /Siap dicek|tidak mengubah/i.test(c.body || '')) lap[n] = { teks: c.body, waktu: c.created_at };
    });
    pindai(p1);
    if (issues.some(i => !i.pull_request && status(i) === 'siap' && !lap[i.number])) (await Promise.all([2, 3, 4, 5, 6].map(pgK))).forEach(pindai);
    return json(issues.filter(i => !i.pull_request).map(i => ({ ...brief(i), laporan: lap[i.number] || null })));
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
    const judul = String(body.judul || '').trim() || rapikanJudul(isi, 70);
    await gh(env, `/repos/${REPO}/labels`, { method: 'POST', body: JSON.stringify({ name: LABEL, color: 'C6FF3D' }), soft: true });
    const peran = PERAN.includes(body.peran) ? body.peran : 'developer';
    const g = await simpanGambar(env, body.gambar, 'tugas');
    const i = await gh(env, `/repos/${REPO}/issues`, { method: 'POST', body: JSON.stringify({ title: judul, body: isi + mdGambar(g.urls), labels: [LABEL, 'peran:' + peran] }) });
    return json({ ...brief(i), catatan: g.catatan });
  }

  // Daftar file PR dimuat belakangan oleh layar detail (supaya detail tampil dulu)
  const fm = p.match(/^\/pr\/(\d+)\/files$/);
  if (fm && req.method === 'GET') {
    const [fl, prd] = await Promise.all([
      gh(env, `/repos/${REPO}/pulls/${+fm[1]}/files?per_page=100`, { soft: true }),
      gh(env, `/repos/${REPO}/pulls/${+fm[1]}`, { soft: true }),
    ]);
    // Gambar ![...](https://...) di isi PR ikut jadi mockup (maks 6, hanya https)
    const gambar = [...new Set([...String((prd && prd.body) || '').matchAll(/!\[[^\]]*\]\((https:\/\/[^\s)]+)\)/g)].map(x => x[1]))].slice(0, 6);
    return json({ files: Array.isArray(fl) ? fl.map(f => f.filename) : [], gambar });
  }
  const m = p.match(/^\/tasks\/(\d+)(?:\/(\w+))?$/);
  if (!m) return json({ error: 'not found' }, 404);
  const n = +m[1], act = m[2];
  const rapid = !act && req.method === 'GET';
  const [issue, cs0, pr0] = await Promise.all([
    gh(env, `/repos/${REPO}/issues/${n}`),
    rapid ? gh(env, `/repos/${REPO}/issues/${n}/comments?per_page=100`) : null,
    rapid ? openPR(env, n) : null,
  ]);
  if (!issue.labels.some(l => l.name === LABEL)) return json({ error: 'Bukan tugas Kepo Dev' }, 404);

  if (!act && req.method === 'GET') {
    const cs = cs0, pr = pr0;
    return json({
      branch: BR(n),
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
    const g = await simpanGambar(env, body.gambar, 'revisi' + n);
    await gh(env, `/repos/${REPO}/issues/${n}/comments`, { method: 'POST', body: JSON.stringify({ body: 'Revisi: ' + isi + mdGambar(g.urls) }) });
    return json({ ok: true, catatan: g.catatan });
  }
  if (act === 'setujui') {
    const pr = await openPR(env, n);
    if (!pr || pr.state !== 'open') return json({ error: 'Belum ada perubahan yang siap digabung' }, 400);
    // Masuk antrean live: workflow kepo-gabung.yml menggabungkan satu per satu & menyelesaikan bentrok.
    await gh(env, `/repos/${REPO}/labels`, { method: 'POST', body: JSON.stringify({ name: 'antre-live', color: '7DD3FC' }), soft: true });
    await gh(env, `/repos/${REPO}/issues/${n}/labels/siap-dicek`, { method: 'DELETE', soft: true });
    await gh(env, `/repos/${REPO}/issues/${n}/labels`, { method: 'POST', body: JSON.stringify({ labels: ['antre-live'] }) });
    return json({ ok: true, antre: true });
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

// ---- masukan pengguna nyata: POST /feedback (dari app Kepo) ----
const FB_ORIGIN = 'https://rzk-labs.github.io';
const FB_CORS = { 'access-control-allow-origin': FB_ORIGIN, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400', vary: 'Origin' };
const fbJson = (d, s = 200) => { const r = json(d, s); Object.entries(FB_CORS).forEach(([k, v]) => r.headers.set(k, v)); return r; };
const fbHits = new Map(); // perangkat -> waktu kiriman (per isolate; pembatas sederhana)
const fbClean = (t, n) => String(t == null ? '' : t).replace(/<[^>]*>/g, ' ').replace(/(?:https?:\/\/|www\.)\S+/gi, '[tautan]').replace(/[`@\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, n);
async function feedback(req, env) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: FB_CORS });
  if (req.method !== 'POST') return fbJson({ error: 'Metode salah' }, 405);
  if (req.headers.get('origin') !== FB_ORIGIN) return fbJson({ error: 'Asal tidak diizinkan' }, 403);
  let b; try { b = await req.json(); } catch (e) { return fbJson({ error: 'Data tidak valid' }, 400); }
  if (!b || typeof b !== 'object') return fbJson({ error: 'Data tidak valid' }, 400);
  const teks = fbClean(b.teks, 500);
  if (!teks) return fbJson({ error: 'Teks kosong' }, 400);
  const dev = fbClean(b.dev, 40) || req.headers.get('cf-connecting-ip') || 'x';
  const now = Date.now(), hits = (fbHits.get(dev) || []).filter(t => now - t < 3600e3);
  if (hits.length >= 5) return fbJson({ error: 'Terlalu sering, coba lagi nanti' }, 429);
  if (fbHits.size > 5000) fbHits.clear();
  const jenis = { rusak: 'Ada yang rusak', ide: 'Ide', suka: 'Suka', takedown: 'Takedown' }[b.jenis] || 'Ide';
  const bin = Math.max(0, Math.min(5, parseInt(b.bintang, 10) || 0));
  let body = `🌐 **Pengguna nyata** · ${jenis}\n\n${teks}`;
  if (bin) body += `\n\nBintang: ${bin}/5`;
  const info = fbClean(b.info, 300);
  if (info) body += `\n\nInfo HP: ${info}`;
  const m = await gh(env, `/repos/${REPO}/issues?labels=masukan-pengguna&state=open&per_page=1`);
  let n = Array.isArray(m) && m[0] ? m[0].number : 0;
  if (!n) {
    await gh(env, `/repos/${REPO}/labels`, { method: 'POST', body: JSON.stringify({ name: 'masukan-pengguna', color: 'F2A6C8' }), soft: true });
    const c = await gh(env, `/repos/${REPO}/issues`, { method: 'POST', body: JSON.stringify({ title: 'Masukan pengguna', labels: ['masukan-pengguna'], body: 'Kotak masukan dari pengguna Keepo.' }) });
    n = c && c.number;
  }
  if (!n) return fbJson({ error: 'Gagal menyimpan' }, 502);
  const g = await simpanGambar(env, b.gambar, 'masukan');
  body += mdGambar(g.urls);
  await gh(env, `/repos/${REPO}/issues/${n}/comments`, { method: 'POST', body: JSON.stringify({ body }) });
  hits.push(now); fbHits.set(dev, hits);
  return fbJson({ ok: true, ...(g.catatan ? { catatan: g.catatan } : {}) });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    try {
      if (url.pathname === '/feedback') {
        try { return await feedback(req, env); } catch (e) { return fbJson({ error: 'Gagal menyimpan' }, 502); }
      }
      if (url.pathname.startsWith('/api/')) return await api(req, env, url);
      const gm = url.pathname.match(/^\/g\/([\w-]+\.(?:jpg|png|webp))$/);
      if (gm) {
        const r = await gh(env, `/repos/${REPO}/contents/masukan-img/${gm[1]}?ref=main`, { raw: true });
        if (!r.ok) return new Response('Tidak ditemukan', { status: 404 });
        return new Response(r.body, { headers: { 'content-type': MIME[gm[1].split('.').pop()] || 'application/octet-stream', 'cache-control': 'public, max-age=86400', 'x-content-type-options': 'nosniff' } });
      }
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
