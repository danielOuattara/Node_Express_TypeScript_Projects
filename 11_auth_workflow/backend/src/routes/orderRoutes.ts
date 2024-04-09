import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderControllers";
import {
  authenticateAdmin,
  authenticateRoles,
  authenticateUser,
} from "../middlewares";

const router = Router();

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(
    authenticateUser,
    authenticateRoles("admin"),
    authenticateAdmin,
    getAllOrders,
  );

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:orderId")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

export default router;
