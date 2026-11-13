# Riset #846: EPUB Jepang tulisan tegak (tategaki) di layar HP

## Intinya
- Aman soal urutan: tegak itu hanya gaya tampilan; urutan teks di file tetap sama.
- Celah nyata ada di huruf: huruf "mirip" (⽂ bukan 文) dan huruf berupa gambar tidak ikut bersih.
- Pembelajar memang menjadikan teks mendatar demi ketuk-kata, tapi "lebih suka" belum terbukti kuat.

## 1. Temuan di kode (`parseEpub`, app.js ~355-386)
- Urutan baca = urutan `itemref` di file buku. `writing-mode` tidak dibaca sama sekali.
- Tegak hanya CSS (Apple: "Text direction (horizontal and vertical) is defined by the CSS `writing-mode` property."). Teksnya tetap berurutan.
- Arah balik halaman (`page-progression-direction="rtl"`) tak dipakai; urutan bab tetap benar.
- Ruby: `<rt>/<rp>/<rtc>` dibuang (sudah dikerjakan, lihat `riset-furigana-ruby-epub.md`).
- Angka tegak (縦中横) hanyalah angka biasa di teks; tidak berubah saat dijadikan mendatar.
- Tidak ada normalisasi huruf (NFKC) saat impor; `norm` hanya NFC dan dipakai untuk kata, bukan teks buku.
- Teks di luar `p/h/li/blockquote/pre` hilang bila halaman punya satu `<p>` saja. Jarang, tapi mungkin.
- Gambar huruf langka (gaiji) tidak jadi teks, jadi ada huruf hilang di tengah kalimat.
- Tidak mengulang: potong kata (`riset-pemotongan-kata-jp-kr.md`), RTL (`riset-bahasa-rtl-thai-hindi.md`), impor ganda (`riset-impor-andal.md`).

## 2. Bukti internet (26 kutipan, 7 jenis sumber)
Jenis: forum aplikasi baca, forum pembaca e-book, dokumen resmi, spesifikasi W3C, survei pemerintah, blog, halaman App Store, forum komunitas belajar.
Tak bisa dibuka: Reddit (mirror gagal: koneksi ditolak, sertifikat error), Kobo/Kindle (tak ada dokumen terbuka), Hacker News (tak ketemu utas relevan), README GitHub (hanya deskripsi singkat).
Catatan: kutipan di tanda kutip diambil dari halaman yang dibuka; butir "(hasil cari)" hanya dari ringkasan hasil pencarian.

