# Riset: teks PDF berantakan saat impor (#828)

Fokus: PDF yang teksnya sudah ada (bukan scan). Kode yang dinilai: `parsePdf` di `app.js`.

## Intinya
- 5 dari 6 hipotesis **terbukti**; 1 (ligatur) **belum jelas** untuk pdf.js.
- Kode sekarang: hanya buang baris angka, dan selalu sambung tanda hubung.
- Usulan: 7 perbaikan kecil. Tiga P0: pesan scan, tanda hubung aman, buang header/footer.

## 1. Cara riset
- 43 kutipan dari 4 jenis sumber: forum, issue tracker, StackOverflow, blog/dokumentasi.
- Kutipan diambil dari halaman yang terbaca (WebFetch). Teks dikutip apa adanya (bahasa Inggris).
- **Tak terbaca/tak dipakai:** Reddit, ulasan toko aplikasi, Threads/X. Tidak ada kutipan dari sana.
- **Tak terbaca:** halaman poppler (diblokir bot). Tidak dihitung.
- Banyak bukti berasal dari alat lain (Calibre, PyMuPDF, Apryse), bukan pdf.js. Masalah dasarnya sama: PDF tak menyimpan paragraf.
- Keterbatasan: belum ada tes langsung `parsePdf` pada PDF nyata. Itu bagian langkah berikutnya.

## 2. Tabel vonis

| # | Hipotesis | Vonis | Kutipan |
|---|-----------|-------|---------|
| 1 | Header, footer, nomor halaman menyelip di tengah kalimat | **Terbukti** | 29, 34, 35, 37 |
| 2 | Tanda hubung akhir baris: sambung semua merusak kata majemuk | **Terbukti** | 8, 9, 15–17, 25–28 |
| 3 | Dua kolom/catatan kaki tercampur urutannya | **Terbukti** | 30, 32, 33, 36, 38 |
| 4 | Gabung baris jadi paragraf sering salah (puisi, dialog) | **Terbukti** | 1–7, 28 |
| 5 | CJK vertikal & ligatur memberi huruf aneh | **Vertikal terbukti; ligatur belum jelas** | 13, 14, 24, 39, 41–43 |
| 6 | Pesan jelas 'PDF ini scan' + saran EPUB/TXT lebih baik | **Terbukti** (tak langsung) | 11, 12, 18, 19, 40 |

Catatan vonis:
- H1: pdf.js tak menandai header. Harus dideteksi dari pengulangan antarhalaman (kutipan 35).
- H2: alat lain pun sepakat: jangan buta-sambung (kutipan 27). Zotero salah ke arah sebaliknya (8).
- H4: pengguna LingQ mengeluh dua arah: garis hilang (1–2) dan tiap baris jadi paragraf (6).
- H5 ligatur: laporan datang dari Chrome/Obsidian/pdf2htmlEX, bukan dari `getTextContent`. Perlu uji langsung.
- H6: tak ada kutipan "pesan scan lebih baik" langsung. Buktinya: PDF tanpa lapisan teks butuh OCR (40), dan hasil rusak diam-diam memicu bingung (11, 12).

## 3. Daftar kutipan

**Forum pengguna & pembaca e-book**
1. LingQ, Wronski: "As soon as I paste it into the text box, the line breaks disappear." — https://forum.lingq.com/t/line-break-issues/26278
2. LingQ, davidcarter753auc: "the formatting (i.e. line breaks) now all lost so that the whole lesson is one big lump of text." — idem
3. LingQ, joefizh: "It doesn’t recognise the new line breaks" — https://forum.lingq.com/t/importing-theatre-texts-formatting-line-breaks/29882
4. LingQ, joefizh: "everytime I import as an ebook, the formatting messes up completely." — idem
5. LingQ, miscology: "A simple fix would be to replace all CRLF with two CRLF." — idem
6. LingQ, Shane: "each line was encoded as a separate paragraph!" — https://forum.lingq.com/t/song-lyrics-poetry-and-line-breaks/34879
7. LingQ, Shane: "This makes it much harder to edit lessons that include intentional line-breaks like song lyrics and poetry." — idem
8. Zotero, samvimes: "Zotero will delete the line breaks but also replace the hyphens by a space, thus splitting up words." — https://forums.zotero.org/discussion/comment/426906
9. Zotero Team, martynas_b: "for most PDFs hyphens are already properly removed." — idem
10. MobileRead, sherman: "And there probably isn't an automated way of determining this during conversion." — https://www.mobileread.com/forums/showthread.php?p=1166507
11. MobileRead, ldolse: "The problem in this case is it's a crappy pdf with some other character encoded in addition to the hyphen." — idem
12. MobileRead, cybmole: "it screwed up: in epub reader I see the vertical bars, & here I see exclamation marks" — idem
13. Obsidian forum, grogol: "any text after a fi (and ff I believe) will be truncated and not included in the pasted text." — https://forum.obsidian.md/t/ligature-glyph-bug/18812
14. pdf2htmlEX group, David Hedley: "replaces them with a specific “ti” ligature which isn’t present in the custom font." — https://groups.google.com/g/pdf2htmlex/c/QRpkmyF-eec
15. Apryse, Puneeth: "If the line ends hyphen i want to concatenate that corresponding word with the next line first word." — https://community.apryse.com/t/line-ends-with-hyphen/1494

