const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");
const tripRoute = require("../routes/trip.route")

router.get("/", homeController);

router.use("/trip", tripRoute);

// router.use("/collection", require("./product.routes"));

// router.use("/info", require("./info.routes"));

// router.use("/my", require("./my.routes")); //my/cart, my/profile, my/orders

// router.use("/order", require("./order.routes"));

module.exports = router;
