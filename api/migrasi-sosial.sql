-- Migrasi sosial (jalankan sekali): kolom profil & tabel ikuti
ALTER TABLE users ADD COLUMN social INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN hide_titles INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN profile TEXT;
CREATE TABLE IF NOT EXISTS follows (follower_id INTEGER NOT NULL, followee_id INTEGER NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY (follower_id, followee_id));
CREATE INDEX IF NOT EXISTS idx_follows_followee ON follows(followee_id);
