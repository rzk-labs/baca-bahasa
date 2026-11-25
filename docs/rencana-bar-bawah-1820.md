# Rencana #1820: Bar bawah reader tak terpotong

## Intinya
- Di HP, label bar bawah terpotong jadi "Halama…" di halaman terakhir.
- Perbaikan: tulis "Terakhir" (pendek), dan cadangan angka "11/11".
- Dikerjakan developer lewat backlog no 188 (P0). Logika tamat/XP tidak berubah.

## 1. Masalah
- Tombol bookmark, Menu, dan Tamatkan memakan lebar bar.
- `#pgn` ber-`text-overflow:ellipsis`, jadi teks panjang jadi "Halama…".
- Dilaporkan Bima, Dina, Tari, Raka.

## 2. Perubahan di `ui.js` (~baris 2402)
- Cabang `akhir`: ganti `nw('Halaman terakhir')` jadi `nw('Terakhir')`.
- Title & aria-label tetap teks lengkap (sudah ada).
- Cabang normal sudah punya fallback bertahap; tambah langkah terakhir angka saja.
- Fallback terakhir: `N/N` (mis. `11/11`), bukan persen.

## 3. Perubahan di `style.css` (~baris 560)
- Untuk `#pgn`, ganti `text-overflow:ellipsis` jadi `clip`.
- Tidak boleh ada "…" tampil di lebar 320, 360, 390px.

## 4. Cara uji
- Lebar 320, 360, 390px: buka halaman terakhir buku belum tamat.
- Pastikan label utuh "Terakhir", tombol Tamatkan tetap terlihat.
- Buku 1 halaman dan buku 100+ halaman: label tetap muat.
- Buku sudah tamat: tetap "Tamat" + centang.
- `node --check ui.js`; naikkan `C` di `sw.js`.
