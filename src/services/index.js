const livestream = require('./livestream/livestream.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(livestream);
};
