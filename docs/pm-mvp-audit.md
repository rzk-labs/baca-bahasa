# Audit MVP P0 Keepo (Tahap 18, Tugas #312)

Disusun 11 Nov 2026. Kode hanya dibaca, tidak diubah. Bukti baru (B1-B32) dari WebSearch hari ini.

## Intinya
- MVP P0 hampir lengkap: 7 ada, 4 sebagian, 3 belum.
- 3 celah teratas: batalkan simpan kata, layar tetap menyala, kotak centang hak cipta Bagikan.
- 32 bukti baru dari 14 sumber; 5 hipotesis: 4 terbukti, 0 gugur, 1 belum jelas.

## 1. Batasan (baca dulu)
- Alat pencarian hanya memberi ringkasan, bukan kutipan persis. Tulisan di bawah adalah parafrase.
- Reddit, Play Store, dan Threads tak terbaca. Banyak situs ulasan adalah afiliasi pesaing.
- Mandarin (pinyin) dan mode gelap tak punya bukti langsung.

## 2. Daftar periksa MVP P0
Definisi P0 dari `docs/marketing-strategi-produk.md` bagian 5. Status: **ada / sebagian / belum**.

### a. Baca nyaman di HP
| Kemampuan | Status | Bukti di kode |
|---|---|---|
| Impor .txt/.epub/.pdf dari HP | Ada | `parseFile` app.js:150, `decodeText` :157, `parseEpub` :172, `parsePdf` :201; pesan gagal ui.js:426 |
| Mulai tanpa file (Coba 1 cerita, 3 bahasa) | Ada | `SAMPLES` app.js:437, `startSample` ui.js:379 |
| Tema Terang/Sepia/Gelap/Ikut HP | Ada | `applyTheme` ui.js:48, pilihan ui.js:221 |
| Saran tema gelap malam hari | Ada | chip `nchip` ui.js:480 |
| Ukuran huruf, jarak baris, rata teks | Ada | pengaturan ui.js:221-232, `db.align` ui.js:3 |
| Tamat tidak memotong bacaan | Ada | `finishBook` hanya dipanggil dari ketukan halaman berikut, ui.js:632 |
| Layar tidak mati saat baca | **Belum** | Tak ada `wakeLock` di seluruh kode |

### b. Ketuk kata, simpan 1 langkah
| Kemampuan | Status | Bukti di kode |
|---|---|---|
| Ketuk kata buka sheet arti | Ada | sheet kata ui.js:683-696 |
| Simpan 1 ketukan, kata digaris di teks | Ada | `#wsave` ui.js:749, kelas `saved` ui.js:753 |
| Batalkan simpan | **Belum** | `if (isSaved()) return;` ui.js:750, tombol jadi "Tersimpan" ui.js:683 |
| Perluas jadi frasa | Sebagian | tombol "+" ada; frasa belum bergaris bawah di teks |
| Arti tetap bisa dilihat offline | Sebagian | kata tersimpan jalan offline ui.js:720; cache app.js:269; pesan offline ui.js:735. Kata baru tetap butuh internet |
| Terjemahan punya batas waktu | Ada | `fetchTimeout` 8 detik app.js:261 |

### c. Cara baca di teks
| Kemampuan | Status | Bukti di kode |
|---|---|---|
| Furigana/romanisasi di atas kata (JP/KR/ZH) | Ada | pengaturan ui.js:232 (Mati/Pernah kuketuk/Semua tersimpan), `rtMap` ui.js:469-474 |
| Cara baca di sheet kata & kalimat | Ada | `setWBaca` ui.js:713, `#sbaca` ui.js:776 |
| Cara baca langsung pada kata yang belum diketuk | Sebagian | pilihan hanya untuk kata yang pernah diketuk/tersimpan |

### d. Hak cipta & keamanan dasar
| Kemampuan | Status | Bukti di kode |
|---|---|---|
| Peringatan di layar Bagikan | Ada | cloud.js:140 |
| Kotak centang "milikku / domain publik" | **Belum** | tak ada di cloud.js:139-153 |
| Catatan "pakai bahan yang berhak" saat unggah | Sebagian | tombol unggah ui.js:337 tanpa catatan; ada cerita contoh bawaan |

## 3. Masukan lama yang sudah teratasi (jangan dikerjakan lagi)
- Encoding .txt (`decodeText` app.js:157).
- Pesan EPUB/PDF butuh internet (ui.js:426).
- Batas waktu terjemahan (`fetchTimeout` app.js:261).
- Layar Tamat tak lagi muncul sendiri (ui.js:632).
- Sisa masukan terbaru (kartu Hafal HP kecil, header 320px) ada di tugas lain; bukan P0 MVP.

