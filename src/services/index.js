const livestream = require('./livestream/livestream.service.js');
const audience = require('./livestream/audience/audience.service.js');
const rtsptestserver = require('./rtsptestserver/rtsptestserver.service.js');
const rtspanalyzer = require('./rtsptestserver/rtspanalyzer/rtspanalyzer.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(livestream);
  app.configure(audience);
  app.configure(rtsptestserver);
  app.configure(rtspanalyzer);
};
