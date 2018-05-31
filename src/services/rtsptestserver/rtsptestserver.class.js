/* eslint-disable no-unused-vars */
const webstreamer = require('../../webstreamer');
const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let rtspTestServerInfo = webstreamer.getRtspTestServer();
    if(rtspTestServerInfo) {
      return {
        name: rtspTestServerInfo.name,
        path: rtspTestServerInfo.path
      };
    }
    return null;
  }

  async create (data, params) {
    let rtspTestServer;
    if( !data.name ) {
      data.name = 'rtsp_test_server';
    }
    await webstreamer.createRtspTestServer(data.name).catch(err => {
      throw new errors.BadRequest(err.message);
    });

    return {
      OK: 'success'
    };
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    await webstreamer.deleteRtspTestServer().catch(err => {
      throw new errors.BadRequest(err.message);
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
