# Riset: munculkan header saat baca tanpa salah ketuk kata (#1065)

## Intinya
- Header sulit dimunculkan: ketuk dekat kata selalu dianggap ketuk kata.
- Bukti publik: tombol kecil yang terlihat lebih aman daripada ketuk area kosong.
- Usul P0: tombol kecil tetap di pojok bawah, ditambah area ketuk tengah lebih jujur.

Melengkapi [riset-gulir-halaman-satu-tangan](riset-gulir-halaman-satu-tangan.md) (zona tepi) dan [riset-akurasi-ketuk-kata](riset-akurasi-ketuk-kata.md) (ketuk kata). Isinya tidak diulang.

## 1. Cara kerja sekarang (dari kode, tanpa diubah)
- Header `.rbar` (`style.css:472`) tersembunyi di atas layar; muncul saat kelas `chrome` aktif.
- Pemicu satu-satunya: ketuk area baca `#vp` yang bukan kata (`ui.js:1480`, toggle `chrome`).
- Ketuk di kata: buka arti (`ui.js:1477`), header tidak muncul.
- `nearWord` (`ui.js:2031`) menganggap ketukan ≤20px dari kata sebagai kata itu.
- Jadi hanya celah >20px dari semua kata yang memunculkan header: bawah teks, jeda paragraf.
- "Ketuk tepi" nyala (bawaan): 15% kiri dan kanan ganti halaman (`ui.js:1480`).
- Zona header efektif: sempit, di tengah 70% lebar, di luar jarak kata.
- Ketuk di margin `#vp`, strip judul `.rhead`, atau bilah bawah: tidak melakukan apa-apa.
- Setiap ganti halaman, header disembunyikan lagi (`ui.js:1578`, `ui.js:1985`).
- Petunjuk "Ketuk tengah = menu" hanya tampil sekali dan hilang ±12 detik (`ui.js:1380`).
- Bilah bawah `.rfoot` selalu tampak, tapi hanya isi panah halaman & progres, tanpa tombol menu.

## 2. Tabel vonis
| Hipotesis | Vonis | Dasar singkat |
|---|---|---|
| H1 Ketuk kata saat cari header membingungkan | Terbukti sebagian | Bukti 1-4, 7-8, 10, 17, 23-24 |
| H2 Tombol kecil tetap di tepi lebih jelas | Terbukti sebagian | Bukti 16, 27-28, 31, 36, 41 |
| H3 Gulir ke atas / geser dari atas cocok satu tangan | Belum jelas | Bukti 32-35, 39-40; reader Keepo berhalaman |
| H4 Header selalu tampak (ringkas) lebih aman | Belum jelas (condong benar) | Bukti 27-28, 36; belum ada studi reader |

- H1: bukti dari aplikasi analog, bukan dari Keepo. Tak ada forum LingQ/Readlang yang membahas langsung.
- H3: bukti gulir ke atas untuk halaman web yang digulir, bukan reader berhalaman.
- H4: biaya ruang layar baca belum terukur.

## 3. Daftar bukti
Jenis sumber: forum pengguna (F), panduan resmi (P), studi/artikel riset (S), pelacak bug & diskusi pengembang (B), studi kasus vendor (V).

