const express = require('express');
const router = express.Router();
const ReadingSensor = require('../models/sensorReading');

// Create a new reading sensor
router.post('/readingSensors', async (req, res) => {
  const { sensor_id, temperature, humidity, concentration, co2, particle_level, air_quality_label, sensor_value } = req.body;

  try {
    const newReadingSensor = await ReadingSensor.create({
      sensor_id,
      temperature,
      humidity,
      concentration,
      co2,
      particle_level,
      air_quality_label,
      sensor_value,
    });
    res.status(201).json(newReadingSensor);
  } catch (error) {
    console.error('Error creating new reading sensor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all reading sensors
router.get('/readingSensors', async (req, res) => {
  try {
    const readingSensors = await ReadingSensor.findAll();
    res.json(readingSensors);
  } catch (error) {
    console.error('Error fetching reading sensors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
