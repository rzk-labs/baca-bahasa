# Spesifikasi: Pengaturan keterbacaan Keepo HQ (Tugas #9)

**Masalah:** web Keepo HQ (`dev/src/page.html`, rute `/hq`) dirasa belum enak dibaca. Founder minta ada "settingan" supaya tampilan bisa disesuaikan.
**Prinsip:** nyaman dibaca dulu (P0). Semua pengaturan disimpan di perangkat (localStorage), tanpa akun.

## Pengaturan yang diusulkan
| Pengaturan | Pilihan | Bawaan | Catatan teknis |
|---|---|---|---|
| Ukuran teks | Kecil / Sedang / Besar / Besar banget (14/15/17/19 px) | Sedang | Ubah font-size dasar `body` (kini 15px); judul ikut skala |
| Tema | Otomatis / Terang / Gelap | Otomatis | Sudah ada CSS `data-theme`; tinggal tombol pemilih |
| Kerapatan | Lega / Rapat | Lega | Atur padding `.tile`, jarak antar kartu |
| Font isi | Plus Jakarta Sans / Sistem | Plus Jakarta Sans | Font sistem lebih ringan untuk teks panjang |
| Judul huruf kapital | Hidup / Mati | Hidup | Judul Archivo kapital padat sulit dibaca kalau panjang; "Mati" memakai huruf biasa |
| Kontras tinggi | Mati / Hidup | Mati | Warna `--mut` lebih gelap, border lebih tebal |
| Kurangi animasi | Mati / Hidup | Ikuti sistem | Hentikan animasi pulse |

## Penempatan
- Ikon ⚙️ "Pengaturan" di sidebar (layar lebar) dan tab bar (HP), membuka panel/sheet.
- Ada pratinjau teks contoh dan tombol "Kembalikan ke bawaan".

## Dugaan penyebab "tidak enak dibaca" (cek dulu)
1. Teks 15px dan label 12-13px terlalu kecil di HP.
2. Teks abu `--mut` (#7a6a6b) di atas krem kurang kontras.
3. Judul Archivo kapital + line-height .95 sulit dibaca untuk judul panjang (nama dokumen/tugas).
4. Isi dokumen/Markdown mungkin tanpa lebar baris nyaman (±70 karakter) dan jarak paragraf.

## Kriteria selesai
- Setiap pengaturan langsung berlaku tanpa muat ulang dan bertahan setelah ditutup.
- Layar HP (iPhone Safari) dan layar lebar tetap rapi pada ukuran "Besar banget".
- Kontras teks isi minimal 4.5:1 pada tema terang dan gelap.

## Langkah berikut
Dikerjakan agent Developer pada tugas terpisah (`dev/` tidak diubah oleh PM). Mulai dari ukuran teks + tema + kontras (paling berdampak), sisanya menyusul.
