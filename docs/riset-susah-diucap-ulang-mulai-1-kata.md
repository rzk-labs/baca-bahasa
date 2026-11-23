# Riset #1747: nama tab "Susah diucap" & syarat 3 kata untuk Ulang

## Intinya
- "Susah diucap" isinya kata gagal skor ucapan, bukan kata sulit diingat. Namanya bikin salah kira.
- Kunci "Ulang 3 kata" hanya soal jumlah kata tersimpan. Tak ada alasan ingatan di baliknya.
- Pilihan: ganti nama jadi "Ucapan", dan Ulang boleh mulai dari 1 kata.

## 1. Kenapa penting
- Tahap 23 (Retensi Minggu Pertama): balik H2 ≥25%, H7 ≥10%. Tahap ini masih "awal".
- Sinta (pengguna AI, 23 Nov) kehilangan jalan latihan karena dua hal ini. Pengguna baru punya 1-2 kata.
- Ulang adalah alasan kembali besok. Kunci yang tak perlu bisa menahan kembali ke app.
- Catatan jujur: data nyata H2/H7 belum ada. Ini bukti internet + kode, bukan angka Keepo.

## 2. Hasil cek kode
- Segmen "Susah diucap" (`ui.js` ~3482) membaca `db.weak`: kata yang skor ucapan terakhirnya <85%.
- Kata masuk lewat tantangan Ngomong dan "Lawan kata" (`recordWeak`, ~3343). Tak ada hubungan dengan lupa kartu.
- Pesan setelah 3x gagal juga memakai nama itu (~3415).
- Kartu Home & Ulang (`quickPick`, ~3452) mengambil kata TERSIMPAN yang belum hafal. Bukan kata "susah".
- Kunci: `quickPick().length < 3` memunculkan kartu terkunci `q3Lock` (~1277) dan teks lencana (~1683).
- Kenapa 3: tugas #1377 dan riset ulang dini. Sesi mikro ±1 menit, dipilih sebagai batas praktis.
- Riset ulang dini sendiri menulis: 3 kata "usul kebiasaan, bukan hasil studi". Tak diuji.
- Riset itu juga sudah mengusulkan 1-2 kata jatuh tempo diisi pengisi. Tak ada aturan "wajib 3".

## 3. Bukti publik (42 butir, 5 jenis sumber)
Jenis: dokumentasi resmi, forum pengguna, ulasan/blog, studi, panduan UX.

