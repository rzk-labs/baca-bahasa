# Riset #178: Cara baca (romaji/pinyin/romanisasi) — kapan membantu, kapan jadi tongkat

Status: draft. Dibuat tanpa akses internet; isi dari ingatan, **perlu dicek ulang** (⚠️).
Tanda: 📚 riset/jurnal · 💬 opini internet (forum, blog, guru) · ⚠️ belum dibuka ulang.

## Intinya
- Cara baca membantu pemula; di level A2-B1 jadi tongkat bila selalu terlihat.
- Paling aman: tampil di kartu arti & sisi belakang kartu Hafal, bisa dimatikan. Bukan di teks bacaan.
- Keepo sudah punya cara baca di kartu arti, kartu Hafal, dan CSV. Tinggal saklar matikan.

## 1. Bukti & pendapat: membantu atau menghambat?

### Yang dikatakan riset 📚 ⚠️
- Pelajar yang bersandar pada romanisasi cenderung lebih lambat menguasai aksara asli (Jepang, Korea).
- Efek terkuat bila romanisasi **selalu tampil di samping aksara**: mata memilih jalur termudah.
- Pinyin: membantu ucapan & nada, tapi mengurangi perhatian ke karakter bila selalu tampil. (Cari: "pinyin reading Chinese L2 eye tracking".)
- Furigana: mempercepat baca Jepang L2, tapi mata jarang menatap kanjinya, jadi kanji kurang menempel.
- Catatan: studi umumnya kecil dan di kelas, bukan di app baca mandiri. Jangan dianggap pasti.

### Yang dikatakan pelajar & guru 💬 ⚠️
- r/LearnJapanese & r/Korean: nasihat umum "kuasai kana/hangul dulu (hari-minggu), jauhi romaji".
- Blog guru Jepang (mis. Tofugu, https://www.tofugu.com, cari "stop using romaji"): romaji sebentar saja, lalu lepas.
- Guru Mandarin: pinyin wajib di awal untuk nada, lalu bertahap ke karakter.
- Suara minoritas: untuk wisata/baca cepat, romanisasi sah dipakai.
- Hangul gampang dipelajari, jadi romanisasi Korea paling cepat jadi tongkat. Kanji/hanzi tidak bisa ditebak, jadi cara baca berguna lebih lama.

### Kesimpulan bukti
- Membantu: ucapan kata baru; kanji/hanzi yang belum dikenal.
- Menghambat: bila menggantikan belajar kana/hangul, atau menempel terus di teks.
- Untuk A2-B1: cara baca = **bantuan sesekali**, bukan pengganti aksara. (Hipotesis H5; belum divalidasi manusia.)

## 2. Cara aplikasi lain menampilkan cara baca
Semua ⚠️ dari ingatan; cek langsung di tiap app.

| App | Tampilan | Bisa dimatikan? | Di kartu hafal? |
|---|---|---|---|
| Readlang | Pop-up ketuk-kata; transliterasi untuk beberapa bahasa | Belum pasti | Belum pasti |
| LingQ | Furigana/pinyin/romanisasi opsional | Ya | Ikut kartu bila aktif |
| Migaku | Furigana di teks; bisa disembunyikan | Ya | Ya (kolom bacaan) |
| Duolingo | Romaji/pinyin awal, lalu bisa dimatikan; memudar seiring level | Ya | Tidak ada kartu ala Anki |
| Satori Reader | Furigana per kata; bisa dimatikan semua/per kata | Ya, halus | Kosakata punya bacaan |

Pola:
- Hampir semua bisa dimatikan; tidak ada yang memaksa.
- Untuk pembaca buku, furigana/pinyin lebih lazim daripada romaji.
- Duolingo memudarkan cara baca: sinyal "jangan jadi tongkat".

## 3. Yang gratis dan batasnya
Dari `docs/riset-sumber-kamus.md`, `docs/riset-pemotongan-kata-jp-kr.md`, dan kode app sekarang.

| Sumber | Cara baca? | Batas |
|---|---|---|
| Google gtx (`dt=rm`) | Ya, romanisasi; sudah dipakai app | Tidak resmi, bisa diblokir; kadang kosong; tanpa furigana |
| MyMemory | Tidak | Hanya terjemahan; kuota terbatas |
| Web Speech API | Tidak (hanya suara) | Suara beda tiap HP; tidak memberi teks |
| JMdict offline (rencana) | Kana → romaji, andal | Perlu unduhan; belum dibangun |
| kaikki.org (rencana) | Romanisasi Korea/Mandarin | Besar; mutu tak merata |

Batas penting:
- Furigana per kanji **tidak** didapat gratis dari gtx.
- Kata terpotong salah (Jepang, partikel Korea) → cara baca ikut salah/kosong.
- Pinyin dari gtx ada; tanda nada perlu dicek. ⚠️
- Kata offline: cara baca kosong sampai terisi ulang (sudah ditangani isi-ulang arti).

## 4. Rekomendasi (paling sederhana, Reader First)
1. **Kartu arti: tampil, kecil, redup.** Sudah ada. Pembaca butuh saat itu juga.
2. **Kartu Hafal: sisi BELAKANG bersama arti.** Sudah ada. Depan hanya aksara, supaya bentuknya diingat.
3. **CSV: tetap kolom "cara baca".** Sudah ada; di Anki bisa dihapus.
4. **Default: HIDUP** (pembaca A2-B1 butuh). Tambah satu saklar "Tampilkan cara baca" di pengaturan.
5. **Jangan** taruh di teks bacaan (furigana/ruby) dulu: butuh kamus & potong kata yang andal.
6. Lanjutan, hanya bila wawancara mendukung: opsi "cara baca di depan kartu" untuk pemula total; default mati.

Kenapa: satu saklar, tanpa data baru, alur baca tidak berubah.

Tugas developer kecil (bila disetujui):
- Saklar hidup/mati di pengaturan; sembunyikan cara baca di kartu arti & Hafal; CSV tetap diisi.
- Teks bantu: "Bantu ucapan. Kalau hurufnya sudah hafal, matiin aja."

## 5. Tiga pertanyaan wawancara
Masuk ke `docs/naskah-wawancara-pengguna.md` sebagai P7a-P7c (peserta Jepang/Korea/Mandarin). Terbuka, tentang masa lalu.

| # | Pertanyaan | Sinyal |
|---|---|---|
| P7a | Terakhir kali ketemu kata beraksara yang belum bisa kamu baca, kamu ngapain? Ceritain langkahnya. | Cari romaji/pinyin/furigana sendiri, atau lewati |
| P7b | Pernah pakai bantuan cara baca (romaji, pinyin, furigana)? Kapan mulai nggak butuh lagi, atau masih butuh? | Titik lepas dari tongkat |
| P7c | Pas hafalan kata, kamu lihat cara bacanya dulu atau coba tebak dulu? Kenapa? | Depan vs belakang kartu |

Cara pakai:
- Hitung untuk H5 (bagian 6 naskah).
- Jawaban "tergantung" = dukung saklar, bukan satu cara.

## Langkah berikutnya
- Founder: pakai P7a-P7c saat wawancara peserta non-Latin.
- Riset: buka ulang sumber ⚠️ (studi pinyin/furigana, fitur app lain).
- PM: tugas developer "saklar cara baca" bila ≥3 dari 5 peserta bilang cara baca membantu.
