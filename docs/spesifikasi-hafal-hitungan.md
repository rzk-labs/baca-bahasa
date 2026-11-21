# Spesifikasi: hitungan "Udah hafal" tak bertambah (#628)

## Intinya
- Ketuk "Hafal" di kartu tidak menambah angka "Udah hafal". Ini bukan bug rusak.
- Penyebab: kata baru dihitung hafal setelah lulus 5 kali ulang (1, 3, 7, 21 hari, lalu sekali lagi).
- Solusi: pisahkan "Lagi dihafal" (naik tiap ketuk) dari "Udah hafal" (hafal beneran), plus pesan jelas.

## 1. Penyebab
- `decide(true)` di `ui.js` hanya mengisi `v.known = true` bila `lv >= REVIEW_DAYS.length` (4).
- Ketuk pertama: `lv` naik, `due` +1 hari, `known` tetap salah.
- Angka "Udah hafal" = jumlah `v.known`. Jadi diam berhari-hari.
- Pesan "Muncul lagi 1 hari lagi" ada, tapi kecil dan mudah terlewat.

## 2. Perilaku baru
- Ringkasan: tambah angka "Lagi dihafal" di samping "Udah hafal".
- "Lagi dihafal" = kata dengan `lv >= 1` dan belum `known`. Naik di ketukan Hafal pertama.
- "Udah hafal" = `known`, aturan tidak berubah.
- Hint setelah Hafal: "Mantap! Muncul lagi 1 hari lagi · 4 tahap lagi jadi hafal".
- Ketuk "Belum": `lv` reset ke 0, kata keluar dari "Lagi dihafal".

## 3. Data
- Tanpa kolom baru, tanpa migrasi. Pakai `lv` yang sudah ada.
- Sinkron akun tidak berubah.
- Leaderboard tetap memakai `known` (hafal beneran).

## 4. Selesai bila
- Ketuk Hafal pada kata baru: "Lagi dihafal" naik 1 saat itu juga.
- Setelah tahap terakhir: "Lagi dihafal" turun 1, "Udah hafal" naik 1.
- Ketuk Belum: kata keluar dari "Lagi dihafal".
- Layar 320px: empat kotak ringkasan tetap muat.

## 5. Tugas developer
- Ubah ringkasan di `viewKata` dan teks hint di `decide` (`ui.js`).
- Naikkan versi `C` di `sw.js`.
