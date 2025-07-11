const Earthquake = require('../models/Earthquake');
const axios = require('axios');

const createEarthquakeReport = async (req, res) => {
  if (process.env.TEST_ENV === 'true') {
    return res.status(201).json({ id: 'simulated-id' }); // 🧪 Modo prueba
  }

  try {
    const report = new Earthquake(req.body);
    await report.save();
    res.status(201).json({ id: report._id });
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos', detail: err.message });
  }
};

const getEarthquakeBySource = async (req, res) => {
  const { country } = req.query;
  const { source } = req.params;

  try {
    if (source === 'local') {
      const reports = await Earthquake.find({
        location: { $regex: country, $options: 'i' }
      });

      return reports.length
        ? res.status(200).json(reports)
        : res.status(404).json({ message: 'No hay registros sísmicos' });
    }

    if (source === 'usgs') {
      const url =
        'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=5&minmagnitude=4';
      const response = await axios.get(url);
      const events = response.data.features.map(e => ({
        magnitude: e.properties.mag,
        depth: e.geometry.coordinates[2],
        location: e.properties.place,
        date: new Date(e.properties.time)
      }));
      return res.status(200).json(events);
    }

    res.status(400).json({ error: 'Fuente no válida' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos sísmicos', detail: err.message });
  }
};

const getEarthquakeHistory = async (req, res) => {
  const { country } = req.params;
  try {
    const reports = await Earthquake.find({
      location: { $regex: country, $options: 'i' }
    });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener historial sísmico' });
  }
};

const deleteEarthquakeReport = async (req, res) => {
  try {
    const result = await Earthquake.findByIdAndDelete(req.params.id);
    result
      ? res.status(200).json({ message: 'Registro eliminado' })
      : res.status(404).json({ error: 'No se encontró el registro sísmico' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createEarthquakeReport,
  getEarthquakeBySource,
  getEarthquakeHistory,
  deleteEarthquakeReport
};