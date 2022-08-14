const express = require("express");
const router = express.Router();
const generalController = require("../controllers/general.controller");

router.post("/sendmail/:type", generalController.sendmail);

module.exports = router;
