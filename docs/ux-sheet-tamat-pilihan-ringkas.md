# Sheet Tamat: pilihan ringkas (#1794)

Status: rancangan, belum dibangun. Mockup: docs/mockup-1794.html

## Intinya
- Sheet Tamat dipangkas: 1 tombol utama + maks 2 sekunder.
- Pengingat pindah ke Pengaturan; sheet cuma beri 1 tautan kecil.
- 'Pilih buku berikutnya' tinggal satu di Home; 'Buku baru / Baca ulang' satu di halaman akhir.

## 1. Titik gesekan sekarang
- Sheet Tamat bisa memuat 6 tombol: Lanjut, Lihat kata, Baca ulang, Ke Home, Atur pengingat, Nanti saja.
- '5 kata lama siap diulang' cuma teks. Di Home sama-sama jadi tombol 'Ulang sekarang'.
- Kartu Home 'Simpan 3 kata dulu' bilang 'Buka bacaan', padahal buku sudah Tamat.

## 2. Sheet Tamat: sebelum / sesudah
| Bagian | Sebelum | Sesudah |
|---|---|---|
| Tombol utama | Lanjut / Coba buku contoh | Sama (tak berubah) |
| Sekunder 1 | 'Lihat N kata' | 'Ulang sekarang' bila ada kata jatuh tempo; kalau tidak 'Lihat N kata' |
| Sekunder 2 | 'Buku baru' | 'Baca ulang' (tautan) |
| Tautan bawah | 'Baca ulang' + 'Ke Home' | Dihapus. Ikon X menutup; Home ada di Reader |
| Pengingat | Teks + 'Atur pengingat' + 'Nanti saja' | 1 tautan kecil 'Ingatkan aku besok', sekali saja |
| Teks kata lama | '5 kata lama siap diulang' | Jadi tombol (lihat bagian 3) |
| Tanpa buku berikutnya | Lihat kata, Buku baru | Utama 'Buku baru', sekunder seperti di atas |

## 3. Teks kata lama jadi tombol
- Hapus baris `#fbdue` (ui.js ~1717). Ganti tombol sekunder: 'Ulang sekarang · 5 kata'.
- Pakai fungsi yang sama dengan `#dueNudge` di Home (ui.js ~1287): mulai sesi Ulang kata jatuh tempo.
- Jumlah tetap dari `db.vocab.filter(isDue).length`. Tanpa jatuh tempo: 'Lihat kata'.

## 4. Urutan prioritas tombol
- 1) Lanjut / Coba buku contoh / Buku baru (hanya satu).
- 2) Ulang sekarang atau Lihat kata (hanya satu).
- 3) Baca ulang (tautan teks). Pengingat = baris teks kecil di bawah.

## 5. Satu tempat per aksi
- Home: 'Pilih buku berikutnya' hanya di `#nextNudge`. Sheet tak mengulang kata 'Pilih buku'.
- Halaman akhir: 'Buku baru / Baca ulang' hanya di kartu bawah teks (`endCard`, ui.js ~2446).
- Kartu itu tetap tersembunyi bila sheet terbuka atau sudah muncul (#1560). Tak kembar.

## 6. Kartu 'Simpan 3 kata dulu' di buku Tamat
| | Sebelum | Sesudah |
|---|---|---|
| Buku Tamat | '… Buka bacaan →' | 'Pilih buku →', ketuk menuju Rak |
| Buku belum Tamat | 'Buka bacaan →' | Tak berubah |
- Label aria ikut diganti. Ubah di ui.js ~1287 dan ~1305 (`#q3Lock`).
- Bila `#nextNudge` tampil bersamaan, kartu ini cukup teks 'Simpan kata dulu', tanpa tombol.

## 7. Uji 320 / 390px
- 320px: semua tombol terbaca penuh, judul buku maks 2 baris, tanpa gulir samping.
- 390px: sheet muat tanpa gulir dengan 3 aksi + 1 tautan pengingat.
- Target ketuk 44px (jangan bentrok #1779). Uji: Tamat pertama, Tamat ke-2, buku contoh, tanpa buku lain.

## 8. Pecahan tugas developer
- #186 Sheet Tamat: tombol 1+2, 'Ulang sekarang', hapus 'Ke Home' (ui.js ~1688-1727).
- #187 Pengingat Tamat jadi 1 tautan kecil + baris di Pengaturan (ui.js ~1720). Setelah #186.
- #188 Kartu 'Simpan kata dulu' tak bilang 'Buka bacaan' di buku Tamat (ui.js ~1287, ~1305).
- Tak menyentuh #1779 (target ketuk), #1785 (istilah Bagian), #1787 (sheet Tamat belakang). Naikkan C di sw.js.
