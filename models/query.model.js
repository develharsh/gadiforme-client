const mongoose = require("mongoose");
const { phoneNumber } = require("../utils/validator");

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
  },
  { timestamps: true }
);
querySchema.path("Phone").validate(function (phone) {
  return phoneNumber(phone);
}, "Phone must be a 10 digit number");
module.exports = mongoose.models.Query || mongoose.model("Query", querySchema);
