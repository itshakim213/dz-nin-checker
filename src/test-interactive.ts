import * as readline from 'readline';
import { 
  validateNINWithMessage, 
  validateMultipleNINs, 
  debugNIN,
  generateValidNIN 
} from './index';

// Configuration de l'interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Affiche un menu interactif pour tester le validateur NIN
 */
function displayMenu(): void {
  console.log('\n' + '='.repeat(60));
  console.log('🇩🇿 DZ NIN CHECKER - MENU INTERACTIF');
  console.log('='.repeat(60));
  console.log('1. Valider un NIN unique');
  console.log('2. Valider plusieurs NINs');
  console.log('3. Analyser un NIN (mode debug)');
  console.log('4. Générer un NIN valide');
  console.log('5. Tests de démonstration');
  console.log('6. Quitter');
  console.log('='.repeat(60));
}

/**
 * Demande à l'utilisateur de saisir un NIN et le valide
 */
function validateSingleNIN(): void {
  console.log('\n📝 VALIDATION D\'UN NIN UNIQUE');
  console.log('-'.repeat(40));
  
  rl.question('Entrez le NIN à valider (18 chiffres): ', (nin: string) => {
    console.log('\n🔍 Résultat de la validation:');
    const result = validateNINWithMessage(nin.trim());
    
    console.log(`📋 NIN saisi: ${nin}`);
    console.log(`✨ Statut: ${result.message}`);
    
    if (result.details.raw !== nin.trim()) {
      console.log(`🧹 NIN nettoyé: ${result.details.raw}`);
    }
    
    if (result.isValid) {
      console.log('\n📊 Détails:');
      console.log(`   👤 Nationalité: ${result.details.nationality}`);
      console.log(`   ⚥  Sexe: ${result.details.sex}`);
      console.log(`   📅 Année: ${result.details.year}`);
      console.log(`   🏘️  Commune/Pays: ${result.details.communeOrCountry}`);
      console.log(`   📄 Acte de naissance: ${result.details.birthAct}`);
      console.log(`   🔢 N° d'enregistrement: ${result.details.registerNumber}`);
      console.log(`   🔑 Clé de contrôle: ${result.details.controlKey}`);
    } else {
      console.log('\n❌ Erreurs détectées:');
      console.log(`   ${result.details.error}`);
      if (result.details.calculatedKey) {
        console.log(`   🔑 Clé attendue: ${result.details.calculatedKey}`);
        console.log(`   🔑 Clé fournie: ${result.details.controlKey}`);
      }
    }
    
    promptForNextAction();
  });
}

/**
 * Permet de valider plusieurs NINs en une fois
 */
function validateMultiple(): void {
  console.log('\n📝 VALIDATION DE PLUSIEURS NINs');
  console.log('-'.repeat(40));
  console.log('Entrez les NINs séparés par des espaces ou des retours à la ligne.');
  console.log('Tapez "fin" sur une ligne vide pour terminer.\n');
  
  const nins: string[] = [];
  
  function collectNINs(): void {
    rl.question('NIN > ', (input: string) => {
      const trimmed = input.trim();
      
      if (trimmed.toLowerCase() === 'fin' || trimmed === '') {
        if (nins.length === 0) {
          console.log('❌ Aucun NIN saisi.');
          promptForNextAction();
          return;
        }
        
        console.log('\n🔍 Validation en cours...\n');
        processMultipleNINs(nins);
      } else {
        // Séparer par espaces si plusieurs NINs sur une ligne
        const splitNINs = trimmed.split(/\s+/).filter(n => n.length > 0);
        nins.push(...splitNINs);
        console.log(`✅ ${splitNINs.length} NIN(s) ajouté(s). Total: ${nins.length}`);
        collectNINs();
      }
    });
  }
  
  collectNINs();
}

/**
 * Traite et affiche les résultats pour plusieurs NINs
 */
