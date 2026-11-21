# Riset: Kartu latihan kata, kalimat asal, pinyin depan, pengingat (#955)

(validasi bukti internet) Tanggal riset: 14 Nov 2026.

## Intinya
- Kalimat asal sudah ada di belakang kartu. Pemicunya: kartu depan polos, Home diam.
- Satu fitur terkecil paling berdampak: penanda "N kata siap diulang" di Home.
- Pinyin depan: bukti campur. Jadikan pilihan opsional, bukan bawaan.

## 1. Kondisi sekarang (dicek di kode)
- Kalimat asal disimpan: `s` dan `ctx` di tiap kata (ui.js, `ctxOf`).
- Kartu belakang menampilkan kalimat itu (ui.js `deck()`, kelas `.fs`).
- Gagal hanya untuk kata tambahan manual: `s: ''`, jadi tak ada kalimat.
- Kartu depan hanya kata. Cara baca baru muncul setelah dibalik.
- Cara baca belakang ikut setelan `showBaca`; bila mati, ada tombol "Lihat cara baca".
- Penanda jatuh tempo hanya di tab Kata ("N kata siap diulas"). Home tidak.
- Batas `DECK_MAX = 20` per sesi. Layar akhir bilang "Sisa kartu muncul lagi", tanpa jumlah.
- Pesan jadwal: "Muncul lagi 3 hari lagi" (kata "lagi" dobel).

## 2. Bukti (30+ butir, 4+ jenis sumber)
Catatan: Reddit asli tak bisa dibuka langsung. Dipakai cermin Reddit, forum, studi, blog, ulasan.

