# Vonis 4 milestone Keepo (Tugas #347)

Disusun 12 Nov 2026. Kode tidak diubah. Bukti baru dari 4 WebSearch hari ini (ringkasan pencarian, bukan halaman penuh).

## Intinya
- Reader: **selesai**. Problem & Solution: **sebagian**. Beta: **belum** (baru simulasi).
- Celah terbesar: nol manusia nyata, suara Indonesia tipis, tanpa data retensi baca.
- Beta nyata tetap perlu; 5 orang dulu, baru 30-50.

## 1. Aturan yang dipakai
- Dari `aturan_validasi`: 30+ bukti, 3+ sumber, vonis tiap hipotesis, kesimpulan.
- Tangga status milestone: belum → awal → draft → selesai.
- Tahap selesai (bukti internet) belum berarti milestone selesai: isi milestone lebih berat.
- Vonis: **selesai** = isi milestone terpenuhi. **sebagian** = ada bukti, ada celah besar. **belum** = hanya simulasi.

## 2. Milestone 1: Validate the Problem
Isi: wawancara ~15 calon pengguna soal masalah & kebiasaan baca.

**Kriteria lulus (versi bukti publik + AI)**
- 30+ keluhan nyata dari 3+ sumber, termasuk suara Indonesia.
- Minimal 3 masalah terbukti; yang kosong diberi vonis jujur.
- Tester/pengguna AI menemukan masalah yang sama.

**Bukti yang ada**
- `riset-customer-discovery.md`: 34 kutipan, 5 situs; 1 terbukti (iklan/popup), 7 belum jelas.
- `riset-peluang-masalah.md`: kamus tiap kata memutus alur & buku terlalu sulit, terbukti.
- Masukan Raka: butuh cara baca JP/KR di teks dan arti offline di KRL.

**Celah bukti**
- Reddit & ulasan toko aplikasi tak terbaca; suara Indonesia hanya artikel.
- 7 hipotesis kosong (XP, offline, cara baca, tema gelap, dll).
- Pengguna AI bukan orang sungguhan; hanya tiruan perilaku.

