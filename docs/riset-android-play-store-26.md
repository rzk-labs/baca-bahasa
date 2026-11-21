# Riset: Keepo jadi app Android (tahap 26)

Tanggal: 21 Nov 2026 · Status: draft (bukti internet, bukan data Play Console)

## Intinya
- Cara termudah: bungkus web Keepo jadi app Android (TWA) pakai Bubblewrap. Kode app hampir tak berubah.
- Hambatan terbesar bukan teknis: akun pribadi baru wajib uji tertutup 12 orang × 14 hari.
- Biaya kecil (±Rp 400 ribu sekali bayar); kerja founder ±6–8 jam, developer ±3 hari.

## 1. Cara membungkus (TWA)
- TWA = Chrome tanpa bilah alamat, tampil seperti app. Alat: Bubblewrap (CLI) atau PWABuilder (web).
- Rekomendasi: PWABuilder untuk percobaan, Bubblewrap untuk hasil final yang bisa diulang.
- Hasilnya file AAB yang diunggah ke Play Console. Kunci tanda tangan jangan sampai hilang.

Yang harus ada di repo (celah Keepo sekarang):
- **Tidak ada `.well-known/assetlinks.json`.** Tanpa ini app tampil dengan bilah Chrome. Wajib dibuat.
- **Manifest terlalu tipis.** Tidak ada `id`, `description`, `lang`, `orientation`, `categories`, `screenshots`.
- **Ikon sudah ada:** 192, 512, dan maskable 512. Cukup. Bubblewrap butuh juga ikon notifikasi monokrom (opsional).
- **sw.js sudah ada** dan menangani offline dasar. Sudah memenuhi syarat PWA. Tidak ada celah besar.
- **GitHub Pages punya jebakan:** situs ada di `/baca-bahasa/`, bukan di akar domain. Asset links harus di akar domain `rzk-labs.github.io/.well-known/`, dan itu repo lain (`rzk-labs.github.io`). Solusi bersih: domain sendiri (mis. keepo.app).
- **Sidik jari (SHA-256) yang dipakai** harus dari kunci "App signing" Google, bukan kunci unggah. Salah pilih = bilah Chrome muncul.

## 2. Akun Play Console (pribadi baru)
- Biaya: US$25, sekali bayar. Verifikasi identitas (KTP/paspor) + verifikasi nomor HP & email.
- Akun pribadi baru wajib **uji tertutup: minimal 12 penguji, tetap ikut 14 hari berturut-turut**, baru boleh ajukan akses produksi.
- Setelah 14 hari, tetap harus **mengajukan** akses produksi; Google meninjau. Bila ditolak, bisa mengulang.
- Akun organisasi tampaknya bebas aturan 12 penguji, tapi butuh nomor D-U-N-S (bisa sampai 30 hari). Perlu dicek ulang di halaman resmi.
- Uji terbuka tidak dihitung. Hanya jalur tertutup.
- Mulai rekrut 12 penguji SEKARANG dari beta Keepo (mereka butuh akun Google & HP Android). Banyak pengembang indie melaporkan ini yang paling lama.

## 3. Kebijakan yang berisiko ditolak
- **Kebijakan privasi:** wajib ada tautan publik. Sudah ada `privasi.html`; pastikan menyebut data yang disimpan di server & pihak ketiga (Google gtx, MyMemory).
- **Data safety:** isi formulir jujur: akun (email/nama tampil), skor/XP, bacaan tersinkron, log penggunaan. Wajib jelaskan enkripsi & cara hapus.
- **Hapus akun:** Google wajib ada jalur hapus di dalam app DAN tautan web untuk meminta hapus (dicantumkan di Data safety). Di dalam app sudah ada. **Celah: belum ada halaman web khusus hapus akun** yang bisa dibuka tanpa login ke app.
- **Konten unggahan pengguna (buku):** kebijakan UGC Google minta: aturan konten, cara lapor, cara blokir. Keepo sudah punya lapor/blokir di Sosial. Buku pribadi tersimpan di perangkat, tidak dibagikan, jadi risiko rendah; pastikan teks bantuan menyatakan itu.
- **Syarat teknis baru:** app baru harus menarget API level terbaru yang Google minta saat itu. Bubblewrap versi terbaru mengurusnya. Cek angka saat build.
- **Login/akun:** bila review minta akun uji, siapkan mode demo (sudah ada, dari perbaikan App Review iOS).

## 4. Biaya, jam kerja, dan urutan
Biaya:
- Akun Play: US$25 (±Rp 400 ribu), sekali.
- Domain sendiri (disarankan): ±Rp 150–300 ribu per tahun.
- Alat (Bubblewrap/PWABuilder): gratis.

Jam kerja founder (±6–8 jam, tersebar):
- Daftar akun + verifikasi: 1–2 jam.
- Rekrut 12 penguji & pantau 14 hari: 2–3 jam.
- Isi listing, Data safety, tekan rilis: 2–3 jam.

Urutan tugas [peta N] untuk developer:
1. [peta 1] Manifest lengkap (id, description, lang, categories, screenshots) + naikkan versi sw.js.
2. [peta 2] Halaman web "Hapus akun" + tautan di privasi & bantuan.
3. [peta 3] Domain sendiri + `.well-known/assetlinks.json` (isi sidik jari setelah ada AAB).
4. [peta 4] Bangun AAB dengan Bubblewrap; uji di HP Android; unggah ke jalur uji tertutup.
5. [peta 5] Siapkan materi listing: deskripsi, tangkapan layar, ikon 512, grafik fitur, jawaban Data safety.

Catatan: langkah 1, 2, 5 bisa jalan sekarang. Langkah 3–4 menunggu keputusan domain & akun.

## Keputusan yang hanya founder bisa ambil
- Pakai akun pribadi (12 penguji × 14 hari) atau organisasi (butuh D-U-N-S)?
- Beli domain sendiri untuk Keepo? (disarankan; menyelesaikan masalah asset links)
- Mulai Android sekarang atau tunggu App Store iOS live dulu?

## Sumber
- [Syarat uji tertutup akun pribadi (Google Play Help)](https://support.google.com/googleplay/android-developer/answer/14151465)
- [Syarat hapus akun (Google Play Help)](https://support.google.com/googleplay/android-developer/answer/13327111)
- [Android Concepts for Web Developers (Chrome)](https://developer.chrome.com/docs/android/trusted-web-activity/android-for-web-devs)
- [Codelab: PWA ke Google Play](https://developers.google.com/codelabs/pwa-in-play)
- [Panduan TWA (Android Developers)](https://developer.android.com/develop/ui/views/layout/webapps/guide-trusted-web-activities-version2)
- [Aturan 12 penguji (DEV Community)](https://dev.to/theionproject/the-12-tester-rule-that-quietly-adds-two-weeks-to-your-first-google-play-launch-4bp3)
- [Pengalaman kirim PWA ke Play (DEV Community)](https://dev.to/markusbnet/how-i-shipped-my-pwa-to-google-play-as-a-twa-and-what-actually-went-wrong-392j)

Catatan kejujuran: biaya US$25 dan verifikasi identitas dari pengetahuan umum, tidak dibuka ulang di sesi ini. Angka API level perlu dicek saat build.
Mockup rencana: `docs/mockup-1472.html`.
