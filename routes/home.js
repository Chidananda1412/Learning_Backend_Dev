const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    const filePath = path.resolve(__dirname, '..', 'views', 'Home-page.html');
    res.sendFile(filePath, err => {
        if (err) return next(err);
    });
});

module.exports = router;