-- Akun premium (#1103). Jalankan sekali: wrangler d1 execute <nama-db> --remote --file=migrasi-premium.sql
ALTER TABLE users ADD COLUMN premium INTEGER NOT NULL DEFAULT 0;
UPDATE users SET premium = 1 WHERE username = 'chiko';
