# Halaman terakhir: satu aksi 'Buku baru' (#1483)

## Intinya
- Lapor Raka: 'Buku baru' muncul dua kali di halaman terakhir.
- Aturan baru: satu halaman, satu aksi 'buku berikutnya / buku baru'.
- Kartu bawah teks mengalah bila sheet Tamat terbuka atau sudah pernah terbuka.

## 1. Penyebab (dibaca dari kode)
- `endCard()` di ui.js merender 'Buku berikutnya' / 'Buku baru' + 'Baca ulang'.
- Sheet Tamat (`finishBook()`) punya 'Lanjut: judul', 'Buku baru', 'Baca ulang'.
- `endCard()` hanya menahan diri saat sheet terbuka (#1355, #1415).
- Setelah sheet ditutup (silang / 'Besok'), kartu muncul lagi, teksnya sama.
- Tombol bawah sudah benar: 'Rekap' bila `b.doneAt`, 'Tamatkan' bila belum (ui.js ±2120).

## 2. Aturan
- Sheet Tamat sedang terbuka: kartu tidak dirender.
- Sheet Tamat akan terbuka (`finishBook` dipanggil, atau ketuk 'Tamatkan'): kartu tidak dirender.
- Sheet sudah ditutup pada buku yang sama dalam sesi ini (`tamatSeen` terisi): kartu tidak dirender.
- Buku tamat sebelumnya dan dibuka lagi tanpa sheet: kartu boleh tampil (satu-satunya aksi).
- Baca ulang (`restartBook`) mereset `tamatSeen`, jadi kartu kembali normal.

## 3. Cara membangun
- Di `endCard()`: tambah `if (tamatSeen === b.id + ':' + SESS.t) return;` setelah cek sheet.
- Cek `tamatSeen` di `finishBook` berbentuk `id:SESS.t`; pakai bentuk yang sama.
- Tombol bawah reader: jangan diubah, sudah sesuai aturan.
- Jangan ubah XP, level, `award()`, atau `finishBook` selain bila perlu.
- Tutup sheet via 'Besok'/silang: setelah `closeSheet`, panggil render ulang agar kartu hilang bila tampil.
- Naikkan versi `C` di sw.js (sekarang `kepo-v531`). Jalankan `node --check ui.js`.
- Jangan ubah `api/`.

## 4. Uji
- Halaman terakhir buku belum tamat: kartu tampil, tombol 'Tamatkan'.
- Ketuk 'Tamatkan': sheet muncul, kartu tidak ada.
- Tutup sheet (silang dan 'Besok'): kartu tidak muncul, tombol 'Rekap'.
- Buku tamat lama dibuka: tombol 'Rekap', hanya satu aksi buku baru.
- Ukuran 360px dan layar lebar: tidak ada teks tertimpa.

## 5. Mockup
- Lihat `docs/mockup-1483.html`: Sebelum (dobel) dan Sesudah (satu aksi).
