# Riset #449: Bukti internet, impor buku sendiri (EPUB/PDF/DRM)

_(validasi bukti internet) 36 kutipan dari 3 jenis sumber: forum aplikasi baca (LingQ, Readlang, Language Reactor), dokumen teknis/vendor, blog. Dibaca 12-11-2026._
_Bukan nasihat hukum. Kutipan asli berbahasa Inggris, dipersingkat. Pernyataan pengguna = pengalaman satu orang._

## Intinya
- Buku DRM (Kindle, Kobo, toko lain) praktis tak bisa diimpor. Terbukti.
- PDF paling rewel; EPUB/TXT bersih paling aman. Pesan gagal Keepo masih terlalu umum.
- Pemula butuh contoh bawaan; batas ukuran di HP belum teruji.

## 1. Vonis 5 hipotesis
| # | Hipotesis | Vonis |
|---|---|---|
| 1 | DRM Kindle/Kobo menghalangi impor | **Terbukti** |
| 2 | PDF hasil ekstraksi berantakan, bikin kecewa | **Terbukti** (kolom: belum ada bukti langsung) |
| 3 | Pengguna lebih suka .epub/.txt; buku legal mudah dicari | **Terbukti sebagian** (format ya; "mudah dicari" belum jelas) |
| 4 | Pemula tak tahu cari buku, perlu contoh bawaan | **Belum jelas** (bukti tidak langsung) |
| 5 | Batas ukuran/waktu di HP bikin gagal | **Belum jelas** (batas ada di kompetitor; HP belum teruji) |

## 2. Kutipan (36)
Jenis: **F** = forum aplikasi · **D** = dokumen teknis/vendor · **B** = blog/media.

