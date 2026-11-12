# Riset: tandai kata "sudah kenal" agar halaman baca tak ramai

Tugas #502 · Peran riset · Status: selesai (validasi bukti internet)

## Intinya
- Pembaca mau cara cepat bilang "kata ini sudah kenal", tanpa buka kamus.
- Tanda otomatis (LingQ: pindah halaman = kenal) disukai, tapi sering salah dan susah dibatalkan.
- Hitungan "kata baru" per buku terbukti dipakai untuk memilih bacaan; ideal 10-20%.

## 1. Keadaan Keepo sekarang (baca kode)
- Hanya kata yang DISIMPAN yang disorot (`.saved`, ui.js 604 & 612). Kata baru tak disorot.
- Kata "hafal" (`v.known`) berasal dari kartu ulang, bukan dari tombol "sudah kenal".
- Kata yang diketuk tapi tak disimpan tidak punya status. Jadi tak ada cara bilang "kenal".
- Akibat: bab berikutnya bisa penuh sorotan kata lama. Belum ada ukuran "kata baru per halaman".
- Tidak duplikat dengan: riset-bantuan-arti-bertahap (arti kata vs kalimat), riset-validasi-solusi-ketuk-kata (ketuk 1 langkah), riset-level-buku (persen kata baru saat impor).

## 2. Tabel bukti
Kode: F = forum LingQ, R = forum/blog Readlang, D = dokumen bantuan LingQ, S = studi terbit, B = blog ulasan. "Kutip" = kalimat asli dari halaman; "Ringkas" = dari ringkasan mesin pencari (belum dibaca langsung).

