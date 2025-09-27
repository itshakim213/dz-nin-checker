import { expect } from 'chai';
import { 
  validateNIN, 
  validateNINWithMessage, 
  validateMultipleNINs,
  generateValidNIN,
  debugNIN
} from './index';

describe('DZ NIN Checker - Tests Unitaires (Mocha)', () => {
  
  describe('validateNIN', () => {
    it('doit valider un NIN algérien valide généré', () => {
      // Utilise un NIN généré pour les tests
      const testNIN = generateValidNIN('1000000000000000');
      const result = validateNIN(testNIN);
      
      expect(result.isValid).to.be.true;
      expect(result.nationality).to.equal('Algérienne');
      expect(result.sex).to.equal('Homme');
      expect(result.year).to.equal('000');
      expect(result.controlKey).to.equal(result.calculatedKey);
      expect(result.error).to.be.undefined;
    });

    it('doit valider un NIN de femme algérienne', () => {
      const validFemaleNIN = generateValidNIN('1100000000000000');
      const result = validateNIN(validFemaleNIN);
      
      expect(result.isValid).to.be.true;
      expect(result.nationality).to.equal('Algérienne');
      expect(result.sex).to.equal('Femme');
    });

    it('doit valider un NIN de double nationalité', () => {
      const validDualNIN = generateValidNIN('2000000000000000');
      const result = validateNIN(validDualNIN);
      
      expect(result.isValid).to.be.true;
      expect(result.nationality).to.equal('Double nationalité');
      expect(result.sex).to.equal('Homme');
    });

    it('doit rejeter un NIN avec une clé de contrôle incorrecte', () => {
      const validBase = '1000000000000000';
      const correctNIN = generateValidNIN(validBase);
      // Modifier la clé pour la rendre incorrecte
      const incorrectNIN = validBase + '99';
      
      const result = validateNIN(incorrectNIN);
      
      expect(result.isValid).to.be.false;
      expect(result.controlKey).to.equal('99');
      expect(result.calculatedKey).to.equal(correctNIN.slice(-2));
      expect(result.error).to.include('Clé de contrôle invalide');
    });

    it('doit rejeter un NIN trop court', () => {
      const nin = '12345';
      const result = validateNIN(nin);
      
      expect(result.isValid).to.be.false;
      expect(result.error).to.equal('Le NIN doit contenir exactement 18 chiffres.');
    });

    it('doit rejeter un NIN trop long', () => {
      const nin = '1234567890123456789';
      const result = validateNIN(nin);
      
      expect(result.isValid).to.be.false;
      expect(result.error).to.equal('Le NIN doit contenir exactement 18 chiffres.');
    });

    it('doit rejeter un NIN contenant des caractères non numériques', () => {
      const nin = '12345678901234567a';
      const result = validateNIN(nin);
      
      expect(result.isValid).to.be.false;
      expect(result.error).to.equal('Le NIN doit contenir exactement 18 chiffres.');
    });

    it('doit nettoyer les espaces dans le NIN', () => {
      const validBase = '1000000000000000';
      const validNIN = generateValidNIN(validBase);
      const ninWithSpaces = validNIN.replace(/(.{4})/g, '$1 ').trim();
      
      const result = validateNIN(ninWithSpaces);
      
      expect(result.raw).to.equal(validNIN);
      expect(result.isValid).to.be.true;
    });

    it('doit gérer les codes de nationalité inconnus', () => {
      const invalidNationalityNIN = generateValidNIN('9000000000000000');
      const result = validateNIN(invalidNationalityNIN);
      
      expect(result.nationality).to.equal('Inconnu');
      expect(result.isValid).to.be.true; // Valide structurellement
    });

    it('doit gérer les codes de sexe inconnus', () => {
      const invalidSexNIN = generateValidNIN('1900000000000000');
      const result = validateNIN(invalidSexNIN);
      
      expect(result.sex).to.equal('Inconnu');
      expect(result.isValid).to.be.true; // Valide structurellement
    });
  });

  describe('validateNINWithMessage', () => {
    it('doit retourner un message de succès pour un NIN valide', () => {
      const validNIN = generateValidNIN('1000000000000000');
      const result = validateNINWithMessage(validNIN);
      
      expect(result.isValid).to.be.true;
      expect(result.message).to.include('✅ NIN valide');
      expect(result.message).to.include('Algérienne');
      expect(result.message).to.include('Homme');
    });

    it('doit retourner un message d\'erreur pour un NIN invalide', () => {
      const invalidNIN = '100000000000000099'; // Clé incorrecte
      const result = validateNINWithMessage(invalidNIN);
      
      expect(result.isValid).to.be.false;
      expect(result.message).to.include('❌');
      expect(result.message).to.include('Clé de contrôle invalide');
    });
  });

  describe('validateMultipleNINs', () => {
    it('doit valider plusieurs NINs', () => {
      const validNIN1 = generateValidNIN('1000000000000000');
      const validNIN2 = generateValidNIN('1100000000000000');
      const invalidNIN = '100000000000000099';
      const shortNIN = '12345';
      
      const nins = [validNIN1, invalidNIN, validNIN2, shortNIN];
      const results = validateMultipleNINs(nins);
      
      expect(results).to.have.lengthOf(4);
      expect(results[0].isValid).to.be.true;
      expect(results[1].isValid).to.be.false;
      expect(results[2].isValid).to.be.true;
      expect(results[3].isValid).to.be.false;
    });
  });

  describe('generateValidNIN', () => {
    it('doit générer un NIN valide à partir d\'une base de 16 chiffres', () => {
      const base = '1000000000000000';
      const generatedNIN = generateValidNIN(base);
      
      expect(generatedNIN).to.have.lengthOf(18);
      expect(generatedNIN.startsWith(base)).to.be.true;
      
      const validation = validateNIN(generatedNIN);
      expect(validation.isValid).to.be.true;
    });

    it('doit rejeter une base avec un format incorrect', () => {
      expect(() => generateValidNIN('12345')).to.throw('La base doit contenir exactement 16 chiffres.');
      expect(() => generateValidNIN('12345678901234567')).to.throw('La base doit contenir exactement 16 chiffres.');
      expect(() => generateValidNIN('123456789012345a')).to.throw('La base doit contenir exactement 16 chiffres.');
    });

    it('doit générer des NINs valides pour différentes bases', () => {
      const bases = [
        '1000000000000000', // Homme algérien
        '1100000000000000', // Femme algérienne
        '2000000000000000', // Homme double nationalité
        '2100000000000000', // Femme double nationalité
      ];

      bases.forEach(base => {
        const generatedNIN = generateValidNIN(base);
        const validation = validateNIN(generatedNIN);
        expect(validation.isValid).to.be.true;
      });
    });
  });

  describe('debugNIN', () => {
    it('doit fournir des informations de débogage détaillées', () => {
      const validNIN = generateValidNIN('1000000000000000');
      const debug = debugNIN(validNIN);
      
      expect(debug.input).to.equal(validNIN);
      expect(debug.cleaned).to.equal(validNIN);
      expect(debug.components?.nationality).to.include('Algérienne');
      expect(debug.components?.sex).to.include('Homme');
      expect(debug.validation?.isValid).to.be.true;
      expect(debug.validation?.algorithm).to.equal('Luhn modifié');
      expect(debug.calculation?.steps).to.be.an('array');
      expect(debug.calculation?.steps.length).to.be.greaterThan(5);
    });

    it('doit gérer les NINs invalides dans le débogage', () => {
      const nin = '12345';
      const debug = debugNIN(nin);
      
      expect(debug.input).to.equal(nin);
      expect(debug.error).to.include('Format invalide');
    });
  });

  describe('Cas limites et robustesse', () => {
    it('doit gérer les NINs vides ou null/undefined', () => {
      const emptyResults = [
        validateNIN(''),
        validateNIN(null as any),
        validateNIN(undefined as any)
      ];

      emptyResults.forEach(result => {
        expect(result.isValid).to.be.false;
        expect(result.error).to.equal('Le NIN doit contenir exactement 18 chiffres.');
      });
    });

    it('doit gérer les NINs avec différents types d\'espaces', () => {
      const validNIN = generateValidNIN('1000000000000000');
      const spacedNINs = [
        validNIN.replace(/(.{4})/g, '$1 ').trim(),
        validNIN.replace(/(.{5})/g, '$1 ').trim(),
        ` ${validNIN} `,
        `${validNIN}\t`,
        `${validNIN}\n`
      ];

      spacedNINs.forEach(nin => {
        const result = validateNIN(nin);
        expect(result.raw).to.equal(validNIN);
        expect(result.isValid).to.be.true;
      });
    });

    it('doit calculer correctement différentes clés de contrôle', () => {
      const testCases = [
        { base: '1000000000000000' },
        { base: '1111111111111111' },
        { base: '1234567890123456' },
        { base: '9999999999999999' }
      ];

      testCases.forEach(({ base }) => {
        const generatedNIN = generateValidNIN(base);
        const result = validateNIN(generatedNIN);
        expect(result.isValid).to.be.true;
      });
    });
  });
});

// Tests d'intégration
describe('Tests d\'intégration', () => {
  it('doit maintenir la cohérence entre génération et validation', () => {
    // Générer 50 NINs aléatoirement et vérifier qu'ils sont tous valides
    for (let i = 0; i < 50; i++) {
      const randomBase = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 10).toString()
      ).join('');
      
      const generatedNIN = generateValidNIN(randomBase);
      const validation = validateNIN(generatedNIN);
      
      expect(validation.isValid).to.be.true;
      expect(validation.calculatedKey).to.equal(validation.controlKey);
    }
  });

  it('doit valider correctement des cas de test spécifiques', () => {
    const specificCases = [
      // Cas particuliers pour tester l'algorithme Luhn
      { base: '0000000000000000' },
      { base: '1111111111111111' },
      { base: '1234567890123456' },
      { base: '9876543210987654' }
    ];

    specificCases.forEach(({ base }) => {
      const generatedNIN = generateValidNIN(base);
      const result = validateNIN(generatedNIN);
      
      expect(result.isValid).to.be.true;
      expect(result.raw).to.equal(generatedNIN);
      expect(result.calculatedKey).to.equal(result.controlKey);
    });
  });
});