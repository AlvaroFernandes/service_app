import axios from "axios";

const USER_URL = "/users/";

const getUserInfo = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(USER_URL + "userInfo", userId, config);

  if (!response.data) {
    console.log(response.data);
  }

  return response.data;
};

const usersService = {
  getUserInfo,
};

export default usersService;
