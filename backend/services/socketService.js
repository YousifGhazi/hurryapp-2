const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// const wss = new WebSocket.Server({ port: 8080 });
const server = http.createServer(app);

const io = new Server(server);
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.emit('message', 'Welcome to the WebSocket server!');

    // Example: Handle incoming messages
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        // Broadcast to all clients
        io.emit('chat message', msg);
    });
});

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

main().catch((error) => {
    console.error('Error starting application:', error);
});


function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = { broadcast };
