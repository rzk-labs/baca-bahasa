# Riset #818: Sisa waktu baca yang masuk akal (validasi bukti internet)

## Intinya
- "±554 mnt" mungkin hitungan benar, tapi salah tempat: sisa SELURUH buku di bar per halaman.
- Pembaca Kindle/Kobo juga mengeluh. Sisa waktu buku utuh paling tidak disukai (6%).
- Usul: tampilkan sisa BAB dari kecepatan pribadi, buku utuh hanya di detail, ada batas.

## 1. Kenapa Keepo kelihatan ngawur
Kode dibaca (tidak diubah): `minsLeft` & `unitsOf` di `ui.js`.
- Hitungan: kata ÷ 150 per menit (Latin), huruf ÷ 250 (Jepang/Korea/Mandarin). Angka tetap.
- Bar menulis sisa seluruh buku, padahal "Hal 7/20" adalah halaman bab.
- 554 mnt × 150 ≈ 83 ribu kata. Itu panjang buku nyata, bukan salah hitung.
- Pengguna membaca dua angka beda skala sebagai satu: "bab ±3 mnt" vs "±554 mnt".
- Pengaman #784 hanya jalan di 3 halaman terakhir bab. Selebihnya angka jam-jaman tetap tampil.
- Kecepatan tidak belajar dari pembaca. Semua orang dianggap 150 kata/mnt.
- Angka 250 huruf/mnt untuk pembelajar Jepang terlalu cepat (lihat bukti 47-49).
- Beda dari riset lain: `riset-gulir-halaman-satu-tangan.md` (cara pindah halaman), `riset-kebiasaan-balik-baca.md` (alasan balik). Keduanya tidak membahas sisa waktu.

## 2. Bukti (49 kutipan/data, 4 jenis sumber)
Tanda: "kutip" = kalimat asli dari halaman yang dibuka. "ringkas" = isi dari ringkasan hasil pencarian, bukan kalimat asli.

