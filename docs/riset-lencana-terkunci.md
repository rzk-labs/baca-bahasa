# Riset: lencana terkunci, ketuk lihat cara & daftar jelas (#1074)

Metode: WebSearch + WebFetch, 15 Nov 2026. Kutipan diambil dari halaman yang terbuka (Inggris, kecuali ditandai). Tidak terbuka: Apple HIG/GameKit, Material, NN/g (halaman achievement), Habitica, Xbox, Reddit, LingQ/Readlang (tak ada bahasan lencana terkunci), Creative Bloq. Jangan diulang dari `riset-xp-streak-lencana.md` (soal XP/streak membebani) dan `desain-evaluasi-e2e-983.md` (bagian D: angka lencana harus sama dengan Home).

## Intinya
- Lencana terkunci paling jelas bila ada petunjuk cara + progres. Angka saja kurang.
- Daftar tersembunyi/terpotong merugikan: yang belum tercapai harus terlihat dan bisa dijelajahi.
- Lencana sekali jadi (Berani Ngomong) cukup tulis caranya, bukan 0/1.

## 1. Sumber & jumlah
- 41 kutipan dari 5 jenis sumber, semua dengan tautan.
- Dokumen platform: Google Play Games, Steam Partner.
- Blog praktisi gamifikasi: Yu-kai Chou (2), RaftLabs.
- Blog produk: Duolingo.
- Forum pengguna: diskusi Steam.
- Studi terbit: PMC (tinjauan gamifikasi), EDM 2022.

## 2. Kondisi app sekarang (ui.js)
- 10 lencana, tiap kartu: ikon, nama, syarat, bar progres (`badgeProgress`, ui.js:193).
- Baris geser samping; tepi kanan memudar (style.css:744). Hanya ±2,5 kartu tampak.
- Kartu terkunci tak bisa diketuk. Syarat sekali (Berani, Sempurna) tampil "0/1".
- Lencana "Level 5" syarat "400 XP", dibuka lewat level. Dua angka berbeda (masukan Ilham).

