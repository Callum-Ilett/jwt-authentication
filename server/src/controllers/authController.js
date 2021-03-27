import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { createAccessToken, createRefreshToken } from "../utilities/token.js";
import jwt from "jsonwebtoken";

const newAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(403).json({ message: "Missing refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = createAccessToken({ id: decoded.sub });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ error });
  }
};

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email }).select("+refreshToken");

    if (userExists)
      return res.status(409).json({ message: "Email is already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    user.refreshToken = createRefreshToken(user);

    await user.save();

    res.status(201).json({ message: "Registered successfuly" });
  } catch (error) {
    res.json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      "+password +refreshToken"
    );

    if (!user)
      return res.status(404).json({ message: "No account with that email" });

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect)
      return res.status(400).json({ message: "Incorrect email or password" });

    if (user.refreshToken === "") {
      user.refreshToken = createRefreshToken(user);
      await user.save();
    }

    const accessToken = createAccessToken(user);
    const refreshToken = user.refreshToken;

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const logout = async (req, res) => {
  const { user } = req;

  try {
    user.refreshToken = "";
    await user.save();
    res.status(200).json({ message: "Successfuly logged out" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default {
  register,
  login,
  newAccessToken,
  logout,
};
