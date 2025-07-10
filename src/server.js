// src/server.js
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// 🔌 Montar Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('Error de conexión:', err.message);
  });