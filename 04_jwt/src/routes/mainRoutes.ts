import express from "express";
import { login, dashboard } from "./../controllers/mainControllers";

const router = express.Router();

router.route("/login").post(login);

router.route("/dashboard").get(dashboard);
// router.route("/dashboard").get(authMiddleware, dashboard);

export default router;
