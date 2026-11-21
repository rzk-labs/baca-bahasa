# Riset #1481: Popup naik level & huruf hari streak — bantu atau ganggu?

Pemicu: masukan Nadia & Tari (21 Nov 2026). Popup "Level 7!" muncul lagi menutupi tab. Home masih "Level 6". Huruf hari "M S S R K J S" kembar.
Dokumen saja. Kode app tidak diubah. Mockup usulan: `docs/mockup-1481.html`.

## Intinya
- Popup menutup layar itu mengganggu. Cukup toast kecil, popup besar ditunda ke jeda alami.
- Angka level harus satu sumber. Beda angka antar layar = bukti data salah.
- Huruf hari satu huruf kembar. Pakai Sen/Sel/Sab + tanda "hari ini".

## 1. Cara kerja & batasan
- Sumber: WebSearch (standard), 8 pencarian, 21 Nov 2026.
- Isi bukti diambil dari **ringkasan hasil pencarian**. Halaman penuh tidak dibuka satu per satu.
- Tidak ada Reddit/Threads/X yang terbaca langsung. Hanya mirror r/duolingo (redlib) lewat ringkasan.
- Tidak ditemukan sama sekali: studi formal huruf hari satu huruf; ulasan toko yang membahas popup level.
- Tidak ada hasil khusus Language Reactor soal popup.
- Jenis sumber: forum produk, tulisan UX/panduan desain, studi akademik, dukungan & status resmi vendor, artikel media.

## 2. Vonis ringkas

| Dugaan | Vonis | Kekuatan |
|---|---|---|
| H1 Popup menutup layar / muncul lagi mengganggu & turunkan percaya | **Sebagian** | Gangguan terbukti; efek ke percaya tak terukur |
| H2 Angka level/XP beda antar layar rusak percaya | **Sebagian** | Banyak kasus beda angka; dampak percaya tersirat |
| H3 Huruf satu huruf bingung; Sen/Sel/Sab atau tanda hari ini lebih jelas | **Sebagian** | Ambiguitas terbukti; uji kejelasan formal tak ada |
| H4 Tunda perayaan ke jeda alami, toast cukup | **Sebagian** | Arah didukung; bukti spesifik perayaan tipis |

Tak ada yang "terbukti penuh": semua bukti tidak langsung (bukan uji Keepo).

## 3. H1 — Popup mengganggu (vonis: sebagian)
Bukti (13):
1. Pengguna gratis Duolingo mengeluh banyak layar iklan setelah tiap pelajaran (techissuestoday.com/duolingo-super-duolingo-ads) — media.
2. Perwakilan Duolingo di r/duolingo: akan uji opsi menolak layar acara setelah pelajaran, karena dianggap mengganggu belajar (androidauthority.com/duolingo-event-screen-opt-out-3737299) — media.
3. Clozemaster: "Eliminate silly GIF on level up" (forum.clozemaster.com/t/eliminate-silly-gif-on-level-up/32118) — forum.
4. Clozemaster: "Popups are really, really annoying" (forum.clozemaster.com/t/popups-are-really-really-annoying/8218) — forum.
5. LingQ: ada opsi "Streak and milestones popups" yang bisa dimatikan di pengaturan reader (forum.lingq.com/t/can-i-get-rid-of-the-gamification-elements/75498) — forum. Artinya pengguna butuh kendali.
6. LingQ: popup kehilangan streak tetap muncul walau opsi dimatikan (forum.lingq.com/t/disable-streak-loss-notification/74156) — forum.
7. LingQ: popup menutup info berguna dan harus ditutup manual, "disrupts the reading" (lingq.com/de/community/forum/open-forum/how-to-block-annoying-pop-up-w) — forum.
8. LingQ: "Turn off all the streaks and goals stuff?" (forum.lingq.com/t/turn-off-all-the-streaks-and-goals-stuff-is-it-even-possible/857192) — forum.
9. LingQ: pengguna merasa terus ditegur walau streak harian lengkap (hasil pencarian yang sama) — forum.
10. Chess.com: "Great Job!" setelah tiap latihan, minta dimatikan (chess.com/forum/view/help-support/great-job-after-literaly-every-excersice-in-courses-can-i-turn-that-off-somehow) — forum.
11. Ekstensi Chrome DuoLeaveMeAlone melewati layar "perfect" Duolingo (Chrome Web Store) — produk pihak ketiga. Tanda ada permintaan pasar.
12. NN/g: modal memaksa pengguna keluar dari tugasnya; simpan untuk peringatan penting (nngroup.com/articles/modal-nonmodal-dialog/) — panduan UX.
13. NN/g video "Popup Problems": kebanyakan overlay muncul di waktu salah (nngroup.com/videos/popup-problems/) — panduan UX.

