# Riset #575: Dengar halaman lanjut otomatis & kontrol laju

Validasi bukti internet, 12 Nov 2026.

## Intinya
- Pengguna mau audio lanjut sendiri, tapi bukti langsung masih tipis. Terbukti sebagian.
- Aplikasi lain berhenti/lompat saat geser halaman atau putar layar. Berhenti bersih lebih aman.
- iPhone: suara web tertahan saat layar terkunci. Jangan janjikan jalan saat layar mati.

Catatan jujur: bukti dari hasil pencarian + halaman yang dibuka (cuplikan). Reddit, MacRumors, ulasan toko tak terbaca. Tak ada uji di iPhone nyata. Bug "jeda 15 detik" ternyata masalah Chrome (suara Google), bukan Safari iOS.

## 1. Kondisi app sekarang
- "Dengar halaman" memutar kalimat halaman aktif satu per satu, lalu berhenti di akhir halaman.
- Laju tetap 0,9. Tak ada pilihan laju di bar baca.
- Belum jelas perilaku saat geser halaman/ubah font/putar layar ketika suara jalan.

## 2. Tabel bukti (44 butir, ±10 sumber)
Sumber: Readlang, Apple Developer Forums, Apple Discussions, WebKit Bugzilla, PhET GitHub, Stack Overflow, Moon+ (FAQ, MobileRead), Android Central, Voice Dream, LingQ, AppleVis, pemutar suara lain.

### A. Mau audio lanjut sendiri?
| ID | Bukti | Tautan |
|---|---|---|
| A1 | LingQ: "There are no settings for that. At the Complete Lesson screen, you need to tap to move on to the next lesson." | https://forum.lingq.com/t/how-do-i-adjust-the-app-to-automatically-advance-to-the-next-lesson-in-a-course/1089799 |
| A2 | LingQ: ada opsi "Auto play text-to-speech" di Pengaturan Pembaca | https://forum.lingq.com/t/announcing-the-new-lingq-reader/5334 |
| A3 | LingQ: Playlist = "an mp3 player in your LingQ app" | https://lingq-support.groovehq.com/help/step-7-lingq-playlist |
| A4 | LingQ: saran pengguna untuk perjalanan: unduh audio, buat playlist di pemutar lain | https://forum.lingq.com/t/audio-playlists-on-lingqcom-website/21420 |
| A5 | Voice Dream: di akhir artikel, bawaan = bunyi lalu lanjut ke item berikutnya (bisa diubah) | https://supportapp.freshdesk.com/support/solutions/articles/154000153108-advanced-reader-controls |
| A6 | Voice Dream: dari Playlist "will always advance to the next article regardless of the setting" | https://supportapp.freshdesk.com/support/solutions/articles/154000153108-advanced-reader-controls |
| A7 | Voice Dream: pewaktu tidur: "The Reader will stop reading when time is up" | https://supportapp.freshdesk.com/support/solutions/articles/154000153108-advanced-reader-controls |
| A8 | Kindle iOS (AppleVis 2024): baca-lanjut dua jari; "it will automatically flip to the next page" | https://www.applevis.com/comment/179590 |
| A9 | Kindle iOS (AppleVis): pengguna lain kesal pembaca otomatis pindah halaman, ingin halaman dibaca habis dulu | https://www.applevis.com/comment/179588 |
| A10 | Kindle iOS (AppleVis): "reads some of the book, then... will just stop mid book" | https://www.applevis.com/comment/178050 |
| A11 | Ekstensi Chrome "Auto Next Page Reader": buka halaman/bab berikutnya saat selesai | https://www.chromeboard.com/extension/auto-next-page-reader-ijjdlnaiinpiojodgfdkhpfndfiddldo |
| A12 | Speechify: tak ada ulasan soal lanjut halaman; yang ada auto-scroll & sorotan teks (bukti tiada) | https://www.unite.ai/speechify-review |

