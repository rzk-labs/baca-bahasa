# Riset: patokan aktivasi hari pertama app baca & bahasa

Tugas #1384 (tahap 22). Bukti internet, bukan data pengguna Keepo. Pelengkap `docs/riset-sesi-pertama.md`, `docs/riset-layar-memuat-home.md`, `docs/pm-beta-rencana-ukur.md`, `docs/riset-retensi-h2-h7-patokan.md`. Isinya tidak diulang.

## Intinya
- Tidak ada patokan aktivasi untuk app baca/bahasa. Angka 60% tak punya dasar bukti.
- Usul target dua tingkat: sekarang ≥25%, setelah perbaikan ≥40%. 60% jadi cita-cita.
- Ukur dulu tiga langkah hari pertama lewat /hitung. Baru target dikunci.

## 1. Patokan yang ada (H1)
Vonis: **belum jelas**. Angka 60% condong terlalu tinggi.
- Tak ada angka "baca + ketuk kata" di kategori mana pun. Dua pencarian kategori Buku/Edukasi kosong (E1-E3).
- Patokan terdekat lain jenis: aktivasi rata-rata 37,5% (SaaS), 5% (fintech), 54,8% (AI) (E3).
- Amplitude: aktivasi hari-1 edukasi menengah 21% di bawah rata-rata semua produk (E1).

Catatan jujur:
- Definisi aktivasi beda tiap sumber. Angka tak bisa ditempel langsung ke Keepo.
- Keepo memakai dua syarat sekaligus (baca DAN ketuk). Itu lebih ketat dari "buka app".
- Data Keepo: 42 pengguna baru, balik_h2 ±7%. Sampel kecil, baca tren saja.

## 2. Ketuk kata vs baca halaman (H2)
Vonis: **belum jelas (condong benar)**. Arah didukung, bukti sebab-akibat belum ada.
- Pola "aksi inti awal meramal bertahan" mapan: Facebook 7 teman/10 hari (E18, E20, E21).
- Tapi angka persisnya tak sakral dan sifatnya korelasi, bukan sebab (E19).
- Tak ada studi baca & bahasa yang membandingkan ketuk kata vs baca halaman.

## 3. Waktu ke aksi inti (H3)
Vonis: **terbukti sebagian**. Arah kuat, ambang "2 menit" tak punya sumber.
- Produk terbaik capai nilai pertama <5 menit (E4). Rata-rata SaaS 1 hari lebih (E3).
- Duolingo: tunda daftar sampai selesai pelajaran, ±20% harian naik (E11, E12). Kabar tangan kedua.
- Klaim "<2 menit" dan "+30-50%" tanpa sumber. Jangan dipakai (E16, E25).

## 4. Cerita contoh vs impor sendiri (H4)
Vonis: **terbukti sebagian**.
- Pesaing: LingQ membingungkan pemula (E26-E29); Readlang kekurangan teks pemula (E30, E31).
- Pola "bacaan siap, 0 keputusan" sudah ada di `docs/riset-sesi-pertama.md`.
- Hanya 12% dari 809 app pakai konten contoh (E7). Contoh salah level malah dihapus orang (E9).

Syarat agar berhasil: cerita contoh pendek, level mudah, kata pertama jelas.

## 5. Sumber trafik (H5)
Vonis: **belum jelas (condong benar)**.
- Pengguna lewat rekomendasi teman bertahan lebih baik: sampai +67% (game, vendor) (E40-E42).
- Mutu sumber beda jauh, label saluran saja tak cukup (E43, E44).
- Tak ada data aktivasi Threads vs teman. Threads sendiri cepat kehilangan pengguna (E45, E46).

## 6. Ringkasan vonis
| Hipotesis | Vonis |
|---|---|
| H1 angka realistis app indie | Belum jelas; 60% condong terlalu tinggi |
| H2 ketuk kata lebih menentukan | Belum jelas (condong benar) |
| H3 <2 menit naikkan aktivasi | Terbukti sebagian |
| H4 cerita contoh lebih baik | Terbukti sebagian |
| H5 sumber ubah aktivasi | Belum jelas (condong benar) |

