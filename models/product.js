const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

// Path to the JSON file used as a simple flat-file database.
const dataFile = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(dataFile, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price, id = null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    getProductsFromFile(products => {
      if (!this.id) {
        this.id = Math.random().toString(36).substr(2, 9) + Date.now();
      }
      products.push(this);
      fs.writeFile(dataFile, JSON.stringify(products, null, 2), err => {
        if (err) {
          console.error('Failed to save product:', err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      cb(product);
    });
  }

  static deleteById(id, cb) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(dataFile, JSON.stringify(updatedProducts, null, 2), err => {
        if (err) {
          console.error('Failed to delete product:', err);
        }
        cb();
      });
    });
  }
};
