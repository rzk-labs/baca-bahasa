# Rencana: tombol langkah di bawah pesan gagal masuk (#1089, peta 106)

## Intinya
- Pesan gagal sudah ramah (#1047), tapi belum ada tombol. Pengguna masih buntu.
- Tambah SATU tombol di bawah pesan, sesuai penyebab gagal.
- Gagal sinkron manual juga dapat tombol "Coba lagi".

## 1. Aturan tombol
| Penyebab | Pesan (1 baris) | Tombol |
|---|---|---|
| Koneksi / server | Lagi tak bisa nyambung. Bacaanmu aman. | **Coba lagi** |
| Nama tidak dikenal | Username itu belum terdaftar. | **Daftar** |
| Password salah | Password belum pas. | **Coba lagi** |
| Username dipakai | Username itu sudah dipakai. | **Masuk** |
| Gagal sinkron manual | Belum bisa sinkron. Progres aman. | **Coba lagi** |
| Gagal berulang (2x) | Belum berhasil juga. | **Lanjut tanpa akun** |

## 2. Cara kerja tombol
- Coba lagi: kirim ulang form; isian tetap terisi.
- Daftar: pindah ke mode Daftar, username terbawa.
- Lanjut tanpa akun: tutup form; app tetap jalan offline.
- Sinkron: tombol memanggil sinkron ulang (runSync).

## 3. Catatan untuk developer (backlog 110)
- Letak: kotak `#aErr` di `openAccount` (cloud.js ~baris 400-413).
- Ubah `friendlyAuthError` jadi mengembalikan {teks, aksi}.
- Sinkron manual: `#aSync` (cloud.js ~379) tampilkan toast + tombol.
- Bahasa santai, tanpa istilah teknis, maks 1 baris.
- Jangan ubah `api/`, sheet Tamat, tab Kata, header Baca.
- Naikkan versi `C` di sw.js; uji 320px & 390px; `node --check cloud.js`.

## 4. Cek selesai
- Matikan jaringan: muncul "Coba lagi".
- Nama ngawur saat masuk: muncul "Daftar".
- Gagal 2x: "Lanjut tanpa akun" menutup form.
- Sinkron gagal: "Coba lagi" memanggil sinkron ulang.