### A. Forum e-reader (MobileRead, Reddit)
1. peartree: "It used to be scarily accurate, but now it'll suddenly underestimate the amount of time left" — [MobileRead](https://www.mobileread.com/forums/showthread.php?p=2948943)
2. jbcohen: "they are totally inacurate about the time left in a chapter or a book." — [sama](https://www.mobileread.com/forums/showthread.php?p=2948943)
3. pidgeon92: "I find the time remaining to be reasonably accurate on most books." (suara tidak setuju) — [sama](https://www.mobileread.com/forums/showthread.php?p=2948943)
4. gdornick: "estimated reading time is about 50% lower then real reading time." — [sama](https://www.mobileread.com/forums/showthread.php?p=2948943)
5. Atunah: "its been stuck on 12 minutes left in book. All the way through." — [sama](https://www.mobileread.com/forums/showthread.php?p=2948943)
6. Pengguna (ringkas): awalnya "horribly inaccurate", lalu membaik makin banyak dibaca — [sama](https://www.mobileread.com/forums/showthread.php?p=2948943)
7. DNSB: "time left either in book or chapter is just too inaccurate." — [MobileRead "Pages left in chapter"](https://www.mobileread.com/forums/showthread.php?p=4511014)
8. DNSB: "you have read 62% of the book in 48 minutes and have 4 hours left are pretty risible." — [sama](https://www.mobileread.com/forums/showthread.php?p=4511014)
9. DNSB: "there seems to be no adaptive capability in the reading speed used." — [sama](https://www.mobileread.com/forums/showthread.php?p=4511014)
10. DNSB: "the reading times on any ereader or ereader app I've used are horribly inaccurate at best." — [MobileRead Kobo Clara](https://www.mobileread.com/forums/showthread.php?p=4261656)
11. DNSB: "take the timings as being estimates based on some developer's idea of an average reading speed" — [sama](https://www.mobileread.com/forums/showthread.php?p=4261656)
12. Aleron Ives: "the time estimates are even less useful than I thought they were." — [sama](https://www.mobileread.com/forums/showthread.php?p=4261656)
13. ro.nin: "reset and calibrate reading speed for pretty accurate time estimates" (Kindle lama) — [sama](https://www.mobileread.com/forums/showthread.php?p=4261656)
14. rashkae: "for me, kobo reading time used to be very accurate, but it broke about 3 updates ago" — [sama](https://www.mobileread.com/forums/showthread.php?p=4261656)
15. Pengguna Kobo (ringkas): estimasi awal "way too high", sesudah satu-dua bab jadi "too low" — [MobileRead](https://www.mobileread.com/forums/showthread.php?p=4261660)
16. Pengguna Kobo (ringkas): waktu sisa buku ikut menghitung indeks, catatan, daftar pustaka — "not terribly useful" — [MobileRead](https://www.mobileread.com/forums/showthread.php?p=4261660)
17. Pengguna (ringkas): jumlah halaman per bab itu hitungan pasti; jumlah per buku itu perkiraan — [MobileRead](https://www.mobileread.com/forums/showthread.php?p=4101259)
18. r/kindle (ringkas): satu orang lebih larut membaca saat indikator mati — [Reddit](https://www.reddit.com/r/kindle/comments/1jf75wu/do_you_hide_page_numberprogress)
19. r/kindle (ringkas): orang lain tetap mau tahu progres buku & bab — [sama](https://www.reddit.com/r/kindle/comments/1jf75wu/do_you_hide_page_numberprogress)
20. r/kindle (ringkas): pindah ke "time left in chapter" saat bab panjang atau sudah larut — [sama](https://www.reddit.com/r/kindle/comments/1jf75wu/do_you_hide_page_numberprogress)

### B. Ulasan app, blog, dukungan pembuat app
21. Marcia Biederman: Amazon tampak menganggap pembaca membaca "around 250 words per minute." — [Goodreads blog 2020](https://www.goodreads.com/author_blog_posts/19325480-kindle-s-down-to-earth-estimates-of-reading-speed)
22. Biederman: "Amazon estimates it will take you 7 hours and 35 minutes" (Where the Crawdads Sing) — [sama](https://www.goodreads.com/author_blog_posts/19325480-kindle-s-down-to-earth-estimates-of-reading-speed)
23. Biederman: buku lain "works out to 192 wpm." — [sama](https://www.goodreads.com/author_blog_posts/19325480-kindle-s-down-to-earth-estimates-of-reading-speed)
24. Amazon (ringkas): estimasi memakai jenis buku, kata per halaman, dan sesi baca sebelumnya — [sama](https://www.goodreads.com/author_blog_posts/19325480-kindle-s-down-to-earth-estimates-of-reading-speed)
25. MakeUseOf (ringkas): Kindle bisa direset; tampil "Learning reading speed" lalu estimasi baru setelah beberapa menit — [MakeUseOf](https://www.makeuseof.com/how-to-reset-kindle-reading-time/)
26. eBook Reader blog: pembaca Laura: "there is definitely a delay in the cycling through the time left options" — [blog](https://blog.the-ebook-reader.com/2024/08/09/last-kindle-update-changed-reading-progress-indicator-and-some-hate-it/)
27. Komentar "e": "I wish there was a way to disable them completely" — [sama](https://blog.the-ebook-reader.com/2024/08/09/last-kindle-update-changed-reading-progress-indicator-and-some-hate-it/)
28. Permintaan fitur BookFusion: "Implement a feature which learns the speed at which a user reads then report how long a book is likely to take" — [BookFusion](https://bookfusion.featureos.app/p/learn-reading-speed-and-estimate-how-long-left-in-book)
29. Bug Firefox/Pocket: estimasi "often on the low side"; daftar 38 film tertulis "1 min", Reader Mode 24-30 mnt — [Mozilla Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1761463)
30. Bug Firefox/Pocket: artikel National Geographic "3 minutes" vs Reader Mode 10-12 mnt — [sama](https://bugzilla.mozilla.org/show_bug.cgi?id=1761463)
31. BGR (ringkas): tidak tahu posisi bisa menurunkan semangat, buku terasa tanpa ujung — [BGR](https://bgr.com/2166895/tips-reading-more-kindle/)
32. Apple Books (ringkas): pengguna mengandalkan "halaman tersisa di bab"; keluhan muncul saat fitur disembunyikan di iOS 16 — [Apple Discussions](https://discussions-jp-prz.apple.com/thread/254566262)
33. Apple Books (ringkas): tidak ada fitur waktu sisa; yang ada hanya halaman tersisa di bab — [Apple Discussions](https://discussions-jp-prz.apple.com/thread/256054841)
34. AppleVis (ringkas): pengguna VoiceOver memuji Audible yang menyebut sisa waktu per bab — [AppleVis](https://www.applevis.com/comment/124282)
35. Moon+ Reader (ringkas): pengguna minta "pages left in chapter" dan waktu per halaman bisa diatur manual — [MobileRead](https://www.mobileread.com/forums/showthread.php?p=4044855)

### C. Survei
36. Good e-Reader, 829 suara: nomor halaman asli 35,95% — [survei](https://goodereader.com/blog/?p=98851)
37. Sama: total persen terbaca 33,05%
38. Sama: bar progres 10,98%
39. Sama: menit tersisa di bab 10,62%
40. Sama: waktu tersisa di buku **6,15%** (terendah)

### D. Studi & data kecepatan baca
41. Brysbaert 2019 (190 studi): rata-rata baca diam "just 238 wpm" — [BPS Research Digest](https://www.bps.org.uk/research-digest/most-comprehensive-review-date-finds-average-persons-reading-speed-slower)
42. Sama: target 300 wpm "is unrealistic for the majority of people"
43. Sama: bahasa Spanyol 278 wpm, Inggris 236 wpm. Kecepatan beda antar bahasa.
44. Chung & Nation 2006 (ringkas): pembelajar naik dari 141 ke 214 wpm setelah latihan — [ERIC](https://files.eric.ed.gov/fulltext/EJ974104.pdf)
45. Nation 2009 (ringkas): 250 wpm cukup hanya untuk teks tanpa kata/tata bahasa asing — [ERIC](https://files.eric.ed.gov/fulltext/EJ1176224.pdf)
46. Segalowitz 1991 & Fraser 2007 (ringkas): pembaca bahasa kedua lebih lambat dari bahasa ibu — [ERIC](https://files.eric.ed.gov/fulltext/EJ1176224.pdf)
47. Studi bahasa kedua (ringkas): kata per menit menyesatkan untuk Jepang; ukur per huruf — [Reading in a Foreign Language](https://nflrc.hawaii.edu/rfl/item-detail/425)
48. Forum Natively (ringkas): ±10 ribu huruf/jam (~165 huruf/mnt) dianggap bagus untuk pembelajar Jepang — [Natively](https://forums.learnnatively.com/t/improving-reading-speed-with-books/4026)
49. Sama (ringkas): ada yang hanya 18 ribu huruf/jam di puncak, ±30 halaman/jam dengan cari arti; siswa SMA Jepang 600-800 huruf/mnt

Catatan jujur: banyak kutipan "ringkas" belum dibuka langsung. Reddit & Moon+ Reader tipis. Angka pembelajar 100-150 wpm hanya dari blog, belum terbukti.

## 3. Vonis hipotesis (validasi bukti internet)
- **H1 Sisa waktu buku utuh menakutkan, sisa bab lebih berguna: TERBUKTI (sebagian).**
  - Waktu buku utuh paling sedikit dipilih (6%) dan dianggap tak berguna (#16, #8).
  - Sisa bab dipakai saat bab panjang/larut (#20). Halaman tersisa di bab dicari (#32).
  - Belum jelas: "menakutkan" belum ada studinya, hanya BGR yang berlawanan (#31).
- **H2 Estimasi dari kecepatan pribadi, bukan angka tetap: TERBUKTI.**
  - Keluhan terbesar: tidak adaptif (#9, #11). Orang cepat/lambat meleset jauh (#4, #23).
  - Pembuat app lain meminta fitur belajar kecepatan (#28).
- **H3 Tampil setelah cukup data dan dibatasi wajar: TERBUKTI.**
  - Awal buku paling meleset (#6, #15). Kindle punya mode "Learning reading speed" (#25).
  - Angka "3+ halaman" belum ada rujukan publik. Itu usul kita, uji sendiri.
- **H4 Buku asing butuh kecepatan lebih lambat: TERBUKTI arahnya, angkanya BELUM JELAS.**
  - Bahasa kedua lebih lambat (#46). Jepang pakai huruf, bukan kata (#47).
  - Angka Jepang pemula: ~165 huruf/mnt (#48), jauh di bawah 250 milik Keepo.
  - Angka Latin pemula 100-150 wpm: belum terbukti. 150 sekarang masuk akal sebagai batas atas.

## 4. Rekomendasi untuk developer
### Tampilan (teks)
- Bar baca: **"Bab ini ±N mnt"**. Selalu sisa bab, bukan buku. Satu skala dengan "Hal x/y".
- Sisa kurang dari 1 mnt: **"Sebentar lagi"**. Jangan "<1 mnt".
- Sisa buku hanya di Beranda/detail buku: **"Buku ±N jam"** atau **"±N mnt"** bila di bawah 90 mnt.
- Hapus tanda "≥" dan "bab lain belum dihitung" dari bar. Rumit, sumber bingung.

### Rumus
- Sisa bab = kata sisa di bab ÷ kecepatan. Kata sisa dari posisi halaman sekarang.
- Kecepatan awal (pembelajar): Latin **130 kata/mnt**, Jepang/Korea/Mandarin **160 huruf/mnt**. Bisa disetel di Pengaturan.
- Kecepatan pribadi: median 10 halaman terakhir = kata di halaman ÷ detik di halaman.
- Buang halaman <4 detik (loncat) dan >180 detik (jeda/tidur). Jangan pakai untuk rata-rata.
- Campur: 3-9 halaman sah → 50% pribadi + 50% awal. 10+ halaman → 100% pribadi.
- Kunci kecepatan pribadi di 0,5×–2× kecepatan awal. Simpan per bahasa buku, bukan per buku.

### Batas atas & kapan disembunyikan
- Sisa bab di atas 90 mnt: tulis "Bab ini ±1,5 jam", bulatkan 5 mnt.
- Sisa buku di atas 20 jam: tulis "20+ jam".
- Sembunyikan angka sisa buku sebelum ada 3 halaman sah. Sisa bab tetap tampil dari kecepatan awal.
- Sembunyikan semua bila total kata bab belum terhitung. Tampilkan hanya "Hal x/y".
- Kalau pengguna lompat jauh, kosongkan data kecepatan 1 halaman. Lompat bukan membaca.

### 3 kasus uji
1. **Hal 7/20, bab ±3 mnt, buku 83 ribu kata.**
   - Harus tampil: "Bab ini ±3 mnt". Tidak boleh ada "554 mnt" di bar.
   - Beranda boleh: "Buku ±10 jam" (83.000 ÷ 130 ≈ 640 mnt).
2. **52 halaman, belum ada data, kecepatan awal.**
   - Bar: "Bab ini ±N mnt" dari 130 kata/mnt. Tak ada "±579 mnt".
   - Sisa buku di atas 20 jam harus tampil "20+ jam", bukan angka mentah.
3. **Buku baru, 0-2 halaman terbaca.**
   - Bar: sisa bab dari kecepatan awal. Sisa buku: disembunyikan.
   - Halaman ke-3 sah dibaca (10 detik/halaman, 180 kata): campur 50/50, sisa buku mulai tampil.
   - Tambahan: baca 1 halaman lalu tutup 10 menit. Halaman itu dibuang (>180 detik).

## 5. Langkah berikutnya
- Developer: kerjakan baris backlog no. 77 (P0).
- Uji setelah rilis: tanya tester AI apakah "Bab ini ±N mnt" masuk akal.
- Cari data nyata: simpan kecepatan baca anonim di perangkat, lihat sebaran sebelum mengubah angka awal.
