# Riset: ulang kata sebelum jatuh tempo, untung atau berlebihan? (#1412, tahap 23)

(bukti internet, bukan data pengguna Keepo) Tanggal riset: 21 Nov 2026. Tidak mengulang `riset-jadwal-ulang-kata.md`, `riset-ulang-kata-sesi-sama.md`, `riset-retensi-h2-h7-patokan.md`.

## Intinya
- Ulang dini 3 kata boleh ada, tapi harus diberi nama lain dan tidak mengubah jadwal.
- Untungnya kecil untuk ingatan, kuat untuk rasa "ada yang bisa kulakukan". Tekanan datang dari tumpukan, bukan dari 3 kata.
- Usul: 3 kata, maks 1 ulang per kata, kata jatuh tempo didahulukan, sembunyikan bila sudah ada 3+ kata jatuh tempo.

## 1. Kondisi sekarang (dibaca di kode, tidak diubah)
- Home: kartu "N kata siap diulang" hanya memakai kata yang `due` sudah lewat (`isDue`, ui.js ~1116).
- Home: tombol "Ulang 3 kata · ±1 menit" (`quickPick`, ui.js ~3021) mengambil 3 kata belum hafal, urut `due` paling lama.
- Kata belum jatuh tempo ikut terambil bila kata jatuh tempo kurang dari 3. Dua tombol terlihat mirip.
- Kata yang baru diulang tidak dikecualikan, jadi bisa muncul lagi (keluhan Sinta).
- Kata Lupa/Ragu bisa muncul sampai 2 kali ulang, jadi "±1 menit" terasa meleset (keluhan Ilham).

## 2. Masukan pengguna AI (21 Nov)
- Ilham: "Ulang 3 kata ikut mengambil kata yang belum jatuh tempo. Kartu bisa terasa dobel dengan 'N kata siap diulang'."
- Ilham: "±1 menit", tapi kata lupa/ragu muncul sampai 2 kali. Terasa lama.
- Sinta: urut dari jatuh tempo, bukan dari yang sudah dikuasai. Beri jeda dan tulis alasannya.

## 3. Bukti (47 butir, 6 jenis sumber)
Catatan jujur: butir diambil dari ringkasan hasil pencarian dan beberapa halaman yang dibuka. Bertanda *(judul)* = hanya dibaca dari judul/cuplikan. Tak ada butir yang berhasil dibaca dari Reddit, Threads/X, atau halaman ulasan App Store/Play Store langsung (tidak muncul di hasil pencarian). Ulasan toko hanya lewat pihak ketiga (Trustpilot, G2, MetaFilter).

