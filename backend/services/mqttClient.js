const mqtt = require('mqtt');

// Define the broker URL and port
const brokerUrl = 'tcp://4.tcp.eu.ngrok.io:12562';

// Create an MQTT client
const client = mqtt.connect(brokerUrl);

// Define a sample payload to publish
const samplePayload = {
    hum: "",
    temp: "",
    co2: "",
    pm25: "",
};

// Convert the payload to a JSON string
const payloadString = JSON.stringify(samplePayload);

// Define the topic to publish to
const topic = 'test';

// Connect to the broker
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Publish the payload to the topic
    client.publish(topic, payloadString, { qos: 1 }, (err) => {
        if (err) {
            console.error('Failed to publish message:', err);
        } else {
            console.log('Message published:', payloadString);
        }

        // Close the connection after publishing
        client.end();
    });
});

// Handle any errors
client.on('error', (err) => {
    console.error('MQTT client error:', err);
});

module.exports = client;