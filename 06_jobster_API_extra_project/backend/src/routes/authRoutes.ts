import express from "express";
import { login, register, updateUser } from "./../controllers/authControllers";
import { auth, testUser } from "../middlewares";

import { rateLimit } from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 7 * 60 * 1000,
  max: 10,
  message: { code: 429, msg: "Too many connection; Try later !" },
  limit: 5,
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.patch("/updateUser", auth, testUser, updateUser);

export default router;
