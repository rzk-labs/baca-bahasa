# Riset: daftar "kata baru" tanpa partikel & kata sangat umum (#838)

(validasi bukti internet) Hari: 13 Nov 2026. Peran: riset. Kode app tidak diubah.

## Intinya
- Nama tokoh & partikel memang sampah di daftar kata baru; pesaing menyaringnya manual, bukan otomatis.
- Keepo sudah menyaring partikel ja (13) & ko 1 suku, tapi belum es/fr/de/en/zh, huruf tunggal, nama berhuruf besar.
- Rekomendasi: satu fungsi saring bersama, ±30 kata per bahasa, dipakai semua tempat 'kata baru' (backlog #80).

## 1. Yang kini dipakai kode
- `app.js` `isKataFungsi`: ja = 13 partikel (が は を に の で と も へ や か ね よ); ko = 1 suku Hangul bukan kata utuh. Bahasa lain: tidak ada.
- `countedVocab`/`kataBaruMinggu`: kata tersimpan, tanpa partikel (dipakai Home, Profil, ringkasan mingguan).
- `perkiraanBaru` (persen kata baru saat impor): ikut saring partikel.
- `ui.js` `intipCands` (kartu Intip kata bab): saring lewat `isKataFungsi`, panjang min 5 (Latin) / 2 (CJK), hiragana <3 huruf dibuang, kata sudah kenal, nama dari `b.names` (isi manual saja).
- Intip: tidak ada daftar kata umum en/es/fr/de; tidak ada tebakan nama berhuruf besar.
- Status "Kata baru" di Lanjut baca/FYP yang memuat 'が' (laporan Bima & Tari): sumber persisnya belum ketemu lewat pencarian teks. Developer perlu telusuri (lihat langkah 4.1).
- Dugaan: ada jalur lain yang membaca kata dari ketukan/catatan sesi/data sinkron lama tanpa `isParticle`.

## 2. Bukti (49 butir, 6 jenis sumber)

### A. Cara aplikasi lain menyaring (LingQ, Readlang, Language Reactor, Kindle, Migaku, Jiten)
| # | Kutipan / temuan | URL |
|---|---|---|
| 1 | LingQ: "all words are new to you... turn New Words into LingQs, or mark them as Known or Ignored" (saring manual, tak ada filter otomatis nama/partikel) | https://lingq-support.groovehq.com/help/how-do-you-know-which-words-are-new-to-me |
| 2 | LingQ forum: "Is it possible to prevent a person's name... from being identified as a new word?" | https://forum.lingq.com/t/people-and-places-names/252733 |
| 3 | Jawaban: "Click 'ignore'" (DJTembo) | https://forum.lingq.com/t/people-and-places-names/252733 |
| 4 | LingQ mengubah kata biru termasuk nama jadi Known "behind the user's back" (jt23) | https://forum.lingq.com/t/people-and-places-names/252733 |
| 5 | Naguib: abaikan nama "unless the name is also a word that's actively used" (mis. Basma = senyum) | https://forum.lingq.com/t/people-and-places-names/252733 |
| 6 | Readlang: tabel frekuensi 50 ribu kata dipakai untuk "prioritize your studying" (Steve, Readlang) | https://forum.readlang.com/t/auto-highlight-or-rank-top-x-words-in-target-language-based-on-frequency-dictionary/3945 |
| 7 | Readlang: bentuk konjugasi "listed separately" (bukan satu kata dasar) | idem |
| 8 | Language Reactor: daftar frekuensi dibuat dari subtitle; "lists start to get noisier above 8000... so we don't show them" | https://forum.languagelearningwithnetflix.com/t/frequency-dictionary-created-by-language-reactor/14691 |
| 9 | Language Reactor: "set vocabulary level" memberi daftar kata yang mungkin berguna (bukan impor kata sudah kenal) | idem |
| 10 | Kindle Vocabulary Builder: tak ada saring kata mudah; hanya hapus satu per satu atau matikan fitur | https://www.dummies.com/article/technology/electronics/tablets-e-readers/kindles/how-to-use-vocabulary-builder-on-your-kindle-paperwhite-156833/ |
| 11 | Kindle: pengguna terpaksa edit `vocab.db` lewat SQLite untuk membuang entri (tak resmi, balik lagi dari server) | https://www.mobileread.com/forums/showthread.php?p=2812130 |
| 12 | Migaku: status "Ignore" tetap dihitung ke Known words (komunitas) | https://migaku.com/community/m/1305584195099164767 |
| 13 | Migaku: kata Known tak turun lagi tanpa ubah manual | https://migaku.com/community/m/1374700378523832331 |
| 14 | Jiten: set "Particles & Common Grammar" ±400 kata, disarankan kecuali pemula total | https://jiten.moe/guides/word-sets |
| 15 | Jiten: set Names 300rb+ (orang 50rb+, tempat 200rb+, lain 10rb+) | https://jiten.moe/guides/word-sets |
| 16 | Jiten: set bisa "Mark as Mastered" atau "Blacklist": dihitung ke cakupan tanpa bikin kartu | https://jiten.moe/guides/word-sets |
| 17 | Daftar kata umum Migaku sengaja melewatkan partikel gramatikal | https://migaku.com/blog/japanese/how-to-learn-japanese-vocabulary |

### B. Keluhan & kebiasaan pengguna (forum)
| # | Kutipan | URL |
|---|---|---|
| 18 | "I Ignore everything that is... a Name" (LuckieNoob) | https://forum.lingq.com/t/ignoring-names-yes-or-no/857242 |
| 19 | "In the end it is the decision of the learner, what to do with names." (MartinGuehmann) | idem |
| 20 | "I don't count names of people when I am learning French, but I do count them when I am learning Russian." (mark.e) | https://forum.lingq.com/t/do-you-count-names-as-known-words-on-lingq/28103 |
| 21 | "there's not much point in lingQ'ing Paulos, Jean or Antoinette... artificially inflating your known words count" (JulieS) | idem |
| 22 | "I usually ignore names, some proper nouns and most numbers" (octopusbuddy) | idem |
| 23 | "I only count names if they are different from their native language" (Swedishfinnpolymath) | idem |
| 24 | "I ignore names of people and most names of places." (ericb100) | https://forum.lingq.com/t/what-and-how-much-do-you-ignore/37035 |
| 25 | "I ignore all names and anything that you can't look up in the dictionary" (kraemder) | idem |
| 26 | "All n', l', and d' words in French" diabaikan (Nobodysfuel): potongan kata fungsi | idem |
| 27 | "I ignore words like 'hmm', 'uh…'" (henryetha1) | idem |
| 28 | "I don't care about writing definitions of what would be people's names" (nfera) | https://forum.lingq.com/t/simplifying-the-lingqing-process/72115 |
| 29 | "my prompt isn't enough to stop all nonsense words" (nfera): saring otomatis pun tak sempurna | idem |
| 30 | "Have you ever been overwhelmed by the amount of blue words in a new text?" (roosterburton) | idem |
| 31 | Readlang: sorot kata sangat umum "a", "the" tak berguna (p6mmc) | https://forum.readlang.com/t/auto-highlight-or-rank-top-x-words-in-target-language-based-on-frequency-dictionary/3945 |

### C. Studi frekuensi & cakupan kata
| # | Temuan | URL |
|---|---|---|
| 32 | 10 kata tersering Inggris ±25% teks | https://www.newgeneralservicelist.com/coverage |
| 33 | 100 kata tersering "close to 50%" (klaim vendor, sampel Cambridge 10 juta kata, bukan studi sejawat) | idem |
| 34 | 2.000 kata pertama 83%; 2.000 berikutnya hanya +5% | idem |
| 35 | Di bawah 80% cakupan, paham "next to impossible" (Laufer 1990) | idem |
| 36 | 95% cukup menebak dari konteks (Laufer; Liau & Nation) | idem |
| 37 | 98% cukup untuk baca santai (Hu & Nation 2000) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8907927 (lewat ringkasan pencarian) |
| 38 | Nation 2006: 98% teks tulis butuh ±8.000-9.000 keluarga kata | https://www.wgtn.ac.nz/__data/assets/pdf_file/0018/1626120/2006-How-large-a-vocab.pdf |
| 39 | Hitungan frekuensi Nation tidak memasukkan nama diri (proper nouns) | ringkasan pencarian atas buku Nation 2001 |
| 40 | Frekuensi Jepang: 7 dari 10 kata tersering adalah partikel (daftar berbasis Wiktionary) | https://www.alexrockinjapanese.com/top-25-most-common-japanese-particles/ |

### D. Daftar stopword / partikel
| # | Temuan | URL |
|---|---|---|
| 41 | stopwords-iso ja: 134 entri, termasuk が, か, から, で, て (ikut kata bantu & kata ganti) | https://github.com/stopwords-iso/stopwords-ja/blob/master/stopwords-ja.txt |
| 42 | Paket R `stopwords` punya daftar zh, fr, de, ja, ko, es | https://www.rdocumentation.org/packages/stopwords/versions/0.9.0 |
| 43 | stopwords-iso mencakup zh, fr, de, es dan banyak bahasa lain (kode ISO) | https://www.npmjs.com/package/stopwords-iso |
| 44 | Paket npm `stopword`: ja & zh butuh pemotong kata dulu (tanpa spasi) | https://www.npmjs.com/package/stopword |
| 45 | Daftar stopword umum panjangnya 100-700 kata per bahasa: terlalu besar untuk app ini; ±30 inti cukup | https://github.com/stopwords-iso/stopwords-iso |

### E. Saran guru / pakar soal kata yang layak dipelajari dulu
| # | Temuan | URL |
|---|---|---|
| 46 | Kanshudo: "learn words you will encounter most often wherever you personally use Japanese" | https://www.kanshudo.com/howto/usefulness |
| 47 | Kanshudo: skor kegunaan = gabungan frekuensi + faktor lain; kata gramatikal diberi skor tinggi sebagai konstruksi | idem |
| 48 | Nation (dikutip): kata frekuensi tinggi sangat penting; kata fungsi (in, for, the, of) banyak terserap lewat paparan | https://mempowered.memory-key.com/node/8 |
| 49 | Pengajar (Conti): kata frekuensi rendah diperkenalkan bertahap setelah dasar frekuensi tinggi kuat | https://gianfrancoconti.com/2025/04/14/ |

Catatan batas: Reddit asli, ulasan Play Store/App Store, dan halaman bantuan resmi Migaku tak terbaca. Butir 37, 39, 48 lewat ringkasan, bukan teks asli. Keluhan langsung soal "partikel" di aplikasi pesaing tidak ditemukan; yang kuat adalah keluhan soal nama & kata umum.

## 3. Vonis hipotesis
| Hipotesis | Vonis | Dasar |
|---|---|---|
| H1 Nama tokoh di daftar kata baru mengganggu | Terbukti | #18-25, #28 |
| H2 Partikel/kata fungsi tak layak jadi "kata baru" | Terbukti sebagian | #14, #17, #26, #40-41, #46-48; keluhan langsung minim, tapi pesaing menyaring |
| H3 Pesaing menyaring otomatis | Gugur | #1, #10, #12: semuanya manual (kecuali set Jiten) |
| H4 Aturan sederhana tanpa kamus besar cukup | Terbukti sebagian | #41-45 (inti ±30 kata cukup; daftar besar berlebihan; nama tetap meleset, #29) |
| H5 Tebakan huruf besar cukup untuk nama (huruf Latin) | Terbukti sebagian | #20-23; gagal di Jerman (kata benda berhuruf besar), awal kalimat, dan nama yang juga kata (#5); lihat docs/riset-nama-tokoh-terjemahan-mesin.md |
| H6 Daftar pendek lebih baik dari panjang | Terbukti sebagian | #30, #34 (kata umum 2.000 pertama menutup 83%), #32-33 |

## 4. Rekomendasi untuk developer (spesifikasi)

### 4.1 Satu fungsi saring bersama
- Buat `isKataSampah(lang, w, ctx)` di `app.js`; `isKataFungsi`/`isParticle` jadi bagian darinya.
- Pakai di SEMUA tempat 'kata baru': kartu Intip kata bab, status Lanjut baca/FYP, ringkasan, `countedVocab`, `perkiraanBaru`, catatan sesi.
- Telusuri dulu mengapa 'が' masih muncul di status Lanjut baca (laporan Bima/Tari): cari jalur yang tak lewat `isParticle`.
- Data lama (sinkron/IndexedDB): saring saat TAMPIL, jangan hapus data (migrasi `kepo.vocabPart1` sudah ada).

### 4.2 Aturan saring (urut, berhenti di yang pertama cocok)
1. Kosong, angka, tanda baca saja.
2. Huruf tunggal (semua bahasa beralfabet) disaring, termasuk 'a', 'y', 'o', 'I'. Hangul 1 suku: aturan lama (KO_ONE).
3. Ada di daftar partikel/kata fungsi bahasa itu (4.3).
4. Sudah kenal (`isKenal`) atau sudah tersimpan.
5. Nama: ada di `b.names` ATAU (huruf Latin, bukan de, bukan awal kalimat) selalu berhuruf besar di semua kemunculan.
6. Jepang: hiragana <3 huruf (aturan lama) & angka kanji sederhana (一二三 dst) jangan jadi kandidat.

### 4.3 Daftar kata fungsi (±30 per bahasa, huruf kecil)
- ja (sudah 13) tambah: から まで より です ます だ して ない ある いる この その あの これ それ ので けど (±30).
- ko: 은 는 이 가 을 를 에 의 도 로 와 과 에서 에게 으로 까지 부터 한테 처럼 보다 하다 있다 없다 그 이 저 것 수 (+ aturan 1 suku lama).
- zh: 的 了 在 是 我 你 他 她 它 们 这 那 有 不 也 都 和 就 吗 呢 吧 啊 着 过 个 很 要 会 说 到.
- es: el la los las un una de del y o a en que se no por con para es lo su al más pero como le me te mi tu.
- fr: le la les un une des de du et ou à en que qui ne pas pour avec est sur dans au aux ce se sa son je tu il elle nous vous.
- de: der die das den dem des ein eine und oder zu in von mit ist nicht auf für er sie es ich du wir ihr den auch.
- en: the a an and or of to in is it that for on with as was he she they we you I at be this but not are by.
- Bahasa lain: pakai aturan huruf tunggal + minimal panjang 5 (aturan Intip kini); Thai tetap dilewati.
- Aturan kerja: ini daftar awal; tambah lewat masukan tester, bukan kamus besar.

### 4.4 Batas yang ditampilkan
- Intip kata bab: tetap maks 5; sebelum ambil, saring dengan 4.2; kalau sisa <2 kata, sembunyikan kartu.
- Status 'Kata baru' di Lanjut baca/FYP: maks 3 kata; hanya kata yang benar-benar tersimpan/diketuk pengguna (bukan hasil analisis teks).
- Kalau hasil saring kosong: tampilkan tidak ada baris 'Kata baru' (bukan teks kosong/titik).

### 4.5 Cara uji (bisa dijalankan developer)
- Unit cepat di konsol: `isKataSampah('ja','が')` true; `('es','el')` true; `('es','casa')` false; `('en','a')` true; `('de','Haus')` false.
- Buku Jepang (こころ): buka bab, ketuk 3 kata, cek status Lanjut baca & FYP: tak ada が/は/の.
- Buku Inggris (Alice): kartu Intip tak memuat 'the/and/was'; nama 'Alice' tak tampil sebagai kandidat.
- Buku Jerman: kata benda berhuruf besar (mis. 'Haus') TETAP boleh jadi kandidat.
- Buku Korea: tak ada 1 suku partikel (은/는/이/가).
- Data lama berisi 'が': tak tampil, data tetap utuh (tidak dihapus).
- `node --check app.js ui.js`; naikkan versi `C` di `sw.js`.

## 5. Kesimpulan & langkah berikutnya
- Hipotesis utama terbukti: daftar kata baru harus bebas nama & kata fungsi; pesaing menyerahkan ke pengguna, jadi ini celah Keepo.
- Langkah 1: developer kerjakan backlog #80 (satu fungsi saring, 7 bahasa).
- Langkah 2: tester AI uji ulang Home/Lanjut baca & Intip setelah rilis.
- Langkah 3 (nanti): tombol 'Bukan kata baru' sekali ketuk sebagai penguat bila masih ada sampah.
