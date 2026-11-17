# Kurangi muat ulang otomatis (#1242)

## Intinya
- Layar sering muat ulang karena update app dirilis puluhan kali per hari.
- Tiap update baru, app muat ulang sendiri. Ditambah toast error yang mengajak "Muat ulang".
- Usul: update masuk diam-diam, muat ulang hanya saat aman dan tidak sering.

## 1. Penyebab (terbukti dari kode)
- `sw.js`: tiap versi baru langsung aktif (`skipWaiting` + `clients.claim`).
- `ui.js` (blok "mulai"): saat versi aktif berganti, app langsung `location.reload()` bila tidak sedang membaca.
- Versi `sw.js` naik 64 kali dalam 2 hari. Pengguna bisa kena muat ulang tiap beberapa jam.
- `ui.js` `globalErr`: error kecil apa pun memunculkan toast 8 detik "Ada yang macet sebentar" + tombol "Muat ulang".
- Masukan Dina: bar itu muncul tanpa sebab jelas. Ini memancing muat ulang yang tak perlu.

## 2. Usulan perilaku
- Update baru: unduh diam-diam, jangan muat ulang di tengah pakai.
- Muat ulang otomatis hanya bila: app baru dibuka (< 5 detik) atau baru kembali dari latar belakang > 30 menit.
- Selain itu: tampilkan chip kecil "Versi baru siap" di Pengaturan, tanpa toast. Tidak memaksa.
- Batas: maks 1 muat ulang otomatis per 6 jam, dihitung lewat penyimpan sesi (bukan data buku).
- Toast error: hapus tombol "Muat ulang". Ganti teks jadi "Ada yang gagal sebentar. Bacaan & katamu aman." tanpa tombol.
- Tombol "Muat ulang versi terbaru" di Pengaturan tetap ada.

## 3. Cara membangun (untuk developer)
- Ubah blok `controllerchange` di `ui.js`: cek `busyNow()`, umur sesi, dan batas 6 jam.
- Simpan `kepo-lastReload` di `sessionStorage`/`localStorage`, bukan IndexedDB.
- Ubah `globalErr`: hapus argumen aksi toast. Pertahankan log `console.error`.
- Pertahankan `save()` sebelum muat ulang. Data pengguna tidak boleh tersentuh.
- Naikkan versi `C` di `sw.js`.

## 4. Cek berhasil
- Buka app, rilis versi baru, tetap di Home 10 menit: layar tidak berubah.
- Tutup lalu buka lagi: versi baru terpakai.
- Picu error kecil: toast muncul tanpa tombol muat ulang.
- Maks 1 muat ulang otomatis dalam 6 jam.

## 5. Mockup
- Lihat `docs/mockup-1242.html`.
