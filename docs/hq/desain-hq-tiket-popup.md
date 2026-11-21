# Evaluasi #1283: tiket di Keepo HQ jadi pop up + animasi loading

## Intinya
- Layak. Detail tugas bisa jadi pop up dari bawah, tanpa pindah halaman.
- Saat status berubah (Setujui/Revisi/Tolak), tampilkan loading jelas di pop up.
- Pakai kerangka pop up yang sudah ada (`.veil` + `.sheet`). Perubahan kecil, hanya `dev/`.

## 1. Kondisi sekarang
- Ketuk kartu tugas → pindah layar penuh (`detail(n)`), tombol "← Kembali".
- Daftar Papan hilang, posisi scroll dan filter harus dipulihkan.
- Klik Setujui: kartu langsung berubah (optimistis), tapi tanpa tanda "sedang diproses".
- Kalau gagal, hanya teks merah kecil.

## 2. Usulan: pop up
- Ketuk kartu → pop up naik dari bawah (HP) / di tengah (layar lebar).
- Isi sama seperti detail sekarang: hasil, mockup, tombol aksi.
- Tutup: tombol ✕, ketuk area gelap, tombol Esc. Daftar di belakang tidak bergeser.
- Tinggi maks 92% layar, isi bisa digulir. Tombol aksi menempel di bawah.
- Tautan langsung `#tugas/123` tetap jalan: buka pop up di atas Papan.
- Tombol Kembali di HP menutup pop up, bukan keluar dari Keepo HQ.

## 3. Pengecualian (tetap layar penuh)
- Baca dokumen panjang (`dokumen()`): tetap halaman sendiri, ada tombol kembali ke pop up.
- Mockup layar penuh: tetap tab baru.

## 4. Loading saat status pindah
- Tombol yang ditekan berubah jadi spinner + teks ("Menyetujui…", "Mengirim revisi…", "Menolak…").
- Dua tombol lain mati sementara. Pop up tidak bisa ditutup tak sengaja.
- Pita status di atas pop up: "Memproses…" dengan garis loading bergerak.
- Sukses: pita berubah warna (biru "Masuk antrean live"), centang singkat.
- Gagal: tampilan kembali seperti semula + pesan merah + tombol "Coba lagi".
- Kartu di Papan ikut berubah kolom dengan animasi singkat (maks 300 ms).
- Hormati `prefers-reduced-motion`: tanpa animasi gerak, cukup teks.

## 5. Cara membangun (untuk developer)
- Buat `bukaTugas(n)`: pasang `.veil.on` + `.sheet`, render `tampilDetail` ke dalamnya, bukan ke `V`.
- Pakai ulang `DET`, `FILES`, `patchTugas`, `act` yang ada. Logika optimistis tetap.
- Tambah `history.pushState` agar tombol Kembali HP menutup pop up.
- Penghentian polling (`timer`) saat pop up ditutup.
- Fokus masuk ke pop up saat buka, kembali ke kartu saat tutup (aksesibilitas).
- Cek `node --check` untuk skrip di `dev/src/page.html` dan `dev/src/index.js`.

## 6. Risiko
- `VIEW` dan `mv` dipakai pelacak layar; pop up butuh penanda sendiri agar polling tak bentrok.
- Scroll latar harus dikunci saat pop up terbuka (iPhone Safari).
- Banyak elemen bergulir di dalam `.sheet`: uji galeri mockup geser horizontal.

## 7. Bukti
- Mockup: `docs/mockup-1283.html` (Sebelum / Sesudah / Loading).
- Backlog: item baru no 140 di `docs/roadmap.json`.
