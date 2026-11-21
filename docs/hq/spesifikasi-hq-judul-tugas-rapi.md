# Spesifikasi: Judul Tugas di Keepo HQ Tidak Terpotong (#294)

## Intinya
- Judul kartu tugas di HQ terpotong dan terbaca aneh ("bisa juga nya ke potong").
- Penyebab: judul diambil mentah dari baris pertama masukan, dipotong 70 huruf.
- Perbaikan: judul rapi dipotong di batas kata, teks lengkap tetap ada di detail.

## 1. Masalah sekarang
- Server HQ memotong baris pertama masukan di 70 huruf (`dev/src/index.js`, buat tugas).
- Potongan bisa di tengah kata, tanpa tanda "…".
- Kartu papan (`dev/src/page.html`, `jdl()`) memotong lagi, jadi judul makin pendek.
- Masukan mentah pengguna jadi judul apa adanya (huruf kecil, tanpa konteks).
- Kasus nyata: #294 dan "kenapa arti 1 kata berbeda...".

## 2. Perilaku yang diinginkan
- Judul dipotong di batas kata terakhir sebelum 70 huruf, lalu tambah "…".
- Huruf pertama dibuat kapital. Spasi ganda dirapikan.
- Masukan satu baris pendek (≤70 huruf): judul tidak diubah selain huruf kapital.
- Kartu menampilkan maksimal 2 baris, bukan 1 baris dengan elipsis kasar.
- Judul penuh tetap muncul saat kursor/ketuk kartu (`title=`, sudah ada).

## 3. Langkah untuk developer
- Buat fungsi `rapikanJudul(teks, maks=70)` di `dev/src/index.js`; pakai di `POST /tasks`.
- Judul penuh tetap ada di isi tugas, tidak ada data hilang.
- CSS kartu: `-webkit-line-clamp: 2` pada judul; hapus potong manual di `jdl()`.
- Pastikan halaman detail tugas menampilkan judul penuh.
- Cek: `node --check dev/src/index.js`.

## 4. Kriteria selesai
- "bisa juga nya ke potong" tampil utuh di kartu.
- Masukan panjang terpotong di batas kata dengan "…", bukan di tengah kata.
- HP kecil: judul maksimal 2 baris, kartu tidak melebar.

## 5. Catatan terkait (masukan Dina, 12-11-2026)
- #294 tak terlihat di Hasil karena tugas gagal disembunyikan tanpa laporan.
- Gagal yang sudah punya pengganti (#302 → #308) sebaiknya disembunyikan.
- Keduanya terpisah dari tugas ini; usul jadi tugas HQ berikutnya.
- Perubahan `dev/` dan deploy Worker HQ dilakukan manual oleh founder.
