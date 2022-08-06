import connectDB from "../../utils/connectDB";
import tripModel from "../../models/tripModel";
import errorResponse from "../../utils/errorResponse";
import parseRequest from "../../middlewares/parseRequest";
import sendSMS from "../../services/sms";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await newTrip(req, res);
  }
};

const newTrip = async (req, res) => {
  try {
    const response = await parseRequest(req);
    if (!response.success) throw { message: response.message };
    const {
      Name,
      Phone,
      From,
      To,
      IsRoundTrip,
      When,
      ReturnTime,
      NoOfPerson,
      PreferredVehicles,
      Purpose,
      AnyMessage,
    } = response.body;
    let data = {
      "Client.Name": Name,
      "Client.Phone": Phone,
      From,
      To,
      IsRoundTrip,
      When,
      NoOfPerson,
      Purpose,
      AnyMessage,
    };
    if (IsRoundTrip && ReturnTime) data.ReturnTime = ReturnTime;
    if (PreferredVehicles) data.PreferredVehicles = PreferredVehicles;
    const trip = await tripModel.create(data);
    //SMS
    let message = `New Trip GFM\nCheck Now at: https://admin.gadiforme.com/trip/${trip._id}`;
    sendSMS(message, ["8077015752"]);
    message = `Hi ${Name},\nWe will contact you Soon\n-Team GadiForMe`;
    sendSMS(message, [Phone]);
    res.status(201).json({
      success: true,
      message: "Trip Added Successfully",
      trip: trip._id,
    });
  } catch (error) {
    const response = errorResponse(error);
    console.log("Trip Add Error", error);
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
