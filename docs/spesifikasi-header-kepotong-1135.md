# Spesifikasi: Header e-reader kepotong (#1135)

## Intinya
- Judul bab di atas halaman baca terpotong di kiri dan kanan.
- Penyebab: judul panjang dipusatkan, jadi ujung depan ikut terbuang.
- Perbaikan kecil di CSS: judul rata tengah, satu baris, berakhir "…".

## 1. Masalah
- Screenshot founder: header tampil "TION: WHY EVERYTHING SUDDENLY GOT WORSE AND WHAT TO…".
- Awal judul hilang, pembaca tak tahu ini bab apa.
- Terjadi di HP, judul bab panjang, huruf kapital.

## 2. Penyebab
- `.rhead` (style.css:399) memakai `display:flex` + `justify-content:center`.
- Teks lebih lebar dari kotak, jadi meluap ke dua sisi.
- `text-overflow:ellipsis` tidak bekerja pada kotak flex, jadi "…" tak pernah muncul.

## 3. Perbaikan yang diminta
- Ubah `.rhead` jadi kotak biasa: `display:block; text-align:center; box-sizing:border-box`.
- Posisi teks tetap di bawah kotak: `padding-top` (22px; di HP ≤430px: 12px) dan `line-height:18px`.
- Tetap `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`, padding kiri-kanan 64px dipertahankan.
- Tambah `title` berisi judul penuh agar bisa dibaca di layar lebar.
- Jangan ubah ui.js: baris 1398 dan 1758 sudah mengisi teks dengan benar.
- Naikkan versi `C` di sw.js.

## 4. Cara cek
- Buka buku dengan judul bab sangat panjang di lebar 390px: awal judul terlihat, ujung "…".
- Judul pendek tetap di tengah, posisi vertikal tak bergeser.
- Cek 4 tema dan layar lebar; tombol menu kiri-kanan tidak tertimpa.

Mockup: `docs/mockup-1135.html`.
