import { Router } from "express";
import {
  getAllProductsStatic,
  getAllProducts,
} from "./../controllers/productControllers";

const router = Router();

router.route("/static").get(getAllProductsStatic);
router.route("/").get(getAllProducts);

export default router;
