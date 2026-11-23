# Riset: teks Jepang menumpuk & terpotong (#1724)

## Intinya
- Dugaan terbukti: satu `.nb` nowrap membungkus seluruh rangkaian kata Jepang.
- Satu klausa tanpa tanda baca jadi satu blok, tak bisa patah, lalu meluap.
- Perbaikan: nowrap hanya satu kata + tanda baca yang menempel (opsi B).

## 1. Konfirmasi kode
- `ui.js:1840`: tiap kata ditambah ke `buf`, tanpa batas jumlah.
- `ui.js:1838`: `flush()` membungkus seluruh `buf` jadi satu `<span class="nb">`.
- `style.css:504`: `.cols .nb{white-space:nowrap}` membuat blok itu tak bisa patah.

Mengapa Jepang kena, Inggris tidak:
- Inggris: spasi (token non-kata) memicu `flush()` di `ui.js:1846` tiap kata.
- Jepang/Mandarin: tak ada spasi, `flush()` hanya terjadi di 、。「」.
- Klausa panjang (belasan kata) = satu blok nowrap, lebih lebar dari layar 320–390px.
- Bantahan: `style.css:505` (`line-break:strict`) tidak bersalah; ia hanya aturan patah.

## 2. Bukti publik
- [MDN line-break](https://developer.mozilla.org/docs/Web/CSS/line-break): `strict` melarang patah sebelum kana kecil, tanda panjang, dan penutup.
- [Kinsoku shori (Wikipedia)](https://www.wikipedia.com/wiki/Kinsoku_shori): kurung tutup tak boleh di awal baris, kurung buka tak boleh di akhir.
- [W3C i18n uji line-break ja/zh](https://www.w3.org/International/i18n-tests/results/line-breaks-jazh): perilaku browser tergantung `lang`; hasil beda antar browser.
- [CSS Text 3](https://drafts.csswg.org/css-text-3/): `line-break:anywhere` mengabaikan larangan patah, jadi jangan dipakai.
- Catatan: browser menegakkan kinsoku sendiri bila ada `lang="ja"`. Nowrap besar tidak diperlukan.

## 3. Tiga opsi
**A. Hapus `.nb` untuk bahasa tanpa spasi; andalkan `line-break:strict`.**
- Paling sederhana, patuh aturan browser.
- Risiko: Safari lama kadang longgar; koma bisa tetap di awal baris.

**B. `.nb` hanya satu kata + tanda baca penutup yang menempel.** (DIPILIH)
- Flush `buf` setelah tiap kata bila bahasa tanpa spasi.
- Tanda baca tetap menempel ke kata sebelumnya; baris bisa patah antar kata.
- Ketuk-kata tak berubah; bahasa berspasi tak tersentuh.

**C. U+2060 (word joiner) sebelum tanda baca, tanpa `.nb`.**
- Tanpa elemen tambahan.
- Risiko: karakter tak terlihat mengganggu salin, pencarian, dan ruby.

**Alasan memilih B:** kontrol tertinggi, perubahan kecil, pola #1709 tetap dipakai.

## 4. Daftar uji
- こころ hal 12 dan 坊っちゃん hal 11: tak ada baris menumpuk atau terpotong.
- Lebar 320px dan 390px; 4 tema (kertas, malam, dll.): tak ada geser horizontal.
- Tanda baca (、。」) tak pernah di awal baris; kurung buka tak di akhir baris.
- Buku Inggris, Indonesia, Arab (RTL): HTML dan tata letak identik dengan sebelumnya.
- Ketuk kata, furigana/ruby, dan sorotan kalimat tetap jalan.

## 5. Spesifikasi untuk developer
Langkah:
- Di `wordsHtml` (`ui.js`): tentukan `noSpace` = bahasa tanpa spasi (ja, zh), bukan RTL.
- Saat `t.w` dan `noSpace`: bila `buf` sudah berisi kata, `flush()` dulu, lalu tambah kata.
- Tanda baca penutup (`NB_LEAD`) tetap menempel ke `buf` yang sama seperti sekarang.
- Jangan ubah `style.css:504` atau cabang berspasi/RTL. Naikkan versi `C` di `sw.js`.

Kriteria lolos:
- Satu `.nb` maksimal berisi satu kata + tanda baca menempel, di ja/zh.
- Semua daftar uji bagian 4 lolos; `node --check ui.js` bersih.
- Tak ada koma/titik di awal baris di 320px.

Mockup: `docs/mockup-1724.html`.
