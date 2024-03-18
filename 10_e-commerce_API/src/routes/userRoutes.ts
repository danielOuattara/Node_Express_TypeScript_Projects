import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers";
import { authUser } from "../middlewares/auth";

const router = Router();

router.route("/").get(authUser, getAllUsers);
router.route("/show-me").get(showCurrentUser);
router.route("/update-user").patch(updateUser);
router.route("/update-user-password").patch(updateUserPassword);
router.route("/:userId").get(getSingleUser);

export default router;
