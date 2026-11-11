# Riset: ekspor Anki — kolom CSV yang dipakai pelajar

Tugas #168. Tanda: ✅ = fakta dari dokumentasi publik (alamat dicantumkan); ⚠️ = asumsi/ingatan, belum dibuka ulang; 🔎 = fakta dari kode Keepo.
Catatan jujur: riset ini tanpa akses web langsung. Semua ✅ berasal dari dokumentasi resmi yang umum diketahui; cek ulang alamatnya sebelum dijadikan janji.

## Intinya
- CSV Keepo sekarang sudah punya bentuk dasar dan tak punya kolom "konteks" kembar. Masukan Nadia sudah terjawab sebagian.
- Sisa celah: tak ada kolom sumber buku/tag, dan petunjuk impor Anki.
- Usul: tambah `buku` + `tag`, rapikan urutan, beri panduan impor 3 langkah.

## 1. Format impor Anki (CSV/TSV)
- ✅ Anki impor file teks: pemisah koma/tab/titik koma, terdeteksi otomatis. Kolom dipetakan ke kolom kartu (Depan, Belakang, dst).
- ✅ Baris `#separator:`, `#html:true`, `#tags column:N` di awal file bisa mengatur impor. Tanpa itu, atur manual di layar impor.
- ✅ Duplikat: Anki memeriksa kolom pertama. Kata sama = diperbarui/dilewati sesuai pilihan. Jadi kolom pertama harus `kata`.
- ✅ HTML hanya dibaca bila "Izinkan HTML" aktif. `<br>` untuk baris baru.
- Sumber: https://docs.ankiweb.net/importing/text-files.html
- ⚠️ Baris header bisa ikut jadi kartu bila tidak dilewati.

## 2. Kolom yang dipakai pelajar bahasa
- ⚠️ Inti kartu hafalan: kata, arti, kalimat contoh. Paling umum di panduan komunitas (forum Anki, r/LearnJapanese).
- ⚠️ Tambahan sering dipakai: bentuk dasar, cara baca (furigana/romaji/pinyin), jenis kata, tag sumber.
- ⚠️ Kolom statistik (jumlah ketukan, tanggal) jarang tampil di kartu; berguna untuk menyortir.

## 3. Ekspor di aplikasi lain
- ⚠️ **Readlang:** ekspor CSV/Anki; isi pokok kata, arti, kalimat konteks. Detail kolom belum diverifikasi. https://readlang.com
- ⚠️ **LingQ:** ekspor kosakata; kata, arti, frasa konteks, status. Belum diverifikasi. https://www.lingq.com
- ⚠️ **Language Reactor:** ekspor daftar kata (CSV/Anki); kata, terjemahan, kalimat. Belum diverifikasi. https://www.languagereactor.com
- Pola bersama (⚠️): kata + arti + kalimat konteks selalu ada. Keepo sudah sejajar.

## 4. Kolom Keepo sekarang vs rekomendasi
🔎 `vocabCSV` (app.js): `kata, arti, cara baca, bentuk dasar, kalimat contoh, bahasa, diketuk`. Sel berawalan `= + - @` sudah dinetralkan; kata tanpa arti dilewati.

| Kolom sekarang | Rekomendasi | Alasan |
|---|---|---|
| kata | Tetap, urutan 1 | Kunci duplikat Anki ✅ |
| arti | Tetap, urutan 2 | Sisi belakang |
| cara baca | Tetap | Penting untuk JP/KR/ZH ⚠️ |
| bentuk dasar | Pindah ke urutan 3 | Nadia: kartu arti menampilkannya |
| kalimat contoh | Tetap | Konteks paling berguna ⚠️ |
| bahasa | Ganti jadi tag | Anki bisa memfilter tag |
| diketuk | Buang dari default | Tak dipakai di kartu ⚠️ |
| (belum ada) `buku` | Tambah | Sumber kata; jadi tag juga |
| (belum ada) `tag` | Tambah | Contoh: `keepo bahasa_jepang buku_ramen` |

- Kolom "konteks" kembar yang disebut Nadia sudah tak ada di kode. Mungkin dari unduhan lama; minta unduh ulang.

## 5. Contoh 3 baris CSV ideal
Baris `#` di atas didukung Anki versi baru ⚠️ (belum diuji bersama BOM Keepo).

```
#separator:comma
#html:true
#tags column:6
kata,arti,bentuk dasar,cara baca,kalimat contoh,tag
食べた,"makan (lampau)",食べる,たべた,"昨日ラーメンを食べた。",keepo bahasa_jepang buku_ramen
bibliothèque,perpustakaan,,,"Elle travaille à la bibliothèque.",keepo bahasa_prancis buku_petit
running,"berlari / sedang berlari",run,,"She was running late.",keepo bahasa_inggris buku_novel
```

- Spasi di tag memisahkan tag ✅; satu tag tak boleh berisi spasi.
- Sel kosong boleh.

## 6. Impor ke Anki — 3 langkah
**Laptop (Anki desktop):**
1. File → Import → pilih `kata-keepo.csv`.
2. Jenis catatan "Basic": kolom 1 → Depan, kolom 2–5 → Belakang. Centang izinkan HTML.
3. Pilih perbarui catatan yang ada, lalu Import.

**HP:**
1. Unduh/bagikan CSV ke Files (iPhone) atau Downloads (Android).
2. Buka dengan AnkiMobile / AnkiDroid → pilih impor. ⚠️ belum diuji.
3. Paling aman: impor di laptop, sinkron AnkiWeb, belajar di HP.

## 7. Tiga perubahan kecil untuk developer
1. Tambah kolom `buku` dan `tag` (bahasa + judul buku, tanpa spasi) di `vocabCSV`.
2. Urutan: kata, arti, bentuk dasar, cara baca, kalimat contoh, tag. `diketuk` pindah ke akhir atau dibuang.
3. Tambah teks bantuan impor 3 langkah dekat tombol Ekspor. Baris `#separator` hanya bila lolos uji Anki.

Pengingat: naikkan versi `C` di `sw.js`, cek `node --check`, uji di iPhone.

## 8. Langkah berikutnya
- Minta 1 pengguna Anki (mis. Nadia) mengimpor CSV sekarang, catat masalahnya.
- Verifikasi tanda ⚠️ lewat dokumentasi Readlang/LingQ/Language Reactor.
- PM putuskan urutan kolom baru dan nasib `diketuk`.
