// Initializes the `livestreamaudience` service on path `/wom/livestreamaudience`
const createService = require('./livestreamaudience.class.js');
const hooks = require('./livestreamaudience.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'livestreamaudience',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wom/livestreamaudience', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wom/livestreamaudience');

  service.hooks(hooks);
};
