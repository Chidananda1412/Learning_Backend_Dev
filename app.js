const express = require('express');
const app = express();

app.use('/',(req, res, next) => {

    console.log('In the middleware!');
    next();
});

app.use('/users', (req, res, next) => {

    console.log('In the users middleware!');
    res.send('<h1>The Users Page</h1>');
});  

app.use('/', (req, res, next) => { 
    console.log('In the another middleware!');
    res.send('<h1>The Home Page</h1>');
});

app.listen(3000);