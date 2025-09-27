// Jest test file - use npm run test:jest to run this
import { describe, test, expect } from '@jest/globals';
import { 
  validateNIN, 
  validateNINWithMessage, 
  validateMultipleNINs,
  generateValidNIN,
  debugNIN,
  NINDetails 
} from './index';

describe('DZ NIN Checker - Tests Unitaires', () => {
  
  describe('validateNIN', () => {
    test('doit valider un NIN algérien valide généré', () => {
      // Utilise un NIN généré pour les tests
      const testNIN = generateValidNIN('1000000000000000');
      const result = validateNIN(testNIN);
      
      expect(result.isValid).toBe(true);
      expect(result.nationality).toBe('Algérienne');
      expect(result.sex).toBe('Homme');
      expect(result.year).toBe('000');
      expect(result.controlKey).toBe(result.calculatedKey);
      expect(result.error).toBeUndefined();
    });

    test('doit valider un NIN de femme algérienne', () => {
      const validFemaleNIN = generateValidNIN('1100000000000000');
      const result = validateNIN(validFemaleNIN);
      
      expect(result.isValid).toBe(true);
      expect(result.nationality).toBe('Algérienne');
      expect(result.sex).toBe('Femme');
    });

    test('doit valider un NIN de double nationalité', () => {
      const validDualNIN = generateValidNIN('2000000000000000');
      const result = validateNIN(validDualNIN);
      
      expect(result.isValid).toBe(true);
      expect(result.nationality).toBe('Double nationalité');
      expect(result.sex).toBe('Homme');
    });

    test('doit rejeter un NIN avec une clé de contrôle incorrecte', () => {
      const validBase = '1000000000000000';
      const correctNIN = generateValidNIN(validBase);
      // Modifier la clé pour la rendre incorrecte
      const incorrectNIN = validBase + '99';
      
      const result = validateNIN(incorrectNIN);
      
      expect(result.isValid).toBe(false);
      expect(result.controlKey).toBe('99');
      expect(result.calculatedKey).toBe(correctNIN.slice(-2));
      expect(result.error).toContain('Clé de contrôle invalide');
    });

    test('doit rejeter un NIN trop court', () => {
      const nin = '12345';
      const result = validateNIN(nin);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le NIN doit contenir exactement 18 chiffres.');
    });

    test('doit rejeter un NIN trop long', () => {
      const nin = '1234567890123456789';
      const result = validateNIN(nin);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le NIN doit contenir exactement 18 chiffres.');
    });

    test('doit rejeter un NIN contenant des caractères non numériques', () => {
      const nin = '12345678901234567a';
      const result = validateNIN(nin);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le NIN doit contenir exactement 18 chiffres.');
    });

    test('doit nettoyer les espaces dans le NIN', () => {
      const validBase = '1000000000000000';
      const validNIN = generateValidNIN(validBase);
      const ninWithSpaces = validNIN.replace(/(.{4})/g, '$1 ').trim();
      
      const result = validateNIN(ninWithSpaces);
      
      expect(result.raw).toBe(validNIN);
      expect(result.isValid).toBe(true);
    });

    test('doit gérer les codes de nationalité inconnus', () => {
      const invalidNationalityNIN = generateValidNIN('9000000000000000');
      const result = validateNIN(invalidNationalityNIN);
      
      expect(result.nationality).toBe('Inconnu');
      expect(result.isValid).toBe(true); // Valide structurellement
    });

    test('doit gérer les codes de sexe inconnus', () => {
      const invalidSexNIN = generateValidNIN('1900000000000000');
      const result = validateNIN(invalidSexNIN);
      
      expect(result.sex).toBe('Inconnu');
      expect(result.isValid).toBe(true); // Valide structurellement
    });
  });

  describe('validateNINWithMessage', () => {
    test('doit retourner un message de succès pour un NIN valide', () => {
      const validNIN = generateValidNIN('1000000000000000');
      const result = validateNINWithMessage(validNIN);
      
      expect(result.isValid).toBe(true);
      expect(result.message).toContain('✅ NIN valide');
      expect(result.message).toContain('Algérienne');
      expect(result.message).toContain('Homme');
    });

    test('doit retourner un message d\'erreur pour un NIN invalide', () => {
      const invalidNIN = '100000000000000099'; // Clé incorrecte
      const result = validateNINWithMessage(invalidNIN);
      
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('❌');
      expect(result.message).toContain('Clé de contrôle invalide');
    });
  });

  describe('validateMultipleNINs', () => {
    test('doit valider plusieurs NINs', () => {
      const validNIN1 = generateValidNIN('1000000000000000');
      const validNIN2 = generateValidNIN('1100000000000000');
      const invalidNIN = '100000000000000099';
      const shortNIN = '12345';
      
      const nins = [validNIN1, invalidNIN, validNIN2, shortNIN];
      const results = validateMultipleNINs(nins);
      
      expect(results).toHaveLength(4);
      expect(results[0].isValid).toBe(true);
      expect(results[1].isValid).toBe(false);
      expect(results[2].isValid).toBe(true);
      expect(results[3].isValid).toBe(false);
    });
  });

  describe('generateValidNIN', () => {
    test('doit générer un NIN valide à partir d\'une base de 16 chiffres', () => {
      const base = '1000000000000000';
      const generatedNIN = generateValidNIN(base);
      
      expect(generatedNIN).toHaveLength(18);
      expect(generatedNIN.startsWith(base)).toBe(true);
      
      const validation = validateNIN(generatedNIN);
      expect(validation.isValid).toBe(true);
    });

    test('doit rejeter une base avec un format incorrect', () => {
      expect(() => generateValidNIN('12345')).toThrow('La base doit contenir exactement 16 chiffres.');
      expect(() => generateValidNIN('12345678901234567')).toThrow('La base doit contenir exactement 16 chiffres.');
      expect(() => generateValidNIN('123456789012345a')).toThrow('La base doit contenir exactement 16 chiffres.');
    });

    test('doit générer des NINs valides pour différentes bases', () => {
      const bases = [
        '1000000000000000', // Homme algérien
        '1100000000000000', // Femme algérienne
        '2000000000000000', // Homme double nationalité
        '2100000000000000', // Femme double nationalité
      ];

      bases.forEach(base => {
        const generatedNIN = generateValidNIN(base);
        const validation = validateNIN(generatedNIN);
        expect(validation.isValid).toBe(true);
      });
    });
  });

  describe('debugNIN', () => {
    test('doit fournir des informations de débogage détaillées', () => {
      const validNIN = generateValidNIN('1000000000000000');
      const debug = debugNIN(validNIN);
      
      expect(debug.input).toBe(validNIN);
      expect(debug.cleaned).toBe(validNIN);
      expect(debug.components?.nationality).toContain('Algérienne');
      expect(debug.components?.sex).toContain('Homme');
      expect(debug.validation?.isValid).toBe(true);
      expect(debug.validation?.algorithm).toBe('Luhn modifié');
      expect(debug.calculation?.steps).toBeInstanceOf(Array);
      expect(debug.calculation?.steps.length).toBeGreaterThan(5);
    });

    test('doit gérer les NINs invalides dans le débogage', () => {
      const nin = '12345';
      const debug = debugNIN(nin);
      
      expect(debug.input).toBe(nin);
      expect(debug.error).toContain('Format invalide');
    });
  });

  describe('Cas limites et robustesse', () => {
    test('doit gérer les NINs vides ou null/undefined', () => {
      const emptyResults = [
        validateNIN(''),
        validateNIN(null as any),
        validateNIN(undefined as any)
      ];

      emptyResults.forEach(result => {
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Le NIN doit contenir exactement 18 chiffres.');
      });
    });

    test('doit gérer les NINs avec différents types d\'espaces', () => {
      const validNIN = generateValidNIN('1000000000000000');
      const spacedNINs = [
        validNIN.replace(/(.{4})/g, '$1 ').trim(),
        validNIN.replace(/(.{5})/g, '$1 ').trim(),
        ` ${validNIN} `,
        `${validNIN}\n`
      ];

      spacedNINs.forEach(nin => {
        const result = validateNIN(nin);
        expect(result.raw).toBe(validNIN);
        expect(result.isValid).toBe(true);
      });
    });

    test('doit calculer correctement différentes clés de contrôle', () => {
      const testCases = [
        { base: '1000000000000000' },
        { base: '1111111111111111' },
        { base: '1234567890123456' },
        { base: '9999999999999999' }
      ];

      testCases.forEach(({ base }) => {
        const generatedNIN = generateValidNIN(base);
        const result = validateNIN(generatedNIN);
        expect(result.isValid).toBe(true);
      });
    });
  });
});

// Tests d'intégration
describe('Tests d\'intégration', () => {
  test('doit maintenir la cohérence entre génération et validation', () => {
    // Générer 50 NINs aléatoirement et vérifier qu'ils sont tous valides
    for (let i = 0; i < 50; i++) {
      const randomBase = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 10).toString()
      ).join('');
      
      const generatedNIN = generateValidNIN(randomBase);
      const validation = validateNIN(generatedNIN);
      
      expect(validation.isValid).toBe(true);
      expect(validation.calculatedKey).toBe(validation.controlKey);
    }
  });
});