### A. Kartu kalimat vs kartu kata
1. r/LearnJapanese (cermin): >10.000 kartu kata, kini lebih suka kartu kalimat. [tautan](https://reddit.rtrace.io/r/LearnJapanese/comments/1dxn6rp/realistic_anki_statistics_almost_15000_cards/lc5b3fh/?context=3)
2. r/Anki: belajar kalimat ikut mengajar tata bahasa. [tautan](https://redlib.shreven.org/r/Anki/comments/1g40v1r/is_learning_vocabulary_in_context_the_best/ls2rcnu/?context=3)
3. r/Anki: kartu kalimat membantu latihan, tapi ingat kata lepas bisa turun. [tautan](https://reddit.zackpollard.pro/r/Anki/comments/18ii5c6/a_conceptual_problem_with_using_anki_with)
4. Komentar pengguna: baca kalimat makan waktu, kartu kata cepat tapi sulit melekat. [tautan](https://cal1.lr.ggtyler.dev/r/LearnJapanese/comments/1kcnhdw/daily_thread_simple_questions_comments_that_dont/mqaf096/?context=3)
5. Jalan tengah: kalimat dengan kata target ditebalkan. [tautan](https://mikumino.neocities.org/blog/deciding-on-a-card-type)
6. Forum WaniKani: diskusi jenis kartu, banyak yang gabung kata + kalimat. [tautan](https://community.wanikani.com/t/lets-discuss-flashcard-types/50144)
7. Forum WaniKani: cara menyisipkan kalimat ke kebiasaan belajar. [tautan](https://community.wanikani.com/t/how-do-you-incorporate-sentences/32432)
8. Forum Anki: desain kartu kosakata; kalimat sebagai konteks tambahan. [tautan](https://forums.ankiweb.net/t/question-about-vocabulary-card-design/39744)
9. Chinese-Forums: refleksi 5 tahun Anki harian, kartu berkonteks bertahan. [tautan](https://chinese-forums.com/forums/topic/63123-reflections-on-5-years-of-daily-anki)
10. Studi PMC 2022: latihan mengingat dalam kalimat lebih baik dari sekadar menebak arti. [tautan](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9285746/)
11. Studi PMC yang sama: latihan mengingat kata lepas (kartu) tetap terbukti membantu. [tautan](https://pmc.ncbi.nlm.nih.gov/articles/PMC9285746)
12. Studi kecil SMA Indonesia: kata lepas diingat lebih baik. Berlawanan, bobot rendah. [tautan](https://ejournal.uin-malang.ac.id/index.php/humbud/article/download/1460/2548)
13. Clozemaster: kartu kata tunggal kurang konteks (blog vendor, klaim angka tak terverifikasi). [tautan](https://www.clozemaster.com/blog/problem-with-single-word-flashcards-context-critical-in-language-learning/)
14. Clozemaster: sentence mining, kalimat asal membantu melekat (blog vendor). [tautan](https://clozemaster.com/blog/sentence-mining)
15. Migaku: panduan Anki untuk bahasa; kartu kalimat otomatis dengan audio & gambar (vendor). [tautan](https://migaku.com/blog/japanese/anki-language-learning-guide)
16. LingQ: kartu dibuat dari definisi dan konteks tempat kata dipilih. [tautan](https://forum.lingq.com/t/lingq-flash-card-review-advice/38462)
17. LingQ: depan/belakang kartu bisa diatur pengguna. [tautan](https://forum.lingq.com/t/lingq-flash-card-review-advice/38462)
18. LingQ: ada review mode kalimat (iOS) untuk kata dalam kalimat. [tautan](https://forum.lingq.com/t/reviewing-lingqs/26616)
19. Readlang: kata yang dicari jadi kartu otomatis. [tautan](https://forum.readlang.com/t/learn-words-with-flashcards/54)
20. Forum Readlang: pengguna minta kalimat konteks tampil lebih jelas di latihan. [tautan](https://forum.readlang.com/t/my-suggestions-on-the-context-aware-explanation-feature/3146)
21. Ulasan Readlang: algoritma memunculkan kata di waktu yang pas. [tautan](https://www.mezzoguild.com/readlang-review/)

### B. Pinyin di depan kartu
22. r/ChineseLanguage: jangan taruh pinyin di depan; pinyin untuk lafal. [tautan](https://reddit.sudovanilla.org/r/ChineseLanguage/comments/1js6i46/anki_advice)
23. r/Anki: pinyin depan kurang berguna setelah menengah (banyak homofon). [tautan](https://reddit.birdcat.cafe/r/Anki/comments/1l6m3vo/do_threesided_flashcards_exist_or_is_my_idea_just)
24. Chinese-Forums: depan hanzi+pinyin cocok untuk baca/dengar. [tautan](https://chinese-forums.com/forums/topic/50508-flashcards-configuring-the-show-card-whats-most-effective)
25. Hacking Chinese: bawaan Anki menaruh pinyin di depan. [tautan](https://hackingchinese.com/?p=10098)
26. Forum LingQ: pengguna minta pinyin tampil untuk LingQ. [tautan](https://forum.lingq.com/t/display-pinyin-for-lingqs/24696)
27. Pleco Forums: ada pengguna yang menyembunyikan pinyin untuk uji nada. [tautan](https://plecoforums.com/threads/hide-pinyin-on-flashcard-tone-testing.5057/latest)
28. Deck HSK1 (AnkiWeb): belakang kartu berisi pinyin; ulasan bilang kartu kalimat-dulu sulit untuk pemula. [tautan](https://ankiweb.net/shared/info/2024475494)
29. Migaku: pemula pakai pinyin, lalu pindahkan ke belakang agar kenal karakter. [tautan](https://migaku.com/blog/chinese/best-chinese-anki-decks)

### C. Jatuh tempo, batas deck, pengingat
30. Manual Anki: batas ulasan menyembunyikan kartu, bukan menghapus. [tautan](https://faqs.ankiweb.net/the-2021-scheduler.html)
31. Forum Anki: batas rendah hanya menyembunyikan kartu jatuh tempo. [tautan](https://forums.ankiweb.net/t/adressing-backlog/43842/2)
32. Forum Anki: saat menumpuk, hentikan kartu baru dulu. [tautan](https://forums.ankiweb.net/t/adressing-backlog/43842/2.md)
33. Forum Anki: jumlah jatuh tempo bisa terus tumbuh tanpa batas. [tautan](https://forums.ankiweb.net/t/if-there-is-no-retirement-threshold-number-of-due-cards-will-grow-to-infinity/69588)
34. Aplikasi pengingat ulasan (SnapVerbo): lencana jumlah jatuh tempo + pengingat. [tautan](https://snapverbo.pages.dev/guide/how-to/daily-review-habit/)
35. Memorep: email harian kartu jatuh tempo (Product Hunt). [tautan](https://www.producthunt.com/p/memorep/never-miss-a-review-again-memorep-now-sends-daily-email-reminders-for-your-due-flashcards)
36. Duolingo: Practice Hub menyuruh ulas kata di waktu tertentu. [tautan](https://blog.duolingo.com/guide-to-duolingo-practice-hub/)
37. MetaFilter: "Practice your Words" mengulang kata awal yang sama. [tautan](https://ask.metafilter.com/375496/The-Duolingo-Practice-your-Words-feature-reviews-same-early-words)
38. Ulasan Duolingo: pengingat agresif membuat pengguna merasa gagal. [tautan](https://www.universityxp.com/news/2025/7/25/we-havent-seen-you-in-a-while-duolingos-passive-aggressive-strategy-for-keeping-users-hooked)
39. Berita 2026: Duolingo menambah pelajaran kejar-ketinggalan setelah keluhan. [tautan](https://piunikaweb.com/2026/04/02/duolingo-adding-catch-up-lessons-after-course-update-complaints/)
40. Saran Kaufmann (LingQ): ulas segera, batch kecil 6-10 kata. [tautan](https://forum.lingq.com/t/lingq-flash-card-review-advice/38462)
41. Riset internal: pengingat naikkan baca, push di Safari biasa gugur. docs/riset-pengingat-baca-pwa.md

Jumlah: 41 butir, jenis sumber: Reddit (cermin), forum produk (LingQ, Readlang, Anki, WaniKani, Pleco, Chinese-Forums), studi, blog/ulasan, dokumen resmi.
Batas: tak ada uji terkontrol soal pengingat; pesan Reddit lewat cermin; ulasan toko tak terbaca.

## 3. Vonis hipotesis
1. **H1 Pinyin opsional di depan kartu Mandarin: BELUM JELAS (condong sebagian).**
   - Ahli bilang jangan bawaan (22, 23, 29). Pemula nyata butuh (24, 26, 28).
   - Jalan aman: pilihan opsional per pengguna, bawaan mati.
2. **H2 Kalimat asal menolong ingat arti: TERBUKTI SEBAGIAN.**
   - Studi dan banyak forum mendukung (1, 2, 10, 16). Ada pendapat berlawanan (3, 4, 12).
   - Di Keepo sudah ada di belakang kartu. Celah: kata tanpa kalimat, dan kalimat belum tampil di depan.
3. **H3 Penanda jatuh tempo di Home menolong balik: TERBUKTI SEBAGIAN.**
   - Aplikasi sejenis pakai lencana/hitungan (34, 35, 36). Efek ke kebiasaan belum diuji kontrol.
   - Pengingat agresif merugikan (38). Penanda pasif aman.
4. **H4 Batas 20 kartu tanpa kabar sisa membingungkan: TERBUKTI SEBAGIAN.**
   - Batas menyembunyikan, bukan menghapus (30, 31). Pengguna perlu tahu sisa (32, 33).
5. **H5 Pengingat push perlu: GUGUR untuk sekarang.**
   - Safari biasa tak mendukung (41). Pengguna sering terganggu (38).

## 4. Kesimpulan & urutan kecil
1. **Fitur 1 (spesifikasi di bawah):** penanda "N kata siap diulang" di Home + kabar sisa kartu.
2. Fitur 2: kalimat asal di depan kartu (opsional) + tombol "Tampilkan kalimat" bila kosong.
3. Fitur 3: setelan "Pinyin di depan kartu" (bawaan mati, hanya Mandarin).
- Alasan urutan: fitur 1 kecil, tanpa risiko data, menjawab dua keluhan sekaligus.
- Kalimat asal (keluhan 2) sebagian sudah ada; tak perlu dibangun ulang.

## 5. Spesifikasi siap-dev: "Kata siap diulang" di Home (fitur 1)

### Aturan tampil
- Hitung `n = db.vocab.filter(isDue).length` (aturan `isDue` sudah ada di ui.js).
- Home: bila `n >= 1`, tampil satu baris/kartu kecil di atas daftar. Bila `n == 0`, tidak tampil.
- Ketuk baris: buka tab Kata, segmen Kartu (`kataSeg = 'kartu'`, lalu `setTab('kata')`).
- Tanpa push, tanpa suara, tanpa angka merah/mengancam. Tidak ada streak.
- Layar akhir deck: bila `n > 0` setelah 20 kartu, tampilkan jumlah sisa.

### Teks UI (santai)
- Home, n=1: "1 kata siap diulang"
- Home, n>1: "{n} kata siap diulang"
- Tombol/ketuk: "Ulas sekarang"
- Akhir deck, ada sisa: "Sesi beres. Masih ada {n} kata, muncul lagi pas kamu balik."
- Akhir deck, tanpa sisa: teks lama tetap.
- Perbaiki pesan: "Muncul lagi {d} hari lagi" jadi "Muncul lagi {d} hari ke depan".

### File yang disentuh
- `ui.js`: render Home (baris penanda), `deck()` (teks sisa, pesan jadwal).
- `style.css`: gaya baris kecil, ikuti BRAND.md v9 (muted, tanpa warna alarm).
- `app.js`: tidak perlu; boleh pindahkan `isDue` bila dipakai bersama.
- `sw.js`: naikkan versi `C` (file ter-cache berubah).
- Jangan sentuh `api/` dan format IndexedDB (tidak ada data baru).

### Kriteria uji
1. Ada 5 kata jatuh tempo: Home menampilkan "5 kata siap diulang".
2. Ketuk baris: terbuka tab Kata, segmen Kartu, kartu pertama tampil.
3. Semua kata hafal/belum jatuh tempo: baris tidak tampil.
4. 25 kata jatuh tempo, selesaikan 20: layar akhir bilang masih ada 5.
5. Kata yang ditandai `known` tidak dihitung.
6. HP lebar 360px: baris tak patah jelek; layar lebar tetap rapi.
7. Pengguna lama tanpa `due`: tidak error; `node --check ui.js` lolos.

## 6. Langkah berikutnya
- Developer: kerjakan backlog #93 (fitur 1).
- Sesudahnya: PM/riset ulas fitur 2 (kalimat depan) dan 3 (pinyin depan, opsional).
- Penguat nanti: tanya pengguna Mandarin pemula soal pinyin depan.
