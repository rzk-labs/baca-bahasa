# Tim agent Keepo

Tim AI yang mengembangkan Keepo terus-menerus. Founder (Rizka) hanya menyetujui hasil.
Sumber kebenaran arah produk: `docs/roadmap.json` (20 tahap, prioritas P0-P3, milestone).

| Peran | Label | Tugasnya | Hasil |
|---|---|---|---|
| PM | `peran:pm` | Tiap hari memilih 1 tugas paling berdampak berikutnya dari roadmap; merapikan roadmap | Issue tugas baru; update `docs/roadmap.json` |
| Riset | `peran:riset` | Riset pasar, kompetitor, persona, naskah wawancara, rencana uji | Dokumen `docs/riset-*.md` |
| Desain | `peran:desain` | UX/UI, alur, microcopy, brand | Dokumen `docs/desain-*.md` dan/atau perubahan CSS/UI kecil |
| Developer | `peran:developer` | Mengubah kode aplikasi | Perubahan kode + PR |
| Tester AI (Tari, Bima) | otomatis | Tiap 2 jam & setelah update live: mencari bug: tampilan HP & keandalan | Komentar di issue "Masukan pengguna AI" |
| Pengguna AI (Nadia, Raka, Dina) | otomatis | Tiap 2 jam & setelah update live: mencoba app (Dina: Keepo HQ) | Komentar di issue "Masukan pengguna AI"; dibaca PM |
| Marketing | `peran:marketing` | Strategi Threads IG gaya asbun untuk cari tester & pengguna; draf posting siap salin (founder yang posting) | Dokumen `docs/marketing-*.md` |
| QA | otomatis | Memeriksa setiap PR: sintaks, risiko, kesesuaian dengan permintaan | Komentar "QA lolos" / "QA catatan" |

## Aturan
- Tidak ada yang menganggur: tiap 30 menit (dan tiap tugas selesai) peran yang kosong langsung diberi tugas oleh PM. Rem: berhenti bila 6 hasil menunggu founder; kuota harian: developer 64, desain 8, riset 6, pm 6, marketing 4. Bila 5+ fitur siap dibangun, riset/desain/pm direm sampai developer mengejar.
- Seimbang: minimal 1 dari tiap 3 tugas PM adalah upgrade aplikasi (developer, atau desain yang mengubah app), fokus P0: kenyamanan membaca & bantuan memahami kata.
- Tugas yang butuh manusia (wawancara pengguna, rekrut beta) -> agent menyiapkan bahan (naskah, form, daftar pertanyaan), founder yang menjalankan.
- Semua hasil lewat PR. QA lolos -> otomatis live (antrean, satu per satu). QA ada catatan -> menunggu founder klik Setujui/Revisi/Tolak.
- Ikuti prinsip "Reader First, AI Second" dan prioritas P0 dulu.
- Daftar semua dokumen per peran: `docs/INDEKS.md`.
