# Rencana: rapikan tampilan Peta di Keepo HQ (#527)

## Intinya
- Peta terasa acak karena catatan tiap tahap panjang dan tinggi kartu beda-beda.
- Solusi: kartu ringkas (nama, status, 1 baris), detail dilipat.
- Hanya ubah tampilan `dev/` (Keepo HQ). Aplikasi Keepo tidak tersentuh.

## 1. Apa yang terlihat berantakan
- Catatan tahap bisa 300+ huruf, tampil penuh di tiap kartu.
- Kartu selebar minimal 230px: tinggi tak seragam, baris bergerigi.
- Tombol "Sumber" ikut banyak, tiap nama dokumen panjang.
- Tautan dokumen di catatan jadi teks biasa, tidak jelas bisa diketuk.
- Dua kotak atas (progres, kapasitas) tidak sejajar dengan isi di bawahnya.

## 2. Rancangan rapi
- Kartu tahap: nomor, nama, chip status, satu baris catatan (potong 2 baris).
- Ketuk kartu: buka detail (catatan penuh + tombol sumber) dengan `<details>`.
- Grid kolom sama tinggi (`align-items:stretch`), 1 kolom di HP, 2-3 di layar lebar.
- Header fase: nama, persen, bar tipis. Fase yang semua selesai dilipat otomatis.
- Fase yang sedang berjalan terbuka dan paling atas.
- Tombol sumber maksimal 1 terlihat; sisanya di dalam detail.

## 3. Tugas lanjutan (untuk developer)
- Ubah `peta()` dan gaya `.stage` di `dev/src/page.html`.
- Cek `node --check dev/src/index.js`; uji di lebar 320px.
- Syarat selesai: tak ada kartu lebih dari 3 baris sebelum dibuka.

## 4. Catatan
- Isi `docs/roadmap.json` tidak diubah; tidak ada status tahap yang naik.
- Bila maksud founder peta lain (mis. peta fase di dokumen), tolong beri tahu.