**Issue tracker & tanya-jawab**
16. MuPDF, HaraldLieder: "Hyphenation resolution beyond block and / or layout bbox boundaries indeed do not work." — https://forum.mupdf.com/t/bug-pymupdf4llm-hyphenated-words-not-joined-when-split-across-text-blocks/257
17. Apryse, balasan: "the default parameter is true, which means the ouput text will be dehyphened." — https://community.apryse.com/t/can-i-keep-hyphen-in-text-extracted-from-pdf-using-pdfnet/1924
18. pdf.js #10073, maintainer: "text is just a series of glyphs and positions." — https://www.github.com/mozilla/pdf.js/issues/10073
19. pdf.js #10073, maintainer: `getTextContent` "can only give you the text content of a single page, but there are no more semantics." — idem
20. StackOverflow, async5: "In PDF there no such thing as controlling layout using control chars such as '\n'" — https://kaweah.freedombox.rocks/kiwix/stackoverflow.com_en_all_2023-11/questions/44376415/display-line-breaks-as-n-in-pdf-to-text-conversion-using-pdf-js (arsip cermin StackOverflow)
21. StackOverflow, jawaban sama: "Use text y-coordinate (can be extracted from transform matrix) to detect a line change." — idem
22. StackOverflow, penanya: "all the text is extracted in only one line." — https://kaweah.freedombox.rocks/kiwix/stackoverflow.com_en_all_2023-11/questions/54645206/pdfjs-get-raw-text-from-pdf-with-correct-newline-withespace
23. pdf-parse issue #6: "some text in the same line, but spaced between them is parsed as a single continuous text" — https://gitlab.com/autokent/pdf-parse/-/issues/6
24. Mozilla Bugzilla 1810914: "Looks like Chrome uses ActualText for each ligature to produce correct text extraction." — https://bugzilla.mozilla.org/show_bug.cgi?id=1810914

**Blog & dokumentasi**
25. DEV (textbases): "That can work for some words, but it can also break valid hyphenated terms." — https://dev.to/textbases/how-to-remove-line-breaks-from-copied-pdf-text-without-destroying-paragraphs-3dh1
26. DEV (textbases): "may be intended as `client-side`, not `clientside`." — idem
27. DEV (textbases): "A safer workflow is to flag these cases for review rather than assuming every end-of-line hyphen should disappear." — idem
28. DEV (textbases): "Line boundaries may be part of the intended meaning or structure." — idem
29. ebookpbook: "Running headers, footers, and page numbers in a PDF sit on every page as positioned text." — https://www.ebookpbook.com/2026/04/01/pdf-to-epub-conversion-problems/
30. ebookpbook: "Calibre struggles with complex layouts, images, and multi-column designs." — idem
31. ebookpbook: "PDFs store text line by line." — idem
32. DEV (vcoder_studio): "It reads straight across the page, blindly mashing the left and right columns together into an incomprehensible word salad." — https://dev.to/vcoder_studio/why-most-pdf-readers-butcher-two-column-text-and-how-i-fixed-it-with-spatial-parsing-232i
33. DEV (vcoder_studio): "Most PDF readers fail because they rely on the raw text extraction order from the PDF file." — idem
34. DEV (vcoder_studio): penulis membuang "headers and footers (top and bottom 7% of the page)". — idem
35. DEV (ivyjsu): "Every page carries running heads, page numbers, journal names, DOIs." — https://dev.to/ivyjsu/getting-clean-text-out-of-pdf-docx-and-html-cmn
36. DEV (ivyjsu): "Detect columns geometrically before ordering anything," (per halaman, bukan per dokumen). — idem
37. Twig: "Repeated elements contaminate text:" — https://www.twig.so/dev/rag-scenarios-and-solutions/chunking/pdf-extraction
38. Twig: kolom: "Treats continuation as new paragraph." — idem
39. Twig: ligatur: "Unicode mapping may be wrong or missing." — idem
40. Twig: "Image-based PDFs require optical character recognition:" — idem
41. jztan (tategaki): "The text layer is already there. It just comes out top-to-bottom, right-to-left, and in the wrong order." — https://blog.jztan.com/vertical-japanese-pdf-reading-order/
42. jztan: "reading order is geometric, not stored." — idem
43. jztan: "Sort it like rows and you walk across all the columns at once." — idem

