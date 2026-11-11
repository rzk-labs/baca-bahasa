# Spesifikasi: nama app seragam KEEPO (#97)

## Intinya
- Judul layar, ikon, dan manifest sudah "KEEPO". Sisa nama lama "Kepo" masih ada.
- Yang terlihat pengguna: lencana "Kepo Pertama", nama maskot, dan nama file unduhan.
- Tugas ini untuk developer. PM tidak mengubah kode.

## 1. Sudah benar (jangan diubah)
- Judul halaman, judul header, dan nama di layar utama HP: KEEPO.
- Teks sapaan maskot dan teks bagikan: KEEPO.
- README dan dokumen tim: Keepo.

## 2. Yang perlu diselaraskan (terlihat pengguna)
- `ui.js` lencana "Kepo Pertama" jadi "Keepo Pertama".
- `ui.js` unduhan `kepo-kata.csv` jadi `keepo-kata.csv` (3 tempat).
- `BRAND.md` dan `CLAUDE.md`: tulis nama app "Keepo" / "KEEPO".
- Komentar kode (`ui.js`, `style.css`, `cloud.js`, `api/src/index.js`): rapikan saja.
- Nama maskot: "Keepo" (bukan "Kepo").

## 3. Jangan diubah (bisa merusak)
- Nama file gambar `img/kepo-*.webp` dan daftarnya di `sw.js`.
- Kunci simpanan lokal `kepo.api`, `kepo.wnSeen` (data pengguna lama hilang).
- Alamat server `kepo-api` dan `app: 'kepo-api'` (deploy manual).
- Kata "kepo" sebagai kata sehari-hari ("kepoin bahasa baru") tetap boleh.

## 4. Cara cek
- Cari "Kepo" tanpa "KEEPO" di teks tampilan: hasilnya harus kosong.
- Jalankan `node --check ui.js`.
- Naikkan versi `C` di `sw.js` (sekarang `kepo-v35`).
- Unduh CSV kata: nama file baru `keepo-kata.csv`.

## 5. Catatan
- Aturan merek: judul tampil KEEPO (huruf besar); teks biasa "Keepo".
- Perlu putusan founder? Tidak, selama file gambar dan kunci data tidak diganti.
