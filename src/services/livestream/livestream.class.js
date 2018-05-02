/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const logger = require('winston');
const webstreamer = require('../../webstreamer');
const uuidv1= require('uuid/v1');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async create (data, params) {
    if(!data.source || typeof data.source !== 'object') {
      throw new errors.BadRequest('params not correctly');
    }

    let name = data.source.name,
      protocol = data.source.protocol,
      url = data.source.url;
    let uuid = uuidv1();

    webstreamer.createLiveStream(uuid);
    let livestream = webstreamer.getLiveStream(uuid);

    await livestream.initialize().catch(err => {
      throw new errors.GeneralError(err.message);
    });
    await livestream.addPerformer({
      name: name,
      protocol: protocol, // rtspclient/rtspserver
      url: url,
      video_codec: 'h264', // optional
      audio_codec: 'pcma' // optional
    }).catch(err => {
      throw new errors.GeneralError(err.message);
    });
    await livestream.startup().catch(err => {
      throw new errors.GeneralError(err.message);
    });

    return {
      id: uuid
    };
  }

  async remove (id, params) {
    let uuid =  params.query.id;
    if(!uuid) {
      throw new errors.BadRequest('live stream id needed');
    }

    let livestream = webstreamer.getLiveStream(uuid);
    await livestream.stop().catch(err => {
      throw new errors.GeneralError(err.message);
    });
    await livestream.terminate().catch(err => {
      throw new errors.GeneralError(err.message);
    });

    webstreamer.removeLiveStream(uuid);

    return {
      OK: 'success'
    };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
