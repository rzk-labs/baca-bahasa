# Riset Private Beta putaran 2: data iPhone & Bagikan (Tugas #411)

Milestone 4 · 12 Nov 2026 · (validasi bukti internet) · Melengkapi `pm-beta-rencana-ukur.md`, `riset-layar-menyala-data-iphone.md`, `riset-hak-cipta.md`. Bukan nasihat hukum.

## Intinya
- Data iPhone: aman dari aturan 7 hari bila dipasang di Layar Utama. Bukan jaminan mutlak.
- Bagikan: semua pesaing pakai pola sama, yaitu pribadi dulu, wajib berhak, ada hapus-cepat. Keepo belum punya itu.
- Rekrut beta manusia tunggu 5 pengaman minimum (bagian 5). Riset sudah cukup, pengamannya yang belum.

## 1. Vonis 5 hipotesis
| # | Hipotesis | Vonis |
|---|---|---|
| H1 | Data Layar Utama iOS aman bila dipasang | 🟡 **Sebagian terbukti** |
| H2 | Ekspor/cadangan manual cukup mengurangi risiko | 🟡 **Sebagian terbukti** |
| H3 | Bagikan privat-per-tautan lebih aman daripada publik | 🟡 **Sebagian terbukti** |
| H4 | Kotak centang hak cipta + takedown cukup untuk beta kecil | ⚪ **Belum jelas** |
| H5 | Ada patokan retensi hari-30 app baca | ❌ **Gugur** (hanya patokan app edukasi umum) |

- Bukti: 60 baru, dari 6 jenis sumber (bagian 2-4). Syarat 30 bukti & 3 sumber terpenuhi.
- Tidak terbukti penuh: tak ada uji di iPhone nyata, tak ada ahli hukum, Reddit hanya lewat cermin.

## 2. Bukti data iPhone (H1, H2)
Tanda: 📄 dokumen resmi · 🐞 bug tracker/forum developer · 💬 komunitas/Reddit (cermin) · (r) dibaca dari ringkasan pencarian, bukan halaman penuh.

