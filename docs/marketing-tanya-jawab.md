# Tanya-jawab Keepo: 10 pertanyaan calon pengguna (Tugas #339)

## Intinya
- 10 pertanyaan yang paling mungkin muncul, tiap jawaban maks 2 kalimat dan ada sumbernya.
- Ada versi pendek siap tempel untuk balasan Threads (maks 500 karakter).
- 3 jawaban belum bisa final: Bagikan teks, harga, dan offline.

Catatan jujur:
- Ini dugaan dari bukti riset, bukan data tanya langsung ke pengguna.
- Jawaban hanya memakai fitur yang sudah ada di app (dicek di app.js, ui.js, cloud.js).
- Soal hak cipta & harga: hanya yang tertulis di docs. Tidak ada klaim baru.
- Tidak ada link form tester di docs. Ganti `[link]` sebelum posting.

## 1. Sepuluh pertanyaan & jawaban

### Q1. Gratis nggak?
- Jawaban: Baca, ketuk kata, dan simpan kata sekarang gratis dicoba. Soal harga nanti, belum diputuskan.
- Bukti: riset-model-bisnis.md (baca & kata tunggal gratis = pola pesaing); riset-harga-rupiah.md (76% pakai gratis).
- Jangan bilang: "gratis selamanya" (kata terlarang di marketing-suara-merek.md).

