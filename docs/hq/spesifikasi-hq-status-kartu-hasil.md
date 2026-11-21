# Spesifikasi: status 3 jenis di kartu Hasil Keepo HQ (#586)

## Intinya
- Kartu Hasil perlu satu label jelas: Progres, Belum diproses, atau Selesai.
- Label lama (Antre, Menunggu kamu, Menuju live, dll.) dipetakan ke 3 label ini.
- Hanya ubah tampilan `dev/` (Keepo HQ). Aplikasi Keepo tidak tersentuh.

## 1. Kondisi sekarang
- Kartu Hasil punya 7 label: Antre, Dikerjakan, Menunggu kamu, Menuju live, Live, Ditolak, Gagal.
- Terlalu banyak; founder sulit tahu "ini sudah beres atau belum".
- Label ada di `hasilKerja()` (objek `OK`) di `dev/src/page.html`.

## 2. Pemetaan ke 3 status
- **Belum diproses** (abu): `antre`.
- **Progres** (ungu): `dikerjakan`, `siap` (menunggu kamu cek), `menuju` (antrean live), `gagal` (perlu revisi).
- **Selesai** (hijau): `live`. **Ditutup** (abu gelap): `ditolak`.
- Label detail lama tetap tampil kecil di bawah judul, mis. "Menunggu kamu".

## 3. Rancangan kartu
- Satu chip status di kiri atas, warna beda tiap status.
- Chip peran dan chip QA tetap ada.
- Tambah penyaring di atas daftar: Semua · Belum diproses · Progres · Selesai.
- Hitungan di tiap penyaring; ikut pencarian yang sudah ada.

## 4. Tugas lanjutan (untuk developer)
- Ubah `OK`, `kartu` dan penyaring di `hasilKerja()` (`dev/src/page.html`).
- Cek `node --check dev/src/index.js`; uji lebar 320px.
- Syarat selesai: tiap kartu tepat satu dari 3 status; angka penyaring cocok.

## 5. Catatan
- Pemetaan `siap`/`gagal` ke "Progres" asumsi PM; bisa diubah bila founder mau lain.
- Tidak ada status tahap roadmap yang naik.
