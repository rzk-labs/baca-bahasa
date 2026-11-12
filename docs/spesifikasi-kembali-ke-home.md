# Spesifikasi: Kembali ke Home dari e-reader (#159)

## Intinya
- Keluhan: setelah baca, pengguna tidak menemukan cara kembali ke Home.
- Penyebab: tombol ← tersembunyi; baru muncul kalau ketuk tengah layar.
- Solusi: tombol keluar jelas di halaman Tamat, plus petunjuk dan tombol Back HP.

## 1. Temuan (dari kode)
- Layar baca menyembunyikan tab bawah dan header Home (`body.reading`).
- Satu-satunya jalan: tombol ← (`#rHome`) di bilah atas.
- Bilah atas tersembunyi; muncul hanya saat ketuk tengah layar (25–75% lebar).
- Setiap pindah halaman, bilah atas disembunyikan lagi.
- Sheet "Tamat 📚" cuma punya "Latih di Kata" dan "Tutup"; tidak ada jalan ke Home.
- Tombol Back HP / geser-balik iPhone tidak dipakai app (tidak ada riwayat halaman).

## 2. Perubahan yang diusulkan (urut prioritas)
- **A. Sheet Tamat**: tambah tombol "Ke Home" (`setTab('rak')`). Wajib.
- **B. Tombol Back HP**: masuk baca = `history.pushState`; `popstate` → `setTab('rak')`. Jangan bikin loop.
- **C. Petunjuk sekali saja**: toast "Ketuk tengah layar buat menu & balik ke Home". Tampil saat buka buku pertama kali.
- **D. Opsional**: ikon kecil ← samar permanen di pojok kiri atas (tidak mengganggu baca).

## 3. Kriteria selesai
- Dari halaman terakhir buku, Home bisa dicapai dalam 1 ketukan.
- Back HP dari e-reader membawa ke Home, bukan keluar dari app.
- Petunjuk muncul sekali; tidak muncul lagi setelah ditutup.
- Data pengguna lama aman; tidak ada perubahan format simpan.

## 4. Catatan untuk developer
- File: `ui.js` (`finishBook`, `viewBaca`, `setTab`), `style.css` bila perlu D.
- Naikkan versi `C` di `sw.js` setelah mengubah file ter-cache.
- Uji di iPhone Safari (geser tepi kiri) dan Android Chrome (tombol Back).
