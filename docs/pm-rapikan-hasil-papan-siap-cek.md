# Rapikan Hasil, Papan, dan "Siap kamu cek" di Keepo HQ (#923)

## Intinya
- Tiga tempat ini fungsinya sama: lihat tugas tim. Tampilannya beda-beda, jadi pusing.
- Solusi: satu kartu, satu set nama status, satu bar saring untuk semuanya.
- Developer mengerjakan di `dev/src/page.html`. Kode aplikasi Keepo tidak disentuh.

## 1. Yang bikin pusing sekarang
- **Nama status beda-beda.** Status yang sama disebut "Siap kamu cek" (Markas), "Menunggu kamu" (Markas, Hasil), "Siap dicek" (Papan).
- **Hasil mengelompokkan ulang status.** Siap, menuju live, dan gagal semua disebut "Progres". Papan punya 6 kolom sendiri.
- **Kartu beda bentuk.** Markas pakai kartu baris + tombol "Cek →". Papan pakai kartu kolom. Hasil pakai kartu dengan poin laporan.
- **Bar saring beda.** Papan: cari + urut + chip peran + "Dari kamu". Hasil: cari + chip peran + chip status. Markas: tanpa saring.
- **Angka ringkasan dobel.** Markas dan Hasil sama-sama punya blok "Menunggu kamu", bobotnya beda.

## 2. Aturan baru (satu kamus)
- Satu daftar nama status, dipakai di semua halaman:
  - Antre
  - Dikerjakan
  - Siap dicek (menunggu kamu)
  - Menuju live
  - Live
  - Gagal / ditolak
- Hapus istilah "Progres", "Belum diproses", "Menunggu kamu" sebagai nama status. "Menunggu kamu" cukup jadi judul angka, bukan label kartu.
- Warna chip status sama di semua halaman.
- Satu fungsi `kartuTugas(t, {laporan})` untuk semua halaman. Tampil sama: chip peran, chip status, QA, judul, #nomor, waktu.
- Hasil boleh menambah poin laporan di bawah kartu yang sama. Papan boleh menambah tombol Revisi.
- Satu fungsi bar saring bersama: cari, chip peran, chip "Dari kamu", chip status. Papan dan Hasil memakainya.

## 3. Peran tiap halaman (dibedakan jelas)
- **Markas:** ringkasan saja. Angka + maksimal 3 kartu "Siap dicek" + tombol "Lihat semua →" ke Papan.
- **Papan:** kerja harian. Kolom per status, bisa geser di HP.
- **Hasil:** arsip + laporan. Daftar per hari, dengan poin laporan.
- Tiap angka menunggu kamu bisa diketuk dan langsung membuka Papan, kolom "Siap dicek".

## 4. Syarat selesai
- Nama status sama persis di tiga halaman.
- Kartu tugas tampil sama di tiga halaman.
- Bar saring di Papan dan Hasil sama bentuknya.
- Layar HP (iPhone) tidak melebar ke samping.
- `node --check dev/src/index.js` lolos. Kode aplikasi utama dan `sw.js` tidak berubah.

## 5. Di luar cakupan
- Tidak mengubah data, API, atau alur Setujui/Revisi/Tolak.
- Tidak mengubah halaman Peta dan Dokumen.
