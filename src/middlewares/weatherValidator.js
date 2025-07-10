// src/middlewares/weatherValidator.js
const { body } = require('express-validator');

const validateWeather = [
  body('city')
    .notEmpty().withMessage('La ciudad es obligatoria')
    .isString().withMessage('La ciudad debe ser texto'),

  body('temperature')
    .notEmpty().withMessage('La temperatura es obligatoria')
    .isFloat().withMessage('La temperatura debe ser un número decimal'),

  body('humidity')
    .notEmpty().withMessage('La humedad es obligatoria')
    .isInt({ min: 0, max: 100 }).withMessage('La humedad debe estar entre 0 y 100'),

  body('condition')
    .notEmpty().withMessage('La condición es obligatoria')
    .isIn(['Soleado', 'Nublado', 'Lluvioso', 'Tormenta']).withMessage('Condición inválida')
];

module.exports = validateWeather;