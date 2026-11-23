# Motion: bar progres mengisi (#1730)

## Intinya
- Bar XP & progres buku mengisi halus dari kiri saat tab dibuka.
- Hanya sekali per buka tab; render ulang tidak berkedip.
- Bar reader tidak dianimasi; reduced-motion mematikannya.

## 1. Cara kerja
- `setTab` memberi class `enter` di `#view` selama 800 ms.
- CSS `barfill`: scaleX 0 → 1, 550 ms, ease-out, asal kiri.
- Dikecualikan: bar di `.rmid` (reader).

## 2. Catatan
- Tanpa bayangan/neon baru; warna bar tetap dari tema.
- Versi cache dinaikkan ke kepo-v646.
- Mockup: docs/mockup-1730.html
