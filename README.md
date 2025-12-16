# 🌟 MALA - PWA (Progressive Web App)

Application web progressive de défis entre amis. Fonctionne sur mobile et desktop, installable comme une vraie app !

## ✨ Fonctionnalités

✅ **Créer/Rejoindre un groupe** avec code à 6 chiffres
✅ **Classement en temps réel** avec médailles 🥇🥈🥉
✅ **Quiz interactifs** avec timer 30s et bonus rapidité
✅ **Défis Express** rapides (moins de 15s)
✅ **Système de points** : base + bonus
✅ **Design MALA** : Jaune #FDB913 & Violet #5B2E91
✅ **Responsive** : Mobile & Desktop
✅ **Installable** : Comme une app native
✅ **Hors-ligne** : Fonctionne sans connexion
✅ **LocalStorage** : Données sauvegardées localement

## 🚀 Installation Rapide

### Option 1 : Tester en local

```bash
# 1. Va dans le dossier
cd mala-pwa

# 2. Lance un serveur local (choisis une méthode)

# Avec Python 3 :
python3 -m http.server 8000

# Avec Python 2 :
python -m SimpleHTTPServer 8000

# Avec Node.js (npx) :
npx http-server -p 8000

# Avec PHP :
php -S localhost:8000
```

3. Ouvre ton navigateur : `http://localhost:8000`
4. Sur mobile : trouve ton IP locale et ouvre `http://TON_IP:8000`

### Option 2 : Déployer gratuitement

#### Netlify (Recommandé - Le plus simple)

1. Va sur [netlify.com](https://netlify.com)
2. Inscris-toi gratuitement
3. Glisse-dépose le dossier `mala-pwa`
4. Ton app est en ligne ! 🎉

URL exemple : `https://mala-app.netlify.app`

#### GitHub Pages

```bash
# 1. Crée un repo GitHub
git init
git add .
git commit -m "MALA PWA"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/mala-app.git
git push -u origin main

# 2. Va dans Settings > Pages
# 3. Source : main branch
# 4. Ton app est en ligne !
```

URL : `https://TON_USERNAME.github.io/mala-app/`

#### Vercel

```bash
# Installe Vercel CLI
npm i -g vercel

# Déploie
cd mala-pwa
vercel
```

## 📱 Installer l'app sur téléphone

### iPhone (Safari)

1. Ouvre l'app dans Safari
2. Appuie sur le bouton Partager (⬆️)
3. Sélectionne "Sur l'écran d'accueil"
4. Confirme
5. L'icône MALA apparaît sur ton écran d'accueil ! 🌟

### Android (Chrome)

1. Ouvre l'app dans Chrome
2. Appuie sur les 3 points (⋮)
3. Sélectionne "Installer l'application"
4. Confirme
5. L'app est installée ! 🎉

## 🎮 Comment jouer

### Créer un groupe

1. Clique sur "Créer un groupe"
2. Entre ton prénom
3. Entre un nom de groupe
4. Note le code à 6 chiffres
5. Partage-le avec tes amis !

### Rejoindre un groupe

1. Clique sur "Rejoindre"
2. Entre ton prénom
3. Entre le code à 6 chiffres
4. C'est parti !

### Lancer un défi

- **Défi du Jour** : Quiz 30s avec bonus rapidité (max 150 pts)
- **Défi Express** : Réponse ultra-rapide (50 pts)

## 🛠️ Personnalisation

### Ajouter des quiz

Ouvre `app.js` et modifie le tableau `CHALLENGES` :

```javascript
const CHALLENGES = [
    {
        id: 5,
        type: 'quiz',
        question: 'Ta question ?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,  // Index de la bonne réponse
        basePoints: 100,
    },
    // ...
];
```

### Ajouter des défis express

Modifie `EXPRESS_CHALLENGES` :

```javascript
const EXPRESS_CHALLENGES = [
    {
        id: 5,
        title: 'Titre',
        question: 'Ta question rapide ?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        timeLimit: 10,  // secondes
        points: 50,
    },
    // ...
];
```

### Changer les couleurs

Ouvre `style.css` et modifie les variables :

```css
:root {
    --yellow: #FDB913;    /* Jaune MALA */
    --purple: #5B2E91;    /* Violet MALA */
    --black: #1A1A1A;
    --white: #FFFFFF;
    --light-gray: #F5F5F5;
}
```

## 🎨 Créer les icônes

Pour une PWA complète, crée deux icônes avec ton logo :

1. **icon-192.png** : 192x192 pixels
2. **icon-512.png** : 512x512 pixels

Utilise [Canva](https://canva.com) ou [Figma](https://figma.com) pour créer des icônes avec :
- Fond jaune #FDB913
- Étoile MALA au centre
- Texte "MALA" en violet

## 📊 Structure des fichiers

```
mala-pwa/
├── index.html           # Structure HTML
├── style.css            # Design & animations
├── app.js               # Logique JavaScript
├── manifest.json        # Config PWA
├── service-worker.js    # Cache hors-ligne
├── icon-192.png         # Icône petite (à créer)
├── icon-512.png         # Icône grande (à créer)
└── README.md            # Ce fichier
```

## 🔄 Migration vers Firebase

Quand tu voudras passer sur Firebase pour le multi-joueurs :

1. Crée un projet sur [Firebase Console](https://console.firebase.google.com)
2. Active Firestore Database
3. Installe le SDK :
```html
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>
```
4. Remplace `localStorage` par Firestore dans `app.js`

Je t'aiderai quand tu seras prêt ! 🚀

## 🐛 Debugging

### L'app ne s'affiche pas

- Vérifie que tous les fichiers sont au même niveau
- Vérifie la console du navigateur (F12)
- Vérifie que le serveur tourne bien

### Les données ne se sauvent pas

- Ouvre la console (F12) > Application > Local Storage
- Vérifie que les données sont là
- Vide le cache si besoin

### L'app ne s'installe pas

- Vérifie que tu utilises HTTPS (ou localhost)
- Vérifie que `manifest.json` est bien chargé
- Vérifie la console pour les erreurs

## 💡 Prochaines étapes

- [ ] Créer les icônes 192x192 et 512x512
- [ ] Ajouter plus de quiz
- [ ] Ajouter d'autres types de défis (photo, sportif, etc.)
- [ ] Migrer vers Firebase pour le multi-joueurs
- [ ] Ajouter un système de badges
- [ ] Historique des défis complétés
- [ ] Reset automatique du classement le lundi

## 🤝 Support

Besoin d'aide ? Pose tes questions et je t'aide ! 💪

---

Créé avec ❤️ pour MALA
Let's go ! 🌟⚡
