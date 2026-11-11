# Riset: data buku & kata di iPhone bisa terhapus?

Tanggal: 2026-11-11 · Tugas #206 · Status: draf riset (belum diuji di perangkat nyata)

## Intinya
- Pemakai Safari biasa (tab, bukan Layar Utama) berisiko kehilangan buku & kata setelah ±7 hari tak dibuka.
- PWA yang dipasang ke Layar Utama dikecualikan dari aturan 7 hari (menurut WebKit).
- Kepo belum punya perlindungan apa pun: tak ada persist(), tak ada cadangan file. Hanya progres yang bisa sinkron lewat akun; buku tidak.

## 1. Aturan Safari iPhone
- WebKit (24 Mar 2020): data tulis-skrip, termasuk IndexedDB, dihapus setelah 7 hari pemakaian Safari tanpa interaksi di situs itu. Sumber: <https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/>
- "7 hari" = hari Safari dipakai, bukan hari kalender. Libur 2 minggu tanpa buka Safari tidak langsung menghapus.
- Web app Layar Utama punya penghitung hari sendiri dan tidak termasuk Safari. WebKit tak mengharapkan datanya dihapus; kalau terjadi, dianggap bug serius.
- Catatan MDN (diperbarui 5 Jan 2026): halaman itu tidak menyebut pengecualian Layar Utama, hanya menyebut kuota sama. Sumber: <https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria>
- Kuota Safari (iOS 17+): ±60% disk per situs di browser. Jadi buku besar jarang jadi masalah kuota.
- Di Uni Eropa (iOS 17.4+), browser non-WebKit bisa punya aturan sendiri. Belum diverifikasi.

## 2. Android Chrome & penyimpanan persistent
- Default "best-effort": data bisa dibuang browser kalau disk hampir penuh.
- `navigator.storage.persist()`: kalau diberikan, data hanya hilang bila pengguna sendiri menghapusnya (MDN).
- Chrome memutuskan otomatis tanpa pop-up. Tolok ukur: keterlibatan situs, terpasang/di-bookmark, izin notifikasi. Sumber: <https://web.dev/articles/persistent-storage> (tanpa tanggal terbit di halaman).
- Kalau ditolak, boleh minta lagi nanti; dinilai ulang. Safari dan Chrome sama-sama memutuskan otomatis; Firefox pakai pop-up.
- `navigator.storage.estimate()` memberi perkiraan terpakai/kuota; berguna untuk peringatan "hampir penuh".
- Kondisi Kepo sekarang: `grep persist|navigator.storage` di app.js, ui.js, sw.js, cloud.js = nol hasil. Belum diminta sama sekali.

## 3. Seberapa besar risiko untuk Kepo
- Tinggi: pengguna iPhone yang membuka Kepo lewat tab Safari lalu jarang kembali. Buku, kata, dan progres hilang diam-diam.
- Sedang: pengguna terpasang di Layar Utama. Dikecualikan WebKit, tapi bergantung kebijakan yang bisa berubah.
- Rendah: Android Chrome, terpasang dan sering dipakai; persist() kemungkinan besar diberikan.
- Yang sudah aman sebagian: progres, XP, dan kata (kunci sinkron di cloud.js) ikut ke akun. Buku/teks EPUB/PDF TIDAK ikut; tetap hanya di HP (lihat docs/spesifikasi-sinkron-buku.md).
- Dampak terburuk: buku hasil impor hilang dan harus diunggah ulang. Kata hilang total bila belum punya akun.
- Penyimpanan penuh juga mengancam: laporan Bima, save() tanpa try/catch, bisa meninggalkan buku yatim.
- Angka sebaran pengguna iPhone vs Android Kepo belum ada. Perlu dicek dari data pengguna beta.

## 4. Pilihan perlindungan

| Pilihan | Pro | Kontra | Usaha |
|---|---|---|---|
| Minta `persist()` + `estimate()` | Murah; membantu Android; tanpa UI | Safari belum tentu menurut; tak ada jaminan | S |
| Banner "Pasang ke Layar Utama" (iPhone) | Memakai pengecualian 7 hari WebKit; sekaligus meningkatkan retensi | Bergantung pengguna mau; instruksi iOS manual (Bagikan → Tambah ke Layar Utama) | S–M |
| Ekspor/impor cadangan JSON | Satu-satunya jalur menyelamatkan buku & kata tanpa akun; berfungsi di semua browser | Buku EPUB/PDF bisa berukuran besar; unduh blob sering macet di Safari PWA (laporan Bima), perlu Bagikan | M |
| Dorong buat akun & sinkron | Progres & kata aman di server; sudah ada | Buku belum ikut; hak cipta bila teks diunggah (docs/riset-hak-cipta.md); butuh deploy server | M (kata) / L (buku) |

## 5. Rekomendasi
**Langkah paling murah:** panggil `navigator.storage.persist()` sekali saat pengguna menyimpan buku/kata pertama, ditambah banner Layar Utama untuk iPhone Safari. Usaha S.

### Tugas developer turunan

**A. Minta penyimpanan persisten (S)**
- Panggil `persist()` setelah buku pertama masuk; catat hasilnya di setelan lokal.
- Selesai bila: di Chrome Android, `navigator.storage.persisted()` jadi true setelah impor; tak ada error di Safari.
- Selesai bila: sw.js naik versi dan data lama tetap aman.

**B. Banner "Pasang ke Layar Utama" di iPhone Safari (S–M)**
- Tampil hanya di Safari iOS non-standalone, setelah ≥1 buku atau 5 kata. Bisa ditutup, tak muncul lagi 14 hari.
- Isi: alasan "biar bukumu nggak hilang" + 3 langkah singkat.
- Selesai bila: tak tampil di mode terpasang; tampil sekali di Safari tab; layar 320px tidak terpotong.

**C. Cadangan JSON ekspor/impor (M)**
- Tombol di Setelan: ekspor semua (kata, progres, setelan, buku) jadi satu file via Bagikan di iOS, unduh di desktop.
- Impor menggabungkan tanpa menimpa data baru; versi format bernomor.
- Selesai bila: ekspor lalu hapus data lalu impor memulihkan buku, kata, progres; gagal-aman bila file rusak.
- Sertakan peringatan ukuran file & opsi "tanpa buku".

## 6. Langkah berikutnya
- Uji manual di iPhone nyata: pasang vs tab, tunggu 7+ hari Safari-aktif, cek data.
- Cek rasio pengguna iPhone saat beta.
- Setelah A–B live, ukur persist() granted di Android (log lokal).