function processMultipleNINs(nins: string[]): void {
  const results = validateMultipleNINs(nins);
  
  console.log('📊 RÉSULTATS DE VALIDATION');
  console.log('='.repeat(80));
  
  let validCount = 0;
  let invalidCount = 0;
  
  results.forEach((result, index) => {
    const status = result.isValid ? '✅ VALIDE' : '❌ INVALIDE';
    const nin = result.details.raw || nins[index];
    
    console.log(`${index + 1}. ${nin} - ${status}`);
    
    if (result.isValid) {
      console.log(`   👤 ${result.details.nationality} ${result.details.sex} (${result.details.year})`);
      validCount++;
    } else {
      console.log(`   ⚠️  ${result.details.error}`);
      invalidCount++;
    }
    console.log();
  });
  
  console.log('='.repeat(80));
  console.log(`📈 STATISTIQUES: ${validCount} valides, ${invalidCount} invalides sur ${results.length} total`);
  
  promptForNextAction();
}

/**
 * Mode debug pour analyser en détail un NIN
 */
function debugMode(): void {
  console.log('\n🔧 MODE DEBUG - ANALYSE DÉTAILLÉE');
  console.log('-'.repeat(40));
  
  rl.question('Entrez le NIN à analyser: ', (nin: string) => {
    console.log('\n🔍 ANALYSE DÉTAILLÉE');
    console.log('='.repeat(60));
    
    const debug = debugNIN(nin.trim());
    
    console.log(`📝 NIN saisi: ${debug.input}`);
    
    if (debug.error) {
      console.log(`❌ Erreur: ${debug.error}`);
      promptForNextAction();
      return;
    }
    
    console.log(`🧹 NIN nettoyé: ${debug.cleaned}`);
    
    console.log('\n📋 COMPOSANTS:');
    if (debug.components) {
      Object.entries(debug.components).forEach(([key, value]) => {
        const labels: { [key: string]: string } = {
          nationality: '👤 Nationalité',
          sex: '⚥  Sexe',
          year: '📅 Année',
          communeOrCountry: '🏘️  Commune/Pays',
          birthAct: '📄 Acte',
          registerNumber: '🔢 N° Enreg.'
        };
        console.log(`   ${labels[key]}: ${value}`);
      });
    }
    
    console.log('\n🔑 VALIDATION:');
    if (debug.validation) {
      console.log(`   Clé fournie: ${debug.validation.providedKey}`);
      console.log(`   Clé calculée: ${debug.validation.calculatedKey}`);
      console.log(`   Statut: ${debug.validation.isValid ? '✅ VALIDE' : '❌ INVALIDE'}`);
      console.log(`   Algorithme: ${debug.validation.algorithm}`);
    }
    
    console.log('\n🧮 CALCUL DE LA CLÉ:');
    if (debug.calculation) {
      debug.calculation.steps.forEach(step => {
        console.log(`   ${step}`);
      });
    }
    
    promptForNextAction();
  });
}

/**
 * Génère un NIN valide à partir d'une base
 */
