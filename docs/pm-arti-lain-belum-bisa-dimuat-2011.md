# "Arti lain belum bisa dimuat" terus (#2011)

## Intinya
- Kata "drawn": arti lain gagal terus, "Coba lagi" tak menolong, padahal ada sinyal.
- Penyebab: bila layanan kamus utama menolak, jalur cadangan tak pernah dicoba.
- Perbaikan: cadangan tetap dicoba; "belum bisa dimuat" hanya bila semua jalur gagal.

## 1. Masalah (dari foto masukan)
- Sheet "drawn": arti DIGAMBAR, ada tanda "perkiraan" dan "(tebakan)".
- Tanda itu pertanda layanan kamus utama sedang menolak (batas pemakaian).
- Kotak Arti lain: "Arti lain belum bisa dimuat" + "Coba lagi". Ketuk lagi, tetap sama.

## 2. Penyebab (dari kode, belum diuji di perangkat)
- `fillAlt` di `ui.js`: jalur biasa memanggil `altFill` (`app.js`).
- `altFill` melempar galat bila layanan utama menolak (`altFetch`: `gtx 429`/timeout).
- Galat itu langsung ke `catch` → status "gagal". `altExtra` (kata dasar, pivot Inggris, MyMemory) tak pernah jalan.
- `altExtra` hanya jalan bila layanan utama menjawab kosong, bukan bila menolak.
- Tombol "Coba lagi" (`#wacoba`) memanggil `fillAlt(false)`: jalur sama, gagal sama.
- Pivot lewat Inggris juga memakai layanan utama; hanya MyMemory berdiri sendiri.

## 3. Perbaikan untuk developer
- Di `fillAlt`: bungkus langkah layanan utama dengan try/catch sendiri. Galat = lanjut ke `altExtra`.
- Hanya bila `altExtra` juga melempar (semua jalur gagal), status jadi "gagal".
- Bila `altExtra` mengembalikan chip: tampil biasa (status "ada").
- Bila layanan utama gagal tapi cadangan jawab kosong: status "kosong", tombol "Terjemahkan ulang" muncul.
- Tetap batas 8 detik total dan pembatalan #1902. Format data lama tak berubah.
- Jangan simpan hasil cadangan sebagai cache arti utama.

## 4. Cara uji
- Blokir `translate.googleapis.com` di DevTools, buka "drawn": chip dari MyMemory muncul.
- Blokir keduanya: "belum bisa dimuat" + "Coba lagi"; buka blokir, ketuk: chip muncul.
- Mode pesawat: pesan lama tetap.
- Kata "walked" dan "bonjour": perilaku #1975 tak berubah.
- Uji 320px dan 390px.

## 5. Tugas developer
- Item backlog #198 (P0). Ubah `fillAlt` di `ui.js`. Naikkan `C` di `sw.js`.
- Mockup: `docs/mockup-2011.html`.
