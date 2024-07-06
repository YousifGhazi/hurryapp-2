// server.js
const express = require('express');
const location = require('./routes/location');
const sensor = require('./routes/sensor');
const sensorReading = require('./routes/sensorReading');
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv').config();
const mqttServer = require('./services/mqttService')
app.use(express.json());
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Check database connection
async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

main()
  .catch((error) => {
    console.error('Error starting application:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


app.use('/', (res, req) => {
  res.send('Hello world!');
})

// Routes
app.use('/api', location);
app.use('/api', sensor);
app.use('/api', sensorReading);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
