# Spesifikasi: kata sering diketuk masuk tab Kata (#230)

## Intinya
- Laporan: kata yang sering diketuk tidak muncul di tab Kata.
- Penyebab: tab Kata hanya menampilkan kata yang sudah disimpan.
- Solusi: daftar "Sering diketuk" di tab Kata, simpan dengan satu ketukan.

## 1. Masalah
- Hitungan ketukan sudah ada (#83), tapi kata belum disimpan tak terlihat di mana pun.
- Pengguna mengira kata sulit mereka otomatis tercatat. Ternyata hilang dari pandangan.
- Satu-satunya jejak: saran "Sudah 3× diketuk" di sheet arti, sekali per kata.

## 2. Perilaku
- Kata belum disimpan dengan ketukan 3× atau lebih dianggap "sering diketuk".
- Di Kata → Tersimpan, atas daftar: bagian "Sering diketuk" (lipat, maks 5 kata teratas).
- Tiap baris: kata, lencana "5×", tombol "Simpan" satu ketukan.
- Simpan: kata pindah ke Tersimpan, hitungan terbawa (`takeTaps`), baris hilang.
- Arti diambil lewat terjemahan biasa. Gagal: simpan tanpa arti ("belum ada arti").
- Bagian ikut tersaring pencarian dan filter bahasa. Kosong: bagian tidak tampil.

## 3. Data
- Sumber: `db.taps` (kunci `"bahasa|kata"`), sudah ikut sinkron akun. Tanpa kolom baru.
- Tanpa migrasi. Data lama aman.
- Jangan hitung kata yang sudah ada di `db.vocab`.

## 4. Selesai bila
- Ketuk satu kata 3× (jeda >3 detik), jangan simpan: kata muncul di "Sering diketuk".
- Tekan Simpan: pindah ke Tersimpan dengan hitungan yang sama.
- Muat ulang app: bagian tetap ada.
- HP 320px: tidak meluber, tombol minimal 44px.
- Naikkan versi `C` di `sw.js`; cek `node --check` file yang diubah.

## 5. Di luar cakupan
- Tidak ada server baru (`api/` tidak diubah).
- Tidak ada simpan otomatis tanpa persetujuan pengguna.
- Perbaikan font lencana `.tapb` (temuan Bima) boleh ikut dikerjakan.