**Ketuk tengah vs kata di aplikasi baca**
1. (F) MobileRead: di Kindle, kamus perlu tekan lama karena ketukan singkat ganti halaman atau buka menu atas. [thread](https://www.mobileread.com/forums/showthread.php?p=2892439)
2. (F) MobileRead: ketuk dekat tepi atas selalu memunculkan menu, bukan kamus. [thread](https://www.mobileread.com/forums/showthread.php?p=2890269)
3. (F) MobileRead (KOReader): ketuk dekat sudut menjalankan aksi sudut, bukan popup kamus. [thread](https://www.mobileread.com/forums/showthread.php?p=4521862)
4. (F) MobileRead: pengguna minta gaya Librera: ketuk singkat = kamus, tekan lama di tepi = menu. [thread](https://www.mobileread.com/forums/showthread.php?p=4280569)
5. (F) KOReader: zona ketuk bisa ditumpuk; zona maju selebar layar dengan zona menu di tengah. [thread](https://www.mobileread.com/forums/showthread.php?p=2537510)
6. (P) KOReader bawaan: zona menu hanya pita atas (`DTAP_ZONE_MENU` x 1/8, y 0, lebar 3/4, tinggi 1/8). Dari ringkasan pencarian, berkas asli tak dibuka. [thread](https://www.mobileread.com/forums/showthread.php?p=2507012)
7. (F) Moon+ Reader Pro 8.5: ketuk tengah munculkan menu bawah; ketuk lagi menyembunyikan. [thread](https://www.mobileread.com/forums/showthread.php?p=2279967)
8. (F) Moon+ Reader: ketuk dua kali di tengah untuk bilah pengaturan. [thread](https://www.mobileread.com/forums/showthread.php?p=3824362)
9. (F) Moon+ Reader Pro: titik ketuk maju, mundur, gulir/menu bisa diatur. [thread](https://www.mobileread.com/forums/showthread.php?p=3991458)
10. (F) Apple Community, Kindle iOS: ketuk atas tak bereaksi kecuali dekat kanan (jadi penanda halaman). [thread](https://discussions-jp-prz.apple.com/thread/251872592)
11. (F) Balasan teratas thread yang sama: ketuk di tengah layar. [thread](https://discussions-cn-prz.apple.com/thread/251872592)
12. (F) Apple Community: ketuk halaman memunculkan menu di atas area halaman. [thread](https://discussions.apple.com/thread/5634333)
13. (F) Apple Community 2021: sulit keluar dari buku atau lihat daftar isi di Kindle iOS. [thread](https://discussions-jp-prz.apple.com/thread/251514400)
14. (P) Apple Books (panduan iPhone): ketuk tengah halaman untuk tampilkan kontrol. [panduan](https://support.apple.com/en-kg/guide/iphone/read-books-iphc1af7c57/13.0)
15. (P) Apple Books di Mac: klik tengah tak berguna; gerakkan kursor ke atas jendela. [ringkasan](https://www.igeeksblog.com/tips-to-master-apple-books-on-iphone-ipad/)
16. (S) Apple Books iOS 16: kontrol dipindah ke tombol Menu baca di pojok kanan bawah. [mjtsai](https://mjtsai.com/blog/2022/10/07/apple-books-in-ios-16)
17. (F) Apple Books: ketukan terlalu lama memilih kata dan membuka definisi, bukan kontrol. [ringkasan](https://appleinsider.com/inside/ios-18/tips/inside-apple-books----the-best-app-for-book-lovers/amp)
18. (P) Libby: menu disembunyikan saat baca; ketuk tengah membuka menu atas dan bilah bawah. [Libby Help](https://help.libbyapp.com/en-us/categories/reading-books.htm)
19. (P) Libby: ketuk tengah lagi menutup bilah navigasi dan garis waktu. [Libby Help](https://help.libbyapp.com/6244.htm)
20. (P) Kobo: ketuk tengah layar membuka menu baca. [Kobo](https://help.kobo.com/hc/en-us/articles/360020494854-About-the-Kobo-eReader-Reading-Menu)
21. (P) Kobo: zona ketuk halaman maju/mundur/menu bisa diatur. [blog](https://blog.the-ebook-reader.com/2021/07/10/kobo-ereaders-software-features-list/)
22. (B) BookFusion (Android & iOS): menambah zona ketuk kustom. [blog](https://www.blog.bookfusion.com/?p=3797)

**Pembaca bahasa (analog ketuk kata)**
23. (F) Readlang forum: ketuk kata lagi bisa menimpa arti kustom; perilaku reader membingungkan. Terkait, bukan soal header. [thread](https://forum.readlang.com/t/tapping-on-a-word-overwrites-custom-definitions-translations/1200)
24. (F) Readlang forum "Current quirks in reader behavior": daftar keanehan reader. Hanya judul terbaca. [thread](https://forum.readlang.com/t/current-quirks-in-reader-behavior/4997)
25. (F) Pleco forum: pengguna ingin mematikan popup ketuk dua kali di Screen Reader. [thread](https://www.plecoforums.com/threads/disabling-double-tap-pop-up-of-word-type-defintion-in-screen-reader.7083)
26. (S) Artikel UX reader kamus: jangan jadikan gestur wajib; ajarkan terpisah dari contoh. [artikel](https://screensdesign.com/articles/mobile-reader-dictionary-lookup-ux/)

**Kontrol tersembunyi & panduan**
27. (S) NN/g (179 peserta, 6 situs): navigasi tersembunyi kurang mudah ditemukan. [NN/g](https://www.nngroup.com/articles/hamburger-menus/)
28. (S) Smart Insights merangkum NN/g: temuan menurun ±20%, lebih lambat ±15% di HP. Angka tak dicek ke sumber asli. [artikel](https://www.smartinsights.com/digital-marketing-strategy/are-hamburger-menus-hidden-navigation-good-for-ux/)
29. (P) Apple HIG Gestur: jangan bentrok dengan gestur yang membuka UI sistem. [HIG](https://developer.apple.com/design/human-interface-guidelines/gestures.md)
30. (P) Apple HIG layar sentuh: "edge protect" dipakai hemat; butuh gestur kedua. [HIG](https://developer-rno.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures)
31. (S) uxdesign.cc: kontrol terlihat sudah mudah ditemukan; gestur perlu petunjuk. [artikel](https://uxdesign.cc/discoverability-in-the-age-of-touchscreens-125fcb392e08)
32. (P) Material: perilaku gulir top app bar; arah hide/show tergantung varian. [Material](https://material.io/components/app-bars-top)
33. (B) MUI & MDUI: bilah atas sembunyi saat gulir turun, muncul saat gulir naik. [MDUI](https://www.mdui.org/en/docs/2/components/top-app-bar)
34. (V) Joseph Joseph: header muncul lagi saat gulir naik menjaga navigasi tetap terjangkau. Klaim +15,6% dari vendor. [kasus](https://www.mida.so/case-studies-joseph-joseph-scroll-up-header)
35. (B) Wikimedia T306124: bilah yang muncul hanya setelah sentak ke atas membuat kesal yang gulir pelan; ditolak. [Phabricator](https://phabricator.wikimedia.org/T306124)
36. (B) Blog React Native: tombol yang tak terlihat tak bisa diketuk; bilah sembunyi buruk untuk app navigasi. [blog](https://vp0.com/blogs/safari-bottom-tab-bar-scroll-hide-react-native)
37. (F) Mozilla Connect: permintaan bilah atas dan bawah menghilang saat gulir. [ide](https://connect.mozilla.org/t5/ideas/request-for-disappearing-top-and-bottom-bars-on-scroll-in/idi-p/39358)

**Jangkauan satu tangan & ukuran tombol**
38. (S) Hoober 2013: 49% memegang satu tangan, 36% menyangga lalu menunjuk. [UXmatters](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
39. (S) Uji waktu ketuk: ±50% lebih lama mencapai tepi atas/bawah dibanding tengah. Sampel kecil. [Medium](https://medium.com/@mibosc/mobile-ui-ergonomics-how-hard-is-it-really-to-tap-different-areas-of-your-phone-interface-bb043d409af8)
40. (S) Springer: area bawah paling pojok dan kiri atas jarang masuk zona jempol alami. Sampel kecil. [Springer](https://rd.springer.com/chapter/10.1007/978-3-319-96071-5_50)
41. (P) WCAG 2.5.8: target minimal 24x24 px (AA); 44x44 px (AAA, 2.5.5). [W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
42. (F) Logos forum "Reading View: Improve show/hide toolbars": usul perbaiki munculkan/sembunyi bilah. Hanya judul; halaman 403. [thread](https://community.logos.com/discussion/comment/1330439)
43. (F) Logos forum "disappearing toolbar?": keluhan bilah hilang. Hanya judul. [thread](https://community.logos.com/discussion/comment/485556)

## 4. Kesimpulan
- Ketuk tengah umum dipakai (Apple Books, Libby, Kobo, Moon+), tapi di tempat tanpa kata ditutupi tap-kamus. Keepo punya dua beban sekaligus.
- Di Keepo, ruang "kosong" hampir tak ada: kata mengisi halaman dan `nearWord` melebarkan zona kata.
- Apple Books sendiri menambah tombol tetap (Menu baca) sejak iOS 16.

## 5. USUL P0 untuk developer (belum jadi tugas)
1. **Tombol "Menu" kecil tetap** di bilah bawah `.rfoot` (dekat jempol). Satu ketuk memunculkan `.rbar`; label teks, target ≥44px. Elemen: `.rfoot`, toggle `chrome` (`ui.js:1381`).
2. **Ketuk di luar teks juga memunculkan header**: pasang pemicu pada margin `#vp` dan strip `.rhead` (sekarang mati). Tetap tidak menjadi ketuk kata.
3. **Header tidak langsung hilang saat ganti halaman** bila sengaja dimunculkan lewat tombol Menu; hilang lagi setelah ±4 detik tanpa sentuhan. Elemen: `ui.js:1578`, `ui.js:1985`.

Uji dulu di HP: tombol Menu tidak bentrok dengan panah halaman, dan layar 320px tidak sesak.

## 6. Yang tak bisa dibuka / catatan
- Reddit, ulasan Play Store & App Store tak terbaca.
- Forum LingQ: tak ada thread tentang masalah ini ditemukan.
- Halaman Logos (403) hanya judul dari hasil pencarian; butir 42-43 lemah.
- Butir 6 dan 15 dari ringkasan pencarian, bukan dari berkas asli.
- Belum ada uji langsung di Keepo. Disarankan tester AI mengukur berapa ketukan sampai header muncul.

Mockup usul: [mockup-1065.html](mockup-1065.html).
