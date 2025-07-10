// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');
const earthquakeRoutes = require('./routes/earthquakeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);
app.use('/earthquakes', earthquakeRoutes);

module.exports = app;