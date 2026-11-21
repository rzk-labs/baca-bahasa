# Riset #1025: Pinyin/furigana otomatis nyala untuk pembaca Mandarin?

Status: selesai (bukti internet, 14 Nov 2026). Reddit & ulasan toko tidak terbaca; pakai forum, blog, dokumen produk, dan studi.
Jenis sumber: 📚 studi · 💬 forum pengguna · 📝 blog/ulasan · 📖 dokumen produk.

## Intinya
- Pemula Mandarin butuh pinyin dari awal. Yang bikin kesal: sulit menemukan tombolnya.
- Bukti "pinyin pasti jadi tongkat" lemah. Yang jelas buruk: tampil terus tanpa bisa dimatikan.
- Usul P0: tanya sekali saat buku Mandarin dibuka, default "Nyala", mudah dimatikan.

## 1. Kondisi Keepo sekarang
- Pengaturan "Cara baca di atas kata": Mati / Pernah kuketuk / Semua tersimpan (`ui.js:572`).
- Default `db.rt = 0` = Mati, satu pengaturan untuk semua bahasa (`ui.js:3`).
- Tombol cepat "Cara baca" ada di menu baca untuk ja/ko/zh-CN (`ui.js:1327`); ketuk = Mati ↔ Pernah kuketuk (`ui.js:1309`).
- Jadi pinyin hanya muncul di kata yang sudah diketuk (`ui.js:1245`). Pemula baru melihat kosong.
- Buku belum punya data level; level hanya bisa lewat pertanyaan saat impor.
- Riset lama (`docs/riset-cara-baca-romanisasi.md`) ditulis dari ingatan, tanpa internet.

