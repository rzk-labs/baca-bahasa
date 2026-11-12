# Riset #482: Dengar sambil baca (suara bacaan) & keterbacaan teks

Validasi bukti internet, 12 Nov 2026.

## Intinya
- Dengar sambil baca terbukti bantu ingat bentuk kata. Cocok jadi tombol opsional.
- Suara bawaan iPhone tak andal untuk Jepang/Korea/Mandarin. Android lebih baik, tapi bervariasi.
- Kanji sering salah dibaca. Beri tanda "suara bisa meleset" dan pilihan lambat.

Catatan jujur: bukti dari hasil pencarian web (cuplikan). Sebagian halaman dibuka penuh (Readium, LingQ). Studi dibaca tingkat abstrak. Reddit & ulasan toko aplikasi tak terbaca. Tak ada uji suara di perangkat nyata.

## 1. Kondisi app sekarang
- `speak()` memakai suara bawaan HP, laju 0,9; tombol lambat 0,45-0,6.
- Suara hanya jalan saat tombol diketuk. Tak ada putar otomatis.
- Pilihan suara per cerita sudah ada (Pengaturan). Ukuran, jarak baris, margin, tema juga sudah ada.
- Belum ada: peringatan jika suara bahasa itu tak ada/salah; pilihan laju umum.

## 2. Tabel kutipan (35 butir, 5 jenis sumber)
Jenis: (A) studi terbit, (B) bug tracker & forum Apple, (C) forum pengguna LingQ, (D) dokumen resmi/teknis, (E) ulasan & blog.

### Dengar sambil baca (studi)
| ID | Kutipan/temuan | Jenis | Tautan |
|---|---|---|---|
| D1 | Chen 2021: kelompok baca+dengar lebih baik mengenali bentuk & arti kata baru | A | https://eld.bl.uk/catalog/100124777204_0x000001 |
| D2 | Chen 2021: tak ada kelompok yang menguasai penuh kata baru | A | https://eld.bl.uk/catalog/100124777204_0x000001 |
| D3 | Malone 2025 (119 pelajar, pelacak mata): audio menarik perhatian ke kata target lebih awal | A | https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/d1c2f29d-e28a-469b-a602-0ae9e64f7ade/content |
| D4 | Malone 2025: kelompok baca+dengar punya representasi kata lebih kokoh | A | https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/d1c2f29d-e28a-469b-a602-0ae9e64f7ade/content |
| D5 | Tesis MSU (63 dewasa): gain arti setara, tapi pengenalan bentuk kata lebih tinggi pada baca+dengar | A | https://d.lib.msu.edu/etd/51331/OBJ/download |
| D6 | 75 pelajar Jepang: baca+dengar ingat lebih banyak bentuk kata lisan daripada hanya dengar | A | https://core.ac.uk/download/521106192.pdf |
| D7 | Webb & Chang 2012, Teng 2018: baca+dengar untung lebih besar daripada baca saja | A | https://eprints.whiterose.ac.uk/193583/6/amac044.pdf |
| D8 | Studi 59 pelajar Kanton: hasil bergantung memori kerja & kontrol perhatian | A | https://www.jbe-platform.com/content/journals/10.1075/itl.24001.jun |
| D9 | Studi SD Barcelona (N=96): baca saja vs baca+audiobook, buku bertingkat | A | https://mdpi.com/2227-7102/13/5/493 |
| D10 | Chen 2021: efek beda menurut kemahiran baca pelajar | A | https://eld.bl.uk/catalog/100124777204_0x000001 |

