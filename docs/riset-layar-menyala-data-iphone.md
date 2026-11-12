# Riset: layar tetap menyala saat baca & data/suara di iPhone

Tanggal: 2026-11-12 · Tugas #337 · (validasi bukti internet) · Tanpa uji di iPhone nyata

## Intinya
- Layar menyala bisa dibuat di iPhone, tapi PWA Layar Utama baru didukung mulai iOS 18.4.
- Data iPhone: risiko hilang nyata di tab Safari. Cadangan file tetap perlu.
- Suara iPhone belum bisa disebut andal. Mikrofon di PWA tak punya bukti jalan.

## 1. Ringkasan vonis
| # | Hipotesis | Vonis |
|---|---|---|
| H1 | Wake Lock jalan di Safari & PWA Layar Utama | **Terbukti, syarat iOS 18.4+ untuk Layar Utama** |
| H2 | Layar mati sendiri bikin kesal & berhenti | **Belum jelas** (kesal ya, berhenti tak ada data) |
| H3 | Opsi harus bisa dimatikan | **Terbukti** |
| H4 | Data IndexedDB iPhone bisa hilang, perlu persist()/ekspor | **Terbukti** (ekspor); persist() belum jelas |
| H5 | Suara Web Speech iPhone PWA andal | **Gugur** |

- Bukti: 42 dari 4 jenis sumber. Reddit & Threads tak terbuka (hanya satu cermin Reddit).
- Catatan: sebagian bukti dibaca dari ringkasan pencarian, bukan halaman penuh. Ditandai (r).

## 2. H1: Wake Lock di iOS
- Tab Safari: didukung iOS 16.4+ (B7). Global 96%.
- Layar Utama: gagal di 16.4–18.3 (B1, B2, B5). Penyebab: Layar Utama bukan "aplikasi" biasa.
- Apple umumkan jalan di iOS/iPadOS 18.4, 31 Mar 2025 (B3, B4).
- Sempat dilaporkan rusak di iOS 26.1, lalu ditarik: salah deteksi pustaka (B6).
- Kunci lepas otomatis saat tab/aplikasi tak terlihat. Harus diminta ulang (B8, B9).
- Laporan terpisah: minta ulang setelah kembali bisa "NotAllowedError" (B10, status tak jelas).
- Browser boleh menolak: hemat daya, baterai rendah (B8, B9).
- Cara lama (video tersembunyi, NoSleep.js): tak andal, ada artefak (B1).
- **Vonis: terbukti.** Pengguna iOS di bawah 18.4 di Layar Utama tak dapat fitur ini.

## 3. H2: layar mati saat baca
- Keluhan nyata di aplikasi baca: J-Novel Club iOS 18.0.1 (B13) & Android (B14).
- Aplikasi lain: Hoopla iPad (B20), Zotero iPad (B21), Samsung (B19), Accordance (B22).
- Aplikasi besar menyediakan opsinya: Acrobat (B15), PDF Reader Pro (B16).
- MDN sendiri menyebut "membaca ebook" sebagai kasus pakai utama (B8).
- Tak ada bukti pengguna berhenti memakai aplikasi karena ini.
- **Vonis: belum jelas.** Kesal terbukti; berhenti tak terbukti. Tetap layak sebagai P0 kenyamanan.

## 4. H3: opsi harus bisa dimatikan
- Chrome: kunci layar "boros daya"; pakai seringan mungkin (B9).
- MDN: browser harus beri pengguna cara melepas kunci (B8).
- Panduan iPhone: Auto-Lock "Never" menguras baterai (B23, B25).
- Mode Hemat Daya mengunci Auto-Lock ke 30 detik (B24).
- Acrobat: opsi per dokumen, bisa dimatikan (B15). Forum Nook: layar menyala semalaman jadi keluhan (B17).
- **Vonis: terbukti.** Beri sakelar di Pengaturan. Aktif hanya di e-reader.

## 5. H4: data iPhone bisa hilang
- WebKit: ITP hapus IndexedDB setelah 7 hari tanpa interaksi (B26).
- Layar Utama dikecualikan dari aturan itu (B26).
- Kuota Layar Utama sama dengan browser. Bisa dibuang saat memori sistem penuh (B27).
- WebKit 2023: persist() diberikan berdasarkan heuristik, salah satunya Layar Utama (B27).
- Pengembang tak menemukan dokumen Apple yang menjamin persist() (B28).
- Laporan hilang di Layar Utama: 2021 (B29), 2022 (B30), cermin Reddit (B31, r).
- Data Safari dan Layar Utama terpisah (B32, B33).
- Saran pengembang: ekspor JSON berkala sebagai jaring pengaman (B32, r).
- **Vonis: terbukti.** Tab Safari berisiko tinggi. Layar Utama lebih aman, bukan jaminan.
- persist(): **belum jelas.** Aman dipanggil, jangan diandalkan.

