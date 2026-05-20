const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const rootDir = require('./util/path');

const app = express();

// ----------------------------
// View Engine Configuration
// ----------------------------
// EJS is used to render dynamic HTML pages from the `views/` folder.
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// ----------------------------
// Middleware
// ----------------------------
// Parse incoming URL-encoded form data and make it available under req.body.
app.use(express.urlencoded({ extended: false }));

// Serve static assets from the public directory.
app.use(express.static(path.join(rootDir, 'public')));

// ----------------------------
// Routes
// ----------------------------
// Note: In MVC, routes map HTTP requests to controller methods.
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 page route
app.use(errorController.get404);

// ----------------------------
// Start Server
// ----------------------------
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
