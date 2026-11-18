# Riset: patokan H2/H7 app baca & bahasa, apa yang bikin balik

Tugas #1323 (tahap 23). Bukti internet, bukan data pengguna Keepo. Pelengkap `docs/riset-kebiasaan-balik-baca.md` (kini sebagian terverifikasi, lihat bagian 6), `docs/riset-pengingat-baca-pwa.md`, `docs/marketing-pesan-balik-hari-2-4.md`. Isinya tidak diulang.

## Intinya
- Patokan umum: balik hari berikutnya ±25%, hari ke-7 ±8-18%. App kecil jarang mencapainya.
- Target H2 25% / H7 10% terlalu tinggi tanpa notifikasi. Usul: H2 15%, H7 5%.
- Pemicu terkuat tanpa notifikasi: lanjut dari halaman terakhir, ulang 3 kata, tonggak kata.

## 1. Apakah target 25% / 10% realistis? (H-A)
Vonis: **gugur untuk sekarang**. Data Keepo: H2 ±7% (3 dari 42).
- Angka patokan campur aduk antar sumber. Pendidikan: hari-1 14-27%, hari-7 ±18%, hari-30 2-8% (T1-T7).
- Rata-rata app biasa lebih rendah dari rata-rata kategori: hari-30 hanya 2-4% (T8).
- Patokan itu untuk app toko dengan notifikasi. Keepo: PWA, tanpa notifikasi, sampel 42 (T15-T16, T39).
- Duolingo pun awalnya: 7 dari 8 pencoba tak kembali (T9).
- Tidak ada patokan khusus app baca. Dua pencarian tak menemukan angka kategori Buku yang bisa dipercaya.

**Target lebih jujur (dua tingkat):**

| Tahap | H2 | H7 | Syarat |
|---|---|---|---|
| Sekarang (minggu 1-2) | ≥12% | ≥4% | ≥30 pengguna baru/minggu |
| Setelah 3 eksperimen | ≥18% | ≥7% | 2 minggu berturut |
| Cita-cita (butuh pengingat/pasang ke layar utama) | ≥25% | ≥10% | Setelah ada jalur pengingat |

Catatan: 3 dari 42 sangat goyah. Satu orang = ±2,4 poin. Baca tren, bukan satu angka.

## 2. Tiga pemicu balik terkuat tanpa notifikasi (H-B)
Vonis: **terbukti sebagian** (arah kuat, angka untuk Keepo belum ada).
1. **Lanjut dari halaman terakhir.** Alasan kecil & jelas. Pelacak Duolingo: komitmen kecil mengangkat retensi besar (T27). Backlog ulangan membuat orang kabur (T18-T22), jadi sesi harus pendek.
2. **Ulang 3 kata malam ini, satu tombol.** Sesi kecil dan terbatas; tidak menumpuk. Lihat bagian 3.
3. **Tonggak yang terlihat dekat.** Bar menuju kata ke-50 memanfaatkan efek "hampir sampai" (T28-T29).

Yang tidak dipilih (bukti lemah/berisiko):
- Streak keras: jadi beban, keluhan "streak seperti kewajiban" (T17, T25, T37).
- Notifikasi: butuh pasang ke layar utama; hanya ±44-49% mau izinkan di iOS (T15-T16).
- Pengingat saja: tidak membentuk kebiasaan sendiri (T30-T32).

## 3. Usul Sinta & Ilham didukung bukti? (H-C)
Vonis: **ulang 3 kata = didukung sebagian; lencana 50/100 = belum jelas**.

| Usul | Vonis | Alasan singkat |
|---|---|---|
| "Ulang 3 kata hari ini", satu tombol di Home | Terbukti sebagian | Sesi kecil mengurangi tumpukan (T18-T22); hari yang terlewat tidak merusak kebiasaan (T33) |
| Lencana kata ke-50 / ke-100 | Belum jelas | Progres terlihat disukai (T28-T29); tapi tidak ada uji lencana pada app baca |
| Streak sebagai pemicu utama | Gugur untuk Keepo | Risiko beban; Keepo tak punya pengingat |

Syarat agar aman:
- Ulangan hanya 3 kata. Tanpa tulisan "tertinggal" atau hukuman.
- Lencana jangan jadi tujuan; tampilkan bar menuju kata berikutnya.
- Uji lewat metrik /hitung, bukan perasaan.

## 4. Urutan 3 eksperimen kecil untuk developer (H-D)
Satu per satu, tiap eksperimen ±1 minggu. Metrik dari /hitung (balik_h2, balik_h7, kartu diklik).

