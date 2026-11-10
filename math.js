'use strict';

function calculateVat(amount, rate = 20) {
  const vat = Math.round(amount * rate) / 100;
  const total = Math.round((amount + vat) * 100) / 100;
  return { total, vat };
}

module.exports = { calculateVat };