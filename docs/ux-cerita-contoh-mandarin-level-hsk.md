# Rancangan #2047: Label level HSK di cerita contoh Mandarin

## Intinya
- Cerita contoh Mandarin sudah ada, tapi levelnya tak terlihat. Pemula ragu mencoba.
- Usul: label kecil "Contoh · HSK 1-3" di tiga tempat. Tanpa data baru.
- Label tetap (bukan hitungan) untuk tahap 1. Hanya tampil di Mandarin.

## 1. Di mana label dipasang
- Home kosong: chip "Coba 1 cerita" Mandarin. Teks kecil di bawah nama bahasa.
- Tab Baca: kartu buku contoh Mandarin. Satu chip di baris info buku.
- Sheet "Cerita contoh" (`.sample-pick`): di samping judul 雨天的小书店.
- Sheet buku (detail) memakai chip yang sama. Tidak ada label baru.
- Bukan tugas ini: pintasan "Ulang yang sulit" dan ruang bawah Home.

## 2. Teks label
- Home & sheet contoh: `Contoh · HSK 1-3`.
- Kartu Baca: `HSK 1-3` (kata "Contoh" sudah ada dari judul).
- Aria-label: "Cerita contoh, level HSK 1 sampai 3".
- Tanpa tooltip. Tanpa kata teknis lain.

## 3. Cara menentukan level
- Tahap 1 (usul): label tetap. Cerita ini ditulis dengan kosakata HSK 1-3.
- Alasan: hitungan butuh `hsk.js` dimuat dulu. Home kosong sebaiknya tetap ringan.
- Tahap 2 (opsional): hitung saat tampil, tanpa simpan data.
  - Potong teks dengan `seg()`, buang tanda baca.
  - Persentase kata dengan `hskOf(w) > 0`.
  - 85% atau lebih: `HSK 1-3`. Di bawah itu: label disembunyikan.
- Bila `hskLoad()` gagal: pakai label tetap.

## 4. Kapan disembunyikan
- Bahasa selain Mandarin (en, ko, ja): tidak ada label.
- Buku unggahan pengguna: tidak ada label (levelnya tak diketahui).
- Bila hitungan tahap 2 di bawah 85%.

## 5. Kriteria uji (320px dan 390px)
1. Chip Mandarin di Home kosong menampilkan "Contoh · HSK 1-3". Teks tidak terpotong dan tidak menggeser tombol lain di 320px dan 390px.
2. Kartu Baca dan sheet contoh menampilkan label. Tinggi target ketuk tetap 44px. Tidak ada gulir mendatar.
3. Cerita Inggris, Korea, Jepang, dan buku unggahan tidak menampilkan label. Data lama (IndexedDB) tidak berubah.

Mockup: `docs/mockup-2047.html`. Naikkan versi `C` di `sw.js` saat dibangun.
