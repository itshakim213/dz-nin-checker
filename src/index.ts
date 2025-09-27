export interface NINDetails {
  raw: string;
  nationality: "Nationalité algérienne" | "Double nationalité" | "Inconnu";
  sex: "Homme" | "Femme" | "Inconnu";
  year: string;
  communeOrCountry: string;
  birthAct: string;
  registerNumber: string;
  controlKey: string;
  calculatedKey: string;
  isValid: boolean;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  details: NINDetails;
  message: string;
}

/**
 * Calcule la clé de contrôle d'un NIN algérien en utilisant l'algorithme Luhn modifié.
 * Cet algorithme traite les chiffres de droite à gauche en alternant la multiplication par 2.
 * 
 * @param ninWithoutKey - Les 16 premiers chiffres du NIN (sans la clé de contrôle)
 * @returns La clé de contrôle calculée sur 2 chiffres
 */
function computeControlKey(ninWithoutKey: string): string {
  let sum = 0;
  let alternate = false;
  
  // Traitement de droite à gauche (algorithme Luhn)
  for (let i = ninWithoutKey.length - 1; i >= 0; i--) {
    let digit = Number(ninWithoutKey[i]);
    
    if (alternate) {
      digit *= 2;
      // Si le résultat est > 9, on soustrait 9 (équivalent à additionner les chiffres)
      if (digit > 9) {
        digit = digit - 9;
      }
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  // Calcul de la clé de contrôle
  const remainder = sum % 10;
  const key = remainder === 0 ? 0 : 10 - remainder;
  
  return key.toString().padStart(2, "0");
}

/**
 * Calcule l'année complète à partir des 3 chiffres du registre de naissance.
 * 
 * @param yearCode - Les 3 chiffres du registre de naissance (positions 3-5)
 * @returns L'année complète (ex: "004" -> "2004", "983" -> "1983")
 */
function calculateFullYear(yearCode: string): string {
  const yearNum = parseInt(yearCode, 10);
  
  // Si le premier chiffre est 0, on ajoute 2000 (ex: 004 -> 2004, 023 -> 2023)
  // Si le premier chiffre est 9, on ajoute 1000 (ex: 983 -> 1983, 995 -> 1995)
  const firstDigit = yearCode.charAt(0);
  const fullYear = firstDigit === '0' ? 2000 + yearNum : 1000 + yearNum;
  
  return fullYear.toString();
}

/**
 * Valide un Numéro d'Identification National (NIN) algérien.
 * 
 * Format du NIN algérien (18 chiffres) :
 * - Position 1 : Nationalité (1=Algérienne, 2=Double nationalité)
 * - Position 2 : Sexe (0=Homme, 1=Femme)
 * - Positions 3-5 : Année de registre du naissance (sur 3 chiffres)
 *   * Si premier chiffre = 0 : ajouter 2000 (ex: 004 -> 2004)
 *   * Si premier chiffre = 9 : ajouter 1000 (ex: 983 -> 1983)
 * - Positions 6-9 : Code commune (ou pays) de naissance
 * - Positions 10-14 : Numéro d'acte de naissance
 * - Positions 15-16 : Numéro d'enregistrement
 * - Positions 17-18 : Clé de contrôle
 * 
 * @param nin - Le NIN à valider (18 chiffres)
 * @returns Les détails de validation du NIN
 */
export function validateNIN(nin: string): NINDetails {
  const cleaned = (nin || "").replace(/\s+/g, "");

  // Vérification du format
  if (!/^\d{18}$/.test(cleaned)) {
    return {
      raw: cleaned,
      nationality: "Inconnu",
      sex: "Inconnu",
      year: "",
      communeOrCountry: "",
      birthAct: "",
      registerNumber: "",
      controlKey: "",
      calculatedKey: "",
      isValid: false,
      error: "Le NIN doit contenir exactement 18 chiffres."
    };
  }

  // Extraction des composants
  const nationalityCode = cleaned.substring(0, 1);
  const sexCode = cleaned.substring(1, 2);
  const yearCode = cleaned.substring(2, 5);
  const year = calculateFullYear(yearCode);
  const communeOrCountry = cleaned.substring(5, 9);
  const birthAct = cleaned.substring(9, 14);
  const registerNumber = cleaned.substring(14, 16);
  const controlKey = cleaned.substring(16, 18);

  // Interprétation des codes
  const sex = sexCode === "0" 
    ? "Homme" 
    : sexCode === "1" 
    ? "Femme" 
    : "Inconnu";

  // Déterminer la nationalité
  const nationality = nationalityCode === "1" 
    ? "Nationalité algérienne" 
    : nationalityCode === "2" 
    ? "Double nationalité" 
    : "Inconnu";

  // Validation de la clé de contrôle
  const ninWithoutKey = cleaned.substring(0, 16);
  const calculatedKey = computeControlKey(ninWithoutKey);
  const isValid = calculatedKey === controlKey;

  return {
    raw: cleaned,
    nationality,
    sex,
    year,
    communeOrCountry,
    birthAct,
    registerNumber,
    controlKey,
    calculatedKey,
    isValid,
    error: isValid ? undefined : `Clé de contrôle invalide. Attendue: ${calculatedKey}, Fournie: ${controlKey}`
  };
}

/**
 * Valide un NIN et retourne un résultat formaté avec message.
 * 
 * @param nin - Le NIN à valider
 * @returns Résultat de validation avec message descriptif
 */
export function validateNINWithMessage(nin: string): ValidationResult {
  const details = validateNIN(nin);
  
  let message: string;
  if (details.isValid) {
    message = `✅ NIN valide - ${details.nationality} ${details.sex} né(e) en ${details.year}`;
  } else {
    message = `❌ ${details.error}`;
  }

  return {
    isValid: details.isValid,
    details,
    message
  };
}

/**
 * Valide plusieurs NINs en lot.
 * 
 * @param nins - Liste des NINs à valider
 * @returns Résultats de validation pour chaque NIN
 */
export function validateMultipleNINs(nins: string[]): ValidationResult[] {
  return nins.map(nin => validateNINWithMessage(nin));
}

/**
 * Génère un NIN valide à partir des 16 premiers chiffres.
 * Utile pour les tests et la génération de données de test.
 * 
 * @param base16Digits - Les 16 premiers chiffres du NIN
 * @returns Un NIN complet de 18 chiffres avec une clé de contrôle valide
 */
export function generateValidNIN(base16Digits: string): string {
  if (!/^\d{16}$/.test(base16Digits)) {
    throw new Error("La base doit contenir exactement 16 chiffres.");
  }
  
  const calculatedKey = computeControlKey(base16Digits);
  return base16Digits + calculatedKey;
}

/**
 * Analyse détaillée d'un NIN pour le débogage.
 * 
 * @param nin - Le NIN à analyser
 * @returns Informations détaillées sur le NIN
 */
export function debugNIN(nin: string) {
  const cleaned = nin.replace(/\s+/g, "");
  const details = validateNIN(cleaned);
  
  if (cleaned.length !== 18) {
    return {
      input: nin,
      cleaned,
      error: "Format invalide - doit contenir 18 chiffres"
    };
  }

  const ninWithoutKey = cleaned.substring(0, 16);
  
  return {
    input: nin,
    cleaned,
    components: {
      nationality: `${details.nationality} (${cleaned.substring(0, 1)})`,
      sex: `${details.sex} (${cleaned.substring(1, 2)})`,
      year: `${details.year} (${cleaned.substring(2, 5)} -> ${details.year})`,
      communeOrCountry: `${details.communeOrCountry}`,
      birthAct: `${details.birthAct}`,
      registerNumber: `${details.registerNumber}`
    },
    validation: {
      providedKey: details.controlKey,
      calculatedKey: details.calculatedKey,
      isValid: details.isValid,
      algorithm: "Luhn modifié"
    },
    calculation: {
      base: ninWithoutKey,
      steps: calculateSteps(ninWithoutKey)
    }
  };
}

/**
 * Montre les étapes de calcul de la clé de contrôle pour le débogage.
 */
function calculateSteps(ninWithoutKey: string): string[] {
  const steps: string[] = [];
  let sum = 0;
  let alternate = false;
  
  steps.push(`Traitement des chiffres de droite à gauche :`);
  
  for (let i = ninWithoutKey.length - 1; i >= 0; i--) {
    let digit = Number(ninWithoutKey[i]);
    const originalDigit = digit;
    
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        steps.push(`  Position ${i + 1}: ${originalDigit} × 2 = ${originalDigit * 2} → ${digit - 9} (${originalDigit * 2} - 9)`);
        digit = digit - 9;
      } else {
        steps.push(`  Position ${i + 1}: ${originalDigit} × 2 = ${digit}`);
      }
    } else {
      steps.push(`  Position ${i + 1}: ${originalDigit}`);
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  steps.push(`Somme totale: ${sum}`);
  const remainder = sum % 10;
  steps.push(`${sum} mod 10 = ${remainder}`);
  const key = remainder === 0 ? 0 : 10 - remainder;
  steps.push(`Clé de contrôle: ${remainder === 0 ? '0' : `10 - ${remainder}`} = ${key}`);
  
  return steps;
}

// Export
export default {
  validateNIN,
  validateNINWithMessage,
  validateMultipleNINs,
  generateValidNIN,
  debugNIN
};