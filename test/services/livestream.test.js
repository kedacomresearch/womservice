const assert = require('assert');
const app = require('../../src/app');

describe('\'livestream\' service', () => {
  it('registered the service', () => {
    const service = app.service('wom/livestream');

    assert.ok(service, 'Registered the service');
  });
});
