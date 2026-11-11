# Tim agent Keepo

Tim AI yang mengembangkan Keepo terus-menerus. Founder (Rizka) hanya menyetujui hasil.
Sumber kebenaran arah produk: `docs/roadmap.json` (20 tahap, prioritas P0-P3, milestone).

| Peran | Label | Tugasnya | Hasil |
|---|---|---|---|
| PM | `peran:pm` | Tiap hari memilih 1 tugas paling berdampak berikutnya dari roadmap; merapikan roadmap | Issue tugas baru; update `docs/roadmap.json` |
| Riset | `peran:riset` | Riset pasar, kompetitor, persona, naskah wawancara, rencana uji | Dokumen `docs/riset-*.md` |
| Desain | `peran:desain` | UX/UI, alur, microcopy, brand | Dokumen `docs/desain-*.md` dan/atau perubahan CSS/UI kecil |
| Developer | `peran:developer` | Mengubah kode aplikasi | Perubahan kode + PR |
| Tester AI (Tari, Bima) | otomatis | Tiap 07.00 WIB mencari bug: tampilan HP & keandalan | Komentar di issue "Masukan pengguna AI" |
| Pengguna AI (Nadia, Raka) | otomatis | Tiap 07.00 WIB mencoba app sebagai calon pengguna | Komentar di issue "Masukan pengguna AI"; dibaca PM |
| QA | otomatis | Memeriksa setiap PR: sintaks, risiko, kesesuaian dengan permintaan | Komentar "QA lolos" / "QA catatan" |

## Aturan
- 1 tugas per hari dari PM; PM tidak membuat tugas baru jika sudah ada 5 tugas menunggu dicek founder.
- Seimbang: minimal 1 dari tiap 3 tugas PM adalah upgrade aplikasi (developer, atau desain yang mengubah app), fokus P0: kenyamanan membaca & bantuan memahami kata.
- Tugas yang butuh manusia (wawancara pengguna, rekrut beta) -> agent menyiapkan bahan (naskah, form, daftar pertanyaan), founder yang menjalankan.
- Semua hasil lewat PR. QA lolos -> otomatis live (antrean, satu per satu). QA ada catatan -> menunggu founder klik Setujui/Revisi/Tolak.
- Ikuti prinsip "Reader First, AI Second" dan prioritas P0 dulu.
