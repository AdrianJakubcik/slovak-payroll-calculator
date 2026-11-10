'use strict';

/**
 * Validates a Slovak IČO using the weighted modulo-11 check digit.
 * @param {string|number} value IČO, represented by exactly eight digits.
 * @returns {boolean}
 */
function isValidIco(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return false;
  const ico = String(value);
  if (!/^\d{8}$/.test(ico)) return false;

  const digits = Array.from(ico, Number);
  const weightedSum = digits.slice(0, 7)
    .reduce((sum, digit, index) => sum + digit * (8 - index), 0);
  const remainder = weightedSum % 11;
  const checkDigit = remainder === 0 ? 1 : remainder === 1 ? 0 : 11 - remainder;
  return digits[7] === checkDigit;
}

module.exports = { isValidIco };
