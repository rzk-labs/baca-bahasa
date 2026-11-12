# Rencana ukur Private Beta (Tugas #362)

Milestone 4 · 12 Nov 2026 · (validasi bukti internet) · Melengkapi `pm-beta-simulasi.md` & `marketing-rekrut-beta.md`.

## Intinya
- Beta dinilai dengan 4 angka: kembali hari 2, aktif minggu 2, kata disimpan, buku dibuka ulang.
- Semua dihitung dari data yang sudah ada di app, dicatat manual, tanpa pelacak.
- Lolos bila 3 dari 4 angka capai target, metrik 2 wajib, plus 2 syarat pengaman.

## 1. Bukti publik (31 kutipan, 20 sumber)
Tanda: ✅ sumber utama · ⚠️ blog/vendor/estimasi · 💬 cerita pengguna. Dibaca 12 Nov 2026.

**A. Patokan retensi**
1. ⚠️ Rata-rata semua app ±25% hari-1, 8% hari-7, 4% hari-30 (UXCam 2026). [Unstar](https://unstar.app/blog/tag/product-management)
2. ⚠️ Median hari-30 lintas kategori ±4% (UXCam 2026, via Appcues). [Appcues](https://www.appcues.com/blog/app-retention-is-hard-heres-how-to-improve-it)
3. ⚠️ Media & hiburan: 22-27% hari-1, 14-17% hari-7, 8-12% hari-30. [Appcues](https://www.appcues.com/blog/app-retention-is-hard-heres-how-to-improve-it)
4. ⚠️ Gim: 25-30% / 10-14% / 4-8%. [Appcues](https://www.appcues.com/blog/app-retention-is-hard-heres-how-to-improve-it)
5. ⚠️ Hari-30 lintas kategori berkisar 1% sampai 15%. [Userpilot](https://userpilot.com/blog/mobile-app-retention/)
6. ⚠️ Adjust: pengguna Januari +11% hari-1, +25% hari-30 (musim resolusi). [Business of Apps](https://www.businessofapps.com/?p=56781)
7. ⚠️ Mantan pembuat Livemocha: masuk 5.000 app teratas butuh 35% / 20% / 15%. Anekdot. [Substack](https://fromstartuptoexit.substack.com/p/retention-is-the-only-metric-that)
8. ⚠️ Situs model keuangan: app bahasa bagus "40-50% hari-30". Tanpa sumber; dibuang. [FinModelsLab](https://finmodelslab.com/blogs/kpi-metrics/ai-assisted-language-learning-app-kpi-metrics)
9. ⚠️ Ling (vendor): bahasa sulit retensinya 14% lebih tinggi; sampel kecil (167). [Ling](https://ling-app.com/blog/hardest-languages-to-learn/)
10. ✅ Duolingo: 84% pengguna harian kembali besok (CURR, Q2 2026). [CX Dive](https://www.customerexperiencedive.com/news/duolingos-user-retention-hits-all-time-high-as-app-boosts-stickiness/827499/)
11. ⚠️ LingQ ±39 ribu pengguna bulanan dari ±1,6 juta unduhan (estimasi). [AppGoblin](https://appgoblin.info/apps/379385811)
12. 💬 Forum LingQ: tak ada angka pengguna aktif resmi. [Forum LingQ](https://www.lingq.com/lt/forum/open-forum/it-would-be-cool-to-see-a-char/)

**B. Streak & kebiasaan baca**
13. ✅ Duolingo: streak "sangat memotivasi" pemula dan veteran. [Blog Duolingo](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
14. ✅ Streak 7 hari: 3,6x lebih mungkin tamat kursus (korelasi). [Blog Duolingo](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
15. ✅ Animasi tonggak: peluang pemula masih aktif 7 hari kemudian +1,7%. [Blog Duolingo](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
16. ✅ Streak putus bisa "berefek sebaliknya"; keringanan (freeze) +0,38% aktif harian. [Blog Duolingo](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
17. ✅ Kindle: streak harian (putus bila bolong) dan mingguan (cukup 1 aktivitas). [Good e-Reader](https://goodereader.com/blog/kindle/kindle-reading-insights-is-an-excellent-system-that-monitors-reading-habits)
18. 💬 Pembaca Kindle: streak 145 hari berakhir saat membaca jadi beban. [Blog pribadi](https://dheepakg.github.io/post/2023/06/fumbling-145-days-long-kindle-reading-streak)
19. 💬 Sebagian pengguna tak suka streak baca terus tampil di beranda. [Good e-Reader](https://goodereader.com/blog/kindle/kindle-reading-insights-is-an-excellent-system-that-monitors-reading-habits)
20. ⚠️ Makalah Univ. Stirling: metrik baca Kindle tak memetakan pengalaman membaca. [Stirling](https://storre.stir.ac.uk/bitstream/1893/29576/1/12.pdf)

**C. Cara ukur ringan**
21. ✅ Appcues: retensi = pemakaian aktif yang disengaja; ukur lewat aksi bernilai, bukan hapus app. [Appcues](https://www.appcues.com/blog/app-retention-is-hard-heres-how-to-improve-it)
22. ✅ Appcues: baca bentuk kurva; jatuh curam di awal = masalah onboarding. [Appcues](https://www.appcues.com/blog/app-retention-is-hard-heres-how-to-improve-it)
23. ✅ Appcues: rata-rata gabungan menyesatkan; bandingkan kelompok per minggu daftar. [Appcues](https://www.appcues.com/blog/app-retention-is-hard-heres-how-to-improve-it)
24. ✅ GoatCounter: tanpa data pribadi, tanpa pengenal unik; ekspor semua data kapan saja. [GoatCounter](https://goatcounter.com/)
25. ⚠️ Koko Analytics hanya menyimpan hitungan gabungan, tak tahu siapa buka apa. [Koko](https://kokoanalytics.com/privacy)
26. ⚠️ Desain anonim menghitung pengunjung balik sebagai baru: harga privasi. [Indie Hackers](https://www.indiehackers.com/post/solving-gdpr-headaches-with-a-cookieless-analytics-tool-zSHxRnD3OMqHmWQ90It6)

**D. Cara beta kecil berjalan**
27. ⚠️ "Batasi beta 30 pengguna"; check-in mingguan + debrief 10 menit opsional. [Under30CEO](https://www.under30ceo.com/run-effective-beta-tests-tiny-user-base/)
28. ⚠️ Contoh target: ≥30% undangan jadi aktif; "50%+ keterlibatan mingguan". [Under30CEO](https://www.under30ceo.com/run-effective-beta-tests-tiny-user-base/)
29. ⚠️ Beta tertutup 4-8 minggu, berakhir pada kriteria yang disepakati, bukan kalender. [DEV Community](https://dev.to/beefedai/beta-program-design-framework-21fp)
30. ⚠️ 20-50 pengguna aktif dari 60-150 pendaftar; kriteria dibuat sebelum rekrut. [DEV Community](https://dev.to/sclaydon/how-to-run-a-beta-test-for-your-startup-founders-guide-4na9)
31. ⚠️ Retensi pekan-2: 30-40% bagus; di bawah 20% kurang bernilai (patokan B2B, kasar). [Better Launch](https://www.betterlaunch.co/blog/beta-launch-guide)

Tak ditemukan: angka retensi Readlang, Beelinguapp, Kindle; Play Store/Reddit tak terbaca. Sumber tambahan lama ada di `pm-beta-simulasi.md` (37 bukti).

## 2. Vonis hipotesis
1. **H1. Patokan hari-30 app belajar bisa jadi target.** ⚪ Belum jelas.
   - Rentang 1-25%, lintas kategori; tak ada angka app baca. Pakai sebagai arah.
2. **H2. Beta 30 orang cukup menilai arah.** 🟡 Sebagian.
   - Panduan setuju 20-50 orang, 4-8 minggu; heuristik, bukan statistik.
3. **H3. Retensi bisa diukur tanpa melacak pribadi.** ✅ Terbukti.
   - Hitungan gabungan & ekspor manual lazim; harganya: orang sama tak bisa dilacak.
4. **H4. Streak saja cukup jadi alasan balik.** ❌ Gugur.
   - Duolingo pakai freeze & animasi; pembaca Kindle: streak jadi beban.
5. **H5. Angka retensi app baca tersedia publik.** ❌ Gugur.
   - Hanya estimasi pihak ketiga. Target dibuat sendiri, lalu dikoreksi minggu 1.

## 3. Empat metrik inti
Data yang sudah ada: hari aktif (`db.days`, dasar streak), kata tersimpan, ketukan kata, daftar buku.
"Aktif" = ada hari tercatat. Target dari patokan media/gim (#3, #4, #31), bukan angka app baca.

1. **Kembali hari 2.** Target ≥35% dari tester.
   - Cara: tester lihat streak di Home; hitung yang punya 2 hari berurutan.
   - Beta dipilih sendiri, jadi target di atas patokan 22-30%.
2. **Aktif minggu 2 (wajib).** Target ≥30%.
   - Cara: ≥2 hari aktif di minggu 2 dari yang aktif di minggu 1.
   - Di bawah 20% = gagal (#31).
3. **Kata disimpan per pembaca aktif.** Target median ≥10 di minggu 2.
   - Cara: angka "N kata" di tab Kata. Lencana Kolektor = 10 kata.
   - Tanda pembaca sungguhan, bukan sekadar buka app.
4. **Buku dibuka ulang.** Target ≥50% buka bukunya di ≥2 hari berbeda.
   - Cara: kartu "Lanjut baca" & daftar buku di Home; catat buku sendiri vs cerita contoh.
   - Tanda "Reader First": mereka kembali ke bacaan.

Tak dihitung: XP, skor ucapan, leaderboard (prioritas rendah).

## 4. Cara ukur tanpa melacak
1. **Lembar mingguan.** Tester menyalin 4 angka dari layarnya sendiri: streak, kata, buku, hari aktif.
2. **Kode tester.** T01-T30, bukan nama; selaras dengan `marketing-lembar-hasil.md`.
3. **Ekspor manual.** CSV kata dari tab Kata, opsional. Tanpa kirim data otomatis.

Catatan: iPhone Safari bisa menghapus data setelah ±7 hari tak dibuka (`riset-keamanan-data-lokal.md`). Tandai "data hilang", jangan hitung sebagai gagal.

## 5. Kriteria lolos / gagal
**Lolos** bila semua ini benar:
1. Minimal 3 dari 4 metrik capai target; metrik 2 wajib.
2. Pengaman: tak ada kehilangan buku/kata yang tak bisa dijelaskan.
3. Pengaman: Bagikan teks pengguna dimatikan atau diberi kotak hak cipta (`riset-hak-cipta.md`).

- **Setengah lolos:** metrik 2 di 20-29%. Perpanjang 2 minggu, ubah 1 hal (pemicu balik).
- **Gagal:** metrik 2 <20%, atau ≥3 tester kehilangan data. Berhenti, perbaiki, ulangi.
- Sebelum rekrut manusia (tugas developer): `persist()`/cadangan iPhone, batal simpan, pesan "lagi offline".

## 6. Peran uji mingguan tester & pengguna AI
Bukan pengganti 30 manusia; mereka menjaga alur beta tetap utuh tiap minggu.
1. **Tari:** uji tampilan HP 320px & kartu Hafal; lapor di "Masukan pengguna AI".
2. **Bima:** uji kegagalan: simpan gagal, sinyal lemah, EPUB rusak, layar diam.
3. **Nadia & Raka:** Nadia baca malam hari 2-4; Raka Jepang/Korea & offline (KRL).
   - Keduanya lapor "alasan berhenti" 1 kata: lupa/bosan/sulit/tak cocok/error.

Tiap Senin PM mengisi 4 metrik dari catatan, menandai lolos/setengah/gagal, menulis di komentar issue.

## 7. Jadwal 4 minggu
1. **Minggu 0:** rekrut 30 (`marketing-rekrut-beta.md`); pastikan syarat pengaman.
2. **Minggu 1-2:** catat metrik 1-2 tiap Senin; balas check-in.
3. **Minggu 3-4:** catat metrik 3-4; putuskan lolos/setengah/gagal.

## Kesimpulan & kekurangan
- Syarat validasi terpenuhi: 31 kutipan, 20 sumber, 5 vonis, kesimpulan ada.
- Kekurangan: tak ada angka retensi app baca; target adalah tebakan terpandu.
- Nol pengguna nyata, jadi milestone baru "draft", bukan "selesai".
