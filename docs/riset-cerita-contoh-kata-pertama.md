# Riset: cerita contoh pendek + kata pertama dipandu untuk pembaca baru

Tugas #1494 (tahap 22). Bukti internet, bukan data pengguna Keepo. Pelengkap `docs/riset-sesi-pertama.md`, `docs/riset-petunjuk-onboarding-baca.md`, `docs/riset-aktivasi-hari-pertama-patokan.md`. Isinya tidak diulang.

## Intinya
- Arah benar, tapi belum ada uji langsung. Tak ada studi "ketuk kata dipandu" di app baca.
- Pandu satu aksi saja, boleh dilewati, tak menutup teks. Ini didukung bukti UX.
- Angka panjang cerita (kalimat/menit) tak ada sumbernya. Uji sendiri lewat /hitung.

## 1. Cara kerja
- 54 butir dari 5 jenis sumber: forum, riset UX, blog praktisi/vendor, studi akademik, ulasan & toko app.
- Pencarian: LingQ, Readlang, Language Reactor, Duolingo, studi onboarding & baca bahasa kedua.
- Tak terbaca: Reddit, Threads/X (pencarian tak mengembalikan tautan). Ulasan toko hanya daftar app & ulasan situs.
- Mutu: ★ riset/studi, ☆ forum/blog/vendor. Angka vendor hanya arah.
- Tidak mengulang butir E1-E46 dan [1]-[50] di dokumen lama.

## 2. Vonis 4 klaim
| # | Klaim | Vonis |
|---|---|---|
| H1 | Cerita contoh 1-2 kalimat lebih baik dari upload buku sendiri di sesi pertama | **Sebagian** (condong benar) |
| H2 | Satu ketukan kata dipandu menaikkan ketuk kata hari pertama | **Belum jelas** (condong benar) |
| H3 | Panjang cerita contoh ideal (kalimat/menit) | **Belum jelas** |
| H4 | Pemandu yang bisa dilewati tidak mengganggu | **Sebagian** |

### H1. Cerita contoh vs buku sendiri: sebagian
- Dukungan: pemula LingQ bingung di awal, minta alur terpandu & mini-cerita (B1-B8).
- Dukungan: app pembaca beri buku/cerita awal gratis; Readlang pakai cerita pemula komunitas (E1, E2, E11).
- Dukungan: prinsip "contoh nyata lebih cepat dari layar kosong" (C3, C4).
- Batas: tak ada uji cerita contoh vs impor sendiri di app baca. Semua tak langsung.
- Batas: ulasan menyebut app bacaan penuh kurang cocok untuk pemula total (E3, E4, E5).
- 1-2 kalimat: tak ada sumber. Angka itu usul, bukan temuan.

### H2. Ketukan kata dipandu: belum jelas (condong benar)
- Dukungan: panduan UX: fokus satu interaksi, bukan seluruh layar (A1).
- Dukungan: tur terbaik maju hanya setelah pengguna beraksi (C1, C5).
- Dukungan: Duolingo & Grammarly beri aksi kecil yang langsung berhasil (C2, C3).
- Angka naik (28%→64%, 15%→30%) hanya anekdot vendor, tanpa kontrol (C6, C7).
- Duolingo: ≥4 cerita minggu pertama berkorelasi dengan lanjut; bukan sebab (D1).
- Tak ada angka "ketuk kata hari pertama" untuk app mana pun.

### H3. Panjang cerita contoh: belum jelas
- Studi: teks perlu ±95-98% kata dikenal agar paham, kurvanya bertahap (D2-D4).
- Praktisi: teks pemula cukup 95% paham; sesi A1-A2 20-30 menit (D8).
- Studi: kecepatan baca pemula paling lambat, naik 85→181 kata/menit setelah banyak membaca (D6, D7).
- Tak ada sumber untuk "kalimat per menit" atau panjang cerita pertama.
- Usul uji (hipotesis, bukan temuan): 3 kalimat pendek, ±30-40 kata, kata mudah.

### H4. Pemandu bisa dilewati: sebagian
- Dukungan: tur paksa disebut anti-pola; tur singkat & bisa dilewati disarankan (C8, C9).
- Dukungan: pengguna menutup petunjuk cepat dan jarang membaca (A2, A3, A5).
- Peringatan: banyak petunjuk membuat app tampak rumit (A4, A6).
- Peringatan: petunjuk yang tak bisa ditutup membuat orang keluar (C10).
- Tak ada uji "pemandu bisa dilewati" vs "tanpa pemandu". Dampaknya ke ketuk kata belum terukur.

