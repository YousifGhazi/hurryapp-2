const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST a new sensor
router.post('/sensors', async (req, res) => {
  const { sensor_type, last_reading_time, location_id } = req.body;
  try {
    const newSensor = await prisma.sensors.create({
      data: {
        sensor_type,
        last_reading_time,
        location_id,
      },
    });
    res.status(201).json(newSensor);
  } catch (error) {
    console.error('Error creating new sensor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// router.get('/sensors', async (req, res) => {
//   try {
//     const sensors = await prisma.sensors.findMany({
//       include: {
//         location: true, // Include the related location data
//         readings: true, // Include the related readings data
//       },
//     });
//     res.json(sensors);
//   } catch (error) {
//     console.error('Error fetching sensors:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// GET all locations
router.get('/location', async (req, res) => {
  try {
    const locations = await prisma.locations.findMany({
      include: {
        sensors: true, // Include the related sensors data
      },
    });
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a specific location by ID along with its sensors
router.get('/locations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const location = await prisma.locations.findUnique({
      where: { location_id: parseInt(id) },
      include: {
        sensors: true, // Include the related sensors data
      },
    });
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// GET all sensors
router.get('/sensors', async (req, res) => {
  try {
    const sensors = await prisma.sensors.findMany();
    res.json(sensors);
  } catch (error) {
    console.error('Error fetching sensors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
