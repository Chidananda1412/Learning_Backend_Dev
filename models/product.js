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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
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
};
