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
  },
  { timestamps: true }
);
querySchema.path("Phone").validate(function (phone) {
  return phoneNumber(phone);
}, "10 Digits Long Phone No. Allowed");
module.exports = mongoose.models.Query || mongoose.model("Query", querySchema);
