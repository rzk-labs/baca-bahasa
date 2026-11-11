# Laporan usability Keepo (Tugas #227, Tahap 17)

## Intinya
- 4 penguji AI + 46 kutipan kompetitor dari 6 sumber: pola keluhannya sama.
- Paling berat: tombol "Coba 1 cerita" bisa dobel, kartu Hafal meluber, simpan kata sepi umpan balik.
- Validasi bukti internet terpenuhi. Uji manusia (lihat `riset-uji-pakai-5-orang.md`) cuma penguat.

Catatan: isi issue #16 tidak bisa dibuka (akses `gh` ditolak). Dasarnya cuma `.kepo-tmp/masukan.txt`.
Masukan Dina (Keepo HQ) bukan soal aplikasi baca, jadi tidak dimasukkan.

## 1. Temuan penguji AI per tema
Berat: **T** tinggi, **S** sedang, **R** rendah.

**Coba 1 cerita**
- T: ketuk dua kali, cerita contoh dobel (Tari, Nadia).
- S: tombol tanpa tanda loading di iPhone lambat (Tari).
- S: cuma 3 bahasa, satu cerita, tanpa label level (Tari, Raka, Nadia).
- R: tombol hilang setelah ada satu buku; judul "(contoh)" menumpuk (Nadia, Raka).
- R: Beranda kosong punya dua jalur sekaligus, bikin bingung (Raka).

**Kartu arti / simpan kata**
- S: tombol "Tersimpan" diam saja, salah simpan tak bisa dibatalkan di situ (Raka).
- S: frasa 2-5 kata tidak digarisbawahi di teks (Raka).
- S: angka "Diketuk" beda antar layar; lencana "N×" font salah; hitungan tak ikut sinkron (Bima).
- S: arti loading terus saat sinyal jelek; pesan gagal tak bilang "offline" (Bima, Raka).

**Kartu Hafal**
- T: tinggi tetap 350px, isi meluber di HP kecil (Tari).
- S: kata besar 56px tanpa pembungkus baris, bisa terpotong (Tari).
- R: pilihan suara hilang diam-diam bila daftar suara belum termuat (Tari).

**Baca malam / layar**
- S: layar HP mati sendiri saat baca pelan (Nadia).
- S: tema awal selalu Terang; belum ada Gelap otomatis (Nadia).
- R: belum ada pengingat atau target harian ringan (Nadia).

**Impor file**
- T: kuota penuh gagal diam-diam; file kosong salah pesan "PDF scan" (Bima).
- S: .txt bukan UTF-8 tampil huruf rusak, tetap tersimpan jadi buku (Bima).
- S: EPUB rusak keluar error mentah, bukan "EPUB tidak valid" (Bima).

**Offline / data**
- S: cadangan data rusak ditimpa terus, tak ada pemulihan (Bima).
- S: pesan "Artinya belum kebuka" tak jelas sebabnya di kereta (Raka).

Penguat: pola "paham ketuk kata & simpan" sudah dirancang di `riset-uji-pakai-5-orang.md`.

