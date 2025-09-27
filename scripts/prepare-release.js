#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Préparation de la release...\n');

// 1. Nettoyer le dossier dist
console.log('🧹 Nettoyage du dossier dist...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
console.log('✅ Dossier dist nettoyé\n');

// 2. Compiler TypeScript
console.log('🔨 Compilation TypeScript...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Compilation réussie\n');
} catch (error) {
  console.error('❌ Erreur de compilation:', error.message);
  process.exit(1);
}

// 3. Lancer les tests
console.log('🧪 Exécution des tests...');
try {
  execSync('npm test', { stdio: 'inherit' });
  console.log('✅ Tests réussis\n');
} catch (error) {
  console.error('❌ Tests échoués:', error.message);
  process.exit(1);
}

// 4. Vérifier que les fichiers de distribution existent
const requiredFiles = [
  'dist/src/index.js',
  'dist/src/index.d.ts',
  'dist/src/index.js.map'
];

console.log('📋 Vérification des fichiers de distribution...');
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Fichier manquant: ${file}`);
    process.exit(1);
  }
  console.log(`✅ ${file}`);
}

console.log('\n🎉 Préparation terminée avec succès !');
console.log('📦 Le projet est prêt pour la publication sur npm');
console.log('🌐 Le projet est prêt pour GitHub');
