import express from "express";
import { login, register, updateUser } from "./../controllers/authControllers";
import { auth } from "../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", auth, updateUser);

export default router;
