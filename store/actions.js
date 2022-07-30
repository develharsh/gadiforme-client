import axios from "axios";

export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  // GLOBAL_LOADING: "GLOBAL_LOADING",
  SIDEPANEL: "SIDEPANEL",
  LOGIN_MODAL: "LOGIN_MODAL",
  REGISTER_MODAL: "REGISTER_MODAL",
};

export const userLogin = async (payload) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.baseUrl}/v1/user/login`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const userRegister = async (payload) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.baseUrl}/v1/user/register`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const myTrips = async (token) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.baseUrl}/v1/trip/list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};
