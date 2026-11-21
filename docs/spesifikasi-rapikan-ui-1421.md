# Spesifikasi: Rapikan UI yang mulai acak-acakan (#1421)

## Intinya
- Tampilan mulai berantakan: teks terpotong, kartu sesak, aksi dobel.
- Ada 6 perbaikan tampilan kecil, semua dari masukan tester.
- Angka yang saling bertentangan (XP, halaman, kata) dikerjakan terpisah.

## 1. Bar bawah reader (buku tamat)
- Masalah: label "Selesai · 1…" terpotong; "47/100 XP → Lv 10" mepet tepi.
- Perbaikan: buku tamat → label "Tamat" saja, utuh.
- Tombol besar ganti jadi "Buku baru" (bukan "Selesai").
- Teks XP/level diberi padding sisi 16px, boleh turun satu baris.

## 2. Kartu Tamat di halaman terakhir
- Masalah: kartu melayang menutupi paragraf tengah.
- Perbaikan: taruh kartu di bawah teks, mengalir di dalam halaman.
- Satu aksi utama saja: "Buku baru". "Baca ulang" jadi tautan teks kecil.
- Hapus jalur "Selesai" yang dobel.

## 3. Kartu buku di Home
- Masalah: judul terpotong "The Adventures of Sher…" karena tombol "Baca ulang" besar.
- Perbaikan: tombol jadi kecil (tinggi 36px, tetap bisa diketuk).
- Judul boleh dua baris (maks 2, lalu titik-titik).

## 4. Kartu "Target harian"
- Masalah: judul turun dua baris; cincin "0 XP" sesak.
- Perbaikan: judul jadi "Target" (satu baris).
- Cincin diberi ruang; angka XP muat di 320px.

## 5. Kartu "Minggu ini" kosong
- Masalah: halaman dibaca tampil "–" tanpa penjelasan.
- Perbaikan: tampil angka + satuan ("0 halaman").
- Bila belum ada data: tulis "Belum ada bacaan minggu ini".
- Satuan selalu ada ("6 hari", bukan "6").

## 6. Sampul di "Koleksi kamu"
- Masalah: sampul cuma kotak polos; buku tak dikenali.
- Perbaikan: tanpa gambar → kotak berwarna + judul buku (2 baris) di dalamnya.
- Warna dari judul, supaya buku tetap sama warnanya.

## 7. Batas pengerjaan
- Hanya `ui.js`, `style.css`, `sw.js` (naikkan versi C).
- Jangan ubah `api/`, penyimpanan, atau cara hitung.
- Uji di 320px dan 390px; tema Kertas dan Malam.

## 8. Di luar tugas ini (angka bertentangan)
- "+10 XP" di Tamat vs "0 XP" di Home.
- Halaman minggu ini 42/192 padahal bacaan 6–12.
- "Tidak ada kata baru" vs "2 kata baru".
- Ini soal hitungan, bukan tampilan: ajukan sebagai tugas terpisah.

## 9. Cara cek selesai
- Tidak ada teks terpotong di 320px pada 6 titik di atas.
- Halaman terakhir: teks tengah terbaca penuh.
- Buku tamat: hanya satu tombol utama.

Mockup: `docs/mockup-1421.html`
