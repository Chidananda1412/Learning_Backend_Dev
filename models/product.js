/**
 * Product model (Sequelize-backed)
 *
 * This file exposes the same class-based API the rest of the application
 * expects, but delegates persistence to a Sequelize model underneath.
 * Keeping the class wrapper minimizes changes required in controllers.
 */
const Sequelize = require('sequelize');
const { sequelize } = require('../util/sequelize');

const { DataTypes } = Sequelize;

// Define Sequelize model for products. Table will be `products`.
const ProductModel = sequelize.define(
  'product',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
    price: { type: DataTypes.DOUBLE },
    description: { type: DataTypes.TEXT }
  },
  { timestamps: false, tableName: 'products' }
);

// Wrapper class preserving previous API.
module.exports = class Product {
  constructor(title, imageUrl, description, price, id = null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  /**
   * Save the product. If `this.id` is set the existing row will be updated.
   * Otherwise a new DB row is created and the instance `id` is populated
   * with the inserted id returned by Sequelize.
   *
   * @returns {Promise<Model>} Created/updated Sequelize model instance
   */
  async save() {
    if (this.id) {
      return ProductModel.update(
        {
          title: this.title,
          imageUrl: this.imageUrl,
          price: this.price,
          description: this.description
        },
        { where: { id: this.id } }
      );
    }

    const created = await ProductModel.create({
      title: this.title,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
    });
    this.id = created.id;
    return created;
  }

  /**
   * Fetch all products. Returns a plain array of objects to match previous
   * behavior that returned raw DB rows.
   *
   * @returns {Promise<Array<Object>>}
   */
  static async fetchAll() {
    const items = await ProductModel.findAll();
    return items.map(i => i.get({ plain: true }));
  }

  /**
   * Find a product by primary key. Returns a plain object or null.
   *
   * @param {number|string} id
   * @returns {Promise<Object|null>}
   */
  static async findById(id) {
    const item = await ProductModel.findByPk(id);
    return item ? item.get({ plain: true }) : null;
  }

  /**
   * Delete a product by id.
   *
   * @param {number|string} id
   * @returns {Promise<number>} Number of rows deleted
   */
  static deleteById(id) {
    return ProductModel.destroy({ where: { id } });
  }
};
