# Riset: Angka Statistik yang Dipercaya (#1316)

Tanggal: 18 Nov 2026 · Peran: riset · Mockup: `docs/mockup-1316.html` (gambaran rencana, belum dibangun)

## Intinya
- Angka salah merusak kepercayaan. Bukti kuat di tool data, tipis untuk retensi app belajar.
- Aturan inti: satu sumber, satu satuan, tampilkan "–" bila tak yakin.
- Baca ulang tak boleh menambah "halaman dibaca"; hitung halaman unik saja.

## 1. Masalah di Keepo (dari 4 penguji)
- "Minggu ini 256 halaman" padahal buku 5 halaman (Dina). 76 vs 6 (Bima), 36 vs 7 (Nadia).
- "Kata disimpan 0" di catatan sesi, tapi Home bilang 1 (Raka).
- "+20 XP" di layar Tamat vs "10 XP" di Home. Streak "2 hari" vs titik hampir penuh (Bima).
- Satuan campur: buku "5 halaman", layar Tamat "11 bagian" (Bima).

Catatan kode (hanya baca): `pagesWeek()` di `ui.js` menjumlahkan `db.pgDay` tanpa batas atas. Komentar #1199 mencabut batas total halaman buku. Itu cocok dengan gejala angka membengkak.

## 2. Vonis per klaim

| # | Klaim | Vonis |
|---|-------|-------|
| 1 | Angka tak cocok antar layar menurunkan kepercayaan pada angka lain | **Terbukti** (sumber UX/data, forum LingQ, Strava) |
| 2 | Angka progres/streak/XP yang salah menurunkan retensi app belajar | **Belum jelas**: hanya cerita, tak ada uji terukur |
| 3 | Pengguna menganggap streak/XP serius (kehilangan = marah) | **Terbukti** (Duolingo: puluhan ribu minta streak balik) |
| 4 | Penyebab utama = definisi/satuan/jendela waktu beda, bukan data mentah | **Terbukti** (LingQ, Readlang, artikel dashboard) |
| 5 | Tampilkan "–"/sembunyikan saat tak yakin lebih baik dari angka ngawur | **Sebagian**: panduan desain mendukung "n/a"; tak ada studi dash vs angka salah |
| 6 | Baca ulang boleh menambah "halaman dibaca" | **Gugur** untuk metrik halaman; boleh untuk "waktu baca" |
| 7 | Satu angka resmi dengan penjelasan lebih dipercaya | **Sebagian**: LingQ memberi "hanya relatif" dan pengguna tetap protes |

## 3. Bukti publik (39 butir, 8 sumber)
Jujur soal mutu: kebanyakan forum, blog, halaman status. Tak ada studi terbit yang menguji retensi. Ulasan App Store/Play tak muncul lewat pencarian; tidak dikutip.

