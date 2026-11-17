# Keluar akun & logo kepotong (#1293)

## Intinya
- Setelah keluar, layar masih penuh data lama (XP, streak, buku). Terasa belum keluar.
- Logo "Keepo" di pojok kiri atas kepotong di HP 390px.
- Rencana: dua pilihan saat keluar + header rapi. Belum dibangun.

## 1. Temuan
- Tombol Keluar hanya menghapus akun; data HP sengaja dibiarkan.
- Toast bilang "Progres tetap ada di HP ini", tapi layar tampak sama persis.
- Header Home (logo + streak + XP + Masuk + Atur) terlalu lebar di 390px.
- Aturan CSS header bertumpuk; pil XP tampil walau seharusnya disembunyikan ≤430px.

## 2. Perilaku keluar yang diusulkan
- Tombol Keluar membuka sheet konfirmasi, bukan langsung keluar.
- Pilihan 1 (utama): "Keluar saja". Data tetap di HP, sinkron dulu sebelum keluar.
- Pilihan 2: "Keluar & bersihkan HP". Hapus buku, kata, XP lokal setelah sinkron sukses.
- Pilihan 2 butuh konfirmasi kedua bila sinkron gagal (data bisa hilang).
- Setelah keluar: Home tampil status tamu, tanpa sapaan akun, tombol Masuk jelas.

## 3. Perbaikan logo
- Logo tidak boleh kepotong di 320, 360, 390, 430px.
- Logo ukuran tetap (flex:none, tanpa overflow tersembunyi).
- Pil XP disembunyikan ≤430px; sisakan streak, Masuk/Profil, Atur.
- Rapikan aturan CSS `#top h1`, `#hdx`, `#pXp` yang saling menimpa.

## 4. Batas pekerjaan
- Ubah `cloud.js` (alur keluar), `style.css` (header), `ui.js` bila perlu.
- Jangan ubah `api/`. Naikkan versi `C` di `sw.js`.
- Data lama IndexedDB tidak boleh rusak; hapus hanya lewat pilihan 2.
- Uji di 320/360/390/430px, tema terang dan gelap.

## 5. Syarat selesai
- Logo utuh di semua lebar uji.
- Keluar saja: data tetap, status tamu jelas.
- Keluar & bersihkan: data lokal kosong, tak bisa diurungkan, ada peringatan.

Mockup: `docs/mockup-1293.html`.
