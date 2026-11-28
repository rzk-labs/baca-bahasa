# Arti frasa banyak salah (#2064)

## Intinya
- Foto #2064 menunjukkan sheet arti frasa penuh arti ngawur.
- Penyebab: mesin menerjemah frasa tanpa konteks, lalu "Arti lain" ikut menampilkan sampah.
- Usul: sembunyikan arti lain yang ngawur, beri petunjuk, dan terjemah frasa dengan konteks.

## 1. Yang terlihat di foto
- Frasa dipilih: "Reds are both groundbreaking and".
- Arti utama: "Warna merah sekaligus inovatif dan". Salah: "Reds" di sini orang/tim, bukan warna.
- Arti lain: "Gugatan hukum itu", "mereka berdua sangat lucu". Tak ada hubungannya.
- Frasa berakhir di kata sambung "and": potongannya janggal.
- Tugas hanya bertuliskan "Banyak error". Ini tafsiran dari foto; bila maksud lain, mohon tambah keterangan.

## 2. Penyebab (dugaan dari kode)
- `altOf` (app.js ~730) mengambil semua balasan alternatif gtx, termasuk potongan kalimat lain.
- Untuk frasa 3+ kata, alternatif itu bukan arti frasa, tapi tetap tampil sebagai chip.
- Frasa diterjemah sendirian, tanpa kalimat sekitar. Kata ambigu ("Reds") salah arti.
- Tidak ada petunjuk bila frasa diawali/diakhiri kata sambung.

## 3. Usulan perbaikan
- A. Frasa 3+ kata: jangan tampilkan chip dari `dt=at`, kecuali berbagi kata dengan arti utama.
- B. Frasa 3+ kata: terjemah kalimat penuh, ambil bagian frasa. Bila gagal, pakai terjemahan polos.
- C. Frasa diawali/diakhiri kata sambung (and, or, but, the, of, to): petunjuk "Frasa terpotong? Coba hapus 'and'".
- D. Tak ada arti lain layak: tulis "Belum ada arti lain untuk frasa ini", bukan chip ngawur.
- E. Tombol "Arti ini salah?" tetap ada; arti pilihan pengguna tak boleh tertimpa.

## 4. Syarat uji
- Ulang foto: pilih "Reds are both groundbreaking and"; chip "Gugatan hukum itu" tak muncul.
- Kata tunggal: "Arti lain" tetap jalan seperti sekarang.
- Uji 320px dan 390px; data kartu lama tidak berubah.
- Naikkan versi `C` di sw.js.

## 5. Mockup
Lihat docs/mockup-2064.html (Sebelum / Sesudah).
