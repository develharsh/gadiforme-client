module.exports.sendmail = async (req, res) => {
  const errorResponse = require("../utils/errorResponse");
  try {
    const sendEmail = require("../utils/sendEmail");
    sendEmail(req.params.type, {
      message: req.body.message,
      email: "care.gadiforme@gmail.com",
    });
    res.status(200).json({ success: true, message: "Email Alert was sent" });
  } catch (err) {
    errorResponse(res, err);
  }
};
