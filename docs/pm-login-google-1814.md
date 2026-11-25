# Login akun + Google (#1814)

## Intinya
- Login akun (username + password) sudah ada. Yang belum: tombol "Lanjut dengan Google".
- Rencana: tambah tombol Google di sheet Masuk/Daftar. Akun lama tetap jalan.
- Butuh langkah founder dulu: buat kunci Google, lalu deploy server manual.

## 1. Kondisi sekarang
- Sheet Masuk/Daftar di `cloud.js` (`openAccount`): username + password.
- Server `api/` punya `/login` dan `/signup`. Belum ada Google.
- Mode demo dan "Lanjut tanpa akun" sudah ada.

## 2. Yang dibangun
- Tombol "Lanjut dengan Google" di atas form, tab Masuk dan Daftar.
- Pemisah "atau" lalu form username seperti biasa.
- Alur: Google beri token → server cek token → buat/cari akun → login.
- Akun Google baru: nama panggilan diambil dari nama Google, bisa diubah di Profil.
- Username otomatis unik (mis. `rizka_4821`).

## 3. Aturan data
- Email sama dengan akun lama? Tawarkan tautkan, jangan buat akun ganda.
- Tabel pengguna dapat kolom `google_sub` (unik) dan `email`. Migrasi D1 manual.
- Simpan hanya sub, email, nama. Tanpa foto, tanpa akses Gmail.
- Pengguna lama tidak terdampak. IndexedDB tidak diubah.

## 4. Pesan error (Indonesia santai)
- Batal: "Nggak jadi masuk dengan Google. Coba lagi kapan aja."
- Gagal jaringan: "Google lagi susah dihubungi. Coba lagi ya."
- Gagal 2x: tawarkan "Lanjut tanpa akun".

## 5. Kriteria uji
- Tombol terlihat di iPhone Safari dan layar lebar; tinggi minimal 48px.
- Login Google pertama membuat akun; kedua kali masuk akun sama.
- Login username lama masih jalan; mode demo tidak berubah.
- Token palsu ditolak server (401).
- Naikkan `C` di `sw.js`.

## 6. Prasyarat founder
- Buat "OAuth Client ID" (Web) di Google Cloud Console. Daftarkan `https://rzk-labs.github.io`.
- Beri Client ID ke tim. Server cukup Client ID, tanpa secret.
- Deploy Worker dan migrasi D1 manual (aturan repo).

## 7. Di luar cakupan
- Apple login (wajib bila App Store minta; item terpisah).
- Hapus akun, ganti password.

Mockup: `docs/mockup-1814.html`.
