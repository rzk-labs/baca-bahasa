# Riset: 5 menit pertama, dari buka Keepo sampai kata pertama paham

Tugas #133. Tanda: ✅ = pengetahuan umum yang mapan · ⚠️ = belum diverifikasi (tanpa buka sumber langsung).
Bagian 2 (alur Keepo) dibaca langsung dari kode: ✅.

## Intinya
- Jalur tercepat Keepo: 3 ketukan, 1 keputusan (Cerita contoh → bahasa → ketuk kata).
- Jalur "bawa buku sendiri" butuh 5-7 langkah dan 3 keputusan. Di sini orang paling mungkin kabur.
- Usul: satu tombol besar "Coba 1 cerita", bahasa dipilih otomatis, kata pertama dipandu.

## 1. Riset desk: cara app lain mencapai momen "aha"
Momen aha = ketuk kata, arti muncul. Semua angka waktu di bawah ⚠️ (perkiraan dari pengalaman produk).

**Readlang** ([readlang.com](https://readlang.com)) ⚠️
- Langkah: buka situs → pilih bahasa → teks contoh terbuka → klik kata → arti muncul. Sekitar 3 klik, <1 menit.
- Daftar akun ditunda; kata jadi flashcard setelah login.
- Hambatan: impor buku sendiri butuh akun & ekstensi peramban.

**LingQ** ([lingq.com](https://www.lingq.com)) ⚠️
- Langkah: daftar → pilih bahasa → pilih level → pilih pelajaran → klik kata. Sekitar 6-8 langkah, 2-4 menit.
- Hambatan: wajib daftar dulu, banyak pilihan, banyak istilah (LingQ, level 1-6).
- Fitur lengkap, tapi layar awal ramai.

**Language Reactor** ([languagereactor.com](https://www.languagereactor.com)) ⚠️
- Langkah: pasang ekstensi Chrome → buka video YouTube/Netflix → arahkan kursor ke kata di subtitle. Sekitar 4 langkah, 2-3 menit.
- Hambatan: hanya di komputer & Chrome. Tidak bisa di HP.
- Aha cepat, tapi tanpa laptop tak ada jalan masuk.

**Duolingo ABC** ([abc.duolingo.com](https://abc.duolingo.com)) ⚠️
- Untuk anak belajar baca (bukan bahasa asing). Cerita pendek berpandu, ketuk kata = dibacakan.
- Langkah: buka → langsung latihan pertama. Hampir 0 keputusan di awal.
- Pelajaran: tugas pertama sangat kecil & langsung berhasil.

**Kindle** ([amazon.com/kindle](https://www.amazon.com/kindle)) ⚠️
- Langkah: punya buku → buka → tahan kata → kamus muncul. Kamus bahasa perlu diunduh sekali.
- Hambatan: kamus belum terpasang = pop-up unduh di tengah momen aha. Harus punya buku dulu.
- Mulus kalau buku & kamus sudah ada.

**Pola yang sama**
- Yang menang: bacaan sudah tersedia, 0-1 keputusan, kata pertama < 1 menit.
- Yang kalah: wajib daftar, pilih level, atau pasang sesuatu sebelum membaca.
- Rujukan: bacaan pemula → `docs/riset-bacaan-pemula-legal.md`; alasan balik lagi → `docs/riset-kebiasaan-balik-baca.md`.

## 2. Alur nyata pengguna baru Keepo
Sumber: `index.html`, `ui.js` (`viewRak`, `onWord`), `app.js` (`DEF`, `translate`). Pengguna baru: bahasa cerita bawaan Inggris, arti ke Indonesia, tanpa akun, tanpa level.

**Jalur A: Cerita contoh (tercepat)**
- Buka link → Home kosong (0 ketukan) → "Cerita contoh" (1) → pilih bahasa (2, keputusan 1).
- Buku terbuka otomatis di e-reader → ketuk kata (3) → arti muncul setelah internet menjawab.
- Total: **3 ketukan, 1 keputusan.** Perkiraan 15-30 detik.

**Jalur B: Upload file**
- Pilih "Bahasa cerita" (1-2 ketukan, keputusan 1) → "Upload file" (1) → cari file di HP (2-3 ketukan, keputusan 2).
- Tunggu impor. EPUB/PDF butuh internet untuk unduh pustaka dulu.
- Lalu ketuk kata (1). Total: **5-7 ketukan, 3 keputusan** (bahasa, file, "Artiin ke"). Perkiraan 1-3 menit.

**Jalur C: Tempel teks**
- Pilih bahasa → "Tempel teks" → pindah app, salin teks, balik → tempel → "Masukin" → ketuk kata.
- Total: **6-8 ketukan, 2-3 keputusan**, plus keluar-masuk app. Risiko hilang konteks tinggi.

**Titik orang bisa keluar** (dugaan dari kode, belum ada data)
- 🚪 Home kosong: 3 tombol sama bobot; "Upload file" paling menonjol padahal paling berat. Orang belum punya file.
- 🚪 Pilih bahasa di Cerita contoh: pemula bingung; tak ada petunjuk level atau panjang.
- 🚪 Arti kata butuh internet: offline atau gagal → "Artinya belum kebuka", aha berubah jadi buntu.
- 🚪 Petunjuk e-reader tak menunjuk kata tertentu. Orang tak tahu harus ketuk yang mana.

## 3. Usul: momen aha & metrik
**Definisi momen aha**
- "Pengguna baru mengetuk satu kata dan melihat artinya, dalam 5 menit pertama."

**Metrik: waktu ke kata pertama (tanpa server)**
- Simpan di perangkat dua cap waktu: buka pertama, dan arti kata pertama tampil. Selisihnya = metrik.
- Target awal: median < 60 detik lewat Cerita contoh; < 3 menit lewat file sendiri.
- Cara baca: tampil di Pengaturan ("Waktu ke kata pertama: 24 detik"), tester menyebutnya lewat form masukan.

## 4. Tiga rekomendasi (urut dampak)

**1. Satu tombol utama "Coba 1 cerita" di Home kosong** → tugas **developer + desain**
- Satu ketukan membuka cerita contoh bahasa bawaan. "Bahasa lain" jadi opsi kecil.
- Upload & Tempel turun jadi tautan sekunder "Punya bacaan sendiri?".
- Selesai bila: Home kosong ke e-reader = 1 ketukan, 0 keputusan.

**2. Pandu kata pertama di e-reader** → tugas **desain + developer**
- Buku pertama terbuka: satu kata berdenyut + teks "Ketuk kata ini". Setelah ketuk, petunjuk hilang.
- Ganti kotak petunjuk 4 baris dengan 1 baris sampai kata pertama dilihat.
- Selesai bila: tester baru mengetuk kata dalam 15 detik tanpa bantuan.

**3. Catat waktu ke kata pertama + arti yang tak gagal** → tugas **developer**
- Simpan dua cap waktu di perangkat; tampilkan di Pengaturan.
- Siapkan arti kata cerita contoh lebih dulu agar jalan saat sinyal jelek.
- Selesai bila: angka tampil, dan kata pertama tetap berarti saat sinyal lemah.

**Tiga pertanyaan wawancara** (pakai di `docs/naskah-wawancara-pengguna.md` atau `docs/riset-uji-pakai-5-orang.md`)
- "Ceritakan 5 menit pertamamu di Keepo: apa yang kamu ketuk, apa yang bikin ragu?"
- "Kamu sudah punya bacaan siap pakai? Kalau belum, apa yang kamu lakukan?"
- "Saat arti kata muncul, kamu ingin lanjut atau berhenti? Kenapa?"

## 5. Langkah berikutnya
- Founder: setujui 3 rekomendasi; PM membuat tugasnya satu per satu.
- Uji 5 orang (`docs/riset-uji-pakai-5-orang.md`): catat waktu ke kata pertama pakai stopwatch.
- Verifikasi ⚠️: coba kelima app sendiri (±30 menit) sebelum keputusan besar.
