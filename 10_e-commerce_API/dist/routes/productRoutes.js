"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
const reviewControllers_1 = require("./../controllers/reviewControllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router
    .route("/")
    .post([middlewares_1.authenticateUser, (0, middlewares_1.authenticateRoles)("admin")], productControllers_1.createProduct)
    .get(productControllers_1.getAllProducts);
router
    .route("/upload-image")
    .post([middlewares_1.authenticateUser, (0, middlewares_1.authenticateRoles)("admin")], productControllers_1.uploadImage);
router
    .route("/:productId")
    .get(productControllers_1.getSingleProduct)
    .patch([middlewares_1.authenticateUser, (0, middlewares_1.authenticateRoles)("admin")], productControllers_1.updateProduct)
    .delete([middlewares_1.authenticateUser, (0, middlewares_1.authenticateRoles)("admin")], productControllers_1.deleteProduct);
router.route("/:productId/reviews").get(reviewControllers_1.getSingleProductReviews);
exports.default = router;
