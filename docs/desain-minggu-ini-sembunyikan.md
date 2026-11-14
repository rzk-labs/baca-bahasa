# Desain: kartu Minggu ini + Profil (#1036)

## Intinya
- Tombol × diganti teks "Sembunyikan" (tap 44px, gaya ghost).
- Setelah diketuk muncul toast "Disembunyikan sampai minggu depan"; data aman.
- Profil: ringkasan dan rak "Sedang dibaca" kini satu sumber, tak bertentangan.

## 1. Kartu Minggu ini
- Tombol teks kecil di kanan judul, tidak terpotong di 320px.
- aria-label tetap "Tutup ringkasan minggu ini".
- Muncul lagi minggu depan.

## 2. Profil
- Penyebab: ringkasan memakai daftar maks 3 buku, rak memakai semua buku.
- Kini keduanya dari daftar rak: persen lebih dari 0 dan kurang dari 100.

## 3. Mockup
- Lihat docs/mockup-1036.html.
