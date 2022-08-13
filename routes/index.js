const express = require("express");
const router = express.Router();
const staticController = require("../controllers/static.pages.controller");
const queryRoute = require("./query.route");
const generalRoute = require("./general.route");
const partnerRoute = require("./partner.route");

router.get("/", staticController.home);
router.get("/privacy-policy", staticController.privacyPolicy);
router.get("/terms-and-conditions", staticController.termsNCond);
router.get("/refund-and-cancellation-policy", staticController.refundNCanc);
router.get("/about-us", staticController.aboutUs);

router.use("/query", queryRoute);
router.use("/general", generalRoute);
router.use("/partner", partnerRoute);

// router.use("/collection", require("./product.routes"));

// router.use("/info", require("./info.routes"));

// router.use("/my", require("./my.routes")); //my/cart, my/profile, my/orders

// router.use("/order", require("./order.routes"));

module.exports = router;
