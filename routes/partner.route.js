const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partner.controller");

router.post("/add", partnerController.add);

module.exports = router;
