# Bar atas reader lega (#1471)

## Intinya
- Bar atas reader sekarang lebih lega di HP.
- Di HP (≤430px) bar hanya berisi Dengar dan Lainnya.
- Ulang pindah ke menu Lainnya; fungsinya sama.

## 1. Yang diubah
- Pinggir kiri-kanan minimal 12px, plus safe-area iPhone.
- Jarak antar tombol 8px; target sentuh 44px.
- Bar saat ini tak punya tombol Bagikan; tak ada yang menempel tepi.

## 2. Menu Lainnya
- Baris baru "Ulang kata" dengan jumlah kata jatuh tempo.
- Muncul hanya di HP, hanya bila ada kata siap diulang.
- Layar lebar: tombol Ulang tetap di bar.

## 3. Uji
- 320px dan 375px: Dengar + Lainnya, judul tetap muat.
- Layar lebar: bar tak berubah selain pinggir 12px.
- Empat tema baca memakai warna token yang sama, tak ada warna baru.
- Mockup: docs/mockup-1471.html. Versi cache: kepo-v527.
