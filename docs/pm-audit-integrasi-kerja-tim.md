# Audit kerja tim & integrasi web HQ (#919)

## Intinya
- Mesin kerja jalan, tapi masukan berulang bikin developer mengulang perbaikan yang sama.
- Angka tidak konsisten (persen, bab, XP) muncul di 4 dari 7 masukan terbaru.
- Upgrade paling berdampak: satu daftar "bug berulang" yang dibaca semua peran, plus cek konsistensi.

## 1. Apa yang sudah baik
- Alur lengkap: PM → issue → developer → PR → QA → live (workflow `kepo-*`).
- Rem otomatis: kuota harian, berhenti bila 6 hasil menunggu founder.
- HQ punya login, tugas, hasil, dan baca dokumen.
- Masukan AI tiap 2 jam, dibaca PM.

## 2. Temuan (dari masukan 13-11-2026)
- **Bug berulang tak tertutup**: "Lanjut buku lain" patah dua baris dilaporkan Bima & Raka. Jumlah bab/bagian berubah dilaporkan Tari & Dina.
- **Angka tak sama antar layar**: Home 99% vs Baca 100%; Bagian 29/37 vs 36/45; XP 165 → 175.
- **Perbaikan #909 belum tuntas**: tanda "nyusul" hilang saat gabung kata ganda; tak ada penanda "menunggu arti" di daftar Kata. Dilaporkan Sinta & Ilham.
- **Akun uji gagal login** ("Nama uji tidak dikenal") → dua penguji tak bisa mencoba update.
- **Popup menimpa layar lain**: "Level 3!" menimpa lembar Tamat; berulang di Home & Profil.
- **Kata Korea di buku Jepang** (Raka): update #876 belum terasa.

## 3. Celah di proses tim
- Tak ada daftar bug terbuka bersama: tiap agen menemukan ulang masalah yang sama.
- Masukan tak dikelompokkan: laporan sama dihitung berkali-kali.
- Penguji tak bisa login akun uji → bukti verifikasi hilang. Tak ada alarm.
- Tak ada "cek selesai" untuk angka konsisten (satu sumber angka).
- PM membaca masukan mentah; tak ada ringkasan per tema.

## 4. Upgrade yang diusulkan (urut dampak)
1. **Paket bug berulang P0**: header Baca padat, tombol Home satu baris, popup level sekali, kartu Tamat satu aksi utama.
2. **Satu sumber angka**: persen buku, bagian/bab, XP dari satu fungsi; jumlah bagian dikunci saat impor.
3. **Tuntaskan #909**: "nyusul" tak hilang saat gabung; penanda "menunggu arti"; isi saat sinyal balik; kartu latihan tak kosong.
4. **Kesehatan akun uji**: cek login tiap putaran penguji; gagal → satu issue.
5. **Papan "Bug berulang" di HQ**: PM kelompokkan masukan per tema; tema ≥2 laporan jadi tugas P0.
6. **Ringkasan masukan harian** di HQ (3 tema teratas).

## 5. Ukuran berhasil
- Laporan ulang tema sama turun ke 0 dalam 2 hari setelah perbaikan live.
- Tidak ada selisih angka antar layar di uji penguji.
- Akun uji login berhasil tiap putaran.
- Hasil menunggu founder tak lebih dari 6.

## 6. Yang perlu founder
- Cek akun uji AI di server; deploy api bila perlu.
- Setujui hasil yang menunggu.
