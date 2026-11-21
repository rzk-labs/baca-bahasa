# Setujui Massal untuk "Siap kamu cek" di Keepo HQ (#925)

## Intinya
- Tugas "Siap dicek" sekarang disetujui satu per satu. Capek kalau banyak.
- Tambah kotak centang + tombol "Setujui yang dipilih" di Papan dan Markas.
- Memakai alur Setujui yang sudah ada. Tidak ada API baru. Kode Keepo tidak disentuh.

## 1. Yang bikin repot sekarang
- Tiap tugas harus dibuka dulu, lalu klik Setujui. Ulang sebanyak tugasnya.
- Tugas dengan catatan QA dan tugas aman tampil sama. Sulit dipilah cepat.

## 2. Perilaku baru
- Kolom "Siap dicek" di Papan: tiap kartu punya kotak centang.
- Bagian "Siap kamu cek" di Markas: kotak centang yang sama.
- Bar aksi muncul bila ada yang dicentang: "Setujui N terpilih" + "Batal pilih".
- Tombol "Pilih semua" di kepala kolom. Tombol "Pilih yang QA lolos" sebagai jalan pintas aman.
- Kartu dengan catatan QA TIDAK ikut "Pilih semua". Harus dicentang manual.
- Ketuk kotak centang tidak membuka detail. Ketuk bagian lain tetap membuka detail.

## 3. Cara kerja setujui massal
- Konfirmasi dulu: "Setujui N tugas? Semua masuk antrean live."
- Kirim `POST /tasks/{n}/setujui` satu per satu, berurutan (bukan serentak).
- Tampilkan progres: "3 dari 8…".
- Bila satu gagal: lanjut yang lain, lalu tampilkan "6 berhasil, 2 gagal" + nomor yang gagal.
- Kartu yang berhasil langsung pindah ke kolom "Menuju live".
- Tolak dan Revisi tetap satuan (butuh alasan). Tidak ada massal.

## 4. Syarat selesai
- Bisa centang beberapa kartu di Papan dan Markas, lalu setujui sekaligus.
- Kartu catatan QA tidak terpilih otomatis dan ada peringatan di konfirmasi.
- Gagal sebagian dilaporkan jelas. Tidak ada yang tersetujui dobel.
- Layar HP (iPhone) tidak melebar. Tombol cukup besar untuk jempol.
- `node --check dev/src/index.js` lolos. Kode aplikasi utama dan `sw.js` tidak berubah.

## 5. Di luar cakupan
- Tidak mengubah API Worker (`/tasks/{n}/setujui` sudah cukup).
- Tidak ada Tolak/Revisi massal.
- Selaraskan dengan #923 (kartu satu bentuk): kotak centang dipasang di `kartuTugas`.
