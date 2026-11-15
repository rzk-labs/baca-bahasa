# Spesifikasi: Lapor terjemahan salah (#1113)

## Intinya
- Kartu arti dapat tombol kecil "Arti ini salah?".
- Ketuk → tampil arti alternatif dari kamus, bisa dipilih.
- Pilihan pengguna tersimpan di kata itu; laporan disimpan lokal, tanpa server.

## 1. Masalah
- Pengguna (Ilham, Sinta, Nadia) bilang terjemahan kadang ngaco.
- Sekarang hanya ada "Lapor kalau salah" di penjelasan AI, bukan di arti kata.
- Layanan gratis (Google gtx, MyMemory) memang bisa meleset.

## 2. Perilaku
- Tombol teks kecil "Arti ini salah?" di bawah arti pada kartu arti kata/kalimat.
- Ketuk membuka daftar: arti lain dari kamus (maks 4) + "Terjemahkan ulang".
- Arti lain diambil dari data kamus yang sudah ada (`dict` terms), tanpa panggilan baru.
- Pilih salah satu → arti kartu diganti, kata tersimpan memakai arti itu.
- Kalau tak ada alternatif: tampil "Belum ada arti lain. Coba terjemahkan ulang."
- "Terjemahkan ulang" melewati cache sekali, lalu menyimpan hasilnya.
- Gagal jaringan: pesan ramah + tombol "Coba lagi".

## 3. Data
- Tambah penanda `rep:1` pada kata yang dilaporkan (migrasi tak perlu, field opsional).
- Simpan hanya di perangkat; tidak dikirim ke server.
- Data lama tetap terbaca.

## 4. Catatan teknis
- Titik ubah: kartu arti di `ui.js`, cache terjemahan di `app.js`.
- Naikkan versi `C` di `sw.js` setelah ubah file.
- Ikuti gaya tombol `ghost` yang ada; tema baca netral.

## 5. Uji terima
- Tombol terlihat tanpa scroll di layar 320px.
- Pilih arti lain → kartu & daftar Kata ikut berubah.
- Offline: pesan ramah, app tidak error.

Mockup: `docs/mockup-1113.html`.
