# Spesifikasi: Akun Premium khusus `chiko` (#1093)

## Intinya
- Akun `chiko` (milik owner) jadi premium permanen, tanpa bayar.
- Premium diatur di server, bukan di HP. Tidak bisa dipalsukan.
- Nama `chiko` dikunci supaya orang lain tak bisa mendaftar duluan.

## 1. Kondisi sekarang
- Belum ada konsep premium di app, server, atau layar.
- Semua akun sama. Akun uji pakai awalan `uji_` (sudah dikunci).
- Jadi tugas ini = pondasi premium + akun pertama yang memilikinya.

## 2. Aturan
- Satu penanda `premium` per akun, disimpan di server.
- `chiko` otomatis premium. Akun lain: tidak (sampai ada rencana bayar).
- Nama `chiko` dicadangkan, seperti `uji_`. Pesan: "Username ini sudah dicadangkan."
- Pendaftaran `chiko` oleh owner: lewat langkah manual founder (lihat bagian 5).
- Premium tidak mengunci fitur yang sudah gratis. Tidak ada yang berkurang.

## 3. Yang tampil di layar
- Profil `chiko`: lencana kecil "Premium" di samping nama.
- Pengaturan akun: baris "Paket: Premium (khusus owner)".
- Akun biasa: tidak ada perubahan, tidak ada iklan upgrade.
- Mockup: `docs/mockup-1093.html`.

## 4. Pekerjaan developer
- Server (`api/`): kolom `premium`, migrasi SQL, kirim `premium` di data akun.
- Server: cadangkan username `chiko` di pendaftaran; set premium untuk `chiko`.
- App (`cloud.js`, `ui.js`): baca `premium`, tampilkan lencana + baris paket.
- Naikkan versi `C` di `sw.js`. Cek sintaks dengan `node --check`.
- Deploy server manual (aturan repo), jadi minta founder menjalankannya.

## 5. Langkah manual founder
- Jalankan migrasi SQL baru di server.
- Deploy server.
- Owner daftar akun `chiko`, lalu cek lencana tampil.

## 6. Uji terima
- `chiko` masuk: lencana Premium terlihat di Profil dan Pengaturan.
- Akun lain: tanpa lencana; mendaftar `chiko` ditolak.
- Mengubah data di HP tidak bisa membuat akun jadi premium.
- Data lama (IndexedDB & akun) utuh.

## 7. Pertanyaan terbuka untuk founder
- Fitur premium apa untuk publik nanti? Belum diputuskan.
- Apakah owner punya akun `chiko` yang sudah terdaftar? Kalau sudah, cukup set premium.
