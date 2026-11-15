# Riset: tanda berhasil ketuk kata & tab Kata kosong

Tugas #1081 (validasi bukti internet). Melengkapi `docs/riset-petunjuk-onboarding-baca.md` (pesan di halaman baca: satu pesan, sekali tampil, "Paham") dan `docs/riset-akurasi-ketuk-kata.md` (ketukan meleset, tombol tambah kata). Di sini hanya: tanda setelah ketuk/simpan, dan petunjuk saat daftar kosong.

## Intinya
- Pembaca perlu tanda jelas: kata terpilih, arti muncul, "Tersimpan". Terbukti.
- Tab Kata kosong butuh petunjuk satu kalimat plus tombol. Terbukti.
- Halaman baca pertama cukup satu petunjuk kecil, sekali, bisa ditutup.

## 1. Bahan & cara kerja
- Masukan Dina: "Ketuk kata tak memberi tanda apa pun, jadi bingung berhasil atau tidak."
- Masukan Ilham: petunjuk "ketuk kata → Simpan" saat tab Kata kosong, juga di halaman baca pertama.
- Masukan Nadia: tamat satu buku, kata tersimpan 0, tak ada ajakan ketuk kata.
- 34 kutipan dari 3 sumber: Nielsen Norman Group (3 artikel), forum Readlang, forum LingQ.
- Tak terbaca: Apple HIG & Material (halaman kosong saat diambil), Reddit, ulasan toko, Pleco, Language Reactor.

## 2. Bukti (34 kutipan)

