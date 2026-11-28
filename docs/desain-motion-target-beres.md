# Motion: centang 'Beres!' target baca

## Intinya
- Saat target tercapai, centang tergambar dan cincin berdenyut sekali.
- Animasi hanya sekali per hari, tidak ulang saat Home dirender ulang.
- Mode kurangi gerak: tanpa animasi, centang langsung penuh.

## 1. Gerak
- Centang tergambar ±250 ms (garis menyapu).
- Cincin membesar 1→1,06→1 dalam 350 ms.
- Tanpa warna atau bayangan baru.

## 2. Aturan
- Penanda harian: localStorage `kepo_goal_anim` berisi tanggal hari ini.
- Logika target, streak, XP tidak disentuh.
- Cache naik ke kepo-v780.
