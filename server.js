var fs = require('fs');
var sanitize = require('validator');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));  
}).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(app);
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    data = sanitize.escape(data);
    io.sockets.emit('msg', data);
  });
});

