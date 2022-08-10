module.exports.home = function (_, res) {
  res.render("pages/index", {});
};
module.exports.privacyPolicy = function (_, res) {
  res.render("pages/privacy-policy", {});
};
module.exports.termsNCond = function (_, res) {
  res.render("pages/terms-and-conditions", {});
};
module.exports.refundNCanc = function (_, res) {
  res.render("pages/refund-and-cancellation-policy", {});
};
module.exports.aboutUs = function (_, res) {
  res.render("pages/about-us", {});
};
