const express = require('express');
const location = require('./routes/location');
const sensor = require('./routes/sensor');
const sensorReading = require('./routes/sensorReading');
const app = express();
const PORT = process.env.PORT || 3001; // Changed from 3000 to 3001
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv').config();
const mqttServer = require('./services/mqttService');
const ws = require('./services/socketService');
const cors = require('cors');

app.use(
    cors({
        credentials: true,
        origin: "*",
        exposedHeaders: ["Authorization"],
    })
);
app.use(express.json());

// Check database connection
async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

main().catch((error) => {
    console.error('Error starting application:', error);
});

// Routes
app.use('/api', location);
app.use('/api', sensor);
app.use('/api', sensorReading);

app.use('/', (req, res) => {
    res.send('Hello world!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
