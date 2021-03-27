import axios from "../axios";

const storage = localStorage.getItem("user");

const setUser = (data) => localStorage.setItem("user", JSON.stringify(data));

const getRefreshToken = () => JSON.parse(storage).refreshToken;
const getAccessToken = () => JSON.parse(storage).accessToken;
const clear = () => localStorage.clear();

const setAccessToken = (token) => {
  let user = JSON.parse(storage);
  user.accessToken = token;
  setUser(user);
};

const getNewAccessToken = async () => {
  const refreshToken = getRefreshToken();

  const { data } = await axios.post(`/authentication/create-access-token`, {
    refreshToken,
  });

  return data;
};

const TokenStorage = {
  setUser,
  setAccessToken,
  getRefreshToken,
  getAccessToken,
  clear,
  getNewAccessToken,
};

export default TokenStorage;
