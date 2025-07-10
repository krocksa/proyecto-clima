// src/controllers/weatherController.js
const Weather = require('../models/Weather');
const axios = require('axios');

const getWeatherBySource = async (req, res) => {
  const { city } = req.query;
  const { source } = req.params;

  if (!city) {
    return res.status(400).json({ error: 'Debes especificar una ciudad' });
  }

  try {
    if (source === 'local') {
      const report = await Weather.findOne({ city });
      return report
        ? res.status(200).json(report)
        : res.status(404).json({ message: 'No hay registros climáticos' });
    }

    // API externa: OpenWeatherMap
    if (source === 'openweathermap') {
      const apiKey = process.env.OPENWEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      return res.status(200).json({
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].main
      });
    }

    res.status(400).json({ error: 'Fuente no válida' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos del clima', detail: err.message });
  }
};

const createWeatherReport = async (req, res) => {
  try {
    const weather = new Weather(req.body);
    await weather.save();
    res.status(201).json({ id: weather._id });
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos', detail: err.message });
  }
};

const getWeatherHistory = async (req, res) => {
  const { city } = req.params;
  try {
    const reports = await Weather.find({ city });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener historial' });
  }
};

const deleteWeatherReport = async (req, res) => {
  try {
    const result = await Weather.findByIdAndDelete(req.params.id);
    result
      ? res.status(200).json({ message: 'Registro eliminado' })
      : res.status(404).json({ error: 'No se encontró el registro' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  getWeatherBySource,
  createWeatherReport,
  getWeatherHistory,
  deleteWeatherReport,
};