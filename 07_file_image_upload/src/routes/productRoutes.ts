import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productsControllers";
import { uploadProductImage } from "../controllers/uploadsControllers";

const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);

export default router;
