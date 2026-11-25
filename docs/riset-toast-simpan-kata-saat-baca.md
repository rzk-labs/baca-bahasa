# Riset: Lama toast "simpan kata" & Urungkan saat baca (#1818)

## Intinya
- Simpan kata lewat ketuk kata di reader sudah 3,2 detik. Yang 6 detik: daftar "Kata untuk disimpan" (baris 1628 & 1776).
- Rekomendasi: simpan kata 4 detik (bukan 3), tetap ada Urungkan. Hapus & tandai paham 5 detik.
- Bukti publik: tidak ada angka resmi. Hanya prinsip: toast beraksi lebih lama dari toast biasa.

## 1. Durasi toast sekarang
Aturan umum (`toastMs`): pesan pendek 3,2 dtk; pesan >40 huruf minimal 4 dtk.

| Aksi | Di mana | Durasi | Urungkan |
|---|---|---|---|
| Simpan kata (ketuk kata di reader) | ui.js 3068 | 3,2 dtk | tidak |
| Simpan kata (kartu arti) | ui.js 3249, 3620 | 3,2 dtk | tidak |
| Simpan kata dari daftar rekap sesi | ui.js 1628 | 6 dtk | ya |
| Simpan kata dari daftar intip | ui.js 1776 | 6 dtk | ya |
| Kata dianggap paham (garis dihapus) | ui.js 1554 | 6 dtk | ya |
| Tandai kenal / hafal / nama / hapus kata | ui.js 3024-3051 | 6 dtk | ya |
| Tandai banyak kata kenal | ui.js 3112 | 6 dtk | ya |
| Hapus penanda halaman | ui.js 2512, 2591 | 6 dtk | ya |
| Hapus cerita | ui.js 1421 | 5 dtk (sama dgn penghapusan nyata) | ya |
| Baca ulang buku | ui.js 1644 | 6 dtk | ya |
| Info biasa (arti, offline, dll) | banyak | 3,2-5 dtk | tidak |

- Catatan: toast simpan kata saat ketuk kata di reader **tidak** punya Urungkan. Kata bisa dihapus di tab Kata.
- Posisi: di reader toast sudah diturunkan (`body.reading #toast`, style.css 467). Tidak menutup teks tengah.

## 2. Temuan bukti
- Material Design: toast dengan aksi (mis. Urungkan) boleh "sedikit lebih lama" dari toast biasa. Tidak ada angka. [Mirror Firefox Acorn](https://acorn.firefox.com/latest/mobile/components/snackbar/android-pNOUdFi9), [Material 2](https://m2.material.io/design/communication/confirmation-acknowledgement.html)
- Material menyarankan Urungkan agar pengguna bisa membatalkan pilihan. Tombol Tutup tak perlu. [Material Snackbars](https://material.io/components/snackbars)
- Angular Material: toast dengan aksi sebaiknya tanpa batas waktu (untuk pembaca layar). [Angular](https://material.angular.io/components/snack-bar)
- Android Compose: toast berisi aksi bawaannya tanpa batas waktu. [Android](https://developer.android.com/develop/ui/compose/components/snackbar)
- WCAG 2.2.1 (batas waktu): toast yang hanya memberi tahu umumnya aman. Yang butuh aksi diperdebatkan, belum ada kesepakatan. [Diskusi W3C](https://lists.w3.org/Archives/Public/w3c-wai-ig/2025AprJun/0066.html), [Isu WCAG #1814](https://github.com/w3c/wcag/issues/1814)
- Scott O'Hara: tombol di dalam toast sulit dijangkau pembaca layar. Beri jalur lain (riwayat). [Artikel](https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html)
- Kindle Vocabulary Builder: kata masuk otomatis saat dicari. Tak ada Urungkan, hanya hapus manual. Keluhan: daftar membengkak. [Nerdschalk](https://nerdschalk.com/how-to-enable-and-use-kindle-vocabulary-builder/)
- **Batas bukti:** NN/g, Readlang, LingQ, Anki tidak ketemu. Durasi toast yang "pas" belum punya angka baku. Ini bukan validasi 30 bukti.
- Masukan Sinta (AI, 25-11-2026): 6 detik terasa lama saat baca. Satu suara, belum pengguna nyata.

## 3. Rekomendasi durasi
- **Simpan kata (ada Urungkan): 4 detik.** Cukup baca + ketuk. 3 detik terlalu mepet untuk jempol.
- **Tandai paham / kenal / hapus kata / hapus penanda: 5 detik.** Efeknya lebih besar, tapi bukan 6.
- **Hapus cerita: tetap 5 detik.** Sama dengan penghapusan nyata, jangan dipendekkan.
- **Baca ulang buku: 5 detik.**
- Pesan biasa tanpa aksi: tetap 3,2 dtk.
- Posisi: tidak perlu digeser lagi. Sudah di atas bar bawah saat reader terbuka.
- Ukuran: tidak perlu dikecilkan. Tombol Urungkan harus tetap 44px (sudah).
- Aman untuk aksesibilitas: semua Urungkan punya jalur lain (hapus di tab Kata, tandai ulang).
- Tambahan kecil: timer berhenti saat toast disentuh/ditahan. Jadi tak ada yang kehilangan Urungkan.

## 4. Spesifikasi developer (kecil)
- Ubah angka 6000 jadi 4000 di ui.js baris 1628 & 1776 (simpan kata).
- Ubah 6000 jadi 5000 di baris 1554, 1644, 2512, 2519, 2591, 3024, 3032, 3042, 3051, 3112, 3627.
- Jangan ubah 1421 (5000), `toastMs`, pesan lain, dan toast error.
- Opsional: jeda timer saat jari menahan toast (`pointerdown`/`pointerup` di `#toast`).
- Naikkan versi `C` di sw.js. Cek `node --check ui.js`.
- Uji: 320 & 390px, simpan kata dari rekap, Urungkan masih bisa diketuk.

## 5. Langkah berikutnya
- Developer kerjakan backlog #188.
- Setelah live, minta tester AI menilai: apakah 4 detik cukup untuk Urungkan.
- Pengguna manusia: tanya satu hal saja ("sempat ketuk Urungkan?").

## Status tahap
- Tidak ada tahap yang naik. Bukti baru 7 sumber, belum 30. Status roadmap tidak diubah.