### A. Anki: "review ahead" (H1, H4)
1. Dokumen Anki: "review ahead" tidak cocok untuk dipakai berulang. [tautan](https://docs.ankiweb.net/filtered-decks.html)
2. Dokumen sama: algoritma khusus untuk ulang dini, memperhitungkan seberapa awal. Dekat jatuh tempo = jeda baru seperti biasa; terlalu awal = jeda lama nyaris sama (skala bertahap). [tautan](https://docs.ankiweb.net/filtered-decks.html)
3. Dokumen sama: matikan "Reschedule" = mode pratinjau; kartu kembali persis seperti semula. [tautan](https://docs.ankiweb.net/filtered-decks.html)
4. Forum Anki: belajar kartu yang belum jatuh tempo "umumnya bukan ide bagus" bila tidak terburu waktu. [tautan](https://forums.ankiweb.net/t/cannot-custom-study-review-cards/9834/2.md)
5. Forum Anki: add-on "Smarter Study Ahead" dibuat karena manual memperingatkan pemakaian berulang. [tautan](https://forums.ankiweb.net/t/new-add-on-smarter-study-ahead/16641)
6. Forum Anki: ulang dini "sebaiknya sesekali"; di FSRS ulang dini dinilai sama seperti ulang biasa (jeda & nilai). [tautan](https://forums.ankiweb.net/t/best-way-to-review-before-due-date/43094?page=2)
7. FAQ Anki: FSRS lebih baik menangani kartu yang diulang terlambat. [tautan](https://faqs.ankiweb.net/what-spaced-repetition-algorithm)
8. Forum Anki: "Set Learn Ahead Limit to Zero" *(judul)*, pengguna mengatur sendiri batas belajar dini. [tautan](https://forums.ankiweb.net/t/set-learn-ahead-limit-to-zero/49146/11.md)

### B. WaniKani: "Extra Study" (H1, H2, H4)
9. Forum WaniKani: "Isn't the new Extra Study thing super antithetical to the point of SRS?" Pro: pengulangan membantu, bisa dilewati. Kontra: ulang tepat sebelum jadwal merusak tujuan SRS. [tautan](https://community.wanikani.com/t/isnt-the-new-extra-study-thing-super-antithetical-to-the-point-of-srs/56095)
10. Thread sama: FAQ fitur menyebut SRS "lebih soal mengatur waktu"; Extra Study untuk item yang "paling butuh" (baru salah/baru dipelajari). [tautan](https://community.wanikani.com/t/isnt-the-new-extra-study-thing-super-antithetical-to-the-point-of-srs/56095)
11. Forum: "Is too much extra study bad for memory?" Mayoritas: tidak merusak ingatan, tapi mengulang item sama sangat tidak efisien. [tautan](https://community.wanikani.com/t/is-too-much-extra-study-bad-for-memory/69313)
12. Forum: "Does extra studying of problem kanji mess with the SRS?" *(judul)*. [tautan](https://community.wanikani.com/t/does-extra-studying-of-problem-kanji-mess-with-the-srs/52359)
13. Forum: "Is doing extra study before review cheating?" *(judul)*. [tautan](https://community.wanikani.com/t/is-doing-extra-study-before-review-cheating/61272?page=2)
14. Forum: Extra Study tidak membuat catatan ulasan dan tidak mengubah tahap SRS (tafsir pengguna). [tautan](https://community.wanikani.com/t/extra-study-mode/56078?page=2)
15. Forum: "Does studying go against the idea of SRS?" *(judul)*, pertanyaan yang sama muncul berulang. [tautan](https://community.wanikani.com/t/does-studying-go-against-the-idea-of-srs/45138)

### C. Readlang, LingQ, Memrise (H3, H4)
16. Forum Readlang: ulang di hari sama tidak menggeser jadwal; sengaja agar ingatan jangka pendek tak dihitung. [tautan](https://forum.readlang.com/t/list-of-reviewed-words-not-updating-after-practice-session/3594)
17. Forum Readlang: "No New Cards" di Practice saat tak ada yang jatuh tempo. Pengguna bingung. [tautan](https://forum.readlang.com/t/no-new-cards-in-practice/3142)
18. Forum Readlang: cara ulang bebas = pilih kata di Daftar Kata lalu Actions → Practice Flashcards. Jalur terpisah dari latihan terjadwal. [tautan](https://forum.readlang.com/t/no-new-cards-in-practice/3142)
19. Forum Readlang: sesi diset 50 kata hanya memberi 30, usul agar kata jatuh tempo dipilih dulu. [tautan](https://forum.readlang.com/t/technical-issue-practice-mode-word-count-discrepancy/4963)
20. Forum LingQ: pengguna ingin mengulang semua LingQ dari satu pelajaran, bukan hanya yang jatuh tempo (67 vs 17 di antrean). [tautan](https://forum.lingq.com/t/how-do-i-review-all-lingqs/30137)
21. Blog LingQ: status 1 → 1 hari, 2 → 3 hari, 3 → 1 minggu, 4 → 2 minggu, lalu 1 dan 3 bulan. Tab "Due for Review" memisahkan yang jatuh tempo. [tautan](https://www.lingq.com/blog/?p=3811)
22. Forum LingQ: "Lingqs piling up in SRS" *(judul)*, tumpukan membuat kewalahan. [tautan](https://forum.lingq.com/t/lingqs-piling-up-in-srs/37489)
23. Forum LingQ: "I'm overwhelmed with my vocab list! (pressure to create LingQs)" *(judul)*. [tautan](https://www.lingq.com/en/forum/open-forum/im-overwhelmed-with-my-vocab-l/)
24. Forum LingQ: "Flashcards needless repetition" *(judul)*. [tautan](https://forum.lingq.com/t/flashcards-needless-repetition/1733)
25. Bantuan Memrise: latihan bebas lewat "Classic Review" tanpa mematikan sistem terjadwal; tak bisa diubah. [tautan](https://memrise.zendesk.com/hc/en-us/articles/360015887577)
26. Bantuan Memrise: "Difficult Words" tampil maks 20 kata per sesi. [tautan](https://memrise.zendesk.com/hc/articles/360015974638)
27. Memrise Speed Review: kuis cepat, batas waktu bawaan 6 detik. [tautan](https://memrise.com/blog/product-news-oct21)

### D. Duolingo (H2, H4)
28. Blog Duolingo: Practice Hub memuat latihan dari aktivitas terbaru; modul teratas diperbarui harian. [tautan](https://blog.duolingo.com/guide-to-duolingo-practice-hub/)
29. Blog Duolingo: latihan personal memakai spaced repetition + akurasi untuk memilih kata. [tautan](https://blog.duolingo.com/spaced-repetition-for-learning)
30. Blog Duolingo: pengguna gratis lewat ikon hati; Super lewat tab Practice Hub (jalur ulang dipisah dari pelajaran). [tautan](https://blog.duolingo.com/new-duolingo-home-screen-design/?facet2=pdf)
31. MetaFilter 2023: "Practice your words" selalu menampilkan segelintir kata awal yang sama. [tautan](https://ask.metafilter.com/375496/The-Duolingo-Practice-your-Words-feature-reviews-same-early-words)
32. PiunikaWeb 2026: setelah pembaruan, mode latihan memutar dua kata dasar yang sama berulang. [tautan](https://piunikaweb.com/2026/04/02/duolingo-adding-catch-up-lessons-after-course-update-complaints/)
33. Trustpilot/G2: ulasan "membosankan, berulang". Anekdot, tidak terkontrol. [tautan](https://uk.trustpilot.com/review/duolingo.com?page=4)
34. Decision Lab: pencarian Reddit "Duolingo burnout" penuh pengguna jenuh (dikutip, Reddit sendiri tidak terbaca). [tautan](https://thedecisionlab.com/fr-CA/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification)
35. Web Designer Depot: notifikasi Duolingo bernada menyalahkan; sebagian pengguna keberatan. [tautan](https://webdesignerdepot.com/the-art-of-duolingo-notifications-the-subtle-manipulation-of-language-learners/)
36. Screenwise: kecemasan streak datang dari sifat "semua atau tidak". Sumber sekunder. [tautan](https://screenwiseapp.com/guides/duolingo-and-the-streak-obsession)

### E. Studi: spasi, tes, ulang berlebih (H1, H3)
37. Cepeda dkk. 2009: makin lebar jeda, ketepatan naik tajam lalu turun pelan; jeda optimal bisa menaikkan ingatan sampai 150%. [tautan](https://home.cs.colorado.edu/~mozer/Research/Selected%20Publications/reprints/Cepedaetal2009.pdf)
38. Cepeda dkk. 2008: jeda optimal ±20-40% dari jarak ke tes (1 minggu), ±5-10% (1 tahun). Ulang terlalu dekat = tambahan kecil (inferensi). [tautan](https://escholarship.org/uc/item/1n15d7xr.pdf)
39. Rohrer & Taylor 2006: soal tambahan (overlearning) tidak berefek di tes 1 dan 4 minggu; praktik terdistribusi berefek. Materi matematika, bukan kosakata. [tautan](https://digitalcommons.usf.edu/psy_facpub/1770/)
40. Rohrer dkk. 2005: manfaat overlearning bisa luntur pada jeda panjang. [tautan](https://digitalcommons.usf.edu/psy_facpub/1772/)
41. Roediger & Karpicke 2006: tes memberi ingatan jangka panjang lebih baik daripada belajar ulang, walau di 5 menit belajar ulang lebih unggul. [tautan](https://profiles.wustl.edu/en/publications/test-enhanced-learning-taking-memory-tests-improves-long-term-ret/)
42. Karpicke & Roediger 2008: tes ulang kosakata asing berefek besar; baca ulang tidak. (dari riset #1214) [tautan](https://pubmed.ncbi.nlm.nih.gov/18276894/)
43. Nakata: per menit, 1 kali ingat memberi hasil terbesar; 5-7 kali lebih baik total. (dari riset #1214) [tautan](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/does-repeated-practice-make-perfect-the-effects-of-withinsession-repeated-retrieval-on-second-language-vocabulary-learning/F14BA8A576CD2563D14CEA46E35D842E)

### F. Sesi mikro: berapa lama (H3)
44. Studi lapangan 2017 (app kosakata Android): notifikasi menambah banyak sesi "cepat". [tautan](https://findanexpert.unimelb.edu.au/scholarlywork/1342858-language-learning-on-the-go--opportune-moments-and-design-of-mobile-microlearning-sessions)
45. Studi lapangan 3 minggu: desain UnlockApp/NotificationApp menaikkan jumlah tugas per hari (volume, bukan nilai tes). [tautan](https://arxiv.org/pdf/2109.07944)
46. Tinjauan: untuk kosakata, banyak interaksi pendek lebih baik daripada satu sesi panjang; jeda membantu dibanding ulang segera. [tautan](https://arxiv.org/pdf/2109.07944)
47. Definisi riset: sesi mikro 30 detik-5 menit (sumber lain sampai 15 menit); satu studi memakai 6 pasangan kata × 10 detik (pilihan desain, bukan hasil uji). [tautan](https://www.gbl.uzh.ch/quartz/definitions/Microlearning)

Batas:
- Tak ada studi yang langsung menguji "ulang 3 kata sebelum jatuh tempo di HP".
- Tak ada ukuran kata/menit ideal dari uji terkontrol. Angka 3 kata dan 1-2 menit = usul kebiasaan app, bukan hasil studi.
- Reddit, Threads/X, dan ulasan toko tidak terbaca langsung; hanya lewat kutipan pihak ketiga.
- Pertanyaan "bikin balik lagi?" tak punya bukti langsung. Ukur di Keepo.

## 4. Vonis hipotesis
1. **H1 Ulang dini menaikkan ingatan kata: TERBUKTI SEBAGIAN.**
   - Mencoba mengingat (tes) terbukti membantu (41, 42).
   - Untuk kata yang belum waktunya, tambahannya kecil dan cepat luntur (2, 38-40).
   - Syarat: pengguna menjawab dari ingatan, bukan sekadar melihat arti.
2. **H2 Ulang cepat tanpa jadwal menaikkan kebiasaan balik: BELUM JELAS.**
   - Sesi pendek menaikkan jumlah sesi (44-46), tapi tak ada bukti kembali di hari berikut.
   - Data Keepo belum ada. Ukur lewat tombol ini sendiri.
3. **H3 Terasa berlebihan/menekan: TERBUKTI SEBAGIAN (bukan karena fiturnya, tapi karena tumpukan & pengulangan).**
   - Tekanan nyata dari tumpukan ulangan, streak, notifikasi (22, 23, 34-36).
   - Keluhan "dobel/berulang" nyata di app lain (24, 31, 32) dan di Keepo (Ilham, Sinta).
   - Ulang opsional pendek tanpa hitungan tak terbukti menekan (9-11: mayoritas bilang tak merusak).
4. **H4 Ulang bebas perlu nama dan aturan terpisah dari yang terjadwal: TERBUKTI.**
   - Semua app memisah: Extra Study, Review ahead, Practice, Classic Review (1, 9, 18, 25, 30).
   - Pertanyaan "ini merusak jadwal?" muncul berulang di WaniKani (9, 12, 13, 15). Jawaban jelas di layar mencegahnya.
   - Pilihan jadwal: WaniKani & Readlang tidak mengubah jadwal (14, 16); Anki mengubah dengan skala (2).
5. **H5 Sesi mikro ideal 3 kata / 1-2 menit: BELUM JELAS (condong benar sebagai batas praktis).**
   - Kisaran app: Memrise maks 20 (26), Readlang 30 (19), riset mikro 6 kata (47). Jauh di atas 3.
   - 3 kata tidak diuji. Aman: kecil adalah titik awal, lalu ukur.

## 5. Tabel label app lain
| App | Ulang terjadwal | Ulang bebas/dini | Mengubah jadwal? |
|---|---|---|---|
| Anki | kartu jatuh tempo | Custom Study → "Review ahead" | Ya, skala bertahap (2) |
| WaniKani | Reviews | "Extra Study" | Tidak (14) |
| Readlang | Practice (terjadwal) | Daftar Kata → Practice Flashcards | Ulang hari sama: tidak (16) |
| LingQ | "Due for Review" | Ulang dalam pelajaran | Status naik saat benar (20) |
| Memrise | Review terjadwal | "Classic Review", "Difficult Words" | Tidak jelas (25) |
| Duolingo | Practice di jalur | Practice Hub / ikon hati | Tidak jelas (28-30) |

Pola: ulang bebas diberi nama sendiri ("Extra", "Ahead", "Classic") dan dipisah dari yang terjadwal.

## 6. Usul untuk developer
- **Label & penjelasan:**
  - Kartu jatuh tempo tetap: "N kata siap diulang". Tombol dini: "Latihan ekstra · 3 kata".
  - Baris kecil: "Belum waktunya. Jadwal tidak berubah." Itu menjawab keluhan Sinta.
  - Hindari kata "Ulang" di dua tombol sekaligus.
- **Aturan tampil (hilangkan kesan dobel):**
  - Bila kata jatuh tempo ≥ 3: tampil hanya kartu "N kata siap diulang". Sembunyikan "Latihan ekstra".
  - Bila 1-2 jatuh tempo: satu tombol "Ulang 3 kata" dengan isi 1-2 jatuh tempo + pengisi.
  - Bila 0 jatuh tempo: "Latihan ekstra · 3 kata" (label di atas).
- **Batas jumlah & waktu:**
  - Maks 3 kata per putaran. Maks 1 ulang per kata Lupa/Ragu dalam latihan ekstra (bukan 2).
  - Teks waktu "±2 menit" sampai terukur. Setelah putaran: tawar "Cukup untuk sekarang", bukan tombol "3 lagi".
  - Maks 2 putaran ekstra per hari; setelah itu pesan ramah.
- **Urutan kata:**
  1. Jatuh tempo, paling lama dulu.
  2. Belum jatuh tempo: `lv` terendah dulu, lalu kata yang baru ditambahkan/dicek.
  3. Kecualikan kata yang dijawab dalam 24 jam terakhir (usul Sinta).
- **Efek jadwal (sederhana, ala WaniKani/Readlang):**
  - Kata belum jatuh tempo, jawab Hafal: `lv` dan `due` tidak berubah.
  - Jawab Lupa: turunkan `lv` dan `due` = sekarang (kesalahan tak boleh disembunyikan).
- **Ukur:** hitung lokal (`/hitung` bila ada): berapa orang menekan "Latihan ekstra", lalu H2 dan H7 mereka. Hanya untuk keputusan berikutnya.
- Jangan sentuh `api/`. Naikkan `C` di `sw.js`. Uji 320 dan 390px.

## Langkah berikutnya
- Developer: kerjakan backlog #156.
- PM: tambah metrik "tekan Latihan ekstra → balik H2" ke rencana ukur.
- Penguat: tanya 5 pengguna manusia apakah "Latihan ekstra" terasa jelas atau menekan.

Mockup: `docs/mockup-1412.html` (Gambaran rencana, belum dibangun).
