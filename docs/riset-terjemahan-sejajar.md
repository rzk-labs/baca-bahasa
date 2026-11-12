# Riset: terjemahan sejajar per kalimat, bantu atau malas?

Tugas #548 · Peran riset · (validasi bukti internet)

## Intinya
- Terjemahan sejajar membantu paham, tapi bila selalu tampil, pembaca berhenti menebak.
- Mode "tutup dulu, ketuk untuk buka" jadi tuntutan pengguna kompetitor. Keepo sudah mirip.
- Kalimat panjang sering meleset dan boros kuota. Kalimat tunggal di Keepo sudah di-prafetch.

## 1. Cara riset
- 42 bukti dari 4 jenis sumber: forum LingQ, forum Readlang, forum Language Reactor, studi/makalah, blog/ulasan.
- Kutipan diambil dari halaman yang dibuka langsung (WebFetch), bukan dari ingatan.
- Reddit & ulasan toko tidak diambil. Suara Indonesia kosong. Studi pemula A2-B1 sangat tipis.

## 2. Yang sudah ada di Keepo (tak perlu dibangun ulang)
- Ketuk kata → arti kata. Tombol "Masih bingung? Lihat kalimatnya" → arti kalimat (`ui.js`).
- Prafetch: halaman diam 1,5 detik, maks 12 kalimat, diam bila hemat data (`app.js`, #458).
- Tanda "arti mesin, bisa meleset" sudah ada (#464).
- Belum ada: tampilan sejajar permanen, dan penghitung "berapa kalimat dibuka".

## 3. Bukti

### A. Forum LingQ: sembunyikan terjemahan, tebak dulu
1. Ediz: "I like to try to guess what the word means before I see the meaning." [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)
2. Fer.weh: "with every meaning shown from the start my brain doesn't need to work and I won't learn anything." [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)
3. EricRe: "I want to try to remember the words, not have them fed to me before I have tried." [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)
4. dasconnor: "this feature really ruins sentence mode for me." [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)
5. anon56859726: "it clutters the display AND it breaks vertical scrolling." [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)
6. jljorgenson18 pakai CSS sendiri untuk "hide the saved meaning unless you hover over it." [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)
7. zoran (staf): "it shows the translations by default now"; opsi mematikan akan dipertimbangkan. [tautan](https://forum.lingq.com/t/hide-automatic-translations-in-sentence-reader-mode/39117)

### B. Forum LingQ: pemula & mutu mesin
8. Ringkasan forum: coba pahami kalimat dulu, baru "Show Translation"; pakai mode kalimat hanya untuk kalimat sulit. [tautan](https://forum.lingq.com/t/how-do-i-get-started/273647)
9. johnd2: terjemahan harfiah perlu diedit; "Just changing the time to eg 6 o'clock rather than doing a literal translation..." [tautan](https://forum.lingq.com/t/how-to-use-lingq-as-a-beginner/857162)
10. johnd2: penerjemah bisa memilih sinonim yang jarang, kalimat jadi lebih sulit bagi pemula. [tautan](https://forum.lingq.com/t/how-to-use-lingq-as-a-beginner/857162)
11. BassmasterJJ: "keep reading new things and moving forward, absorbing what you can." [tautan](https://forum.lingq.com/t/how-to-use-lingq-as-a-beginner/857162)
12. BassmasterJJ: "simply ignore those and other things I dont care about." [tautan](https://forum.lingq.com/t/how-to-use-lingq-as-a-beginner/857162)
13. steve: "I find the translations quite good." (Google Translate, pelajaran pemula) [tautan](https://forum.lingq.com/t/using-google-translate-for-beginner-lessons/9265)
14. furkan89: "it mostly translates short sentences correctly"; cocok untuk yang mulai dari nol. [tautan](https://forum.lingq.com/t/using-google-translate-for-beginner-lessons/9265)
15. turko77: mesin "often does sometimes translate incorrectly"; dipasangkan dengan kamus. [tautan](https://forum.lingq.com/t/using-google-translate-for-beginner-lessons/9265)
16. Sirob11 (Rusia): "In many cases the translation proposed by Google is not accurate at all, and makes no sense." [tautan](https://forum.lingq.com/t/using-google-translate-for-beginner-lessons/9265)
17. leontoon (Mandarin): "Chinese translations can be a bit funny if you try a whole sentence." [tautan](https://forum.lingq.com/t/using-google-translate-for-beginner-lessons/9265)
18. Saran cek: terjemahkan balik; "if you do not get back first text there is probably something wrong." [tautan](https://forum.lingq.com/t/using-google-translate-for-beginner-lessons/9265)
19. Laporan pengguna: terjemahan mode kalimat LingQ kurang akurat untuk Jepang lewat Google; disarankan DeepL. [tautan](https://forum.lingq.com/t/issue-with-sentence-mode-translation/385989)

### C. Forum Readlang: kalimat panjang & biaya
20. steve (pendiri): "Readlang has a limit of 6 words per phrase for free and 12 words per phrase for paying users." [tautan](https://forum.readlang.com/t/why-is-there-a-length-limit-on-phrases/42)
21. steve: "Google Translate often doesn't handle large, complex sentences that well, so may lead to confusion." [tautan](https://forum.readlang.com/t/why-is-there-a-length-limit-on-phrases/42)
22. steve: pemula paling sering menerjemahkan kalimat utuh, jadi paling rawan bingung. [tautan](https://forum.readlang.com/t/why-is-there-a-length-limit-on-phrases/42)
23. steve: "I pay Google per character for the translations." Kalimat utuh bisa membuat layanan tak berkelanjutan. [tautan](https://forum.readlang.com/t/why-is-there-a-length-limit-on-phrases/42)
24. vladimir-kirichenko: "It would be great to be able to see the whole sentence translated by chat gpt." [tautan](https://forum.readlang.com/t/ability-to-see-whole-sentence-translated/3600)
25. vladimir-kirichenko: "I sometimes 'miss' the point of the sentence in French, even though I understand the individual bits." [tautan](https://forum.readlang.com/t/ability-to-see-whole-sentence-translated/3600)
26. vladimir-kirichenko: untuk kalimat panjang, cara lama "doesn't work properly"; ia pindah ke LLM atau LingQ. [tautan](https://forum.readlang.com/t/ability-to-see-whole-sentence-translated/3600)
27. psy-q: "I'd also enjoy such a feature." [tautan](https://forum.readlang.com/t/ability-to-see-whole-sentence-translated/3600)
28. Pengguna lain: terjemahan kalimat Readlang gagal untuk kalimat panjang; pakai ekstensi Kagi Translate. [tautan](https://forum.readlang.com/t/can-readlang-translate-sentences/4754)

### D. Forum Language Reactor
29. jtsoftware: "I want to turn off the translations at the bottom to force me to try to understand the target language text." [tautan](https://forum.languagelearningwithnetflix.com/t/native-translation-in-subtitle-pane-hover-over/7641)
30. jtsoftware: "be able to see the translation quickly on demand via the subtitle pane hover-over." [tautan](https://forum.languagelearningwithnetflix.com/t/native-translation-in-subtitle-pane-hover-over/7641)
31. rolypoly (Des 2025): "I can blur the English translation of my target language text, allowing me to guess at the meaning." Fitur itu tak jalan di halaman teks. [tautan](https://forum.languagelearningwithnetflix.com/t/there-is-no-way-to-blur-text-until-i-mouse-over-to-reveal-it-on-the-my-texts-reader-page/36554)

### E. Studi & makalah
32. Kazakov 2021: teks paralel jadi "an efficient way of making extensive language input comprehensible from the earliest stages." [tautan](https://library.iated.org/view/KAZAKOV2021PAR)
33. Kazakov 2021: sebagian poliglot menyebutnya "a unique method of vocabulary acquisition." [tautan](https://library.iated.org/view/KAZAKOV2021PAR)
34. Kazakov 2021: yang lain bilang metode ini "diminishes the intellectual work necessary for language learning." [tautan](https://library.iated.org/view/KAZAKOV2021PAR)
35. Kazakov 2021: efisiensi "depends on the structural similarities/differences" pasangan bahasa. [tautan](https://library.iated.org/view/KAZAKOV2021PAR)
36. Studi 82 pelajar EFL Tiongkok (teks Inggris saja, kata diberi arti, Inggris+Mandarin): semua kelompok naik; kelompok arti & dwibahasa menyimpan hasil lebih lama. Hanya abstrak dari hasil pencarian; halaman asli diblokir. [tautan](https://scholarspace.manoa.hawaii.edu/items/ec13292c-a15e-4c6f-b591-ee63fd0c9cee)
37. Studi anak 5 tahun: kata dipelajari di kedua bahasa apa pun format bukunya (anak, bukan dewasa). [tautan](https://scholarspace.manoa.hawaii.edu/items/ec13292c-a15e-4c6f-b591-ee63fd0c9cee)

### F. Blog & ulasan
38. Self-Taught Japanese: "knowing you have the answer key right in front of you makes it harder to really do your best." [tautan](https://selftaughtjapanese.com/2015/11/04/using-parallel-texts-to-study-a-foreign-language/)
39. Sama: "it encourages you to think in your native language which is something you generally want to get away from." [tautan](https://selftaughtjapanese.com/2015/11/04/using-parallel-texts-to-study-a-foreign-language/)
40. Sama: buka teks asli "only when you are really confused about a sentence." [tautan](https://selftaughtjapanese.com/2015/11/04/using-parallel-texts-to-study-a-foreign-language/)
41. Sama: kurang berguna bila "you are still at the level where you are frequently looking up meaning of words." [tautan](https://selftaughtjapanese.com/2015/11/04/using-parallel-texts-to-study-a-foreign-language/)
42. Open University (halaman buku dwibahasa berhadapan): beban ganda, minat turun karena "the brain already knows exactly what happens next." [tautan](https://www.open.edu/openlearncreate/mod/page/view.php?id=246775)
43. Ulasan Lingopie (pesaing, bias): terjemahan Language Reactor "often break mid-phrase, leading to awkward or incorrect translations." [tautan](https://lingopie.com/blog/language-reactor-review/)

## 4. Vonis hipotesis

| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| H1 | Terjemahan selalu tampil bikin pembaca berhenti menebak | **Terbukti sebagian** | #2, 3, 34, 38; tak ada uji terkontrol pemula |
| H2 | Mode "tutup, ketuk untuk buka" dicari pelajar serius | **Terbukti** | #1-3, 6, 29-31 |
| H3 | Terjemahan sejajar membantu paham & ingat kosakata | **Terbukti sebagian** | #32, 33, 36; sampel kecil, bukan A2-B1 |
| H4 | Kalimat panjang diterjemahkan mesin sering meleset | **Terbukti** | #16, 17, 21, 26, 28, 43 |
| H5 | Terjemahan kalimat utuh membebani biaya & data | **Terbukti sebagian** | #23; biaya server Readlang, bukan data pengguna |
| H6 | Pemula A2-B1 lebih cocok sejajar permanen | **Belum jelas** | #41 menyebut pemula kurang terbantu; tak ada data langsung |
| H7 | Terjemahan sejajar sendiri membuat pembaca malas | **Gugur (versi mutlak)** | Pembaca tetap tahu kapan butuh (#8, 25); soal kebiasaan, bukan tampilan |

## 5. Kesimpulan
- Jangan bikin tampilan sejajar permanen. Buka per kalimat sesuai permintaan sudah tepat.
- Kebutuhan nyata: kalimat yang "kata-nya paham tapi maknanya tidak" (#25).
- Kalimat panjang: beri tanda ragu, bukan larangan. Mutu mesin turun saat kalimat panjang.

## 6. Usul tugas app (P0 kecil, belum dikerjakan)
- **Buka terjemahan di tempat**: ketuk kalimat → terjemahan muncul di bawah kalimat itu, bisa ditutup. Pakai prafetch yang ada. Tidak tumpang tindih dengan sheet arti kalimat; ini jalan pintas.
- **Tanda "kalimat panjang, arti bisa meleset"**: muncul bila kalimat lebih dari ±25 kata. Tambah satu baris di sheet arti kalimat.
- **Penghitung lembut "kalimat dibuka hari ini"**: bukan larangan. Ukur H1 di beta sebelum menambah fitur sejajar.

## 7. Langkah berikutnya
- PM menilai tiga usul; dev mengerjakan satu per satu.
- Uji beta: bandingkan rasio ketuk kata vs kalimat per halaman.
- Cari suara pengguna Indonesia & studi pemula A2-B1 (Reddit/ulasan toko belum terbaca).
