# Riset: Kartu ulang kata — ingat dulu, bukan asal Hafal (#1016)

(validasi bukti internet) Tanggal riset: 14 Nov 2026.

## Intinya
- Ingat dulu, baru lihat arti: terbukti lebih kuat daripada hanya membalik kartu.
- Ketik arti di HP terlalu berat. Pakai "ingat dulu → ketuk → nilai: Lupa / Ragu / Hafal".
- "Ulang sekarang" boleh jadi tombol pilihan. Jangan muncul sendiri saat membaca.

## 1. Kondisi sekarang (dicek di kode)
- Kartu (`deck()` di ui.js): depan hanya kata, teks "Tap buat liat artinya".
- Ketuk kartu = balik. Lalu pilih "Belum" atau "Hafal" (atau geser).
- Tidak ada langkah ingat/tebak. Pengguna bisa langsung menekan Hafal tanpa mikir.
- Hanya kata `isDue` yang tampil; kata baru disimpan baru jatuh tempo lagi nanti.
- Sudah dibahas riset lain: kalimat asal, pinyin, jadwal 1/3/7/21 hari. Tidak diulang di sini.
- Tidak ada tombol "ulang sekarang" untuk kata yang baru disimpan.

## 2. Masukan pengguna
- Pengguna nyata: "Kartu jangan asal klik hafal tapi harus ketikin artinya."
- Sinta (pengguna AI): tak ada tombol "ulang sekarang" dari kata yang baru disimpan.
- Nadia (pengguna AI): baca 6 halaman, simpan 0 kata. Dorongan menyimpan lemah.

## 3. Bukti (32 butir, 6 jenis sumber)
Catatan: butir diambil dari hasil pencarian web (ringkasan halaman). Reddit lewat cermin. Tidak semua halaman dibuka penuh.