### Keandalan suara bawaan (iPhone & Android)
| ID | Kutipan/temuan | Jenis | Tautan |
|---|---|---|---|
| S1 | WebKit #250665: daftar suara tak lagi memuat Kyoko (ja-JP) sejak iOS 16.0.2 | B | https://bugs.webkit.org/show_bug.cgi?id=250665 |
| S2 | #250665: teks Jepang masih bisa diucapkan walau tanpa suara Jepang terdaftar | B | https://lists.webkit.org/pipermail/webkit-unassigned/2023-January/1081686.html |
| S3 | Komentar #250665: merusak alat baca pendidikan Jepang (min. dua sistem baca) | B | https://lists.webkit.org/pipermail/webkit-unassigned/2023-January/1081441.html |
| S4 | Forum Apple: ja-JP jalan di iOS 11, gagal di iOS 12 beta | B | https://developer.apple.com/forums/thread/105624 |
| S5 | Forum Apple: sejak iOS 18 suara hilang di Safari (sama di Chrome/Firefox iOS) | B | https://developer.apple.com/forums/thread/764438 |
| S6 | Forum Apple: iOS 18 Safari hanya dapat suara kualitas rendah | B | https://developer.apple.com/forums/thread/764438 |
| S7 | Forum Apple: tak semua suara terpasang muncul di daftar | B | https://developer.apple.com/forums/thread/723503 |
| S8 | Stack Overflow: di iOS hanya satu suara per bahasa yang bisa dipilih | E | https://kaweah.freedombox.rocks/kiwix/stackoverflow.com_en_all_2023-11/questions/50386487/speech-synthesis-can-t-get-mobile-safari-to-change-voice |
| S9 | Readium: suara unduhan tak muncul di Web Speech Safari | D | https://readium.org/speech/docs/WebSpeech.html |
| S10 | Readium: memasang suara kualitas tinggi bisa menghapus suara bawaan di Safari | D | https://readium.org/speech/docs/WebSpeech.html |
| S11 | Readium: semua browser iOS memakai mesin Safari, jadi sama | D | https://readium.org/speech/docs/WebSpeech.html |
| S12 | Readium: Chrome Android daftar bahasa tak disaring; bahasa tak terpasang jatuh ke suara Inggris | D | https://readium.org/speech/docs/WebSpeech.html |
| S13 | Readium: Android hanya pra-pasang bahasa sistem & populer; Android baru punya 67 suara bagus (Apr 2024) | D | https://readium.org/speech/docs/WebSpeech.html |
| S14 | Stack Overflow: Chrome Android 46 mengembalikan 0 suara di panggilan pertama | E | https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/33889107/speech-synthesis-in-chrome-for-android-not-loading-voices |
| S15 | Daftar suara bervariasi menurut pabrik HP & versi Android | E | https://www.testmuai.com/learning-hub/speech-synthesis-api-browser-support/ |
| S16 | Forum Apple: dialek Mandarin (zh-TW/zh-HK) bisa tak sesuai permintaan di iOS 18 | B | https://developer.apple.com/forums/thread/788218 |

### Kanji, nama & kualitas (pengguna)
| ID | Kutipan/temuan | Jenis | Tautan |
|---|---|---|---|
| K1 | devinbrazier1: "anytime there are kanji, the pronunciation error rate is at least 20%" | C | https://forum.lingq.com/t/will-japanese-ai-tts-ever-be-functional/2620800 |
| K2 | devinbrazier1: 受容 benar sendiri (じゅよう), salah dalam kalimat (しゅよう) | C | https://forum.lingq.com/t/will-japanese-ai-tts-ever-be-functional/2620800 |
| K3 | scrubtaku: TTS seperti memilih bacaan kun, bukan on | C | https://forum.lingq.com/t/will-japanese-ai-tts-ever-be-functional/2620800 |
| K4 | LingQ: suara Jepang membaca romaji seperti bahasa Inggris | C | https://forum.lingq.com/t/japanese-voice-for-words-incorrect/408626 |
| K5 | LingQ: transliterasi menimpa bacaan kanji, suara mengucap hiragana; saran matikan | C | https://forum.lingq.com/t/psa-disable-all-japanese-transliteration-use-text-to-speech/545805 |
| K6 | LingQ: spasi antar huruf Mandarin bikin suara tersendat | C | https://forum.lingq.com/t/issues-with-chinese-on-lingq/69975 |
| K7 | LingQ: pinyin & audio pelajaran Mandarin sering salah | C | https://forum.lingq.com/t/the-pinyin-and-audio-on-the-chinese-lessons-in-lingq-is-frequently-incorrect/2305684 |
| K8 | Pengguna LingQ: suara "robotic", minta TTS lebih baik | C | https://forum.lingq.com/t/improving-text-to-speech-tts-quality-a-friendly-call-for-updates-%F0%9F%8C%9F/1045382 |

### Laju lambat & kontrol
| ID | Kutipan/temuan | Jenis | Tautan |
|---|---|---|---|
| L1 | FluentU: LingQ bisa memperlambat/mempercepat rekaman untuk bantu atau menantang | E | https://www.fluentu.com/blog/lingq-review/ |
| L2 | FluentU: Beelinguapp audio lambat tiap cerita, tak pernah naik ke laju alami | E | https://www.fluentu.com/blog/beelingapp-review/ |
| L3 | FluentU: kontrol Beelinguapp kadang tak responsif | E | https://www.fluentu.com/blog/beelingapp-review/ |

