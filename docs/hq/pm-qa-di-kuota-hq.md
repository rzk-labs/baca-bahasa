# PM #1228: QA di kartu Kuota & performa (Keepo HQ)

## Intinya
- Founder lihat Marketing tanpa QA, dan tidak ada total QA. Terasa hilang.
- Sebabnya: baris QA hanya tampil bila peran punya tugas ber-QA. Marketing belum.
- Perbaikan kecil di `dev/`: QA selalu tampil di tiap peran, plus satu kartu total QA.

## 1. Temuan
- Di `dev/src/page.html`, fungsi `kuotaPerforma`: teks QA bersyarat `qa.length?...`.
- Marketing: 0 tugas ber-QA, jadi tulisan QA hilang.
- Kartu atas (Kuota harian, Dimulai, Gagal) tidak memuat angka QA sama sekali.
- Developer 19/32, Desain 1/5, PM 12/18: sisanya "catatan" atau belum diperiksa. Tidak terbaca.

## 2. Usulan
- Tiap baris peran selalu menulis QA: `QA lolos 19/32 · 3 catatan` atau `QA belum ada`.
- Tambah kartu "QA lolos" di kartu atas: total lolos/total diperiksa + jumlah catatan.
- Kartu QA memakai warna mint bila tak ada catatan, sun bila ada catatan.
- Jangan ubah rumus kuota harian.

## 3. Aturan hitung
- Diperiksa = tugas berlabel `qa-lolos` atau `qa-catatan` (field `t.qa`).
- Lolos = `t.qa==='lolos'`; catatan = `t.qa==='catatan'`.
- Tanpa tugas diperiksa: tulis "QA belum ada", bukan 0/0.

## 4. Syarat selesai
- Marketing menampilkan "QA belum ada".
- Kartu QA tampil dan angkanya cocok dengan jumlah baris peran.
- `node --check dev/src/index.js` lolos; tampilan HP 390px tidak meluber.

Mockup: `docs/mockup-1228.html`. Backlog: #133.
