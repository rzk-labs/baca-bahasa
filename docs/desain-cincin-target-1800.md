# Cincin Target baca harus sama dengan angka (#1800)

## Intinya
- Cincin Target baca terisi ±seperempat padahal angkanya "0 mnt". Menyesatkan.
- Perbaikan: isi cincin dari menit utuh yang sama dengan angka.
- Cuma satu baris di Home yang berubah. Streak dan XP tidak disentuh.

## 1. Masalah
- Angka tengah memakai menit dibulatkan ke bawah (`minToday()`).
- Cincin memakai detik baca (`readSecToday()/(g*60)`).
- Baca 70 detik, target 5 mnt: angka "1", cincin 23%. Baca 20 detik: angka "0", cincin 7%.
- Pengguna jadi ragu pada target harian dan streak.

## 2. Perbaikan
- Di `goalCardHtml` (ui.js ±baris 219), ganti isi cincin jadi `Math.min(minToday(), g) / g`.
- 0 mnt = cincin kosong. 1 dari 5 = 20%. Saat `goalDone()` = penuh (m sudah = g).
- Satu-satunya pemakai cincin target adalah `goalCardHtml`. Sheet detail dan aria-label hanya memakai teks `goalTodayText()` yang sudah memakai menit utuh: tidak perlu diubah.
- Jangan ubah `readSecToday`, `goalDone`, streak, XP.
- Jangan sentuh sheet Tamat dan reader.

## 3. Uji
- 0 detik dan 59 detik: "0 mnt", cincin kosong.
- 60 detik, target 5: "1 mnt", cincin 20%.
- Capai target: "Beres!", cincin penuh.
- Cek di 320px: cincin dan teks tidak terpotong.
- `node --check ui.js`, naikkan versi `C` di sw.js.

## 4. Mockup
- Lihat `docs/mockup-1800.html` (Sebelum / Sesudah).
