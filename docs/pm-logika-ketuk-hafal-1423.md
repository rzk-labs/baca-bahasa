# Logika ketuk kata vs hafal (#1423, revisi founder)

## Intinya
- Founder: lewat tanpa ketuk = paham. Ketuk = belum tahu. Ketuk lagi nanti = belum hafal.
- Sekarang app tidak menandai apa pun dari membaca. Aturan ini baru.
- Usul: tiga aturan otomatis, dengan pengaman supaya tidak salah tandai.

## 1. Aturan dari founder
- Kata di halaman, tidak diketuk, lanjut ke halaman berikut = sudah paham.
- Kata diketuk = belum tahu artinya. Masuk "Lagi dihafal".
- Kata sudah pernah diketuk, diketuk lagi di kalimat lain = belum hafal juga.
- Kata yang tidak diketuk lalu lanjut halaman = sudah hafal.

## 2. Aturan yang dibangun
- Halaman dianggap "dilewati" bila pengguna pindah ke halaman berikut.
- Kata baru, tidak diketuk, halaman dilewati: tandai "paham" (data kenal).
- Kata sudah "Lagi dihafal", tidak diketuk di halaman berikutnya: naik satu tingkat.
- Naik tingkat ketiga kali berturut-turut tanpa ketuk: jadi "Hafal".
- Kata diketuk, kapan pun: tingkat balik ke awal, tetap "Lagi dihafal".
- Ketuk ulang di kalimat lain: hitungan lewat mulai dari nol.

## 3. Pengaman (supaya tidak menebak salah)
- Halaman dibuka kurang dari 3 detik lalu geser: jangan hitung. Itu loncat, bukan baca.
- Kata nama orang/tempat dan angka: abaikan.
- Satu kata dihitung sekali per halaman, walau muncul berkali-kali.
- Toast singkat "N kata dianggap paham" dengan tombol "Urungkan".

## 4. Teks yang berubah
- Sheet Tamat, ada ketukan: "N kata kamu ketuk. Itu yang belum nempel." Ajak "Ulang kata".
- Sheet Tamat, tanpa ketukan: "Tidak ada kata yang kamu ketuk. Semuanya dianggap paham."
- Catatan sesi menampilkan dua angka: "N dianggap paham · M belum nempel".

## 5. Asumsi (perlu konfirmasi founder)
- Saya baca "sudah hafal" untuk kata yang sudah pernah dipelajari lalu lewat tanpa ketuk.
- Kata yang baru pertama muncul lalu lewat: saya tandai "paham", belum "hafal". Tolong cek.
- Tiga lewatan berturut-turut untuk "Hafal" itu angka usulan. Bisa diubah.

## 6. Syarat selesai
- Kata lewat tanpa ketuk naik tingkat. Kata diketuk balik ke awal.
- Data lama (kenal, hafal) tidak rusak. Tanpa migrasi, hanya field tingkat baru bila perlu.
- Tombol "Urungkan" jalan. Sinkron akun ikut menyimpan.
- Naikkan versi C di sw.js.

Mockup: `docs/mockup-1423.html`
