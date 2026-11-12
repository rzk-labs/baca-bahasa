# Riset: Baca malam & offline (#349)

Tanggal: 12 Nov 2026. Peran: riset. (validasi bukti internet)

## Intinya
- Tema gelap/sepia/Ikut HP **sudah ada** di Keepo. Studi: terang sering lebih cepat dibaca, gelap lebih nyaman.
- Offline cuma sebagian: baca buku impor jalan, arti kata baru butuh sinyal.
- Aturan validasi terpenuhi: 46 bukti, 6 jenis sumber, 6 hipotesis divonis.

## 1. Yang SUDAH ada di Keepo (cek kode, tidak diubah)
- Tema: Terang, Sepia, Gelap, Ikut HP di Pengaturan; tombol cepat di e-reader (`ui.js` 222, 513).
- Warna tema di `style.css` 28-45; warna bilah browser ikut tema (`ui.js` 50).
- Saran malam: chip "Mata capek? Pakai tema gelap" jam 19-05 (`ui.js` 497).
- Offline: `sw.js` menyimpan app; buku di IndexedDB; lencana "Offline" di reader.
- Kata tersimpan tetap terbuka offline; "Kata hari ini" juga offline (`ui.js` 320).
- Sinyal lemah: batas waktu terjemahan, pesan + tombol "Coba lagi" (`ui.js` 759, 819; `app.js` 274).
- Belum ada: unduh arti kata dulu, antrean ketukan, simpan kata saat offline tanpa arti.

## 2. Bukti (46 kutipan, 6 jenis sumber)
Jenis: (A) studi & riset UX, (B) dokumen resmi produk, (C) forum kompetitor, (D) komentar pembaca di blog, (E) ulasan/ pers teknologi, (F) berita/penjelasan sinyal kereta.
Catatan: Reddit, Play Store, Threads/X tidak bisa dibuka. Beberapa kutipan dari ringkasan mesin pencari (ditandai "ringkasan").