## 3. Rekomendasi kecil untuk developer (maks 3)
1. **Cerita contoh pertama: 3 kalimat, kata mudah, buka dengan 1 ketukan.** Panjang jadi variabel yang bisa diuji.
2. **Satu kata berdenyut + 1 baris "Ketuk kata ini"; "Lewati" selalu ada.** Hilang setelah ketuk pertama atau Lewati. Tak menutup teks.
3. **Ukur lewat /hitung:** detik ke ketuk pertama, jalur (contoh vs impor), pemandu diketuk vs dilewati.
- Rujukan alur: `docs/riset-sesi-pertama.md` bagian 4; pengukuran: backlog #153.

## 4. Belum terjawab
- Apakah ketuk kata di menit pertama naik karena pemandu atau karena cerita pendek? Perlu uji A/B di Keepo.
- Panjang cerita ideal untuk Gen Z di HP: tak ada angka. Mulai 3 kalimat, ukur.
- Berapa % orang melewati pemandu? Tak ada patokan.
- Suara Reddit & Threads/X: tak terbaca. Ulasan Play Store/App Store spesifik juga tak terbaca.
- Tahap 22 tetap draft: butuh data nyata (aturan_fase2).

## 5. Langkah berikutnya
- Developer: backlog #160 (cerita contoh 3 kalimat + kata pertama dipandu, bisa dilewati).
- Setelah 2 minggu data: bandingkan ketuk kata hari pertama sebelum dan sesudah.
- Founder: setujui mockup `docs/mockup-1494.html`.

## 6. Tabel bukti (54 butir)
Jenis: A = riset UX, B = forum pengguna, C = blog praktisi/vendor, D = studi akademik, E = ulasan & toko app. Mutu ★/☆.

### A. Riset UX (NN/g & lain), 7 butir
| # | Temuan | Mutu | Tautan |
|---|---|---|---|
| A1 | Fokus satu interaksi, bukan semua area layar | ★ | https://www.nngroup.com/articles/mobile-instructional-overlay/ |
| A2 | Pengguna menutup overlay cepat, tak membaca teliti | ★ | https://www.nngroup.com/articles/mobile-instructional-overlay/ |
| A3 | Pengguna tak bisa baca overlay sambil memakai app; ingatan pudar ±20 detik | ★ | https://www.nngroup.com/articles/mobile-instructional-overlay/ |
| A4 | Rentetan tip membuat app tampak rumit dan menakutkan | ★ | https://www.nngroup.com/articles/mobile-instructional-overlay/ |
| A5 | Banyak tip: orang menutup lebih cepat, apa pun manfaatnya | ★ | https://www.nngroup.com/articles/mobile-instructional-overlay/ |
| A6 | Uji 70 pengguna, 4 app: tutorial awal tak membuat lebih sukses | ★ | https://www.nngroup.com/articles/mobile-tutorials/ |
| A7 | Petunjuk yang mirip kontrol asli membingungkan (Wimbledon) | ★ | https://www.nngroup.com/articles/mobile-instructional-overlay/ |

