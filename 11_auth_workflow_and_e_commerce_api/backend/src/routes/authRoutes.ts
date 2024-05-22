import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/authControllers";

import { authenticateUser } from "../middlewares";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
