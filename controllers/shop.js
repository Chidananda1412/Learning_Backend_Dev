const Product = require('../models/product');
const Cart = require('../models/cart');

/**
 * Shop controller
 *
 * Responsibilities:
 *  - Fetch products for listing and index pages
 *  - Add items to the cart and remove items from the cart
 *  - Render cart, orders, and checkout pages
 *
 * Each handler is `async` and uses `try/catch` to pass errors to Express
 * error handling middleware via `next(err)`.
 */
// Controller for customer-facing shop pages.
// Handles product browsing, cart management, and checkout views.
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      formsCSS: false,
      productCSS: false
    });
  } catch (err) {
    next(err);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  // Validate input: controllers accept `productId` from the form body.
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      // If product not found, redirect to products listing.
      return res.redirect('/products');
    }

    // Delegate persistence to the Cart model (now Sequelize-backed).
    await Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
  } catch (err) {
    next(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      formsCSS: false,
      productCSS: false
    });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.getCart();
    const products = await Product.fetchAll();
    const cartProducts = [];

    // Match each product with its quantity in the cart.
    for (const product of products) {
      // `cart.products` contains plain objects { id, qty } from the Cart model.
      // `product` is a plain object from Product.fetchAll().
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
  } catch (err) {
    next(err);
  }
};

exports.postCartDelete = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    await Cart.removeProduct(prodId);
    res.redirect('/cart');
  } catch (err) {
    next(err);
  }
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
