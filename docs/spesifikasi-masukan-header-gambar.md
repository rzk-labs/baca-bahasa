# Spesifikasi: tombol Masukan di header + kirim gambar (#878)

## Intinya
- Tombol "Masukan" mudah dilihat di header, di Home dan saat baca.
- Masukan bisa disertai gambar (tangkapan layar).
- "Perintah ke tim" (Keepo HQ) juga bisa disertai gambar.

## 1. Kondisi sekarang
- Masukan hanya lewat Pengaturan (ikon slider) → "Kirim masukan" (`openFeedback`, ui.js).
- Saat baca, `openFeedback` langsung keluar (`reading`), jadi tak bisa dibuka.
- Form hanya teks (maks 500 huruf); server `/feedback` di `dev/src/index.js` hanya terima teks.
- Form perintah HQ (`dev/src/page.html`, kolom `#isi`) hanya teks.

## 2. Tombol Masukan di header (app)
- Header Home: tambah tombol ikon `chat` + label "Masukan", sebelum tombol Pengaturan.
- Layar sempit: ikon saja, `aria-label="Kirim masukan"`, area ketuk min. 44px.
- Header baca: tambah ikon `chat` di sisi kanan; maks 2 tombol kanan (aturan #398).
- Boleh tampil lewat menu header baca (ketuk tengah layar), bukan di atas teks.
- Hapus penjagaan `reading` di `openFeedback`; sheet harus tertutup rapi lalu kembali ke bacaan.
- Tombol di Pengaturan tetap ada.
- Saat baca, info HP otomatis menyertakan judul buku & posisi (opsional, centang).

## 3. Lampiran gambar di form masukan (app)
- Tombol "Tambah gambar" (ikon gambar) di bawah kotak teks; `input type=file accept=image/*`.
- Maks 3 gambar. Tiap gambar tampil sebagai kotak kecil dengan tombol hapus (x).
- Kecilkan di HP sebelum kirim: sisi terpanjang maks 1280px, JPEG kualitas ±0,7, maks ±300 KB.
- Tolak non-gambar dan SVG. Pesan ramah: "Hanya foto/tangkapan layar ya."
- Pengingat di form: "Jangan sertakan data pribadi di gambar."
- Offline: gambar ikut disimpan di antrean masukan (IndexedDB), terkirim ulang otomatis.
- Data lama (`feedback` store) tetap terbaca; rekaman tanpa gambar jalan seperti biasa.

## 4. Server `/feedback` (HQ, `dev/`)
- Terima daftar `gambar` (data URL JPEG/PNG/WebP), maks 3, tiap maks ±400 KB, total maks ±1 MB.
- Cek jenis file dari isi (bukan hanya nama); buang yang tak valid.
- Simpan ke repo sebagai file di folder khusus (mis. `masukan-img/`), lalu tautkan di komentar issue sebagai gambar.
- Batas laju yang ada (5 per jam per perangkat) tetap berlaku.
- Pesan galat jelas bila gambar terlalu besar; teks tetap terkirim bila gambar gagal (beri tahu pengguna).
- Cek `node --check dev/src/index.js`. Deploy Worker manual oleh founder.

## 5. Gambar di "perintah ke tim" (HQ web)
- Form tugas baru (`#isi`) dan form revisi (`#rv`): tombol "Tambah gambar" + tempel (paste) gambar.
- Maks 3 gambar, dikecilkan di browser seperti bagian 3.
- Gambar disimpan ke repo dan tautannya masuk isi issue, agar agent bisa membacanya.
- Jangan hapus perilaku teks yang ada; tugas tanpa gambar sama seperti sekarang.
- Gambar di tugas HQ tampil sebagai kotak kecil di kartu tugas.

## 6. Syarat selesai
- Tombol Masukan terlihat di header Home dan saat baca, di iPhone Safari & layar lebar.
- Kirim masukan dengan 1–3 gambar berhasil; offline masuk antrean lalu terkirim.
- Gambar muncul di issue masukan pengguna.
- Perintah HQ dengan gambar sampai ke agent.
- Naikkan versi `C` di `sw.js` (`kepo-vN` → `kepo-vN+1`) dan `APP_VER` bila perlu.
- Cek `node --check` untuk `ui.js`, `app.js`, `dev/src/index.js`.
