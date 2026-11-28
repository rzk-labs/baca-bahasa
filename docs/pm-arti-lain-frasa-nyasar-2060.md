# Arti lain frasa nyasar (#2060)

## Intinya
- Frasa "Reds are both groundbreaking and" muncul dengan chip "Arti lain" yang ngawur.
- Penyebab: chip itu terjemahan tiap kata terpisah, bukan arti lain frasa.
- Perbaikan: chip per kata dihapus untuk frasa; tampil pesan jujur + tombol "Per kata".

## 1. Apa yang terlihat (foto masukan)
- Pengguna menyorot 5 kata: "Reds are both groundbreaking and".
- Terjemahan utama: "Warna merah sekaligus inovatif dan". Wajar.
- Chip "Arti lain": "Gugatan hukum itu" dan "mereka berdua sangat lucu".
- Dua chip itu tak berhubungan dengan frasa. Pengguna bingung: "Kenapa kayak gini".

## 2. Akar masalah
- `perKata` di `ui.js` (~3060) menerjemahkan 4 kata pertama satu-satu.
- "Reds" dibaca sebagai gugatan hukum (Red v.), "both" jadi "mereka berdua sangat lucu".
- Hasilnya dipasang di bawah judul "Arti lain · ketuk untuk pakai".
- Ketuk chip = mengganti terjemahan frasa dengan potongan salah.
- Masalah kedua: sorotan berakhir di "and"; frasa terpotong di tengah kalimat.

## 3. Perbaikan (untuk developer)
- Frasa 2+ kata: jangan pasang hasil `perKata` sebagai chip "Arti lain".
- Pakai status `kosong`/`satu`: "Frasa ini cuma punya satu arti."
- Opsional: tautan kecil "Lihat arti per kata" memunculkan daftar berlabel "Per kata (bukan arti frasa)", tak bisa dipakai sebagai arti frasa.
- Kata tunggal: tidak berubah.
- Chip dari kamus/kata dasar (`altExtra`) tetap seperti biasa.
- Tak ada data tersimpan yang berubah.

## 4. Uji
- Sorot "Reds are both groundbreaking and": tak ada chip nyasar.
- Sorot kata tunggal "run": chip arti lain tetap muncul.
- Uji di 320px dan 390px, offline, dan bahasa tanpa spasi (ja/zh tak terpengaruh).
- Naikkan versi `C` di `sw.js`.

## 5. Di luar tugas ini (catatan)
- Sorotan frasa yang berhenti di kata sambung ("and") bisa diberi saran "Perluas sampai akhir klausa". Belum diminta.
