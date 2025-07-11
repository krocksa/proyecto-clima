const express = require("express");
const {
  createEarthquakeReport,
  getEarthquakeBySource,
  getEarthquakeHistory,
  deleteEarthquakeReport
} = require("../controllers/earthquakeController");

const router = express.Router();

router.post("/", createEarthquakeReport);
router.get("/source/:source", getEarthquakeBySource);
router.get("/history/:country", getEarthquakeHistory);
router.delete("/:id", deleteEarthquakeReport);

module.exports = router;