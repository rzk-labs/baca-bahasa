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
