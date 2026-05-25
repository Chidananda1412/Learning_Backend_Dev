const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const rootDir = require('./util/path');
const db = require('./util/database'); // initialize DB connection and ensure tables exist

const app = express();

// ----------------------------
// View Engine Configuration
// ----------------------------
// EJS templates are rendered from the `views/` directory.
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// ----------------------------
// Middleware
// ----------------------------
// Parse incoming URL-encoded form data and make it available under req.body.
app.use(express.urlencoded({ extended: false }));

// Serve static files such as CSS and client JavaScript from `public/`.
app.use(express.static(path.join(rootDir, 'public')));

// ----------------------------
// Routes
// ----------------------------
// Routes delegate request handling to controller functions.
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Handle unmatched routes with a 404 page.
app.use(errorController.get404);

// ----------------------------
// Start Server
// ----------------------------
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
