const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.locals.birthday = 'June 18th';
    res.render('index', {name: 'Hadley Slucher'});
});

app.listen(3000);