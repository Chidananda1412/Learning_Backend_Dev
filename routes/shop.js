const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

// Shop pages
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);

// Cart actions
router.post('/cart', shopController.postCart);
router.post('/cart-delete', shopController.postCartDelete);
router.get('/cart', shopController.getCart);

// Static pages
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
