const express = require('express');
const router = express.Router();
const productData = require('./productData');

router.get('/', (req, res, next) => {
    res.render('admin', { pageTitle: 'Product Admin', products: productData.products });
});

module.exports = router;
