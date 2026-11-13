# Spesifikasi Keepo HQ: klik cepat (#943)

## Intinya
- Tiap klik di Keepo HQ menunggu GitHub berkali-kali, berurutan. Itu penyebab lambat.
- Perbaikan: simpan hasil sementara, jalankan panggilan bersamaan, layar langsung berubah.
- Target: pindah tab terasa instan; tombol aksi memberi respons di bawah 0,3 detik.

## 1. Penyebab (dari membaca kode `dev/src/`)
- Buka Markas (`/hq`): 5 panggilan GitHub bersamaan, lalu 1 panggilan dokumen, lalu 2 panggilan masukan berurutan, lalu panggilan catatan QA. Totalnya 3 putaran berurutan.
- Buka tab Hasil (`/hasil`): 7 panggilan sekaligus, termasuk 6 halaman komentar (600 komentar). Berat.
- Buka detail tugas: 1 panggilan tugas, lalu komentar + PR, lalu daftar file PR. Tiga putaran berurutan.
- Tombol aksi (Setujui, Revisi, Tolak): 2-4 panggilan GitHub, lalu muat ulang seluruh Markas dari nol.
- Server tidak menyimpan hasil. Tiap klik menanyakan GitHub lagi, walau data baru berubah semenit lalu.
- Gagal sesaat diulang sampai 3 kali dengan jeda. Satu gangguan GitHub menambah beberapa detik.
- Layar pindah tab menunggu data dulu. Layar lama tetap tampil tanpa tanda sedang memuat.

## 2. Yang dikerjakan developer
1. **Simpan sementara di server (hanya `GET`)**
   - Pakai cache Worker (`caches.default`) atau memori isolate.
   - `/hq` dan `/hasil`: 15 detik. `/doc`: 60 detik. Detail tugas: 10 detik.
   - Setelah aksi POST (setujui, revisi, tolak, buat tugas, PM sekarang): hapus cache terkait.
2. **Kurangi panggilan berurutan di `/hq`**
   - Panggilan dokumen, masukan (nomor issue + komentar), dan catatan QA ikut jalan bersamaan dengan 5 panggilan awal.
   - Catatan QA: ambil dari 1 sumber murah (maks 5 tugas), bukan 10 panggilan.
3. **Ringankan `/hasil`**
   - Awalnya 1 halaman komentar. Halaman 2-6 diambil hanya bila ada tugas "Siap dicek" yang laporannya belum ketemu.
4. **Detail tugas lebih cepat**
   - Jalankan panggilan tugas, komentar, PR bersamaan. File PR dimuat setelah layar tampil.
5. **Klik terasa instan di layar (`page.html`)**
   - Tab Markas/Hasil/Papan: tampilkan data lama dulu, segarkan di belakang.
   - Tombol aksi: ubah status di layar langsung (optimistis), batalkan bila gagal.
   - Setelah aksi: perbarui kartu itu saja. Jangan muat ulang seluruh Markas.
   - Tampilkan penanda kecil "memperbarui…" saat segar-ulang berjalan.
6. **Segar-ulang otomatis**
   - Berhenti saat tab tersembunyi (`document.hidden`). Lanjut saat kembali dibuka.

## 3. Syarat selesai
- Buka Markas kedua kali dalam 15 detik: data tampil tanpa menunggu GitHub.
- Klik Setujui: kartu langsung berubah. Gagal: kembali semula dengan pesan jelas.
- Data tidak basi lebih dari 15 detik, dan langsung segar setelah aksi.
- Tidak ada fitur HQ yang hilang. `node --check dev/src/index.js` lolos.

## 4. Catatan
- Kode di `dev/` boleh diubah karena tugas ini tentang Keepo HQ.
- Deploy Worker `dev/` manual. Founder atau Dina cek setelah live.
- Ini analisis kode, bukan ukuran waktu nyata. Developer ukur sebelum dan sesudah, catat di PR.
- Terkait: #937 (samakan Hasil dan Papan), #925 (Setujui massal) memakai jalur aksi yang sama.
