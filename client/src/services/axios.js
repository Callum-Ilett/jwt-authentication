import Axios from "axios";
import TokenStorage from "./token/tokenService";

const baseURL = "http://localhost:5000/api";

const axios = Axios.create({ baseURL });

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response.status;
    const originalRequest = error.config;

    if (status === 403) {
      const { accessToken } = await TokenStorage.getNewAccessToken();
      TokenStorage.setAccessToken(accessToken);

      originalRequest.headers["Authorization"] = "Bearer " + accessToken;

      return axios.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
