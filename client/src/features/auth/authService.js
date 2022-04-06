import axios from "axios";

const AUTH_URL = "/auth/";

const registerUsers = async (userData) => {
  const response = await axios.post(AUTH_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }

  return response.data;
};

const loginUsers = async (userData) => {
  const response = await axios.post(AUTH_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }

  return response.data;
};

const rememberPassword = async (userData) => {
  const response = await axios.post(AUTH_URL + "forgotPassword", userData);

  if (response.data) {
    console.log(response.data);
  }
};

const authService = {
  registerUsers,
  loginUsers,
  rememberPassword,
};

export default authService;
