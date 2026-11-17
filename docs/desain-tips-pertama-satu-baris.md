# Desain: tips pertama e-reader satu baris (#1254)

## Intinya
- Tips pertama kini satu baris pendek, bukan tiga baris.
- Tiga pesan tampil bergantian, satu per kunjungan.
- Tips melayang tipis di atas bilah bawah, tidak mendorong teks.

## 1. Pesan
- Kunjungan 1: "Ketuk kata = artinya".
- Kunjungan 2: "Tahan kalimat = arti kalimat".
- Kunjungan 3: "Ketuk tengah = menu".

## 2. Tampilan
- Satu baris, teks dipotong rapi di 320px.
- Tombol "Paham" tetap 44px; hilang sendiri ±12 detik.
- Melayang di atas bilah bawah; ketukan lewat ke teks.

## 3. Aturan tampil
- Tidak tampil bila ada toast atau saran tema; dicoba lagi lain kali.
- Penanda `tipStep` di data (0–3); data lama tanpa field dianggap selesai.
- Warna ikut Biru Es/Plum Noir dan Wasabi; terbaca di tema gelap.

Mockup: `docs/mockup-1254.html`.
