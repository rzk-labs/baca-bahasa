# Minggu ini: halaman dibaca tak bengkak (#1350)

## Intinya
- Kartu "Minggu ini" sempat bilang 236 halaman, padahal nyata 7.
- Baca ulang tak lagi menambah angka; halaman sama dihitung sekali per 7 hari.
- XP dan streak tidak berubah.

## 1. Penyebab
- Penjaga dobel hanya berlaku per hari.
- Baca ulang buku tamat tetap menambah hitungan.

## 2. Perbaikan (sudah dikodekan)
- Buku tamat: hitungan halaman tidak naik (sama seperti XP = 0).
- Penanda ringan `db.pgWeek`: kunci halaman → hari; buang yang lebih tua dari 8 hari.
- Data lama `db.pgDay` tetap terbaca; tanpa migrasi.

## 3. Satu sumber angka
- Home, Profil, dan rekap sesi sama-sama memakai `pagesWeek()`.
- Rekap sesi dibatasi tak melebihi angka Minggu ini.

## 4. Catatan
- Versi cache naik ke `kepo-v474`.
- Mockup: `docs/mockup-1350.html`.
