# Validasi UX Keepo dari bukti internet (Tugas #270, Tahap 16)

## Intinya
- 37 bukti dari 8 sumber: ketuk-kata 1 langkah terbukti, tab bawah 4 menu aman.
- Yang gugur: popup arti aman menutupi teks. Popup yang tutup kalimat bikin kesal.
- 5 celah UX Keepo diurutkan; P0 = tombol "Coba 1 cerita" dan simpan kata.

Catatan jujur:
- Banyak halaman (Reddit, Play Store, NN/g) diblokir. Bukti diambil dari forum, ulasan, panduan desain.
- Kutipan dalam tanda petik = teks asli. Tanpa petik = ringkasan hasil pencarian.
- Tidak mengulang `desain-laporan-usability.md` (46 kutipan lain). Bukti di sini baru.

## 1. Tabel bukti
Kode sumber:
- A: [Forum LingQ, "End of the Clicking Simulator"](https://forum.lingq.com/t/39602)
- B: [Forum LingQ, "UI Feature Ideas"](https://forum.lingq.com/t/lingq-ui-feature-ideas/1266449)
- C: [Forum LingQ, "app vs desktop"](https://forum.lingq.com/t/using-lingq-on-the-app-vs-desktop/36324)
- D: [Lingtuitive, review LingQ](https://lingtuitive.com/blog/lingq-review)
- E: [Forum Readlang, tampilkan arti kata](https://forum.readlang.com/t/show-translations-of-known-words-directly-in-the-text/4837)
- F: [Forum Readlang, terjemah real-time](https://forum.readlang.com/t/a-question-about-real-time-translation-from-a-student-inspired-by-your-reader/5237)
- G: [Smashing Magazine, bottom navigation](https://smashingmagazine.com/2016/11/the-golden-rules-of-mobile-navigation-design)
- H: Hasil pencarian: [ulasan Chrome Web Store Readlang](https://chromewebstore.google.com/detail/readlang-web-reader/odpdkefpnfejbfnmdilmfhephfffmfoh/reviews), [Reddit Kindle (cermin)](https://reddit.sentinel-team.org/posts/1peexbb/snapshots/2025-12-05T09%3A11%3A01.865891Z), [Apple Community, Kindle](https://discussions.apple.com/thread/5616400), [ulasan Duolingo di Kimola](https://kimola.com/reports/unlock-insights-with-our-duolingo-user-feedback-report-google-play-en-us-141958), [Material Design](https://material.io/components/bottom-navigation)

**Ketuk-kata & popup arti**
1. A: "There’s an awfully lot of clicking involved in using LingQ." (LetoDK)
2. A: "This can lead to having to click maybe 10-30 times just to read a single sentence."
3. A: "The pop-up obscures the rest of the sentence."
4. A: "The word meaning is placed visually away from where I just looked"
5. B: kamus samping LingQ "can be cumbersome and slow, often getting in the way" (CPUB0T)
6. B: Language Reactor: popup kecil muncul saat hover, dipuji "so darn good!"
7. B: arti dan definisi AI di Language Reactor "nearly instantaneous"
8. E: arti kata "hidden until I click on them." (alex4)
9. E: ingin lihat arti "without needing to click on each word"
10. E: "if you KNOW the word you obviously don't need to click it" (sr)
11. F: "tapping on a single word brings up its definition" (Ray)
12. F: ketuk dua kata bersebelahan = arti gabungan (Ray)
13. F: tarik jari lintas kata untuk terjemah frasa (steve)
14. H: ulasan Readlang: arti harus muncul di popup, bukan "shift the entire paragraph, it's quite distracting"
15. H: ulasan Readlang: arti satu kata tidak ikut tampil di kemunculan lain di halaman yang sama
16. H: Readlang: mengetuk kata dianggap tanda "lupa", memengaruhi jadwal ulang

**Kamus Kindle**
17. H: Reddit Kindle: popup kamus baru dikeluhkan "tiny"; pengguna minta jendela dekat kata.
18. H: komentar yang sama: popup lama menutup teks, tapi tetap minta tombol pilihan.
19. H: Reddit Kindle: setelah pembaruan, kamus makin buruk; semua jadi geser atas-bawah.
20. H: Apple Community: setelah tekan lama arti muncul, tapi "Go To Dictionary" tidak bereaksi.
21. H: Apple Community: arti tidak muncul; yang ada hanya tawaran unduh kamus Google/Wikipedia.

**Onboarding & kerumitan**
22. D: "The biggest obstacle for most is the setup— lots of different customizations"
23. D: "LingQ has a lot of features and settings."
24. D: solusi pengguna awam: "here are the features you need, ignore the rest"
25. D: layar HP LingQ terasa penuh: hitungan kata, panel warna, statistik, audio berebut ruang.
26. D: subtitle di HP tak bisa diketuk saat video jalan: "there's no way of clicking the subtitles when watching."

**Kenyamanan baca di HP**
27. A: popup dibuat "usefull for very small screens (such as phones)" (LuckieNoob)
28. C: "Using a tablet is also just a lot more comfortable" (azarya)
29. C: "The desktop is better, and it is for a lot of apps." (kimojima)
30. C: "I have to manually click on every lingq I know and move it to know" (JanFinster)
31. G: "49% of people rely on one-thumb to accomplish things on their phones." (Hoober)
32. G: sasaran sentuh minimal "44px to 48px"

**Tab bawah**
33. G: "It’s very important to place top-level and frequently-used actions at the bottom of the screen."
34. G: "Avoid using more than five destinations in bottom navigation."
35. G: "Avoid long text labels as they do not truncate or wrap."
36. G: tiap ikon harus ke tujuan, "should not open menus or other pop-ups."
37. H: Material Design: bar 4 tujuan paling baik ikon + teks, terutama bila ikon tak jelas.

**Duolingo Stories** (tipis)
- Ringkasan Google Play: pengguna suka bisa ketuk kata untuk lihat terjemahan. Tidak dihitung (ringkasan, bukan kutipan).

## 2. Enam hipotesis & vonis
1. **Ketuk-kata 1 langkah cukup.** Vonis: *terbukti*. Bukti 1-2, 8-11: keluhan terbesar justru langkah ekstra.
2. **Popup/sheet arti tak boleh menutup kalimat.** Vonis: *terbukti*. Bukti 3-4, 14, 17-18.
3. **Tab bawah 4 menu jelas.** Vonis: *terbukti*. Bukti 31, 33-37: 4 item, ikon + label pendek.
4. **Onboarding maksimal 3 ketukan.** Vonis: *belum jelas*. Bukti 22-25: setup berat bikin lari; angka 3 belum teruji.
5. **Arti kata selalu tampil andal tanpa kamus unduhan.** Vonis: *gugur*. Bukti 20-21 (Kindle), 15; Keepo juga bisa gagal saat offline.
6. **Layar penuh pengaturan bikin pemula lari.** Vonis: *terbukti*. Bukti 22-25.

## 3. Cocokkan dengan UI Keepo sekarang
- Tab bawah: 4 menu (Home, Baca, Ngomong, Kata), ikon + label, tinggi 48px. Sesuai bukti 33-37.
- Ketuk kata: 1 ketukan buka sheet bawah; halaman digeser supaya kata tidak tertutup. Sesuai bukti 3, 14.
- Frasa: tombol "Perluas" ada; tarik jari belum (bukti 13).
- Tab bawah hilang saat membaca (layar penuh): baik untuk fokus, tapi pindah tab perlu keluar dulu.
- Sheet arti: tombol Simpan/Tersimpan, satu panel padat (arti, cara baca, kamus, frekuensi, ketukan).
- Beranda kosong: 3 bendera "Coba 1 cerita"; tak ada penahan layar (`wakeLock`) di kode.

## 4. Lima celah UX (P0 dulu)
1. **P0, Coba 1 cerita:** tombol belum dikunci & tanpa loading (Tari); bisa bikin cerita dobel. Bukti 22-24: awal harus mulus.
2. **P0, Simpan kata:** tombol "Tersimpan" tak bisa batal; frasa tak bergaris bawah (Raka). Bukti 30.
3. **P1, Sheet arti terlalu padat:** 10 blok dalam satu panel. Tampilkan arti dulu, sisanya dilipat. Bukti 3-4, 25.
4. **P1, Arti gagal saat offline:** pesan "belum kebuka" tak sebut sebab. Bukti 20-21.
5. **P2, Baca malam di HP:** layar mati sendiri, tema awal Terang (Nadia). Bukti 27-28.

## 5. Langkah berikut
- Tiap celah = 1 tugas developer kecil. P0 lebih dulu.
- Uji 5 orang (`riset-uji-pakai-5-orang.md`) cuma penguat, bukan syarat.
- Cek ulang bukti 17-19 (Kindle) bila ada akses Reddit langsung.
