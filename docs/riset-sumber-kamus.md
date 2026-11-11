# Riset sumber kamus gratis (tugas #49)

## Intinya
- Pakai kamus offline JMdict (Jepang) + KRDict/Wiktionary (Korea) sebagai inti; gtx tetap cadangan.
- API online gratis rapuh atau tanpa CORS; data offline lebih aman dan cepat.
- Tahap berikutnya: kamus Jepang kecil lebih dulu (cara baca + bentuk dasar), lalu Korea.

Tanda: ✅ terverifikasi di dokumentasi resmi (dibuka 2026-11-11). ⚠️ dari pengetahuan umum, belum dibuka ulang.

## 1. Masalah sekarang
- Arti kata hanya dari Google gtx; tidak resmi, bisa diblokir.
- Tidak ada bentuk dasar atau romaji/romanisasi (keluhan Raka).
- Cadangan MyMemory terbatas kuota dan sering salah.

## 2. Opsi

### A. Wiktionary / Wikimedia API
- Bahasa: ratusan, termasuk Jepang, Korea, Inggris. ⚠️
- Bentuk dasar: ada lewat halaman "form of"; perlu diolah. ⚠️
- Cara baca: romaji/romanisasi ada di entri, formatnya tidak seragam. ⚠️
- Contoh kalimat: sebagian entri. ⚠️
- Lisensi: CC BY-SA 4.0 (wajib atribusi). ⚠️
- Kuota: ada batas wajar, wajib User-Agent yang jelas. ⚠️
- CORS: bisa dari browser dengan parameter `origin=*`. ⚠️
- Offline: tidak langsung; pakai opsi F.
- Ukuran: tak berlaku online. Hasil mentah berantakan untuk dipakai langsung.

### B. Jisho (Jepang)
- Bahasa: Jepang→Inggris saja. ✅ (forum resmi)
- Bentuk dasar: hasil pencarian beri bentuk kamus, tapi API tidak stabil.
- Cara baca: kana + romaji ada.
- Lisensi: data dari JMdict (CC BY-SA); API tanpa jaminan. ✅
- Kuota: tanpa batas resmi; admin pernah memblokir klien yang scraping. ✅
- CORS: **tidak didukung**. ✅ Perlu proxy.
- Offline: tidak. Kesimpulan: jangan dipakai langsung dari app.

### C. KRDict / Naver (Korea)
- Bahasa: Korea→Korea/Inggris (KRDict dari NIKL). ⚠️
- Bentuk dasar: tidak otomatis; perlu analisis kata sendiri. ⚠️
- Cara baca: romanisasi tidak disediakan (bisa dibuat rumus Revised Romanization).
- Lisensi: KRDict API butuh kunci dan syarat NIKL; Naver komersial/berbayar. ⚠️
- CORS: biasanya tidak; kunci tidak boleh ditaruh di browser. ⚠️
- Offline: unduh data KRDict ada, lisensi perlu dicek. ⚠️
- Kesimpulan: tidak cocok untuk app tanpa server.

### D. Free Dictionary API (Inggris)
- Bahasa: Inggris saja. ⚠️
- Bentuk dasar: tidak jelas untuk kata berimbuhan. ⚠️
- Cara baca: IPA dan audio. ⚠️
- Contoh kalimat: ada di sebagian entri. ⚠️
- Lisensi: data dari Wiktionary (CC BY-SA). ⚠️
- Kuota: tidak resmi, layanan komunitas. ⚠️
- CORS: ya. ⚠️
- Kesimpulan: berguna untuk Inggris, tapi bahasa inti app Korea/Jepang.

### E. Tatoeba (contoh kalimat)
- Bahasa: banyak, termasuk Jepang, Korea, Indonesia; ada terjemahan berpasangan. ⚠️
- Bentuk dasar & cara baca: tidak (hanya kalimat). ⚠️
- Lisensi: CC BY 2.0 FR (sebagian CC0). ⚠️
- Kuota: API resmi tidak stabil; unduhan mingguan tersedia. ⚠️
- CORS: tidak terjamin. ⚠️
- Offline: ya, unduhan per bahasa (puluhan MB per pasangan). ⚠️
- Kesimpulan: pelengkap contoh kalimat, bukan kamus.

