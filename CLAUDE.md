# Kepo — panduan untuk AI agent

Kepo ("Kepoin bahasa baru") = PWA belajar bahasa asing lewat cerita/buku sendiri, untuk Gen Z. Bahasa UI: **Bahasa Indonesia** santai.
Live: https://rzk-labs.github.io/baca-bahasa/ (GitHub Pages dari branch `main`, folder root, tanpa build step).

## Struktur
- `index.html` — kerangka halaman.
- `app.js` — logika: penyimpanan IndexedDB, parsing .txt/.epub/.pdf, terjemahan (Google gtx, cadangan MyMemory), suara (Web Speech API), skor ucapan, XP/lencana.
- `ui.js` — semua tampilan & interaksi (render tab Home/Baca/Ngomong/Kata, e-reader, maskot, pengaturan).
- `cloud.js` — akun, sinkron, leaderboard, bagikan (bicara ke Worker `api/`).
- `style.css` — gaya. Ikuti `BRAND.md` (latar krem #F2EEE5, tinta #2A1215, blok warna flat, judul Archivo condensed, tombol pil gelap).
- `sw.js` — service worker. **Setiap kali mengubah file yang di-cache, naikkan versi konstanta `C`** (mis. `kepo-v9` → `kepo-v10`) supaya pengguna dapat versi baru.
- `img/` — maskot WebP. `api/` — Cloudflare Worker + D1 (jangan diubah kecuali diminta; deploy-nya manual).
- `dev/` — web "Kepo Dev" (panel permintaan untuk agent). Jangan diubah kecuali diminta.

## Aturan kerja
- Vanilla JS tanpa framework dan tanpa build/npm untuk aplikasi utama. Jangan tambah dependensi besar.
- Perubahan kecil dan fokus pada permintaan. Jangan merombak hal yang tidak diminta.
- Harus tetap jalan di HP (iPhone Safari) dan layar lebar.
- Cek sintaks JS yang diubah dengan `node --check <file>`.
- Data pengguna lama (IndexedDB) jangan sampai rusak; kalau mengubah format, buat migrasi.

## Gaya tulisan untuk founder (wajib)
Founder kemungkinan ADHD. Semua teks untuk founder (ringkasan, dokumen, microcopy): inti dulu, poin pendek (maks 15 kata), maks 3 poin per bagian, tanpa paragraf panjang, tanpa istilah teknis.
