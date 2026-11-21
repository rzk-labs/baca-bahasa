# Spesifikasi: logo Keepo kepotong di header (#1291)

## Intinya
- Yang kepotong itu logo "Keepo" di pojok kiri atas: huruf "o" terpotong.
- Penyebabnya chip 7 hari, 2211 XP, Masuk, dan Atur terlalu lebar.
- Perbaikan: logo selalu utuh; chip XP disembunyikan di HP.

## 1. Masalah (revisi founder)
- Screenshot kedua: logo terbaca "Keepc". Chip menimpa huruf terakhir.
- Terjadi saat angka chip besar (7 hari, 2211 XP) di HP 390px.
- Screenshot pertama: logo utuh, tapi Home terbuka tergulir. Itu masalah kedua (bagian 4).

## 2. Penyebab
- style.css:957 menyembunyikan `#pXp` di ≤430px demi logo utuh (#932).
- style.css:1056 menimpanya: `#pXp{display:inline-flex}`. Chip XP tampil lagi.
- `#hdx` (style.css:1082, `gap:10px`) lebih lebar dari sisa ruang.
- Hasil: header penuh, logo terdorong dan terpotong. Angka XP makin besar, makin parah.

## 3. Perbaikan yang diminta
- Hapus `#pXp{display:inline-flex}` dari style.css:1056 (≤430px). XP tetap ada di Home & Profil.
- Logo tetap `flex:0 0 auto; min-width:max-content; overflow:visible` di semua lebar ≤430px.
- `#hdx` boleh menyusut: `min-width:0`, `gap:6px`.
- Cek 320, 360, 390, 430px dengan "2211 XP" dan "999 hari". Logo harus utuh.
- Naikkan versi `C` di sw.js (style.css di-cache).

## 4. Masalah kedua (screenshot pertama)
- Home pengguna baru terbuka sudah tergulir; gambar buku terpotong separuh.
- `setTab` memanggil `scrollTo(0,0)` (ui.js:491) sebelum Home digambar; Safari memulihkan gulir lama.
- Perbaikan: `history.scrollRestoration='manual'` (try/catch) dan `scrollTo(0,0)` setelah `#view` terisi.
- `.hero-pic` (style.css:1133): `object-fit:contain`, tinggi otomatis, tanpa `max-height:140px`.

## 5. Cara cek
- iPhone Safari 390px, akun 2211 XP: logo "Keepo" utuh.
- Muat ulang Home saat gulir di bawah: judul tetap di atas.
- Data pengguna lama tidak berubah.

Mockup: `docs/mockup-1291.html`.
