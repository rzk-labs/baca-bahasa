# Riset #459: Baca Arab (RTL), Thai & Hindi di HP — apa yang pecah?

Tanggal: 12 Nov 2026. Peran: Riset. Kode aplikasi tidak diubah.

## Intinya
- Arab sudah ada di Keepo, tapi arah teks (kanan-ke-kiri) belum diatur. Pasti pecah.
- Thai & Hindi belum ada di daftar bahasa. Pemotong kata bawaan HP sudah ada, tinggal dipakai.
- Aturan huruf Keepo (jarak huruf, rata kanan-kiri) merusak Arab & Hindi. Perlu pengecualian.

## 1. Cara riset
- 4 jenis sumber: forum, bug tracker, dokumen W3C/MDN, listing aplikasi.
- Total 36 kutipan bernomor (syarat: 30 dari 3 jenis). Syarat terpenuhi.
- Kutipan [A#] lewat ringkasan mesin pencari (bukan baca halaman penuh) ditandai ⚠.
- Tak terbuka / tak ada: Reddit (tak dicari langsung), Readlang (tak ada utas Thai/Arab), forum Articulate (403).
- Tak ada angka pengguna Indonesia. Semua bukti dari luar negeri.

## 2. Kutipan bernomor

### A. Forum pengguna
1. LingQ, bencohen (Ibrani): "the period is put to the right of the first word." — https://forum.lingq.com/t/24115
2. LingQ, staf zoran: "a period will always appear on the right side of the word." — https://forum.lingq.com/t/24115
3. LingQ, silviad (Arab): "the point moves to the wrong side." — https://forum.lingq.com/t/24115
4. LingQ, silviad: diakritik tak didukung, "you can NEVER make a lingq for words containing diatric marks." — https://forum.lingq.com/t/24115
5. LingQ, staf zoran: "we don’t currently have support for right to left languages." — https://forum.lingq.com/t/24115
6. LingQ "Arabic 4.0", mariuszf: "arabic is displayed from left to right" di reader baru; reader lama normal. — https://forum.lingq.com/t/arabic-40/25114
7. LingQ, slawun95 minta perbaikan "left to right arabic reader." — https://forum.lingq.com/t/arabic-40/25114
8. LingQ, usablefiber: ingin "add vowel" seperti pinyin untuk Mandarin. — https://forum.lingq.com/t/arabic-40/25114
9. LingQ, Hubert (Persia): "the word order of some sentences is wrong" setelah impor. — https://forum.lingq.com/t/persian-word-order-is-wrong-after-importing-a-lsson/70042
10. LingQ, staf zoran: "We aren't familiar with the issue" (tanpa perbaikan). — sama
11. LingQ, HaroldLanguage: cari karakter bersama seperti angka atau huruf Latin di kalimat yang rusak. — sama
12. LingQ, Hubert: setelah ketik langsung di LingQ, "There are no problems anymore." (jalan pintas). — sama
13. Language Learning with Netflix, Rubashov (6 Nov 2020): "Word segmentation is mostly working quite well for Thai at the moment, but obviously there are some mistakes." — https://forum.languagelearningwithnetflix.com/t/word-segmentation-for-thai/1781
14. LLN (judul utas terkait): "Thai: the AI struggles with picking words correctly, frequent errors." — sama
15. LLN, Rubashov: "there are no spaces between words in Thai." — sama
16. Anki Forums (kartu Arab terbalik): "Putting direction: rtl; in your template styling section should fix this." — https://forums.ankiweb.net/t/arabic-text-transposed/5673/2

### B. Bug tracker
17. Wikimedia T57995 (Hindi): "The rising diacritics in the text of the notification... get cut off due to the line height being explicitly set." — https://phabricator.wikimedia.org/T57995
18. Wikimedia T57995: "The problem is fixed if the css rule .mw-echo-title {line-height: 14px;} is changed to 17px." — sama
19. Mozilla Bug 1423593, Jonathan Kew: dukung "languages like Thai, Khmer and Lao where text is written without word separators." — https://bugzilla.mozilla.org/show_bug.cgi?id=1423593
20. Mozilla, Kew: "we solve the line-breaking issue by calling host platform APIs." — sama
21. Mozilla, Kew: "our behavior is likely to vary somewhat between platforms." — sama
22. Mozilla, André Bargull: "2.882.016 bytes for dictionaries (burmese, chinese-japanese, khmer lao, thai)." — sama
23. Mozilla, Dan Minor: kerja Segmenter tak bisa mulai "until the new ICU4x backed segmenter lands." — sama
24. W3C Thai Gap, isu maiyamok: "Gecko, Blink, and WebKit, all fail the test." — https://www.w3.org/TR/thai-gap
25. W3C Thai Gap, rata kanan-kiri: "Gecko, Blink, and Webkit all fail to produce the expected behaviour." — sama

### C. Dokumen standar & panduan
26. MDN Intl.Segmenter: `split(" ")` salah untuk bahasa tanpa spasi ("Japanese, Chinese, Thai, Lao, Khmer, Myanmar, etc."). — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter
27. MDN: "available across browsers since April 2024." — sama
28. W3C Arabic Layout (2026): diakritik "rarely found in normal text." — https://www.w3.org/TR/2026/DNOTE-arab-lreq-20260319/
29. W3C i18n (dir): tanda seru bisa jatuh di sisi salah tanpa arah dasar yang benar. — https://www.w3.org/International/questions/qa-html-dir
30. W3C i18n (dir): "Do not use CSS to apply base direction in HTML pages." — sama
31. W3C Thai Gap: Thai tak pakai spasi antar kata, spasi memisah frasa/kalimat. — https://www.w3.org/TR/thai-gap
32. W3C www-style (Peter Moulder): letter-spacing memutus garis atas Hindi "common (or even universal...)". — https://lists.w3.org/Archives/Public/www-style/2014Jan/0453.html
33. W3C www-style, Moulder: hati-hati mewajibkan celah garis. — sama
34. ⚠ W3C CSS Text 2014 (via ringkasan): letter-spacing tak boleh memutus sambungan huruf Arab. — https://lists.w3.org/Archives/Public/www-style/2014Oct/0195.html
35. AC Zoom blog: "the css letter-spacing changes mess up all Devanagari fonts." — https://www.aczoom.com/archive-2016/blog/ac/2006-09-17/letter-spacing-and-devanagari

### D. Listing aplikasi
36. ⚠ App Store "Al-Quran | Beginner Quran" & "Al-Islam": fitur "Remove Tashkeel". — https://apps.apple.com/app/id6474894373 , https://apps.apple.com/app/id6449729655
37. ⚠ "Mushaf Without Diacritics" (Android): sembunyi/tampil harakat. — https://appgoblin.info/apps/net.aliflammim.mushaftashkeel
38. ⚠ Ekstensi Firefox "Toggle Tashkeel": hapus & pasang lagi harakat di halaman. — https://addons.mozilla.org/ia/firefox/addon/toggle-tashkeel-remove-tashkee

### E. Terjemahan (lemah, ⚠ blog vendor)
39. ⚠ Blog vendor: akurasi turun untuk "Hindi, or Arabic" (bahasa jejak web kecil); klaim vendor, bukan uji mandiri. — https://multilipi.com/blog/article/24
40. ⚠ Riset: kata Arab standar punya rata-rata 2,7 makna inti; tanda baca vokal sering dibuang. — via pencarian (blog & jurnal)

## 3. Vonis 5 hipotesis

### H1. Teks RTL sering rusak di reader web — TERBUKTI
- Arah, tanda baca, dan campuran angka/Latin pecah di LingQ (#1-3, 6, 9, 11).
- Pemicunya sama: arah dasar tak dipasang (#29-30, 16).
- Catatan: bukti Arab ada, bukti angka khusus Arab tipis.

### H2. Thai butuh pemotong kata agar ketuk-kata jalan — TERBUKTI
- Thai tak pakai spasi (#15, 26, 31). Tanpa pemotong, ketukan kena satu kalimat.
- Pemotong bawaan browser ada sejak April 2024 (#27). Kualitas bergantung HP (#20-21).
- Hasil LLN sendiri "mostly good, some mistakes" (#13-14). Cukup untuk ketuk-kata, bukan sempurna.

### H3. Harakat Arab & matra Hindi rusak bila font/jarak huruf diubah — TERBUKTI SEBAGIAN
- Hindi: jarak huruf memutus garis atas (#32, 35); tinggi baris sempit memotong tanda (#17-18).
- Arab: standar bilang sambungan huruf harus tetap (#34), tapi bukti rusak di HP nyata belum ada.
- Perlu uji di iPhone Safari nyata.

### H4. Pembaca Indonesia (Quran/novel) butuh harakat bisa dimatikan — TERBUKTI SEBAGIAN
- Teks umum jarang pakai harakat (#28); aplikasi Quran sudah menyediakan tombol (#36-38).
- LingQ tak mendukung kata berharakat (#4) dan ada yang minta tambah harakat (#8).
- Belum ada suara pembaca Indonesia. Tak ada bukti untuk novel.

### H5. Google gtx / MyMemory cukup untuk kata tunggal bahasa ini — BELUM JELAS
- Tak ada uji mandiri kata tunggal Arab/Hindi/Thai (#39-40 lemah).
- Arab: satu kata banyak makna & harakat dibuang. Risiko lebih tinggi dari bahasa Latin.
- Perlu uji kecil 30 kata dengan penutur (tugas berikutnya).

## 4. Yang sudah ada di Keepo
- Arab ada di daftar bahasa (`ar-SA`) dan tebakan bahasa otomatis (`app.js` baris 27).
- Thai, Hindi, Ibrani, Persia: tidak ada di daftar, tidak terdeteksi.
- Pemotong kata & kalimat pakai `Intl.Segmenter` sesuai bahasa buku (`app.js` 115-128). Fallback ke regex bila tak ada.
- Font: Inter/Literata (Latin). Font Jepang/Korea ada (`--font-cjk`). Font Arab/Thai/Hindi: tidak ada, andalkan font sistem.
- Pengaturan baca punya rata kiri/kanan-kiri (justify), jarak baris, ukuran huruf.

## 5. Celah (tanpa ubah kode)
- Tak ada `dir="rtl"` / `lang` RTL di reader. Cari "rtl": nol hasil. Arab tampil kiri-ke-kanan: tanda baca & angka pecah, halaman geser kolom salah arah.
- `letter-spacing:.005em` dan `text-align:justify` + `hyphens:auto` di halaman baca (`style.css` 321). Berisiko untuk Arab & Hindi.
- Kunci kata `norm()` mempertahankan harakat (`app.js` 129). Kata sama dengan/tanpa harakat jadi dua kata berbeda di daftar.
- Tak ada tombol sembunyi harakat. Tombol "Cara baca" hanya untuk ja/ko/zh (`ui.js` 572).
- Tinggi baris diatur satu nilai untuk semua. Hindi/Thai butuh lebih longgar (#17-18).
- Pengecekan suara & skor ucap belum diuji untuk bahasa ini.
- Terjemahan Arab lewat gtx/MyMemory jalan secara teknis, tapi mutu kata tunggal belum diuji (H5).

## 6. Usulan 3 tugas developer kecil (urut prioritas)
1. **Arab/Ibrani benar arah (P0).** Pasang arah kanan-ke-kiri pada reader sesuai bahasa buku; pastikan geser halaman, popup, & tanda baca benar. Uji di iPhone Safari.
2. **Aman untuk Arab & Hindi (P0).** Matikan jarak huruf & rata kanan-kiri otomatis untuk Arab/Hindi/Thai; longgarkan tinggi baris; tambah font Noto per skrip.
3. **Tambah Thai & Hindi + tombol harakat (P1).** Masukkan ke daftar bahasa (Segmenter jalan sendiri); tombol "Tampilkan harakat" mati/nyala; samakan kata dengan/tanpa harakat.

Tugas riset berikut: uji 30 kata Arab/Hindi/Thai lewat gtx vs kamus (H5).

## 7. Kesimpulan
- "Untuk semua bahasa" belum benar untuk Arab: baca nyaman akan pecah.
- Thai & Hindi mudah ditambah; yang berat itu tampilan huruf dan arah.
- Kerjakan 2 tugas P0 dulu, baru buka Thai & Hindi.
