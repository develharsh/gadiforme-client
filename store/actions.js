import axios from "axios";

export const ACTIONS = {
  NOTIFY: "NOTIFY",
};

// export const userLogin = async (payload) => {
//   try {
//     const response = await axios({
//       method: "POST",
//       url: `${process.env.baseUrl}/v1/user/login`,
//       data: payload,
//     });
//     return response.data;
//   } catch (err) {
//     return { success: false, message: err.response.data.message };
//   }
// };

// export const userRegister = async (payload) => {
//   try {
//     const response = await axios({
//       method: "POST",
//       url: `${process.env.baseUrl}/v1/user/register`,
//       data: payload,
//     });
//     return response.data;
//   } catch (err) {
//     return { success: false, message: err.response.data.message };
//   }
// };

export const newTrip = async (payload) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.baseUrl}/api/trip`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const viewTrip = async (_id) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.baseUrl}/api/trip/${_id}`,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};
