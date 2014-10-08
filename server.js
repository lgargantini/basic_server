var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var app = express();

app.set('views',__dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());

var controllers = require('./controllers/index')();
require('./routes')(app,controllers);


app.listen(5000);