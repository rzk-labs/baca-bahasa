# Desain: Home saat memuat (#1250)

## Intinya
- Home memuat kini tampil kerangka rak, bukan teks abu sendirian.
- Chip streak dan XP tampil '–', bukan '0 hari'.
- Kalau gagal: kerangka diam, pesan jelas, tombol 'Coba lagi'.

## 1. Kerangka rak
- Tiga kartu abu (Biru Es gelap) berdenyut pelan.
- Judul dikecilkan jadi satu baris padat.
- Teks 'Memuat bukumu…' tetap ada (role=status).

## 2. Chip streak dan XP
- Selama memuat: tampil '–' warna abu, angka asli disembunyikan.
- Setelah data siap: angka normal kembali.
- Angka asli tidak diubah, hanya tampilan.

## 3. Gagal dan aksesibilitas
- Kerangka berhenti berdenyut, tombol 'Coba lagi' muncul.
- Animasi mati bila pengguna pilih kurangi gerak.
- Teks min 12px; muat di lebar 320px.
