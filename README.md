# KEEPO — kepoin bahasa baru

PWA belajar bahasa asing lewat cerita sendiri, untuk anak muda. Live: https://rzk-labs.github.io/baca-bahasa/

- **Home**: maskot Keepo, level & XP, target harian, streak, lencana, koleksi cerita. Upload `.txt` / `.epub` / `.pdf` atau tempel teks (disimpan lokal, IndexedDB).
- **Baca**: e-reader layar penuh. Ketuk kata → arti kata → "Masih bingung?" → arti kalimat.
- **Ngomong**: tantangan baca kalimat, skor % per kata, Boss Level (latih kata terjelek sampai ≥85%).
- **Kata**: kartu hafalan swipe, daftar tersimpan, kata susah diucap.

Brand & UI: lihat `BRAND.md`. Logika teks/suara/skor di `app.js`, tampilan di `ui.js`.
Terjemahan: Google Translate endpoint publik (cadangan MyMemory). Suara: Web Speech API. `?test` = mode uji (`window.__fake` = hasil suara palsu).
