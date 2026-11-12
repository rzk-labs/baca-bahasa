# Desain: sorotan kata di halaman baca

Tugas #566 · Peran desain

## Intinya
- Halaman baca jadi tenang: tak ada blok warna, hanya garis bawah.
- Tiga status beda lewat bentuk garis, bukan hanya warna.
- Wasabi hanya untuk kata yang sedang diketuk.

## 1. Tiga status
- Sudah kenal: teks agak pudar, tanpa garis. Nyaris tak terlihat.
- Disimpan: garis bawah solid tipis (1,5px), warna teks utama.
- Sering diketuk: garis putus-putus (2px), warna teks pudar.

## 2. Kontras dan tema
- Garis memakai warna teks tiap tema: terang, sepia, abu, malam.
- Teks pudar sudah ≥ 4.5:1 di keempat tema.
- Kata aktif: Wasabi + tinta Plum, kontras tinggi di semua tema.

## 3. Yang dijaga
- Ruby/furigana tetap muncul; garis mengikuti kata.
- Arab (RTL): garis bawah tak bergantung arah.
- Fokus keyboard dan data pengguna tidak diubah.
- Hover desktop: latar lembut, bukan Wasabi.
