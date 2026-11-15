# Spesifikasi: cara baca dalam bahasa ibu (#1119)

## Intinya
- Kata asing tampil dengan ejaan Indonesia, mis. "vendors" → "vèn-dors".
- Muncul di kartu Ngomong, sheet arti, dan kartu Kata. Bisa dimatikan.
- Ini tebakan aturan, bukan suara asli. Diberi label dan tombol Dengar.

## 1. Masalah
- Kartu Ngomong (screenshot #1119) hanya menampilkan "vendors" + arti "Penjual".
- Pengguna tak tahu cara melafalkan. Skor 43% terasa tak adil.
- "Cara baca" sekarang hanya ada untuk aksara non-Latin (pinyin, romaji, hangul): `bacaOf` di `app.js`.
- Bahasa Latin (Inggris, Spanyol, Prancis, Jerman) belum punya cara baca.

## 2. Usulan
- Baris kecil di bawah kata: ejaan Indonesia, suku kata dipisah tanda hubung.
- Contoh: `vendors` → `vèn-dors`, `though` → `dou`, `bonjour` → `bon-jur`.
- Bahasa ibu = bahasa UI pengguna (Indonesia). Tidak ada pilihan bahasa lain dulu.
- Tekanan suku kata ditebalkan: `VÈN-dors`.

## 3. Di mana muncul
- Kartu Ngomong: di bawah kata besar, di atas tombol Contoh/Pelan.
- Sheet arti kata di halaman baca: di samping kata, satu baris dengan cara baca lama.
- Kartu di tab Kata: baris abu kecil di bawah kata.
- Tidak di teks bacaan (tetap bersih, aturan "Reader First").

## 4. Sumber data (tanpa build, tanpa dependensi besar)
- Tahap 1: aturan ejaan kecil per bahasa (Spanyol, Jerman, Prancis, Inggris) di `app.js`.
- Tahap 1b: kamus pengecualian ±300 kata Inggris tersering (though, people, water).
- Tahap 2 (opsional): ambil ejaan fonetik dari kamus bila ada (docs/riset-sumber-kamus.md).
- Kata di luar kamus pengecualian: pakai aturan, tandai "tebakan" (tanda ~).
- Jepang/Korea/Mandarin tidak diubah: tetap romaji/hangul/pinyin.

## 5. Aturan tampilan
- Label kecil: "Cara baca (perkiraan)". Warna abu, bukan tebal.
- Tombol Dengar tetap di sebelah: suara asli lebih benar dari ejaan.
- Pengaturan: pakai saklar "Tampilkan cara baca" yang sudah ada (`db.showBaca`). Tak ada saklar baru.
- Bila tak bisa dibuat (angka, nama): baris disembunyikan, tidak kosong.
- Kontras teks minimal 4.5:1 di 4 tema baca. Uji 320px dan 390px.

## 6. Syarat selesai
- Kata ber-huruf Latin di Ngomong, sheet arti, dan Kata punya cara baca.
- Matikan saklar → semua baris hilang, termasuk di kartu Ngomong.
- Data lama aman: cara baca dihitung saat tampil, tidak mengubah isi simpanan.
- Tidak memengaruhi skor ucapan.
- Naikkan versi `C` di `sw.js`; cek `node --check app.js ui.js`.

## 7. Risiko
- Ejaan Indonesia tak bisa menggambarkan semua bunyi (th, r Prancis, ü Jerman).
- Mitigasi: label "perkiraan", tombol Dengar, kamus pengecualian untuk kata umum.
- Jangan janji "persis". Salah tebak bisa membentuk kebiasaan lafal keliru.
