const Product = require('../models/product');

/**
 * Admin controller
 *
 * Responsibilities:
 *  - Render admin pages for creating and listing products
 *  - Handle form submissions for adding and deleting products
 *
 * All handlers are async and forward errors to the `next` middleware.
 */
// Controller for admin-facing actions.
// Admin controllers handle product creation, deletion, and listing.
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, description, price);

  try {
    await product.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    await Product.deleteById(prodId);
    res.redirect('/admin/products');
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (err) {
    next(err);
  }
};