### H1. DRM
1. F: "Kindle books come as protected .azw3 or .kfx files with DRM." — ZayaFTW, [LingQ 2026](https://forum.lingq.com/t/is-it-still-possible-to-import-kindle-books-into-lingq-in-2026/2621121)
2. F: "I couldn't get a usable EPUB from either platform." — ZayaFTW, sama
3. F: "every major store I've tried is giving me protected files that LingQ can't import." — ZayaFTW, sama
4. F: "in Calibre 9.8 the 'Load plugin from file' option has been removed" — ZayaFTW, sama
5. F: "Afterwards you can use Calibre to strip the DRM." — Obsttorte, sama (cara pihak ketiga, rumit)
6. F: "my e-books have copy protection that prevents them from being imported." — fisnu, [LingQ](https://forum.lingq.com/t/e-books-copy-protection-prevents-imports-to-lingq/70933)
7. F: "I've tried Calibre. Unfortunately it did'n work. The copy protection prevents that too." — fisnu, sama
8. F: "books that are under copyright protection can't be imported." — zoran (staf LingQ), sama
9. F: "this probably means that the 'Calibre + de-DRM plugin' combo won't work anymore" — PeterBormann, sama
10. F: "Lingq won't allow users to upload ebooks that are DRM-protected." — SeoulMate, [LingQ](https://forum.lingq.com/t/importing-books/38663)
11. F: "import failed because the file was corrupted" (setelah DRM dilepas) — kristenqattan, sama
12. F: "Adobe Digital Editions won't remove the DRM as such." — SeoulMate, [LingQ](https://forum.lingq.com/t/failed-to-import-a-epub-file/39720)
13. F: "it is possible that Fnac encodes their ebooks so that DRM cannot be removed." — SeoulMate, sama
14. F: "Importing failed - Start tag expected, '<' not found" (pesan error mentah) — jasondavis, sama

### H2. PDF & ekstraksi teks
15. F: "It seems the original document text is hyphenated, so the imported text has many instances of" tanda hubung — WileEQuixote, [LingQ](https://forum.lingq.com/t/hyphenation-in-imported-ebook-how-to-fix/32351)
16. F: "I used ctrl-F to find the instances and manually deleted each" — WileEQuixote, sama
17. F: "it's not, unfortunately, possible to fix that and remove all hyphens on LingQ directly." — zoran, sama
18. F: "instead of just taking it out, it seems to have replaced it with a space." — Keriamon, sama
19. F: "the hyphens were lost and the line breaks became spaces" — Steve (staf Readlang), [Readlang](https://forum.readlang.com/t/broken-swedish-words-split-by-accidental-spaces-breaking-translations/5256)
20. F: "Because the words are split, clicking them only selects half the word" — Polvik, sama (langsung mengganggu ketuk-kata)
21. F: "this is unfortunately not so uncommon" — Warsawwill, sama
22. F: "The problem with the ebook in text format is that LingQ did a really bad job with the pinyin." — [LingQ Mandarin](https://forum.lingq.com/t/importing-chinese-ebooks/1221962)
23. D: "Complex documents that render in seconds in native viewers can take minutes in PDF.js" — [Nutrient](https://www.nutrient.io/blog/pdfjs-limitations-commercial-upgrade/)

### H3. Format & sumber legal
24. F: "I've imported in txt, pdf and epub formats with little difficulty." — ejackson, [LingQ](https://forum.lingq.com/t/new-to-lingq-what-kind-of-ebooks-can-i-import-and-how-to-use-lingqs-stories-as-a-beginner/74431)
25. F: "You can import any book that doesn't have copyright protection." — robertbiggar, sama
26. F: "I am using Project Gutenberg to download publicly available novels and import them." — ali105, sama
27. F: "Some of the books of libgen or similar sites work better for lingq than the ones you buy." — robertbiggar, sama (jalur ilegal; jangan ditiru)
28. F: "I would love to see a feature that allows users to import EPUB books directly" — neko, [Language Reactor](https://forum.languagelearningwithnetflix.com/t/feature-request-support-epub-book-import/29732)
29. F: "At the moment, I can only use Language Reactor for videos or simple text files." — redrocki, sama
30. D: Arsip Aozora berformat Shift_JIS dengan rujukan gaiji; "decode to UTF-8 before parsing" — [aozora-encoding](https://docs.rs/aozora-encoding)
31. D: Arsip Aozora bisa diunduh utuh lewat GitHub — [Harvard DH](https://digitalhumanities.fas.harvard.edu/news/digital-japanese-literature-aozora-bunko)

### H4. Pemula & mencari buku
32. B: "You can find readers in bookstores or online" — [Book Riot](https://bookriot.com/how-to-read-in-another-language/)
33. B: "If you're always looking up every word, you're likely not going to remember much" — Book Riot, sama
34. F: "That's the only thing I do at LingQ, import ebooks that I have purchased." — ejackson, LingQ (pengguna mahir sudah punya buku)

### H5. Ukuran & waktu
35. F: "I keep getting a 500 error when I copy and paste the entire book into the import window." — [LingQ](https://forum.lingq.com/t/importing-books-lingq-character-limit/26192)
36. F: "It worked for me only when I splitted text ... into smaller parts (less than 10K words)" — zoran; juga "iOS Safari enforces hard canvas memory limits (256-384 MB)" — [Nutrient](https://www.nutrient.io/blog/pdfjs-limitations-commercial-upgrade/)

Catatan: LingQ sempat batas 6K kata, lalu "no limit anymore" (zoran). Kutipan 1-14 dan 15-22 saling menguatkan.

## 3. Alasan vonis
- **H1 terbukti:** 14 kutipan, 3 jenis toko, staf LingQ sendiri bilang tak bisa. Cara melepas DRM rumit dan makin rapuh (4, 9). Melepasnya juga abu-abu hukum; jangan diajarkan Keepo.
- **H2 terbukti:** hyphen & kata terbelah muncul di dua aplikasi (15-21). Kolom ganda: tak ada kutipan langsung; hanya risiko teknis.
- **H3 sebagian:** pengguna impor txt/epub/pdf dan Gutenberg (24-26). Kemudahan cari buku legal tak diukur siapa pun.
- **H4 belum jelas:** tak ada kutipan pemula bilang "bingung cari buku". Pengguna yang bicara adalah yang mahir (34).
- **H5 belum jelas:** batas LingQ sudah dicabut. Memori HP terbukti sempit untuk render PDF, tapi Keepo hanya ambil teks (tak diuji di iPhone).
- Tidak dapat dibuka: Reddit (diblokir 403 lewat mirror), ulasan App Store/Play Store. Vonis berdasar forum, bukan ulasan toko.

## 4. Cocokkan dengan app saat ini
- ✅ Baca txt dengan deteksi encoding (UTF-8, Shift_JIS, GBK, Big5, EUC-KR). Ini **memperbaiki** catatan lama di `docs/riset-bacaan-pemula-legal.md` (bagian 8: Shift_JIS rusak).
- ✅ PDF: hyphen di akhir baris disambung tanpa spasi; nomor halaman dibuang; scan terdeteksi.
- ❌ PDF dua kolom: urutan baca tidak diatur; tak ada peringatan "hasil mungkin berantakan".
- ❌ EPUB DRM: tak ada deteksi (cek `META-INF/encryption.xml`). Dugaan: teks kosong, pesan "File ini kosong". Belum diuji; menyesatkan.
- ❌ Penanda Aozora `《…》` dan `［＃…］` masih ikut terbaca. Header Gutenberg juga belum dipotong.
- ◑ Progres: toast "Membaca PDF… halaman i/n" tiap 10 halaman; EPUB tanpa progres; txt hanya "Lagi nyiapin cerita".
- ◑ Batas 50 MB. Pustaka EPUB/PDF butuh internet sekali (ada prefetch).
- Tumpang tindih: `riset-hak-cipta.md` (risiko hukum), `riset-level-buku.md` (level), `riset-bacaan-pemula-legal.md` (daftar judul). Dokumen ini hanya soal hambatan impor.

## 5. Kesimpulan
- Janji "baca buku sendiri" retak untuk buku Kindle/Kobo. Jujur ke pengguna, jangan janji.
- Jalur andal: EPUB/TXT tanpa DRM dan domain publik. Arahkan ke sana.
- PDF tetap boleh, tapi beri peringatan dan harapan yang realistis.

## 6. Usulan perbaikan app (berurut)
1. **Pesan jelas untuk DRM & PDF jelek.** Deteksi `encryption.xml`: "Buku ini dikunci toko (DRM), Keepo nggak bisa buka. Coba buku bebas DRM." Setelah impor PDF: "PDF bisa berantakan. EPUB/TXT lebih rapi."
2. **Petunjuk cari buku legal.** Di layar impor: tautan Gutenberg, Standard Ebooks, Aozora, Wikisource, plus ajakan "Coba 1 cerita". Pakai daftar `riset-bacaan-pemula-legal.md`.
3. **Indikator progres impor.** Bar/persen untuk EPUB, PDF, dan txt besar; tombol batal; pesan jelas bila memori habis.

## Langkah berikutnya
- Developer: kerjakan usulan 1 (kecil, tanpa pustaka baru).
- Manusia (penguat): coba impor 1 EPUB DRM & 1 PDF 2 kolom di iPhone.
- Riset: cari ulasan toko/Reddit saat bisa dibuka, untuk H4 & H5.