### F. Kamus offline: JMdict, CEDICT, kaikki.org
- **JMdict** (Jepang→Inggris, ada terjemahan Belanda/Jerman/dll.): kana, kanji, kelas kata; romaji dibuat dari kana. Lisensi CC BY-SA 4.0 (EDRDG). ⚠️ Bentuk dasar: tidak otomatis; perlu pengurai konjugasi (mis. kode kecil seperti pencocokan akhiran).
- **CEDICT** (Mandarin): pinyin ada, CC BY-SA. ⚠️ Belum prioritas (app Korea/Jepang/Inggris).
- **kaikki.org** (Wiktionary terstruktur, JSONL): ✅ lisensi mengikuti Wiktionary (CC BY-SA), minta kutip Wiktextract. Ada lemma, cara baca, contoh, banyak bahasa. Bahasa Inggris penuh 2,9 GB terkompres ✅ — terlalu besar; harus dipangkas per bahasa.
- Lisensi: semua perlu atribusi di layar "Tentang".
- CORS: tidak relevan; file ikut dihosting di GitHub Pages.
- Offline: ya, simpan di IndexedDB lewat cache service worker.
- Ukuran: JMdict versi ringkas ± 10–20 MB mentah, ± 3–6 MB gzip. ⚠️ Perlu diukur.
- Risiko: GitHub Pages punya batas 1 GB situs; unduhan awal perlu opsional ("Unduh kamus").

## 3. Perbandingan

| Opsi | Bahasa | Bentuk dasar | Cara baca | Contoh | Lisensi | CORS | Offline |
|---|---|---|---|---|---|---|---|
| Wiktionary API | Banyak | Sebagian | Ya (tak seragam) | Sebagian | CC BY-SA | Ya | Tidak |
| Jisho | Jepang | Sebagian | Ya | Ya | Tanpa jaminan | **Tidak** ✅ | Tidak |
| KRDict/Naver | Korea | Tidak | Tidak | Ya | Kunci + syarat | Tidak | Terbatas |
| Free Dictionary | Inggris | Lemah | IPA | Sebagian | CC BY-SA | Ya | Tidak |
| Tatoeba | Banyak | Tidak | Tidak | **Ya** | CC BY | Tidak pasti | Ya |
| JMdict (offline) | Jepang | Perlu pengurai | Kana→romaji | Sedikit | CC BY-SA | n/a | **Ya** |
| kaikki.org (dipangkas) | Banyak | **Ya** | Ya | Ya | CC BY-SA | n/a | Ya (besar) |

## 4. Rekomendasi
1. **JMdict ringkas (offline) untuk Jepang**: arti, kana, romaji, bentuk dasar sederhana.
   - Mulai dari sini: data kecil, hasil langsung terasa; menjawab keluhan Raka.
   - Risiko: ukuran unduhan dan pengurai konjugasi; cakup dulu kata kerja umum.
2. **kaikki.org dipangkas untuk Korea** (Wiktionary edisi Inggris, hanya entri Korea).
   - Beri lemma dan romanisasi; tambah romanisasi rumus sebagai cadangan.
   - Risiko: kualitas entri tidak merata; ukuran perlu diukur dulu.

Urutan: (1) ukur ukuran data → (2) Jepang → (3) Korea → (4) Tatoeba untuk contoh kalimat. gtx tetap jadi cadangan terakhir.

## 5. Langkah berikutnya
- Developer: prototipe kamus Jepang di IndexedDB, unduhan opsional.
- Riset: ukur ukuran asli JMdict dan entri Korea kaikki; buka dokumen resmi yang masih ⚠️.
- Desain: tulis atribusi lisensi di layar "Tentang".
