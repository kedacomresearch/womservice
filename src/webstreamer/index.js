/**
 * Created by Ganchao on 2018/3/2.
 */

const webstreamer = require('webstreamer');
const errors = require('@feathersjs/errors');
const axios = require('axios');

webstreamer.Initialize({
  rtsp_server: {
    port: 554
  }
});

const womAppServiceAddr = 'http://localhost:3232';
let rtspServer = null;
const rtspServerInfo = Object.create(null);
const livestreams = Object.create(null);
const rtspAnalyzers = Object.create(null);

module.exports.getRtspTestServer = function () {
  if(rtspServer) {
    return rtspServerInfo;
  } else {
    return null;
  }
};

module.exports.createRtspAnalyzer = async function (audience) {
  if(!rtspAnalyzers[audience.name]) {
    let rtspAnalyzer = new webstreamer.RTSPAnalyzer(audience.name, `rtsp://127.0.0.1${audience.path}`);
    rtspAnalyzers[audience.name] = rtspAnalyzer;
    await rtspAnalyzer.initialize();
    // audio
    let old = new Date();
    rtspAnalyzer.on('spectrum', function (data, meta) {
      let obj = JSON.parse(data.toString('utf8'));
      let now = new Date();
      let delta = now.getTime() - old.getTime();

      if(delta >= 1500) {
        console.log('send spectrum');
        old = now;
        axios.post(`${womAppServiceAddr}/wom/onwomservicedata`, {
          signalingBridge: audience.signalingBridge,
          livestreamId: audience.livestreamId,
          audienceId: audience.audienceId,
          spectrum: obj.magnitude
        }).catch(err => {
          throw err;
        });
      }

    });

    return rtspAnalyzer;
  } else {
    throw new Error(`rtsp analyzer named ${name} already created!`);
  }
};

module.exports.createRtspTestServer = async function(name = 'rtsp_test_server') {
  if(rtspServer === null ) {
    rtspServer = new webstreamer.RTSPTestServer(name);
    await rtspServer.initialize();
    await rtspServer.startup();
  } else {
    throw new Error(`rtsp test server already created!`);
  }
};

module.exports.deleteRtspTestServer = async function() {
  if(rtspServer) {
    console.log('deleteRtspTestServer');
    await rtspServer.stop();
    await rtspServer.terminate();
    rtspServer = null;
  } else {
    throw new Error(`rtsp test server not found!`);
  }
};

module.exports.createLiveStream = function (uuid) {

  livestreams[uuid] = new webstreamer.LiveStream(uuid);

};

module.exports.getLiveStream = function (uuid) {
  if(livestreams[uuid]) {
    return livestreams[uuid];
  } else {
    throw Error('LiveStreamNotFound');
  }
};

module.exports.removeLiveStream = function (uuid) {
  if(livestreams[uuid]) {
    delete livestreams[uuid];
  } else {
    throw Error('LiveStreamNotFound');
  }
};

module.exports.liveStreamAddPerformer = function (name, performer_ep) {
  if(livestreams[name]) {
    return livestreams[name].addPerformer(performer_ep);
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamAddAudience = async function (uuid, audience) {
  if(livestreams[uuid]) {
    return livestreams[uuid].addAudience(audience);
  } else {
    throw new errors.GeneralError('LiveStreamNotFound');
  }
};

module.exports.liveStreamRemoveAudience = async function (livestreamId, audienceId) {
  if(livestreams[livestreamId]) {
    await livestreams[livestreamId].removeAudience(audienceId);
  } else {
    throw Error('LiveStreamNotFound');
  }
};

module.exports.webstreamer = webstreamer;
