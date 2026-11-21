# Spesifikasi: visual loading di Keepo HQ (#965)

## Intinya
- Saat data HQ dimuat, layar harus terlihat "sedang bekerja", bukan kosong.
- Kerangka abu (skeleton) sudah ada, tapi hanya muncul sekali di awal.
- Rencana: loading seragam di semua tab dan tombol, tanpa ubah alur data.

## 1. Kondisi sekarang
- `skel()` dipakai di Markas, Hasil, Papan, Peta, Dokumen.
- Tampil hanya bila data HQ belum ada (`!HQ`) atau pertama kali buka tab.
- Pindah tab saat data sudah ada: layar lama bertahan, tanpa tanda memuat.
- Tombol aksi (Setujui, Jalankan PM) berubah teks, tapi tanpa penanda seragam.
- Buka Detail tugas dan Dokumen: tidak ada kerangka sama sekali.

## 2. Yang dibangun
- Satu bilah tipis di atas halaman: bergerak saat ada panggilan ke server.
- Muncul bila panggilan > 300 ms, supaya tidak berkedip.
- Kerangka abu untuk Detail tugas dan buka Dokumen.
- Tombol saat proses: titik berdenyut (`.dot`) + teks, tombol nonaktif.
- Segar-ulang otomatis di belakang: tanpa kerangka, cukup bilah tipis.

## 3. Aturan tampilan
- Ikuti brand HQ v9; warna dari variabel yang sudah ada.
- `prefers-reduced-motion`: bilah dan kerangka diam, tanpa animasi.
- Gagal memuat: pesan merah + tombol "Coba lagi", bukan kerangka abadi.
- Jangan geser tata letak saat isi asli menggantikan kerangka.

## 4. Cara cek (bukti)
- HP 360 px: tiap tab tampil kerangka/bilah saat koneksi diperlambat.
- Koneksi lambat: tidak ada layar kosong lebih dari 300 ms.
- `node --check dev/src/index.js` lolos; hanya `dev/` yang diubah.
- Tidak mengubah panggilan data; selaras dengan #943 (klik cepat).