### Q2. Nanti ada iklan atau paywall mendadak?
- Jawaban: Sekarang tidak ada iklan, dan tidak ada batas yang memotong sesi baca. Kalau nanti ada yang berbayar, kamu dikabari dulu.
- Bukti: riset-model-bisnis.md (U7-U10: iklan & batas harian dibenci); marketing-suara-merek.md (#23).
- Butuh keputusan: janji "dikabari dulu" (lihat bagian 4).

### Q3. Boleh pakai buku sendiri?
- Jawaban: Boleh. Unggah file teks, EPUB, atau PDF, atau tempel teks. Pakai bahan yang memang kamu berhak.
- Bukti: riset-hak-cipta.md (impor pribadi = tanggung jawab pengguna, pola LingQ & Readlang).
- Fitur: app.js (impor .txt/.epub/.pdf) dan ui.js (tempel teks).

### Q4. Datanya aman? Bukuku ke mana?
- Jawaban: Buku disimpan di HP-mu, bukan di server Keepo. Hanya potongan kata dikirim ke layanan terjemahan.
- Bukti: riset-hak-cipta.md (teks disimpan di perangkat; potongan teks ke terjemahan = tanda tanya hukum).
- Jangan bilang: "privat 100%" (belum dikaji hukum).

- Susulan (iPhone): di Safari biasa data bisa terhapus bila lama tak dibuka; Layar Utama lebih aman.
- Bukti susulan: riset-keamanan-data-lokal.md (aturan 7 hari WebKit). Belum ada banner/cadangan; jangan janji "pasti aman".

### Q5. Bedanya sama Duolingo apa?
- Jawaban: Duolingo kasih pelajaran jadi. Keepo kamu baca ceritamu sendiri, ketuk kata yang bikin kepo.
- Bukti: marketing-suara-merek.md (janji "konten sendiri" #1, #3); riset-model-bisnis.md (keluhan batas & iklan Duolingo).
- Jangan bilang: "lebih bagus dari Duolingo" (tak ada data).

### Q6. Bedanya sama LingQ / Readlang?
- Jawaban: Sama-sama baca konten sendiri. Keepo bahasa Indonesia, tampilan bersih, dan masih tahap coba.
- Bukti: riset-model-bisnis.md (F1-F13: pola gratis & batas pesaing); marketing-suara-merek.md (#26 LingQ membingungkan, #3 Readlang bersih).
- Jangan bilang: "lebih murah" (harga Keepo belum ada).

### Q7. Bisa Jepang, Korea, Mandarin?
- Jawaban: Bisa. Ada Jepang, Korea, Mandarin, dan 10 bahasa lain. Cara baca muncul saat kata diketuk.
- Bukti: Raka (masukan tester): JP/KR butuh cara baca. riset-model-bisnis.md tak membahas; fitur dicek di app.js (LANGS, romanisasi).
- Jangan bilang: "cara baca langsung tampil di teks" (belum ada; baru di sheet arti).

### Q8. Bisa offline? Di KRL sinyal putus.
- Jawaban: Aplikasi dan bukumu bisa dibuka tanpa internet. Terjemahan butuh internet; kata yang pernah dibuka sebagian tersimpan.
- Bukti: masukan Raka (terjemahan putus di KRL); app.js (cache terjemahan maks 200 kata); sw.js (cache aplikasi).
- Butuh keputusan: seberapa jauh boleh dijanjikan (lihat bagian 4).

### Q9. Ini app resmi atau cuma proyek iseng? Kok namanya Keepo?
- Jawaban: Masih tahap coba, dibuat tim kecil. "Kepo" karena kamu belajar dari hal yang bikin penasaran.
- Bukti: marketing-suara-merek.md (#39-40 kepo = rasa ingin tahu; #3 "masih tahap coba").
- Catatan: arti "kepo" di KBBI bernada negatif (#42). Pakai nada ringan.

### Q10. Gimana cara ikut coba?
- Jawaban: Buka tautannya, pasang ke Layar Utama, coba satu cerita. Kabari kami kalau ada yang aneh.
- Bukti: marketing-pratinjau-tautan.md (tautan punya pratinjau); riset-keamanan-data-lokal.md (Layar Utama lebih aman).
- Catatan: form tester belum ada di docs. Pakai `[link form]` bila sudah ada.

## 2. Versi pendek siap tempel (balasan Threads)

Semua maks 500 karakter. Ganti `[link]` sebelum posting.

**Q1 Gratis?**
> Sekarang gratis dicoba. Baca, ketuk kata, simpan kata. Soal harga nanti, belum diputuskan. Coba dulu: [link]

**Q2 Iklan?**
> Nggak ada iklan dan nggak ada batas yang motong sesi bacamu. Masih tahap coba, jadi kalau ada yang aneh kabari ya.

**Q3 Buku sendiri?**
> Boleh. Unggah teks, EPUB, atau PDF, atau tempel teksnya. Pakai bahan yang memang kamu berhak ya. Kamu ketuk kata yang bikin kepo, artinya muncul.

**Q4 Data aman?**
> Bukumu disimpan di HP-mu, bukan di server Keepo. Yang keluar cuma potongan kata untuk terjemahan. Di iPhone, pasang ke Layar Utama biar lebih awet.

**Q5 Beda Duolingo?**
> Duolingo kasih pelajaran jadi. Keepo kebalikannya: kamu baca ceritamu sendiri, kata barunya ikut nyangkut. Cocok kalau bosan hafalan.

**Q6 Beda LingQ/Readlang?**
> Idenya mirip: baca konten sendiri. Keepo pakai bahasa Indonesia, tampilan bersih, dan masih tahap coba. Kritikmu sangat membantu.

**Q7 JP/KR/ZH?**
> Bisa. Jepang, Korea, Mandarin, plus 10 bahasa lain. Ketuk kata, arti dan cara bacanya muncul. Cara baca di dalam teks belum ada.

**Q8 Offline?**
> Aplikasinya dan bukumu bisa dibuka tanpa internet. Terjemahan butuh internet; kata yang pernah dibuka sebagian tersimpan. Jujur, di KRL masih bisa putus.

**Q9 Kok "Keepo"?**
> Kepoin bahasa baru. Kamu baca hal yang bikin penasaran, bahasanya ikut nyangkut. Masih tahap coba, dibuat tim kecil.

**Q10 Cara ikut?**
> Buka [link], pasang ke Layar Utama, coba satu cerita. Ada yang aneh? Balas di sini, kami baca semua.

Tips Threads:
- Balas dalam 1 jam. Jangan copy-paste persis; ubah satu kata biar tidak terasa bot.
- Jangan debat. Kalau ragu, jawab "belum tahu, kami catat."
- Catat pertanyaan baru yang sering muncul untuk daftar ini.

## 3. Cara ukur
- Reply yang dijawab dalam 1 jam (target: semua).
- Pertanyaan baru yang belum ada di daftar ini.
- Pendaftar form tester setelah balasan (bila form ada).

## 4. Tiga jawaban butuh keputusan founder
1. **Bagikan teks** (Q3/Q4)
   - Bagikan mengirim teks ke server Keepo. Risiko hak cipta terbesar (riset-hak-cipta.md).
   - Pilih: sebut Bagikan di balasan, atau diam sampai konsultasi hukum selesai. Rekomendasi: diam dulu.
2. **Harga** (Q1/Q2)
   - Usulan riset: Rp29 rb/bulan atau Rp249 rb/tahun, belum teruji (riset-harga-rupiah.md).
   - Pilih: boleh bilang "gratis dicoba" saja, atau janji "baca tetap gratis"? Rekomendasi: yang pertama.
3. **Offline & "dikabari dulu"** (Q2/Q8)
   - Terjemahan butuh internet; cache hanya 200 kata. Apa boleh pakai kata "offline"?
   - Pilih: pakai kalimat jujur di atas, atau tunggu fitur offline penuh. Rekomendasi: kalimat jujur.

## 5. Langkah berikutnya
- Founder: putuskan 3 hal di bagian 4, lalu pakai versi pendek.
- Founder: isi `[link]` dengan alamat Keepo atau form tester.
- Marketing: tambah pertanyaan baru dari balasan nyata setelah 2 minggu.
