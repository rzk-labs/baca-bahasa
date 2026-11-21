# Riset: data /hitung bersih dari tester AI & bot

Tugas #1419 · tahap 21 & 23 · dibaca 21 Nov 2026 · status tahap tetap "awal" (aturan_fase2). Bukti internet, bukan data nyata Keepo.

## Intinya
- "3 dari 42" = rentang 2,5-19%. Belum bisa menilai H2, dan target 25% pun belum bisa dibantah.
- Pengotor terbesar bukan bot, tapi penyimpanan Safari terhapus dan tab vs layar utama dihitung dobel.
- Tiga langkah murah: "baru aktif", sumber "uji", angka ditulis dengan rentang.

## 1. Apa yang dihitung /hitung sekarang
Dari `cloud.js` dan `api/src/index.js` (hanya dibaca).
- Tiap perangkat kirim 1x/hari: tanggal, tanggal pertama buka, sumber `?ref=`.
- "Baru" = hari ini sama dengan tanggal pertama. "H2" = tepat 1 hari setelahnya.
- Penanda `baca` & `kata` (sekali per perangkat) sudah tersimpan, tapi HQ belum memakainya untuk "baru".

**Yang sudah bersih:**
- Otomatis (webdriver), `?test`, `?api` dan `kepo.api` tidak dihitung.