Lawan: Duolingo sengaja menjaga komunikasi naik level di tiap level (blog.duolingo.com) — popup bukan selalu dibenci; masalahnya waktu & kendali.
Catatan: tak ada bukti kuantitatif bahwa popup menurunkan percaya. Yang terbukti: mengganggu, dan pengguna minta kendali.

## 4. H2 — Angka beda antar layar (vonis: sebagian)
Bukti (10):
14. Alpha School: "Today's XP" di home beda dengan TimeBack; dijelaskan sebagai jeda sinkron (support.alpha.school/article/129734) — dukungan resmi.
15. EA WRC: level di menu utama tak ikut naik sampai pindah halaman; pelapor sebut kosmetik (forums.ea.com, WRC) — forum. Lawan: dianggap sepele.
16. Zwift Companion: level tampil, progres dalam level hanya di game (forums.zwift.com/t/16702) — forum.
17. Microsoft Learn: XP di halaman Learn beda dengan profil (techcommunity.microsoft.com, diskusi 2300998) — forum resmi.
18. DataCamp: XP profil beda dengan leaderboard organisasi; ada artikel bantuan khusus (support.datacamp.com/hc/en-us/articles/360004139794) — dukungan resmi.
19. Duolingo Android: XP diterima turun ±setengah setelah update (piunikaweb.com) — media.
20. r/duolingo mega thread "XP issues": XP latihan ulang tak masuk leaderboard (mirror redlib) — forum.
21. Discourse Meta: skor header beda dengan leaderboard bulanan (meta.discourse.org/t/293842) — forum.
22. Duolingo status: insiden "Streak Progress Display Issue" 13 Sep 2025 (status.duolingo.com/incidents/v7dzdkyl12zd) — status resmi. Vendor menganggap salah tampil = insiden.
23. Pengguna Duolingo: "streak appears much longer than I am told" dan angka tak cocok saat streak freeze (hasil pencarian kalender streak) — forum.

Pola: vendor menulis artikel bantuan untuk beda angka (14, 18) = beda angka memicu pertanyaan massal.
Tak ditemukan: ulasan toko yang langsung menyebut "kehilangan percaya" gara-gara beda level. Kaitan lama: `docs/riset-angka-statistik-dipercaya.md` (39 bukti, angka salah merusak percaya).
Keepo sendiri: Home "Level 6, 94/100" vs popup & Profil "Level 7" (Nadia 21 Nov); XP 54→64 tanpa membaca (Raka).

## 5. H3 — Huruf hari (vonis: sebagian)
Bukti (6):
24. Straight Dope: MTWRF dari Ohio State tak dikenal pembaca lain (boards.straightdope.com/t/rursday/388560) — forum.
25. Pengguna jadwal kuliah: "T" bisa Selasa atau Kamis kalau ruang sempit (Stack Overflow, kiwix mirror) — forum.
26. Diskusi moment.js: huruf tunggal "T" dan "S" membingungkan tanpa konteks (lightrun.com mirror) — kode/forum developer.
27. WordPress: kode memakai inisial + akhiran agar T dan S kembar tetap beda (core.trac.wordpress.org/ticket/129) — kode.
28. Chicago Manual of Style: tak mengatur huruf tunggal; ISO pakai angka (chicagomanualofstyle.org) — panduan gaya.
29. Klaim anekdot (kualitas rendah, tak terverifikasi): app kebugaran pulih engagement setelah ganti ke "Thu." — **jangan dipakai sebagai bukti**.
30. Duolingo: kalender streak membingungkan di warna & freeze, bukan huruf (hasil pencarian) — forum. Penting: masalah kalender di sini lebih ke status hari.

