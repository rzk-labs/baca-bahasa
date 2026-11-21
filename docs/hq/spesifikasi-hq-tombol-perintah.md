# Spesifikasi: tombol Perintah di Keepo HQ (#921)

## Intinya
- Tombol "+ Perintah" melayang di HP dan menutupi isi (Aktivitas, kartu).
- Letaknya acak: kanan, di atas menu bawah, tanpa alasan jelas.
- Solusi: taruh di tempat tetap di header, tidak melayang.

## 1. Masalah
- Tombol kuning `.fab` fixed kanan-bawah (`dev/src/page.html` baris ~178).
- Menimpa teks daftar Aktivitas saat gulir.
- Dekat menu bawah: mudah salah ketuk.
- Hanya tampil di layar < 1000px.

## 2. Keputusan
- Hapus tombol melayang `#fab` dan CSS `.fab`.
- Tombol "Perintah" jadi bagian header atas, sejajar judul halaman.
- Papan sudah punya pola ini (baris ~494): pakai juga di Markas, Hasil, Peta.
- Alternatif ditolak: geser fab lebih tinggi (tetap menutupi isi).

## 3. Yang dikerjakan developer
- Hanya `dev/src/page.html`; cek `node --check dev/src/index.js`.
- Tombol Perintah di header tiap tab utama (sembunyi bila belum login, seperti `#fab`).
- Hapus `#fab` dan aturan tampil/sembunyinya (baris ~302 dan ~315).
- Ikuti BRAND.md v9: stabilo Wasabi, target ketuk min 44px.

## 4. Bukti selesai
- HP 390px: tidak ada tombol melayang; isi tidak tertutup.
- Perintah bisa dibuka dari Markas, Papan, Hasil, Peta.
- Layar lebar tetap normal.
