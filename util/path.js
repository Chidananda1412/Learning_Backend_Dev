const path = require('path');

// This helper function returns the root directory path for the application.
// It keeps path calculation in one place and is used by app.js and the model.
module.exports = path.dirname(process.mainModule.filename);