## 6. H5: suara iPhone PWA
- Pengenalan suara tak jalan di PWA, iOS 14.5, 2021 (B36). Status terbaru tak ada sumber.
- Bug pengenalan suara ganda/macet di iOS 15–16 (B35).
- Daftar suara hilang sejak iOS 18 (B34); Jepang (Kyoko) hilang sejak iOS 16.0.2 (B37).
- Suara unduhan baru tak muncul di daftar (B38, Mar 2025).
- Daftar suara kosong di PWA saat pertama (B39, r); perlu tunggu `voiceschanged` (B40, r).
- Suara perlu ketukan pengguna dulu (B36, r); beda dengan WKWebView (B41).
- Hanya satu suara per bahasa di iOS (B42, r).
- **Vonis: gugur** untuk "andal". Baca-suara kemungkinan jalan; mikrofon tak terbukti.

## 7. Kondisi Kepo sekarang
- Tak ada `wakeLock` dan tak ada `persist()` di kode.
- Suara dibaca dengan `speechSynthesis`; skor ucapan memakai `SpeechRecognition`.
- Ada ekspor file di ui.js, tapi belum jadi "cadangan semua data".

## 8. Rekomendasi: 3 langkah kecil untuk developer (P0)
1. **Layar tetap menyala di e-reader.**
   - Sakelar di Pengaturan, bawaan nyala. Aktif hanya saat membaca.
   - Minta ulang saat halaman terlihat lagi. Bungkus try/catch, diam saat gagal.
   - Uji: iPhone iOS 18.4+ Layar Utama, diamkan 2 menit. Layar harus tetap nyala.
   - Uji: iOS lama, Hemat Daya, pindah aplikasi lalu kembali. Tak boleh error.
2. **Lindungi data.**
   - Panggil `navigator.storage.persist()` saat start; simpan hasilnya.
   - Tombol "Cadangkan semua" (buku, kata, progres) + pengingat tiap ±7 hari.
   - Uji: jangan buka 8 hari di tab Safari. Data harus bisa dipulihkan dari file.
3. **Suara jujur & aman.**
   - Tunggu `voiceschanged`; jika suara bahasa tak ada, tampilkan pesan jelas.
   - Jika mikrofon gagal di Layar Utama, sembunyikan skor ucapan dan beri tahu.
   - Uji: iPhone Layar Utama, buka Ngomong. Tidak boleh macet tanpa pesan.

## 9. Yang masih belum diketahui
- Perilaku nyata di iOS 26 (belum ada sumber kuat).
- Apakah persist() benar-benar diberikan di iPhone.
- Apakah pengguna berhenti karena layar mati. Perlu data uji pakai.

## 10. Daftar bukti
Jenis: **A** dokumen resmi/kompatibilitas · **B** bug tracker & forum Apple · **C** forum/ulasan aplikasi baca & panduan · **D** blog teknis.

