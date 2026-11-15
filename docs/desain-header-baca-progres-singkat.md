# Desain: header Baca HP, progres '2/12' & tombol tak bertabrakan (#1064)

## Intinya
- Di HP (≤430px) progres bagian jadi singkat: '2/12', bukan 'Bagian 2 dari 12'.
- Tombol header dapat ruang tetap; judul ellipsis di sisa ruang.
- Tombol jarang dipakai masuk ke 'Lainnya'. Fitur tidak dihapus.

## 1. Masalah (dilaporkan Raka, Dina, Bima, Tari, Nadia)
- Teks 'Bagian N dari M ▾' (`#rChap`, ui.js ~1374) menempel ke tombol 'Dengar'.
- Judul buku terpotong ("Alice's Adventur…").
- Header `.rbar` sudah ditumpuk banyak aturan CSS (style.css ~472, 826, 875, 910, 916, 944).

## 2. Rencana untuk developer
- Tombol `#rChap`: isi `<span class="rcl">Bagian 2 dari 12</span><span class="rcs">2/12</span>`.
- Lebar ≤430px: tampilkan `.rcs`, sembunyikan `.rcl`. Di atasnya kebalikannya.
- `aria-label` tetap panjang: 'Daftar bagian, sekarang bagian 2 dari 12'.
- `secLabel` (ui.js ~1651) dan daftar isi tetap 'Bagian N dari M'.

## 3. Tata letak header (≤430px)
- Tombol (`.icon`, `#rLis`, `#rDue`, `#rMore`, `#rChap`): `flex:0 0 auto; min-width:44px`.
- `.rtitle`: `flex:1 1 0; min-width:0`; judul `b` satu baris ellipsis.
- Hapus `min-width:8em` pada `.rtitle b` (style.css ~915) bila bikin tombol terdorong.
- Kalau judul < ±6 karakter terbaca di 360px: lipat 'Ulang' ke 'Lainnya'.
- Urutan lipat: Ulang → Cara baca/Pinyin (sudah di menu) → Dengar tetap tampil.
- Isi menu 'Lainnya' sudah ada; cukup tambah 'Ulang kata' di sana.

## 4. Uji (wajib)
- Lebar 320, 360, 390px: tak ada teks bertumpuk atau tumpang tindih.
- Judul panjang ('Alice's Adventures in Wonderland') tetap tampak ≥1 kata + '…'.
- Buku 1 bagian (tanpa `#rChap`) dan buku zh-CN/ja (ada Pinyin) tetap rapi.
- Layar lebar: teks 'Bagian N dari M' tetap panjang.
- Target sentuh tetap ≥44px.

## 5. Di luar cakupan
- Logika baca, pagination, dan data buku tidak diubah.
- Naikkan versi `C` di sw.js. Cek `node --check ui.js`.

Mockup: docs/mockup-1064.html