**A. NN/g: umpan balik setelah aksi** ([Visibility of System Status](https://www.nngroup.com/articles/visibility-system-status/), [Response Times](https://www.nngroup.com/articles/response-times-3-important-limits/))
- [1] "systems should always keep users informed about what is going on"
- [2] "Whenever users interact with a system, they need to know whether the interaction was successful."
- [3] "Appropriate feedback for a user action is perhaps the most basic guideline of user-interface design."
- [4] "These indicators communicate that the system is working, and reduce uncertainty"
- [5] "Providing immediate feedback for interactive events allows users to quickly identify the source of errors"
- [6] "no action with consequences to users should be taken without informing them."
- [7] Respons instan = "reacting instantaneously, meaning that no special feedback is necessary except to display the result." (Response Times)
- [8] Di batas 0,1 detik pengguna merasa "directly manipulating objects in the UI". (Response Times)
- [9] "For delays of more than 1 second, indicate to the user that the computer is working on the problem" (Response Times)
- [10] Umpan balik yang berkedip terlalu cepat membuat pengguna tak bisa "keep pace" atau merasa tertekan. (Response Times)

**B. NN/g: keadaan kosong** ([Empty States](https://www.nngroup.com/articles/empty-state-interface-design/))
- [11] "Totally empty states cause confusion about how and whether the system is working."
- [12] Saran: "A brief system message within the content area at completion of the process"
- [13] "Inaccurate system-status messages for empty states are particularly harmful."
- [14] "Empty states present an opportunity to provide contextual help relevant to the user’s task."
- [15] "A brief dialogue could provide information about what alerts are and how to get started using them."
- [16] "A better approach is to provide brief yet explicit instructions"
- [17] Contoh: teks "Send a request" bisa langsung menautkan ke pesan baru. (ringkasan; kutipan: "might directly link to a message center")
- [18] "Do not default to totally empty states."
- [19] "Tell the user what could be displayed, and how to populate the area with that content."
- [20] "Provide direct pathways (i.e., links) to getting started with key tasks related to populating the empty state."

**C. Forum Readlang** ([sorotan hilang](https://forum.readlang.com/t/words-dont-stay-highlighted-translated/2957), [frasa tak tersimpan](https://forum.readlang.com/t/multi-word-phrases-are-not-automatically-saved-to-word-list/3187), [popover](https://forum.readlang.com/t/popover-and-review-summary-seem-to-be-missing/4973))
- [21] v0: "Every time I leave the text I am practicing or even go back a page words don’t stay highlighted/translated"
- [22] warsawwill: "Once you subscribe to the paid version, all the words you’ve looked up will show up underlined."
- [23] steve (pembuat): "My preference is for a more distraction-free reading interface and this is reflected in Readlang’s design."
- [24] desert-fox: "when I click on a word and then on the star to add it to my favorites, it often doesn’t show up there."
- [25] domenick-braccia: "I frequently want to check what 2 or 3 words mean when used together, and I want that translation to save"
- [26] domenick-braccia: "it deletes the card I had for the previous phrase."
- [27] steve: "when you click to deselect a translated word/phrase, it will stay saved to your account"
- [28] rossi-clo: "I would love something that gives you a little popup for the word and let’s you close it."
- [29] steve: "This new popover style has just been released today."

**D. Forum LingQ** ([tampak tersimpan tapi tidak](https://forum.lingq.com/t/lingq-phrase-words-appearing-to-save-but-not-saving/30309), [LingQs not saving](https://forum.lingq.com/t/lingqs-not-saving/5375))
- [30] nytrist: "It appears to save, but then reverts back to not being highlighted when I move on."
- [31] nytrist: "...which makes it awkward and a bit frustrating!"
- [32] staf zoran: "If you check on the Vocabulary tab, is the phrase saved there as LingQ properly?"
- [33] Jezsh: "Although the LingQs I save appear to be saved in my vocabulary, they don’t show up in the text anymore."
- [34] mark (staf): "We are going to be implementing a major upgrade in the next week that involves the way words are highlighted."

## 3. Vonis hipotesis
- **H1. Pembaca butuh tanda jelas setelah ketuk/simpan: TERBUKTI.**
  - NN/g [2][3][6]: tiap aksi perlu bukti berhasil.
  - Pengguna Readlang/LingQ bingung saat tanda hilang atau tak ada [21][24][30][33].
- **H2. Tanda "Tersimpan" harus awet, bukan sekali kedip: TERBUKTI SEBAGIAN.**
  - Keluhan terbesar: kata tampak tersimpan lalu hilang dari teks [21][30][33].
  - Kedipan terlalu cepat membuat tertekan [10]. Belum ada angka durasi toast.
- **H3. Kata terpilih perlu disorot: BELUM JELAS.**
  - Sorotan kata yang sudah dicari dibahas komunitas, tapi sorotan ketukan sesaat belum ada bukti langsung.
  - Pembuat Readlang memilih tampilan tenang [23]; popup kecil yang bisa ditutup diminta [28].
- **H4. Tab Kata kosong butuh petunjuk + tombol: TERBUKTI.**
  - NN/g [11][16][18][19][20]. Teks Keepo: "Ketuk kata di halaman baca, lalu Simpan" plus tombol "Mulai baca".
- **H5. Petunjuk juga di halaman baca pertama: TERBUKTI SEBAGIAN.**
  - Bantuan di konteks lebih baik [14]; kata hilang dari tab Kata juga alasan pengguna ragu [11].
  - Tetapi tutorial sering dilewati; rujuk `docs/riset-petunjuk-onboarding-baca.md`: sekali, bisa ditutup, tak bareng pesan lain.
- **H6. Daftar kosong yang salah klaim ("0 kata") menyesatkan: TERBUKTI.**
  - NN/g [13]. Sesuai masukan Dina & Nadia: hitungan "Kata disimpan" harus cocok dengan tab Kata.

## 4. Kesimpulan
- Ketukan kata harus terasa: arti muncul cepat, tombol Simpan berubah jadi "Tersimpan ✓".
- Setelah tersimpan, kata tetap bertanda di teks sampai sesi berikutnya.
- Daftar kosong bukan layar mati: jelaskan cara mengisi, beri tombol.
- Satu petunjuk kecil di halaman baca pertama, hilang selamanya setelah "Paham".

## 5. Usul P0 untuk developer (tanpa kode)
- Setelah ketuk kata: kata terpilih disorot, kartu arti muncul, tombol Simpan jelas.
- Setelah Simpan: tombol jadi "Tersimpan ✓", toast singkat "Tersimpan di Kata", sorotan tetap.
- Tab Kata kosong: teks "Ketuk kata di halaman baca, lalu Simpan" + tombol "Mulai baca".
- Halaman baca pertama: petunjuk satu baris, sekali tampil, tombol "Paham", tak bareng spanduk lain.
- Hitungan "kata disimpan" di semua layar harus sama.
- Backlog: #109. Mockup: `docs/mockup-1081.html`.

## 6. Batasan
- Nol uji manusia; hanya bukti forum dan panduan UX.
- Durasi toast ideal belum ada bukti; uji di HP.
- Suara pengguna Indonesia tidak ditemukan.
