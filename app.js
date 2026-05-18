const express = require('express');
const app = express();

const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

app.use(homeRoutes);
app.use('/admin/products', productRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1><a href="/"><button>Back to Home</button></a>');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});