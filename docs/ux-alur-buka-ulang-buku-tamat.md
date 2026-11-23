# Rancangan: alur buka ulang halaman terakhir buku Tamat (#1728)

## Intinya
- Satu layar, satu arti: "Tamat" hanya muncul setelah buku benar-benar Tamat.
- Buku Tamat dibuka ulang: tenang, tanpa tombol melayang, tanpa streak naik.
- Tiap angka dan tiap aksi punya satu pemilik. Tidak ada kembaran.

Mockup: `docs/mockup-1728.html` (gambaran rencana, belum dibangun).

## 1. Tabel keadaan layar
Sumber kode: `ui.js` `showPage` (±2353-2383), `endCard` (2412), `resumeChip` (2188), `finishBook` (1644), `award` (287).

| Keadaan | Bar bawah (target) | Tombol melayang | Sheet Tamat | XP / streak |
|---|---|---|---|---|
| Sedang baca | `Hal. 4/9 · 38%`, tombol `›` | Chip "Lanjut dari Bagian N" ±4 dtk, hanya saat buka ulang | Tidak ada | +2 XP per halaman baru, streak naik |
| Halaman terakhir, belum Tamat | `Hal. 9/9 · 100%` (bukan "Tamat"), tombol `Tamatkan` | Kartu "Buku berikutnya / Baca ulang" di bawah teks, bila muat | Muncul saat `Tamatkan` | `Tamatkan` = +10 XP sekali, streak naik |
| Sudah Tamat, dibuka ulang | `✓ Tamat`, tombol `Baca ulang` | Tidak ada | Tidak muncul sendiri | 0 XP, streak tak berubah |

Status tiap sel di kode (sudah dicek):

| Sel | Status |
|---|---|
| Tamat + `Baca ulang` di bar bawah (`doneAt` ada) | Sudah benar (2380) |
| Chip "Lanjut dari Bagian N" ditahan bila `doneAt` atau 100% | Sudah benar (2183) |
| Halaman terakhir belum Tamat: bar tulis `✓ Tamat` + tombol `Tamatkan` | **Bug** (lihat 2.1) |
| Ketuk kalimat di buku Tamat tetap menandai hari (0 XP) | **Bug** (lihat 2.2) |
| Kartu melayang `endCard` di buku Tamat | **Bug** (lihat 2.3) |
| Ikon `<` di header dan bar bawah | **Bug** (lihat 2.4) |
| Angka 12/12, 4 halaman, 12 bagian | **Bug** (lihat 2.5) |

## 2. Aturan satu pemilik per elemen

### 2.1 Label "Tamat" milik `doneAt`, bukan persen
- Akar masalah: `pctCalc` (155) memberi 100 di halaman terakhir meski belum Tamat. `pgn` (2365) lalu menulis `✓ Tamat`.
- Tombol memakai `doneAt`, label memakai persen. Keduanya bertabrakan.
- Aturan: `✓ Tamat` hanya bila `b.doneAt`. Sebelum itu tulis `Hal. N/N · 100%`.

### 2.2 Streak milik membaca, bukan membuka
- `award` untuk `page` sudah berhenti di buku Tamat (288). Benar.
- Celah: `look` (ketuk kalimat/kata) di buku Tamat lanjut ke `markDay()` (317) dengan 0 XP.
- Aturan: di buku Tamat, `award` berhenti sebelum `markDay` bila `n` = 0.
- Membuka halaman terakhir tidak pernah memanggil `markDay`. Pertahankan.
- "Rekor barumu!" (`streakInfo`, 1207) hanya boleh muncul setelah aksi yang benar-benar dihitung.

### 2.3 Satu aksi "lanjut" per layar
- Chip "Lanjut dari Bagian N": hanya buku belum Tamat, ±4 dtk, tidak menutup teks.
- Kartu `endCard`: hanya halaman terakhir buku belum Tamat. Buku Tamat sudah punya `Baca ulang` di bar bawah.
- Celah chip: `pctOf` bisa 99 di halaman terakhir bila `frac` basi, sehingga chip lolos. Developer: reproduksi dulu.
- Sheet Tamat bawa "Buku berikutnya". Kartu dan chip tidak boleh ikut tampil bersamaan.

### 2.4 Satu `<` per arti
- Header (`rBack`/`rHome`, 1872-1873): `<` = kembali ke Home.
- Bar bawah (`pv`, 1881): halaman sebelumnya. Ikon sama (`ico('left')`), arti beda.
- Aturan: ikon bar bawah dibedakan (chevron `‹` kecil), header tetap panah penuh dengan label "Home" untuk pembaca layar dan tooltip.
- `rBack` melayang tersembunyi saat bilah atas muncul (style.css 1295). Pertahankan, jangan sampai dua `<` header terlihat bersamaan.

### 2.5 Satu satuan per tempat
- Bar bawah: `Hal. N/n` + persen. Hanya itu.
- Header: `Bagian k dari m` (daftar isi). Hanya itu.
- Sheet Tamat: `m bagian` dan jumlah kata. Tanpa "halaman".
- Catatan sesi: hitung "halaman dibaca" dengan nama jelas, mis. "4 halaman kamu baca hari ini".
- Buku Tamat: bar bawah tidak menulis `12/12`. Angka halaman hanya di `aria-label`.

## 3. Kata-kata persis

| Tempat | Teks |
|---|---|
| Bar bawah, belum Tamat, halaman terakhir | `Hal. 9/9 · 100%` |
| Tombol, belum Tamat | `Tamatkan` |
| Bar bawah, sudah Tamat | `✓ Tamat` |
| Tombol, sudah Tamat | `Baca ulang` |
| Toast Baca ulang | `Mulai dari awal. Tanpa XP halaman.` (tetap) |
| Toast ketuk `Tamat` lagi | `Ini halaman terakhir.` (tetap) |
| aria-label bar Tamat | `Tamat. Halaman 9 dari 9` |
| aria-label `<` header | `Kembali ke Home` (tetap) |
| aria-label `<` bar bawah | `Halaman sebelumnya` (tetap) |
| Info streak di Home saat tak ada bacaan baru | `Baca hari ini biar lanjut` (tetap) |

## 4. Kriteria uji
Uji di 320px dan 390px, tema Kertas, Sepia, Malam, Gelap.

- Halaman terakhir belum Tamat: tak ada tulisan "Tamat" di bar, hanya `Tamatkan`.
- Buka ulang buku Tamat di halaman terakhir: tak ada chip, tak ada kartu, tak ada toast XP.
- Cek streak di Home sebelum dan sesudah buka ulang: tak berubah.
- Ketuk kata di buku Tamat: streak tak berubah, tak ada "Rekor barumu!".
- Label `✓ Tamat` utuh (tak kepotong), garis kuning tak mepet, di 320px dan huruf besar.
- Hanya satu `<` header terlihat. `<` bar bawah beda bentuk.
- Pembaca layar membaca "Halaman N dari N" dan "Tamat" tanpa kontradiksi.
- Buku belum Tamat: perilaku sama seperti sekarang.

## 5. Untuk developer
- Pecah jadi tugas [peta N]: (a) label `doneAt`, (b) streak `look`, (c) kartu & chip, (d) ikon `<`, (e) satuan angka.
- Naikkan versi `C` di `sw.js`. Cek `node --check ui.js`.
- Data lama (`doneAt`, `pct`) tidak berubah format. Tak perlu migrasi.
