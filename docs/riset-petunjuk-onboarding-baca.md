# Riset: petunjuk pertama kali, spanduk saran & toast di halaman baca

Tugas #621 (validasi bukti internet). Melengkapi `docs/riset-sesi-pertama.md` (alur 5 menit pertama), `docs/riset-aksesibilitas-baca.md`, `docs/riset-tipografi-baca-hp.md`. Fokus di sini: pesan yang menumpuk di atas teks baca.

## Intinya
- Pesan yang menutup teks baca mengganggu. Bukti kuat dari panduan UX dan forum.
- Cukup satu pesan per waktu, sekali tampil, tombol "Paham", lalu tersimpan.
- Spanduk tema malam cuma saat gelap, dan tidak bareng petunjuk lain.

## 1. Bahan & cara kerja
- Keluhan tester/pengguna AI (`.kepo-tmp/masukan.txt`): Raka, Tari, Nadia, Dina.
- Tari: "panduan ketuk menutup 4 baris teks sejak buka cerita".
- Nadia: spanduk tema malam muncul siang, bareng panduan ketuk.
- Raka: panduan menutupi bawah teks, minta tombol "Paham".
- Dina: toast sempit 5 baris, menutup judul dan tombol "Buka buku lain".
- 50 butir bukti dari 4 jenis sumber. Tiap butir diberi nomor [n] di bagian 2.
- Tak terbuka: Reddit, ulasan Play Store/App Store, Threads/X. Ulasan Kindle/Moon+ Reader tak ditemukan langsung.

## 2. Bukti (50 butir)

