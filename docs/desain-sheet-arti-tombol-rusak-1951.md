# Sheet arti kata: tombol rusak (#1951 "Ui slop!")

## Intinya
- Di HP, tombol "Simpan" jadi sempit dan hurufnya tegak ke bawah.
- Tombol bendera dan "Tandai & lanjut" membengkak jadi lingkaran besar.
- Penyebabnya satu aturan gaya yang saling menimpa; perbaikannya kecil.

## 1. Yang terlihat (screenshot)
- "Simpan" selebar ±85px, huruf S-i-m-p-a-n bertumpuk vertikal.
- Tombol bendera (Tandai sulit) berupa lingkaran ±210px, harusnya ikon 52px.
- "Tandai & lanjut" jadi lingkaran, harusnya pil lebar penuh.
- Baris "Sudah kenal / Ini nama" sudah benar.

## 2. Akar masalah
- `style.css` ±1068: `.wact>button:not(#wsave)` memberi `flex:1 1 120px`.
- Aturan ini punya bobot lebih tinggi karena `:not(#id)` dihitung sebagai id.
- Jadi aturan #1923 (±1401) untuk `#whard` dan `#wtanda` kalah.
- Hasilnya: bendera ikut melar, Simpan (`flex:1 1 0`, lebar min 0) terjepit.

## 3. Rencana perbaikan
- Naikkan bobot aturan `#whard` dan `#wtanda` di blok #1923 (mis. `.wact>button#whard`).
- `#wsave`: `flex:1 1 0` + `min-width:96px` + `white-space:nowrap`.
- Bendera tetap 52×52 bulat; Tandai & lanjut lebar penuh, tinggi 48px.
- Jangan ubah teks, logika, atau data.

## 4. Cara uji
- Lebar 320px, 360px, 390px, dan desktop.
- Kondisi: bendera tampil/sembunyi, "Tandai & lanjut" tampil/sembunyi.
- Tema terang dan malam.
- Naikkan versi `C` di `sw.js`.

Backlog: #196. Mockup: `docs/mockup-1951.html`.
