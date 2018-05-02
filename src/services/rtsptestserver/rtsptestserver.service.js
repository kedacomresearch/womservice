// Initializes the `rtsptestserver` service on path `/wom/rtsptestserver`
const createService = require('./rtsptestserver.class.js');
const hooks = require('./rtsptestserver.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'rtsptestserver',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wom/rtsptestserver', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wom/rtsptestserver');

  service.hooks(hooks);
};
