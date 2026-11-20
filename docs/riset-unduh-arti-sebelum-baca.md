# Riset #1345: Unduh arti kata sebelum baca (offline), layak?

_(validasi bukti internet) 34 bukti dari 4 jenis sumber: forum (LingQ, Readlang), dokumen teknis (MyMemory, Google), toko/panduan e-reader (Kindle, Moon+), data & berita seluler Indonesia, studi baca. Dibuka 20-11-2026._
_Kutipan Inggris dipersingkat. Tidak diulang: bukti offline umum & WebKit (`riset-arti-kata-sinyal-lemah.md`), prafetch kalimat (`spesifikasi-prafetch-kalimat.md`), tombol Intip kata (`riset-pratinjau-kata-bab.md`)._

## Intinya
- Pembaca mau arti siap sebelum berangkat; cara paling umum: buka bab dulu saat online.
- Unduh **daftar kata baru per bab** layak; unduh semua kata satu buku tidak perlu.
- Mesin gratis punya batas harian jelas (MyMemory 5.000 huruf); jadi tombol harus dibatasi.

## 1. Vonis hipotesis
| # | Hipotesis | Vonis |
|---|---|---|
| 1 | Pembaca di sinyal lemah ingin arti tersedia sebelum baca | **Terbukti** |
| 2 | Unduh per bab/buku cukup dibanding per kata | **Terbukti sebagian** |
| 3 | Terjemah massal lewat mesin gratis kena batas laju & boros kuota | **Terbukti sebagian** |
| 4 | Cukup unduh daftar kata baru per bab, bukan semua kata | **Terbukti sebagian** (condong benar) |

Alasan singkat:
- H1: pengguna LingQ menyiapkan sendiri (buka satu-satu, bukti 4-7); Readlang diminta berulang (bukti 22-24).
- H2: model "buka bab = simpan arti" jalan, tapi kata baru & frasa gagal offline (bukti 1-3, 8); satu pengguna bilang tak membantu (bukti 9).
- H3: batas MyMemory pasti (bukti 18-20). Google tak resmi: 429 dilaporkan komunitas, bukan angka resmi (bukti 21-24). Uji Keepo sendiri belum ada.
- H4: hitungan kasar: kata baru per bab jauh lebih sedikit dari kata unik (bagian 4). Belum diuji di buku nyata.

## 2. Bukti (34)
Jenis: **F** forum · **D** dokumen teknis · **P** panduan/toko e-reader · **S** data/berita Indonesia · **K** studi.

