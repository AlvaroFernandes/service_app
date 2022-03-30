import axios from "axios";

const USER_URL = "/users/";

const registerUsers = async (userData) => {
  const response = await axios.post(USER_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const loginUsers = async (userData) => {
  const response = await axios.post(USER_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const rememberPassword = async (userData) => {
  const response = await axios.post(USER_URL + "forgotPassword", userData);

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