| No | Jenis | Isi | Tautan |
|---|---|---|---|
| B1 | B | Bug Wake Lock tak jalan di Layar Utama (Mar 2023), workaround tak andal | https://bugs.webkit.org/show_bug.cgi?id=254545 |
| B2 | B | Dumez 25 Apr 2023: penyebab pewaktu idle tak jalan di Layar Utama | https://bugs.webkit.org/show_bug.cgi?id=254545 |
| B3 | B | Simmons 31 Mar 2025: jalan di iOS 18.4 | https://bugs.webkit.org/show_bug.cgi?id=254545 |
| B4 | A | Rilis Safari 18.4: Wake Lock kini jalan di Layar Utama | https://webkit.org/blog/16574/webkit-features-in-safari-18-4/ |
| B5 | B | Laporan masih rusak di iOS 18.0–18.3.1 | https://bugs.webkit.org/show_bug.cgi?id=254545 |
| B6 | B | Dugaan regresi iOS 26.1 (Des 2025), ditarik | https://bugs.webkit.org/show_bug.cgi?id=254545 |
| B7 | A | caniuse: iOS Safari 16.4+ didukung, 96,35% global | https://caniuse.com/wake-lock |
| B8 | A | MDN: lepas otomatis, boleh ditolak, kasus pakai ebook | https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API |
| B9 | A | Chrome: lepas saat tersembunyi, boros daya (2018) | https://developer.chrome.com/articles/wake-lock |
| B10 | B | Bug 255363: ditolak setelah visibilitychange (r) | https://bugs.webkit.org/show_bug.cgi?id=255363 |
| B11 | B | Bug 205104: permintaan fitur Wake Lock (r) | https://bugs.webkit.org/show_bug.cgi?id=205104 |
| B12 | D | Progressier: dukungan Wake Lock PWA (r) | https://progressier.com/pwa-capabilities/screen-wake-lock |
| B13 | C | J-Novel Club: "keep screen on" mati sejak update, iOS 18.0.1 | https://forums.j-novel.club/post/378855 |
| B14 | C | J-Novel Club: keluhan lama di Android | https://forums.j-novel.club/post/393184 |
| B15 | C | Acrobat: opsi "Keep screen on", reset tiap dokumen | https://helpx.adobe.com/acrobat/mobile/accessibility/screen-on.html |
| B16 | C | PDF Reader Pro: sakelar "Keep iPhone/iPad Awake" | https://www.pdfreaderpro.com/ios/help/can-i-keep-iphone-and-ipad-awake-while-reading |
| B17 | C | Forum Nook: layar menyala semalaman (r, hanya judul) | https://forums.androidcentral.com/threads/my-gn-screen-stays-on-all-night-long-when-using-b-n-nook-ebook-reader-app.214242 |
| B18 | C | Panduan jaga layar menyala saat baca Android (r) | https://maketecheasier.com/keep-screen-on-while-reading-android |
| B19 | C | Samsung: layar mati beberapa detik saat baca (r) | https://r2.community.samsung.com/t5/Questions/Screen-goes-off-after-few-seconds-while-reading/m-p/14839342 |
| B20 | C | Apple Discussions: layar gelap saat baca di Hoopla (r) | https://discussions.apple.com/thread/255828938 |
| B21 | C | Zotero iPad: timeout tak berfungsi (r) | https://forums.zotero.org/discussion/comment/483563 |
| B22 | C | Forum Accordance: layar tetap menyala (r) | https://forums.accordancebible.com/topic/27780-quick-question-for-android-accordance-about-screen-staying-on/ |
| B23 | C | iPhone Life: Auto-Lock tetap hemat daya (r) | https://iphonelife.com/content/tip-day-how-change-your-iphones-auto-lock-time |
| B24 | C | Hemat Daya mengunci Auto-Lock 30 detik (r) | https://www.imore.com/how-fix-dimmed-auto-lock-setting-iphone |
| B25 | C | Alphr: Auto-Lock mati = baterai boros (r) | https://www.alphr.com/iphone-keep-screen-from-locking |
| B26 | A | WebKit ITP: 7 hari hapus IndexedDB; Layar Utama dikecualikan | https://webkit.org/tracking-prevention/ |
| B27 | A | WebKit 10 Agu 2023: kuota, eviction, persist() heuristik | https://webkit.org/blog/14403/updates-to-storage-policy/ |
| B28 | B | Forum Apple 2022–23: persist() tak terjamin | https://developer.apple.com/forums/thread/710157 |
| B29 | B | Bug 2021: data Layar Utama terhapus setelah seminggu (r) | https://bugs.webkit.org/show_bug.cgi?id=232302 |
| B30 | B | Bug 2022: cookie Layar Utama hilang 7 hari (r) | https://lists.webkit.org/pipermail/webkit-unassigned/2022-March/1024578.html |
| B31 | C | Cermin Reddit: data hilang seminggu kemudian (r) | https://reddit.sentinel-team.org/posts/1rpp4oh/snapshots/2026-03-10T20%3A04%3A16.679163Z |
| B32 | D | Batasan iOS Safari, saran ekspor berkala (r) | https://swoff.netlify.app/docs/concepts/ios-safari-limitations |
| B33 | C | Stack Overflow: apakah IndexedDB Safari persisten (r) | https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/50795409/is-indexeddb-on-safari-guaranteed-to-be-persistent |
| B34 | B | Suara TTS hilang di Safari sejak iOS 18 (Sep 2024) | https://developer.apple.com/forums/thread/764438 |
| B35 | B | Bug Web Speech iOS 15.1 (2021–22) | https://developer.apple.com/forums/thread/694847 |
| B36 | D | Firtman 2021: pengenalan suara tak jalan di PWA | https://firt.dev/ios-14.5/ |
| B37 | B | Kyoko (ja-JP) hilang sejak iOS 16.0.2 (r) | https://bugs.webkit.org/show_bug.cgi?id=250665 |
| B38 | B | getVoices tak tampilkan suara baru unduhan, Mar 2025 (r) | https://bugs.webkit.org/show_bug.cgi?id=290497 |
| B39 | B | Daftar suara tak termuat di Layar Utama (r) | https://developer.apple.com/forums/thread/126342 |
| B40 | D | getVoices kosong di panggilan pertama (r) | https://blog.monotonous.org/2021/speechsynthesis-getvoices/ |
| B41 | B | Web Speech tak aktif di WKWebView (r) | https://lists.webkit.org/pipermail/webkit-unassigned/2022-April/1033025.html |
| B42 | D | Readium: suara per bahasa di iOS terbatas (r) | https://readium.org/speech/docs/WebSpeech.html |

## 11. Langkah berikutnya
- Developer: kerjakan 3 langkah di bagian 8.
- Founder atau tester: coba di iPhone nyata (iOS 18.4+ dan lebih lama).
- Riset: setelah rilis, ukur apakah sesi baca jadi lebih panjang.
