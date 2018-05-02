/* eslint-disable no-unused-vars */
const webstreamer = require('../../../webstreamer');
const errors = require('@feathersjs/errors');
const uuidv1= require('uuid/v1');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async create (data, params) {
    if(!data.id || !data.audience || typeof data.audience !== 'object') {
      throw new errors.BadRequest('params not correctly');
    }

    let id = data.id;
    let audience = data.audience;

    let audienceId = uuidv1();
    audience.name = audienceId;

    await webstreamer.liveStreamAddAudience(id, audience).catch(err => {
      throw new errors.GeneralError(err.message);
    });

    return {
      id: audienceId
    };
  }

  async remove (id, params) {
    if(!params.query.livestreamId || !params.query.audienceId) {
      throw new errors.BadRequest('params not correctly');
    }

    let livestreamId = params.query.livestreamId,
      audienceId = params.query.audienceId;

    await webstreamer.liveStreamRemoveAudience(livestreamId, audienceId).catch(err => {
      throw new errors.GeneralError(err.message);
    });

    return {
      OK: 'success'
    };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
