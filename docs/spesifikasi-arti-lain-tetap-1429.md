# Arti lain selalu tampil, tidak hilang-muncul (#1429)

## Intinya
- Arti lain hilang-muncul karena 5 jalur di kode, bukan satu bug.
- Aturan baru: bagian "Arti lain" selalu ada di sheet kata, dengan 4 kondisi tetap.
- Tidak ada lagi bagian yang lenyap diam-diam; kosong pun diberi alasan + tombol coba lagi.

## 1. Kenapa hilang-muncul (penyebab di `ui.js` / `app.js`)
- Kata baru: cache kosong, chip baru muncul setelah ambil ulang (jeda, layout loncat).
- Gagal ambil (sinyal/limit): teks "Belum ada arti lain." tanpa tombol; ketuk kata sama = tetap kosong.
- Hasil disaring: arti yang sama dengan arti terpilih dibuang; pilih chip → daftar menyusut.
- Frasa 2+ kata: layanan jarang memberi daftar arti, jadi bagian lenyap.
- Bahasa Jepang → Indonesia dan mode hemat: ambil ulang dilewati, tanpa penjelasan.

## 2. Aturan baru (satu bagian, empat kondisi)
- **Ada**: judul "Arti lain · ketuk untuk pakai" + chip. Tinggi tetap, tidak loncat.
- **Memuat**: judul sama + 3 chip kerangka (abu-abu), bukan kosong.
- **Gagal/offline**: judul sama + "Arti lain belum bisa dimuat" + tombol "Coba lagi".
- **Memang kosong**: judul sama + "Belum ada arti lain untuk ini" + tombol "Terjemahkan ulang".
- Pilih chip: arti terpilih tetap tampil di daftar, ditandai centang (tidak dibuang).
- Frasa: bila daftar kosong, tampilkan arti per kata sebagai chip pengganti.

## 3. Untuk developer
- `ui.js` (`paintDict`, blok `load`, sekitar baris 2477-2500): jangan return `''`; selalu render bagian.
- Simpan hasil ambil ulang ke cache walau kartu belum tersimpan; jangan timpa cache bagus.
- Jangan ubah `api/`. Ubah `style.css` (kerangka chip) dan naikkan versi `C` di `sw.js`.
- Uji: kata baru, offline, ketuk kata sama 3x, pilih chip, frasa, 320px & 390px, tema Kertas & Malam.
- Mockup: `docs/mockup-1429.html`.