| # | Eksperimen | Metrik utama | Berhasil bila |
|---|---|---|---|
| 1 | Kartu "Lanjut dari halaman X · ±N menit" paling atas Home hari ke-2 | klik "Lanjut baca" / balik_h2 | balik_h2 naik ≥3 poin |
| 2 | Tombol "Ulang 3 kata" di Home (hanya bila ≥3 kata tersimpan) | ulangan_selesai per pengguna | ≥30% pembuka Home menekan |
| 3 | Bar tonggak "12 dari 50 kata" + lencana 50/100 | balik_h7, kata tersimpan | balik_h7 naik ≥2 poin |

Aturan uji:
- Ubah satu hal per minggu agar sebabnya jelas.
- Jangan ganti kampanye pesan hari 2-4 di waktu yang sama.
- Berhenti dan tinjau bila H2 turun.

## 5. Yang belum terjawab
- Tidak ada angka H2 khusus app baca; laporan industri tak memisahkan kategori Buku.
- Reddit & ulasan toko sebagian tertutup; alasan berhenti hari pertama hanya dari cuplikan.
- Studi pengingat memakai sampel kecil dan non-bahasa. Anggap sebagai arah.

## 6. Dampak ke riset lama
- `riset-kebiasaan-balik-baca.md`: klaim "lanjut dari sini > streak" kini didukung T27, T28; tanda ⚠️ pada tabel kompetitor tetap belum diverifikasi.
- Batas notifikasi iPhone: opt-in iOS ±44-49% (T15-T16), cocok dengan riset pengingat.

## Langkah berikutnya
- Developer: kerjakan backlog #144 → #145 → #146, urut.
- PM: ubah target tahap 23 jadi dua tingkat setelah 2 minggu data.
- Founder: tak ada langkah; tunggu hasil /hitung.

## Tabel bukti (40 tautan)
Jenis: A = patokan industri, B = ulasan/forum, C = studi. Kualitas: ★ primer, ☆ sekunder/vendor/blog.

