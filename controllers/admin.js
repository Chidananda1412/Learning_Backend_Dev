const Product = require('../models/product');

// Controller for admin-related actions.
// In MVC, controllers receive requests, interact with models, and return a view.
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, description, price);
  product.save();

  // After saving the product, redirect to the shop home page.
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId, () => {
    res.redirect('/admin/products');
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
