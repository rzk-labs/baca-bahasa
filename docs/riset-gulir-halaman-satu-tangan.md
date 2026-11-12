# Riset #538: Gulir vs halaman, ketuk tepi & satu tangan di HP

(validasi bukti internet) Tanda: 🔗 = halaman dibuka langsung; 🔎 = dari ringkasan hasil pencarian (halaman belum dibuka penuh). Reddit tak terbuka.
Tidak mengulang: `riset-tipografi-baca-hp.md` (ukuran huruf, area ketuk kata) dan `riset-kebiasaan-balik-baca.md` (streak & pengingat).

## Intinya
- Zona ketuk tepi bentrok dengan ketuk kata: terbukti. LingQ sampai menyarankan mematikannya.
- Gulir vs halaman: tak ada pemenang. Studi condong halaman di HP; pembelajar minta pilihan.
- Usul P0: zona tepi lebih sempit + saklar, tombol maju besar di bawah, indikator progres bisa disembunyikan.

## 1. Kondisi Keepo sekarang (ui.js)
- Halaman terbagi kolom; gulir terus tidak ada.
- Geser mendatar >45px = ganti halaman. Tekan 450ms = arti kalimat.
- Ketuk bukan di kata: 25% kiri = mundur, 25% kanan = maju, tengah = menu.
- Ada tombol panah di bawah + teks "Hal x dari n · Sisa …". Belum bisa disembunyikan.
- Posisi baca disimpan per kalimat (`b.si`), jadi cukup dijaga saat ganti huruf.

## 2. Bukti (kutipan)

