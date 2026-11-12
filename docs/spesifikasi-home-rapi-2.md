# Spesifikasi: Perbaiki Tampilan Home (#748)

## Intinya
- Home sudah banyak dibenahi (#670, #684, #743, #745); sisa 5 masalah kecil.
- Fokus: angka Home harus sama dengan bar baca, kartu tak ramai.
- Hanya tampilan Home; format data dan server tidak diubah.

## 1. Sumber masukan
- Tester & pengguna AI (Tari, Bima, Nadia, Raka, Dina), 12 Nov 2026.
- Sudah beres (jangan dikerjakan ulang): persen dobel "% kelar", target harian x/target, pgDay ikut akun.
- Sisa di bawah ini.

## 2. Sisa masalah & perbaikan
1. **Progres Home telat** (Home 14%, bar baca 17%).
   - Simpan `pct`, `pos`, `mleft` buku saat keluar dari baca (kembali ke Home, tab pindah, sembunyi tab).
   - Home membaca angka lewat `progInfo` saja.
2. **Nomor bab beda dengan bab yang dibaca** (Home "Bab 1/11", header bab 七).
   - Kartu Lanjut: tampilkan "Bab N/M" hanya bila bab sudah terhitung dan sama dengan bar baca.
   - Bila belum pasti, tampilkan persen saja.
3. **Kartu "Minggu ini" ramai**
   - Sembunyikan bila semua 0 (sudah), dan jangan tampil di hari pertama pengguna.
   - "Kata disimpan" harus hitung kata yang benar-benar ada di koleksi Kata (bahasa buku), bukan ketukan.
4. **Kartu Streak tinggi, isi cuma "1 hari"**
   - Samakan tinggi tiga kartu (Streak, Target, Level).
   - Baris bawah Streak: satu kalimat pendek; "Rekor barumu!" hanya bila streak ≥ 2.
5. **Bar menu bawah melayang, kartu mengintip di celah**
   - Beri alas solid di bawah bar menu + padding bawah halaman Home.
   - Cek di iPhone Safari (safe-area) dan layar lebar.

## 3. Syarat selesai
- Baca 1 halaman, kembali ke Home: persen sama dengan bar baca.
- Home tidak punya angka "kata" yang beda dengan tab Kata.
- Tidak ada kartu mengintip di bawah bar menu (HP & desktop).
- `node --check` lolos; versi `C` di `sw.js` dinaikkan.

## 4. Batas
- Jangan ubah `api/`, format IndexedDB, atau tampilan halaman baca.
- Partikel が, panduan ketuk, dan bar baca punya tugas sendiri.
