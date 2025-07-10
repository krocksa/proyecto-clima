const express = require('express');
const router = express.Router();
const earthquakeController = require('../controllers/earthquakeController');
const validateEarthquake = require('../middlewares/earthquakeValidator');
const handleValidation = require('../middlewares/handleValidation');

router.post('/', validateEarthquake, handleValidation, earthquakeController.createEarthquakeReport);
router.get('/history/:country', earthquakeController.getEarthquakeHistory);
router.get('/:source', earthquakeController.getEarthquakeBySource);
router.delete('/:id', earthquakeController.deleteEarthquakeReport);

module.exports = router;