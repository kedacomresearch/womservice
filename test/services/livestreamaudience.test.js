const assert = require('assert');
const app = require('../../src/app');

describe('\'livestreamaudience\' service', () => {
  it('registered the service', () => {
    const service = app.service('wom/livestream.audience');

    assert.ok(service, 'Registered the service');
  });
});
