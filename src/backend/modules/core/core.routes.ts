import { CoreController as core } from './core.controller';

export = function (app) {
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Return a 404 for all undefined api, module or lib routes
  app.route('*.map').get(core.renderNotFound);

  // Define application route
  app.route('*').get(core.renderIndex);
};
