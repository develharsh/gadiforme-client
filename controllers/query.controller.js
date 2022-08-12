const queryModel = require("../models/query.model");
const errorResponse = require("../utils/errorResponse");
const sendSMS = require("../services/sms");

module.exports.add = async (req, res) => {
  try {
    const query = await queryModel.create(req.body);
    //SMS
    let message = `New Query GFM ${query.Phone} ${query.Name} ${query._id}`;
    sendSMS(message, ["8077015752"]);
    // message = `Hi ${query.Name},\nWe will contact you Soon\n-Team GadiForMe`;
    // sendSMS(message, [query.Phone]);
    res.status(201).json({ success: true, message: "Sent Successfully" });
  } catch (error) {
    const response = errorResponse(error);
    console.log("Query Add Error", error);
    res
      .status(response.code)
      .json({ success: false, message: response.message });
  }
};
