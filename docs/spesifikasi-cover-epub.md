# Spesifikasi: Cover asli EPUB di rak & Home (#485)

## Intinya
- Keluhan: buku EPUB tampil dengan sampul huruf berwarna, bukan cover aslinya.
- Penyebab: impor EPUB hanya mengambil judul dan teks; gambar cover diabaikan.
- Solusi: ambil gambar cover saat impor, simpan kecil, tampilkan di tempat cover dipakai.

## 1. Temuan (dari kode)
- `parseEpub` (`app.js`) mengembalikan `{ title, paras }` saja.
- Daftar isi (`manifest`) EPUB sudah dibaca, tapi hanya untuk urutan bab.
- `cover(b)` (`ui.js`) selalu membuat sampul huruf dari judul.
- `cover(b)` dipakai di kartu "Lanjut baca" dan rak Home.
- Belum ada kolom gambar di data buku.

## 2. Perubahan yang diusulkan (urut prioritas)
- **A. Ambil cover saat impor.** Cari berurutan:
  - item `properties="cover-image"` (EPUB 3);
  - `<meta name="cover" content="id">` lalu item dengan id itu (EPUB 2);
  - cadangan: item gambar yang id/href-nya memuat "cover".
- **B. Kecilkan.** Gambar digambar ke canvas lebar maks 240px, simpan JPEG/WebP kualitas ~0,8 (sekitar 10–25 KB).
- **C. Simpan di data buku** sebagai `coverImg` (data URL). Buku lama tanpa kolom ini tetap jalan.
- **D. Tampilkan.** `cover(b)`: bila `b.coverImg` ada, pakai `<img>` dengan `alt=""` dan ukuran sama; bila tidak, sampul huruf seperti sekarang.
- **E. Gagal diam-diam.** Cover rusak/tidak ada tidak boleh menggagalkan impor.

## 3. Kriteria selesai
- Impor EPUB ber-cover: cover asli tampil di Home dan rak.
- EPUB tanpa cover, TXT, PDF: tetap sampul huruf.
- Buku lama di IndexedDB tetap terbuka, tanpa migrasi paksa.
- Impor tidak melambat terasa; ukuran tambahan per buku di bawah 50 KB.
- Tampil benar di iPhone Safari dan layar lebar; tidak ada layout bergeser.

## 4. Catatan untuk developer
- File: `app.js` (`parseEpub`, alur simpan buku), `ui.js` (`cover`), `style.css` (`.cover img`).
- Cover disimpan di data buku, bukan di teks buku, supaya daftar rak cepat dimuat.
- Hati-hati: cover EPUB bisa berformat besar (beberapa MB); wajib dikecilkan sebelum simpan.
- Gunakan `URL.createObjectURL` + `Image` + canvas; lepas URL setelah selesai.
- Pelajaran dari #477: jaga memori impor di iPhone; lepaskan blob gambar asli segera.
- Naikkan versi `C` di `sw.js` setelah mengubah file ter-cache.
- Cek sintaks: `node --check app.js ui.js`.

## 5. Opsional nanti
- Tombol "Ganti cover" untuk buku TXT/PDF (pilih foto sendiri).
- Pakai halaman pertama PDF sebagai cover.
