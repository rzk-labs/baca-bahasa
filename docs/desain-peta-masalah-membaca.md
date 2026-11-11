# Peta masalah membaca bahasa asing

## Intinya
- 10 masalah dari 4 penguji AI; 2 tertangani sebagian, 8 belum.
- Peluang terbesar: baca nyaman, arti kata offline, dan cara baca Korea/Jepang.
- Ini suara penguji AI, bukan manusia nyata. Wajib dicek lewat wawancara.

## 1. Tabel masalah
Berat: 🔴 menghentikan baca · 🟠 mengganggu · 🟡 kecil.

| # | Masalah | Siapa | Seberapa berat | Bukti | Prioritas |
|---|---|---|---|---|---|
| 1 | Layar awal terang, silau saat baca malam | Pembaca malam | 🟠 tiap malam | Nadia | P0 nyaman baca |
| 2 | XP melayang & toast lencana mengganggu fokus | Pembaca serius | 🟠 tiap geser halaman | Nadia | P0 nyaman baca |
| 3 | Harus pilih bahasa cerita & "artiin ke" sebelum mulai | Pemula | 🟠 sekali di awal | Nadia | P0 nyaman baca |
| 4 | Arti kata butuh internet; hilang saat app ditutup | Pengguna KRL/sinyal putus | 🔴 sering | Raka | P0 bantuan kata |
| 5 | Korea/Jepang: tak ada cara baca (romaji/romanisasi) | Level B1 | 🔴 tiap kata | Raka | P0 bantuan kata |
| 6 | Kata berimbuhan diartikan apa adanya, tanpa bentuk dasar | Level A2-B1 | 🟠 sering | Raka | P0 bantuan kata |
| 7 | Kata offline tersimpan kosong, tak pernah terisi lagi | Pengguna sinyal putus | 🔴 diam-diam | Bima | P1 simpan kosakata |
| 8 | Data rusak = app kosong total, progres hilang | Semua | 🔴 jarang, parah | Bima | P0 privasi & aman |
| 9 | Pesan "kuota habis" tampil sebagai arti kata | Semua | 🟠 saat kuota habis | Bima | P0 bantuan kata |
| 10 | Tombol kecil & teks sempit di HP (hapus, tutup tips, tab, 320px) | Pemakai HP | 🟡 sering | Tari | P0 nyaman baca |

- Bukti 4 & 7 saling menguatkan (Raka dan Bima): masalah offline nyata.
- Masalah 1-3 muncul sebelum orang sempat membaca. Risiko berhenti dini.
- Belum ada bukti dari manusia nyata. Lihat bagian 3.

## 2. Lima peluang teratas (A2-B1, Indonesia-first)
Urut dari paling menjanjikan.

1. **Baca tenang, tanpa gangguan** (masalah 1, 2, 10)
   - Kenapa Keepo bisa menang: pembaca datang untuk buku, bukan permainan.
2. **Arti kata tetap jalan offline** (4, 7, 9)
   - Kenapa Keepo bisa menang: orang Indonesia sering baca di jalan dengan sinyal putus.
3. **Cara baca + bentuk dasar untuk Korea/Jepang** (5, 6)
   - Kenapa Keepo bisa menang: arti Bahasa Indonesia plus cara baca, tanpa buka kamus lain.
4. **Mulai dalam 1 ketukan** (3)
   - Kenapa Keepo bisa menang: bahasa ditebak otomatis, pemula tak perlu paham pengaturan.
5. **Progres aman, tak pernah hilang** (8)
   - Kenapa Keepo bisa menang: sekali kehilangan progres, pengguna pergi; rasa aman jadi pembeda.

## 3. Hipotesis untuk diuji
Uji di wawancara atau tes alur baca (tahap 9 & 17).

- **H1:** Pembaca A2-B1 lebih betah tanpa XP & lencana saat membaca.
- **H2:** Arti kata offline lebih penting daripada fitur baru lain.
- **H3:** Pembaca Korea/Jepang berhenti jika tak ada cara baca.
- **H4:** Pengguna baru tak peduli memilih bahasa; tebakan otomatis cukup.
- **H5:** Tema gelap otomatis di malam hari terasa wajar, bukan mengejutkan.

Tambahan untuk naskah wawancara (naskahnya sendiri ada di tugas #7/#11):
- "Ceritakan terakhir kali kamu berhenti membaca bahasa asing. Apa yang terjadi?" (H1, H2)
- "Kamu biasa baca di mana? Sinyalnya bagaimana?" (H2)
- "Ketemu kata baru Korea/Jepang, kamu cari apa dulu: arti atau cara baca?" (H3)
- "Poin, lencana, dan streak: bikin semangat atau mengganggu saat baca?" (H1)
- "Kamu membaca jam berapa? Layar terang atau gelap?" (H5)
- "Kalau app langsung mulai tanpa tanya bahasa, kamu lega atau curiga?" (H4)

## 4. Sudah ditangani atau belum di app
Dicek ke kode saat ini.

| # | Status | Catatan |
|---|---|---|
| 1 | 🟡 Sebagian | Tema gelap & "Ikut HP" ada di pengaturan; bawaan tetap terang. |
| 2 | ❌ Belum | XP melayang dan toast lencana selalu muncul; tak ada mode tenang. |
| 3 | ❌ Belum | Bahasa cerita dan "artiin ke" dipilih manual. |
| 4 | ❌ Belum | Cache arti hanya di memori; hilang saat app ditutup. |
| 5 | ❌ Belum | Tak ada romaji/romanisasi di kartu kata. |
| 6 | ❌ Belum | Tak ada bentuk dasar. |
| 7 | ❌ Belum | Kata offline disimpan dengan arti kosong. |
| 8 | ❌ Belum | Data lama dibaca tanpa penjaga; data rusak bisa bikin app kosong. |
| 9 | ❌ Belum | Terjemahan cadangan tak mengecek pesan error. |
| 10 | 🟡 Sebagian | Tombol umum 44px; hapus/bagikan 34px, tutup tips 32px, tab 11px. |

- Sudah ada: tombol "Coba lagi" saat arti gagal dibuka (menolong masalah 4 sedikit).
- Urutan perbaikan usulan untuk developer: 8, 7, 9 (keandalan), lalu 4, 2, 5.
- Dokumen ini tidak mengubah kode; tiap perbaikan jadi tugas terpisah.
