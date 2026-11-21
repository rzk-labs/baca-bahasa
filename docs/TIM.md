# Tim agent Keepo

Tim AI yang mengembangkan Keepo terus-menerus. Founder (Rizka) hanya menyetujui hasil.
Sumber kebenaran arah produk: `docs/roadmap.json` (33 tahap: 1-20 selesai, Fase 2 = 21-33; prioritas P0-P3, milestone). Pegangan Fase 2: `docs/pm-peta-fase-2.md`.

| Peran | Label | Tugasnya | Hasil |
|---|---|---|---|
| PM | `peran:pm` | Tiap hari memilih 1 tugas paling berdampak berikutnya dari roadmap; merapikan roadmap | Issue tugas baru; update `docs/roadmap.json` |
| Riset | `peran:riset` | Riset pasar, kompetitor, persona, naskah wawancara, rencana uji | Dokumen `docs/riset-*.md` |
| Desain | `peran:desain` | UX/UI, alur, microcopy, brand | Dokumen `docs/desain-*.md` dan/atau perubahan CSS/UI kecil |
| Developer | `peran:developer` | Mengubah kode aplikasi | Perubahan kode + PR |
| UX Architect | `peran:ux` | Struktur & alur layar, titik gesekan pengguna | `docs/desain-ux-*.md` |
| Creative UI Director | `peran:kreatif` | Arah visual & karakter tampilan (patuh BRAND.md) | `docs/desain-kreatif-*.md` |
| Interaction Designer | `peran:interaksi` | Tombol, gesture, animasi, kenyamanan sentuh | `docs/desain-interaksi-*.md` |
| Design System | `peran:sistem` | Konsistensi warna, tipografi, spacing, komponen | `docs/desain-sistem-*.md` |
| Accessibility UX | `peran:aksesibilitas` | Keterbacaan, kontras, fokus, beban kognitif | `docs/desain-aksesibilitas-*.md` |
| Tester AI (Tari, Bima) | otomatis | Tiap 2 jam & setelah update live: mencari bug: tampilan HP & keandalan | Komentar di issue "Masukan pengguna AI" |
| Pengguna AI (Nadia, Raka, Sinta, Ilham, Dina) | otomatis | Tiap 2 jam & setelah update live: mencoba app (Dina: Keepo HQ) | Komentar di issue "Masukan pengguna AI"; dibaca PM |
| Marketing | `peran:marketing` | Strategi Threads IG gaya asbun untuk cari tester & pengguna; draf posting siap salin (founder yang posting) | Dokumen `docs/marketing-*.md` |
| QA | otomatis | Memeriksa setiap PR: sintaks, risiko, kesesuaian dengan permintaan | Komentar "QA lolos" / "QA catatan" |

## Jalan sendiri (otomatis)
- Tiap 30 mnt `kepo-jaga` mengisi peran kosong lewat PM. Peran spesialis desain hanya dipilih bila ada pekerjaan di bidangnya.
- Penjaga macet: tugas "sedang dikerjakan" > 90 mnt tanpa kabar ditandai gagal, lalu dicoba ulang (maks 2x).
- Rem otomatis: 15 hasil menunggu founder, atau 5+ fitur menunggu developer (peran dokumen berhenti dulu).
- Founder hanya menyetujui hasil di Keepo HQ.

## Aturan
- Tidak ada yang menganggur: tiap 30 menit (dan tiap tugas selesai) peran yang kosong langsung diberi tugas oleh PM. Rem: berhenti bila 15 hasil menunggu founder; kuota harian: developer 100, desain 8, riset 6, pm 6, marketing 4, ux/kreatif/interaksi 4, sistem/aksesibilitas 3. Bila 5+ fitur siap dibangun, riset/desain/pm direm sampai developer mengejar.
- Seimbang: minimal 1 dari tiap 3 tugas PM adalah upgrade aplikasi (developer, atau desain yang mengubah app), fokus P0: kenyamanan membaca & bantuan memahami kata.
- Tugas yang butuh manusia (wawancara pengguna, rekrut beta) -> agent menyiapkan bahan (naskah, form, daftar pertanyaan), founder yang menjalankan.
- Semua hasil lewat PR. QA lolos -> otomatis live (antrean, satu per satu). QA ada catatan -> menunggu founder klik Setujui/Revisi/Tolak.
- Ikuti prinsip "Reader First, AI Second" dan prioritas P0 dulu.
- Hasil yang mengubah tampilan wajib menyertakan gambar mockup `docs/mockup/<nomor-issue>-<nama>.svg` (SVG/PNG lebar 360px). Keepo HQ menampilkannya di kartu Siap dicek, di atas tombol Setujui.
- Daftar semua dokumen per peran: `docs/INDEKS.md`.
