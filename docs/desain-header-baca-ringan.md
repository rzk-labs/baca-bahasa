# Desain: header saat baca buku terlalu penuh (#398)

## Intinya
- Header baca berisi 6 kontrol + judul + 2 baris info. Terlalu ramai.
- Usul: sisakan 2 tombol kanan; Tema dan Ngomong pindah.
- Dikerjakan developer lewat spesifikasi di bawah; app belum diubah.

## 1. Kondisi sekarang (`ui.js` `viewBaca`, `.rbar`)
- Kiri: tombol kembali.
- Tengah: judul, tombol "Bab X dari Y ▾", teks "⚡ XP hari ini", chip "Offline".
- Kanan: Tema, Cara baca (hanya JP/KR/ZH), mic, Pengaturan.
- Di HP 320px: 5-6 tombol 44px + judul berebut ruang.

## 2. Masalah
- Fokus baca terganggu: XP dan tombol ngomong bukan kebutuhan saat membaca (Reader First).
- Judul terpotong karena sisi kanan penuh.
- Tema dan Pengaturan sama-sama soal tampilan baca: dobel.
- Tari (12 Nov): header HP 320px sempit, kontrol berebut ruang.

## 3. Usul susunan baru
- Kiri: kembali.
- Tengah: judul + "Bab X ▾" (tanpa XP).
- Kanan: Cara baca (JP/KR/ZH saja) + Pengaturan. Maks 2 tombol.
- Pindah ke Pengaturan: pilihan Tema (sudah ada di sana), jalan ke Ngomong.
- XP hari ini: tampil di halaman Tamat dan Home, bukan di header baca.
- Chip "Offline": tetap, hanya muncul saat offline.

## 4. Yang perlu dicek developer
- Chip "Mata capek" tetap menawarkan tema gelap.
- Jalan masuk ke tab Ngomong tetap ada (Pengaturan atau tab bawah).
- Cara baca tetap satu ketukan (penting untuk pemula Asia).
- Uji di lebar 320, 360, 390 dan laptop; judul panjang tak menimpa tombol.

## 5. Selesai bila
- Header baca maksimal 2 tombol kanan, tanpa teks XP.
- Judul dan "Bab" terbaca penuh di 320px.
- Tema dan Ngomong bisa dicapai maksimal 2 ketukan.
- Tanpa perubahan data pengguna; versi `C` di `sw.js` dinaikkan.

## 6. Catatan untuk developer
- File: `ui.js` (`viewBaca`, handler `#rThm`, `#rSpeak`), `style.css` (`.rbar`, `.rtitle`, blok `@media (max-width:360px)`).
- Hapus handler yang tak dipakai bersama tombolnya.

## 7. Hasil #466: ikon garis ganti emoji di area baca
- Emoji penanda, tema malam, petunjuk, bab, tamat, arti kata, mic, suara diganti ikon garis.
- Ikon ikut warna teks tema baca; tombol tetap 44px dan aman di 320px.
- Fungsi tidak berubah; versi cache naik ke kepo-v133.

## 8. Hasil #829: judul buku utuh 2 baris
- Judul boleh 2 baris; tak lagi tinggal 1-3 huruf + "…".
- "Bab N ▾", penanda, dan Offline pindah ke baris kecil di bawah judul.
- Tinggi header 56px → 64px; tombol berlabel tetap ada (label tersembunyi di <360px).
- Diperiksa lewat baca kode (belum di perangkat): 320, 360, 390, laptop; judul Latin panjang dan Jepang/Korea pendek.
- Warna ikut 4 tema baca; versi cache naik ke kepo-v279.
