# Spesifikasi: garis bawah frasa langsung muncul saat disimpan (#608)

## Intinya
- Kata tunggal tersimpan sudah digarisbawahi; frasa 2-5 kata juga (#600), tapi hanya setelah halaman dimuat ulang.
- Celah: simpan frasa di sheet arti, garis bawah belum muncul. Hapus frasa pun begitu.
- Usul: satu fungsi cat ulang garis bawah, dipakai saat simpan, batal, dan urungkan.

## 1. Laporan pengguna
- "Kalau menyimpan beberapa kata, kenapa tidak digarisbawahi juga di bukunya?"
- Artinya: pengguna simpan frasa, lalu halaman tidak berubah.

## 2. Yang sudah ada
- Kata tunggal: garis solid tipis (`.w.saved`, `style.css`).
- Frasa 2-5 kata: ikut digarisbawahi saat halaman dirender (`ui.js` `phraseIdx`, #600).
- Bahasa tanpa spasi (ja, zh, th): frasa dilewati.

## 3. Celah yang ditemukan
- Tombol simpan (`#wsave`) mencocokkan teks satu kata per elemen.
- Teks frasa ("a b c") tidak pernah sama dengan satu kata, jadi tidak ada yang dicat.
- Hasil: garis bawah baru muncul setelah pindah bab atau buka ulang buku.
- Hal sama berlaku saat frasa dihapus: garis bawah tertinggal sampai render ulang.
- Frasa lebih dari 5 kata (kalimat) memang tidak digarisbawahi: sengaja, terlalu ramai.

## 4. Usulan perbaikan (developer)
- Buat fungsi `repaintSaved()` yang menghitung ulang kelas `saved` untuk halaman terbuka.
- Pakai logika yang sama dengan render (indeks frasa + `savedSet`), jangan dua versi.
- Panggil setelah: simpan, ketuk lagi untuk batal, dan Urungkan.
- Pertahankan perilaku kata tunggal yang sudah ada.
- Tanpa perubahan format data: aman untuk data lama.

## 5. Syarat selesai
- Simpan frasa 3 kata: ketiga kata bergaris bawah seketika.
- Hapus frasa: garis bawah hilang seketika; Urungkan memunculkannya lagi.
- Kata yang juga bagian frasa lain tetap bergaris bawah selama salah satunya tersimpan.
- Naikkan versi cache di `sw.js` saat kode diubah.

## 6. Di luar cakupan
- Garis bawah frasa untuk ja/zh/th (perlu pemotongan kata; lihat `docs/riset-pemotongan-kata-jp-kr.md`).
- Garis beda untuk frasa vs kata. Tetap satu gaya tenang (lihat `docs/desain-sorotan-kata.md`).