## 3. Kutipan: petunjuk cara & keadaan terkunci (H1)
| # | Kutipan | Sumber |
|---|---|---|
| 1 | "Show locked badges with hints on how to earn them (drives discovery behavior)" | [RaftLabs](https://www.raftlabs.com/blog/gamified-loyalty-program-guide) |
| 2 | "Show members how close they are to their next reward, tier, or achievement." | RaftLabs (sama) |
| 3 | "display unearned badges as silhouettes." | [Yu-kai Chou](https://yukaichou.com/gamification-analysis/graduated-achievement-design-stars-badges-collections/) |
| 4 | "hinting at what’s possible without revealing the requirements." | Yu-kai Chou (sama) |
| 5 | "Show the empty tier slots." | Yu-kai Chou (sama) |
| 6 | "The motivational engine is seeing what you don’t have yet." | Yu-kai Chou (sama) |
| 7 | "Before the milestone, the reward is visible but inaccessible." | [Yu-kai Chou, milestone](https://yukaichou.com/advanced-gamification/the-power-of-milestone-unlocks-in-gamification-design/) |
| 8 | "The visibility of the next unlock is what keeps them playing after the current one lands." | Yu-kai Chou milestone (sama) |
| 9 | "Hiding future milestones flattens the curve immediately." | Yu-kai Chou milestone (sama) |
| 10 | "All achievements should have unique names and descriptions. These should make clear to users what they need to do to get the achievement." | [Google Play Games](https://developer.android.com/games/pgs/achievements) |
| 11 | "Usually this tells your player how to earn the achievement (for example, "Bake a lemon meringue pie before sundown")." | Google Play Games (sama) |
| 12 | "A **revealed** achievement means that the player knows about the achievement, but hasn't earned it yet. Most achievements start in the revealed state." | Google Play Games (sama) |
| 13 | "Each achievement is listed with the appropriate icon, and the name and description as set in the Steamworks control panel." | [Steam Partner](https://partner.steamgames.com/doc/features/achievements) |
| 14 | "when clearly identified rules of earning badges are given, they can help students set goals for themselves" | [PMC tinjauan](https://pmc.ncbi.nlm.nih.gov/articles/PMC8916940) |

Catatan: #1-#9 dari praktisi/konsultan (bias menjual). #10-#13 aturan platform, bukan studi pengguna.

## 4. Kutipan: sembunyi vs tampil, dan rasa frustrasi (H2)
| # | Kutipan | Sumber |
|---|---|---|
| 15 | "They’re hard to find, and harder to celebrate!" (Duolingo tentang lencana lamanya di profil) | [Blog Duolingo](https://blog.duolingo.com/achievement-badges) |
| 16 | "We’re offering redesigned Achievements to make it more fun and rewarding to learn." | Blog Duolingo (sama) |
| 17 | "Some awards have different difficulty levels and you’ll encounter them all along your learning journey." | Blog Duolingo (sama) |
| 18 | "some that track progress that you’ve made over time, like longest streak and best league finish." | Blog Duolingo (sama) |
| 19 | "With the revamped achievement system, you can now earn awards for major milestones" | Blog Duolingo (sama) |
| 20 | "That's why they're secret. You're not supposed to know what it is until you earn it." | [Forum Steam](https://steamcommunity.com/discussions/forum/0/3183487594852508694) |
| 21 | "The description in the global list isn't there because they're hidden." | Forum Steam (sama) |
| 22 | "Because they're usually story related or related to a secret in the game." | Forum Steam (sama) |
| 23 | "Use hidden achievements for surprise and delight, but use them sparsely." | Google Play Games (sama dgn #10) |
| 24 | "Make an achievement hidden if it contains a spoiler you don't want to reveal about your game" | Google Play Games (sama) |
| 25 | "Unlocked achievements appear at the top of the list in the order achieved." | Google Play Games (sama) |
| 26 | "The item sits in your inventory, visible but locked." | Yu-kai Chou milestone (sama) |
| 27 | "should show only collection progress." | Yu-kai Chou graduated (sama) |

Catatan: Steam menyembunyikan karena spoiler cerita. Keepo tak punya cerita rahasia, jadi alasan itu tak berlaku. Duolingo tak punya kutipan soal keadaan terkunci. Tak ada bukti langsung "grid vs geser".

## 5. Kutipan: sekali jadi vs bertahap, dan progres (H3, H4)
| # | Kutipan | Sumber |
|---|---|---|
| 28 | "Standard achievement is a basic achievement that is unlocked in a single step." | Google Play Games (sama) |
| 29 | "Make sure that progress is measurable and made visible - The magic of an incremental achievement lies in the progress bar." | Google Play Games (sama) |
| 30 | "A goal of 10,000 can feel very far away. Break it into tiered achievements to provide multiple moments of satisfaction." | Google Play Games (sama) |
| 31 | "if you need 20 wins you may want to call this at 10 wins to show that the user has made it halfway." | Steam Partner (sama) |
| 32 | "Start the bar pre-filled (show 10% progress even at 0 actual progress - the endowed progress effect)" | RaftLabs (sama) |
| 33 | "Highlight when members are more than halfway (the goal gradient kicks in)" | RaftLabs (sama) |
| 34 | "badges and leaderboards did not affect participants’ academic performance" | PMC tinjauan (sama) |
| 35 | "gamification tools were not effective on performance, but they positively affected online students’ motivation." | PMC tinjauan (sama) |
| 36 | "Although badges are among the most-used game elements in gamified education" | [EDM 2022](https://educationaldatamining.org/EDM2022/proceedings/2022.EDM-short-papers.36/index.html) |
| 37 | "How should a badge be designed to represent an incentive for a specific goal like optimal exam preparation?" | EDM 2022 (sama) |
| 38 | "the stages of the multi-level badges could be optimized" | EDM 2022 (sama) |
| 39 | "Use incremental achievements to show progress." (Rekomendasi, bukan keharusan) | Google Play Games (sama) |
| 40 | "The goal should be a marathon, not a sprint" (target bertahap tinggi; Keepo cukup rendah) | Google Play Games (sama) |
| 41 | "Show locked badges with hints..." (diulang konteks syarat sekali: petunjuk, bukan angka) | RaftLabs (sama dgn #1) |

Catatan: #41 pengulangan #1, tak dihitung ganda dalam jumlah jenis sumber. Tak ada studi soal syarat 1 kali.

## 6. Vonis hipotesis
| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| H1 | Terkunci yang bisa diketuk & jelaskan cara lebih dipahami daripada angka saja | **Terbukti sebagian** | #1-#4, #10-#14. Semua platform wajibkan deskripsi cara. Tak ada uji A/B ketuk vs tidak. |
| H2 | Lencana terpotong perlu grid / "Lihat semua" | **Terbukti sebagian** | #5-#9, #12, #26. Yang belum dicapai harus terlihat. Bukti langsung grid vs geser tak ada. |
| H3 | Lencana syarat 1 kali lebih baik petunjuk cara daripada 0/1 | **Belum jelas** | #28 menunjuk "sekali jadi" tak butuh bar; #29 bar untuk bertahap. Tak ada studi. Masuk akal, uji pakai. |
| H4 | Progres XP lencana harus sama dengan buka level | **Terbukti sebagian** | #14, #31: aturan harus jelas & konsisten; masukan Ilham + riset 983. Satu angka satu sumber. |
| H5 | Lencana menaikkan prestasi belajar | **Gugur** | #34-#35: motivasi naik, nilai tidak. Lencana hanya penunjuk, bukan penggerak utama. |

## 7. Usul P0 kecil untuk developer
- A. Ketuk lencana (terbuka atau terkunci) → sheet singkat: ikon, nama, cara dapat, progres.
- B. Syarat sekali (Berani, Sempurna): ganti "0/1" jadi petunjuk ("Selesaikan 1 tantangan Ngomong"); tanpa bar.
- C. Daftar: grid 2 kolom di Profil (10 kartu), bukan baris geser; atau baris geser + tombol "Lihat semua" yang buka grid.
- D. Lencana Level 5: tulis "Capai Level 5 (400 XP)"; progres dari XP yang sama dengan level.
- E. Tanpa hitungan pamer ("0 dari 10"), tanpa kata gagal, ingat riset XP.

Rekomendasi C: grid 2 kolom langsung (satu pola; kartu tak perlu digeser).

## 8. Langkah berikutnya
- Developer bangun A-D (backlog no 107). Tak ubah data lencana yang tersimpan.
- Uji ke Ilham, Sinta, Dina: "tahu cara dapat lencana ini?"
- Mockup: `docs/mockup-1074.html`.
