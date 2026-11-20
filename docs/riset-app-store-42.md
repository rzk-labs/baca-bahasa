# Riset #1337: lolos review App Store 4.2 untuk app web (Tahap 25)

Bukti internet saja (bukan data Keepo). Tahap 25 tetap **berjalan**: selesai hanya bila Keepo live di App Store.
Dikumpulkan 20 Nov 2026. Build 12 menunggu review sejak 16 Nov (hari ke-4).

## Intinya
- Apple menolak app yang "cuma situs dibungkus". Fitur kecil (pengingat, bagikan) tidak menjamin lolos.
- Yang meloloskan: tampilan lokal di dalam app, isi nyata tanpa tautan keluar, catatan reviewer jelas.
- Penolakan kedua sering soal akun: hapus akun di dalam app dan akun demo yang aman.

## 1. Tabel bukti (43 kutipan, 5 jenis sumber)
Jenis: **A** = Apple resmi, **F** = Forum Apple Developer, **I** = Forum Ionic, **D** = Forum Discourse, **V** = blog/panduan vendor.
Reddit, Hacker News, dan Stack Overflow tidak muncul sebagai hasil yang bisa dibaca; tidak dihitung.

| # | Jenis | Kutipan (terjemahan ringkas dalam kurung bila perlu) | H | Tautan |
|---|---|---|---|---|
| 1 | A | "Your app should include features, content, and UI that elevate it beyond a repackaged website." | 1 | [Pedoman 4.2](https://developer.apple.com/app-store/review/guidelines/) |
| 2 | A | "If your app is not particularly useful, unique, or 'app-like,' it doesn't belong on the App Store." | 1 | [Pedoman 4.2](https://developer.apple.com/app-store/review/guidelines/) |
| 3 | A | "apps shouldn't primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links." (4.2.2) | 1 | [Pedoman 4.2.2](https://developer.apple.com/app-store/review/guidelines/) |
| 4 | A | "include demo account info (and turn on your back-end service!) if your app includes a login." (2.1) | 3 | [Pedoman 2.1](https://developer.apple.com/app-store/review/guidelines/) |
| 5 | A | "you may include a built-in demo mode in lieu of a demo account with prior approval by Apple." | 3 | [Pedoman 2.1](https://developer.apple.com/app-store/review/guidelines/) |
| 6 | A | "If your app supports account creation, you must also offer account deletion within the app." (5.1.1(v)) | 5 | [Pedoman 5.1.1](https://developer.apple.com/app-store/review/guidelines/) |
| 7 | A | "If your app doesn't include significant account-based features, let people use it without a login." | 5 | [Pedoman 5.1.1](https://developer.apple.com/app-store/review/guidelines/) |
| 8 | A | "only offering to temporarily deactivate or disable an account is insufficient." | 5 | [Hapus akun](https://developer.apple.com/support/offering-account-deletion-in-your-app) |
| 9 | A | "If people need to visit a website to finish deleting their account, include a link directly to the page on your website where they can complete the process." | 5 | [Hapus akun](https://developer.apple.com/support/offering-account-deletion-in-your-app) |
| 10 | A | "apps that make it unnecessarily difficult for someone to delete their account will not pass review." | 5 | [Hapus akun](https://developer.apple.com/support/offering-account-deletion-in-your-app) |
| 11 | A | App Review "typically reviews at least 50% of submissions in less than 24 hours and 90% in less than 48 hours." | 4 | [App Review](https://developer.apple.com/distribute/app-review/) |
| 12 | A | Halaman Apple: "Over 40% of unresolved issues relate to guideline 2.1 (App Completeness)"; wajib "a valid demo account" bila ada login. | 3 | [App Review](https://developer.apple.com/distribute/app-review/) |
| 13 | F | Penolakan: "...features such as push notifications, Core Location, or sharing do not provide a robust enough experience to be appropriate for the App Store." | 2 | [Thread 835422](https://developer.apple.com/forums/thread/835422) |
| 14 | F | Pengembang: "I suspect the native functionality was missed because the app opens on the Home and browser tab, so the reviewer may not have reached the Wallet and Assistant tabs." | 3 | [Thread 835422](https://developer.apple.com/forums/thread/835422) |
| 15 | F | App Capacitor: "Despite adding additional native functionality, the app was rejected again under Guideline 4.2" (Core Location, share sheet, clipboard, Apple Maps). | 2 | [Thread 812889](https://developer.apple.com/forums/thread/812889) |
| 16 | F | Alasan penolakan sama: "the experience is not sufficiently differentiated from web browsing and that features such as Core Location or sharing alone are not robust enough." | 2 | [Thread 812889](https://developer.apple.com/forums/thread/812889) |
| 17 | F | Saran balasan: bangun form, alamat tersimpan, riwayat di UI app sendiri; jelaskan app di App Review Notes dengan bahasa sederhana (bukan istilah teknis). | 3 | [Thread 812889](https://developer.apple.com/forums/thread/812889) |
| 18 | F | App native (AlarmKit, widget) pun ditolak: "provides limited functionality and feels too similar to a web browsing experience." | 1 | [Thread 818306](https://developer.apple.com/forums/thread/818306) |
| 19 | F | "My app waited almost a month before it was finally reviewed, and then it was rejected" | 4 | [Thread 818306](https://developer.apple.com/forums/thread/818306) |
| 20 | F | "my coworker submitted an app without in-app purchases later than I did, and it was approved within a week." | 4 | [Thread 818306](https://developer.apple.com/forums/thread/818306) |
| 21 | F | Cordova ditolak berkali-kali. Setelah telepon Apple: penolakan karena "there was no UI at all in the binary build, and the application was completely downloaded from the site. And there was white screen during site loading." | 1, 3 | [Thread 121570](https://developer.apple.com/forums/thread/121570) |
| 22 | F | Perbaikan: "Splash screen - must have"; "First we load index.html from phone(localhost) which have some UI." | 2, 3 | [Thread 121570](https://developer.apple.com/forums/thread/121570) |
| 23 | F | Hasil: "After that we had made some refactor and our build have been approoved" | 2 | [Thread 121570](https://developer.apple.com/forums/thread/121570) |
| 24 | F | "The rule of thumb is that, if the app can run on a browser as web pages, it does not meet minimum functionality." | 1 | [Thread 108931](https://developer.apple.com/forums/thread/108931) |
| 25 | F | "The guideline is vague, is applied to some apps and not to others, and Apple offers no assistance or examples." | 3 | [Thread 108931](https://developer.apple.com/forums/thread/108931) |
| 26 | F | "rejected for the 10th time for the same reason" (2 sampai 3 halaman web di WebView). | 4 | [Thread 806726](https://developer.apple.com/forums/thread/806726) |
| 27 | F | Staf Apple: sarankan "a one-on-one App Review consultation" lewat acara Meet with Apple. | 3, 4 | [Thread 806726](https://developer.apple.com/forums/thread/806726) |
| 28 | F | Pengembang lain: "Write those pages as native pages inside your app rather than merely views onto a web page." | 1 | [Thread 806726](https://developer.apple.com/forums/thread/806726) |
| 29 | F | Staf Apple: "If you disagree with the outcome of the review, we recommend submitting an appeal to the App Review Board." | 4 | [Thread 817622](https://developer.apple.com/forums/thread/817622) |
| 30 | F | Penolakan: "The app supports account creation but does not include an option to initiate account deletion." | 5 | [Thread 765160](https://developer.apple.com/forums/thread/765160) |
| 31 | F | "Our app was later rejected because the account we provide for logging in was deleted by an Apple reviewer." | 3, 5 | [Thread 704811](https://developer.apple.com/forums/thread/704811) |
| 32 | I | Ditolak: "not sufficiently different from a mobile browsing experience" dan "most of the app content links out to Safari." | 1 | [Ionic 200908](https://forum.ionicframework.com/t/app-store-rejection-4-2-design-minimum-functionality-my-first-after-2-years-of-ionic/200908) |
| 33 | I | Kirim ulang #1: tambah offline, jelaskan push di catatan, ditolak lagi. #2: tambah isi berita, hapus tautan keluar. Hasil: "Accepted! 3rd time lucky" | 2, 4 | [Ionic 200908](https://forum.ionicframework.com/t/app-store-rejection-4-2-design-minimum-functionality-my-first-after-2-years-of-ionic/200908) |
| 34 | I | Tim Ionic: "Using capacitor, cordova, or any other tool to just load a website will still get your app rejected." | 1 | [Ionic 189688](https://forum.ionicframework.com/t/apple-4-2-minimum-functionality/189688) |
| 35 | I | "The technology used doesn't matter. It's the user experience." | 2 | [Ionic 189688](https://forum.ionicframework.com/t/apple-4-2-minimum-functionality/189688) |
| 36 | D | Apple cenderung menolak webview yang "look exactly like a website" tanpa fitur native jelas (push, offline, login Apple, navigasi native). | 1, 2 | [Discourse Meta](https://meta.discourse.org/t/apple-appstore-approval-for-discourse-app-with-webview/302211/5) |
| 37 | V | RevenueCat: "you should create a demo account with some reasonable data that your reviewer can log in with" | 3 | [RevenueCat](https://www.revenuecat.com/blog/growth/the-ultimate-guide-to-app-store-rejections) |
| 38 | V | Expo: "Do not bolt native features onto a thin app to make it look more app-like." | 2 | [Expo](https://expo.dev/articles/shipping-to-the-app-stores/app-store-rejection-reasons) |
| 39 | V | Expo: "apps repeatedly rejected for the same guideline violation take longer to review." | 4 | [Expo](https://expo.dev/articles/shipping-to-the-app-stores/app-store-rejection-reasons) |
| 40 | V | Expo: hindari login lewat VPN kantor atau kode sekali pakai yang dibacakan rekan. | 3 | [Expo](https://expo.dev/articles/shipping-to-the-app-stores/app-store-rejection-reasons) |
| 41 | V | Capgo: fitur baru "must be described with specificity in the Notes for Review"; "generic descriptions will be rejected." | 3 | [Capgo](https://capgo.app/blog/how-to-pass-app-store-review-2026/) |
| 42 | V | Capgo: "a Capacitor app that is only a marketing site will be rejected like any other web wrapper." | 1 | [Capgo](https://capgo.app/blog/how-to-pass-app-store-review-2026/) |
| 43 | V | Capgo: akun demo harus punya "every feature unlocked", dicoba dari instalasi baru. | 3 | [Capgo](https://capgo.app/blog/how-to-pass-app-store-review-2026/) |

Kolom H = hipotesis yang didukung (1-5, lihat bagian 2). Kutipan 12 dan 36 adalah ringkasan, bukan kata per kata.

## 2. Vonis hipotesis
1. **Wrapper murni ditolak 4.2: TERBUKTI.** Teks Apple (1-3) + 9 laporan (18, 21, 24, 28, 32, 34, 36, 42). Penyebab nyata: tidak ada UI lokal, layar putih, tautan ke Safari.
2. **Fitur native kecil cukup meloloskan: GUGUR.** Push, lokasi, bagikan, clipboard ditolak (13, 15, 16, 38). Lolos justru karena UI lokal + isi nyata (22, 23, 33).
3. **Alasan penolakan sama dan bisa diantisipasi lewat catatan & akun demo: TERBUKTI, dengan syarat.** Alasan berulang (layar putih, tautan keluar, demo rusak). Catatan harus spesifik (41), dan reviewer bisa melewatkan fitur (14).
4. **Waktu review & ronde wajar: BELUM JELAS.**
   - Resmi: 50% < 24 jam, 90% < 48 jam (11).
   - Cerita: seminggu sampai hampir sebulan (19, 20); 1-3 ronde umum (33), ekstrem 10 ronde (26).
   - Build 12 sudah 4 hari: di luar 90% resmi, tapi bukan tanda ditolak.
5. **Login/hapus akun (5.1.1) sering jadi penolakan kedua: TERBUKTI SEBAGIAN.** Sering muncul (6, 30, 31), tapi urutan "kedua" tidak terbukti. Keepo sudah punya Hapus akun permanen di dalam app.

## 3. Siapkan sekarang (urut dampak)
1. **Tempel catatan reviewer** (draf di bagian 4) di App Store Connect > Informasi App Review.
2. **Pastikan app tidak putih saat dibuka**: layar awal tampil dari dalam app, bukan menunggu situs.
3. **Pastikan fitur utama terlihat dari layar pertama**: reviewer bisa melewatkan tab lain (14).
4. **Cek daftar fitur native yang benar-benar ada di build 12**, lalu tulis di catatan. Jangan klaim yang tidak ada.
5. **Rencana B bila ditolak 4.2**: balas di Resolution Center dengan catatan lebih spesifik, minta konsultasi satu lawan satu (27), baru banding (29). Jangan kirim ulang tanpa perubahan.
6. **Jaga akun demo dan hapus akun**: akun demo tak bisa dihapus reviewer (31); jalur Hapus akun mudah ditemukan (10).
7. **Tautan privasi & dukungan aktif**, layar tangkap sesuai app asli (12).

## 4. Draf catatan untuk reviewer (Inggris, siap tempel)
Periksa tanda [..] sebelum menempel.

```
Keepo is a language-learning reader. Users import their own stories or books
(.txt, .epub, .pdf) and learn a foreign language by reading them.

What the app does natively on the device (not a website):
- Personal library stored on the device; imported books and saved words work offline.
- Tap any word to see its meaning, save it, and hear it spoken (text-to-speech).
- Speaking practice with a pronunciation score using the device microphone.
- Progress: XP, streaks and badges; word review sessions.
- [Add ONLY what is truly in build 12: local reading reminders / haptics / share sheet.]

How to review (no login required):
1. Open the app > Home > tap the sample story [name].
2. Tap any word in the text to see its meaning; tap "save".
3. Open the "Ngomong" tab to try speaking practice (allow microphone).
4. Open the "Kata" tab to see saved words.

Account (optional, only for sync across devices and the leaderboard):
Demo account: [email] / [password]. The account is protected from deletion.
Account deletion: Profile > Account > "Hapus akun permanen" (deletes the account and server data).

Privacy policy: https://rzk-labs.github.io/baca-bahasa/privasi.html
Support: [email]
Thank you for your time. We are happy to explain any feature in more detail.
```

## 5. Kesimpulan & langkah berikutnya
- Risiko terbesar: dianggap situs dibungkus. Bukti publik ada, tapi tidak ada jaminan lolos.
- Langkah #1: tempel catatan (3.1) dan cek poin 2-4 sebelum Apple memutuskan.
- Bila ditolak: ikuti 3.5. Rencana pengingat/bagikan/getar masuk backlog #145 (dikerjakan hanya bila diminta).
- Batas riset: sebagian besar bukti adalah cerita pengembang. Pedoman Apple (1-12) adalah satu-satunya sumber resmi.