### B. Geser halaman, ubah font, putar layar
| ID | Bukti | Tautan |
|---|---|---|
| B1 | Readlang: audio "starts reading the text from the next page before the interface actually turns the page" | https://forum.readlang.com/t/audio-sync-issue-on-windows-and-android-reader-jumps-to-next-page-too-early/5073 |
| B2 | Readlang: sebab "some voices (including the Google Español voice) don't emit word-by-word timing events" | https://forum.readlang.com/t/audio-sync-issue-on-windows-and-android-reader-jumps-to-next-page-too-early/5073 |
| B3 | Readlang: kalimat melintas batas halaman dipecah, halaman dibalik, lalu ucapan baru dimulai | https://forum.readlang.com/t/audio-sync-issue-on-windows-and-android-reader-jumps-to-next-page-too-early/5073 |
| B4 | Readlang: pengguna: "the reading of the next page won't start until it actually turn to it" | https://forum.readlang.com/t/audio-sync-issue-on-windows-and-android-reader-jumps-to-next-page-too-early/5073 |
| B5 | Kindle iOS (Apple Discussions): di pergantian halaman bacaan "skips to the last paragraph of the next page" | https://discussions.apple.com/thread/8298069?page=2 |
| B6 | MobileRead (Moon+): lompat halaman "related to the auto screen rotation feature", kadang "jumps dozens of pages" | https://www.mobileread.com/forums/showthread.php?p=3100870 |
| B7 | MobileRead (Moon+): "It does also happen with simple page turns but it isn't often." | https://www.mobileread.com/forums/showthread.php?p=3100870 |
| B8 | Voice Dream: posisi kursor suara diingat; dua ketuk dua jari kembali ke kursor suara | https://www.voicedream.com/faq-items/focused-reading-mode |
| B9 | Voice Dream: pengaturan tampilan di tombol terpisah; tak ada dokumen soal suara saat font berubah | https://hadleyhelps.org/sites/default/files/2022-12/6_QSG_Entertainment_Voice_Dream_Reader_App_121622.pdf |
| B10 | Moon+ v4.2.2+: gesek atas/bawah saat TTS = ganti kalimat, bukan volume | https://moondownload.com/faq.html |

### C. Kontrol laju (Normal/Lambat)
| ID | Bukti | Tautan |
|---|---|---|
| C1 | Audeus: ketuk pengali "1x", pilih preset; disimpan jadi bawaan | https://www.audeus.com/help/adjust-voice-speed-web |
| C2 | Voicepaper: tombol laju di ujung kanan kontrol bawah | https://intercom.help/voicepaper-ce4adc785260/en/articles/13609453-change-playback-speed |
| C3 | Dolphin: laju dicari lewat menu Audio lalu Suara (jalur panjang) | https://yourdolphin.com/support/article?id=44 |
| C4 | Voice Dream: "You can change how fast the text is read using the Speech Rate slider." | https://supportapp.freshdesk.com/support/solutions/articles/154000153108-advanced-reader-controls |
| C5 | Pengguna belajar bahasa minta pilihan kecepatan gaya YouTube di mode baca; ketuk "1x" turun ke 0,75 | https://forum.languagelearningwithnetflix.com/t/suggestion-of-speed-dial-on-read-mode/9968 |
| C6 | Pengguna lain: memperlambat laju di mode baca "would be incredibly helpful" | https://forum.languagelearningwithnetflix.com/t/suggestion-of-speed-dial-on-read-mode/9968/2 |
| C7 | LingQ: bisa perlambat/percepat rekaman untuk bantu atau menantang | https://www.fluentu.com/blog/lingq-review/ |
| C8 | Ulasan toko: aplikasi ganti laju sendiri ke "extremely fast", tak jelas terdengar; preset terbatas lebih aman | https://apps.apple.com/us/app/id889797636 |

