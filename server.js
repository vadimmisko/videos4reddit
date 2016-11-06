var express     = require('express');
var compression = require('compression');

var app   = express();
var port  = process.env.PORT || 8080;

app.use(compression());
app.use(express.static(__dirname + '/'));
// TODO: Make all routes be imported from ./src/routes.js
app.use('/signin', express.static(__dirname + '/'));
app.use('/post/:id', express.static(__dirname + '/'));

app.listen(port, function () {
  console.log('Server is flying on port:' + port)
});
