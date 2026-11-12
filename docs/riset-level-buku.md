# Riset #111: Cek level buku sebelum dibaca

Status: draft. Dibuat tanpa akses internet; angka & tautan dari ingatan.
Tanda: ✅ = fakta dengan sumber (tautan, tetap perlu dibuka ulang) · ⚠️ = belum diverifikasi · 💭 = asumsi tim.

## Intinya
- Buku dengan kata asing >5% (sekitar 1 dari 20 kata) bikin pemula capek, lalu berhenti.
- Perkiraan murah bisa dihitung di HP sendiri: kata baru, panjang kalimat, daftar frekuensi.
- Usul fitur: saat impor, tampilkan "Perkiraan kata baru: ~N%" dari kata yang sudah dikenal pengguna.

## 1. Kenapa pemula menyerah
- ✅ Pemahaman memadai butuh sekitar 95–98% kata dikenal. Laufer (1989) ~95%; Hu & Nation (2000) ~98%.
  - Hu & Nation 2000, Reading in a Foreign Language 13(1): https://nflrc.hawaii.edu/rfl/ (cari "Unknown vocabulary density"). ⚠️ tautan belum dicek.
  - Laufer 1989, "What percentage of text-lexis is essential for comprehension?" ⚠️ tautan tidak ada, cari judulnya.
  - Schmitt, Jiang & Grabe 2011, Modern Language Journal: pemahaman naik hampir lurus seiring cakupan kata. ⚠️
- ✅ Extensive reading: baca banyak teks mudah, hampir tanpa buka kamus. Teks harus "pas" supaya lancar.
  - Day & Bamford (1998), *Extensive Reading in the Second Language Classroom*. Waring & Nation (2004). ⚠️ halaman belum dicek.
- 💭 Di 90% cakupan, ~1 kata dari 10 asing: tiap kalimat berhenti. Ketuk-kata terus terasa seperti kerja, bukan baca.
- 💭 Bagi A2–B1 yang kosakatanya masih ribuan, novel asli hampir pasti di bawah 95%.

## 2. Cara menaksir tanpa AI berat
Semua bisa jalan di browser, offline. Angka patokan di bawah adalah 💭 dan perlu dikalibrasi.

| Sinyal | Cara hitung | Catatan |
|---|---|---|
| % kata baru | Potong teks jadi kata (sudah ada `Intl.Segmenter`), hitung yang tidak dikenal | Paling berguna |
| Kata unik | Kata berbeda ÷ total kata | Makin tinggi makin sulit; bias di teks pendek, pakai 2.000 kata pertama |
| Panjang kalimat | Rata-rata kata (Inggris) atau karakter (Jepang/Korea) per kalimat | Pelengkap saja |
| Frekuensi | Kata di daftar 1.000/3.000/5.000 teratas = "mudah" | Tetap bisa menilai walau pengguna baru |

- Inggris: rumus Flesch/Dale-Chall dibuat untuk penutur asli. 💭 Lebih baik daftar frekuensi.
- Korea: kata menempel partikel. Taksiran kasar; lihat riset #56 (pemotongan kata).
- Jepang: kanji = penghalang utama. 💭 Hitung juga % kanji di luar daftar JLPT N5–N4.

Sumber daftar frekuensi gratis (⚠️ lisensi harus dibaca ulang sebelum dipakai):

| Bahasa | Sumber | Lisensi (perkiraan) |
|---|---|---|
| Inggris | wordfreq (Robyn Speer): https://github.com/rspeer/wordfreq | kode Apache-2.0, data CC BY-SA 4.0 ⚠️ |
| Inggris/Korea/Jepang | FrequencyWords (hermitdave), dari subtitle OpenSubtitles: https://github.com/hermitdave/FrequencyWords | MIT / CC BY-SA ⚠️ |
| Inggris | SUBTLEX-US (Brysbaert & New 2009), situs Ghent University | riset non-komersial ⚠️ |
| Korea | Daftar kosakata belajar dari NIKL: https://korean.go.kr | publik, syarat pakai ⚠️ |
| Jepang | Daftar JLPT Tanos: http://www.tanos.co.uk/jlpt/ ; JMdict (EDRDG): https://www.edrdg.org | Tanos CC BY; JMdict CC BY-SA ⚠️ |

- 💭 CC BY-SA mewajibkan atribusi & berbagi serupa untuk datanya. Cek dulu sebelum menyalin ke repo.
- 💭 Simpan hanya 3.000–5.000 kata teratas per bahasa (~30–60 KB). Cukup untuk A2–B1.

## 3. Cara aplikasi lain menampilkan level
Tidak dibuka langsung. Semua ⚠️ dari ingatan; verifikasi dengan mencoba tiap app 10 menit.

| App | Yang diingat | Status |
|---|---|---|
| Readlang | Perpustakaan teks berlabel tingkat; tidak ingat ada hitungan % kata baru | ⚠️ |
| LingQ | Tingkat per pelajaran (Pemula–Lanjut); statistik kata baru vs dikenal per impor | ⚠️ paling mirip usulan |
| Beelinguapp | Cerita berlabel tingkat, dipilih manual oleh penyusun | ⚠️ |
| Language Reactor | Menandai kata langka/umum di subtitle; bukan skor per buku | ⚠️ |

- 💭 Pola umum: label tingkat dari editor. Hitungan pribadi hanya LingQ (diduga).
- 💭 Peluang Keepo: buku bebas unggah, tanpa label editor. Hitungan pribadi pas untuk itu.

## 4. Rekomendasi: "Perkiraan kata baru"
Satu fitur kecil: setelah impor, kartu buku menampilkan "Perkiraan kata baru: ~N%" + label (Pas / Agak berat / Berat).

Kerangka teknis (💭 rancangan, belum dibangun):
- Ambil ±3.000 kata pertama buku, potong dengan `seg()` yang sudah ada.
- Kata "dikenal" = kata tersimpan pengguna (IndexedDB) + daftar frekuensi teratas (tahap 2).
- % baru = kemunculan kata asing ÷ total kata. Tampil bulat, ada kata "perkiraan".
- Pita: ≤5% "Pas" · 5–10% "Agak berat" · >10% "Berat" (💭 dari patokan 95–98%).
- Offline, tanpa build: daftar frekuensi sebagai JSON kecil di cache `sw.js` (naikkan versi `C`).
- Tahap 1 (hanya kata tersimpan): pengguna baru melihat ~100% baru, menyesatkan. Tahap 2 wajib daftar frekuensi.
- Jangan blokir impor. Hanya info (Reader First).

Risiko:
- Potong kata Jepang/Korea salah → angka meleset (riset #56).
- Kata tersimpan = kata yang dicari, bukan yang dikuasai. 💭 Cenderung menaksir terlalu sulit.

## 5. Tiga pertanyaan uji wawancara
1. "Ceritakan buku terakhir yang kamu berhenti baca di tengah. Kapan kamu sadar itu terlalu sulit?"
2. "Kalau Keepo bilang 'sekitar 12% kata baru' sebelum mulai, kamu lanjut, ganti buku, atau abaikan? Kenapa?"
3. "Berapa persen kata asing yang masih nyaman buatmu? Kalau lebih, kamu ngapain?"

## 6. Langkah berikutnya
1. Buka tautan ✅ dan cek lisensi daftar frekuensi (30 menit).
2. Tanyakan 3 pertanyaan di atas ke 5 peserta wawancara.
3. Bila 3 dari 5 bilang berguna, buat tugas developer tahap 1 + 2.
