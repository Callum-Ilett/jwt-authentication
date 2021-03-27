import { Router } from "express";
import AuthController from "../controllers/authController.js";
import checkAuthenticated from "../middleware/checkAuth.js";

const authRoutes = Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);

authRoutes.post("/create-access-token", AuthController.newAccessToken);

authRoutes.delete("/logout", checkAuthenticated, AuthController.logout);

export default authRoutes;
