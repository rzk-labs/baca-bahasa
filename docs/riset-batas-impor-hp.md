# Riset #474: Bukti internet, batas ukuran & memori impor buku di iPhone Safari

_(validasi bukti internet) 40 kutipan dari 3 jenis sumber: forum/bug tracker (WebKit, GitHub, Apple, Babylon.js), dokumen resmi/vendor (WebKit, MDN, JSZip, Nutrient), blog teknis. Dibaca 12-11-2026._
_Kutipan asli berbahasa Inggris, dipersingkat. Tidak ada uji langsung di iPhone; angka memori = laporan orang lain._
_Tidak diulang: DRM/format/hak cipta (lihat `riset-impor-buku-sendiri.md`)._

## Intinya
- Tab iPhone mati diam-diam di kisaran 100–400 MB memori. Tak ada galat yang bisa ditangkap.
- Kuota simpanan aman: novel 500 ribu kata hanya beberapa MB. Memori saat impor yang berisiko.
- Batas 50 MB terlalu longgar untuk iPhone lama. Usul: batas per format, bar progres, pesan jelas.

## 1. Vonis hipotesis (H5 dipecah 5)
| # | Hipotesis | Vonis |
|---|---|---|
| 5a | Tab Safari iPhone crash bila memori terlewati, tanpa galat yang bisa ditangkap | **Terbukti** |
| 5b | Batas 50 MB Keepo aman di semua iPhone | **Gugur untuk iPhone lama** (berdasar hitungan; belum diuji) |
| 5c | Kuota IndexedDB iOS cukup untuk teks novel besar | **Terbukti** |
| 5d | Perlu proses bertahap/progres/batal untuk file besar | **Terbukti sebagian** (PDF sudah pakai worker; EPUB/txt belum) |
| 5e | Pesan galat khusus "file terlalu besar" bisa dipicu dengan andal | **Belum jelas** (crash tak bisa ditangkap; hanya cek ukuran di muka) |

## 2. Kutipan (40)
Jenis: **F** = forum/bug tracker · **D** = dokumen resmi/vendor · **B** = blog teknis.

