import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/authControllers";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);

export default router;
