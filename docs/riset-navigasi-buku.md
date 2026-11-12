# Riset #612: navigasi buku (cari teks, lompat bab, lanjut posisi)

## Intinya
- 44 kutipan dari 9 halaman publik: pembaca ingin lompat & cari, dan benci kehilangan tempat.
- Keepo sudah punya daftar bab, cari di buku, penanda, dan lanjut posisi. Celah kecil: lompat ke persen.
- Vonis: H1, H2, H4 terbukti sebagian; H3 belum jelas. Usul developer: 3 hal kecil.

## 1. Yang sudah ada di Keepo (jangan diduplikat)
- Daftar bab (`ui.js`, sheet "Daftar bab") + siapkan arti bab offline.
- "Cari di buku" (`openFind`) dan penanda halaman (maks 20, ikut sinkron akun).
- Posisi baca (bab + kalimat) tersimpan, ikut sinkron akun, kartu "Lanjut baca" di Beranda.
- Minta penyimpanan permanen (`storage.persist`) di `app.js`.

## 2. Bukti (44 kutipan, 9 halaman, 5 jenis sumber)
Jenis: forum aplikasi sejenis, pelacak bug, forum Apple/media, halaman bantuan, papan masukan.

### Readlang (forum & blog)
1. "My only wish is for an option to be able to navigate to a certain point in the book." ([forum, Jul 2024](https://forum.readlang.com/t/navigate-to-a-certain-point-in-the-book/281))
2. "It would be convenient if one could click on the percentage at the bottom of the page and move to X%" (sama)
3. Pengguna baca di Kindle offline, lalu harus tekan maju berkali-kali di Readlang untuk sampai tempat tadi. (sama, parafrase)
4. "I read long novels using Readlang and sometimes I need to search for a previous event or name within the novel." ([forum, Jul 2024](https://forum.readlang.com/t/requested-feature-search-for-words-in-library-texts/401))
5. "It would be helpful to add the feature of searching for words within my added text in the library." (sama; 6 suka)
6. "I'm struggling with navigation." ([forum, Jan 2025](https://forum.readlang.com/t/table-of-contents-and-navigation/1797))
7. "I'm afraid Readlang isn't great at this style of non-linear reading right now." (staf Readlang, sama)
8. Staf menyarankan navigasi bab dan opsi "Go to specific location…" di bawah persentase. (sama, parafrase)
9. "Another use case is reading books with footnotes at the bottom of each page." (sama)
10. "Quickly jump to any chapter with the navigation bar at the top of the reader page" ([blog Readlang, 2015](https://blog.readlang.com/2015/04/15/chapters-and-rich-formatting.html))

### LingQ (forum)
11. "Is it possible to bookmark in a lesson text with an 1h audio?" ([forum, Agu 2023](https://forum.lingq.com/t/bookmark-or-jump-in-a-very-long-lesson/72362))
12. "Bookmarking in a lesson isn't possible at the moment, we will see what we can do to improve things in the future." (staf, sama)
13. "I'm optimistic that eventually there will be visible current sentence numbers or bookmarks." (sama)
14. Pengguna lain membuat ekstensi sendiri: "I took some inspiration from your post to implement this feature." (sama)
15. "it won't save my place when I finish reading for the day." ([forum, Mei 2022](https://forum.lingq.com/t/imported-lesson-not-saving-place/36298))
16. Buku impor yang dipecah selalu terbuka lagi dari awal teks. (sama, parafrase)
17. "Are you maybe clearing your browser's cache/cookies automatically?" (staf, sama)
18. "This is actually on the app" (bukan peramban; sama)
19. "Sorry, just saw this. iOS." (sama)
20. "It can take a long time (several hours?) for the book to then be uploaded" (sama; impor EPUB)
21. "can you please message us directly from the app so that we can check your logs" (staf, sama)
22. "I opened a French text I was listening to yesterday and couldn't find my current page in the text." ([forum, Jan 2024](https://forum.lingq.com/t/bug-when-playing-a-text/200544))
23. "I try to not leave lessons unfinished for this reason anymore." (sama)
24. "Clearly a long standing bug then!" (sama)
25. "in iOS app you can tap&hold the currently played sentence in the Listening mode" (sama; akal-akalan)
26. "It does feel as if they didn't work through typical use cases when developing the app" (sama)

### Pelacak bug & papan masukan e-reader lain
27. "the Table of Contents (TOC) appears empty" saat buka EPUB. ([Komic, papan masukan](https://komic.userjot.com/board/p/epub-reader-has-empty-toc-and-lacks-quick-navigation-options))
28. "The progression bar at the bottom of the screen is not interactive." (sama)
29. Harus ketuk halaman satu-satu untuk pindah bagian; diminta bar bisa digeser/diketuk. (sama, parafrase)
30. "the viewer jumps to location a little after of needed location" ([Calibre bug 1918437](https://bugs.launchpad.net/calibre/+bug/1918437))
31. "instead of going to the beginning of a chapter it will jump to several pages after the beginning of the chapter." (sama)
32. "When looking at the start of a chapter the previous chapter is highlighted in the table of contents." (sama)
33. Penyebab menurut pengembang: bug mesin tampilan saat blok besar terbelah kolom. (sama, parafrase)
34. "I'm using the Kindle app in iOS to read Leanpub books, and it keeps losing my place in the book" ([Leanpub](https://help.leanpub.com/en/articles/4055117-i-m-using-the-kindle-app-in-ios-to-read-leanpub-books-and-it-keeps-losing-my-place-in-the-book-whenever-i-close-the-app-and-then-re-open-it-what-can-i-do))
35. Saran Leanpub: "if you tap the top right of a page, you should see a little bookmark appear." (sama)

### Sinkron posisi lintas perangkat (Zotero)
36. "Closing and re-opening the document indeed does sync the position." ([foss-, Jun 2025](https://forums.zotero.org/discussion/124744/sync-reading-position))
37. Perangkat Android menyimpan posisi lama meski sudah disegarkan (Jul 2025). (sama, parafrase)
38. Posisi macOS menimpa iPad, tapi tidak sebaliknya (Feb 2026). (sama, parafrase)
39. "Last synced position on macOS will open on iOS, but not visa-versa." (gavinmunson, Mar 2026, sama)

### Data iPhone terhapus (Apple/WebKit)
40. Safari hapus data situs "after seven days if the user does not interact with the associated website." ([The Register, 2020](https://www.theregister.com/2020/03/26/apple_relax_were_not_totally/))
41. App Layar Utama: "Their days of use will match actual use of the web application which resets the timer." (sama)
42. "We do not expect the first-party in such a web application to have its website data deleted." (sama)
43. "Lack of docs around this is pretty terrible." (cupocoffee, [forum Apple](https://developer.apple.com/forums/thread/710157))
44. "Home Screen apps don't have this limitation"; `persist` harus diminta tiap app dibuka (molnarmarton, sama).

Tak terbaca: Reddit, ulasan Play Store/App Store, studi khusus. Hasil pencarian MobileRead (Kobo) tidak dihitung: halamannya tak dibuka langsung.

## 3. Vonis hipotesis
- **H1 ingin ulang/lompat untuk cek kata: terbukti sebagian.** Butir 1-2, 4-6, 11, 22, 27-29. Alasan "cek nama/kejadian" ada di butir 4.
- **H2 posisi hilang bikin berhenti: terbukti sebagian.** Butir 15-16, 22-24, 34, 40. Frustrasi jelas; "berhenti total" belum ada kutipan tegas.
- **H3 daftar bab cukup, cari teks belum perlu: belum jelas.** Daftar bab Readlang ada, tapi tetap diminta cari & lompat persen (butir 2, 4-5).
- **H4 navigasi EPUB/PDF sering rusak: terbukti sebagian.** TOC kosong, loncat salah (butir 27, 30-32). PDF terjemahan: tak ada bukti langsung.

## 4. Usul untuk developer (maks 3)
- Setelah lompat (bab/hasil cari/penanda): tombol "Balik ke tadi". Cegah kehilangan tempat.
- Lompat ke persen: ketuk "Hal x/y", lalu geser. Permintaan butir 1-2 dan 28.
- EPUB tanpa daftar isi: buat bab otomatis dari judul, lalu uji dengan EPUB berdaftar-isi kosong.

## 5. Langkah berikutnya
- Uji iPhone nyata: biarkan app 8 hari, cek posisi baca masih ada.
- Wawancara pengguna nanti hanya penguat.
