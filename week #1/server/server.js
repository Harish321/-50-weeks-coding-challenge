var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
// app.get('/animation.css', function(req, res){
//   res.sendFile(__dirname + '/animation.css');
// });
// app.get('/animation.js', function(req, res){
//   res.sendFile(__dirname + '/animation.js');
// });

io.on('connection', function(socket){

  socket.on('reached', function(msg){
    io.emit('start', msg);
  });
  socket.on('testing',function(msg){
    console.log('testing');
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
