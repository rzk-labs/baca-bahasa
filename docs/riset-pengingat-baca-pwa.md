# Riset: pengingat baca & notifikasi PWA di iPhone

Tugas #565. Validasi bukti internet. Pelengkap `docs/riset-kebiasaan-balik-baca.md` dan `docs/riset-xp-streak-lencana.md` (tidak mengulang isinya).

## Intinya
- Notifikasi di iPhone bisa, tapi hanya setelah Keepo dipasang di layar utama.
- Pengingat menaikkan baca hari itu, tapi tidak membangun kebiasaan sendiri.
- Mulai dari sapaan lembut saat app dibuka. Tanpa notifikasi dulu.

## 1. Vonis 5 hipotesis
| # | Hipotesis | Vonis |
|---|---|---|
| H1 | Pengingat membuat orang lebih sering belajar di hari pengingat | Terbukti sebagian |
| H2 | Pengingat saja cukup membentuk kebiasaan mandiri | Gugur |
| H3 | Notifikasi aplikasi belajar bahasa sering terasa mengganggu | Terbukti |
| H4 | Notifikasi bisa jalan di iPhone Safari biasa | Gugur (hanya app terpasang, iOS 16.4+) |
| H5 | Pemakai Keepo mau pasang ke layar utama & beri izin | Belum jelas |

## 2. Alasan vonis H1-H3
- H1: studi 85 siswa & uji kecil: hari berpengingat lebih rajin (C1-C4, C13, D1-D2).
- H2: pengingat bantu mengulang, tapi hambat kebiasaan otomatis; isyarat peristiwa lebih kuat (C5-C12).
- H3: keluhan Duolingo & LingQ; target baca Apple Books pun dimatikan orang (B1-B15).

## 3. Alasan vonis H4-H5
- H4: izin hanya lewat ketukan, hanya di app layar utama (A1-A12).
- H4: kiriman iOS sering putus dalam 1-2 minggu menurut pengembang (A13-A16).
- H5: opt-in push web cuma ±10%; tak ada data Indonesia (C14-C17).

## 4. Yang belum terjawab
- Tidak ada data pembaca Indonesia. Reddit & ulasan toko tak terbuka.
- Tidak ada bukti pengingat di Kindle; Readlang hanya surel harian.
- Studi pengingat memakai sampel kecil & anak sekolah. Anggap arah, bukan angka pasti.

## 5. Usulan tugas developer kecil
1. **Sapaan lembut saat buka app.** "Lanjut halaman X?" Tanpa kata "streak putus"; bisa dimatikan.
2. **Ajakan 'Tambah ke Layar Utama'.** Satu kartu panduan iPhone; ikon jadi isyarat harian. Tanpa push.

## Langkah berikutnya
- Developer: kerjakan 2 tugas di atas.
- Founder: tanya P17 (pengingat bantu atau kesal) saat wawancara.
- Push nanti, hanya bila banyak pemakai sudah memasang di layar utama.

---

## Lampiran: 52 bukti
Kode ⚠️ = dibaca lewat ringkasan hasil pencarian, bukan halaman penuh. Kutipan Inggris sengaja dibiarkan asli.