## 2. Bukti kompetitor: 46 kutipan, 6 sumber
Sumber:
- A: [Forum LingQ, "LingQ 5.0 Criticisms"](https://forum.lingq.com/t/lingq-50-criticisms/34137) (TerraEarth)
- B: [Forum LingQ, "website is not friendly"](https://forum.lingq.com/t/i-have-to-be-honest-the-website-is-not-friendly-and-easy-to-follow/25270?page=2)
- C: [Forum Language Reactor, thread keluhan update](https://forum.languagelearningwithnetflix.com/t/post-your-rants-about-language-reactor-update-here/5050)
- D: [Ulasan App Store Beelinguapp (JustUseApp)](https://justuseapp.com/en/app/1225056371/beelinguapp-language-learning/reviews)
- E: [Mezzoguild, review Language Reactor](https://www.mezzoguild.com/language-reactor-review/)
- F: [Mezzoguild, review Readlang](https://mezzoguild.com/readlang-review)

**LingQ: pencarian kata & simpan (sumber A)**
1. "Dictionaries are difficult to access"
2. "Before, dictionaries and definitions would be displayed at a single click"
3. "it gets old real fast."
4. "Saved definitions are immediately hidden away"
5. "Why wouldn’t I want to review the definition I just saved"
6. "It is difficult to see which word I stopped on after saving a definition."
7. "there is a barely distinguishable line box that appears around words that you select"
8. "should NOT fade out when you save a definition"
9. "Importing lessons takes longer than they used to."

**LingQ: bingung pakai (sumber B)**
10. "There is a learning curve with not only the interface, but the entire concept of the site itself." (t_harangi)
11. "I find it very difficult to figure out how to do so." (paldrich)
12. "the process for doing so is quite opaque, and there is no learning program to teach you how to do so." (paldrich)
13. "It is the most cumbersome website I have ever worked with." (bdkw)
14. "this website is chaotic and not user-friendly." (brightsideofthemoon)
15. "The site however is very daunting to a beginner, because you don’t know what or where to start." (Dimethylamine)
16. "The rest of the site is very disorganised though." (nobody)

**Language Reactor: forum (sumber C)**
17. "Hi language reactor is not working on Netflix for me" (atenahena)
18. "Yesteday it was perfectly functional, but today it doesn’t seem to work anymore!" (Violeta_de_Iri)
19. "I was using the LR and then it just disappeared." (Jennifer_McGonagle)
20. "Please fix the problem with Netflix. I can’t use the app through Netflix." (Samuel_Shelton)
21. "Not working. I’m not going to remove every other extension." (Octopus_Rex)
22. "I cannot watch Netflix in a full screen cause of fixed subtitles." (jj_j)
23. "would be great if you could fix this to how it was before" (Amelia_Gaither)
24. "I think it’s not possible to turn off blurred subs below actual subs now?" (MrGunma)
25. "When I do that I get two sets of subtitles when I only want the bottom one below the picture." (DuaneDH)

**Language Reactor: ulasan (sumber E)**
26. "Overwhelming and confusing interface"
27. "The only “Saved Phrases” you can get in Language Reactor are entire lines/timestamps from a transcript."
28. "If you can’t multi-select words in a sentence to fetch contextual meanings and then save those"
29. "You’re limited by the fact that you can only click individual words in a subtitle"
30. "This is fine for single words, but we don’t learn languages this way."

**Beelinguapp (sumber D)**
31. "Downloading a story - it just stuck at 0% forever. Nothing helps."
32. "The glossary only allows you to select words in a single sitting."
33. "Beelinguapp does not run very well."
34. "The “rate Beelinguapp” page pops up on the last page of a story and pressing cancel does not make it go away."
35. "I’m annoyed by the pop-ups to get $10 to refer Beelinguapp to a friend"
36. "The inability to turn this pop-up stuff off might actually lead to the eventual loss of a paying customer."
37. "it would speak one line and highlight another line in English (different than the translation)."
38. "found another story where audio doesn’t work and another where translation was wrong."
39. "The devs offer a discount for premium but you have 30 minutes to test Beelinguapp"
40. "you can’t change the language you want to learn or the language you speak after the first 30 minutes"

**Readlang (sumber F)**
41. "Word review option is slightly limited for advanced students"
42. "I think this is good, but could be developed a bit further — especially for advanced students."
43. "but could be better for advanced students."
44. "advanced students might want to learn synonyms and antonyms of the particular word."
45. "its phrases where the free version limits to 10/day"

**Ringkasan tak berkutip (bukan dihitung)**
46. Studi UX Play Store LingQ: 27% ulasan soal desain buruk, 23% "membingungkan" (via pencarian; halaman asli diblokir, belum diverifikasi).

Kekurangan jujur:
- Duolingo Stories: bukti spesifik tipis, tidak ada kutipan layak. Tidak dihitung.
- Tidak ada kutipan Reddit/Play Store langsung; mesin pencari tidak menemukannya. Sumber: forum resmi, App Store, blog ulasan.
- Kutipan C dan F lebih soal stabilitas/batas gratis daripada desain; dipakai hati-hati.

## 3. Vonis hipotesis
1. **Orang paham ketuk kata tanpa dijelaskan:** *belum jelas*. Kompetitor: tap kata biasa; tak ada keluhan. Perlu uji manusia.
2. **Simpan kata mudah ditemukan:** *terbukti bermasalah*. Kutipan 4-6, 27, 32; Raka soal tombol "Tersimpan".
3. **Baca malam nyaman:** *belum jelas*. Hanya Nadia; tak ada kutipan kompetitor soal mode gelap.
4. **Impor file tidak membingungkan:** *terbukti bermasalah*. Bima 3 temuan; kutipan 9 dan 31 soal impor lambat/macet.
5. **Layar tidak penuh sesak:** *terbukti penting*. Kutipan 10, 13-15, 26: antarmuka ramai bikin pemula lari.
6. **Gratis tanpa batas mengganggu itu penting:** *terbukti*. Kutipan 34-36, 39-40, 45: pop-up dan batas bikin kesal.
7. **Arti kata selalu tampil andal:** *gugur*. Pencarian gagal diam-diam di Keepo (Bima), dan kompetitor sama (17-21, 38).

## 4. Kesimpulan & 5 usulan (urut prioritas)
Kesimpulan: pengguna kompetitor marah soal **simpan kata hilang jejak** dan **antarmuka ramai**. Keepo sudah sederhana, tetapi punya celah yang sama pada simpan kata dan kegagalan diam-diam.

1. **Kunci tombol "Coba 1 cerita"** saat proses + tanda loading. Cegah cerita dobel. (Tari, Nadia)
2. **Kartu Hafal tahan HP kecil:** tinggi fleksibel, kata dibungkus baris. (Tari)
3. **Umpan balik simpan kata:** tombol "Tersimpan" bisa batal, frasa digarisbawahi di teks. (Raka; kutipan 4-6, 27)
4. **Pesan gagal yang jelas:** offline, kuota penuh, file bukan UTF-8/EPUB rusak. (Bima, Raka)
5. **Mode baca malam:** layar tetap nyala + Gelap otomatis opsional. (Nadia)

Tiap usulan cukup jadi satu tugas kecil. Catatan: usulan 4 mungkin dipecah dua (offline, impor).
