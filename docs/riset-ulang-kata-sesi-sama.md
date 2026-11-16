# Riset: kata "Ragu/Lupa" diulang lagi di sesi yang sama (#1214)

(validasi bukti internet) Tanggal riset: 16 Nov 2026.

## Intinya
- Mengulang kata sulit di sesi yang sama: terbukti membantu ingat.
- Beri jeda beberapa kartu, bukan langsung. Maks 2 kali ulang per kata.
- Tanpa data baru yang berat: cukup catatan sementara di localStorage.

## 1. Kondisi sekarang (dicek di kode, tidak diubah)
- Kartu ada di `deck()` (ui.js ~2941). Tombol: Lupa, Ragu, Hafal.
- **Ragu:** `due` = besok. Tidak muncul lagi hari ini. Inilah keluhan Sinta.
- **Lupa:** `lv = 0`, `due` = sekarang. Bisa muncul lagi, tapi masuk urutan paling belakang.
- Lupa memakai jatah sesi (`deckDone`, maks 20). Tak ada batas ulang, tak ada jeda sengaja.
- Tangga 1/3/7/21 hari (riset-jadwal-ulang-kata) hanya mengatur jeda harian.
- Urutan "ingat dulu" (riset-kartu-ingat-dulu) tidak membahas ulang di sesi sama.

## 2. Masukan pengguna
- Sinta (AI): "Kata yang kujawab 'Belum yakin' baru muncul lagi besok. Untuk kata sulit, beri ulang juga di sesi yang sama."

## 3. Bukti (35 butir, 4 jenis sumber)
Catatan jujur: butir diambil dari ringkasan hasil pencarian web. Tidak semua halaman dibuka penuh. Butir bertanda *(judul)* hanya dibaca dari judul/cuplikan.

