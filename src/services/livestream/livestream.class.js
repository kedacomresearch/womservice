/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
let idGenerator = require('../../../config/idGenerator');
const logger = require('winston');
const webstreamer = require('../../webstreamer');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    logger.info(params);
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
    let performer_ep = data.performer_ep;

    webstreamer.createLiveStream(name);
    let livestream = webstreamer.getLiveStream(name);

    try {
      await livestream.initialize();
      await livestream.addPerformer(performer_ep);
      await livestream.startup();
    } catch(err) {
      throw err;
    }

    return name;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    if(id && typeof id !== 'string') {
      throw Error('params error, live stream name should be provided!');
    }

    let name =  params.query.name;

    let livestream = webstreamer.getLiveStream(name);
    try {
      await livestream.stop();
      await livestream.terminate();
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
