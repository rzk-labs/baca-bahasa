# Riset: koma nyasar di awal baris reader (#1677)

## Intinya
- Koma di awal baris itu nyata: kode memisah kata dan tanda baca jadi potongan sendiri.
- Aturan baku Unicode melarang putus sebelum koma; jadi ada pemicu lain, tersangka utama `.w::after` (#1626).
- Rekomendasi: bungkus kata + tanda baca dalam satu unit tak terputus, tanpa mengubah ketuk-kata.

> Catatan jujur: saya tidak bisa menjalankan browser di sesi ini. Tersangka belum direproduksi. Langkah 0 developer = reproduksi dulu.

## 1. Apa yang dilakukan kode
- `tokens()` di `app.js:208` memecah teks jadi kata (`w:true`) dan sisanya (`w:false`: koma, spasi, kutip).
- `wordsHtml()` di `ui.js:1767-1781` membungkus tiap kata dalam `<span class="w">`. Tanda baca ditulis sebagai teks biasa di luar span.
- Hasilnya: `<span class="w">toss</span>, <span class="w">and</span>`. Koma jadi teks terpisah dari katanya.
- `style.css:503-504` (#1626): `.cols .w` berposisi relatif dan punya `::after` absolut untuk area ketuk lebih besar.
- Tidak ada `white-space:nowrap`, tidak ada pengikat kata+tanda baca di mana pun (dicek di `style.css`, `ui.js`, `app.js`).
- Dugaan awal: **terkonfirmasi sebagian**. Pemisahan ada. Tapi pemisahan sendiri belum cukup memutus baris.

## 2. Bukti publik
- Aturan baku: UAX #14 melarang putus sebelum tanda IS (koma, titik) dan CL/CP (penutup). Jadi di teks polos, koma tak boleh di awal baris. [UAX #14 (versi 2019, bahas LB13 & IS)](https://www.unicode.org/L2/L2019/19013-line-break-num.pdf), [UAX #14 laporan teknis](https://www.unicode.org/reports/tr14/tr14-37.html).
- Artinya koma yatim hampir pasti dipicu sesuatu di sekitar span, bukan teks itu sendiri.
- Kasus mirip: elemen absolut di dalam inline di awal baris diletakkan di akhir baris sebelumnya. [Mozilla bug 743599](https://bugzilla.mozilla.org/show_bug.cgi?id=743599).
- Kasus mirip di editor: koma putus ke baris baru setelah node inline. [Forum ProseMirror](https://discuss.prosemirror.net/t/text-wrapping-of-punctuation-around-custom-node-views/3749).
- Batas elemen punya aturan rumit soal titik putus. [Arsip W3C CSS (2022)](https://lists.w3.org/Archives/Public/public-css-archive/2022Feb/0370.html).
- Word joiner U+2060 melarang putus di posisinya. Tapi dulu gagal di Firefox dalam kasus tertentu. [Wikipedia: Word joiner](https://en.wikipedia.org/wiki/Word_joiner), [Mozilla bug 1125644](https://bugzilla.mozilla.org/show_bug.cgi?id=1125644).
- Kinsoku (Mandarin/Jepang): tanda penutup dilarang di awal baris, pembuka dilarang di akhir. Di CSS lewat `line-break:strict`. [Microsoft: Kinsoku](https://learn.microsoft.com/fr-fr/archive/blogs/sanpil/kinsoku-anyone).
- Batas bukti: tidak ada sumber soal pembaca e-book tertentu. Tidak ada ulasan pengguna yang cocok ditemukan.

## 3. Tiga opsi perbaikan
**A. Hapus `::after`, ganti area ketuk lain**
- Untung: paling kecil, kalau terbukti pemicunya.
- Rugi: area ketuk #1626 turun lagi; harus cari cara lain.
- Risiko: ketuk-kata berubah. Sorotan aman. CJK/Thai tak terpengaruh.

**B. Bungkus kata + tanda baca menempel dalam `<span class="nb">` nowrap (rekomendasi)**
- Untung: koma/titik/kutip penutup selalu ikut katanya; kutip pembuka ikut kata berikutnya. Tak peduli penyebab asli.
- Rugi: ubah `wordsHtml()` di `ui.js`. Teks tetap sama, hanya ada pembungkus.
- Risiko: `.w` tetap di dalam, jadi ketuk & sorotan tak berubah. Untuk ja/zh/th (tanpa spasi) JANGAN nowrap sepanjang kalimat; bungkus hanya tanda baca + 1 karakter sebelumnya, ditambah `line-break:strict`.

**C. Sisipkan U+2060 antara kata dan tanda baca**
- Untung: tanpa elemen baru.
- Rugi: karakter gaib ikut tersalin, merusak pencocokan teks, dan tak seragam di browser.
- Risiko: tinggi untuk `norm()`, pencarian, TTS, dan teks CJK/Thai.

## 4. Rekomendasi
- Pilih **B**. Langkah 0: reproduksi di Chrome & Safari, uji juga tanpa `::after` untuk memastikan pemicu.
- Bila `::after` ternyata pemicu, tetap pasang B sebagai pagar, dan jaga area ketuk #1626.
- Naikkan versi `C` di `sw.js` setelah mengubah file.

## 5. Aturan uji untuk developer
- Lebar 320px dan 390px, tiap 4 tema (kertas, malam, gelap, otomatis), font sans dan serif, rata kiri & rata kanan-kiri.
- Teks uji: buku Inggris dengan banyak `, ; . ” “ ( )`, contoh `, and see that queer little toss`.
- Aturan lulus 1: tanda penutup `, . ; : ! ? ” ’ )` tidak pernah jadi karakter pertama baris.
- Aturan lulus 2: tanda pembuka `“ ‘ (` tidak pernah jadi karakter terakhir baris.
- Cek otomatis: ukur posisi tiap karakter lewat `Range.getClientRects()`; bandingkan atas-bawah dengan katanya.
- Ketuk-kata: tiap kata tetap terbuka; tap tepi kata tidak membalik halaman.
- Sorotan simpan/hafal/kenal, kalimat bacakan, dan fokus tetap sama.
- Jepang/Mandarin/Thai: tanda `。、」）` tak di awal baris; tak ada kata Thai terbelah aneh; ruby tetap rapi.

## 6. Langkah berikutnya
- Developer: backlog #180 (P0), mulai dari reproduksi.
- Setelah rilis, minta Nadia (pengguna AI) cek ulang, bawa screenshot 320px.
- Tahap 23 tetap `awal`; fase 2 butuh data nyata.

Mockup: `docs/mockup-1677.html`.
