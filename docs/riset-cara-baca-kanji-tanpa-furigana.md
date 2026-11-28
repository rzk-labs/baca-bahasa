# Riset: cara baca kanji saat suara saja tak cukup (#2024)

## Intinya
- Keluhan pengguna nyata benar: kata Jepang di luar kamus kecil sering tanpa cara baca.
- Suara HP bisa salah baca kanji; bukti luas, jadi kana di sheet arti perlu andal.
- Usul termurah: tampilkan kana dari layanan terjemahan + label "perkiraan" saat bacaan kosong atau ragu.

Pemicu: masukan pengguna nyata 28 Nov 2026: "cara baca furigana untuk janjinya gak ada, kalau cuma ngandelin pendengaran takutnya gk pas".
Tidak mengulang: `riset-cara-baca-romanisasi.md`, `riset-furigana-ruby-epub.md`, `riset-cara-baca-default-mandarin.md`, `riset-pemotongan-kata-jp-kr.md`.

## 1. Kapan cara baca Jepang muncul (dari kode)
Jalur: `translate()` di `app.js` → `jaLookup()` → `jaFind()`; tampil lewat `bacaShow()`/`bacaOf()`.
- **Ada** bila kata ada di `kamus-ja.txt` (406 entri, sangat kecil) atau bentuk dasarnya ketemu lewat `jaCands()` (lepas akhiran ます/た/て/ない dst).
  - Isi: kana + romaji (`今日` → `きょう · kyou`). Kata hiragana saja → romaji saja.
- **Ada (cadangan)** bila kata tak di kamus: `gtxFetch()` mengambil `dt=rm` (kolom ke-4 balasan Google), disimpan lewat `bacaOf()`.
  - Ini ROMAJI dari layanan, bukan kana. Tidak ada jaminan terisi.
  - Belum diuji langsung di riset ini (sandbox tanpa jalur ke layanan itu); perlu uji 20 kata nyata.
- **Kosong** bila:
  - kata di luar kamus dan layanan tak memberi `rm` (nama orang, 田中さん; kata langka; tak ada internet);
  - `jaFind` menolak: kata >12 huruf atau ada spasi (frasa) → langsung `null`;
  - `bacaOf` membuang hasil bila sama dengan kata (`b == w`) atau kata tak mengandung huruf non-Latin;
  - kamus hit tapi nilai kana sama dengan kata → hanya romaji.
- **Kanji bacaan khusus** (今日 vs 生 vs 行った): kamus lokal hanya punya SATU bacaan per kata.
  - `生` sendirian tak ada di kamus; di kalimat bisa せい/なま/う/い. Layanan menebak dari kata tunggal tanpa konteks.
  - `行った` ditangani khusus (`jaCands`: 行 + った → 行く → いく/iku → "iku" padahal bentuk lampau terbaca "itta"). Cara baca ditampilkan untuk bentuk dasar, bukan bentuk yang diketuk.
- **Kalimat**: `#sbaca` (ui.js ~3364) memakai `bacaOf(sent, r.baca)`, jadi tergantung `rm` layanan.
- **Tak ada furigana di teks baca** (sengaja; lihat riset lama). Suara memakai suara bawaan HP, yang tak bisa dipaksa membaca kana tertentu dari app.

## 2. Bukti internet (38 kutipan, 5 halaman sumber)
Catatan jujur: Reddit tak bisa dibuka alat kami; kutipan diambil dari forum LingQ, WaniKani, dan makalah ACL. Pencarian lain (Readlang, Reddit) hanya memberi ringkasan tanpa kutipan, jadi tak dihitung. Sebagian ringkasan pencarian memuat pernyataan tanpa verifikasi; ditandai di 2.4.

