# Riset: aksesibilitas baca (pembaca layar, disleksia, target ketuk) — #556

## Intinya
- 41 bukti, 6 jenis sumber: standar, bug tracker, forum, studi, panduan, blog.
- Terbukti: sheet sering salah diumumkan; jarak huruf membantu; teks sistem besar diabaikan app.
- P0: label sheet per jenis, rata kiri jadi bawaan, target kata lebih lega.

Catatan metode: bukti dari ringkasan hasil pencarian, tidak semua halaman dibuka. Reddit/ulasan toko tak terbaca. Beberapa tautan sekunder.

## 1. Vonis hipotesis
| # | Hipotesis | Vonis |
|---|---|---|
| H1 | Pembaca layar salah umumkan sheet & tombol ikon tanpa label | **Terbukti** |
| H2 | Jarak huruf/baris & tanpa rata kanan-kiri bantu baca | **Terbukti sebagian** |
| H3 | Target kata <44px bikin salah ketuk | **Terbukti sebagian** |
| H4 | Teks besar sistem merusak tata letak | **Terbukti sebagian** |
| H5 | Gerak berlebih mengganggu | **Terbukti** (standar jelas, app sudah patuh) |

## 2. Bukti H1: pembaca layar & sheet (15)
1. [WebKit 174667](https://bugs.webkit.org/show_bug.cgi?id=174667): VoiceOver lewati isi statis di `aria-modal`.
2. [a11y-dialog known issues](https://a11y-dialog.netlify.app/further-reading/known-issues): dukungan `aria-modal` di mobile lemah.
3. Sumber sama: nama dialog tak dibaca bila tombol tutup mendahului judul.
4. [WebKit 273846](https://lists.webkit.org/pipermail/webkit-unassigned/2024-May/1164343.html): dialog `aria-labelledby` tak diumumkan.
5. [Apple Discussions, Safari 26](https://discussions-kr-prz.apple.com/thread/256161078): fokus VoiceOver tetap di tombol pemicu.
6. [WebKit 247134](https://bugs.webkit.org/show_bug.cgi?id=247134): tombol tak terjangkau saat role+modal di satu elemen.
7. [Forum Flutter](https://forum.itsallwidgets.com/t/a11y-voiceover-and-dialogs-bottomsheets/3979): "dismiss" jadi ucapan pertama di sheet.
8. [AppleVis Bookshop.org](https://applevis.com/apps/ios/books/bookshoporg-ebooks): tombol tanpa label, app e-book "tak bisa dipakai".
9. [AppleVis PageWalker](https://applevis.com/forum/app-development-programming/developer-looking-voiceover-feedback-classic-novels-audio): sebagian kontrol tanpa label.
10. [Apple App Store Connect](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-accessibility-evaluation-criteria/): semua ikon wajib label singkat.
11. [Ovo design system](https://design.ovo.com/latest/components/bottom-sheet/accessibility-zW0zBTuq): sheet harus umumkan role+nama, fokus masuk, lalu kembali.
12. [WebAIM 35242](https://webaim.org/discussion/mail_message?id=35242): TalkBack fokus berputar di isi sheet.
13. [Mozilla 1390356](https://reviewboard.mozilla.org/r/170942/diff/): TalkBack dan BottomSheetDialog butuh akal-akalan.
14. [AppleVis Kindle VoiceOver](https://www.applevis.com/comment/179588): app baca besar pun bermasalah dengan VoiceOver.
15. [AppleVis format Kindle](https://applevis.com/comment/93619): format/paragraf rusak untuk VoiceOver & braille.

## 3. Bukti H2: disleksia & jarak (9)
16. [Zorzi 2012, PNAS](https://ccnl.psy.unipd.it/publications/publications_folder/extra-large-letter-spacing-improves-reading-in-dyslexia/view): jarak huruf lebih lebar kurangi salah baca, anak disleksia.
17. [Galliussi 2020](https://link.springer.com/10.1007/s11881-020-00194-x): jarak huruf harus diiringi jarak kata.
18. [PubMed 30094714](https://pubmed.ncbi.nlm.nih.gov/30094714/): font khusus disleksia tak terbukti; jarak yang berpengaruh.
19. Hakvoort 2017 (dikutip di hasil pencarian): tiru Zorzi sebagian; salah turun, kecepatan tak jelas.
20. [Dyslexia Scotland](https://dyslexiascotland.org.uk/dyslexia-friendly-typed-formats): baris 1,5×, font yang akrab.
21. [JALT, kutip BDA](https://jalt-publications.org/articles/29622-transforming-text-student-success-guide-creating-dyslexic-friendly-classroom): sans-serif ≥12pt, hindari huruf kapital semua.
22. [Smashing](https://smashingmagazine.com/2021/11/dyslexia-friendly-mode-website): mode ramah disleksia bisa dipasang sebagai opsi.
23. [ezud](https://ezud.com/typography-readability-dyslexia-friendly/): panduan ramah disleksia (rata kiri, hindari justify).
24. [GearDiary](https://geardiary.com/2012/03/27/hey-amazon-can-you-please-let-me-change-the-paragraph-justification-in-your-apps/amp/): pembaca minta bisa matikan justify di app Kindle.

Celah: tak ada studi langsung "justify vs rata kiri" pada disleksia; hanya panduan.
Celah: tak ada studi khusus teks bahasa asing.

## 4. Bukti H3: target ketuk (8)
25. [WCAG 2.5.8](https://allaccessible.org/blog/wcag-258-target-size-minimum-implementation-guide): minimal 24×24 CSS px (AA); tautan teks inline dikecualikan.
26. [Disability World 2.5.8](https://www.disabilityworld.org/toolkit/standards/wcag/2-5-8-target-size-minimum/): ada pengecualian "esensial".
27. [Frontend checklist](https://frontendchecklist.io/rules/accessibility/touch-targets): Apple 44pt, Material 48dp.
28. [Siteimprove](https://www.siteimprove.com/blog/motor-impairments-and-mobile-ui-the-touch-target-problem): target kecil menyulitkan gangguan motorik.
29. [Deque spacing](https://docs.deque.com/devtools-mobile/2025.7.2/en/ios-touch-target-spacing): jarak antar target ikut dihitung.
30. [LingQ iOS](https://forum.lingq.com/t/lingqing-a-phrase-over-multiple-lines-on-iphone-app-no-longer-works/38165): pilihan frasa lompat/meleset di iPhone.
31. [LingQ iPad](https://forum.lingq.com/t/lingqing-in-ipad/15831): ketuk-dua pada kata bentrok dengan zoom.
32. [LingQ Android](https://forum.lingq.com/t/lingqing-phrases-from-android-devices/4525): ketukan gagal setelah pembaruan.

Celah: tak ada keluhan "kata terlalu kecil" tertulis di LingQ.

## 5. Bukti H4 & H5: teks besar & gerak (9)
33. [ServiceNow Horizon](https://horizon.servicenow.com/native-mobile/foundations/accessibility/dynamic-type-size): tinggi tetap membuat teks terpotong.
34. [Create with Swift](https://www.createwithswift.com/supporting-dynamic-type-and-larger-text-in-your-app-to-enhance-accessibility): hapus frame tetap, biarkan teks turun baris.
35. [Deque Dynamic Type](https://docs.deque.com/devtools-mobile/2023.4.19/en/ios-supports-dynamic-type): ada aturan uji "mendukung Dynamic Type".
36. [Apple tech talk 111433](https://developer.apple.com/videos/play/tech-talks/111433/): tata letak harus adaptif pada ukuran besar.
37. [UX Design: Kindle](https://uxdesign.cc/things-that-really-bug-me-about-the-kindle-app-a-ux-review-582b210e11cd): ukuran huruf tak terbawa antar buku.
38. [MobileRead](https://www.mobileread.com/forums/showthread.php?p=3956540): baris terpotong di dasar halaman.
39. [WCAG 2.3.3](https://www.disabilityworld.org/toolkit/standards/wcag/2-3-3-animation-from-interactions/): animasi interaksi harus bisa dimatikan (AAA).
40. [UMich vestibular](https://teamdynamix.umich.edu/TDClient/30/Portal/KB/PrintArticle?ID=14019): gerak dekoratif picu pusing/migrain.
41. [OpenReplay](https://blog.openreplay.com/improving-inclusivity-with-accessible-animations/): pakai `prefers-reduced-motion`.

## 6. Bandingkan dengan app (baca saja)
- Sheet: `role=dialog`, `aria-modal`, fokus pindah masuk (`index.html:32`, `ui.js:186`).
- Label sheet lewat parameter. Daftar penanda kini "Daftar penanda" (`ui.js:950`); temuan Tari tampaknya sudah diperbaiki.
- Tapi hanya 3 dari 13 pemanggil `openSheet` terlihat memberi label (hasil grep; perlu dicek). Sisanya jatuh ke "Arti kata dan kalimat".
- Tombol ikon umumnya punya `aria-label`; tutup & panah sudah berlabel.
- Teks baca: bawaan `text-align: justify` + hyphens; rata kiri lewat Pengaturan (`style.css:350-352`).
- Jarak huruf tetap `.005em`, tanpa kontrol. Jarak baris & ukuran bisa diatur.
- Ukuran dalam `px`; tidak mengikuti teks besar sistem (ada pengaturan sendiri).
- Kata `.w` inline tanpa bantalan; tombol umumnya min 44px, kata tidak.
- `prefers-reduced-motion` sudah ditangani (`style.css:434`, `ui.js:108`).

## 7. Kesimpulan
- H1 kuat: sheet & VoiceOver rawan salah. Label per sheet wajib, uji di iPhone nyata.
- H2/H3/H4 sebagian: arah jelas, tapi tak ada data khusus teks bahasa asing.
- H5 aman: app sudah patuh; cukup dipertahankan.

## 8. Usul P0 (maks 5)
1. Beri label tiap sheet (Pengaturan, Daftar bab, Kata sesi, dll.); tak ada yang jatuh ke bawaan.
2. Judul sheet di urutan pertama, tombol tutup sesudahnya; uji VoiceOver & TalkBack.
3. Rata kiri jadi bawaan; justify pilihan. Tambah opsi "jarak huruf lega".
4. Longgarkan area ketuk kata (jarak baris, bantalan tak terlihat) mendekati 44px.
5. Uji ukuran teks sistem besar di iPhone; bar atas & sheet jangan terpotong.

## 9. Langkah berikutnya
- Developer: kerjakan butir 1-2 dulu (kecil, risiko rendah).
- Tester: uji VoiceOver di iPhone nyata (butuh orang).
- Riset: cari studi justify vs rata kiri untuk bahasa asing.
