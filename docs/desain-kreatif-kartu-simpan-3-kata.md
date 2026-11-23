# Kartu "Simpan 3 kata dulu" rapi di HP (#1745)

## Intinya
- Judul kini satu baris, angka 0/3 jadi label kecil di kanan.
- Tombol "Buka bacaan" pindah ke bawah, teks dapat lebar penuh.
- Kartu tak lagi tertutup bar menu bawah.

## 1. Masalah
- Judul patah 2–4 baris di HP kecil (laporan Tari, Nadia, Dina).
- Bar progres mepet menu, bawah kartu terpotong.
- Di tema gelap, isi bar progres nyaris tak terlihat.

## 2. Yang diubah (sudah dibangun)
- Susunan: ikon · judul · angka, lalu subteks, bar, "Buka bacaan →".
- Bar progres jadi 3 kotak: terisi Plum Noir, kosong bergaris tipis.
- Ruang bawah Home ditambah saat kartu ini tampil.

## 3. Aturan brand
- Kartu tetap Biru Es, teks Plum Noir, garis kiri Wasabi.
- Angka 0/3: label Plum Noir dengan teks Wasabi.
- Warna kartu sama di 4 tema, kontras tetap jelas.

## 4. Yang tidak diubah
- Logika kunci dan latihan tetap sama.
- Ketuk kartu tetap membuka bacaan terakhir.
- Reader tidak disentuh.

## 5. Cek
- Lebar 320px: judul muat satu baris, subteks satu baris.
- Lebar 390px dan tema gelap: lihat docs/mockup-1745.html.
- Gambar sebelum/sesudah: docs/mockup/1745-kartu-simpan-3-kata.svg.
