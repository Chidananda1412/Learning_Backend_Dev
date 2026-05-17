const express = require('express');
const router = express.Router();
const productData = require('./productData');

router.post('/add-product', (req, res, next) => {
    const { title, price } = req.body;
    
    if (title && price) {
        productData.products.push({
            id: Date.now(),
            title: title,
            price: price
        });
    }
    
    res.redirect('/admin');
});

module.exports = router;