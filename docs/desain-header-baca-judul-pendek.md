# Desain: judul pendek di header Baca (#1043)

## Intinya
- Header Baca kini memakai judul tanpa nama penulis.
- Judul penuh tetap ada di tooltip dan label aksesibilitas.
- Data buku tidak diubah; hanya tampilan.

## 1. Sebelum
- 'こころ（夏目漱石）' terpotong jadi 'こころ（夏目漱..'.
- '坊っちゃん（夏…' juga terpotong.

## 2. Sesudah
- Tampil 'こころ' dan '坊っちゃん' utuh.
- Memakai `splitTitle(b.title).main`, sama seperti sampul & Home.
- Judul penuh tetap di `title` dan `aria-label`.

## 3. Cek tata letak
- Aturan `.rtitle b` (style.css ~821 dan ~905) tidak bertabrakan: nanti yang menang 1 baris, tetap rapi.
- Tombol 'Bagian x dari y' tetap 44px.
- Perlu uji visual manual di 320, 375, 440px dan layar lebar.