### Keterbacaan teks
| ID | Kutipan/temuan | Jenis | Tautan |
|---|---|---|---|
| T1 | Rello dkk 2013: ukuran huruf memengaruhi keterbacaan; disarankan 18 pt untuk disleksia | A | https://a11y-paradise.onrender.com/reviews/69c083aebb27ccd8963e779f |
| T2 | Rello dkk 2013: jarak baris tak berpengaruh nyata (bertentangan dengan saran 1,4-2,0) | A | https://a11y-paradise.onrender.com/reviews/69c083aebb27ccd8963e779f |
| T3 | Ulasan: khasiat font Dyslexie karena pengaturan jarak, bukan bentuk huruf | A | https://pubmed.ncbi.nlm.nih.gov/27194598/ |
| T4 | WCAG 1.4.3: kontras teks minimal 4,5:1 (besar 3:1) | D | https://w3c.github.io/wcag/understanding/contrast-minimum.html |
| T5 | WCAG 1.4.4: teks harus bisa diperbesar 200% tanpa kehilangan isi | D | https://dequeuniversity.com/checklists/web/text |
| T6 | WCAG 1.4.12: tata letak tak rusak saat pengguna menaikkan jarak (baris 1,5; huruf 0,12; kata 0,16) | D | https://w3.org/WAI/WCAG21/QuickRef/ |

Total 43 butir (35 dihitung ketat, 8 pendukung). Jenis sumber: 5.

## 3. Vonis hipotesis
| # | Hipotesis | Vonis | Alasan |
|---|---|---|---|
| H1 | Dengar sambil baca mempercepat paham | **Terbukti sebagian** | Bantu bentuk kata & perhatian (D1-D7). Arti setara, penguasaan penuh belum (D2, D5). |
| H2 | Suara bawaan iOS cukup untuk bahasa Asia | **Gugur** | Suara Jepang hilang dari daftar, suara iOS 18 turun mutu, satu suara per bahasa (S1-S10, S16). |
| H3 | Suara sering salah baca kanji/nama | **Terbukti** | Galat ±20% pada kanji, bacaan salah dalam kalimat (K1-K5). Catatan: ini suara cloud LingQ; bawaan HP belum diuji. |
| H4 | Laju lambat penting untuk pemula | **Terbukti sebagian** | Kompetitor menjual laju lambat/atur (L1, L2). Bukti studi langsung belum ada. |
| H5 | Kontrol ukuran/jarak teks perlu | **Terbukti sebagian** | Ukuran berpengaruh (T1), jarak baris kurang jelas (T2). WCAG minta tak rusak (T5, T6). App sudah punya. |
| H6 | Putar otomatis mengganggu baca tenang | **Belum jelas** | Tak ada bukti langsung. Prinsip "baca tenang" mendukung bawaan mati; tombol manual cukup. |

Hasil: 1 terbukti, 3 terbukti sebagian, 1 gugur, 1 belum jelas.

## 4. Kesimpulan
- Tombol dengar manual sudah tepat. Jangan jadikan putar otomatis.
- Untuk Jepang/Korea/Mandarin di iPhone, anggap suara tak dijamin ada.
- Android Chrome lebih luas, tetapi bisa jatuh ke suara Inggris diam-diam.
- Arab, Spanyol, Inggris: tak ada bukti masalah khusus; Arab belum ada kutipan, belum jelas.

## 5. Usulan perbaikan (kecil)
- **P0:** Cek suara sebelum bunyi. Jika tak ada suara bahasa itu, toast jelas: "HP ini belum punya suara Jepang. Pasang di Pengaturan HP." Hindari jatuh ke Inggris.
- **P0:** Di sheet arti, tambah tanda kecil di tombol suara: "suara bawaan HP, bisa meleset di kanji".
- **P1:** Satu pilihan laju (Normal / Lambat) di Pengaturan, berlaku semua tombol dengar.

## 6. Langkah berikutnya
- Developer: bungkus `speak()` dengan cek suara + pesan (P0).
- Tester: coba di iPhone & Android nyata untuk 6 bahasa; ini penguat.
- Riset lanjut (opsional): uji suara bawaan HP langsung, Reddit & ulasan toko.
