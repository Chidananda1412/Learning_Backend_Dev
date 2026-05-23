const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const cartFilePath = path.join(rootDir, 'data', 'cart.json');

const getCartFromFile = cb => {
  fs.readFile(cartFilePath, (err, fileContent) => {
    if (err) {
      return cb({ products: [] });
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice, cb) {
    getCartFromFile(cart => {
      const updatedCart = { ...cart };
      const existingProductIndex = updatedCart.products.findIndex(prod => prod.id === id);
      const existingProduct = updatedCart.products[existingProductIndex];

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        updatedCart.products.push({ id, qty: 1, price: productPrice });
      }

      fs.writeFile(cartFilePath, JSON.stringify(updatedCart, null, 2), err => {
        if (err) {
          console.error('Failed to save cart:', err);
        }
        cb();
      });
    });
  }

  static removeProduct(id, cb) {
    getCartFromFile(cart => {
      const updatedCart = { ...cart };
      const existingProductIndex = updatedCart.products.findIndex(prod => prod.id === id);
      if (existingProductIndex < 0) {
        return cb();
      }

      const existingProduct = updatedCart.products[existingProductIndex];
      existingProduct.qty -= 1;

      if (existingProduct.qty <= 0) {
        updatedCart.products.splice(existingProductIndex, 1);
      }

      fs.writeFile(cartFilePath, JSON.stringify(updatedCart, null, 2), err => {
        if (err) {
          console.error('Failed to update cart:', err);
        }
        cb();
      });
    });
  }

  static getCart(cb) {
    getCartFromFile(cb);
  }
};
