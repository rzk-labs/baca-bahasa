# Desain: rak Koleksi kamu tak tertutup menu bawah (#1495)

## Intinya
- Rak Koleksi di Home HP sekarang bisa digulir penuh di atas menu.
- Judul buku tampil utuh, maksimal dua baris.
- Jarak bawah dihitung dari menu + safe-area + ruang napas.

## 1. Penyebab
- Banyak aturan jarak bawah bertumpuk di style.css.
- Aturan terakhir hanya memberi 136px, kurang dari menu + penutup bawah.

## 2. Perubahan
- Jarak bawah Home: safe-area + tinggi menu + 82px.
- Rak diberi scroll-margin supaya kartu terakhir tak tertahan menu.
- Judul: tinggi 40px, 2 baris, ellipsis.

## 3. Uji
- Lebar 320px dan layar lebar: kartu terakhir terbaca penuh.
- Tidak menyentuh kartu Streak, chip header, popup Level, rak Profil.

Mockup: docs/mockup-1495.html
