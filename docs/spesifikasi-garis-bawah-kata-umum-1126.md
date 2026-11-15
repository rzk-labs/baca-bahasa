# Spesifikasi: kata umum (the, that) jangan digaris-bawahi putus-putus (#1126)

## Intinya
- Laporan: "this, the, that" di halaman baca bergaris putus-putus. Kenapa?
- Penyebab: garis putus-putus = kata sering diketuk (3× atau lebih). Kata umum ikut terhitung.
- Solusi: kata umum tidak dapat garis sering-diketuk. Kata sulit tetap bergaris.

## 1. Kenapa muncul
- Garis putus-putus = penanda "sering diketuk" (#230). Maksudnya: kata ini sulit bagimu.
- Kata `the`, `that`, `this` mudah terketuk berulang. Hitungan cepat tembus 3.
- Saringan kata umum sudah ada (`FUNC_SET`, dipakai Home & catatan sesi).
- Tapi garis di halaman baca (`isOften`) belum memakainya.
- Akibatnya halaman penuh garis putus-putus. Penanda jadi bising.

## 2. Perilaku baru
- Kata umum bahasa itu tidak pernah dapat garis sering-diketuk.
- Berlaku saat halaman digambar dan saat ketukan ke-3.
- Kata umum yang sudah disimpan tetap bergaris solid (pilihan pengguna).
- Lengkapi daftar Inggris: `this`, `these`, `those`, `there`, `from`, `have`, `had`, `has`, `his`, `her`, `its`, `their`.
- Kata sulit (mis. `draconian`) tetap bergaris putus-putus.
- Pengaturan "tandai kata sering diketuk" tetap berfungsi.

## 3. Titik kode untuk developer
- `ui.js` ±1351: `isOften` tambah syarat bukan kata umum (`FUNC_SET[lang]`).
- `ui.js` ±2105: `showTap` jangan menambah kelas `often` bila kata umum.
- `app.js` ±636: lengkapi daftar `en` di `FUNC_WORDS`.
- Naikkan versi `C` di `sw.js`. Tanpa migrasi.

## 4. Uji terima
- Buku Inggris: `the`, `that`, `this` tak bergaris walau diketuk 5×.
- Ketuk kata sulit 3×: garis putus-putus muncul langsung.
- Kata umum yang disimpan: garis solid tetap ada.
- Buku bahasa lain: ikut daftar kata umum masing-masing.
