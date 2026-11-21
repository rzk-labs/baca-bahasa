# Saringan kata sesi satu pintu (#1488)

## Intinya
- Catatan sesi dan sheet Tamat kini memakai satu saringan kata yang sama.
- Kata bahasa lain (mis. Korea di buku Jepang) dan partikel tak ikut lagi.
- Bila tak ada kata baru, teksnya sama di kedua layar.

## 1. Penyebab
- Ketukan kata dicatat hanya dengan cek partikel, tanpa cek bahasa/skrip.
- Dua layar menyaring sendiri-sendiri, salinan kodenya bisa beda.

## 2. Perbaikan
- `kataSesiBaru()` di ui.js: satu saringan (bahasa buku, bukan kata sampah, belum tersimpan).
- Dipakai oleh sheet Tamat dan "Kata sesi ini".
- Pencatatan ketukan kini memakai `isKataSampah` dari app.js.
- Teks kosong dipusatkan di `TXT_TAK_ADA_BARU`.

## 3. Cara uji
- Buka buku Jepang, ketuk satu kata Jepang, baca sampai tamat.
- Cek sheet Tamat dan "Kata sesi ini": jumlah dan kata sama.
- Ketuk kata Korea/partikel di buku Jepang: tak muncul di kedua layar.
