import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/show-me").get(showCurrentUser);
router.route("/update-user").patch(updateUser);
router.route("/update-user-password").patch(updateUserPassword);
router.route("/:userId").get(getSingleUser);

export default router;
