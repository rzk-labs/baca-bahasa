# Ikon header HP jelas (#1182)

## Intinya
- Di HP, tombol akun kini ikon orang + tulisan "Profil".
- Tombol pengaturan kini ikon geser + tulisan "Atur".
- Semua area ketuk 44px (42px di 320px), header tidak melebar.

## 1. Masalah
- Dina bingung: ikon tanpa tulisan di pojok kanan atas.
- Tulisan disembunyikan di layar ≤430px.
- Akun cuma huruf awal nama, mirip hiasan.

## 2. Perubahan
- `cloud.js`: tombol akun punya ikon orang + label "Profil" (HP). Desktop tetap huruf.
- `ui.js`: ikon `user` baru; tombol pengaturan dapat label pendek "Atur".
- `style.css` (akhir file): label 10px di bawah ikon, bingkai sama untuk kedua tombol.
- `sw.js`: versi naik ke `kepo-v421`.

## 3. Keputusan
- Label "Atur" (bukan "Pengaturan") karena 10px "Pengaturan" tidak muat di 44px.
- aria-label tetap lengkap: "Pengaturan", "Profil dan akun <nama>".
- Tombol Masukan tetap tersembunyi di HP (≤640px) agar header muat di 320px. Masukan ada di dalam Pengaturan.
- Tombol "Masuk" (belum login) sudah bertulisan, tidak diubah.
- Header e-reader (#1164) dan lencana (#1177) tidak disentuh.

## 4. Cek
- Mockup: `docs/mockup-1182.html`.
- `node --check` ui.js, cloud.js, sw.js: lolos.
- Belum diuji di perangkat nyata; cek 320px & 390px setelah live.

## 5. Catatan #1206
- Penyebab Profil hilang: pil XP muncul lagi di ≤430px, header sesak, Profil terdorong keluar.
- Perbaikan: pil XP disembunyikan di ≤430px; streak, Profil, Atur tetap. XP ada di kartu Home.
- Nada pinyin kartu ulang: angka superskrip 1-4 + garis bawah beda (solid/putus/titik/ganda).
- `sw.js` naik ke `kepo-v430`. Mockup: `docs/mockup-1206.html`.