### 2.1 Pemula butuh furigana? ([LingQ: usulan variasi furigana](https://forum.lingq.com/t/variation-of-furigana-exposure-in-japanese-suggestion/28424), 2019)
1. Zelmeister: "reading materials with unknown kanji is too difficult without furigana being switched on"
2. Zelmeister: "we often rely almost exclusively on furigana"
3. Zelmeister: "having furigana appear only above unknown words would be in my opinion not only beneficial"
4. amop567: "start with short, simple content with the furigana turned off."
5. JulieS: "I have to admit I prefer not to have furigana on."
6. JulieS: "If I don't know a word, the hint usually provides the reading."
7. JulieS: "Maybe beginners could have a pop-up (which can be turned off)"

### 2.2 Furigana/transliterasi bisa salah, suara juga ([LingQ: PSA matikan transliterasi](https://forum.lingq.com/t/psa-disable-all-japanese-transliteration-use-text-to-speech/545805))
8. cspotcode: "LingQ's transliteration should be completely disabled, because it's often wrong"
9. cspotcode: "Trust the voice, not LingQ's annotations."
10. cspotcode: "The transliteration is incorrect, it says "gai" but the proper pronunciation is "mochi""
11. cspotcode: "Additionally, kanji tells the voice engine which pitch accent to use."
12. D.lfzM: "the TTS is not always correct about how to pronounce a kanji."
13. D.lfzM: "In short, the transliteration is not reliable, but neither is the TTS, regardless of the script."
14. tricyclecc: "I immediately noticed all of the wrong Furigana."
15. amop567 (thread 2.1): "the lingq furigana isn't always accurate"
16. amop567: "the lingq furigana is much less accurate than google translate because of the way words are spaced."
17. amop567: "the lingq furigana as it is right now poses a significant obstacle to beginning learners"

### 2.3 Furigana membantu atau jadi tongkat? ([WaniKani: baca tanpa furigana](https://community.wanikani.com/t/reading-adult-native-material-without-furigana-feels-like-a-pipe-dream/54653?page=2); [WaniKani: pendapat Jepang soal furigana](https://community.wanikani.com/t/japans-opinion-on-furigana/34658))
18. tahubulat: "Having furigana helped if you don't know that particular word and want to look it up."
19. WeebPotato: "Furigana might seem like a good thing at the start"
20. Vanilla: "they get a ton of help from furigana"
21. amystake: "I then stuck to reading materials with Furigana"
22. tahubulat: "Having furigana sometimes distracts me"
23. tahubulat: "I opt to read the furigana rather than the kanji itself"
24. tahubulat: "which could lead to a bad habit"
25. WeebPotato: "it might become redundant"
26. yamitenshi: "especially in materials without furigana"
27. acm2010: "I think furigana actually help you learn to read Japanese, but you should grow out of 日=ひ eventually."
28. acm2010: "it is a good thing to cover a page without spending 90% of the time looking up readings you have already heard."
29. KinokoNeko: "looking up words when you don't have the readings is a painstaking time-consuming process"
30. KinokoNeko: "they're valuable for people who are still expected to be learning kanji."
31. IanD: "Furigana is definitely training wheels for native speakers (and really, for learners too)."
32. IanD: "I do think that as a learner, you should be training yourself off of texts that are heavy on furigana."
33. OneUp: "material for foreign learners tends to make the furigana large, clear, and easy to read."

