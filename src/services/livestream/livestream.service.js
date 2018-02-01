// Initializes the `livestream` service on path `/wom/livestream`
const createService = require('./livestream.class.js');
const hooks = require('./livestream.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'livestream',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wom/livestream', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wom/livestream');

  service.hooks(hooks);
};
