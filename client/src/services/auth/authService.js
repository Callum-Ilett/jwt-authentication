import axios from "../axios";
import TokenStorage from "../token/tokenService";

const getAuthenticatedUser = async () => {
  const token = TokenStorage.getAccessToken();

  const { data } = await axios.get(`/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

const register = async (formData) => {
  const { data } = await axios.post(`/authentication/register`, formData);

  return data;
};

const login = async (email, password) => {
  const { data } = await axios.post(`/authentication/login`, {
    email,
    password,
  });

  TokenStorage.setUser(data);

  return data;
};

const logout = () => TokenStorage.clear();

const AuthService = { getAuthenticatedUser, register, login, logout };

export default AuthService;
