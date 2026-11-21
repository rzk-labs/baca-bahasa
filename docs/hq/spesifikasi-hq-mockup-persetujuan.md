# Spesifikasi: mockup visual di setiap hal yang perlu disetujui (#957)

## Intinya
- Setiap hasil yang menunggu Setujui wajib punya gambar mockup, bukan hanya teks.
- Kartu "Siap dicek" menampilkan mockup di atas tombol Setujui/Revisi/Tolak.
- Tanpa mockup, tombol Setujui tetap bisa dipakai, tapi ada label "Belum ada gambar".

## 1. Kondisi sekarang
- Layar tugas Siap dicek hanya berisi poin teks, tautan dokumen, dan "Coba di app".
- Tautan "Coba di app" hanya ada bila kode aplikasi berubah.
- Dokumen/spesifikasi (PM, desain, riset) tidak punya gambar sama sekali.
- Founder harus membayangkan sendiri tampilannya sebelum menyetujui.

## 2. Aturan baru untuk agent
- Hasil yang mengubah tampilan: sertakan mockup di dokumen, bagian `## Mockup`.
- Mockup berupa gambar SVG/PNG di `docs/mockup/<nomor-issue>-<nama>.svg`.
- Ukuran mockup HP: lebar 360px; bila perlu tambah versi layar lebar.
- Tiap mockup diberi keterangan 1 baris: "Sebelum" dan "Sesudah".
- Hasil tanpa tampilan (riset, naskah) cukup bagan atau tabel kecil.
- Pakai warna dan font BRAND.md v9; teks gambar berbahasa Indonesia.

## 3. Tampilan di Keepo HQ
- Bagian baru "🖼️ Mockup" di kartu Hasil, di bawah poin hasil.
- Gambar tampil penuh lebar HP; ketuk untuk memperbesar.
- Beberapa mockup: geser samping, penanda "1/3".
- Mockup dibaca dari branch preview PR (rute `/p/<nomor>/` yang sudah ada).
- Gambar yang dilampirkan di isi PR (`![...](...)`) ikut ditampilkan.

## 4. Tugas lanjutan (untuk developer)
- Ubah `dev/src/page.html`: ambil daftar gambar dari file `docs/mockup/` di PR.
- Tampilkan di bagian Mockup; tambah label "Belum ada gambar" bila kosong.
- Ubah instruksi agent (prompt desain/PM) agar mockup wajib untuk hasil bertampilan.
- Cek `node --check dev/src/index.js`; uji lebar 320px.
- Syarat selesai: hasil Siap dicek yang punya mockup menampilkannya sebelum tombol Setujui.

## 5. Catatan
- Aplikasi Keepo utama tidak tersentuh.
- "Mockup wajib" belum dipaksa teknis; hanya label pengingat. Founder bisa minta dipaksa.
- Tidak ada status tahap roadmap yang naik.
