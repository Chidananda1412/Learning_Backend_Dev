const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// Admin product management routes
// GET /admin/add-product => render the product creation form
router.get('/add-product', adminController.getAddProduct);

// GET /admin/products => render the list of products for admin management
router.get('/products', adminController.getProducts);

// POST /admin/add-product => process form submission and save a new product
router.post('/add-product', adminController.postAddProduct);

// POST /admin/delete-product => remove a product from the database
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
