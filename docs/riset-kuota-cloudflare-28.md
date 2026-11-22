# Riset: batas gratis Cloudflare & tanda bahaya (tahap 28)

## Intinya
- Gratisnya habis duluan di **permintaan harian**: sekitar 1.200 akun aktif per hari.
- Penyebab utama: app "cek server" tiap menit saat dibuka. Bisa dihemat ±70%.
- Aman untuk 42, 300, dan ±1.000 pengguna. Di 5.000 pasti jebol tanpa hemat.

## 1. Batas gratis Cloudflare (dicek 22 Nov 2026)
- **Workers:** 100.000 permintaan/hari. Reset jam 00:00 UTC (07:00 WIB).
- **D1 (database):** 5 juta baca baris/hari, 100.000 tulis baris/hari, 5 GB simpan.
- Tulis kolom yang punya indeks dihitung 2 baris. Baca dihitung per baris yang dipindai.

Kalau habis:
- Permintaan Worker habis: pengguna dapat error 1027 sampai reset.
- D1 habis: semua query ditolak sampai reset. Login, sinkron, leaderboard mati.
- Naik ke paket berbayar menghapus batas dalam hitungan menit.

Sumber: [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), dibaca 22 Nov 2026. Blog pihak ketiga cocok dengan angka ini.

Tidak terhitung: situs statis di GitHub Pages (app, gambar). Hanya panggilan ke `api/`.

## 2. Beban per pengguna aktif per hari (angka kasar)
Asumsi: akun masuk, buka app ±20 menit, 4 kali buka/tutup.

| Sumber | Permintaan | Tulis D1 | Baca D1 |
|---|---|---|---|
| Sinkron otomatis (tiap 60 dtk: cek akun + cek buku) | ±48 | 0 | ±400 |
| Kirim progres bila berubah (tiap 20 dtk) | ±8 | ±24 | ±16 |
| Leaderboard (2 kali buka) | ±4 | 0 | ±100–1.500 |
| Hitungan anonim `/hitung` | ±2 | ±3 | 0 |
| **Total** | **±60** | **±30** | **±500** (naik ke ±1.500 di 5.000 pengguna) |

Catatan:
- Sinkron paling boros: tiap menit 2 permintaan, walau tak ada yang berubah.
- Leaderboard menghitung peringkat dengan memindai antrean. Makin ramai, makin berat.
- Pengunjung tanpa akun hanya 1–2 permintaan/hari (hitungan anonim).

## 3. Proyeksi (pengguna aktif per hari, semua pakai akun)
Ambang 70%: permintaan 70.000, tulis 70.000, baca 3,5 juta.

| Pengguna aktif | Permintaan/hari | Tulis/hari | Baca/hari | Status |
|---|---|---|---|---|
| 42 | 2.500 (3%) | 1.300 (1%) | 21 rb (<1%) | Aman |
| 300 | 18.000 (18%) | 9.000 (9%) | 150 rb (3%) | Aman |
| 1.000 | 60.000 (60%) | 30.000 (30%) | 500 rb (10%) | Mepet 70% |
| 5.000 | 300.000 (300%) | 150.000 (150%) | 7,5 juta (150%) | Jebol |

- **70% pertama tercapai:** permintaan, di ±1.170 akun aktif/hari.
- Menyusul: tulis di ±2.300, baca di ±2.300 (leaderboard) sampai ±7.000.
- Angka ini kasar (±2x). Ukur dulu dengan pemantauan sebelum memutuskan.

## 4. Tanda bahaya (bisa dipantau otomatis)
1. **Permintaan Worker hari ini > 50.000** (50%). Peringatan kuning; >70.000 merah.
2. **Tulis D1 hari ini > 50.000.** Merah >70.000.
3. **Baca D1 hari ini > 2,5 juta.** Merah >3,5 juta.
4. **Error server (5xx / 1027) > 1%** dari permintaan, dalam 1 jam.
5. **Ukuran data D1 > 2 GB** (40% dari 5 GB). Terutama dari buku di akun.

## 5. Saran hemat (siap jadi tugas developer)
1. **Sinkron lebih jarang:** hanya saat app dibuka, saat ada perubahan, atau tiap 5 menit. Hemat ±60% permintaan.
2. **Cek buku sekali per buka app**, bukan tiap sinkron. Hemat ±30% lagi, plus baca D1.
3. **Simpan leaderboard sementara 60 detik** dan batasi hitung peringkat. Baca D1 tak naik tajam.

Dengan 1 dan 2, batas 70% bergeser dari ±1.200 ke ±4.000 akun.

## 6. Kesimpulan & langkah berikutnya
- Tahap 28 naik ke **draft** (bukti: dokumen + web resmi Cloudflare, bukan uji nyata).
- Belum selesai: pemantauan otomatis & 4 minggu tanpa data hilang belum ada.
- Langkah: developer kerjakan item backlog 172 (hemat sinkron + pemantauan kuota).
- Syarat: perubahan `api/` perlu deploy manual oleh founder. Ukur ulang setelah itu.

Rujukan: `docs/pm-peta-fase-2.md` (tahap 28), `docs/roadmap.json`.
