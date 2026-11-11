# Kit pengumuman fitur baru: 4 posting dari update live (Tugas #186)

## Intinya
- 4 fitur live, masing-masing 1 posting siap salin (maks 280 karakter).
- Maksimal 1 pengumuman per minggu, mengganti 1 slot Threads di kalender.
- Ada template "cerita kecil dari tester", wajib izin tertulis dulu.

Catatan: `[link app]` = https://rzk-labs.github.io/baca-bahasa/. Link form belum ada di docs; pakai `[link form]`.
Status live: file `tugas.txt` tidak ada di repo. Dicek lewat riwayat perubahan yang sudah masuk `main` dan kode `ui.js`/`app.js`.

## 1. Empat fitur yang dipilih
| # | Fitur | Bukti di app |
|---|---|---|
| A | Hitungan ketukan kata | `ui.js`: "Diketuk N×" di kartu arti & daftar Tersimpan |
| B | Kartu Hafal + jeda ulang | `ui.js`: jeda 1/3/7/21 hari, "Muncul lagi N hari lagi" |
| C | Ekspor CSV untuk Anki | `ui.js`/`app.js`: tombol Ekspor CSV, filter bahasa/buku |
| D | "Lanjut baca" + sisa menit | `ui.js`: kartu Beranda "Bab X dari N · ... lagi" |

Batasan jujur (jangan klaim lebih):
- "Diketuk N×" tampil mulai 2×. Jangan bilang "tiap ketukan dihitung".
- Sisa menit itu perkiraan, bukan angka pasti.
- Jangan sebut Anki otomatis tersambung. Kamu impor file CSV sendiri.

## 2. Draf posting per fitur
### Fitur A: Hitungan ketukan kata
**Post (maks 280 karakter):**
> Kata yang kamu ketuk terus itu bukan cuma kebetulan 😭
> Di Keepo ada "Diketuk 3×" di kartu artinya. Jadi ketahuan kata mana yang bandel.
> Kata paling bandelmu apa? [link app]

- Ide tangkapan layar: kartu arti dengan tulisan "Diketuk 3×", kata disorot.
- Ajakan balas: "Reply 1 kata yang selalu kamu lupa artinya."

### Fitur B: Kartu Hafal dengan jeda ulang
**Post (maks 280 karakter):**
> Hafalan kata nggak perlu diulang tiap hari 🙃
> Di Keepo, geser "Hafal" dan kata itu balik lagi 1, 3, 7, lalu 21 hari kemudian. Yang "Belum" muncul lagi cepat.
> Kamu tim hafal sekali jadi atau ulang-ulang? [link app]

- Ide tangkapan layar: kartu Hafal dengan teks "Muncul lagi 3 hari lagi".
- Ajakan balas: "Reply tim hafal kilat atau tim ulang terus."

### Fitur C: Ekspor CSV untuk Anki
**Post (maks 280 karakter):**
> Pakai Anki? Kata dari buku yang kamu baca bisa dibawa 📦
> Di tab Kata ada tombol Ekspor CSV. Pilih per bahasa atau per buku, lalu impor ke Anki-mu.
> Kamu hafalin kata pakai app apa? [link app]

- Ide tangkapan layar: bar atas daftar Tersimpan dengan tombol "Ekspor CSV" dan pilihan bahasa.
- Ajakan balas: "Reply app hafalan favoritmu, Anki atau yang lain."

### Fitur D: "Lanjut baca" dengan sisa menit
**Post (maks 280 karakter):**
> Males lanjut baca karena nggak tahu masih berapa lama? Sama 😅
> Di Beranda Keepo, kartu "Lanjut baca" nunjukin posisi bab dan perkiraan sisa menit. Cukup buat 1 bab sebelum tidur?
> Kamu baca jam berapa? [link app]

- Ide tangkapan layar: kartu "Lanjut baca" di Beranda, bagian "Bab X dari N · ... lagi".
- Ajakan balas: "Reply jam baca favoritmu: pagi, siang, atau tengah malam."

Tips posting:
- Hook di baris pertama, jangan diganti.
- Balas komentar dalam 1 jam pertama (lihat `marketing-balasan-komentar.md`).
- Satu tangkapan layar per post. Tutup info pribadi.

## 3. Template "cerita kecil dari tester"
Ubah masukan tester jadi post. Wajib izin tertulis dulu.

Langkah:
- Minta izin dengan kalimat di `marketing-testimoni-tester.md` bagian 3. Simpan screenshot balasan.
- Pakai pilihan izin 1-3 saja. Pilihan 4 = jangan dikutip.
- Edit hanya typo. Makna tidak boleh berubah.

**Template (maks 500 karakter):**
> Cerita kecil dari tester Keepo, [nama/inisial/tanpa nama sesuai izin]:
> "[kutipan asli yang sudah diizinkan]"
> Dari situ kami [perbaikan atau fitur nyata yang sudah live].
> Kamu ada keluhan juga? Reply aja 👇 [link form]

Aturan isi:
- Hanya masukan tester yang nyata dan sudah diizinkan.
- Bagian "Dari situ kami..." wajib sudah live. Cek dulu di app.
- Masukan tester AI (Tari, Bima, Nadia, Raka) bukan testimoni. Jangan ditulis sebagai orang nyata.

## 4. Aturan jadwal
- Maksimal 1 pengumuman fitur per minggu.
- Pengumuman **mengganti** 1 slot Threads ringan, bukan menambah. Total aksi per minggu tetap maks 3.
- Slot di `marketing-kalender-4-minggu.md`:
  - Bagian 4 (Minggu 3), Kamis: ganti Threads Post 6 dengan Fitur A.
  - Bagian 5 (Minggu 4), Minggu: ganti Post 10 dengan Fitur B, hanya bila sudah 15 pendaftar.
  - Setelah 4 minggu: Kamis tiap minggu, urutan C lalu D.
- Minggu 1 dan 2 jangan dipakai. Fokus kenalan dan ajak tester dulu.
- Pendaftar masih sepi? Pakai bagian 7 kalender ("Kalau sepi"), jangan tambah pengumuman.

## 5. Cara ukur
Catat di `marketing-lembar-hasil.md`:
1. Balasan per post.
2. Follow baru.
3. Pendaftar form minggu itu.

Cara baca:
- Fitur dengan balasan terbanyak: ulangi gaya hook-nya.
- Balasan banyak tapi pendaftar 0: perjelas ajakan di CTA.
