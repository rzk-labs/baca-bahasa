# PM: Penanda kata yang artinya gagal dimuat (#1684)

## Intinya
- Kata yang artinya gagal dimuat diberi garis bawah putus-putus tipis di teks.
- Mengetuk kata itu membuka sheet arti dan langsung mencoba memuat ulang.
- Penanda hidup di memori saja; hilang saat ganti halaman atau buku.

## 1. Masalah
- Toast "Belum dapat arti" hilang dalam 6 detik (`isiArti`, ui.js ±379).
- Setelah itu kata di teks tampak normal.
- Pembaca lupa kata mana yang belum punya arti.
- Ini P0: bantuan memahami kata.

## 2. Aturan tampilan
- Pemicu: hasil terjemahan kosong atau error.
- Bukan pemicu: offline (sudah ada chip #1603).
- Gaya: garis bawah putus-putus 1px, warna `--color-text-muted`.
- Tanpa warna baru, tanpa ubah tinggi baris atau tata letak.
- Kata tersimpan (garis solid) tetap seperti biasa; tidak diubah.
- Bila kata tersimpan juga gagal, garis solid yang menang.

## 3. Aturan perilaku
- Simpan di `Set` memori (kunci: bahasa + kata), bukan di IndexedDB.
- Kosongkan `Set` saat ganti halaman atau ganti/tutup buku.
- Ketuk kata bertanda: sheet arti terbuka seperti biasa, lalu muat ulang otomatis.
- Muat ulang berhasil: hapus penanda dan segarkan kata itu di teks.
- Muat ulang gagal lagi: penanda tetap, tanpa toast baru.
- Toast "Belum dapat arti" yang sudah ada tidak ditambah atau diganti.

## 4. Catatan untuk developer
- Beri class baru (mis. `.w.noarti`) di `style.css` dekat `.cols .w.often` (±baris 524).
- Selector `:not(.saved)` agar sorotan kata tersimpan tidak berubah.
- Mode `.reader.plain`: penanda ikut hilang, seperti garis `often`.
- Teks RTL: garis bawah ikut arah, tidak perlu aturan khusus.
- Naikkan versi `C` di `sw.js`; cek `node --check ui.js`.
- Jangan ubah `api/`.

## 5. Uji
- 320px dan 390px: baris teks tidak bergeser.
- Tema gelap: garis terbaca (kontras ≥ 3:1).
- Bahasa RTL (Arab/Ibrani): garis rapi.
- Ganti halaman: semua penanda hilang.
- Matikan jaringan: tidak ada penanda baru (chip offline saja).

## 6. Mockup
- `docs/mockup-1684.html` (Sebelum / Sesudah).
