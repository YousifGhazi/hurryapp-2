const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');

// WebSocket server for MQTT over WebSockets
ws.createServer({ server: httpServer }, aedes.handle);

// Event listener for client connect
aedes.on('client', function (client) {
    console.log(`Client connected: ${client.id}`);

    // Publish a greeting message to the client
    aedes.publish({
        topic: 'client-greetings',
        payload: Buffer.from(`Hi ${client.id}! Welcome to the MQTT broker`),
        qos: 1, // Quality of Service level (optional)
        retain: false // Retain flag (optional)
    });
});

// Event listener for client disconnect
aedes.on('clientDisconnect', function (client) {
    console.log(`Client disconnected: ${client.id}`);
});

// Handle errors
aedes.on('clientError', function (client, err) {
    console.error(`Client error from ${client.id}: ${err.message}`);
});

aedes.on('error', function (err) {
    console.error('Aedes error:', err.message);
});

// Listen for MQTT broker connections
server.listen(1883, function () {
    console.log('Aedes MQTT broker listening on port 1883');
});