## 7. Usul target tahap 22 (dua tingkat)
Aktivasi = baca ≥1 halaman DAN ketuk ≥1 kata di hari pertama.

| Tingkat | Aktivasi | Syarat |
|---|---|---|
| Sekarang | ≥25% | ≥30 pengguna baru/minggu, 2 minggu berturut |
| Setelah perbaikan | ≥40% | Cerita contoh 1 ketukan + kata pertama dipandu, 2 minggu |
| Cita-cita | ≥60% | Hanya bila tingkat 2 tercapai |

Alasan angka:
- 37,5% = rata-rata produk lain; edukasi cenderung lebih rendah (E1, E3).
- Cerita contoh bawaan memotong langkah. Itu alasan tingkat 2 lebih tinggi.
- Tingkat 1 dikunci ulang setelah 2 minggu data pertama (baseline).

## 8. Usulan pengukuran untuk developer (/hitung, tahap 21)
1. **Tiga langkah terpisah:** buka cerita, halaman pertama terbaca, ketuk kata pertama (per hari pertama).
2. **Detik menuju ketuk kata pertama:** catat selisih, tanpa data pribadi. Median target <120 dtk.
3. **Pecah per sumber (?ref=) dan per jalur:** cerita contoh vs impor sendiri.

Tugas developer: backlog #153.

## 9. Yang belum terjawab
- Reddit, Threads/X, dan ulasan toko tak terbaca langsung (hanya agregator & cuplikan).
- Tak ada angka H1 khusus app baca. Hulstijn 1996 (cari kata 12-15%) hanya dari cuplikan.
- Semua bukti vendor (☆) hanya arah, bukan dasar tunggal keputusan.

## Langkah berikutnya
- Developer: kerjakan #153 (ukur 3 langkah + detik + sumber).
- PM: kunci target tingkat 1 setelah 2 minggu data.
- Founder: tak ada langkah.

## Tabel bukti (46 butir)
Jenis: A = patokan/laporan industri, B = forum & komunitas, C = studi & artikel analisis, D = studi kasus produk/pesaing. Kolom # = nomor butir (E1-E46). Mutu: ★ primer, ☆ vendor/blog/tangan kedua.

