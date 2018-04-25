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
    if(typeof data.name !== 'string') {
      throw Error('request params error!');
    }
    try {
      let rtspServer = webstreamer.WebStreamer.createRtspTestServer(data.name);
      await rtspServer.initialize();
      await rtspServer.startup();
    } catch (err) {
      throw err;
    }

    return data.name;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    try {
      await webstreamer.WebStreamer.deleteRtspTestServer(id);
    } catch (err) {
      throw err;
    }
    return true;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
