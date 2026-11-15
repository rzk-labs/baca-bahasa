# Riset: label level kata (HSK / JLPT / TOPIK) di kartu kata (#1176)

Asal masukan: Sinta (pengguna AI, belajar HSK 3) minta label HSK di kartu kata.
(validasi bukti internet) 33 bukti dari 5 jenis sumber. Reddit asli & ulasan toko tak terbaca langsung (hanya cermin/ringkasan).

## Intinya
- Ya, tapi **Mandarin (HSK) dulu**. Satu chip kecil "HSK 3" di baris jenis kata.
- JLPT: tunda. Daftarnya tidak resmi dan sering beda antar sumber.
- TOPIK: tunda. Belum ada daftar berlisensi jelas.

## 1. Bukti (33 butir, 5 jenis sumber)

### A. Forum & komunitas pengguna (kegunaan label)
1. [LingQ: tag HSK 3.0 per level pakai Excel](https://forum.lingq.com/t/title-streamlining-hsk-30-vocabulary-tagging-for-efficient-chinese-language-learning-applicable-to-any-language/280313) — pengguna repot memberi tag level sendiri; 0 balasan.
2. [Panduan komunitas LingQ](https://zenith-raincoat-5cf.notion.site/Community-Advice-d2ccc8365107479699928e1afbeba348) — tag tambahan "pada umumnya tidak perlu"; cukup status kenal/belum.
3. [Language Reactor: warnai kata Mandarin per level HSK](https://forum.languagelearningwithnetflix.com/t/color-chinese-word-by-hsk-level/12049) — untuk menilai tingkat sulit dialog & prioritas belajar.
4. Balasan di utas yang sama minta fitur serupa untuk JLPT.
5. [Language Reactor: ekstensi HSK Highlighter](https://chromewebstore.google.com/detail/hsk-highlighter-learn-chi/aibakbnejjgionlfeallhdmflmgjlkfd?hl=en) — pihak ketiga mengisi celah; level HSK tidak ada bawaan.
6. [Language Reactor: warna bawaan](https://languagereactor.com/help/saving-words-transition) — hanya putih (kenal) dan oranye (belajar), bukan level.
7. [Migaku: "bisa lihat level JLPT kata?"](https://migaku.com/community/m/1314417192489582672) — pengguna ingat fitur lama, kini hanya tingkat pemakaian.
8. Migaku: pengguna minta statistik N3/N4 yang sudah dimining (progres per level).
9. [Migaku: tandai semua kata sampai N4 sebagai kenal?](https://migaku.com/community/c/1125648920815607828?page=12) — harus tempel daftar manual; level dipakai untuk menandai massal.
10. [Readlang: frekuensi kata](https://forum.readlang.com/t/every-word-by-frequency/560) — tabel frekuensi ada tapi tak dibuka; tak ada permintaan khusus HSK/JLPT.
11. [Readlang: usul "level of proficiency"](https://readlang.uservoice.com/forums/192149-general/suggestions/46191586-level-of-proficiency) — penilaian level otomatis bisa meleset (cerita A1 Turki dinilai C1).
12. [Pleco forum: kartu HSK 3.0](https://www.plecoforums.com/goto/post?id=58173) — pengguna sangat aktif pakai daftar HSK; daftar lama & baru menumpuk ganda.
13. Pleco forum: dek HSK 4 hanya 995 kartu, bukan 1.000 — daftar buatan komunitas bisa salah hitung.
14. [Cermin r/LearnJapanese (Feb 2025)](https://reddit.birdcat.cafe/r/LearnJapanese/comments/1ih45a9/daily_thread_simple_questions_comments_that_dont/mav4ugo/?context=3) — "level JLPT arbitrer; kamus frekuensi lebih bisa diandalkan".
15. Utas yang sama: kata umum berlabel N5 = sinyal kuat untuk dipelajari; pasang kamus frekuensi dan level bersamaan.
16. [Hanzihero: HSK di tiap halaman item](https://community.hanzihero.com/t/hsk-level-on-each-item-page/133) — tim menambah level sebagai langkah awal "lihat progres"; bukan permintaan pengguna.
17. [Hanzihero: belajar kata jarang dipakai](https://community.hanzihero.com/t/learning-words-that-are-rarely-used/7722) — pengguna khawatir daftar level memuat kata jarang.

### B. Ulasan & panduan pesaing
18. [Jisho: cara kerja tag JLPT](https://jisho.org/forum/5ecae6e412a5376f10000003-how-do-the-jlpt-tags-work) — kata mudah (めがね) muncul sebagai N1 karena kanjinya N1.
19. [Jisho: kata "umum"](https://jisho.org/forum/5ac1ef7c12a537285b0000a8-how-does-jisho-dot-com-decide-whether-a-word-is-a-common-word-or-not) — penanda manual dari JMdict, "bisa kurang akurat".
20. [Kanshudo: bayangan JLPT](https://www.kanshudo.com/blog/usefulness_shadow_JLPT) — daftar JLPT dari Wikipedia/Tanos; bentuk tertulis sering bukan yang paling berguna.
21. [Kanshudo: prioritas kosakata](https://www.kanshudo.com/howto/usefulness) — memakai JLPT + frekuensi + ±30 faktor (klaim sendiri).
22. [HSKLord](https://hsklord.com/blog/best-chinese-learning-websites) — situs belajar menata semua kata per level HSK; level jadi cara utama memilah.
23. [Ulasan LingQ (Lingopie)](https://lingopie.com/blog/lingq-review/) — pemilihan konten sesuai level diserahkan ke pengguna.

### C. Sumber data & lisensi
24. [ivankra/hsk30](https://github.com/ivankra/hsk30) — 11.092 kata, level 1–6 dan "7-9"; kode MIT, data "mungkin domain publik" (asal dokumen resmi RRC).
25. Repo yang sama: hasil OCR dokumen PDF, "mungkin ada galat terutama level tinggi".
26. [drkameleon/complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) — JSON HSK 2.0 dan 3.0, lisensi MIT; arti dari CC-CEDICT.
27. [CC-CEDICT](https://cc-cedict.org/wiki/) — lisensi CC BY-SA 4.0 (wajib sebut sumber, bagi sama).
28. [EDRDG / JMdict](https://www.edrdg.org/edrdg/license.html) — CC BY-SA (3.0 per salinan Debian).
29. [Tanos (Jonathan Waller)](https://www.tanos.co.uk/jlpt/jlpt3) — daftar JLPT berlisensi CC BY, tapi penyelenggara JLPT menyatakan tidak merilis daftar resmi.
30. [Diskusi jmdict-i18n](https://groups.google.com/g/jmdict-i18n/c/YLAuRoqIKqI) — data level JLPT turunan Tanos/Tagaini; kredit harus ke sumbernya.
31. [Utas kanji N4](https://japaneseclass.jp/feeds/comment/7969) — jumlah kanji N4 beda: 284 (JLPTStudy) vs 245 (Tanos/Jisho).
32. [TopikGuide](https://www.topikguide.com/complete-topik-vocabulary-list/) — daftar TOPIK tak berlisensi jelas; sebagian turunan makalah 2011; label A/B/C buatan situs.
33. [data.go.kr: data TOPIK](https://www.data.go.kr/en/data/3059526/fileData.do) — data resmi hanya statistik ujian, bukan daftar kata.

### D. Dokumen perubahan versi HSK
Bukti tambahan: [HSKLord 2.0 vs 3.0](https://hsklord.com/blog/hsk-3-0-vs-2-0-comparison) (±5.000 → 11.092 kata; HSK 1 dari 150 → 300; 爱好 turun dari level 3 ke 1), [ThatsMandarin](https://www.thatsmandarin.com/hsk/hsk-level-3-vocabulary-changes-2026/) (daftar 3.0 versi 2021 beda dengan versi 2026), [Hack Chinese](https://www.hackchinese.com/old-vs-new-hsk).

## 2. Vonis hipotesis

| # | Hipotesis | Vonis |
|---|---|---|
| H1 | Label level membantu memilih kata yang dipelajari | **Sebagian** — diminta pelajar Mandarin (3, 9, Sinta); bukti pakai nyata tipis |
| H2 | Level saja kurang; frekuensi tetap penting | **Terbukti** (14, 15, 20, 21) — label = sinyal tambahan |
| H3 | Label JLPT tidak resmi, rawan salah | **Terbukti** (18, 29, 31) |
| H4 | Daftar HSK gratis & boleh dipakai di app tanpa server | **Sebagian** — format & ukuran cocok; lisensi data abu-abu (24) |
| H5 | HSK 2.0 vs 3.0 bisa menyesatkan | **Terbukti** (12, 13, D) — pilih satu versi, sebut jelas |
| H6 | TOPIK punya daftar level berlisensi jelas | **Gugur** untuk sekarang (32, 33) |

## 3. Kesimpulan
- Label level kecil membantu menilai "kata ini mudah/sulit", terutama untuk HSK.
- Pesaing jarang memberinya bawaan; pengguna menambal dengan ekstensi/tag manual. Peluang kecil tapi nyata.
- Risiko terbesar: salah label (versi daftar, kata beda level, kanji tertulis).
- Dua kata salah label merusak kepercayaan lebih besar daripada tanpa label.

## 4. Rekomendasi
- **Ya**, untuk Mandarin saja dulu (HSK 3.0, bahasa `zh`/`zh-CN`).
- JLPT & TOPIK: tidak sekarang. Ulangi bila ada daftar berlisensi jelas.
- Sumber data: ivankra/hsk30 (11.092 kata, tanpa arti), cek ulang file LICENSE saat mengunduh.
- Ukuran (perkiraan): peta kata→level ±90 KB mentah, ±40 KB terkompresi. Belum diukur.
- Label: satu chip kecil "HSK 3" di baris jenis kata kartu kata; tanpa baris baru.
- Kata di luar daftar: tanpa chip (jangan tulis "tidak ada level").

## 5. Spesifikasi developer (1 halaman)
**Tujuan:** kartu "Arti kata" untuk Mandarin menampilkan chip level HSK 3.0.

**Data**
- File baru `hsk.js`: objek `{ "1": "我 你 好 …", "2": "…", … "7": "…" }` (kata dipisah spasi). Dibangun sekali menjadi `Map`.
- Isi dari ivankra/hsk30 `hsk30.csv`: kolom `Simplified`, `Traditional`, `Level`. Level "7-9" jadi `7`.
- Kata kembar level (varian): pakai level terendah.
- Daftar dimuat malas (saat kartu kata Mandarin pertama dibuka), lalu tersimpan di cache offline.

**Tampilan**
- Di `.wmeta` (ui.js sekitar baris 2126), tambah `<span class="lvl" id="wlvl">` setelah `#wpos`.
- Teks: `HSK 1`…`HSK 6`, `HSK 7–9`. Gaya: sama ukuran dengan chip jenis kata; warna Biru Es `#D7EFFF` di atas teks Plum `#351E28`; tanpa tinggi tambahan.
- Hanya bila `b.lang` = `zh`/`zh-CN` dan kata persis ada di daftar. Frasa yang tak ada: tanpa chip.
- Cari kata utuh; bila tidak ada, jangan tebak per huruf.
- Perluasan frasa (‹ ›) dan Pecah per huruf: chip ikut diperbarui.
- Ketuk chip: tidak ada aksi (tanpa menu). `aria-label="Level HSK 3, daftar baru"`.

**Tidak diubah:** data pengguna (tanpa migrasi), `api/`, terjemahan, simpan kata.

**Hak cipta:** tambah satu baris di "Aturan & Hak cipta": "Level kata: daftar HSK 3.0 (Kemendikbud RRC), disusun ulang komunitas (ivankra/hsk30)."

**Selesai bila**
- Kata `你好` → chip "HSK 1"; kata di luar daftar → tanpa chip.
- Offline (mode pesawat): chip tetap muncul setelah daftar pernah dimuat.
- `node --check` lolos; versi `C` di `sw.js` naik; `hsk.js` masuk daftar cache.
- Tes di iPhone Safari: baris kartu tidak patah.

## 6. Langkah berikutnya
- Developer: kerjakan backlog #126.
- Setelah rilis: tanya Sinta apakah chip membantu pilih kata untuk disimpan.
- Riset lanjutan (nanti): daftar JLPT berlisensi bersih (mis. dari JMdict) bila ada permintaan Jepang.

Mockup: `docs/mockup-1176.html`.
