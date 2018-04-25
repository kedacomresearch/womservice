const livestream = require('./livestream/livestream.service.js');
const livestreamaudience = require('./livestreamaudience/livestreamaudience.service.js');
// const rtsptestserver = require('./rtsptestserver/rtsptestserver.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(livestream);
  app.configure(livestreamaudience);
};
