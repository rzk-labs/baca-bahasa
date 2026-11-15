# Spesifikasi: semua kemungkinan arti & frasa di kartu kata

Tugas #1121 · Peran PM · Mockup: `docs/mockup-1121.html` · Terkait: #1106 (`docs/riset-arti-ini-salah.md`)

## Intinya
- Kartu Kata kini cuma satu arti ("initial" = "PARAF"). Pembaca butuh semua arti.
- Tampilkan arti per jenis kata, plus frasa dan contoh dari ceritamu sendiri.
- Data sudah ada di layanan terjemahan; tinggal dibuka, tanpa layanan baru.

## 1. Kondisi sekarang
- Kartu Kata (tab Kata) menampilkan 1 arti besar. Screenshot: "initial" → "PARAF".
- Kartu arti saat baca menampilkan "Bisa juga:" maks 4 arti + 2 jenis kata.
- Layanan terjemahan (`gtxFetch`, app.js) mengambil maks 6 arti per jenis kata.
- Kartu Kata tidak menyimpan daftar arti, hanya `t` (satu arti) dan `pos`.
- Frasa tidak diambil sama sekali.

## 2. Yang dibangun
- **Semua arti**: simpan semua jenis kata + arti (maks 8 per jenis, 5 jenis) di kartu Kata.
- **Tombol "Semua arti"** di kartu Kata: membuka lembar berisi arti dikelompokkan per jenis kata.
- Arti pertama = arti utama (besar, seperti sekarang). Sisanya urut paling umum dulu.
- **Frasa**: tambah `dt=ex` (contoh kalimat) ke permintaan; tampilkan maks 3 contoh dengan kata tebal.
- **Frasa dari ceritamu**: kalimat asal kata (`ctx`) + kata lain tersimpan yang memuat kata ini.
- Frasa tetap "terjemahan mesin, bisa keliru"; jangan klaim lengkap.

## 3. Aturan
- Data lama aman: kata tersimpan tanpa daftar arti tetap jalan, tampil seperti sekarang.
- Isi daftar arti saat kartu dibuka bila kosong (jaringan ada); gagal → pesan + "Coba lagi".
- Offline: tampilkan yang tersimpan; tanpa spinner tanpa akhir.
- Kamus Jepang offline (`jaLookup`): arti sudah banyak (dipisah `;`), tampilkan semuanya.
- Hormati arti pilihan sendiri dari #1106: arti pilihan jangan tertimpa daftar baru.
- Jaga ukuran data: maks 40 istilah per kata; cache terjemahan tetap ada batasnya.
- Teks tombol/judul bahasa santai: "Semua arti", "Frasa & contoh".

## 4. Kriteria selesai
- Ketuk "Semua arti" di kartu "initial" → lihat jenis kata: kata sifat, kata benda, dll.
- Tiap jenis kata punya daftar arti; "paraf" bukan satu-satunya.
- Ada 1-3 contoh frasa; kosong → bagian disembunyikan, bukan error.
- Berfungsi di HP 360px dan layar lebar; tab bawah tidak menutupi isi.
- Kata lama tanpa daftar arti tidak error.
- `node --check` lolos; naikkan versi `C` di `sw.js`.

## 5. Risiko
- Layanan gratis bisa kena batas; arti dari MyMemory tidak punya daftar jenis kata.
- Arti per jenis kata dari kamus Google bisa terlalu banyak; batasi dan urut.
- Mandarin/Korea: kamus lebih tipis, daftar bisa pendek (lihat `docs/riset-sumber-kamus.md`).
- Contoh kalimat dari mesin perlu label "contoh otomatis".
