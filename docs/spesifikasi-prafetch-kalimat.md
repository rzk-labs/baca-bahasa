# Spesifikasi: prafetch terjemahan kalimat saat sinyal lemah (#458)

## Intinya
- Di KRL/sinyal jelek, ketuk kata menunggu lama atau gagal (keluhan Raka, Bima).
- Solusi: saat berhenti di satu halaman, terjemahkan kalimatnya pelan-pelan di latar.
- Hasil masuk cache yang sudah ada; ketukan pengguna selalu didahulukan.

## 1. Kondisi nyata di kode
- `translate()` (`app.js`) sudah punya `trCache` (Map, kunci `sl|tl|teks`) dan tulis tertunda 3 detik.
- Batas cache sekarang `TR_MAX = 300`, bukan 500. Pakai 300; jangan dinaikkan.
- Sheet kalimat (`loadSent`, `ui.js`) memanggil `translate(sent, ...)`: kalimat yang sudah di-cache langsung tampil.
- Kata/frasa memakai `translate()` yang sama, jadi prafetch kalimat tidak boleh menyentuh jalur itu.

## 2. Perilaku
- Pemicu: halaman e-reader aktif diam ±1,5 detik, lalu `requestIdleCallback` (cadangan `setTimeout`).
- Hanya bila `navigator.onLine` dan bukan `navigator.connection.saveData`.
- Daftar: kalimat halaman aktif yang punya kata (`i >= 0`), urut dari atas, maks 12.
- Lewati kalimat yang sudah ada di `trCache`.
- Satu permintaan berjalan sekaligus; jeda 400 ms antar permintaan.
- Tiap permintaan pakai `AbortController` sendiri dan batas waktu bawaan 8 detik.
- Tanpa cadangan MyMemory untuk prafetch (hemat kuota); gagal sekali = lewati kalimat itu.
- Dua kegagalan berturut-turut: berhenti untuk halaman itu.

## 3. Hentikan dan prioritas
- Ganti halaman/bab, tutup buku, pindah tab, offline, Hemat Data aktif, tab tersembunyi: batalkan antrean + permintaan jalan.
- Ketukan kata/kalimat: tahan prafetch (batalkan yang jalan), ketukan jalan lebih dulu.
- Lanjutkan prafetch ±1 detik setelah sheet ditutup, hanya sisa daftar.
- Jangan pernah menunggu prafetch di jalur ketukan.

## 4. Penulisan cache
- Beri `translate()` opsi `quiet` (atau buat fungsi prafetch sendiri) yang mengisi `trCache` tanpa `trPersist()` per kalimat.
- Setelah satu batch (atau penghentian), panggil `trPersist()` sekali.
- `trFlush()` tetap memangkas ke `TR_MAX`; entri tertua keluar lebih dulu.
- Prafetch tidak memindahkan entri lama ke ujung (jangan "sentuh" cache hit).
- Format entri tidak berubah; data lama aman, tanpa migrasi.

## 5. Di luar cakupan
- Tidak ada prafetch per kata/frasa, tidak ada halaman berikutnya.
- `api/` tidak diubah. Tidak ada pengaturan baru.
- Pesan "sinyal lemah" dan tombol coba lagi di sheet tidak diubah (tugas lain).

## 6. Syarat selesai
- `node --check app.js ui.js` lolos; naikkan versi `C` di `sw.js`.
- Uji 320px dan layar lebar: membalik halaman cepat tidak lag, tidak ada lonjakan permintaan.
- Uji jaringan "Slow 3G": ketuk kalimat yang sudah di-prafetch langsung tampil.
- Uji offline & Hemat Data: nol permintaan prafetch.
- Satu penulisan localStorage per batch (cek di DevTools).
