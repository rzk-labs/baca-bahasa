# Keepo HQ: satu mockup saja, bukan dua (#1245)

## Intinya
- Kartu "Siap dicek" kadang punya dua kotak mockup.
- Satu berisi mockup asli, satu lagi bertuliskan "Belum ada gambar".
- Perbaikan: tampilkan satu kotak mockup saja, tanpa tulisan "belum ada".

## 1. Penyebab
- Kotak "🖼️ Mockup" (gambar SVG/PNG) selalu muncul saat status siap.
- Kotak "📱 Mockup visual" (halaman HTML) muncul terpisah.
- Bila hanya ada mockup HTML, kotak gambar tampil kosong.

## 2. Perbaikan (untuk developer)
- Di `dev/src/page.html`, kotak gambar hanya muncul bila ada gambar.
- Bila ada gambar dan mockup HTML: gabung jadi satu bagian "Mockup".
- Bila tidak ada keduanya: tampilkan satu catatan kecil, bukan kotak kosong.
- Tombol Setujui tetap di bawah mockup.

## 3. Cara cek
- Hasil dengan mockup HTML saja: satu kotak, tanpa "Belum ada gambar".
- Hasil dengan gambar saja: satu kotak gambar.
- Hasil tanpa mockup: satu catatan, bukan dua kotak.
