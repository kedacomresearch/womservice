const assert = require('assert');
const app = require('../../src/app');

describe('\'rtsptestserver\' service', () => {
  it('registered the service', () => {
    const service = app.service('wom/rtsptestserver');

    assert.ok(service, 'Registered the service');
  });
});
