/**
 * Created by Ganchao on 2018/2/27.
 */
const logger = require('winston');
let socketServer = null;
// const livestream = require('../webstreamer').livestream;

const socketVec = Object.create(null);

// livestream.registerOnNotifyCb(onNotify);

module.exports = function (io) {
  socketServer = io;

  socketServer.of('livestream.webrtc').on('connection', function(socket) {
    logger.info('=======on connection==========');

    socket.join('livestream', () => {
      logger.info('Join room livestream');
    });


    socket.on('binding info', function (data) {
      logger.info(data);
      socket.component = data.component;
      socket.endpoint = data.endpoint;

      if(!socketVec[`${data.component}${data.endpoint}`]) {
        socketVec[`${data.component}${data.endpoint}`] = socket;
      }
    });

    socket.on('status', function (data) {
      logger.info(data);
      //send back to client
      socket.emit('status', data);
    });

    socket.on('sdp', function (data) {
      logger.info(data);
      //send back to client
      socket.to('livestream').emit('sdp', data);
    });

    socket.on('disconnect', (reason) => {
      logger.info('socket disconnected：' + reason);
    });
  });
};