### A. Studi: mengingat vs membaca ulang (hipotesis 1)
1. Studi kartu digital 2025 (Swahili–Mandarin): efek latihan mengingat bergantung jumlah putaran. [tautan](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12649105/)
2. Frontiers 2023: latihan mengingat pada kosakata asing, efeknya diuji lintas konteks. [tautan](https://www.frontiersin.org/articles/10.3389/fcogn.2023.1258955)
3. MDPI 2025: ulasan latihan mengingat vs belajar ulang pada kartu bahasa. [tautan](https://www.mdpi.com/2076-328X/15/11/1540)
4. Springer 2021: latihan mengingat + mnemonik; efek tes muncul setelah empat putaran. [tautan](https://link.springer.com/article/10.3758/s13421-021-01236-4)
5. Tesis Utrecht: murid SMP memakai lebih banyak kata target setelah mengingat dulu. [tautan](https://utrecht-theses9-test.atmire.com/items/b0b98c07-9051-4a94-99d5-ca7e5f826a5e)
6. Ringkasan meta-analisis (blog): tes mengalahkan belajar ulang, d ≈ 0,5. Belum dicek ke asli. [tautan](https://www.mindomax.com/the-testing-effect)
7. Studi Springer 2019: tidak semua kondisi menunjukkan selisih; syarat tes memengaruhi. [tautan](https://link.springer.com/content/pdf/10.3758/s13421-019-00936-2.pdf)
8. Karpicke 2007: mengingat bertahap; jarak sama unggul setelah 2 hari. [tautan](https://Www.Gwern.net/doc/psychology/spaced-repetition/2007-karpicke.pdf)

### B. Studi: menebak dulu, menilai diri, jenis tugas (hipotesis 1 & 2)
9. Seabrooke 2021: menebak arti sebelum jawaban muncul membantu, walau tebakan salah. [tautan](https://link.springer.com/article/10.3758/s13421-021-01218-6)
10. Studi Plymouth/Southampton: menebak dulu meningkatkan pengenalan jawaban. [tautan](https://pearl.plymouth.ac.uk/bitstream/handle/10026.1/14653/tpl-motivation-accepted.pdf?sequence=1)
11. Kornell & Bjork 2008: pelajar membuang kartu yang merasa sudah tahu; hasilnya lebih lemah. [tautan](https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Kornell_Bjork_2008_Memory.pdf)
12. ScienceDaily 2007: laporan studi yang sama, pelajar menilai diri terlalu cepat. [tautan](https://sciencedaily.com/releases/2007/11/071126162526.htm)
13. Ulasan kalibrasi: mengingat sebelum membaca ulang membuat keyakinan lebih akurat. [tautan](https://www.structural-learning.com/post/illusion-of-knowing-calibration)
14. Studi tablet SD Prancis (Van Hove 2017): mengetik/menulis unggul untuk ejaan & aksen vs pilihan ganda. [tautan](https://scipedia.com/public/Van-Hove_et_al_2017a)
15. Makalah yang sama: pilihan ganda hanya mengenali, bukan menghasilkan jawaban. [tautan](https://revistacomunicar.com/pdf/50/c5005en.pdf)
16. Ulasan Quizzes (NUS): tugas pengenalan kurang efektif jangka panjang dari tugas mengingat. [tautan](https://e-flt.nus.edu.sg/v17n22020/platzer.pdf)
17. Catatan balik: waktu tugas ikut menentukan hasil; pilihan ganda lebih cepat (makalah Van Hove).

### C. Forum & Reddit: pengguna kartu (hipotesis 1 & 2)
18. r/languagelearning: pengguna membuat kartu ketik jawaban; membantu mengetik Korea cepat. [tautan](https://redlib.hyperreal.coffee/r/languagelearning/comments/1jqegai/flashcards_but_to_write/ml6w9bl/?context=3)
19. Forum Anki: bagaimana memaksa mengetik jawaban benar sebelum lanjut. [tautan](https://forums.ankiweb.net/t/is-there-any-method-to-force-correct-answer-typing-before-proceeding-to-next-card/67006.md)
20. Forum Anki: kartu gaya tes kosakata dengan ejaan persis. [tautan](https://forums.ankiweb.net/t/how-to-create-a-vocabulary-testing-style-card-with-non-voluntary-result-evaluation/10629.md)
21. r/LearnJapanese: "Be honest with yourself when you mark the reviews." [tautan](https://lr.in.psf.lt/r/LearnJapanese/comments/1jczk2w/daily_thread_simple_questions_comments_that_dont/mi8fjjj/?context=3)
22. r/LearnJapanese: hanya melirik kartu lalu menekan "good" = pengenalan, bukan mengingat. [tautan](https://lr.in.psf.lt/r/LearnJapanese/comments/1jczk2w/daily_thread_simple_questions_comments_that_dont/mi95i82/?context=3)
23. r/LearnJapanese: pengguna hampir selalu membalik sebelum timer auto-flip habis. [tautan](https://reddit.birdcat.cafe/r/LearnJapanese/comments/1ih45a9/daily_thread_simple_questions_comments_that_dont/mb0dso7)
24. r/LearnJapanese: butuh bantuan audio = anggap kartu gagal. Aturan nilai diri yang jelas. [tautan](https://reddit.rtrace.io/r/LearnJapanese/comments/1cd0yvl/tired_of_forgetting_words_try_my_ironclad_method)
25. Anki: ada templat bawaan "ketik jawaban" yang menunjukkan selisih. [tautan](https://docs.ankiweb.net/getting-started)

### D. LingQ & Readlang: ulang saat membaca (hipotesis 3 & 4)
26. Forum LingQ: tak mau memutus alur baca untuk ubah status tiap kata. [tautan](https://forum.lingq.com/t/how-does-lingq-status-change-while-reading/36909)
27. Forum LingQ: saran tunggu sampai kalimat selesai dibaca sebelum menilai kata. [tautan](https://forum.lingq.com/t/how-does-lingq-status-change-while-reading/36909)
28. Forum LingQ: ulas segera setelah lihat konteks; maks 10 kartu sekali duduk. [tautan](https://forum.lingq.com/t/lingq-flash-card-review-advice/38462)
29. LingQ: mode "Integrated Review" mengulang antar halaman, sebagai pilihan. [tautan](https://forum.lingq.com/t/integrated-review-sentence-view-and-hard-core-challenges/5557)
30. Readlang: kata tersimpan dengan kalimat asal; latihan terpisah dari teks. [tautan](https://forum.readlang.com/t/words-dont-stay-highlighted-translated/2957)

### E. Ulang segera vs tunda (hipotesis 3)
31. Studi kelas Kanada: ulang seminggu kemudian jauh lebih kuat dari ulang segera (20,8% vs 7,5%). [tautan](https://www.uvic.ca/humanities/germanicslavic/assets/docs/07SchuetzeWeimer-Stuckmann-1.pdf)
32. Studi retrieval: ulang segera bantu jangka pendek (10 menit), jarak sama unggul di hari ke-2. [tautan](https://www.doi.org/10.3758/s13423-014-0636-z)

### F. Gen Z & alur baca (hipotesis 4)
33. Kindle: ketuk kata, lihat arti, lanjut baca. "No diversions, no distractions." [tautan](https://bookriot.com/looking-up-words-while-reading/)
34. Kindle: kata masuk Vocabulary Builder otomatis; kuis dilakukan di luar buku. [tautan](https://www.fluentu.com/blog/kindle-foreign-language-dictionary/)
35. Trustpilot Duolingo: keluhan paksaan streak dan latihan berulang. [tautan](https://uk.trustpilot.com/review/duolingo.com?page=4)
36. Android Authority: mayoritas pembaca merasa terdampak negatif oleh perombakan kursus. [tautan](https://androidauthority.com/duolingo-course-updates-poll-results-3690803)

Jumlah: 36 butir; jenis: studi (jurnal/tesis), Reddit (cermin), forum produk (Anki, LingQ, Readlang), dokumen produk, ulasan/berita, blog.
Batas:
- Tak ada studi langsung "Hafal 3 tombol di HP". Ini inferensi.
- Butir 17 mengacu makalah di butir 14–15, bukan tautan baru; hitung 35 tautan unik.
- Tak ada bukti langsung Gen Z soal kuis di tengah baca (hanya perilaku Kindle & keluhan umum).

## 4. Vonis hipotesis
1. **H1 Mengingat dulu menaikkan retensi vs hanya membalik: TERBUKTI.**
   - Studi (1–8) konsisten; efek makin kuat dengan beberapa putaran.
   - Syarat: pengguna sungguh mencoba. Kartu Keepo sekarang tidak memaksa itu (22, 23).
2. **H2 Ketik arti terlalu berat di HP; "tebak dulu" lebih ringan: BELUM JELAS (condong terbukti).**
   - Mengetik unggul untuk ejaan (14, 15), tapi bukti beban HP hanya inferensi.
   - Menebak dulu + nilai diri memberi sebagian manfaat (9, 10, 13); risiko menilai diri terlalu cepat (11, 12).
   - Pilihan 1 dari 3: tidak dipilih, hanya mengenali (15, 16).
3. **H3 Ulang segera setelah simpan: BELUM JELAS.**
   - Bantu jangka pendek (31, 32), kalah jangka panjang bila jadi satu-satunya ulang.
   - Pengguna menginginkannya (Sinta) dan LingQ menyediakannya sebagai pilihan (29).
   - Jadi: boleh sebagai pilihan, tidak boleh mengganti jadwal 1/3/7/21.
4. **H4 Gen Z menolak latihan yang memutus alur baca: TERBUKTI SEBAGIAN.**
   - Bukti tak langsung kuat: pengguna LingQ menolak memutus alur (26, 27), Kindle tanpa gangguan (33, 34).
   - Tak ada studi Gen Z khusus. Ulang saat membaca harus pilihan, bukan otomatis.

## 5. Rekomendasi untuk developer
### Bentuk interaksi kartu: "Ingat dulu" (tanpa ketik)
- Depan: kata + teks "Coba ingat artinya dulu". Tombol utama: "Lihat arti".
- Setelah dibuka: tiga tombol "Lupa", "Ragu", "Hafal". Tidak ada tombol Hafal sebelum arti dibuka.
- Geser kanan/kiri lama dimatikan di sisi depan; di sisi belakang tetap boleh (kanan = Hafal, kiri = Lupa).
- Jangan ketik arti. Jangan pilihan 1 dari 3. Pengaturan "Ketik arti" bisa jadi usulan nanti.

### Teks tombol dan efek jadwal
- "Lupa": `lv = 0`, `due` = sekarang (sama seperti "Belum" sekarang).
- "Ragu": `lv` tetap, `due` = besok (1 hari). Pesan: "Besok muncul lagi".
- "Hafal": naik tingkat seperti sekarang (1/3/7/21 hari).
- Ganti petunjuk bawah: "Ingat dulu, baru buka · geser kanan = hafal, kiri = lupa".
- Pesan setelah Hafal tetap: "Mantap! Muncul lagi {d} hari ke depan".

### "Ulang sekarang" (kecil, pilihan)
- Tombol "Ulang sekarang" di lembar arti kata setelah kata disimpan: tidak. Terlalu memutus baca.
- Letakkan di tab Kata, segmen Kartu, bila ada ≥3 kata disimpan hari ini: "Ulang {n} kata baru".
- Deck ini maks 10 kata, hanya kata disimpan hari ini; jawaban tak mengubah `lv`/`due`.
- Layar akhir: "Beres. Kata ini tetap muncul sesuai jadwal."
- Tidak ada push, tidak ada popup saat membaca.

### Batas satu tugas developer
- Sentuh: `ui.js` (`deck()`), `style.css`, `sw.js` (naikkan `C`).
- Tanpa data baru, tanpa migrasi, jangan sentuh `api/`.
- Kriteria uji: Hafal tak bisa ditekan sebelum "Lihat arti"; Ragu → besok; Lupa → hari ini.
- Kriteria uji: deck "Ulang kata baru" tak mengubah `lv`/`due`; `node --check ui.js` lolos.
- Lebar 360px rapi; tiga tombol muat satu baris.

## 6. Langkah berikutnya
- Developer: kerjakan backlog #100.
- Ukur lokal: berapa kartu dinilai "Ragu" dan "Lupa" vs sebelum.
- Penguat nanti: tanya 5 pengguna apakah tiga tombol terasa lebih jujur.

Mockup: `docs/mockup-1016.html` (Gambaran rencana, belum dibangun).
