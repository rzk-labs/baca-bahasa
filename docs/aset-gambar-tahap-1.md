# Aset gambar tahap 1 — Keepo (dibuat di ChatGPT)

Dasar: `BRAND.md` v9 (tanpa maskot, tanpa neon, halaman baca tetap polos). Tidak ada riset/brand baru.
Teks, judul, tombol = kode. Gambar = ilustrasi saja, tanpa tulisan.

## 1. Audit singkat (screenshot HP 390 px, 14 Nov 2026)

| Layar | Temuan | Jenis perbaikan |
|---|---|---|
| Home pengguna baru | Hanya teks + 3 kotak langkah. Ikon centang kecil di samping "Halo, aku KEEPO!" tidak bermakna. Layar pertama pengunjung launch terasa kosong. | **Gambar** (A1) |
| Link dibagikan (Threads/WA) | `og:image` = `icon-512.png` persegi → terpotong di pratinjau lebar. Ini wajah Keepo saat launch. | **Gambar** (A3) |
| Kata / Ngomong / Baca kosong | Lingkaran biru + ikon garis 72 px. Rapi, tapi sama di semua layar, tanpa suasana buku. | **Gambar** (A2) |
| Tab bar | Label "Ngomong" meluber keluar pil aktif. | Layout (CSS) |
| Teks sapaan | "Halo, aku KEEPO!" = suara tokoh/maskot; brand v9 menolaknya. | Microcopy (1 baris) |
| Sampul buku, tile bahasa GB/KR/JP, kartu stat | Sudah bersih dan sesuai brand. | Tidak perlu gambar |
| Halaman baca | Sengaja polos. | **Jangan diberi gambar** |

Ditunda ke tahap 2 (bukan 3 teratas): ilustrasi tantangan Ngomong, kartu "Tamat buku", sampul buku contoh.

## 2. Tiga aset tahap 1

| # | Aset | File | Dampak |
|---|---|---|---|
| A1 | Hero Home pengguna baru | `hero-home.webp` | Kesan pertama + jelaskan "buku + ketuk kata" tanpa teks |
| A2 | Ilustrasi layar kosong | `kosong-rak.webp` | Dipakai ulang di 4 layar kosong |
| A3 | Pratinjau link/bagikan | `og-keepo.jpg` | Tampilan link saat launch |

### A1 — Hero Home
- **Dipakai:** Home, pengguna belum punya buku. Kartu di antara judul "Kepoin bahasa baru." dan 3 kotak langkah. Gantikan ikon centang + sapaan.
- **Tujuan/suasana:** tenang, jernih, ingin tahu. Menunjukkan: buku terbuka, satu kata disorot stabilo, lembar arti muncul.
- **Ukuran:** 4:3, **1600×1200** (tampil ±342×257 px di HP). Hasil akhir WebP 960 px lebar (≤90 KB) + 640 px.
- **Latar:** penuh, Biru Es `#D7EFFF` (sudut membulat 20 px dibuat CSS).
- **Area kosong:** 22% teratas dan 6% tepi kiri/kanan datar tanpa objek. Semua objek di pita tengah 25–92% tinggi.
- **HP:** terbaca di 342 px lebar; sedikit objek besar, tanpa detail kecil. Aman dipotong ke 16:10.

### A2 — Ilustrasi layar kosong
- **Dipakai:** Kata (Kartu, Tersimpan), Ngomong, Baca, "Belum ada cerita". Menggantikan lingkaran ikon 72 px; tampil **140 px**.
- **Tujuan/suasana:** "belum ada isinya, tapi siap diisi". Hangat, bukan sedih.
- **Ukuran:** 1:1, **1024×1024**. Hasil akhir WebP alfa 320 px (≤25 KB).
- **Latar:** **transparan** (di ChatGPT minta putih polos `#FFFFFF`, lalu dipotong dengan flood-fill seperti maskot dulu).
- **Area kosong:** margin 10% semua sisi; tanpa bayangan jatuh atau lantai.
- **HP:** harus jelas di 140 px: 3–4 bentuk besar saja.

