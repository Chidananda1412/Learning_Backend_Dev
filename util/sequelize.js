/**
 * Sequelize initializer and exporter.
 *
 * Exports two values:
 *  - `sequelize`: the Sequelize instance (use for defining models and queries)
 *  - `initPromise`: a Promise that resolves after authentication and `sync()`
 *
 * `initPromise` allows other parts of the app to wait for the DB to be ready,
 * e.g. `await initPromise` or `initPromise.then(...)`.
 */
const { Sequelize } = require('sequelize');

// Configure Sequelize instance for MySQL. Update credentials if needed.
const sequelize = new Sequelize('node-complete', 'root', 'Chidananda@1412', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Create a promise that attempts to authenticate and sync the database.
// `sequelize.sync()` will create any defined tables that do not yet exist.
// We intentionally avoid `force: true` so existing tables are preserved.
const initPromise = (async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sequelize connected and synced');
  } catch (err) {
    console.error('Sequelize initialization error:', err);
    throw err;
  }
})();

module.exports = { sequelize, initPromise };
