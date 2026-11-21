# Spesifikasi: angka Home & Minggu ini harus cocok (#1015)

## Intinya
- Angka halaman, kata, persen, dan XP harus sama di semua layar.
- Satu hitungan per angka, dihitung dari data yang sudah lengkap.
- Angka basi tidak boleh tampil: tunggu data siap, baru gambar.

## 1. Masalah (laporan Dina & Raka)
- Minggu ini: "2 halaman dibaca", padahal baca 8 halaman.
- Kata disimpan: kartu Home, Minggu ini, dan catatan sesi beda angka.
- Persen buku tampil 1% lalu loncat 9%. XP/Level ikut loncat tanpa aksi.

## 2. Penyebab (hasil baca kode)
- `weekCard` (ui.js ~811) membatasi halaman dengan `pos + 1` buku. Itu posisi baca sekarang, bukan halaman yang pernah dibuka. Baca lompat/ulang → angka mengecil.
- Hitungan kata sudah satu pintu (`countedVocab`, app.js ~647). Yang belum: bahasa & buku yang dipakai tiap layar, dan teks catatan sesi.
- Persen 1% → 9%: bobot bab (`b.units`) dihitung belakangan (ui.js ~351) setelah Home sudah tergambar.
- XP/Level loncat: Home tergambar dari nilai awal, lalu data tersinkron mengubahnya.

## 3. Aturan yang diminta
**A. Halaman Minggu ini**
- Hitung dari `db.pgDay` 7 hari terakhir (halaman unik yang dibuka).
- Jangan dibatasi `pos` buku yang sedang dipilih.
- Batas atas: jumlah total halaman semua buku (`b.total`), bukan `pos + 1`.

**B. Kata disimpan**
- Satu hitungan: `countedVocab(langs, since, book)`.
- Minggu ini, catatan sesi, dan kartu Home memakai bahasa buku yang sama.
- Catatan sesi tidak boleh menyebut kata baru yang tidak masuk hitungan (tanpa arti, kata sampah, duplikat).

**C. Persen, XP, Level**
- Render Home hanya setelah data penuh dimuat (units, sinkron awal).
- Bila belum siap: sembunyikan angka (strip/kerangka), jangan nilai awal.
- Persen tak boleh turun lalu naik tanpa aksi pengguna.

## 4. Batasan
- Jangan ubah format data IndexedDB/localStorage. Tanpa migrasi.
- Naikkan versi `C` di sw.js. Cek `node --check ui.js app.js`.
- Tetap jalan di iPhone Safari dan layar lebar.

## 5. Cara uji
- Baca 8 halaman (urutan lompat) → Minggu ini tulis 8.
- Simpan 3 kata → angka sama di Home, Minggu ini, catatan sesi.
- Buka ulang app 5 kali: persen dan XP tidak berubah sendiri.

## 6. Mockup
- Lihat `docs/mockup-1015.html` (Sebelum / Sesudah).
