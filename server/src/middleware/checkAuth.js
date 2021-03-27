import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const checkAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { sub: id } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(id).select("-refreshToken");

    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};

export default checkAuthenticated;
