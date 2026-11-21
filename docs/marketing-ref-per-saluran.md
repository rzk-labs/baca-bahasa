# Kode ?ref per saluran + lembar catat mingguan (Tugas #1528, Tahap 27)

## Intinya
- Satu saluran = satu kode `?ref`. Pakai tabel di bagian 1, jangan bikin kode baru.
- Tiap Minggu: isi lembar bagian 2, maksimal 10 menit.
- Putuskan saluran terbaik dengan aturan bagian 3, bukan dengan perasaan.

Status: draft. Angka di sini belum data nyata (aturan fase 2).
Tidak diulang: saluran (`marketing-saluran-growth.md`), paket launch (`marketing-paket-launch.md`), langkah awal (`LAUNCH-SEKARANG.md`), patokan corong (`riset-corong-akuisisi-organik.md`).

## 1. Kode baku per saluran

Sudah dicek di kode aplikasi dan server:
- Aplikasi membaca `?ref=` saat Keepo pertama kali dibuka di HP itu.
- Kode diubah jadi huruf kecil; hanya huruf, angka, `_`, `-` yang lolos.
- Pakai maksimal **10 karakter**. Lebih dari itu terpotong di angka aktivasi.

| Saluran | Kode | Tautan siap salin |
|---|---|---|
| Threads | `threads` | https://rzk-labs.github.io/baca-bahasa/?ref=threads |
| Instagram (bio/story) | `ig` | https://rzk-labs.github.io/baca-bahasa/?ref=ig |
| TikTok | `tiktok` | https://rzk-labs.github.io/baca-bahasa/?ref=tiktok |
| WhatsApp (grup/status) | `wa` | https://rzk-labs.github.io/baca-bahasa/?ref=wa |
| Komunitas (Reddit, Discord, forum) | `komunitas` | https://rzk-labs.github.io/baca-bahasa/?ref=komunitas |
| Teman (chat pribadi/langsung) | `teman` | https://rzk-labs.github.io/baca-bahasa/?ref=teman |

Aturan pakai:
- Tautan di bio dan di posting pakai kode yang sama per saluran.
- Mau bedakan dua kampanye di satu saluran? Tambah angka: `threads2`.
- Kode lama `rd-1`, `th-bio`, `tt-bio` boleh dipakai bila eksperimen sudah jalan. Jangan campur.
- Tautan tanpa `?ref` tercatat sebagai `langsung`. Tester AI/dev pakai `?ref=uji`.

## 2. Lembar catat mingguan (10 menit)

Kapan: tiap Minggu malam. Salin tabel ini, satu salinan per minggu.

Langkah (urut):
1. Buka tautan /hitung (di bawah). Cari baris tiap kode di `per_sumber`.
2. Isi kolom **Baru** dan **H2** dari baris yang namanya persis kode saja.
3. Isi kolom **Posting** dari ingatanmu. Tulis 0 bila tidak posting.

Minggu: ______ (tanggal)

| Saluran | Posting minggu ini | Baru (30 hari) | H2 (kembali hari ke-2) | Catatan 1 baris |
|---|---|---|---|---|
| threads | | | | |
| ig | | | | |
| tiktok | | | | |
| wa | | | | |
| komunitas | | | | |
| teman | | | | |
| langsung (tanpa ref) | - | | | |
| **Total** | | | | |

Cara baca angka:
- Buka: https://kepo-api.rizkachoirunnisa0403.workers.dev/hitung (juga tampil di Keepo HQ, bagian Beta Nyata).
- `baru` = orang yang pertama kali buka Keepo. `h2` = yang kembali besoknya.
- Angka mencakup 30 hari terakhir. Catat total 30 hari, atau selisih dari minggu lalu.

Baris dengan akhiran (mis. `threads-c-t2-gt`):
- Itu penanda aktivasi (baca halaman, ketuk kata). Bukan pengguna tambahan.
- Jangan dijumlahkan ke kolom Baru. Abaikan bila waktumu mepet.

Batas angka (jujur):
- Orang yang pernah buka Keepo sebelumnya tidak dihitung baru.
- Mode uji dan bot tidak dicatat.
- H2 baru terisi lengkap 2 hari setelah orangnya datang.

Hitung cepat tiap bulan:
- Baru per bulan = jumlah kolom Baru semua saluran selama 30 hari.
- H2 % = H2 dibagi Baru, dikali 100.

## 3. Aturan keputusan

Patokan (dari `riset-corong-akuisisi-organik.md`, belum data nyata):
- Target kerja: **100 pengguna baru/bulan** dari 1 saluran terbaik.
- Syarat keluar tahap 27: **300 baru/bulan** dan 1 ref terbukti terbaik.

**Saluran dianggap terbaik bila (semua benar):**
- Baru-nya paling banyak antar saluran, 4 minggu berturut-turut.
- Minimal 30 baru dalam 30 hari, supaya bukan kebetulan satu posting.
- H2-nya tidak jauh di bawah saluran lain (selisih kurang dari 10 poin).

**Saluran dihentikan bila (salah satu benar):**
- 4 minggu, minimal 6 posting, tapi baru kurang dari 15.
- Butuh lebih dari 1 jam/minggu, padahal baru-nya paling sedikit.
- Aturan platform melarang tautan (komunitas): berhenti, ganti cara.

**Sesudah memilih:**
- Taruh 70% waktu di saluran terbaik, 30% uji satu saluran lain.
- Baru 100/bulan tercapai? Pertahankan, jangan tambah saluran.
- Baru 300/bulan tercapai 1 bulan? Catat di tahap 27, lapor PM.
- Data kurang dari 4 minggu: belum boleh memutuskan. Tetap isi lembar.

Ukuran Threads (reply, follow) tetap dicatat di dokumen strategi Threads. Lembar ini hanya pengguna baru dan H2.
