# Baca Bahasa — Brand Guideline & UI Design System v1.0

> Disusun oleh ChatGPT (2026-11-09) atas permintaan Rizka, diringkas & diterapkan oleh Claude.
> Percakapan asli: https://chatgpt.com/c/6af1e4f5-4f58-83ec-a0c2-e61937fee979

**Arah desain:** *Read first. Learn naturally.* Aplikasi membaca yang diam-diam menjadi guru bahasa — tenang seperti e-reader, pintar seperti tutor, tanpa terasa mengerjakan PR. Prinsip: *calm interface, progressive disclosure, focus-first*.

## A. Strategi brand
| | |
|---|---|
| Nama | **Baca Bahasa** (alternatif rebrand: Luma, Lembara, KataKita — belum dicek merek/domain) |
| Positioning | Belajar bahasa asing lewat buku pilihan sendiri, dibantu memahami & mengucapkan secara kontekstual |
| Kepribadian | Tenang · cerdas · hangat · sabar · mandiri (Sage + Companion) |
| Janji brand | Setiap halaman membuat bahasa asing makin akrab, tanpa menghilangkan kesenangan membaca |
| Tagline | **Baca ceritanya. Kuasai bahasanya.** (alt: "Satu halaman, selangkah lebih lancar.") |

Lima prinsip: (1) membaca adalah pusatnya, (2) satu tugas satu fokus, (3) belajar tanpa hukuman, (4) kontrol di tangan pengguna, (5) progres terasa, bukan berisik.

