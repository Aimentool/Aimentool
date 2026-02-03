# AIMENTOOL MESTER SABLON - FEJLESZTŐI ÚTMUTATÓ (v1.0)

## 1. ALAPELVEK (A Gép Logikája)
1. **Adatvezérelt (Data-Driven):** SOHA ne írj fix szöveget a kódba! Minden szöveg, link és beállítás a `src/config/*.json` fájlokból jöjjön.
2. **Modularitás:** Minden szekció (pl. Hero) egy önálló sziget. Saját mappája van a configban és a components/sections-ben.
3. **Mobile First:** Először telefonra tervezünk, utána nagyítjuk fel desktopra.
4. **Placeholder Elv:** Ha nincs kész a végleges tartalom (videó/kép), használj helyettesítőt, de a logikát építsd meg.

## 2. MAPPA STRUKTÚRA & FUNKCIÓK
- `src/config/`: **AZ ADATBÁZIS.** Itt szerkesztjük a weboldalt kódolás nélkül.
  - `site_settings.json`: Globális adatok (Cégnév, Tel, Social).
  - `theme.json`: Színek, betűtípusok, stílusjegyek.
  - `[komponens]/content.json`: Az adott rész szövegei.
  - `[komponens]/style.json`: Az adott rész kinézete.
- `src/core/`: **A MOTOR.** Segédfüggvények (SEO, Asset betöltés).
- `public/uploads/`: **A TARTALOM.** Ide csak be kell dobni a képeket.

## 3. MUNKA FOLYAMAT (Workflow)
1. **Tervezés:** Milyen adatok kellenek? -> JSON struktúra létrehozása.
2. **Váz (Skeleton):** Komponens megírása "szürke dobozokkal".
3. **Logika:** Adatok bekötése a JSON-ből.
4. **Stílus:** Tailwind osztályok ráhúzása a `style.json` alapján.
5. **Tartalom:** Végleges képek/szövegek feltöltése.

## 4. DESIGN TOKENS (Alapértelmezett)
- Primary Color: `var(--color-primary)` (Mentol)
- Secondary Color: `var(--color-secondary)` (Deep Teal)
- Font: Montserrat (Headings), Inter (Body)