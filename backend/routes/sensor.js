const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor');

// Creete a new sensor
router.post('/sensors', async (req, res) => {
  const { sensor_type, last_reading_time, location_id } = req.body;

  try {
    const newSensor = await Sensor.create({
      sensor_type,
      last_reading_time,
      location_id,
    });
    res.status(201).json(newSensor);
  } catch (error) {
    console.error('Error creating new sensor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all sensors
router.get('/sensors', async (req, res) => {
  try {
    const sensors = await Sensor.findAll();
    res.json(sensors);
  } catch (error) {
    console.error('Error fetching sensors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
