'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateVat } = require('./math.js');

test('calculates VAT and total including VAT', () => {
  assert.deepEqual(calculateVat(100), { total: 120, vat: 20 });
  assert.deepEqual(calculateVat(19.99, 20), { total: 23.99, vat: 4 });
});

test('rounds VAT to two decimal places', () => {
  assert.deepEqual(calculateVat(10.01, 20), { total: 12.01, vat: 2 });
  assert.deepEqual(calculateVat(100, 21), { total: 121, vat: 21 });
});