**A. Riset UX (Nielsen Norman Group & kampus)**
- [1] "tutorials don't make users faster or more successful at completing tasks" (uji 70 orang, 4 app iOS). ([NN/g](https://www.nngroup.com/articles/mobile-tutorials/))
- [2] Skor mudah pembaca tutorial 4,92 vs 5,49 yang melewatkan (skala 1-7). [NN/g](https://www.nngroup.com/articles/mobile-tutorials/)
- [3] "many participants skip tutorials when they first download an app." [NN/g](https://www.nngroup.com/articles/mobile-tutorials/)
- [4] "We also observed this effect with coach marks and instructional overlays": app tampak lebih rumit. [NN/g](https://www.nngroup.com/articles/mobile-tutorials/)
- [5] "Think twice about creating a tutorial for simple applications." [NN/g](https://www.nngroup.com/articles/mobile-tutorials/)
- [6] Saran: bantuan interaktif/kontekstual, bukan tutorial awal. [NN/g](https://www.nngroup.com/articles/mobile-tutorials/)
- [7] "we find that users frequently skip them." ([NN/g onboarding](https://www.nngroup.com/articles/onboarding-tutorials/))
- [8] "The tutorial shows information out of context." [NN/g](https://www.nngroup.com/articles/onboarding-tutorials/)
- [9] Info terbaik "at the right moment, when they are ready for it." [NN/g](https://www.nngroup.com/articles/onboarding-tutorials/)
- [10] Tooltip/overlay pantas untuk hal baru saat pengguna menyentuhnya. [NN/g](https://www.nngroup.com/articles/onboarding-tutorials/)
- [11] Walkthrough "are dramatically overused." [NN/g](https://www.nngroup.com/articles/onboarding-tutorials/)
- [12] "Tutorials interrupt users, don't necessarily improve task performance, and are quickly forgotten." [NN/g](https://www.nngroup.com/articles/onboarding-tutorials/)
- [13] Overlay jangan "cramming them with all the information at once". ([Univ. St Andrews, 2016](https://digitalcommunications.wp.st-andrews.ac.uk/2016/01/14/flaws-in-ux-design-standards-tutorial-overlays/))
- [14] Overlay menjelaskan "each and every button on screen". [St Andrews](https://digitalcommunications.wp.st-andrews.ac.uk/2016/01/14/flaws-in-ux-design-standards-tutorial-overlays/)
- [15] "Your user will skip this tutorial as soon as they can." [St Andrews](https://digitalcommunications.wp.st-andrews.ac.uk/2016/01/14/flaws-in-ux-design-standards-tutorial-overlays/)
- [16] Pengguna "don't want to have to learn how to use the app." [St Andrews](https://digitalcommunications.wp.st-andrews.ac.uk/2016/01/14/flaws-in-ux-design-standards-tutorial-overlays/)
- [17] Kalaupun dibaca, "they'll likely forget it pretty quickly." [St Andrews](https://digitalcommunications.wp.st-andrews.ac.uk/2016/01/14/flaws-in-ux-design-standards-tutorial-overlays/)

**B. Panduan platform (Apple, Material, W3C)**
- [18] Apple HIG: bantuan harus terkait aksi saat itu dan "easy for people to dismiss or avoid". ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help.md))
- [19] Tip = "small, transient view" yang singkat. [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help.md)
- [20] "Keep your tips to one or two sentences." [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help.md)
- [21] Popover tip untuk jaga alur isi; inline tip agar sekitar tetap terlihat. [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help.md)
- [22] Tip hanya jika berguna; frekuensi wajar, mis. "once every 24 hours". [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help.md)
- [23] Fitur lebih dari tiga aksi "probably too complicated for a tip". [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help.md)
- [24] Material: snackbar antre muncul satu per satu, bukan ditumpuk (via ringkasan pencarian, [docs Material](https://material.io/components/snackbars)).
- [25] Material: snackbar jangan menutupi tombol aksi melayang (FAB); geser tombolnya. [Material](https://material.io/components/snackbars)
- [26] Material: snackbar satu baris 48dp, multi-baris 80dp; 0-1 aksi. [Material](https://material.io/components/snackbars)
- [27] Material: isi "single line of text" terkait operasi yang baru dilakukan. [Material](https://material.io/components/snackbars)
- [28] W3C WCAG 2.2.1: contoh toast "disappears after 5 seconds". ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html))
- [29] W3C: "People who have cognitive or language limitations need more time to read and to understand." [W3C](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)
- [30] Sistem desain Sainsbury's & Canva: toast hilang otomatis 5 detik; panjangkan hanya bila perlu. ([Sainsbury's](https://design-systems.sainsburys.co.uk/components/toast/), [Canva](https://www.canva.dev/docs/apps/design-guidelines/toasts/))
- [31] Lightning Design System: toast dengan tautan 9,6 detik, tanpa tautan 4,8 detik. ([Salesforce](https://spring-21.lightningdesignsystem.com/guidelines/messaging/components/toasts))
- [32] Artikel UX: pesan lebih dari 2 baris (>20 kata) perlu durasi lebih panjang; rata-rata 2-7 detik. ([uxdesign.cc](https://uxdesign.cc/toasts-or-snack-bars-design-organic-system-notifications-1236f2883023))

**C. Forum & pelacak masukan pengguna**
- [33] Pengguna Adobe Reader: tip bar "very annoying since it covers part of the document you are reading". ([Adobe Community](https://community.adobe.com/questions-15/annoying-tip-bar-8508))
- [34] Pengguna yang sama: "that shows no interest in your customers". [Adobe](https://community.adobe.com/questions-15/annoying-tip-bar-8508)
- [35] LingQ: popup "covers useful information and needs to be manually closed which is really annoying and disrupts the reading." ([forum LingQ](https://forum.lingq.com/t/how-to-block-annoying-pop-up-while-reading-on-chrome/34258))
- [36] LingQ: "A few people have complained about the annoying pop-up that appears when reading." [forum LingQ](https://forum.lingq.com/t/how-to-block-annoying-pop-up-while-reading-on-chrome/34258)
- [37] LingQ Tutorial Mode: pengguna lapor Langkah 2 "looks a bit strange" dan Langkah 5 bermasalah ruang di layar sempit. ([forum LingQ](https://forum.lingq.com/t/new-tutorial-mode-related-phrases-text-to-speech-on-popups/3784))
- [38] Zotero: popup pencarian "covers search results"; "This can be somewhat confusing." ([forum Zotero](https://forums.zotero.org/discussion/comment/482196/))
- [39] Zotero: usul agar popup "no longer appears superimposed over the text body". [Zotero](https://forums.zotero.org/discussion/comment/482196/)
- [40] Spotify: tooltip onboarding muncul "almost every single time I start up the app." ([Spotify Community](https://community.spotify.com/t5/Desktop-Mac/MacOS-app-onboarding-tooltips-keep-popping-up-with-startup-of/td-p/5740037))
- [41] Spotify: "I need to close the blue pop-ups every time I open the app." Berlangsung berbulan-bulan. [Spotify](https://community.spotify.com/t5/Desktop-Mac/MacOS-app-onboarding-tooltips-keep-popping-up-with-startup-of/td-p/5740037)
- [42] Spotify: opsi "Don't show again" sudah dicentang tapi tooltip tetap muncul. [Spotify](https://community.spotify.com/t5/Desktop-Mac/MacOS-app-onboarding-tooltips-keep-popping-up-with-startup-of/td-p/5740037)
- [43] Adobe Photoshop: tutorial popup muncul tiap buka; "How can I get rid of it forever?" ([Adobe Community](https://community.adobe.com/questions-652/remove-tutorial-notification-787719))
- [44] Staf Adobe: popup seharusnya hilang "until you click on OK". [Adobe](https://community.adobe.com/questions-652/remove-tutorial-notification-787719)
- [45] Practice Portuguese (app baca bahasa): di layar kecil "the menu may cover up the words". ([bantuan](https://help.practiceportuguese.com/article/105-menu-is-covering-the-words))
- [46] Practice Portuguese: solusi, tutup menu supaya "you can still see the text". [bantuan](https://help.practiceportuguese.com/article/105-menu-is-covering-the-words)
- [47] Clozemaster: popup petunjuk "refusing to go away"; staf menghapus tooltip itu. ([forum Clozemaster](https://forum.clozemaster.com/t/pop-ups-wont-go-away-when-playing-sentences/8820))
- [48] Readlang: usul popover "that doesn't affect the layout of the underlying text" (Jan 2026). ([forum Readlang](https://forum.readlang.com/t/popup-word-definition-that-doesnt-shift-layout/4829))
- [49] Readlang: popup yang menggeser tata letak bisa "pushes lines onto the next page". [Readlang](https://forum.readlang.com/t/popup-word-definition-that-doesnt-shift-layout/4829)

**D. Perilaku app baca (artikel & panduan)**
- [50] Apple Books punya Auto-Night: beralih tema malam otomatis saat gelap (sensor cahaya/matahari), bukan lewat spanduk; memilih tema manual mematikannya. ([Alphr](https://www.alphr.com/ibooks-auto-night-theme/), [iGeeksBlog](https://www.igeeksblog.com/enable-auto-night-theme-in-ibooks-on-iphone-ipad)). Kindle app: tema ikut mode gelap perangkat ([ebookfriendly](https://ebookfriendly.com/how-to-dark-mode-kindle-app-ipad-iphone/)).

## 3. Tabel vonis
| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| 1 | Petunjuk yang menutup teks mengganggu pembaca | **Terbukti** | [33][35][38][45][48] + [18][21] |
| 2 | Cukup sekali + tombol "Paham", lalu tersimpan | **Terbukti sebagian** | [40]-[44] muncul berulang = kesal; [22] batasi frekuensi. Tombol "Paham" khusus belum diuji |
| 3 | Spanduk tema malam: tidak siang hari, tidak bareng petunjuk lain | **Terbukti sebagian** | [50] app besar tak pakai spanduk, pakai otomatis; [22] aturan kelayakan; [13] jangan campur. Tak ada studi langsung tentang spanduk tema |
| 4 | Toast tak boleh menimpa tombol/judul; maks 1-2 baris | **Terbukti sebagian** | [25][26][27] jangan tutup tombol & 1 baris; [32] >2 baris perlu waktu; [29] jangan terlalu cepat hilang |
| 5 | Satu pesan pada satu waktu | **Terbukti** | [24] antre satu per satu; [22] kadensi; [13][14] jangan banyak sekaligus |

Catatan: vonis 2-4 "sebagian" karena sumber memberi prinsip umum, bukan uji langsung di app baca. Keluhan Tari/Nadia/Raka/Dina memperkuat, tapi bukan bukti independen.

## 4. Kesimpulan
- Penyebab keluhan: tiga pesan (panduan, spanduk, toast) rebutan ruang yang sama.
- Panduan 4 baris menutup teks bertentangan dengan [18][20][21]: tip singkat, mudah ditutup, tidak menutup isi.
- Prinsip "tidak menutup teks" didukung bukti terkuat; ini P0 kenyamanan baca.

## 5. Usul kecil untuk developer (urut prioritas)
1. **Panduan ketuk/tahan/geser: satu baris, ada tombol "Paham", simpan di perangkat.** Tidak menutup teks; taruh di bar bawah/inline. Muncul sekali saja.
2. **Satu pesan sekaligus.** Antrean: panduan > saran tema > toast. Pesan baru menunggu atau menggantikan, tidak menumpuk.
3. **Spanduk tema malam: hanya jika gelap** (jam malam atau layar perangkat mode gelap), maksimal sekali per hari, hilang bila sudah dipilih tema. Tidak tampil bareng panduan.
4. **Toast maks 2 baris, lebar wajar, tanpa titik nyasar.** Posisi di atas bar bawah dan tombol; tidak menimpa judul/tombol. Durasi ±5 detik, lebih lama jika teks panjang.
5. **Uji ulang di HP 320-390px:** buka cerita baru, lihat tak ada teks tertutup. Cek tester lagi.

## 6. Langkah berikutnya
- Developer kerjakan usul 1-2 dulu (P0), lalu 3-4.
- Tester AI ulangi uji buka cerita pertama setelah perbaikan.
- Penguat nanti: lihat 5 orang nyata membuka cerita pertama.
