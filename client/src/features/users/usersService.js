import axios from "axios";

const USER_URL = "/users/";

const getUserInfo = async (_id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const url = USER_URL + "userInfo/" + _id;
  const response = await axios.get(url, config);

  return response.data;
};

const usersService = {
  getUserInfo,
};

export default usersService;
