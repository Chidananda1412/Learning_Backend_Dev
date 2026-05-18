const express = require('express');
const router = express.Router();
const productData = require('./productData');

router.get('/', (req, res, next) => {
    let productList = '<h1>Product Admin</h1>';
    productList += '<a href="/"><button>Back to Home</button></a><br><br>';

    if (productData.products.length > 0) {
        productList += '<h2>Products List:</h2><ul>';
        productData.products.forEach(product => {
            productList += `<li>${product.title} - $${product.price}</li>`;
        });
        productList += '</ul>';
    } else {
        productList += '<p>No products added yet.</p>';
    }

    res.send(productList);
});

module.exports = router;