### A3 — Pratinjau link
- **Dipakai:** `og:image` + `twitter:image` di `index.html`; juga bahan posting launch.
- **Tujuan/suasana:** sama dengan A1, versi lebar. Judul/tagline ditambah lewat kode setelah gambar jadi.
- **Ukuran:** **1200×630** (1,91:1). JPG ≤300 KB (PNG 453 KB terlalu besar untuk WhatsApp; JPG 85 KB dipakai).
- **Latar:** penuh, Biru Es `#D7EFFF`.
- **Area kosong:** **separuh kiri (±48%) datar kosong** untuk logo "Keepo" + tagline. Objek hanya di separuh kanan, jauh dari tepi (aman untuk potongan persegi 1:1).
- **HP:** pratinjau tampil kecil: satu objek utama besar.

## 3. Aturan gaya bersama (sudah dimasukkan ke tiap prompt)
- Ilustrasi editorial datar, bentuk bulat-geometris, **garis tepi Plum `#351E28` tebal seragam**, isi warna datar, butiran kertas sangat halus.
- Palet: Plum Noir `#351E28`, Biru Es `#D7EFFF`, Biru lembut `#C3E1F4`, Jade `#AEB8A0`, Kertas `#FAF7F0`. **Wasabi `#E9F056` hanya untuk goresan stabilo.**
- Tanpa tokoh, wajah, tangan, maskot, neon, gradien mencolok, 3D mengkilap, tulisan/huruf/angka.

## 4. Prompt ChatGPT (salin utuh; satu gambar per prompt; chat baru agar tak jadi kolase)

### A1 — `hero-home.webp`
```
Create ONE single illustration, landscape 4:3 (1600x1200 px). Not a collage, not a moodboard, not an app screenshot, not a mockup.

Scene: an open paperback book seen from a gentle three-quarter top-down angle, centered horizontally and sitting in the lower-middle of the frame. The two pages are cream (#FAF7F0). Each page carries 6-7 rows of abstract text drawn as rounded dark-plum bars (#351E28) of varied lengths, like blurred sentences, NOT real letters. On the right page, ONE short bar (a "word") is covered by a bold highlighter swipe in wasabi yellow-green (#E9F056), slightly uneven like a real marker stroke; a second, smaller wasabi swipe sits on the left page. A small rounded cream (#FAF7F0) card rises from the bottom edge of the right page, tilted about 3 degrees, like a tiny meaning sheet: it contains 3 short plum bars and one tiny wasabi swipe, no real text. A fat chunky highlighter marker (plum body #351E28, wasabi tip #E9F056) lies diagonally at the lower-left of the book.

Style: calm editorial flat vector illustration, rounded geometric shapes, uniform thick plum (#351E28) outlines, flat color fills, very subtle paper grain, no gradients, no glossy 3D, no realistic shadows (at most a flat soft-blue #C3E1F4 shape under the book for depth).

Colors (use only these): background solid ice blue #D7EFFF; plum #351E28; cream #FAF7F0; soft blue #C3E1F4; sage #AEB8A0 (book cover edge and pages' thickness); wasabi #E9F056 ONLY for highlighter strokes and the marker tip.

Composition and empty space: the top 22% of the canvas and the left and right 6% margins must be completely empty flat ice blue (#D7EFFF). All objects stay inside the vertical band between 25% and 92% of the height, so the image can be cropped to 16:10 without losing anything. Large simple shapes, readable when shrunk to 340 px wide.

Strictly avoid: any readable letters, words, numbers or logos; people, faces, hands, characters or mascots; neon colors; orange; saturated green; pure white or pure black fills; gradients; photorealism; lens effects; borders or frames around the image.
```

### A2 — `kosong-rak.webp`
```
Create ONE single illustration, square 1:1 (1024x1024 px), on a perfectly flat pure white (#FFFFFF) background with nothing else in the background: no shadow on the floor, no ground plane, no glow, no gradient. Not a collage, not a moodboard, not a mockup.

Scene: a short wooden bookshelf plank seen straight from the front: one thick rounded horizontal shelf board, sage (#AEB8A0) with plum outline. On it stand three closed books of different heights leaning slightly against each other on the left half: one ice blue (#C3E1F4), one cream (#FAF7F0), one sage-light (#CBD4BF); each has a simple plum spine band, no title text. The right half of the shelf is an EMPTY gap, marked with a dashed plum outline of a book-shaped rectangle (invites "add a book here"). In the gap, a chunky highlighter marker (plum body #351E28, wasabi tip #E9F056) leans against the last book. One bold wasabi (#E9F056) highlighter swipe crosses the spine band of the cream book.

Style: calm editorial flat vector illustration, rounded geometric shapes, uniform thick plum (#351E28) outlines, flat color fills, very subtle paper grain, no gradients, no glossy 3D, no cast shadows.

Colors (use only these): plum #351E28; ice blue #D7EFFF and soft blue #C3E1F4; sage #AEB8A0 and light sage #CBD4BF; cream #FAF7F0; wasabi #E9F056 ONLY for highlighter strokes and the marker tip.

Composition: the whole group is centered with at least 10% empty margin on every side; nothing touches the edges. Only 3-4 large simple shapes, so it stays clear when shrunk to 140 px. Every shape has a closed plum outline so the background can be removed cleanly.

Strictly avoid: any letters, words, numbers or logos; people, faces, hands, characters or mascots; sad or crying expressions; neon colors; orange; saturated green; gradients; photorealism; a floor, table or room; frames or borders.
```