| # | Jenis | Temuan | Mutu | Tautan |
|---|---|---|---|---|
| E1 | A | Aktivasi hari-1 edukasi menengah 21% di bawah rata-rata | ★ | https://amplitude.com/benchmarks/education/mid-size |
| E2 | C | Aktivasi terbaik = kejadian peramal retensi; nilai inti jarang di sesi 1 | ☆ | https://www.airbridge.io/en/blog/what-is-an-app-activation-metric |
| E3 | A | Aktivasi rata-rata 37,5% (547 SaaS); AI 54,8%, fintech 5%; TTV rata-rata 1,5 hari | ☆ | https://userpilot.com/blog/saas-onboarding-benchmarks/ |
| E4 | A | Produk kuartil atas: nilai pertama <5 menit (halaman sama dengan E3) | ☆ | https://userpilot.com/blog/saas-onboarding-benchmarks/ |
| E5 | A | Penyelesaian daftar onboarding rata-rata 19,2% (halaman sama dengan E3) | ☆ | https://userpilot.com/blog/saas-onboarding-benchmarks/ |
| E6 | A | 809 app: 373 pakai layar kosong biasa | ☆ | https://labs.lazyweb.com/research/empty-state-patterns-prevalence-mobile-apps.md |
| E7 | A | Konten contoh 100 app (12%); ajakan aksi pertama eksplisit hanya 15 | ☆ | https://design.lazyweb.com/blog/how-apps-drive-first-meaningful-action.md |
| E8 | C | Panduan: data contoh boleh dihapus; uji A/B lawan penciptaan terpandu | ☆ | https://produktly.com/guides/how-to-use-empty-states-for-onboarding |
| E9 | D | Proyek contoh dihapus pengguna agar bersih | ☆ | https://medium.com/rareview/ui-design-for-empty-states-zero-data-and-on-boarding-264cdb92826e |
| E10 | C | Contoh nyata, berlabel, mudah dihapus; angka kenaikan tak terverifikasi | ☆ | https://supademo.com/content/activation |
| E11 | D | Duolingo tunda daftar: ±20% DAU naik (kabar kedua) | ☆ | https://taplytics.com/blog/duolingo-ab-test-onboarding |
| E12 | D | Wawancara First Round: coba pelajaran tanpa daftar menaikkan daftar | ☆ | https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker |
| E13 | D | Duolingo: program ajak teman hanya +3% pengguna baru | ☆ | https://lennysnewsletter.com/p/how-duolingo-reignited-user-growth |
| E14 | C | Aha = pelajaran pertama; izin notifikasi setelahnya | ☆ | https://medium.com/@kotarina832/building-effective-onboarding-experiences-lessons-from-duolingo-7aa2af536020 |
| E15 | D | Teardown onboarding app bahasa; tak membuktikan retensi | ☆ | https://screensdesign.com/articles/language-learning-app-onboarding/ |
| E16 | C | Klaim "<2 menit ke pelajaran" & +30-50% tanpa sumber | ☆ | https://dev.to/paywallpro/best-user-onboarding-flows-in-education-apps-427f |
| E17 | A | Hari-1 edukasi ±14-19% di berbagai blog, angka tak sepakat | ☆ | https://devtechnosys.com/insights/language-learning-app-retention/ |
| E18 | C | Facebook: aha lebih sederhana dari kira-kira | ☆ | https://mode.com/blog/facebook-aha-moment-simpler-than-you-think/ |
| E19 | C | Angka ajaib itu ilusi; korelasi bukan sebab | ☆ | https://mixpanel.com/blog/magic-numbers-are-an-illusion/ |
| E20 | C | Teman cepat di awal = bertahan lama; mekanisme tak jelas | ☆ | https://alleywatch.com/2016/07/magic-moment-startup/ |
| E21 | D | Gleit (Meta): versi angka tak pasti, polanya benar | ☆ | https://www.growthtalent.org/insights/naomi-gleit-on-meta-s-early-growth-playbook-and-the-power-of-disagre |
| E22 | C | Contoh aha moment: nilai inti produk | ☆ | https://appcues.com/blog/aha-moment-examples |
| E23 | C | Waktu-ke-nilai: tunda = gesekan dan keluar menumpuk | ☆ | https://dev.to/digia_studio/mobile-app-onboarding-metrics-that-predict-activation-and-retention-3occ |
| E24 | C | Skripsi KTH: retensi 7 hari 19% sebagai dasar uji onboarding | ★ | https://www.diva-portal.org/smash/get/diva2:1985428/FULLTEXT01.pdf |
| E25 | C | "Studi" 1,5x retensi nilai sesi pertama; sumber tak terverifikasi, DIABAIKAN | ☆ | https://www.lifescapes.org/362303.html |
| E26 | B | Forum LingQ: pengalaman awal tak menyenangkan, tutorial kurang | ☆ | https://forum.lingq.com/t/unpleasant-experience-getting-started/780289?page=2 |
| E27 | B | Forum LingQ: onboarding kurang rapi dibanding Duolingo | ☆ | https://forum.lingq.com/t/how-do-i-get-started/273647?page=2 |
| E28 | B | Pengguna LingQ bingung, cari tutorial YouTube; petunjuk hanya untuk akun baru | ☆ | https://www.lingq.com/nl/forum/support-feedback-forum/how-does-this-site-work-where/ |
| E29 | C | Analisis onboarding LingQ: kursus pemula tak muncul untuk semua | ☆ | https://medium.com/@tomiferencz/lingq-classical-version-onboarding-analysis-from-a-students-point-of-view-93c6dfb100b6 |
| E30 | B | Forum Readlang: banyak bahasa kekurangan teks pemula | ☆ | https://forum.readlang.com/t/free-mini-texts-for-readlang/4937 |
| E31 | B | Readlang cocok menengah-lanjut; tingkat kesulitan kasar | ☆ | https://readlang.uservoice.com/forums/192149-general/suggestions/46191586-level-of-proficiency |
| E32 | B | Pindahan LingQ memuji antarmuka Readlang lebih bersih | ☆ | https://forum.readlang.com/t/anyone-here-use-used-lingq-or-any-other-alternatives/123 |
| E33 | B | WaniKani: awal terasa putus asa, berhenti dalam minggu-minggu pertama | ☆ | https://community.wanikani.com/t/im-giving-up-on-wk-and-heres-some-feedback-after-making-it-to-level-20-in-three-ish-years/65757 |
| E34 | B | Pembuat app Jepang: onboarding sendiri lemah, ada langkah tersembunyi | ☆ | https://www.indiehackers.com/post/i-launched-my-web-app-learn-japanese-through-sentences-808fefc03d |
| E35 | B | Sesi pertama app bahasa bagus; sulitnya alasan kembali | ☆ | https://www.indiehackers.com/post/anyone-else-think-language-learning-apps-are-missing-the-fun-part-b8a690ed73 |
| E36 | B | Pembaca e-book: beri satu bab, hapus 75% contoh | ☆ | https://www.thecreativepenn.com/2013/02/02/sampling/comment-page-3/ |
| E37 | B | Halaman-halaman awal menentukan lanjut atau tidak | ☆ | https://www.thecreativepenn.com/sampling-why-your-first-few-pages-are-so-important/ |
| E38 | C | Cari kata saat membaca: ringkasan riset kamus tertanam | ☆ | https://bookriot.com/looking-up-words-while-reading/ |
| E39 | C | Hulstijn 1996: pembaca cari hanya 12-15% kata target (cuplikan saja) | ★ | https://l1research.org/article/download/744/501/3666 |
| E40 | A | Rekomendasi sosial: retensi sampai +67% (game, vendor GetSocial) | ☆ | https://www.pocketgamer.biz/mobile-gamers-referred-through-social-recommendation-have-up-to-67-higher-retention |
| E41 | D | Fabulous: pengguna rujukan 2x bertahan (blog Google) | ☆ | https://android-developers.googleblog.com/2016/01/how-fabulous-and-yummly-grew-with-app.html |
| E42 | C | Rujukan +37% retensi; tanpa sumber primer | ☆ | https://adapty.io/blog/markdown/mobile-app-referral-program.md |
| E43 | A | Dua sumber berinsentif: retensi 30 hari jauh beda | ☆ | https://www.pocketgamer.biz/news/33250/gamers-sourced-by-incentivised-downloads-can-be-six-times-more-valuable-than-organic-traffic-says-w3i/r/PG.Biz/App+Store/news.asp?c=29232 |
| E44 | C | Instal berinsentif: lihat mutu sumber, bukan labelnya | ☆ | https://techcrunch.com/2011/09/07/incentivized-installs-not-all-bad-says-new-study-but-consider-the-source/amp/ |
| E45 | C | Threads: pengguna harian turun lebih dari separuh setelah peluncuran | ☆ | https://www.moengage.com/blog/threads-growth-story-declining-usage/ |
| E46 | A | Zuckerberg: kurang dari 50% pendaftar awal Threads masih pakai | ☆ | https://www.phonearena.com/news/half-initial-threads-subscribers-dropped-off_id149320 |

Catatan jujur:
- Ulasan toko: hanya agregator (LingQ 4,6; Beelinguapp 4,2) yang terbaca, tak ada keluhan onboarding spesifik (tak dihitung sebagai butir).
- Reddit, Threads/X, dan Kindle: tak ada data terbaca. Tautan dari hasil pencarian; sebagian isi hanya cuplikan.
- Jenis sumber dipakai: A, B, C, D (4 jenis).
