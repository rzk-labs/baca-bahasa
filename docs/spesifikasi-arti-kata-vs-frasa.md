# Spesifikasi: arti kata beda dengan arti di kalimat (#287)

Peran PM · Status: spesifikasi siap dikerjakan developer (belum diuji pengguna)

## Intinya
- Laporan: arti "occurred" berbeda dari arti di kalimat, karena ada "occurred to" (terlintas di pikiran).
- Penyebab: arti kata diterjemah sendirian, tanpa kata sebelah. Frasa/idiom hilang maknanya.
- Usul: petunjuk "kata ini bisa jadi bagian frasa" + tombol sekali ketuk untuk memperluas.

## 1. Penyebab (dari kode)
- Sheet "Arti kata" (`ui.js` ~660-715) memanggil `translate(word)` hanya dengan 1 kata.
- Sheet "Arti kalimat" menerjemah seluruh kalimat; frasa ikut terbaca utuh.
- Jadi "occurred" = "terjadi", tapi "occurred to" = "terlintas". Bukan bug; keterbatasan arti per kata.
- Tombol perluas (+) sudah ada, tapi pembaca tidak tahu kapan harus dipakai.

## 2. Usulan perubahan (kecil)
- Di sheet arti kata, tambah baris kecil: "Arti bisa beda di kalimat. Cek frasa atau kalimat."
- Bila kata diikuti kata kecil (to, up, out, on, off, in, at, for, with), tawarkan chip "Coba: occurred to".
- Ketuk chip = sama dengan tombol perluas (+), langsung terjemah frasa.
- Di sheet arti kalimat, pertahankan sorotan kata supaya mudah dibandingkan.

## 3. Syarat selesai
- Ketuk "occurred" di kalimat "It occurred to me…": chip "occurred to" muncul.
- Ketuk chip: arti frasa tampil, Simpan menyimpan frasa itu.
- Tanpa kata kecil di belakang: tampilan sama seperti sekarang, tidak ada chip.
- Daftar kata kecil mulai dari bahasa Inggris saja; bahasa lain menyusul.
- Cek `node --check ui.js`; naikkan versi `C` di `sw.js`.

## 4. Di luar cakupan
- Deteksi idiom otomatis lewat AI (mahal, belum terbukti perlu).
- Mengubah cara terjemah per kata untuk semua bahasa.
