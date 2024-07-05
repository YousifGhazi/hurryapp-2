const mqtt = require('mqtt');

// Replace 'localhost' with your server's LAN IP address
const brokerUrl = 'mqtt://192.168.68.119:1883';

// Create a client connected to your MQTT broker
const client = mqtt.connect(brokerUrl);

// Handle errors
client.on('error', function (error) {
    console.error('Error:', error);
    client.end(); // Close the connection
});

// Handle connection
client.on('connect', function () {
    console.log('Connected to MQTT broker');

    // Subscribe to the greeting topic
    client.subscribe('client-greetings', function (err) {
        if (!err) {
            console.log('Subscribed to topic "client-greetings"');
        }
    });
});

// Handle incoming messages
client.on('message', function (topic, message) {
    // Log the received message locally
    console.log(`Received message on topic '${topic}': ${message.toString()}`);

    // Optionally, you can disconnect after receiving a message (for testing)
    // client.end();
});

module.exports = client;
