# Desain sheet arti kata (#804)

## Intinya
- Arti Indonesia sekarang paling besar dan tebal (30px).
- Tombol aksi satu baris, Simpan paling menonjol.
- Belum diuji visual di 320px dan 4 tema (lihat backlog #75).

## 1. Hierarki
- Arti: 30px tebal (26px di layar sempit).
- Kata asli + cara baca: kecil, abu (20px).
- Kamus/contoh: 12px, paling redup.

## 2. Tombol aksi
- Baris utama: Simpan (lebar 2x, warna utama), Sudah kenal, Ini nama.
- Tinggi min 48px (Simpan 52px), jarak 8px, boleh turun baris.
- Baris bawah: Selesai dan "Lihat kalimatnya", gaya ghost, min 44px.
- Dengar dan frasa (‹ ›) tetap di kepala sheet, sudah 44px.

## 3. Tidak diubah
- Logika simpan, terjemah, dan id tombol tetap sama.
- Gaya memakai variabel tema, jadi ikut 4 tema baca.
