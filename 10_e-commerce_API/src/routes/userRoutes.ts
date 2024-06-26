import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers";
import {
  authenticateUser,
  authenticateAdmin,
  authenticateRoles,
} from "../middlewares";

const router = Router();

router
  .route("/")
  .get(
    authenticateUser,
    authenticateRoles("admin"),
    authenticateAdmin,
    getAllUsers,
  );
router.route("/show-user").get(authenticateUser, showCurrentUser);
router.route("/update-user").patch(authenticateUser, updateUser);
router.route("/update-password").patch(authenticateUser, updateUserPassword);
router.route("/:userId").get(authenticateUser, getSingleUser);

export default router;
