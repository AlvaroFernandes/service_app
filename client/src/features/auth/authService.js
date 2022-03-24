import axiso from "axios";

const USER_URL = "/users/";

const registerUsers = async (userData) => {
  const response = await axiso.post(USER_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const loginUsers = async (userData) => {
  const response = await axiso.post(USER_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUsers,
  logout,
  loginUsers,
};

export default authService;
