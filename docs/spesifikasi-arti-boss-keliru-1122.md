# Spesifikasi: arti keliru di layar Boss ("onetime" = "mantan")

Tugas #1122 · Peran PM · Laporan founder: "Kenapa ada tulisan mantan di sini?"

## Intinya
- "mantan" adalah arti Indonesia untuk "onetime" di layar Boss. Mesin terjemah salah.
- Arti benar: "sekali pakai" / "satu kali". Kata "mantan" cocok untuk "ex", bukan "onetime".
- Perbaikan: tanda "arti mesin" + tautan "Arti ini salah?" di layar Boss, sama seperti kartu kata (#1106).

## 1. Apa yang terjadi
- Layar Boss (Kata → Susah diucap) menampilkan kata dan artinya di bawahnya.
- Arti diambil otomatis dari layanan terjemahan gratis, tanpa dicek.
- "onetime" ditulis sambung; mesin menebak ke "ex" lalu "mantan".
- Bukan teks buatan tim. Tidak ada kata "mantan" di kode aplikasi.

## 2. Yang diubah (rencana)
- Arti di layar Boss diberi label kecil "arti mesin".
- Tautan "Arti ini salah?" muncul di bawah arti.
- Ketuk tautan: buka maks 3 arti lain (pakai fitur #1106 yang sama).
- Arti pilihan tersimpan ke kartu Kata, dan dipakai lagi di Boss berikutnya.

## 3. Aturan
- Jangan ubah isi arti diam-diam; pembaca yang memilih.
- Layanan kena batas: tampilkan pesan ramah + tombol "Coba lagi".
- Tampilan tetap muat di HP 320px; tombol Coba lagi dan Skip dulu tetap terlihat tanpa gulir.

## 4. Cara uji
- Buka Boss dengan kata "onetime": arti tampil dengan label "arti mesin".
- Ketuk "Arti ini salah?": muncul pilihan seperti "sekali pakai".
- Pilih satu: arti di layar Boss dan kartu Kata ikut berubah.
- Matikan sinyal: muncul pesan batas + "Coba lagi", layar tidak kosong.

## 5. Keterkaitan
- Memperluas #1106 (backlog 113: Arti ini salah?) ke layar Boss.
- Riset dasar: `docs/riset-arti-ini-salah.md`. Mutu mesin: `docs/riset-mutu-terjemahan-mesin.md`.
- Mockup: `docs/mockup-1122.html`.
