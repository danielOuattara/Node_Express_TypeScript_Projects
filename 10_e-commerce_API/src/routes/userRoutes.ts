import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers";
import { authUser, authAdmin, authRoles } from "../middlewares/auth";

const router = Router();

router.route("/").get(authUser, authRoles("admin"), authAdmin, getAllUsers);
router.route("/show-user").get(authUser, showCurrentUser);
router.route("/update-user").patch(updateUser);
router.route("/update-user-password").patch(updateUserPassword);
router.route("/:userId").get(getSingleUser);

export default router;
