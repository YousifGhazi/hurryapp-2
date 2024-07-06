// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

// POST a new location
router.post('/locations', async (req, res) => {
  const { city_name } = req.body;

  try {
    const newLocation = await Location.create({
      city_name,
    });
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error creating new location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
