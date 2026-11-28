# Motion: kartu latihan Kata (#2049)

## Intinya
- Arti dan tombol Lupa/Ragu/Hafal kini muncul halus saat 'Lihat arti'.
- Kartu baru masuk pelan saat berganti, bukan saat layar dibuka.
- Reduced-motion mematikan semuanya; tinggi kartu tidak bergeser.

## 1. Gerak
- Arti (`#back`): fade + naik 6 px, 180 ms, ease-out.
- Tombol (`#actBack`): fade 160 ms.
- Kartu baru (`.card-in`): scale .97 → 1 + fade, 200 ms.

## 2. Cara kerja
- Keyframes: `kata-arti-in`, `kata-act-in`, `kata-kartu-in`.
- `deckNew` hanya menyala setelah Hafal/Ragu/Lupa, lalu padam.
- Logika latihan, jadwal, XP, swipe tidak diubah.

## 3. Catatan
- Hanya opacity/transform; tinggi `.deck` tetap (min-height 350 px).
- Versi cache: kepo-v780.
- Mockup: docs/mockup-2049.html
