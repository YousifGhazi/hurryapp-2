const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');

const port = 1883;
const host = '192.168.0.107'; // change to machine lan ip address

ws.createServer({ server: httpServer }, aedes.handle);

aedes.on('client', function (client) {
    console.log(`Client connected: ${client.id}`);
});

aedes.on('clientDisconnect', function (client) {
    console.log(`Client disconnected: ${client.id}`);
});

aedes.on('clientError', function (client, err) {
    console.error(`Client error from ${client.id}: ${err.message}`);
});

aedes.on('error', function (err) {
    console.error('Aedes error:', err.message);
});

aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(`Message from client ${client.id}: ${packet.payload.toString()}`);

        aedes.publish({
            topic: 'client-greetings',
            payload: Buffer.from(`Hi ${client.id}! Welcome to the MQTT broker. You sent: ${packet.payload.toString()}`),
            qos: 1,
            retain: false
        });
    }
});

server.listen(port, host, function () {
    console.log(`Aedes MQTT broker listening on ${host}:${port}`);
});


module.exports = server;