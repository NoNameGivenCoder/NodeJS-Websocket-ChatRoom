const express = require('express')
const app = express()

const http = require('http')
const WebSocket = require('ws')

const path = require('path')

const server = http.createServer(app)

const fs = require('fs')

const wss = new WebSocket.Server({server})

var all_messages = []

wss.on('connection', function connection(ws) {

    ws.send(JSON.stringify(all_messages))
    console.log(all_messages)

    ws.on('message', function incoming(data) {

        if (!all_messages.length >= 50) {
            all_messages.push(Buffer.from(data).toString())
        } else {
            all_messages = []
        }

        console.log(Buffer.from(data).toString())
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState == WebSocket.OPEN) {
                client.send(data)
            }
        })
    })
})

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

server.listen(process.env.PORT || 8080, () => {
    console.log('Messaging server listening on port 6969.')
})