### A. Dokumen & forum Anki (H2, H4)
1. Anki: kartu baru punya langkah belajar bawaan 1 menit dan 10 menit. [tautan](https://docs.ankiweb.net/deck-options.html?highlight=Learning)
2. Anki: langkah "relearning" khusus kartu yang sudah dikenal lalu lupa. [tautan](https://docs.ankiweb.net/deck-options.html?highlight=Relearn)
3. Anki: tekan "Again" = kartu balik ke langkah pertama; "Good" = ke langkah berikutnya. [tautan](https://docs.ankiweb.net/deck-options.html?highlight=Learning)
4. Anki: bila relearning dikosongkan, kartu langsung jadi jeda 1 hari (manual). [tautan](https://docs.ankiweb.net/deck-options.html?highlight=reschedul)
5. Forum Anki: dengan FSRS aturan kosong itu berbeda; versi memengaruhi. [tautan](https://forums.ankiweb.net/t/relearning-steps-left-blank-what-happens/54397.md)
6. Anki: lapse di antrean belajar tidak dihitung, jadi tak jadi "leech". [tautan](https://docs.ankiweb.net/deck-options.html?highlight=Learning)
7. Forum Anki: langkah 10 menit bekerja sesuai desain; yang bingung biasanya soal pengaturan. [tautan](https://forums.ankiweb.net/t/anki-reviews-not-scheduling-properly-when-i-press-again-10-min-it-doesnt-show-up-in-10-min-it-shows-up-in-a-few-days/41706)
8. Forum Anki: kartu "Again" tak muncul lagi di hari yang sama karena batas "learn ahead". [tautan](https://forums.ankiweb.net/t/again-cards-arent-showing-up-the-same-day/48133)
9. Forum Anki: satu langkah 10 menit = tampil sekali lagi lalu besok. Pola yang dipakai orang. [tautan](https://forums.ankiweb.net/t/cards-that-you-forget-at-what-interval-do-they-come-back/46054.md)
10. Forum Anki: tak ada rumus langkah yang cocok untuk semua orang. [tautan](https://eshapard.github.io:443/anki/what-anki-learning-steps-to-use.html)
11. Forum Anki: pengguna memakai langkah panjang 15 menit, 1,5 hari, 7 hari, 30 hari (selera pribadi). [tautan](https://forums.ankiweb.net/t/need-help-in-understanding-learning-steps/64232.md)
12. Forum Anki: analisis data untuk saran langkah belajar *(judul)*. [tautan](https://forums.ankiweb.net/t/suggestion-about-the-learning-steps-after-analyzing-the-anki-dataset/51648)
13. Forum Anki: "Review order too long, I'm stuck in a forgetting loop" *(judul)*. [tautan](https://forums.ankiweb.net/t/review-order-too-long-im-stuck-in-a-forgetting-loop/38605)

### B. Studi: ulang dalam satu sesi (H1, H2, H4)
14. Karpicke & Roediger 2008 (Science): tes ulang kosakata asing berefek besar; belajar ulang tanpa tes tidak. [tautan](https://pubmed.ncbi.nlm.nih.gov/18276894/)
15. Studi yang sama: prediksi diri tak berkorelasi dengan hasil nyata. [tautan](https://pubmed.ncbi.nlm.nih.gov/18276894/)
16. Karpicke & Roediger 2007: membuang kata dari tes merugikan (>100% lebih lemah); membuang dari belajar tidak. [tautan](https://pcllab.github.io/downloads/2007/2007_Karpicke_Roediger_JML.pdf)
17. Karpicke 2009: bila pelajar bebas memilih, banyak yang membuang kata, hasilnya buruk. [tautan](https://pcllab.github.io/downloads/2009/2009_Karpicke_JEPGeneral.pdf)
18. Nakata (SSLA): 5 dan 7 kali ingat lebih baik dari 1 dan 3 kali. [tautan](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/does-repeated-practice-make-perfect-the-effects-of-withinsession-repeated-retrieval-on-second-language-vocabulary-learning/F14BA8A576CD2563D14CEA46E35D842E)
19. Nakata: bila waktu disamakan, 1 kali ingat memberi hasil per menit terbesar. [tautan](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/does-repeated-practice-make-perfect-the-effects-of-withinsession-repeated-retrieval-on-second-language-vocabulary-learning/F14BA8A576CD2563D14CEA46E35D842E)
20. Disertasi MSU (Koval): jarak antar-ulang lebih panjang = lebih sulit saat belajar, lebih unggul di tes tertunda. [tautan](https://d.lib.msu.edu/etd/48649/FULL_TEXT/view)
21. Studi yang sama: efek jarak besar di semua ukuran, efek "lag" pada tes arti tertunda. [tautan](https://d.lib.msu.edu/etd/48649/OBJ/download)
22. Studi kata semu (jurnal Polandia): ulang berjarak unggul daripada beruntun, di tes langsung dan tertunda. [tautan](https://pressto.amu.edu.pl/index.php/ssllt/article/download/49487/44378/139556)
23. Studi kelas Kanada: ulang segera lemah (7,5%) vs sepekan kemudian (20,8%); hanya satu jarak diuji. [tautan](https://www.structural-learning.com/research-briefings/space-it-out)
24. Pyc & Rawson 2009: sasaran 1–10 kali benar per kata; hasil naik tapi menurun tajam. [tautan](https://link.springer.com/article/10.3758/s13423-013-0434-z)
25. Vaughn, Rawson & Pyc 2013: kata sulit 28% vs mudah 41% setelah 1 kali benar; 73% vs 82% setelah 3 kali. [tautan](https://link.springer.com/10.3758/s13421-016-0606-y)
26. Rawson dkk. "successive relearning": 1 atau 3 kali benar di sesi awal, lalu ulang di hari lain. [tautan](https://journals.sagepub.com/doi/full/10.1177/09637214221100484)
27. Ringkasan praktik: capai 3 kali benar, lalu ulang 3 kali berjarak lebar. [tautan](https://www.archive.memory-key.com/research/news/testing-learn-best-practice?page=2)

### C. Forum & ulasan pengguna: LingQ, Readlang, Memrise (H3, H4)
28. LingQ (permintaan fitur): tiap kata harus diulas 2 kali di sesi sama; pengguna minta opsi lebih cepat. [tautan](https://lingq.canny.io/feature-requests/p/feature-request-option-to-disable-double-review-for-words)
29. Forum LingQ: "Flashcards needless repetition" *(judul)*. [tautan](https://forum.lingq.com/t/flashcards-needless-repetition/1733)
30. Forum LingQ: "I hate flash cards" *(judul)*. [tautan](https://forum.lingq.com/t/i-hate-flash-cards/22807?page=2)
31. Forum Readlang: ulang kata di hari sama tidak mengubah jadwal; sengaja mengabaikan ingatan jangka pendek. [tautan](https://forum.readlang.com/t/list-of-reviewed-words-not-updating-after-practice-session/3594)
32. Forum Readlang: kata salah dulu muncul di akhir sesi; pengguna suka bisa melatihnya. [tautan](https://forum.readlang.com/t/the-sequence-of-word-review-has-changed/4966)
33. Ulasan Memrise: "overtesting" kata baru, kartu yang sudah benar muncul lagi di sesi sama. [tautan](https://lingopie.com/blog/memrise-review/)
34. Ulasan Memrise lain: kata keliru kembali di sesi yang sama sampai benar konsisten (dipuji). [tautan](https://androidauthority.com/memrise-language-learning-versus-duolingo-3185707)
35. Ulasan Duolingo (Capterra/Trustpilot): "word review" mengulang kata sama; latihan terasa membosankan. [tautan](https://www.capterra.com/p/210401/Duolingo-for-Schools/reviews/)

Jumlah: 35 butir; jenis: dokumen produk (Anki), studi/jurnal/disertasi, forum (Anki, LingQ, Readlang), ulasan pengguna/aplikasi.

Batas:
- Tak ada studi langsung "Ragu/Lupa di HP, antre beberapa kartu". Ini inferensi.
- Angka "3 kartu jeda" dan "maks 2 ulang" adalah usulan, belum diuji pada Keepo.
- Studi memakai pasangan kata di lab/kelas, bukan pembaca cerita Gen Z.

## 4. Vonis hipotesis
1. **H1 Ulang kata sulit di sesi sama menaikkan ingat: TERBUKTI.**
   - Tes ulang unggul jauh dari belajar ulang (14, 16, 18).
   - Syarat: pengguna benar-benar mencoba ingat dulu (15, 17).
2. **H2 Jeda pendek (1–10 menit) lebih baik daripada langsung: BELUM JELAS (condong terbukti).**
   - Ulang berjarak mengalahkan beruntun (20–22), tapi tak ada studi menit demi menit.
   - Anki memakai 1 menit lalu 10 menit sebagai kebiasaan (1, 3, 9), bukan hasil uji.
   - Terjemahan ke HP: jeda dalam jumlah kartu, bukan menit (tanpa pengatur waktu).
3. **H3 Antrean ulang kepanjangan bikin bosan/lelah: TERBUKTI SEBAGIAN.**
   - Keluhan nyata: ulasan ganda LingQ, "overtesting" Memrise, Duolingo (28, 33, 35).
   - Bukan studi terkontrol. Hasil tambahan menurun tajam (24).
4. **H4 Maks 1–2 kali ulang per kata per sesi cukup: BELUM JELAS (condong terbukti sebagai batas praktis).**
   - 5–7 kali memang lebih baik di studi (18), tapi per menit 1 kali terbaik (19).
   - Setelah 3 kali benar, tambahan kecil (24–27). Kata sulit tetap jauh di bawah (25).
   - Sisanya diserahkan ke jadwal harian, bukan sesi yang sama.

## 5. Usulan aturan sederhana untuk kartu Keepo
- **Lupa:** muncul lagi setelah 3 kartu lain. Maks 2 kali ulang di sesi itu.
- **Ragu:** muncul lagi 1 kali, setelah 5 kartu lain. Tetap `due` = besok.
- **Ulang dijawab Hafal:** tutup kata untuk sesi ini. `lv` tidak naik (lulus karena baru dilihat).
- **Ulang dijawab Lupa/Ragu lagi:** sampai batas ulang. Lalu `due` = besok, pesan "Besok kita coba lagi".
- **Antrean pendek (<3 kartu lain):** ulang ditaruh di ujung; tanpa kartu pengisi.
- **Batas sesi:** ulang tidak memakai jatah 20 kartu; maks 8 ulang per sesi agar tidak lelah.
- **Tampilan:** label kecil "Cek ulang" (sudah ada di kartu) + keterangan "ulang ke-1/2".
- **Teks tombol:** "Lupa — nanti lagi", "Ragu — sebentar lagi".
- Tanpa pengatur waktu, tanpa notifikasi, tidak mengubah tangga 1/3/7/21.

## 6. Data: localStorage, tanpa migrasi
- Simpan di kunci terpisah `kepo-deck-retry` (bukan di `db.vocab`): `{ tgl, k: { "<lang>|<kata>": jumlahUlang } }`.
- `tgl` = tanggal hari ini; bila beda hari, kunci dibuang. Tidak ada migrasi.
- Antrean ulang disimpan di memori (array); bila halaman dimuat ulang, antrean hilang tapi hitungan tetap.
- Kata yang sudah habis batas ulang tidak diulang lagi hari itu.
- Tak ada kolom baru di kata, jadi aman untuk sinkron `cloud.js`.

## 7. Draf spesifikasi untuk developer
Judul: **Kartu ulang: kata Lupa/Ragu muncul lagi di sesi yang sama (maks 2 kali)**. Prioritas P0.
- Sentuh `ui.js` (`deck()`, `decide`, `maybe`), `style.css`, `sw.js` (naikkan `C`).
- Sisipkan kata ke antrean setelah 3 kartu (Lupa) atau 5 kartu (Ragu); hitung ulang di `kepo-deck-retry`.
- Ulang tidak boleh mengubah `lv` naik; Hafal di ulang hanya menutup kata hari itu.
- Jangan sentuh `api/`. Cek `node --check ui.js`; uji lebar 360px dan layar lebar.
- **Selesai bila:** Ragu → muncul lagi setelah 5 kartu; Lupa → setelah 3 kartu, maks 2 ulang; refresh tidak menambah ulang; data lama tetap utuh.

## Langkah berikutnya
- Developer: kerjakan backlog #131.
- Ukur lokal: berapa kata lolos di ulang pertama vs akhirnya tetap Lupa.
- Penguat nanti: tanya 5 pengguna apakah ulang 3 kartu terasa pas atau menjemukan.

Mockup: `docs/mockup-1214.html` (Gambaran rencana, belum dibangun).
