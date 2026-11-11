# Spesifikasi: buku ikut tersimpan di akun (#77)

## Intinya
- Masalah nyata: login berhasil, tapi buku tidak ikut. Pengguna harus unggah ulang.
- Penyebab: akun hanya menyimpan progres (XP, kata, lencana), bukan buku.
- Usul: simpan buku di akun, bertahap. Tahap 1: buku teks, dengan batas ukuran.

## 1. Kondisi sekarang
- Daftar buku dan isi teks hanya ada di HP.
- Sinkron akun hanya: XP, hari, lencana, statistik, skor, kata, kata lemah.
- Batas data server: 400 KB per akun. Satu buku bisa jauh lebih besar.
- Ganti HP, bersihkan data browser, atau login di perangkat lain: buku hilang.

## 2. Usulan solusi
- Tambah tabel buku di server, terpisah dari data progres.
- Simpan judul, bahasa, posisi baca, dan isi teks (dikompres).
- Batas: ±5 MB per akun, ±2 MB per buku. Lebih dari itu: tetap lokal + pesan jelas.
- Saat login: tarik daftar buku, unduh isi saat buku dibuka pertama kali.
- Gabung, jangan timpa: buku sama tidak dobel.
- Hapus buku di HP juga menghapus di akun (dengan konfirmasi).

## 3. Yang perlu dikerjakan developer
- Server (`api/`): tabel + rute buku. Deploy manual oleh founder.
- Aplikasi: unggah buku ke akun saat login; tarik saat masuk di perangkat lain.
- Migrasi: buku lama di HP otomatis naik ke akun saat login pertama.
- Jaga data lama IndexedDB tetap aman.

## 4. Langkah sementara (tanpa server baru)
- Setelah login, tampilkan pesan jujur: "Buku belum ikut akun, hanya progres."
- Murah dan bisa langsung dikerjakan.

## 5. Risiko & keputusan
- Hak cipta: buku pengguna di server kita. Lihat `docs/riset-hak-cipta.md`; harus privat.
- Biaya penyimpanan: batas per akun menjaga biaya.
- Keputusan founder: setuju batas ukuran dan penyimpanan buku di server?

## 6. Kriteria selesai
- Login di HP kedua: buku muncul tanpa unggah ulang.
- Posisi baca tiap buku ikut pulih.
- Buku melewati batas: pesan jelas, tidak ada data hilang.
