# Riset: satu sumber hitungan "kata baru" (#1694)

Hari: 22 Nov 2026. Peran: riset. Kode app tidak diubah.

## Intinya
- Angka "kata baru" beda karena ada 4 sumber data, bukan 1.
- Teks "Kata baru: てい, もっとも" bukan layar app: itu kiriman skrip uji, tanpa saringan.
- Usulan: "Kata baru" = kata yang BARU DISIMPAN. Kata diketuk tapi belum disimpan = "belum disimpan".

## 1. Peta tempat yang menampilkan "kata baru"
| Layar | Sumber data | Saringan |
|---|---|---|
| Home, chip "Minggu ini" (`weekCard`, ui.js:1141) | kata tersimpan 7 hari, semua buku (`kataBaruMinggu`, app.js:856) | `isKataSampah`, wajib punya arti |
| Catatan sesi "Kata sesi ini" (`sessRecap`, ui.js:1544) | kata DIKETUK di sesi, belum tersimpan (`kataSesiBaru`, ui.js:1510) | `isKataSampah` + sudah kenal |
| Sheet Tamat, ringkasan (`finishBook`, ui.js:1614) | `ws` = tersimpan sesi ini di buku ini; bila 0, `pend` = diketuk belum tersimpan | `countedVocab` + `kataDiBuku`, lalu `kataSesiBaru` |
| Sheet Tamat, tombol & teks kosong (ui.js:1616-1618) | `nTap = ws + pend`; kosong = `TXT_TAK_ADA_BARU` | sama |
| Kartu buku: "~N kata baru/halaman" (ui.js:1174) | perkiraan dari 3.000 kata pertama vs kosakata (app.js:215, 224) | beda sama sekali: tebakan sebelum baca |
| Intip kata bab, Siapkan offline (ui.js:701, 770) | kata di teks yang belum dikenal | `intipCands` |
| Status uji di FYP (`.github/scripts/pakai-keepo.mjs:99`) | 2 kata TERATAS `db.vocab`, tanpa saringan apa pun | tidak ada |

## 2. Kapan angkanya beda
- **"Kata baru: てい, もっとも" vs "Tidak ada kata baru" (Bima):** skrip uji mengambil 2 kata terbaru dari semua kata, termasuk partikel, buku lain, kata lama. Layar Tamat menyaring. Bukan bug layar, bug skrip.
- **Home "1" vs sesi "2" (Dina):** Home hitung yang SUDAH disimpan (7 hari). Sesi hitung yang BELUM disimpan. Dua hal berbeda dengan nama sama.
- **Celah nyata di Tamat:** kata disimpan lewat "Simpan" di catatan sesi bisa tanpa arti (`noTr`). `countedVocab` membuangnya. Hasil: bukan `ws`, bukan `pend`, sheet bilang "Tidak ada kata baru" padahal baru disimpan.
- **Celah lain:** `ws` memakai `at >= SESS.t`. Kata yang disimpan sebelum sesi ini dimulai tak terhitung, walau diketuk lagi.
- **Tamat vs "Ulang kata":** `dueN` dan `total` memakai sumber lain lagi; jangan disebut "kata baru".

## 3. Cek dokumen lama (tidak bertentangan)
- `riset-kata-baru-tanpa-partikel.md`: minta satu saringan. Sudah ada: `isKataSampah`. Dokumen ini hanya menambah satu DEFINISI hitungan.
- `saringan-kata-sesi-1488.md`: Tamat dan catatan sesi pakai `kataSesiBaru`. Tetap berlaku; yang beda hanya `ws` (tersimpan).
- `riset-kata-sudah-kenal.md`: kata sudah kenal dibuang dari kandidat. Tetap, jadi bagian definisi.
- `riset-rekap-sesi-baca.md`: catatan sesi = daftar kata diketuk untuk dipilih simpan. Tetap; hanya judul/istilahnya dirapikan.

## 4. Bukti pesaing (validasi bukti internet, ringan; bukan 30 kutipan, tahap tidak dinaikkan)
- LingQ: "New Words" = kata biru yang belum diapa-apakan; "LingQs" = kata yang dipilih untuk dipelajari; "Known" terpisah. Tiga angka, tiga nama. https://lingq-support.groovehq.com/help/how-do-you-know-which-words-are-new-to-me dan https://lingq-support.groovehq.com/help/understanding-lingq-statistics
- LingQ: pengguna mengeluh angka New + LingQs + Known tidak cocok dengan total. https://forum.lingq.com/t/questions-about-course-statistics/300476
- Readlang: kata diterjemahkan ≠ kartu hafalan; tidak semua kata terjemahan masuk kartu, pengguna bingung. https://forum.readlang.com/t/learn-words-with-flashcards/54 dan https://forum.readlang.com/t/add-known-words-count-like-lingq/3025
- Duolingo Stories: kata baru = yang belum diajarkan di kursus (target 90% dikenal, 10% baru); angka "kata dipelajari" dikritik menyesatkan. https://blog.duolingo.com/right-level-of-difficulty dan https://uxplanet.org/duolingo-ux-breakdown-1-year-of-daily-use-a290f461de2d
- Pelajaran: satu nama per hal, dan jangan campur "dilihat" dengan "disimpan".

## 5. Rekomendasi
**Satu definisi:** "Kata baru" = kata yang kamu simpan ke tab Kata dalam rentang itu (sesi / 7 hari). Lolos saringan, punya arti atau menyusul.

**Satu istilah santai:**
- "Kata baru" = baru disimpan.
- "Belum disimpan" = diketuk, belum masuk Kata.
- Jangan pakai "kata baru" untuk ketukan.

| Layar | Tampilkan |
|---|---|
| Home "Minggu ini" | "N kata baru" (disimpan 7 hari) |
| Catatan sesi | "N kata belum disimpan" + tombol Simpan |
| Sheet Tamat | "N kata baru" (disimpan sesi ini); bila 0 dan ada ketukan: "N kata belum disimpan"; bila keduanya 0: teks kosong |
| Kartu buku | "~N kata asing/halaman" (perkiraan, bukan "baru") |
| Status FYP uji | kata disimpan sesi itu, lewat `countedVocab` |

## 6. Tugas developer berikutnya
- `countedVocab`/`finishBook` (ui.js:1607-1609): hitung kata `noTr` yang baru disimpan dalam `ws`; cek `at >= SESS.t` pakai waktu ketukan.
- Samakan teks: Tamat dan catatan sesi pakai "belum disimpan"; kartu buku ganti "kata baru/halaman" jadi "kata asing/halaman" (ui.js:1174).
- `pakai-keepo.mjs:99`: ganti `db.vocab.slice(0,2)` dengan kata dari `countedVocab` sesi itu.

Mockup: `docs/mockup-1694.html`.
