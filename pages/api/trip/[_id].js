import connectDB from "../../../utils/connectDB";
import tripModel from "../../../models/tripModel";
import errorResponse from "../../../utils/errorResponse";
import mongoose from "mongoose";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getTrip(req, res);
      break;
  }
};

const getTrip = async (req, res) => {
  try {
    const { _id } = req.query;
    if (!mongoose.isValidObjectId(_id)) throw { message: "Invalid Trip Id" };
    const trip = await tripModel.findOne({
      _id,
      "Client.Id.Image": { $ne: null },
      "Partner.Id.Image": { $ne: null },
      "Partner.Phone": { $ne: null },
      "Partner.Name": { $ne: null },
      PaymentId: { $ne: null },
      "Vehicle.Title": { $ne: null },
      "Vehicle.RegistrationNo": { $ne: null },
      TotalCost: { $ne: null },
      AdvancePaid: { $ne: null },
    });
    if (!trip) throw { message: "No Such Trip Exists" };
    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    const response = errorResponse(error);
    console.log("Trip View Error", error);
    res
      .status(response.code)
      .json({ success: false, message: response.message });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
