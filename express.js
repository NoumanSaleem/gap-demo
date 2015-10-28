var express = require('express');
var app = express();

var checkUser = require('./checkUser');

app.get('/', checkUser, function (req, res, next) {
  return next();
  res.send('Hello World!');
});

app.get('/', function (req, res) {
  res.send('im next!');
});

app.get('/json', function (req, res) {
  res.send({
    hey: 'world!'
  });
});

app.get('/foo', function (req, res) {
  console.log(req);
  res
    .status('200')
    .send('Foo!');
});

app.listen(3000);