**Duolingo (8)**
1. [Status Duolingo: Streak Progress Display Issue (Sep 2025)](https://status.duolingo.com/incidents/v7dzdkyl12zd): streak tampil salah, diakui resmi.
2. [Mirror insiden yang sama](https://isdown.app/status/duolingo/incidents/444838-streak-progress-display-issue)
3. [Mega-thread XP r/duolingo (Mar 2024)](https://redlib.belloworld.it/r/duolingo/comments/1bilp9a/mega_thread_xp_issues_and_more): XP tak masuk, tak cocok leaderboard.
4. [Thread bug mingguan r/duolingo (Jul 2024)](https://reddit.birdcat.cafe/r/duolingo/comments/1eh0954/weekly_duolingo_support_bug_report_and_streak): salah liga, XP, streak freeze.
5. [Lingoly: streak tak terhitung](https://lingoly.io/duolingo-not-counting-streak-fix/): banyak keluhan di Reddit, sering karena sinyal jelek.
6. [PocketGamer.biz: Duolingo pulihkan streak hilang](https://www.pocketgamer.biz/duolingo-is-restoring-lost-streaks-for-a-limited-time-aiming-to-recover-lapsed-users/): puluhan ribu minta streak balik.
7. [PiunikaWeb: XP turun setelah update Android](https://piunikaweb.com/2022/08/05/duolingo-xp-reduced-after-v5-67-4-update-on-android-heres-why/)
8. [Duoplanet: "Has Duolingo finally fixed XP"](https://newsletter.duoplanet.com/posts/has-duolingo-finally-fixed-xp)

**LingQ (9)**
9. [LingQ statistics](https://forum.lingq.com/t/lingq-statistics/5894)
10. [Fixing wrong known word count?](https://forum.lingq.com/t/fixing-wrong-known-word-count/30083)
11. [Known words count is squiffy](https://forum.lingq.com/t/known-words-count-is-squiffy/314465)
12. [Number of LingQs is wrong, how to start over](https://forum.lingq.com/t/the-number-of-lingqs-is-wrong-how-to-start-over/7036)
13. [Wrong word counts (Korean)](https://forum.lingq.com/t/wrong-word-counts-basic-korean-patterns-part-1/30018)
14. [Progression bar bugged?](https://forum.lingq.com/t/progression-bar-bugged/14661)
15. [Hebrew: terlalu banyak kata karena awalan](https://forum.lingq.com/t/lingq-thinks-there-are-way-too-many-words-in-hebrew-thanks-to-prefixes/288601)
16. [BUG: membuat LingQ baru MENGURANGI known words](https://www.lingq.com/en/forum/support-feedback-forum/bug-creating-new-lingqs-decrea/)
17. [Bantuan LingQ: memahami statistik](https://lingq-support.groovehq.com/help/understanding-lingq-statistics): definisi "Known Word Count".

**Readlang (4)**
18. [Word count differences](https://forum.readlang.com/t/word-count-differences/3399): artikel sama, total beda.
19. [Word counts not useful for Chinese](https://forum.readlang.com/t/word-counts-are-not-useful-for-chinese-languages/5101)
20. [Web Reader Word Count](https://forum.readlang.com/t/web-reader-word-count/5169)
21. [Feedback dari pengguna setia](https://forum.readlang.com/t/feedback-feature-requests-from-a-loyal-user/4901): hitungan harian naik dua kali.

**Kindle / Goodreads (8)**
22. [Goodreads: incorrect page counts](https://www.goodreads.com/topic/show/18510058-incorrect-page-counts)
23. [Goodreads: three different page counts](https://www.goodreads.com/topic/show/22783241-three-different-page-counts-for-this-edition)
24. [Goodreads: page count wrong](https://www.goodreads.com/topic/show/22797141-page-count-wrong)
25. [Goodreads: no percentage when tracking](https://www.goodreads.com/topic/show/22792470-no-percentage-when-tracking?tab=author)
26. [Akurasi progres Goodreads](https://two-column-categories-page--johnwargo.netlify.app/posts/2022/accurately-calculating-progress-in-goodreads): catatan tambahan di akhir buku merusak persen.
27. [Just Publishing Advice: Kindle hitung halaman dari posisi terjauh](https://justpublishingadvice.com/kindle-unlimited-has-a-problem-it-cant-count-words/)
28. [Teleread: penulis kehilangan page reads](https://teleread.org/2016/10/08/amazon-kdp-select-authors-are-losing-page-reads-apparently-due-to-software-glitches/)
29. [Roger Packer: KENPC v3.0 untuk page-flip](https://rogerpacker.com/?p=7346): Amazon memperbaiki cara hitung halaman.

**Strava & app lain (4)**
30. [Garmin: elevation gain way off on Strava](https://forums.garmin.com/apps-software/mobile-apps-web/f/garmin-connect-mobile-ios/267471/elevation-gain-way-off-on-strava)
31. [Hammerhead: jarak/elevasi beda dengan Strava](https://support.hammerhead.io/hc/en-us/community/posts/1260800771910/comments/1260802141609)
32. [Fitbit: data ke Strava salah](https://community.fitbit.com/t5/Ionic/The-data-transferred-from-Ionic-to-Strava-is-incorrect/td-p/2860280)
33. [Voodoo of Elevation Gain and Strava](https://regex.info/blog/2015-05-09/2568)

**UX/data & gamifikasi (3+)**
34. [UXtweak: data discrepancy](https://blog.uxtweak.com/data-discrepancy-in-ux-research/): angka beda di dua laporan membuat semua temuan diragukan.
35. [Vixbyte: kenapa dashboard kehilangan kepercayaan](https://vixbyte.substack.com/p/why-dashboards-lose-trust-over-time)
36. [Perceptive Analytics: data buruk mengikis kepercayaan](https://www.perceptive-analytics.com/?p=11208)
37. [Yu-kai Chou: desain streak](https://yukaichou.com/gamification-study/master-the-art-of-streak-design-for-short-term-engagement-and-long-term-success/): streak digerakkan rasa takut rugi (opini, bukan uji).
38. [Volue: empty state "n/a / no data" di posisi nilai](https://wave.volue.com/UX-patterns/system-feedback/empty-states)
39. [Carbon: empty state](https://carbondesignsystem.com/patterns/empty-states-pattern/)

Kualitas: Migaku dan Language Reactor tak punya keluhan statistik yang ketemu. Strava: keluhan soal jarak/elevasi, bukan "berhenti percaya".

## 4. Jawaban tiga pertanyaan
- **Salah menurunkan kepercayaan?** Ya (terbukti). Menurunkan retensi: belum jelas; kemungkinan besar, belum terukur.
- **Aturan praktis:** satu sumber, satu satuan, "–" saat ragu (sebagian terbukti lewat panduan desain).
- **Baca ulang menambah halaman?** Tidak. Goodreads/Kindle: hitung berdasar posisi terjauh memicu angka palsu.

## 5. Lima aturan angka siap pakai developer
1. **Satu sumber per angka.** Setiap angka (halaman, kata, XP, streak) punya SATU fungsi. Semua layar memanggilnya.
2. **Satu satuan: "halaman".** Ganti "bagian" di Tamat, e-reader, dan catatan sesi.
3. **Halaman unik.** Satu halaman per buku per hari dihitung sekali. Baca ulang tak menambah. Batas atas: total halaman buku × jumlah buku.
4. **"–" bila tak yakin.** Data kosong, belum sinkron, atau melebihi batas: tampil "–", bukan 0 atau angka ngawur.
5. **XP & streak: angka = titik.** XP di Tamat = XP yang dicatat di Home. Streak besar ("2 hari") dan titik dari data yang sama.

## 6. Langkah berikutnya
- Developer: bangun aturan 1-5 (backlog #144). Uji ulang 5 kasus penguji.
- Ukur nanti: apakah keluhan "angka tak cocok" hilang dari masukan penguji.
- Tahap 22: naik ke "draft" saja. Bukti kuat soal kepercayaan, lemah soal retensi.