### B. Forum pengguna, 15 butir
| # | Temuan | Mutu | Tautan |
|---|---|---|---|
| B1 | LingQ: "frustrated and confused as a first time user" | ☆ | https://forum.lingq.com/t/first-time-user-experience/31395 |
| B2 | LingQ: "so much information presented at the same time" | ☆ | https://forum.lingq.com/t/first-time-user-experience/31395 |
| B3 | LingQ: "need somebody to walk me through the first few days" | ☆ | https://forum.lingq.com/t/first-time-user-experience/31395 |
| B4 | LingQ: pengguna bingung istilah (import, paging, target) | ☆ | https://forum.lingq.com/t/first-time-user-experience/31395 |
| B5 | LingQ: minta "streamlined getting started course" bertahap | ☆ | https://forum.lingq.com/t/why-lingq-needs-a-beginner-mode/70600 |
| B6 | LingQ: UI membingungkan sampai pengguna berhenti menjelajah | ☆ | https://forum.lingq.com/t/why-lingq-needs-a-beginner-mode/70600 |
| B7 | LingQ: minta kursus terpandu dengan "hand-holding" | ☆ | https://forum.lingq.com/t/why-lingq-needs-a-beginner-mode/70600 |
| B8 | LingQ: mini-cerita pengantar lebih ramah dari tutorial bahasa target | ☆ | https://forum.lingq.com/t/why-lingq-needs-a-beginner-mode/70600 |
| B9 | LingQ: pelajaran pertama Belanda hanya "hallo", bingung langkah berikut | ☆ | https://forum.lingq.com/t/how-do-i-get-started/273647 |
| B10 | LingQ: hitung "kata diketahui" otomatis mengejutkan pemula | ☆ | https://forum.lingq.com/t/thoughts-from-a-complete-newbie/33893 |
| B11 | LingQ: pengguna ragu kata baru akan menempel | ☆ | https://forum.lingq.com/t/thoughts-from-a-complete-newbie/33893 |
| B12 | LingQ: "not obsessed about learning every word" sebelum lanjut | ☆ | https://forum.lingq.com/t/thoughts-from-a-complete-newbie/33893 |
| B13 | LingQ: membuat ratusan kata sehari, lalu kewalahan | ☆ | https://www.lingq.com/en/forum/open-forum/im-overwhelmed-with-my-vocab-l/ |
| B14 | Language Reactor: pemula minta hanya 1-2 kata kunci per kalimat, "better than totally lost" | ☆ | https://forum.languagelearningwithnetflix.com/t/request-beginner-learner-option-show-reduced-subtitles-every-sentence-extension-just-picks-one-or-two-main-nouns-or-verbs-to-show/24516 |
| B15 | Language Reactor: balasan menenangkan, "okay to not understand everything" | ☆ | https://forum.languagelearningwithnetflix.com/t/request-beginner-learner-option-show-reduced-subtitles-every-sentence-extension-just-picks-one-or-two-main-nouns-or-verbs-to-show/24516 |

### C. Blog praktisi & vendor, 12 butir
| # | Temuan | Mutu | Tautan |
|---|---|---|---|
| C1 | Asana: tur maju hanya saat pengguna beraksi; berakhir di tugas pertama | ☆ | https://www.appcues.com/product-adoption-academy/value-first-onboarding |
| C2 | Duolingo: pilih tujuan, latihan singkat, daftar setelah merasa nilai | ☆ | https://www.appcues.com/product-adoption-academy/value-first-onboarding |
| C3 | Grammarly: dokumen contoh penuh salah, satu fitur per petunjuk | ☆ | https://www.appcues.com/product-adoption-academy/value-first-onboarding |
| C4 | Contoh terisi membantu belajar lebih cepat dari ruang kosong | ☆ | https://www.appcues.com/product-adoption-academy/value-first-onboarding |
| C5 | Tiap langkah maju setelah pengguna melakukan aksi yang diminta | ☆ | https://userpilot.com/blog/interactive-user-guide/ |
| C6 | Vendor: Blip 28%→64% setelah walkthrough; angka campur, tanpa kontrol | ☆ | https://www.appcues.com/blog/create-education-app-walkthroughs |
| C7 | Vendor: Rocketbots aktivasi 15%→30%, satu anekdot | ☆ | https://www.guideflow.com/blog/interactive-onboarding-guides |
| C8 | Tur paksa & lebih dari 7 langkah = anti-pola; buat bisa dilewati | ☆ | https://ancoleman.github.io/ai-design-components/docs/skills/frontend/guiding-users |
| C9 | Pengguna yang belum merasakan apa pun benci dipaksa tur | ☆ | https://cdn.jsdelivr.net/npm/@hegemonart/get-design-done@1.60.4/reference/onboarding-progressive-disclosure.md |
| C10 | Coach mark yang tak bisa ditutup bikin orang menutup app | ☆ | https://medium.com/livefront/put-me-in-coach-marks-8146c61ca875 |
| C11 | Selesai onboarding tapi tak aktif = risiko berhenti buatan sendiri | ☆ | https://www.guideflow.com/blog/interactive-onboarding-guides |
| C12 | Apptimize: kebanyakan pengguna menggeser tutorial tanpa membaca | ☆ | https://es.slideshare.net/ApptimizeMarketing/7-test-ideas-to-improve-user-onboarding |

Catatan C: LingQ memakai walkthrough kontekstual, buka pelajaran naik 10% (vendor, Appcues): https://www.appcues.com/blog/create-education-app-walkthroughs (tak dihitung terpisah).

