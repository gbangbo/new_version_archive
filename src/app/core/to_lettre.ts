'use strict';

// var makeOrdinal = require('./makeOrdinal'); // Cette partie peut rester en anglais si vous n'utilisez pas cette fonction
// var isFinite = require('./isFinite');
// var isSafeNumber = require('./isSafeNumber');

var DIX = 10;
var CENT = 100;
var MILLE = 1000;
var MILLION = 1000000;
var MILLIARD = 1000000000;           //         1.000.000.000 (9)
var BILLION = 1000000000000;       //     1.000.000.000.000 (12)
var BILLIARD = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX = 9007199254740992;             // 9.007.199.254.740.992 (15)

var MOINS_DE_VINGT = [
  'zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
];

var DIZAINES = [
  'zéro', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example enLettres(12) => 'douze'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use enLettresOrdinal() instead!
 * @returns {string}
 */
export function enLettres(number, asOrdinal) {
  var mots;
  var num = parseInt(number, 10);

  if (!isFinite(num)) {
    throw new TypeError(
      'Not a finite number: ' + number + ' (' + typeof number + ')'
    );
  }
  if (!isSafeNumber(num)) {
    throw new RangeError(
      'Input is not a safe number, it’s either too large or too small.'
    );
  }
  mots = genererMots(num);
  return asOrdinal ? makeOrdinal(mots) : mots;
}

function genererMots(number) {
  var reste, mot,
    mots = arguments[1];

  // Nous avons terminé
  if (number === 0) {
    return !mots ? 'zéro' : mots.join(' ').replace(/,$/, '');
  }
  // Première exécution
  if (!mots) {
    mots = [];
  }
  // Si négatif, ajouter « moins »
  if (number < 0) {
    mots.push('moins');
    number = Math.abs(number);
  }

  if (number < 20) {
    reste = 0;
    mot = MOINS_DE_VINGT[number];

  } else if (number < CENT) {
    reste = number % DIX;
    mot = DIZAINES[Math.floor(number / DIX)];
    // En cas de reste, nous devons le gérer ici pour pouvoir ajouter le «-»
    if (reste) {
      mot += '-' + MOINS_DE_VINGT[reste];
      reste = 0;
    }

  } else if (number < MILLE) {
    reste = number % CENT;
    mot = genererMots(Math.floor(number / CENT)) + ' cent';

  } else if (number < MILLION) {
    reste = number % MILLE;
    mot = genererMots(Math.floor(number / MILLE)) + ' mille';

  } else if (number < MILLIARD) {
    reste = number % MILLION;
    mot = genererMots(Math.floor(number / MILLION)) + ' million';

  } else if (number < BILLION) {
    reste = number % MILLIARD;
    mot = genererMots(Math.floor(number / MILLIARD)) + ' milliard';

  } else if (number < BILLIARD) {
    reste = number % BILLION;
    mot = genererMots(Math.floor(number / BILLION)) + ' billion';

  } else if (number <= MAX) {
    reste = number % BILLIARD;
    mot = genererMots(Math.floor(number / BILLIARD)) +
      ' billiard';
  }

  mots.push(mot);
  //@ts-ignore
  return genererMots(reste, mots);
}



var ENDS_WITH_DOUBLE_ZERO_PATTERN = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
var ENDS_WITH_TEEN_PATTERN = /teen$/;
var ENDS_WITH_Y_PATTERN = /y$/;
var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
var ordinalLessThanThirteen = {
  zero: 'zeroth',
  one: 'first',
  two: 'second',
  three: 'third',
  four: 'fourth',
  five: 'fifth',
  six: 'sixth',
  seven: 'seventh',
  eight: 'eighth',
  nine: 'ninth',
  ten: 'tenth',
  eleven: 'eleventh',
  twelve: 'twelfth'
};

/**
 * Converts a number-word into an ordinal number-word.
 * @example makeOrdinal('one') => 'first'
 * @param {string} words
 * @returns {string}
 */
function makeOrdinal(words) {
  // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
  if (ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) || ENDS_WITH_TEEN_PATTERN.test(words)) {
    return words + 'th';
  }
  // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
  else if (ENDS_WITH_Y_PATTERN.test(words)) {
    return words.replace(ENDS_WITH_Y_PATTERN, 'ieth');
  }
  // Ends with one through twelve
  else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
    return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
  }
  return words;
}

function replaceWithOrdinalVariant(match, numberWord) {
  return ordinalLessThanThirteen[numberWord];
}


function isSafeNumber(value) {
  return typeof value === 'number' && Math.abs(value) <= 9007199254740991;
}
