# Spesifikasi: Sederhanakan halaman, jelaskan per paragraf (#1129)

## Intinya
- Sekarang AI cuma menjelaskan ±600 huruf pertama halaman. Sisanya diabaikan.
- Perbaikan: satu kartu penjelasan per paragraf, urut sesuai halaman.
- Jatah AI tetap 5x sehari; satu ketukan = satu paragraf.

## 1. Masalah (dari tangkapan layar tester)
- Halaman 6 punya banyak paragraf, tapi hanya paragraf awal dijelaskan.
- Muncul catatan "Cuma bagian awal halaman yang dijelaskan."
- Isi penjelasan pendek: Arti, Struktur, Nuansa. Pembaca merasa kurang.
- Penyebab: teks halaman digabung lalu dipotong 600 huruf (`openSimplify`, `ui.js`).
- Server juga memotong 600 huruf dan menjawab maks 90 kata (`api/`).

## 2. Perilaku baru
- Sheet "Sederhanakan halaman" menampilkan daftar paragraf halaman itu.
- Tiap paragraf: potongan awal teks + tombol "Jelaskan paragraf ini".
- Hasil muncul tepat di bawah paragrafnya (Arti, Struktur, Nuansa).
- Paragraf yang sudah dijelaskan tidak memotong jatah lagi saat dibuka ulang (simpan di memori sheet).
- Tombol "Lapor kalau salah" ada di tiap hasil.
- Catatan "Cuma bagian awal" dihapus, kecuali satu paragraf > 600 huruf (potong di akhir kalimat, beri catatan).

## 3. Aturan paragraf
- Paragraf = satu blok teks di halaman (bukan satu kalimat).
- Kalimat dari `RD.ss` dikelompokkan per paragraf; bila penanda paragraf tak ada, kelompokkan ±3 kalimat.
- Paragraf kosong atau < 15 huruf dilewati.
- Batas kirim per paragraf tetap 600 huruf, sehingga server tidak perlu diubah.

## 4. Jatah & keamanan
- Satu paragraf = satu pemakaian jatah harian (5x). Jatah tidak dinaikkan.
- Sisa jatah tampil di atas daftar, diperbarui tiap hasil.
- Jatah habis: tombol lain dinonaktifkan, pesan "Balik lagi besok ya."
- Opsional (belum diputuskan): tombol "Jelaskan semua" hanya bila jatah cukup. Tanya founder.
- Server `api/` tidak diubah.

## 5. Kriteria selesai
- Halaman dengan 4 paragraf menampilkan 4 kartu, bukan 1.
- Tidak ada teks halaman yang diam-diam terpotong tanpa catatan.
- Berfungsi di layar 320px dan tema baca gelap.
- Naikkan versi `C` di `sw.js` setelah ubah `ui.js`/`style.css`.

Mockup: `docs/mockup-1129.html`
