const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app); 

const socketIo = require('socket.io');
const io = socketIo(server);

server.listen(3000, () => {
    console.log("server started on port 3000");
});

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });
});