| # | Sumber | Bukti | Tautan |
|---|---|---|---|
| 1 | F | khardy: "There are too many blue words, and because of their number the context may be unclear." | [Which words to make yellow?](https://forum.lingq.com/t/which-words-to-make-yellow/25815) |
| 2 | F | Thermomixer: "I found difficulty once I marked words as “Known”" | [Which words to make yellow?](https://forum.lingq.com/t/which-words-to-make-yellow/25815) |
| 3 | F | Miznia soal menandai kenal terlalu cepat: "once I do that I may not notice it again…" | [Which words to make yellow?](https://forum.lingq.com/t/which-words-to-make-yellow/25815) |
| 4 | F | Ringkas: "once you feel there are too many yellow words on your page you can always mark them Known" | [Which words to make yellow?](https://forum.lingq.com/t/which-words-to-make-yellow/25815) |
| 5 | F | frank354: "Is there any way to mark multiple words or even complete texts as known?" | [Marking multiple words at once](https://forum.lingq.com/t/marking-multiple-words-at-once-as-known/27963) |
| 6 | F | zoran: setelan "Paging moves to known" menandai kata biru jadi kenal saat pindah halaman | [Marking multiple words at once](https://forum.lingq.com/t/marking-multiple-words-at-once-as-known/27963) |
| 7 | F | zoran: selesai pelajaran = "all the words from a lesson will be marked as known automatically" | [Marking multiple words at once](https://forum.lingq.com/t/marking-multiple-words-at-once-as-known/27963) |
| 8 | F | LingQFog: "the app is telling me I know all the words just because I turned a page." | [Paging moves to known](https://forum.lingq.com/t/paging-moves-to-known-and-no-feature-to-remove-known-words/519792) |
| 9 | F | Pr0metheus: "LingQ is all about speed of reading, and 'Paging moves to known' facilitates that." | [Paging moves to known](https://forum.lingq.com/t/paging-moves-to-known-and-no-feature-to-remove-known-words/519792) |
| 10 | F | WillowMeDown: terjadi pada "basically everyone", "a feature, not a bug" | [Paging moves to known](https://forum.lingq.com/t/paging-moves-to-known-and-no-feature-to-remove-known-words/519792) |
| 11 | F | BasketQase: "it's not an intuitive system, especially for newcomers." | [Paging moves to known](https://forum.lingq.com/t/paging-moves-to-known-and-no-feature-to-remove-known-words/519792) |
| 12 | F | LingQFog: saat tak dijelaskan, "there were only tedious solutions." | [Paging moves to known](https://forum.lingq.com/t/paging-moves-to-known-and-no-feature-to-remove-known-words/519792) |
| 13 | F | Cantagorous (usul konfirmasi sebelum asumsi kenal): "This suggestion is so common-sense…" | [Finish Lesson: why assume…](https://forum.lingq.com/t/finish-lesson-why-assume-un-clicked-words-are-known/110052) |
| 14 | F | Petr845 minta dialog konfirmasi: tombol Selesai mudah tersentuh tak sengaja | [Finish Lesson: why assume…](https://forum.lingq.com/t/finish-lesson-why-assume-un-clicked-words-are-known/110052) |
| 15 | F | gbonnema: tim butuh "a lot of convincing" untuk menambah sakelar | [Finish Lesson: why assume…](https://forum.lingq.com/t/finish-lesson-why-assume-un-clicked-words-are-known/110052) |
| 16 | F | michael214: web app "has marked all unsorted words as known ones." | [All unsorted words made known](https://forum.lingq.com/t/all-unsorted-words-were-made-known-ones-how-to-fix-this/2620925) |
| 17 | F | ZayaFTW: "This has happened to me before as well." | [All unsorted words made known](https://forum.lingq.com/t/all-unsorted-words-were-made-known-ones-how-to-fix-this/2620925) |
| 18 | F | michael214: "Now I mark unknown words immediately, but it distracts from quick reading." | [All unsorted words made known](https://forum.lingq.com/t/all-unsorted-words-were-made-known-ones-how-to-fix-this/2620925) |
| 19 | F | mark (staf): "it’s just not that easy to add an undo feature." | [All unsorted words made known](https://forum.lingq.com/t/all-unsorted-words-were-made-known-ones-how-to-fix-this/2620925) |
| 20 | F | mrfrosty: "I can’t simply mark a word as known without first LingQing it" | [LingQing known words…](https://forum.lingq.com/t/lingqing-known-words-taking-up-reading-enjoymenttime/385984) |
| 21 | F | ericb100: tombol 4 menambah LingQ level 4 dengan arti teratas (jalan pintas lewat papan ketik) | [LingQing known words…](https://forum.lingq.com/t/lingqing-known-words-taking-up-reading-enjoymenttime/385984) |
| 22 | F | nfera: "Making lingQs, choosing the best meaning from a list or writing them is a complete waste of time." | [LingQing known words…](https://forum.lingq.com/t/lingqing-known-words-taking-up-reading-enjoymenttime/385984) |
| 23 | F | ekaerovets: "I don't want them to get marked automatically as known and spoil my statistics." | [Words not ready to learn](https://forum.lingq.com/t/how-to-deal-with-words-im-not-ready-to-learn-yet/26719) |
| 24 | F | khardy: bila tak mau kenal/LingQ, abaikan kata (tombol "x") | [Words not ready to learn](https://forum.lingq.com/t/how-to-deal-with-words-im-not-ready-to-learn-yet/26719) |
| 25 | F | LILingquist: "If you know the word, mark it as known; if you don't know the word/phrase, make it a LingQ." | [Words not ready to learn](https://forum.lingq.com/t/how-to-deal-with-words-im-not-ready-to-learn-yet/26719) |
| 26 | F | anon97967424 minta mode baca ekstensif: "The remaining words turn into blank lingqs when paging." | [Extensive reading mode](https://forum.lingq.com/t/extensive-reading-mode/30322) |
| 27 | F | anon97967424: salin arti sama 5-10 kali per pelajaran, "I feel it brakes the flow." | [Extensive reading mode](https://forum.lingq.com/t/extensive-reading-mode/30322) |
| 28 | F | Jamie: LingQ dinaikkan ke level 4 terlalu cepat "would be forgotten again just as quickly." | [Too many LingQs?](https://forum.lingq.com/t/too-many-lingqs/5737) |
| 29 | F | SanneT: "I tend to get fazed by too many LingQs in the daily e-mail." | [Too many LingQs?](https://forum.lingq.com/t/too-many-lingqs/5737) |
| 30 | F | Josu88: "the program shows me many new words which are actually known words." | [New words in imported lessons](https://forum.lingq.com/t/problem-with-new-words-in-imported-lessons/19280) |
| 31 | F | craigandrianos: "the sweet spot is somewhere between 10%-20% unknown words." | [What difficulty works best?](https://forum.lingq.com/t/what-difficulty-do-you-find-works-best/317173) |
| 32 | F | Pr0metheus: "if there are more than 20% new words, reading becomes a chore." | [What difficulty works best?](https://forum.lingq.com/t/what-difficulty-do-you-find-works-best/317173) |
| 33 | F | jt23: "If I'm interested, I don't mind up to 40% New Words." Minat mengubah batas | [What difficulty works best?](https://forum.lingq.com/t/what-difficulty-do-you-find-works-best/317173) |
| 34 | F | LeifGoodwin: input dengan "~5% unknown words" ideal; sampai 20% bila terpaksa | [What difficulty works best?](https://forum.lingq.com/t/what-difficulty-do-you-find-works-best/317173) |
| 35 | D | Bantuan resmi LingQ: "aim for Lessons with New Word percentages from 20% and even up to 50% in some cases." | [Find lessons at my level](https://lingq-support.groovehq.com/help/how-do-i-find-lessons-at-my-level) |
| 36 | F | Ringkas: pengguna mengurutkan kursus menurut persen kata baru; teks "kata baru sedikit" masih bisa banyak kuning | [Pencarian: % new words](https://forum.lingq.com/t/determining-percent-of-unknown-words/71319) |
| 37 | R | alex4: "I would love a feature that allows these words to show their translation or meaning directly in the text." | [Readlang: known words in text](https://forum.readlang.com/t/show-translations-of-known-words-directly-in-the-text/4837) |
| 38 | R | steve (Readlang): klik kata tersorot "nothing changes… (you could argue that it should!)" | [Readlang: known words in text](https://forum.readlang.com/t/show-translations-of-known-words-directly-in-the-text/4837) |
| 39 | R | sr: kata yang dikenal tak perlu diklik; hanya pembaca yang tahu kata mana perlu dilatih | [Readlang: known words in text](https://forum.readlang.com/t/show-translations-of-known-words-directly-in-the-text/4837) |
| 40 | R | rossi-clo: "Is there a shortcut to marking a word know and getting it out of the SRS review rotation?" | [Readlang: shortcut mark known](https://forum.readlang.com/t/is-there-a-shortcut-to-mark-a-word-known/4995) |
| 41 | R | m-c: "No, not like that." Belum ada pintasan | [Readlang: shortcut mark known](https://forum.readlang.com/t/is-there-a-shortcut-to-mark-a-word-known/4995) |
| 42 | R | teksong minta sorotan berwarna menurut tingkat kenal | [Readlang: color scale](https://forum.readlang.com/t/a-color-scale-feature-for-tracking-word-familiarity-progress/1634) |
| 43 | R | steve (Jan 2025): "I wanted the Readlang reading experience to be distraction free." | [Readlang: color scale](https://forum.readlang.com/t/a-color-scale-feature-for-tracking-word-familiarity-progress/1634) |
| 44 | R | yasser-ghazaly: kata yang sudah diterjemahkan "should appear highlighted" saat membaca artikel lama | [Readlang: word highlighting](https://forum.readlang.com/t/word-highlighting/4164) |
| 45 | R | Blog Readlang: fitur menyorot otomatis kata yang pernah diterjemahkan di teks baru | [Blog Readlang](https://blog.readlang.com/2015/03/17/auto-highlight-words.html) |
| 46 | S | Schmitt dkk. 2011: hubungan kosakata dikenal & paham baca kira-kira linear; "98% estimate is a more reasonable coverage target" | [NAU Experts](https://experts.nau.edu/en/publications/the-percentage-of-words-known-in-a-text-and-reading-comprehension/) |
| 47 | S | Rujukan di studi yang sama: kebutuhan cakupan antara 95% (Laufer 1989) dan 98% (Hu & Nation 2000) | [NAU Experts](https://experts.nau.edu/en/publications/the-percentage-of-words-known-in-a-text-and-reading-comprehension/) |
| 48 | S | Ringkas: arti di dalam teks beban kognitif lebih rendah daripada di pinggir (tak terbagi perhatian) | [Pencarian: glossing & cognitive load](https://bvbvf1.bib-bvb.de/vufind/PrimoRecord/cdi_proquest_journals_2821080824) |
| 49 | B | Refold: teks pelajaran "all highlighted in blue"; kata familiar tapi belum otomatis dinilai level 2-4 dulu | [Refold: ulasan LingQ](https://refold.la/blog/lingq-review) |
| 50 | B | Ringkas Migaku: status Unknown/Learning/Known/Ignored dengan warna garis berbeda; "Known" bila jeda ulang ≥21 hari | [Migaku Starter Guide](https://migaku.com/starter-guide) |

Jumlah: 50 butir dari 6 jenis sumber (forum LingQ, forum/blog Readlang, bantuan resmi LingQ, studi terbit, blog ulasan, panduan Migaku).

## 3. Vonis hipotesis
| H | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| H1 | Menyorot SEMUA kata baru membuat halaman ramai & melelahkan | **Terbukti sebagian** | #1, #32, #43 (Readlang sengaja minim sorotan). Tapi #26 & #45: sebagian justru mau sorotan untuk kata yang disimpan. |
| H2 | Pembaca butuh cara cepat tandai "sudah kenal" (1 ketuk, tanpa kamus) | **Terbukti** | #20, #22, #40, #41, #21: minta pintasan; tak ada tanpa buka kamus/buat kartu. |
| H3 | Kata kenal berhenti disorot otomatis di bab berikutnya | **Terbukti sebagian** | Otomatis pindah-halaman dipuji (#9) tapi memicu salah tanda (#8, #11, #16) & tanpa undo (#19). Perlu tanda sadar + batal. |
| H4 | Hitungan "kata baru" membantu pilih buku sesuai level | **Terbukti** | #31-#36, #46-#47: dipakai & diurutkan; batas 10-20% umum, naik bila tertarik (#33). Keluhan: kata "baru" sering ternyata sudah dikenal (#30). |
| H5 | Tanda massal ("tandai semua kenal" per halaman/bab) dipakai & diminta | **Terbukti sebagian** | Diminta (#5), dipakai "in bunches" (#4, #6). Tapi sering tak sengaja (#14, #16, #17). |

## 4. Usulan tugas developer (maks 3)
- **P0** Tombol "Sudah kenal" di sheet arti: 1 ketuk, kata berhenti disorot, ada "Urungkan".
- **P1** Tombol "Tandai halaman ini kenal" hanya untuk kata tersorot; konfirmasi + Urungkan, tanpa otomatis.
- **P1** Di kartu buku: "~N% kata baru" pakai kata sudah kenal; batas 10-20% sebagai petunjuk, bukan larangan.

## 5. Batas riset
- Reddit tak terbuka langsung (hanya cermin lewat pencarian); ulasan Play Store/App Store tak terbaca.
- Hampir semua bukti dari satu situs (LingQ) dan satu forum (Readlang); suara Indonesia kosong.
- Butir #4, #36, #48, #50 dari ringkasan pencarian, bukan dibaca langsung.
- Tidak ada studi yang mengukur "halaman ramai" itu sendiri; H1 bersandar pada kutipan pengguna.
- Halaman Language Reactor tak terbaca; Migaku hanya lewat ringkasan.

## 6. Langkah berikutnya
- Developer: kerjakan tombol "Sudah kenal" (P0) dulu.
- Tester AI: cek apakah sorotan bab 2 terasa ramai setelah banyak kata disimpan.
- Riset: cari suara pengguna Indonesia bila Reddit/Threads sudah bisa dibuka.
