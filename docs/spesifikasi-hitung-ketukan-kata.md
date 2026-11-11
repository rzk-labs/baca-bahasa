# Spesifikasi: hitung berapa kali kata diketuk (#83)

## Intinya
- Tiap kata yang diketuk dihitung. Pengguna lihat kata mana paling sering dicek.
- Kata yang disimpan ke hafalan ikut punya hitungan, tampil di daftar Tersimpan.
- Hitungan lokal saja, kolom baru opsional. Data lama aman.

## 1. Masalah
- Pengguna sering ketuk kata yang sama berulang. Itu tanda kata susah.
- Sekarang tidak ada catatan. Pengguna tak tahu kata mana yang sulit.
- Tujuan: hitungan jadi bahan hafalan, tanpa langkah tambahan (Reader First).

## 2. Perilaku
- Setiap ketuk kata di e-reader: hitungan kata itu +1 (kunci: kata huruf kecil + bahasa).
- Kata sama diketuk beruntun dalam 3 detik: hitung sekali (cegah ketuk ganda).
- Di sheet arti kata: tampil kecil "Diketuk 4×" jika sudah 2 kali atau lebih.
- Di Kata → Tersimpan: tiap kartu tampil lencana "4×".
- Urutan baru "Paling sering diketuk" di daftar Tersimpan.
- Kata belum disimpan tetap dihitung. Saat disimpan, hitungannya ikut terbawa.

## 3. Data
- Kolom opsional per kata tersimpan: `tap` (angka). Kata lama tanpa kolom = 0.
- Kata belum disimpan: peta ringan `db.taps` berisi `"bahasa|kata": angka` di localStorage `bacabahasa.v1`.
- Batasi peta maks 2000 entri; buang yang terkecil. Cegah data membengkak.
- Saat Simpan: `tap` diisi dari peta, lalu entri peta dihapus.
- Tanpa migrasi berat. Cek `cloud.js`: kolom baru harus lolos sinkron (belum dicek).
- Selaras dengan kolom jadwal ulang (`due`, `lvl`) di `docs/riset-jadwal-ulang-kata.md`.

## 4. Ekspor & kata sulit
- CSV Anki: tambah kolom `diketuk` di akhir. Kolom lama tidak bergeser.
- Usul lanjutan: kata diketuk 5 kali atau lebih disarankan "Simpan ke hafalan".
- Usul lanjutan: kata sering diketuk muncul lebih awal di kartu hafalan.

## 5. Selesai bila
- Ketuk kata 3× (jeda lebih dari 3 detik): tampil "Diketuk 3×".
- Simpan kata: hitungan terbawa dan tampil di Tersimpan.
- Muat ulang app: hitungan tetap. Kata lama tidak hilang.
- Layar HP 320px: lencana tidak meluber. Area sentuh minimal 44px.
- Naikkan versi `C` di `sw.js`; cek `node --check` file yang diubah.

## 6. Di luar cakupan
- Tidak ada sinkron server baru (`api/` tidak diubah).
- Tidak ada grafik atau papan skor.
