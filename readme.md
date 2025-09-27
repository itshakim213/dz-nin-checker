# 🇩🇿 DZ NIN Checker

[![npm version](https://badge.fury.io/js/dz-nin-checker.svg)](https://www.npmjs.com/package/dz-nin-checker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

📦 **Available on npm**: [dz-nin-checker](https://www.npmjs.com/package/dz-nin-checker)

**Le validateur le plus complet et précis pour les Numéros d'Identification Nationale (NIN) algériens !** 

Développé avec l'algorithme Luhn modifié, ce package offre une validation ultra-robuste, une interface interactive intuitive, et des fonctionnalités avancées pour tous vos besoins de validation d'identité algérienne.

## 🚀 Fonctionnalités

### 🎯 **Interface Interactive Révolutionnaire**
- 🖥️ **Menu interactif complet** avec 6 options avancées
- 🔍 **Validation en temps réel** avec feedback visuel immédiat
- 📊 **Analyse détaillée** avec décomposition complète du NIN
- 🧮 **Mode debug avancé** montrant chaque étape du calcul Luhn
- 📦 **Validation en lot** pour traiter des centaines de NINs
- 🎲 **Générateur de NINs** pour tests et développement

### ⚡ **Validation Ultra-Robuste**
- ✅ **Validation complète** des NINs algériens (18 chiffres)
- 🧮 **Algorithme Luhn modifié** pour une précision maximale
- 📊 **Extraction intelligente** (nationalité, sexe, année, commune, etc.)
- 🛡️ **Gestion d'erreurs avancée** avec messages explicites
- 🔧 **Nettoyage automatique** des espaces et caractères parasites

### 🛠️ **Développeur-Friendly**
- 🌐 **Support TypeScript** complet avec types stricts
- ⚡ **Performance optimisée** (0 dépendances externes)
- 🧪 **Tests complets** (Mocha + Jest + Tests interactifs)
- 📚 **Documentation exhaustive** avec exemples pratiques
- 🔄 **API simple et intuitive** pour intégration facile

## 📋 Format du NIN Algérien

Le NIN algérien est composé de 18 chiffres structurés comme suit :

```
1 0 004 4567 89012 34 56
│ │  │   │     │   │  │
│ │  │   │     │   │  └─ Clé de contrôle (2 chiffres)
│ │  │   │     │   └──── Numéro d'enregistrement (2 chiffres)  
│ │  │   │     └──────── Numéro d'acte de naissance (5 chiffres)
│ │  │   └────────────── Code commune/pays de naissance (4 chiffres)
│ │  └─────────────────── Année de registre de naissance (3 chiffres)
│ └────────────────────── Sexe (0=Homme, 1=Femme)
└──────────────────────── Nationalité (1=Nationalité algérienne, 2=Double nationalité)
```

**🔍 Interprétation de l'année :**
- **Premier chiffre = 0** : Ajouter 2000 (ex: 004 → 2004, 023 → 2023)
- **Premier chiffre = 9** : Ajouter 1000 (ex: 983 → 1983, 995 → 1995)

**👤 Nationalité :**
- **Code 1** : "Nationalité algérienne" (pour homme et femme)
- **Code 2** : "Double nationalité"

### 📊 **Exemples Concrets**

| NIN | Description | Nationalité | Sexe | Année |
|-----|-------------|-------------|------|-------|
| `1000400000000000XX` | Homme algérien né en 2004 | Nationalité algérienne | Homme | 2004 |
| `1199500000000000XX` | Femme algérienne née en 1995 | Nationalité algérienne | Femme | 1995 |
| `2098300000000000XX` | Double nationalité né en 1983 | Double nationalité | Homme | 1983 |

## 🎮 **Essayez Maintenant ! Interface Interactive**

**🚀 Découvrez la puissance de DZ NIN Checker en quelques secondes !**

```bash
# Clonez et testez immédiatement
git clone https://github.com/hakim/dz-nin-checker.git
cd dz-nin-checker
npm install
npm run test:interactive
```

**✨ Ce que vous allez découvrir :**
- 🎯 **Menu interactif intuitif** avec 6 options avancées
- 🔍 **Validation instantanée** de vos NINs avec feedback visuel
- 🧮 **Mode debug fascinant** montrant chaque calcul étape par étape
- 📊 **Analyse complète** : nationalité, sexe, année, commune, acte de naissance
- 🎲 **Générateur de NINs** pour créer des identifiants valides
- 📦 **Validation en lot** pour traiter plusieurs NINs simultanément

**💡 Parfait pour :**
- 👨‍💻 **Développeurs** : Testez vos intégrations en temps réel
- 🏢 **Entreprises** : Validez des bases de données d'employés
- 🎓 **Étudiants** : Comprenez l'algorithme Luhn
- 🔍 **Curieux** : Explorez la structure des NINs algériens

---

## 📦 Installation

```bash
npm install dz-nin-checker
```

```bash
yarn add dz-nin-checker
```

```bash
pnpm add dz-nin-checker
```

## 🔧 Usage

### Import

```typescript
// ES6 Modules
import { validateNIN, generateValidNIN, debugNIN } from 'dz-nin-checker';

// CommonJS
const { validateNIN, generateValidNIN, debugNIN } = require('dz-nin-checker');
```

### Validation simple

```typescript
import { validateNIN } from 'dz-nin-checker';

const result = validateNIN('your-nin-here');

console.log(result.isValid); // true/false
console.log(result.nationality); // 'Nationalité algérienne' | 'Double nationalité' | 'Inconnu'
console.log(result.sex); // 'Homme' | 'Femme' | 'Inconnu'
console.log(result.year); // Année de naissance
```

### Validation avec message formaté

```typescript
import { validateNINWithMessage } from 'dz-nin-checker';

const result = validateNINWithMessage('your-nin-here');
console.log(result.message); 
// "✅ NIN valide - Nationalité algérienne Homme né en 2004"
// ou "❌ Clé de contrôle invalide. Attendue: 47, Fournie: 02"
```

### Validation en lot

```typescript
import { validateMultipleNINs } from 'dz-nin-checker';

const nins = ['nin1', 'nin2', 'nin3'];
const results = validateMultipleNINs(nins);

results.forEach((result, index) => {
  console.log(`NIN ${index + 1}: ${result.isValid ? '✅' : '❌'}`);
  console.log(result.message);
});
```

### Génération de NIN valide

```typescript
import { generateValidNIN } from 'dz-nin-checker';

// Génère un NIN valide à partir des 16 premiers chiffres
const validNIN = generateValidNIN('1000400000000000');
console.log(validNIN); // "1000400000000000XX" (XX = clé calculée)
// Homme, nationalité algérienne, né en 2004
```

### Mode debug

```typescript
import { debugNIN } from 'dz-nin-checker';

const debug = debugNIN('your-nin-here');

console.log(debug.components); // Détails de chaque composant
console.log(debug.validation); // Informations de validation
console.log(debug.calculation.steps); // Étapes du calcul de la clé
```

## 📚 API Reference

### `validateNIN(nin: string): NINDetails`

Valide un NIN et retourne les détails complets.

**Paramètres:**
- `nin` (string): Le NIN à valider (18 chiffres, espaces autorisés)

**Retour:**
```typescript
interface NINDetails {
  raw: string;                    // NIN nettoyé
  nationality: string;            // "Nationalité algérienne" | "Double nationalité" | "Inconnu"
  sex: string;                    // "Homme" | "Femme" | "Inconnu"
  year: string;                   // Année complète (ex: "2004", "1983")
  communeOrCountry: string;       // Code commune/pays
  birthAct: string;               // Numéro d'acte de naissance
  registerNumber: string;         // Numéro d'enregistrement
  controlKey: string;             // Clé de contrôle fournie
  calculatedKey: string;          // Clé de contrôle calculée
  isValid: boolean;               // Validité du NIN
  error?: string;                 // Message d'erreur si invalide
}
```

### `validateNINWithMessage(nin: string): ValidationResult`

Valide un NIN et retourne un message formaté.

### `validateMultipleNINs(nins: string[]): ValidationResult[]`

Valide plusieurs NINs en une seule opération.

### `generateValidNIN(base16Digits: string): string`

Génère un NIN valide à partir des 16 premiers chiffres.

### `debugNIN(nin: string)`

Analyse détaillée d'un NIN avec informations de débogage.

## 🧪 Tests & Démonstration

### 🎮 **Interface Interactive (Recommandé !)**
**L'expérience la plus immersive pour découvrir DZ NIN Checker**

```bash
npm run test:interactive
```

**🌟 Fonctionnalités de l'interface :**
- **1️⃣ Validation unique** : Testez un NIN avec analyse complète
- **2️⃣ Validation multiple** : Traitez plusieurs NINs en une fois
- **3️⃣ Mode debug** : Voyez chaque étape du calcul Luhn en détail
- **4️⃣ Générateur** : Créez des NINs valides à partir d'une base
- **5️⃣ Démonstration** : Tests prédéfinis avec exemples variés
- **6️⃣ Quitter** : Sortie propre de l'application

**💡 Pourquoi essayer l'interface interactive ?**
- 🎯 **Interface intuitive** : Pas besoin de coder pour tester
- 🔍 **Feedback visuel** : Résultats colorés et formatés
- 🧮 **Apprentissage** : Comprenez l'algorithme Luhn étape par étape
- ⚡ **Rapidité** : Testez des centaines de NINs en quelques secondes
- 🎲 **Créativité** : Générez des NINs pour vos tests

### 🧪 **Tests Automatisés**

```bash
# Tests unitaires complets (Mocha)
npm test

# Tests avec Jest
npm run test:jest

# Tests en lot (Mocha)
npm run test:batch

# Couverture de code
npm run test:coverage
```

**📊 Couverture de tests :**
- ✅ **23 tests unitaires** couvrant tous les cas d'usage
- ✅ **Tests d'intégration** avec 50+ NINs générés aléatoirement
- ✅ **Tests de robustesse** (NINs invalides, formats incorrects)
- ✅ **Tests de performance** et validation de l'algorithme Luhn

### 🖼️ **Aperçu de l'Interface Interactive**

**Menu principal :**
```
============================================================
🇩🇿 DZ NIN CHECKER - MENU INTERACTIF
============================================================
1. Valider un NIN unique
2. Valider plusieurs NINs
3. Analyser un NIN (mode debug)
4. Générer un NIN valide
5. Tests de démonstration
6. Quitter
============================================================
```

**Exemple de validation :**
```
📝 NIN saisi: 100040000000000008
✨ Statut: ✅ NIN valide - Nationalité algérienne Homme né(e) en 2004

📊 Détails:
   👤 Nationalité: Nationalité algérienne
   ⚥  Sexe: Homme
   📅 Année: 2004
   🏘️  Commune/Pays: 0000
   📄 Acte de naissance: 00000
   🔢 N° d'enregistrement: 00
   🔑 Clé de contrôle: 08
```

**Mode debug (calcul Luhn) :**
```
🧮 CALCUL DE LA CLÉ:
   Traitement des chiffres de droite à gauche :
     Position 16: 0
     Position 15: 0 × 2 = 0
     Position 14: 0
     Position 13: 0 × 2 = 0
     ...
   Somme totale: 2
   2 mod 10 = 2
   Clé de contrôle: 10 - 2 = 8
```

## 📈 Exemples d'utilisation

### Validation avec gestion d'erreurs

```typescript
import { validateNIN } from 'dz-nin-checker';

function checkNIN(nin: string) {
  try {
    const result = validateNIN(nin);
    
    if (result.isValid) {
      console.log(`✅ NIN valide pour ${result.nationality} ${result.sex} né(e) en ${result.year}`);
      return { success: true, data: result };
    } else {
      console.log(`❌ NIN invalide: ${result.error}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log(`💥 Erreur: ${error.message}`);
    return { success: false, error: error.message };
  }
}
```

### Intégration dans une API

```typescript
import express from 'express';
import { validateNINWithMessage } from 'dz-nin-checker';

const app = express();

app.post('/validate-nin', (req, res) => {
  const { nin } = req.body;
  
  if (!nin) {
    return res.status(400).json({ error: 'NIN requis' });
  }
  
  const result = validateNINWithMessage(nin);
  
  res.json({
    valid: result.isValid,
    message: result.message,
    details: result.details
  });
});
```

## 🔬 Algorithme

Le validateur utilise l'**algorithme Luhn** :

1. **Traitement de droite à gauche** des 16 premiers chiffres
2. **Alternance** : multiplication par 2 pour chaque deuxième chiffre
3. **Réduction** : si le résultat > 9, soustraire 9
4. **Somme** de tous les chiffres traités
5. **Modulo 10** de la somme
6. **Clé** = 10 - remainder (ou 0 si remainder = 0)

## 🛠️ Développement

### Setup
```bash
git clone https://github.com/hakim/dz-nin-checker.git
cd dz-nin-checker
npm install
```

### Scripts disponibles
- `npm run build` - Compile TypeScript
- `npm run test` - Lance les tests unitaires
- `npm run test:watch` - Tests en mode watch
- `npm run lint` - Vérification ESLint
- `npm run clean` - Nettoie le dossier dist

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :

1. 🍴 **Forker** le projet
2. 🌿 **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. ✅ **Committer** vos changements (`git commit -m 'Add amazing feature'`)
4. 📤 **Pusher** vers la branche (`git push origin feature/amazing-feature`)
5. 🔄 **Ouvrir** une Pull Request

## 📄 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Merci à la communauté algérienne des développeurs
- Inspiré par les standards internationaux de validation d'identifiants

## 🚀 **Prêt à Commencer ?**

**🎯 3 étapes pour découvrir DZ NIN Checker :**

1. **📥 Installation** : `npm install dz-nin-checker`
2. **🎮 Test interactif** : `npm run test:interactive`
3. **💻 Intégration** : Utilisez l'API dans votre projet !

**🌟 Pourquoi choisir DZ NIN Checker ?**
- ✅ **Précision maximale** avec l'algorithme Luhn
- 🎯 **Interface interactive** pour tester sans coder
- 🚀 **Performance optimisée** (0 dépendances)
- 📚 **Documentation complète** avec exemples pratiques
- 🛡️ **Tests exhaustifs** (23+ tests unitaires)
- 🔧 **TypeScript natif** pour une intégration parfaite

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/hakim/dz-nin-checker/issues)
- 📧 **Email**: ikhlefsidali@icloud.com
- 💼 **LinkedIn**: [Sid Ali Ikhlef](https://www.linkedin.com/in/sid-ali-ikhlef99)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/hakim/dz-nin-checker/discussions)

---

**🇩🇿 DZ NIN Checker** - Le validateur de référence pour les NINs algériens

*Développé avec ❤️ pour la communauté algérienne des développeurs*# dz-nin-checker
