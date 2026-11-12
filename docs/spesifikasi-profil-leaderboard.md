# Spesifikasi: profil user dari leaderboard + baca bacaannya (#383)

## Intinya
- Ketuk nama di leaderboard → buka profil user itu.
- Profil menampilkan cerita yang user itu pilih untuk dibuka ke publik.
- Aman hak cipta: cerita publik hanya jika pemilik sengaja mencentang.

## 1. Kondisi sekarang
- Leaderboard (`cloud.js`, `lbRow`) hanya teks, tidak bisa diketuk.
- Bagikan cerita = link pribadi (`?share=kode`), tabel `shares` di server.
- Server belum punya profil user atau daftar cerita per user.
- Riset hak cipta: bagikan bebas berisiko (`docs/riset-hak-cipta.md`).

## 2. Alur pengguna
- Leaderboard: baris bisa diketuk → sheet "Profil".
- Profil: avatar, nama, XP minggu ini, daftar cerita publik.
- Ketuk cerita → sheet "Cerita dari teman" yang sudah ada → Tambah ke koleksi.
- Belum masuk akun: ketuk baris → ajak masuk dulu.
- Profil kosong: "Belum ada cerita yang dibuka."

## 3. Pilihan publik (kunci aman)
- Di sheet Bagikan: saklar "Tampilkan di profilku", default MATI.
- Saat dinyalakan: pernyataan wajib "Ini cerita milikku / bebas hak cipta".
- Link pribadi tetap jalan seperti sekarang.
- Pemilik bisa mematikan kapan saja; cerita hilang dari profil.
- User yang "Sembunyikan" dari leaderboard: profilnya juga tidak bisa dibuka.

## 4. Perubahan server (deploy manual oleh founder)
- Tabel `shares`: tambah kolom `public` (0/1), default 0.
- `GET /profile/:username`: nama, XP minggu ini, daftar cerita publik (id, judul, bahasa, jumlah paragraf).
- `POST /share/:id/public`: ubah publik/privat, hanya pemilik.
- Jangan kirim isi cerita di daftar; isi tetap lewat `/share/:id`.
- Batasi daftar 50 cerita; hitung `opens` seperti sekarang.
- `/leaderboard` sudah mengirim `username`; tidak perlu diubah.

## 5. Perubahan aplikasi
- `cloud.js`: baris leaderboard jadi tombol; fungsi `openProfile(username)`.
- `cloud.js`: saklar publik + pernyataan di `shareBook`.
- `style.css`: gaya baris yang bisa diketuk (ikuti BRAND.md).
- `sw.js`: naikkan versi `C`.
- Data IndexedDB lama tidak diubah; field baru opsional.

## 6. Risiko
- Hak cipta: buku berhak cipta bisa tersebar → default mati + pernyataan + tombol lapor.
- Privasi: profil hanya tampilkan nama panggilan, bukan email.
- Tombol lapor: lewat fitur feedback (#234) sebelum rilis publik.

## 7. Uji selesai
- Ketuk baris leaderboard buka profil yang benar.
- Cerita default tidak muncul di profil.
- Nyalakan saklar → cerita muncul; matikan → hilang.
- User tersembunyi: profil tidak bisa dibuka.
- Jalan di iPhone Safari & layar lebar.
