-- Kepo API — skema D1
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  nick TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  data TEXT,                 -- JSON progres (XP, streak, lencana, kata)
  xp INTEGER NOT NULL DEFAULT 0,
  week TEXT,                 -- minggu ISO, mis. 2026-W46
  week_xp INTEGER NOT NULL DEFAULT 0,
  hidden INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_users_week ON users(week, week_xp DESC);
CREATE TABLE IF NOT EXISTS shares (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  lang TEXT NOT NULL,
  body TEXT NOT NULL,        -- JSON array paragraf
  size INTEGER NOT NULL,
  opens INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_shares_user ON shares(user_id);
-- Buku di akun (teks gzip+base64, dipotong per baris)
CREATE TABLE IF NOT EXISTS book_meta (
  user_id INTEGER NOT NULL,
  bkey TEXT NOT NULL,
  meta TEXT NOT NULL,        -- JSON {title, lang, added}
  n INTEGER NOT NULL,        -- jumlah potongan
  size INTEGER NOT NULL,     -- ukuran terkompresi
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, bkey)
);
CREATE TABLE IF NOT EXISTS book_chunk (
  user_id INTEGER NOT NULL,
  bkey TEXT NOT NULL,
  idx INTEGER NOT NULL,
  data TEXT NOT NULL,
  PRIMARY KEY (user_id, bkey, idx)
);
