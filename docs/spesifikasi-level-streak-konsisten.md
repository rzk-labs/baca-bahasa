# Spesifikasi #1071: Level & streak sama di semua layar

## Intinya
- Angka Level & streak harus sama di Home, Profil, dan pil header.
- Penyebab paling mungkin: layar tidak digambar ulang setelah sinkron akun.
- Di Home, XP ditulis satu baris: "14/100 XP".

## 1. Masalah
- Home: Level 3 (94/100 XP), streak 3 hari.
- Profil: Level 4, streak 4 hari.
- Angka beda merusak rasa percaya pembaca.

## 2. Temuan (ui.js, cloud.js)
- Sumber sudah satu: `level()`, `streak()`, `db.xp`, `db.days`.
- Home menggambar angka sekali, lalu tidak diperbarui otomatis.
- `cloud.js` (baris ~106-110 dan ~327-331) menggabung XP & hari dari server.
- Setelah gabung itu, Home dan pil header tidak digambar ulang.
- Profil digambar saat dibuka, jadi memakai angka baru.
- Hasil: Home lama (Level 3), Profil baru (Level 4).
- Ini hipotesis dari membaca kode; developer wajib konfirmasi dengan mengulang kasusnya.

## 3. Perbaikan
- Buat satu fungsi `refreshStats()`: panggil `refreshPills()` + gambar ulang Home bila tab Home aktif.
- Panggil setelah sinkron akun menggabung `db.xp` / `db.days`.
- Panggil setelah XP bertambah dan setelah hari baca dicatat (`markDay`).
- Panggil saat membuka tab Home dan Profil (`setTab`).
- Rumus level tetap di `level()`; `cloud.js` baris 458 pakai `level()` juga, bukan hitung sendiri.
- Format data IndexedDB tidak berubah.

## 4. Tampilan Home
- Kartu Level: "14/100 XP" satu baris, sejajar kartu Streak & Target.
- Tidak boleh patah dua baris di 320px dan 390px.
- Keterangan "level ini" pindah ke `title` dan `aria-label`.
- Contoh label: "14 dari 100 XP di level ini".
- Gaya: `.stat3 .lbl2` perlu `white-space:nowrap` untuk kartu Level.

## 5. Di luar cakupan
- Sheet Tamat (#1068).
- Header Baca (#1063/#1064).

## 6. Cara uji
- `node --check ui.js` dan `node --check cloud.js`.
- Lebar 320px dan 390px: "14/100 XP" tidak patah.
- Dapat XP saat di Home: kartu Level & pil header langsung naik.
- Sinkron akun di perangkat kedua: Home, Profil, pil sama.
- Ganti tab Home ↔ Profil: angka tetap sama.
- Naikkan versi `C` di `sw.js`.

Mockup: `docs/mockup-1071.html`.