**Celah pengotor:**
1. Safari menghapus data situs setelah ±7 hari tak dibuka → orang lama terhitung "baru" lagi.
2. Tab Safari dan layar utama punya penyimpanan terpisah → satu orang bisa terhitung dua "baru".
3. Kunjungan tanpa baca (buka lalu pergi) ikut jadi "baru".
4. Baris harian HQ: H2 hari D berasal dari kelompok D-1, tapi dibagi "baru" hari D. Cek rumus "±7%".
5. H2 hanya hari ke-2 persis; yang kembali hari ke-3 tak terhitung. Zona waktu = jam perangkat.
6. Tester AI: terkecuali bila memakai Playwright biasa. Playwright MCP mematikan penanda webdriver (#17), jadi bisa lolos.
7. Tautan pratinjau (WhatsApp, iMessage) tidak menjalankan JavaScript → kemungkinan tidak terhitung. Bot yang menjalankan JS bisa (#3).

## 2. Vonis per klaim
Tanda: ✅ terbukti · 🟡 sebagian · ⚪ belum jelas.
1. **Bot/pratinjau tautan menggelembungkan "baru".** 🟡 Sebagian.
   - Pratinjau tautan tak menjalankan JS (#14-16); bot modern menjalankan JS (#3, #38-41).
   - Untuk Keepo: belum ada bukti bot. Pengotor nyata yang terdokumentasi adalah Safari (#19-24).
2. **Tester internal perlu dipisah.** ✅ Terbukti.
   - GA4 tak memfilter internal otomatis (#2); PostHog & Mixpanel butuh tanda sendiri (#5-9).
   - IP tak andal untuk pengguna anonim; pakai tanda di data (#9).
3. **Sampel <100 butuh rentang.** ✅ Terbukti.
   - Satu orang di kelompok 50 = 10 poin (#25). Wilson andal untuk n kecil (#29-30).
   - 3/42: 7,1% → rentang 95% ±2,5-19%.
4. **"Baru aktif" (baca ≥1 halaman) lebih jujur dari "buka app".** 🟡 Sebagian.
   - Mayoritas panduan: aktif = aksi bermakna (#34-37). Amplitude sendiri mengakui banyak tim cukup memakai buka.
   - Syarat: definisi dikunci; ganti definisi memutus perbandingan lama (#37).

## 3. Apa artinya untuk tahap 23
- H2 ≥25%: tak bisa dibuktikan atau dibantah dengan 42 orang. Perlu ≥100 baru aktif.
- Hitung H2 per kelompok hari pertama, dan sebut metodenya ("tepat hari ke-2", bukan "hari ke-2 atau setelahnya", #33).
- Syarat ≥30 baru/minggu: hitung "baru aktif", bukan semua kunjungan.

## 4. Tiga rekomendasi paling murah
1. **"Baru aktif" di HQ** (usaha S). Data `baca` sudah ada; ubah hanya HQ. Backlog #155.
2. **Sumber "uji"** (usaha S). Tester pakai `?ref=uji`; HQ pisahkan barisnya. Backlog #156.
3. **Angka dengan rentang + sampel** (usaha M). Wilson 95%, label "belum cukup data" <100, H2 per kelompok. Backlog #157.

Mockup: `docs/mockup-1419.html`.

## 5. Batas riset ini
- Isi sumber dibaca lewat cuplikan hasil pencarian, bukan halaman penuh. Reddit & Threads/X tak terbaca.
- Banyak sumber vendor/blog (2019-2021 untuk Safari). Cek catatan rilis WebKit terbaru.
- Tidak ada angka bot nyata Keepo. Perlu data /hitung per sumber untuk memastikan.
- Rumus "±7%" belum diperiksa dari kueri asli.

## Langkah berikutnya
- Developer: #155 → #156 → #157.
- Founder: tak ada langkah. Beri tester tautan `?ref=uji`.
- PM: kunci H2/H7 hanya setelah #155-#156 jalan.

## Tabel bukti (44 butir, 6 jenis sumber)
Jenis: D = dokumen analitik, P = pratinjau tautan/bot, S = Safari/penyimpanan, T = statistik, A = definisi aktif, F = forum/blog indie. Dibaca 21 Nov 2026 lewat cuplikan pencarian.

| # | Jenis | Temuan | Tautan |
|---|---|---|---|
| 1 | D | GA4 membuang bot dikenal otomatis, tak bisa dimatikan atau dilihat | https://support.google.com/analytics/answer/9888366 |
| 2 | D | GA4: filter lalu lintas internal harus dibuat sendiri | https://www.searchenginejournal.com/how-to-filter-internal-traffic-in-google-analytics/485913 |
| 3 | D | Matomo: bot modern menjalankan JS & lolos filter | https://fr.matomo.org/blog/2026/08/bot-spam-fake-traffic-analytics/ |
| 4 | D | Plausible: filter bot lewat user-agent & IP pusat data (cermin) | https://ingest.plausible.io/docs/bot-traffic-filtering |
| 5 | D | PostHog: filter pengguna internal & uji | https://posthog.com/docs/data/test-accounts |
| 6 | D | PostHog: deteksi bot, filter is_bot | https://posthog.com/docs/web-analytics/bot-detection |
| 7 | D | PostHog: tutorial filter internal (aturan email) | https://posthog.com/tutorials/filter-internal-users |
| 8 | D | Mixpanel: bot dikenal diblokir SDK; `$ignore` untuk lainnya | https://docs.mixpanel.com/docs/tracking-best-practices/bot-traffic |
| 9 | D | Mixpanel: internal anonim sulit; IP/VPN tak andal | https://community.mixpanel.com/x/questions/5ztka3rax6dq/excluding-internal-traffic-in-mixpanel-need-help |
| 10 | D | Mixpanel: klasifikasi manusia/bot/agen AI (beta) | https://mixpanel.com/blog/agent-classification-mixpanel-updates/ |
| 11 | D | Amplitude: blokir lalu lintas bot web | https://amplitude.com/docs/data/block-bot-traffic.md |
| 12 | D | Linkly: opsi kecualikan crawler media sosial | https://linklyhq.com/support/skip-social-crawler-tracking |
| 13 | D | Rybbit: deteksi bot bawaan | https://rybbit.com/features/bot-detection |
| 14 | P | Pratinjau tautan tak jalankan JS/cookie (microbrowser) | https://24ways.org/2019/microbrowsers-are-everywhere/ |
| 15 | P | Ringkasan: iMessage, WhatsApp, Slack ambil HTML saja | https://simonwillison.net/2019/Dec/18/microbrowsers-are-everywhere |
| 16 | P | WhatsApp: pratinjau "upaya terbaik" | https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/ |
| 17 | P | Playwright MCP mematikan webdriver | https://datadome.co/threat-research/how-browser-vendors-are-quietly-making-automation-harder-to-detect/ |
| 18 | P | Deteksi headless Playwright: webdriver mudah ditambal | https://blog.castle.io/how-to-detect-headless-chrome-bots-instrumented-with-playwright/ |
| 19 | S | ITP: kembali setelah 8 hari = pengguna baru | https://experienceleague.adobe.com/en/docs/target-dev/developer/implementation/privacy/apple-itp-2x |
| 20 | S | ITP 2.3: localStorage ikut kedaluwarsa 7 hari | https://support.optimizely.com/hc/en-us/articles/4410284274573 |
| 21 | S | Aturan Apple: data non-cookie dihapus setelah 7 hari tak berinteraksi | https://tealium.com/?p=26647 |
| 22 | S | Contoh: kembali setelah 8 hari dihitung dua pengguna | https://digital.gov/2019/04/04/web-analytics-why-users-metric-just-got-more-complicated |
| 23 | S | Layar utama iOS tak berbagi penyimpanan dengan Safari | https://bugs.webkit.org/show_bug.cgi?id=181849 |
| 24 | S | Diskusi Apple: data PWA iOS lewat 7 hari | https://developer.apple.com/forums/thread/710157 |
| 25 | T | Kohort 50 orang: 5 orang = 10 poin | https://amplitude.com/glossary/terms/cohort-retention |
| 26 | T | Kohort 3 orang tampak 100% | https://community.mixpanel.com/x/ask-ai/8xazibm6lp1a/understanding-prebuilt-retention-reports-weekly-us |
| 27 | T | Interval kepercayaan retensi (normal, n>30) | https://softloud.github.io/measured/content/retention/retention-confidence.html |
| 28 | T | Datadog: rata-rata berbobot antar kohort | https://docs.datadoghq.com/product_analytics/user_retention |
| 29 | T | Agresti & Coull 1998: Wilson baik untuk n kecil | https://math.unm.edu/~james/Agresti1998.pdf |
| 30 | T | Perbandingan Wald, Wilson, Wilson-adjusted (2025) | https://arxiv.org/pdf/2508.10223 |
| 31 | T | Evan Miller: laju dasar rendah butuh sampel besar | https://evanmiller.org/the-low-base-rate-problem.html |
| 32 | T | OneSignal: hari 0 = 100%, kurva berhenti di hari lengkap | https://documentation.onesignal.com/docs/en/interpreting-retention-curves |
| 33 | T | Amplitude: "Return On" vs "On or After" | https://amplitude.com/docs/analytics%2Fcharts%2Fretention-analysis%2Fretention-analysis-interpret |
| 34 | A | Amplitude: pilih "critical event", bukan buka | https://amplitude.com/blog/user-retention-app-critical-event |
| 35 | A | Singular: aktif = aksi bermakna; hitung buka menggelembungkan | https://www.singular.net/glossary/monthly-active-users-mau/ |
| 36 | A | AppFollow: aksi bermakna yang ditentukan | https://appfollow.io/glossary/active-user |
| 37 | A | Adapty: ganti definisi memutus perbandingan | https://adapty.io/glossary/active-users/ |
| 38 | F | Indie Hackers: 35% lalu lintas palsu di 2.000 pengguna | https://www.indiehackers.com/post/hit-2-000-users-and-discovered-35-of-my-traffic-was-fake-1d52c18ec8 |
| 39 | F | Indie Hackers: angka analitik sebagian besar palsu; ukur aksi berstatus | https://www.indiehackers.com/post/i-just-discovered-my-analytics-numbers-are-mostly-fake-here-is-why-8197e3ff9d |
| 40 | F | Indie Hackers: cara pisahkan bot vs asli | https://www.indiehackers.com/post/how-i-track-bot-vs-real-traffic-on-my-website-for-free-0c19dd19f6 |
| 41 | F | Peristiwa Plausible palsu diselidiki | https://cprimozic.net/notes/posts/investigating-strange-artificial-plausible-analytics-events |
| 42 | F | Discourse: selidiki bot lewat halaman pendaratan engagement rendah | https://meta.discourse.org/t/how-to-investigate-bot-traffic-using-google-analytics/387586 |
| 43 | F | Lonjakan situs kecil: semua pengguna baru tanpa tujuan | https://www.hostingadvice.com/blog/why-a-small-sites-sudden-global-traffic-spike-wasnt-what-it-looked-like/ |
| 44 | F | Bitdefender: klaim 46% pendaftaran dari bot (vendor, belum diverifikasi) | https://www.bitdefender.com/en-us/blog/hotforsecurity/fake-signups-are-on-the-rise-heres-what-small-business-owners-should-know |

Catatan jujur: hitungan Wilson 3/42 dihitung sendiri (z = 1,96), bukan dari sumber. Tautan berasal dari hasil pencarian; Reddit & Threads/X tak terbaca.

## Catatan #1449 (backlog 161, sudah dibangun di HQ)
- H2/H7 kini rentang Wilson 95% + "n=…"; sampel <100 = "belum cukup data", tanpa warna.
- Kartu atas: H2 dibagi pengguna baru kelompok hari pertama yang sama (hanya hari yang sudah genap).
- Tabel per sumber belum per kelompok: API belum kirim kelompok per sumber.
- **Perlu deploy manual founder** bila ingin tabel sumber akurat: kueri baru di `api/` (hitung per `first` + `src`).
- Mockup: `docs/mockup-1449.html`.
