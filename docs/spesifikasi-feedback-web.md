# Spesifikasi: Fitur Feedback di Web (#28)

## Intinya
- Pengguna bisa kirim saran/bug dari dalam app dalam ≤3 ketukan.
- Versi 1 tanpa server baru: simpan di HP + kirim lewat tautan (WhatsApp/email).
- Server (Worker + D1) jadi tahap 2, butuh deploy manual dari founder.

## 1. Kenapa
- Sekarang masukan hanya dari tester AI. Belum ada suara pengguna nyata.
- Dibutuhkan untuk beta (tahap 19) dan wawancara (tahap 9).
- Prinsip Reader First: jangan ganggu saat membaca.

## 2. Tempat tombol
- Pengaturan: baris "Kirim masukan 💬".
- Tab Home: tautan kecil di bawah.
- Jangan tampil di e-reader. Tidak ada popup otomatis.

## 3. Isi form (satu layar)
- Jenis: 🐞 Ada yang rusak / 💡 Ide / ❤️ Suka.
- Kolom teks, maks 500 huruf, placeholder santai.
- Opsional: rating 1-5 bintang.
- Opsional: centang "Sertakan info HP" (browser, ukuran layar, versi app).
- Tidak ada isi buku, tidak ada nama, tanpa email wajib.

## 4. Pengiriman
- Tahap 1 (tanpa server): tombol "Kirim" membuka WhatsApp/email founder dengan teks terisi.
- Tahap 1: salinan disimpan di IndexedDB agar tidak hilang kalau batal.
- Tahap 2: endpoint `POST /feedback` di Worker, tabel D1 `feedback`, batas 5 kiriman per jam per perangkat.
- Tahap 2 butuh deploy manual (folder `api/` jangan diubah sebelum diminta).

## 5. Privasi
- Info HP hanya jika dicentang.
- Tulis jelas: "Yang kamu tulis dibaca tim Keepo."
- Jangan kirim isi cerita atau kata yang disimpan.

## 6. Tugas developer (tahap 1)
- Tambah modul form di `ui.js`, gaya di `style.css` ikut BRAND.md (pil gelap, krem).
- Target sentuh ≥44px, muat di layar 320px.
- Naikkan versi `C` di `sw.js`.
- Cek `node --check` untuk semua JS yang diubah.
- Data lama jangan rusak; salinan feedback pakai penyimpanan baru yang aman.

## 7. Ukuran sukses
- ≥30% penguji beta pernah mengirim 1 masukan.
- Form selesai ≤30 detik.
- Nol keluhan "form mengganggu saat membaca".

## 8. Keputusan untuk founder
- Kontak tujuan tahap 1: WhatsApp atau email? Nomor/alamatnya apa?
- Setuju lanjut ke tahap 2 (server) setelah beta mulai?
