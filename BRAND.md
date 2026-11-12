# Kepo — Brand & UI v8 "Perpustakaan santai"

> v8 (2026-11-12): founder pilih arah A, **tanpa maskot** untuk semua pengguna & bahasa. Acuan: `docs/desain-arah-brand-baru.md`.
> Riwayat: v7 maskot lime, v6 "fun tapi profesional", v5 neon — ada di riwayat git.

## Brand
| | |
|---|---|
| Nama | **Kepo** (logo teks "Keepo" serif) |
| Tagline | **Kepoin bahasa baru.** (alternatif: "Baca bukumu sendiri, ngerti bahasanya.") |
| Rasa | Hangat · tenang · rapi · seperti pojok baca |
| Maskot | **Tidak ada.** Pakai blok warna flat + ikon garis (`spot()` di ui.js). File `img/kepo-*.webp` tidak dipakai lagi. |

## Intinya
- Arah A: tenang, hangat, seperti pojok baca. Tanpa maskot.
- Untuk semua pengguna dan semua bahasa, tidak fokus satu bahasa.

## 1. Identitas
- Nama: **Keepo**.
- Logo: teks serif, tanpa maskot.
- Ikon aplikasi: huruf K serif hijau tua.

## 2. Warna
| Peran | Hex |
|---|---|
| Latar krem | #F4EFE4 |
| Hijau tua (tinta, tombol pil, tab bar) | #22362B |
| Oranye bata (aksen, garis, CTA besar) | #C4633A |
| Oranye bata untuk teks kecil | #9A4420 |
| Beige (kartu, blok) | #E7DFCD |
| Blok warna (teks selalu hijau tua) | peach #F2C9A6 · khaki #D8CDB0 · tanah #E3B5A4 · jingga #E39A74 · hijau tengah #3F5B4A (teks putih) · ochre #EDD28F · sage #BFD8C0 |

Kontras teks min. 4.5:1 (sudah dicek): hijau tua di krem 11.2 · di beige 9.7 · abu-hijau #4F5C54 di beige 5.3 · #9A4420 di krem 5.7.
Oranye #C4633A **hanya** untuk garis/ikon/blok besar (kontras 3.5), bukan teks kecil.
Mode sepia & gelap (hijau malam #15201A) tetap ada; teks redup disesuaikan (≥4.5:1).

- Teks utama pakai tinta di atas latar atau permukaan.
- Aksen untuk tombol penting dan sorotan kecil.
- Cek kontras tiap pasangan warna sebelum dipakai.

## 3. Tipografi
- Judul: **Literata** (serif) 800. Teks UI: **Inter**. Baca: Literata (Klasik) atau Inter (Modern).
- Google Fonts (preconnect, `display=swap`), di-cache service worker. Cadangan: Georgia / system-ui.
- Ukuran teks baca tetap bisa diatur pengguna.

## 4. Gaya visual
- **Bento**: blok warna flat bersudut 26 px, tanpa bayangan.
- Tombol **pil** hijau tua; tab bar pil gelap, tab aktif peach.
- Keadaan kosong, sapaan, hasil skor: lingkaran warna + ikon garis.
- Ikon app: huruf K serif krem di latar #22362B (192, 512, maskable, 180).
- Ikon garis sederhana, tebal garis seragam.
- Hormati `prefers-reduced-motion`; efek seperlunya.

## 5. Nada tulisan
- Tenang & hangat. Kalimat pendek. Pakai "kamu".
- Tanpa "yuk" dan "gas". Tanpa tumpukan emoji.
- Benar: "Lanjut di halaman 48, ya."
- Salah: "Yuk gas lanjut baca!!! 🔥🔥🔥"

## Gamifikasi
- **XP:** ketuk kata +1 · simpan kata +2 · balik halaman +2 · bab baru +5 · tantangan ngomong +2…+10 (+5 bila ≥85%) · kalahkan boss +3 · kartu hafal +2.
- **Level** tiap 100 XP · **target harian** 30 XP · **streak** · **10 lencana**.

## Layar
- **Home:** judul → sapaan → bento (Lanjut baca · Level · Target · Streak · Skor · Tantangan) → lencana → koleksi → Tambah cerita.
- **Baca:** e-reader layar penuh; ketuk kata → arti kata → arti kalimat → coba ngomongin.
- **Ngomong:** mic bulat hijau tua, skor per kata (sage/ochre/tanah), cincin skor → boss.
- **Kata:** Kartu · Tersimpan · Susah diucap.

## 6. Tidak dipakai lagi
- Maskot (gelembung chat lime & semua pose).
- Krem #F2EEE5 dan tinta #2A1215.
- Font judul Archivo condensed.
- Fokus satu bahasa.

## 7. Yang tetap
- XP, level, target harian, streak, dan lencana tetap ada.
- Alur layar Home, Baca, Ngomong, Kata tidak berubah.
- Skor ucapan: ≥85 Mantap · 60–84 Dikit lagi · <60 Perlu latihan.
