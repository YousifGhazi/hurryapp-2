const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const port = 1883;
const host = '0.0.0.0';

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
            sensor_id: payload.sensor_id,
            hum: payload.hum,
            temp: payload.temp,
            co2: payload.co2,
            pm25: payload.pm25
        };

        console.log(data);

        create(data);

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


const create = async (data) => {
    try {
        const { sensor_id, temp, hum, co2, pm25 } = data;

        let sensor = await prisma.sensors.findUnique({
            where: {
                id: sensor_id
            }
        });

        if (!sensor) {
            sensor = await prisma.sensors.create({
                data: {
                    id: sensor_id,
                    lat: 33.318544,
                    long: 44.415127
                }
            });
        }

        const reading = await prisma.readingSensors.create({
            data: {
                sensor_id: sensor.id,
                temp: temp,
                hum: hum,
                co2: co2,
                pm25: pm25
            }
        });

        console.log('Data saved successfully:', reading);
    } catch (e) {
        console.error('Failed to save data:', e);
    }
};


module.exports = server;