**Bukti tambahan hari ini (#347)**
| # | Kutipan | Sumber |
|---|---|---|
| T1 | "LingQ WAS a good app, and it could have become a great app but they chose to continue poorly implementing 'updates'" | [Trustpilot LingQ](https://it.trustpilot.com/review/lingq.com) |
| T2 | "my brother and I finally got fed up with the clunky interface and outdated user experience" (r/languagelearning) | [Reddit via mirror](https://lr.psf.lt/r/languagelearning/comments/1jmltj2/exlingq_users_built_a_better_app) |
| T3 | "With so many things crammed on the screen, it was hard to learn for extended periods of time." | [FluentU](https://www.fluentu.com/blog/reviews/lingq/) |
| T4 | Readlang "lets me read texts as they were written and does not chop them into 'lessons'" (pengguna yang pindah dari LingQ) | [Forum Readlang](https://forum.readlang.com/t/anyone-here-use-used-lingq-or-any-other-alternatives/123) |
| T5 | "Horrible, slow, so buggy" (Beelinguapp, 3 ulasan, rata-rata 2,8) | [Trustpilot Beelinguapp](https://ca.trustpilot.com/review/beelinguapp.com) |
| T6 | Indonesia peringkat 2 pelajar Jepang: 709.479 (Japan Foundation 2018, dikutip makalah) | [Jurnal Unesa](https://ejournal.unesa.ac.id/index.php/hikari/article/download/51149/41869/100923) |
| T7 | Korea bahasa asing kedua terbanyak dipelajari orang Indonesia; rata-rata 19,5 menit/hari di Duolingo | [Tirto](https://tirto.id/berapa-lama-waktu-orang-indonesia-belajar-bahasa-asing-gp1r) |

Vonis hipotesis baru:
- Layar ramai bikin lari: **terbukti** (T2, T3, T5 + K-H2 lama).
- Baca teks utuh lebih disukai daripada "pelajaran": **sebagian** (T4 saja, satu suara).
- Pasar JP/KR Indonesia nyata: **terbukti** (T6, T7); keluhan baca mereka masih **belum jelas**.

**Vonis: SEBAGIAN.** Masalah umum terbukti; masalah khas Indonesia belum.

## 3. Milestone 2: Validate the Solution
Isi: uji alur baca + ketuk-kata, 8-10 peserta, bandingkan cara lama.

**Kriteria lulus**
- Alur buka cerita → ketuk kata → simpan → tab Kata diuji dengan 5+ penguji.
- Titik bingung dikelompokkan; yang dialami 2+ orang masuk perbaikan.
- Dibandingkan dengan kompetitor (kutipan pengguna mereka).

**Bukti yang ada**
- `desain-laporan-usability.md`: 4 penguji AI + 46 kutipan, 7 vonis, 5 usulan UX.
- `pm-ux-validasi.md`: ketuk-kata 1 langkah & tab bawah 4 menu terbukti.
- `pm-mvp-audit.md`: 7 ada, 4 sebagian, 3 belum; 4 dari 5 hipotesis terbukti.
- `riset-uji-pakai-5-orang.md`: skrip siap, belum dijalankan.

**Celah bukti**
- Nol peserta manusia; penguji AI membaca kode, bukan merasakan di HP.
- Tidak ada waktu-per-tugas nyata, tidak ada perbandingan berdampingan.
- Masukan terbaru (kartu Hafal meluber, tamat memotong bacaan, gagal tanpa pesan) menunjukkan cacat nyata.

**Bukti tambahan hari ini**
- Meta-analisis 21 studi (N=1.268): membaca ekstensif berefek signifikan pada kosakata. [Core.ac.uk](https://core.ac.uk/download/403395924.pdf)
- Ukuran efek beda jauh antar studi (0,18 sampai 0,87): dukungan arah, bukan besar. [Hawaii ScholarSpace](https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/d54efd83-7746-40aa-8886-d1ad5af7c14b/content)
- Hanya abstrak terbaca; konteks EFL (bahasa Inggris), bukan JP/KR.

**Vonis: SEBAGIAN.** Alur masuk akal dan didukung studi; belum ada manusia yang mencobanya.

## 4. Milestone 3: Build the Smallest Useful Reader
Isi: reader satu bahasa, impor teks, terjemahan kontekstual, progres baca.

**Kriteria lulus**
- Impor teks/EPUB/PDF jalan di HP.
- Ketuk kata/kalimat memberi arti; progres tersimpan.
- Tidak ada cacat yang membuat baca terhenti.

**Bukti yang ada**
- `pm-mvp-audit.md`: impor 3 format, 3 bahasa, tema, tamat tak memotong, cara baca di teks: semua "Ada".
- Layar menyala sudah diriset (`riset-layar-menyala-data-iphone.md`).
- App hidup di GitHub Pages.

**Celah bukti**
- Batalkan simpan kata dan hak cipta Bagikan masih terbuka.
- Terjemahan butuh internet; masukan tentang batas waktu & pesan gagal belum tuntas.
- Data iPhone bisa hilang (butuh cadangan).

**Vonis: SELESAI** untuk isi milestone (reader dasar jalan). Celah di atas masuk kualitas, bukan lingkup.
- Syarat jujur: "selesai" ≠ "siap umum". Celah tadi harus beres sebelum beta.

## 5. Milestone 4: Private Beta
Isi: 30-50 pengguna, 4 minggu: retensi, kemudahan, pemahaman.

**Kriteria lulus**
- Patokan retensi dari data publik ada, dipakai sebagai target.
- Titik jatuh diperkirakan dan pemicu balik dirancang.
- Bahan rekrut siap; (penguat) pengguna nyata benar-benar dipakai.

**Bukti yang ada**
- `pm-beta-simulasi.md`: 37 bukti; Duolingo 84% kembali besok; kategori pendidikan 2-25% di hari 30.
- Simulasi 3 tipe: jatuh di hari 2-4.
- `riset-kebiasaan-balik-baca.md`: pemicu murah ("Lanjut baca", kata hari ini); PWA tanpa notifikasi dari Pages.
- `marketing-rekrut-beta.md`: bahan rekrut siap.

**Celah bukti**
- Tidak ada angka retensi aplikasi baca; hanya Duolingo yang kuat.
- Tidak ada pengguna nyata, tidak ada data pakai.
- Banyak patokan blog saling mengutip tanpa sumber asli.
- Tidak ada cara ukur di app (analitik) untuk membaca hasil beta.

**Vonis: BELUM** (naik ke "awal"). Perencanaan kuat, eksekusi nol.

## 6. Tiga risiko terbesar sebelum beta nyata
- **Data pengguna hilang di iPhone** (di tab Safari bisa terhapus). Beta tanpa cadangan = kehilangan kepercayaan.
- **Hak cipta fitur Bagikan** (teks buku di server). Selesaikan keputusan sebelum mengundang orang.
- **Tak ada cara ukur beta.** Tanpa angka balik-baca, 4 minggu beta tak menjawab apa pun.

Risiko cadangan (di luar 3 teratas): sinyal putus di KRL (terjemahan menggantung), kartu Hafal meluber di HP kecil.

## 7. Langkah berikutnya
- Founder: jalankan uji 5 orang (skrip siap); 2 jam, hasilnya menaikkan M1 & M2.
- PM: rancang cara ukur beta ringan (hari aktif, kata disimpan) tanpa melanggar privasi.
- Developer: tutup celah M3 (batal simpan, pesan gagal, data cadangan) sebelum rekrut.

## 8. Batasan
- Ringkasan pencarian, bukan kutipan halaman penuh; T1-T5 dari cuplikan hasil.
- Reddit hanya lewat mirror; Play Store/App Store tetap tak terbaca.
- Hasil hari ini kecil (7 kutipan, 4 pencarian); tidak mengubah vonis tahap lama.
