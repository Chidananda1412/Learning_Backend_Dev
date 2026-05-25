const db = require('../util/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price, id = null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  // Saves a new product or updates an existing one based on the presence of an id.
  save() {
    if (this.id) {
      return db.execute(
        'UPDATE products SET title = ?, imageUrl = ?, price = ?, description = ? WHERE id = ?',
        [this.title, this.imageUrl, this.price, this.description, this.id]
      );
    }

    return db
      .execute('INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)', [
        this.title,
        this.imageUrl,
        this.price,
        this.description
      ])
      .then(([result]) => {
        if (result && result.insertId) {
          this.id = result.insertId;
        }
        return result;
      });
  }

  // Returns all products from the database.
  static fetchAll() {
    return db.execute('SELECT * FROM products').then(([rows]) => rows);
  }

  // Finds a single product by its id.
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE id = ?', [id]).then(([rows]) => rows[0]);
  }

  // Deletes a product by its id.
  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE id = ?', [id]);
  }
};
