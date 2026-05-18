const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../views/util/path');

router.get('/', (req, res, next) => {
    const filePath = path.join(rootDir, 'views', 'Home-page.html');
    res.sendFile(filePath, err => {
        if (err) return next(err);
    });
});

module.exports = router;