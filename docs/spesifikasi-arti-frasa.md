# Spesifikasi: arti frasa (#296)

Laporan: "harusnya ada terjemahan saat kata ditambah beberapa kata lain yang membuat artinya berbeda."

## Intinya
- Perluas frasa sudah ada (tombol +), tapi susah ditemukan dan hanya satu arah.
- Usul: tombol dua arah (kiri/kanan) plus petunjuk saat arti kata tunggal berbeda dari frasa.
- Prioritas P0: bantuan memahami kata. Perubahan kecil di sheet arti.

## 1. Kondisi sekarang
- Ketuk kata membuka sheet "Arti kata" (`onWord` di `ui.js`).
- Tombol `+` menambah satu kata ke kanan; kalau mentok, ke kiri.
- Maksimal 5 kata. Terjemahan dimuat ulang tiap perluasan.
- Raka (12-11): frasa 2-5 kata yang disimpan tidak digarisbawahi di teks.

## 2. Celah yang bikin laporan ini muncul
- Tombol `+` hanya ikon; tidak jelas fungsinya.
- Pengguna tak bisa memilih arah: kata sebelum atau sesudah.
- Tak ada petunjuk bahwa kata ini mungkin bagian dari idiom/frasa.
- Tak ada cara mengecilkan frasa kembali.

## 3. Usulan perubahan
- Ganti satu tombol `+` jadi dua: `‹ +` (kiri) dan `+ ›` (kanan), dengan label "Tambah kata".
- Tambah tombol `−` untuk mengecilkan frasa.
- Tampilkan pratinjau teks di sheet: kata terpilih ditebalkan, tetangga diberi chip ketuk.
- Petunjuk satu kali per sesi: "Artinya beda kalau digabung? Tambah kata di sebelah."
- Jaga batas 5 kata, dan tombol nonaktif saat batas tercapai.

## 4. Syarat selesai
- Frasa bisa diperluas ke kiri dan kanan, lalu dikecilkan.
- Tiap perubahan memuat ulang arti; hasil lama tidak menimpa hasil baru.
- Simpan frasa memakai teks frasa penuh (perilaku sekarang tetap).
- Jalan di iPhone Safari 320px; tombol minimal 44px.
- Naikkan versi `C` di `sw.js`; cek `node --check ui.js`.

## 5. Di luar cakupan
- Garis bawah frasa tersimpan di teks (usulan terpisah dari Raka).
- Deteksi idiom otomatis.
- Perubahan server atau data lama.
