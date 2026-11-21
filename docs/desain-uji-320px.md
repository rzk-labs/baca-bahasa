# Uji layar 320px (#573)

## Intinya
- Home, Kata, dan sheet arti dicek lewat baca CSS di lebar 320px.
- Kata asing kini punya bahasa & arah tulisan yang benar di sheet.
- Belum dicoba di HP asli; hanya pembacaan kode.

## 1. Masalah ditemukan
- Baris kata di sheet arti sesak: kata, speaker, tombol frasa berdesakan.
- Kata/kalimat di sheet arti tanpa penanda bahasa; font Jepang/Korea/Arab tak pasti.
- Tombol di sheet bisa di bawah 44px; padding sheet terlalu lebar di 320px.

## 2. Perbaikan
- Baris kata boleh turun baris; kata dapat ruang minimal 120px.
- Sheet arti kata/kalimat kini memakai penanda bahasa dan arah otomatis; font CJK dan Arab ditambah.
- Di bawah 360px: padding sheet, ukuran teks, kartu buku, ringkasan Kata dirapatkan; tombol sheet turun baris.

## 3. Yang belum
- Uji di iPhone SE asli dan Android kecil.
- Sheet penanda & Tamat hanya dicek lewat kode; belum dilihat langsung.
- Header e-reader tidak disentuh (sudah beres di #398).

## 4. Layar Tamat: kartu "Berikutnya" (#821)
- Kartu penuh lebar, min 44px; judul maks 2 baris, elipsis rapi.
- Baris bawah satu baris: "Bahasa · persen"; 0% tampil "Belum mulai".
- Warna ikut tema sheet, jadi aman di 4 tema baca.
- Judul CJK dan sangat panjang: tak patah per huruf, terpotong elipsis.
- Dicek lewat baca CSS di 320px; belum dilihat di HP asli.

## 5. Area ketuk min 44px (#834)
Cara: ::after transparan 44x44. Tampilan & tinggi bar tak berubah.
- Judul bab header baca (.rchap): 28px → 44px.
- Kontrol bar baca di <359px (.rrt/.rlis): lebar 38px → 44px.
- Ikon header Home di ≤340px: lebar 40px → 44px.
- Simpan di kartu kata (.wg-save): 32px → 44px.
- Kata di teks sumber (.src .sw): 32px → 44px.
- Tombol di kotak FYP (.fyp-b): 36px → 44px.
- Tombol Simpan saran (.pill-sm): 32px → 44px.
- Sudah 44px: hapus kata, Paham, Lewati, ‹ ›, tab bawah, bar baca.
- Dicek lewat baca CSS; belum dilihat di HP asli.

## 7. Ngomong & Pengaturan (#848)
Dicek lewat baca CSS di 320px & 4 tema; belum di HP asli.
- Pilihan "Pernah kuketuk"/"Semua tersimpan" sesak: teks kini boleh turun baris, tinggi 44px tetap.
- Pager kalimat: tombol "Kalimat berikutnya" boleh 2 baris; ikon ‹ tetap 44px.
- Tombol rekam di tema Gelap/Malam/Auto-gelap: ikon kini gelap di merah muda (kontras ≥4.5:1, sebelumnya putih).
- Tombol mikrofon tema Gelap kini terang (sebelumnya plum di atas plum).
- Skor, chip hasil, kata target: tak terpotong; chip boleh turun baris.
- Di ≤360px: kata target, tombol rekam, lingkaran skor, pilihan tema dirapatkan.
- Sheet sudah punya jarak aman iPhone di bawah; tak diubah.
- Penanda bahasa/Tamat: sudah beres di bagian 4.
