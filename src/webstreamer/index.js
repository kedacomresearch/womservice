/**
 * Created by Ganchao on 2018/3/2.
 */

const webstreamer = require('webstreamer');
const errors = require('@feathersjs/errors');


webstreamer.Initialize({
  rtsp_server: {
    port: 554
  }
});


const rtspServers = Object.create(null);
const livestreams = Object.create(null);

module.exports.createRtspTestServer = function(name = 'rtsp_test_server') {
  if(! rtspServers[name] ) {
    rtspServers[name] = new webstreamer.RTSPTestServer(name);
  } else {
    throw new Error(`rtsp server named ${name} already created!`);
  }
  return rtspServers[name];
};

module.exports.deleteRtspTestServer = async function(name) {
  if(rtspServers[name]) {
    await rtspServers[name].stop();
    await rtspServers[name].terminate();
    delete rtspServers[name];
  } else {
    throw new Error(`rtsp server named ${name} not found!`);
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

module.exports.liveStreamRemoveAudience = function (livestreamId, audienceId) {
  if(livestreams[livestreamId]) {
    return livestreams[livestreamId].removeAudience(audienceId);
  } else {
    throw Error('LiveStreamNotFound');
  }
};

module.exports.webstreamer = webstreamer;