## 4. Kondisi `parsePdf` sekarang
- Baris angka murni dibuang (`/^\d+$/`). "Page 3", "- 3 -", "iv" lolos.
- Header/footer teks lolos dan jadi bagian kalimat.
- Akhir baris `-` selalu disambung: "self-" + "aware" jadi "selfaware".
- Satu aliran `hasEOL`: tak ada deteksi kolom atau teks vertikal.
- Pesan scan hanya muncul jika **seluruh** teks kosong. Scan dengan sedikit teks lolos diam-diam.
- Ligatur tak dinormalkan.

## 5. Usulan perbaikan (berurutan)

### P0-1. Pesan scan yang jelas
- Syarat: rata-rata kurang dari 40 huruf per halaman (setelah buang nomor).
- Pesan: "PDF ini kelihatannya scan (gambar), jadi teksnya tak terbaca. Coba versi EPUB atau TXT-nya."
- Uji: PDF scan 5 halaman → pesan di atas. PDF teks normal → lolos.

### P0-2. Tanda hubung aman
- Sambung hanya jika: huruf + `-` di akhir baris, baris berikut mulai huruf kecil.
- **Tetap pakai `-`** jika awalan ada di daftar: self, well, non, ex, anti, co, semi, half, all, cross, post, pre, vice.
- Bahasa lain: awalan tak dikenal → sambung. Tak yakin → sambung (lebih sering benar, kutipan 9).
- Uji:
  - "informa-" + "tion" → "information"
  - "self-" + "aware" → "self-aware"
  - "well-" + "known" → "well-known"
  - "Jean-" + "Paul" (huruf besar) → "Jean-Paul"

### P0-3. Buang header, footer, nomor halaman
- Ambil baris pertama & terakhir tiap halaman. Ganti angka dengan `#`.
- Jika pola sama muncul di ≥3 halaman dan ≥40% halaman → buang dari semua halaman.
- Pola nomor: "12", "- 12 -", "Page 12", "12 / 340", "Halaman 12".
- Uji: buku 20 halaman, tiap halaman berawal "THE GREAT STORY 12" → hilang. Kalimat biasa di atas halaman → tetap.

### P1-4. Normalkan ligatur
- Ganti U+FB00–FB06 (ﬀ ﬁ ﬂ ﬃ ﬄ ﬅ ﬆ) jadi huruf biasa.
- Hitung karakter `�` (U+FFFD). Jika >2% teks → peringatan "Sebagian huruf PDF ini aneh; EPUB/TXT lebih aman."
- Uji: "ﬁnd the oﬃce" → "find the office".

### P1-5. Dua kolom
- Per halaman, hitung posisi x awal item. Jika ada celah vertikal jelas dan banyak baris di kedua sisi → baca kolom kiri dulu, lalu kanan.
- Jika ragu → jangan ubah urutan, tampilkan peringatan.
- Uji: PDF makalah dua kolom → kalimat kolom kiri tidak lompat ke kanan.

### P2-6. Puisi & dialog
- Baris yang mulai `—`, `-`, `“` atau `"` → mulai paragraf baru.
- Banyak baris pendek berurutan tanpa titik → tiap baris jadi paragraf sendiri.
- Uji: tiga baris dialog berawalan `—` → tiga paragraf. Bait puisi 4 baris pendek → 4 paragraf.

### P2-7. Teks vertikal Jepang/Mandarin
- Jika item bertransformasi vertikal banyak → tampilkan peringatan, jangan urutkan ulang dulu.
- Pesan: "PDF ini bertulisan vertikal; urutan teks bisa terbalik. EPUB lebih aman."
- Uji: PDF tategaki → peringatan muncul.

## 6. Kesimpulan & langkah berikutnya
- Kerjakan P0-1, P0-2, P0-3 lebih dulu (dalam satu tugas developer, backlog no. 79).
- Sebelum menyentuh P1, kumpulkan 5 PDF nyata (novel, makalah dua kolom, puisi, scan, Jepang). Jalankan `parsePdf` dan catat hasilnya.
- Cek ulang vonis ligatur dengan PDF LaTeX.
- Jangan ubah data pengguna lama. Perbaikan hanya memengaruhi impor baru.
