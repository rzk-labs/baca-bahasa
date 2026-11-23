# Rancangan: tab Kata "Susah diucap" salah nama & ulang mulai 1 kata (#1751)

Belum dibangun. Kode app tidak diubah. Mockup: `docs/mockup-1751.html`.

## Intinya
- "Susah diucap" memuat kata gagal ucap, tapi dibaca "kata sulit diingat". Ganti jadi "Latih ucap".
- Ulang kata cukup 1 kata, bukan 3. Tombol menyebut jumlah kata sebenarnya.
- Dua perubahan kecil, satu file (`ui.js`), tanpa tab baru, tanpa ubah jadwal ulang.

## 1. Nama segmen "Susah diucap"
Masalah:
- Isi tab = kata yang skor ucapnya di bawah 85% (`weakAll`, ui.js 3475). Bukan kata lupa.
- Sinta (23 Nov) cari kata susah-ingat, tak ketemu, lalu bingung.
- Kotak ringkasan "Susah" (ui.js 3479) dan pesan 3x gagal (ui.js 3415) ikut memakai nama lama.

Tiga pilihan nama (maks 14 karakter, muat 320px):
- **Latih ucap** (10): jelas soal ucapan, ajakan, tidak menghakimi.
- Salah ucap (10): jelas, tapi terasa seperti vonis.
- Ucap susah (10): hampir sama dengan nama lama, masih rancu.

Pilihan: **Latih ucap**.
- Teks bantu satu baris di bawah segmen, hanya saat segmen ini aktif:
  "Kata yang ucapannya belum lolos 85%. Latih lewat tab Ngomong." (60 karakter, satu baris di 320px dengan ukuran `sm`).
- Kotak ringkasan: "Susah" jadi "Ucap". Pesan 3x gagal: `Kata ini masuk daftar "Latih ucap" kok.`
- Kata sulit diingat tidak dapat tab baru. Itu sudah ada di Tersimpan dan Kartu.

## 2. Ulang kata mulai dari 1 kata
Kunci sekarang:
- `quickPick().length < 3` mengunci kartu Home `#q3Lock` (ui.js 1277) dan baris "Besok" Tamat (ui.js 1683).
- `quickPick` sendiri sudah `.slice(0, 3)`, jadi 1-2 kata aman dijalankan `deck()`.

Aturan baru:
- Satu konstanta `Q_MIN = 1` menggantikan angka 3 di tiga tempat itu.
- Putaran memakai `min(3, jumlah kata)`. Urutan, jatuh tempo, dan jadwal tidak berubah.
- Cocok dengan `riset-ulang-dini-belum-jatuh-tempo.md`: batas 3 kata per putaran dan aturan "sembunyikan bila 3+ jatuh tempo" tetap. Dengan 1-2 kata, putaran hanya lebih pendek.
- Teks kartu "Simpan 3 kata dulu" dimiliki tugas Home yang terbuka. Di sini hanya aturan kunci dan teks 0/1/2 kata, supaya selaras.

Teks per kondisi (kartu Home & tombol):
- **0 kata**: kartu terkunci "Simpan 1 kata dulu (0/1)", sub "Ketuk kata di bacaan, lalu Simpan.", tombol "Buka bacaan".
- **1 kata**: kartu terbuka "Ulang 1 kata", sub "Sebentar aja, cuma 1 kata.", tombol "Ulang".
- **2 kata**: kartu terbuka "Ulang 2 kata", sub "Dua kata, sebentar aja.", tombol "Ulang".
- **3+ kata**: tetap "Ulang 3 kata". Baris "Besok" Tamat: "simpan 1 kata, buka Ulang kata" saat 0 kata.
- Ketuk Ulang saat jumlah berubah jadi 0 (kata dihapus): tampil toast "Belum ada kata. Simpan dulu dari bacaan."

## 3. Kriteria uji & file yang disentuh
Uji (maks 5):
- Segmen ketiga bertulis "Latih ucap" di 320px, tak terpotong; teks bantu satu baris.
- Tak ada lagi "Susah diucap" di ui.js (segmen, pesan 3x gagal, kotak ringkasan).
- Akun dengan 1 kata beratikan: kartu "Ulang 1 kata", tombol jalan, selesai tanpa error.
- Akun dengan 0 kata: kartu terkunci "Simpan 1 kata dulu (0/1)"; 2 kata: "Ulang 2 kata".
- Jadwal ulang kata tak berubah; akun dengan 3+ kata tampil seperti sebelumnya.

File/baris (perkiraan):
- `ui.js` ~3482 (label segmen + teks bantu), ~3479 (kotak "Susah"), ~3415 (pesan 3x).
- `ui.js` ~1277 (`#q3Lock`, teks 0/1/2), ~1683 (baris "Besok"), ~3452 (`quickPick`, tetap slice 3).
- `sw.js`: naikkan versi `C`.

Tidak tumpang tindih dengan: kartu Home "Simpan 3 kata" (hanya teksnya), teks Jepang terpotong, streak buku Tamat, chip "Lanjut dari Bagian".
