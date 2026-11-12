# Riset: bantuan arti, kata dulu, kalimat kapan?

Tugas #145 · Peran riset · Status: draf (dari literatur umum + baca kode, belum diuji pengguna)

## Intinya
- Arti kata cukup untuk kalimat yang hampir dipahami; arti kalimat untuk tata bahasa yang buntu.
- Terjemah kalimat terlalu cepat bikin malas menebak. Solusinya: tahap, bukan larangan.
- Rekomendasi: tetap pola sekarang ("Masih bingung?"), lalu ukur ketukan per halaman sebelum menambah fitur.

## 1. Kapan arti kata cukup, kapan arti kalimat?
Catatan: rujukan di bawah dari ingatan umum; belum dicek ulang ke sumber asli.

**Arti kata cukup bila:**
- Kata asing tinggal sedikit (riset membaca ekstensif: sekitar 95-98% kata di teks sudah dikenal).
- Pembaca paham tata bahasa kalimatnya; hanya satu-dua kata macet.
- Glossing (arti di tepi teks) terbukti membantu paham tanpa memutus alur baca.

**Arti kalimat perlu bila:**
- Semua kata sudah dicek, tapi maknanya tetap tak masuk (idiom, urutan kata, partikel).
- Bahasa Jepang/Korea: kata benar, tapi susunan kalimat membingungkan.
- Pembaca pemula: banyak kata asing sekaligus, kalimat jadi buntu.

**Cara aplikasi lain:**
- LingQ & Readlang: ketuk kata dulu; terjemah kalimat/frasa jadi pilihan terpisah.
- Language Reactor: terjemah kalimat tampil terus di subtitle; mudah jadi bergantung.
- Pola umum: kata cepat, kalimat sebagai langkah kedua yang disengaja.

## 2. Risiko terlalu cepat lihat terjemah kalimat
**Risikonya:**
- Pembaca berhenti menebak dari konteks; padahal menebak yang membuat kata menempel.
- Mata lompat ke bahasa Indonesia; teks asing jadi sekadar "soal".
- Bergantung: tiap kalimat dicek, kecepatan baca tak naik.

**Cara mengurangi tanpa bikin kesal:**
- Jangan larang. Sediakan, tapi satu langkah lebih jauh dari arti kata.
- Pesan ramah, bukan peringatan. Contoh: "Coba tebak dulu? 👀" (bisa dilewati).
- Tampilkan ringkasan pemakaian lembut, mis. "Hari ini 4 kalimat dibuka. Kata lebih banyak!"

**Yang dipantau:**
- Rasio ketukan kalimat terhadap ketukan kata per halaman.
- Apakah rasio turun seiring buku yang sama dibaca lagi.
- Apakah pembaca tetap lanjut baca (bukan berhenti kesal).

## 3. Tiga pola dibandingkan
Alur sekarang di kode: ketuk kata membuka sheet "1/2 · Arti kata" (`onWord`); tombol "Masih bingung? 👀" membuka "2/2 · Arti kalimat" (`showSentence`). Tahan kalimat sekitar 0,45 detik di layar sentuh juga langsung membuka arti kalimat (tip pertama sudah menyebutnya). Di desktop (mouse) tahan-kalimat tidak ada, karena hanya pakai event sentuh.

| Pola | Plus | Minus |
|---|---|---|
| A. Ketuk kata → "Masih bingung?" (sekarang) | Bertahap alami; kata dulu; tidak mengganggu | Dua langkah bila memang butuh kalimat |
| B. Tahan kalimat → arti langsung (sudah ada, sentuh) | Cepat; hemat satu ketukan | Terlalu mudah; menggoda dipakai tiap kalimat |
| C. Arti disembunyikan sampai menebak | Paling melatih menebak | Bikin kesal; menambah langkah; butuh input tebakan |

**Pembacaan kami:**
- A paling sejalan "Reader First, AI Second".
- B sudah mengatasi keluhan Nadia (dua langkah), tapi hanya di sentuh, dan tip mudah terlewat.
- C terlalu berat untuk pemula; baru layak sebagai mode pilihan nanti.

## 4. Rekomendasi: pola A (dengan B tetap ada)
- Pertahankan A sebagai jalur utama; B sebagai jalan pintas untuk yang sudah tahu.
- Tambah catatan ukur, bukan fitur baru: hitung ketukan kata vs kalimat per halaman.
- Tunda C. Uji dulu apakah ketergantungan benar terjadi (data, bukan dugaan).

**Mengapa bukan C sekarang:** belum ada bukti pengguna Keepo malas menebak; C berisiko mengurangi kenyamanan (prioritas P0).

## 5. Tiga pertanyaan uji untuk 5 pengguna beta
1. "Saat bingung satu kalimat, apa yang kamu lakukan? Kenapa begitu?"
2. "Pernah buka arti kalimat padahal sebenarnya bisa menebak? Kapan?"
3. "Kalau sebelum arti kalimat muncul ada 'Coba tebak dulu?', terganggu atau terbantu?"

**Cara uji:** minta baca 1 bab sambil berpikir keras; catat jumlah ketukan; tanpa menggiring.

## 6. Ukuran sukses sederhana
- **Ketukan kata per halaman:** turun pelan-pelan untuk buku yang sama = tanda belajar.
- **Rasio kalimat : kata:** wajar bila di bawah sekitar 1 : 3 (angka awal tebakan, perlu data nyata).
- **Pembaca lanjut ke halaman berikutnya** setelah membuka arti kalimat (tidak berhenti).

## Langkah berikutnya
**Saran tugas developer (kecil, 1 PR):**
- Catat dua angka per halaman: ketukan kata dan arti kalimat dibuka (termasuk tahan-kalimat).
- Simpan lokal saja, tanpa tampilan baru; tampilkan di statistik sederhana.
- Selaraskan dengan `docs/spesifikasi-hitung-ketukan-kata.md` agar tidak bentrok.

**Untuk founder:** bila ingin tahu hasilnya, minta 5 beta mengisi 3 pertanyaan di atas.
