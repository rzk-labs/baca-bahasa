# Sederhanakan halaman: bahasanya harus gampang (#1138)

## Intinya
- Penjelasan AI di lembar "Sederhanakan halaman" masih rumit: ada istilah tata bahasa.
- Ada bug: "Sisa jatah AI 9999 dari 5". Angka jatah harus ikut server.
- Rencana: hasil jadi 2 bagian pendek, bahasa sehari-hari, tanpa istilah.

## 1. Masalah dari gambar masukan
- Isi hasil berisi "Arti / Struktur / Nuansa" dengan kata "obyek", "verba".
- Pengguna A2 tidak paham "verba". Itu bukan penyederhanaan.
- Teks arti masih panjang, satu blok besar.
- Hitungan jatah salah: "9999 dari 5" (angka 5 ditulis tetap di kode).
- Catatan "Cuma bagian awal" ada, tapi tidak bilang cara membaca sisanya.

## 2. Yang harus berubah (ui.js, openSimplify)
- Judul hasil: "Intinya" (maks 2 kalimat pendek) + "Kata yang perlu kamu tahu" (maks 3).
- Hapus "Struktur" dan "Nuansa" dari tampilan halaman. Boleh tetap ada di Jelaskan kalimat.
- Jangan tampilkan istilah: obyek, verba, subjek, kala.
- Jatah: pakai `r.jatah` dari server. Tampil "Sisa jatah AI hari ini: N dari {jatah}".
- Kalau jatah di atas 100, tulis "Jatah AI hari ini: aman".
- Catatan terpotong: "Baru bagian awal halaman. Geser ke bawah lalu coba lagi."

## 3. Cara mengubah isi jawaban
- Kirim `arti: ''` tetap, tapi tambah `mode: 'halaman'` ke `/jelaskan`.
- Worker (deploy manual oleh founder) memakai perintah khusus mode ini:
  - "Jelaskan dalam bahasa Indonesia santai, kalimat maks 12 kata."
  - "Tanpa istilah tata bahasa."
  - "Format: Intinya, lalu Kata penting."
- Sebelum Worker diperbarui: app membersihkan baris berawalan "Struktur:" dan "Nuansa:" di sisi pengguna.

## 4. Syarat selesai
- Hasil tidak memuat kata "verba", "obyek", "Struktur:", "Nuansa:".
- Tidak pernah muncul angka jatah lebih besar dari 5 dengan "dari 5".
- Tombol "Lanjut baca" tetap kelihatan tanpa scroll di iPhone.
- Naikkan versi `C` di sw.js. `node --check ui.js`.

## 5. Catatan
- Mockup: `docs/mockup-1138.html`.
- Kode `api/` tidak diubah di tugas ini. Perubahan Worker minta persetujuan founder dulu.
