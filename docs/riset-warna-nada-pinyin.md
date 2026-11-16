# Riset: warna nada pinyin & buta warna (#1205)

## Intinya
- Warna nada saja tidak cukup: studi terbaik malah menilai warna paling lemah.
- Warna saja gagal untuk buta warna (±4–8% pria). Pedoman WCAG 1.4.1 melarangnya.
- Usul: tetap warna, tambah angka kecil nada, palet aman buta warna, legenda 1–4.

## 1. Konteks
- Kartu ulang mewarnai suku kata pinyin per nada (`style.css` baris 336).
- Palet lama: nada 1 merah, 2 hijau, 3 biru, 4 ungu, netral abu.
- Merah vs hijau = pasangan yang paling sering tertukar buta warna.
- Catatan: pinyin Keepo sudah punya tanda diakritik (ā á ǎ à). Tapi kecil dan nada netral tak bertanda.
- Tester Tari: buta warna tak bisa bedakan. Pengguna Sinta: minta penjelasan warna 1–4.

## 2. Bukti (38 butir, 6 jenis sumber)
Jenis: **S** studi, **P** pedoman/standar, **D** data kesehatan, **F** forum/komunitas, **B** blog praktisi, **A** dokumentasi aplikasi/add-on.

### Studi belajar nada
1. **S** Godfroid, Lin & Ryu 2017 (303 pemula, 3 minggu): angka & kontur nada sedikit lebih baik dari warna. [HKU](https://hub.hku.hk/handle/10722/244254)
2. **S** Studi sama: warna + angka/kontur tidak lebih baik dari satu isyarat saja. [Zendy](https://zendy.io/title/10.1111/lang.12246)
3. **S** Ringkasan Hacking Chinese: warna terlemah, terutama di tes tunda. Peserta suka warna, tapi skornya lebih rendah. [Hacking Chinese](https://hackingchinese.com/does-using-colour-to-represent-mandarin-tones-make-them-easier-to-learn/)
4. **S** Dias de Oliveira Santos 2015 (gender kata Jerman): warna tidak membantu. Bukan Mandarin, tapi sejalan. (lewat butir 3)
5. **S** Lundelius 1991: ejaan nada 86,9% vs pinyin biasa 70,9% di ujian. Kecil dan lama. [Illinois](https://www.ideals.illinois.edu/items/23066)
6. **S** Showalter & Hayes-Harb 2013: tanda nada membantu belajar kata baru. (lewat butir 7)
7. **S** Chang 2018: diakritik mengungguli angka untuk belajar kata bernada. [Liu & Wiener 2021](https://www.andrew.cmu.edu/user/swiener/lapp/Liu_Wiener2021.pdf)
8. **S** Shu dkk. 2024 (Kanton): pelajar paling lama menatap huruf nada; isyarat visual eksplisit membantu. [PolyU](https://ira.lib.polyu.edu.hk/bitstream/10397/118784/1/shu26_speechprosody.pdf)
9. **S** Penjelasan Picky Birds (Ryu): nada tinggi = warna terang. Klaim pembuat game, belum diuji independen. [Michigan Public](https://www.michiganpublic.org/post/colors-and-tones-msu-researcher-s-game-gives-your-brain-tools-learn-mandarin)

### Pedoman & standar
10. **P** WCAG 1.4.1 (Level A): warna tak boleh jadi satu-satunya tanda informasi. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
11. **P** W3C Intent: beri info warna lewat cara visual lain (bentuk, teks, ikon).
12. **P** W3C teknik G14: info warna harus ada juga dalam teks. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
13. **P** W3C teknik G111: pakai warna + pola. (sumber sama)
14. **P** Okabe–Ito / Wong 2011 (Nature Methods): palet 8 warna aman buta warna. [Nature Methods](https://www.nature.com/articles/nmeth.1737.pdf)
15. **P** Game Accessibility Guidelines: jangan andalkan warna tetap saja. [GAG](https://gameaccessibilityguidelines.com/ensure-no-essential-information-is-conveyed-by-a-fixed-colour-alone/)
16. **P** Panduan DAISY (penerbitan): "use of color" jadi syarat aksesibel. [DAISY](https://kb.daisy.org/publishing/docs/wcag/use-of-color.html)

### Data buta warna
17. **D** ±8% pria (1 dari 12), ±0,5% wanita. [News-Medical](https://www.news-medical.net/health/Color-Blindness-Prevalence.aspx)
18. **D** Asia Timur lebih rendah: ±4–6% pria (ringkasan sumber umum). [Vision Center](https://www.visioncenter.org/?p=55329)
19. **D** 17.303 mahasiswa baru China: 4,11% pria, 0,16% wanita. [Int J Ophthalmol 2023](https://gjyk.ijournals.cn/gjyken/article/abstract/20230923)
20. **D** Anak SD Anyang: 2,81% laki-laki. [Invest Ophthalmol Vis Sci 2022](https://rcastoragev2.blob.core.windows.net/b16345fc2ca22b362ad2bb0636e21b1d/PMC8819485.pdf)
21. **D** Survei China (kutipan sekunder): 6,5% pria. Belum terverifikasi. [Shine](https://shine.cn/feature/lifestyle/2108274147)

### Forum & komunitas
22. **F** Skritter: "Untuk sebagian orang warna lebih nempel daripada tanda nada." [Skritter](https://forum.skritter.com/t/tone-color-coding/3452)
23. **F** Skritter: "Aku susah belajar nada, mau tone color." (sumber sama)
24. **F** Skritter: pengguna minta palet bisa dipilih + tombol on/off. Tak ada yang menyebut buta warna. (sumber sama)
25. **F** Pleco: pengembang bilang warna bawaan bikin bingung pemula ("warna ini artinya apa?"), jadi default mati. [Pleco Forums](https://www.plecoforums.com/threads/coloring-disabled-default.9432/)
26. **F** Pleco: pengguna "warna di mana-mana terlalu ramai", merah/ungu terlalu keras. (sumber sama)
27. **F** Pleco Solarized: kuning dan hijau terlalu mirip; pengguna ganti nada 3. [Pleco Forums](https://www.plecoforums.com/threads/pleco-solarized-color-scheme-easier-on-the-eyes.4542/)
28. **F** Pleco→Anki: mode gelap membalik warna sampai nada salah warna. [Pleco Forums](https://plecoforums.com/threads/pleco-anki-flashcards-tone-colors-do-not-work.7147/)
29. **F** Chinese-Forums: orang Tiongkok belajar nada sebagai bunyi utuh; pinyin bisa jadi penopang. [Chinese-Forums](https://www.chinese-forums.com/forums/topic/57373-audio-vs-pinyin/?page=2)

### Blog praktisi
30. **B** Hacking Chinese: sistem warna kacau; separuh pakai oranye/kuning untuk nada 2, separuh hijau. (sumber butir 3)
31. **B** Hacking Chinese: penulis lebih suka tanda nada; warna "mustahil diabaikan". [Hacking Chinese](https://www.hackingchinese.com/focusing-on-mandarin-tones-without-being-distracted-by-pinyin/)
32. **B** Gabor: Pleco, Hanping, MDBG beda skema; kedua skema andalkan merah vs hijau, masalah buta warna merah-hijau. [aka-gabor](https://aka-gabor.xyz/texts/color-temperature-of-mandarin-tones)
33. **B** Pelajar En Route to Fluency: warna "pengingat visual cepat", tapi untuk pemula bisa menambah beban. [Blog](https://zhongruige.wordpress.com/2016/07/02/on-tone-colors/)
34. **B** Substack: warnai vokal saja, bantu persepsi nada. [Substack](https://improvingability.substack.com/p/pinyin-vowel-tone-mapping)
35. **B** Duolingo: pinyin berguna karena tiap nada punya simbol sendiri. [Duolingo](https://blog.duolingo.com/chinese-tones)

### Dokumentasi aplikasi
36. **A** Hanzi Annotator (Firefox): nada bisa ditampilkan warna, garis bawah, titik, atau halo; ada palet aman buta warna. [Mozilla](https://addons.mozilla.org/en-US/android/addon/hanzi-annotator/)
37. **A** Chinese Support Redux (Anki): skema tetap merah/oranye/hijau/biru/abu, tanpa opsi buta warna di README. [GitHub](https://github.com/jdlorimer/chinese-support-redux)
38. **A** Pleco 4.0: warna nada bisa diubah per nada. (sumber butir 25–28)

Catatan jujur: tak ada studi langsung "warna nada vs buta warna". Forum Skritter & Pleco tak menyebut buta warna: itu bukan bukti masalahnya tak ada. Beberapa butir (4, 6, 21) kutipan tak langsung; butir 14–16 dan 18 dari ringkasan pencarian, belum dibaca penuh.

## 3. Vonis hipotesis
| # | Hipotesis | Vonis | Alasan singkat |
|---|---|---|---|
| 1 | Warna bantu pemula ingat nada | **Belum jelas** | Komunitas suka (22–23, 33). Studi: warna terlemah (1–3). |
| 2 | Warna saja gagal untuk buta warna | **Terbukti** | WCAG (10–13), data 4–8% (17–21), flag (32). |
| 3 | Tanda/angka + warna lebih baik | **Gugur** untuk hasil belajar | Dua isyarat tak lebih baik (2). Tetap dipakai demi aksesibilitas. |
| 4 | Legenda 1–4 singkat cukup | **Belum jelas** (condong ya) | Pleco: "warna ini artinya apa?" (25). Belum ada uji legenda. |
| 5 | Palet merah/hijau/biru/ungu bermasalah | **Terbukti** | Skema serupa dinilai bermasalah (32); Okabe–Ito (14). |

## 4. Kesimpulan
- Warna tetap boleh, tapi jadi bonus. Tanda lain wajib.
- Pinyin sudah punya diakritik, tapi kecil dan nada netral tak bertanda.
- Legenda singkat menjawab permintaan Sinta dan keluhan "warna artinya apa".

## 5. Usul spesifikasi untuk developer
1. **Tanda nada**: setelah tiap suku kata berwarna, tambah angka kecil naik (¹ ² ³ ⁴, netral ⁰), warna sama. Berlaku di semua tampilan `.pt`.
2. **Palet aman buta warna** (titik awal Okabe–Ito, gelapkan secukupnya): nada 1 biru, 2 oranye, 3 hijau-kebiruan, 4 merah-ungu, netral abu. Kontras teks ≥ 4,5:1 di 4 tema. Uji dengan simulator buta warna.
3. **Legenda**: satu baris kecil di kartu ("¹ datar · ² naik · ³ turun-naik · ⁴ turun") dengan warna & angka sama. Tampil di sisi belakang kartu saat pinyin menyala.
4. **Di mana**: kartu ulang sisi belakang (`.fb`), pratinjau (`.fb-peek`, `.sbaca`).
5. **Pengaturan**: tombol "Warna nada" on/off, bawaan hidup. Angka tetap tampil.
6. **Uji**: simulasi deuteranopia/protanopia; pastikan tiap nada beda lewat angka saja.

## 6. Langkah berikutnya
- Developer kerjakan backlog #129. Mockup: `docs/mockup-1205.html`.
- Setelah live: Tari & Bima cek simulasi buta warna; Sinta cek legenda.
- Opsional: wawancara 1–2 pengguna buta warna sebagai penguat.