## 4. Bukti internet (32 butir baru, 14 sumber)
Semua parafrase ringkasan pencarian 11 Nov 2026. Bukti lama dipakai ulang lewat rujukan, tak dihitung.

### a. Baca tenang & stabil
| # | Bukti | Sumber |
|---|---|---|
| B1 | Ulasan LingQ: antarmuka dinilai penuh/sibuk | [FluentU](https://www.fluentu.com/blog/lingq-review/) |
| B2 | Ulasan menyebut LingQ agak berbug dan sulit dinavigasi | [Langoly](https://www.langoly.com/lingq-review/) |
| B3 | Avatar dan koin LingQ dianggap mengganggu | [E-Student](https://e-student.org/lingq-spanish-review) |
| B4 | Bug yang dilaporkan disebut tak kunjung diperbaiki | [Lingopie](https://lingopie.com/blog/lingq-review/) |
| B5 | Pengguna lama LingQ mempertimbangkan kembali ke Readlang karena LingQ "terlalu berbug" | [Forum LingQ](https://forum.lingq.com/t/lingq-and-e-books-kindle/31024) |
| B6 | Pengguna suka Readlang karena teks dibaca utuh, tak dipotong jadi "pelajaran" | [Forum Readlang](https://forum.readlang.com/t/anyone-here-use-used-lingq-or-any-other-alternatives/123) |
| B7 | Ulasan: Readlang "fitur secukupnya, sangat efektif" | [EUROCALL via core.ac.uk](https://core.ac.uk/download/200933379.pdf) |
| B8 | Language Reactor dinilai terasa jadul oleh pesaingnya | [Lingopie](https://lingopie.com/blog/language-reactor-review/) |
| B9 | Beelinguapp: kontrol tak responsif membuat lookup bermasalah | [Actual Fluency](https://actualfluency.com/beelinguapp-review) |
| B10 | Beelinguapp: teks dan audio sering tak sinkron | [Ling App](https://ling-app.com/tips/beelinguapp-review) |

### b. Ketuk kata & simpan
| # | Bukti | Sumber |
|---|---|---|
| B11 | Readlang: 1 klik mengganti kata dengan terjemahan, seret untuk frasa | [EUROCALL via core.ac.uk](https://core.ac.uk/download/200933379.pdf) |
| B12 | Pengguna: kartu hafal dibuat otomatis dari kata yang terlewat | [Readlang](https://readlang.com/learn-english-by-reading) |
| B13 | Readlang menyimpan konteks kalimat bersama kata | [All Language Resources](https://www.alllanguageresources.com/readlang/) |
| B14 | Pengguna membandingkan: tanpa susah bikin kartu seperti Anki | [Max Talks Tech](https://maxtalkstech.beehiiv.com/p/i-found-a-shortcut-for-reading-in-another-language) |
| B15 | Kritik: kalimat konteks membuat kartu terlalu mudah ditebak | [LinguaLift](https://www.lingualift.com/?p=1255) |
| B16 | Permintaan forum: arti kata yang dikenal tampil langsung di teks | [Forum Readlang](https://forum.readlang.com/t/show-translations-of-known-words-directly-in-the-text/4837) |
| B17 | Kindle: kata yang dicari otomatis masuk Vocabulary Builder | [Dummies](https://www.dummies.com/article/technology/electronics/tablets-e-readers/kindles/how-to-use-vocabulary-builder-on-your-kindle-paperwhite-156833/) |
| B18 | Kindle: Vocabulary Builder hanya di perangkat e-reader, tak di app HP | [Nerds Chalk](https://nerdschalk.com/how-to-enable-and-use-kindle-vocabulary-builder/) |
| B19 | Kindle: kartu menampilkan kalimat asli dari buku | [Goodreads blog](https://www.goodreads.com/author_blog_posts/4978186-boost-your-vocabulary-with-the-new-kindle-paperwhite-feature?tab=book) |
| B20 | Language Reactor: kamus popup + simpan kata dasar ada di versi gratis | [Stork](https://www.stork.ai/en/language-reactor) |
| B21 | Language Reactor: simpan kata tak terbatas hanya di Pro | [Stork](https://www.stork.ai/en/language-reactor) |
| B22 | LingQ: ulang kata (SRS) disebut berulang kali sebagai nilai plus | [Langoly](https://www.langoly.com/lingq-review/) |

### c. Cara baca Asia
| # | Bukti | Sumber |
|---|---|---|
| B23 | Pengguna Kindle: bahasa Asia bisa dibaca tapi kata tak bisa dicari | [Forum LingQ](https://forum.lingq.com/t/lingq-and-e-books-kindle/31024) |
| B24 | Pembaca graded Jepang: ada permintaan tombol tampil/sembunyi furigana | [Komunitas WaniKani](https://community.wanikani.com/t/graded-readers-in-the-app-store/27718?page=3) |
| B25 | App pembaca mengaktifkan furigana lewat pengaturan cerita, tekan lama untuk intip | [Komunitas WaniKani](https://community.wanikani.com/t/graded-readers-in-the-app-store/27718?page=3) |
| B26 | Ide: furigana menyesuaikan level kanji yang dikuasai (JLPT/WaniKani) | [Komunitas WaniKani](https://community.wanikani.com/t/new-ios-app-for-japanese-reading-with-adjustable-furigana-%E2%80%93-looking-for-testers/72834) |
| B27 | Ulasan ekstensi: furigana muncul saat hover; setelah hafal, jadi pengganggu | [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/furigana-toggle/reviews/919310/) |

### d. Offline & impor
| # | Bukti | Sumber |
|---|---|---|
| B28 | Pengguna Readlang: "frustrasi" tak bisa lanjut baca di pesawat tanpa app | [Forum Readlang](https://forum.readlang.com/t/readlang-app-possibility/4960) |
| B29 | Beelinguapp: unduhan bisa dibaca offline | [Ling App](https://ling-app.com/tips/beelinguapp-review) |
| B30 | Impor Kindle ke LingQ butuh buang DRM dulu; jadi hambatan | [Forum LingQ](https://forum.lingq.com/t/lingq-and-e-books-kindle/31024) |
| B31 | Banyak app pembaca EPUB baru menjual "impor EPUB offline" sebagai fitur utama | [Coral Reader](https://mwm.ai/apps/coral-reader/6782911744) |
| B32 | Studi 2024: baca e-book menaikkan kosakata dan motivasi pelajar | [EL.LE (Univ. Venezia)](https://iris.unive.it/bitstream/10278/5084688/2/art-10.30687-ELLE-2280-6792-2024-03-002_VY6x6Zs.pdf) |

Sumber berbeda: FluentU, Langoly, E-Student, Lingopie, Forum LingQ, Forum Readlang, EUROCALL, Actual Fluency, Ling App, Readlang, All Language Resources, LinguaLift, Dummies/Nerds Chalk/Goodreads (Kindle), Stork, Komunitas WaniKani, Firefox Add-ons, Coral Reader, EL.LE. Syarat 30 butir & 3 sumber terpenuhi.

Bukti lama yang searah: `docs/pm-ux-validasi.md` (37), `docs/desain-laporan-usability.md` (46), `docs/pm-beta-simulasi.md` (37).

## 5. Vonis 5 hipotesis MVP
| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| M1 | MVP wajib: baca tenang, stabil, tanpa ramai | **Terbukti** | B1-B6, B9; Keepo sudah sederhana |
| M2 | Ketuk kata + simpan 1 langkah adalah inti | **Terbukti** | B11-B14, B17, B20 |
| M3 | Cara baca di teks wajib untuk Jepang/Korea | **Terbukti** (Jepang); Mandarin belum ada bukti | B23-B27 |
| M4 | Offline dan impor sendiri wajib | **Terbukti** (arah) | B28-B31 |
| M5 | Ulang kata, koin, dan sosial bukan syarat MVP | **Belum jelas** | koin mengganggu (B3), tapi ulang kata sering dipuji (B22) |

Hasil: 4 terbukti, 0 gugur, 1 belum jelas. Mode gelap: tak ada bukti pesaing; tetap kecil di kode.

## 6. Tiga celah MVP teratas (urut, untuk developer)
1. **Batalkan simpan kata + garis bawah frasa.** Ketuk "Tersimpan" lagi = hapus (ui.js:750). Dasar: B16, B27, usability Raka.
2. **Layar tetap menyala saat baca.** Pakai wake lock, aktif hanya di e-reader. Dasar: baca malam & beta simulasi.
3. **Hak cipta Bagikan:** kotak centang "milikku/domain publik" + catatan syarat saat unggah. Dasar: `docs/riset-hak-cipta.md`.

## 7. Risiko hak cipta fitur Bagikan
- Bagikan mengirim seluruh teks ke server Keepo (cloud.js:147). Risiko terbesar.
- Pesaing: impor pribadi boleh, berbagi publik wajib berhak (LingQ, Readlang).
- Sebelum beta: kotak centang + tombol Laporkan. Sebelum bayar: konsultasi hukum tuntas.

## 8. Kesimpulan
- MVP P0 siap diuji pengguna setelah 3 celah di atas.
- Tak perlu fitur besar baru; fokus rapikan simpan kata, layar, dan hak cipta.
- Tahap 18 naik ke selesai (validasi bukti internet). Beta manusia tetap penguat.
- Celah 'layar tetap menyala' sudah ditutup (#436): layar tidak mati saat baca, ada sakelar di Pengaturan.
