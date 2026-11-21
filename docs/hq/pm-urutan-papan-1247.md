# Urutan Papan Keepo HQ sesuai kebiasaan founder (#1247)

## Intinya
- Papan sekarang urut alur mesin (Antre → Live), bukan alur founder.
- Founder cuma bertindak di Siap dicek, Gagal, dan Menuju live. Taruh di kiri.
- Perubahan kecil, hanya di Keepo HQ. Isi kartu tidak berubah.

## 1. Kebiasaan founder di HQ
- Buka Papan untuk menyetujui hasil: kolom Siap dicek.
- Lalu cek yang gagal atau ditolak, untuk revisi.
- Lalu yang menunggu publish. Sisanya hanya dilihat sekilas.

## 2. Urutan kolom baru (kiri ke kanan)
- 1. Siap dicek (butuh kamu)
- 2. Gagal / ditolak (butuh kamu)
- 3. Menuju live (kadang butuh kamu)
- 4. Dikerjakan
- 5. Antre
- 6. Live (paling akhir, hanya arsip)

## 3. Urutan kartu dalam kolom
- Siap dicek, Gagal / ditolak, Menuju live: terlama di atas, supaya antrean tidak basi.
- Dikerjakan, Antre, Live: terbaru di atas (aturan lama).
- Pilihan "Urutkan" manual tetap menang bila dipilih founder.

## 4. Yang tidak berubah
- Warna, isi kartu, kotak centang, tombol Setujui massal.
- Ketuk angka "menunggu kamu" tetap membuka Siap dicek, kini di paling kiri.

## 5. Untuk developer (Keepo HQ saja)
- `dev/src/page.html`: ubah susunan `cols` di fungsi `papan()`.
- Pilihan "Urutkan" ditambah "Bawaan", jadi default.
- Cek `node --check dev/src/index.js`. Uji HP 390px.
- Mockup: `docs/mockup-1247.html`.