### A. Forum LingQ & Readlang (pembelajar bahasa)
1. 🔎 Panduan pengaturan LingQ: matikan "Tap to Page" agar tidak salah balik halaman saat menekan kata. ([lingtuitive](https://lingtuitive.com/blog/ultimate-lingq-settings))
2. 🔎 Panduan sama: "Paging moves to known" menandai semua kata "known" bila halaman terbalik tak sengaja. Salah ketuk berbiaya mahal.
3. 🔎 Balasan forum LingQ: mematikan salah satu dari "Tap to page" / "Paging moves to known" membantu. ([forum LingQ](https://forum.lingq.com/t/new-words-automatically-moved-to-known/39769))
4. 🔗 ColinJohnstonov (LingQ, 2022): "there appears to not be any way to change page in a lesson other than swiping". ([forum LingQ](https://forum.lingq.com/t/iosandroid-app-changing-page/36714))
5. 🔗 Sama: "swiping many times with my finger to be painful".
6. 🔗 Sama: minta "the ability to use the volume buttons on the device to turn pages".
7. 🔗 Sama: minta "invisible page-forward and page-backward buttons in the left and right margins".
8. 🔗 Sama: "the main one being page switching which is really annoying when it can only be done by swiping".
9. 🔗 Sama: animasi geser halaman bisa dihapus "for better performance and to reduce ghosting".
10. 🔗 shameem-pullaratt (Readlang): "the current system of reading in separate pages can feel a bit disruptive". ([forum Readlang](https://forum.readlang.com/t/feature-request-option-for-continuous-scrolling/686))
11. 🔗 Sama: "catering to those of us who prefer scrolling instead of clicking through pages".
12. 🔗 tommi-asikainen (Readlang): "When I turn to the next page, I have to wait for Speechify to load again, which breaks the reading flow."
13. 🔗 Sama: "Having an option fort continuous scrolling would solve that issue."
14. 🔗 simon (Readlang): "a continuous scrolling option would be a great feature addition."
15. 🔗 mithradates (Readlang, 2024): "when my cat is on my lap and occupying one of my hands but still want to read my current book". ([forum Readlang](https://forum.readlang.com/t/lazy-sleepy-hands-occupied-mode/1550))
16. 🔗 Sama: "streching my hand to select a passage is not always easy".
17. 🔗 Sama: "Would be nice if you could just hit the right side of the whole screen to move to the next 12 words."

### B. Blog, forum e-reader, pengembang aplikasi baca
18. 🔗 Marco Arment: Instapaper mematikan halaman sementara "as soon as a text selection is started", agar seleksi bebas. ([marco.org](https://marco.org/2010/05/12/pagination-and-text-selection))
19. 🔗 Sama: paginasi Instapaper "can be toggled off and switched to scrolling at any time", tak seperti iBooks/Kindle.
20. 🔗 Sama: seleksi lintas halaman mengorbankan kolom ganda, nomor halaman konsisten, dan animasi rumit. Ada harganya.
21. 🔗 Pembaca (ignorethecode): paginasi "gets out of the way" tanpa "needless interference with the actual text being read". ([ignorethecode](https://ignorethecode.net/blog/2012/11/01/pagination))
22. 🔗 Sama: "My eyes have to track the content as it moves." (keberatan pada gulir)
23. 🔗 Sama: gulir memberi "more fine-grained control over the reading experience".
24. 🔗 Sama: untuk buku linear, kontrol tambahan "just creating more work".
25. 🔗 Sama: "Scrolling affords a completely empty kind control."
26. 🔗 Karen (the-ebook-reader, 2019): "The placement feels natural and comfortable when reading one-handed." ([blog](https://blog.the-ebook-reader.com/2019/07/19/whats-the-best-placement-for-page-buttons-on-ereaders/))
27. 🔗 Tea: "I rest a thumb on the edge and just twitch it to turn a page."
28. 🔗 Shawn Ritchie: "My thumb doesn't naturally rest on a centered bottom button."
29. 🔗 Sportbike Mike: "I naturally tend to hold the device there." (suka tombol bawah)
30. 🔗 Jim: "I just had to figure out how to adjust my grip." (tombol bawah butuh adaptasi)
31. 🔎 Pengguna Kobo (MobileRead): zona kiri/kanan bawaan canggung satu tangan; zona vertikal (atas mundur, bawah maju) "allows me to read one handed". ([MobileRead](https://www.mobileread.com/forums/showthread.php?p=3839655))
32. 🔎 Pengguna Kindle yang memegang di sudut terus kena sentuh tak sengaja, lalu mematikan zona itu (MobileRead). ([MobileRead](https://www.mobileread.com/forums/showthread.php?p=2965386))
33. 🔎 KOReader: zona ketuk bisa diatur sendiri; zona sudut terlalu kecil menyisakan zona mati (MobileRead). ([MobileRead](https://www.mobileread.com/forums/showthread.php?p=3040955))
34. 🔎 Jajak MobileRead geser vs ketuk: geser 49,09%, ketuk 30,91%, tak peduli 20%. ([MobileRead](https://www.mobileread.com/forums/showthread.php?p=1837617))
35. 🔎 Komentar blog: Kindle HP bisa ganti halaman lewat tombol volume, "cradle the phone in your hand, either hand". ([blog](https://blog.the-ebook-reader.com/?p=19920))

### C. Apple Books
36. 🔎 Pengguna MacRumors: app "not saving the page I'm currently on", lompat ke tempat terakhir "whether 10 pages or 100". ([MacRumors](https://forums.macrumors.com/threads/books-app-page-turning-bug.2404999))
37. 🔎 Pengguna lain: tak kembali ke halaman benar dan "frequently the font size keeps changing". (utas sama)
38. 🔎 Pengguna iPad: pilihan halaman "goes back to the Scroll mode by itself". ([Apple Discussions](https://discussions-jp-prz.apple.com/thread/255467460))
39. 🔎 Pengguna iPadOS 18.5 minta kembali ke gulir penuh; ada yang dipaksa gulir, ada yang ingin halaman (keluhan dua arah). ([Apple Discussions](https://discussions-jp-prz.apple.com/thread/256061090))

### D. Studi & data
40. 🔎 Eye-tracking 2007 (16 peserta, HP): teks format halaman dibaca lebih cepat dari gulir & RSVP; pemahaman tak beda signifikan. ([ACM](https://unpaywall.org/10.1145%2F1329469.1329493))
41. 🔎 Studi Norwegia (Springer 2022): paging memberi pemahaman terpadu lebih baik; gulir di layar kecil paling sulit membangun "peta mental" teks. ([Springer](https://link.springer.com/doi/10.1007/s11145-022-10328-9))
42. 🔎 Studi sama: gulir di tablet memberi pengalaman paling positif dibanding paging tablet atau gulir HP.
43. 🔎 Studi HP paging vs auto-scroll: pemahaman tak beda; tampilan terbaik "tergantung konteks baca". ([IJI 2024](https://e-iji.net/dosyalar/iji_2024_2_3.pdf))
44. 🔎 Hoober 2013 (1.300+ orang): 49% satu tangan, 36% menyangga, 15% dua tangan; 75% interaksi pakai jempol (angka dari tulisan sekunder). ([Smashing](https://smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users))
45. 🔎 Hoober: tangan kanan paling tak akurat di sudut bawah & kanan atas; saran: target lebih besar di zona sulit.
46. 🔎 Kim & Ji 2019: area paling bawah dan kiri atas bukan zona jempol alami. ([Springer](https://springerlink.bibliotecabuap.elogim.com/10.1007/978-3-319-96071-5_50))

### E. Indikator progres
47. 🔎 Jajak Good e-Reader (829 orang): 35,95% suka nomor halaman; bar progres 10,98%; menit tersisa bab 10,62%; sisa waktu buku 6,15%. Bukan studi terkontrol. ([Good e-Reader](https://goodereader.com/blog/?p=98851))
48. 🔗 Gabriel (Kindle 2024): "I actually hated it. They should give a proper way to set this according to the reader taste." ([blog](https://blog.the-ebook-reader.com/2024/08/09/last-kindle-update-changed-reading-progress-indicator-and-some-hate-it/))
49. 🔗 HankH: indikator lebih kecil "creates a little more eye strain for me".
50. 🔗 Pembaca: "I wish there was a way to disable them completely, as I occasionally fat finger them on."
51. 🔗 Cellaris: "I like status bars to be as unobtrusive as possible."
52. 🔗 KimberlyO: "It doesn't distract me, so that's good."

Total: 52 butir dari 7 sumber (forum LingQ, forum Readlang, MobileRead, blog e-reader, blog Marco & ignorethecode, Apple/MacRumors, studi & Hoober). Butir 🔎 belum dibuka penuh; cek sebelum jadi keputusan besar.

## 3. Vonis hipotesis
| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| 1 | Gulir lebih cocok untuk yang sering ketuk kata | **Belum jelas** | Instapaper & Readlang: seleksi/gulir bebas (10-14, 18). Studi condong halaman di HP (40-41). Jalan tengah: beri pilihan. |
| 2 | Zona tepi bentrok dengan ketuk kata | **Terbukti** | LingQ: saran matikan "Tap to Page", salah balik berbiaya (1-3). Kindle/KOReader: sentuh tak sengaja & zona mati (32-33). |
| 3 | Satu tangan butuh kontrol di bawah layar | **Terbukti sebagian** | Pembelajar minta ganti halaman satu tangan (4-8, 15-17, 31, 35). Tapi bawah layar paling tak akurat (45-46): butuh target besar. |
| 4 | Posisi hilang saat ganti huruf bikin frustrasi | **Belum jelas** | Hanya laporan halaman lompat/huruf berubah di Apple Books (36-37). Tak ada bukti khusus ganti ukuran huruf. |
| 5 | Indikator progres menambah motivasi | **Belum jelas** | Tak ada studi motivasi. Pembaca terbelah (47-52). Pelajaran: beri kendali. |

## 4. Kesimpulan
- Jangan ganti ke gulir. Tetap halaman; pertimbangkan pilihan gulir bila ada permintaan.
- Masalah nyata: salah ketuk tepi & ganti halaman satu tangan.
- Indikator progres boleh tetap, tapi bisa disembunyikan.

## 5. Usul P0 untuk app
1. **Zona tepi lebih sempit + saklar.** Mis. 25% jadi ±15%, plus saklar "Ketuk tepi ganti halaman" di Pengaturan.
2. **Satu tangan:** tombol "Maju" besar (≥48px) di bawah; zona bawah layar jangan jadi satu-satunya jalan.
3. **Posisi aman & progres opsional:** uji kalimat yang sedang dibaca tetap terlihat setelah ganti huruf; saklar sembunyikan "Hal x/n · Sisa".

## 6. Yang belum diketahui
- Reddit & ulasan Play Store/App Store tak terbuka.
- Data khusus satu tangan di KRL tidak ada; uji nyata tetap berguna.
- Studi paging vs gulir memakai teks pendek, bukan pembaca yang sering ketuk kata.
