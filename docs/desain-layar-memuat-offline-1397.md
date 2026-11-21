# Layar memuat & Sosial: jalan keluar sejak awal (#1397)

## Intinya
- Tombol 'Lanjut tanpa menunggu' tampil sejak mulai memuat.
- Layar memuat/gagal & Sosial: ada 'Bacaanmu tetap bisa dibuka offline'.
- Sosial punya tombol 'Buka bacaanku' di samping 'Coba lagi'.

## 1. Home memuat
- Tombol muncul langsung, tidak menunggu 8 detik.
- Ketuk = rak lokal tampil (bkSkip), data tidak berubah.

## 2. Sosial & error jaringan
- Satu baris penenang di atas tombol.
- 'Buka bacaanku' membuka buku terakhir; kalau kosong, ke Home.

## 3. Teknis
- Tombol min 44px; ditata wrap untuk 320/375/430px.
- sw.js naik ke kepo-v498. api/ dan IndexedDB tidak disentuh.
- Mockup: docs/mockup-1397.html. Belum diuji di perangkat nyata.
