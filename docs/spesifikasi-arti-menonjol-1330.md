# Spesifikasi: semua arti & frasa tampil menonjol di kartu arti saat baca

Tugas #1330 · Peran PM · Mockup: `docs/mockup-1330.html` · Terkait: #1121, #1170, #1106

## Intinya
- Arti utama sering kurang pas; arti lain kini kecil dan tersembunyi.
- Tampilkan semua arti & frasa langsung di kartu arti, dengan gaya menonjol.
- Data sudah ada; ini perubahan tampilan, tanpa layanan baru.

## 1. Kondisi sekarang
- Kartu arti saat baca: 1 arti besar, lalu "Bisa juga:" kecil abu-abu.
- Arti lain dipangkas: 1 baris + maks 2 jenis kata × 3 arti.
- Daftar lengkap & frasa baru ada di kartu Kata (#1121), bukan saat baca.
- Pembaca yang artinya tak pas harus cari tombol "Arti ini salah?".

## 2. Yang dibangun
- **Arti lain jadi chip besar** tepat di bawah arti utama, bukan teks kecil.
- Chip bisa diketuk: jadikan arti pilihan (pakai alur #1106 yang ada).
- **Semua arti**: tampilkan semua jenis kata, maks 8 arti per jenis.
- Lebih dari 6 chip: tampil 6, sisanya di tombol "Lihat semua (n)".
- **Frasa & contoh**: maks 3, kata sasaran ditebalkan, label "contoh otomatis".
- Frasa kosong → bagian disembunyikan, bukan error.
- Arti utama tetap paling besar; chip arti lain di urutan kedua.

## 3. Aturan
- Pakai data yang sama: `altArti`/`altFill` (ui.js), `gtxFetch` dengan `dt=ex` (app.js).
- Hormati arti pilihan #1106; jangan timpa saat daftar dimuat.
- Offline: tampilkan yang tersimpan; tanpa spinner tanpa akhir.
- Kamus Jepang offline: tampilkan semua arti (dipisah `;`).
- Jangan klaim lengkap: "Terjemahan mesin, bisa keliru".
- Kartu tetap muat di HP 360px; isi panjang digulir, tidak menutupi teks bacaan.

## 4. Kriteria selesai
- Ketuk kata "sister" → arti utama + chip arti lain terlihat tanpa ketukan tambahan.
- Chip memakai gaya menonjol (Biru Es, huruf tebal), bukan abu-abu kecil.
- Ketuk chip → arti itu jadi pilihan & tersimpan di kartu Kata.
- Ada 1-3 contoh frasa; kosong → bagian hilang.
- Data lama tanpa daftar arti tidak error.
- `node --check` lolos; naikkan versi `C` di `sw.js`.

## 5. Risiko
- Kartu jadi tinggi; batasi 6 chip + gulir internal.
- MyMemory tak punya jenis kata; tampil tanpa pengelompokan.
- Mandarin/Korea: daftar bisa pendek; itu wajar.
