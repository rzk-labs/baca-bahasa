# Riset: furigana/ruby di EPUB Jepang merusak teks baca (#807)

## Intinya
- Terbukti: impor EPUB kita memasukkan bacaan furigana ke teks, jadi kata dobel.
- Aplikasi lain punya keluhan sama; obatnya selalu: buang `<rt>`/`<rp>`.
- Tugas developer kecil: buang `<rt>`/`<rp>` saat impor; buku lama perlu impor ulang.

## 1. Temuan di kode kita
- `app.js` `parseEpub` (baris ~374-380) memakai `DOMParser` lalu `textContent`.
- `textContent` ikut membaca isi `<rt>` dan `<rp>`; tak ada penanganan ruby sama sekali.
- Contoh: `<ruby>坊<rt>ぼっ</rt></ruby>ちゃん` jadi `坊ぼっちゃん`.
- Format Aozora: `<ruby><rb>漱石</rb><rp>（</rp><rt>そうせき</rt><rp>）</rp></ruby>` jadi `漱石（そうせき）`.
- Hanya jalur EPUB yang kena; .txt dan .pdf tak memakai `DOMParser`.
- Tidak duplikat riset lama: `riset-pemotongan-kata-jp-kr.md` (potong kata) dan `riset-cara-baca-romanisasi.md` (furigana jangan di teks dulu) tak membahas teks dobel.

## 2. Bukti internet (35 bukti, 4 jenis sumber)
Catatan: Reddit tidak bisa dibuka dari alat kami (mirror gagal). Reddit hanya muncul lewat hasil pencarian, tanpa kutipan. Bukti 29-35 diambil dari ringkasan hasil pencarian, bukan dibuka penuh.

