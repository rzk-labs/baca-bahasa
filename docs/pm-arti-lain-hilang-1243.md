# Arti lain sering hilang (#1243)

## Intinya
- Laporan: baris "Bisa juga" kadang tidak muncul di kartu kata.
- Penyebab: arti lain hanya diambil dari satu panggilan; kalau kosong, baris hilang.
- Perbaikan: ambil arti lain otomatis saat kosong, dan jangan hilang diam-diam.

## 1. Yang terlihat
- Tangkapan layar: kata "constant", arti "Konstant", tidak ada "Bisa juga".
- Hanya tautan "Arti ini salah?" yang tersisa.
- Hilangnya tidak konsisten: kata yang sama kadang ada, kadang tidak.

## 2. Penyebab (dari kode)
- `ui.js` (fungsi `load`): "Bisa juga" dibuat dari `r.dict` hasil terjemahan pertama.
- Terjemahan cadangan (MyMemory) selalu `dict: []` (`app.js` `translate`). Baris kosong → disembunyikan.
- Arti hasil cadangan tidak disimpan ke cache, jadi tiap ketuk bisa beda hasil.
- Gagal sinyal sesaat pada panggilan pertama = kosong, tanpa coba lagi.
- Arti "Konstant" berhuruf besar ciri hasil cadangan, bukan hasil kamus.

## 3. Perbaikan yang diminta
- Bila `r.dict` kosong (atau semua arti sama dengan arti utama), panggil `altFetch` sekali di latar.
- Hasilnya mengisi baris "Bisa juga" tanpa menunggu ketukan "Arti ini salah?".
- Simpan hasil `altFetch` ke cache terjemahan kata itu (`r.dict`), supaya ketuk berikutnya langsung muncul.
- Jangan timpa cache bagus dengan hasil cadangan kosong.
- Kalau tetap kosong: tampilkan "Belum ada arti lain" kecil, bukan menghilang.
- Kata nama ("Ini nama") dan bahasa Jepang kamus offline: tidak berubah.

## 4. Uji terima
- Kata "constant" selalu menampilkan "Bisa juga: …" saat online.
- Ketuk kata yang sama 5×: baris tidak berubah-ubah.
- Mode pesawat: tidak ada galat, tampil pesan offline yang ada.
- Pilihan arti ("Arti ini salah?") tetap tersimpan dan tidak tertimpa.

## 5. Catatan developer
- Ubah hanya `ui.js`, `app.js`; naikkan versi `C` di `sw.js`.
- Mockup: `docs/mockup-1243.html`.
- Backlog: no 134.
