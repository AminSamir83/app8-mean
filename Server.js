var express = require('express');
var app = express();
var bodyparser = require('body-parser');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


const api = require('./server/routing/api')
app.use('/api',api);


console.log('hani nesma3 fik 3al 3000')
app.listen(3000)