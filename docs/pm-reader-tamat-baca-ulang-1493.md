# PM #1493 — Reader: buku Tamat, tombol bawah jadi 'Baca ulang'

## Intinya
- Halaman terakhir buku Tamat: tombol bawah jadi 'Baca ulang', bukan 'Tamatkan'.
- Buku belum Tamat tetap 'Tamatkan'. Bar 'Tamat ·' dan kartu 'Buku baru' tidak disentuh.
- Baca ulang tidak menambah XP atau halaman dibaca. Data lama aman.

## 1. Kondisi sekarang
- Kode `ui.js` ~baris 2120: `last && b.doneAt` sudah bukan 'Tamatkan', tapi 'Rekap'.
- Tester bingung: 'Rekap' tidak jelas. Maunya aksi yang masuk akal setelah tamat.
- Klik tombol itu (baris 1714) memanggil `turn(1)`, yang membuka sheet Tamat.
- Kartu di halaman terakhir (`endCard`) sudah punya 'Baca ulang'. Jadi aksinya sudah ada.

## 2. Keputusan
- Pilih: ganti 'Rekap' jadi 'Baca ulang'. Alasan: paling sederhana, satu kata, jelas.
- Tidak disembunyikan: tombol hilang membuat bar bawah timpang dan navigasi bingung.
- Aksi: sama dengan kartu: `restartBook(b); viewBaca();`. Ada toast 'Urungkan'.
- Rekap tetap bisa dibuka dari bar 'Tamat ·' (tugas lain).

## 3. Spesifikasi untuk developer
- Cabang `last && b.doneAt`: teks `Baca ulang`, kelas `fin`, aria-label `Baca ulang buku dari halaman 1`.
- Beri `nx.dataset.baca = '1'`; hapus di tiga cabang lain.
- Handler `#nx`: bila `dataset.baca` → `restartBook(bk); viewBaca();`, selain itu alur lama.
- Cabang `!b.doneAt` tetap 'Tamatkan'. Cabang halaman biasa tetap panah.
- `doneAt` tidak diubah: XP tamat tidak dobel, halaman dibaca tidak bertambah.
- Naikkan versi `C` di `sw.js`. Jangan ubah `api/` atau format IndexedDB.

## 4. Uji
- Buku Tamat, halaman terakhir: tombol 'Baca ulang', ketuk → halaman 1, toast Urungkan.
- Urungkan mengembalikan posisi; `doneAt` tetap terisi.
- Buku belum Tamat, halaman terakhir: tetap 'Tamatkan'.
- Lebar 320px dan layar lebar: teks tombol tidak terpotong.
- `node --check ui.js`.

## 5. Asumsi
- Kata 'Baca ulang' sudah dipakai di Home dan kartu; konsisten.
- Dua tombol 'Baca ulang' (bar dan kartu) di satu layar dianggap wajar: aksi sama.
