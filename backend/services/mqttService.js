const mqtt = require('mqtt');
const { SensorReading } = require('../models');
const { Model } = require('sequelize');

const client = mqtt.connect('mqtt://91.121.93.94:1883');

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('aswar');
});

client.on('message', async (topic, message) => {
    try {
        console.log('Received message:', message.toString());
        const data = JSON.parse(message.toString());
        const sensorReading = await SensorReading.create(data);
        console.log('Sensor reading saved:', sensorReading);
    } catch (error) {
        console.error('Error parsing or saving sensor reading:', error);

        console.error('Raw message:', message.toString());
    }
});


module.exports = client;