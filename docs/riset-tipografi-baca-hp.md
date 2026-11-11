# Riset #187: Tipografi e-reader HP — ukuran huruf & spasi untuk JP/KR/ZH/Latin

Status: draft. Dibuat tanpa akses internet; angka sumber dari ingatan, **perlu dicek ulang** (⚠️).
Tanda: 📚 pedoman/riset · 💬 praktik umum/opini · ⚠️ belum dibuka ulang · 🔧 fakta dari kode Keepo.
Tidak mengulang: `riset-pemotongan-kata-jp-kr.md` (cara memotong kata) dan `riset-cara-baca-romanisasi.md` (romaji/pinyin).

## Intinya
- Nilai Keepo sekarang wajar. Yang melenceng: huruf awal 19px agak kecil untuk pemula Jepang/Korea/Mandarin.
- Pemula butuh huruf ~+1-2px dan baris lebih longgar. Saran: nilai awal per bahasa, tetap bisa diubah.
- Risiko salah ketuk terbesar: kata 1-2 kanji di iPhone. Area ketuk belum diperlebar.

## 1. Kata pedoman & riset

### Ukuran huruf
- Apple HIG: teks isi default 17pt di iPhone; minimal sekitar 11pt. 📚 ⚠️
- Praktik web: teks bacaan panjang di HP 16-20px. 💬 ⚠️
- Aksara padat (kanji/hanzi/hangul) butuh sedikit lebih besar dari Latin agar sama jelas. 💬 ⚠️
- JLREQ (Jepang) & CLREQ (Mandarin) dari W3C: tidak memberi angka px; fokusnya tata letak. 📚 ⚠️

### Tinggi baris
- Latin: 1.4-1.6 umum; WCAG 1.4.12 minta teks tetap terbaca di 1.5. 📚 ⚠️
- Jepang: baris horizontal perlu lebih longgar dari Latin; praktik web ~1.7-2.0. 📚💬 ⚠️
- Mandarin: praktik ~1.6-1.8. 💬 ⚠️
- Korea: praktik ~1.6-1.8. 💬 ⚠️
- Pegangan kasar: CJK sekitar 0,2-0,3 lebih longgar dari Latin.

### Lebar baris
- Latin: 45-75 karakter per baris; HP biasanya 30-40, sudah di bawahnya. 📚 ⚠️
- CJK: sekitar 25-40 huruf per baris nyaman. 💬 ⚠️
- Di HP lebar ditentukan layar. Yang bisa diatur hanya huruf & margin.
- CJK sebaiknya tidak rata kiri-kanan (justify); Latin boleh. 💬

### Jarak antar paragraf
- Latin: 0.5-1em atau indent baris pertama. 💬 ⚠️
- Cetak Jepang/Mandarin: biasanya indent 1 huruf, tanpa jarak. Di layar, jarak ~0.5-1em umum. 💬 ⚠️
- Tidak kritis; jarak membantu mata menemukan awal paragraf.

## 2. Bandingkan dengan Keepo sekarang 🔧

| Hal | Nilai Keepo | Pedoman (kasar) | Status |
|---|---|---|---|
| Huruf awal (`fs: 19`, tombol Reset) | 19px | Latin 16-20 | ✅ Latin; ⚠️ kecil untuk CJK pemula |
| Rentang huruf (`setFs`) | 16-28px, langkah 1 | 16-28 | ✅ |
| Jarak baris Latin | 1.7 (pilihan 1.5/1.7/1.9) | 1.4-1.6 | ✅ longgar |
| Jarak baris CJK | 1.8 tetap di CSS | 1.7-2.0 | ✅ nilai; ❌ tidak ikut pilihan |
| Margin halaman | 12 / 24 / 48px | – | ✅ |
| Paragraf | `margin: 0 0 .9em` | 0.5-1em | ✅ |
| Rata teks | Latin justify (layar lebar), CJK start | CJK jangan justify | ✅ |

### Yang melenceng
1. **Pilihan jarak baris diabaikan untuk CJK.** CSS memaksa `line-height:1.8` untuk ja/ko/zh (style.css:297 menimpa :295; pilihan di ui.js:216). Tombol 1.5/1.7/1.9 tampak rusak di buku Jepang/Korea/Mandarin.
2. **Huruf awal sama untuk semua bahasa (19px).** Pemula CJK butuh lebih besar (bagian 3).
3. **Kata = `span.w` inline tanpa tambahan area.** Tinggi ≈ `font-size × line-height`; lebar hanya hurufnya. Kata 1 kanji di 19px ≈ 19px lebar, jauh di bawah 44pt Apple (bagian 4).
4. **Zona tepi membalik halaman.** Ketukan yang tidak kena kata dan jatuh di 25% kiri/kanan pindah halaman (ui.js:446). Meleset dari kata → halaman tiba-tiba pindah.
5. **Daftar font CJK tanpa font Mandarin** (`Noto Sans JP/KR`, Hiragino, Apple SD Gothic Neo). `zh-CN` jatuh ke sans-serif bawaan. ⚠️ Cek apakah hanzi tampil bergaya Jepang di iPhone; perlu uji perangkat.
6. Pilihan font "serif" hanya terasa di Latin; buku CJK tetap sans. Bukan bug, tapi bisa membingungkan.

## 3. Pemula butuh lebih besar & lebih longgar