### D. Batas iOS Safari/PWA & layar mati
| ID | Bukti | Tautan |
|---|---|---|
| D1 | Apple Dev Forums (aplikasi asli): ucapan "reliably pauses mid-utterance the moment the screen locks, and resumes... the moment the screen is unlocked" | https://developer.apple.com/forums/thread/849627 |
| D2 | Sama: tak ada error; "the utterance simply stalls and then continues later" | https://developer.apple.com/forums/thread/849627 |
| D3 | Sama: sesi audio latar aktif, ucapan tetap tertahan; doNotMix/duckOthers tak membantu | https://developer.apple.com/forums/thread/849627 |
| D4 | Sama: di mobil 68 menit, jeda 9,4-12,5 detik per siklus terkunci; sebagian build tak pernah selesai | https://developer.apple.com/forums/thread/849627 |
| D5 | Apple Discussions (iOS 15): audio Safari berhenti "as soon as the Safari app loses focus" atau "if the device is locked" | https://discussions.apple.com/thread/253331448 |
| D6 | Sama: "The device must be turned on/unlocked and the Safari app must have focus"; tak terjadi di iOS 14 | https://discussions.apple.com/thread/253331448 |
| D7 | WebKit #218815: `speechSynthesis.speak` di Safari menghentikan media lain (video, mikrofon) | https://bugs.webkit.org/show_bug.cgi?id=218815 |
| D8 | PhET: "long utterances with the Google voices simply stop after 15 seconds" (Chrome Windows, bukan Safari) | https://github.com/phetsims/utterance-queue/issues/60 |
| D9 | PhET: di Safari "the `start` and `end` listener do not fire consistently, especially after interruption with cancel" | https://github.com/phetsims/utterance-queue/issues/60 |
| D10 | PhET: Android: "Speech stops and it does not resume. We never get a `cancel` or `end` event." | https://github.com/phetsims/utterance-queue/issues/60 |
| D11 | PhET: saran umum "chunk the utterance into multiple smaller utterances, ideally around punctuation" | https://github.com/phetsims/utterance-queue/issues/60 |
| D12 | Stack Overflow: trik `resume()` tiap 14 detik "no longer works"; `pause()` harus sebelum `resume()` | https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/57667357/speech-synthesis-problem-with-long-texts-pause-mid-speaking |
| D13 | Android Central: suara online berganti offline "a few minutes after the screen goes dark" lalu "stops altogether" | https://forums.androidcentral.com/threads/tts-goes-from-online-to-offline-voice-minutes-after-screen-turns-off-then-stops.1060845 |
| D14 | Moon+ FAQ: bila sistem menghentikan TTS di latar, masukkan mesin TTS & pembaca ke daftar putih baterai | https://moondownload.com/faq.html |

Total 44 butir. D1-D4 dari aplikasi asli iOS, bukan PWA: petunjuk, bukan bukti pasti. Beberapa kutipan A/B/C dari cuplikan hasil pencarian.

