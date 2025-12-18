# 🌟 MALA PWA V2 - Nouveau Design Figma

Version redesignée complète avec le design Figma officiel.

## ✨ Nouveau Design

✅ **Couleurs Figma** :
- Fond : #2A2A2A (gris foncé)
- Violets : #7222FF, #823BFF, #9C65FF
- Jaune : #F2D852
- Blanc/Noir

✅ **Polices Figma** :
- **Codigra** (logo) - Fichier inclus
- **Super Dream** (titres) - Fichier inclus
- **Inter** (texte) - Google Fonts

✅ **Pages implémentées** :
1. Page pseudo (accueil)
2. Page créer un groupe
3. Page rejoindre un groupe
4. Feed d'activité

## 🚀 Lancer l'app

```bash
cd mala-pwa-v2
python3 -m http.server 8000
```

Ouvre `http://localhost:8000`

## 📱 Flow de l'app

1. **Entre ton pseudo** → Choisis créer ou rejoindre
2. **Créer** : Nom + Difficulté → Code 5 chiffres généré
3. **Rejoindre** : Entre code 5 chiffres
4. **Feed** : Activités du groupe + Navigation bottom bar

## 🎨 Nouveautés

- ✅ Code à **5 chiffres** (plus 6)
- ✅ Sélecteur de **difficulté**
- ✅ Feed d'**activité** en temps réel
- ✅ **Bottom navigation** bar jaune
- ✅ Design **Figma exact**
- ✅ Polices **custom** intégrées

## 📁 Structure

```
mala-pwa-v2/
├── index.html           # HTML avec toutes les pages
├── style.css            # CSS Figma design
├── app.js               # JavaScript
├── fonts/
│   ├── Codigra.ttf
│   └── Super_Dream.ttf
├── manifest.json
└── service-worker.js
```

## 🎯 À faire

- [ ] Ajouter l'image mascotte (mascotte.png)
- [ ] Implémenter la page Classement
- [ ] Implémenter la page Défis
- [ ] Implémenter la page Profil
- [ ] Ajouter le QR code (optionnel)
- [ ] Créer les icônes PWA

## 💡 Personnalisation

### Changer la difficulté

Dans `app.js`, la difficulté est sauvegardée dans `group.difficulty`.
Tu pourras l'utiliser pour ajuster :
- Le temps des quiz
- La difficulté des questions
- Les bonus de points

### Ajouter une mascotte

Place ton image dans le dossier et nomme-la `mascotte.png`.
Le CSS l'affichera automatiquement aux bons endroits.

## 🚀 Déployer

Même méthode que V1 :
- Netlify (glisse-dépose le dossier)
- Vercel
- GitHub Pages

## ⚠️ Note sur les polices

**Codigra** est une police DEMO pour usage personnel.
Pour usage commercial, achète la licence :
https://prioritypeco.com/product/codigra-modern-retro-font/

**Super Dream** : Vérifie aussi la licence si usage commercial.

---

Créé avec ❤️ pour MALA
Let's go ! 🌟
