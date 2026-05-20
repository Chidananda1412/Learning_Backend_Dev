# Node.js MVC Shop Sample

This project demonstrates an Express.js application using the MVC architecture.

## Folder structure

- `controllers/`: Business logic and request handlers.
- `models/`: Data access layer and domain models.
- `routes/`: URL route definitions that map requests to controller methods.
- `views/`: EJS templates used to render HTML pages.
- `public/`: Static assets such as CSS and JavaScript.
- `data/`: Simple JSON storage for products.
- `util/`: Shared helper utilities.

## How MVC works in this project

- Model: `models/product.js` encapsulates product data and file persistence.
- View: EJS templates in `views/` generate HTML based on data passed from controllers.
- Controller: Files in `controllers/` handle request logic and coordinate model and view behavior.
- Routes: `routes/admin.js` and `routes/shop.js` connect URLs to controller functions.

## Run the app

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open http://localhost:3000 in your browser.
