const noteRoutes = require('./slide_routes');
module.exports = function(app, xmljs) {
  noteRoutes(app, xmljs);
  // Other route groups could go here, in the future
};