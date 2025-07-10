// src/models/Earthquake.js
const mongoose = require('mongoose');

const earthquakeSchema = new mongoose.Schema({
  magnitude: { type: Number, required: true },
  depth: { type: Number, required: true }, // en kilómetros
  location: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Earthquake', earthquakeSchema);