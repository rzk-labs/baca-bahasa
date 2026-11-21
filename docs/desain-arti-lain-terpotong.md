# Arti lain ke-potong (#1115)

## Intinya
- Di kartu kata, baris "adverbia: … · nomina: pelarian,…" terpotong titik-titik.
- Penyebabnya: tiap baris kotak arti lain dibatasi 1 baris saja.
- Perbaikan: biarkan baris turun ke bawah (maks 2 baris per bagian), tanpa titik-titik.

## 1. Masalah
- Lihat foto masukan: kata "running", kotak abu-abu di bawah arti utama.
- Baris kedua berakhir "pelarian,…". Arti lain hilang.
- Pengguna tidak tahu ada arti lain yang tak terlihat.

## 2. Penyebab (dari kode)
- `style.css` baris `.dict>div`: `-webkit-line-clamp:1` + `overflow:hidden`.
- `ui.js` (~baris 2171) mengisi kotak: "Bisa juga" + sampai 2 jenis kata, tiap jenis maks 3 arti.
- Teks yang lebih panjang dari 1 baris di HP langsung dipotong.

## 3. Perbaikan yang diminta
- Hapus batas 1 baris di `.dict>div`; pakai pembungkus teks biasa (turun baris).
- Beri batas aman maks 3 baris per bagian, supaya kartu tidak terlalu tinggi.
- Pisahkan tiap jenis kata (adverbia, nomina) ke barisnya sendiri, bukan satu baris dengan titik tengah.
- Jangan ubah ukuran huruf 12px di kartu; tombol Simpan tetap terlihat tanpa scroll di HP kecil.
- Bila kartu jadi terlalu tinggi, kartu sudah bisa di-scroll (tinggi maks 90%).

## 4. Cara uji
- Buka kata "running" di buku Inggris: semua arti utuh, tanpa "…".
- Uji layar 360px dan 320px, tema terang & gelap.
- Uji kata Jepang/Korea (arti pendek) dan kata dengan banyak arti panjang.
- Cek tombol Simpan, Sudah kenal, Ini nama tetap terjangkau.

## 5. Tugas developer
- Item backlog #114 (P0). Ubah `style.css`, naikkan versi `C` di `sw.js`.
- Mockup: `docs/mockup-1115.html`.
