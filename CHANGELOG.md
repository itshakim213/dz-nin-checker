# 📝 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-01-27

### 🔧 Améliorations
- **📅 Logique d'année corrigée** : 
  - Premier chiffre = 0 → Ajouter 2000 (ex: 004 → 2004)
  - Premier chiffre = 9 → Ajouter 1000 (ex: 983 → 1983)
- **👤 Nationalité simplifiée** :
  - "Nationalité algérienne" (unifié pour homme et femme)
  - "Double nationalité" (invariant)
- **🎯 Format NIN corrigé** : Année aux positions 3-4-5 (positions correctes)
- **🧪 Tests mis à jour** : Tous les tests reflètent les nouvelles logiques
- **📚 Documentation mise à jour** : README avec exemples concrets et logiques claires

### 🐛 Corrections
- **🔍 Interprétation d'année** : Logique basée sur le premier chiffre au lieu d'un seuil arbitraire
- **👥 Genre de nationalité** : Formulation cohérente et professionnelle
- **📊 Exemples réalistes** : NINs avec années 2004, 1995, 1983 au lieu de valeurs génériques

---

## [1.0.0] - 2025-09-27

### 🎉 Ajouté
- **🎮 Interface interactive révolutionnaire** avec menu complet (6 options)
  - **1️⃣ Validation unique** : Analyse détaillée avec feedback visuel
  - **2️⃣ Validation multiple** : Traitement en lot de centaines de NINs
  - **3️⃣ Mode debug** : Calcul Luhn étape par étape avec explications
  - **4️⃣ Générateur** : Création de NINs valides à partir d'une base
  - **5️⃣ Démonstration** : Tests prédéfinis avec exemples variés
  - **6️⃣ Quitter** : Sortie propre de l'application
- **⚡ Validation ultra-robuste** des NINs algériens (18 chiffres)
- **🧮 Algorithme Luhn** pour validation des clés de contrôle
- **📊 Extraction intelligente** des informations :
  - Nationalité (Algérienne, Double nationalité)
  - Sexe (Homme, Femme)
  - Année de naissance
  - Code commune/pays
  - Numéro d'acte de naissance
  - Numéro d'enregistrement
- **🌐 API TypeScript complète** avec types stricts
- **🧪 Tests exhaustifs** :
  - 23+ tests unitaires (Mocha + Jest)
  - Tests d'intégration avec 50+ NINs générés aléatoirement
  - Tests de robustesse et cas limites
- **⚡ Performance optimisée** (0 dépendances externes)
- **📚 Documentation complète** avec exemples pratiques et interface interactive

### 🔧 Technique
- **🌐 Support TypeScript natif** avec types stricts
- **🧪 Configuration Mocha et Jest** pour tests complets
- **📦 Scripts npm** pour tous les cas d'usage (build, test, dev)
- **📊 Couverture de code** avec NYC
- **🔍 Linting ESLint** configuré et optimisé
- **⚙️ Build automatique** avec TypeScript

### 📚 Documentation
- **📖 README.md complet** avec focus sur l'interface interactive
- **🤝 Guide de contribution** (CONTRIBUTING.md) détaillé
- **💡 Exemples d'utilisation** pratiques et variés
- **🖼️ Aperçu visuel** de l'interface avec captures d'écran

### 🎯 Interface Interactive
- **🖥️ Menu principal** avec 6 options avancées
- **⚡ Validation en temps réel** avec feedback visuel immédiat
- **🧮 Mode debug** montrant chaque étape du calcul Luhn
- **🛡️ Gestion d'erreurs** avec messages explicites et colorés
- **🎨 Interface colorée** et intuitive avec emojis

---

## 🔮 Roadmap Future

### Version 1.1.0
- [ ] **🔧 Support des NINs** avec espaces et tirets
- [ ] **📅 Validation de plages** d'années spécifiques
- [ ] **📊 Export des résultats** en JSON/CSV depuis l'interface
- [ ] **🌐 Interface web simple** basée sur l'interactive

### Version 1.2.0
- [ ] **🏛️ Support des NINs** de test officiels
- [ ] **🔍 Validation de cohérence** des données
- [ ] **🌐 API REST** pour intégration
- [ ] **⚡ Cache de validation** pour performance

### Version 2.0.0
- [ ] **🆔 Support d'autres types** d'identifiants algériens
- [ ] **🖥️ Interface graphique** complète
- [ ] **🗄️ Base de données** des communes
- [ ] **⚡ Validation en temps réel** via API

---

**Note** : Ce projet suit le [Semantic Versioning](https://semver.org/). Les versions majeures introduisent des changements incompatibles, les versions mineures ajoutent des fonctionnalités compatibles, et les versions patch corrigent des bugs.
