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

const db = pool.promise();

// Create required tables on startup if they do not exist.
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