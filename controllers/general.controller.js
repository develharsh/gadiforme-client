module.exports.visitorMail = async (req, res) => {
  const errorResponse = require("../utils/errorResponse");
  try {
    const sendEmail = require("../utils/sendEmail");
    sendEmail("visitor", {
      type: req.params.type,
      email: "care.gadiforme@gmail.com",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
