# The Vow Atelier — By Nada

Site portfolio de Nada, photographe de mariage à Paris.

Site statique (HTML/CSS/JS, sans build) :

- `index.html` : accueil, présentation, la journée, tarifs 2026–2027, photos, contact
- `styles.css` : mise en page et couleurs (Cormorant Garamond, EB Garamond)
- `script.js` : menu mobile, agrandissement des photos, formulaire → message WhatsApp
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
- Photos : remplacer les fichiers dans `assets/img/` (garder les mêmes noms) ou ajouter des `<img>` dans la section `#photos`
- Numéro WhatsApp : dans le lien `wa.me` de `script.js`
