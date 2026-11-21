# Spesifikasi: form "Perintah ke tim" rapi di HP (#931)

## Intinya
- Di iPhone, form Perintah ke tim terlihat zoom, terpotong, dan berantakan.
- Penyebab utama: kolom ketik berhuruf 15px, jadi iPhone otomatis zoom saat diketuk.
- Perbaikan kecil di CSS dan form Keepo HQ saja (`dev/src/page.html`).

## 1. Yang terlihat di screenshot
- Tombol peran terpotong ("Market…"), layar bergeser ke samping.
- Tombol PM jatuh sendirian di baris kedua (5 peran, grid 4 kolom).
- Placeholder di kotak ketik terpotong di kanan.
- Tombol keyboard iPhone menutupi bagian bawah form.

## 2. Penyebab
- `textarea`/`input` memakai `--fs` 15px. iPhone zoom otomatis bila di bawah 16px.
- Kolom `.roles` dipaksa 4 kolom, padahal ada 5 peran.
- Kotak ketik `autofocus` saat sheet dibuka, jadi zoom langsung terjadi.

## 3. Perbaikan yang diminta
- Semua `textarea, input, select` di HP: `font-size:max(16px,var(--fs))`.
- `.roles`: 5 kolom rata (atau 3+2 rata tengah) di HP; ikon 20px, teks 11px.
- Hapus fokus otomatis di HP (layar ≤700px); fokus hanya di layar lebar.
- Placeholder boleh turun baris; textarea `min-height:96px` di HP.
- Sheet: `overflow-x:hidden`, tombol "Kirim ke tim" tetap terlihat di atas keyboard.
- Terapkan juga ke form Revisi (`#rv`) dan sheet lain yang memakai textarea.

## 4. Cara cek
- iPhone Safari: buka Perintah ke tim, ketuk kotak. Layar tidak zoom, tidak bergeser.
- Lima peran terlihat utuh dalam satu layar tanpa digeser.
- Layar lebar tampil sama seperti sebelumnya.
- Jalankan `node --check dev/src/index.js` bila ada file JS yang berubah.
