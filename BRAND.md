# Keepo — Brand & UI v9 "Halaman tenang, stabilo yang kepo"

> v9 (2026-11-12): hasil riset brand mendalam, disetujui founder. Riset & sumber: `docs/riset-brand-identitas.md`.
> Menggantikan v8 "Perpustakaan santai" (krem/hijau tua/bata, Literata). Riwayat lama ada di git.

## Intinya
- **Halaman baca milik pembaca:** polos, tenang, tanpa warna brand.
- **Satu tanda khas:** kuning stabilo hanya untuk kata yang ditandai.
- **Tanpa maskot, tanpa neon, tanpa tulisan sok gaul.** Untuk semua pengguna & semua bahasa.

## 1. Identitas
| | |
|---|---|
| Nama | **Keepo** |
| Tagline | **Baca bukumu sendiri, ngerti bahasanya.** |
| Ide brand | Rasa kepo = menandai kata yang bikin penasaran, seperti stabilo di buku. |
| Rasa | Tenang · jernih · ingin tahu · tidak menggurui |
| Logo | Kata **"Keepo"** Bricolage Grotesque 800, tinta Plum Noir, dengan **coretan stabilo Wasabi** di separuh bawah huruf (bukan titik, bukan maskot). |
| Ikon app | **Buku terbuka** Biru Es di latar Plum Noir, satu baris teks disorot stabilo Wasabi; tanpa maskot & tanpa huruf. Favicon 48 px disederhanakan: dua halaman + satu garis Wasabi. Maskable: isi di area aman tengah 80%. Ukuran 180/192/512 + maskable. |
| Maskot | **Tidak ada.** File `img/kepo-*.webp` tidak dipakai. |

Aturan logo: jangan ubah warna stabilo, jangan miring/bayangan, ruang kosong minimal setinggi huruf "e".

## 2. Warna — sistem dua lapis
### Lapis brand (beranda, menu, tombol, kartu, konten media sosial)
| Nama | Hex | Peran |
|---|---|---|
| Plum Noir | `#351E28` | Tinta: teks, tombol utama, tab bar, logo |
| Stabilo Wasabi | `#E9F056` | **Hanya** kata ditandai, coretan logo, isi progres |
| Biru Es | `#D7EFFF` | Latar beranda & menu |
| Jade | `#AEB8A0` | Kartu sekunder, status |
| Kertas | `#FAF7F0` | Permukaan kartu, teks di atas Plum |
| Abu plum | `#6B5E66` | Teks redup (kontras 5,7 di Kertas) |

### Lapis baca (halaman buku; dipilih pengguna di pengaturan baca)
| Tema | Latar | Teks | Kontras | Kapan |
|---|---|---|---|---|
| Kertas (bawaan) | `#FAF7F0` | `#2B2228` | 14,4 | Siang, baca biasa |
| Sepia | `#F3E9D7` | `#3B2F25` | 10,8 | Baca lama |
| Hijau tenang | `#E3EEDC` | `#22301F` | 11,6 | Mata lelah |
| Malam | `#1E1A1D` | `#E8E2DA` | 13,4 | Sebelum tidur |

- Kata ditandai di semua tema: latar `#E9F056`, teks `#351E28` (kontras 12,5).
- **Jangan** pakai putih murni `#FFF` atau hitam murni `#000` untuk teks/latar baca.
- Warna brand (Biru Es, Jade) **tidak** masuk ke halaman baca.
- Kontras teks minimal 4,5:1; teks baca diusahakan ≥7:1.
- Hindari hijau cerah (milik Duolingo) dan oranye (milik Migaku) sebagai warna utama.

## 3. Tipografi
| Peran | Huruf | Ukuran |
|---|---|---|
| Judul & logo | **Bricolage Grotesque** 800 | 24–40 px |
| Antarmuka | **Inter** 400–600 | 13–16 px |
| Baca Latin | Inter (Modern) atau Literata (Klasik), pilihan pengguna | 17 px, baris 1,6, maks ±65 huruf |
| Baca Jepang/Mandarin | Noto Sans JP / sistem | 18 px, baris 1,8; furigana min. 9–10 px |
| Baca Korea | Noto Sans KR / sistem | 17 px, baris 1,7 |

Google Fonts (preconnect, `display=swap`), di-cache service worker. Ukuran teks baca tetap bisa diatur pengguna.

## 4. Gaya visual
- Sudut kartu 16–20 px, tanpa bayangan berat.
- Tombol **pil**: utama Plum Noir + teks Kertas; kedua permukaan lembut + teks Plum.
- Ikon garis sederhana, tebal seragam (1,8 px pada 24 px).
- Gerak seperlunya; hormati `prefers-reduced-motion`.
- Fokus keyboard terlihat jelas (garis Plum, atau Wasabi di tema Malam).

## 5. Nada tulisan
- Seperti teman sekelas yang suka baca: tenang, jelas, pakai "kamu".
- Kalimat pendek. Fakta, bukan sorak.
- Tanpa "yuk", "gas", "dong". Emoji maksimal satu, hanya bila membantu arti.

| Hindari | Pakai |
|---|---|
| Lanjut baca, yuk! 🔥 | Lanjut di halaman 48. |
| GAS simpan katanya!! ✨ | 静か masuk daftar kata. |
| Waduh error nih 😭 | Gagal memuat. Coba lagi sebentar. |
| Kamu keren banget!! | 12 kata baru minggu ini. |

## Gamifikasi
- **XP:** ketuk kata +1 · simpan kata +2 · balik halaman +2 · bab baru +5 · tantangan ngomong +2…+10 (+5 bila ≥85%) · kalahkan boss +3 · kartu hafal +2.
- **Level** tiap 100 XP · **target harian** 30 XP · **streak** · **10 lencana**.
- Ditampilkan sebagai angka tenang ("5 hari membaca"), bukan sorakan.

## Layar
- **Home:** logo → sapaan → Lanjut baca → angka minggu ini → koleksi → Tambah cerita. Latar Biru Es.
- **Baca:** layar penuh, lapis baca; ketuk kata → stabilo + lembar arti dari bawah.
- **Ngomong:** mic bulat Plum Noir, skor per kata, cincin skor → boss.
- **Kata:** Kartu · Tersimpan · Susah diucap.
- Skor ucapan: ≥85 Mantap · 60–84 Dikit lagi · <60 Perlu latihan.

## Tidak dipakai lagi
- Maskot apa pun. Neon. Archivo condensed.
- Palet v8: krem `#F4EFE4`, hijau tua `#22362B`, bata `#C4633A`, beige `#E7DFCD`, Literata untuk judul.
- Fokus satu bahasa.
