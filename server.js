const express = require("express")
const http = require("http")
const app = express()
const path = require("path")
const server = http.createServer(app)
const socketIO = require('socket.io')
const moment = require("moment")

const io = socketIO(server)

app.use(express.static(path.join(__dirname, '/public')))

io.on("connection", (socket) => {
    socket.on("chatting", (data) => {
        const { name, message } = data

        io.emit("chatting", {
            "name" : name,
            "message" : message,
            "time" : moment(new Date()).format("hh:mm A")
        })
    })
})

server.listen(8000, () => {
    console.log("8000번 포트에서 Web Server 실행")
})

//something changed2