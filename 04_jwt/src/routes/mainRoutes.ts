import express from "express";
import { login, dashboard } from "./../controllers/mainControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.route("/login").post(login);

router.route("/dashboard").get(auth, dashboard);

export default router;
