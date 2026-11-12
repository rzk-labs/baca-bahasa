# Riset #515: Bukti internet, arti kata saat sinyal/kuota terbatas

_(validasi bukti internet) 40 bukti dari 3 jenis sumber: forum (LingQ, Readlang), dokumen teknis (WebKit, MDN), survei & berita data seluler Indonesia. Dibuka 12-11-2026._
_Kutipan asli Inggris, dipersingkat. Tidak diulang: tema/offline umum (`riset-baca-malam-offline.md`), pilihan kamus (`riset-sumber-kamus.md`), memori impor (`riset-batas-impor-hp.md`)._

## Intinya
- Pembaca mau **kata tersimpan tetap jalan offline**; bukti kuat di forum LingQ & Readlang.
- Simpan arti yang pernah diketuk + unduh per bab saat Wi-Fi: masuk akal, belum teruji di KRL.
- Data KRL & ulasan toko tak ditemukan. Pengguna Indonesia memang beli paket pendek/hemat.

## 1. Vonis hipotesis
| # | Hipotesis | Vonis |
|---|---|---|
| 1 | Pembaca butuh arti kata yang jalan tanpa sinyal | **Terbukti** |
| 2 | Cache arti yang pernah diketuk cukup, tanpa kamus offline penuh | **Terbukti sebagian** |
| 3 | Unduh arti satu bab saat Wi-Fi lebih disukai daripada kamus offline besar | **Belum jelas** |
| 4 | Pesan "arti belum bisa dimuat, nanti dicoba lagi" lebih baik daripada diam | **Terbukti** |
| 5 | Pengguna peka kuota data terjemahan | **Belum jelas** |

Alasan singkat:
- H1: 8 bukti LingQ + 5 Readlang meminta offline; satu pengguna menyebut "deal killer".
- H2: LingQ hanya offline untuk pelajaran yang sudah dibuka; ketuk baru tetap gagal.
- H4: spinner tanpa akhir dikeluhkan (bukti 9-13); app LingQ memberi pesan jelas (bukti 5).
- H3 & H5: tak ada pengguna yang membandingkan; hanya data kuota umum.

## 2. Bukti (40)
Jenis: **F** forum · **D** dokumen teknis · **S** survei/berita Indonesia.

### A. LingQ: offline (8) — [thread](https://forum.lingq.com/t/using-lingq-offline/514843)
1. F: "I often don't have access to the Internet - sometimes for a week at a time." (58rsh8nq2w)
2. F: "I don't see why it can't at least display the downloaded text or play downloaded audio."
3. F: "the app will 'cache' these lessons and they will be available to read offline."
4. F: "I can't imagine this is more than setting a flag in a database somewhere."
5. F: Pesan app: "Only lessons previously opened on this device can be used offline. Go online to access new content."
6. F: "The dictionary is available, so you can look up words, mark them as known or create LingQs."
7. F: "I don't expect the app do do clever things like translate sentences"
8. F: "I love LingQ, but this seems like a real problem for me, potentially a deal killer."

### B. LingQ: terjemahan lambat (6) — [thread](https://forum.lingq.com/t/translations-are-very-very-slow-to-load/1988960)
9. F: "Often it takes 10-20 seconds for a translation to show up, and it will just spin until it shows up." (relrod)
10. F: "It's grindingly slow." (David72)
11. F: "I usually have to click out of it and select it again before anything shows up." (TomErikSmith)
12. F: "translations of multiple words are quite slow and often fail entirely (the spinner goes indefinitely)." (iqflask)
13. F: "I just get the spinning circle, sometimes indefinitely." (jjacks303)
14. F: Pengguna Mandarin (lisanbao40, terjemahan saya): lebih baik pakai kamus daripada menunggu AI, terlalu lambat.

### C. LingQ: perjalanan (5) — [thread](https://forum.lingq.com/t/listening-to-lingq-lessons-offline-while-driving-to-work/28710)
15. F: "I am stuck in traffic for a good 1 hour every day and this is wasted time." (LingQLaos)
16. F: "It should download the lessons to your device and then you can easily play them when you're offline." (riquillers)
17. F: "when I switch over to the mobile phone and the mobile app while driving I cannot listen to anything."
18. F: "If you can play the audio, it has been downloaded." (Mark)
19. F: Ternyata "that hadn't actually been downloaded." (status unduh tak terlihat jelas)

