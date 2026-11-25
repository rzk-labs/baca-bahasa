# Riset #1799: Pengaturan terlalu banyak — perlu lipat "Lanjutan"?

## Intinya
- Pengaturan baca kini punya ±27 opsi dalam satu gulungan panjang. Pemula tak perlu hampir semuanya.
- Bukti publik: opsi jarang dipakai sebaiknya dilipat, dan default bagus lebih penting. Angka ">7" belum pasti.
- Usul: 7 opsi di atas, ±17 dilipat di "Lanjutan", 3 digabung atau dihapus. Mockup: `docs/mockup-1799.html`.

## 1. Daftar opsi sekarang (kode `ui.js` `openSettings`)
Kolom "Dipakai pemula" = **perkiraan** kami. Belum ada data pemakaian per opsi.

| # | Opsi | Default | Dipakai pemula |
|---|---|---|---|
| 1 | Tema (Kertas/Sepia/Hijau/Malam) | Kertas | Sering |
| 2 | Ukuran huruf | 17-18 px (per bahasa) | Sering |
| 3 | Huruf (Klasik/Modern) | Klasik | Jarang |
| 4 | Jarak huruf | Normal | Jarang |
| 5 | Rata teks | Kiri di HP | Jarang |
| 6 | Jarak baris | 1,6-1,8 (per bahasa) | Jarang |
| 7 | Margin halaman | Sedang | Jarang |
| 8 | Fokus baris | Mati | Jarang |
| 9 | Cara baca di atas kata (hanya JA/KO/ZH) | Mati (ZH: semua) | Sedang |
| 10 | Siapkan arti bab (tanpa sinyal) | — (tombol) | Jarang |
| 11 | Tandai kata sering diketuk | Nyala | Jarang |
| 12 | Baca polos | Mati | Jarang |
| 13 | Intip kata bab | Nyala | Sedang |
| 14 | Jelaskan kalimat (AI) | Nyala | Jarang |
| 15 | Tampilkan cara baca | Nyala | Jarang |
| 16 | Cara baca di kartu ulang | Ketuk dulu | Jarang |
| 17 | Laju suara | Normal | Jarang |
| 18 | Lanjut otomatis (dengar) | Mati | Jarang |
| 19 | Bar progres | Nyala | Jarang |
| 20 | Ketuk tepi ganti halaman | Nyala | Jarang |
| 21 | Layar tetap menyala | Nyala | Jarang |
| 22 | Bunyikan kata otomatis (kartu ulang) | Mati | Sedang |
| 23 | Efek suara | Nyala | Jarang |
| 24 | Bahasa cerita ini | Bahasa buku | Sedang |
| 25 | Suara baca cerita ini | Otomatis | Jarang |
| 26 | Artiin ke (bahasa arti) | Indonesia | Sering |
| 27 | Target baca harian | 5 menit | Sedang |

Di luar itu: pengingat, cadangan akun, versi app, aturan, tombol reset, 5 tombol penanda (saat membaca).

