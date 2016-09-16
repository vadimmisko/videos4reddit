var express = require('express');
var app = express();

process.env.NODE_ENV = 'production';

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 8080);
