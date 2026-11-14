# Spesifikasi: Rak di Profil + tema rak sesuai selera pengguna (#967)

_Status: spesifikasi untuk developer. Tidak ada kode yang diubah. Sumber: tugas #967, `cloud.js` (`openProfile`), `docs/spesifikasi-sosial-profil.md`._

## Intinya
- Profil dapat Rak: buku tampil sebagai sampul di papan, bukan daftar teks.
- Pengguna pilih tema rak dan urutan sesuai seleranya sendiri.
- Tahap 1 hanya di perangkat (aman). Rak publik menunggu keputusan founder.

## 1. Kondisi sekarang
- Profil hanya punya daftar teks "Sedang dibaca" dan "Selesai".
- Sampul buku sudah ada di app (`COVERS`, `getCover`), tapi belum dipakai di Profil.
- Profil dibuka sebagai lembar (`openProfile`). Data buku: `profileData()`.

## 2. Rak (tahap 1, lokal)
- Bagian baru "Rak" di Profil, di bawah statistik, di atas Lencana.
- Isi: semua buku, bukan cuma 3. Tiap buku = sampul, judul pendek, persen.
- Buku tamat diberi tanda "Tamat". Ketuk buku → buka buku.
- Kelompok rak: Sedang dibaca, Tamat, Belum dibuka.
- Tanpa sampul: kotak berwarna dari judul + huruf awal.
- Rak kosong: ajakan "Tambah cerita pertamamu".
- Maks 12 buku tampil, sisanya tombol "Lihat semua".

## 3. Tema rak
- Empat tema awal: Kayu hangat, Plum Noir, Biru Es, Polos.
- Warna ikut `BRAND.md` v9. Tema hanya mengubah papan dan latar rak.
- Pilih lewat deretan chip di atas rak. Tema aktif ditandai.
- Disimpan di `db.rakTema` (nilai baru, bawaan "Plum Noir"). Data lama aman.
- Teks tetap kontras (AA) di semua tema.

## 4. Sesuai referensi pengguna
Tugas menyebut "sesuai referensi penggunanya". Tafsir yang diusulkan:
- Pengguna menata rak sendiri, bukan urutan otomatis.
- Pilihan urutan: Terakhir dibaca, Judul A–Z, Bahasa, Susunan sendiri.
- Susunan sendiri: tombol Naik/Turun per buku (tanpa seret, aman di HP).
- Label koleksi buatan sendiri, mis. "Fandom", "Novel Jepang". Maks 5 label.
- Satu buku boleh punya satu label. Filter rak per label.
- Disimpan di `db.rak = { urut, label: {idBuku: nama}, susun: [id] }`.
- Buku dihapus → entri rak ikut dibuang. Tanpa migrasi data buku.
- **Perlu konfirmasi founder:** apakah "referensi" berarti selera/tema pribadi (diusulkan) atau rekomendasi buku?

## 5. Privasi & sinkron
- Tahap 1: rak hanya dilihat pemiliknya di Profil sendiri.
- Profil orang lain tetap seperti sekarang (maks 3 buku, judul + persen).
- Tahap 2 (butuh keputusan founder + deploy manual `api/`): rak publik opsional.
- Yang dibagikan: judul, bahasa, persen, tema. Tidak pernah isi buku.
- Bawaan tetap privat. Saklar "Tampilkan rakku" di Akun.

## 6. Tugas developer (tahap 1)
- Fungsi `rakHtml()` di `cloud.js`, dipanggil dari `openProfile` untuk `p.self`.
- Pakai `pctOf`, `statusPct`, `COVERS` yang sudah ada. Tanpa dependensi baru.
- Gaya di `style.css`, ikuti `BRAND.md` v9. Tanpa maskot.
- Naikkan versi `C` di `sw.js`. Cek `node --check` semua JS yang diubah.
- Jangan ubah `api/`.

## 7. Syarat selesai
- Rak tampil di Profil sendiri dengan sampul dan persen yang sama dengan Home.
- Ganti tema → langsung berubah, tetap setelah tutup-buka app.
- Urutan dan label bertahan setelah muat ulang. Data buku lama tidak rusak.
- Nyaman di iPhone Safari (layar 375px) dan layar lebar.
- Angka di rak sama dengan Home dan Profil (selaras masukan Tari/Bima soal angka beda).
