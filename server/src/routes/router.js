import { Router } from "express";
import checkAuthenticated from "../middleware/checkAuth.js";
import User from "../models/userModel.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/authentication", authRoutes);

router.get("/user/profile", checkAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