Temuan dari kode:
- Blok "Aplikasi" muncul **dua kali** (versi + muat ulang ganda).
- Ada **tiga** opsi "cara baca" (#9, #15, #16) dengan nama mirip.
- Tombol "Balikin setelan awal" tidak mengembalikan semua opsi (mis. #13, #14, #17-#23 tidak ikut).
- Semua opsi satu gulungan; pratinjau teks di atas ikut memanjang.

## 2. Bukti publik (42 butir, 7 sumber)
Reddit & Threads/X tak terbaca oleh pencarian kami. Readlang tak muncul sama sekali.

**A. Nielsen Norman Group — [Progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/)**
1. Tampilkan hanya opsi terpenting dulu; sisanya saat diminta.
2. Pemula lebih sedikit salah dan hemat waktu.
3. Pengguna mahir tak perlu menyisir opsi yang jarang dipakai.
4. Kekhawatiran "pengertian jadi dangkal" tidak terbukti; fokus malah membantu paham.
5. Yang masuk lapis kedua: pengaturan jarang dipakai.
6. Yang jadi utama: hasil analisis tugas & data pemakaian.
7. Tombol pembuka harus terlihat; labelnya jujur soal isinya.
8. Lebih dari 2 lapis biasanya membuat pengguna tersesat.

**B. Panduan Android/Material — [Settings](https://developer.android.com/design/ui/mobile/guides/patterns/settings)** dan [Material 1](https://m1.material.io/patterns/settings.html)
9. Pengaturan harus "jumlah yang terkelola".
10. Isi pengaturan dengan preferensi yang jarang diakses.
11. Aksi yang sering dipakai taruh di fitur terkait, bukan di Pengaturan.
12. Default harus pilihan kebanyakan orang, aman, tidak mengganggu.
13. Jika banyak, utamakan yang terpenting; sisanya satu layar terpisah.
14. 15+ pengaturan: kelompokkan ke sub-layar.
15. Info versi app jangan di Pengaturan.
16. Jangan ulang pengaturan yang sudah ada di sistem HP.

**C. Apple — [HIG Settings](https://developer.apple.com/design/human-interface-guidelines/settings.md)**
17. Default yang tepat membuat orang tak perlu mengatur apa pun.
18. "Minimize the number of settings you offer."
19. Terlalu banyak pengaturan membuat app kurang ramah dan sulit dicari.
20. Opsi yang jarang diubah masuk area pengaturan, bukan jalur utama.

**D. Jared Spool / UIE — [Do users change their settings?](https://archive.uie.com/brainsparks/2011/09/14/do-users-change-their-settings/)**
21. Kurang dari 5% pengguna mengubah satu pun dari 150+ pengaturan Word.
22. Lebih dari 95% memakai default bawaan.
23. Pengguna menganggap default dipilih dengan alasan bagus, padahal sering asal.
24. Desainer/programmer mengubah sampai 40-80% opsi; jangan samakan dengan pembaca biasa.

**E. Pilihan berlebih & pedoman umum**
25. [Studi privasi CMU 2025](https://cylab.cmu.edu/news/2025/11/14-beyond-the-fine-print.html): peserta paling suka 3-7 pengaturan per layar.
26. [Smashing Magazine](https://smashingmagazine.com/2011/11/easier-is-better-than-better): mengutip angka Spool, 5% mengubah default.
27. [Meta-analisis Scheibehenne 2010](https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf): 50 percobaan, efek rata-rata mendekati nol.
28. Efek "terlalu banyak pilihan" bergantung konteks; orang yang sudah punya selera tak terganggu.
29. [Studi JMIR 2025](https://humanfactors.jmir.org/2025/1/e71165/PDF): terlalu banyak pilihan bisa menurunkan keterlibatan, terutama orang cemas.
30. [Toptal](https://www.toptal.com/designers/ux/settings-ux): taruh yang sering dipakai di depan; sisanya sub-halaman.
31. [UX Magazine](https://uxmag.com/design/control-dialing-in-the-digital-experience): tab "Umum" dulu, "Lanjutan" di akhir agar pemula tak kewalahan.
32. [Jurnal default 58 studi (lewat SoK keamanan)](https://arxiv.org/pdf/2412.17329): efek default bervariasi; beberapa studi tak ada efek.

**F. Aplikasi baca & belajar bahasa**
33. [LingQ forum](https://forum.lingq.com/t/advice-for-a-lingq-beginner/32866): pemula disarankan abaikan fitur lain, belajar satu tampilan dulu.
34. [LingQ forum](https://forum.lingq.com/t/i-am-a-beginner-can-i-use-lingq/6917): "tak harus pakai semua fungsi di awal".
35. [Panduan LingQ](https://lingtuitive.com/blog/ultimate-lingq-settings): beberapa setelan bawaan bisa merusak pengalaman jika dibiarkan.
36. [LingQ forum](https://forum.lingq.com/t/first-time-user-experience/31395): pengaturan ulasan membingungkan; usul default mati.
37. [LingQ forum](https://forum.lingq.com/t/why-lingq-needs-a-beginner-mode/70600?page=2): pengalaman pengguna baru "sangat buruk", banyak yang tersesat.
38. [Lingopie](https://lingopie.com/blog/lingq-review/): pemula dilempar ke konten asli dan harus cari tahu sendiri.
39. [Kindle iOS: menu Aa](https://digprjsurvey.amazon.co.uk/csad/help/node/TABlJ4ot69emTO8jJG): semua opsi baca dikumpulkan di satu menu "Aa" dengan tab.
40. [MacRumors](https://forums.macrumors.com/threads/how-to-simplify-kindle-for-ipados-13.2230633): pengguna minta "menyederhanakan" Kindle; pasangan merasa terlalu rumit.
41. [Readwise docs](https://docs.readwise.io/reader/guides/workflows/longform-reading): Readwise sendiri bilang pengaturannya bisa terasa menakutkan.
42. [Product Hunt](https://www.producthunt.com/p/readwise/readwise-reader?page=6): komentar menyebut Reader sibuk dan membingungkan.

Catatan jujur: butir 37 soal panduan, bukan soal jumlah opsi. Beberapa angka dari ringkasan pencarian, bukan dibaca penuh.

## 3. Vonis hipotesis
| Hipotesis | Vonis | Dasar |
|---|---|---|
| H1: opsi >7 membuat pemula bingung | **Sebagian terbukti** (angka 7 belum pasti) | CMU: 3-7 per layar (#25), Android: >10-15 berat; meta-analisis lemah (#27) |
| H2: opsi jarang dipakai sebaiknya dilipat | **Terbukti** | NN/g, Android, Apple, UIE (#1-#5, #10, #20, #21) |
| H3: default bagus lebih penting dari opsi | **Terbukti sebagian** (condong benar) | 95% tak ubah (#22); efek default bervariasi (#32) |

- H1: tak ada studi tentang pengaturan baca; ambang 7 hanya pegangan praktis.
- H2: syaratnya benar-benar jarang. Kita belum punya data pemakaian per opsi.
- H3: bukti kuat soal perilaku, lemah soal "lebih penting dari opsi".

## 4. Rekomendasi
**Tetap di atas (7):**
- Tema, Ukuran huruf, Artiin ke, Bahasa cerita ini.
- Cara baca di atas kata (hanya buku JA/KO/ZH).
- Target baca harian, Pengingat.

**Masuk "Lanjutan" (dilipat, tertutup saat dibuka):**
- Tampilan: Huruf, Jarak huruf, Rata teks, Jarak baris, Margin, Fokus baris.
- Bantuan kata: Tandai kata sering, Baca polos, Intip kata bab, Jelaskan kalimat (AI), Siapkan arti bab.
- Suara & kartu ulang: Cara baca kartu ulang, Laju suara, Lanjut otomatis, Bunyikan otomatis, Suara baca, Efek suara.
- Layar: Bar progres, Ketuk tepi, Layar menyala.
- Tombol "Balikin setelan awal" ikut di dalam Lanjutan.

**Gabung / hapus:**
- Hapus blok "Aplikasi" yang ganda; sisakan satu, versi app pindah ke bawah.
- Gabung "Tampilkan cara baca" ke satu opsi "Cara baca" bersama #9 dan #16.
- Perbaiki "Balikin setelan awal" agar mengembalikan semua opsi.

**Aturan uji untuk developer:**
1. Saat Pengaturan dibuka: maks 7 opsi terlihat sebelum gulung.
2. Lanjutan tertutup secara default; judulnya tampilkan jumlah ("Lanjutan · 17").
3. Maks 2 lapis. Tak ada lipatan di dalam lipatan.
4. Opsi baru wajib punya default dan alasan; tanpa itu, jangan ditambah.
5. Tiap opsi lolos 3 tanya: dipakai pemula? aman bila default? bisa dikerjakan tanpa opsi?
6. Nama opsi tak boleh mirip opsi lain.
7. Tombol Lanjutan: `aria-expanded`, area ketuk ≥44px.
8. Cek HP 360px dan layar lebar; data pengguna lama tak berubah.
9. Setelah Reset, semua opsi kembali ke default.

## 5. Langkah berikutnya
- Developer bangun lipat "Lanjutan" (backlog #186).
- Setelah live: catat berapa % pembaca membuka Lanjutan, untuk menguji daftar ini.
- Wawancara manusia nanti hanya penguat.
