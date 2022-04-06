import axios from "axios";

const USER_URL = "/users/";

const getUserInfo = async (_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(USER_URL + "userInfo", _id, config);

  return response.data;
};

const usersService = {
  getUserInfo,
};

export default usersService;
