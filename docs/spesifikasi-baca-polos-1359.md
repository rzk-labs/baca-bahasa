# Spesifikasi: mode "Baca polos" (#1359)

Mockup: `docs/mockup-1359.html`

## Intinya
- Satu pilihan baru di Pengaturan: **Baca polos** Mati/Nyala (default Mati).
- Nyala = halaman baca bersih, arti baru muncul saat kata diketuk.
- Nyala juga mematikan unduhan arti kalimat diam-diam.

## 1. Letak & teks
- Grup **Tampilan baca**, tepat di bawah "Tandai kata yang sering kuketuk" (`#mos`, ui.js:646).
- Judul: `Baca polos`. Pilihan: `Mati` / `Nyala` (pola `.seg`, id `#pln`).
- Penjelasan satu baris: `Halaman bersih. Arti baru muncul saat kamu ketuk.`
- Default Mati. Data lama tanpa field dibaca sebagai Mati (`db.plain === true` saja yang Nyala).

## 2. Yang disembunyikan saat Nyala
- Garis bawah kata tersimpan (`.cols .w.saved`, style.css:464).
- Tanda kata sering diketuk (`.w.often`, style.css:465).
- Lencana "Mungkin frasa" (`#whint`, ui.js:2224).
- Tanda arti mesin (`#smt`, ui.js:2541).
- Cara: kelas `.plain` di `#reader`, pola sama dengan `.no-often` (style.css:470).
- `#whint` dan `#smt` ada di lembar bawah (`#sheet`). Bila di luar `#reader`, kelas juga dipasang di `body`.
- Kata terpilih (`.w.sel`) tetap disorot. Itu umpan balik ketukan, bukan tanda bantu.

## 3. Yang tetap jalan
- Ketuk kata: arti muncul.
- Ketuk dua kali kalimat: terjemahan kalimat.
- Simpan kata: jalan normal. Kata tetap tercatat, hanya garis bawahnya tersembunyi.
- Teks terjemahan kalimat tetap tampil. Hanya tanda "Arti mesin" yang disembunyikan.

## 4. Matikan prafetch (#458)
- `pfArm()` (ui.js:1942): langsung `return` bila `db.plain`.
- Saat toggle diubah ke Nyala: panggil `pfDisarm()` agar unduhan berjalan berhenti.
- Hasil: tak ada permintaan jaringan diam-diam saat membaca polos.
- Jangan sentuh `prepHtml` / `bindPrep` (#1345 sedang diriset).

## 5. Penyimpanan & reset
- Handler: `db.plain = v === '1'; save();` lalu `#reader.classList.toggle('plain', db.plain)`.
- Render reader (ui.js:1447): tambah `${db.plain ? ' plain' : ''}`.
- Tombol reset (`#rst`, ui.js:730): tambah `db.plain = false`.
- Tidak ada perubahan format IndexedDB lain. Jangan ubah `api/`.
- Sinkron akun: bila pengaturan ikut disinkron, field baru boleh ikut; data lama tanpa field = Mati.

## 6. Syarat selesai
- `node --check ui.js app.js` lolos.
- Naikkan versi `C` di sw.js: `kepo-v478` → `kepo-v479`.
- Uji lebar 320px dan layar lebar, tema Kertas dan Malam.
- Uji: Nyala lalu buka buku, tak ada garis bawah/lencana; ketuk kata tetap beri arti.
- Uji: Nyala, tab Network diam saat halaman dibiarkan 5 detik.
- Uji: Reset mengembalikan ke Mati.
