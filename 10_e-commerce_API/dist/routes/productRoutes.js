"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
const reviewControllers_1 = require("./../controllers/reviewControllers");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router
    .route("/")
    .post([auth_1.authUser, (0, auth_1.authRoles)("admin")], productControllers_1.createProduct)
    .get(productControllers_1.getAllProducts);
router.route("/upload-image").post([auth_1.authUser, (0, auth_1.authRoles)("admin")], productControllers_1.uploadImage);
router
    .route("/:productId")
    .get(productControllers_1.getSingleProduct)
    .patch([auth_1.authUser, (0, auth_1.authRoles)("admin")], productControllers_1.updateProduct)
    .delete([auth_1.authUser, (0, auth_1.authRoles)("admin")], productControllers_1.deleteProduct);
router.route("/:productId/reviews").get(reviewControllers_1.getSingleProductReviews);
exports.default = router;
