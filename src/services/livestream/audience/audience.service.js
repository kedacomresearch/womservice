// Initializes the `livestreamaudience` service on path `/wom/livestreamaudience`
const createService = require('./audience.class.js');
const hooks = require('./audience.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'audience',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wom/livestream.audience', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wom/livestream.audience');

  service.hooks(hooks);
};
