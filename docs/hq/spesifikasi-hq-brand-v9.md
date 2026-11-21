# Spesifikasi: Keepo HQ pakai brand v9 (#479)

## Intinya
- HQ masih bergaya lama: neon, Archivo kondensed, maskot. Itu sudah dilarang di brand v9.
- Ganti jadi Plum Noir, Biru Es, Wasabi; huruf Bricolage + Inter; tanpa maskot.
- Hanya `dev/src/page.html` yang berubah. Logika dan data HQ tidak disentuh.

## 1. Yang berubah (sumber: `BRAND.md` v9)
- Variabel warna: `--bg` Biru Es, `--ink` Plum Noir, `--card` Kertas, `--mut` Abu plum.
- Hapus `--lime`, `--lav`, `--pink`, `--coral`, `--mint`, `--blue`. Wasabi hanya untuk sorotan.
- Huruf judul: Bricolage Grotesque 800, tanpa huruf kapital semua, tanpa kondensed.
- Huruf isi: Inter 400-600 (ganti Plus Jakarta Sans).
- Logo `.brand`: kata "Keepo" dengan coretan Wasabi, bukan gambar maskot.
- `theme-color`, ikon tab: pakai Plum Noir dan ikon app baru.

## 2. Peta warna status dan peran
| Elemen | Dulu | Sekarang |
|---|---|---|
| Tab aktif, tombol utama | lime | Plum Noir + teks Kertas |
| Status antre / siap / live | biru / lime / mint | Biru Es / Wasabi / Jade |
| Status dikerjakan | kuning | Wasabi |
| Status gagal | coral | garis Plum + teks "Gagal" |
| Chip peran | warna beda tiap peran | Jade; beda lewat label teks |
| Ubin `.t-*` | warna terang | Kertas, Jade, atau Plum |

- Warna tidak jadi satu-satunya penanda: tiap status tetap punya teks.
- Mode gelap: Plum Noir sebagai latar, teks Kertas, Wasabi tetap sorotan.

## 3. Gaya dan tulisan
- Sudut kartu 16-20 px, tanpa bayangan berat, tombol berbentuk pil.
- Garis kartu 1,5 px, bukan 2 px tebal.
- Hormati `prefers-reduced-motion`; denyut titik "live" dimatikan.
- Teks HQ ikut nada v9: pendek, "kamu", tanpa "yuk/gas/dong".

## 4. Cara mengerjakan (developer)
- Edit `dev/src/page.html` saja: `:root`, tautan Google Fonts, CSS `.brand`, `.tile`, `.chip`, `.ring`.
- Cek kontras: teks isi minimal 4,5:1, dan sorotan Wasabi diberi teks Plum.
- Jalankan `node --check dev/src/index.js` bila `index.js` ikut berubah.
- Tes di lebar 320 px, 390 px, dan layar lebar; mode terang dan gelap.
- Deploy HQ manual oleh founder (Worker terpisah dari GitHub Pages).

## 5. Selesai bila
- Tidak ada warna neon atau huruf Archivo tersisa di HQ.
- Semua tab (Beranda, Antrean, Roadmap, Dokumen, Masukan) terbaca jelas di HP.
- Tema baca dokumen tetap netral dan ikut pengaturan baca HQ.

## 6. Di luar cakupan
- Aplikasi utama Keepo, `api/`, dan alur kerja agent.
- Perubahan isi atau urutan menu HQ.
