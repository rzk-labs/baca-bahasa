# Papan Tugas HP: kolom kosong di tengah (#1212)

## Intinya
- Di HP, kolom kosong ("Dikerjakan 0") jadi tinggi, judulnya terdorong ke tengah layar.
- Penyebab: kolom kosong dibuat rata-tengah, tingginya ikut kolom terpanjang.
- Perbaikan kecil: kolom kosong jadi baris pendek di atas, judul + "Kosong" sebaris.

## 1. Yang terlihat (dari gambar masukan)
- Kolom "Dikerjakan" biru muda memanjang satu layar penuh.
- Judul "Dikerjakan 0 · Kosong" ada di tengah, bukan di atas.
- Kolom sebelah ikut mengintip di kanan.

## 2. Penyebab
- Papan HP: kolom berjajar ke samping, tinggi baris = kolom terpanjang.
- Kolom kosong memakai rata-tengah vertikal, jadi isinya melayang ke tengah.
- Kolom kosong ikut tertarik setinggi kolom lain.

## 3. Perbaikan (untuk developer, Keepo HQ saja)
- Kolom kosong: tinggi hanya secukupnya (rata atas, tidak ditarik).
- Judul dan tulisan "Kosong" sebaris, tinggi sekitar 48px.
- Kolom berisi tidak berubah. Desktop tidak berubah.
- Cek HP lebar 390px: tidak ada ruang kosong besar.

## 4. Berkas terkait
- `dev/src/page.html` (aturan `.board`, `.col.kosong`). Cek dengan `node --check dev/src/index.js`.
- Mockup: `docs/mockup-1212.html`.
