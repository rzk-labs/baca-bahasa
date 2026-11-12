# Spesifikasi: batalkan kata yang tak sengaja tersimpan (#366)

## Intinya
- Kata yang terlanjur tersimpan dari sheet arti tidak bisa dibatalkan di tempat.
- Hapus sudah ada di tab Kata (ikon tempat sampah + Urungkan), tapi jauh dan tersembunyi.
- Solusi: tombol "Tersimpan" di sheet arti jadi tombol batal, dengan Urungkan.

## 1. Masalah
- Ketuk "Simpan" di sheet arti: kata masuk daftar + XP (`ui.js` `#wsave`).
- Ketuk lagi "Tersimpan": tidak terjadi apa-apa (`if (isSaved()) return`).
- Pengguna harus pindah ke Kata → Tersimpan, cari kata, cari ikon sampah.
- Yang sudah ada: hapus di tab Kata (`data-dv`), toast "Kata dihapus" + Urungkan 6 detik.

## 2. Perilaku
- Sheet arti, kata sudah tersimpan: tombol berlabel "Tersimpan ✓ · Batalkan".
- Ketuk: hapus dari `db.vocab` (cocok kata + bahasa, tanpa beda huruf besar).
- Toast "Kata dihapus" dengan tombol "Urungkan" (pola sama dengan tab Kata).
- Tombol kembali jadi "Simpan"; tanda `saved` di teks bacaan dicabut.
- Urungkan: kata kembali ke posisi semula, tanda `saved` kembali.
- Tab Kata: tombol sampah tetap; tanpa konfirmasi tambahan (sudah ada Urungkan).

## 3. Data dan XP
- Hitungan ketukan (`tap`) yang dibawa kata: kembalikan ke `db.taps` saat dibatalkan.
- XP +2 dari simpan tidak ditarik. Cukup dicatat di sini.
- Tanpa kolom baru, tanpa migrasi. Data lama aman.
- Sinkron akun ikut lewat `save()` biasa.

## 4. Selesai bila
- Simpan kata, ketuk "Batalkan": kata hilang dari Tersimpan, teks tak lagi bertanda.
- Ketuk Urungkan: kata balik di posisi sama.
- Kata sama muncul berkali-kali di teks: tanda `saved` hilang di semuanya.
- HP 320px: tombol minimal 44px, tidak meluber.
- Naikkan versi `C` di `sw.js` saat dikerjakan.
