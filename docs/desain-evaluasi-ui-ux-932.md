# Evaluasi UI/UX Keepo (#932)

## Intinya
- Logo "Keepo" terpotong di HP: sudah diperbaiki (logo tak menyusut, pil XP disembunyikan ≤430px).
- Masalah terbesar sekarang: angka & istilah tidak konsisten antar layar, bikin pengguna tak percaya.
- Dua item developer P0 ditambahkan di roadmap (#88, #89).

## 1. Sudah dikerjakan di PR ini
- Logo tak lagi menyusut: `flex:0 0 auto`, `min-width:max-content`.
- Pil XP header disembunyikan di layar ≤430px. XP tetap ada di Home & Profil.
- Alasan: header HP memuat logo + streak + XP + akun + Masukan + Pengaturan. Terlalu sesak.

## 2. Temuan: Tamat & Profil (item #88)
- Bar bawah Baca bertuliskan "Selesai" di buku tamat. Ganti jadi "Baca ulang".
- Profil buku tamat masih "Ketuk satu kata" dan "Lagi nggak ada yang dibaca". Ganti ajakan mulai buku lain.
- Lembar Tamat menulis jumlah kata dua kali. Satu saja, dari sumber yang sama dengan catatan sesi.
- "Berikutnya" menyodorkan buku contoh. Dahulukan buku milik pengguna.
- Baris Selesai di Profil: nama pengarang dobel di judul. Tampilkan sekali.
- Lencana "Keepo Pertama" janggal dan terpotong kanan. Perpendek kalimat, beri lebar kartu.

## 3. Temuan: angka & istilah (item #89)
- Satu istilah: "Bagian" di Home dan Baca (bukan "Bab").
- Cincin target harian "30/30 XP" sesak. Tampilkan angka besar, "XP" kecil di bawah.
- XP header (214) beda dari kartu Level (14/100). Tulis "XP total" vs "XP level ini".
- Toast "Kata disimpan" muncul sebelum ketuk Simpan (offline). Munculkan hanya setelah tersimpan.
- Angka halaman mingguan masih dobel: sudah di item #84 (#919). Jangan dikerjakan ganda.

## 4. Sudah punya spesifikasi lain (tidak diulang)
- Header Baca 3 tombol: `docs/desain-header-baca-ringan.md` (#917).
- Satu sumber angka persen & XP naik sendiri: item #84.
- Sheet arti tak muncul di screenshot & `delete a.nyusul`: item #85.

## 5. Ukuran keberhasilan
- Di 360px, logo "Keepo" utuh di semua tab.
- Angka halaman, kata, XP sama di Home, Baca, Profil, dan Tamat.
- Buku tamat tidak pernah menampilkan "Selesai" atau "Ketuk satu kata".
