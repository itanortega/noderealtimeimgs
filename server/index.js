const http = require('http')
const express = require('express')
const websockets = require('./ws')

const server = express()

server.use(express.static(__dirname + './../app'))

http.createServer(server).listen(3000, function(){
  console.log('Servidor está listo %d', this.address().port)
  websockets(this)
})