var express     = require('express');
var path        = require('path');
var compression = require('compression');

var app   = express();
var port  = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'index.html'))
})

app.listen(port, function () {
  console.log('Server is flying on port:' + port)
});