### A. Studi & riset UX (12)
1. [NNG](https://www.nngroup.com/articles/dark-mode/): "In users with normal vision, light mode leads to better performance most of the time."
2. NNG: "during nighttime, light mode led to better performance than dark mode."
3. NNG: "the smaller the font, the better it is for users to see the text in light mode."
4. NNG: "some users simply like dark mode better."
5. [Google/Readability Matters](https://readabilitymatters.org/articles/research-highlight-how-bold-can-we-be): "dark text on a light background (Light Mode) is read reliably faster than its polar opposite (Dark Mode)."
6. Sama: "We found an effect of mode for both glance and paragraph reading."
7. Sama: "Through two studies with a total of 459 participants."
8. NNG (ringkasan, [Built In/Slashdot](https://tech.slashdot.org/story/20/02/16/2041240/)): performa lebih baik di mode terang, tapi persepsi keterbacaan tak beda.
9. NNG (ringkasan): pengguna katarak/penglihatan rendah bisa lebih nyaman di mode gelap.
10. [Studi pelacak mata 2025](https://eprints.whiterose.ac.uk/id/eprint/231852/7/The%20dark%20side%20of%20the%20interface%20%20examining%20the%20influence%20of%20different%20background%20modes%20on%20cognitive%20performance.pdf) (ringkasan): pupil lebih membesar di mode gelap, tapi beban terasa lebih ringan.
11. [Chang dkk., PNAS](https://hms.harvard.edu/news/e-readers-foil-good-nights-sleep) (ringkasan): 12 orang; baca di iPad malam menunda tidur & menekan melatonin.
12. Sama: jam tubuh pembaca iPad mundur >90 menit; Kindle tanpa lampu tak begitu.

### B. Dokumen resmi produk (8)
13. [Libby](https://help.libbyapp.com/en-us/6046.htm): "By default, Libby automatically uses the lighting mode your device is set to."
14. Libby: "if your device is in dark mode, Libby's reader will be in dark mode too."
15. Libby: pilihan manual Bright / Sepia / Dark per buku.
16. [OverDrive](https://company.overdrive.com/2019/10/17/libby-dark-mode/): "Being able to relieve the strain on our eyes was quite an exciting development."
17. OverDrive: mode gelap ditambah setelah iOS 13 membuat ganti mode gelap mudah.
18. [Readwise Reader](https://docs.readwise.io/reader/docs/faqs/appearance): 6 tema (Crisp, Sepia, Soft, Slate, Ink, Night), tiap tema ada versi terang & gelap.
19. [Readwise Des 2025](https://readwise.io/reader/update-dec2025): semua dokumen disimpan di perangkat "so that when you go offline, you can still read them."
20. [Moon+ Reader](https://wiki.mobileread.com/wiki/Moon+ Reader): 10+ tema bawaan + tombol Day & Night.

### C. Forum kompetitor, LingQ (9)
21. [Forum LingQ](https://forum.lingq.com/t/using-lingq-offline-not-possible/519211): "But that worked very fine before! So what happened???"
22. Sama: "A possible solution is never closing the app."
23. Sama: "I've met the same offline issue yesterday, althow my app was not closed ;("
24. [Forum LingQ](https://forum.lingq.com/t/reading-offline-problematic/2419343): "it keeps loading and loading and nothing appears on the screan."
25. Sama: "the app doesn't do shortcuts so this is a non-starter." (travel alasan utama belajar)
26. Sama: "I go through it before flights (typically at the airport) and it works." Frasa multi-kata tak bisa ditambah offline.
27. [Forum LingQ](https://forum.lingq.com/t/preparing-for-a-long-flight-can-i-use-lingq-completely-offline/240924): "It is super finicky and it won't keep all your lessons loaded."
28. Sama: "the only function of LingQ, which I consider functions properly is listening to the playlist."
29. Sama: "But I was happy to pay $8 on my most recent South West flights to get full internet." (ringkasan: kata yang belum pernah disimpan tak punya arti offline)

### D. Komentar pembaca e-reader ([blog The eBook Reader](https://blog.the-ebook-reader.com/2021/12/15/dark-mode-or-warm-light-which-one-do-you-prefer/)) (11)
30. "Love the warm light, never use dark mode."
31. "Dark Mode, no doubt. I have insomnia."
32. "I love Dark Mode, especially on Kobo."
33. "Warm front light, my eyes don't like dark mode."
34. "Dark mode gives me a headache, I'm not kidding, a really bad headache from it."
35. "Both. This is the way."
36. [Blog lain](https://blog.the-ebook-reader.com/2021/01/12/how-often-do-you-use-the-warm-frontlight-on-your-ereader/): "Every night I use the warm light on my Oasis 3 or Note Air. Helps me sleep better."
37. "by the time I'm reading just before bed it's quite orange."
38. "I have also used mostly warm light if I'm ever reading in the dark."
39. "But it is usually at night so I'll add a bit of warmth."
40. "I don't like to use the sepia background available in the Kindle app."

### E. Ulasan & pers teknologi (4)
41. [Duolingo Plus, Lev Lafayette](https://levlafayette.com/node/540): "the ability to do lessons offline and have them sync later seemed ideal."
42. Sama: "none of the 2000+ points I had accumulated offline were synced."
43. Sama: "The application had effectively become 'offline only'."
44. [Readwise (ringkasan r/readwise 2025)](https://docs.readwise.io/reader/docs/faqs/appearance): pengguna berulang minta sepia untuk iPad; staf mengakui pilihan tema masih kurang.

### F. Berita/penjelasan sinyal kereta (2)
45. [Binus](https://binus.ac.id/bekasi/2025/03/kenapa-sinyal-internet-sering-hilang-saat-naik-kereta-cepat-ini-penjelasannya/) (ringkasan): kabin kereta mirip sangkar Faraday, sinyal turun begitu duduk.
46. Sama: pindah menara gagal bikin koneksi putus sesaat/hilang. (Ini kereta cepat; KRL belum ada data khusus.)

## 3. Vonis hipotesis
1. **"Pembaca butuh tema gelap untuk baca malam"** → **Terbukti (sebagian).** Kutipan 4, 16, 31-34: suka gelap, tapi terbelah.
2. **"Gelap lebih mudah dibaca daripada terang"** → **Gugur.** Kutipan 1-3, 5-6: terang lebih cepat, apalagi teks kecil.
3. **"Sepia dibutuhkan"** → **Belum jelas.** Hanya 1 komentar menolak, 1 permintaan; tak ada studi sepia kuat.
4. **"Baca offline buku yang sudah diimpor dianggap wajib"** → **Terbukti.** Kutipan 19, 24-26, 41: pengguna marah saat offline gagal.
5. **"Terjemahan butuh sinyal itu keluhan nyata"** → **Terbukti sebagian.** Kutipan 26, 29 (LingQ); Raka & Bima (tester) sama; data KRL Indonesia belum ada.
6. **"Tampilan malam harus ikut HP otomatis"** → **Terbukti.** Kutipan 13-14, 17-18: Libby & Readwise melakukannya.

Tiga hal yang kuat: pilihan tema (bukan satu tema), offline jangan rapuh, jangan paksa mode gelap.

## 4. Kesimpulan
- Keepo sudah punya tema yang dibutuhkan; jangan tambah tema, jangan ubah bawaan jadi gelap.
- Celah nyata: offline untuk arti kata baru dan kejelasan "mana yang sudah aman offline".
- Celah kecil: layar di luar reader (Home, Kata) mungkin tetap terang saat malam.

## 5. Usulan tugas app (urut P0)
1. **Siapkan arti dulu:** unduh arti kata buku saat ada sinyal (pakai Wi-Fi), agar offline tetap berarti.
2. **Ketuk offline tanpa error:** simpan kata dengan tanda "arti nyusul" + batasi antrean terjemahan beruntun.
3. **Uji malam & offline di HP:** cek semua tab (bukan cuma reader) di tema gelap/sepia dan mode pesawat.

## 6. Batas riset
- Reddit, Play Store, Threads/X tidak terbuka; 7 bukti dari ringkasan mesin pencari.
- Tidak ada studi sepia spesifik; tidak ada data sinyal KRL.
- Wawancara pembaca KRL jadi penguat nanti.
