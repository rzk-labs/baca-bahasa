# Riset #56: Pemotongan kata Jepang & Korea di e-reader

Status: draft. Riset dibuat tanpa akses internet; angka dari ingatan, **perlu dicek ulang** (ditandai ⚠️).
Tidak membahas arti/bentuk dasar kata (itu riset kamus #49).

## Intinya
- `Intl.Segmenter` ada di browser HP modern, jadi belum perlu library baru.
- Salah potong paling sering: Jepang (kanji majemuk, konjugasi) dan Korea (partikel menempel).
- Langkah termurah: tes 10 kalimat di HP, andalkan tombol "Perluas" yang sudah ada.

## 1. Dukungan Intl.Segmenter (granularity `word`)
Sumber: MDN "Intl.Segmenter" dan caniuse "Intl.Segmenter" (⚠️ belum dibuka ulang).

| Browser | Versi minimum | Catatan |
|---|---|---|
| Safari iPhone (iOS) | 14.1 ⚠️ | Pakai mesin teks Apple |
| Chrome Android | 87 ⚠️ | Pakai ICU (kamus Jepang bawaan) |
| Firefox | 125 ⚠️ | Paling baru mendukung (sekitar April 2024) |

- Dukungan `ja` dan `ko` mengikuti data bahasa browser/OS. ⚠️ Belum diverifikasi per perangkat.
- `app.js` fungsi `seg` sudah punya cadangan regex. Regex ini **tidak** bisa memotong Jepang (satu kalimat jadi satu "kata").
- iPhone lama (iOS < 14.1): ketuk kata Jepang kemungkinan mengambil satu kalimat penuh. ⚠️

## 2. Salah potong yang umum
"Mungkin keluar" = **perkiraan** dari cara kerja pemotong berbasis kamus. ⚠️ Belum dites di HP.

| # | Kalimat | Diharapkan | Mungkin keluar |
|---|---|---|---|
| 1 | 東京大学に行きます | 東京大学 / に / 行き / ます | 東京 / 大学 / に / 行き / ます (majemuk pecah) |
| 2 | 国際連合の本部 | 国際連合 / の / 本部 | 国際 / 連合 / の / 本部 |
| 3 | 昨日、食べませんでした | 昨日 / 食べ / ませんでした | 食べ / ませ / ん / でし / た (konjugasi pecah halus) |
| 4 | 本を読んでいる | 本 / を / 読んでいる | 読ん / で / いる |
| 5 | 美しかった | 美しかった | 美しかっ / た |
| 6 | 新幹線で行く | 新幹線 / で / 行く | 新 / 幹線 / で / 行く |
| 7 | 학교에는 갔어요 | 학교 + 에는 / 갔어요 | 학교에는 / 갔어요 (partikel menempel) |
| 8 | 친구를 만났다 | 친구 + 를 / 만났다 | 친구를 / 만났다 |
| 9 | 한국어는 재미있어요 | 한국어 + 는 / 재미있어요 | 한국어는 / 재미있어요 |
| 10 | 先生は学生に本をあげた | 先生 / は / 学生 / に / 本 / を / あげた | Kemungkinan besar benar; kontrol pembanding ⚠️ |

Pola ringkas:
- **Jepang:** majemuk kanji bisa pecah; akhiran konjugasi (ます, ている, た) terpisah dari kata kerja.
- **Korea:** spasi memisahkan "eojeol", bukan kata. Partikel (은/는/을/를/에는) hampir pasti menempel. Ini perilaku wajar, bukan bug.
- **Akibat:** pencarian arti gagal untuk "학교에는", atau muncul potongan kecil tanpa arti.

## 3. Alternatif tanpa build, gratis

| Opsi | Ukuran | Lisensi | Kelebihan | Kekurangan |
|---|---|---|---|---|
| A. Ketuk lalu **Perluas** (sudah ada, maks 5 kata tetangga) | 0 KB | — | Sudah jadi; cocok untuk Jepang & Korea | Pengguna harus tahu tombolnya |
| B. TinySegmenter (Jepang saja) | ~25 KB ⚠️ | BSD ⚠️ | Satu file JS, offline, tanpa kamus | Jepang saja; kurang akurat dari ICU; harus masuk cache `sw.js` |
| C. Lepas partikel Korea dengan aturan (은/는/이/가/을/를/에/에서/의/도/와/과…) | <1 KB | milik sendiri | Murah; atasi masalah Korea utama | Bisa salah (mis. 나는: "saya" vs "terbang"); jadikan saran, bukan paksaan |
| D. Kuromoji.js / MeCab versi web | ~10 MB+ ⚠️ | Apache-2.0 ⚠️ | Paling akurat | Terlalu berat untuk PWA ringan |
| E. Kamus kecil untuk menggabung majemuk Jepang | puluhan KB | tergantung sumber (mis. JMdict, CC BY-SA ⚠️) | Perbaiki kasus #1, #2, #6 | Kerja banyak; lisensi perlu dicek |

Catatan:
- Jangan ganti `Intl.Segmenter`; sudah gratis dan ada di dalam HP.
- Opsi B/C baru layak kalau tes HP menunjukkan salah potong sering.

## 4. Rekomendasi langkah termurah
1. **Tes dulu, belum koding:** jalankan 10 kalimat di atas di HP nyata, catat ✅/❌.
2. **Jika salah potong sering:** buat tombol "Perluas" lebih terlihat (petunjuk sekali muncul). Hanya UI, tanpa library.
3. **Jika Korea sering gagal cari arti:** tambah opsi C sebagai saran ("Maksudmu 학교?"), tidak otomatis.

### Cara tes manual di HP
- Buat file .txt berisi 10 kalimat tabel (satu per baris), unggah di Keepo, bahasa cerita Jepang atau Korea.
- Ketuk tiap kata; catat potongan di kartu arti.
- Bandingkan dengan kolom "Diharapkan".
- Ulangi di iPhone Safari, Chrome Android, Firefox Android.
- Bila ada iPhone lama (iOS < 14.1): pastikan app tidak macet.

## Langkah berikutnya
- Tester/founder: jalankan tes HP, isi hasilnya.
- PM: buat tugas developer kecil hanya jika ≥3 dari 10 kalimat salah potong.
- Verifikasi ⚠️: versi browser (caniuse), ukuran & lisensi TinySegmenter.