### A. Forum aplikasi baca & belajar
1. [LingQ: cara buang furigana saat impor EPUB](https://forum.lingq.com/t/how-to-remove-furigana-when-importing-epub-files/58039): furigana "ditambah setelah kanji, mengganggu baca & terjemahan".
2. Sama (2020): regex Calibre buang bacaan, sisakan kanji.
3. Sama (2020): CSS `ruby rt { visibility: hidden; }` sebelum konversi.
4. Sama (2021): regex menghilangkan sebagian kanji novel ringan.
5. Sama (2022): satu kata punya beberapa furigana; satu regex gagal.
6. Sama (2022): markup hilang tapi bacaan tetap jadi teks biasa.
7. Sama (2022): baris baru antar tag membuat regex tak cocok.
8. Sama (2024): skrip MeCab/UniDic dipakai sebagai jalan keluar.
9. Sama (2021-2024): buka EPUB di pembaca web dengan furigana mati, salin teksnya.
10. [LingQ: usulan impor buku Jepang](https://forum.lingq.com/t/suggestion-for-importing-japanese-books-epub-format/38500) (30 Des 2022): "滅茶苦茶" muncul sebagai "滅め茶ちや苦く茶ちや". Ini persis gejala dobel kita.
11. Sama (24 Des 2024): pengguna tanya, hampir 2 tahun belum berubah.
12. Sama: staf LingQ: "Kalau ada furigana di atas kata, tidak akan jalan."
13. Sama: pengguna menempel teks per bab sebagai akal-akalan.
14. [Readlang: furigana Jepang](https://forum.readlang.com/t/japanese-furigana/1602) (Jan 2025): furigana "bikin berantakan"; solusi: buang blok `rt`.
15. [MobileRead: kamus Kobo ikut baca `rt`](https://www.mobileread.com/forums/showthread.php?p=4388936) (Jan 2024): Kobo mencari "行方ゆくえ不ふ明めい", kata yang tak ada.
16. Sama: pembaca "ambil semua HTML, buang tag, cari sisanya".
17. Sama: `rt` per kanji (bukan per kata) memicu galat, bahkan di buku toko.
18. Sama (Feb 2025): pengguna lain, kamus tak jalan untuk kata berfurigana.
19. Sama (Agu 2026): perbaikan: satukan `rt` per kata dan cegah `rt`/`rp` terpilih lewat CSS.
20. [Language Reactor: furigana tak tampil benar](https://forum.languagelearningwithnetflix.com/t/furigana-not-properly-displayed/2441): furigana jadi tanda kurung setelah kanji, sebelum hiragana.
21. [Bunpro: Yomumichi](https://community.bunpro.jp/t/how-wanikani-two-failed-jlpt-attempts-and-a-pile-of-unread-ebooks-led-me-to-yomumichi/206993): furigana penuh disebut bagian paling berharga; ada saklar mati/hidup.

### B. Pelacak bug & GitHub
22. [Mozilla 1746083](https://bugzilla.mozilla.org/show_bug.cgi?id=1746083): pencarian menganggap `rt` sebagai teks sebaris; "踊り場" terbaca "踊おどり場ばに...".
23. [ttu-ttu/ebook-reader #413](https://github.com/ttu-ttu/ebook-reader/issues/413): furigana punya jarak berlebih di Firefox; `ruby` mengabaikan banyak gaya.
24. [W3C jlreq #255](https://lists.w3.org/Archives/Public/public-i18n-archive/2022OctDec/0044.html): sorotan pencarian jatuh ke teks `rt` di antara `rb`.
25. [Calibre (Launchpad 2021397)](https://bugs.launchpad.net/ubuntu/+source/calibre/+bug/2021397): menyorot kanji bersama furigana tak bisa; urutan rusak oleh `rt`.
26. [WebKit 223493](https://bugs.webkit.org/show_bug.cgi?id=223493): cari-di-halaman gagal pada teks beranotasi ruby.
27. [LibreOffice 107184](https://www.libreoffice.org/bugzilla/show_bug.cgi?id=107184): pemilihan karakter furigana "kikuk", hasil tak terduga.
28. [GNU Emacs (eww)](https://lists.libreplanet.org/archive/html/bug-gnu-emacs/2023-05/msg00946.html): eww salah menangani `ruby`/`rt`.

### C. Alat & dokumentasi
29. [furigana4epub](https://pypi.org/project/furigana4epub/1.0.1/): tersedia mode buang furigana; opsi tanpa `<rp>`.
30. [W3C html-ruby-extensions](https://www.w3.org/TR/2014/NOTE-html-ruby-extensions-20140204): `rp` hanya cadangan tanda kurung untuk penampil tanpa ruby.
31. [W3C ruby-tts-req](https://www.w3.org/TR/2026/DNOTE-ruby-tts-req-20260129): bacaan ruby perlu aturan khusus saat dibacakan.
32. [Firefox "Ruby Switch"](https://addons.mozilla.org/firefox/addon/ruby-switch/): pengguna butuh saklar sembunyi ruby.

### D. Cara aplikasi lain menangani (dari riset sebelumnya + pencarian)
33. [learnjapanese.moe](https://learnjapanese.moe/mobile-reading/) dan komunitas ッツ: CSS `ruby rt { user-select: none; }` agar furigana tak ikut terpilih (dari ringkasan pencarian).
34. LingQ, Migaku, Satori Reader: furigana opsional/bisa dimatikan; lihat `docs/riset-cara-baca-romanisasi.md`.
35. [Bunpro: rekomendasi e-book](https://community.bunpro.jp/t/e-book-app-recomendations/92980): ttsu disarankan karena salin & Yomitan jalan.

## 3. Vonis hipotesis
| Hipotesis | Vonis |
|---|---|
| H1. Teks bacaan jadi kanji + bacaan dobel | **Terbukti** (kode + bukti 10, 15, 22) |
| H2. Ketuk kata jadi salah/rusak | **Terbukti** (bukti 15-18: kamus mencari kata palsu) |
| H3. Potongan kata JP rusak | **Terbukti sebagian**: kata palsu tak ada di kamus; belum diuji di Keepo |
| H4. Aplikasi lain buang/sembunyikan `rt` | **Terbukti** (bukti 3, 14, 19, 29, 33) |
| H5. Bacaan bisa jadi sinyal bermanfaat | **Belum jelas**: peminat ada (21, 34); ukuran manfaatnya belum diuji |

## 4. Spesifikasi untuk developer (kecil)
1. Di `parseEpub`, sebelum `textContent`: hapus semua `rt`, `rp`, (`rtc`) dari `doc`.
2. Simpan teks `rb`/teks dasar saja. Simpan bacaan (opsional) sebagai petunjuk "Cara baca" di sheet arti.
3. Uji: `<ruby>坊<rt>ぼっ</rt></ruby>ちゃん` harus jadi `坊ちゃん`.
4. Uji: `<ruby><rb>漱石</rb><rp>（</rp><rt>そうせき</rt><rp>）</rp></ruby>` jadi `漱石`.
5. Uji: satu kata dengan beberapa `rt` (`<ruby>行<rt>ゆ</rt>方<rt>く</rt></ruby>`) jadi `行方`.
6. Buku lama yang sudah terimpor tidak diubah otomatis (teks asli tak tersimpan).
7. Beri catatan satu kali di buku Jepang lama: "Impor ulang EPUB untuk teks lebih bersih".
8. Jangan sentuh jalur .txt/.pdf; data IndexedDB tidak perlu migrasi skema.
9. Setelah ubah `app.js`, naikkan versi `C` di `sw.js`.

## 5. Kesimpulan & langkah berikutnya
- Kesimpulan: bug nyata, perbaikan kecil, dampak besar bagi pembaca buku Jepang.
- Berikutnya: developer kerjakan backlog #75; QA uji dengan contoh di atas.
- Setelah itu: riset bacaan sebagai "cara baca" (hipotesis H5).