## 3. Vonis hipotesis
| # | Hipotesis | Vonis | Alasan |
|---|---|---|---|
| H1 | Pengguna mau audio lanjut sendiri ke halaman berikutnya | **Terbukti sebagian** | Voice Dream, LingQ, Kindle, ekstensi Chrome menyediakannya (A2, A5-A9, A11). Pengguna Kindle juga kesal bila lompat sebelum selesai (A9). Tak ada data KRL/rebahan. |
| H2 | Perlu cara berhenti otomatis (pewaktu) | **Terbukti sebagian** | Voice Dream punya pewaktu tidur (A7). Tak ada kutipan pengguna Gen Z. |
| H3 | Geser halaman/putar layar saat suara jalan sering bikin kacau | **Terbukti** | Suara mulai sebelum halaman berbalik (B1-B2), lompat paragraf (B5), lompat halaman saat putar layar (B6). |
| H4 | Berhenti bersih saat tampilan berubah itu aman | **Belum jelas** | Tak ada kutipan soal font di Voice Dream (B9). Pola Readlang "pindah dulu, ucap kemudian" mendukung (B3-B4). |
| H5 | Tombol laju cepat di bar lebih baik daripada menu | **Terbukti sebagian** | Pemutar populer taruh di bar (C1, C2); pengguna minta (C5, C6); menu panjang dikeluhkan (C3). Tak ada studi langsung. |
| H6 | Suara web iPhone jalan terus saat layar mati/tab latar | **Gugur** | Safari berhenti saat layar kunci/fokus hilang (D5-D6); aplikasi asli pun tertahan (D1-D4). |
| H7 | Bug jeda ±15 detik terjadi di Safari iOS | **Gugur** | Terdokumentasi di suara Google Chrome (D8). Safari: event tak konsisten (D9). |
| H8 | Kalimat pendek mencegah suara macet | **Terbukti sebagian** | Disarankan PhET & Stack Overflow (D11-D12). App sudah per kalimat. Belum diuji di iPhone. |
| H9 | Putar otomatis mengganggu baca tenang (vonis lama #482: belum jelas) | **Terbukti sebagian, sebagai opsi** | Sebagian ingin lanjut, sebagian kesal bila lompat (A8-A9). Jadi: hanya jika pengguna menyalakan. |

Hasil: 1 terbukti, 5 terbukti sebagian, 2 gugur, 1 belum jelas (H4), 1 diperbarui (H9, sebagai opsi).

## 4. Kesimpulan
- Putar otomatis ke halaman berikutnya layak, asal opsional dan terlihat.
- Jangan janjikan jalan saat layar mati di iPhone. Beri tahu jujur.
- Saat pengguna mengubah tampilan: berhenti dulu, jangan nekat ikut.
- Laju: satu tombol dua preset cukup.

Vonis 'putar otomatis belum jelas' di `docs/riset-dengar-sambil-baca.md` kini diperbarui: terbukti sebagian, sebagai opsi nyala-padam (H9).

## 5. Usulan spesifikasi kecil untuk developer
### 5.1 Akhir halaman
- Setelah kalimat terakhir, jika "Lanjut otomatis" nyala: balik halaman, tunggu tata letak selesai, putar kalimat pertama halaman baru.
- Jangan mulai ucapan sebelum halaman berpindah (B1, B4).
- Di akhir bab/buku: berhenti, toast "Bab selesai". Jangan lompat bab sendiri.
- Bawaan mati. Satu centang di bar baca atau Pengaturan.

### 5.2 Saat geser, ubah font, putar layar
- Geser halaman manual: berhenti bersih; bila "Lanjut otomatis" nyala, lanjut dari kalimat pertama halaman tujuan.
- Ubah font/jarak/tema atau putar layar: berhenti, tawarkan "Lanjut dari kalimat ini".
- Layar terkunci/tab ke latar: berhenti, simpan kalimat terakhir, beri pesan saat kembali.

### 5.3 Tombol laju
- Satu tombol di bar baca: Normal (0,9) ↔ Lambat (0,6). Teks tombol menunjukkan pilihan sekarang.
- Berlaku untuk "Dengar halaman" dan tombol dengar kata/kalimat. Simpan sebagai pilihan.
- Diubah saat suara jalan: berlaku mulai kalimat berikutnya.

### 5.4 Pesan jujur iPhone
- Teks kecil: "Di iPhone, suara berhenti saat layar mati. Biarkan layar menyala."
- Pakai penahan layar menyala bila tersedia (lihat `docs/riset-layar-menyala-data-iphone.md`).

## 6. Langkah berikutnya
- Developer: bangun 5.1-5.3 (satu PR kecil, mulai dari tombol laju).
- Tester: uji iPhone & Android nyata: layar mati, ganti tab, putar layar, ubah font.
- Riset lanjut (opsional): ulasan toko & Reddit.
