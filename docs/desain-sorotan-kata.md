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

## 4. Sorotan kalimat "Dengar halaman" (#579)
- Latar kalimat aktif lebih pekat: malam .30 (dulu .14), terang/sepia/abu .16–.17, gelap .30.
- Penanda non-warna: garis tebal 3px di kiri kalimat, warna teks tema.
- Kontras teks di atas sorotan ≥ 4.5:1 (hitungan kira-kira: malam 5.6, gelap 7, terang 11).
- Beda dari status kata: itu garis bawah, ini latar + garis kiri.
- Tanpa animasi baru; tata letak tak bergeser, aman di 320px.
