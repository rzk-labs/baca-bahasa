# Spesifikasi: arti kata tetap terlihat di sheet kalimat (#300)

## Intinya
- Laporan: di arti kalimat, bingung terjemahan mana milik kata yang diketuk.
- Penyebab: kata hanya ditandai di kalimat asli, tidak di terjemahan.
- Solusi: tampilkan "kata → arti" di atas, dan tandai bagian terjemahan jika bisa.

## 1. Masalah
- Ketuk kata → "Lihat kalimatnya" → sheet kalimat penuh terbuka.
- Kata tertanda `<mark>` di kalimat asli, tapi terjemahan satu blok tanpa tanda.
- Arti kata dari sheet sebelumnya hilang dari layar. Pembaca harus menebak sendiri.
- Hal yang sama terjadi di kalimat panjang dan frasa hasil "Perluas".

## 2. Perilaku
- Di `showSentence`, kalau ada `word`: tambah baris "kata → arti" di bawah kalimat asli.
- Contoh: **ringan** → "light". Arti diambil dari hasil `translate` kata (cache, tanpa permintaan baru).
- Arti belum ada (offline/gagal): baris tidak tampil. Tanpa pesan error baru.
- Kalimat dibuka dari tahan-kalimat (tanpa kata): tampilan seperti sekarang.
- Tombol kembali (`#sback`) tetap ke sheet arti kata.

## 3. Tanda di terjemahan (opsional, tahap 2)
- Jika arti kata (huruf kecil) ditemukan utuh di terjemahan kalimat: bungkus dengan `<mark>`.
- Tidak ketemu: jangan menebak. Cukup baris "kata → arti".
- Jangan memanggil terjemahan tambahan hanya untuk menyejajarkan kata.

## 4. Tampilan
- Baris "kata → arti" memakai gaya chip yang sudah ada; ikuti `BRAND.md`.
- Warna `<mark>` sama di kalimat asli dan terjemahan.
- HP 320px: teks membungkus baris, tidak meluber. Tinggi sheet tak memotong kalimat terpilih (`keepVisible`).

## 5. Selesai bila
- Ketuk kata, lalu "Lihat kalimatnya": baris "kata → arti" terlihat tanpa menggulir.
- Perluas ke frasa 2-3 kata, lalu buka kalimat: baris memuat frasa dan arti frasa.
- Tahan kalimat: tidak ada baris tambahan, tidak ada error.
- Mode offline dengan kata tersimpan: arti tersimpan tetap tampil.
- Naikkan versi `C` di `sw.js`; cek `node --check ui.js`.

## 6. Di luar cakupan
- Tidak ada penyejajaran kata otomatis lewat AI atau server (`api/` tidak diubah).
- Tidak ada format data baru; data pengguna lama aman.
