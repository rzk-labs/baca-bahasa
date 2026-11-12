# Riset: akurasi ketuk kata & pilih frasa di HP (#637)

Tanggal: 12 Nov 2026. Metode: bukti publik (validasi bukti internet), sesuai `aturan_validasi` di roadmap.

## Intinya
- Ketuk kata meleset itu nyata, terutama di bahasa tanpa spasi dan di garis baris.
- Tahan-seret untuk frasa bentrok dengan menu salin iPhone; tombol "tambah kata" lebih aman.
- Keepo sudah punya tombol itu. Kekurangan: petunjuk, tanda baca, dan sorotan jelas.

## 1. Cara riset
- 47 butir dari 5 jenis sumber: forum aplikasi, pelacak bug WebKit, panduan resmi, studi, blog.
- Tak terbaca: ulasan Play Store/App Store, Reddit, Threads/X. Suara Indonesia: kosong.
- Panduan Apple HIG tak terbuka langsung; angka 44 pt hanya lewat ringkasan sekunder.
- Tak ada studi khusus "ketuk kata di teks bacaan". Studi sentuh adalah tombol, bukan teks.

## 2. Bukti A: forum aplikasi baca bahasa (28 butir)
LingQ, frasa di iPhone/iPad:
1. jungleboy: "Even though I am only tapping on the words I want it always adds more words on either side to the LingQ." [forum](https://forum.lingq.com/t/lingqing-a-phrase-over-multiple-lines-on-iphone-app-no-longer-works/38165)
2. valddu (iPad): "Trying to select text from one line to the next leads to totally unpredictable behaviors." [forum](https://forum.lingq.com/t/lingqing-a-phrase-over-multiple-lines-on-iphone-app-no-longer-works/38165)
3. miriaml5: "This happens to me too, on iPhone." [forum](https://forum.lingq.com/t/lingqing-a-phrase-over-multiple-lines-on-iphone-app-no-longer-works/38165)
4. robertbiggar: "there is no space between words that fall on a line break." [forum](https://forum.lingq.com/t/lingqing-a-phrase-over-multiple-lines-on-iphone-app-no-longer-works/38165)
5. jungleboy (8 Nov 2022): "It seems to be fixed in the latest app update." Jadi: bisa diperbaiki, tapi pernah rusak. [forum](https://forum.lingq.com/t/lingqing-a-phrase-over-multiple-lines-on-iphone-app-no-longer-works/38165)
6. kusterdu (iPad, iOS 11): "If I hold down on the screen, it will will lingq a word". [forum](https://forum.lingq.com/t/trouble-lingqing-phrases-on-ipad/25963)
7. kusterdu: "the cursor for lingqing a whole phrase will not appears". [forum](https://forum.lingq.com/t/trouble-lingqing-phrases-on-ipad/25963)
8. arsenius (staf LingQ): "We've got a fix for selection issues on iOS 11". Tiap versi iOS bisa merusak. [forum](https://forum.lingq.com/t/trouble-lingqing-phrases-on-ipad/25963)

Pemotongan kata Jepang/Mandarin:
9. JenneferJ: "the words are being broken up incorrectly in the color coding". [forum](https://forum.lingq.com/t/japanese-words-are-broken-up-incorrectly/13454)
10. erin09: perlu "manually adjust word boundaries" untuk Mandarin, Jepang, Korea. [forum](https://forum.lingq.com/t/japanese-words-are-broken-up-incorrectly/13454)
11. Jens: "I have the same problem in Chinese/Japanese". [forum](https://forum.lingq.com/t/japanese-words-are-broken-up-incorrectly/13454)
12. Jens usul tombol panah ala Pleco untuk kecilkan/besarkan batas kata; staf bilang suka. [forum](https://forum.lingq.com/t/japanese-words-are-broken-up-incorrectly/13454)
13. dooo: koreksi pengguna bisa melatih pemotong; staf: itu tujuannya, belum dibangun. [forum](https://forum.lingq.com/t/japanese-words-are-broken-up-incorrectly/13454)
14. Staf LingQ: "you can highlight (manually) the whole thing, and it will form a lingq." [forum](https://forum.lingq.com/t/japanese-words-are-broken-up-incorrectly/13454)
15. BassmasterJJ: "Many times, especially involving proper nouns, compound words are created improperly". [forum](https://forum.lingq.com/t/is-it-possible-to-correct-improperly-parsed-words/375995)
16. bamboozled: edit kalimat dan "remove or add spaces between the characters". [forum](https://forum.lingq.com/t/is-it-possible-to-correct-improperly-parsed-words/375995)
17. Jidoujisho (pembaca subtitle Jepang): pemotong Ve "vastly improving word select accuracy". [rilis](https://github.com/lrorpilla/jidoujisho/releases/tag/0.9.3-beta)

Pleco (Mandarin):
18. Pierre Biannic: ketuk satu kata dapat definisi; tahan-ketuk dipakai untuk satu huruf. [forum](https://plecoforums.com/threads/single-character-pop-up-definition.9916/latest)
19. mikelove (staf Pleco): "If it selects the whole word you can tap on the |<- arrow to shrink the selection." [forum](https://plecoforums.com/threads/single-character-pop-up-definition.9916/latest)
20. mikelove: tombol "->" memindah pilihan ke huruf berikutnya. [forum](https://plecoforums.com/threads/single-character-pop-up-definition.9916/latest)

Readlang (frasa):
21. colin-richman: frasa yang melewati batas halaman "doesn't seem to work". [forum](https://forum.readlang.com/t/selecting-phrases/2245)
22. colin-richman: kata yang sudah dipilih tak bisa jadi bagian frasa tanpa batal dulu. [forum](https://forum.readlang.com/t/selecting-phrases/2245)
23. steve (staf): solusi putar HP atau kecilkan huruf; ia akui "a bit clunky". [forum](https://forum.readlang.com/t/selecting-phrases/2245)
24. psy-q (Feb 2026): "it's impossible to select multiple words at the end of one page and a few at the start of the next page." [forum](https://forum.readlang.com/t/in-mobile-view-allow-multi-word-selections-that-span-multiple-pages/4923)
25. steve (Mar 2026): "selecting phrases across page breaks isn't currently supported." [forum](https://forum.readlang.com/t/in-mobile-view-allow-multi-word-selections-that-span-multiple-pages/4923)
26. flauschtrud: pilih sebagian frasa, lalu sunting dan salin sisanya manual. [forum](https://forum.readlang.com/t/in-mobile-view-allow-multi-word-selections-that-span-multiple-pages/4923)

Menu salin bawaan & app lain:
27. Gary_D (Language Reactor, iPhone): "iOS simply brings up the text selection/Copy menu" alih-alih mengenali gestur. [forum](https://forum.languagelearningwithnetflix.com/t/langreactor-app-on-an-iphone/41178)
28. restu80956612 (Acrobat iOS): saat tahan untuk pilih kata, huruf terakhir tak ikut di ±95% kasus. [forum](https://community.adobe.com/t5/acrobat-reader-mobile-discussions/when-selecting-a-word-last-letter-isn-t-selected/m-p/10265338)

## 3. Bukti B: pelacak bug & forum Apple (6 butir)
29. wudiandy, Apple Developer Forums (Nov 2025): `-webkit-touch-callout: none` "doesn't really work" di iOS 26.1; menu tetap muncul; 0 balasan. [forum](https://developer.apple.com/forums/thread/808606)
30. timocov, WebKit 231161: "Long press anywhere at the page => Even the page is marked as non-selectable Safari still shows a callout." [bug](https://bugs.webkit.org/show_bug.cgi?id=231161)
31. Wenson Hsieh (WebKit): `-webkit-touch-callout` mengatur menu, tapi tak mencegah kaca pembesar (loupe). [bug](https://bugs.webkit.org/show_bug.cgi?id=231161)
32. Wenson Hsieh: loupe baru sejak iOS 15; akan dicoba ditekan lewat `user-select: none`. [bug](https://bugs.webkit.org/show_bug.cgi?id=231161)
33. Joseph Pearson: loupe iOS 15 disertai hentakan getar. [bug](https://bugs.webkit.org/show_bug.cgi?id=231161)
34. Komentar 2025: "disabling the loupe with `-webkit-user-select` no longer works." [bug](https://bugs.webkit.org/show_bug.cgi?id=231161)
35. Glenn Maynard, WebKit 251572 (iOS 16): ketuk ganda selalu tampilkan loupe; `touch-callout: none` tak mencegahnya. [bug](https://bugs.webkit.org/show_bug.cgi?id=251572)

## 4. Bukti C: panduan resmi & dokumentasi (8 butir)
36. Apple (via ringkasan sekunder): target minimal 44×44 pt. [ringkasan](https://uxdesign.cc/little-details-in-ux-design-part-5-dimensions-and-sizes-in-interfaces-36df860170e2)
37. Material/Google: "at least 48x48dp, separated by 8dp of space or more." [Google](https://support.google.com/accessibility/android/answer/7101858)
38. Google: 48dp = "about 9mm, regardless of screen size". [Google](https://support.google.com/accessibility/android/answer/7101858)
39. W3C WCAG 2.5.8: target minimal 24×24 CSS px, atau ada jarak lingkaran 24 px. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
40. W3C: kriteria "does not apply to inline targets in sentences". Kata di teks dikecualikan, jadi aturan ini tak melindungi. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
41. W3C: pengguna sulit "accurately activate small targets when there are other targets that are too close." [W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
42. MDN: `-webkit-touch-callout` "Non-standard"; tidak disarankan untuk produksi. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/-webkit-touch-callout)
43. NN/g: minimal 1 cm × 1 cm; "the blame should lie on the tiny targets." [NN/g](https://www.nngroup.com/articles/touch-target-size/)

## 5. Bukti D: studi & panduan desain (4 butir)
44. Parhi dkk. 2006 (jempol satu tangan): 9,2 mm (tugas tunggal) dan 9,6 mm (berurutan) cukup besar. [Microsoft Research](https://www.microsoft.com/en-us/research/?p=155150)
45. Cockburn dkk.: galat ±13-14% untuk target terkecil (5 mm). Layar besar, bukan HP (via ringkasan). [Google Research](https://research.google.com/pubs/archive/41644.pdf)
46. Replikasi Sergeeva: di atas 7,7 mm galat hampir tak turun, rata-rata di bawah 3,33% (via ringkasan). [replikasi](https://issuu.com/denytodorova5/docs/target_size_study-anna_sergeeva-den)
47. Panduan desain pembaca kamus: tahan tak boleh jadi satu-satunya jalan; uji pilihan dengan tanda baca dan frasa lintas baris. [blog](https://screensdesign.com/articles/mobile-reader-dictionary-lookup-ux/)

## 6. Cocokkan dengan kode Keepo (hanya dibaca)
- Kata dipotong `Intl.Segmenter` (app.js:153); hanya potongan "mirip kata" jadi `.w`.
- Ketuk `.w` → popup kata (ui.js:941). Tanda baca bukan `.w`: ketuk di situ buka/tutup bar atau balik halaman.
- Tahan 450 ms di kalimat → arti kalimat, bukan frasa (ui.js:922). Menu salin ditahan via `contextmenu`.
- Frasa: tombol "Tambah kata sebelumnya/berikutnya" di popup, maks 5 kata (ui.js:1262, 1252).
- CSS: `-webkit-touch-callout:none` ada di `.cols` (style.css:370); `user-select` tak diatur untuk teks.
- Sorotan `.w.sel` ada (style.css:392). Tinggi target = tinggi baris teks, tak ada padding ketuk.

## 7. Vonis hipotesis
- **H1 Kata kecil, tanda baca, berdempetan sering salah ketuk: terbukti sebagian.** Bukti kuat untuk target kecil/rapat (37-43, 28, 47) dan garis baris (1-4). Tak ada ukur langsung untuk teks bacaan; W3C malah mengecualikan teks (40).
- **H2 Tahan-seret bentrok dengan menu salin iOS/Android: terbukti.** iOS tampilkan menu/loupe walau CSS dimatikan (27, 29-35); LingQ & Readlang tak pernah mulus (6-7, 21-26). Android: hanya 1 butir lemah (ferdnyc, Etymonline, huruf membesar saat tahan).
- **H3 Jepang/Mandarin tanpa spasi paling sering meleset: terbukti sebagian.** Banyak keluhan (9-16), pemotong lebih baik memperbaiki (17). Tak ada angka perbandingan dengan bahasa berspasi.
- **H4 Ketuk ganda/tahan butuh petunjuk atau cara alternatif: terbukti.** Tahan tak boleh satu-satunya jalan (47); Pleco & LingQ pakai tombol panah (12, 19-20); tahan sering gagal di iOS (6-7, 27).
- **H5 Sorotan kata terpilih mengurangi salah ketuk: belum jelas.** Tak ada studi langsung. Logis: sorotan memperlihatkan salah pilih seketika (2, 28), tapi tak mencegahnya.

## 8. Kesimpulan
- Jangan andalkan tahan-seret untuk frasa. Tombol sebelah (yang sudah ada) adalah jalur andal.
- Salah ketuk paling mahal di Jepang/Mandarin; butuh cara geser batas kata.
- Menunggu CSS mematikan menu iOS itu rapuh (29, 34, 35). Beri jalan yang tak bergantung itu.

## 9. Usul tugas developer (P0, maks 3)
1. **Perbesar area ketuk kata** tanpa ubah tampilan (padding tak terlihat/`::after`); tanda baca di sebelah kata ikut ke kata terdekat, bukan buka/tutup bar.
2. **Petunjuk sekali saja** di popup pertama: "Mau lebih dari satu kata? Ketuk ‹ ›." Plus tahan = kalimat; ingat sudah dilihat.
3. **Batas kata Jepang/Mandarin bisa digeser:** ‹ › yang ada untuk ja/zh juga bisa kecilkan pilihan per karakter (ala Pleco). Uji di iPhone Safari.

## 10. Catatan sumber tak terbaca
- Apple HIG (developer.apple.com): tak terbuka; 44 pt dari ringkasan sekunder.
- Makalah Parhi (PDF): terkompresi; angka dari ringkasan pencarian Microsoft Research.
- Cockburn & Sergeeva: hanya lewat ringkasan; bukan uji teks bacaan.
- Reddit, ulasan Play Store/App Store, Threads/X, Kindle: tak ada kutipan valid. Bug Chromium/Android: tak ketemu yang relevan.
- Suara pengguna Indonesia: kosong.
