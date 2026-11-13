# Spesifikasi: persen buku satu angka (#797)

## Intinya
- Rumus persen sudah satu (`pctCalc`/`pctOf` di ui.js), tapi masukannya masih bisa beda antar layar.
- Penyebab: bobot bab dihitung belakangan, halaman tersimpan basi, dan label "Hal" beda satuan dengan "%".
- Tugas developer: satukan masukan, render ulang Home saat balik dari reader, saring "Kata baru" per bahasa.

## 1. Temuan (hasil baca kode)
- Satu rumus ada: `pctCalc` (ui.js:98) dipakai `pctOf`, `readPct`, `progInfo`. Bagus.
- Masukan bisa beda: `b.units` (bobot bab) baru dihitung lazy di `pagesOf` (ui.js:271). Sebelum itu, Home pakai bobot sama; bar baca pakai bobot panjang. Ini penyebab 22% vs 42%.
- `pctOf` memakai halaman tersimpan (`b.pg/pgN`) hanya bila `pgPos` cocok. Ukuran font berubah → `pgN` berubah → persen loncat.
- "Hal 49/50 tapi 10%": Hal = halaman di dalam bab; % = seluruh buku. Satuannya beda, labelnya tidak jelas.
- Cabang `!b.total` mengembalikan `b.pct` lama (basi). Cloud/leaderboard (cloud.js) juga membaca `b.pct` tersimpan.

## 2. Yang harus dikerjakan
- Simpan posisi dalam pecahan stabil (mis. `b.frac` = bagian dalam bab, 0–1), bukan indeks halaman. `pctCalc` pakai `frac`; tak tergantung `pgN`/font.
- Hitung `units` sekali saat buku masuk atau pertama dibuka, di satu fungsi. `pctOf` jangan pernah jatuh ke bobot sama bila teks sudah ada.
- Buat alias `bookPct(b)` = `pctOf`; semua layar (Home, hero, Berikutnya, Profil/Koleksi, sheet Tamat, cloud.js) wajib lewat fungsi itu, bukan `b.pct`.
- Render ulang kartu Home dan hero tiap `setTab('rak')` dari reader (cek `leaveBaca`, ui.js:965).
- Ubah label bar: "Hal 49/50 di bab ini · 10% buku" agar satuan jelas.
- Data lama IndexedDB: biarkan `b.pct`/`pg` apa adanya; `frac` dihitung dari `pg/pgN` bila ada. Tanpa migrasi destruktif.

## 3. "Kata baru" salah bahasa
- Hitung hanya kata di tab Kata yang `lang`-nya sama dengan buku. Raka melihat Korea di buku Jepang.
- Tampil hanya bila kata benar-benar disimpan/diketuk (`app.js:543` sudah satu sumber; pakai di status Lanjut baca & FYP).
- Partikel (が dll.) keluarkan lewat daftar kata fungsi (`app.js:522`); cek daftar untuk Jepang, Korea, Mandarin.

## 4. Uji terima
- Buku 10 bab: Home, hero, bar baca, Profil, Koleksi menunjukkan angka sama (selisih 0).
- Ganti ukuran font di tengah bab: persen tak berubah.
- Buka buku lama (units belum ada): Home & bar sama sejak buka pertama.
- Buku Jepang: tak ada kata Korea/partikel di "Kata baru".
- Wajib: `node --check ui.js app.js cloud.js`, naikkan `C` di sw.js, jangan ubah `api/`.
