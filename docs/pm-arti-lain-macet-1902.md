# Arti lain suka macet (#1902)

## Intinya
- Bagian "Arti lain" bisa diam di animasi muat tanpa jalan keluar.
- Penyebab utama: dua permintaan terpisah per kata, tanpa batas waktu bersama.
- Perbaikan: satu permintaan bersama, batas 8 detik, tombol "Coba lagi" selalu ada.

## 1. Gejala
- Ketuk kata: kotak "Arti lain" tampil 3 kotak abu-abu (memuat).
- Kadang tak berubah. Pengguna bingung, harus tutup sheet.
- Terasa parah saat sinyal lemah atau banyak kata diketuk cepat.

## 2. Dugaan penyebab (dari kode)
- Tiap ketukan = 2 permintaan ke layanan gratis: arti, lalu arti lain (`fillAlt` → `altFetch`).
- Ketuk cepat → layanan gratis membatasi (galat 429) → daftar kosong/gagal.
- `fillAlt` berhenti diam-diam bila kata berganti (`ok()` palsu); kotak bisa tertinggal "memuat".
- `perKata` (frasa) memanggil terjemahan tanpa batas waktu bersama; kotak menunggu lama.
- `openAlt` ("Arti ini salah?") memanggil `altFetch` tanpa sinyal batal.
- Belum terbukti di perangkat nyata; perlu diuji saat membangun.

## 3. Perbaikan untuk developer
- Satu permintaan: gabungkan arti + arti lain (`dt=t&dt=bd&dt=at&dt=ex`) bila belum ada di cache.
- Batas waktu keras 8 detik untuk seluruh `fillAlt` termasuk `perKata`; lewat = kondisi "gagal".
- Kotak tak boleh tertinggal "memuat": tiap jalur berakhir di ada / gagal / kosong.
- Ketuk cepat: batalkan permintaan kata lama, jangan menumpuk.
- Gagal 429/offline: pesan jelas + "Coba lagi".
- Jangan ubah cache lama; data kata pengguna tak boleh rusak.

## 4. Cara uji
- Ketuk 6 kata beruntun cepat: tak ada kotak yang macet.
- Mode pesawat: muncul "Arti lain belum bisa dimuat" + Coba lagi.
- Sinyal lemah (throttle): berhenti ≤ 8 detik.
- Uji Jepang/Mandarin dan frasa 2+ kata. Uji 320px & 390px.

## 5. Mockup
- `docs/mockup-1902.html` (Sebelum / Sesudah). Item backlog #194.
