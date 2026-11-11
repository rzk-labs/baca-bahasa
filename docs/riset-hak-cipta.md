# Riset hak cipta: buku unggahan & bahan bacaan legal

_Bukan nasihat hukum. Bahan awal untuk founder sebelum bicara dengan ahli hukum._
Legenda: ✅ = terverifikasi dari sumber (lihat tautan) · ⚠️ = asumsi / pengetahuan umum, belum dicek ke teks resmi.

## Intinya
- Simpan file di perangkat sendiri: risiko rendah. Fitur Bagikan: risiko terbesar.
- Pesaing (LingQ, Readlang) pakai pola sama: impor pribadi boleh, publik wajib berhak.
- Jawaban #30: mulai ringan SEKARANG, rapikan sebelum beta, tuntaskan sebelum monetisasi.

## 1. Risiko Keepo
**Yang relatif aman**
- ✅ Teks diurai & disimpan di IndexedDB perangkat pengguna, bukan di server Keepo.
- ⚠️ Penggandaan untuk keperluan pribadi/pendidikan umumnya lebih longgar (cek Pasal 44 & 46 UU 28/2014).
- ⚠️ Pengguna yang mengunggah file sendiri ikut bertanggung jawab atas file itu.

**Yang berisiko**
- ✅ Bagikan mengirim seluruh teks ke server Keepo (D1) dan membuat link (`api/src/index.js`, `/share`).
- ⚠️ Keepo jadi penyimpan & penyebar salinan: bukan lagi pemakaian pribadi.
- ⚠️ Pemilik hak bisa minta takedown; platform yang membiarkan bisa ikut dituntut (cek ahli).

**Yang masih tanda tanya**
- ⚠️ Potongan teks dikirim ke Google/MyMemory untuk terjemahan: kecil, tapi belum dikaji.
- ✅ Layar Bagikan sudah punya peringatan ("milikmu / domain publik"). Belum ada syarat formal.
- ⚠️ Akun & data pengguna terkait UU PDP (privasi): topik terpisah.

## 2. Cara pesaing menangani
**LingQ**
- ✅ Impor bersifat pribadi sampai pengguna sendiri membagikan. [Help Center impor](https://qa3.lingq.com/help/import/)
- ✅ Berbagi publik: harus bebas hak cipta atau berizin; lainnya lewat tautan. [Forum LingQ](https://forum.lingq.com/t/what-about-copyright/43425)
- ✅ LingQ berhak menghapus konten bermasalah. [ToS LingQ](https://lingq.com/terms)

**Readlang**
- ✅ Pengguna tetap pemilik konten & menjamin punya haknya; akun bisa ditutup bila melanggar. [ToS Readlang](https://readlang.com/termsOfService)
- ✅ Panduan unggah novel: jangan centang "Public" agar hanya pemilik yang lihat. [Panduan](https://readlang.uservoice.com/knowledgebase/articles/684377-uploading-novels-to-read-including-ones-with-drm)
- ⚠️ Sikap soal ebook berbayar tidak dinyatakan jelas.

**Beelinguapp**
- ⚠️ Model beda: katalog sendiri (klasik, berita, buku anak). Dasar lisensi tidak ketemu di sumber publik.
- ⚠️ Perlu dicek manual: [FAQ Beelinguapp](https://beelinguapp.com/faq).

Pola: **impor pribadi = tanggung jawab pengguna; berbagi publik = wajib berhak; ada mekanisme hapus.**

## 3. Bahan bacaan legal untuk perpustakaan bawaan
Semua ⚠️: cek lisensi per judul. Terjemahan modern bisa tetap berhak cipta.

**Inggris**
- [Project Gutenberg](https://www.gutenberg.org): puluhan ribu buku domain publik (dasar hukum AS).
- [Standard Ebooks](https://standardebooks.org): edisi rapi dari karya domain publik.
- Wikisource & teks berlisensi Creative Commons (cek tiap teks).

**Jepang**
- [Aozora Bunko](https://www.aozora.gr.jp): karya domain publik atau izin penulis. Cek catatan tiap berkas.
- Masa lindung umumnya 70 tahun setelah penulis wafat.

**Korea**
- Wikisource Korea & karya penulis yang wafat lebih dari 70 tahun lalu.
- Cerita rakyat & teks pemerintah berlisensi terbuka (mis. KOGL): cek syaratnya.
- Sumber paling tipis: kemungkinan perlu kurasi manual.

Alternatif: tulis cerita pendek A2-B1 sendiri; Keepo punya hak penuh.

## 4. Rekomendasi per tahap
**Sekarang (tahap 18 MVP)**
- Catatan syarat singkat di app saat unggah: "pakai bahan yang kamu berhak".
- Perkuat peringatan Bagikan + kotak centang "Ini milikku / domain publik".
- Siapkan 5-10 cerita domain publik per bahasa sebagai contoh bawaan.

**Sebelum beta (tahap 19)**
- Syarat & Ketentuan + Kebijakan Privasi, ditinjau ahli hukum.
- Tombol "Laporkan" di link bagikan + email takedown + proses hapus cepat.
- Pertimbangkan: Bagikan hanya untuk teks bawaan/milik sendiri.

**Sebelum monetisasi**
- Konsultasi hukum tuntas; putuskan nasib Bagikan teks pengguna.
- Perpustakaan berlisensi/kemitraan penerbit bila butuh konten populer.
- Jangan menjual akses ke teks yang tidak dimiliki.

## 5. Pertanyaan untuk ahli hukum
- Apakah menyimpan file unggahan di perangkat pengguna aman menurut UU 28/2014?
- Apakah Bagikan membuat Keepo penyebar, atau hanya penyedia platform?
- Syarat apa agar Keepo terlindung (notice-and-takedown, S&K, kotak centang)?
- Apakah mengirim potongan teks ke layanan terjemahan pihak ketiga bermasalah?
- Apa batas "kepentingan pribadi" & pendidikan untuk app berbayar?
- Bagaimana bila pengguna ada di luar negeri (Korea, Jepang, AS)?
- Perlu badan hukum/izin apa sebelum menarik bayaran?

## Langkah berikutnya
- Developer: catatan syarat di unggah & kotak centang Bagikan (tugas kecil).
- Riset: cek manual FAQ Beelinguapp & lisensi tiap sumber bawaan.
- Founder: bawa bagian 5 ke konsultasi hukum sebelum beta.
