const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const port = 1883;
const host = '192.168.246.181';

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

        let payload;
        try {
            payload = JSON.parse(packet.payload.toString());
        } catch (e) {
            console.error('Failed to parse payload:', e);
            return;
        }

        const data = {
            sensor_id: 1,
            temperature: payload.temperature,
            humidity: payload.humidity,
            concentration: payload.concentration,
            co: payload.co,
            Alcohol: payload.Alcohol,
            CO2: payload.CO2,
            Toluen: payload.Toluen,
            NH4: payload.NH4,
            Aceton: payload.Aceton,
            particle_level: payload.particle_level,
            air_quality_label: payload.air_quality_label,
        };

        console.log(data);

        const create = async () => {
            try {
                await prisma.readingSensors.create({
                    data: data
                });
                console.log('Data saved successfully:', data);
            } catch (e) {
                console.error('Failed to save data:', e);
            }
        };

        create();

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