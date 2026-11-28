# Arti lain gagal: pesan jujur, bukan "batas gratis" (#2070)

## Intinya
- Pesan "kena batas layanan gratis" terdengar seperti paywall. Padahal Keepo tidak punya paket bayar.
- Di layar, arti lain sudah ada, tapi pesan gagal tetap muncul di bawahnya. Saling bantah.
- Perbaikan: pesan sebab jelas (offline / layanan sibuk) + kalimat "Keepo gratis". Tanpa sistem premium publik.

## 1. Temuan dari laporan
- Pengguna melihat "Arti belum ketemu, kayaknya kena batas layanan gratis".
- Ia membaca: ada paket berbayar yang belum jelas. Atau arti lain disalahkan.
- Di tangkapan layar: chip "Pemerintah harus mengejar" sudah ada. Kotak gagal tetap muncul.
- Jadi dua pesan bertentangan di satu sheet.

## 2. Kenyataannya
- Tidak ada paket premium untuk publik. Semua fitur arti lain gratis.
- "Batas gratis" itu batas layanan terjemahan pihak ketiga, bukan batas Keepo.
- Premium hanya ada untuk akun owner (lihat `docs/spesifikasi-akun-premium-chiko.md`).
- Keputusan: jangan buat sistem premium untuk ini. Itu perlu keputusan founder.

## 3. Aturan teks baru
- Hapus frasa "batas layanan gratis" dari semua pesan di sheet kata.
- Offline: "Lagi offline. Arti lain muncul lagi begitu ada sinyal."
- Layanan sibuk / gagal: "Layanan terjemahan lagi sibuk, bukan salahmu. Keepo tetap gratis. Coba lagi sebentar."
- Memang tidak ada arti lain: "Kata ini cuma punya satu arti yang kami temukan." Tanpa tombol Coba lagi.
- Pesan gagal jangan menyalahkan kata atau pengguna.

## 4. Aturan tampil
- Bila chip arti lain sudah tampil, kotak gagal tidak muncul di bawahnya.
- Kegagalan hanya muncul sebagai satu baris kecil saat memuat lebih banyak arti.
- Tombol "Coba lagi" dan "Tutup" tetap ada pada keadaan gagal.
- Mockup: `docs/mockup-2070.html`.

## 5. Pekerjaan developer
- `ui.js` ~3169 dan ~3600: ganti teks `fail(...)`; bedakan `navigator.onLine === false`.
- `ui.js` ~3941: ganti "kayaknya kena batas layanan gratis" di sheet "semua arti".
- Cabang gagal setelah chip ada: jangan gambar kotak gagal.
- Naikkan versi `C` di `sw.js`. Cek `node --check ui.js`.
- Logika terjemah, cache, dan data lama tidak berubah.

## 6. Uji terima
- Cari teks "batas layanan gratis" di app: nol hasil.
- Mode pesawat: pesan offline tampil, tanpa kata "gratis".
- Layanan ditolak: pesan "lagi sibuk" tampil, tombol Coba lagi bekerja.
- Chip sudah ada + gagal muat tambahan: tidak ada dua pesan bertentangan.
- Uji 320px dan 390px, tema terang dan gelap.

## 7. Pertanyaan untuk founder (tidak menahan tugas)
- Apakah nanti ada paket premium publik? Bila ya, butuh tugas terpisah.
- Sampai ada keputusan, semua pesan memakai "Keepo tetap gratis".
