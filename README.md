# The Vow Atelier — By Nada

Site portfolio de Nada, photographe de mariage à Paris.

Site statique (HTML/CSS/JS, sans build) :

- `index.html` : accueil, à propos, mission, services, formules & tarifs 2026–2027, galerie, réservation
- `styles.css` : charte beige / taupe (Cormorant Garamond, Montserrat, Parisienne)
- `script.js` : menu mobile, animations, lightbox, formulaire → message WhatsApp pré-rempli
- `assets/img/` : photos optimisées

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou :

```bash
python3 -m http.server 8000
```

## Mettre en ligne (GitHub Pages)

Settings → Pages → Source : « Deploy from a branch » → choisir la branche et `/ (root)`.

## Modifier

- Tarifs / textes : directement dans `index.html`
- Photos : remplacer les fichiers dans `assets/img/` (garder les mêmes noms) ou ajouter des `<figure>` dans la section `#galerie`
- Numéro WhatsApp : constante `WHATSAPP_NUMBER` dans `script.js`
