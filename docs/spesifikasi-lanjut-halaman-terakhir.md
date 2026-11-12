# Spesifikasi: lanjut baca di halaman terakhir (#367)

## Intinya
- Bug: buka ulang buku, malah muncul satu halaman sebelum halaman terakhir.
- Penyebab: posisi disimpan per kalimat, dan kalimat yang mulai di halaman sebelumnya terlewat.
- Perbaikan kecil di `showPage` dan `layout` (ui.js); tugas untuk developer.

## 1. Penyebab
- `showPage` (ui.js ±631) simpan `b.si` = kalimat pertama yang MULAI di halaman ini atau sesudahnya.
- Halaman tanpa awal kalimat (kalimat panjang menyambung, atau halaman akhir) tidak mengubah `b.si`.
- `b.si` lalu tertinggal di nilai halaman sebelumnya.
- `layout` (ui.js ±580) membuka halaman dari `b.si` itu, jadi mundur satu halaman.

## 2. Perbaikan yang diminta
- Di `showPage`: bila tak ada kalimat mulai di halaman ini, pakai kalimat terakhir yang mulai sebelumnya.
- Simpan juga halaman relatif: `b.pg` (halaman saat itu) dan `b.pgN` (jumlah halaman).
- Di `layout`: jika `b.pgN` sama dengan `RD.n`, buka `b.pg` langsung. Jika beda, pakai `b.si`.
- Buku lama tanpa `b.pg`: tetap jalan lewat `b.si` (tanpa migrasi data).

## 3. Cara uji
- Buka buku, ke halaman terakhir bab, tutup, buka lagi: harus di halaman terakhir.
- Ulangi di halaman dengan kalimat panjang yang menyambung ke halaman berikutnya.
- Ulangi setelah ganti ukuran font dan putar layar HP.
- Naikkan versi `C` di sw.js saat kode diubah.
