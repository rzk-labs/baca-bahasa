# Desain: Minggu ini vs streak (#1360)

## Intinya
- Dua angka itu beda ukuran: "dari 7 hari" vs "beruntun".
- Kartu Minggu ini: "5 dari 7 hari baca" + "Beruntun 4 hari tanpa putus".
- Rumus streak dan XP tidak diubah.

## 1. Masalah
- Kartu bilang "7 hari ada bacaan", pil bilang "4 hari".
- Tanpa penjelasan, pengguna kira salah hitung.
- Penyebab kecil: kartu menghitung 8 hari, bukan 7.

## 2. Perbaikan
- Hitung tepat 7 hari (hari ini + 6 sebelumnya).
- Label: "dari 7 hari baca".
- Baris kecil di bawahnya: "Beruntun N hari tanpa putus" (dari fungsi streak yang sama).

## 3. Catatan
- Baris beruntun hanya muncul saat kartu menampilkan hari.
- Muat di 320px; teks 12px.
- Mockup: docs/mockup-1360.html.
