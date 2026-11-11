# Riset: kebiasaan balik baca, pengingat, streak & batas PWA iPhone

Tugas #99. Tanda: ✅ = pengetahuan umum yang mapan; ⚠️ = belum diverifikasi ulang (riset ini tanpa buka sumber langsung). Cek ⚠️ sebelum dijadikan keputusan.

## Intinya
- Orang balik karena alasan kecil & jelas: "lanjut dari sini". Bukan karena api streak.
- Dari GitHub Pages, Keepo tidak bisa kirim notifikasi. Pengingat harus muncul saat app dibuka.
- Usul 3 pemicu murah: "Lanjut baca", "kata hari ini", ringkasan mingguan. Tanpa hukuman.

## 1. Apa yang bikin orang balik tiap hari
Pola umum (⚠️ pengamatan produk, belum ada data Keepo):

| App | Streak | Target harian | Pengingat |
|---|---|---|---|
| Duolingo | Inti produk; ada "freeze" | XP harian | Notifikasi agresif, tiap hari |
| Readlang | Tidak menonjol | Tidak ada | Email/kartu ulang kata |
| LingQ | Streak + "coins" | Target kata/hari | Email & notifikasi app |
| Language Reactor | Tidak ada | Tidak ada | Tidak ada (alat bantu, bukan kebiasaan) |
| Kindle | Streak baca (hari berturut) | Target menit/hari | Notifikasi "waktunya baca" |

Poin penting:
- Streak kuat untuk app latihan (Duolingo). Untuk baca buku, pemicunya lebih ke cerita.
- Kindle & Readlang membuktikan: balik baca bisa tanpa gamifikasi berat.
- Streak bisa terasa seperti tagihan. ⚠️ hipotesis, uji lewat wawancara.

Keepo sekarang sudah punya streak, target XP harian, dan kartu "Lanjut baca" di Beranda. Rujukan:
- Jadwal ulang kata: `docs/riset-jadwal-ulang-kata.md`.
- Celah kompetitor: `docs/riset-kompetitor-gap.md`.
- Insentif/voucher: `docs/riset-voucher-insentif.md`.

## 2. Apa yang mungkin untuk PWA Keepo (tanpa server notifikasi)

| Fitur | iPhone Safari | Android Chrome |
|---|---|---|
| Instal ke layar utama | Manual: Bagikan → "Tambah ke Layar Utama" | Ada prompt instal |
| Web Push | Bisa, hanya setelah diinstal (iOS 16.4+) | Bisa, tanpa instal |
| Badge angka di ikon | Bisa untuk app terinstal (iOS 16.4+) | Bisa (app terinstal) |
| Pengingat terjadwal lokal (tanpa server) | Tidak ada | Tidak ada (Notification Triggers dibatalkan) |
| Penyimpanan tahan lama | Terinstal: aman. Di tab Safari: bisa terhapus setelah ±7 hari tak dibuka | Lebih longgar |

Batas nyata:
- Web Push butuh server pengirim. GitHub Pages statis tidak bisa. Worker `api/` bisa, tapi deploy manual. ✅
- Tidak ada API "bunyikan alarm jam 19.00" tanpa server. Periodic Background Sync hanya Chrome Android terinstal, tak dijamin. ⚠️
- Di iPhone, izin notifikasi hanya diminta lewat ketukan pengguna, dan hanya di app terinstal. Pengguna tab Safari tidak terjangkau. ✅

Sumber (⚠️ buka ulang sebelum dipakai):
- WebKit, Web Push di iOS: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
- WebKit, kebijakan penyimpanan (batas 7 hari): https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
- MDN, Badging API: https://developer.mozilla.org/en-US/docs/Web/API/Badging_API
- MDN, Push API: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
- Chrome, Notification Triggers (dihentikan): https://chromestatus.com/feature/5133150283890688

Kesimpulan: pemicu terbaik tanpa server = yang muncul saat app dibuka. Badge angka opsional untuk app terinstal.

## 3. Rekomendasi 3 pemicu murah (Reader First, AI Second)
1. **Lanjut di halaman X.** Kartu Beranda: judul + "halaman 42, ±6 menit lagi". Dasarnya sudah ada.
2. **Kata hari ini dari bukumu.** 1 kata yang kamu ketuk sebelumnya, tampil di Beranda. Tanpa AI baru.
3. **Ringkasan minggu ini.** "Kamu baca 3 hari, 12 kata baru." Tanpa "streak putus".

Aturan main:
- Tanpa hukuman. Streak boleh tetap, tapi bukan satu-satunya pemicu.
- Notifikasi opsional dan mati secara bawaan. Pengingat dalam app dulu.
- Ukur: berapa persen yang membuka Beranda lalu klik "Lanjut baca".

## 4. 3 pertanyaan tambahan untuk naskah wawancara
Tambahkan setelah P6 di `docs/naskah-wawancara-pengguna.md` (opsional, ±3 menit):
- **P15.** Biasanya kamu baca jam berapa & di mana? Apa yang bikin kamu mulai?
- **P16.** Pernah rutin baca/belajar lalu berhenti? Ceritain apa yang bikin berhenti.
- **P17.** Pengingat atau streak: pernah bantu atau malah bikin kesal? Contohnya?

Hipotesis yang diuji: pemicu "lanjut dari sini" lebih kuat daripada streak.

## 5. Usulan tugas developer kecil
**"Kartu Lanjut baca: tampilkan halaman & estimasi menit tersisa."**
- Ubah hanya kartu hero "Lanjut baca" di Beranda (`ui.js`).
- Tanpa data baru; pakai progres baca yang sudah ada.
- Selesai bila kartu menampilkan "halaman X · ±N menit lagi" dan klik langsung ke halaman itu.

## Langkah berikutnya
- Founder: tambahkan P15-P17 ke naskah bila waktu wawancara cukup.
- Dev: kerjakan tugas bagian 5.
- Setelah 15 wawancara: putuskan perlu Web Push atau cukup pengingat dalam app.
