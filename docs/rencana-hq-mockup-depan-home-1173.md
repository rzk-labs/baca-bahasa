# Keepo HQ: mockup langsung di depan Home (#1173)

## Intinya
- Mockup sekarang baru terlihat setelah buka detail tugas.
- Usul: kartu Siap dicek di Home HQ langsung memuat mockup mini.
- Founder bisa menilai sekilas, lalu Setujui/Revisi tanpa buka detail.

## 1. Masalah
- Di Home HQ, kartu hanya berisi teks judul dan status.
- Mockup (bahan utama persetujuan) baru muncul di detail (#1125).
- Founder harus ketuk kartu dulu untuk tahu hasilnya.

## 2. Usulan
- Kartu Siap dicek yang punya mockup: tampil pratinjau HP mini di atas judul.
- Pratinjau memuat malas (lazy), hanya saat kartu terlihat (#943).
- Ketuk pratinjau atau kartu: buka detail, mockup besar (#1125).
- Kartu tanpa mockup khusus: tanpa pratinjau, tampil seperti biasa.
- Maksimal 2 pratinjau termuat sekaligus; sisanya kotak abu sampai digulir.

## 3. Batas
- Hanya Keepo HQ (`dev/src/page.html`, render kartu Siap dicek).
- Kerjakan setelah #1125 (backlog 114), pakai kode mockup yang sama.
- Jangan ubah app utama atau `api/`. Cek `node --check dev/src/index.js` bila disentuh.
- Uji lebar 320/390px; kolom Papan tidak melar (#1148).

## 4. Bukti selesai
- Buka Home HQ di HP: kartu Siap dicek menampilkan mockup mini.
- Kartu tanpa mockup tidak berubah.
- Layar tetap cepat digulir.
- Mockup: `docs/mockup-1173.html`.
