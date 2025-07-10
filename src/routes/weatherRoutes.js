const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const validateWeather = require('../middlewares/weatherValidator');
const handleValidation = require('../middlewares/handleValidation');

router.post('/', validateWeather, handleValidation, weatherController.createWeatherReport);

module.exports = router;