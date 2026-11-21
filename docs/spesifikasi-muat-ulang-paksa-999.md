# Spesifikasi #999: Tombol "Muat ulang paksa"

## Intinya
- Sekarang tidak ada tombol muat ulang paksa di Keepo. Hanya toast saat macet.
- Usul: satu tombol "Muat ulang versi terbaru" di Pengaturan, grup baru "Aplikasi".
- Tombol hapus cache aplikasi lama, bukan data kamu. Buku, kata, XP aman.

## 1. Masalah
- App PWA memegang cache lama. Pengguna sulit dapat versi baru.
- Di iPhone tidak ada Ctrl+Shift+R. Pengguna tak punya jalan keluar.
- Satu-satunya "Muat ulang" ada di toast macet (ui.js), dan hilang sendiri.

## 2. Posisi tombol
- Pengaturan, grup baru "Aplikasi", paling bawah (setelah Aturan & Hak cipta).
- Di atasnya satu baris: "Versi app: vXX" (APP_VER) agar bisa dicek.
- Toast macet tetap bertombol "Muat ulang", memanggil fungsi yang sama.

## 3. Perilaku
- Ketuk → dialog: "Muat ulang versi terbaru? Buku & katamu tetap aman."
- Tombol: "Muat ulang" dan "Batal".
- Langkah: unregister service worker, hapus semua cache `kepo-*`, `location.reload()`.
- JANGAN sentuh IndexedDB, localStorage, atau login akun.
- Offline: tampilkan "Butuh internet untuk ambil versi baru"; cache jangan dihapus.

## 4. Kriteria selesai
- Tombol terlihat di Pengaturan HP 390px, target sentuh minimal 44px.
- Setelah dipakai, baris "Versi app" naik ke versi terbaru.
- Data buku, kata, XP tidak berubah.
- Offline: cache tidak terhapus, ada pesan jelas.
- Versi C di sw.js dinaikkan.
