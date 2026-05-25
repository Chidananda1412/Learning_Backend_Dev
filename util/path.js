const path = require('path');

// Returns the application's root directory path.
// This helper keeps path logic centralized for use in app.js and other modules.
module.exports = path.dirname(process.mainModule.filename);

