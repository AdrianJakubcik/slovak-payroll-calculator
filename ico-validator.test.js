'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidIco } = require('./ico-validator.js');

test('accepts valid Slovak IČO values', () => {
  for (const ico of ['31333532', '12345679', '00000001']) {
    assert.equal(isValidIco(ico), true, `${ico} should be valid`);
  }
});

test('rejects incorrect check digits', () => {
  for (const ico of ['31333533', '12345670', '00000002']) {
    assert.equal(isValidIco(ico), false, `${ico} should be invalid`);
  }
});

test('rejects values that are not exactly eight digits', () => {
  for (const ico of ['', '1234567', '123456789', '1234 678', '-1234567']) {
    assert.equal(isValidIco(ico), false, `${JSON.stringify(ico)} should be invalid`);
  }
});

test('rejects non-string and non-number inputs', () => {
  for (const value of [null, undefined, {}, [], true]) {
    assert.equal(isValidIco(value), false);
  }
});
