const noteRoutes = require('./slide_routes');
module.exports = function(app, xmljs, http, concat) {
    noteRoutes(app, xmljs, http, concat);
    // Other route groups could go here, in the future
};