/**
 * Created by Ganchao on 2018/3/2.
 */

const webstreamer = require('webstreamer');

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

module.exports.createLiveStream = function (name) {
  if(!livestreams[name]) {
    livestreams[name] = new webstreamer.LiveStream(name);
  } else {
    throw Error(`live stream named ${name} already created!`);
  }
};

module.exports.liveStreamStartup = function (name) {
  if(livestreams[name]) {
    return livestreams[name].startup();
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamInitialize = function (name) {
  if(livestreams[name]) {
    return livestreams[name].initialize();
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.getLiveStream = function (name) {
  if(livestreams[name]) {
    return livestreams[name];
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamStop= function (name) {
  if(livestreams[name]) {
    return livestreams[name].stop();
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamTerminate = function (name) {
  if(livestreams[name]) {
    return livestreams[name].terminate();
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamAddPerformer = function (name, performer_ep) {
  if(livestreams[name]) {
    return livestreams[name].addPerformer(performer_ep);
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamAddAudience = function (name, audience_ep) {
  if(livestreams[name]) {
    return livestreams[name].addAudience(audience_ep);
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.liveStreamRemoveAudience = function (name, audience_name) {
  if(livestreams[name]) {
    return livestreams[name].removeAudience(audience_name);
  } else {
    throw Error(`live stream named ${name} not existed!`);
  }
};

module.exports.webstreamer = webstreamer;
