# UX: peta langkah pengguna baru sampai ketuk kata pertama (#1825)

Tahap 22 (Aktivasi Sesi Pertama). Dibaca dari kode `ui.js` (`viewRak`, `startSample`, `guideOn`, `onWord`), bukan data pengguna. Pelengkap `docs/riset-sesi-pertama.md`, `docs/riset-cerita-contoh-kata-pertama.md`, `docs/desain-tips-pertama-satu-baris.md`.

## Intinya
- Jalur tercepat sudah 3 ketukan. Masalahnya: pintu itu tersembunyi di bawah layar.
- Tombol utama Home kosong masih "Tambah cerita" (butuh file). Pemula belum punya file.
- 3 perbaikan kecil, satu layar tiap perbaikan. Ukur lewat /hitung (aktivasi).

## 1. Peta langkah nyata (pengguna baru, tanpa buku)
Pintu A: Coba 1 cerita (sudah ada, kata pertama dipandu).

| # | Layar | Ketukan | Keputusan | Catatan |
|---|---|---|---|---|
| 0 | Home kosong | 0 | 0 | Judul, tombol "Tambah cerita", 3 langkah |
| 1 | Home kosong, gulir ke bawah | 0 | 0 | 🚪 Ragu: chip bahasa baru kelihatan setelah gulir |
| 2 | Ketuk chip bahasa (Mandarin/Inggris/Korea/Jepang) | 1 | 1 | Buku 3 kalimat langsung terbuka |
| 3 | Reader, satu kata menyala | 0 | 0 | Petunjuk "Ketuk kata yang menyala" |
| 4 | Ketuk kata menyala | 2 | 0 | Sheet arti; titik tunggu internet |
| 5 | Sheet arti, 4 tombol | 3 | 1 | Simpan / Tandai & lanjut / Selesai / Masih bingung |

- Total: **3 ketukan** sampai kata tersimpan. Ketuk kata pertama = ketukan ke-2.
- Pintu B (Tambah cerita / Tempel teks): 5-8 ketukan, 2-3 keputusan. Sudah dibahas di riset-sesi-pertama.

## 2. Titik ragu & buntu
- 🚪 **Home kosong:** tombol hitam besar mengajak ke file. Chip contoh di bawah, setelah 3 langkah.
- 🚪 **Dua pintu kembar:** "Coba 1 cerita" dan "Cerita contoh" melakukan hal mirip. Bikin bingung.
- 🚪 **Sheet arti pertama:** empat tombol sekaligus. Orang baru tak tahu mana yang wajib.
- 🚪 **Sinyal lemah:** arti kata menyala baru dicari setelah diketuk. Bisa muncul "belum kebuka".

## 3. Tiga perbaikan, urut dampak
Tidak mengulang: kata menyala & tips 1 baris (sudah jadi), sheet Tamat, Home streak.

### Perbaikan 1: Home kosong, cerita contoh jadi tombol utama
- Layar: Home saat belum ada buku (`viewRak`, cabang `!cur`).
- Satu kalimat: "Chip 'Coba 1 cerita' naik ke bawah judul; 'Tambah cerita' turun jadi tombol kedua."
- File: `ui.js` (urutan blok di `viewRak`), `style.css` (`.hero-up`, `.try1`), `sw.js` (naikkan `C`).
- Uji 320px: chip bahasa terlihat tanpa gulir. Tinggi layar 568px.
- Uji 390px: tombol ≥44px, tak ada teks terpotong, tema gelap tetap terbaca.

### Perbaikan 2: Hapus pintu kembar di Home kosong
- Layar: kartu "Atau mulai dengan" di Home kosong.
- Satu kalimat: "Tombol 'Cerita contoh' disembunyikan saat Home kosong; sisakan 'Tempel teks'."
- File: `ui.js` (`addCard`, parameter `noUp`). Setelah ada buku, tombol kembali seperti biasa.
- Uji 320px: kartu hanya satu tombol, tidak ada baris kosong.
- Uji 390px: setelah buku pertama ditambah, "Cerita contoh" muncul lagi.

### Perbaikan 3: Arti kata menyala disiapkan sebelum diketuk
- Layar: reader buku contoh pertama, sheet "Arti kata".
- Satu kalimat: "Saat cerita contoh terbuka, arti kata yang menyala diambil diam-diam, jadi sheet langsung berisi."
- File: `ui.js` (`guideMark`, panggil terjemahan sekali). Tak ubah `app.js`.
- Uji 320px: ketuk kata menyala, arti muncul tanpa titik tunggu lama.
- Uji 390px: mode pesawat, arti tetap ada bila sudah diambil; bila gagal, pesan lama tampil.

## 4. Satu patokan ukur
- Aktivasi = baca ≥1 halaman DAN ketuk ≥1 kata di hari pertama (sudah dikirim `kepoMark` ke /hitung).
- Patokan: **% pengguna baru aktif di hari pertama**. Target sementara ≥25%, lalu ≥40% (lihat `docs/riset-aktivasi-hari-pertama-patokan.md`).
- Bandingkan 2 minggu sebelum dan sesudah perbaikan 1.

## 5. Status
- Tahap 22 tetap **draft**: aturan fase 2 minta data nyata /hitung.
- Mockup: `docs/mockup-1825.html`.
