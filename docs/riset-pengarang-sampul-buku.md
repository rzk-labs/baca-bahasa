# Riset: nama pengarang & sampul buku impor (#1683)

## Intinya
- Pengarang belum disimpan. Judul EPUB dari metadata, .txt/.pdf dari nama berkas.
- Pengarang membantu membedakan buku, tapi bukti langsung masih tipis (sebagian).
- Usul kecil: simpan pengarang EPUB, tampilkan bila ada. Berkas lain dikosongkan.

## 1. Kondisi kode sekarang
- EPUB: judul dari `dc:title`, cadangan nama berkas (`app.js` parseEpub). `dc:creator` tidak dibaca.
- .txt/.pdf: judul = nama berkas tanpa ekstensi (`parseFile`).
- Pengarang hanya muncul bila judul berbentuk "Judul (Penulis)" atau "Judul - Penulis" (`splitTitle`, `ui.js`).
- Sampul: gambar EPUB bila ada; selain itu huruf awal + warna dari judul (`cover`).
- Kartu Rak/Home: sampul, judul (dipotong), bahasa, status. Tidak ada baris pengarang.

## 2. Bukti (24 butir)
Bukti dalam app (5):
- B1 Bima: judul "坊っちゃん" tanpa pengarang, buku mirip susah dibedakan.
- B2 Raka: sampul Tamat cuma satu huruf kanji, sulit dikenali.
- B3 Dina: sampul こころ hanya potongan tanda kecil.
- B4 Tari: judul Rak terpotong "Sherlock…" padahal ruang ada.
- B5 Nadia: judul reader terpotong "Alice's…".

Bukti publik (14; sumber terbaca lewat hasil pencarian, bukan halaman penuh):
- B6 Kindle: tampilan sampul menyembunyikan baris pengarang; mode daftar menampilkannya ([blog Kindle](https://blog.the-ebook-reader.com/2022/06/25/do-you-like-the-new-list-view-on-kindles/)).
- B7 Kindle bisa pindah antara grid sampul dan daftar judul+pengarang tanpa sampul.
- B8 Berkas kiriman Kindle bisa tampil nama berkas sebagai judul dan "Unknown" sebagai pengarang ([Push to Kindle](https://www.patreon.com/posts/73678796)).
- B9 Pengguna Kindle: pengarang "Unknown" dianggap normal untuk berkas tanpa metadata.
- B10 Apple Books: urut berdasarkan Pengarang tersedia, berarti pengarang metadata kelas satu ([Apple Support](https://support.apple.com/en-ie/guide/books/ibks4b6d6f7a/2.0/mac)).
- B11 Apple Books mengurut dengan nama depan; keluhan komunitas ([Apple Discussions](https://discussions-cn-prz.apple.com/thread/255950773)).
- B12 Moon+ Reader: laporan urut-pengarang salah urutan ([r/ereader](https://pol1.lr.ggtyler.dev/r/ereader/comments/1jt5qk1/moon_reader_sort_not_working)); pengarang dipakai pengguna.
- B13 LingQ: impor EPUB bisa kehilangan bab dan metadata perlu dirapikan manual ([forum LingQ](https://forum.lingq.com/t/problem-in-epub-importation/2223879)).
- B14 Readlang: panduan unggah novel lewat EPUB dari Calibre ([Readlang](https://readlang.uservoice.com/knowledgebase/articles/684377-uploading-novels-to-read-including-ones-with-drm)); tak ada info pengarang/sampul.
- B15 Kasus "Girl on the Train": pembaca e-book membeli buku salah karena judul sama ([MPR News](https://www.mprnews.org/story/2015/12/27/npr-books-girl-on-train-title-confusion)).
- B16 Kasus yang sama: pembeli e-book lebih sering tertukar daripada cetak.
- B17 MobileRead: judul sama, beda pengarang/kata pengantar, pembaca bingung edisi mana ([MobileRead](https://www.mobileread.com/forums/showthread.php?p=3423448)).
- B18 Calibre/Kobo: judul+pengarang sama bisa dianggap buku sama; pengguna menambah penerjemah/tahun supaya beda.
- B19 Pengarang di sampul sebaiknya sama dengan metadata ([PublishDrive](https://help.publishdrive.com/how-to-upload-a-book)).

Bukti metadata EPUB (5):
- B20 Spesifikasi: `creator` berisi nama pengarang seperti yang ingin ditampilkan.
- B21 Beberapa `dc:creator` (penulis, penerjemah, ilustrator) membingungkan pembaca ([bug Calibre](https://bugs.launchpad.net/calibre/+bug/1699918)).
- B22 Calibre: pengarang bisa tampil "Unknown" bila ada peran ganda (bug yang sama).
- B23 Calibre: buku dari jalur tambah otomatis bisa menyimpan metadata lama dari nama berkas ([bug Calibre](https://bugs.launchpad.net/calibre/+bug/1945889)).
- B24 Calibre pernah mengambil pengarang dari nama berkas, salah untuk antologi ([MobileRead](https://www.mobileread.com/forums/showthread.php?p=4268452)).

## 3. Vonis hipotesis
**H1 — pengarang di bawah judul membantu membedakan buku mirip: SEBAGIAN**
- Mendukung: B6, B15–B18; pustaka besar memakai pengarang sebagai pembeda.
- Lemah: tak ada studi langsung soal pustaka kecil (3–20 buku) seperti Keepo.
- Di Keepo sampul huruf tunggal (B2, B3) lebih mendesak daripada pengarang.

**H2 — metadata EPUB cukup sering terisi untuk dipakai: BELUM JELAS**
- Tidak ditemukan studi angka. Hanya laporan galat (B21–B24), bukan persentase.
- Spesifikasi mewajibkan `dc:title` dan `dc:language`; `creator` boleh kosong.
- Cek mudah: baca `dc:creator` dari impor nyata, hitung berapa terisi.

**H3 — tanpa metadata, lebih baik kosong daripada menebak dari nama berkas: SEBAGIAN**
- Mendukung: B8, B23, B24; tebakan dari nama berkas sering salah.
- Tapi "Unknown" juga jelek (B8). Kosong (tanpa baris) lebih bersih.
- Judul "Judul (Penulis)" yang sudah ada tetap dipakai; itu pilihan pengguna.

## 4. Yang tak terbaca
- Tak ada halaman penuh yang dibuka; semua dari ringkasan hasil pencarian.
- Tak ditemukan: dokumentasi resmi Moon+ Reader dan Readlang soal pengarang/sampul.
- Tak ditemukan: studi angka kelengkapan `dc:creator`. Angka H2 harus diukur sendiri.

## 5. Usul untuk developer (backlog #180)
- Saat impor EPUB, simpan `dc:creator` pertama sebagai `author` (opsional; data lama aman).
- Tampilkan satu baris kecil pengarang di bawah judul kartu Rak/Home, hanya bila ada.
- .txt/.pdf: tidak ada baris pengarang. Jangan menebak dari nama berkas.

Mockup: `docs/mockup-1683.html`.

## 6. Langkah berikutnya
- Developer kerjakan #180. Setelah ada data, hitung % EPUB dengan pengarang untuk menutup H2.
- Riset lanjutan: sampul huruf tunggal (B2, B3), terpisah dari ini.
- Tahap 22 tetap draft (aturan fase 2).