| # | Sumber | Kutipan | Dukung |
|---|---|---|---|
| 1 | [LingQ, MegLu, 3 Mei 2024](https://forum.lingq.com/t/on-how-to-import-japanese-%E7%B8%A6%E6%9B%B8%E3%81%8D-ebooks/416394) | "I failed several times to import Japanese ebooks yesterday." | H3 |
| 2 | sama | "Then i realized that was because they were in 縦書き form" | H3 |
| 3 | sama | "I then figured out how to covert the 縦書き book to 横書き books via caliber" | H2 |
| 4 | sama | "After this, you should have a 横書き book to import to LingQ." | H2 |
| 5 | [LingQ: karakter hilang](https://forum.lingq.com/t/japanese-importing-bug-missing-characters-semi-resolved/1106468) | "there are lots and lots of characters which are visible but cannot be selected in order to see their definition or reading." | H3 (celah) |
| 6 | sama | "Every sentence has usually at least 1 missing character." | H3 (celah) |
| 7 | sama | Pengguna mengganti huruf mirip "⽂ → 文" dan "Removed hidden formatting characters"; masalah muncul di PDF, EPUB, dan teks salin. | H3 (celah) |
| 8 | sama | "Copying from the Kindle desktop app never caused it." (sekitar separuh bukunya kena) | H3 |
| 9 | [LingQ: tata letak](https://forum.lingq.com/t/japanese-paragraph-layout-new-bugs-fix/32175) | Zoran: "Formatting is an issue, and v5.0 will hopefully solve it for good." | H3 |
| 10 | [MobileRead, Grinchy](https://www.mobileread.com/forums/showthread.php?t=299668) | "the Vertical Text and Right to Left are gone." (setelah konversi) | H1 |
| 11 | sama, markvdvelde | "the text is always converted to horizontal." | H1 |
| 12 | sama, jhowell | "Amazon's KF8 (azw3) format supports vertical text, but the old MOBI-7 format does not." | H1 |
| 13 | sama, elipsett | Atribut `<spine page-progression-direction="rtl" toc="ncx">` hanya mengatur sisi tombol maju halaman. | H1/H3 |
| 14 | [Apple Books Asset Guide](https://help.apple.com/itc/booksassetguide/en.lproj/itc7e9ec52f7.html) | "Each content document can support a single `writing-mode` value." | H1 |
| 15 | sama | "Text direction (horizontal and vertical) is defined by the CSS `writing-mode` property." | H3 |
| 16 | [W3C: teks tegak](https://www.w3.org/International/articles/vertical-text/) | "Lines start at the right side of the figure box and progress to the left." | H3 |
| 17 | sama | "Use text-combine-upright with the all value to combine multiple horizontal characters in a single vertical space." | H3 (angka) |
| 18 | [Zotero](https://forums.zotero.org/discussion/comment/471197/) | "Vertical EPUBs should work in Scrolled mode (View -> Scrolled)." Mode halaman bermasalah karena "layout engine limitations". | H1 |
| 19 | [Bunpro: baca pemula](https://community.bunpro.jp/t/getting-started-with-reading/160891) | "most reading material that's suitable for beginners is presented vertically." (Albaby305) | H2 |
| 20 | sama, hx9 | "If you're working with an epub file, you can use an app like this one to turn them horizontal." | H2 |
| 21 | sama, hx9 | "Added bonus of language-based browser extensions working." | H2 |
| 22 | [Bunpro: e-reader](https://community.bunpro.jp/t/anyone-have-experience-with-e-readers/31498) | Asher soal Moon+ Reader: "Vertical text still doesn't work, but I can live without that." | H2 |
| 23 | [WaniKani: Hibiki](https://community.wanikani.com/t/hibiki-reader-a-reading-app-for-japanese-learners-with-original-graded-stories-full-epub-support-and-word-tracking/74525) | "Yes, we support switching between horizontal and vertical text direction." | H2 |
| 24 | [App Store: Shiori Reader](https://apps.apple.com/kh/app/shiori-reader/id6744979827) | "Vertical & horizontal reading in both scroll and paginated modes" dan "One-tap dictionary lookup" | H2 |
| 25 | [Learn with Oliver (blog)](https://learnwitholiver.com/japanese/blog-post-2) | "younger generations in particular may feel like yokogaki is easier to read." | H2 |
| 26 | [nippon.com (survei Badan Kebudayaan, 2025)](https://www.nippon.com/en/japan-data/h02919/) | "67.3% of respondents indicated that they either “often” or “sometimes” have the opportunity to read and write tategaki." Usia 20-an: 54,8%. | H2 |

Tambahan (hasil cari, tanpa kutipan persis): r/LearnJapanese, pembaca N2 mengaku cepat membaca mendatar tapi sulit membaca tegak. Tidak bisa dibuka langsung.

## 3. Vonis 3 hipotesis
| # | Hipotesis | Vonis | Alasan |
|---|---|---|---|
| H1 | Pembaca yang menampilkan teks mendatar tetap membaca isinya benar (tegak hanya tampilan) | Terbukti | #10-18: tegak = CSS; urutan teks tak berubah; yang hilang hanya tata letak |
| H2 | Pembelajar asing lebih suka teks mendatar saat ketuk-kata | Belum jelas | Ada jalan pintas ke mendatar (#3, #20, #21), tapi banyak app malah menambah mode tegak (#23, #24); tak ada survei |
| H3 | Impor Keepo (teks polos, mendatar) aman dari salah urutan, ruby, angka tegak | Terbukti sebagian | Urutan, ruby, angka aman; celah: huruf mirip & gaiji (#5-7), teks di luar `<p>` |

## 4. Usulan kecil untuk developer (item backlog #81)
- Saat impor EPUB: ubah huruf mirip ke huruf biasa (NFKC pada teks; hati-hati jangan ubah tanda baca Jepang penting).
- Pakai teks cadangan untuk halaman yang `<p>`-nya sedikit tapi teks di luar `<p>` banyak.
- Buat EPUB uji tegak kecil (ruby, angka tegak, `rtl`, gaiji, `<br>`) dan cek hasil impor.
- Tidak perlu: mengubah urutan baca, membaca `writing-mode`, atau mode tampilan tegak (di luar cakupan beta).

## 5. Status tahap
- Tahap validasi terkait (MVP/impor, milestone 2) sudah "selesai"; tidak ada yang perlu dinaikkan.
- Bukti ini menambah jaminan untuk risiko impor Jepang sebelum beta.

## 6. Langkah berikutnya
- Developer kerjakan #81 (kecil, satu fungsi pembersih).
- Setelah itu, coba satu EPUB Jepang asli bila ada (founder tak perlu turun tangan).
