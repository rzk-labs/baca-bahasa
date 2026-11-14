# Riset: pesan gagal masuk akun yang kasih langkah lanjut (#1034)

(validasi bukti internet) 40 bukti dari 4 jenis sumber. Tanggal: 14 Nov 2026.

## Intinya
- Pesan gagal harus bilang: apa yang terjadi + langkah berikutnya. Panduan resmi sepakat.
- Pesan "Nama uji tidak dikenal" bukan layar pengguna; itu jalur tester AI. Pengguna biasa punya 12 pesan lain, semuanya teks tanpa tombol.
- Usulan: satu aturan, satu tombol aksi, dan selalu ada "Lanjut tanpa akun". Mockup: `docs/mockup-1034.html`.

## 1. Pesan gagal yang tampil sekarang
Lokasi kode: `cloud.js` (app) dan `api/src/index.js` (server, tidak diubah).

| # | Pesan sekarang | Lokasi | Masalah |
|---|---|---|---|
| 1 | Server akun belum aktif. Coba lagi nanti ya. | cloud.js:15 | Tak ada tombol |
| 2 | Koneksi putus. Coba lagi pas ada internet. | cloud.js:20 | Tak ada tombol, form bisa macet |
| 3 | Server lagi bermasalah. | cloud.js:23 | Tak ada langkah |
| 4 | Lagi offline. Coba lagi pas ada internet ya. | cloud.js:166 | Tak bilang progres aman |
| 5 | Username atau password salah. | api:91 | Buntu: tak ada jalan keluar |
| 6 | Username sudah dipakai. | api:66 | Tak ada saran |
| 7 | Username 3–20 huruf kecil, angka, atau _. | api:62 | Muncul setelah kirim, bukan di kolom |
| 8 | Username ini khusus akun uji. Pilih yang lain. | api:63 | Membingungkan |
| 9 | Password minimal 6 karakter. | api:64 | Tanpa petunjuk lanjut |
| 10 | Sesi habis, masuk lagi ya. | api:100 dst | Di app: keluar diam-diam, tanpa pesan (cloud.js:22) |
| 11 | Server error: (isi teknis mentah) | api:337 | Istilah teknis bocor ke layar |
| 12 | Masuk dulu buat bagiin cerita ya. | cloud.js:604 | Sudah ada tombol lanjut (buka form) |
| 13 | Nama uji tidak dikenal. | api:78 | Hanya jalur tester AI, bukan pengguna |

Cara tampil: semua lewat toast 5 detik (cloud.js:392, :369). Teks saja, tanpa tombol, hilang sendiri.

Temuan tambahan:
- Gagal sinkron setelah masuk ditelan diam-diam (cloud.js:252).
- Belum ada "Lupa password" di server.
- Baca buku sudah jalan tanpa akun. Itu aset.

## 2. Bukti (40 butir, 4 jenis sumber)

