/**
 * Cart model (Sequelize-backed) — wrapper class exposing the same
 * API the rest of the app expects. This keeps controllers unchanged while
 * moving the persistence layer to Sequelize.
 *
 * Public API:
 *  - addProduct(productId, productPrice): Promise resolving to the created/updated row
 *  - removeProduct(productId): Promise resolving when update/delete completes
 *  - getCart(): Promise resolving to { products: [{ id, qty }, ...] }
 */
const Sequelize = require('sequelize');
const { sequelize } = require('../util/sequelize');

const { DataTypes } = Sequelize;

// Define cart item model that maps to the `cart_items` table.
// Column mapping: `product_id` in the DB -> `productId` in the model.
const CartItem = sequelize.define(
  'cart_item',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, field: 'product_id' },
    qty: { type: DataTypes.INTEGER }
  },
  { timestamps: false, tableName: 'cart_items' }
);

module.exports = class Cart {
  /**
   * Add a product to the cart. If the product already exists in the cart
   * increment its quantity; otherwise create a new row with qty = 1.
   *
   * Note: `productPrice` is accepted for API compatibility but not stored
   * in the cart table in this schema. If you want to store price per row,
   * add a `price` column and include it in the create/update calls.
   *
   * @param {number|string} id - Product id (can be number or string)
   * @param {number} productPrice - Product price (not stored here)
   * @returns {Promise<Model>} Sequelize model instance for the created/updated row
   */
  static async addProduct(id /* product id */, productPrice) {
    const existing = await CartItem.findOne({ where: { productId: id } });
    if (existing) {
      existing.qty = existing.qty + 1;
      return existing.save();
    }
    return CartItem.create({ productId: id, qty: 1 });
  }

  /**
   * Remove a single quantity of the given product from the cart. If after
   * decrement the quantity reaches zero, remove the row entirely.
   *
   * @param {number|string} id - Product id
   * @returns {Promise<void|Model>} Promise resolving when DB operation completes
   */
  static async removeProduct(id) {
    const existing = await CartItem.findOne({ where: { productId: id } });
    if (!existing) return;

    if (existing.qty > 1) {
      existing.qty = existing.qty - 1;
      return existing.save();
    }

    return existing.destroy();
  }

  /**
   * Retrieve current cart contents.
   * Returns an object with a `products` array where each item is { id, qty }.
   * This matches the shape previously returned by the raw-SQL implementation.
   *
   * @returns {Promise<{products: Array<{id: number, qty: number}>}>}
   */
  static async getCart() {
    const items = await CartItem.findAll();
    return { products: items.map(i => ({ id: i.productId, qty: i.qty })) };
  }
};
