const mongoose = require("mongoose");
const { phoneNumber } = require("../utils/validator");

const locationObj = {
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Place: {
    type: String,
    required: true,
  },
};

const querySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    From: locationObj,
    To: locationObj,
  },
  { timestamps: true }
);
querySchema.path("Phone").validate(function (phone) {
  return phoneNumber(phone);
}, "Phone must be a 10 digit number");
module.exports = mongoose.models.Query || mongoose.model("Query", querySchema);
