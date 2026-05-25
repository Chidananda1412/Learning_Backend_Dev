const db = require('../util/database');

module.exports = class Cart {
  // Add a product to the cart or increment the quantity if it already exists.
  static async addProduct(id, productPrice) {
    const [rows] = await db.execute('SELECT id, qty FROM cart_items WHERE product_id = ?', [id]);

    if (rows && rows.length > 0) {
      const item = rows[0];
      return db.execute('UPDATE cart_items SET qty = ? WHERE id = ?', [item.qty + 1, item.id]);
    }

    return db.execute('INSERT INTO cart_items (product_id, qty) VALUES (?, ?)', [id, 1]);
  }

  // Remove one quantity of the product from the cart, or delete the row if quantity reaches zero.
  static async removeProduct(id) {
    const [rows] = await db.execute('SELECT id, qty FROM cart_items WHERE product_id = ?', [id]);
    if (!rows || rows.length === 0) return;

    const item = rows[0];
    if (item.qty > 1) {
      return db.execute('UPDATE cart_items SET qty = ? WHERE id = ?', [item.qty - 1, item.id]);
    }

    return db.execute('DELETE FROM cart_items WHERE id = ?', [item.id]);
  }

  // Get the cart contents with product ids and quantities.
  static async getCart() {
    const [rows] = await db.execute('SELECT product_id AS id, qty FROM cart_items');
    return { products: rows.map(r => ({ id: r.id, qty: r.qty })) };
  }
};
