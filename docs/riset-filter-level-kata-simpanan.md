# Riset: filter level HSK di daftar Kata simpanan (#1395)

Asal masukan: Sinta (pengguna AI, belajar HSK 3): "penanda HSK di kata simpanan, plus filter 'HSK 3', biar bisa ulang kata sesuai ujian".
Chip HSK di kartu kata sudah ada (lihat `docs/riset-label-level-kata.md`, tidak diulang di sini).
(validasi bukti internet) 36 bukti dari 6 jenis sumber. Catatan jujur: sebagian halaman hanya terbaca lewat ringkasan pencarian, bukan teks penuh. Kutipan bertanda "…" diambil dari ringkasan itu; sisanya parafrase. Reddit asli tidak terbaca langsung.

## Intinya
- Ya, bangun filter level. Bentuk terkecil: satu baris chip di tab Kata.
- Pelajar memang menyaring per level/set, tapi lewat tag atau kategori, bukan layar rumit.
- Dampak ke ulang kata belum terbukti. Ukur dulu lewat /hitung.

## 1. Bukti (36 butir, 6 jenis sumber)

### A. Forum LingQ (tag + filter)
1. [LingQ: HSK 3.0 per level pakai Excel](https://forum.lingq.com/t/title-streamlining-hsk-30-vocabulary-tagging-for-efficient-chinese-language-learning-applicable-to-any-language/280313) — pengguna memberi tag level sendiri lalu menyaring.
2. [LingQ: Filtering by tags in Vocabulary](https://forum.lingq.com/t/filtering-by-tags-in-vocabulary-section/3689) — pengguna minta menyaring daftar kata per tag; hanya satu tag sekali lihat.
3. [LingQ: Review badly needs a filter](https://www.lingq.com/it/forum/support-feedback-forum/lingq-review-badly-needs-a-fil/) — judul utas: ulang kata "butuh filter agar berguna".
4. [LingQ: Filtering Vocabulary Review](https://forum.lingq.com/t/filtering-vocabulary-review/31411) — permintaan menyaring sesi ulang, bukan cuma daftar.
5. [LingQ: lesson vocabulary tanpa filter tag](https://forum.lingq.com/t/why-doesnt-lesson-vocabulary-support-tag-filters/39033) — pengguna kesal: harus banyak langkah untuk filter tag + pelajaran.
6. [LingQ support: filter kosakata "like a pro"](https://lingq-support.groovehq.com/help/how-and-why-to-filter-your-vocabulary-list-like-a-pro) — filter tag, status, kursus, pelajaran, jadwal ulang; fitur resmi.
7. [LingQ: Idea adjustable importancy](https://forum.lingq.com/t/idea-vocabulary-listsadjustable-importancy-of-words/22232) — pengguna ingin memprioritaskan kata untuk diulang.

### B. Forum Anki, Pleco, Skritter, Hanzihero, Chinese-Forums
8. [Anki: HSK 3.0, sub-deck per level](https://forums.ankiweb.net/t/hsk-3-0-deck-how-to-create-sub-decks-for-each-level/12858) — pengguna ingin pecah deck HSK per level.
9. [Anki: custom study per tag](https://forums.ankiweb.net/t/how-do-i-create-a-custom-study-session-of-all-the-cards-to-see-today-that-match-a-particular-tag/15454.md) — ingin sesi belajar hanya kartu bertag tertentu.
10. [Anki: Learn a subset of a deck](https://forums.ankiweb.net/t/learn-a-subset-of-a-deck/2112) — kebutuhan belajar sebagian deck, bukan semuanya.
11. [Anki Android: tag/selective study](https://groups.google.com/g/anki-android/c/YBhHDO1v9oQ) — belajar selektif per tag diminta di HP.
12. [Anki manual: filtered decks](https://docs.ankiweb.net/manual/filtered-decks) — filtered deck bisa dibatasi per tag.
13. [Anki shared: HSK 3.0 deck](https://ankiweb.net/shared/info/1144807196) — deck publik memakai tag level (mis. "3 HSK").
14. [Pleco: Filter only the Hanzi for HSK 3.0](https://plecoforums.com/threads/filter-only-the-hanzi-for-hsk-3-0-flashcards.7582) — pengguna menyaring kartu HSK 3.0 sesuai kebutuhan.
15. [Pleco: Studying flashcards & smart category](https://www.plecoforums.com/threads/studying-flashcards-and-smart-category-functionality.6697/latest) — kategori dipakai untuk memilih apa yang diulang.
16. [Pleco: Excluding specific cards](https://plecoforums.com/threads/excluding-specific-cards-from-deck.7690) — kategori HSK bawaan; progres tetap saat kartu masuk kategori baru.
17. [Pleco manual: flashcards tutorial](https://iphone.pleco.com/manual/229/flashtut.html) — kartu bisa di banyak kategori; contoh satu kategori per bab buku.
18. [Skritter: menambah kata yang sudah dikenal](https://forum.skritter.com/t/adding-words-you-already-know/4169) — repot memilah HSK 1–3 satu per satu di HP.
19. [Skritter docs: Vocabulary FAQ](https://docs.skritter.com/article/207-vocabulary-faq) — filter hanya untuk jenis latihan, bukan level kata.
20. [Hanzihero: learn the words in order of HSK](https://community.hanzihero.com/t/learn-the-words-in-order-of-hsk/391) — pengguna ingin urutan menurut HSK.
21. [Chinese-Forums: HSK 4 StickyStudy dipecah per bab](https://chinese-forums.com/forums/topic/61436-hsk-5-too-many-new-words-in-the-exercise-book/page/2) — pengguna memecah deck besar jadi deck kecil.
22. [Chinese-Forums: Mega Mandarin HSK 3.0 flashcards](https://chinese-forums.com/forums/topic/60718-mega-mandarin-hsk-30-flashcards) — deck HSK dibagikan dan dipakai per level.

### C. Forum Readlang (tag, folder, filter)
23. [Readlang: Tags for words](https://forum.readlang.com/t/tags-for-words-would-be-useful-to-search-for-specific-class-of-words/186) — tag diminta "untuk mencari kelas kata tertentu"; bintang terlalu terbatas.
24. [Readlang: Add more folders/categories](https://forum.readlang.com/t/add-more-folders-categories/1725) — pengguna minta lebih banyak folder.
25. [Readlang: filter fleksibel di daftar kata](https://forum.readlang.com/t/how-can-i-add-new-category-in-world-list-or-more-flexible-filters/4688) — filter hanya waktu/kegunaan; kurang fleksibel.
26. [Readlang: filter jenis kata](https://forum.readlang.com/t/add-a-filter-by-word-category-verbs-adjectives-etc-in-the-vocabulary-search/2619) — minta filter kata kerja/benda di pencarian kosakata.
27. [Readlang: Custom personal categories](https://forum.readlang.com/t/feature-request-custom-personal-categories/2581) — kategori pribadi diminta; sinyal kebutuhan mengelompokkan.

### D. Dokumentasi & produk (app store, blog resmi)
28. [Du Chinese blog](https://duchinese.net/blog/?p=1950) — kata simpanan satu tempat, ulang harian, ekspor ke Anki/Pleco; tak ada filter level bawaan.
29. [Hanbi (App Store)](https://apps.apple.com/app/id6824896964) — latihan tulis tersusun per level HSK 3.0.
30. [HanziDragon (App Store)](https://apps.apple.com/app/id6748893576) — mode latihan bebas memilih karakter; versi gratis per level HSK 1–3.
31. [Hanzi Kit (App Store)](https://apps.apple.com/app/id6745190196) — latihan daftar resmi per level, termasuk HSK 3.0.
32. [BW Hanzi Writer (App Store)](https://apps.apple.com/app/id6470270145) — perpustakaan karakter bertingkat; level jadi cara memilih.

### E. Blog pelajar & panduan
33. [Blog pengaturan Pleco](https://bewagner.github.io/blog/my-pleco-flashcard-setup) — pelajar menata kartu dengan kategori sendiri.
34. [Catatan belajar Mandarin (rafaelcartenet)](https://rafaelcartenet.github.io/learning-chinese) — menumpuk 600 kartu satu level sekaligus bisa mengecilkan hati; per pelajaran lebih nyaman.

### F. Penelitian & panduan desain (beban layar)
35. [NN/g: Reduce Choice Overload](https://www.nngroup.com/reports/make-decisions/) — kurangi pilihan; tampilkan yang penting dulu.
36. [Ding dkk. 2020 via ringkasan: progressive disclosure](https://unpaywall.org/10.1007%2F978-3-030-51828-8_23) — antarmuka yang membuka opsi bertahap mengurangi beban memilih (studi layar utama HP, bukan app belajar).

## 2. Vonis per hipotesis

| # | Hipotesis | Vonis | Dasar singkat |
|---|---|---|---|
| H1 | Pelajar menyaring/mengulang kata simpanan per level atau set | **Terbukti** | Butir 1–11, 14–15, 21, 34 |
| H2 | Pelajar memakai tag/kategori/deck, bukan filter level bawaan | **Terbukti** | LingQ/Readlang tag (1, 23), Pleco kategori (15–17), Anki tag/deck (8–13); level bawaan jarang |
| H3 | Filter menambah ulang kata, bukan sekadar kerumitan | **Belum jelas** | Tak ada data dampak; hanya sinyal kebutuhan (3, 4) dan risiko beban (35–36) |
| H4 | Filter harus sederhana agar tidak membebani | **Terbukti** (arah desain) | Keluhan langkah berlebih (5, 18); panduan pilihan sedikit (35) |

## 3. Jawaban tiga pertanyaan
- **(1) Menyaring per level?** Ya, terutama persiapan ujian dan per bab buku.
- **(2) Filter vs tag/folder/deck?** LingQ & Readlang: tag. Pleco: kategori. Anki: tag/deck.
- **(3) Tambah ulang atau rumit?** Belum jelas; uji kecil dengan hitungan.

## 4. Rekomendasi untuk developer (maks 3)
1. **Ya, bangun.** Satu baris chip di tab Kata: "Semua · HSK 1 · HSK 2 · HSK 3…". Tanpa tag/folder buatan sendiri.
2. **Muncul hanya bila ada kata HSK** di simpanan. Hanya level yang ada isinya. Kata tanpa level tetap di "Semua".
3. **Ukur lewat /hitung:** tambah penghitung "filter dipakai" dan "ulang kata mulai dari filter". Ukur 2 minggu; naik = pertahankan.

## 5. Langkah berikutnya
- Developer: bangun sesuai `docs/mockup-1395.html` (item backlog baru).
- Riset: setelah 2 minggu data /hitung, putuskan H3.
- Catatan: /hitung saat ini hanya kirim 3 hal (hari ini, hari pertama, sumber); developer perlu menambah dua penghitung baru.
