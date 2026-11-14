# Spesifikasi: Ganti sampul buku dari foto/galeri (#1009)

## Intinya
- Pengguna minta: "Bisa ganti atau pasang cover buku". Sekarang sampul hanya otomatis.
- Solusi: menu kecil "⋯" di kartu buku → Ganti sampul / Hapus sampul / Hapus cerita.
- Gambar diperkecil di HP, disimpan lokal. Sampul EPUB asli tidak hilang.

## 1. Temuan (dari kode)
- Kartu buku Home (`ui.js` ±869) hanya punya tombol **Hapus**. Belum ada menu buku, belum ada "Ubah judul".
- `cover(b)` (`ui.js` 96) memakai `COVERS[b.id]` lalu huruf awal.
- Sampul EPUB disimpan terpisah di IndexedDB, kunci `c_<id>` (`putCover`/`getCover`, `app.js` 150). Penanda di buku: `b.cov = 1`.
- `delText` (`app.js` 148) ikut menghapus `c_<id>` saat buku dihapus.
- `muatCover()` memuat sampul ke memori saat app dibuka.

## 2. Keputusan desain
- **Simpan terpisah, bukan di objek buku.** Data URL 20–50 KB di objek buku memberatkan daftar rak dan sinkron.
- **Kunci baru `cu_<id>`** untuk sampul buatan pengguna. Kunci `c_<id>` (EPUB) tidak disentuh.
- **Penanda `b.covU = 1`** di buku. Buku lama tanpa field ini tetap aman, tanpa migrasi.
- **Urutan tampil:** `cu_` (pengguna) → `c_` (EPUB) → huruf awal.
- Hapus sampul = hapus `cu_` + `covU`. Sampul EPUB muncul lagi sendiri.

## 3. Alur pengguna
- **Buka menu:** ketuk "⋯" di kartu buku → sheet bawah "Cerita ini".
- **Ganti sampul:** buka pemilih gambar (`input type=file accept="image/*"`). Di iPhone: Foto / Kamera / File.
- **Setelah pilih:** perkecil → simpan → kartu langsung berganti → toast "Sampul diganti".
- **Hapus sampul:** hanya tampil bila `covU` ada. Toast "Sampul kembali otomatis".
- **Hapus cerita:** pindah ke sheet yang sama; tetap dengan konfirmasi "Yakin hapus?" dan Urungkan seperti sekarang.
- Judul aksi: "Ganti sampul" (belum ada) atau "Ganti sampul" juga bila sudah ada. Satu istilah.

## 4. Perkecil gambar
- Muat lewat `URL.createObjectURL` + `Image`; lepas URL setelah selesai (pelajaran #477: jaga memori iPhone).
- Skala sisi terpanjang maks **480px**. Jangan perbesar gambar kecil.
- Canvas → `toDataURL('image/webp', 0.8)`; bila hasil tidak berawalan `data:image/webp` (Safari lama), pakai `image/jpeg` 0.8.
- Target ukuran: di bawah ±80 KB. Bila lebih, ulangi sekali dengan kualitas 0.65.
- Gambar tidak terbaca / bukan gambar / gagal: toast "Gambar ini nggak bisa dipakai. Coba foto lain." Sampul lama tetap.
- Rasio sampul 132×188 (±0,70): tampilkan dengan `object-fit:cover` (sudah ada di `.cimg`). Foto dipangkas tengah; jangan diubah ukurannya di data.

## 5. Teks (Indonesia santai)
- Tombol menu: "Ganti sampul", "Hapus sampul", "Hapus cerita".
- Toast: "Sampul diganti", "Sampul kembali otomatis".
- Error: "Gambar ini nggak bisa dipakai. Coba foto lain."
- Label "⋯": `aria-label="Menu cerita: <judul>"`.

## 6. Kriteria selesai
- Foto dari galeri jadi sampul di Home dan tab Baca; bertahan setelah app ditutup.
- Hapus sampul → EPUB kembali ke sampul asli; TXT/PDF kembali ke huruf.
- Buku lama (tanpa `covU`) terbuka normal; tidak ada migrasi.
- Hapus cerita ikut menghapus `cu_<id>` (tidak ada sisa data).
- Tombol menu ≥44px, rapi di lebar 320px dan layar lebar; kartu tidak bergeser.
- Gambar rusak tidak merusak buku (`onerror` melepas gambar, seperti sekarang).

## 7. Catatan untuk developer
- File: `ui.js` (kartu Home/Baca, `cover`, sheet menu, `muatCover`), `app.js` (`putCover`-mirip untuk `cu_`, `delText` hapus `cu_`), `style.css`, `sw.js` (naikkan `C`).
- `COVERS[b.id]` diisi: `cu_` dulu bila `b.covU`, kalau tidak `c_`. Simpan EPUB asli di `COVERS_EPUB` atau muat ulang `c_` saat Hapus sampul.
- Cari semua tempat yang menampilkan `cover(b)` (Home hero, rak, tab Baca) agar konsisten.
- Jangan menyentuh sheet Tamat, header Baca, titik siap diulang (tugas #998/#1004).
- Jangan ubah `api/`. Sampul tidak ikut sinkron akun; bilang di catatan, bukan di UI.
- Tes manual: 320px, layar lebar, iPhone Safari (Foto/Kamera), mode offline.
- Cek: `node --check ui.js app.js`.

## 8. Opsional nanti
- Pangkas/geser foto sebelum simpan.
- Sampul ikut cadangan/sinkron akun.
- Halaman pertama PDF sebagai sampul (lihat `docs/spesifikasi-cover-epub.md` bagian 5).

## Mockup
- `docs/mockup-1009.html` (gambaran rencana, belum dibangun).
