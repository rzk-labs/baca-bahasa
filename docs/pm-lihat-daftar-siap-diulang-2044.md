# Home: tautan 'Lihat daftar' untuk kata siap diulang (#2044)

## Intinya
- Angka 'N kata siap diulang' kini bisa dicek lewat tautan 'Lihat daftar'.
- Tautan membuka Kata › Tersimpan, hanya kata jatuh tempo.
- Hitungan tak berubah; tombol 'Ulang sekarang' tetap.

## 1. Masalah
- Bima & Raka bingung: angka datang dari mana?
- Tidak ada cara melihat kata-katanya.

## 2. Yang dibangun
- Tautan teks 'Lihat daftar' di bawah kartu (tinggi ketuk 44px).
- Ketuk → tab Kata, segmen Tersimpan, filter dibersihkan.
- Chip baru 'Siap diulang N' di Tersimpan; ketuk lagi untuk mematikan.
- Filter pakai `dueList()` yang sama dengan Home.

## 3. Yang tidak berubah
- Hitungan 'siap diulang' dan data IndexedDB.
- Tombol utama 'Ulang sekarang'.

## 4. Uji
- 320px dan 390px, tema gelap dan terang.
- Jumlah di daftar = angka di Home.
- Semua kata diulang → chip hilang, filter mati sendiri.
