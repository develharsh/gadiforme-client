const partnerModel = require("../models/partner.model");
const errorResponse = require("../utils/errorResponse");

module.exports.add = async (req, res) => {
  try {
    const { Name, Phone, Location } = req.body;
    // return console.log(req.body);
    let data = {
      Name,
      Phone,
      Location,
    };

    await partnerModel.create(data);
    res.status(201).json({
      success: true,
      message: "Registration Completed Successfully",
    });
  } catch (error) {
    const response = errorResponse(error);
    console.log("Partner Add Error", error);
    res
      .status(response.code)
      .json({ success: false, message: response.message });
  }
};