### D. Readlang: permintaan offline (5) — [thread](https://forum.readlang.com/t/offline-reading/1180)
20. F: "Would it be possible to create an offline capability?" (marius-morar, 11 Nov 2024)
21. F: "could we have some basic dictionaries available for offline use?" (marius-morar)
22. F: Staf: "too big a change for me to consider in the short term." (steve)
23. F: "Maybe just the vocabulary function for offline … So practice word in plane or train or offline areas would be great" (frank-rogowski, Jan 2025)
24. F: "It would be perfect, I hope someday it became possible" (milena-vitoria, Mei 2025)

### E. Dokumen teknis: penyimpanan iPhone (11)
[WebKit 2020](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) · [WebKit 2023](https://webkit.org/blog/14403/updates-to-storage-policy/) · [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
25. D: Safari hapus "all of a website's script-writable storage after seven days of Safari use without user interaction on the site."
26. D: Daftar yang terhapus memuat "Service Worker registrations and cache".
27. D: "Web applications added to the home screen are not part of Safari and thus have their own counter of days of use."
28. D: "We do not expect the first-party in such a web application to have its website data deleted."
29. D: Browser: tiap situs bisa simpan sekitar 60% disk (iOS 17+); web Layar Utama kuota sama.
30. D: "WebKit normally evicts data on an origin basis: the data of an origin will be deleted as a whole." (semua atau tak sama sekali)
31. D: Saat penuh, yang paling lama tak dipakai dihapus dulu (LRU).
32. D: persist() ada, tapi "WebKit currently grants a request based on heuristics like whether the website is opened as a Home Screen Web App."
33. D: "the quota is an upper limit of how much can be stored" (bukan jaminan).
34. D (MDN): Safari: tanpa ketukan/klik 7 hari pemakaian, data dari skrip dihapus; cookie server dikecualikan.
35. D (MDN): "Best-effort" bertahan selama di bawah kuota & ruang HP cukup; hanya "persistent" kebal hapus otomatis.

### F. Data seluler Indonesia (5; dari ringkasan pencarian, halaman asli sebagian diblokir)
36. S: [APJII 2026 (Bisnis)](https://teknologi.bisnis.com/read/20260531/101/1977458/survei-apjii-2026-ungkap-alasan-1828-penduduk-indonesia-belum-melek-internet): 17,2% yang belum berinternet bilang kuota terlalu mahal (8.700 responden, 38 provinsi).
37. S: [Databoks](https://databoks.katadata.co.id/teknologi-telekomunikasi/statistik/6a1fa0ecb6e76/kisaran-pengeluaran-warga-ri-untuk-paket-internet-bulanan-awal-2026): 55,3% bayar Rp50-100 ribu/bulan untuk paket seluler.
38. S: Sama: paket 7 hari dipilih 25,8%, naik dari 19,3% tahun lalu; paket 30 hari masih 64,1%.
39. S: Pengguna kota umumnya pakai kuota seluler saat bepergian, Wi-Fi di rumah/kantor.
40. S: [Goodstats](https://data.goodstats.id/statistic/masalah-sinyal-dan-jaringan-jadi-gangguan-umum-internet-seluler-BocIK): sinyal & jaringan tercatat gangguan umum internet seluler (angka tak terbaca).

## 3. Kesimpulan
- Kebutuhan inti terbukti: kata yang sudah disimpan harus terbuka tanpa sinyal.
- Kompetitor lemah di kata baru: LingQ hanya offline untuk yang sudah dibuka.
- Cache lebih aman di iPhone Layar Utama; di tab Safari bisa terhapus setelah 7 hari pakai.

## 4. Sudah ada di app (cek kode, tak diubah)
- Cache arti 300 kata di localStorage (`app.js` 281), pesan + "Coba lagi" saat gagal.
- Belum ada: unduh arti satu bab, tanda "arti nyusul", hitungan kata siap offline.

## 5. Usulan app (urut P0)
1. **Unduh arti bab ini** (tombol, saat Wi-Fi): ambil arti kata unik bab, simpan di IndexedDB.
2. **Ketuk offline tak diam:** pesan "arti belum bisa dimuat, nanti dicoba lagi" + simpan kata tanpa arti, lengkapi otomatis saat online.
3. **Minta penyimpanan tetap** (persist) dan tampilkan "N kata siap offline" per buku.

## 6. Batas riset
- Tak ada data KRL; Reddit dan ulasan App Store/Play Store Indonesia tak terbaca.
- 5 bukti Indonesia dari ringkasan pencarian; angka sinyal tak terbaca.
- H3 dan H5 belum ada bukti langsung: tanyakan pembaca KRL nanti.
