CREATE TABLE IF NOT EXISTS laporan_post (post_id INTEGER NOT NULL, user_id INTEGER NOT NULL, alasan TEXT, created_at INTEGER NOT NULL, PRIMARY KEY (post_id, user_id));
CREATE TABLE IF NOT EXISTS blokir (user_id INTEGER NOT NULL, target_id INTEGER NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY (user_id, target_id));
