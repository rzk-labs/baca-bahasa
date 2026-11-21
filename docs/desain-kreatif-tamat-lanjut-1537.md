# Sheet Tamat: baris kecil di tombol Lanjut (#1537)

## Intinya
- Baris kecil "Belum mulai" di tombol utama dulu abu pucat, nyaris tak terbaca.
- Sekarang warnanya ikut warna teks tombol (opacity .85), jelas di semua tema.
- Isi teks, urutan tombol, dan logika tidak berubah.

## 1. Penyebab
- Baris kecil memakai class `mut` (abu) di dalam tombol `.pri` (latar gelap/Biru Es).
- Abu di atas Plum Noir kontrasnya rendah.

## 2. Perbaikan (style.css)
- `.fb-next.pri .fbn-m`: `color:inherit; opacity:.85`.
- `.fb-next.sec .fbn-m`: tetap `--color-text-muted`.

## 3. Kontras (perkiraan hitung)
- Terang, pri: krem #FAF7F0 di Plum #351E28, ±.85 → sekitar 9:1.
- Gelap, pri: Plum di Biru Es #D7EFFF, ±.85 → sekitar 9:1.
- Sec: muted #5F5059 di terang dan #C9BDC3 di gelap, keduanya di atas 4.5:1.
- Tema baca tidak memengaruhi tombol ini: tombol memakai warna aplikasi.

## 4. Cek tempat lain
- Tidak ada pasangan `.pri` + `mut sm` lain di dalam tombol.

## 5. Uji
- 320px dan 390px, mode terang dan gelap.
- Mockup: `docs/mockup-1537.html`.
