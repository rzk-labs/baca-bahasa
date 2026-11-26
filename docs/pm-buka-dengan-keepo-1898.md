# Buka file langsung dengan Keepo (#1898)

Permintaan founder: "Kalau download app bisa langsung open by keepo". Dibaca: file buku yang baru diunduh (.epub, .pdf, .txt) bisa dibuka langsung di Keepo, tanpa buka app dulu lalu pilih file.

## Intinya
- Keepo tampil di daftar "Buka dengan…" untuk file .epub, .pdf, .txt.
- Android & komputer: bisa lewat PWA. iPhone: butuh app iOS (menunggu Apple).
- Dikerjakan developer lewat 3 langkah kecil; impor lama tidak berubah.

## 1. Apa yang terjadi di layar
- Pengguna unduh buku, ketuk file, pilih "Keepo".
- Keepo terbuka, buku masuk rak, layar "Cerita ditambahkan" muncul dengan tombol "Mulai baca".
- Bila buku sudah ada: pakai alur duplikat yang sudah ada.
- Mockup: `docs/mockup-1898.html`.

## 2. Cara membangunnya (developer)
- `manifest.webmanifest`: tambah `file_handlers` (epub, pdf, txt) untuk Chrome/Edge komputer.
- `manifest.webmanifest`: tambah `share_target` (POST berkas) agar muncul di menu Bagikan Android.
- `sw.js`: tangkap POST share, simpan berkas sementara, arahkan ke `./?buka=1`.
- `ui.js`: baca `launchQueue` dan berkas titipan, lalu panggil `importFile()` yang sudah ada.
- Naikkan versi `C` di `sw.js`.

## 3. Batas & risiko
- iPhone Safari/PWA tidak mendukung ini. Lewat app iOS: butuh tipe dokumen di app (kerja native, keputusan founder).
- Android hanya lewat Chrome PWA terpasang. Pengguna yang belum memasang tidak melihatnya.
- Berkas besar: pakai batas ukuran impor yang sudah ada.
- Data lama (IndexedDB) tidak diubah.

## 4. Cara uji
- Android Chrome (PWA terpasang): Bagikan .epub dari Files → Keepo → buku masuk rak.
- Chrome komputer: klik kanan .epub → Buka dengan → Keepo.
- Berkas salah jenis: pesan ramah, tanpa crash.
- Layar 320px & 390px.

## 5. Pertanyaan untuk founder
- Maksudnya memang file buku? Kalau maksudnya hal lain (mis. unduh app → langsung buka Keepo), beri tahu.
