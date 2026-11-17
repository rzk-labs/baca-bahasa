# Kerjakan Fase 2: urutan kerja tahap 21-23 (Tugas #1262)

## Intinya
- Fase 2 macet di dasar: Home sering stuck "Memuat bukumu…", jadi pembaca baru tak sampai baca.
- Urutan: (1) perbaiki macet, (2) ukur aktivasi & H7, (3) baru sentuh aktivasi sesi pertama.
- Dua item backlog P0 dibuat: #138 (macet) lalu #139 (ukur). Tahap 21 tetap "awal".

## 1. Tahap yang digerakkan
- Tahap 21 Ukur Pengguna Nyata: metrik = baru/hari, aktivasi, H2, H7 per sumber.
- Tahap 22 Aktivasi Sesi Pertama: terblokir selama Home macet.
- Tahap 23 Retensi: H2 ±7% (3 dari 42), target ≥25%.

## 2. Temuan: akar macet Home (diverifikasi di kode)
- `cloud.js:37` fungsi `bkState(b)` dan `cloud.js:161` variabel `bkState = ''` sama nama.
- Variabel menimpa fungsi, jadi panggilan `bkState(b)` error, sinkron gagal.
- Dilaporkan Nadia, Tari, Raka (17 Nov); tester tak pernah lewat layar Home.
- Bima: buka database tanpa `onblocked`/`onabort` (`app.js` ±140), bisa menggantung diam-diam.

## 3. Item #138 — perbaiki macet (P0, developer)
- Ganti nama salah satu `bkState` (mis. fungsi → `bkSig`); cek semua pemanggilnya.
- Beri batas waktu ±8 detik, lalu tampilkan rak lokal dari IndexedDB + tombol "Coba lagi".
- Tampilkan rak lokal dulu; sinkron akun jalan di belakang.
- Chip streak disembunyikan sampai data siap (bukan "0 hari").
- Toast "ikut akun" sekali saja, setelah login sukses.
- Database: tangani `onblocked` (pesan "tutup tab Keepo lain") dan `onabort`.
- Naikkan versi `C` di `sw.js`. Data lama tak boleh berubah.

## 4. Item #139 — ukur aktivasi & H7 (P0, developer)
- Sekarang `/hitung` hanya kirim: hari ini, hari pertama, sumber.
- Tambah dua penanda anonim terkirim sekali: "sudah baca ≥1 halaman" dan "sudah ketuk ≥1 kata".
- Aktivasi = keduanya di hari pertama. H7 = buka lagi tepat hari ke-7 (selisih hari).
- Tabel `hitung` perlu kolom baru (migrasi D1, deploy manual founder).
- Keepo HQ: tampilkan baru/hari, aktivasi %, H2 %, H7 % per sumber.
- Tanpa ID, tanpa IP, tanpa teks bacaan.

## 5. Ukuran selesai & syarat status
- Tahap 21 "selesai" bila HQ menampilkan 4 angka itu dari data nyata (tanggal + sumber dicatat).
- Sampai itu: status tetap "awal" (aturan fase 2: bukan bukti internet).
- Tahap 22 dimulai setelah #138 live dan #139 mulai mengumpulkan data.

## 6. Tugas founder
- Deploy Worker `api/` setelah #139 selesai (manual).
- Pantau angka H2/H7 di Keepo HQ tiap Senin.
