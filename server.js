var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));
// TODO: Make all routes be imported from ./src/routes.js
app.use('/signin', express.static(__dirname + '/'));
app.use('/post/:id', express.static(__dirname + '/'));

app.listen(process.env.PORT || 8080);
