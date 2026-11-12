# Uji layar 320px (#573)

## Intinya
- Home, Kata, dan sheet arti dicek lewat baca CSS di lebar 320px.
- Kata asing kini punya bahasa & arah tulisan yang benar di sheet.
- Belum dicoba di HP asli; hanya pembacaan kode.

## 1. Masalah ditemukan
- Baris kata di sheet arti sesak: kata, speaker, tombol frasa berdesakan.
- Kata/kalimat di sheet arti tanpa penanda bahasa; font Jepang/Korea/Arab tak pasti.
- Tombol di sheet bisa di bawah 44px; padding sheet terlalu lebar di 320px.

## 2. Perbaikan
- Baris kata boleh turun baris; kata dapat ruang minimal 120px.
- Sheet arti kata/kalimat kini memakai penanda bahasa dan arah otomatis; font CJK dan Arab ditambah.
- Di bawah 360px: padding sheet, ukuran teks, kartu buku, ringkasan Kata dirapatkan; tombol sheet turun baris.

## 3. Yang belum
- Uji di iPhone SE asli dan Android kecil.
- Sheet penanda & Tamat hanya dicek lewat kode; belum dilihat langsung.
- Header e-reader tidak disentuh (sudah beres di #398).