Tak ada studi formal. Kesimpulan: tiga S kembar (Senin, Selasa, Sabtu) nyata secara logika. Tiga huruf (Sen/Sel/Sab) lazim dan menghapus kembar.
Urutan Keepo sekarang mulai Minggu: M S S R K J S = Min Sen Sel Rab Kam Jum Sab.

## 6. H4 — Tunda perayaan (vonis: sebagian)
Bukti (9):
31. UX Planet: confetti sebelum alur selesai menurunkan prediksi pengguna; yang penting waktu & konteks (uxplanet.org/why-confetti-celebrations-backfire...) — tulisan UX.
32. Artikel app lari: modal bisa memutus fokus; pakai umpan balik mikro (the5krunner.com/2025/11/06/micro-rewards...) — tulisan praktisi.
33. Studi Journal of Marketing Research (18.952 pengguna, ringkasan AMA): hadiah game menaikkan engagement, tapi saat pengguna flow, efeknya ke nilai tambah melemah; saran: beri hadiah di waktu tepat (ama.org/2026/05/15/...) — studi.
34. Panduan modal/toast: untuk pesan sukses, toast membiarkan pengguna lanjut (blog.logrocket.com, uxplanet best practices modals) — panduan UX.
35. Design system: toast = pengakuan singkat; modal untuk konfirmasi yang memblokir (ebrains/AmEx design) — panduan desain.
36. Readlang: usulan "Keep it lean, no need for streaks" (forum.readlang.com/t/idea-keep-it-lean-no-need-for-streaks/92) — forum.
37. Readlang: pengguna ingin streak bisa dimatikan — forum.
38. UC Davis (app bank): hadiah dicabut → perilaku turun besar (ucdavis.edu) — studi. **Lawan:** hadiah penting; jangan hapus perayaan, cukup ubah bentuk.
39. UCL: panduan hadiah gamifikasi berbasis bukti masih langka (discovery.ucl.ac.uk/10131140) — studi. Maka aturan kita = hipotesis untuk diuji.

Catatan: tak ada uji langsung "toast vs popup" pada app baca. Itu perlu data Keepo (tahap 23).

## 7. Rekomendasi: aturan pendek untuk developer
**Popup naik level**
1. Jangan tampil saat membaca, di sheet, atau di tab lain. Tampil hanya di jeda alami: akhir sesi, sheet Tamat, atau saat buka Home.
2. Selama membaca: toast kecil 2 detik "Level 7" (tanpa menutup, tanpa tombol).
3. Sekali tampil. Simpan level yang sudah dirayakan; tak muncul ulang setelah pindah tab/muat ulang/sinkron.
4. Antrean: kalau naik beberapa level, tampilkan satu (level tertinggi).

**Satu sumber angka level**
5. Semua layar (Home, popup, Profil, toast) memakai satu fungsi level dan XP yang sama, dibaca setelah XP disimpan.
6. Popup baru muncul setelah Home diperbarui. Tak boleh ada layar yang menunjukkan level lama.

**Label hari streak**
7. Pakai tiga huruf, urutan tetap: Min Sen Sel Rab Kam Jum Sab, dengan jarak antar label.
8. Tandai "hari ini" (lingkaran/garis bawah + teks "Hari ini" untuk pembaca layar).
9. Warna bukan satu-satunya penanda hari terisi (tambah tanda centang/titik).

## 8. Langkah berikutnya
- Developer: backlog #160 (aturan 1-9). Uji di 320px & 390px.
- Ukur setelah rilis: berapa pengguna menutup popup < 1 detik; H2 & H7 (tahap 23).
- Tester AI: cek tak ada popup saat baca, level sama di semua layar.
- Manusia nanti sebagai penguat: tes keterbacaan label hari dengan 5 orang.

## 9. Sumber yang tak terbaca langsung
- Reddit asli, Threads, X: tidak dibuka. Hanya mirror r/duolingo lewat ringkasan.
- Semua butir diambil dari ringkasan hasil pencarian, bukan dari halaman penuh.
- Atlassian date-time guideline & Duolingo blog "days of the week names": muncul di hasil, isi tidak terverifikasi relevan; tidak dihitung.
