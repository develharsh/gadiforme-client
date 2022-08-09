const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip.controller");

router.post("/add", tripController.add);

module.exports = router;
