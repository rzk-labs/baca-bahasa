# Ruang bawah Home di HP (#2022)

## Intinya
- Sekarang hanya satu aturan ruang bawah, lewat token `--view-gap-bawah`.
- Tombol terakhir kartu Home naik di atas bar menu.
- Belum dites di browser sungguhan (Playwright tidak dijalankan).

## 1. Yang diubah
- Token baru: `--view-gap-bawah` = area aman + tinggi bar + 152px.
- 9 aturan padding bawah bertumpuk dihapus (angka 82–152px).
- Satu aturan tersisa: `body:not(.reading) #view{padding-bottom:var(--view-gap-bawah)}`.

## 2. Kenapa 152px
- Angka terbesar lama (kartu Target/kunci di layar kecil) jadi standar.
- Rak buku sebelumnya hanya 82px, itu yang memotong tombol.
- Toast melayang di atas bar, jadi tidak menutupi tombol terakhir saat bisa digulir.

## 3. Cek manual
- Buka Home kosong, 'Simpan 1 kata dulu', kartu ulang, Target.
- Lebar 320, 360, 390px: tombol terakhir terlihat penuh saat digulir.
- Tab Baca dan Kata: item terakhir tidak tertutup bar.
