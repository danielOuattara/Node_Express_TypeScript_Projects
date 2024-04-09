import { Router } from "express";
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewControllers";
import { authenticateUser } from "../middlewares/authenticateMiddlewares";

const router = Router();
router.route("/").post(authenticateUser, createReview).get(getAllReviews);

router
  .route("/:reviewId")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default router;
