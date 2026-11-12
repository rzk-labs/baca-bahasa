# Kontras tema baca (Terang, Sepia, Gelap)

## Intinya
- Semua teks isi & furigana/pinyin sudah lolos 4.5:1 di semua tema.
- Satu masalah: garis tepi kata terpilih di Gelap tak terlihat (1.0:1).
- Sudah diperbaiki jadi 4.25:1. Tema Terang tidak diubah.

## 1. Hasil audit (rasio kontras)
"Ikut HP" memakai warna Terang atau Gelap, jadi hasilnya sama.

| Elemen | Tema | Sebelum | Sesudah |
|---|---|---|---|
| Teks isi | Terang / Sepia / Gelap | 11.23 / 14.75 / 12.40 | sama |
| Furigana/pinyin (.rt) | Terang / Sepia / Gelap | 6.12 / 7.54 / 7.89 | sama |
| Furigana di atas kata sering diketuk | Terang / Sepia / Gelap | 4.88 / 5.76 / 4.75 | sama |
| Garis bawah tersimpan (.saved) | Terang / Sepia / Gelap | 5.68 / 6.21 / 6.56 | sama |
| Garis tersimpan di atas .often | Terang / Sepia / Gelap | 4.53 / 4.75 / 3.95 | sama |
| Teks di kata sering diketuk | Terang / Sepia / Gelap | 8.96 / 11.28 / 7.46 | sama |
| Teks di kalimat sorot | Terang / Sepia / Gelap | 9.81 / 11.73 / 7.94 | sama |
| Kata terpilih (teks di latar) | semua | 8.39 | sama |
| Garis tepi kata terpilih | Terang / Sepia | 4.25 / 4.25 | sama |
| Garis tepi kata terpilih | Gelap | 1.00 | 4.25 |
| Latar kata terpilih vs halaman | Gelap | 9.26 | sama |
| Teks & teks redup di sheet / bar atas | Terang / Sepia / Gelap | min 4.67 | sama |
| Teks di chip bab (.nchip) | Terang / Sepia / Gelap | min 4.67 | sama |

## 2. Yang diubah
- Garis tepi kata terpilih di Gelap & Ikut HP-gelap: `#F2C9A6` → `#9A4420`.
- Versi cache dinaikkan ke `kepo-v125`.

## 3. Beda .often dan .saved
- `.saved` = garis bawah. `.often` = latar berwarna. Beda bentuk, bukan cuma warna.
- Di Sepia & Gelap keduanya tetap terbedakan, dan bisa muncul bersama.

## 4. Catatan
- Latar .often tipis (1.3–1.7:1) terhadap halaman; sengaja, supaya teks tetap jelas.
- Mode fokus meredupkan paragraf lain (opacity .55); sengaja, tidak diubah.
