module.exports.sendmail = async (req, res) => {
  const errorResponse = require("../utils/errorResponse");
  try {
    const sendEmail = require("../utils/sendEmail");
    sendEmail(req.params.type, {
      message: req.body.message,
      email: "care.gadiforme@gmail.com",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