## 2. Bukti (36 kutipan)
### Studi 📚
1. [Studi 31.000+ murid Jepang: furigana tak menaikkan pemahaman signifikan](https://escholarship.org/content/qt41c5p41c/qt41c5p41c.pdf?t=sgin1r)
2. [Jurnal Psikologi Jepang: furigana yang tepat mempercepat baca kanji, tergantung jenis bacaan](https://www.jstage.jst.go.jp/article/jjpsy1926/50/2/50_2_101/_article/-char/en)
3. [Tesis BYU: pembelajar ber-furigana lebih sering menebak kata kanji asing dengan benar](https://scholarsarchive.byu.edu/etd/3235)
4. [Tesis BYU 2022: eye-tracking pemula Mandarin, pinyin membantu atau mengalihkan?](https://scholarsarchive.byu.edu/etd/9461/)
5. [Kyoto: pembaca mahir memproses kanji secara bunyi saat memahami](https://cogpsy.educ.kyoto-u.ac.jp/psychologia/ab/4249.htm)
6. [Duke: pola tatap kanji vs hiragana beda pada anak, tidak pada dewasa](https://scholars.duke.edu/publication/1042662)
7. [Studi remaja Indonesia: keterampilan pinyin memprediksi pemahaman bacaan](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.596680/pdf)
8. [Frontiers 2022: transkripsi fonetik dan pembelajaran bahasa kedua](https://www.frontiersin.org/journals/communication/articles/10.3389/fcomm.2022.629349/pdf)
9. [Cambridge: membaca pinyin mengaktifkan karakter, hanya pada pelajar mahir](https://www-cambridge-org.ezproxyberklee.flo.org/core/journals/bilingualism-language-and-cognition/article/reading-pinyin-activates-character-orthography-for-highly-experienced-learners-of-chinese/20B74CCBBBA28B3E1C5735833A3FD9E1)
10. [Makalah TAL 2018: karakter lebih efektif dari pinyin untuk mengingat nada kata baru (pelajar mahir)](https://mail.sprosig.org/tal2018/180620_oral_session_9/TAL_2018_paper_15.pdf)
11. [Studi 124 mahasiswa: okurigana dan konteks menaikkan akurasi baca kanji](https://metatoc.com/papers/118821-the-roles-of-okurigana-and-lexical-context-in-reading-kanji-words-with-kun-reading-and-their-relationship-to-reading-amount)

### Forum pengguna 💬
12. [LingQ: "Chinese Pinyin, how to remove?"; pengguna minta pinyin mati untuk kata yang dikenal](https://forum.lingq.com/t/chinese-pinyin-how-to-remove/37233)
13. [LingQ: "Mandarin, please add a pinyin off function"; ada setelan pinyin hanya level 1-3](https://forum.lingq.com/t/mandarin-please-add-a-pinyin-off-function/695725)
14. [LingQ: furigana nyaris wajib untuk pemula yang baca di LingQ](https://forum.lingq.com/t/text-size-option-for-furigana/38666)
15. [LingQ: usul pintasan untuk menyalakan/mematikan pinyin di pelajaran](https://forum.lingq.com/t/adding-a-shortcut-to-toggle-pinyin-in-lessons/31264)
16. [LingQ: usul "matikan hiragana hanya untuk kata yang dikenal"](https://forum.lingq.com/t/turn-off-hiragana-for-only-known-words/32916)
17. [LingQ tutor: pakai pinyin selama perlu, lalu matikan untuk menguji bacaan nyata](https://www.lingq.com/en/forum/learning-chinese-forum-ask-a-tutor/if-learning-chinese-should-you/)
18. [Readlang: pengguna tak menemukan tempat menyalakan pinyin; pinyin kecil & sesak](https://forum.readlang.com/t/is-it-possible-to-display-pinyin-pronunciation-for-mandarin-chinese/268/4)
19. [Readlang: pinyin di kartu hafal; saklar "AA" berlaku juga di latihan](https://forum.readlang.com/t/turn-off-pinyin-in-flashcards/1754)
20. [Readlang: fitur furigana & pinyin eksperimental diumumkan](https://forum.readlang.com/t/calling-japanese-and-chinese-learners-please-try-new-furigana-and-pinyin-feature-experimental/284)
21. [Clozemaster: pengguna bertanya cara mematikan pinyin](https://forum.clozemaster.com/t/turning-off-pinyin-in-mandarin-chinese/7389)
22. [Language Reactor: opsi pinyin berlabel "Transliterations", terlewat pengguna](https://forum.languagelearningwithnetflix.com/t/pinyin-support-for-chinese-mandarin-subtitles/46?page=2)
23. [Language Reactor: usul pinyin tampil menurut level kata di subtitle](https://forum.languagelearningwithnetflix.com/t/feature-suggestion-chinese-subtitles-pinyin-no-pinyin-option/6131)
24. [Language Reactor: huruf kanji menyesaki layar](https://forum.languagelearningwithnetflix.com/t/kanji-readings-cluttering-screen/6249)
25. [Pleco forum: minta pinyin + karakter sekaligus di Reader; tak ada di pengaturan](https://plecoforums.com/goto/post?id=37472)
26. [Skritter: saran setelan untuk pelajar Mandarin (sembunyikan bacaan saat ulas)](https://discourse.skritter.com/t/setting-suggestion-for-chinese-learners/2868)
27. [Chinese-Forums: "Pinyin or no pinyin"](https://chinese-forums.com/forums/topic/5740-pinyin-or-no-pinyin)
28. [Chinese-Forums: suka tidaknya situs memberi pinyin untuk hanzi](https://chinese-forums.com/forums/topic/34852-do-you-prefer-websites-to-give-pinyin-transcriptions-when-hanzi-are-used)
29. [Chinese-Forums: pinyin Graded Reader Sinolingua dikritik, tapi masih berguna](https://chinese-forums.com/forums/topic/42186-graded-chinese-reader-by-sinolingua)
30. [italki: belajar Hangul dulu; romanisasi hanya cadangan](https://www.italki.com/nl/post/discussion-54048)

### Blog & ulasan 📝
31. [Mandarin Companion: pinyin itu tongkat, dan kadang kita butuh tongkat](https://mandarincompanion.com/?p=5135)
32. [Hacking Chinese: pinyin hampir tak perlu sebagai alat bantu baca](https://www.hackingchinese.com/?p=9865)
33. [Hacking Chinese: fokus ke nada tanpa terganggu pinyin](https://www.hackingchinese.com/focusing-on-mandarin-tones-without-being-distracted-by-pinyin/)
34. [LingoAce: risiko bergantung pinyin terlalu lama, karakter dilewati](https://www.lingoace.com/blog/turning-chinese-characters-into-pinyin)
35. [Polyglottist: pinyin dulu atau karakter dulu? Plus-minus](https://www.polyglottistlanguageacademy.com/language-culture-travelling-blog/2025/7/16/should-you-learn-pinyin-before-characters-pros-and-cons)
36. [Ninchanese: ulasan Du Chinese; tombol pinyin di layar teks](https://ninchanese.com/blog/2022/10/18/du-chinese-review-of-a-great-graded-reader/)
37. [DigMandarin: ulasan Du Chinese](https://www.digmandarin.com/duchinese-review.html)
38. [GoEast: ulasan Du Chinese; pinyin bisa dimatikan agar belajar baca karakter](https://goeastmandarin.com/du-chinese-review/)
39. [Talk To Me In Korean: romanisasi tongkat awal yang cepat jadi penghambat](https://blog.talktomeinkorean.com/romanization-in-korean-insights-from-our-hangeul-day-street-interview/)
40. [Korean American Center: romanisasi hanya jembatan sementara](https://koreanamericancenter.org/?p=19071)

### Dokumen produk 📖
41. [WaniKani: sikap resmi, furigana menghambat belajar kanji (pendapat perusahaan)](https://knowledge.wanikani.com/japanese/wanikani/furigana/)
42. [Pleco manual: opsi pelafalan Mandarin: Tidak ada / pinyin bertanda nada / nomor nada](https://www.pleco.com/anmanual/settings.html)
43. [Migaku: setelan Mandarin di ikon ekstensi; pinyin/zhuyin/tak ada](https://migaku.com/blog/youtube/mandarin-specific-features-migaku-browser-extension)
44. [Satori Reader: furigana adaptif, hanya untuk kanji yang belum dipelajari](https://www.satorireader.com/how-it-works)
45. [Du Chinese (Google Play): halaman aplikasi, fitur baca ber-pinyin](https://play.google.com/store/apps/details?id=org.sinamon.duchinese&hl=en_US)
46. [FluentU: cara melihat lebih sedikit pinyin dan lebih banyak hanzi](https://support.fluentu.com/en/article/how-can-i-see-less-pinyin-and-more-chinese-characters-hanzi-1hzzn55)
47. [PinyinView: hanya menandai kata yang belum dikuasai](https://apps.apple.com/vg/app/pinyinview/id1637770754)
48. [Plugin Obsidian "Chinese Comprehensible Input": kata dikenal tanpa bantuan](https://dev.obsidianstats.com/plugins/chinese-comprehensible-input)

## 3. Tabel pesaing (default & lokasi pengaturan)
| App | Default (bukti) | Lokasi / cara matikan |
|---|---|---|
| Du Chinese | Tidak terdokumentasi publik; ulasan: pemula dapat pinyin (#36, #38) | Tombol langsung di layar teks; ada "hanya kata di atas levelmu" |
| LingQ | Tidak terdokumentasi; pengguna minta matikan (#12) | Pengaturan > Reader > Asian Script > Transliteration Style; opsi level 1-3 (#13) |
| Readlang | Tidak terdokumentasi; pengguna tak menemukan (#18) | Tab "AA" di pembaca; berlaku juga di latihan (#19) |
| Pleco | Pelafalan Mandarin sebagai opsi (#42) | Pengaturan; pengguna minta tampil bersama karakter (#25) |
| Language Reactor | Opsi berlabel "Transliterations" (#22) | Ikon gerigi; pengguna salah baca label |
| Migaku | Tidak terdokumentasi (#43) | Ikon ekstensi; pilihan pinyin / zhuyin / tidak ada |
| Satori Reader (Jepang) | Adaptif ke kanji yang belum dikenal (#44) | Pengaturan tampilan |

Catatan: "default" tidak ditemukan terdokumentasi di tiga pesaing. Kolom ini sengaja jujur: belum jelas.

## 4. Hipotesis & vonis
### H1. Pemula lebih baik dengan cara baca nyala sejak awal daripada tombol yang mudah ditemukan
- **Vonis: terbukti sebagian.**
- Pendukung: #14, #31, #35, #36, #17 (pakai selama perlu, lalu matikan).
- Syarat: harus gampang dimatikan. Keluhan terbanyak soal tombol sulit ditemukan: #18, #22, #12.
- Tak ada studi langsung "nyala vs tombol". Ini kesimpulan dari pola.

### H2. Pinyin yang selalu tampil jadi tongkat dan menghambat belajar hanzi
- **Vonis: belum jelas.**
- Menghambat: #32, #34, #39 (Korea), #41 (WaniKani, pendapat bisnis).
- Tidak menghambat/membantu: #3, #7, #2; studi besar #1 tak menemukan efek pemahaman.
- Studi langsung eye-tracking: #4 ada, hasil tidak terbaca.
- Yang cukup jelas: pinyin yang tak bisa dimatikan merugikan (#12, #26, #38).

### H3. Pesaing menyembunyikan pengaturan, pengguna bingung menemukannya
- **Vonis: terbukti sebagian.**
- Terbukti: #18 (tak ketemu), #22 (label salah), #25 (tak ada opsi), #12 (cara mematikan).
- Semua pesaing menyediakan saklar; default mereka tak terdokumentasi.

### H4. Opsi tengah (hanya kata baru/belum dikenal) lebih disukai
- **Vonis: terbukti sebagian.**
- Ada permintaan nyata: #12, #16, #23. Ada implementasi: #13, #44, #47, #48.
- Belum ada bukti uji bahwa ini mengalahkan pilihan lain. Perlu uji kecil di Keepo.

### H5. "Default mati untuk A2-B1" (riset lama) berlaku untuk Mandarin pemula
- **Vonis: gugur** untuk pemula Mandarin (A1-A2). Riset lama tanpa internet; bukti baru menyarankan nyala untuk pemula dengan jalan mematikan jelas.
- Tetap benar: Korea (Hangul gampang, #30, #39, #40); default mati.
- Jepang: belum jelas; kanji tak tertebak, tapi furigana menghambat (#41). Ikut pilihan pengguna.

## 5. Opsi tengah yang diuji
| Opsi | Plus | Minus |
|---|---|---|
| A. Nyala otomatis untuk semua buku Mandarin | Sinta puas; nol langkah | Bisa jadi tongkat; pembaca mahir terganggu |
| B. Tanya sekali saat impor/buka buku | Sadar pilihan; gampang diubah | Satu ketukan ekstra |
| C. Tampil hanya di kata baru | Tidak jadi tongkat; makin bersih | Perlu sumber pinyin & data "kata dikenal" |
| D. Level buku pemula → nyala | Otomatis | Buku Keepo tak punya level; tebakan salah |

Pilihan: **B sekarang, C bertahap.** D ditunda (tak ada data level).

## 6. Kesimpulan
- Default Mati untuk Mandarin pemula salah arah. Sinta benar.
- Jangan nyala diam-diam. Tanya sekali, tawarkan 3 pilihan, ingat jawabannya.
- Jalan matikan harus 1 ketukan dan terlihat di layar baca.
- Batasan: bukti utama dari forum & blog; studi langsung tentang pinyin di aplikasi baca belum ada.

## 7. Usul P0 untuk developer (backlog #100)
- **Bahasa:** hanya `zh-CN`. Jepang & Korea tidak berubah (tetap Mati).
- **Kapan:** pertama kali buku `zh-CN` dibuka (dan setiap kali bila belum pernah memilih). Satu kali.
- **Pertanyaan:** "Mau pinyin di atas kata?" Tiga tombol:
  - "Nyala" (disorot, untuk pemula)
  - "Hanya kata baru" (kata yang belum kamu ketuk/simpan)
  - "Mati"
- **Level:** pilihan = level. "Nyala" untuk pemula; "Hanya kata baru" untuk yang sudah bisa sedikit.
- **Tombol:** chip "Cara baca" di menu baca tetap ada (`ui.js:1327`); tampil sebagai "Pinyin" untuk zh-CN dengan status Nyala/Baru/Mati.
- **Cara matikan:** satu ketukan di chip itu, atau di Pengaturan baca (`ui.js:572`). Toast: "Pinyin mati. Nyalakan lagi di menu Cara baca."
- **Simpan:** pilihan per bahasa (bukan global `db.rt`), tanpa mengubah data lama. Pengguna lama dengan `rt` terpilih tidak ditanya.
- **Ketergantungan:** pinyin untuk kata yang belum diketuk butuh sumber pinyin. Cek sumber pada gtx (transliterasi) atau tabel kecil dulu; bila tak ada, mode "Nyala" jatuh ke "semua tersimpan" dan tulis jujur di toast.
- **Tes:** buku zh-CN baru muncul pertanyaan; pilih Mati; buka lagi tidak ditanya; chip mengganti mode.

## 8. Langkah berikutnya
- Developer kerjakan backlog #100.
- Setelah live: ukur berapa persen pilih Nyala / Baru / Mati (beta, 4 minggu).
- Riset lanjutan kecil: baca hasil eye-tracking BYU (#4) bila tersedia penuh.
- Mockup rencana: `docs/mockup-1025.html`.
