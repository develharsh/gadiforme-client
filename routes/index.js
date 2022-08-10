const express = require("express");
const router = express.Router();
const staticController = require("../controllers/static.pages.controller");
const tripRoute = require("../routes/trip.route");

router.get("/", staticController.home);
router.get("/privacy-policy", staticController.privacyPolicy);
router.get("/terms-and-conditions", staticController.termsNCond);
router.get("/refund-and-cancellation-policy", staticController.refundNCanc);
router.get("/about-us", staticController.aboutUs);

router.use("/trip", tripRoute);

// router.use("/collection", require("./product.routes"));

// router.use("/info", require("./info.routes"));

// router.use("/my", require("./my.routes")); //my/cart, my/profile, my/orders

// router.use("/order", require("./order.routes"));

module.exports = router;
