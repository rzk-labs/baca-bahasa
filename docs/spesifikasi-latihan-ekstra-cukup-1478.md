# Spesifikasi #1478: Latihan ekstra, pesan "Cukup hari ini" + XP kecil

## Intinya
- Setelah 2 putaran, tombol Latihan ekstra diganti satu baris teks penjelasan.
- Tiap putaran selesai memberi maks 2 XP, tampil di layar akhir.
- Jadwal ulang kata tidak berubah. Ubah `ui.js` dan `sw.js` saja.

## 1. Masalah
- Setelah 2 putaran, tombol hilang tanpa penjelasan. Dikira rusak (masukan Sinta, Ilham).
- Tidak ada hadiah, jadi orang berhenti mengulang.

## 2. Perubahan A: pesan di Home
- Tempat: kartu `#xtraBtn` di `ui.js` ±baris 1120.
- Syarat: `extraRounds() >= 2` dan tak ada kata jatuh tempo (`dueNudge` tidak tampil).
- Tampilkan satu baris teks mut: `Cukup hari ini, latihan ekstra lanjut besok.`
- Tanpa tombol, tanpa kartu baru. Pakai kelas teks mut yang sudah ada.
- Bila `extraRounds() < 2` dan tak ada kata layak: tetap kosong seperti sekarang.
- Bila ada kata jatuh tempo: tetap tombol `dueNudge`, pesan tidak tampil.

## 3. Perubahan B: XP kecil per putaran
- Tempat: layar `Cukup untuk sekarang` di `ui.js` ±baris 3298 (cabang `quickRun`).
- Hanya cabang `quickExtra` yang benar. Cabang kartu jatuh tempo tidak berubah.
- Beri XP tetap: `award(xp, 'rem')`. `xp = 2` untuk putaran 1 dan 2 (maks 2 XP, maks 2 putaran/hari).
- Beri XP hanya sekali per putaran: pakai penanda `quickLogged` yang sudah ada.
- Beri XP hanya bila `deckDone >= 1` (minimal 1 kartu dijawab).
- Jangan ubah `v.due`, level, atau jadwal kata (sudah dijaga `quickExtra`).
- Layar akhir: tambah baris `+2 XP`. Sisa teks tetap `Latihan ekstra beres. Jadwal ulang tetap sama.`
- Jangan hitung dobel: XP ini lewat `award()` sekali, sehingga masuk XP hari ini/Target satu kali saja.

## 4. Keputusan yang saya ambil
- Sumber `rem` dipakai sesuai perintah. Sudah dipakai juga di latihan ucapan.
- XP ekstra ikut masuk XP hari ini lewat `award()` (satu kali). Maks tambahan 4 XP/hari.
- Bila developer menilai ini mengganggu Target harian, laporkan di PR; jangan diam-diam diubah.

## 5. Di luar tugas
- Jangan ubah `api/`.
- Jangan sentuh #1473 (keluar menempel & pesan "Lupa").

## 6. Uji
- 320px dan 390px: baris teks tidak terpotong, tidak menumpuk.
- Selesaikan 2 putaran: pesan tampil, tombol hilang. Besok: tombol kembali.
- XP bertambah tepat 2 per putaran, tidak lebih. Muat ulang tidak menambah XP.
- Jadwal ulang kata sama sebelum dan sesudah.
- `node --check ui.js`. Naikkan versi `C` di `sw.js`.

Mockup: `docs/mockup-1478.html`
