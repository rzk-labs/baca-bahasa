# Spesifikasi #1336: Bilah atas e-reader HP, "Bagian N dari N" tak menabrak "Dengar"

## Intinya
- 4 penguji melapor: "Bagian 12 dari 12" menimpa tombol "Dengar" di HP.
- Perbaikan: di layar sempit tulis "12/12", beri jarak 8px, tombol tak menyusut.
- Layar lebar tetap "Bagian 12 dari 12". Mockup: docs/mockup-1336.html.

## 1. Temuan
- Chip penanda bagian dibuat di ui.js baris 1450 (`#rChap`, teks "Bagian N dari N ▾").
- `secLabel` (ui.js:1795) punya bentuk ringkas "N/N", tapi tidak dipakai chip itu.
- Aturan CSS chip: style.css:949 (`white-space:nowrap`, tanpa batas lebar).
- Tombol Dengar ada di bilah yang sama; di 320-390px ruang habis.
- Keluhan: Bima, Dina, Raka, Tari. Huruf D terpotong.

## 2. Yang dibangun
- Chip: tulis dua bentuk, "Bagian 12 dari 12 ▾" (lebar) dan "12/12 ▾" (sempit).
- Pilih lewat CSS (layar ≤430px) agar tanpa hitung ulang; atau pakai parameter `ringkas` di `secLabel`.
- Satuan "Bagian" tetap di Daftar bagian, Lanjut baca, Tamat, dan label aria.
- Judul bilah (`.rtitle`, `.rtitle b`): `min-width:0`, ellipsis, boleh menyusut.
- Chip dan tombol Dengar: `flex:none`, jarak minimal 8px, tidak terpotong.
- Tinggi sentuh tetap 44px.

## 3. Syarat selesai
- 320px, 375px, 390px: tak ada tumpang tindih, huruf D utuh.
- Layar lebar (≥768px): tetap "Bagian N dari N".
- Buku 1 bagian: chip tak muncul (seperti sekarang).
- Judul panjang terpotong "…", chip tetap terlihat.
- `node --check ui.js` lolos; versi C di sw.js naik.

## 4. Di luar cakupan
- Tugas Tamat #1304 dan kartu Level ditangani terpisah.
- Tidak mengubah isi daftar bagian atau penghitungan bagian.
