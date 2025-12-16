# 🚀 MALA PWA - Démarrage en 2 minutes

## ⚡ Pour tester MAINTENANT

### Sur Mac (toi)

```bash
# 1. Va dans le dossier
cd ~/Downloads/mala-pwa

# 2. Lance le serveur
python3 -m http.server 8000

# 3. Ouvre dans ton navigateur
# http://localhost:8000
```

C'est tout ! L'app s'ouvre dans ton navigateur. 🎉

---

## 📱 Tester sur ton téléphone

### Étape 1 : Trouve ton IP

```bash
# Sur Mac
ipconfig getifaddr en0
```

Tu vas voir quelque chose comme : `192.168.1.45`

### Étape 2 : Sur ton téléphone

1. Connecte-toi au **même WiFi** que ton Mac
2. Ouvre Safari (iPhone) ou Chrome (Android)
3. Tape dans l'adresse : `http://TON_IP:8000`
   - Exemple : `http://192.168.1.45:8000`

### Étape 3 : Installe l'app

**iPhone :**
- Appuie sur Partager ⬆️
- "Sur l'écran d'accueil"
- Confirme

**Android :**
- Menu ⋮
- "Installer l'application"
- Confirme

L'app est maintenant sur ton écran d'accueil ! 🌟

---

## 🌐 Déployer en ligne (GRATUIT)

### Netlify (Le plus simple - 30 secondes)

1. Va sur [netlify.com](https://app.netlify.com/drop)
2. Glisse-dépose le dossier `mala-pwa`
3. Attends 10 secondes
4. TON LIEN EST PRÊT ! 🎉

Tu recevras un lien genre : `https://mala-xyz.netlify.app`

Partage ce lien avec tes amis, ils pourront :
- Jouer directement dans le navigateur
- Installer l'app sur leur téléphone
- Créer/Rejoindre des groupes

---

## 🎮 Comment jouer

1. **Crée un groupe**
   - Entre ton prénom + nom du groupe
   - Note le code à 6 chiffres
   - Partage-le !

2. **Tes amis rejoignent**
   - Ils entrent le code
   - Ils sont dans le groupe !

3. **Lancez des défis**
   - Défi du Jour = Quiz 30s
   - Défi Express = Ultra rapide 10-15s

4. **Gagnez des points**
   - Rapidité = Plus de points
   - Classement en temps réel

---

## 🛠️ Personnaliser

Tous les fichiers sont modifiables :

- **app.js** → Ajouter des quiz
- **style.css** → Changer les couleurs
- **index.html** → Modifier le texte

Consulte le README.md pour plus de détails !

---

## ❓ Problèmes ?

### "Ça ne marche pas en local"

```bash
# Essaie avec Node.js
npx http-server -p 8000
```

### "Je ne peux pas me connecter depuis mon téléphone"

- Vérifie que tu es sur le **même WiFi**
- Vérifie ton **pare-feu**
- Essaie `python3 -m http.server 8000 --bind 0.0.0.0`

### "L'app ne s'installe pas"

- Il faut HTTPS ou localhost
- Déploie sur Netlify pour avoir HTTPS gratuit

---

## 🎯 Prochaine étape : Firebase

Quand l'app marche bien en local, on passera sur Firebase pour :
- ✅ Sync en temps réel entre joueurs
- ✅ Données persistantes en ligne
- ✅ Partage de groupe entre appareils

Dis-moi quand tu es prêt ! 🚀

---

**C'est parti ! Let's go ! 🌟**
