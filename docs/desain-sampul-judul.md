# Desain: sampul tanpa gambar (#1411)

## Intinya
- Sampul polos kini menampilkan huruf awal DAN judul pendek.
- Sampul dengan gambar tidak berubah sama sekali.
- Berlaku di Koleksi, kartu Home, dan Profil Rak.

## 1. Apa yang berubah
- `cover()` di `ui.js` menambah teks judul (`splitTitle(...).main`) bila tanpa gambar.
- Ukuran huruf judul pakai `coverSz()`; CJK pakai `word-break`.
- Gaya baru di akhir `style.css`; versi `sw.js` naik ke `kepo-v502`.

## 2. Aturan tampilan
- Koleksi (132px): huruf 48px, judul maks 3 baris.
- Sampul kecil (<80px: hero Home, Profil Rak): huruf 26px, judul 2 baris.
- Teks judul tak pernah di bawah `--fs-min` (12px).

## 3. Warna
- Memakai palet `CCOL` yang ada (Biru Es, Plum Noir, Wasabi).
- Semua pasangan teks/latar sudah kontras (ungu tua di terang, krem di gelap).

## 4. Aksesibilitas
- `aria-label` tetap judul penuh; teks di sampul `aria-hidden`.
- Judul di bawah sampul Home dan bar lencana tidak disentuh.

## 5. Cek
- Layar 320px dan 390px: judul terpotong rapi dengan line-clamp.
- Perlu dicoba manual di iPhone Safari.

## 6. Perbaikan judul Korea/Jepang (#1591)
- Korea: `word-break: keep-all`, patah di spasi, bukan di tengah kata.
- Jepang/Mandarin: tetap boleh patah per huruf.
- `text-wrap: balance` agar baris seimbang; tanpa dukungan, patah biasa.
- Judul CJK >10 huruf turun satu tingkat (kelas `c2`, tetap >= 12px).
- Sampul bergambar, huruf awal, palet `CCOL` tak berubah; `sw.js` naik ke `kepo-v575`.
