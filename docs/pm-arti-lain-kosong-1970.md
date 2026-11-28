# Kenapa "Arti lain" sering kosong (#1970)

## Intinya
- Kosong biasanya bukan galat: layanan gratis memang tak punya arti kedua untuk banyak kata.
- Kata bentuk jadian (makan → makanan, bentuk -ed/-ing), frasa, dan Jepang/Mandarin paling sering kosong.
- Perbaikan: cari lewat kata dasar, sumber cadangan, lalu pesan kosong yang jujur.

## 1. Penyebab (dari kode, belum diuji di perangkat)
- Arti lain hanya dari kamus Google gratis (`dt=bd`/`dt=at`, `altOf` di `app.js`).
- Kamus itu hanya terisi untuk kata tunggal. Frasa dan kalimat: kosong.
- Arti yang sudah dipakai dibuang (`altArti` di `ui.js`). Kata beranti satu = daftar kosong.
- Kata jadian (mis. "walked") sering tak punya entri. Kata dasarnya punya, tapi tak dicari.
- Terjemahan cadangan (MyMemory) tak menyimpan daftar arti. Hasilnya kosong terus.
- Jepang → Indonesia: kamus offline hanya memberi satu baris arti.
- Hasil kosong disimpan tetap. Ketuk kata sama lagi, tetap kosong.

## 2. Perbaikan untuk developer
- Urutan cari: arti kata → kata dasar (`r.base`) → pivot lewat Inggris → daftar `matches` MyMemory.
- Pivot: kata → Inggris (kamus), lalu tiap arti Inggris → Indonesia. Maks 4 arti Inggris.
- Cadangan MyMemory: ambil `matches` unik (maks 6) sebagai chip.
- Pesan kosong jujur: "Kata ini cuma punya satu arti" bila kamus memang menjawab 1 arti.
- Tombol "Terjemahkan ulang" hanya muncul bila gagal jaringan, bukan bila memang satu arti.
- Jangan cache kosong lebih dari 1 hari; simpan sumber terakhir yang dicoba.
- Tetap batas 8 detik dari #1902. Jangan ubah format data lama.

## 3. Cara uji
- "walked" (en): chip dari "walk" muncul.
- "bonjour" (fr): tetap satu arti → pesan jujur, tanpa tombol ulang.
- Frasa 3 kata: chip dari pivot atau MyMemory.
- Mode pesawat: "belum bisa dimuat" + Coba lagi.
- Uji 320px dan 390px, Jepang dan Mandarin.

## 4. Mockup
- `docs/mockup-1970.html` (Sebelum / Sesudah). Item backlog #197.
