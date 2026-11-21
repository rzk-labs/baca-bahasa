# Spesifikasi: sheet arti kata rapi (#941 "Ui slop")

## Intinya
- Tombol "Sudah kenal" di sheet arti terpotong per huruf ("Suda/h/kenal"). Harus rapi.
- Tebakan bentuk dasar salah: "proceed" jadi "proce". Lebih baik kosong daripada salah.
- Baris atas sheet (suara, panah, FRASA) sesak di HP. Beri napas.

Sumber: gambar masukan #941 (iPhone, tema krem, kata "proceed").

## 1. Temuan dari gambar
- Tombol Simpan melar lebar, dua tombol kecil terhimpit di kanan.
- "Sudah kenal" patah di tengah kata, jadi 3 baris. "Ini nama" patah 2 baris.
- "Bentuk dasar: proce (tebakan)" salah. Akar "proceed" memang "proceed".
- Arti "Proses" kurang pas untuk "to proceed with" (maksudnya: melanjutkan). Sudah ada tanda "arti mesin".
- Baris judul: kata, tombol suara, panah, label FRASA berdempetan.

## 2. Perbaikan (developer)
- Baris aksi: Simpan satu baris penuh (lebar 100%).
- "Sudah kenal" dan "Ini nama" di bawahnya, berbagi baris, tanpa patah huruf.
- Teks tombol tidak boleh patah di tengah kata. Maks 2 baris di layar 320px, patah antar kata saja.
- Pengaturan di `style.css` sekitar `.wact` (±baris 770): Simpan `flex:1 1 100%`, tombol lain `flex:1 1 120px`, `white-space:nowrap`.
- Bentuk dasar Inggris: kata berakhiran `-eed` (proceed, succeed, exceed, need) jangan ditebak. Ubah `guessBase` di `app.js` (±baris 530).
- Tambah uji: "proceed", "needed", "agreed" tidak menghasilkan "proce", "ne", "agre".
- Baris judul sheet: beri jarak antar tombol suara, panah, FRASA; label FRASA tidak menempel panah.

## 3. Cara cek
- Buka sheet kata "proceed" di lebar 320px, 360px, 390px, 4 tema baca.
- Tidak ada tombol yang teksnya patah di tengah kata.
- Label "Bentuk dasar" tidak muncul untuk "proceed".
- Naikkan versi `C` di `sw.js` setelah ubah file.
- Jangan ubah format data lama.