function generateNIN(): void {
  console.log('\n🎲 GÉNÉRATION D\'UN NIN VALIDE');
  console.log('-'.repeat(40));
  console.log('Entrez les 16 premiers chiffres du NIN (la clé sera calculée automatiquement)');
  console.log('Exemple: 1000000000000000\n');
  
  rl.question('Base (16 chiffres): ', (base: string) => {
    try {
      const trimmed = base.trim();
      
      if (!/^\d{16}$/.test(trimmed)) {
        console.log('❌ Erreur: La base doit contenir exactement 16 chiffres.');
        promptForNextAction();
        return;
      }
      
      const generatedNIN = generateValidNIN(trimmed);
      const validation = validateNINWithMessage(generatedNIN);
      
      console.log('\n✨ NIN GÉNÉRÉ:');
      console.log('='.repeat(40));
      console.log(`📋 Base fournie: ${trimmed}`);
      console.log(`🔑 Clé calculée: ${generatedNIN.slice(-2)}`);
      console.log(`🎯 NIN complet: ${generatedNIN}`);
      console.log(`✅ Validation: ${validation.message}`);
      
      // Analyse du NIN généré
      const debug = debugNIN(generatedNIN);
      console.log('\n📊 Détails:');
      if (debug.components) {
        console.log(`   👤 Nationalité: ${debug.components.nationality}`);
        console.log(`   ⚥  Sexe: ${debug.components.sex}`);
        console.log(`   📅 Année: ${debug.components.year}`);
      }
      
    } catch (error) {
      console.log(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
    
    promptForNextAction();
  });
}

/**
 * Exécute des tests de démonstration prédéfinis
 */
function runDemoTests(): void {
  console.log('\n🎭 TESTS DE DÉMONSTRATION');
  console.log('='.repeat(60));
  
  const testCases = [
    {
      name: '✅ NIN valide - Homme algérien',
      nin: generateValidNIN('1000000000000000'),
      description: 'NIN généré pour un homme algérien'
    },
    {
      name: '✅ NIN valide - Femme algérienne',
      nin: generateValidNIN('1100000000000001'),
      description: 'NIN généré pour une femme algérienne'
    },
    {
      name: '✅ NIN valide - Double nationalité',
      nin: generateValidNIN('2050000000000000'),
      description: 'NIN généré pour double nationalité'
    },
    {
      name: '❌ NIN invalide - Clé incorrecte',
      nin: '100000000000000099',
      description: 'NIN avec une clé de contrôle incorrecte'
    },
    {
      name: '❌ NIN invalide - Format incorrect',
      nin: '12345',
      description: 'NIN trop court'
    },
    {
      name: '❌ NIN invalide - Caractères non numériques',
      nin: '12345678901234567X',
      description: 'NIN contenant des lettres'
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n${index + 1}. ${testCase.name}`);
    console.log(`   📝 Description: ${testCase.description}`);
    console.log(`   🔢 NIN: ${testCase.nin}`);
    
    const result = validateNINWithMessage(testCase.nin);
    console.log(`   📊 Résultat: ${result.message}`);
    
    if (result.isValid) {
      console.log(`   👤 Profil: ${result.details.nationality} ${result.details.sex}`);
    }
  });
  
  // Test de validation multiple
  console.log('\n' + '-'.repeat(60));
  console.log('🔄 TEST DE VALIDATION MULTIPLE:');
  
  const multipleNINs = testCases.map(tc => tc.nin);
  const multipleResults = validateMultipleNINs(multipleNINs);
  
  const validCount = multipleResults.filter(r => r.isValid).length;
  const invalidCount = multipleResults.length - validCount;
  
  console.log(`   📈 ${validCount} NINs valides, ${invalidCount} NINs invalides sur ${multipleResults.length} testés`);
  
  promptForNextAction();
}

/**
 * Demande à l'utilisateur ce qu'il veut faire ensuite
 */
function promptForNextAction(): void {
  console.log('\n' + '-'.repeat(40));
  rl.question('Appuyez sur Entrée pour revenir au menu principal...', () => {
    main();
  });
}

/**
 * Fonction principale du menu interactif
 */
function main(): void {
  displayMenu();
  
  rl.question('\nChoisissez une option (1-6): ', (choice: string) => {
    const option = choice.trim();
    
    switch (option) {
      case '1':
        validateSingleNIN();
        break;
      case '2':
        validateMultiple();
        break;
      case '3':
        debugMode();
        break;
      case '4':
        generateNIN();
        break;
      case '5':
        runDemoTests();
        break;
      case '6':
        console.log('\n👋 Au revoir ! Merci d\'avoir utilisé DZ NIN Checker.');
        rl.close();
        break;
      default:
        console.log('❌ Option invalide. Veuillez choisir entre 1 et 6.');
        main();
        break;
    }
  });
}

// Point d'entrée
if (require.main === module) {
  console.log('🚀 Démarrage de DZ NIN Checker...\n');
  main();
}

// Gestion propre de la fermeture
rl.on('close', () => {
  console.log('\n\n✨ Session terminée. À bientôt !');
  process.exit(0);
});

// Export pour les tests
export {
  validateSingleNIN,
  validateMultiple,
  debugMode,
  generateNIN,
  runDemoTests
};
