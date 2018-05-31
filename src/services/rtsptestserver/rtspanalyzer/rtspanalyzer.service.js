// Initializes the `rtspanalyzer` service on path `/wom/rtsptestserver/rtspanalyzer`
const createService = require('./rtspanalyzer.class.js');
const hooks = require('./rtspanalyzer.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'rtspanalyzer',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wom/rtspanalyzer', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wom/rtspanalyzer');

  service.hooks(hooks);
};
