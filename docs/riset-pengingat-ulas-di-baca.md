# Riset: pengingat "kata siap diulang" di layar Baca + satu istilah

Tugas #990 (validasi bukti internet). Melengkapi `riset-jadwal-ulang-kata.md`, `riset-petunjuk-onboarding-baca.md`, `riset-kartu-latihan-konteks.md`. Mockup: `mockup-990.html`.

## Intinya
- Pengingat boleh ada di Baca, asal berupa titik kecil di header. Bukan pop-up.
- Pakai satu istilah: "diulang" (bukan diulas, latihan, review).
- Istilah Indonesia: bukti langsung tipis. Vonisnya "belum jelas", pilihan ini keputusan desain.

## 1. Cara kerja
- Cari bukti di forum LingQ & Readlang, panduan Apple & NN/g, studi interupsi baca.
- 40 kutipan dari 5 sumber (tiap kutipan bertanda [n]).
- Tak terbaca: Reddit, Threads/X, ulasan toko, Migaku, Kindle, Quizlet/Ruangguru/Duolingo versi Indonesia.
- Penafian: daftar kutipan ini diambil lewat pembaca halaman otomatis. Cek ulang bila dikutip keluar.

## 2. Bukti (40 butir)

**A. Panduan Apple (HIG, Managing notifications)** ([tautan](https://developer.apple.com/design/human-interface-guidelines/managing-notifications.md))
- [1] "People appreciate receiving a notification for something they care about, but they don't always appreciate being interrupted."
- [2] "Build trust by accurately representing the urgency of each notification."
- [3] "You don't want people to feel that a notification uses a high level of urgency to interrupt them with low-priority information."
- [4] Passive: "Information people can view at their leisure."

**B. NN/g, indikator vs notifikasi** ([tautan](https://www.nngroup.com/articles/indicators-validations-notifications/))
- [5] "Passive notifications can easily be missed, since they require no user action."
- [6] "Passive notifications are typically not urgent and should be less intrusive."
- [7] "Action-required notifications are often urgent and should be intrusive"
- [8] "modal popups that interrupt the user, forcing immediate attention"
- [9] "an indicator badge on a mobile-app icon shows that the user has received a notification"
- [10] Pop-up "may even annoy users because it will disrupt their current task"

**C. Studi interupsi saat membaca (Zermiani dkk. 2024)** ([tautan](https://public-pages-files-2025.frontiersin.org/journals/cognition/articles/10.3389/fcogn.2024.1434642/text))
- [11] "Interruptions are often pervasive and require attentional shifts from the primary task."
- [12] Pengaruh memori kerja & pengetahuan "significantly predicted the time needed to resume reading following an interruption"
- [13] "Limited data are available on the factors influencing individuals' efficiency in resuming from interruptions"

**D. Forum LingQ** ([antrean menumpuk](https://forum.lingq.com/t/lingqs-piling-up-in-srs/37489), [terlalu banyak](https://forum.lingq.com/t/too-many-lingqs/5737), [saran review](https://forum.lingq.com/t/lingq-flash-card-review-advice/38462))
- [14] alexb: "if I miss one day of the SRS feature I'll have over 100 in the due pile"
- [15] ericb100: "You simply can't keep up."
- [16] ericb100: "you'll spend several days catching up and eventually all your time would be sucked up in reviewing"
- [17] charrich87: "If you just continue to read though you're essentially doing SRS naturally, in context."
- [18] nfera: "I do not use the flashcard system. I consider that there are better uses of my time."
- [19] zoran: "You should be creating more LingQs than you can possibly review this way."
- [20] anon10087749: "I'm worried that if I let my list grow too large there'll be words in there that I'll never end up reviewing."
- [21] SanneT: "I tend to get fazed by too many LingQs in the daily e-mail."
- [22] steve: "You cannot review all your LingQs."
- [23] Jamie: "getting my LingQs quickly to the 4 level was premature - they would be forgotten again just as quickly."
- [24] Jamie: "flashcards, vocab lists etc. give me a headache !"
- [25] steve: "But most of your time should be spent reading and listening."
- [26] kraemder: "Do I just wait for the app to tell me it's time to review?"
- [27] bamboozled: "I generally don't use SRS, neither on LingQ nor elsewhere."
- [28] bamboozled: "the more general 'review due' option seems to reach astronomical proportions really quickly"
- [29] llearner: "Sometimes it's better to deal with less information at once so you stay more focused and achieve more."
- [30] llearner: "I would review this daily deck in short daily sessions of 3 to 5 minutes as often as possible."
- [31] llearner: "I set up a mini goal on every pass by focusing on a particular area or skill to work on"

**E. Forum Readlang** ([batas harian](https://forum.readlang.com/t/limit-the-number-of-practice-words-that-are-scheduled-up-per-day/1255), [tanpa streak](https://forum.readlang.com/t/idea-keep-it-lean-no-need-for-streaks/92))
- [32] alec: "often I get daily flashcard reminders for over 150 cards for practice each day."
- [33] alec: "Is there a way to limit the number of flashcards I'm reviewing per day"
- [34] alec: "I'm also not getting 150+ reminders!"
- [35] steve: "I don't think you should feel an obligation to complete all your scheduled words every day."
- [36] steve: "I really hope you don't mean that you are getting 150 reminders, that would be bad!"
- [37] mark-alexander: "a clean and lean interface that makes the software more accessible to newbies"
- [38] pavel-pacak: "Streaks turn apps from fun to chores."
- [39] sr: "once I start them I super hate stopping"
- [40] jonathan: "the ability to not get warnings about loosing my streak"

## 3. Vonis per hipotesis

**H1: titik kecil di header Baca membantu, pop-up mengganggu.** Vonis: **terbukti sebagian**.
- Mengganggu: pop-up memutus tugas [8][10][11]; pembaca sulit lanjut setelah diputus [12].
- Titik pasif sesuai: urgensi rendah = tak mengganggu [4][6][2][3].
- Risiko: pasif mudah terlewat [5]. Itu justru yang diinginkan di layar baca.
- Celah: tak ada uji titik di layar baca e-reader. Ini penalaran dari panduan, bukan uji langsung.

**H2: angka besar bikin tekanan, jadi tampilkan secukupnya.** Vonis: **terbukti**.
- Antrean menumpuk bikin menyerah [14][15][16][20][21][28][32].
- Pembelajar bilang baca sudah cukup [17][22][25] dan tak wajib habis [35].
- Jadi di Baca: titik tanpa angka. Angka cukup di Home/Kata.

**H3: pengingat harus bisa diabaikan tanpa rasa bersalah.** Vonis: **terbukti sebagian**.
- Pengguna benci peringatan menekan [38][39][40] dan suka antarmuka ramping [37].
- Belum ada uji pada pengguna Indonesia.

**H4: istilah paling dimengerti pengguna Indonesia.** Vonis: **belum jelas**.
- Tak satu pun dari 40 butir membahas bahasa Indonesia. Duolingo/Quizlet/Ruangguru versi Indonesia tak terbaca.
- Pencarian Duolingo & Quizlet hanya memberi ringkasan pihak ketiga tanpa nama tombol.
- Yang ada: kamus Univ. Victoria mendaftar "latihan" = exercise ([tautan](https://hcmc.uvic.ca/project/indonesian/wordlist.htm)). Bukan bukti pemakaian di app.
- Pilihan di bawah adalah penalaran desain + konsistensi kode, bukan bukti. Uji dengan tester AI/beta.

## 4. Istilah di app sekarang (`ui.js`)
- Home (baris 867): "N kata siap diulang" + tombol "Ulas sekarang". **Dua istilah dalam satu tombol.**
- Kata (baris 2449): "N kata siap diulas".
- Layar kartu (baris 2577): "Cek ulang". Baca (banyak baris): "Baca ulang", "Muat ulang". Ini kata kerja lain, biarkan.
- Hasilnya: "diulang" di Home, "diulas" di Kata, "Ulas" di tombol. Sinta & Ilham benar.

## 5. Usulan satu istilah: "diulang"
- **Pakai "ulang"** (kata kerja: "diulang", "Ulang sekarang"). Alasan penalaran:
  - Sudah dipakai di judul Home dan nama jadwal ("jadwal ulang"). Ubahan paling sedikit.
  - "Ulas" mudah tertukar dengan "ulasan" (rating/ulasan buku). Ini tebakan, belum diuji.
  - "Latihan" terlalu luas (ada tab Ngomong). "Review" bahasa Inggris, UI kita santai Indonesia.
- Tabrakan kecil dengan "Baca ulang" (baca buku dari awal). Beda konteks, biarkan.
- Buang "Ulas/diulas" dari semua teks pengguna.

## 6. Bentuk pengingat paling halus di Baca
- **Titik kecil** (Wasabi, ±8px) di sudut tombol menu/kartu di header Baca. Tanpa angka, tanpa gerak, tanpa suara.
- Muncul hanya bila ada kata siap diulang. Hilang sendiri setelah habis diulang.
- Ketuk titik/tombol: buka lembar kecil "N kata siap diulang" + tombol "Ulang sekarang" dan "Nanti". Bukan pop-up otomatis.
- Label baca-layar: "N kata siap diulang". Tombol tetap minimal 44px.
- Jangan: toast, spanduk di atas teks, getar, titik merah. Sejalan dengan `riset-petunjuk-onboarding-baca.md`.
- Satu sumber data: pakai fungsi `isDue` yang sama dengan Home.

## 7. Langkah berikutnya
- Developer: backlog #97. Samakan istilah, tambah titik di header Baca.
- Setelah rilis: tanya tester AI apakah titik terlihat dan tidak mengganggu.
- Cari bukti Indonesia (Duolingo/Quizlet ID, ulasan Play Store) saat beta; akan menguji H4.
