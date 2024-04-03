import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  patchProduct,
  uploadImage,
} from "../controllers/productControllers";

import { getSingleProductReviews } from "./../controllers/reviewControllers";

import { authenticateRoles, authenticateUser } from "../middlewares";

const router = Router();

router
  .route("/")
  .post([authenticateUser, authenticateRoles("admin")], createProduct)
  .get(getAllProducts);

router
  .route("/upload-image")
  .post([authenticateUser, authenticateRoles("admin")], uploadImage);

router
  .route("/:productId")
  .get(getSingleProduct)
  .patch([authenticateUser, authenticateRoles("admin")], patchProduct)
  .delete([authenticateUser, authenticateRoles("admin")], deleteProduct);

router.route("/:productId/reviews").get(getSingleProductReviews);

export default router;
