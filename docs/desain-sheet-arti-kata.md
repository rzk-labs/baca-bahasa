# Desain sheet arti kata (#804)

## Intinya
- Arti Indonesia sekarang paling besar dan tebal (30px).
- Tombol aksi satu baris, Simpan paling menonjol.
- Sudah dicek di 320px dan 360px, 4 tema baca (#813).
- Perbaikan kecil: kontras kamus, susunan di layar sempit/pendek.
- Dicek di 320px & 390px dan 4 tema baca (#812), lewat baca CSS.
- Teks kamus kecil kini lebih jelas (tanpa redup tambahan).

## 1. Hierarki
- Arti: 30px tebal (26px di layar sempit).
- Kata asli + cara baca: kecil, abu (20px).
- Kamus/contoh: 12px, paling redup.

## 2. Tombol aksi
- Baris utama: Simpan (lebar 2x, warna utama), Sudah kenal, Ini nama.
- Tinggi min 48px (Simpan 52px), jarak 8px, boleh turun baris.
- Baris bawah: Selesai dan "Lihat kalimatnya", gaya ghost, min 44px.
- Dengar dan frasa (‹ ›) tetap di kepala sheet, sudah 44px.

## 4. Hasil uji (#812)
- 320px & 390px: arti 26-30px, boleh turun baris, tak terpotong.
- Tombol aksi turun baris rapi; semua min 44px (Simpan 52px).
- Baris bawah berbagi lebar di bawah 360px.
- Warna pakai variabel tema; 4 tema baca sama aturannya.
- Diperbaiki: kamus 12px kurang kontras karena redup tambahan.
- Kata yang diketuk tampil di kepala sheet; sheet maks 90% layar.
- Catatan: dicek lewat kode, belum di HP asli.

## 3. Tidak diubah
- Logika simpan, terjemah, dan id tombol tetap sama.
- Gaya memakai variabel tema, jadi ikut 4 tema baca.

## 4. Hasil uji 320px (#813)
Metode: tinjau kode dan gaya (tanpa perangkat fisik).
- Arti utama 26px di ≤340px: tak terpotong, boleh turun baris.
- Aksi: Simpan + Sudah kenal satu baris, Ini nama turun. Kata tak patah.
- Perluas frasa (‹ ›): turun baris sendiri bila sempit, tetap 44px.
- Lencana "Mungkin frasa": kini boleh 2 baris, rata kiri.
- Kamus 12px: transparansi dibuang, kontras naik di 4 tema.
- Layar pendek (≤640px): arti 26px, jarak rapat, kata tak tertutup.
- "Lihat kalimatnya": rata kiri, lebar penuh di ≤359px.
- Sheet arti kalimat: tak diubah, tombol navigasi sudah 44px.
- Sisa: uji nyata di iPhone SE disarankan.
