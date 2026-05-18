const express = require('express');
const path = require('path');
const app = express();

const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const rootDir = require('./views/util/path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, 'public')));

app.use(homeRoutes);
app.use('/admin/products', productRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    const errorPage = path.join(rootDir, 'views', 'PageNotFound.html');
    res.status(404).sendFile(errorPage, err => {
        if (err) next(err);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});