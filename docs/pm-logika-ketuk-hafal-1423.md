# Logika ketuk kata vs paham (#1423, revisi founder)

## Intinya
- Kata tidak diketuk = dianggap paham. Dihitung dan disimpan.
- Kata diketuk = belum tahu. Dihitung dan masuk ke daftar Kata (nambah vocab).
- Kata yang dulu diketuk/disimpan lalu kini paham: garis stabilonya dihapus.

## 1. Aturan dari founder
- Hitung dan simpan kata yang tidak diketuk: artinya paham.
- Hitung dan simpan kata yang diketuk: nambah ke vocab.
- Pernah diketuk, kini tidak diketuk lagi: garis dihapus.
- Pernah disimpan, sudah paham: garis dihapus juga.

## 2. Aturan yang dibangun
- Halaman "dilewati" bila pengguna pindah ke halaman berikut.
- Kata baru, tidak diketuk, halaman dilewati: simpan sebagai "paham".
- Kata diketuk: simpan ke Kata ("Lagi dihafal"), tambah hitungan vocab.
- Kata pernah diketuk, kini lewat tanpa ketuk: tandai paham, hapus garis stabilo.
- Kata disimpan dan sudah paham: hapus garis juga.
- Kata diketuk lagi kapan pun: garis kembali, tetap "Lagi dihafal".

## 3. Pengaman (supaya tidak menebak salah)
- Halaman dibuka kurang dari 3 detik lalu geser: jangan hitung.
- Nama orang/tempat dan angka: abaikan.
- Satu kata dihitung sekali per halaman.
- Toast "N kata dianggap paham" dengan tombol "Urungkan" (garis kembali).

## 4. Teks yang berubah
- Sheet Tamat, ada ketukan: "N kata ditambah ke Kata. M kata dianggap paham."
- Sheet Tamat, tanpa ketukan: "Tidak ada kata yang kamu ketuk. Semuanya dianggap paham."
- Garis stabilo di teks hanya untuk kata yang masih belum paham.

## 5. Asumsi (perlu konfirmasi founder)
- "Paham" = kata dikenal. "Hafal" tetap lewat latihan ulang, tidak otomatis.
- Garis hilang saat pindah halaman, bukan seketika. Tolong cek.
- Kata paham tetap tersimpan di Kata, tapi tidak di "Lagi dihafal".

## 6. Syarat selesai
- Kata tak diketuk tersimpan sebagai paham. Kata diketuk masuk Kata.
- Kata pernah diketuk lalu paham: garis hilang di semua halaman.
- Data lama tidak rusak. Tombol "Urungkan" jalan. Sinkron akun ikut.
- Naikkan versi C di sw.js.

Mockup: `docs/mockup-1423.html`
