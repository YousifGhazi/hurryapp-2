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
            temperature: payload.temp, // Ensure payload has `temp`
            humidity: payload.hum, // Ensure payload has `hum`
            concentration: payload.concentration || null,
            co: payload.CO || null,
            Alcohol: payload.Alcohol || null,
            CO2: payload.CO2 || null,
            Toluen: payload.Toluen || null,
            NH4: payload.NH4 || null,
            Aceton: payload.Aceton || null,
            particle_level: payload.PM1 || null, // Adjust according to actual data
            air_quality_label: payload.air_quality_label || null,
        };

        console.log(data);

        const create = async () => {
            try {
                // Validate if sensor_id exists
                const sensorExists = await prisma.sensor.findUnique({
                    where: { id: data.sensor_id }
                });

                if (!sensorExists) {
                    console.error(`Sensor with ID ${data.sensor_id} does not exist.`);
                    return;
                }

                // Create the new reading
                await prisma.readingSensors.create({
                    data: data
                });
                console.log('Data saved successfully:', data);
            } catch (e) {
                console.error('Failed to save data:', e);
            }
        };

        // create();

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