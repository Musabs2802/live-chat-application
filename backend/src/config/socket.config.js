const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',  // Allow requests from your frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Allow these HTTP methods
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log('A user is connected', socket.id)

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
})

module.exports = { app, io, server }