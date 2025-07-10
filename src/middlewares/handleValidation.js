// src/middlewares/handleValidation.js
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const detalles = errors.array().map(err => ({
      campo: err.param,
      mensaje: err.msg
    }));
    return res.status(400).json({ errores: detalles });
  }
  next();
};

module.exports = handleValidation;