### A3 — `og-keepo.jpg`
```
Create ONE single illustration, landscape 1200x630 px (aspect 1.91:1). Not a collage, not a moodboard, not an app screenshot, not a mockup.

Scene: an open paperback book seen from a gentle three-quarter top-down angle, placed on the RIGHT half of the canvas (its center at about 74% of the width, 55% of the height). Cream pages (#FAF7F0) with 5-6 rows of abstract text drawn as rounded dark-plum bars (#351E28) of varied lengths, NOT real letters. One short bar on the right page is covered by a bold, slightly uneven highlighter swipe in wasabi (#E9F056); a second smaller swipe on the left page. A small tilted rounded cream card rises from the bottom of the right page like a tiny meaning sheet (3 short plum bars, one tiny wasabi swipe, no text). A chunky highlighter marker (plum body #351E28, wasabi tip #E9F056) lies diagonally at the lower-left of the book.

Style: calm editorial flat vector illustration, rounded geometric shapes, uniform thick plum (#351E28) outlines, flat color fills, very subtle paper grain, no gradients, no glossy 3D, no realistic shadows (at most a flat soft-blue #C3E1F4 shape under the book).

Colors (use only these): background solid ice blue #D7EFFF; plum #351E28; cream #FAF7F0; soft blue #C3E1F4; sage #AEB8A0 (book edge); wasabi #E9F056 ONLY for highlighter strokes and the marker tip.

Composition and empty space: the LEFT 48% of the canvas must be completely empty flat ice blue (#D7EFFF) with no objects at all (a logo and tagline will be added later in code). Keep every object at least 6% away from the top, bottom and right edges. One big main object, readable when shown as a small link preview.

Strictly avoid: any readable letters, words, numbers or logos; people, faces, hands, characters or mascots; neon colors; orange; saturated green; pure white or pure black fills; gradients; photorealism; borders or frames.
```

## 5. Setelah file jadi (arahan pasang)
1. Taruh file asli di `_aset/` (diabaikan git). Kirim ke Claude; jangan ditimpa/diedit.
2. **A2:** hapus latar putih (flood-fill dari tepi) → WebP alfa 320 px. **A1:** WebP 960/640. **A3:** crop persis 1200×630, tambah logo "Keepo" + tagline lewat kode (Bricolage 800, Plum) di separuh kiri, ekspor JPG.
3. Pasang ke `img/hero-home.webp`, `img/kosong-rak.webp`, `og-keepo.jpg`. Ganti `spot()` di `emptyState` untuk A2; hero A1 di Home baru; `og:image` + `twitter:image` pakai URL penuh. Naikkan `C` di `sw.js`.
4. Cek di HP 390 px dan 320 px: tidak terpotong, teks tetap terbaca, tidak ada gambar patah (`naturalWidth>0`), tema Malam tidak bermasalah (A1 punya kartu Biru Es sendiri).
5. Cek live: file dimuat (status 200), tampil di Home & layar kosong; pratinjau link lewat debugger Facebook/WhatsApp.
6. Perbaikan non-gambar yang ikut: label tab "Ngomong" tak meluber; sapaan "Halo, aku KEEPO!" → nada v9.

## 6. Status pasang (15 Nov 2026)
- Gambar dibuat di ChatGPT (3 chat terpisah), disimpan sebagai tangkapan layar di `_aset/` (diabaikan git).
- A1 `img/hero-home.webp` (+640), A2 `img/kosong-rak.webp`, A3 `og-keepo.jpg` terpasang. SW `kepo-v370`.
- Layar kosong Kata/Ngomong/Baca/Susah diucap memakai A2; kartu "sesi beres" tetap ikon centang.
