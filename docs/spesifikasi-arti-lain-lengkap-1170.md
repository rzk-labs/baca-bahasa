# Arti lain yang lengkap: jenis kata, banyak arti, cara baca (#1170)

## Intinya
- Masukan: daftar "arti lain" bagus, tapi kurang lengkap.
- Mau: ada jenis kata (kata kerja, benda, dll), arti lebih dari satu, dan cara baca.
- Tidak perlu layanan baru: data jenis kata sudah dikirim layanan terjemahan.

## 1. Masalah sekarang
- Tombol "Arti ini salah?" hanya menampilkan maks 3 chip arti polos.
- Tidak tahu arti itu kata kerja atau kata benda.
- Cara baca (romaji/pinyin/IPA) tidak muncul di chip.
- Kata seperti "nugget" sering hanya dapat 1-2 arti.

## 2. Perubahan yang diminta
- Chip dikelompokkan per jenis kata: label kecil "Kata kerja", "Kata benda", dst.
- Tiap kelompok maks 3 arti; total maks 6 arti.
- Satu arti per chip, ketuk untuk pakai (perilaku lama tetap).
- Tampilkan cara baca kata aslinya di bawah judul daftar (bila ada).
- Untuk bahasa beraksara non-Latin, cara baca tiap arti tidak perlu; cukup kata asli.

## 3. Cara kerja (untuk developer)
- Data sudah ada: `dict` dari `gtxFetch` (`dt=bd`) berisi `pos` + `terms`.
- Ubah `altArti` di ui.js agar mengembalikan kelompok `{pos, terms}`, bukan daftar datar.
- Tetap buang arti yang sama dengan arti utama.
- Pakai peta `POS` yang sudah ada untuk nama jenis kata berbahasa Indonesia.
- `altFetch` di app.js: kembalikan juga `pos`, jangan buang.
- Bila layanan tak punya data jenis kata (frasa), tampilkan satu kelompok tanpa label.
- Cara baca: pakai `tr.baca` / `bacaOf`.
- Gaya: ikuti `.altbox` / `.altopt` di style.css.

## 4. Syarat selesai
- Ketuk "Arti ini salah?" pada kata ber-banyak-arti: tampil kelompok jenis kata.
- Maks 6 chip; memilih chip menyimpan arti seperti sebelumnya.
- Frasa tanpa data: tampil seperti sekarang, tanpa label kosong.
- Layar 390px tidak meluber; chip turun baris.
- Naikkan versi `C` di sw.js.

## 5. Mockup
- Lihat `docs/mockup-1170.html`.
