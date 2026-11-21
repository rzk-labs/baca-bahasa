# Evaluasi end to end Keepo (#983)

## Intinya
- Alur dari buku baru sampai tamat masih buntu di akhir: tanda tamat, XP, dan saran buku berikutnya.
- Angka dan istilah masih beda antar layar (XP, bab/bagian, lencana). Ini keluhan terbanyak.
- Satu paket perbaikan developer P0 ditambahkan di roadmap (#97). Yang sudah selesai tidak diulang.

## 1. Cara evaluasi
- Alur diikuti: Home → tambah buku → Baca → ketuk kata → tamat → Profil.
- Sumber: masukan Tari, Bima, Nadia, Raka, Sinta, Ilham, Dina (14-11-2026) + cek kode `ui.js`.
- Temuan yang sudah dikerjakan PR lain (#962, #973, #978, #958) dicoret.

## 2. Sudah beres (jangan dikerjakan ganda)
- Header Baca HP: tombol tak mepet, "Dengar kembali" terlihat (#962).
- Arti ganda di sheet arti kata (#978) dan ruang kosong bawah teks (#977).
- XP satu angka Home = Profil (#958). Penanda "N kata siap diulang" (#973).

## 3. Temuan masih terbuka, urut dampak
### A. Akhir buku (paling sering dikeluhkan)
- Sheet Tamat tulis "Belum ada kata baru" tapi tombol utama "Lihat kata". Pilih satu pesan.
- Sheet Tamat tulis "12 bab", header tulis "Bagian". Pakai "Bagian" saja.
- "+30 XP hari ini" di sheet beda dari "20 XP" di Home. Ambil dari satu sumber.
- Bar bawah buku tamat: "Selesai" abu-abu pucat. Ganti "Buku lain".
- Tombol "Baca ulang" ganda di halaman terakhir. Sisakan satu, dengan konfirmasi singkat.
- Kartu "Selesai" di Home: beri ajakan buku berikutnya / tambah buku, bukan cuma "Baca ulang".

### B. Profil
- Teks "ketuk Koleksi di Home" salah: judul bagian Home itu "Koleksi kamu"/tombol "Buku lain". Samakan.
- "Mulai buku lain yuk" muncul dua kali. Gabung jadi satu.
- Kalimat "257 XP total dari perangkat lain, halaman" putus. Cukup "257 XP total".

### C. Baca
- Bar bawah "±40 mnt" tanpa keterangan. Tulis "±40 mnt tersisa".
- Belum ada petunjuk "ketuk kata untuk artinya" di halaman pertama. Tambah sekali saja.
- Halaman dibuka di tengah kalimat. Mulai di awal kalimat, atau beri tanda lanjutan.
- Tanda "–" nyasar di atas teks dan lingkaran oval menimpa huruf di kata. Pakai stabilo tipis.

### D. Home & lencana
- "Kutu Buku" (20 halaman) terkunci padahal Home bilang 46. Hitung dari sumber yang sama.
- Kartu "Minggu ini": tombol × polos. Beri label "Sembunyikan" + keterangan "balik lagi minggu depan".
- Kartu Level: "37/100 XP level ini" patah dua baris. Beri lebar tetap.
- Persen buku di Home sempat basi ("1%" lalu "7%"). Tampilkan setelah data siap.

### E. Toast Baca ulang
- Toast "Mulai dari awal" cuma 7 detik dan muncul telat. Panjangkan, munculkan seketika.
- Tambah satu kalimat: tanda tamat dan XP tamat tidak diulang.

## 4. Di luar jangkauan evaluasi ini
- Login akun uji gagal ("Nama uji tidak dikenal"): Sinta & Ilham tak bisa uji langsung.
- Butuh perbaikan di jalur uji, bukan di app. Dicatat untuk tim Keepo HQ.
- Buku Jepang tapi kata "Korea" di catatan sesi: perlu dicek dulu, belum terbukti bug.

## 5. Ukuran keberhasilan
- Buku tamat: satu pesan kata baru, satu angka XP, tanpa "Selesai" abu-abu.
- Kata "Bagian" dan "Koleksi/Buku lain" sama di semua layar.
- Lencana halaman cocok dengan angka halaman di Home.

## 6. Mockup
- Lihat `docs/mockup-983.html` (Sebelum / Sesudah layar Tamat, bar bawah, Profil).
