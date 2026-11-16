# Nada pinyin tanpa warna (#1203)

## Intinya
- Tiap nada kini punya gaya garis bawah sendiri, bukan cuma warna.
- Ada legenda satu baris di belakang kartu Mandarin.
- Legenda bisa ditutup; pilihan diingat.

## 1. Garis bawah per nada
- Nada 1 lurus, 2 putus-putus, 3 bergelombang, 4 tebal, 5 tanpa garis.
- Terbaca di 320px; hanya pakai garis bawah teks, tanpa tambahan lebar.

## 2. Kontras warna
- Warna terang digelapkan: --pt1 #A52A1F, --pt2 #1E6B24, --pt3 #1853A8.
- Semua minimal 4.8:1 di kartu terang (4 tema) dan di atas 5.7:1 di kartu gelap.

## 3. Legenda
- Teks: "Nada: 1 datar · 2 naik · 3 turun-naik · 4 turun".
- Hanya Mandarin, hanya saat pinyin tampil (ikut "Lihat cara baca").
- Tombol "Tutup" / "Lihat arti nada"; disimpan di localStorage `kepo-nada-leg`.
- Tidak mengubah bunyi, jadwal ulang, atau data.
