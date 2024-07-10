const http = require('http');
const socketIo = require('socket.io');
const { app } = require('../server');

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.join('clock');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


setInterval(() => {
    io.to('clock').emit('fetch');
}, 1000);

server.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});

module.exports = {
    io
};
