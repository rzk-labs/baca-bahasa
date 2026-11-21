# Spesifikasi: XP hari ini di sheet Tamat = Home (#1414)

## Intinya
- Angka XP di sheet Tamat dan kartu Target Home harus selalu sama.
- Kode sekarang sudah satu sumber (`xpToday()`), tapi tulisan dan waktu muat masih bisa beda.
- Perbaikan kecil: satu fungsi teks, segarkan Home saat sheet ditutup.

## 1. Temuan (dari baca ui.js)
- `finishBook` (baris ~1429) sudah memakai `xpToday()`, sama dengan kartu Target (baris ~1073).
- `award()` sudah memanggil `refreshHomeStats()` (baris ~286).
- Sheet menulis `+N XP hari ini`. Home menulis `N` di cincin. Orang membaca `+10` sebagai "XP dari buku ini", bukan total hari ini.
- `xpToday()` memotong XP halaman di `PG_CAP` (10). Penguji yang baca banyak halaman melihat angka kecil di Home, tapi merasa dapat lebih.
- Sheet itu statis. XP susulan (kata tersimpan, `flushLate`) mengubah Home, bukan sheet.
- Home dirender ulang lewat `setTab`, tapi `closeSheet()` sendiri tidak menyegarkan kartu.
- Penyebab paling mungkin: salinan lama (cache) di HP penguji + tulisan `+N` yang menyesatkan.

## 2. Yang harus dibangun
- Satu fungsi `xpTodayText()` di ui.js. Dipakai sheet Tamat, kartu Target, kartu Level.
- Teks sama di semua tempat: `N XP hari ini` (tanpa tanda plus).
- Bila `xpToday() >= GOAL`: sheet menulis `Target harian tercapai`. Jangan tulis angka lain.
- `refreshHomeStats()` dipanggil: tiap `award()` berhasil, saat `closeSheet()`, dan saat `setTab('rak')`.
- Baca ulang buku: tetap `Baca ulang: tanpa XP halaman`.
- Jangan ubah `api/` dan format data IndexedDB.

## 3. Cara uji (320px)
- Baca buku pendek sampai Tamat. Catat angka di sheet.
- Tutup sheet. Angka di kartu Target Home harus sama.
- Ulangi saat XP sudah ≥ 30: sheet tulis `Target harian tercapai`, Home tulis `Tercapai`.
- Cek tidak ada teks terpotong di lebar 320px.
- `node --check ui.js`, lalu naikkan versi `C` di sw.js.

## 4. Mockup
- Lihat `docs/mockup-1414.html` (Sebelum / Sesudah, dua kondisi).
