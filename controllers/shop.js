const Product = require('../models/product');
const Cart = require('../models/cart');

// Controller for shop-facing pages.
// This is the "C" in MVC for all customer-facing requests.
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      formsCSS: false,
      productCSS: false
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/products');
    }
    Cart.addProduct(prodId, product.price, () => {
      res.redirect('/cart');
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      formsCSS: false,
      productCSS: false
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        formsCSS: false,
        productCSS: false,
        products: cartProducts
      });
    });
  });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.removeProduct(prodId, () => {
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    formsCSS: false,
    productCSS: false
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
    formsCSS: false,
    productCSS: false
  });
};
