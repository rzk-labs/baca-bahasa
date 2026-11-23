# Sheet Tamat: label "Coba buku contoh" (#1762)

## Intinya
- Tombol utama di sheet Tamat kini jujur: buku contoh berlabel "Coba buku contoh".
- Buku milik pengguna tetap "Lanjut: judul". Klik dan gaya tombol tak berubah.
- Sudah dibangun. Mockup: `docs/mockup-1762.html`.

## 1. Masalah
- Dina bingung: "Lanjut" menunjuk buku contoh yang bukan bukunya.
- Contoh bawaan muncul bila pengguna tak punya buku lain.

## 2. Aturan baru
- Buku contoh = judul berakhiran " (contoh)", atau ada di SAMPLES / cerita pendek.
- Tombol: "Coba buku contoh: <judul tanpa (contoh)>".
- Baris kecil: "<Bahasa> · Buku contoh dari Keepo".
- Buku pengguna: "Lanjut: <judul>" dan "<Bahasa> · <persen>".

## 3. Muat di layar kecil
- Judul panjang dipotong rapi maksimal 2 baris (gaya lama, tak diubah).
- Baris kecil satu baris, dipotong titik-titik.
- Diperiksa lewat gaya yang sama di 320px dan 390px, 4 tema.

## 4. Berkas berubah
- `ui.js` (teks tombol), `sw.js` (versi cache naik ke kepo-v646).
