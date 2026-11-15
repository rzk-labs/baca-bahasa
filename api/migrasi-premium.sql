-- Penanda akun premium (peta 112). Jalankan sekali.
ALTER TABLE users ADD COLUMN premium INTEGER NOT NULL DEFAULT 0;
UPDATE users SET premium = 1 WHERE username = 'chiko';
