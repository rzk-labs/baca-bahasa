# Spesifikasi #1132: Papan Tugas HP, kolom kosong melar

## Intinya
- Di HP, kolom kosong (mis. Dikerjakan) melar setinggi kolom terpanjang.
- Penyebab: baris grid `.board` meregangkan semua kolom. Judul "Kosong" tercentang di bawah.
- Perbaikan: satu aturan CSS di Keepo HQ. Kolom kosong jadi pil pendek.

## 1. Masalah
- Layar: Keepo HQ, tab Tugas, lebar HP.
- Kolom kosong: judul + angka 0 + "Kosong" terlihat di dasar layar.
- Atasnya hanya kotak biru kosong setinggi layar.
- Terlihat seperti papan rusak.

## 2. Penyebab
- `dev/src/page.html` baris ~102: `.board` grid, kolom sejajar.
- Grid default `align-items:stretch`, jadi semua kolom setinggi yang terpanjang.
- Aturan HP `.col.kosong` memakai `align-items:center` + `justify-content:space-between`.
- Dalam kolom tinggi, judul terdorong ke tengah/bawah.

## 3. Perbaikan (untuk developer)
- Tambah `align-items:start` pada `.board`.
- Kolom kosong lalu setinggi isinya: pil satu baris (judul kiri, "Kosong" kanan).
- Kolom berisi tetap normal.
- Jangan ubah tata letak desktop (`min-height:200px` tetap).
- Cek: `node --check dev/src/index.js`.

## 4. Syarat selesai
- HP 390px: kolom kosong setinggi ±44px.
- Tidak ada kotak biru kosong lebih tinggi dari 80px.
- Geser samping tetap jalan.
- Mockup: `docs/mockup-1132.html`.