| # | Jenis | Temuan | Mutu | Tautan |
|---|---|---|---|---|
| T1 | A | Pendidikan hari-1 ±14%, hari-30 ±3% (AppsFlyer, lama) | ★ | https://www.appsflyer.com/glossary/retention-rate/ |
| T2 | A | Pendidikan 27,5% / 17,8% / 8,0% (hari 1/7/30) | ☆ | https://getstream.io/blog/app-retention-guide/ |
| T3 | A | Patokan per kategori 2026, hari 1/7/30 | ☆ | https://semnexus.com/day-1-day-7-day-30-retention-benchmarks-app-category-2026 |
| T4 | A | Patokan per kategori & platform 2026 | ☆ | https://spreadcast.app/resources/app-retention-benchmarks |
| T5 | A | Rata-rata semua app 28,3% / 17,9% / 7,9% (OneSignal 2024) | ☆ | https://onesignal.com/blog/mobile-app-retention-guide-measure-benchmark-boost/ |
| T6 | A | Median lintas industri hari-7 ±8-13% (kutip Adjust) | ☆ | https://blog.pocketapp.co.uk/blog/app-retention-benchmarks |
| T7 | A | Ringkasan patokan hari 1/7/30 per kategori | ☆ | https://apsteq.com/blog/app-retention-benchmarks/ |
| T8 | A | Rata-rata per app: hari-30 3,7% iOS, 2,1% Android | ☆ | https://www.appalize.com/blog/mobile-trends/app-retention-rate-benchmarks-by-category-in-2026 |
| T9 | A | Duolingo tahun awal: 7 dari 8 pencoba tak kembali | ☆ | https://www.bloomberg.com/news/articles/2019-01-03/addiction-to-a-language-learning-app-can-be-good-for-you |
| T10 | A | Duolingo: retensi pengguna lama tuas terbesar DAU | ★ | https://lennysnewsletter.com/p/how-duolingo-reignited-user-growth |
| T11 | A | Model pertumbuhan Duolingo (blog resmi) | ★ | https://blog.duolingo.com/growth-model-duolingo/ |
| T12 | A | DAU/MAU Duolingo ±37% (Q2 2025) | ★ | https://fool.com/earnings/call-transcripts/2025/08/06/duolingo-duol-q2-2025-earnings-call-transcript |
| T13 | A | Pendidikan: perpanjangan mingguan 58%, batal terbanyak di hari 1 | ★ | https://www.revenuecat.com/state-of-subscription-apps-2026-education |
| T14 | A | App bahasa yang tak melibatkan di minggu 1 jarang bertahan | ☆ | https://www.singular.net/blog/subscription-apps/ |
| T15 | A | Opt-in notifikasi iOS ±49% (median 2025) | ☆ | https://www.airship.com/mobile-app-push-notification-benchmarks-for-2026/ |
| T16 | A | Opt-in iOS 43,9% vs Android 91,1% | ☆ | https://www.mobiloud.com/blog/push-notification-opt-in-rate |
| T17 | B | Alasan berhenti Duolingo: streak jadi kewajiban, paywall | ☆ | https://my-senpai.com/insights/why-people-quit-duolingo.html |
| T18 | B | Pengguna LingQ: ulangan menumpuk berjam-jam | ☆ | https://forum.readlang.com/t/anyone-here-use-used-lingq-or-any-other-alternatives/123 |
| T19 | B | Berhenti Anki setelah 12 tahun | ☆ | https://japaneselevelup.com/?p=26463 |
| T20 | B | Ulangan Anki menumpuk, jendela ditutup | ☆ | https://japaneselevelup.com/?p=1127 |
| T21 | B | "Kenapa Anki tidak cocok untukku" | ☆ | https://medium.com/@iandanforth/why-anki-doesnt-work-for-me-69ef1944943b |
| T22 | B | r/Anki: sulit kembali setelah libur panjang | ☆ | https://r.darklab.sh/r/Anki/comments/1k9sl1s/how_to_get_back_after_long_break |
| T23 | B | Keluhan Duolingo: pengingat terlalu banyak | ☆ | https://uk.trustpilot.com/review/duolingo.com?page=6 |
| T24 | B | Keluhan notifikasi tetap datang setelah berhenti | ☆ | https://www.sikayetvar.com/en/duolingo-us/duolingo-keeps-emailing-me-after-i-unsubscribed |
| T25 | B | Analisis ulasan app bahasa 2026 (notif menekan, hati) | ☆ | https://unstar.app/blog/language-learning-app-reviews-duolingo-babbel-rosetta-stone-2026 |
| T26 | B | r/duolingo: menghapus app karena hati & gamifikasi | ☆ | https://reddit.sudovanilla.org/r/duolingo/comments/1js510w/deleting_the_app |
| T27 | C | Duolingo: layar tujuan streak, kenaikan retensi besar (cerita internal) | ☆ | https://lazyweb.com/research/duolingo-streak-goals-retention |
| T28 | C | Efek "progres awal" (Nunes & Drèze 2006), ringkasan | ☆ | https://www.renascence.io/behavioral-biases/endowed-progress-effect |
| T29 | C | Bar progres & pencapaian paling disukai pembelajar | ☆ | https://thinkableletters.substack.com/p/duolingo-turned-repetition-into-ritual |
| T30 | C | Pengingat tidak menambah efek niat-rencana (RCT 2022) | ★ | https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.4007 |
| T31 | C | Pengingat + komitmen mungkin membantu kebiasaan (HabitWalk 2025) | ★ | https://iaap-journals.onlinelibrary.wiley.com/doi/10.1111/aphw.12605 |
| T32 | C | Pengingat & niat-rencana di app kesehatan (JMIR 2017) | ★ | https://www.jmir.org/2017/11/e397/PDF |
| T33 | C | Kebiasaan: satu hari terlewat tak merusak (Lally 2010) | ★ | https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit |
| T34 | C | Ringkasan Lally: rata-rata 66 hari, 18-254 | ☆ | https://bps.org.uk/research-digest/how-form-habit |
| T35 | C | Streak koran Newsreel, 277 siswa (ada insentif nilai) | ☆ | https://pressgazette.co.uk/news/streak-mechanism-key-gen-z-gamified-app-newsreel/ |
| T36 | C | Wikimedia: tantangan baca 25 hari, target retensi 2 hari | ☆ | https://www.mediawiki.org/wiki/Wikimedia_Apps/Team/25th_Birthday_Reading_Challenge/Experiment |
| T37 | C | Gamifikasi yang salah pakai di app bahasa (arXiv) | ★ | https://arxiv.org/pdf/2203.16175.pdf |
| T38 | C | Jarak ulang kata Quizlet (uji 96 siswa) | ★ | https://www.lltjournal.org/item-detail/1124/ |
| T39 | C | Push web iOS 16.4: wajib di layar utama | ☆ | https://onesignal.com/blog/how-ios16-mobile-web-push-updates-change-the-game-for-web-first-companies/ |
| T40 | C | Web push iOS Safari: syarat pasang dulu | ☆ | https://notificare.com/blog/2023/03/27/web-push-in-ios-safari/ |

Catatan jujur: angka mutu ☆ tidak boleh jadi satu-satunya dasar keputusan. Tautan diperoleh dari hasil pencarian; isi sebagian hanya terbaca lewat cuplikan, bukan halaman penuh.
