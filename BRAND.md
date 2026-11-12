# Keepo — Brand v8 "Perpustakaan santai" (arah A)

> Keputusan founder 12 Nov 2026. Detail arah: `docs/desain-arah-brand-baru.md`.
> Sudah diterapkan di app (v8): tanpa maskot untuk semua pengguna & bahasa.

## Intinya
- Arah A: tenang, hangat, seperti pojok baca. Tanpa maskot.
- Untuk semua pengguna dan semua bahasa, tidak fokus satu bahasa.
- Nama Keepo. Tagline: "Baca bukumu sendiri, ngerti bahasanya."

## 1. Identitas
- Nama: **Keepo**. Tagline app: **Kepoin bahasa baru.**
- Logo (pilihan founder, opsi 1 "Titik bata"): teks **Keepo.** Literata tebal 700.
  - Huruf hijau tua #22362B (di latar gelap: krem #F4EFE4).
  - Titik di akhir oranye bata #C4633A.
- Ikon app & favicon: huruf **K.** Literata 700 krem, titik bata, latar hijau tua #22362B.
- Maskot: **tidak ada.** Pakai blok warna flat + ikon garis (`spot()` di ui.js). File `img/kepo-*.webp` tidak ditampilkan.

## 2. Warna
| Peran | Hex |
|---|---|
| Latar krem | #F4EFE4 |
| Hijau tua (tinta, tombol pil, tab bar) | #22362B |
| Oranye bata (aksen, garis, CTA besar) | #C4633A |
| Oranye bata untuk teks kecil | #9A4420 |
| Beige (kartu, blok) | #E7DFCD |
| Blok warna (teks selalu hijau tua) | peach #F2C9A6 · khaki #D8CDB0 · tanah #E3B5A4 · jingga #E39A74 · hijau tengah #3F5B4A (teks putih) · ochre #EDD28F · sage #BFD8C0 |

- Kontras teks min. 4.5:1: hijau tua di krem 11.2 · di beige 9.7 · abu-hijau #4F5C54 di beige 5.3 · #9A4420 di krem 5.7.
- Oranye #C4633A hanya untuk garis/ikon/blok besar/titik logo (3.5), bukan teks kecil.
- Mode sepia & gelap (hijau malam #15201A) tetap ada; teks redup ≥4.5:1.

## 3. Tipografi
- Judul: **Literata** (serif). Teks UI: **Inter**. Baca: Literata (Klasik) atau Inter (Modern).
- Google Fonts (preconnect, `display=swap`), di-cache service worker. Cadangan: Georgia / system-ui.
- Ukuran teks baca tetap bisa diatur pengguna.

## 4. Gaya visual
- **Bento**: blok warna flat bersudut 26 px, tanpa bayangan.
- Tombol **pil** hijau tua; tab bar pil gelap, tab aktif peach.
- Keadaan kosong, sapaan, hasil skor: lingkaran warna + ikon garis.
- Hormati `prefers-reduced-motion`.

## 5. Nada tulisan
- Tenang & hangat. Kalimat pendek. Pakai "kamu".
- Tanpa "yuk" dan "gas". Tanpa tumpukan emoji.
- Benar: "Lanjut di halaman 48, ya."

## 6. Tidak dipakai lagi
- Maskot (gelembung chat lime & semua pose).
- Krem #F2EEE5, tinta #2A1215, font judul Archivo.
- Fokus satu bahasa.

## 7. Yang tetap
- XP (ketuk kata +1, simpan +2, halaman +2, bab +5, ngomong +2…+10, boss +3, kartu +2), level tiap 100 XP, target harian 30 XP, streak, 10 lencana.
- Layar: Home, Baca, Ngomong, Kata.
- Skor ucapan: ≥85 Mantap · 60–84 Dikit lagi · <60 Perlu latihan.
