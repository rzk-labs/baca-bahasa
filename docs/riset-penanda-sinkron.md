# Riset: penanda halaman, sinkron HP & "lanjut dari penanda" (#419)

Validasi bukti internet. Tanpa ubah kode app. Reddit tak dibuka langsung (hanya lewat cermin/cuplikan hasil cari).

## Intinya
- Penanda hilang saat ganti perangkat terbukti bikin kesal. Di Keepo, penanda ikut buku, jadi menunggu sinkron buku (#77).
- Posisi tahan ganti font itu soal "ikut teks, bukan layar". Nomor kalimat Keepo sudah ikut teks: aman.
- Yang layak dibangun dulu: pintasan "Lanjut dari penanda" di Home, daftar penanda lebih jelas, tombol Urungkan.

## 1. Kondisi app sekarang
- Penanda: `b.marks = [{p: bab, s: nomor kalimat, t: cuplikan 70 huruf, at}]`, maks 20 (ui.js ±659).
- Sinkron akun hanya progres (`SYNC_KEYS` di cloud.js). Penanda tak ikut; buku pun belum ikut.
- Daftar penanda: "Bab N" + cuplikan. Tanpa tanggal, tanpa judul bab, urut posisi.
- Hapus penanda langsung hilang (ikon 🔖 atau tong sampah), tanpa Urungkan.
- Kartu "Lanjut baca" di Home membuka posisi terakhir, bukan penanda.

## 2. Tabel bukti (43 bukti, 5 jenis sumber)
Jenis: forum pengguna, dokumen resmi/spesifikasi, ulasan/blog, GitHub, bantuan resmi app.

| # | Sumber | Bukti (ringkas/kutipan) | Untuk |
|---|---|---|---|
| 1 | [Guiding Tech](https://www.guidingtech.com/fix-kindle-books-not-syncing-between-devices/) | Kindle tak sinkron: saran Reddit "Sync to Furthest Page Read" | H1 |
| 2 | Guiding Tech | Whispersync mati: posisi hanya tersimpan di perangkat tertentu | H1 |
| 3 | [kboards](https://www.kboards.com/threads/reset-whispersync-furthest-page-read.25545/) | Perlu "reset furthest page read" bila posisi salah (dari cuplikan hasil cari) | H1 |
| 4 | [IDPF CFI](https://idpf.org/epub/linking/cfi/epub-cfi-20110506.html) | CFI: cara standar menunjuk lokasi di EPUB, lintas aplikasi | H2 |
| 5 | IDPF CFI | "Each location ... identified without the need to modify the document" | H2 |
| 6 | IDPF CFI | Fungsi disebut: "reading location maintenance" | H2 |
| 7 | IDPF CFI | Offset teks "always refers to a position between characters" | H2 |
| 8 | IDPF CFI | Di halaman dinamis, posisi bisa beda "before or after" konten | H2 |
| 9 | [AnnotationSync (KOReader)](https://github.com/dani84bs/AnnotationSync.koplugin) | "Cloud sync ... (highlights, notes, bookmarks)" | H1 |
| 10 | AnnotationSync | "Keeps tracking consistent even if font sizes or margins differ" | H2 |
| 11 | AnnotationSync | Sinkron lewat "last word of page", bukan nomor halaman | H2 |
| 12 | AnnotationSync | Dorong progres diam-diam tiap balik halaman | H1 |
| 13 | [CrossPoint #61](https://github.com/crosspoint-reader/crosspoint-reader/discussions/61) | KOSync simpan lokasi mirip XPath + persen | H2 |
| 14 | CrossPoint #61 | "A direct 1:1 mapping is not guaranteed" antar layout | H2 |
| 15 | CrossPoint #61 | Posisi sinkron "about one page off" antar perangkat | H2 |
| 16 | CrossPoint #61 | Selisih maksimal "two to three pages" setelah perbaikan | H2 |
| 17 | [KOReader #15986](https://github.com/koreader/koreader/issues/15986) | Ganti font render ulang; xpointer bisa tak valid (dari cuplikan) | H2 |
| 18 | [MobileRead Moon+ sync](https://www.mobileread.com/forums/showthread.php?t=283176) | "chapter count ... offset from start of that current chapter" | H2 |
| 19 | MobileRead Moon+ | "the sync is off by one chapter" | H1/H2 |
| 20 | MobileRead Moon+ | "I always bookmark at a chapter start" (akal-akalan) | H2 |
| 21 | MobileRead Moon+ | "a chore in hitting the next page button" sampai ketemu tempat | H1/H4 |
| 22 | MobileRead Moon+ | Koreksi: yang disimpan "percentage of the book" | H2 |
| 23 | [Blog Moon+](https://raymondlamsk.blogspot.com/2018/03/moon-reader-how-to-sync-bookmark-bet-devices.html) | Penanda tak pindah bila path file beda antar HP (cuplikan hasil cari) | H1 |
| 24 | [Apple Discussions](https://discussions.apple.com/thread/252961819) | "bookmarks on the iPhone don't synchronise with the Mac and the iPad" | H1 |
| 25 | Apple Discussions | Solusi pengguna: hapus buku di iPhone, unduh ulang | H1 |
| 26 | [Apple Support](https://support.apple.com/en-au/118661) | Sinkron butuh iCloud, Apple ID sama, ruang cukup | H1 |
| 27 | [Google Play Books](https://support.google.com/googleplay/answer/3165868) | Teks mengalir: ganti font/spasi, "same page number can appear on more than one page" | H2 |
| 28 | Google Play Books | Penanda: ketuk kanan atas; ketuk lagi = hapus | H5 |
| 29 | Google Play Books | Penanda/catatan bisa disimpan ke Drive (opsional) | H1 |
| 30 | [LingQ forum](https://forum.lingq.com/t/imported-lesson-not-saving-place/36298) | "it won't save my place when I finish reading for the day" | H1/H4 |
| 31 | LingQ forum | "sends me to the beginning of the text" | H4 |
| 32 | LingQ forum | "super annoying as the parts are long ... won't get through one in a single sitting" | H4 |
| 33 | [LingQ iOS bug](https://forum.lingq.com/t/bug-report-progress-bar-not-updating-when-turning-pages-ios/2620817) | Progres tak update saat balik halaman; harus buka di web | H1 |
| 34 | [Readlang forum](https://forum.readlang.com/t/navigate-to-a-certain-point-in-the-book/281) | "keep pressing forward ... until I catch up to the same point" | H4 |
| 35 | Readlang forum | Minta: "navigate to a certain point in the book", lompat ke X% | H4 |
| 36 | [LLN forum](https://forum.languagelearningwithnetflix.com/t/is-there-any-way-to-save-the-place-where-we-are-reading/37557) | Baca teks impor sampai hal. 15, buka lagi: "takes me back to the beginning" | H4 |
| 37 | LLN forum | Tim: "we plan to add this feature in the future" | H4 |
| 38 | [the-ebook-reader](https://blog.the-ebook-reader.com/2025/12/09/change-to-bookmark-feature-on-kindles-after-update/) | Daftar penanda Kindle kini tercampur catatan | H3 |
| 39 | the-ebook-reader | Komentar: "Now it's a multiple step process just to find one." | H3/H4 |
| 40 | the-ebook-reader | "bookmarks are virtually completely unuseable" | H3 |
| 41 | the-ebook-reader | "every night I have to read several chapters to find my place" | H4 |
| 42 | the-ebook-reader | Kindle tampilkan thumbnail halaman per penanda; filter belum ada | H3 |
| 43 | [iPhone Life](https://iphonelife.com/content/add-and-remove-bookmarks-apple-books-app-your-iphone-or-ipad) | Apple Books: penanda = tombol toggle; "undo" cuma ketuk lagi | H5 |

Catatan jujur:
- Bukti #3, #17, #23 dari cuplikan hasil cari, bukan halaman dibuka penuh.
- Tak ada bukti ulasan Kindle/Apple tentang "tombol Urungkan" untuk penanda.
- Cuplikan Reddit Kindle (cermin): penanda "pretty crap and hard to delete or navigate". Tak dibuka penuh, tak dihitung.

## 3. Vonis 5 hipotesis
| H | Hipotesis | Vonis | Alasan singkat |
|---|---|---|---|
| 1 | Penanda hilang saat ganti HP bikin kesal | **Terbukti** | Apple, Moon+, LingQ, Kindle: keluhan sinkron berulang (#1-3, #19, #24-25, #30, #33) |
| 2 | Nomor kalimat bisa loncat saat ganti font; lebih baik ikut teks/persen | **Gugur (sebagian)** | Standar & KOReader: yang aman = ikut teks (#4-11). Nomor kalimat Keepo sudah ikut teks, bukan halaman |
| 3 | Daftar butuh cuplikan lebih panjang + tanggal + bab | **Terbukti sebagian** | Kesulitan membedakan/menemukan penanda terbukti (#38-42). Soal tanggal: belum ada bukti langsung |
| 4 | Pintasan "lanjut dari penanda" di Home lebih berguna dari daftar | **Terbukti** | Keluhan "cari tempat lagi" paling sering & paling keras (#21, #30-32, #34-37, #41) |
| 5 | Hapus penanda butuh Urungkan | **Belum jelas** | Kindle/Apple/Google tanpa Urungkan (#28, #43) dan tak ada keluhan. Biaya kecil; tetap layak karena ketuk 🔖 mudah salah |

Penjelasan H2 (dari kode, belum diuji di HP):
- Penanda menyimpan nomor kalimat `s`, bukan nomor halaman.
- Ganti font mengubah halaman, bukan kalimat. Penanda ikut kalimat itu.
- Yang terasa "loncat": ikon 🔖 pindah ke halaman lain yang memuat kalimat itu.
- Risiko nyata hanya bila teks buku berubah (impor ulang): nomor kalimat bergeser.

## 4. Rekomendasi kecil untuk developer
Urut. Tak tumpang tindih #417 (bar baca), #404 (cache), spesifikasi lanjut halaman terakhir.

- **P0-1: Pintasan "Lanjut dari penanda".**
  - Di kartu "Lanjut baca" (Home), bila buku punya penanda: tombol kecil "🔖 Dari penanda terakhir".
  - "Terakhir" = `at` terbesar. Ketuk: buka bab `p`, kalimat `s` (logika sama dengan `openMarks`).
  - Tanpa penanda: tombol tak tampil. Tak ubah format data.
- **P0-2: Daftar penanda lebih jelas.**
  - Cuplikan 70 → ±140 huruf (data lama tetap jalan, tampil apa adanya).
  - Tampilkan judul bab (bila ada) + tanggal ("3 hari lalu") dari `at`.
  - Penanda baru simpan cuplikan 140 huruf. Tanpa migrasi.
- **P1-3: Urungkan.**
  - Setelah hapus (ikon 🔖 atau tong sampah): toast 5 detik dengan tombol "Urungkan".
  - Urungkan = pasang kembali penanda yang sama.

Terkait, bukan tugas baru:
- Sinkron penanda lintas HP menumpang sinkron buku (#77, `docs/spesifikasi-sinkron-buku.md`).
- Saat itu dikerjakan: simpan `marks` di rekaman buku; gabung per pasangan `p`+`s`.

## 5. Langkah berikutnya
- Developer ambil P0-1 dan P0-2 sekaligus (satu PR kecil), P1-3 menyusul.
- Naikkan versi `C` di sw.js saat kode diubah.
- Uji di iPhone: tandai, ganti font, tutup, buka dari Home → langsung ke penanda.
