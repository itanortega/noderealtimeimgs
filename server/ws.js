module.exports = function(server){
  const sio = require('socket.io')

  const ws = sio.listen(server)

  ws.on('connection', function(socket){
    socket.emit('ready')
    socket.on('imagen', function(img){
      socket.broadcast.emit('imagen', img)
    })
  })
}