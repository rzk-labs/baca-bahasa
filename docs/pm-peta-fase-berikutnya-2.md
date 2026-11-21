# Peta fase berikutnya: batch dari masukan 12 Nov (#663)

## Intinya
- Masukan tester & pengguna AI menumpuk di 6 masalah; semuanya jadi tugas baru (no 58-63).
- Urutan: error macet dulu, lalu Beranda, Intip kata, impor buku, Koleksi/toast.
- Ini rencana dari masukan, bukan bukti riset baru; belum ada pengecekan ulang di kode.

## 1. Cara memilih
- Hanya masalah yang dilaporkan 2+ penguji berbeda.
- Yang merusak kepercayaan (error, angka salah) didahulukan.
- Yang sudah selesai (#656, #658, #660) tidak diulang, hanya dicek ulang.

## 2. Tugas baru (urut prioritas)
| No | Peran | Prioritas | Tugas |
|---|---|---|---|
| 58 | developer | P0 | Spanduk "Ada yang macet" + error textContent null saat buka buku |
| 59 | developer | P0 | Beranda jujur: progres, bab/halaman, sisa waktu satu satuan |
| 60 | developer | P0 | Intip kata bab: tampil di bab 1 & buku ja/ko/zh; kata sesuai bahasa buku |
| 61 | developer | P1 | Impor Gutenberg/Aozora: lewati judul & daftar isi; kalimat biasa bukan judul |
| 62 | developer | P1 | Beranda rapi: satu "Gas baca", kartu kosong hilang, judul sampul tak terpenggal |
| 63 | developer | P1 | Koleksi: tombol hapus aman + konfirmasi; toast target harian pindah ke bawah |

## 3. Isi tiap tugas (bukti dari masukan)
- **58:** Nadia, Dina, Tari melapor error sama di Alice & こころ, walau #619 bilang aman. Cek elemen kosong di ui.js ±1196.
- **59:** Bima, Dina, Tari, Nadia: Home "0% kelar" padahal 2%; "Bab 1 dari 37" vs "Hal 4/18"; sisa ±335 vs ±347 mnt.
- **60:** Bima & Raka: kartu tak muncul di buku Jepang; Tari: tak muncul di bab 1. Raka: kata Korea tercatat di buku Jepang.
- **61:** Nadia & Tari: Gutenberg buka di daftar isi satu paragraf, "37 bab" padahal 12. Raka: Aozora salah jadi judul tebal.
- **62:** Tari & Nadia: dua tombol "Gas baca" kembar; Dina: kalimat contoh "「”" nyasar; Tari: "Lighthous e" terpenggal.
- **63:** Tari, Dina, Raka, Nadia: tong sampah menempel tombol buka tanpa konfirmasi; toast menutup streak & XP.

## 4. Dicek ulang, bukan tugas baru
- Panduan ketuk masih menutup teks & muncul lagi setelah "Paham" (Tari, Raka, Bima).
- Bisa jadi tester memakai versi lama; developer cek dulu sebelum ubah apa pun.
- Bila memang masih terjadi: ingat pilihan "Paham" per perangkat, bukan per halaman.

## 5. Ukuran selesai
- 58: nol laporan "Ada yang macet" dari penguji 2 putaran berturut.
- 59: angka Home = angka bar baca = catatan sesi (selisih 0).
- 60: kartu Intip muncul di buku ja/ko/zh atau ada alternatif yang jelas.

## 6. Batas & risiko
- Dua developer paralel: 58 dan 59 menyentuh ui.js yang sama; kerjakan berurutan.
- Tugas 61 mengubah cara baca file; data buku lama jangan rusak (butuh migrasi bila format berubah).
- Tidak ada tugas untuk founder di batch ini.