**Penamaan daftar kata sulit**
1. Anki: "leech" = kartu yang terus dilupakan (lapse), bukan salah ucap. [manual](https://docs.ankiweb.net/manual/leeches)
2. Anki: ambang bawaan 8 lupa, bisa diubah. Sama manual.
3. Anki: leech itu tag; tangguhkan terpisah. [forum](https://forums.ankiweb.net/t/leech-should-be-a-property-of-the-card-not-the-note/40705)
4. Anki: peringatan ulang tiap setengah ambang. Manual yang sama.
5. Anki: forum menjelaskan arti "suspend" karena bingung. [forum](https://forums.ankiweb.net/t/what-does-it-mean-to-suspend-a-card-or-deck/14012.md)
6. Memrise: "Difficult words" = kata pernah salah + yang kamu tandai sendiri. [bantuan](https://explore.memrise.com/help)
7. Memrise: maks 20 kata per sesi, daftarnya tak terbatas. Sumber sama.
8. Memrise: pengucapan ditangani fitur lain (Pronunciation Buddy). [blog](https://www.memrise.com/blog/word-information-2025)
9. Memrise: ulasan bilang Difficult Words hanya berbayar. [FluentU](https://www.fluentu.com/blog/memrise-review/)
10. Duolingo: "Mistakes" = tinjau kesalahan; "Words" = kata rekomendasi. [blog](https://blog.duolingo.com/guide-to-duolingo-practice-hub/)
11. Duolingo: tombol "Practice weakest words" sudah dihapus. [wiki](https://duolingo.fandom.com/wiki/File:Strengthen-skills.png)
12. Duolingo: Words terus menampilkan kata awal yang sama (keluhan). [MetaFilter](https://ask.metafilter.com/375496/The-Duolingo-Practice-your-Words-feature-reviews-same-early-words)
13. Quizlet: progres = Belum, Masih belajar, Hafal. [bantuan](https://help.quizlet.com/hc/en-au/articles/360030988091-Studying-with-Flashcards)
14. Quizlet: bintang = penanda manual, sistem terpisah. [bantuan](https://help.quizlet.com/hc/en-ca/articles/360031172312-Studying-most-missed-terms-with-stars)
15. Quizlet: "Still learning/Know" di Flashcards = sistem ketiga. Sumber 13.
16. Readlang: kata berbintang muncul dulu di latihan. [forum](https://forum.readlang.com/t/learn-words-with-flashcards/54)

**Ukuran sesi / syarat jumlah minimal**
17. Pleco: hanya ada batas MAKS kartu per sesi, tak ada minimum. [manual](https://android.pleco.com/manual/310/flash.html)
18. Pleco: ada filter skor untuk memilih kartu lemah. Manual sama.
19. Pleco: pengguna minta sesi ukuran tetap, tak ada lantai. [forum](https://plecoforums.com/threads/ways-to-limit-flashcards-per-session.3635)
20. Readlang: sesi 8, 15, atau 25 kata. [ulasan](https://copycatcafe.com/blog/readlang-review)
21. Readlang: pesan "No New Cards", pengguna cari akal sendiri. [forum](https://forum.readlang.com/t/no-new-cards-in-practice/3142)
22. LingQ: Steve Kaufmann sarankan ulang maks 10, ideal 4-6. [forum](https://forum.lingq.com/t/lingq-flash-card-review-advice/38462)
23. LingQ: jumlah kartu per sesi bisa diatur pengguna. [panduan](https://www.lingq.com/en/learn-english-online/courses/135380/how-to-review-vocabulary-14384570/)
24. LingQ: pengguna memecah daftar jadi 10-an. [forum](https://forum.lingq.com/t/how-do-you-manage-your-lingqs/34294)
25. LingQ: pengguna batasi ulang ≤10% waktu belajar. [forum](https://forum.lingq.com/t/advice-for-a-lingq-beginner/32866)
26. Anki: deck kecil baru wajar hanya punya sedikit ulangan. [forum](https://forums.ankiweb.net/t/no-anki-cards-to-review/72587.md)
27. Anki: batas 20 kata baru/hari agar ulangan tak menumpuk. [FAQ](https://docs.ankiweb.net/faqs/anki-is-not-showing-me-all-my-cards.md)
28. Anki: "review ahead" tak cocok dipakai rutin. [manual](https://docs.ankiweb.net/filtered-decks.html)
29. Anki: "tak ada kartu" bisa benar, bukan galat. [forum](https://forums.ankiweb.net/t/anki-cuts-me-off-after-very-few-cards/70980.md)
30. Duolingo: sesi Mistakes menyebut jumlah jelas (contoh 10). [blog](https://blog.duolingo.com/ways-to-practice-in-duolingo)

**Fitur terkunci & UX**
31. Teardown onboarding: pengguna harus menebak apa yang terkunci. [Appfigures](https://appfigures.com/resources/videos/fixing-your-apps-onboarding-live-teardown)
32. Fitur terkunci sebelum merasakan nilai bikin frustrasi. Sumber sama.
33. Survei Clutch: >20% frustrasi oleh proses 30-60 detik. [Clutch](https://clutch.co/app-developers/resources/mobile-app-onboarding-survey-2017)
34. Pindahkan langkah tak esensial dari jalur aktivasi. [Userpilot](https://userpilot.com/blog/good-ux-examples/)
35. Sembunyikan fitur lanjutan sampai dasar dikuasai. [Yu-kai Chou](https://yukaichou.com/gamification-study/apollo-neuro-onboarding-audit-gamification/)
36. Beri langkah wajib vs boleh ditunda label jelas. Sumber 33.

**Studi: ucapan vs ingatan, kebiasaan**
37. Ellis & Beaton 1993: bunyi kata asing sebagian keterampilan motorik. [PDF](https://public.websites.umich.edu/~ncellis/NickEllis/Publications_files/Ellis%26BeatonLL1993.pdf)
38. Kata asing mudah naik-turun antara ingat dan lupa. [MDPI](https://www.mdpi.com/2226-471X/5/1/2)
39. Glossika: kartu kata tak menangkap sistem bunyi. [blog](https://ai.glossika.com/blog/the-problem-with-text-based-methods-and-vocabulary-memorization)
40. Fogg Tiny Habits: mulai sangat kecil, rayakan. [NPR](https://www.npr.org/transcripts/nx-s1-5675362)
41. Belum ada uji terkontrol protokol Tiny Habits. [McGill](https://www.mcgill.ca/tls/files/tls/tiny_habits.pdf)
42. Studi 2026: target mikro menaikkan aktivitas fisik. Bukan belajar. [City Univ.](https://openaccess.city.ac.uk/id/eprint/38301/1/Tiny%20is%20Mighty%20%20Investigating%20the%20Effect%20of%20Micro%20Goals%20on%20Physical%20Activity.pdf)

**Yang tak terbaca / tak ditemukan**
- Reddit, Threads/X, dan ulasan toko tak muncul di pencarian. Tak ada kutipan darinya.
- Tak ada sumber yang menguji nama "Susah diucap" atau ambang 1 vs 3 kata untuk kembali.
- Pencarian Speak/ELSA tak menemukan dokumentasi daftar kata salah-ucap. Itu celah.
- Butir 9, 12, 21, 25 hanya cerita pengguna. Bobotnya rendah.

## 4. Vonis hipotesis
- **H1 Nama "Susah diucap" menyesatkan: TERBUKTI SEBAGIAN (condong benar).**
  - Kode: isinya murni skor ucapan. Pengguna AI nyata (Sinta) salah kira.
  - Pesaing memisahkan "sulit diingat" (Anki leech, Memrise) dari pengucapan (Memrise).
  - Namun "diucap" sudah jujur; salahnya hanya "susah" terbaca sebagai "susah diingat". Satu pengguna AI, bukan manusia.
- **H2 Ulang boleh mulai dari 1 kata tanpa menurunkan kebiasaan: BELUM JELAS (condong benar).**
  - Pleco, Readlang, LingQ: ada batas maks, tak ada lantai.
  - Kunci tanpa alasan membuat frustrasi (butir 31-32). Tiny Habits mendukung, tapi tak teruji.
  - Risiko: sesi 1 kata terasa sepele. Ukur dulu setelah rilis.
- **H3 Kata ucapan dan kata lupa perlu dipisah atau diberi label: TERBUKTI SEBAGIAN.**
  - Pesaing memisahkan keduanya, tapi di Keepo "kata lupa" belum ada daftarnya sendiri.
  - Sekarang cukup label jelas. Daftar "sulit diingat" baru perlu bila ada data lupa yang cukup.

## 5. Opsi & pilihan
**Nama segmen**
- A. Tetap "Susah diucap" + subjudul "Skor ucapan di bawah 85%". Murah, tapi nama tetap salah arah.
- B. **"Ucapan"** + subjudul sama. Pendek, muat di 3 tombol, tak mengaku "susah ingat". ← DIPILIH
- C. "Salah ucap". Jelas, tapi terasa menghakimi untuk Gen Z.

**Ambang Ulang**
- 3 kata tetap: tak sesuai kebutuhan Sinta.
- Mulai 2 kata: masih mengunci pengguna 1 kata.
- **Mulai 1 kata, maks 3.** Label "Ulang 1 kata / 2 kata / 3 kata". ← DIPILIH
- Terkunci hanya bila 0 kata. Teksnya "Simpan 1 kata dulu".

**Yang tidak diubah**
- Isi daftar, skor 85%, jadwal ulang, dan Latihan ekstra tak berubah.
- Tak ada daftar "sulit diingat" baru sekarang. Cukup dicatat sebagai ide lanjutan.

## 6. Kriteria uji untuk developer
- Segmen ketiga di tab Kata berlabel "Ucapan". Subjudul di bawahnya: "Kata dengan skor ucapan di bawah 85%".
- Keadaan kosong: "Belum ada kata yang perlu dilatih ucapannya." Pesan setelah 3x gagal memakai kata "Ucapan".
- 0 kata tersimpan: kartu Home terkunci "Simpan 1 kata dulu". Belum ada Ulang.
- 1 kata: tombol "Ulang 1 kata". 2 kata: "Ulang 2 kata". 3+: "Ulang 3 kata".
- Teks lencana (`ui.js` ~1683) tak lagi menyebut "simpan 3 kata, buka Ulang 3 kata".
- Latihan ekstra & kata jatuh tempo tetap jalan sama seperti sebelumnya (uji 0, 1, 2, 3 kata).
- Uji 320px dan 390px, tema gelap. Naikkan versi `C` di `sw.js`.
- Ukur: berapa kali "Ulang 1/2 kata" ditekan, dan H2/H7 mereka. Sampel kecil, tulis rentang.

## 7. Langkah berikutnya
- Developer: backlog #184 (lihat roadmap).
- Mockup rencana: `docs/mockup-1747.html` (belum dibangun).
- Tahap 23 tetap "awal": aturan Fase 2 melarang naik tanpa data nyata.
