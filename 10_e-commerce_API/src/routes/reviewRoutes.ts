import { Router } from "express";
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewControllers";
import { authUser } from "../middlewares/auth";

const router = Router();
router.route("/").post(authUser, createReview).get(getAllReviews);

router
  .route("/:reviewId")
  .get(getSingleReview)
  .patch(authUser, updateReview)
  .delete(authUser, deleteReview);

export default router;