Alasan (hipotesis 💬 ⚠️, belum diuji pengguna Keepo):
- Pemula membaca pelan, memindai huruf satu per satu, dan sering mengetuk.
- Kanji/hanzi/hangul padat butuh piksel lebih banyak agar tidak tertukar.
- Baris longgar mengurangi salah ketuk ke baris atas/bawah.

### Angka saran (titik awal untuk diuji, bukan fakta)
| Bahasa | Huruf awal | Jarak baris | Catatan |
|---|---|---|---|
| Inggris / Latin | 19px (tetap) | 1.7 (tetap) | Sudah baik |
| Jepang | **21px** | **1.9** | Kanji padat |
| Mandarin | **21px** | **1.8** | Hanzi padat |
| Korea | **20px** | **1.8** | Hangul lebih mudah dibedakan |

- Rentang 16-28px sudah cukup; tidak perlu diubah.
- Pengguna yang sudah lancar boleh turun sendiri; itu sebabnya hanya nilai awal.

### Perlu preset per bahasa?
- **Ya, tapi diam-diam.** Cukup nilai awal berbeda sesuai bahasa buku.
- Hormati pilihan pengguna: begitu ia mengubah sendiri, jangan ditimpa.
- Jangan buat menu preset baru; pemula tidak tahu angka mana yang pas.
- Ide: simpan `fs`/`lh` per bahasa, bukan satu untuk semua. Sekarang `db.fs` global; pengguna dengan buku Inggris + Jepang harus gonta-ganti.

## 4. Mengetuk kata di aksara padat

### Ukuran area ketuk minimum
- Apple HIG: 44×44pt. 📚 ⚠️
- Material Design: 48×48dp. 📚 ⚠️
- WCAG 2.5.8 (AA): minimal 24×24 CSS px; 2.5.5 (AAA): 44×44. 📚 ⚠️
- Teks inline dikecualikan dari WCAG, tapi di Keepo tiap kata adalah target utama, jadi patokan tombol tetap relevan. 💬

### Keadaan Keepo 🔧
- Tinggi target ≈ 19×1.8 ≈ 34px (CJK), 19×1.7 ≈ 32px (Latin). Di bawah 44.
- Lebar kata 1 kanji ≈ 19-21px; di bawah 24 pada huruf awal.
- Partikel 1 huruf (は, が, を) = target tersempit. ⚠️ Belum dicek apakah dibungkus `.w`.
- Kata Latin 2-3 huruf ("is", "to") sama sempit.

### Risiko di iPhone
- Jempol menutupi ±40-50px; sulit membidik tepat. 💬
- CJK tanpa spasi: kata menempel dengan tetangga, tak ada celah peredam salah ketuk. 💬
- iPhone kecil (320-375px): hanya ±15-18 huruf CJK per baris; kata terpotong di ujung baris. ⚠️ Perlu diukur.
- Tekan lama 450ms memilih kalimat (ui.js:430); ketukan lambat bisa terbaca tekan lama. ⚠️
- Geser >45px membalik halaman (ui.js:439); jempol sedikit bergeser saat mengetuk bisa pindah halaman. 🔧

### Cara menambah area ketuk tanpa mengubah tampilan (ide, perlu uji)
- Cari kata terdekat dari titik ketuk (jarak ±8px) bila ketukan meleset. Akurat, sedikit kode.
- Alternatif: perluas lewat padding/margin negatif atau `::after` transparan. Hati-hati menumpuk dengan kata tetangga.
- Jangan menaikkan `line-height` hanya demi target; itu mengurangi teks per halaman.

## 5. Rekomendasi

### Maks 3 perubahan kecil untuk developer (urut dampak)
1. **Ketuk toleran:** pilih kata terdekat (±8px) bila ketukan jatuh di sela kata. Hanya di area teks. Dampak: salah ketuk turun di semua bahasa.
2. **Jarak baris CJK ikut pilihan pengguna:** hapus `line-height:1.8` tetap; pakai `--reader-lh`. Perbaikan bug kecil.
3. **Huruf awal per bahasa:** JP/ZH 21px, KR 20px, lainnya 19px, selama pengguna belum mengubah sendiri. Simpan pilihan per bahasa. Naikkan versi `sw.js`.

### 3 pertanyaan untuk diuji ke pengguna
1. "Baca satu halaman ini. Sudah nyaman, atau matamu cepat capek?" (bandingkan 19 vs 21px, Jepang)
2. "Ketuk kata 1 kanji ini. Berapa kali meleset? Kata yang terbuka sudah yang kamu maksud?"
3. "Pernah ketuk kata tapi halaman malah pindah? Kapan?"

Cara uji: ikuti `riset-uji-pakai-5-orang.md`; minimal 3 peserta pemula CJK, iPhone dan Android.

## 6. Belum terverifikasi
- Semua angka pedoman (Apple HIG, WCAG, Material, JLREQ/CLREQ) dari ingatan. Buka ulang sebelum jadi keputusan:
  - https://www.w3.org/TR/jlreq/ · https://www.w3.org/TR/clreq/
  - https://developer.apple.com/design/human-interface-guidelines/
  - https://www.w3.org/TR/WCAG22/ (1.4.12, 2.5.5, 2.5.8)
- Angka saran per bahasa (21/20/19px, 1.8-1.9) = hipotesis, bukan hasil studi.
- Partikel 1 huruf dibungkus `.w` atau tidak: belum dicek di kode.
- Tampilan hanzi di font bawaan iPhone: belum diuji perangkat.
- Studi keterbacaan layar kecil khusus pemula CJK: tidak ada yang saya ingat pasti. Kata kunci cari: "Chinese reading small screen font size legibility".
