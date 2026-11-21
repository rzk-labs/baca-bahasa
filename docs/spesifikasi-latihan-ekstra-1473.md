# Spesifikasi: Latihan ekstra tak menempel + pesan Lupa jujur (#1473)

## Intinya
- Keluar dari Latihan ekstra lewat menu bawah tidak mereset mode. Ulang berikutnya tak menjadwal ulang.
- Jawab Lupa menurunkan level, tapi teks bilang "jadwal tak berubah". Perlu jujur.
- Perbaikan kecil, hanya `ui.js` + `sw.js`. Tanpa XP baru, `api/` tak diubah.

## 1. Bug: mode menempel
- Penyebab: `quickExtra`, `quickRun`, `quickPend` hanya direset di tombol Tutup (`q3Close`) dan layar selesai.
- Pindah tab/Home/Baca lewat menu bawah melewati keduanya, jadi `quickExtra` tetap `true`.
- Akibat: "Ulang" biasa pada kata jatuh tempo jatuh ke cabang ekstra. Due/level tak berubah.
- Perbaikan: di `setTab(t)`, bila `t !== 'kata'`, set ketiganya `null`/`false` (`quickLogged = false` juga).
- Jangan reset saat `setTab('kata')` dipanggil tombol Mulai (`xtraBtn`): ia mengisi nilai sebelum memanggil.

## 2. Pesan jujur
- Lupa di ekstra: level turun satu (`v.lv-1`), jadwal ulang (due) tetap.
- Teks kartu Lupa saat ini: "Nggak apa-apa, levelnya turun satu. Jadwal tetap". Sudah mendekati; rapikan jadi "Levelnya turun satu. Jadwal ulang tetap".
- Ulang di ekstra: "Jadwal kata ini tidak berubah" (benar, level juga tetap). Biarkan.
- Jawab Ingat di ekstra: "Mantap. Jadwal kata ini tidak berubah". Biarkan.
- Tombol Home (`xtraBtn`): sub-teks "Belum waktunya. Jadwal tidak berubah" jadi "Belum waktunya. Lupa menurunkan level, jadwal tetap". Samakan `aria-label`.
- Layar selesai: "Latihan ekstra beres. Jadwal ulang tetap sama." → "Latihan ekstra beres. Jadwal ulang tetap, level bisa turun bila kamu lupa."

## 3. Uji (lewat kode & manual)
- Mulai ekstra, pindah ke Home, buka Kata, tekan Ulang pada kata jatuh tempo: `due` jadi besok, `known=false`.
- Mulai ekstra, tutup lewat menu bawah, mulai ekstra lagi lewat Home: tetap jalan normal.
- Lupa di ekstra: `lv` turun satu, `due` sama, pesan baru tampil.
- `node --check ui.js`. Naikkan versi `C` di `sw.js`. XP/lencana tak berubah.
