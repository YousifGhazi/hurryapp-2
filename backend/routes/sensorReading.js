const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST a new reading sensor
router.post('/readingSensors', async (req, res) => {
  const { sensor_id, temp, hum, pm25, co2 } = req.body;

  try {
    const newReadingSensor = await prisma.readingSensors.create({
      data: {
        sensor_id,
        temp,
        hum,
        co2,
        pm25,
      },
    });
    res.status(201).json(newReadingSensor);
  } catch (error) {
    console.error('Error creating new reading sensor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all reading sensors
router.get('/readingSensors', async (req, res) => {
  const { id } = req.query;

  console.log(id);

  try {
    const latestReading = await prisma.readingSensors.findFirst({
      where: {
        sensor_id: Number(id)
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    console.log(latestReading);
    res.status(200).send(latestReading);
  } catch (error) {
    console.error('Error fetching reading sensors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/history', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Sensor ID is required' });
  }

  try {
    const maxReadingsPerDay = await prisma.$queryRaw`
    SELECT DATE("timestamp") as date, 
           MAX(temp) as "maxTemp", 
           MAX(hum) as "maxHum", 
           MAX(co2) as "maxCO2", 
           MAX(pm25) as "maxPM25"
    FROM "ReadingSensors"
    WHERE sensor_id = ${Number(id)}  -- Explicitly cast id to integer if necessary
    GROUP BY DATE("timestamp")
    ORDER BY date DESC
  `;


    console.log(maxReadingsPerDay);
    res.status(200).send(maxReadingsPerDay);
  } catch (error) {
    console.error('Error fetching reading sensors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/forecast', async (req, res) => {
  try {
    const { id } = req.query;

    const maxReadingsPerHour = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('hour', "timestamp"), 'YYYY-MM-DD"T"HH24:00:00.000"Z"') as hour,
        MAX(temp) as "maxTemp", 
        MAX(hum) as "maxHum", 
        MAX(co2) as "maxCO2", 
        MAX(pm25) as "maxPM25"
      FROM "ReadingSensors"
      WHERE sensor_id = ${Number(id)}  -- Assuming you want to filter by sensor_id
      GROUP BY TO_CHAR(DATE_TRUNC('hour', "timestamp"), 'YYYY-MM-DD"T"HH24:00:00.000"Z"')
      ORDER BY hour DESC
    `;

    console.log(maxReadingsPerHour);
    res.status(200).send(maxReadingsPerHour);
  } catch (error) {
    console.error('Error fetching reading sensors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
