# Riset: PDF scan & komik ditolak — jalan keluar terbaik? (#1308)

_Bukan nasihat hukum. Bukti dari pencarian web 18-11-2026. Reddit tidak muncul di mesin pencari; diganti forum, blog, GitHub, putusan pengadilan._

## Intinya
- Rekomendasi: **pesan lebih baik** sekarang. Tolak OCR di HP untuk komik.
- OCR HP berat (14-20 MB) dan lemah untuk teks vertikal di balon komik.
- Aplikasi serupa (LingQ, Readlang) juga tak membaca scan. Penggunanya OCR di luar.

## 1. Masalah
- Ilham (pengguna AI): komik biasanya PDF scan, Keepo menolak "teks tak terbaca".
- Pesan ada di `app.js:490`. Hanya muncul jika teks nyaris kosong.
- Saran sekarang: "Coba EPUB atau TXT". Untuk komik, saran itu buntu.

## 2. Vonis hipotesis
| H | Pernyataan | Vonis |
|---|---|---|
| H1 | Pelajar sering ingin baca komik/manga | **Terbukti** (bukti 1-12) |
| H2 | PDF scan paling sering gagal di app serupa | **Belum jelas** (arah benar, tak ada angka "paling sering") |
| H3 | OCR di HP layak tanpa server | **Gugur** untuk komik & CJK; belum jelas untuk teks Latin bersih |
| H4 | Pesan jujur + saran sumber cukup untuk pemula | **Belum jelas** (masuk akal, tak ada uji pengguna) |
| H5 | OCR file milik sendiri aman | **Belum jelas** (tak ada putusan langsung; perlu cek hukum) |

