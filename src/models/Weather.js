// src/models/Weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  condition: { type: String, enum: ['Soleado', 'Nublado', 'Lluvioso', 'Tormenta'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);