### 5a. Batas memori tab iPhone
1. F: "I guess it has to do with the maximum RAM a browser can occupy which is 384 MB on iOS Safari 15." — schlagmichdoch, [zip.js #392](https://www.github.com/gildas-lormeau/zip.js/discussions/392)
2. F: "When it's more than 208 MB the page crashes when I try to download the Zip File." — schlagmichdoch, sama
3. F: "When I add ~1GB the page already crashes when progressing the files." — schlagmichdoch, sama
4. F: "I don't have an iOS device and I was not able to reproduce the issue in the simulator bundled with Xcode." — gildas-lormeau (maintainer), sama (simulator tak mewakili HP asli)
5. F: "I simply won't allow files bigger than 200 MB on iOS." — schlagmichdoch, sama (pengembang lain memasang batas sendiri)
6. F: "large audio files that are loaded into the Sound constructor as an Array Buffer cause iOS Safari to crash, 100% of the time." (mp3 9 MB) — gabrieljbaker, [Babylon.js](https://forum.babylonjs.com/t/large-audio-arraybuffers-crashing-ios-safari/35576)
7. F: "the page first immediately crashes then reloads." — gabrieljbaker, sama
8. F: "iOS usually crashes the page when it is using too much memory" — RaananW, sama
9. B: "consistently crash a web page in mobile Safari on my 3rd generation iPhone SE at around 100 MB" — Jeff Johnson, [Lapcat](https://lapcatsoftware.com/articles/2026/1/7.html)
10. B: "on my 8th generation iPad at around 200 MB" (iOS 26.2) — sama
11. B: "Using `try {} catch {}` blocks in JavaScript doesn't help at all" — sama (crash halaman tak jadi exception)
12. B: Jetsam adalah "Apple's system-wide memory management", "the lower of the two limits always applies." — [CatchMetrics](https://www.catchmetrics.io/blog/deep-dive-ram-internals-webkit)
13. B: per tab biasanya "300-450MB range"; iPhone 6s/SE lama sekitar 200-250MB (estimasi penulis, tanpa sumber) — sama
14. B: "it doesn't slow down gracefully. It crashes." — sama
15. F: "The current tab crash message helps exactly no one." — Mats, [WebKit Bugzilla 276057](https://bugs.webkit.org/show_bug.cgi?id=276057) (pesan crash Safari tak informatif)
16. D: "iOS Safari enforces hard canvas memory limits (256–384 MB, depending on device)." — [Nutrient](https://www.nutrient.io/blog/pdfjs-limitations-commercial-upgrade/) (vendor pesaing; soal render canvas, bukan ambil teks)

### 5b. Ukuran file & memori saat parse
17. D: "The async method and the generateAsync method hold the full result in memory" — [JSZip docs](https://stuk.github.io/jszip/documentation/limitations.html)
18. D: "a 10MB ascii text file will take 20MB of memory." — sama (string JS = 2× ukuran)
19. D: "ZIP64 files can be loaded, but only if the zip file is not 'too big'." — sama
20. B: "Loading a 100MB file into memory requires allocating a massive block of RAM." — [DEV Community](https://dev.to/will_indie/designing-a-high-throughput-ebook-converter-fixing-main-thread-freezes-with-chunked-readers-jca)
21. B: unzip EPUB di main thread bisa "easily double or triple that memory footprint." — sama
22. B: "The main thread would freeze, mouse clicks ignored" saat parse 150MB EPUB/PDF — sama
23. D: "Documents under 10 MB with simple layouts generally work, but larger or complex files can cause problems." — Nutrient (ringkasan), sama sumber #16
24. D: "Complex documents that render in seconds in native viewers can take minutes in PDF.js" — Nutrient
25. F: "This file size is 6.9MB big, approximately 57 pages in length." PDF rusak hanya di iOS: "It loads and displays the PDF for a second or two before breaking" — [Apple Forums](https://developer.apple.com/forums/thread/695191) (tanpa jawaban; itu PDF viewer, bukan ambil teks)
26. F: PDF.js "it takes a very long time (approx. 5-10 minutes)" untuk PDF bergambar — FWennerdahl, [pdf.js #9570](https://www.github.com/mozilla/pdf.js/issues/9570)
27. F: "this issue is apparently specific to just one platform/browser" — Snuffleupagus (maintainer), sama (pdf.js tak fokus Safari)
28. F: "This happens both on 15.X and 16.X iOS devices." (crash teks-layer, sebagian PDF saja) — lksnmnn, [react-pdf #1655](https://github.com/wojtekmaj/react-pdf/issues/1655)
29. F: ditutup "not planned" tanpa tanggapan maintainer (Jul 2024) — sama

### 5c. Kuota IndexedDB iOS
30. D: "For a browser app, the origin quota is up to 60% of the total disk space." — [WebKit blog, 10 Agu 2023](https://webkit.org/?p=14403)
31. D: Web app Layar Utama "has the same origin quota and overall quota as when it is opened in a browser app." — sama
32. D: Bila lewat kuota, "a QuotaExceededError exception will be thrown." — sama (ini galat yang BISA ditangkap)
33. D: "In earlier versions of Safari, an origin is given an initial 1 GiB quota." — [MDN](https://developer.mozilla.org/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
34. D: "Web developers should wrap JavaScript that writes to browser storage within try...catch blocks." — MDN
35. D: situs di Layar Utama "uses the same origin quota as the browser app (around 60% of disk space)." — MDN
36. F: "IndexedDB storage is now capped at 500 MB." (iOS 13 beta) — Sanjay Kumar, [WebKit Bug 199614](https://bugs.webkit.org/show_bug.cgi?id=199614)
37. F: "requests below 50MB should be fine" — youenn fablet (WebKit), sama
38. F: bug ditandai RESOLVED FIXED 9 Mei 2023, kuota kini dihitung dari ruang disk — sama

### 5d. Proses bertahap & progres
39. D: pdf.js pakai worker; bug fokus render, bukan teks — lihat #26–27
40. B: "1MB to 2MB is the sweet spot" untuk potongan baca; "triggering 25,000 React state updates and DOM paints in less than a second" bila progres diperbarui tiap potongan — DEV Community (#20)

Catatan: Reddit & ulasan App Store tak diuji (sering 403). Tak ada laporan "buku X MB gagal di Keepo/aplikasi baca"; angka di atas dari alat sejenis (zip.js, pdf.js, audio). Kutipan 11, 14, 15 saling menguatkan: crash tak bisa ditangkap.

## 3. Alasan vonis
- **5a terbukti:** 3 jenis sumber, 6 pelapor berbeda. Crash = tab reload, tanpa exception (11, 14). Angka beda per HP: ~100 MB (SE 3, #9) sampai ~384 MB (#1).
- **5b gugur (iPhone lama):** hitungan dari kode, bukan uji: txt 50 MB = buffer 50 + string ~100 MB (#18) + pecahan paragraf; di HP ±200 MB hampir pasti mepet. EPUB: JSZip menahan seluruh buffer (#17) tapi hanya membuka file teks, gambar tidak dibuka (di `app.js` hanya `.async('string')` pada bab).
- **5c terbukti:** novel 500 ribu kata ≈ 3 MB teks (hitungan kasar: ~6 karakter/kata); kuota ≥ 1 GiB atau 60% disk (#30, #33). Risiko nyata ada di tulis yang gagal diam-diam (lihat masukan Bima: `addBook` tanpa catch).
- **5d sebagian:** PDF jalan di worker (pdf.js bawaan) dan ada toast tiap 10 halaman. EPUB & txt: tanpa progres; EPUB ber-`await` per bab sehingga layar sempat bernapas, tapi txt satu blok.
- **5e belum jelas:** tak ada cara menangkap crash. Cek ukuran file sebelum baca = satu-satunya penjaga andal; kuota IndexedDB penuh bisa ditangkap (#32, #34).

## 4. Cocokkan dengan app saat ini
- ◑ Batas tunggal 50 MB (`ui.js:514`) untuk semua format; pesan "File-nya kegedean (maks 50 MB)".
- ❌ Seluruh file dibaca ke `ArrayBuffer` sekaligus (`app.js:177-179`); txt didekode utuh.
- ❌ `addBook` ke IndexedDB tanpa penangkap galat kuota (masukan Bima).
- ◑ Progres hanya PDF (toast tiap 10 halaman); tak ada tombol batal.
- ✅ EPUB tak membuka gambar; PDF di worker.

## 5. Kesimpulan
- Risiko terbesar: crash diam-diam di iPhone lama saat file besar. Jaga dengan batas di muka.
- Teks novel kecil; simpan aman asal galat kuota ditangkap.
- Batas realistis = per format, bukan satu angka 50 MB.

## 6. Usulan batas & perbaikan (untuk developer, berurut)
1. **Batas per format (kecil).** Usul awal, uji dulu di iPhone SE/8:
   - txt: tolak > 15 MB (novel ≈ 1–5 MB).
   - EPUB: peringatan > 25 MB, tolak > 50 MB.
   - PDF: peringatan > 20 MB, tolak > 50 MB.
   - Pesan: "Buku ini terlalu besar buat HP-mu (X MB). Coba EPUB/TXT yang lebih kecil, atau pecah per bab."
2. **Tangkap galat simpan & impor (kecil).** `try/catch` di sekitar `addBook`/parse. Kuota penuh: "Penyimpanan HP penuh. Hapus buku lama lalu coba lagi." Memori/umum: "Impor gagal. Coba file lebih kecil, atau tutup tab lain."
3. **Progres & batal (sedang).** Bar persen untuk EPUB (per bab, `i/n`) dan txt besar (dekode/potong bertahap, beri jeda `await`); tombol Batal. Perbarui tampilan ≤ 5×/detik, bukan tiap potongan (#40). Web Worker belum perlu: PDF sudah di worker, EPUB cukup per bab.
4. **Opsional:** `navigator.storage.estimate()` sebelum simpan; peringatan bila sisa < 2× ukuran buku (lihat `riset-keamanan-data-lokal.md`).

## Langkah berikutnya
- Developer: kerjakan usulan 1–2 (tanpa pustaka baru).
- Manusia (penguat): impor EPUB 25 MB, PDF 30 MB, txt 10 MB di iPhone lama (SE/8) dan catat yang crash.
- Riset: ulang pencarian Reddit/ulasan toko bila bisa dibuka.
