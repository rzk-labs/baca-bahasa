# Riset Tahap 2: Konteks Strategis (SWOT & kelayakan teknis)

Validasi bukti internet, 11 Nov 2026. Tugas #310.

## Intinya
- Terjemahan gratis tanpa kunci resmi = titik paling rapuh. Perlu jalur resmi + simpanan hasil.
- Server & hosting gratis cukup untuk beta. Biaya baru terasa di terjemahan.
- iPhone: data bisa hilang & suara tak stabil. Ajak pasang ke Layar Utama + sinkron akun.

Catatan jujur: bukti dikumpulkan lewat pencarian web (cuplikan hasil). Halaman resmi tak semua dibuka penuh. Angka resmi perlu dicek ulang sebelum dipakai untuk keputusan uang.

## 1. SWOT
Kode [B#] = nomor bukti di bagian 6 (ada tautannya).

| | Poin | Bukti |
|---|---|---|
| **Kekuatan** | Hosting & server gratis sampai ribuan pengguna | B29, B30, B32 |
| | Alternatif terjemahan resmi murah tersedia | B10, B11, B12 |
| | Tanpa proses build: ubah cepat, biaya rawat kecil | B32, B34 |
| **Kelemahan** | Terjemahan kini pakai jalur tak resmi | B6, B7, B9 |
| | Data iPhone Safari bisa terhapus | B15, B19, B20 |
| | Waktu founder sangat terbatas | B35, B36 |
| **Peluang** | Ketentuan gratis resmi (Google, DeepL) 500 ribu huruf/bulan | B10, B12, B13 |
| | Pasang ke Layar Utama menaikkan keamanan data | B15, B17, B22 |
| | Server Keepo bisa jadi simpanan terjemahan bersama | B29, B30 |
| **Ancaman** | Jalur gratis bisa diblok tiba-tiba | B6, B8, B3 |
| | Suara iPhone berubah antar versi iOS | B25, B26, B27 |
| | Batas harian server gratis bisa jebol saat viral | B29, B30 |

Konteks pasar, pesaing, hukum: rujuk riset lama, tak diulang.
- Tren & pasar: `docs/riset-tren-industri.md`, `docs/riset-pasar-ukuran.md`.
- Pesaing & harga: `docs/riset-kompetitor-verifikasi.md`, `docs/riset-model-bisnis.md`.
- Hukum & data: `docs/riset-hak-cipta.md`, `docs/riset-keamanan-data-lokal.md`.

## 2. Audit sumber daya
- **Orang:** 1 founder, 1-4 jam/minggu. Selebihnya tim agent AI.
- **Uang:** fleksibel, bayar saat terbukti. Saat ini biaya hampir nol.
- **Aset:** aplikasi jalan di GitHub Pages, server kecil, 60+ dokumen riset.

Beban waktu founder harus dijaga:
- Maks 1 keputusan besar per minggu.
- Tugas rutin diserahkan ke agent.
- Hanya urusan yang butuh manusia (hukum, merek, bayar) ke founder.

## 3. Strategi teknologi awal
- **Tetap sederhana:** satu aplikasi tanpa build, server gratis.
- **Terjemahan:** pindah ke jalur resmi lewat server Keepo, simpan hasil agar hemat.
- **Data:** dorong Layar Utama, sinkron akun, ekspor cadangan.

Ambang pindah ke berbayar:
- Server: mendekati 100 ribu permintaan/hari.
- Terjemahan: lewat 500 ribu huruf/bulan.
- Hosting: mendekati 100 GB lalu lintas/bulan.

## 4. Hipotesis kelayakan
| # | Hipotesis | Vonis | Alasan singkat |
|---|---|---|---|
| H1 | Terjemahan gratis tanpa kunci aman jangka panjang | **Gugur** | Tak resmi, sering ditolak 429/503 (B6, B7, B8); izin tak jelas (B9). Kuota MyMemory kecil: 5.000 huruf/hari (B1). |
| H2 | Ada alternatif legal berbiaya rendah | **Terbukti** | Google 500 ribu huruf gratis, lalu US$20/juta (B10, B11). DeepL Free 500 ribu/bulan (B12). |
| H3 | Server & hosting gratis cukup untuk beta (puluhan-ratusan pengguna) | **Terbukti** | Worker 100 ribu permintaan/hari, D1 5 juta baca/100 ribu tulis/hari (B29, B30). Pages 100 GB lunak (B32). |
| H4 | Data iPhone aman bila dipasang ke Layar Utama | **Belum jelas** | Dikecualikan 7 hari (B15), tapi ada laporan hilang tetap (B19, B20) dan Apple tak menjamin tertulis (B21). |
| H5 | Suara & mikrofon andal di iPhone | **Belum jelas** | Baca-suara ada, tapi daftar suara berubah (B25, B26); mikrofon di Layar Utama bermasalah (B24). |
| H6 | 1-4 jam/minggu cukup menjalankan produk | **Belum jelas** | Hanya cerita pribadi, bukan studi (B35, B36, B38). Agent AI membantu, tak terbukti. |

Hasil: 2 terbukti, 1 gugur, 3 belum jelas.

## 5. Tiga risiko teratas
**1. Terjemahan tak resmi mati mendadak** (H1)
- Mitigasi: kunci resmi (Google/DeepL) di server, hasil disimpan bersama.
- Cadangan: MyMemory dengan email terdaftar (naik ke 50 ribu huruf/hari, B2).
- Pantau kegagalan terjemahan; beri pesan ramah, bukan layar kosong.

**2. Buku & kata pengguna iPhone hilang** (H4)
- Mitigasi: banner "Pasang ke Layar Utama", sinkron akun, tombol ekspor.
- Uji di iPhone sungguhan tiap rilis besar.
- Detail: `docs/riset-keamanan-data-lokal.md`.

**3. Waktu founder habis sebelum produk terbukti** (H6)
- Mitigasi: batasi ke 3 prioritas P0 (baca nyaman, bantuan arti, privasi).
- Agent AI kerjakan riset & kode; founder hanya setuju/tolak.
- Cek tiap bulan: masih 1-4 jam/minggu? Kalau tidak, kurangi cakupan.

## 6. Bukti (38 butir, 4 jenis sumber)
Jenis: (A) dokumen resmi, (B) bug tracker/forum Apple & komunitas pengembang, (C) blog/artikel teknis, (D) komunitas founder.
Semua tautan muncul di hasil pencarian 11 Nov 2026.

**Terjemahan**
| ID | Bukti | Jenis | Tautan |
|---|---|---|---|
| B1 | MyMemory anonim: ±5.000 huruf/hari | C | https://lilting.ch/en/articles/mymemory-api |
| B2 | Email di parameter `de` naikkan ke 50.000 huruf/hari | C | https://lilting.ch/en/articles/mymemory-api |
| B3 | Batas anonim dihitung per alamat IP | C | https://lilting.ch/en/articles/mymemory-api |
| B4 | Satuan batas (kata vs huruf) tak konsisten antar sumber | C | https://langbly.pages.dev/blog/best-free-translation-api-2026 |
| B5 | Daftar API: cek dokumen resmi MyMemory untuk angka terbaru | C | https://jentic.com/apis/mymemory.translated.net/mymemory |
| B6 | Jalur gratis Google sering kena 429/503 | C | https://www.github.com/vitalets/google-translate-api |
| B7 | Pengembang ganti `client=gtx` saat 403 | C | https://lightrun.com/answers/lokalise-i18n-ally-google-translate-api-key-is-not-utilized-correctly |
| B8 | Proyek lain menjeda ±0,5 detik & ganti jalur cadangan | C | https://huggingface.co/spaces/Shirochi/Glossarion/blob/main/google_free_translate.py |
| B9 | Dokumen kuota resmi hanya mengatur API berbayar, bukan jalur gratis | A | https://docs.cloud.google.com/translate/quotas |
| B10 | Google Cloud: 500 ribu huruf pertama/bulan gratis | A | https://cloud.google.com/translation/pricing |
| B11 | Google Cloud: US$20 per juta huruf setelahnya | A | https://cloud.google.com/translation/pricing |
| B12 | DeepL API Free: 500 ribu huruf/bulan | A | https://developers.deepl.com/docs/resources/usage-limits.md |
| B13 | DeepL Free: tanpa batas harian, hanya batas bulanan | C | https://neuraplus-ai.github.io/blog/deepl-api-free-limit.html |
| B14 | DeepL Free memakai alamat server terpisah | A | https://support.deepl.com/hc/en-us/articles/360021200939-DeepL-API-Free |

**iPhone: data**
| ID | Bukti | Jenis | Tautan |
|---|---|---|---|
| B15 | Apple: batas 7 hari hanya untuk Safari; Layar Utama punya hitungan sendiri | B | https://www.osnews.com/?p=131566 |
| B16 | Kritik luas atas penghapusan data 7 hari | C | https://www.itnews.com.au/news/apple-cops-flak-for-deleting-local-browser-storage-after-7-days-539833 |
| B17 | iOS 17: kuota Layar Utama sama dengan browser, berdasar ruang disk | A | https://webkit.org/?p=14403 |
| B18 | iOS 17: tak lagi dibatasi 1 GB | A | https://webkit.org/?p=14403 |
| B19 | Laporan: situs tanpa permintaan lintas-situs tetap kena hapus 7 hari (iOS 17) | B | https://bugs.webkit.org/show_bug.cgi?id=272189 |
| B20 | Laporan: data hilang 7 hari di web app Layar Utama | B | https://bugs.webkit.org/show_bug.cgi?id=232302 |
| B21 | Forum Apple: tak ada dokumen resmi soal data lewat 7 hari | B | https://developer.apple.com/forums/thread/710157 |
| B22 | Data Safari & Layar Utama tidak dibagi | C | https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide |

**iPhone: suara**
| ID | Bukti | Jenis | Tautan |
|---|---|---|---|
| B23 | Pengenalan suara Safari iOS 14.5+, awalan `webkit` | C | https://www.testmuai.com/learning-hub/speech-recognition-api-browser-support/ |
| B24 | Kesalahan mikrofon di PWA iPhone | B | https://developer.apple.com/forums/thread/748048 |
| B25 | Suara hilang di Safari sejak iOS 18 | B | https://developer.apple.com/forums/thread/764438 |
| B26 | Suara Jepang (Kyoko) tak muncul sejak iOS 16.0.2 | B | https://bugs.webkit.org/show_bug.cgi?id=250665 |
| B27 | Peristiwa daftar suara tak andal di Safari | B | https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/27779663/voiceschanged-event-not-fired-in-safari |
| B28 | Hanya 1 suara per bahasa yang bisa dipilih di iOS | C | https://readium.org/speech/docs/WebSpeech.html |

**Biaya server & hosting**
| ID | Bukti | Jenis | Tautan |
|---|---|---|---|
| B29 | Worker gratis: 100 ribu permintaan/hari, 10 ms CPU | A | https://developers.cloudflare.com/workers/platform/pricing/ |
| B30 | D1 gratis: 5 juta baca & 100 ribu tulis/hari, 5 GB | A | https://developers.cloudflare.com/d1/platform/pricing/ |
| B31 | Paket US$5/bln: 25 miliar baca, 50 juta tulis, lalu US$1/juta tulis | A | https://developers.cloudflare.com/d1/platform/pricing/ |
| B32 | GitHub Pages: batas lunak 100 GB/bulan | A | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| B33 | GitHub Pages: situs maks 1 GB | A | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| B34 | GitHub Pages: batas lunak 10 build/jam | A | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |

**Kapasitas founder**
| ID | Bukti | Jenis | Tautan |
|---|---|---|---|
| B35 | Pengguna Indie Hackers: ±10 jam/minggu pada proyek sampingan | D | https://www.indiehackers.com/post/is-working-an-hour-a-day-on-a-side-project-enough-c7a438a977 |
| B36 | Angka burnout founder ±53% (survei tak jelas) | D | https://lonelyentrepreneur.com/founder-time-trap/ |
| B37 | Kurang dari 40 jam/minggu jarang berhasil (opini penulis) | D | https://www.bizplan.com/library/expert-advice/can-you-build-a-startup-in-less-than-40-hours-per-week |
| B38 | "5% proyek sampingan selesai" tanpa sumber (tak dipakai) | D | https://braindetox.kr/en/posts/side_project_completion_strategy_2026.html |

Keterbatasan:
- Angka B1-B5, B13, B22 dari sumber kedua; angka resmi bisa berubah.
- Tak ada studi kuat soal kapasitas founder (B35-B38 hanya cerita).
- Reddit & Threads tak diuji; ketentuan hukum jalur gratis Google belum terjawab.

## 7. Kesimpulan
- Tahap 2 layak ditutup: pondasi teknis cukup untuk beta kecil.
- Satu keputusan mendesak: ganti jalur terjemahan ke yang resmi sebelum pengguna bertambah.
- Waktu founder tetap jadi batas utama; jaga 3 prioritas P0.

## 8. Langkah berikutnya
- Developer: spesifikasi terjemahan lewat server + simpanan hasil (butuh deploy manual).
- Developer: banner "Pasang ke Layar Utama" untuk pengguna iPhone.
- Founder: putuskan memakai Google atau DeepL, daftar kunci, simpan di server.
