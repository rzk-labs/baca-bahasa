# Kerjakan Fase 2: beta nyata, diukur di Keepo HQ (Tugas #1262)

## Intinya
- Fase 2 = beta nyata: pengguna sungguhan, diukur dengan angka, bukan tampilan Home.
- Layar yang berubah: halaman "Beta Nyata" di Keepo HQ (lihat `docs/mockup-1262.html`).
- Macet Home sudah punya tugas sendiri (#138, #139). Tugas baru: #140 (ukur beta).

## 1. Koreksi dari revisi founder
- Mockup lama menunjukkan Home macet. Itu salah sasaran untuk "fase 2".
- Mockup baru menunjukkan angka beta: baru, aktivasi, H2, H7, per sumber.
- Perbaikan Home tetap penting, tapi ada di #138 dan #139.

## 2. Tahap yang digerakkan
- Tahap 21 Ukur Pengguna Nyata: baru/hari, aktivasi, H2, H7 per sumber.
- Tahap 22 Aktivasi Sesi Pertama: mulai setelah #139 live dan data #140 masuk.
- Tahap 23 Retensi: H2 ±7% (3 dari 42), target ≥25%; H7 target ≥10%.

## 3. Item #140 — ukur beta nyata (P0, developer)
- Sekarang `/hitung` hanya kirim: hari ini, hari pertama, sumber.
- Tambah dua penanda anonim, terkirim sekali: "baca ≥1 halaman" dan "ketuk ≥1 kata".
- Aktivasi = keduanya di hari pertama. H7 = buka lagi tepat hari ke-7.
- Tabel `hitung` perlu kolom baru (migrasi D1, deploy manual founder).
- Keepo HQ: kartu angka + tabel per sumber, sesuai mockup.
- Tanpa ID, tanpa IP, tanpa teks bacaan. Belum terukur tampil "–".

## 4. Syarat status
- Tahap 21 "selesai" bila HQ menampilkan 4 angka dari data nyata (tanggal + sumber dicatat).
- Sampai itu status tetap "awal" (aturan fase 2: bukan bukti internet).

## 5. Tugas founder
- Deploy Worker `api/` setelah #140 selesai (manual).
- Pantau angka H2/H7 di Keepo HQ tiap Senin.
