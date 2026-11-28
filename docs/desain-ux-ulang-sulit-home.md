# Rancangan: pintasan "Ulang kata sulit" di Home (#2026)

## Intinya
- Home belum punya jalan pintas ke ulang kata sulit. Sekarang 3 ketukan.
- Usul: satu baris tipis di Home, "Ulang 4 kata sulit". Satu ketukan, langsung kartu.
- Hanya tampil bila ada kata sulit. Pakai tombol & kartu ulang yang sudah ada.

## 1. Peta alur sekarang
- Home → tab Kata (1) → sub-tab Kartu (2) → "Ulang N kata sulit" (3). Total 3 ketukan.
- Tombol (`khardGo`) hanya hidup di tab Kata. Sinta (pengguna AI) tak menemukannya.
- Di Home, kartu "siap diulang" dan "Ulang N kata" tak menyentuh kata sulit.

## 2. Rancangan
- **Kapan tampil:** hanya bila `hardPick().length > 0` dan tak sedang sesi ulang.
- **Letak:** satu baris tipis tepat di bawah kartu ulang (dueNudge / q1Go / xtraBtn). Bukan kartu baru.
- **Bentuk:** baris 44px, teks "Ulang 4 kata sulit", panah di kanan. Tanpa warna stabilo penuh.
- **Home tak makin ramai:** kartu ulang di atas tetap utama. Baris ini pintasan kedua.
- **Tak ada kartu ulang di atas:** baris tampil sendiri, tanpa celah kosong.
- **Hitungan:** semua kata sulit, sama dengan tombol di tab Kata.
- **Ada yang belum ada arti:** sub-teks "2 belum ada arti, diisi otomatis".
- **Arti diisi otomatis:** kartu ulang sudah memanggil `refillVocab` saat dibuka.
- **Offline & belum ada arti:** kartu menampilkan "belum ada arti". Tak ada galat, tombol tak mati.
- **Tak bentrok #230 / sheet arti:** kata "Sering diketuk" belum disimpan, jadi bukan kata sulit. Sheet arti tak disentuh.

## 3. Uji tampilan
- **320px:** "Ulang 12 kata sulit" muat satu baris. Bila sempit, teks dipotong titik-titik, tombol tetap 44px.
- **390px:** baris selebar kartu di atasnya. Jarak antar baris sama dengan nudge lain.
- **Bar bawah:** baris ada di dalam isi Home, bukan melayang. Tak menimpa bar tab.
- **Kondisi:** 0 kata sulit (tak tampil), 1 kata, 99 kata, dengan dan tanpa kartu jatuh tempo.
- **Aksesibilitas:** `aria-label` "Ulang N kata sulit. Langsung mulai". Ikon bendera sama dengan tab Kata.

## 4. Rincian untuk developer
- **Dipakai ulang:** `hardPick()` (ui.js ~3653), kelas `fw-nudge`, ikon `flag`.
- **Klik:** salin isi `khardGo` (ui.js ~3739): `quickPend`, `quickHard = true`, `deckLv = 0`, `kataSeg = 'kartu'`, lalu `setTab('kata')`.
- **Tambahan:** satu tombol (`homeHardGo`) di viewRak, setelah rantai kartu ulang (ui.js ~1372). Handler dekat `dueNudge` (~1392).
- **File disentuh:** `ui.js`, `style.css` (varian tipis `.hard-link`), `sw.js` (naikkan C).
- **Tak diubah:** `app.js`, `api/`, format data. Tanpa migrasi.
- **XP & streak:** tak berubah. Sesi kata sulit tak memberi XP tambahan. Tak ada XP ganda.
- **Setelah sesi:** layar "Ulang kata sulit beres" yang sudah ada tetap dipakai.
- **Selesai bila:** Home → satu ketukan → kartu kata sulit. Tombol hilang saat kata sulit 0.

## 5. Mockup
- Lihat `docs/mockup-2026.html` (Sebelum / Sesudah, lebar 390px).
