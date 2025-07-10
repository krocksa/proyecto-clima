// src/middlewares/earthquakeValidator.js
const { body } = require('express-validator');

const validateEarthquake = [
  body('country')
    .notEmpty().withMessage('El país es obligatorio')
    .isString().withMessage('El país debe ser texto'),

  body('magnitude')
    .notEmpty().withMessage('La magnitud es obligatoria')
    .isFloat({ min: 0.1, max: 10 }).withMessage('La magnitud debe estar entre 0.1 y 10'),

  body('depth')
    .notEmpty().withMessage('La profundidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La profundidad debe ser un número entero positivo'),

  body('date')
    .notEmpty().withMessage('La fecha es obligatoria')
    .isISO8601().withMessage('Formato de fecha inválido')
];

module.exports = validateEarthquake;