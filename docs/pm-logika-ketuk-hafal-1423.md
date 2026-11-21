# Logika ketuk kata vs hafal (#1423)

## Intinya
- Keluhan founder: halaman tanpa ketukan dianggap "hafal", kata yang diketuk dianggap "belum". Terasa terbalik.
- Kode tidak menandai kata yang tak diketuk sebagai hafal. Tapi layarnya menyiratkan itu.
- Usul: ketuk = tanda "belum paham". Tanpa ketuk = tidak ada klaim apa pun.

## 1. Temuan di app sekarang
- Status "Hafal" hanya dari tombol "Udah hafal" atau kartu geser kanan. Bukan dari baca.
- "Sudah kenal" hanya dari tombol manual. Tidak otomatis.
- Sheet Tamat tanpa ketukan bilang "Tidak ada kata baru". Terbaca: semua kata sudah dikuasai.
- Teks halaman yang tak diketuk tampil polos. Kata diketuk punya garis bawah. Terbaca: polos = beres.

## 2. Aturan yang diusulkan
- Diketuk = "belum paham". Masuk daftar "Lagi dihafal", bukan "Hafal".
- Tidak diketuk = "belum diketahui". Tidak pernah otomatis jadi hafal atau kenal.
- Hafal hanya dari bukti: kartu dijawab benar, atau tombol "Udah hafal".
- Kata kenal otomatis tidak dibuat. Pengguna memutuskan sendiri.

## 3. Perubahan teks (tanpa ubah data)
- Sheet Tamat, tanpa ketukan: "Kamu tidak mengetuk kata apa pun. Belum tentu semuanya paham."
- Sheet Tamat, dengan ketukan: "N kata kamu ketuk. Itu yang belum nempel." Ajak "Ulang kata".
- Catatan sesi: ganti "Tidak ada kata baru" dengan "Belum ada kata diketuk".
- Cek teks "kata baru" di Home agar tak memberi kesan kata tak diketuk = dikuasai.

## 4. Di luar cakupan
- Tidak ada penandaan hafal otomatis dari halaman terbaca. Itu menebak, bisa salah.
- Opsi masa depan: usul "Tandai halaman ini mudah" sekali per bab. Uji dulu.

## 5. Asumsi (perlu konfirmasi founder)
- Pesan #1423 singkat. Saya menafsirkan sebagai soal teks Tamat dan kesan polos = hafal.
- Bila maksudnya tombol atau data lain, beri contoh layar. Rencana disesuaikan.

## 6. Syarat selesai
- Tidak ada teks yang menyiratkan tak diketuk = hafal.
- Data lama (kenal, hafal) tidak berubah. Tanpa migrasi.
- Naikkan versi C di sw.js saat file app berubah.

Mockup: `docs/mockup-1423.html`
