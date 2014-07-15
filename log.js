(function() {
  var app, express, http, io, net, server;

  net = require('net');

  express = require('express');

  app = express();

  http = require('http').Server(app);

  io = require('socket.io')(http);

  app.use(express["static"](__dirname + '/public'));

  app.get('/', function(req, res) {
    return res.sendfile('index.html');
  });

  io.on('connection', function(socket) {
    console.log('A node connected');
    return socket.on('disconnect', function() {
      return console.log('A node disconnected');
    });
  });

  http.listen(8000, function() {
    return console.log('Listening on *:8000');
  });

  server = net.createServer(function(c) {
    return c.on('data', function(data) {
      return io.emit('logging', data.toString());
    });
  });

  server.listen(9528, console.log);

}).call(this);
