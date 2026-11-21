# Spesifikasi: Home — 'Sudah tamat' tak dobel & lencana Keepo Pertama jelas (#814)

## Intinya
- Kartu Home buku tamat menulis 'Sudah tamat' dua kali. Cukup sekali.
- Lencana 'Keepo Pertama' terbuka hanya karena cek arti. Terasa palsu saat 0 kata tersimpan.
- Lencana lama pengguna tidak boleh dicabut.

## 1. Masalah
- Pelapor: Dina, Raka, Bima (masukan AI).
- `ui.js:746`: label atas kartu = 'Sudah tamat' bila persen ≥ 100.
- `ui.js:1357`: `heroPos()` juga mengembalikan 'Sudah tamat'. Jadi dobel.
- `ui.js:154`: syarat 'Keepo Pertama' = `db.stat.look >= 1` (hanya cek arti).
- Profil bisa menampilkan 0 kata disimpan, padahal lencana sudah terbuka.

## 2. Perbaikan A — kartu tamat
- Pertahankan label atas 'Sudah tamat'.
- Ganti teks bawah judul (`heroPos`, cabang `p.done`) jadi 'Baca lagi dari awal'.
- `heroPos` hanya dipakai di kartu hero Home. Cek tak ada kartu Koleksi/Profil dengan teks dobel.
- Jangan sentuh area sheet arti kata (tugas #75 / peta 75).

## 3. Perbaikan B — lencana
- Deskripsi baru: 'Ketuk 1 kata & simpan'.
- Syarat baru: `db.vocab.length >= 1` (kata tersimpan), bukan `stat.look`.
- Lencana yang sudah ada di `db.badges` tetap. `award` hanya menambah, tidak mencabut.
- Pengguna lama yang baru cek arti kehilangan peluang otomatis. Mereka dapat lencana saat simpan kata pertama.

## 4. Uji & rilis
- Uji di 320px dan layar lebar: kartu tamat tidak patah, tak ada teks dobel.
- Uji lencana: akun baru 0 kata → terkunci; simpan 1 kata → terbuka.
- Uji akun lama dengan lencana terbuka → tetap terbuka.
- `node --check ui.js`, lalu naikkan versi `C` di `sw.js`.
