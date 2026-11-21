# Desain: satu satuan nomor di e-reader (#1285)

## Intinya
- Semua nomor di e-reader sekarang pakai "halaman".
- Chip "Lanjut dari halaman 14" dan bilah bawah memakai angka yang sama.
- "Bagian x dari y" dihapus dari bilah, Beranda, dan toast.

## 1. Keputusan
- Bilah bawah: `Hal. 14/20` (layar sempit), `Halaman 14 dari 20` (label baca-layar).
- Semua angka mulai dari 1 (chip, bilah, label aksesibilitas).
- Nomor halaman dihitung per bab, sama seperti chip.
- Toast akhir dengar: "Selesai didengar" (bukan "Bagian selesai").
- Beranda tak lagi menulis "Bagian x dari y"; cukup persen + sisa menit.
- "Bab"/"Bagian" tetap hanya di daftar isi sebagai nama.
