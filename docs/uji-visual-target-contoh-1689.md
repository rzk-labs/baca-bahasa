# Uji visual baris contoh Target (#1689)

## Intinya
- Baris contoh "5 hlm + 10 kata" aman di 320, 360, 390px.
- Teks sekarang kontras penuh; ruang bawah ditambah di HP kecil.
- Kartu Target tidak lagi tertutup menu bawah.

## 1. Yang dicek
- Kartu dua kolom: lebar minimal ±130px, teks contoh ±85px muat.
- Warna kartu tetap sama di 4 tema baca (kartu Home tidak ikut tema).
- Teks contoh terpotong "…" hanya bila layar sangat sempit.

## 2. Yang diperbaiki
- Warna teks contoh: tinta penuh (sebelumnya 82%), tebal 700.
- HP di bawah 390px: ruang bawah +16px dari sebelumnya.
- Logika target tidak diubah.

## 3. Bukti
- Mockup: docs/mockup-1689.html.
- Versi cache naik ke kepo-v627.
- Cek sintaks ui.js lolos.
