# Spesifikasi: Tombol Feedback Kirim Langsung ke HQ (#234)

## Intinya
- Tombol "Kirim" langsung mengirim masukan ke Keepo HQ. Tanpa buka WhatsApp/email/bagikan.
- Butuh endpoint baru di server. Deploy manual oleh founder.
- Kalau offline atau gagal, masukan tetap aman di HP dan dikirim ulang nanti.

## 1. Masalah sekarang
- "Kirim" hanya menyalin teks atau membuka menu bagikan.
- Pengguna harus tempel sendiri ke pesan. Banyak yang berhenti di situ.
- Kontak tujuan (`FEEDBACK_KONTAK`) masih kosong, jadi masukan tidak pernah sampai.

## 2. Alur baru (pengguna)
- Isi form seperti biasa (jenis, teks, bintang, info HP opsional).
- Ketuk "Kirim": tombol jadi "Mengirim…", lalu toast "Makasih masukannya! 💚".
- Gagal/offline: toast "Belum terkirim, disimpan dulu. Nanti dikirim otomatis."
- Tidak ada langkah tambahan. Tidak ada akun wajib.

## 3. Alur data
- App kirim `POST /feedback` ke server (JSON: jenis, teks, bintang, info HP, versi app, waktu).
- Server menulis komentar ke issue "Masukan pengguna" (label `masukan-pengguna`).
- Dengan begitu HQ langsung menampilkannya di kotak masukan, tanpa ubah pembaca HQ.
- Pilihan A: Worker `api/` + tabel D1 `feedback` (arsip rapi).
- Pilihan B: Worker HQ (`dev/`) menerima POST lalu menulis komentar GitHub (lebih sederhana).

## 4. Aturan server
- Maks 5 kiriman per jam per perangkat. Teks maks 500 huruf.
- Tanpa nama, tanpa email, tanpa isi buku. Info HP hanya bila dicentang.
- Komentar diberi tanda "🌐 Pengguna nyata" agar beda dari tester AI.
- Tolak teks kosong. Bersihkan tautan/HTML sebelum tampil.

## 5. Tugas developer
- `ui.js`: ganti pengiriman di `openFeedback` jadi `fetch` ke endpoint.
- Simpan dulu di IndexedDB (`putFeedback`, sudah ada) dengan `terkirim: false`; set true setelah sukses.
- Kirim ulang yang belum terkirim saat app dibuka atau kembali online.
- Salin/bagikan hanya jadi cadangan jika server menolak berulang.
- `app.js`: fungsi baca/tandai antrean. Data lama aman (kolom baru opsional).
- Server: endpoint baru (setelah founder setuju menyentuh `api/` atau `dev/`).
- Naikkan versi `C` di `sw.js`. Cek `node --check`.

## 6. Ukuran sukses
- Kirim selesai ≤30 detik, 1 ketukan setelah mengisi.
- ≥90% masukan yang dikirim muncul di HQ.
- Nol masukan hilang saat offline.

## 7. Keputusan untuk founder
- Pilih A (server utama) atau B (Worker HQ)?
- Setuju deploy manual setelah kode siap?