### 2.4 Risiko baca kanji salah ([ACL CAWL 2023: homograf kanji tunggal](https://aclanthology.org/2023.cawl-1.7); [LREC 2022](https://aclanthology.org/2022.lrec-1.770))
34. "A single kanji character in modern Japanese may have multiple pronunciations"
35. "This causes a problem for text-to-speech synthesis (TTS)"
36. "The problem is called homograph disambiguation."
37. "This experiment provides the first experimental research in Japanese single kanji homograph disambiguation." (tanpa angka akurasi di halaman)
38. LREC 2022 (ringkasan pencarian): ambiguitas bacaan heteronim "cause wrong reading, which has a serious impact on the text understanding".
- Tidak ditemukan uji publik untuk suara HP pada 今日/生/行った. [Preply](https://preply.com/en/blog/japanese-heteronyms) memakai 生 sebagai contoh utama (せい/なま/う/い) dan [italki](https://www.italki.com/en/blog/japanese-heteronyms) mendaftar 今日=きょう.

### 2.5 Alternatif murah (ringkasan pencarian, bukan kutipan)
- Alat baca [Furiganai](https://addons.mozilla.org/addon/furiganai/): bacaan disembunyikan, ketuk/arahkan untuk lihat, "every line a little recall test".
- [Naruhodo](https://chromewebstore.google.com/detail/naruhodo-%E2%80%94-japanese-readi/olkenlejikehefdanolhknlgfagihdkb) dan [Yomu](https://addons.mozilla.org/en-CA/firefox/addon/yomu-reader/): popup kata menampilkan bacaan saat diketuk/diarahkan.

## 3. Vonis hipotesis
| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| H1 | Pemula/menengah butuh cara baca saat membaca kanji | **Terbukti** | #1, #18, #29, #30; sebagian besar pengguna setuju, hanya "kapan dilepas" yang berbeda |
| H2 | Hanya mengandalkan suara berisiko salah | **Terbukti sebagian** | #12, #13, #34-36; tak ada angka untuk suara HP; uji kata nyata dulu |
| H3 | Furigana permanen bikin ketergantungan | **Terbukti sebagian** | #2, #22-24, #31-32; solusi pengguna: tampil hanya untuk kata tak dikenal (#3) |
| H4 | Kana di sheet arti (ketuk-untuk-lihat) cukup, tanpa furigana di teks | **Terbukti (condong)** | #6, #7, 2.5; cocok dengan aturan lama "furigana jangan di teks dulu" |
| H5 | Layanan gratis (rm) cukup andal sebagai sumber kana | **Belum jelas** | #15-17 (alat lain salah); layanan kami belum diuji |
| H6 | Keluhan ini mewakili banyak pengguna | **Belum jelas** | 1 pengguna nyata; masukan AI tak dihitung (aturan fase 2) |

## 4. Usulan tugas developer (urut dampak)
1. **Label "perkiraan" + cadangan kana saat bacaan kosong/ragu**
   - Layar: sheet arti kata (baris "Cara baca").
   - File: `app.js` (`bacaOf`, `jaFind`), `ui.js` (baris cara baca ~2972/3024), `sw.js` (naikkan C).
   - Isi: bila kosong, tampil "Cara baca belum ada" + tombol Cek ulang; hasil layanan diberi label "perkiraan"; kata >12 huruf/frasa tidak lagi ditolak sebelum layanan dicoba.
   - Risiko: romaji layanan bisa salah; label jujur mengurangi salah paham. Data lama aman (field `baca` tetap).
2. **Kana di kartu Kata & ulang (ketuk-untuk-lihat)**
   - Layar: tab Kata, kartu ulang.
   - File: `ui.js` (render kartu), `style.css`.
   - Risiko: kartu lama tanpa `baca` tetap kosong; perlu isi ulang diam-diam seperti `isiKosong`.
3. **Perluas kamus lokal untuk kata sering muncul + bacaan ganda**
   - Layar: sheet arti (tak ada perubahan tampilan).
   - File: `kamus-ja.txt` (data saja), `sw.js`.
   - Risiko: ukuran berkas naik; format `kana|` satu bacaan, bacaan ganda (生) butuh format baru + migrasi ringan.
- Jangan dulu: furigana permanen di teks baca (sudah diputuskan di riset lama; memicu ketergantungan, #2, #31).

## 5. Langkah berikutnya
- Developer: tugas 1 (backlog #199).
- Riset/QA: uji 20 kata Jepang nyata (nama, frasa, 今日/生/行った) di app live; catat berapa yang bacaannya kosong.
- Wawancara: tanya pengguna pengirim masukan, bacaan apa yang dicari saat itu.
