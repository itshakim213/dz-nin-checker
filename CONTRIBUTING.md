# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à **DZ NIN Checker** ! 

**Le validateur le plus complet et précis pour les Numéros d'Identification Nationale (NIN) algériens !** 🇩🇿

Ce guide vous aidera à contribuer efficacement au projet et à maintenir la qualité exceptionnelle de cette bibliothèque.

## 🚀 Démarrage Rapide

### 1. Fork et Clone
```bash
# Fork le repository sur GitHub, puis :
git clone https://github.com/itshakim213/dz-nin-checker.git
cd dz-nin-checker
```

### 2. Installation
```bash
npm install
```

### 3. Test de l'Interface Interactive (Recommandé !)
```bash
npm run test:interactive
```

**🎯 Pourquoi commencer par l'interface interactive ?**
- 🖥️ **Découverte intuitive** : Explorez toutes les fonctionnalités sans coder
- 🔍 **Validation en temps réel** : Testez vos NINs avec feedback visuel
- 🧮 **Mode debug fascinant** : Comprenez l'algorithme Luhn étape par étape
- 📊 **Analyse complète** : Voyez la décomposition détaillée des NINs

## 🧪 Tests

### Tests Automatisés
```bash
# Tests unitaires (Mocha)
npm test

# Tests avec Jest
npm run test:jest

# Tests en lot
npm run test:batch

# Couverture de code
npm run test:coverage
```

### Tests Manuels
```bash
# Interface interactive (recommandé) - 6 options avancées
npm run test:interactive

# Mode développement avec rechargement automatique
npm run dev
```

**🌟 Fonctionnalités de l'interface interactive :**
- **1️⃣ Validation unique** : Testez un NIN avec analyse complète
- **2️⃣ Validation multiple** : Traitez plusieurs NINs en une fois
- **3️⃣ Mode debug** : Voyez chaque étape du calcul Luhn en détail
- **4️⃣ Générateur** : Créez des NINs valides à partir d'une base
- **5️⃣ Démonstration** : Tests prédéfinis avec exemples variés
- **6️⃣ Quitter** : Sortie propre de l'application

## 📝 Types de Contributions

### 🐛 Bug Reports
- **🎮 Utilisez l'interface interactive** pour reproduire le bug facilement
- Incluez les étapes de reproduction détaillées
- Spécifiez l'environnement (OS, Node.js version)
- Testez avec différents types de NINs (valides/invalides)

### ✨ Nouvelles Fonctionnalités
- **💬 Discutez** de la fonctionnalité dans une issue avant de coder
- Assurez-vous qu'elle s'aligne avec l'objectif du projet
- **🧪 Ajoutez des tests complets** (unitaires + interface interactive)
- **🎮 Testez** avec l'interface interactive si applicable

### 📚 Amélioration de la Documentation
- **📖 Améliorez le README.md** avec focus sur l'interface interactive
- **💡 Ajoutez des exemples d'utilisation** pratiques
- **✏️ Corrigez les erreurs de typo** et améliorer la clarté
- **🎮 Documentez** les nouvelles fonctionnalités de l'interface

### 🧪 Tests
- **🐛 Ajoutez des cas de test** pour les bugs et nouvelles fonctionnalités
- **📊 Améliorez la couverture de code** (actuellement 23+ tests unitaires)
- **🔄 Testez** sur différentes versions de Node.js
- **🎮 Testez l'interface interactive** pour toute modification

## 🔧 Workflow de Développement

### 1. Créer une Branche
```bash
git checkout -b feature/nom-de-votre-fonctionnalite
# ou
git checkout -b fix/nom-du-bug
```

### 2. Développer
- **💻 Codez** votre fonctionnalité avec TypeScript strict
- **🧪 Ajoutez des tests** unitaires et d'intégration
- **🎮 Testez** avec `npm run test:interactive` (recommandé !)
- **✅ Vérifiez** que tous les tests passent (Mocha + Jest)

### 3. Linter
```bash
npm run lint
npm run lint:fix  # Pour corriger automatiquement
```

### 4. Commit
```bash
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
# ou
git commit -m "fix: corriger bug dans validation"
```

### 5. Push et Pull Request
```bash
git push origin feature/nom-de-votre-fonctionnalite
```

## 📋 Standards de Code

### TypeScript
- Utilisez des types stricts
- Documentez les fonctions avec JSDoc
- Suivez les conventions de nommage

### Tests
- Un test par fonctionnalité
- Tests de cas limites
- Tests d'erreurs

### Messages de Commit
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `test:` ajout/modification de tests
- `refactor:` refactoring
- `style:` formatage, point-virgules, etc.

## 🎯 Interface Interactive

**L'interface interactive est l'élément phare du projet !** 🎮

### 🛠️ Modifications de l'Interface
Si vous modifiez :
- **`src/test-interactive.ts`** : Testez **toutes les 6 options** du menu
- **`src/index.ts`** : Vérifiez que l'interface fonctionne toujours
- **Nouvelles fonctionnalités** : Ajoutez des options au menu si nécessaire

### 🎯 Standards de l'Interface
- **🎨 Interface colorée** : Utilisez des emojis et couleurs pour la clarté
- **📊 Feedback visuel** : Résultats formatés et explicites
- **🔄 Navigation fluide** : Retour au menu principal après chaque action
- **⚡ Performance** : Réponses rapides même avec de gros volumes

## 🚀 Release

### Versioning
- Suivez [Semantic Versioning](https://semver.org/)
- `MAJOR` : Changements incompatibles
- `MINOR` : Nouvelles fonctionnalités compatibles
- `PATCH` : Corrections de bugs

### Processus
1. Mettre à jour la version dans `package.json`
2. Mettre à jour le CHANGELOG.md
3. Créer un tag Git
4. Publier sur npm

## ❓ Questions ?

- 🐛 **Bugs** : [GitHub Issues](https://github.com/hakim/dz-nin-checker/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/hakim/dz-nin-checker/discussions)
- 📧 **Email** : ikhlefsidali@icloud.com

## 🙏 Merci !

Votre contribution aide à améliorer DZ NIN Checker pour toute la communauté algérienne des développeurs ! 🇩🇿
