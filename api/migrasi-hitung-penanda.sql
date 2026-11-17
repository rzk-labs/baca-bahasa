-- Penanda aktivasi anonim di /hitung. Jalankan SEKALI (D1 tak punya ADD COLUMN IF NOT EXISTS;
-- kalau kolom sudah ada, perintah gagal "duplicate column" dan aman diabaikan). Data lama tidak diubah.
ALTER TABLE hitung ADD COLUMN baca INTEGER NOT NULL DEFAULT 0;
ALTER TABLE hitung ADD COLUMN kata INTEGER NOT NULL DEFAULT 0;
ALTER TABLE hitung ADD COLUMN akt INTEGER NOT NULL DEFAULT 0;
