const assert = require('assert');
const app = require('../../src/app');

describe('\'livestreamaudience\' service', () => {
  it('registered the service', () => {
    const service = app.service('wom/livestreamaudience');

    assert.ok(service, 'Registered the service');
  });
});
