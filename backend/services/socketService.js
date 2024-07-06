const http = require('http');
const socket = require('socket.io');
const { app } = require('../server');

const server = http.createServer(app);
const io = socket(server);


io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('message', (message) => {
        console.log('Message:', message);
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(8080, () => {
    console.log(`Server is running on port ${8080}`);
});



module.exports = {
    socket
}