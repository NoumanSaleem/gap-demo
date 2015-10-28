var http = require('http');

http.createServer(function handler(req, res) {
  res.write('hello world!');
  res.end();
}).listen(3000);