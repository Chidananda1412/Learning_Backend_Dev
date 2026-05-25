/**
 * Low-level MySQL connection utility using `mysql2`.
 *
 * This module exposes a promise-based connection pool (`db`) for any
 * remaining raw-SQL operations in the project. Note: after moving models
 * to Sequelize, most persistence should go through Sequelize instead.
 */
const mysql = require('mysql2');

// Create a connection pool for MySQL.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Chidananda@1412',
  database: 'node-complete',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the promise wrapper so callers can use `await db.execute(...)`.
const db = pool.promise();

// Create required tables on startup if they do not exist. This mirrors the
// schema used by Sequelize models, and is safe to run even if Sequelize is
// also performing `sync()` — both use `CREATE TABLE IF NOT EXISTS` semantics.
async function ensureTables() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255),
        imageUrl VARCHAR(500),
        price DOUBLE,
        description TEXT
      )
    `);
    console.log('Products table checked/created');

    await db.execute(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT,
        qty INT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    console.log('Cart items table checked/created');
  } catch (err) {
    console.error('Error ensuring tables:', err);
  }
}

ensureTables();

module.exports = db;