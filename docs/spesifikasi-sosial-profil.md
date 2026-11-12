# Spesifikasi: sosial ringan: profil, teman, feed "sedang dibaca" (#539)

_Lanjutan `docs/spesifikasi-profil-leaderboard.md` (#383, profil dari leaderboard). Tidak diulang di sini; dokumen itu tetap berlaku untuk cerita publik._
_Status: spesifikasi, menunggu keputusan founder. Tidak ada kode yang diubah._

## Intinya
- Sosial ringan: profil, teman, dan "lagi baca apa". Tanpa chat, tanpa peringkat baru.
- Semua privat dulu. Yang dibagikan hanya judul, bahasa, dan persen. Tidak pernah isi buku.
- Dikerjakan 4 tahap kecil. Server baru perlu deploy manual oleh founder.

## 1. Fitur MVP
**Profil**
- Nama panggilan, @username, dan bahasa yang dipelajari.
- Buku sedang dibaca: judul, bahasa, progres persen.
- Kata baru minggu ini dan streak ("5 hari membaca").

**Teman**
- Ikuti lewat @username. Teman = saling ikuti (diterima kedua pihak).
- Tidak ada pencarian terbuka. Cari hanya dengan @username persis.
- Daftar teman bisa dihapus kapan saja.

**Feed "sedang dibaca"**
- Satu daftar pendek: teman, judul, persen, waktu terakhir baca.
- Tanpa suka, komentar, atau balasan.
- Maks 30 baris. Tidak ada gulir tanpa ujung.

**Di luar MVP**
- Chat, komentar, notifikasi, grup, tantangan antarteman.

## 2. Privasi
**Bawaan (kunci utama)**
- Profil baru: "Hanya teman". Akun lama: "Privat" tanpa migrasi paksa.
- Akun lama tidak berubah sampai pemiliknya membuka pengaturan sendiri.
- Leaderboard lama tetap jalan dengan aturan "Sembunyikan" yang sekarang.

**Pilihan pemilik**
- Tiga level: Privat · Hanya teman · Publik.
- Per buku: saklar "Sembunyikan judul". Teman hanya melihat "Sebuah buku" + bahasa + persen.
- Saklar terpisah: tampilkan streak, tampilkan kata minggu ini.

**Batas yang tidak bisa diubah**
- Tidak ada teks buku, kutipan, atau sampul yang dibagikan lewat profil/feed.
- Cerita publik tetap hanya lewat aturan hak cipta #383 (`docs/riset-hak-cipta.md`).
- Akun uji AI (bagian 5) tidak bisa mengikuti akun asli.

**Kendali pengguna**
- Blokir: yang diblokir hilang dari teman, tidak bisa ikuti lagi, tidak melihat profilmu.
- Keluar dari daftar: hapus akun dari semua daftar teman & feed, satu ketukan.
- Hapus akun menghapus profil, teman, dan feed sekaligus.

**Bukti publik (singkat, belum terverifikasi penuh)**
- StoryGraph: permintaan teman bawaannya "Nobody"; fitur komunitas opt-in. [Bantuan StoryGraph](https://thestorygraph.freshdesk.com/support/solutions/articles/79000141957-how-to-add-someone-as-a-friend-on-the-storygraph)
- Pengguna StoryGraph minta menyembunyikan buku tertentu tanpa kehilangan statistik. [Permintaan fitur](https://roadmap.thestorygraph.com/requests-ideas/posts/add-books-privately)
- Goodreads: profil bisa dibatasi ke teman/anggota/publik; ulasan umumnya publik. [Common Sense](https://privacy.commonsense.org/privacy-report/goodreads)
- Duolingo (panduan pihak ketiga, bukan halaman resmi): profil privat berarti keluar dari liga & teman. [NordVPN](https://nordvpn.com/blog/is-duolingo-safe/)
- Rasa tekanan sosial: tidak ada data langsung. Hipotesis: **belum jelas**. Jangan klaim terbukti.
- Karena itu: tanpa peringkat teman, tanpa angka bersaing, tanpa "kamu tertinggal dari X".

## 3. Server: endpoint & tabel (`api/src/index.js`)
**Deploy manual oleh founder.** Agent hanya menulis kode; founder menjalankan migrasi D1 dan deploy Worker.

**Tabel baru (kolom tambahan di `users`)**
- `users.privacy` TEXT default `'private'` (`private`/`friends`/`public`). Akun lama otomatis `private`.
- `users.show_streak`, `users.show_words` INTEGER default 1.
- `users.is_ai` INTEGER default 0 (label akun uji AI, bagian 5).

**Tabel `reading_status`** (satu baris per user per buku)
- Kolom: `user_id`, `bkey`, `title`, `lang`, `pct` (0–100), `hide_title` (0/1), `updated_at`.
- Kunci: `PRIMARY KEY (user_id, bkey)`. Indeks: `(user_id, updated_at DESC)`.
- Judul dipotong 120 karakter. Tidak ada kolom isi buku.
- Dikirim hanya bila level profil bukan Privat.

**Tabel `friendship`**
- Kolom: `a_id`, `b_id`, `status` (`pending`/`accepted`), `requested_by`, `created_at`.
- Simpan sebagai pasangan terurut (`a_id < b_id`). Kunci: `PRIMARY KEY (a_id, b_id)`.
- Indeks: `(b_id, status)`.

**Tabel `block`**
- Kolom: `blocker_id`, `blocked_id`, `created_at`. Kunci: `PRIMARY KEY (blocker_id, blocked_id)`.

**Endpoint**
- `GET /profile/:username` — profil sesuai izin peminta (bawah).
- `PUT /me/privacy` — ubah level, saklar streak/kata.
- `PUT /me/reading` — kirim judul, bahasa, persen (dipanggil bersama sinkron).
- `POST /friends/:username` — minta pertemanan / terima.
- `DELETE /friends/:username` — hapus teman / tolak.
- `GET /friends` — daftar teman + permintaan masuk.
- `GET /feed` — "sedang dibaca" teman, maks 30.
- `POST /block/:username`, `DELETE /block/:username`.

**Aturan izin (dicek di server, bukan di app)**
- Pemilik selalu bisa lihat profilnya sendiri.
- Privat: orang lain mendapat 404 (bukan 403), agar akun tidak bisa ditebak.
- Hanya teman: butuh `accepted` dan tidak ada blokir di arah mana pun.
- Publik: boleh dilihat siapa pun yang login; judul tersembunyi tetap tersembunyi.
- Akun `is_ai` hanya bisa berteman dengan sesama `is_ai`.
- Hanya judul, bahasa, persen, nick, streak, kata minggu ini yang pernah dikirim.

**Batas laju (per akun, per jam)**
- Permintaan teman baru: 20. Maks 200 teman per akun.
- Cari/lihat profil: 120. Ubah privasi: 30.
- Lewat batas: 429 dengan pesan "Terlalu sering. Coba lagi sebentar."
- Implementasi: tabel hitung kecil `rate(user_id, key, window, n)`, bukan layanan baru.

## 4. Layar app (ikut `BRAND.md` v9)
**Prinsip**
- Tenang, pakai "kamu", fakta bukan sorak. Tanpa maskot, tanpa emoji.
- Warna lapis brand: Plum Noir, Biru Es, stabilo Wasabi untuk fokus saja.
- Tidak ada angka bersaing: tanpa rank teman, tanpa XP teman, tanpa "teman terbanyak".

**Layar**
- Profilku (dari sheet Akun): nama, @username, level privasi, saklar judul/streak.
- Profil teman: nama, bahasa, buku + persen, streak. Satu kartu, tanpa grafik.
- Teman: daftar, permintaan masuk, kolom @username. Tombol "Hapus" dan "Blokir" ada di menu titik tiga.
- Sedang dibaca: daftar teman + judul + persen + "kemarin". Letaknya di Home, di bawah koleksi, bisa disembunyikan.

**Microcopy contoh**
- Feed: "Fira lagi di halaman 48 dari 210." (judul tersembunyi: "Fira membaca satu buku bahasa Jepang.")
- Layar kosong feed: "Belum ada teman yang membaca. Tambah teman lewat @username."
- Belum masuk akun: "Masuk dulu untuk melihat teman." + tombol Masuk.
- Profil privat dilihat orang lain: "Profil tidak ditemukan."

**Layar kosong**
- Tanpa teman: satu kalimat + satu tombol "Tambah teman". Tanpa ilustrasi.
- Akun baru: tampilkan level privasi dulu sebelum apa pun dibagikan.

## 5. Akun AI tester (Tari, Bima, Nadia, Raka, Dina)
**Tujuan**
- Agar fitur sosial bisa diuji dengan profil, teman, dan feed yang nyata di server.

**Cara dibuat**
- Satu skrip sekali jalan di workflow `.github/workflows/kepo-pengguna.yml` (langkah baru "Siapkan akun uji").
- Daftar lewat endpoint `/signup`. Username: `uji_tari`, `uji_bima`, `uji_nadia`, `uji_raka`, `uji_dina`.
- Skrip mengatur `is_ai = 1` lewat langkah admin (deploy manual founder), bukan lewat endpoint publik.

**Kredensial**
- Hanya di GitHub Secret. Nama: `KEEPO_UJI_TARI_PASS`, `KEEPO_UJI_BIMA_PASS`, `KEEPO_UJI_NADIA_PASS`, `KEEPO_UJI_RAKA_PASS`, `KEEPO_UJI_DINA_PASS`.
- Nilai tidak ditulis di repo, log, issue, atau komentar. Skrip menyamarkan nilainya (`::add-mask::`).
- Founder yang membuat secret. Agent tidak pernah melihat nilainya di dokumen.

**Cara dipakai**
- Tiap tester login, mengisi status baca contoh, saling mengikuti sesama akun uji.
- Hasil uji ditulis di issue "Masukan pengguna AI", seperti sekarang.
- Dina memakai akun uji hanya bila fitur ada di Keepo HQ; selain itu tidak perlu login.
- Peran `hq` dan `tester` tetap hanya-baca di kode; login dijalankan skrip, bukan model.

**Label jelas "akun uji AI"**
- Nama panggilan diawali "Uji AI · " (mis. "Uji AI · Tari"). Tidak bisa diubah pemiliknya.
- Profil menampilkan label "Akun uji AI" di bawah nama.
- Tidak muncul di leaderboard, pencarian, atau feed pengguna asli.
- Pengguna asli tidak bisa mengikuti akun uji; sebaliknya juga.

## 6. Risiko & langkah bertahap
**Risiko**
- Privasi bocor: judul buku bisa membuka hal pribadi. Mitigasi: bawaan privat, judul bisa disembunyikan.
- Pelecehan lewat permintaan teman. Mitigasi: blokir, batas laju, tanpa pesan.
- Beban founder: moderasi manual. Mitigasi: tanpa teks bebas selain nama panggilan.
- Hak cipta: tidak ada teks buku di jalur sosial. Tetap ikuti `docs/riset-hak-cipta.md`.
- Menyimpang dari "Reader First": sosial tidak boleh mengganggu baca. Tidak ada notifikasi.
- Akun uji AI membingungkan pengguna asli. Mitigasi: label & pemisahan di bagian 5.

**Tahap bertahap (tiap tahap = satu tugas kecil agent)**
- Tahap 1 (server): kolom privasi + tabel status baca + `GET /profile`. Bawaan privat. Deploy manual.
- Tahap 2 (server + app): teman, blokir, batas laju, layar Teman. Deploy manual.
- Tahap 3 (app): feed "sedang dibaca" di Home + layar kosong. Hanya kode app.
- Tahap 4 (workflow): akun uji AI + label + secret. Butuh founder membuat secret.

**Syarat maju antar tahap**
- QA lolos dan akun lama tetap privat di uji.
- Founder menyetujui tahap server sebelum deploy.

## Keputusan yang dibutuhkan dari founder
- Setuju fitur sosial ringan masuk (sekarang P3, ditunda)?
- Bawaan akun baru: "Hanya teman" atau "Privat"?
- Siap membuat 5 GitHub secret untuk akun uji?
