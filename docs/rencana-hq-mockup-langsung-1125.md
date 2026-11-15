# Keepo HQ: mockup langsung tampil di depan (#1125)

## Intinya
- Sekarang mockup tersembunyi di balik tombol "Tampilkan mockup".
- Usul: mockup tampil otomatis, paling atas di kartu Siap dicek.
- Tombol dihapus; tinggal tautan "Buka layar penuh".

## 1. Masalah
- Di detail tugas, bagian "📱 Mockup visual" hanya berisi tombol.
- Founder harus ketuk dulu baru lihat hasilnya.
- Padahal mockup bahan utama untuk Setujui/Revisi.

## 2. Usulan
- Mockup HP langsung dirender saat detail dibuka, tanpa tombol.
- Letaknya di atas ringkasan, tepat di atas tombol Setujui.
- Kalau mockup khusus belum ada, tampilkan app hasil tugas + label jelas.
- Muat malas (lazy) supaya klik tetap cepat (#943).

## 3. Batas
- Hanya Keepo HQ (`dev/src/page.html`, tile mockup + `#mockbtn`).
- Jangan ubah aplikasi utama, `api/`, atau kartu daftar.
- Cek sintaks `dev/src/index.js` bila disentuh.

## 4. Bukti selesai
- Buka tugas Siap dicek di HP: mockup langsung terlihat tanpa ketuk.
- Tidak ada tombol "Tampilkan mockup".
- Mockup: `docs/mockup-1125.html`.
