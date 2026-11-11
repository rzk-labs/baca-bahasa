# Riset: jadwal ulang kata (spaced repetition) untuk kartu Hafal

Tugas #32. Tanda: ✅ = pengetahuan umum yang mapan; ⚠️ = belum diverifikasi (sumber belum dibuka ulang saat riset ini).

## Intinya
- Sekarang kartu "Hafal" sekali geser = selesai selamanya. Itu penyebab kata cepat lupa.
- Usul: 4 jeda tetap (1, 3, 7, 21 hari). Salah = ulang dari awal. Tanpa akun.
- Kata tersimpan di localStorage (bukan IndexedDB). Tambah 2 kolom opsional; tanpa migrasi berat.

## 1. Cara kerja di aplikasi lain
- **Anki (SM-2):** tiap kartu punya jeda dan "ease" (awal ~2,5). Benar → jeda dikali ease. Salah → jeda reset. ✅
  Sumber: https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html, https://super-memory.com/english/ol/sm2.htm
- **LingQ:** kata berstatus 1–4 lalu "dikenal"; status dinaikkan/diturunkan pengguna, bukan jadwal ketat. ⚠️
  Sumber: https://www.lingq.com
- **Readlang:** kata yang diketuk masuk daftar; latihan flashcard dengan jadwal ulang sederhana. Detail algoritma ⚠️ belum jelas.
  Sumber: https://readlang.com
- **Duolingo:** model statistik "half-life regression" memprediksi kapan lupa. Rumit, butuh banyak data. ✅
  Sumber: Settles & Meeder 2016, https://github.com/duolingo/halflife-regression
- Pelajaran: yang penting kata **muncul lagi** sebelum lupa, bukan rumus canggih.

## 2. Usulan versi sangat sederhana (tanpa akun)
- **Tangga jeda:** tingkat 0 → 1 hari, 1 → 3 hari, 2 → 7 hari, 3 → 21 hari.
- **Benar (geser "Hafal"):** naik 1 tingkat; jadwal = hari ini + jeda tingkat baru.
- **Salah:** turun ke tingkat 0; muncul lagi hari ini/besok.
- **Dianggap hafal:** benar sekali lagi setelah jeda 21 hari → `known = true` (±4 kali benar, ±1 bulan).
- **Kartu tampil:** hanya yang jadwalnya ≤ hari ini. Kalau kosong: "Semua beres, balik besok ya 🎉".
- **Batas harian:** maks 20 kartu per sesi agar tidak menumpuk (angka 20 = tebakan ⚠️).
- Angka 1/3/7/21 mirip kebiasaan Anki dan kurva lupa Ebbinghaus. ⚠️ Belum diuji pada Keepo.

## 3. Data tambahan per kata
- Fakta kode: kata ada di `db.vocab` (localStorage `bacabahasa.v1`). IndexedDB hanya untuk teks buku.
- Kolom baru opsional: `due` (ms, kapan muncul lagi) dan `lvl` (0–3).
- **Migrasi ringan:** kata lama tanpa kolom → `lvl = 0`, `due = 0` (langsung jatuh tempo). Tak perlu ubah struktur.
- Kata lama `known: true`: biarkan hafal, atau beri `lvl = 3` + `due` 21 hari lagi. Keputusan PM/founder.
- ⚠️ `cloud.js` menyinkron data; belum dicek apakah kolom baru aman di sinkron.
- Kartu salah sekarang dipindah ke ujung antrean (`splice`/`push`); dengan jadwal cukup ubah `due`.

## 4. Format ekspor
- Tombol "Ekspor" di tab Kata → unduh `kata-keepo.csv` (UTF-8 + BOM agar terbuka benar di Excel).
- **Kolom CSV:** `kata, arti, jenis, bahasa, kalimat, buku, tanggal_simpan, tingkat, jadwal_ulang`.
- **Anki:** impor teks/CSV. Depan = `kata`; Belakang = `arti` + `<br>` + `kalimat`; tag `keepo` + nama buku; aktifkan "Izinkan HTML". ✅
  Sumber: https://docs.ankiweb.net/importing/text-files.html
- Kata tanpa arti (`noTr`): tetap diekspor, kolom arti kosong.

## 5. Tiga hipotesis & metrik
- **H1:** Jadwal ulang menaikkan ingatan. Metrik: % benar di kartu ke-2 setelah ≥7 hari. Target ≥70% (tebakan).
- **H2:** Kartu jatuh tempo bikin pengguna kembali. Metrik: buka app hari berikutnya, sebelum vs sesudah fitur.
- **H3:** Ekspor mengurangi ngetik ulang. Metrik: % pengguna ≥10 kata yang menekan Ekspor.
- ⚠️ Keepo belum punya analitik. Hitung lokal dulu (jumlah ulang, benar/salah) dan tanya saat wawancara.

## 6. Draf spesifikasi untuk developer
Judul: **Jadwal ulang kartu Hafal + ekspor CSV**. Prioritas P1 (progres & kosakata).
- Tambah `lvl` dan `due` ke kata (alur kartu di `ui.js` ~612–626). Kata lama: `lvl=0`, `due=0`.
- Kartu hanya `!known && due <= sekarang`, urut `due` terlama, maks 20 per sesi, status kosong ramah.
- Benar: `lvl+1`, `due = sekarang + [1,3,7,21] hari`; lolos dari 21 hari → `known=true`. Salah: `lvl=0`, `due=sekarang`.
- Tab Kata menampilkan "X kartu jatuh tempo hari ini".
- Tombol "Ekspor CSV" (kolom bagian 4). Tanpa dependensi baru.
- Jangan ubah `api/`. Naikkan versi `C` di `sw.js`. Cek `node --check`; uji HP & layar lebar.
- **Selesai bila:** kata lama tetap tampil; kartu hafal muncul lagi setelah 1 hari; CSV terbuka benar di Excel & Anki.

## Langkah berikutnya
- PM: buat tugas developer dari bagian 6 setelah angka jeda disetujui.
- Wawancara: tanyakan apakah 1/3/7/21 hari terasa pas.
- Riset lanjutan: verifikasi LingQ & Readlang langsung dari aplikasinya.
