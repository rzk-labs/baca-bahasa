# Riset: kata bahasa lain muncul di buku (#1487)

## Intinya
- Saringan aksara sudah ada, tapi hanya Korea di buku Jepang/Mandarin. Celahnya sempit.
- Angka bentrok punya sebab kedua: Catatan sesi menghabiskan daftar, lalu sheet Tamat membacanya kosong.
- Rekomendasi: satu aturan "aksara buku", dipasang saat ketuk dan saat tampil.

## 1. Akar masalah (dari kode)
- Kata "baru" = kata diketuk (`recSess`, ui.js) atau tersimpan (`countedVocab`, app.js). Aksara tidak dicek saat ketuk.
- Bahasa buku = `b.lang`, ditebak `guessLang` dari 1.500 huruf awal. Teks dipecah per kata memakai bahasa itu.
- Saringan `isKataSampah` (app.js) membuang Hangul di buku ja/zh sejak #847 (13 Nov). Hanya saat tampil.
- Celah: buku ko dengan hanzi, buku Latin dengan CJK, aksara lain (Kiril, Arab), dan `lang` kosong.
- Dugaan laporan Raka: versi lama di cache, atau `lang` buku tak terbaca. Belum bisa direproduksi dari kode.
- Sebab bentrok angka: `sessRecap` menghapus `SESSW` saat tampil. Sheet Tamat lalu hitung `pend` = 0, tulis "tidak ada kata baru".
- Sumber beda juga: Catatan sesi = kata diketuk; sheet Tamat = kata tersimpan + sisa ketukan.

## 2. Tiga opsi
- **A. Saring saat tampil saja (sekarang).** Untung: data aman. Rugi: celah tiap aksara baru, angka bisa beda antar layar.
- **B. Saring menurut aksara buku, saat ketuk DAN tampil.** Untung: satu aturan, semua layar sama. Rugi: kata asing sah (nama, kutipan) ikut tak tercatat.
- **C. Deteksi bahasa per kalimat, tandai kata asing.** Untung: paling pintar. Rugi: berat, salah tebak kalimat pendek, perlu pustaka.

## 3. Rekomendasi: opsi B
- Tiap bahasa punya himpunan aksara: ja = Kana + Han; ko = Hangul + Han; zh = Han; Latin = Latin.
- Kata lolos bila ada minimal satu huruf beda dari aksara buku → bukan kandidat. Campuran angka/tanda diabaikan.
- Pasang di `recSess` (jangan catat) dan di `isKataSampah` (tetap saring data lama). Tanpa hapus data.
- Perbaiki bentrok: hitung kata sesi sekali (`tapSesi`), dipakai Catatan sesi dan sheet Tamat. Jangan hapus sebelum Tamat tampil.
- Bukti kompetitor tipis: pencarian publik tidak menemukan dokumentasi penanganan teks campuran di LingQ, Readlang, Language Reactor, Kindle. Kesan: kata mengikuti bahasa yang dipilih pengguna/kamus. Tidak ada klaim terbukti.

## 4. Kasus uji untuk developer
- Buku ja, ketuk 아침 dan 사: tidak masuk Catatan sesi, sheet Tamat, tab Kata, hitungan Home.
- Buku ja, ketuk 学校 dan ひらがな: tetap tercatat. Buku ko, ketuk 学校: tidak tercatat (usul; Han tetap sah di ja/zh).
- Buku en, ketuk 日本: tidak tercatat. "OK" di buku ja: tercatat (Latin) kecuali nama.
- Buku `lang` kosong atau `ja-JP`: aturan tetap jalan.
- Catatan sesi tampil lalu Tamat: kedua angka kata sama; tutup Catatan sesi, sheet Tamat tidak bilang "tidak ada".
- Data kata lama beraksara asing: tidak dihapus, hanya disembunyikan.

## 5. Langkah berikutnya
- Developer kerjakan backlog #162 (ui.js, app.js, sw.js naik C).
- Minta Raka cek ulang di versi terbaru; catat bahasa buku & isi `lang`.
- Mockup: docs/mockup-1487.html (rencana, belum dibangun).
