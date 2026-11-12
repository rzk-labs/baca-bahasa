# Riset #490: Impor ganda, macet & sampul EPUB hilang

## Intinya
- 43 butir bukti dari 7 jenis sumber: forum LingQ, Readlang, MobileRead, Apple, Reddit, ulasan.
- Duplikat, impor macet, dan sampul hilang terbukti terjadi di app besar.
- Gagal impor offline belum ada bukti langsung. Perlu uji sendiri.

## 1. Cara riset
- Pencarian web (standard) per app: Moon+ Reader, LingQ, Readlang, Kindle, Kobo, KOReader, Apple Books, Librera, Language Reactor.
- Butir di bawah adalah ringkasan temuan pencarian, bukan kutipan kata per kata.
- Tautan = utas/halaman hasil pencarian. Isi halaman tidak dibuka satu per satu.
- Play Store/App Store & Reddit langsung: nyaris tak muncul. Bukti Reddit hanya via r/kindle.

## 2. Bukti: buku ganda (H1)
Sumber: [MobileRead (Moon+ Reader)](https://mobileread.com/forums/showthread.php?p=4372129), [Apple Community](https://discussions.apple.com/thread/256127273), [MobileRead (Kindle/Fire)](https://www.mobileread.com/forums/showthread.php?p=4537439), [HP forum](https://h30434.www3.hp.com/t5/Tablets-and-Mobile-Devices-Archive-Read-Only/Kindle-showing-duplicate-books/m-p/2111498).
1. Moon+ Reader: impor ulang file hasil konversi membuat salinan ganda dengan judul kacau.
2. Moon+ Reader: buka lewat Calibre menaruh salinan di folder lain.
3. Moon+ Reader: lewat Net Library, pengguna tak tahu buku sudah diimpor atau belum.
4. Moon+ Reader: buku sama di dua perangkat tak dikenali sebagai satu buku.
5. Moon+ Reader Pro (Mar 2026): membuka buku dari Calibre di microSD menyimpan salinan tambahan.
6. Apple Books: PDF muncul dua kali; hapus satu, dua-duanya hilang.
7. Apple Books (iOS 18): pindah EPUB ke Koleksi menggandakan file.
8. Apple Books Mac: kover ganda/salah muncul di rak.
9. Kindle/Fire: Calibre melaporkan 2 salinan tiap buku di tablet.
10. Kindle: pembelian tampil dua kali di pustaka, tak bisa dihapus.

## 3. Bukti: impor macet/lama (H2)
Sumber: [LingQ](https://forum.lingq.com/t/unable-to-import-ebook/385999), [LingQ 2025](https://forum.lingq.com/t/new-issues-importing-epub-books-sun-may-4-2025/1364709), [Readlang](https://forum.readlang.com/t/hangs-when-importing/1151), [Readlang epub](https://forum.readlang.com/t/epub-upload-is-broken/103).
11. LingQ: pelajaran impor "Loading" terus di beberapa komputer, tanpa solusi.
12. LingQ: EPUB ditolak dengan pesan teknis ("Start tag expected").
13. LingQ: buku panjang gagal; pengguna membelahnya di Calibre.
14. LingQ: Chinese EPUB hanya jadi satu pelajaran; versi .txt masuk utuh 10-15 detik.
15. LingQ (Mei 2025): masalah impor EPUB muncul mendadak.
16. LingQ: utas "Import problems continue (nearly two months)".
17. LingQ: utas "Missing parts in course imported from epub".
18. Readlang: impor menggantung; staf minta file dikirim lewat email.
19. Readlang: unggah EPUB rusak; Brave tak bisa memilih .epub.
20. Readlang: Safari memasukkan teks dengan huruf kacau.
21. Readlang: saran resmi, konversi ke teks lewat Calibre.
22. Language Reactor: teks terlalu besar membuat impor gagal.
23. Language Reactor: fitur teks hanya untuk teks impor, terbatas.
24. Librera: kumpulan EPUB halaman sangat banyak kadang amat lambat.
25. Apple Books: EPUB panjang, bab akhir kosong setelah halaman 11171.
26. Apple Books: file jadi tak terbaca di Readest/Calibre setelah dibuka di Books.
27. Moon+ Reader: buku tampil dengan bagian hilang; konversi tak menolong.
28. Kindle (2025): buku sideload kena "Invalid ASIN".
29. Kindle: buku sideload hilang setelah Wi-Fi tersambung lagi.

## 4. Bukti: sampul hilang (H3)
Sumber: [MobileRead (KOReader)](https://www.mobileread.com/forums/showthread.php?p=3696248), [Kobo/Scrivener](https://forum.literatureandlatte.com/t/cover-not-shown-on-kobo-epub/94878), [the-ebook-reader](https://blog.the-ebook-reader.com/2022/05/16/kindle-personal-documents-show-covers-on-lockscreen-but-not-library/).
30. KOReader (2018): sebagian EPUB tampil sampulnya, sebagian tidak.
31. KOReader: sampul tampil di Pocketbook, tidak di KOReader.
32. Kobo: sampul hilang padahal ada di Calibre; sampul ≠ halaman pertama.
33. Kobo: sampul Kindle hilang saat dikonversi ke EPUB.
34. Kobo: dugaan thumbnail tersimpan lama (cache).
35. Kobo: EPUB 3 dari Scrivener tanpa sampul; beres setelah lewat Calibre.
36. Apple Books (Des 2025): halaman sampul kadang dilewati.
37. Apple Books: sampul tak diatur dengan benar; perbaikan lewat Sigil kadang gagal.
38. Kindle: dokumen pribadi punya sampul di layar kunci, bukan di pustaka.

## 5. Bukti: offline & kabar status (H4)
Sumber: [StoryLearning](https://storylearning.com/lingq-review), [Readlang forum](https://forum.readlang.com/t/anyone-here-use-used-lingq-or-any-other-alternatives/123), [Chrome Web Store](https://chromewebstore.google.com/detail/lingq-importer/eaanhanppiifopiabnfmhjbikjmeeale/reviews).
39. LingQ: belajar offline hanya untuk paket Premium.
40. Readlang: tak jalan offline; disebut kekurangan.
41. LingQ Importer: "hanya jalan sekitar 20% waktu", pesan error terus.
42. LingQ Importer: impor YouTube/Netflix error tanpa penjelasan.
43. Readlang ekstensi: berhenti di tengah sesi; satu pengguna kehilangan 7.000 kata.

## 6. Vonis hipotesis
- **H1 Buku ganda bikin bingung & boros memori: terbukti sebagian.** Duplikat nyata di 4 app (butir 1-10). "Boros memori" tak diukur siapa pun.
- **H2 Impor lama/macet tanpa kabar bikin menyerah: terbukti sebagian.** Macet & tanpa pesan jelas ada di 5 app (butir 11-29). Pengguna lari ke konversi Calibre; "menyerah" tak dinyatakan langsung.
- **H3 Sampul hilang bikin rak terasa rusak: terbukti sebagian.** Sampul hilang umum (butir 30-38). Efek "rak rusak" kesimpulan kami, belum ada ulasan yang bilang begitu.
- **H4 Gagal impor offline tanpa petunjuk memicu ulasan buruk: belum jelas.** Tak ada utas soal impor offline. Hanya bukti: Readlang tak offline, LingQ offline berbayar (butir 39-43).

## 7. Catatan penting
- Pola berulang: pengguna disuruh "konversi di Calibre". App tak menolong sendiri.
- Pesan error teknis (butir 12) menambah bingung. Kalimat sehari-hari lebih baik.
- Batas: tak ada angka seberapa sering terjadi. Hanya laporan pengguna yang vokal.
- Ulasan toko & Reddit belum terbaca langsung. Ulangi bila akses ada.

## 8. Tiga rekomendasi (urut prioritas)
1. **Batas waktu + tombol Batal/Coba lagi + status jelas.** Dasar: butir 11, 18, 28. Cocok laporan Bima: macet 60 detik tanpa kabar.
2. **Cek duplikat (nama + ukuran file).** Dasar: butir 1-10. Tanya: "Buku ini sudah ada. Impor lagi?"
3. **Ambil sampul EPUB + kejelasan offline.** Dasar: butir 30-38. Tanpa sampul, tampilkan sampul pengganti rapi. Beri tahu jelas bila impor butuh sinyal. Terkait #485.

## 9. Langkah berikutnya
- PM buat tugas developer untuk rekomendasi 1, lalu 2, lalu 3.
- Uji impor offline lewat tester AI (H4 belum jelas).
- Bila ada akses, baca ulasan Play Store/App Store dan Reddit langsung.
