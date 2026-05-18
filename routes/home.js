const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(`
        <h1>The Home Page</h1>
        <form action="/admin/products/add-product" method="POST">
            <input type="text" name="title" placeholder="Product Title" required>
            <input type="text" name="price" placeholder="Product Price" required>
            <button type="submit">Add Product</button>
        </form>
    `);
}); 

module.exports = router;    