# Riset: layar memuat kosong & chip "0 hari" di Home (#1251)

## Intinya
- Home macet di "Memuat bukumu…" menahan aktivasi; 7 penguji AI mengeluh.
- Bukti publik (40 sumber) mendukung 4 dari 5 klaim; 1 belum jelas.
- Perbaikan: rak lokal tampil dulu, batas 8 detik, pesan jujur, "0 hari" disembunyikan.

## 1. Temuan di kode (bukan tebakan)
- `cloud.js` baris 37 (fungsi `bkState`) dan 161 (`var bkState`) bernama sama. Fungsi tertimpa teks kosong.
- Akibatnya `bkState(b)` (baris 46, 64) error, sinkron buku gagal diam-diam.
- Saat akun login dan rak kosong, status "load" tidak punya batas waktu. Tombol "Coba lagi" hanya muncul saat "fail".
- `app.js` baris 140: `indexedDB.open` tanpa `onblocked`. Tab lama terbuka bisa menggantung selamanya.
- `app.js` baris 141: transaksi tanpa `onabort`. Simpan gagal tanpa kabar.
- Chip `#pStreak` (`ui.js` baris 291) menulis `streak()` apa adanya, jadi "0 hari" tampil sebelum data siap.
- Toast `NOTE_AKUN` (`cloud.js` baris 262) muncul 600 ms setelah login, bahkan saat rak masih kosong.

