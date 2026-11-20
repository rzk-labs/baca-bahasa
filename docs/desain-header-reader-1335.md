# Desain: Header e-reader HP (#1335)

## Intinya
- Di HP (<=430px) label posisi jadi "12/12", tidak lagi menabrak Dengar.
- Layar lebar tetap "Bagian 12 dari 12".
- Pembaca layar tetap dengar teks penuh "Bagian 12 dari 12".

## 1. Aturan
- Label: angka tabular, boleh menyusut dengan ellipsis.
- Tombol Dengar: tidak menyusut, ketuk 44px.
- Jarak label ke tombol minimal 8px.

## 2. Kode
- `ui.js`: tombol `#rChap` berisi `.rcf` (penuh) dan `.rcs` (ringkas).
- `style.css`: di <=430px `.rcf` disembunyikan, `.rcs` tampil.
- `sw.js`: versi C naik ke kepo-v474.

## 3. Cek
- Lebar 320, 375, layar lebar; angka 3 digit ("112/112") juga muat.
- Mockup: `docs/mockup-1335.html`.
