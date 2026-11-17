# Spesifikasi: Home terbuka kepotong (#1291)

## Intinya
- Home pertama kali terbuka sudah tergulir: judul dan tombol "Tambah cerita" tersembunyi.
- Gambar buku di bawah juga terpotong separuh, jadi terlihat jelek.
- Perbaikan: Home selalu mulai dari paling atas, gambar tampil utuh atau tidak sama sekali.

## 1. Masalah (screenshot founder)
- Layar langsung menunjukkan langkah "2" dan "3". Langkah "1", judul, dan tombol utama hilang.
- Gambar buku dipotong di bagian bawah, halaman terlihat setengah.
- Kesan pertama pengguna baru: layar berantakan.

## 2. Penyebab
- `setTab` memanggil `window.scrollTo(0, 0)` (ui.js:491) sebelum Home digambar. Saat dimuat ulang, Safari iPhone memulihkan posisi gulir lama setelahnya.
- Belum ada `history.scrollRestoration = 'manual'` di mana pun.
- `.hero-pic` (style.css:1133) memakai `max-height:140px` + `object-fit:cover`, jadi gambar 4:3 terpotong.

## 3. Perbaikan yang diminta
- Di awal ui.js: set `history.scrollRestoration = 'manual'` (dalam try/catch).
- Di `viewRak`, setelah `#view` terisi (layar kosong tanpa buku): panggil `window.scrollTo(0, 0)`.
- Ulangi `scrollTo(0, 0)` pada event `pageshow` bila tab aktif Home dan belum ada buku.
- `.hero-pic`: ganti `object-fit:cover` jadi `contain`; tinggi otomatis (rasio 4:3), tanpa `max-height:140px`.
- Layar pendek (`max-height:700px`): gambar tetap disembunyikan, sudah ada.
- Naikkan versi `C` di sw.js (ui.js dan style.css di-cache).

## 4. Cara cek
- iPhone Safari lebar 390px: muat ulang Home saat posisi gulir di bawah. Judul tetap di atas.
- Gambar buku tampil utuh, tidak terpotong, tidak menimpa menu bawah.
- Cek layar 320px dan layar lebar. Data pengguna lama tidak berubah.

Mockup: `docs/mockup-1291.html`.