## 3. Bukti (34 sumber, 4 jenis: blog/artikel, forum, dokumentasi/GitHub, putusan hukum)
**A. Pelajar ingin komik/manga (H1)**
1. Migaku: panduan belajar Jepang lewat manga dengan OCR — [tautan](https://migaku.com/blog/japanese/learn-japanese-with-manga)
2. Migaku: belajar bahasa lewat komik — [tautan](https://migaku.com/blog/language-fun/language-learning-with-comics)
3. Lingopie: cara belajar bahasa dengan komik — [tautan](https://lingopie.com/blog/how-to-learn-a-language-with-comic-books/)
4. Hacking Chinese: baca manga bukan cuma hiburan — [tautan](https://www.hackingchinese.com/reading-manga-for-more-than-just-pleasure/)
5. Medium: komik bantu ingat kosakata — [tautan](https://medium.com/language-lab/comic-books-are-your-best-friends-for-vocabulary-retention-in-a-foreign-language-1c5b10b17a97)
6. FluentU: belajar Jepang lewat manga — [tautan](https://www.fluentu.com/blog/japanese/learn-japanese-with-manga/)
7. Tatsumoto: apakah manga bagus untuk awal belajar — [tautan](https://tatsumoto.neocities.org/blog/is-it-a-good-idea-to-read-mostly-manga-in-the-beginning)
8. Tatsumoto: cara menambang kata dari manga — [tautan](https://tatsumoto.neocities.org/blog/mining-from-manga)
9. Forum Quarter to Three: belajar Jepang dari manga — [tautan](https://forum.quartertothree.com/t/learning-japanese-by-reading-manga-they-said-it-couldnt-be-done/161155)
10. Mezzoguild: ulasan Manga Method — [tautan](https://mezzoguild.com/manga-method-review)
11. All Language Resources: belajar bahasa dengan komik — [tautan](https://www.alllanguageresources.com/study-languages-with-comics/)
12. Goodreads: komik vs buku teks untuk belajar — [tautan](https://www.goodreads.com/author_blog_posts/25549368-comic-books-versus-text-only-books-for-language-learning)
- Catatan: ini blog/forum. Belum ada survei besar. Minat tampak nyata, ukurannya tidak.

**B. Scan gagal di app belajar (H2)**
13. LingQ staf: "tidak ada fungsi impor PDF", salin teks dulu — [tautan](https://forum.lingq.com/t/questions-re-importing-and-app/16312)
14. LingQ: scan "tak berguna di LingQ" — [tautan](https://www.lingq.com/pt/forum/open-forum/converting-pdf-images-into-ocr/)
15. LingQ: PDF Jepang vertikal urutan salah, tak akan dikembangkan — [tautan](https://forum.lingq.com/t/how-does-one-import-japanese-into-lingq/1041420)
16. LingQ: memindai dari buku — [tautan](https://forum.lingq.com/t/scanning-from-books/12900)
17. Readlang: PDF tak didukung, ubah ke teks — [tautan](https://forum.readlang.com/t/can-i-import-pdfs/43)
18. Readlang: cari cara baca PDF — [tautan](https://forum.readlang.com/t/wanted-workaround-to-read-pdfs-with-readlang/4897)
19. WaniKani: terjemah PDF manga, ekstensi tak jalan di PDF — [tautan](https://community.wanikani.com/t/translating-japanese-manga-pdfs/16453)
20. Memo Cards: PDF tampil "0 karakter" — [tautan](https://support.memo.cards/en/articles/10502040-pdf-shows-only-0-characters-here-s-how-to-fix-it)
21. Scholarcy: beberapa PDF tak terunggah — [tautan](https://www.scholarcy.com/help/some-pdf-files-do-no-upload)
22. Texthelp: PDF tak terbaca — [tautan](https://support.texthelp.com/help/pdfs-not-reading)
23. OpenAI komunitas: unggah PDF scan error — [tautan](https://community.openai.com/t/uploading-scanned-pdf-results-in-error/797964)
24. Pickaxe: PDF teks-sebagai-gambar tak terbaca — [tautan](https://community.pickaxe.co/t/pdf-with-text-as-image-not-readable/8348)
- Catatan: pola sama di banyak produk. Tidak ada hitungan "paling sering".

**C. OCR di HP / peramban (H3)**
25. Tesseract.js: panduan performa resmi — [tautan](https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/docs/performance.md)
26. Ulasan "OCR Jepang di web 2025": akurasi Tesseract.js hanya sedang — [tautan](https://lilting.ch/en/articles/ocr-web-2025)
27. Blog OCR peramban: data bahasa ±2 MB (Latin) sampai ±15 MB (CJK), tak terverifikasi — [tautan](https://zerodataupload-app.pages.dev/blog/ocr-text-extraction-browser-guide)
28. Dynamsoft (vendor): akurasi turun pada scan miring/resolusi rendah — [tautan](https://www.dynamsoft.com/codepool/free-web-ocr-image-pdf.html)
29. Grup Tesseract: teks vertikal Jepang salah, perlu model `jpn_vert` — [tautan](https://groups.google.com/g/tesseract-ocr/c/R5opkHAHiKo/m/0nTty6vyCgAJ)
30. Arch Linux bug: data vertikal CJK hilang — [tautan](https://bugs.archlinux.org/task/64073.html)
31. manga-ocr (model khusus manga, perlu Python/server): — [tautan](https://huggingface.co/kha-white/manga-ocr-base)
32. mokuro: OCR manga di PC lalu baca dengan kamus — [tautan](https://github.com/kha-white/mokuro)
33. Tatsumoto: OCR sering salah baca gambar — (lihat no. 7-8)
- Ukuran CJK ±14-20 MB, tersimpan di cache. Tak ada tolok ukur CJK terbit.

**D. Hukum (H5)**
34. Authors Guild v. Google (2015): pemindaian + OCR untuk pencarian dinilai wajar — [tautan](https://www.npr.org/sections/thetwo-way/2015/10/16/449172748/googles-book-scanning-project-is-legal-u-s-appeals-court-says)
35. Putusan penuh Pengadilan Banding AS — [tautan](https://www.govinfo.gov/content/pkg/USCOURTS-ca2-13-04829/pdf/USCOURTS-ca2-13-04829-0.pdf)
- Kasus ini soal fungsi pencarian Google, bukan individu. **Tidak** menjawab H5 langsung.
- Hukum Indonesia (UU 28/2014) tidak dicek di riset ini.

## 4. Analisis per hipotesis
- **H1:** semua panduan menyebut komik cocok pemula. Gambar membantu konteks. Tapi mereka juga bilang komik kurang untuk tata bahasa.
- **H2:** LingQ dan Readlang tak membaca scan. Pengguna OCR di luar lalu tempel teks. Keepo tidak lebih buruk dari pesaing.
- **H3:** balon komik = teks vertikal, huruf bergaya, latar gambar. Tesseract umum lemah di sini. Model khusus (manga-ocr) butuh server. Keepo tanpa server → tidak cocok.
- **H4:** pesan jujur murah dan cepat. Efek pada keputusan pengguna belum diuji.
- **H5:** OCR file sendiri untuk dibaca sendiri, tanpa dibagikan, tampak risiko rendah. Itu perkiraan, bukan kepastian.

## 5. Opsi
| Opsi | Kerja | Risiko |
|---|---|---|
| OCR di HP (Tesseract.js) | Besar (±5-8 hari) | Unduh 14-20 MB, lambat, hasil komik buruk, hak cipta belum jelas |
| **Pesan lebih baik** | Kecil (±0,5-1 hari) | Pengguna komik tetap harus cari cara lain |
| Tolak saja | Nol | Pengguna komik pergi tanpa arah |

## 6. REKOMENDASI: pesan lebih baik
- Deteksi scan tetap. Ganti pesan jadi ramah dan beri jalan keluar.
- Isi pesan: scan berisi gambar, bukan teks; coba komik berteks (EPUB/web); atau OCR dulu di luar (mis. Google Drive/Adobe), lalu impor.
- Tautkan "Coba cerita contoh" dan daftar bacaan legal ([riset-bacaan-pemula-legal.md](riset-bacaan-pemula-legal.md)).
- Catat berapa kali pesan scan muncul (tanpa data pribadi) untuk menilai ulang OCR.

**Ukuran kerja developer (kecil, ±0,5-1 hari)**
- `app.js:490`: pesan baru + kode alasan "scan".
- `ui.js`: tampilkan sebagai kartu dengan 2 tombol (Cerita contoh / Cara OCR).
- `sw.js`: naikkan versi C. Uji 320-430px.

## 7. Syarat menilai ulang OCR
- Bila ≥10% impor gagal karena scan, atau banyak permintaan komik.
- Coba hanya teks Latin bersih (bukan komik), diunduh atas izin pengguna.
- Wajib cek hukum Indonesia dulu.

## 8. Langkah berikutnya
- Developer: kerjakan backlog 145 (pesan scan baru).
- Founder: tanya 5 pembaca komik apa mereka mau menunggu OCR 14 MB.
- Riset lanjutan: cek UU 28/2014 soal salinan pribadi.
