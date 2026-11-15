# Riset #1088: XP baca ulang buku tamat, cegah curang

Metode: WebSearch + WebFetch, 15 Nov 2026. Semua kutipan persis dari halaman yang terbuka (Inggris). Reddit, Play Store, Threads/X tidak terbuka; diganti forum, blog, media, artikel industri. Tidak mengulang `riset-xp-streak-lencana.md` (#38-47 soal XP grinding) dan `riset-setelah-tamat-buku.md`.

## Intinya
- Baca ulang bisa jadi "tambang XP". Terbukti di app lain. Aturan batas itu wajar.
- Usul: baca ulang buku tamat = 0 XP halaman. Kata baru tetap dapat XP.
- Aturannya harus jelas di layar, supaya tidak terasa semena-mena.

## 1. Kondisi sekarang (dari kode)
- Halaman beri 2 XP (5 XP di pergantian bagian). Ketuk kalimat 1 XP. Simpan kata 2 XP.
- Tamat 10 XP, hanya sekali (`doneAt`). Sudah aman dari dobel.
- Halaman dihitung sekali per hari per kalimat. Besok bisa diulang lagi. Total XP naik tanpa batas.
- Target harian hanya menghitung 10 XP halaman. Tapi ketukan kalimat tak dibatasi.
- Sheet Tamat menulis `+N XP hari ini`. Home memotong ke target. Itu sumber angka beda.

## 2. Bukti: 33 kutipan, 4 jenis sumber

### A. Forum LingQ (pengguna & staf)
| # | Kutipan | Sumber |
|---|---|---|
| 1 | "i'm not getting any more coins no matter how many times I review the words already on status 4" (zoe8) | [forum](https://forum.lingq.com/t/4-coin-review-reward-all-stuck-on-already-known-words/37043) |
| 2 | "You don't get coins by reviewing LingQs." (zoran) | sama |
| 3 | "You can earn coins twice for the same word." (zoran) | sama |
| 4 | "which you can't earn coins from anymore, right?" (zoe8) | sama |
| 5 | "it provides little to no coins gained for my daily goal." (nsherman) | [forum](https://forum.lingq.com/t/vocabulary-progress-gaining-little-to-zero-daily-coins/2596372) |
| 6 | "I would gain at least 5 to 10 coins for each review session of vocabulary." (nsherman) | sama |
| 7 | "I won't see any gain in my daily coins." (nsherman) | sama |
| 8 | "That sounds like a bug, we will investigate it." (zoran, staf) | sama |
| 9 | "Yes, if you spend time on a page, our system will consider it as being read." (mark, staf) | [forum](https://forum.lingq.com/t/daily-goal-system/34031) |
| 10 | "Sometimes i just want to skim through the page and back, but it counts as read" (AK1809) | sama |
| 11 | "so I set it to 25 or 50 for the one day and it said I had hit my goal." (Quaterno) | sama |
| 12 | "I think that coins (now the primary tracker for streaks) should be given for LingQing and learning phrases." (dgbeecher) | sama |
| 13 | "I wish I could set my daily goal to number of words read, rather than LingQs or coins." (Velibor) | sama |
| 14 | "Perhaps there is a way to reward people for reading through a page and moving to the next one" (Unladenswallow0) | [forum](https://forum.lingq.com/t/suggestion-for-earning-coins-for-intermediateadvanced-learners/1103476) |
| 15 | "they can discourage you from using better learning strategies." (LeifGoodwin) | sama |
| 16 | "The point/coin system of tracking progress feels pretty arbitrary." (sockdoll) | sama |
| 17 | "Believe me: If you don't care about coins and streaks, it reduces stress." (DJTembo) | sama |

### B. Blog pengguna Duolingo
| # | Kutipan | Sumber |
|---|---|---|
| 18 | "the XP earned per lesson remains static as the difficulty increases" | [103percent](https://103percent.blogspot.com/2023_12_03_archive.html) |
| 19 | "you're incentivized to earn the most XP per unit time possible" | sama |
| 20 | "this often means reviewing easier lessons" | sama |
| 21 | "or grinding out redundant lessons in your mother tongue" | sama |

### C. Media: Kotaku (soal curang di Duolingo)
| # | Kutipan | Sumber |
|---|---|---|
| 22 | "Older users are usually more competitive" (pembuat alat curang) | [Kotaku](https://kotaku.com/duolingo-app-cheats-hacks-leagues-xp-why-duohacker-1850506482) |
| 23 | "want to win the Diamond League to get the achievement." | sama |
| 24 | "Often they expect them to cheat. So they look for revenge." | sama |
| 25 | "We want to maintain a fair experience for everyone." (juru bicara Duolingo) | sama |

### D. Artikel desain gamifikasi (industri)
| # | Kutipan | Sumber |
|---|---|---|
| 26 | "One option is to have a system that makes repeated behaviours in a day worth less each time." | [Game Developer](https://gamedeveloper.com/business/gamification-overjustification-effect-and-cheating) |
| 27 | "This makes it pointless to continue spamming." | sama |
| 28 | "he had been treated unfairly by the system." (pemain yang memanipulasi poin) | sama |
| 29 | "You can't break the rules if there are none!" | sama |
| 30 | "As a result, cheating is one of the most common unintended consequences of gamification." | [IRF](https://theirf.org/research_post/gamification-done-right-the-dos-and-donts/) |
| 31 | "Limiting the amount of points awarded for particular behaviors will sometimes be necessary." | sama |
| 32 | "Achievements must be compared with a relevant group of peers" | sama |
| 33 | "Gamification changes behaviors in the physical world and can affect people in real, tangible ways." | sama |

Catatan bias: #22-24 dari pembuat alat curang. #18-21 satu blog. Tidak ada angka untuk app baca buku.

## 3. Vonis hipotesis
| # | Hipotesis | Vonis | Dasar |
|---|---|---|---|
| H1 | Ulang materi mudah dipakai untuk mengumpulkan poin | **Terbukti** | #18-21, #26-27, #30 |
| H2 | Pengguna peduli soal curang | **Terbukti sebagian** | Peduli di liga/papan (#22-25). Untuk baca santai: belum jelas. |
| H3 | Baca ulang wajarnya tak beri XP, atau jauh lebih kecil | **Terbukti sebagian** | LingQ: ulas kata tak beri koin (#1-2). Batas poin dianjurkan (#26, #31). |
| H4 | Kata baru/ulasan kata layak tetap diberi XP | **Terbukti sebagian** | Pengguna minta koin untuk kata & frasa (#12, #5-7). |
| H5 | Mengurangi XP merusak rasa adil/motivasi | **Belum jelas** | Keluhan muncul saat aturan tak jelas (#5-8, #16). Tak ada data khusus baca ulang. |
| H6 | Aturan jelas & terlihat menjaga rasa adil | **Terbukti sebagian** | #29, #16, #25. Perlu uji di Keepo. |

## 4. Kesimpulan
- Batasi XP baca ulang. Risikonya kecil: Keepo bukan liga kompetitif.
- Jangan hukum. Beri tahu jelas di layar, tanpa kata "gagal".
- Jangan rombak level. Jangan ubah data lama.

## 5. Aturan XP (untuk developer)
1. Buku yang `doneAt`-nya sudah ada = "baca ulang".
2. Saat baca ulang: XP halaman (2 dan 5) = 0. Ketuk kalimat (`look`) = 0.
3. Tetap dapat XP: simpan kata baru 2 XP, latihan kata, Ngomong. Itu belajar nyata.
4. Tamat tetap 10 XP sekali saja (sudah jalan).
5. Satu sumber angka: sheet Tamat memakai `xpToday()`, sama dengan Home.
6. Baca ulang: sheet Tamat ganti `+N XP hari ini` jadi `Baca ulang: tanpa XP halaman`.
7. Toast `restartBook`: "Mulai dari awal. Baca ulang tidak kasih XP halaman. Kata baru tetap dapat XP."
8. Bukan baca ulang (belum tamat): tidak ada perubahan.
9. Tak ada migrasi. `db.xp`, `xpDay`, `pgXpDay` tidak disentuh. XP lama tetap.
10. Letak kode: `award()` di `ui.js`, `finishBook`, `restartBook`. Naikkan versi `C` di `sw.js`.
11. Jangan sentuh sheet Tamat (#1068) selain angka XP dan teks toast.

## 6. Daftar uji
- Tamatkan buku. Baca ulang 5 halaman. XP total tidak naik.
- Saat baca ulang, simpan 1 kata baru. XP naik 2.
- Saat baca ulang, ketuk kalimat. XP tidak naik.
- Target harian tidak penuh hanya dari baca ulang.
- Sheet Tamat dan kartu Target Home menunjukkan angka XP sama.
- Buku lain yang belum tamat tetap beri 2 XP per halaman.
- Tamat kedua tidak beri 10 XP lagi.
- Tombol Urungkan: buku kembali, XP tak berubah.
- Data lama (XP, lencana, streak) utuh setelah update.
- iPhone 390px: teks toast dan chip tidak terpotong.

## 7. Langkah berikutnya
- Developer kerjakan backlog no. 110.
- Setelah live: tester cek angka XP di tiga layar.
- Pantau keluhan "XP tidak naik". Bila banyak, pertimbangkan XP separuh.

Mockup: `docs/mockup-1088.html`.