## B. Logo
Konsep **Open Book + Learning Point**: buku terbuka + titik kecil = kata yang ditemukan. Sudut membulat, tanpa gradasi/bayangan. Min 20 px, clear space 25%. Wordmark: Plus Jakarta Sans 700, tracking −0.025em. File: `logo.svg` (24 px, currentColor) & `icon.svg` (512 px, latar #245F58, buku #FFF9EE, titik #F1C59D).

## C. Warna — palet "Quiet Teal"
| Token | Terang | Sepia | Gelap |
|---|---|---|---|
| Primary | #245F58 | #5C5940 | #9AD9CB |
| On primary | #FFFFFF | #FFFFFF | #10221F |
| Aksen | #75533F | #875436 | #E0BD9D |
| Background | #F7F9F8 | #F6F0E4 | #101B1A |
| Surface | #FFFFFF | #FFF9EE | #192725 |
| Teks | #182C2A | #302A22 | #EAF3EF |
| Teks redup | #536966 | #695F51 | #AFBFBA |
| Garis | #CFDBD7 | #DAD0BB | #40534E |
| Sukses | #206B4E | #386747 | #8DD5AD |
| Sedang | #87550D | #82500A | #F2C57D |
| Perlu latihan | #A33F46 | #9B4040 | #F5A2A5 |
| Sorotan kata | #DCEFEB | #E5E4C7 | #274941 |
| Sorotan kalimat | #E8EDF8 | #EEE1CC | #333F58 |

Aturan: 80% latar/surface · 15% teks & garis · 5% interaksi/status. Primary hanya untuk aksi utama & tab aktif; maks satu tombol primary per area. Warna status khusus penilaian ucapan; skor selalu disertai angka + label. Target WCAG 2.2 AA (teks 4.5:1, teks besar & kontrol 3:1).

## D. Tipografi
- UI: **Plus Jakarta Sans** 400–700. Baca: **Literata** 400/500. Jepang/Korea: Noto Sans JP/KR (jangan paksa Literata pada CJK, line-height 1.8).
- Skala UI: Display 30/38 · H1 26/34 · H2 22/30 · H3 18/26 · Body 16/25 · Small 14/21 · Label 13/19 · Caption 12/18.
- E-reader: default 19 px (rentang 16–28), line-height 1.7 (pilihan 1.5/1.7/1.9), maks 68ch per kolom. Posisi baca disimpan per lokasi teks, bukan nomor halaman.

## E. Bahasa visual
- Ikon **Lucide** outline, stroke 1.75 (aktif 2): house, book-open, mic, bookmark, volume-2, sliders-horizontal, bookmark-plus, chevron-left, x, file-up, rotate-ccw, check-circle-2.
- Radius: 6 tag · 10 input kecil · 14 tombol/field · 18 kartu · 24 kartu utama · 28 sheet · full chip/mic/cincin.
- Spacing kelipatan 4 px; padding iPhone 20 px; jarak kartu 16 px; antarbagian 28–32 px; tombol utama tinggi 52 px; target sentuh ≥44 px.
- Shadow hanya untuk elemen mengambang: `--shadow-card: 0 2px 8px rgba(16,35,32,.04)`, `--shadow-sheet: 0 -12px 40px rgba(16,35,32,.12)`. Kartu biasa dibedakan dengan surface + garis halus.
- Motion: tap 100 ms · warna 150 ms · halaman baca 180 ms · sheet masuk 260 ms `cubic-bezier(.2,.8,.2,1)` · keluar 180 ms · cincin skor 600 ms · indikator rekam 900 ms. Dukung `prefers-reduced-motion`. Tanpa confetti/animasi latar.

## F. Suara & microcopy
Singkat, natural, membimbing, pakai "kamu". Hindari "gagal", "buruk", "jelek", "salah".
- Tombol: Mulai membaca · Lanjutkan membaca · Tambah buku · Tempel teks · Simpan kata · Lihat arti kalimat · Ketuk untuk bicara · Sedang mendengarkan · Dengarkan contoh · Coba lagi · Latih kata yang sulit · Kembali membaca.
- Kosong: "Mulai dari satu buku yang ingin kamu baca." · "Ketuk kata saat membaca, lalu simpan untuk dipelajari lagi." · "Pilih kalimat dari buku untuk mulai melatih pengucapan."
- Skor: 85–100 **Bagus** "Pengucapanmu sudah jelas." · 60–84 **Hampir** "Sudah cukup dekat. Coba perhatikan bunyinya." · 0–59 **Perlu latihan** "Kita latih kata ini pelan-pelan."
- Error: format tidak didukung · PDF scan · mikrofon ditolak · tidak terdengar · internet putus · terjemahan gagal — selalu jelaskan apa yang terjadi + apa yang bisa dilakukan.

## G. Komponen
Tombol primary/secondary(outline)/ghost/ikon 44×44/destructive · Kartu (lanjut membaca sampul 68×96, buku 2:3, statistik, kata) · Bottom sheet radius 28, handle 36×4, tombol tutup, satu sheet berganti langkah ("LANGKAH 1 DARI 2") · Tab bar 64 px, indikator aktif tint + tebal + garis · Chip skor "92% · Bagus" · Cincin skor 140 px stroke 10–12 · Tombol mic 96–112 px (idle/rekam/menilai/hasil) · Progress bar 6 px · Toast min 44 px, live region · Segmented 44 px · Input 52 px.

## H. Layar (ringkas)
- **Beranda:** header → sapaan H1 → kartu Lanjutkan membaca → statistik 3 kolom (pakai "—" bila belum ada) → baris streak → Tambah buku → rak 2 kolom.
- **Baca:** layar penuh, top bar bisa disembunyikan, footer progres minimal, geser/tepi/tombol/keyboard, 2 halaman bila ≥900 px & kolom ≥360 px.
- **Sheet kata/kalimat:** Langkah 1 kata 26 px + dengar + jenis kata + terjemahan + Simpan kata + Lihat arti kalimat. Langkah 2 kalimat disorot + terjemahan + dengar + Latih pengucapan + Kembali membaca.
- **Bicara:** satu kalimat, satu tombol. Hasil: cincin + chip per kata + "Ada N kata yang bisa dilatih lagi" → Latih N kata.
- **Remedial:** "LATIHAN KATA 1 DARI N · Target 85%", dengar contoh, ucapkan; setelah 3 kali belum tercapai tawarkan jeda/lewati; "Lewati dulu" selalu ada.
- **Kata:** ringkasan jumlah → segmented Tersimpan/Sulit diucapkan → cari → daftar.
- **Pengaturan tampilan:** tema (Aa Terang/Sepia/Gelap), ukuran A− 19 px A+, jenis huruf, jarak baris 1.5/1.7/1.9.
- **Responsif:** ≥1024 px navigasi jadi sidebar.

## I. Tokens
Diterapkan di `style.css` (`:root`, `[data-theme=sepia]`, `[data-theme=dark]`) memakai nama variabel aplikasi.
