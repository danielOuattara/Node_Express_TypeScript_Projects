import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productControllers";

import { authRoles, authUser } from "../middlewares/auth";

const router = Router();

router
  .route("/")
  .post([authUser, authRoles("admin")], createProduct)
  .get(getAllProducts);

router.route("/upload-image").post([authUser, authRoles("admin")], uploadImage);

router
  .route("/:productId")
  .get(getSingleProduct)
  .patch([authUser, authRoles("admin")], updateProduct)
  .delete([authUser, authRoles("admin")], deleteProduct);

export default router;
