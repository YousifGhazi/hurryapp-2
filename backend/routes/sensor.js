const express = require('express');
const router = express.Router();
const ReadingSensor = require('../models/sensor');

// POST a new readingSensor
router.post('/readingSensors', async (req, res) => {
  const { sensor_id, temperature, humidity, concentration } = req.body;

  try {
    const newReadingSensor = await ReadingSensor.create({
      sensor_id,
      temperature,
      humidity,
      concentration,
      // Add other fields as needed
    });
    res.status(201).json(newReadingSensor);
  } catch (error) {
    console.error('Error creating new readingSensor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
