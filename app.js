const express = require('express');
const path = require('path');
const app = express();

const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const rootDir = require('./util/path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, 'public')));

// Setup EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(homeRoutes);
app.use('/admin/products', productRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});