## 2. Bukti publik (40 sumber)
**Waktu tunggu & indikator**
1. [UX Tigers (Nielsen): indikator progres](https://www.uxtigers.com/post/progress-indicators): bar kemajuan untuk tunggu >10 detik.
2. [Ringkasan batas waktu 0,1/1/10 detik](https://medium.com/design-bootcamp/the-psychology-of-waiting-in-ux-0f0b24cdeb8f): >1 detik pengguna sadar menunggu.
3. [uxdesign.cc: komponen indikator memuat](https://uxdesign.cc/loading-progress-indicators-ui-components-series-f4b1fc35339a): spinner untuk 2-10 detik.
4. [Apple HIG: Loading](https://developer.apple.com/design/human-interface-guidelines/loading.md): ideal konten langsung tampil; indikator bila lama.
5. [Apple HIG: Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators.md): indikator diam dianggap macet.
6. [Apple HIG: Launching](https://developer.apple.com/design/human-interface-guidelines/launching.md): layar awal mirip layar pertama.
7. [Material 2: Progress indicators](https://m2.material.io/go/design-progress-indicators): lingkaran di tengah = muat pertama.
8. [Material 1: Progress & activity](https://m1.material.io/components/progress-activity.html): linear bisa berubah jadi terukur.
9. [Dynatrace: loading & saving](https://developer.dynatrace.com/design/loading-saving): skeleton hanya untuk muat pertama; tunda 0,5-1 detik.
10. [SAP Fiori iOS: skeleton](https://www.sap.com/design-system/fiori-design-ios/v24-12/components/progress-indicators/skeleton-loading/usage): skeleton untuk tunggu >1 detik.
11. [Intility: loading state](https://bifrost.intility.com/design/loading-state): judul & navigasi tampil langsung.
12. [Lumen: skeleton](https://lib.lumen.com/chi/6.30.0/components/loaders/skeleton): bentuk mirip isi asli; jangan skeleton saja.
13. [Carbon: loading pattern](https://carbondesignsystem.com/patterns/loading-pattern): pola memuat per durasi.
14. [Workday: loading](https://canvas.workday.com/v9/patterns/loading): pola memuat per durasi.
15. [ServiceNow: loading recommendations](https://horizon.servicenow.com/patterns/loading/loading-recommendations): saran memuat.
16. [Fluent 2: skeleton](https://fluent2.microsoft.design/components/web/react/skeleton/usage): skeleton meniru tata letak.

**Skeleton: bukti campur**
17. [Viget: A Bone to Pick](https://viget.com/articles/a-bone-to-pick-with-skeleton-screens): 136 orang; skeleton terasa terlama (2,82 dtk vs 2,41 spinner).
18. [uxdesign.cc: skeleton screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a): terasa sedikit lebih singkat; sampel kecil.
19. [DEV: skeleton vs spinner](https://dev.to/helloashish99/skeleton-screens-vs-spinners-perceived-load-time-1nlj): hasil campur.
20. [Dolfy: masalah skeleton di aplikasi HP](https://www.dolfy.ai/blog/loading-skeleton-spinner-problem-mobile-apps): kerangka tak cocok = membingungkan.

**Cache dulu, sinkron di belakang**
21. [web.dev offline cookbook](https://web.dev/offline-cookbook): pola cache lalu perbarui.
22. [OpenReplay: local-first PWA](https://blog.openreplay.com/local-first-pwa-architecture/): perangkat pegang salinan utama.
23. [MagicBell: PWA offline-first](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies): stale-while-revalidate = tampil cepat.
24. [locize: offline-first apps](https://www.locize.com/blog/offline-first-apps/): status sinkron terlihat, jangan hilang diam-diam.

**Forum & ulasan pengguna**
25. [LingQ: Please speed up iOS load times](https://forum.lingq.com/t/please-speed-up-ios-load-times/25860): iOS lambat membuka & sinkron halaman utama.
26. [LingQ: Problem with opening lessons](https://forum.lingq.com/t/problem-with-opening-lessons/28844): pelajaran panjang timeout di app.
27. [LingQ: Endless loading of definitions](https://forum.lingq.com/t/endless-loading-of-definitions/2537999): memuat tanpa akhir.
28. [LingQ: Trouble importing YouTube](https://forum.lingq.com/t/trouble-importing-youtube-videos-into-the-lingq-app/2620893): spinner tak pernah selesai.
29. [Readlang: library blank di BOOX](https://forum.readlang.com/t/library-section-showing-blank-boox-device/4991): rak kosong dikira rusak.
30. [Readlang: tak jalan di Kindle](https://forum.readlang.com/t/readlang-not-working-on-kindle-anymore/4959): rak rusak, fitur lain jalan.
31. [Apple Discussions: Kindle stuck iPad](https://discussions.apple.com/thread/255121709): app macet.
32. [Pocket Casts: stuck loading forever](https://forums.pocketcasts.com/forums/topic/love-this-app-and-the-search-is-fantastic-but-often-gets-stuck-loading-forever): "love this app" tapi macet.
33. [Duolingo status: streak display issue](https://status.duolingo.com/incidents/v7dzdkyl12zd): tampilan streak salah jadi insiden resmi.
34. [Clozemaster: streak saves](https://forum.clozemaster.com/t/streak-saves-not-working/71697): keluhan streak hilang.
35. [Duolingo stuck loading (panduan)](https://duolingoguides.com/how-to-fix-duolingo-app-stuck-on-daily-refresh/): saran umum: pasang ulang.

**Studi retensi & pergi**
36. [Luciq 2026 (1.000+ pengguna)](https://luciq.ai/no-margin-for-error-mobile-user-expectations-2026): 15,4% hapus app setelah crash pertama.
37. [Amplitude survei Prancis](https://www.amplitude.com/blog/france-tech-frustration-survey): 72% frustrasi loading lambat.
38. [Adjust: retensi hari 1](https://demo-1.adjust.com/blog/what-makes-a-good-retention-rate/): hari 1 rata-rata ±25-28%.
39. [Trysonar: benchmark retensi](https://trysonar.app/blog/app-user-retention-benchmarks-and-what-moves-it): penurunan terbesar hari 0 ke hari 1.
40. [The Decision Lab: streak creep](https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification): streak putus berkaitan dengan berhenti pakai.

**Tambahan untuk klaim 2, 4, 5**
- [Cloudscape: empty states](https://cloudscape.design/patterns/general/empty-states/): bedakan nol sungguhan vs data kosong; pakai "-".
- [NN/g: error message guidelines](https://www.nngroup.com/articles/error-message-guidelines/): jelas, tepat, konstruktif.
- [Canva: toasts](https://www.canva.dev/docs/apps/design-guidelines/toasts/): toast ganda tak perlu bila UI sudah berubah.
- [Sainsbury's: toast](https://design-systems.sainsburys.co.uk/components/toast/): bawaan 5 detik, ±30 ms per kata.
- [Yle: toast](https://design-system-test.c3t.yle.fi/docs/components/ToastNotification/): jangan menumpuk.

Catatan jujur: tak ada utas Reddit yang terambil mesin cari. Bukti berasal dari forum resmi, dokumentasi, dan survei. Angka vendor (Luciq, Amplitude) = niat pengguna, bukan perilaku terukur.

## 3. Vonis 5 klaim
| # | Klaim | Vonis |
|---|---|---|
| 1 | Rak lokal/skeleton lebih baik dari teks abu-abu | **Terbukti** untuk rak lokal; skeleton **belum jelas** |
| 2 | Data kosong disembunyikan, bukan tampil 0 | **Terbukti** |
| 3 | Macet >3 detik butuh jalan keluar | **Terbukti** |
| 4 | Galat harus sebut penyebab | **Terbukti** |
| 5 | Toast sinkron cukup sekali setelah login | **Terbukti sebagian** |

- Klaim 1: HIG & web.dev mendukung isi nyata dulu. Viget (#17) menunjukkan skeleton bisa terasa lebih lama.
- Klaim 2: Cloudscape (nol sungguhan vs kosong) + insiden streak Duolingo (#33) + 3 penguji.
- Klaim 3: Apple (#5), UX Tigers (#1), LingQ (#25-28). Angka 3 detik tak punya sumber tunggal; ambang praktis.
- Klaim 4: NN/g; pesan "Bukumu belum bisa dimuat" tak sebut sebab.
- Klaim 5: Canva & Yle melarang toast ganda. "Hanya sekali" itu usul kami, bukan angka riset.

## 4. Spesifikasi untuk developer
**Urutan tampil**
1. Buka rak dari IndexedDB lebih dulu. Jangan menunggu `syncBooks`.
2. Bila rak lokal ada: tampil normal. Sinkron akun jalan di belakang, status kecil "Menyinkronkan…".
3. Bila rak lokal kosong dan akun login: tampil kerangka rak (3 kartu buku abu-abu) + teks.

**Batas waktu**
- 0-1 detik: tak ada indikator.
- 1-8 detik: "Memuat bukumu…" dengan kerangka rak yang bergerak.
- 8 detik: ganti jadi pesan galat + dua tombol: **Coba lagi** dan **Lanjut tanpa menunggu**.
- `indexedDB.open`: tambah `onblocked` (pesan "Tutup tab Keepo lain, lalu coba lagi"). Tambah `onabort` di transaksi.

**Teks pesan**
- Gagal jaringan: "Belum bisa terhubung ke akunmu. Cek internet, lalu coba lagi."
- Tab lain menahan: "Keepo terbuka di tab lain. Tutup tab itu, lalu coba lagi."
- Memori penuh: "Memori HP penuh, progres belum tersimpan. Kosongkan ruang dulu."
- Tombol: "Coba lagi" dan "Lanjut tanpa menunggu".

**Yang disembunyikan**
- Chip streak/XP: sembunyi sampai data lokal siap. Lalu tampil nilai asli.
- Streak benar-benar 0 setelah siap: tampil "Mulai hari ini", bukan "0 hari".
- Toast `NOTE_AKUN`: tampil sekali, hanya setelah login sukses dan rak tak kosong, di atas menu bawah, hilang 5 detik.
- Judul besar "Kepoin bahasa baru" tetap, tapi jangan makan tempat saat memuat.

**Akar masalah (wajib)**
- Ganti nama salah satu `bkState` di `cloud.js` (usul: fungsi jadi `bkSig`). Perbarui semua pemanggil.

## 5. Langkah berikutnya
1. Developer kerjakan butir backlog #134 (P0).
2. Setelah rilis, ukur lagi aktivasi (tahap 22) dari /hitung.
3. Uji skeleton vs teks saja bila ada waktu (vonis klaim 1 masih terbuka).