### A. Panduan resmi (20)
1. NN/g: "Use human-readable language." — [artikel](https://www.nngroup.com/articles/error-message-guidelines/)
2. NN/g: "Merely stating the problem is also not enough; offer some potential remedies."
3. NN/g: "Take a positive tone and don't blame the user."
4. NN/g: "Preserve the user's input."
5. NN/g: "Concisely and precisely describe the issue."
6. NN/g 2001: kata-kata lucu menggantikan penjelasan itu buruk; beri saran konstruktif — [alertbox](https://www.nngroup.com/alertbox/20010624.html)
7. GOV.UK: "Describe what has happened and tell them how to fix it." — [komponen](https://design-system.service.gov.uk/components/error-message)
8. GOV.UK: hindari pesan umum seperti "An error occurred".
9. GOV.UK: hindari istilah teknis & kode galat ("error 0x0000000643").
10. GOV.UK: hindari "sorry", "oops", "valid/invalid", "you forgot".
11. GOV.UK: jangan hapus isian pengguna saat gagal.
12. GOV.UK: masalah layanan pakai halaman penjelas dengan langkah berikutnya — [pola validasi](https://design-system.service.gov.uk/patterns/validation)
13. Apple HIG: nada langsung dan netral, jangan menuduh — [alerts](https://developer.apple.com/design/human-interface-guidelines/alerts.md)
14. Apple HIG: jelaskan apa yang terjadi, konteks, dan sebabnya.
15. Apple WWDC17 #813: alert yang baik jawab 3 hal: apa, kenapa, lanjut ke mana — [sesi](https://developer.apple.com/videos/play/wwdc2017/813)
16. Apple WWDC17: jangan tampilkan kode galat.
17. Mac HIG lama: pesan juga menawarkan cara memperbaiki — [arsip](https://discmaster.textfiles.com/file/31918/Apple%20Developer%20Reference%20Library%20(December%201999)%20(Disk%202).iso/pc/technical%20publications/mac/higuidelines/higuidelines-296.html?html=true)
18. Material (v2): teks galat bisa berisi cara memperbaiki — [Material](https://m2.material.io/go/design-text-fields)
19. Material (v1): tampilkan galat setelah pengguna menyentuh kolom — [pola galat](https://m1.material.io/patterns/errors.html)
20. Material (v2): pasang ikon sebagai penanda selain warna.

### B. Forum & dukungan produk sejenis (13)
21. Readlang: masuk Google gagal di e-reader; jalan keluar "masuk pakai email" — [forum](https://forum.readlang.com/t/stop-using-google-account/1898)
22. Anki: "email perlu dikonfirmasi ulang" — [forum](https://forums.ankiweb.net/t/the-sync-failed-because-your-email-address-need-to-be-re-confirmed/70742)
23. Anki: "No account found" — [forum](https://forums.ankiweb.net/t/failing-to-login-and-sync/31924)
24. Anki: "error sending request for url ()" — tak dimengerti pengguna — [forum](https://forums.ankiweb.net/t/error-sending-request-for-url-on-mac-m4-pro-macos-sequoia-15-7-4-cannot-sync-or-login/68941)
25. Anki: "AnkiWeb service error" setelah ganti jaringan — [forum](https://forums.ankiweb.net/t/account-sync-error-ankiweb-service-error-after-multiple-network-changes/70820)
26. Anki: timeout walau sudah pasang ulang — [forum](https://forums.ankiweb.net/t/network-timeout/69708)
27. Anki: login hanya jalan bila password diketik, bukan ditempel — [forum](https://forums.ankiweb.net/t/cant-log-in-on-desktop-app/10991)
28. Duolingo: tombol masuk Google berputar tanpa akhir — [Mozilla](https://support.mozilla.org/kn/questions/1376863)
29. Duolingo: "Invalid JWT" (istilah teknis) — [Mozilla](https://support.mozilla.org/en-US/questions/1506964)
30. Duolingo: layar masuk muncul lagi tanpa pesan — [Apple Discussions](https://discussions.apple.com/thread/253142649)
31. Duolingo: "We couldn't log you in" generik; panduan pihak ketiga menebak 4 sebab — [panduan](https://duolingoguides.com/duolingo-we-couldnt-log-you-in-try-signing-in-again-later/)
32. Lingopie: web jalan, app tidak, karena beda cara daftar — [bantuan](https://help.lingopie.com/support/solutions/articles/150000076230-login-to-your-account)
33. LingoDeer: cara masuk berbeda dianggap akun berbeda — [bantuan](https://support.lingodeer.com/en/support/solutions/articles/61000314039-i-can-t-log-in-to-my-lingodeer-account-what-should-i-do-)

### C. Survei & uji bisnis (7)
34. Survei Frontegg (439 pengguna SaaS): 15% tak akan kembali setelah masuk yang buruk — [Frontegg](https://frontegg.com/guides/saas-user-signup-expectations)
35. Sama: 53% hanya beri satu kesempatan lagi.
36. Frontegg via SmallBizTrends: aturan password rumit, 46% lebih mungkin menyerah — [artikel](https://smallbiztrends.com/?p=1509512)
37. Phiture: ±20% pergi di dinding daftar saat pertama buka (perkiraan, bukan studi) — [Phiture](https://phiture.com/mobilegrowthstack/user-accounts-pros-and-cons-for-mobile-growth-42847cb10f4c/)
38. Affective: daftar paksa awal, drop 15–20% (tanpa sumber asli) — [blog](https://weareaffective.com/learning-centre/should-my-app-require-sign-up-before-users-can-explore-features)
39. Duolingo: uji A/B menunda daftar sampai ada capaian, daftar naik — [Taplytics](https://taplytics.com/blog/duolingo-ab-test-onboarding)
40. Corbado: ±19% tinggalkan keranjang karena lupa password (angka vendor) — [Corbado](https://corbado.com/blog/login-friction-kills-conversion)

### Batas bukti
- LingQ: tak ada utas login ketemu. Reddit & ulasan toko tak terbaca.
- Tak ada studi ilmiah soal berhenti setelah galat pertama. Angka dari survei/vendor.
- Butir 29 & 31 bukan sumber resmi Duolingo.

## 3. Vonis hipotesis
| Hipotesis | Vonis | Dasar |
|---|---|---|
| 1. Pesan tanpa langkah lanjut bikin pengguna baru berhenti | **Terbukti sebagian** | Survei (34–35) dan keluhan nyata (28–30). Belum ada uji langsung. |
| 2. Keepo harus tetap bisa dipakai tanpa akun (Reader First) | **Terbukti sebagian** | A/B Duolingo (39), dinding daftar (37–38). Satu kasus kuat. |
| 3. Pesan singkat + satu tombol aksi lebih baik dari teks teknis | **Terbukti sebagian** | Panduan sepakat (1–20), pesan teknis dikeluhkan (24, 29). Uji tombol vs tanpa tombol belum ada. |

## 4. Tabel usulan (Bahasa Indonesia santai, maks 2 baris)
| Kondisi | Pesan usulan | Tombol |
|---|---|---|
| Salah username/password | Username atau password belum cocok. Cek lagi ya, progresmu aman di HP. | **Coba lagi** · Daftar akun baru |
| Username sudah dipakai | Username itu sudah ada yang pakai. Coba tambah angka, mis. rina_baca2. | **Ganti username** · Masuk |
| Format username | Pakai 3–20 huruf kecil, angka, atau _. Contoh: rina_baca. | (di bawah kolom) |
| Password pendek | Password minimal 6 karakter. Tambah sedikit lagi ya. | (di bawah kolom) |
| Koneksi putus / offline | Sinyalmu lagi putus. Bacaanmu tetap bisa dibuka. | **Coba lagi** · Lanjut tanpa akun |
| Server sibuk / error | Server lagi sibuk, bukan salahmu. Coba lagi sebentar ya. | **Coba lagi** · Lanjut tanpa akun |
| Sesi habis | Kamu keluar sendiri karena sesi habis. Progres di HP aman. | **Masuk lagi** |
| Gagal sinkron | Belum bisa sinkron. Progresmu aman di HP. | **Coba lagi** |
| Mau bagikan tanpa akun | Mau bagiin cerita? Masuk dulu ya. | **Masuk** · Nanti aja |
| Lupa password (belum ada fiturnya) | Lupa password? Kabari kami lewat Masukan, kami bantu. | **Kirim masukan** |
| Nama uji tidak dikenal (tester AI) | Nama uji tidak dikenal. Pilih: tari, bima, nadia, raka, atau dina. | — |

## 5. Satu aturan umum
**Apa yang terjadi, progres aman, lalu satu tombol langkah berikutnya. Tanpa kode, tanpa istilah teknis, selalu ada jalan keluar tanpa akun.**

## 6. Spesifikasi kecil untuk developer (#104)
1. Tampilkan galat **di dalam form** (kotak `role="alert"` di atas tombol Masuk), bukan toast. Isian username tetap terisi.
2. Buat satu fungsi `pesanGagal(err, konteks)` di cloud.js yang memetakan galat ke teks usulan. Jenis: offline, server, salah-login, dipakai, format, sesi, sinkron.
3. Tombol: **Coba lagi** (kirim ulang), **Daftar akun baru** (pindah mode), **Lanjut tanpa akun** (tutup sheet; baca tetap jalan).
4. Pesan `Server error: ...` mentah jangan tampil; ganti teks "Server lagi sibuk".
5. Sesi habis (cloud.js:22): beri toast + tombol **Masuk lagi**, bukan keluar diam-diam.
6. Gagal sinkron setelah masuk (cloud.js:252): beri satu toast "Belum bisa sinkron" bila gagal.
7. Format username & password pendek: cek di sisi app sebelum kirim, tampil di bawah kolom.
8. Server (`api/`): jangan ubah dulu. Pesan server hanya dipetakan di app. Usul teks nama uji dicatat untuk deploy manual.
9. Naikkan versi `C` di sw.js. Uji di 320px dan 4 tema.
10. Cek: matikan jaringan, salah password, username kembar, sesi kedaluwarsa. Tiap kasus punya tombol.

## 7. Langkah berikutnya
- Developer kerjakan backlog 104.
- Putuskan fitur "Lupa password" (butuh server, deploy manual founder).
- Uji ulang dengan Ilham & Sinta (pengguna AI) setelah dibangun.
- Backlog 50 (#621, petunjuk baca) tidak terkait; tidak diubah.
