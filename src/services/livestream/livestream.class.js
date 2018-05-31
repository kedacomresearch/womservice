/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const logger = require('winston');
const webstreamer = require('../../webstreamer');
const uuidv1= require('uuid/v1');
const livestreamStorage = require('../../utilities').livestreamStorage;

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find () {
    return JSON.stringify(livestreamStorage);
  }

  async create (data, params) {
    if(!data.source || typeof data.source !== 'object') {
      throw new errors.BadRequest('params not correctly');
    }

    let name = data.source.name,
      protocol = data.source.protocol,
      url = data.source.url;
    let uuid = uuidv1();

    if(data.source.type === 'Rtsp Test Server') {
      await webstreamer.createRtspTestServer(name).catch(err => {
        throw new errors.GeneralError(err.message);
      });
      url = 'rtsp://127.0.0.1/test';
    }

    webstreamer.createLiveStream(uuid);
    let livestream = webstreamer.getLiveStream(uuid);

    await livestream.initialize().catch(err => {
      throw new errors.GeneralError(err.message);
    });

    let performer_ep = {
      name: name,
      protocol: protocol, // rtspclient/rtspserver
      url: url,
      video_codec: 'h264', // optional
      audio_codec: 'pcma' // optional
    };

    await livestream.addPerformer(performer_ep).catch(err => {
      throw new errors.GeneralError(err.message);
    });
    await livestream.startup().catch(err => {
      throw new errors.GeneralError(err.message);
    });

    livestreamStorage[uuid] = {
      name: name,
      type: data.source.type
    };

    return {
      id: uuid,
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
    if(livestreamStorage[uuid].type === 'Rtsp Test Server') {
      webstreamer.deleteRtspTestServer();
    }

    delete livestreamStorage[uuid];

    return {
      OK: 'success'
    };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
