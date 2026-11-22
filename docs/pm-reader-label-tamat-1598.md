# Reader: label bawah buku tamat tak terpotong (#1598)

## Intinya
- Label bawah reader buku tamat terpotong jadi "Tamat ·…". Artinya tak jelas.
- Perbaikan: tampilkan "Tamat" saja, utuh. Jumlah halaman cukup di label baca layar.
- Cek lebar harus jalan setelah layout, supaya aman di 320, 360, 390px.

## 1. Masalah
- Dilaporkan Tari, Raka, Bima.
- Merusak rasa selesai (P0 kenyamanan membaca).
- Label tamat sekarang `Tamat · N/N`, lalu ringkas ke `Tamat` bila meluap (ui.js, sekitar baris 2192).
- Cek luap (`scrollWidth`) jalan sinkron; hasilnya meleset bila font belum siap atau huruf besar.
- CSS `.rmid #pgn` memakai `text-overflow:ellipsis`, jadi sisa terpotong "…".

## 2. Rencana untuk developer
- Buku tamat: selalu tampil `Tamat`. Tanpa " · " menggantung, tanpa N/N.
- Jumlah halaman tetap di `aria-label` dan `title`.
- Hitung ulang label setelah layout: `requestAnimationFrame` dan `document.fonts.ready`.
- Hitung ulang juga saat `resize` dan perubahan ukuran font.
- Label buku belum tamat: jangan diubah.
- Jangan sentuh tombol bawah (tugas "Baca ulang" terpisah).
- Naikkan versi `C` di `sw.js`. Cek `node --check ui.js`.

## 3. Syarat selesai
- Di 320, 360, 390px (font normal dan besar): label tak pernah berakhir "…".
- Label tamat terbaca "Tamat".
- Pembaca layar membaca "Halaman N dari N".
- Label buku belum tamat sama seperti sebelumnya.

Mockup: `docs/mockup-1598.html`.
