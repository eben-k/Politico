const assert = require('assert');
// const app = require('../app');

describe('Basic Mocha String Test', () => {
  it('should return -1 when "Welcome" is missing', () => {
    assert.equal(-1, 'Hello to Politico'.indexOf('Welcome'));
  });

  it('should return number of characters in a string', () => {
    assert.equal('Welcome'.length, 7);
  });

  it('should return first character of the string', () => {
    assert.equal('Welcome'.charAt(0), 'W');
  });
});
