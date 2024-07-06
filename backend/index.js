const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const clientMQTT = require('./services/mqttService');

const client = new Client({
  user: 'postgres',
  password: '2001',
  host: 'localhost',
  port: 5334,
  database: 'smart-home',
})

// client.connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((e) => console.log("Error connecting to PostgreSQL", e));


app.get('/test-db', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.json({
      status: 'success',
      message: 'Connected to PostgreSQL',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({
      status: 'error',
      message: 'Failed to connect to PostgreSQL',
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Smart Home!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

