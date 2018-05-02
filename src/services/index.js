const livestream = require('./livestream/livestream.service.js');
const audience = require('./livestream/audience/audience.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(livestream);
  app.configure(audience);
};
