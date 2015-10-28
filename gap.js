var http = require('http');

function gap() {
  var layers = [];

  function get(regExp, handler) {
    layers.push({
      regExp: regExp,
      handler: handler
    });
  }

  function handler(req, res) {
    var layerId = 0;

    res.json = function (obj) {
      var j = JSON.stringify(obj);
      res.write(j);
      res.end();
    };

    function next() {
      var layer;
      var match = false;

      while(match !== true && layerId < layers.length) {
        layer = layers[layerId++];
        match = layer.regExp.test(req.url);
      }

      if (!match) {
        res.write('404');
        res.end();
        return;
      }

      layer.handler(req, res, next);
    }

    next();
  }

  function listen(port) {
    http.createServer(handler).listen(port);
  }

  return {
    get: get,
    listen: listen
  };
}

var app = gap();

// app.get(/\//, function (req, res, next) {
//   return next();
//   res.write('Hey!');
//   res.end();
// });

// app.get(/\//, function (req, res) {
//   res.write('next!');
//   res.end();
// });

app.get(/\/json/, function (req, res) {
  res.statusCode = http.STATUS_CODES[200];

  res.json({
    hey: 'world!'
  });
});


app.listen(3000);

