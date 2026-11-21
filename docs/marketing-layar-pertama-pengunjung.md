# Teks layar pertama untuk pengunjung baru dari tautan (Tugas #1530, Tahap 27 & 22)

## Intinya
- Pengunjung dari Threads/TikTok/WhatsApp cuma beri 5 detik. Judul harus jawab: "ini apa, buat apa".
- Usul: judul A + tombol "Coba cerita contoh" tanpa akun. Janji: ketuk kata, arti muncul.
- Ini rancangan teks, bukan data. Pemenang ditentukan angka /hitung (bagian 5), bukan selera.

Status: draft. Tidak ada kode app yang diubah. Pengujian oleh pengguna AI = simulasi, bukan orang sungguhan.
Rujukan (tidak diulang): `docs/marketing-suara-merek.md`, `docs/marketing-pratinjau-tautan.md`, `docs/riset-corong-akuisisi-organik.md`, `docs/riset-aktivasi-hari-pertama-patokan.md`, `BRAND.md`.

## 1. Tiga pilihan judul + penjelas
Tagline resmi tetap: **Baca bukumu sendiri, ngerti bahasanya.**

| | Judul utama | Satu baris penjelas |
|---|---|---|
| A | Baca bukumu sendiri, ngerti bahasanya. | Ketuk kata apa pun, artinya dalam bahasa Indonesia langsung muncul. |
| B | Ketuk kata, langsung ngerti. | Baca buku atau cerita bahasa asing favoritmu. Kata yang bikin kepo, tinggal diketuk. |
| C | Baca santai, bahasa ikut nyangkut. | Bukan hafalan. Baca cerita yang kamu suka, kata barunya dibantu Keepo. |

Alasan urutan:
- A menjual keunikan (buku sendiri) dan pas dengan tagline & pratinjau tautan.
- B paling jelas caranya. Seri dengan A di uji AI (4,5 vs 4,5).
- C paling tenang, tapi paling kabur (3,5). Jadi pembanding, bukan favorit.

Jaga kejujuran:
- Hindari "langsung" tanpa catatan: arti kata butuh internet.
- Hindari "fasih", "terbaik", "dijamin", "bestie", "guys".

## 2. Tiga poin bukti (jujur, bisa dicek di app)
1. **Ketuk kata, arti Indonesia muncul.** Arti kata baru butuh internet.
2. **Impor bukumu sendiri.** EPUB, TXT, PDF teks, atau tempel teks. PDF scan belum bisa.
3. **Gratis dicoba, tanpa akun untuk mulai.** Setelah dibuka sekali, halaman tetap terbuka saat sinyal hilang.

Yang sengaja TIDAK ditulis:
- Angka pengguna, rating, atau "ribuan orang". Belum ada data.
- "Gratis selamanya". Belum diputuskan.
- "Offline penuh". Terjemahan kata baru butuh internet.

## 3. Teks tombol
- **Tombol utama:** `Mulai baca bukuku`. Alternatif uji: `Tambah buku pertamaku`.
- **Tombol kedua:** `Coba cerita contoh`. Teks kecil di bawahnya: `Tanpa akun. 3 kalimat, 1 menit.`
- Aturan: tombol kedua setara besarnya di HP. Banyak pengunjung belum punya buku siap.
- Bukti dukung: cerita contoh pendek + kata pertama dipandu sudah ada (`docs/riset-cerita-contoh-kata-pertama.md`).
- Masukan Ilham (AI): tombol "Coba tanpa akun" di layar masuk. Selaras dengan tombol kedua.

## 4. Jawaban tiga keberatan (maks 1 kalimat)
| Keberatan | Jawaban |
|---|---|
| Bukunya dari mana? | Dari kamu: unggah EPUB/TXT/PDF atau tempel teks, atau coba cerita contoh dulu. |
| Harus bayar? | Gratis dicoba, dan kamu bisa mulai tanpa akun. |
| Bisa bahasa apa? | Inggris, Jepang, Korea, Mandarin, Prancis, Jerman, Spanyol, dan beberapa lainnya. |

Catatan:
- Daftar bahasa diambil dari pilihan bahasa di app. Cek ulang sebelum dipakai di materi cetak.
- Keepo tidak menyediakan buku. Jangan menyiratkan perpustakaan.

## 5. Tiga angka dari /hitung untuk membandingkan judul
Cara: satu `?ref=` per judul, pakai pola `th-a`, `th-b`, `th-c` (huruf kecil, maks 20 karakter). Gambar: satu judul per minggu pada tautan yang sama, jangan campur.

| # | Angka | Kaitan "Keluar bila" |
|---|---|---|
| 1 | Pengunjung → pengguna baru (per ref) | Tahap 27: ≥300 baru/bulan, 1 ref terbaik terbukti |
| 2 | Pengguna baru → ketuk kata pertama di hari pertama | Tahap 22: baca ≥1 halaman DAN ketuk ≥1 kata (target ≥60%; usul riset 25% lalu 40%) |
| 3 | Median detik ke ketuk kata pertama, cerita contoh vs impor | Tahap 22: arah <120 detik; tahap 27: bukti jalur terbaik |

Aturan baca:
- Sampel <100 per judul: tulis rentang, jangan satu angka. Kesimpulan hanya arah.
- Judul menang bila angka 2 lebih tinggi. Angka 1 saja bisa menipu (klik penasaran, lalu kabur).
- Pencatatan 3 langkah & detik ada di backlog developer #153. Sebelum itu, hanya angka 1 yang pasti ada.
- Angka nyata + tanggal wajib ditulis di catatan tahap sebelum status naik (aturan_fase2).

## 6. Bukti publik: halaman awal pesaing (WebSearch, 21 Nov 2026)
Batas jujur: hasil pencarian hanya cuplikan & ringkasan. Halaman penuh tidak dibuka. Cek ulang sebelum dikutip publik.

| Layanan | Yang terlihat | Pelajaran untuk Keepo |
|---|---|---|
| [Readlang](https://readlang.com/) | Judul "Learn a language reading what you love", lalu fitur: klik untuk terjemah, kartu hafalan | Janji bacaan sendiri + penjelas cara kerja. Pola A cocok |
| [LingQ](https://www.lingq.com/en/) | "Learn Languages with Shows, Podcasts, and Books You Love"; ajakan "Get started for free"; versi berbayar ada | Gratis ditonjolkan, tapi premium ada. Jangan klaim gratis selamanya |
| [Language Reactor](https://languagereactor.com) | Halaman mulai dari pasang ekstensi; inti gratis, fitur pro berbayar | Langkah pertama dibuat satu aksi. Mendukung tombol utama tunggal |
| Duolingo | Cuplikan arsip 2021: tombol "Get started", judul "world's #1 way to learn" | Klaim "#1" sengaja dihindari Keepo. Hanya tombol mulai yang ditiru |

Kesimpulan:
- 3 dari 4 menjual "belajar dari konten yang kamu suka". Janji Keepo wajar, bukan unik sendirian.
- Pembeda yang bisa dipegang: ketuk kata, arti Indonesia, mulai tanpa akun.
- Tidak ada angka konversi halaman awal yang terbaca. Pilihan judul tetap hipotesis.
- Ulasan lama: LingQ pemula "dilempar ke feed" tanpa arahan (lihat suara merek #26). Cerita contoh menjawabnya.

## 7. Langkah berikut
- Developer (tugas lain): pasang teks terpilih; jangan sebelum founder setuju.
- Founder: pilih judul awal (usul A), tempel tautan `?ref=` per judul di posting Threads.
- Marketing: ulas angka /hitung setelah 2 minggu.
