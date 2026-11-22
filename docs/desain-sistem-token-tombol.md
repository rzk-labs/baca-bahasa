# Token warna & bentuk di style.css (#1546)

## Intinya
- 39 warna Plum/Kertas ditulis langsung → diganti token ink/cream.
- 20 radius 999px/9999px → var(--radius-full).
- Teks 8px di layar sempit → var(--fs-min) (12px).

## 1. Yang diganti
- Hanya di luar blok :root dan tema (baris 100 ke bawah).
- Nilai identik, jadi terang, gelap, dan 4 tema baca tak berubah.

## 2. Sengaja dibiarkan
- Semua nilai di :root dan blok tema (baris 12–67).
- rgba(53,30,40,…), #E9F056, #D7EFFF: di luar tugas.
- `top:-9999px` (bukan radius).
