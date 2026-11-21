# Ikon & logo Keepo: terasa app baca (#584)

## Intinya
- Ikon sekarang cuma huruf "K"; tidak ada petunjuk "baca".
- Solusi: tambah isyarat buku terbuka + stabilo, tanpa maskot.
- Satu tugas desain (#45 di roadmap) mengganti ikon; kode belum diubah.

## 1. Masalah
- Ikon app = "K" Biru Es di latar Plum Noir + coretan Wasabi.
- Di layar utama HP, mirip app catatan atau game, bukan app baca.
- Pengguna baru tak dapat petunjuk "cerita/buku" dari ikon.
- Tagline sudah bilang "baca"; ikon belum.

## 2. Batas dari BRAND.md v9
- Tanpa maskot (file `img/kepo-*.webp` tetap tak dipakai).
- Warna tetap: Plum Noir, Biru Es, stabilo Wasabi.
- Wasabi hanya untuk coretan/penanda; jangan jadi latar.
- Harus terbaca di 180 px dan 48 px (tab browser).

## 3. Tiga opsi ikon
| Opsi | Gambar | Nilai |
|---|---|---|
| A (disarankan) | Buku terbuka Biru Es; satu baris teks disorot Wasabi | Langsung terbaca "baca + tandai kata" |
| B | "K" jadi halaman terlipat, stabilo di bawah | Tetap huruf, ada isyarat halaman |
| C | Dua halaman, "K" kecil di tengah | Paling jelas, tapi ramai di ukuran kecil |

- Pilih A: sesuai ide brand ("menandai kata seperti stabilo").
- Favicon 48 px: sederhanakan jadi halaman + satu garis Wasabi.

## 4. Logo kata di dalam app
- Logo kata "Keepo" + coretan Wasabi sudah sesuai brand; pertahankan.
- Gambar pratinjau bagikan (og:image) ikut ikon baru.
- Tambahan opsional: sub-teks "baca bukumu sendiri" di layar pertama.

## 5. Tugas lanjutan (#45)
- Gambar ulang `favicon.svg`, lalu ekspor `icon-180/192/512` dan `icon-maskable-512`.
- Maskable: isi gambar di area aman tengah (80%).
- Perbarui BRAND.md baris "Ikon app".
- Naikkan versi `C` di `sw.js` (ikon ikut di-cache).

## 6. Cek selesai
- Orang asing diberi 5 detik: sebut "app buat apa?".
- Ikon terbaca di 48 px dan di layar utama iPhone.
- Kontras Biru Es di Plum Noir tetap tinggi.
- Founder setujui gambar sebelum live.
