const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

wss.on('connection', function connection(ws) {
    console.log('New connection')
    ws.on('message', function message(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(data, {binary: false })
            }
          })
    });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

server.listen(3000, () => {
    console.log('listen on port 3000')
})