# PM: akun AI di leaderboard + profil publik + "Jelajah" (#613)

_Status: rencana, menunggu keputusan founder. Tidak ada kode yang diubah._
_Lanjutan `docs/spesifikasi-sosial-profil.md` (#539) dan `docs/spesifikasi-profil-leaderboard.md` (#383)._

## Intinya
- Permintaan: akun AI tampil di leaderboard, publik, ada "Jelajah" ala FYP.
- Bentrok: aturan #539 melarang akun AI di leaderboard. Founder perlu memilih.
- Rekomendasi: AI tampil berlabel "Uji AI" di Jelajah dulu. Leaderboard menyusul.

## 1. Permintaan
- Tester & pengguna AI (Tari, Bima, Nadia, Raka, Dina) masuk leaderboard.
- Akun mereka publik, supaya bisa dilihat tanpa tahu nama akunnya.
- Ada daftar rekomendasi ala FYP: orang lain muncul sendiri.

## 2. Bentrok dengan aturan lama
- #539 bagian 5: akun AI "tidak muncul di leaderboard, pencarian, atau feed".
- #539 bagian 2: bawaan profil baru "Hanya teman", tanpa pencarian terbuka.
- Permintaan ini membalik dua aturan itu. Perlu keputusan sadar.

## 3. Risiko jika diterapkan mentah
- Pengguna asli salah kira akun AI itu manusia. Perlu label jelas.
- XP akun AI menggeser peringkat pengguna asli. Leaderboard terasa curang.
- Akun AI publik = nama & judul bacaan terlihat semua orang.
- FYP bisa memicu rasa bersaing. Bukti rasa tekanan sosial: belum jelas.
- "Reader First": sosial tidak boleh mengganggu baca. Tanpa notifikasi.

## 4. Opsi
**A. Jelajah terpisah (rekomendasi)**
- Daftar "Jelajah" di Home: pembaca publik, acak, maks 10.
- Akun AI ikut, berlabel "Akun uji AI". Pengguna asli hanya jika memilih Publik.
- Leaderboard asli tidak berubah. Tidak ada peringkat di Jelajah.

**B. Leaderboard dua jalur**
- Leaderboard asli tetap. Tab kedua "Uji AI" berisi akun AI saja.
- Aman untuk peringkat, tapi tidak membantu bersosialisasi.

**C. Campur penuh (sesuai permintaan harfiah)**
- Akun AI masuk peringkat yang sama dengan manusia, label kecil.
- Risiko tertinggi: peringkat tidak adil. Tidak disarankan.

## 5. Rancangan opsi A
**Aturan**
- Akun AI: publik otomatis, nama "Uji AI · Tari", label tak bisa diubah.
- Pengguna asli: bawaan tetap Privat. Mau tampil harus pilih "Publik" sendiri.
- Jelajah hanya memuat: nama, bahasa, judul bacaan, persen. Tanpa isi buku.
- Judul bisa disembunyikan per buku (seperti #539).

**Urutan "FYP" sederhana (tanpa algoritma rumit)**
- Utamakan bahasa yang sama dengan yang kamu pelajari.
- Lalu yang baru membaca dalam 7 hari. Acak di dalamnya.
- Tanpa XP, tanpa rank, tanpa "teman terbanyak".

**Aksi di kartu**
- Lihat profil. Ikuti. Sembunyikan. Laporkan.
- #539: akun AI tidak bisa berteman dengan akun asli. Jika tujuannya bersosialisasi, aturan ini perlu diputuskan ulang.

**Microcopy contoh**
- Judul: "Lagi baca di Keepo".
- Label: "Akun uji AI" di bawah nama.
- Kosong: "Belum ada yang tampil. Jadi yang pertama: buka profil publik."

## 6. Pengaruh ke server (deploy manual founder)
- Kolom `users.privacy` dan `users.is_ai` sudah direncanakan di #539.
- Tambah endpoint `GET /discover` (maks 10, butuh login, batas laju 60 per jam).
- Server wajib mengecek privasi, bukan app. Privat = tidak pernah muncul.
- Tidak ada perubahan kode di tugas ini. Pekerjaan server menunggu #539 tahap 1.

## 7. Tahap kerja
- Tahap 0: founder memilih opsi dan bawaan privasi (bagian 8).
- Tahap 1 (server): privasi + `is_ai` + `GET /discover`. Deploy manual.
- Tahap 2 (app): kartu "Lagi baca di Keepo" di Home + label AI.
- Tahap 3 (workflow): akun uji AI dibuat, secret oleh founder.

## 8. Keputusan yang dibutuhkan dari founder
- Pilih opsi: A (rekomendasi), B, atau C?
- Boleh akun AI tampil ke pengguna asli, dengan label jelas?
- Pengguna asli tetap Privat bawaan, tampil hanya jika memilih?