1. 📄 WebKit: `persist()` dikabulkan berdasarkan heuristik, contohnya dibuka sebagai Home Screen Web App. [WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)
2. 📄 Web app Layar Utama punya kuota sama dengan tab browser. [WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)
3. 📄 Eviction = hapus otomatis yang bukan dari pengguna atau situs. [WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)
4. 📄 Penghapusan per asal situs: satu situs dihapus utuh, bukan sebagian. [WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)
5. 📄 ITP hapus semua penyimpanan skrip setelah 7 hari tanpa interaksi. [WebKit ITP](https://webkit.org/tracking-prevention/)
6. 📄 Layar Utama dikecualikan dari batas 7 hari dan datanya terpisah dari Safari. [WebKit ITP](https://webkit.org/tracking-prevention/)
7. 📄 MDN: Safari hapus data skrip bila 7 hari browser tanpa ketuk/klik. [MDN](https://developer.mozilla.org/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
8. 📄 MDN tak menyebut `persist()` membebaskan dari aturan 7 hari; hanya dari tekanan ruang. [MDN](https://developer.mozilla.org/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
9. 📄 MDN: Safari menyetujui/menolak `persist()` otomatis dari riwayat interaksi, tanpa prompt. [MDN](https://developer.mozilla.org/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
10. 📄 MDN: data bawaan "best-effort" hilang bila pengguna bersihkan data situs. [MDN](https://developer.mozilla.org/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
11. 🐞 Bug 232302 (2021, iOS 15.0.2): IndexedDB & service worker hilang setelah ±1 minggu. [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=232302)
12. 🐞 Penyebabnya app dibuka `minimal-ui` (di Safari). Apple: pakai `standalone`; status WONTFIX. [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=232302)
13. 🐞 Bug 200078 (2019, iOS 12): seluruh database IndexedDB lenyap, 22 foto hilang; diperbaiki iOS 13. [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=200078)
14. 🐞 Bug 266559 (Des 2023, Safari 17.2, Mac): LocalStorage & IndexedDB semua situs terhapus; tingkat Kritis. [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=266559)
15. 🐞 Diperbaiki Jan 2024, tetapi 1 pengguna lapor masih terjadi di Safari 17.5 (Juni 2024). [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=266559)
16. 🐞 Forum Apple (2022-23): tak ada karyawan Apple yang menjawab; dokumentasi dibilang minim. [Apple Forums](https://developer.apple.com/forums/thread/710157)
17. 🐞 Pengembang: Layar Utama bebas batas 7 hari; `persist()` harus diminta tiap app dibuka. [Apple Forums](https://developer.apple.com/forums/thread/710157)
18. 🐞 Pengembang lain: di Safari desktop proteksi `persist()` reset saat browser ditutup. [Apple Forums](https://developer.apple.com/forums/thread/710157)
19. 💬 r/webdev: app lokal 25 ribu pengguna mingguan, papan hilang ±1 minggu di iPhone/iPad Safari. [Cermin Reddit](https://reddit.sentinel-team.org/posts/1rpp4oh/snapshots/2026-03-10T20%3A04%3A16.679163Z)
20. 💬 Solusi penulis: akun opsional, peringatan khusus Safari, ekspor JSON otomatis. [Cermin Reddit](https://reddit.sentinel-team.org/posts/1rpp4oh/snapshots/2026-03-10T20%3A04%3A16.679163Z)
21. 💬 Komentar teratas (303 suka): data hanya di klien "tidak andal sejak awal". [Cermin Reddit](https://reddit.sentinel-team.org/posts/1rpp4oh/snapshots/2026-03-10T20%3A04%3A16.679163Z)
22. 💬 Saran komentar: biarkan pengguna ekspor & impor sendiri; cek `persisted()` lalu beri peringatan. [Cermin Reddit](https://reddit.sentinel-team.org/posts/1rpp4oh/snapshots/2026-03-10T20%3A04%3A16.679163Z)
23. 💬 Satu tim lapangan melaporkan masalah sama dan akhirnya mewajibkan Chrome. [Cermin Reddit](https://reddit.sentinel-team.org/posts/1rpp4oh/snapshots/2026-03-10T20%3A04%3A16.679163Z)
24. 📄 iOS 26: situs yang ditambah ke Layar Utama kini jadi web app secara bawaan; saklar bisa dimatikan. [heise](https://heise.de/-10749652)
25. 🐞 Bug 181849: app Layar Utama tak berbagi penyimpanan dengan Safari (2018, (r)). [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=181849)
26. 💬 Forum LingQ: pengguna takut data hilang, ingin ekspor semua. Ekspor LingQ dibatasi 200 kata/kali. [Forum LingQ](https://www.lingq.com/forum/1/18844/) (r)

**Vonis H1 🟡 sebagian.** Aturan 7 hari tidak berlaku di Layar Utama (resmi, #5-6). Tetap ada celah:
- Tekanan ruang & hapus manual masih bisa menghapus (#3, #10).
- Bug sistem pernah menghapus data (#13-15).
- Data tab Safari tidak pindah ke Layar Utama (#6, #25): pasang = mulai kosong.
- `persist()` hanya dikabulkan lewat heuristik (#1, #9); efeknya terhadap aturan 7 hari tak terdokumentasi (#8).
- Manifest Keepo sudah `standalone`; bagus (#12).

**Vonis H2 🟡 sebagian.** Semua saran developer seragam: ekspor + impor (#20-22). Tetapi tak ada data seberapa banyak orang benar-benar mengekspor. Keepo baru punya ekspor CSV kata (`ui.js`), belum cadangan buku & progres.

## 3. Bukti Bagikan & hak cipta (H3, H4)
Tanda: 📄 aturan resmi/ToS · 🐞 forum · 📰 berita/hukum.

27. 📄 Readlang: pengguna tetap pemilik dan menjamin punya haknya. [ToS Readlang](https://readlang.com/termsOfService)
28. 📄 Readlang boleh hapus konten & tutup akun yang diduga melanggar hak cipta. [ToS Readlang](https://readlang.com/termsOfService)
29. 📄 Izin Readlang terbatas: simpan, salin, olah, terjemah, buat audio. Tak menyebut berbagi publik. [ToS Readlang](https://readlang.com/termsOfService)
30. 📄 LingQ: "tidak dan tidak bisa" memverifikasi hak pengunggah (E.11). [ToS LingQ](https://www.lingq.com/en/terms/)
31. 📄 LingQ: ada jalur DMCA: notice dan counter-notice (E.11). [ToS LingQ](https://www.lingq.com/en/terms/)
32. 📄 LingQ: pengguna sendiri yang menanggung izin hak (E.2) & akun bisa dihentikan (C.4). [ToS LingQ](https://www.lingq.com/en/terms/)
33. 📄 LingQ berhak menolak atau menghapus konten kapan saja (E.5). [ToS LingQ](https://www.lingq.com/en/terms/)
34. 🐞 Staf LingQ (2010): hak cipta hanya jadi soal bila dibagikan; kalau pemilik protes, pelajaran diturunkan. [Forum LingQ](https://forum.lingq.com/t/what-about-copyright/43425)
35. 🐞 Anggota LingQ (2010): di Jerman pemakaian tanpa izin bisa kena surat somasi mahal. [Forum LingQ](https://forum.lingq.com/t/what-about-copyright/43425)
36. 🐞 Staf LingQ: pelajaran publik ditolak terutama karena mutu rendah dan masalah hak cipta. [Forum LingQ](https://forum.lingq.com/t/why-public-lessons-are-rejected/775482)
37. 🐞 LingQ: bila ada soal hak cipta, bagikan sebagai "External" (tautan ke sumber). [Forum LingQ](https://forum.lingq.com/t/why-public-lessons-are-rejected/775482)
38. 📄 Wattpad: laporan hak cipta lewat tombol Report di tiap cerita; penulis asli diberi tahu. [Wattpad](https://support.wattpad.com/hc/en-us/articles/10422908343444-Reporting-to-the-original-Wattpad-copyright-owner)
39. 📄 Wattpad punya proses banding untuk moderasi. [Wattpad](https://policies.wattpad.com/transparency-report)
40. 📄 Wattpad: memilih label hak cipta tak mendaftarkan karya; hanya memberi izin terbatas. [Wattpad](https://support.wattpad.com/hc/en-us/articles/11626233882516-Copyright-permissions)
41. 📄 AS 512(c): wajib agen penerima laporan, nama & kontak terpampang publik, terdaftar di Copyright Office. [CRS](https://www.everycrsreport.com/reports/IF11478.html)
42. 📄 AS: wajib kebijakan menghentikan pelanggar berulang & bertindak cepat setelah tahu. [CRS](https://www.everycrsreport.com/reports/IF11478.html)
43. 📄 AS: counter-notice, konten dipulihkan ±10-14 hari kerja kecuali penuntut menggugat. [CRS](https://www.everycrsreport.com/reports/IF11478.html)
44. 📰 Indonesia: Putusan MK 84/PUU-XXII/2024 (29 Feb 2024) memasukkan platform berbasis konten pengguna ke Pasal 10. [Hukumonline](https://www.hukumonline.com/berita/a/mk-perluas-makna-tempat-perdagangan-termasuk-platform-digital-lt65e6ae46281b5?page=all)
45. 📰 Platform dilarang "membiarkan" penayangan & penggandaan barang hasil pelanggaran. [Hukumonline](https://www.hukumonline.com/berita/a/mk-perluas-makna-tempat-perdagangan-termasuk-platform-digital-lt65e6ae46281b5?page=all)
46. 📰 MK minta Pasal 114 (pidana) disesuaikan; sanksi lama maks Rp100 juta, hanya bila sengaja (r). [Hukumonline](https://www.hukumonline.com/berita/a/mk-perluas-makna-tempat-perdagangan-termasuk-platform-digital-lt65e6ae46281b5?page=all)
47. 📰 Sampai 2018 belum ada pengelola tempat dagang yang dipidana lewat Pasal 10 (skripsi UGM, (r)). [Pencarian UGM](https://etd.repository.ugm.ac.id/home/detail_pencarian_downloadfiles/315038)
48. 📰 Google Drive: file ditandai pelanggaran kehilangan akses publik, bahkan bagi yang sudah punya tautan (r). [The Register](https://www.theregister.com/2022/01/25/google_drive_copyright/)
49. 📰 YouTube Content ID juga memindai video "unlisted"/privat (blog musik, (r)). [Fox iMusic](https://www.foximusic.com/blog/?p=553)
50. 📰 Pengadilan UE (GS Media): menaruh tautan ke materi ilegal bisa melanggar bila tahu atau patut tahu. [Fenwick](https://www.fenwick.com/insights/publications/copyright-alert-the-european-union-exposes-websites-to-copyright-liability-for-linking-to-infringing-material-of-third-parties)
51. 📰 Riset: bukti empiris efektivitas notice-and-takedown sedikit; tak ditemukan studi soal kotak centang unggah. [Berkeley](https://lawcat.berkeley.edu/record/1181413/files/64JCopyrightSocyUSA483.pdf) (r)
52. 📰 Pengirim laporan perorangan sering salah isi; perlu petunjuk jelas. [Mondaq](https://mondaq.co.uk/unitedstates/trademark/492860/a-report-on-notice-and-takedown-in-everyday-practice) (r)

**Vonis H3 🟡 sebagian.** Privat-per-tautan lebih aman daripada publik, tetapi bukan perisai.
- Pesaing: pribadi dulu, publik wajib berhak (#27, #34, #36).
- Tautan privat tetap dipindai & dicabut platform besar (#48-49).
- Keepo tetap menyimpan salinan di server; hukum Indonesia menyoroti "membiarkan" (#45).
- Tautan Keepo acak 8 huruf, tanpa daftar publik: nilai plus.

**Vonis H4 ⚪ belum jelas.** Kotak centang + takedown = pola standar semua pesaing (#27-33, #38). Tetapi:
- Tak ada bukti kotak centang mengurangi pelanggaran (#51).
- AS menuntut agen terdaftar & kebijakan pelanggar berulang (#41-42); Keepo belum punya.
- Beta kecil berisiko rendah (#47, penegakan jarang), namun bukan bukti aman.

## 4. Bukti retensi (H5)
Tanda: ⚠️ blog/vendor/estimasi; semua (r).

53. ⚠️ Edukasi hari-30 ±2% (Business of Apps). [Business of Apps](https://www.businessofapps.com/?p=98187)
54. ⚠️ UXCam: edukasi 2,1% dan foto 1,5% di hari-30, terendah. [UXCam](https://uxcam.com/blog/mobile-app-retention-benchmarks/)
55. ⚠️ OneSignal 2024: edukasi 8,02% hari-30; selisih besar antar sumber. [Passion.io](https://passion.io/blog/mobile-app-retention-benchmarks-for-creators-course-coaching-apps)
56. ⚠️ Semua kategori: 25-26% / 11-13% / 5-7% (hari 1/7/30). [Phiture](https://phiture.com/mobilegrowthstack/managing-retention-rate-benchmarks-and-expectations/)
57. ⚠️ AppsFlyer 2024: hari-30 3,7% iOS, 2,1% Android. [AppsFlyer](https://appsflyer.com/?p=453529)
58. ⚠️ Sensor Tower (Okt 2023): Duolingo churn 28%, pengguna bertahan 68%; bukan angka hari-30. [Sensor Tower](https://sensortower.com/blog/duolingo-redefining-engagement-in-the-ed-tech-space)
59. ⚠️ Duolingo Agu 2026: retensi tertinggi sepanjang masa, tanpa angka di liputan. [Renascence](https://www.renascence.io/sg/news/37001/duolingo-hits-record-user-retention-via-engagement-focus)
60. ⚠️ Peringatan: retensi "rolling" lebih tinggi dari metode klasik; bandingkan definisi sama. [Braze](https://www.braze.com/resources/articles/mobile-app-retention)

**Vonis H5 ❌ gugur** sebagai "patokan app baca". Tak ada angka kategori buku/baca. Pakai edukasi umum (±2-8%) sebagai arah, bukan target.
- Beta 30 orang: hari-30 ±1-3 orang. Itu kisah, bukan statistik.
- Metrik pekan-2 di `pm-beta-rencana-ukur.md` tetap yang utama.

## 5. Pengaman minimum sebelum rekrut manusia
Status kode saat ini: tak ada `persist()`, ekspor hanya CSV kata, Bagikan menyimpan teks utuh di server tanpa kotak centang dan tanpa tombol lapor.

1. **Cadangan penuh.** Tombol ekspor/impor semua data (buku, kata, progres) di Pengaturan.
2. **Peringatan simpan.** Minta `persist()` saat mulai; bila ditolak atau buka di tab Safari, ajak pasang ke Layar Utama + cadangkan.
3. **Bagikan lebih aman.** Kotak centang "milikku / domain publik" wajib; atau matikan Bagikan untuk buku unggahan sendiri selama beta.
4. **Hapus cepat.** Kontak takedown (email) tampil di tautan Bagikan + tombol "Laporkan" + kemampuan founder menghapus share.
5. **Syarat singkat.** Syarat & Kebijakan Privasi pendek: pengguna menjamin hak, Keepo boleh hapus, pelanggar berulang ditutup.

Urutan kerja:
- Developer: #1, #2, #3 (kecil, tanpa server baru kecuali tombol Laporkan; server perlu deploy manual).
- Founder: email takedown #4, tinjau #5; konsultasi hukum tetap sebelum monetisasi.

## Kesimpulan
- Syarat validasi terpenuhi: 60 bukti baru, 6 jenis sumber, 5 vonis, kesimpulan ada.
- Milestone 4 status riset: `selesai` secara bukti internet. Rekrut manusia menunggu 5 pengaman di atas.
- Batas: tidak ada uji di iPhone nyata; sebagian bukti dari ringkasan pencarian (r); tak ada nasihat hukum.
