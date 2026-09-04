# Keilusjoppan – starter

Einföld GitHub Pages vefsíða fyrir vörur og lagerstöðu.

## Skrár

- `index.html` – uppbygging síðunnar
- `style.css` – útlit
- `products.js` – vörurnar og lagerstaðan

## Að breyta lagerstöðu

Opnaðu `products.js`.

```js
inStock: true
```

merkir **Til á lager**.

```js
inStock: false
```

merkir **Ekki til á lager**.

## Setja á GitHub Pages

1. Búðu til nýtt repository á GitHub, t.d. `keilusjoppan`.
2. Settu þessar þrjár vefskrár inn í repository.
3. Farðu í **Settings → Pages**.
4. Undir **Build and deployment** velurðu að birta frá branch.
5. Veldu `main` og `/root`.
6. Vistaðu.

Síðan fær þá fyrst GitHub-slóð. Síðar má tengja eigið lén.

## Athugið varðandi Bowltech

Ekki gera sjálfkrafa ráð fyrir að heimilt sé að afrita vörumyndir eða lýsingar frá vef birgja.
Fáðu leyfi birgja ef þú ætlar að endurbirta myndir/texta þeirra, eða fáðu myndagögn í gegnum
opinbert product feed/API ef slíkt er í boði.

Vöruheiti, verð Keilusjoppunnar og lagerstaða eru sett inn í `products.js`.
