# Baca Bahasa

PWA untuk belajar bahasa asing lewat membaca buku sendiri. Live: https://rzk-labs.github.io/baca-bahasa/

- **Rak**: upload `.txt` / `.epub` / `.pdf` (teks, bukan scan) atau tempel teks. Disimpan lokal (IndexedDB).
- **Baca**: teks tanpa arti. Klik kata → arti kata (+ kamus), tombol *Arti kalimat* → terjemahan kalimat.
- **Bicara**: baca kalimat ke mikrofon, tiap kata diberi skor %, kata terjelek masuk **remedial** (latih per kata sampai ≥85%).
- **Kata**: kosakata tersimpan + daftar kata sulit diucapkan.

Terjemahan: Google Translate endpoint publik (cadangan MyMemory). Suara: Web Speech API (Chrome / Safari iOS 14.5+). `?test` = mode uji (`window.__fake` untuk hasil suara palsu).
