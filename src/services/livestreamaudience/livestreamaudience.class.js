/* eslint-disable no-unused-vars */
const webstreamer = require('../../webstreamer');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if(data.name && typeof data.name !== 'string') {
      throw Error('params error');
    }

    let name = data.name;
    let audience_ep = data.audience_ep;

    try {
      await webstreamer.liveStreamAddAudience(name, audience_ep);
    } catch(err) {
      throw err;
    }

    return audience_ep.name;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    if(id && typeof id !== 'string') {
      throw Error('params error, audience name should be provided');
    }

    let name = params.query.name,
      audience_name = params.query.audience_name;

    try {
      await webstreamer.liveStreamRemoveAudience(name, audience_name);
    } catch(err) {
      throw err;
    }
    return true;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