### D. Studi akademik & analisis, 9 butir
| # | Temuan | Mutu | Tautan |
|---|---|---|---|
| D1 | Duolingo: ≥4 cerita minggu pertama paling berkorelasi dengan lanjut sebulan; bukan sebab | ☆ | https://blog.duolingo.com/how-cohorts-and-correlations-help-us-better-understand-our-learners |
| D2 | Hu & Nation: ±98% kata dikenal untuk paham memadai (via studi lanjutan) | ★ | https://www.lextutor.ca/cover/papers/schmitt_etal_2011.pdf |
| D3 | Schmitt dkk 2011: 661 peserta, kurva bertahap, tak ada ambang tunggal | ★ | https://www.lextutor.ca/cover/papers/schmitt_etal_2011.pdf |
| D4 | Replikasi 94 pelajar: 90/95/98% mirip; 100% lebih tinggi | ★ | https://experts.nau.edu/en/publications/the-percentage-of-words-known-in-a-text-and-reading-comprehension/ |
| D5 | Studi kamus: hasil campur; sebagian tak ada kenaikan paham | ★ | https://journalpub.escholarship.org/catesoljournal/article/36367/galley/27219/download |
| D6 | Studi Rusia: pembaca sering cari kata tak penting; cari kata menambah waktu | ★ | https://mail.readingmatrix.com/files/11-tx75m475.pdf |
| D7 | Baca santai: kecepatan 85→181 kata/menit | ★ | https://scholarspace.manoa.hawaii.edu/bitstream/10125/66684/1/26_1_10125_66684_beglar.pdf |
| D8 | Panduan praktisi: teks ±95% paham; A1-A2 sesi 20-30 menit | ☆ | https://www.italki.com/en/blog/spanish-reading-for-beginners |
| D9 | Studi 2024 pemula Jepang: materi & kebiasaan menentukan; level 0 paling lambat | ★ | https://www.jstage.jst.go.jp/article/jlem/28/1/28_90/_article/-char/ja |

### E. Ulasan & toko app, 11 butir
| # | Temuan | Mutu | Tautan |
|---|---|---|---|
| E1 | ReadNative: buku pertama tiap bahasa gratis; ketuk kata beri arti | ☆ | https://play.google.com/store/apps/details?id=com.readzi.app |
| E2 | Inkdrift: buku pemula bawaan + ketuk untuk arti | ☆ | https://apps.apple.com/pg/app/inkdrift-graded-reader/id6760686791 |
| E3 | Readle: artikel A1 mudah bila sudah punya dasar; pemula total lebih baik app lain | ☆ | https://apps.apple.com/us/app/langster-language-learning/id1574889455 |
| E4 | Beelinguapp: asumsi kosakata dasar; pemula perlu pelajaran dasar | ☆ | https://www.fluentu.com/blog/beelingapp-review/ |
| E5 | Lingopie: bukan alat pertama untuk pemula total | ☆ | https://storylearning.com/lingopie-review |
| E6 | Language Reactor: layout terasa ramai bagi pengguna baru | ☆ | https://www.fluentu.com/blog/reviews/language-reactor/ |
| E7 | Language Reactor Chrome: subtitle bahasa ibu bikin baca bahasa target lebih sulit | ☆ | https://chromewebstore.google.com/detail/language-reactor/hoombieeljmmljlkjmnheibnpciblicm/reviews |
| E8 | Readlang: definisi muncul "instantly", cukup geser/ketuk | ☆ | https://www.mezzoguild.com/readlang-review/ |
| E9 | Readlang Chrome: satu kata jalan tanpa akun | ☆ | https://chromewebstore.google.com/detail/readlang-web-reader/odpdkefpnfejbfnmdilmfhephfffmfoh/reviews |
| E10 | Readlang: ulasan Chrome sebut cocok pemula akhir, mulai dari Duolingo | ☆ | https://chromewebstore.google.com/detail/readlang-web-reader/odpdkefpnfejbfnmdilmfhephfffmfoh/reviews |
| E11 | Readlang: uji akun gratis baca cerita pemula komunitas Prancis/Spanyol | ☆ | https://copycatcafe.com/blog/readlang-review |

Catatan: tautan dari hasil pencarian; sebagian isi hanya cuplikan. Jumlah: A7 + B15 + C12 + D9 + E11 = 54 butir, 5 jenis.