### A. LingQ: offline per pelajaran (9)
1. F: "Only lessons previously opened on this device can be used offline." ([thread](https://forum.lingq.com/t/using-lingq-offline/514843))
2. F: "words that have not been LingQed before will have no definitions." (mark, 2018, [thread](https://forum.lingq.com/t/lingq-offline-for-entire-books/27107))
3. F: "such words will remain without translation in the offline mode." (Ress, 2018, thread sama)
4. F: "you do need to open all chapters online in order to access them later offline." (mark, 2018, thread sama)
5. F: "open the lessons one-by-one while still online, to make them available offline." (hiptothehop, Jan 2026, [thread](https://forum.lingq.com/t/reading-offline-problematic/2419343))
6. F: Membuka pelajaran "loads and stores the definitions and potential definitions of words." (hiptothehop, thread sama)
7. F: "I can't lingQ multi-word phrases offline, but otherwise it works as normal." (thread sama)
8. F: "When I try to read offline (in an airplane or just somewhere with bad internet connection) it's often not possible." (Ewgenijkkg, thread sama)
9. F: "I did that thing with opening the lessons in advance. Didn't help at all." (Ewgenijkkg, thread sama)

### B. LingQ: penerbangan & unduh massal (4)
10. F: "I wonder if I can get lingq and dictionaries to work completely offline." (dav009, [thread](https://forum.lingq.com/t/preparing-for-a-long-flight-can-i-use-lingq-completely-offline/240924))
11. F: "all other dictionaries require an online connection." (davideroccato, thread sama)
12. F: "It is super finicky and it won't keep all your lessons loaded." (robertbiggar, thread sama)
13. F: Staf: tak ada opsi unduh semua pelajaran sekaligus untuk satu kursus; disarankan lewat daftar putar ([thread](https://www.lingq.com/forum/2/23334/163796/)).

### C. Readlang (3)
14. F: Permintaan offline: "Would it be possible to create an offline capability?" ([forum](https://forum.readlang.com/t/offline-reading/1180))
15. F: "could we have some basic dictionaries available for offline use?" (thread sama)
16. F: UserVoice lama: permintaan offline (±21 suara) & kartu hafalan offline (±46 suara) ([UserVoice](https://readlang.uservoice.com/forums/192149-general/filters/top), dari ringkasan pencarian).

### D. Kindle & Moon+ (4)
17. P: Kamus bawaan Kindle jalan tanpa internet, tapi terjemahan & Wikipedia butuh Wi-Fi ([MakeUseOf](https://www.makeuseof.com/how-to-see-word-definitions-on-kindle/), dari ringkasan pencarian).
18. P: Pengguna Paperwhite: terjemahan hanya bisa saat tersambung Wi-Fi ([Asurion](https://www.asurion.com/connect/tech-tips/kindle-dictionary-not-working/)).
19. P: Moon+ Reader tak punya arti satu-ketuk bawaan; pakai kamus luar yang diunduh dulu, mis. Livio Offline ([Phandroid](https://phandroid.com/2017/01/06/moon-reader-android-dictionary/)).
20. P: Kamus unduhan = jalan offline; fitur yang ambil dari internet tetap butuh sinyal (panduan Kindle, [Guiding Tech](https://www.guidingtech.com/how-to-use-dictionary-in-kindle/)).

### E. Batas mesin terjemah (7)
21. D: MyMemory anonim: "5,000 characters per day", dihitung per IP ([lilting.ch](https://lilting.ch/en/articles/mymemory-api)).
22. D: Dengan email: "50,000 characters per day" (sama).
23. D: Parameter teks maks "up to 500 bytes" per permintaan (sama).
24. D: Pustaka MyMemoPy menyebut batas anonim 5.000 huruf/hari ([GitHub](https://github.com/kurotom/MyMemoPy)). Sumber pihak ketiga lain menyebut 10.000: tak resmi, diabaikan.
25. D: Klien tak resmi Google: terlalu banyak permintaan dari satu IP memicu 429 ([vitalets/google-translate-api](https://www.github.com/vitalets/google-translate-api)).
26. D: Endpoint tunggal "quickly rate limited"; saran: beri jeda & baca Retry-After ([google-translate-api-x](https://unpkg.com/google-translate-api-x@10.7.2/README.md), [deep-translator](https://www.github.com/nidhaloff/deep-translator/discussions/132)).
27. D: Pemelihara menyebut proyeknya untuk prototipe; untuk legal pakai API resmi; kuota resmi Google per menit & per hari ([Google Cloud](https://docs.cloud.google.com/translate/quotas)). Batas endpoint gtx sendiri tak terdokumentasi.

### F. Data seluler Indonesia (5)
28. S: Jaringan lambat & sinyal lemah = gangguan seluler umum 2025-2026 ([Databoks](https://databoks.katadata.co.id/teknologi-telekomunikasi/statistik/6a1fa3823d439/gangguan-internet-utama-di-indonesia-jaringan-lambat-dan-sinyal-lemah)).
29. S: Jaringan putus-putus dikeluhkan 23,37% responden ([Goodstats](https://data.goodstats.id/statistic/masalah-sinyal-dan-jaringan-jadi-gangguan-umum-internet-seluler-BocIK), dari ringkasan pencarian).
30. S: Menkomdigi: konektivitas internet Sulawesi Selatan (provinsi Makassar) masih terbatas, Juni 2025 ([Bisnis](https://teknologi.bisnis.com/read/20250618/101/1885816/menkomdigi-ungkap-konektivitas-internet-di-sulawesi-selatan-masih-terbatas)).
31. S: Gangguan nasional Telkomsel & IndiHome 22 Jan 2026, warganet mengeluh ([Bisnis](https://teknologi.bisnis.com/read/20260122/101/1946312/internet-telkomsel-dan-indihome-down-ini-cara-cek-jaringan-dan-lapor-ke-cs)).
32. S: Opensignal: kecepatan 4G Indonesia rata-rata 25,6 Mbps, peringkat 86 dunia, Q1 2025 ([Opensignal](https://insights.opensignal.com/reports/2025/12/indonesia/mobile-network-experience), dari ringkasan pencarian). Cepat rata-rata, tapi tak menjamin stabil.

### G. Studi baca (2)
33. K: Cakupan kata 95% = minimum, 98% = optimal; ±400 kata/halaman berarti ±20 kata asing di 95% dan ±8 di 98% ([Laufer & Ravenhorst-Kalovski via Univ. Hawaii](https://scholarspace.manoa.hawaii.edu/bitstream/10125/67407/1/33_2_10125-67407.pdf), dari ringkasan pencarian).
34. K: Bacaan bertingkat menaruh glosarium, maks ±25 kata per 1.000 kata ([ERIC EJ887877](https://files.eric.ed.gov/fulltext/EJ887877.pdf), dari ringkasan pencarian). Tak ada studi langsung pratinjau/glosarium vs pemahaman ditemukan.

## 3. Yang baru dibanding riset lama
- Riset #515 menyisakan "unduh per bab belum jelas"; sekarang **terbukti sebagian**.
- Pesaing hanya menyimpan arti kata yang **sudah pernah disimpan** (bukti 2-3); kata baru gagal.
- Pesaing tak punya "unduh semua" (bukti 13); ini celah Keepo.
- Prafetch kalimat (spesifikasi lama) hanya satu halaman; ini beda: per bab, per kata, sengaja ditekan pengguna.

## 4. Hitungan kasar (perkiraan, perlu ukur)
- Satu bab ±3.000 kata → ±800 kata unik → ±150-250 kata baru setelah disaring.
- Anggap kata ±8 huruf: 150 kata ≈ 1.200 huruf. MyMemory anonim (5.000/hari) ≈ 4 bab. Karena itu **MyMemory bukan jalur unduh**.
- Google gtx: satu permintaan per kata; 150 kata ≈ 150 permintaan. Balasan ±1-3 KB (dt=bd, ex) → ±150-450 KB per bab. Angka ini tebakan.
- Semua kata satu buku (±5.000 unik) ≈ 5.000 permintaan: terlalu banyak, rawan 429.

## 5. Usul rancangan terkecil
**Tombol "Siapkan offline" di sheet buku** (Reader First, tanpa AI):
- Cakupan: bab yang sedang dibaca + bab berikutnya; bukan seluruh buku sekaligus.
- Kata: hanya kata baru (pakai fungsi saring #80; bukan kata tersimpan/dikenal); maks **150 kata** per ketukan.
- Mesin: hanya Google gtx, tanpa cadangan MyMemory. Satu permintaan sekali jalan, jeda 400 ms, berhenti setelah 2 gagal berturut-turut (sama dengan prafetch).
- Tempat simpan: IndexedDB per buku (bukan `trCache` 300 entri; akan tertimpa).
- Ketuk kata: cek simpanan offline dulu, baru internet.
- Tampilan: progres "87/150 kata", tombol Batal, hasil "150 kata siap offline", bisa dilanjutkan.
- Peringatan sebelum mulai: "Pakai ±0,3 MB data. Sebaiknya di Wi-Fi." (iPhone Safari tak bisa mendeteksi Wi-Fi.)
- Hormati Hemat Data & status offline (tombol mati).
- Hapus bersama bukunya; tombol "Hapus arti offline".

## 6. Risiko
- Safari bisa hapus data situs setelah 7 hari tanpa dipakai (kecuali Layar Utama); arti hilang diam-diam. Tampilkan hitungan "N kata siap" tiap buka.
- Google gtx tak resmi: bisa diblokir kapan saja; progres harus tahan gagal.
- Arti satu kata tanpa konteks sering kurang pas; tetap tawarkan ketuk kalimat saat online.
- Ukuran: 150 kata/bab × banyak bab menumpuk; beri batas total per buku (mis. 1.500 kata).
- Frasa & kalimat tetap butuh sinyal (sama seperti LingQ, bukti 7).

## 7. Batas riset
- Reddit, Threads/X, ulasan App Store/Play Store, dan halaman resmi MyMemory tak terbaca (403/410).
- Beberapa bukti (16-20, 29, 32-34) dari ringkasan pencarian, bukan halaman penuh.
- Tak ada data soal pembaca Makassar selain permintaan Ilham (pengguna AI, bukan manusia).
- Batas gtx tak ada angka resmi. Perlu uji 150 permintaan beruntun di app.

## 8. Langkah berikutnya
1. Developer: bangun tombol "Siapkan offline" (backlog #145). Ukur dulu 150 permintaan gtx beruntun.
2. Setelah rilis: pantau berapa orang menekan tombol dan berapa gagal (lewat /hitung).
3. Tanya 3 pembaca nyata (KRL/luar Jawa): apakah tombol ini menolong.

Mockup: `docs/mockup-1345.html`.
