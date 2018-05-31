const assert = require('assert');
const app = require('../../src/app');

describe('\'rtspanalyzer\' service', () => {
  it('registered the service', () => {
    const service = app.service('wom/rtspanalyzer');

    assert.ok(service, 'Registered the service');
  });
});
