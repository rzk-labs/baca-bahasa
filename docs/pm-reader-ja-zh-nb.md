# Reader Jepang/Mandarin: teks tak lagi terpotong (#1722)

## Intinya
- Teks Jepang/Mandarin di HP terpotong dan menumpuk sejak #1709.
- Sebabnya: satu kalimat utuh jadi satu blok yang dilarang pindah baris.
- Sudah diperbaiki: tiap kata satu blok, bebas pindah baris antar kata.

## 1. Penyebab
- Bahasa tanpa spasi: kata datang beruntun tanpa pemisah.
- Penampung tak pernah dikosongkan, jadi satu kalimat = satu blok nowrap.
- Blok lebih lebar dari kolom, maka terpotong dan tumpang tindih.

## 2. Perbaikan
- Penampung dikosongkan sebelum tiap kata baru.
- Pengecualian: kata yang disambung tanda hubung tetap satu blok.
- Tanda baca penutup tetap menempel pada kata sebelumnya (tujuan #1709 aman).
- Tambah `overflow-wrap:anywhere` untuk kata tunggal yang terlalu lebar.

## 3. Yang tidak berubah
- Buku Inggris/Indonesia: kata dipisah spasi, hasil sama seperti sebelumnya.
- Versi cache naik ke `kepo-v646`.

## 4. Bukti
- `node --check ui.js` lolos.
- Mockup: `docs/mockup-1722.html`.
