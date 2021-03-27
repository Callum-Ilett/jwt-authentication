import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const createAccessToken = (user) => {
  const payload = { sub: user.id };
  const options = {
    expiresIn: "15s",
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
};

export const createRefreshToken = (user) => {
  const payload = { sub: user.id };
  const options = {
    expiresIn: "1y",
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
};
