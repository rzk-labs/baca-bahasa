# Kepo — Brand & UI v5

> Arah disetujui Rizka 2026-11-09: modern & menghibur untuk Gen Z / Gen Alpha / anak muda; kesan "baca buku" diganti jadi "cerita/konten"; referensi fitur: app Linga. Versi sebelumnya ("Baca Bahasa", palet Quiet Teal dari ChatGPT) ada di riwayat git.

## Brand
| | |
|---|---|
| Nama | **Kepo** (merek/domain belum dicek) |
| Tagline | **Kepoin bahasa baru.** |
| Janji | Belajar bahasa asing lewat cerita yang kamu suka — ketuk kata, ngerti, ngomong, dapet XP. |
| Kepribadian | Penasaran · seru · santai · suportif · berani |
| Maskot | **Kepo**: blob lime dengan antena pink, mata penasaran (satu alis naik). Mood: `curious`, `happy`, `cheer`, `wow`, `sad`. File: `logo.svg`, `icon.svg`. |

## Warna (gelap = bawaan)
| Token | Gelap | Terang |
|---|---|---|
| Primary (ungu elektrik) | #9B82FF | #6A47FF |
| Lime (aksi utama / sukses) | #C6FF3D | #C6FF3D |
| Coral (boss / belum) | #FF6B6B | #E5484D |
| Pink | #FF5FA2 | #FF5FA2 |
| Gradasi brand | #7C5CFF → #B44CFF → #FF5FA2 | sama |
| Background | #0E0B1F | #F4F1FF |
| Surface | #1A1533 | #FFFFFF |
| Teks / redup | #F5F3FF / #A9A3C9 | #16112E / #625C85 |
Mode baca tetap punya tema Terang / Sepia / Gelap.

## Tipografi
- Judul: **Bricolage Grotesque** 600–800 (tebal, playful). UI: **Plus Jakarta Sans** 500–800. Baca: **Literata** (Klasik) atau Plus Jakarta (Modern).

## Gaya visual
- Sudut besar (16–32 px), border 2 px, tombol "chunky" dengan bayangan bawah 5 px (terasa bisa ditekan).
- Navigasi bawah melayang, tab aktif = pil lime.
- Efek: XP melayang (+N XP), konfeti, popup naik level, efek suara (bisa dimatikan), getar, maskot melompat. Hormati `prefers-reduced-motion`.

## Gamifikasi
- **XP:** ketuk kata +1 · simpan kata +2 · balik halaman +2 · bab baru +5 · tantangan ngomong +2…+10 (+5 bila ≥85%) · kalahkan boss +3 · kartu hafal +2.
- **Level:** tiap 100 XP. **Target harian:** 30 XP (cincin di Home). **Streak:** hari berturut-turut.
- **10 lencana:** Kepo Pertama, Kolektor, Kutu Buku, Berani Ngomong, Sempurna, Boss Slayer, Otak Encer, On Fire, Seminggu Nonstop, Level 5.

## Layar
- **Home:** maskot + balon sapaan → kartu Level & target harian → kartu "Lanjut baca" (gradasi) + tombol **Gas baca** / **Tantangan** → statistik → lencana (geser) → koleksi (geser) → Tambah cerita (Upload / Tempel / Cerita contoh).
- **Baca:** e-reader layar penuh, ketuk kata → sheet "1/2 · Arti kata" → "Masih bingung? 👀" → "2/2 · Arti kalimat" → "🎤 Coba ngomongin".
- **Ngomong:** "Tantangan Ngomong", mic gradasi besar, skor per kata, cincin skor + maskot bereaksi + XP → **⚔️ BOSS LEVEL** (kata terjelek, target 85%, skip selalu ada).
- **Kata:** ⚡ Kartu (tap = balik, geser kanan = hafal, kiri = belum) · Tersimpan · Susah diucap.

## Microcopy
Santai, pakai "kamu", tanpa kata menghakimi. Skor: ≥85 **Mantap!** · 60–84 **Dikit lagi!** · <60 **Gas latihan!** ("Santai, kita latih pelan-pelan.").
