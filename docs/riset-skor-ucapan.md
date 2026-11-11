# Riset: seberapa adil skor ucapan tab Ngomong

Tugas #198. Dibuat 2026-11-11. Hanya membaca kode; tidak ada kode diubah.
Cara baca/romanisasi sudah dibahas di `riset-cara-baca-romanisasi.md`; tidak diulang di sini.

## Intinya
- Skor kita = hasil "tebakan teks" mesin suara HP, bukan nilai bunyi. Gampang tidak adil.
- Di iPhone mode PWA (ikon layar utama), mic kemungkinan besar tidak jalan sama sekali.
- Paling berdampak: tandai kata yang salah, kurangi angka, dan beri jalan keluar bila mic mati.

## 1. Cara skor kita bekerja sekarang
- Mesin suara HP mengubah ucapan jadi teks (maks 5 tebakan); kita bandingkan dengan teks target.
- Inggris/Korea: cocok per kata (mirip huruf, di bawah 34% dianggap salah). Jepang/Mandarin: per huruf.
- Lulus per kata di 85%. Tebakan alternatif dihitung 90%. Skor kalimat = rata-rata kata. (`app.js` `scoreSentence`, `PASS`)

Konsekuensinya:
- Mesin cenderung "membetulkan" ucapan ke kata yang umum, jadi bisa terlalu longgar.
- Aksen kuat bisa salah dengar total, jadi terlalu keras walau ucapan sudah bisa dipahami.
- Kata nama, angka, dan kata langka paling rawan kena salah dengar.

## 2. Dukungan per perangkat
Sumber ada di bagian Sumber. Status Firefox & iOS terbaru belum terkonfirmasi: uji sendiri.

| Perangkat | Mic/pengenalan suara | Catatan |
|---|---|---|
| iPhone Safari (tab biasa) | Ada (awalan webkit, sejak iOS 14.5) | Butuh Siri aktif & internet |
| iPhone PWA (layar utama) | Kemungkinan besar TIDAK jalan | Bug WebKit terbuka sejak 2021; laporan 2023 masih sama |
| Chrome Android | Ada, paling stabil | Audio dikirim ke server, butuh internet |
| Firefox (HP & PC) | Tidak ada / mati bawaan | Anggap tidak didukung |
| Chrome/Edge PC | Ada | Berguna untuk uji cepat |

Kode kita sudah menampilkan pesan "belum didukung" bila mesin tidak ada. Tapi pesannya menyarankan Safari iPhone tanpa menyebut masalah mode PWA.

## 3. Risiko skor "tidak adil"
Terlalu keras (pengguna kapok):
- Studi 2025 pada penutur non-native: mesin terbaik cukup akurat, tapi akurasi bervariasi menurut bahasa ibu/aksen.
- Makalah AAAI melaporkan tingkat salah 30-50% untuk ucapan beraksen pada model lama.
- Jepang/Mandarin per huruf: satu huruf homofon beda (mis. 橋/箸) dianggap salah padahal bunyinya benar.

Terlalu longgar (pengguna merasa tertipu):
- Mesin menebak kata dari konteks, jadi ucapan miring tetap "terbaca benar".
- Review Speak mencatat keluhan sama: salah ucap atau urutan terbalik kadang tetap lulus.
- Kalimat pendek dan mudah ditebak bisa dapat skor tinggi.

Catatan jujur: tidak ketemu angka akurasi khusus penutur Indonesia atau per bahasa JP/KR/ZH. Belum ada data kita sendiri.

## 4. Praktik aplikasi lain
- ELSA: warna per bunyi/kata (hijau/oranye/merah), ketuk kata merah untuk latih ulang. Angka ada tapi sekunder.
- Speak: memakai keluarga Whisper; klaim umpan balik tingkat bunyi (belum terverifikasi resmi).
- Duolingo: kemungkinan hanya cocok/tidak cocok per kalimat (belum terverifikasi resmi).
- Pola umum: kata yang ditandai lebih berguna daripada satu angka persen.

Kita sudah mirip ELSA: warna per kata + "Boss level" untuk kata sulit. Yang kurang: ketidakpastian jujur.

## 5. Rekomendasi (urut dampak)
1. Deteksi mic mati di iPhone PWA; tampilkan pesan "buka lewat Safari" dan jalur latihan tanpa skor (dengar + tiru).
2. Ganti angka persen besar dengan penanda per kata dan teks "kedengarannya begini"; angka jadi kecil atau opsional.
3. Longgarkan Jepang/Mandarin: nilai kecocokan bunyi (kana/pinyin), bukan huruf persis, dan beri nada "mungkin salah dengar" saat banyak kata gagal.

## 6. Perlu diuji di HP asli
1. iPhone: Safari biasa vs ikon layar utama; apakah mic muncul, minta izin, dan memberi hasil?
2. Android Chrome: kalimat sama dengan aksen Indonesia vs tiruan penutur asli; bandingkan skor 5 kali.
3. Ucapan sengaja salah (kata diganti/dibalik/diam): apakah masih lulus ≥85%? Uji EN, KO, JA, ZH.

## Sumber
- [WebKit bug 225298: pengenalan suara tidak tersedia](https://bugs.webkit.org/show_bug.cgi?id=225298)
- [Apple Developer Forums: webkitSpeechRecognition di PWA](https://developer.apple.com/forums/thread/748048)
- [Tabel dukungan speech recognition (w3cub)](https://docs.w3cub.com/browser_support_tables/speech-recognition)
- [Caniuse: SpeechRecognition start](https://caniuse.com/mdn-api_speechrecognition_start)
- [Mozilla bug 1248897: Expose SpeechRecognition](https://bugzilla.mozilla.org/show_bug.cgi?id=1248897)
- [McGuire 2025: ASR untuk English non-native](https://arxiv.org/abs/2503.06924)
- [AAAI: ucapan beraksen, tingkat salah tinggi](https://ojs.aaai.org/index.php/AAAI/article/view/30381/32445)
- [ELSA: umpan balik berwarna](https://blog.elsaspeak.com/en/advantage-of-elsa-feedback)
- [ELSA: latihan per kata](https://elsanow.freshdesk.com/en/support/solutions/articles/31000178248-pronunciation-conversation-single-word-practice)
- [Speak di App Store](https://apps.apple.com/us/app/speak-learn-english/id1286609883)
