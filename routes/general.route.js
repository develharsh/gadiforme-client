const express = require("express");
const router = express.Router();
const generalController = require("../controllers/general.controller");

router.post("/visitor/:type", generalController.visitorMail);

module.exports = router;
