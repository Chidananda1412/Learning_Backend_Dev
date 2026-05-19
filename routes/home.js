const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const productData = require('./productData');

router.get('/', (req, res, next) => {
    res.render('home', { pageTitle: 'Home', products: productData.products });
});

module.exports = router;