### A. Dokumen teknis & forum pengembang (16)
| # | Bukti | Tautan |
|---|---|---|
| A1 | iOS 16.4 menambah Web Push untuk web app layar utama | [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) |
| A2 | Izin boleh diminta "in response to direct user interaction" | [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) |
| A3 | Terhubung ke mode Fokus: pengguna atur kapan notifikasi masuk | [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) |
| A4 | Memakai layanan Apple Push yang sama dengan app biasa | [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) |
| A5 | Angka di ikon bisa tampil "even before permission" diberikan | [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) |
| A6 | Butuh service worker aktif untuk terima push | [MDN Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) |
| A7 | Push untuk pengguna yang memilih ikut (opt in) | [MDN Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) |
| A8 | Tersedia lintas peramban sejak Maret 2023 | [MDN Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) |
| A9 | Angka ikon = penanda "without displaying a more distracting notification" | [MDN Badging](https://developer.mozilla.org/en-US/docs/Web/API/Badging_API) |
| A10 | Angka ikon hanya untuk web app terpasang | [MDN Badging](https://developer.mozilla.org/en-US/docs/Web/API/Badging_API) |
| A11 | Izin tak boleh muncul saat halaman dimuat | [Pushpad](https://pushpad.xyz/blog/ios-special-requirements-for-web-push-notifications) |
| A12 | Di tab peramban iOS notifikasi tak didukung; app harus dipasang dulu | [Pushpad](https://pushpad.xyz/blog/ios-special-requirements-for-web-push-notifications) |
| A13 | Pengembang: push Android lancar, iOS tidak sampai | [Apple Forum](https://developer.apple.com/forums/thread/728796) |
| A14 | Datang 3-4 notifikasi lalu berhenti, hanya di PWA iOS | [Apple Forum](https://developer.apple.com/forums/thread/728796) |
| A15 | Langganan kedaluwarsa dalam 1-2 minggu tanpa tanda | [Apple Forum](https://developer.apple.com/forums/thread/728796) |
| A16 | iOS: tak ada ajakan pasang otomatis; "Most iPhone users don't know they can install PWAs" | [MagicBell](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide) |

### B. Forum, media & ulasan pengguna (16)
| # | Bukti | Tautan |
|---|---|---|
| B1 | Pengingat Duolingo: dorongan agar merasa bersalah | [WebDesignerDepot](https://webdesignerdepot.com/the-art-of-duolingo-notifications-the-subtle-manipulation-of-language-learners/) |
| B2 | "For many users, the streak becomes the goal" | [WebDesignerDepot](https://webdesignerdepot.com/the-art-of-duolingo-notifications-the-subtle-manipulation-of-language-learners/) |
| B3 | "Duolingo has perfected the art of nagging" | [WebDesignerDepot](https://webdesignerdepot.com/the-art-of-duolingo-notifications-the-subtle-manipulation-of-language-learners/) |
| B4 | Pengguna Threads: seperti hubungan toksik dengan Duolingo | [The Sun](https://thesun.my/going-viral/netizens-say-duolingo-notifications-feel-like-toxic-ex-texts) |
| B5 | Notifikasi: "Goodbye, I guess. You're over it, I can tell." | [The Sun](https://thesun.my/going-viral/netizens-say-duolingo-notifications-feel-like-toxic-ex-texts) |
| B6 | "You came back just to ghost me again?" | [The Sun](https://thesun.my/going-viral/netizens-say-duolingo-notifications-feel-like-toxic-ex-texts) |
| B7 | Pengguna LingQ minta popup streak hilang bisa dimatikan | [Forum LingQ](https://forum.lingq.com/t/disable-streak-loss-notification/74156) |
| B8 | Pengaturan yang ada tak mematikan popup streak hilang | [Forum LingQ](https://forum.lingq.com/t/disable-streak-loss-notification/74156) |
| B9 | "Not only do I get the popup in the app but I get an email" | [Forum LingQ](https://forum.lingq.com/t/disable-streak-loss-notification/74156) |
| B10 | "I do not need the system to tell me that" | [Forum LingQ](https://forum.lingq.com/t/disable-streak-loss-notification/74156) |
| B11 | "Way too many gamification popups!" | [Forum LingQ](https://forum.lingq.com/t/can-i-get-rid-of-the-gamification-elements/75498) |
| B12 | Mematikan notifikasi tak menolong soal popup | [Forum LingQ](https://forum.lingq.com/t/can-i-get-rid-of-the-gamification-elements/75498) |
| B13 | "I don't mind elements I can ignore, but pop-ups ... unnerving" | [Forum LingQ](https://forum.lingq.com/t/can-i-get-rid-of-the-gamification-elements/75498) |
| B14 | Pengingat terus soal hal tak diminati "very annoying" | [Forum LingQ](https://forum.lingq.com/t/can-i-get-rid-of-the-gamification-elements/75498) |
| B15 | Target baca Apple Books: "one notification in my life I don't need" | [Macworld](https://www.macworld.com/article/2368757/how-to-disable-reading-goals-in-the-books-app.html) |
| B16 | Readlang menawarkan surel pengingat harian, tanpa push ⚠️ | [Readlang](https://readlang.com/features) |

### C. Studi & angka (18)
| # | Bukti | Tautan |
|---|---|---|
| C1 | 85 siswa 10-12 tahun, 36 hari, pengingat di 16 hari | [npj Sci Learn 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11192903/) |
| C2 | Siswa lebih mungkin belajar di hari berpengingat | [npj Sci Learn 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11192903/) |
| C3 | Di hari tanpa pengingat, belajar lebih jarang daripada kelompok kontrol | [npj Sci Learn 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11192903/) |
| C4 | Simpulan: "students become overly reliant on them" | [npj Sci Learn 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11192903/) |
| C5 | Studi 4 minggu: pengingat bantu mengulang, hambat kebiasaan otomatis ⚠️ | [Stawarz CHI 2015](https://discovery.ucl.ac.uk/id/eprint/1468224/) |
| C6 | Isyarat berbasis peristiwa menaikkan otomatisasi ⚠️ | [Stawarz CHI 2015](https://discovery.ucl.ac.uk/id/eprint/1468224/) |
| C7 | Penguatan positif tak efektif di studi itu ⚠️ | [Stawarz CHI 2015](https://discovery.ucl.ac.uk/id/eprint/1468224/) |
| C8 | 115 app kebiasaan: kebanyakan hanya catat & pengingat ⚠️ | [Stawarz CHI 2015](https://discovery.ucl.ac.uk/id/eprint/1468224/) |
| C9 | Rata-rata 66 hari sampai kebiasaan otomatis | [BPS](https://bps.org.uk/research-digest/how-form-habit) |
| C10 | Satu hari bolong sedikit pengaruhnya | [BPS](https://bps.org.uk/research-digest/how-form-habit) |
| C11 | Saran: ulangi tiap hari, jangan panik bila bolong 1-2 hari | [BPS](https://bps.org.uk/research-digest/how-form-habit) |
| C12 | Kebiasaan dipicu isyarat lingkungan, bukan kemauan sadar | [BPS](https://bps.org.uk/research-digest/how-form-habit) |
| C13 | Uji 18 orang: pengingat tepat waktu naikkan awal kebiasaan; yang memudar menguatkan ⚠️ | [AMCIS 2025](https://aisel.aisnet.org/amcis2025/health_it/sig_health/5) |
| C14 | Lebih dari 60% pengguna mematikan push di sebagian kategori | [Andrew Chen](https://andrewchen.com/why-people-are-turning-off-push/amp) |
| C15 | Di kategori lain hanya 20% mematikan | [Andrew Chen](https://andrewchen.com/why-people-are-turning-off-push/amp) |
| C16 | Opt-in ojek 79% vs sosial 39%: beda jauh per jenis app | [Andrew Chen](https://andrewchen.com/why-people-are-turning-off-push/amp) |
| C17 | Opt-in push web ±10%; iOS app ±44% (data vendor) ⚠️ | [OneSignal](https://onesignal.com/blog/increase-opt-in-rates-for-push-notifications/) |
| C18 | Dapat push di 90 hari awal: retensi ±3x (data vendor) ⚠️ | [Airship](https://www.airship.com/newsroom/urban-airships-mobile-app-retention-study-for-key-industry-verticals/) |

### D. Dari Duolingo sendiri (2)
| # | Bukti | Tautan |
|---|---|---|
| D1 | Pesan baru awalnya lebih ampuh; efek baru memudar | [Blog Duolingo](https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/) |
| D2 | Dalam beberapa minggu lebih banyak murid menyelesaikan pelajaran | [Blog Duolingo](https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/) |

Total: 52 butir dari 4 jenis sumber. Kode di bagian 2-3 merujuk lampiran ini.
